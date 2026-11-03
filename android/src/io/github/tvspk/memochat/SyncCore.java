package io.github.tvspk.memochat;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;

import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * Background part of sync (no Android API here, so it can be tested on a computer).
 *
 * The web app stays the only place where notes are merged and stored. When the app is left it hands over
 * a "package": its own state, already encrypted exactly as it would upload it, plus what it knows about
 * the mailbox (repository, branch, the other devices' commits it has already merged). A run here:
 *  1. uploads the package to this device's branch, so the other devices see the phone's changes;
 *  2. downloads the states of the other devices that changed since the app last merged them, decrypts them
 *     and works out the reminders (so a date added on the computer rings on the phone);
 *  3. remembers that something new arrived, so the app syncs straight away when it is opened.
 * It never writes notes. The protocol and the encryption are the same as in js/app.js (section "Sync").
 */
final class SyncCore {

    static String API = "https://api.github.com";
    static final long DAY = 86400000L;
    static final long STALE = 300 * DAY;
    static final Pattern RE_REPO = Pattern.compile("^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$");
    static final Pattern RE_BRANCH = Pattern.compile("^mc-[a-f0-9]{12}$");
    static final Pattern RE_SHA = Pattern.compile("^[a-f0-9]{40}$");
    static final Pattern RE_PART = Pattern.compile("^a-[A-Za-z0-9_-]{1,64}-[0-9]{1,5}$");

    /** result of a run */
    static final class Result {
        boolean uploaded;            // the package went up
        String uploadedHash;         // ... with this hash
        boolean remoteNews;          // another device has changes the app hasn't merged
        JSONArray alarms;            // reminders of the merged notes (null: nothing new, keep the app's list)
        String error;                // null, or offline | token | notfound | forbidden | http:<status> | tree | damaged | other
    }

    static final class SyncError extends Exception {
        final String kind; final int status;
        SyncError(String kind, int status) { super(kind + " " + status); this.kind = kind; this.status = status; }
    }

    private final String token, repo, branch;
    private final byte[] key;

    SyncCore(String token, String code, String repo, String branch) throws Exception {
        if (!RE_REPO.matcher(repo).matches() || !RE_BRANCH.matcher(branch).matches()) throw new IllegalArgumentException("cfg");
        this.token = token; this.repo = repo; this.branch = branch;
        this.key = deriveKey(code);
    }

    /* ---------------- crypto (same as the web app) ---------------- */

    /** HKDF-SHA-256(code, salt "MemoChat sync v1", info "data") → AES-256 key */
    static byte[] deriveKey(String code) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec("MemoChat sync v1".getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] prk = mac.doFinal(code.getBytes(StandardCharsets.UTF_8));
        mac.init(new SecretKeySpec(prk, "HmacSHA256"));
        mac.update("data".getBytes(StandardCharsets.UTF_8));
        mac.update((byte) 1);
        return mac.doFinal();     // 32 bytes
    }

    /** one record [IV 12 B][length 4 B, big-endian][AES-GCM], additional data "name|i|last" */
    static byte[] open(byte[] key, String name, int i, boolean last, byte[] rec) throws Exception {
        if (rec.length < 32) throw new IOException("short");
        int len = ((rec[12] & 0xff) << 24) | ((rec[13] & 0xff) << 16) | ((rec[14] & 0xff) << 8) | (rec[15] & 0xff);
        if (16L + (len & 0xffffffffL) != rec.length) throw new IOException("length");
        Cipher c = Cipher.getInstance("AES/GCM/NoPadding");
        byte[] iv = new byte[12]; System.arraycopy(rec, 0, iv, 0, 12);
        c.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"), new GCMParameterSpec(128, iv));
        c.updateAAD((name + "|" + i + "|" + (last ? 1 : 0)).getBytes(StandardCharsets.UTF_8));
        return c.doFinal(rec, 16, rec.length - 16);
    }

    /** the state: [flag][data], flag 1 = gzip */
    static JSONObject readState(byte[] key, byte[] rec) throws Exception {
        byte[] p = open(key, "state", 0, true, rec);
        if (p.length < 1) throw new IOException("empty");
        byte[] body;
        if (p[0] == 1) {
            GZIPInputStream in = new GZIPInputStream(new ByteArrayInputStream(p, 1, p.length - 1));
            body = readAll(in, 64L << 20);
        } else body = java.util.Arrays.copyOfRange(p, 1, p.length);
        JSONObject o = new JSONObject(new String(body, StandardCharsets.UTF_8));
        if (!"MemoChat".equals(o.optString("app")) || o.optJSONArray("threads") == null || o.optJSONArray("notes") == null) throw new IOException("shape");
        return o;
    }

    static byte[] readAll(InputStream in, long max) throws IOException {
        ByteArrayOutputStream o = new ByteArrayOutputStream();
        byte[] buf = new byte[16384]; int n; long total = 0;
        try {
            while ((n = in.read(buf)) > 0) { total += n; if (total > max) throw new IOException("too big"); o.write(buf, 0, n); }
        } finally { in.close(); }
        return o.toByteArray();
    }

    /* ---------------- GitHub REST API ---------------- */

    private static final class Resp { int status; byte[] body; }

    private Resp call(String method, String path, String json, boolean raw) throws SyncError {
        HttpURLConnection c = null;
        try {
            c = (HttpURLConnection) new URL(API + path).openConnection();
            c.setConnectTimeout(20000); c.setReadTimeout(60000);
            c.setUseCaches(false); c.setInstanceFollowRedirects(true);
            try { setMethod(c, method); }
            catch (ProtocolException e) { throw new SyncError("nopatch", 0); }
            c.setRequestProperty("Authorization", "Bearer " + token);
            c.setRequestProperty("Accept", raw ? "application/vnd.github.raw+json" : "application/vnd.github+json");
            c.setRequestProperty("User-Agent", "MemoChat");
            if (json != null) {
                byte[] b = json.getBytes(StandardCharsets.UTF_8);
                c.setDoOutput(true);
                c.setRequestProperty("Content-Type", "application/json");
                c.setFixedLengthStreamingMode(b.length);
                OutputStream o = c.getOutputStream(); o.write(b); o.close();
            }
            Resp r = new Resp();
            r.status = c.getResponseCode();
            InputStream in = r.status >= 400 ? c.getErrorStream() : c.getInputStream();
            r.body = in == null ? new byte[0] : readAll(in, 160L << 20);
            if (r.status == 401) throw new SyncError("token", 401);
            if (r.status == 404) throw new SyncError("notfound", 404);
            if (r.status == 403) throw new SyncError("forbidden", 403);
            if (r.status < 200 || r.status >= 300) throw new SyncError("http", r.status);
            return r;
        } catch (SyncError e) {
            throw e;
        } catch (IOException e) {
            throw new SyncError("offline", 0);
        } finally {
            if (c != null) c.disconnect();
        }
    }

    /** PATCH is not in every HttpURLConnection's list of methods (it is on Android) */
    private static void setMethod(HttpURLConnection c, String m) throws ProtocolException {
        try { c.setRequestMethod(m); }
        catch (ProtocolException e) {
            try {
                Field f = HttpURLConnection.class.getDeclaredField("method");
                f.setAccessible(true); f.set(c, m);
            } catch (Exception e2) { throw e; }
        }
    }

    private JSONObject getJson(String path) throws SyncError { return parse(call("GET", path, null, false)); }
    private JSONObject send(String method, String path, JSONObject body) throws SyncError { return parse(call(method, path, body.toString(), false)); }
    private static JSONObject parse(Resp r) throws SyncError {
        try { return new JSONObject(new String(r.body, StandardCharsets.UTF_8)); }
        catch (Exception e) { throw new SyncError("http", r.status); }
    }

    /* ---------------- one run ---------------- */

    /**
     * @param pack  the package from the app: {hash, upHash, state (base64 record), files:{attId:[sha…]}, seen:{branch:commit},
     *              lang, photoMsg, allDay}
     * @param uploadedHash  the hash this code uploaded last time (null)
     * @param backupAlarm   the weekly-backup reminder to keep in the list (null)
     * @param now   current time
     */
    Result run(JSONObject pack, String uploadedHash, JSONObject backupAlarm, long now) {
        Result res = new Result();
        String P = "/repos/" + repo;
        try {
            // 1) what the devices have uploaded
            JSONArray refs;
            try { refs = new JSONArray(new String(call("GET", P + "/git/matching-refs/heads/mc-", null, false).body, StandardCharsets.UTF_8)); }
            catch (SyncError e) { throw e; } catch (Exception e) { throw new SyncError("http", 0); }
            String ownCommit = null;
            JSONObject seen = pack.optJSONObject("seen");
            List<JSONObject> others = new ArrayList<>();
            boolean damaged = false;
            for (int k = 0; k < refs.length(); k++) {
                JSONObject ref = refs.optJSONObject(k); if (ref == null) continue;
                String br = ref.optString("ref").replaceFirst("^refs/heads/", "");
                JSONObject obj = ref.optJSONObject("object");
                String csha = obj == null ? "" : obj.optString("sha");
                if (!RE_BRANCH.matcher(br).matches() || !RE_SHA.matcher(csha).matches()) continue;
                if (br.equals(branch)) { ownCommit = csha; continue; }
                if (seen != null && csha.equals(seen.optString(br, null))) continue;      // the app has merged it already
                JSONObject c = getJson(P + "/git/commits/" + csha);
                JSONObject committer = c.optJSONObject("committer");
                long date = committer == null ? 0 : parseIso(committer.optString("date"));
                if (date < now - STALE) continue;
                JSONObject tree = c.optJSONObject("tree");
                String tsha = tree == null ? "" : tree.optString("sha");
                if (!RE_SHA.matcher(tsha).matches()) throw new SyncError("http", 0);
                JSONArray entries = getJson(P + "/git/trees/" + tsha).optJSONArray("tree");
                String stateSha = null;
                for (int j = 0; entries != null && j < entries.length(); j++) {
                    JSONObject e = entries.optJSONObject(j);
                    if (e != null && "blob".equals(e.optString("type")) && "state".equals(e.optString("path")) && RE_SHA.matcher(e.optString("sha")).matches()) stateSha = e.optString("sha");
                }
                if (stateSha == null) continue;
                res.remoteNews = true;
                try { others.add(readState(key, call("GET", P + "/git/blobs/" + stateSha, null, true).body)); }
                catch (SyncError e) { throw e; } catch (Exception e) { damaged = true; }
            }

            // 2) upload the package (unless it is already up)
            String hash = pack.optString("hash", "");
            String state = pack.optString("state", "");
            if (!hash.isEmpty() && !state.isEmpty() && !(hash.equals(pack.optString("upHash")) && ownCommit != null) && !hash.equals(uploadedHash)) {
                JSONObject blob = send("POST", P + "/git/blobs", new JSONObject().put("content", state).put("encoding", "base64"));
                JSONArray tree = new JSONArray();
                tree.put(entry("state", blob.optString("sha")));
                JSONObject files = pack.optJSONObject("files");
                if (files != null) {
                    List<String> ids = new ArrayList<>();
                    for (Iterator<String> it = files.keys(); it.hasNext(); ) ids.add(it.next());
                    Collections.sort(ids);
                    for (String id : ids) {
                        JSONArray shas = files.optJSONArray(id); if (shas == null) continue;
                        for (int j = 0; j < shas.length(); j++) {
                            String s = shas.optString(j), path = "a-" + id + "-" + j;
                            if (RE_SHA.matcher(s).matches() && RE_PART.matcher(path).matches()) tree.put(entry(path, s));
                        }
                    }
                }
                JSONObject tr;
                try { tr = send("POST", P + "/git/trees", new JSONObject().put("tree", tree)); }
                catch (SyncError e) { if (e.status == 422) throw new SyncError("tree", 422); throw e; }
                JSONObject cm = send("POST", P + "/git/commits", new JSONObject().put("message", "MemoChat sync").put("tree", tr.optString("sha")).put("parents", new JSONArray()));
                boolean created = false;
                if (ownCommit != null) {
                    try { send("PATCH", P + "/git/refs/heads/" + branch, new JSONObject().put("sha", cm.optString("sha")).put("force", true)); created = true; }
                    catch (SyncError e) {
                        if (!e.kind.equals("nopatch")) throw e;
                        call("DELETE", P + "/git/refs/heads/" + branch, null, false);     // this HTTP stack has no PATCH
                    }
                }
                if (!created) send("POST", P + "/git/refs", new JSONObject().put("ref", "refs/heads/" + branch).put("sha", cm.optString("sha")));
                res.uploaded = true; res.uploadedHash = hash;
            }

            // 3) reminders of the notes as they will be after the next merge
            if (!others.isEmpty()) {
                JSONObject local = readState(key, Base64.getDecoder().decode(state));
                res.alarms = alarms(local, others, pack, backupAlarm, now);
            }
            if (damaged) res.error = "damaged";
        } catch (SyncError e) {
            res.error = e.kind.equals("http") && e.status > 0 ? "http:" + e.status : e.kind;
        } catch (Exception e) {
            res.error = "other";
        }
        return res;
    }

    private static JSONObject entry(String path, String sha) throws Exception {
        return new JSONObject().put("path", path).put("mode", "100644").put("type", "blob").put("sha", sha);
    }

    static long parseIso(String s) {
        try {
            SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.US);
            f.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
            return f.parse(s.length() >= 19 ? s.substring(0, 19) : s).getTime();
        } catch (Exception e) { return 0; }
    }

    /* ---------------- reminders (same rules as nativeAlarms() in js/app.js) ---------------- */

    /** newest version of every item over all states; deleted forever = tombstone not older than the item */
    private static Map<String, JSONObject> newest(List<JSONObject> states, String list, Map<String, Long> tombs) {
        Map<String, JSONObject> m = new HashMap<>();
        for (JSONObject s : states) {
            JSONArray a = s.optJSONArray(list);
            for (int k = 0; a != null && k < a.length(); k++) {
                JSONObject x = a.optJSONObject(k); if (x == null) continue;
                String id = x.optString("id", ""); if (id.isEmpty()) continue;
                JSONObject cur = m.get(id);
                if (cur == null || x.optLong("updatedAt", 0) > cur.optLong("updatedAt", 0)) m.put(id, x);   // tie: the earlier state (this device) stays
            }
        }
        for (Iterator<Map.Entry<String, JSONObject>> it = m.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, JSONObject> e = it.next();
            Long t = tombs.get(e.getKey());
            if (t != null && t >= e.getValue().optLong("updatedAt", 0)) it.remove();
        }
        return m;
    }

    static JSONArray alarms(JSONObject local, List<JSONObject> others, JSONObject pack, JSONObject backupAlarm, long now) throws Exception {
        List<JSONObject> states = new ArrayList<>();
        states.add(local); states.addAll(others);
        Map<String, Long> tombs = new HashMap<>();
        for (JSONObject s : states) {
            JSONObject t = s.optJSONObject("tombs");
            if (t == null) continue;
            for (Iterator<String> it = t.keys(); it.hasNext(); ) {
                String id = it.next(); long at = t.optLong(id, 0);
                Long cur = tombs.get(id); if (cur == null || at > cur) tombs.put(id, at);
            }
        }
        Map<String, JSONObject> threads = newest(states, "threads", tombs), notes = newest(states, "notes", tombs);
        // one Inbox (smallest id), notes without a thread go there
        String inbox = null;
        for (JSONObject th : threads.values())
            if ("inbox".equals(th.optString("system")) && !has(th, "deletedAt") && (inbox == null || th.optString("id").compareTo(inbox) < 0)) inbox = th.optString("id");

        boolean cs = "cs".equals(pack.optString("lang"));
        Locale loc = cs ? Locale.forLanguageTag("cs-CZ") : Locale.forLanguageTag("en-GB");
        String photoMsg = pack.optString("photoMsg", "Photo"), allDay = pack.optString("allDay", "All day");
        List<JSONObject> list = new ArrayList<>();
        for (JSONObject n : notes.values()) {
            JSONObject due = n.optJSONObject("due");
            if (due == null || has(n, "deletedAt") || n.optBoolean("done", false)) continue;
            String tid = str(n, "threadId");
            JSONObject th = threads.get(tid);
            if (th == null && inbox != null) th = threads.get(inbox);
            if (th == null || has(th, "deletedAt") || th.optBoolean("archived", false)) continue;
            Long r = remindTs(due);
            if (r == null || r <= now) continue;
            String title = snippet(n, photoMsg);
            JSONObject o = new JSONObject();
            o.put("id", "n-" + n.optString("id"));
            o.put("at", r.longValue());
            o.put("title", title.isEmpty() ? photoMsg : title);
            o.put("text", str(th, "name") + " · " + dueFull(due, loc, cs, allDay));
            o.put("note", n.optString("id"));
            list.add(o);
        }
        Collections.sort(list, new Comparator<JSONObject>() {
            @Override public int compare(JSONObject a, JSONObject b) { return Long.compare(a.optLong("at"), b.optLong("at")); }
        });
        JSONArray out = new JSONArray();
        for (int k = 0; k < list.size() && k < 250; k++) out.put(list.get(k));
        if (backupAlarm != null) out.put(backupAlarm);
        return out;
    }

    /** like a JavaScript truthiness test of o[k] */
    private static boolean has(JSONObject o, String k) {
        Object v = o.opt(k);
        if (v == null || v == JSONObject.NULL) return false;
        if (v instanceof Boolean) return (Boolean) v;
        if (v instanceof Number) return ((Number) v).doubleValue() != 0;
        if (v instanceof String) return !((String) v).isEmpty();
        return true;
    }
    /** o[k] as text; "" for a missing value or null (org.json would give "null") */
    private static String str(JSONObject o, String k) {
        Object v = o == null ? null : o.opt(k);
        return v == null || v == JSONObject.NULL ? "" : String.valueOf(v);
    }

    private static int[] ymd(JSONObject due) {
        String[] p = str(due, "date").split("-");
        return new int[]{Integer.parseInt(p[0]), Integer.parseInt(p[1]), Integer.parseInt(p[2])};
    }

    private static long local(int y, int m, int d, int h, int mi) {
        Calendar c = new GregorianCalendar(); c.clear();
        c.set(y, m - 1, d, h, mi, 0); c.set(Calendar.MILLISECOND, 0);
        return c.getTimeInMillis();
    }

    static Long remindTs(JSONObject due) {
        try {
            Object rem = due.opt("remind");
            String time = str(due, "time");
            if (time.isEmpty()) time = null;
            if (rem instanceof JSONObject) {
                String at = ((JSONObject) rem).optString("at");
                if (!at.matches("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$")) return null;
                return local(Integer.parseInt(at.substring(0, 4)), Integer.parseInt(at.substring(5, 7)), Integer.parseInt(at.substring(8, 10)),
                        Integer.parseInt(at.substring(11, 13)), Integer.parseInt(at.substring(14, 16)));
            }
            String r = rem instanceof String && !((String) rem).isEmpty() ? (String) rem : (time != null ? "15m" : "morning");
            if ("none".equals(r)) return null;
            int[] d = ymd(due);
            if (time == null) return "1d".equals(r) ? local(d[0], d[1], d[2] - 1, 9, 0) : local(d[0], d[1], d[2], 9, 0);
            String[] hm = time.split(":");
            long s = local(d[0], d[1], d[2], Integer.parseInt(hm[0]), Integer.parseInt(hm[1]));
            if ("at".equals(r)) return s;
            if ("1h".equals(r)) return s - 3600000L;
            if ("1d".equals(r)) return s - DAY;
            return s - 15 * 60000L;
        } catch (Exception e) { return null; }
    }

    static String dueFull(JSONObject due, Locale loc, boolean cs, String allDay) {
        int[] d = ymd(due);
        Calendar c = new GregorianCalendar(d[0], d[1] - 1, d[2]);
        String s = new SimpleDateFormat(cs ? "EEE d. M. yyyy" : "EEE, dd/MM/yyyy", loc).format(c.getTime());
        if (!s.isEmpty()) s = s.substring(0, 1).toUpperCase(loc) + s.substring(1);
        String time = str(due, "time");
        return s + " · " + (time.isEmpty() ? allDay : time);
    }

    static String snippet(JSONObject n, String photoMsg) {
        String s;
        if ("list".equals(n.optString("type"))) {
            s = str(n, "title");
            if (s.isEmpty()) {
                JSONArray items = n.optJSONArray("items"); StringBuilder b = new StringBuilder();
                for (int k = 0; items != null && k < items.length(); k++) {
                    JSONObject it = items.optJSONObject(k); if (it == null) continue;
                    if (b.length() > 0) b.append(", ");
                    b.append(str(it, "text"));
                }
                s = b.toString();
            }
        } else {
            s = str(n, "text");
            if (s.isEmpty()) {
                if (!str(n, "photo").isEmpty()) s = "📷 " + photoMsg;
                else {
                    JSONArray a = n.optJSONArray("attachments");
                    if (a != null && a.length() > 0) {
                        JSONObject f = a.optJSONObject(0);
                        s = (!str(f, "thumb").isEmpty() ? "📷 " : "📎 ") + str(f, "name") + (a.length() > 1 ? " +" + (a.length() - 1) : "");
                    }
                }
            }
        }
        int nl = s.indexOf('\n');
        return nl >= 0 ? s.substring(0, nl) : s;
    }
}
