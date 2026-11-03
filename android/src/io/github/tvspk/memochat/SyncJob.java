package io.github.tvspk.memochat;

import android.app.job.JobInfo;
import android.app.job.JobParameters;
import android.app.job.JobScheduler;
import android.app.job.JobService;
import android.content.ComponentName;
import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

/**
 * Sync in the background (see SyncCore). Two jobs, both only with a network connection:
 *  - DAILY: about once a day, also when the app hasn't been opened (persisted across reboots);
 *  - SOON:  about a minute after the app was left (uploads what was changed, refreshes the reminders).
 * Nothing runs while the app is in the foreground: then the app syncs by itself.
 */
public class SyncJob extends JobService {
    static final int ID_DAILY = 7101, ID_SOON = 7102;
    static final String PACK = "sync-pack.json";

    static volatile boolean running;
    static volatile boolean foreground;

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences("memochat_sync", Context.MODE_PRIVATE); }

    @Override
    public boolean onStartJob(final JobParameters params) {
        if (foreground || running) return false;
        running = true;
        final Context c = getApplicationContext();
        new Thread(new Runnable() {
            @Override public void run() {
                boolean retry = false;
                try { retry = runOnce(c); }
                catch (Throwable t) { prefs(c).edit().putString("lastError", "other").apply(); }
                finally {
                    running = false;
                    jobFinished(params, retry);
                }
            }
        }).start();
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters params) { return true; }   // stopped by the system: try again later

    /** one run; true = failed for a passing reason (no network, server error), try again later */
    static boolean runOnce(Context c) throws Exception {
        JSONObject pack = readPack(c);
        if (pack == null) return false;
        String token = Secrets.get(c, "syncToken"), code = Secrets.get(c, "syncCode");
        if (token == null || code == null) return false;
        SharedPreferences p = prefs(c);
        SyncCore core = new SyncCore(token, code, pack.optString("repo"), pack.optString("branch"));
        long now = System.currentTimeMillis();
        SyncCore.Result r = core.run(pack, p.getString("uploadedHash", null), backupAlarm(c), now);
        SharedPreferences.Editor e = p.edit().putLong("lastRun", now).putString("lastError", r.error);
        if (r.uploaded) e.putString("uploadedHash", r.uploadedHash).putLong("uploadedAt", now);
        if (r.remoteNews) e.putLong("newsAt", now);
        e.apply();
        if (r.alarms != null) Alarms.replace(c, r.alarms.toString());
        return r.error != null && (r.error.equals("offline") || r.error.startsWith("http:5"));
    }

    /** the weekly-backup reminder the app set (kept when the list is replaced here) */
    static JSONObject backupAlarm(Context c) {
        try {
            JSONArray l = new JSONArray(Alarms.prefs(c).getString("list", "[]"));
            for (int k = 0; k < l.length(); k++) { JSONObject o = l.optJSONObject(k); if (o != null && o.optBoolean("backup", false)) return o; }
        } catch (Exception ignored) {}
        return null;
    }

    static JSONObject readPack(Context c) {
        try {
            File f = new File(c.getFilesDir(), PACK);
            if (!f.exists()) return null;
            java.io.FileInputStream in = new java.io.FileInputStream(f);
            return new JSONObject(new String(SyncCore.readAll(in, 256L << 20), StandardCharsets.UTF_8));
        } catch (Exception e) { return null; }
    }

    /** the app hands over its state (MemoChatNative.syncPrepare) */
    static boolean savePack(Context c, String json) {
        try {
            JSONObject o = new JSONObject(json);
            if (!SyncCore.RE_REPO.matcher(o.optString("repo")).matches() || !SyncCore.RE_BRANCH.matcher(o.optString("branch")).matches()
                    || o.optString("state").isEmpty() || o.optString("hash").isEmpty()) return false;
            SharedPreferences p = prefs(c);
            // another mailbox or device branch than before: forget what was done for the old one
            if (!o.optString("repo").equals(p.getString("repo", "")) || !o.optString("branch").equals(p.getString("branch", "")))
                p.edit().clear().putString("repo", o.optString("repo")).putString("branch", o.optString("branch")).apply();
            File tmp = new File(c.getFilesDir(), PACK + ".tmp"), f = new File(c.getFilesDir(), PACK);
            FileOutputStream out = new FileOutputStream(tmp);
            out.write(json.getBytes(StandardCharsets.UTF_8)); out.getFD().sync(); out.close();
            if (!tmp.renameTo(f)) return false;
            schedule(c);
            return true;
        } catch (Exception e) { return false; }
    }

    static String info(Context c) {
        SharedPreferences p = prefs(c);
        try {
            JSONObject o = new JSONObject().put("busy", running);
            if (p.contains("repo")) o.put("repo", p.getString("repo", "")).put("branch", p.getString("branch", ""));
            if (p.contains("uploadedHash")) o.put("uploadedHash", p.getString("uploadedHash", "")).put("uploadedAt", p.getLong("uploadedAt", 0));
            if (p.contains("newsAt")) o.put("newsAt", p.getLong("newsAt", 0));
            if (p.contains("lastRun")) o.put("lastRun", p.getLong("lastRun", 0));
            String err = p.getString("lastError", null);
            if (err != null) o.put("lastError", err);
            return o.toString();
        } catch (Exception e) { return "null"; }
    }

    static void schedule(Context c) {
        JobScheduler js = (JobScheduler) c.getSystemService(Context.JOB_SCHEDULER_SERVICE);
        if (js == null) return;
        ComponentName cn = new ComponentName(c, SyncJob.class);
        if (js.getPendingJob(ID_DAILY) == null) {
            js.schedule(new JobInfo.Builder(ID_DAILY, cn)
                    .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
                    .setPeriodic(SyncCore.DAY, 4 * 3600000L)
                    .setPersisted(true)
                    .build());
        }
        js.schedule(new JobInfo.Builder(ID_SOON, cn)
                .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
                .setMinimumLatency(60000L)
                .build());
    }

    /** sync switched off: no jobs, nothing kept */
    static void reset(Context c) {
        JobScheduler js = (JobScheduler) c.getSystemService(Context.JOB_SCHEDULER_SERVICE);
        if (js != null) { js.cancel(ID_DAILY); js.cancel(ID_SOON); }
        new File(c.getFilesDir(), PACK).delete();
        prefs(c).edit().clear().apply();
    }
}
