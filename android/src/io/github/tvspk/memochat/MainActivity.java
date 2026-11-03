package io.github.tvspk.memochat;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.UriPermission;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Parcelable;
import android.provider.DocumentsContract;
import android.provider.OpenableColumns;
import android.provider.Settings;
import android.util.Base64;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.MimeTypeMap;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * MemoChat for Android: one WebView showing the same app as the web version.
 * The app files are served from the APK's assets under https://appassets.androidplatform.net/
 * (a host reserved for this purpose that never reaches the network), so the page is a secure
 * context with its own storage, independent of Chrome. A small JavaScript bridge
 * (window.MemoChatNative) adds what a web page cannot do: saving files, backup folder,
 * notifications, sharing, opening attachments in other apps.
 */
public class MainActivity extends Activity {
    static final String HOST = "appassets.androidplatform.net";
    static final String BASE = "https://" + HOST + "/";
    static final String UPDATE_URL = "https://github.com/tvspk/memochat/releases/latest/download/version.json";

    private static final int REQ_FILES = 1, REQ_SAVE = 2, REQ_TREE = 3, REQ_NOTIF = 4;

    WebView web;
    boolean pageReady;
    String pendingLaunch;                       // JSON for the page, taken by takeLaunch()
    ValueCallback<Uri[]> fileCallback;
    String saveCb, treeCb, notifCb;
    int shareSeq;
    final Map<String, Uri> shared = new ConcurrentHashMap<>();
    final Map<String, OutputStream> outs = new ConcurrentHashMap<>();
    final Map<String, Uri> outUris = new ConcurrentHashMap<>();       // documents being written (deleted on abort)
    final Map<String, String> cacheNames = new ConcurrentHashMap<>(); // token → file name in cache/open
    int tokenSeq;

    SharedPreferences prefs() { return getSharedPreferences("memochat", Context.MODE_PRIVATE); }

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        web = new WebView(this);
        web.setBackgroundColor(isNight() ? 0xFF0D1322 : 0xFFF6F0E1);
        setContentView(web);
        setBars("#2B4C7E", isNight() ? "#111A2E" : "#EFE5CC", isNight());

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setSupportMultipleWindows(false);
        s.setJavaScriptCanOpenWindowsAutomatically(false);
        if (Build.VERSION.SDK_INT >= 29) s.setForceDark(WebSettings.FORCE_DARK_OFF);   // the app has its own dark theme

        web.addJavascriptInterface(new Bridge(), "MemoChatNative");
        web.setWebViewClient(new Client());
        web.setWebChromeClient(new Chrome());

        pendingLaunch = launchJson(getIntent());
        web.loadUrl(BASE + "index.html");
    }

    boolean isNight() {
        return (getResources().getConfiguration().uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK)
                == android.content.res.Configuration.UI_MODE_NIGHT_YES;
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        String j = launchJson(intent);
        if (j == null) return;
        if (pageReady) web.evaluateJavascript("window.__mcLaunch&&window.__mcLaunch(" + j + ")", null);
        else pendingLaunch = j;
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (!pageReady) { moveTaskToBack(true); return; }
        web.evaluateJavascript("(window.__mcBack&&window.__mcBack())?1:0", new ValueCallback<String>() {
            @Override public void onReceiveValue(String v) { if (!"1".equals(v)) moveTaskToBack(true); }
        });
    }

    @Override
    protected void onDestroy() {
        for (OutputStream o : outs.values()) { try { o.close(); } catch (IOException ignored) {} }
        outs.clear();
        if (web != null) web.destroy();
        super.onDestroy();
    }

    /* ---------------- launch intents → JSON for the page ---------------- */

    String launchJson(Intent i) {
        if (i == null || i.getBooleanExtra("mc_done", false)) return null;
        try {
            JSONObject o = new JSONObject();
            String action = i.getAction();
            Uri data = i.getData();
            if (Intent.ACTION_SEND.equals(action) || Intent.ACTION_SEND_MULTIPLE.equals(action)) {
                JSONObject sh = new JSONObject();
                CharSequence text = i.getCharSequenceExtra(Intent.EXTRA_TEXT);
                String subject = i.getStringExtra(Intent.EXTRA_SUBJECT);
                sh.put("text", text != null ? text.toString() : "");
                sh.put("title", subject != null ? subject : "");
                List<Uri> uris = new ArrayList<>();
                if (Intent.ACTION_SEND.equals(action)) {
                    Parcelable p = i.getParcelableExtra(Intent.EXTRA_STREAM);
                    if (p instanceof Uri) uris.add((Uri) p);
                } else {
                    ArrayList<Parcelable> list = i.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
                    if (list != null) for (Parcelable p : list) if (p instanceof Uri) uris.add((Uri) p);
                }
                if (uris.isEmpty() && i.getClipData() != null) {
                    ClipData cd = i.getClipData();
                    for (int k = 0; k < cd.getItemCount(); k++) { Uri u = cd.getItemAt(k).getUri(); if (u != null) uris.add(u); }
                }
                JSONArray files = new JSONArray();
                for (Uri u : uris) {
                    if (!"content".equals(u.getScheme())) continue;          // never file:// paths
                    String id = String.valueOf(++shareSeq);
                    shared.put(id, u);
                    JSONObject f = new JSONObject();
                    f.put("url", "/__share/" + id);
                    String[] meta = nameAndSize(u);
                    f.put("name", meta[0]);
                    f.put("size", meta[1]);
                    String type = getContentResolver().getType(u);
                    f.put("type", type != null ? type : (i.getType() != null ? i.getType() : ""));
                    files.put(f);
                }
                sh.put("files", files);
                o.put("share", sh);
            } else if (i.getBooleanExtra("backup", false)) {             // weekly backup notification
                o.put("backup", true);
            } else if (i.getStringExtra("note") != null) {                 // reminder notification
                o.put("note", i.getStringExtra("note"));
            } else if (data != null && "memochat".equals(data.getScheme())
                    && data.getSchemeSpecificPart() != null && data.getSchemeSpecificPart().startsWith("open/")) {
                o.put("open", data.getSchemeSpecificPart().substring(5)); // icon shortcut "memochat:open/inbox"
            } else {
                return null;
            }
            i.putExtra("mc_done", true);
            return o.toString();
        } catch (Exception e) {
            return null;
        }
    }

    String[] nameAndSize(Uri u) {
        String name = "", size = "0";
        try (Cursor c = getContentResolver().query(u, new String[]{OpenableColumns.DISPLAY_NAME, OpenableColumns.SIZE}, null, null, null)) {
            if (c != null && c.moveToFirst()) {
                if (!c.isNull(0)) name = c.getString(0);
                if (!c.isNull(1)) size = String.valueOf(c.getLong(1));
            }
        } catch (Exception ignored) {}
        return new String[]{name, size};
    }

    /* ---------------- serving the app from the APK ---------------- */

    class Client extends WebViewClient {
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
            Uri u = req.getUrl();
            String scheme = u.getScheme();
            if (!"https".equals(scheme) && !"http".equals(scheme)) return null;       // data:/blob: are handled by WebView itself
            if (!HOST.equals(u.getHost()) || !"https".equals(scheme)) return error(403);   // no other site may load
            String path = u.getPath();
            if (path == null || path.equals("/")) path = "/index.html";
            Map<String, String> headers = new HashMap<>();
            headers.put("Cache-Control", "no-cache");
            if (path.startsWith("/__share/")) {
                Uri src = shared.get(path.substring(9));
                if (src == null) return error(404);
                try {
                    InputStream in = getContentResolver().openInputStream(src);
                    String type = getContentResolver().getType(src);
                    return new WebResourceResponse(type != null ? type : "application/octet-stream", null, 200, "OK", headers, in);
                } catch (Exception e) { return error(404); }
            }
            if (path.contains("..") || path.contains("//")) return error(404);
            try {
                InputStream in = getAssets().open("www" + path);
                return new WebResourceResponse(mimeFor(path), mimeFor(path).startsWith("text/") || path.endsWith(".js") ? "utf-8" : null, 200, "OK", headers, in);
            } catch (IOException e) {
                return error(404);
            }
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
            Uri u = req.getUrl();
            if (HOST.equals(u.getHost()) && "https".equals(u.getScheme())) return false;
            String sc = u.getScheme();
            if ("https".equals(sc) || "http".equals(sc) || "mailto".equals(sc) || "tel".equals(sc)) openExternal(u);
            return true;   // blob:, data:, intent:, javascript: … are never opened
        }

        @Override
        public void onPageFinished(WebView view, String url) { pageReady = true; }
    }

    static WebResourceResponse error(int code) {
        return new WebResourceResponse("text/plain", "utf-8", code, code == 403 ? "Forbidden" : "Not Found",
                new HashMap<String, String>(), new ByteArrayInputStream(new byte[0]));
    }

    static String mimeFor(String path) {
        String p = path.toLowerCase();
        if (p.endsWith(".html")) return "text/html";
        if (p.endsWith(".js")) return "text/javascript";
        if (p.endsWith(".css")) return "text/css";
        if (p.endsWith(".woff2")) return "font/woff2";
        if (p.endsWith(".png")) return "image/png";
        if (p.endsWith(".svg")) return "image/svg+xml";
        if (p.endsWith(".json") || p.endsWith(".webmanifest")) return "application/json";
        return "application/octet-stream";
    }

    void openExternal(Uri u) {
        try { startActivity(new Intent(Intent.ACTION_VIEW, u).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); }
        catch (ActivityNotFoundException ignored) {}
    }

    /* ---------------- <input type=file> ---------------- */

    class Chrome extends WebChromeClient {
        @Override
        public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> cb, FileChooserParams params) {
            if (fileCallback != null) fileCallback.onReceiveValue(null);
            fileCallback = cb;
            Intent i = params.createIntent();
            i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, params.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE);
            try { startActivityForResult(i, REQ_FILES); }
            catch (ActivityNotFoundException e) { fileCallback = null; return false; }
            return true;
        }
    }

    @Override
    @SuppressWarnings("deprecation")
    protected void onActivityResult(int req, int result, Intent data) {
        super.onActivityResult(req, result, data);
        if (req == REQ_FILES) {
            Uri[] res = null;
            if (result == RESULT_OK && data != null) {
                if (data.getClipData() != null) {
                    ClipData cd = data.getClipData();
                    res = new Uri[cd.getItemCount()];
                    for (int k = 0; k < res.length; k++) res[k] = cd.getItemAt(k).getUri();
                } else if (data.getData() != null) res = new Uri[]{data.getData()};
            }
            if (fileCallback != null) fileCallback.onReceiveValue(res);
            fileCallback = null;
        } else if (req == REQ_SAVE) {
            String cb = saveCb; saveCb = null;
            if (result != RESULT_OK || data == null || data.getData() == null) { resolve(cb, "null"); return; }
            try {
                OutputStream o = getContentResolver().openOutputStream(data.getData(), "w");
                if (o == null) { resolve(cb, "null"); return; }
                String tok = newToken();
                outs.put(tok, o); outUris.put(tok, data.getData());
                resolve(cb, JSONObject.quote(tok));
            } catch (Exception e) { resolve(cb, "null"); }
        } else if (req == REQ_TREE) {
            String cb = treeCb; treeCb = null;
            if (result != RESULT_OK || data == null || data.getData() == null) { resolve(cb, "null"); return; }
            Uri tree = data.getData();
            try {
                getContentResolver().takePersistableUriPermission(tree,
                        Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            } catch (SecurityException e) { resolve(cb, "null"); return; }
            String old = prefs().getString("backupTree", null);
            if (old != null && !old.equals(tree.toString())) {
                try { getContentResolver().releasePersistableUriPermission(Uri.parse(old),
                        Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION); } catch (Exception ignored) {}
            }
            prefs().edit().putString("backupTree", tree.toString()).apply();
            String name = treeName(tree);
            resolve(cb, JSONObject.quote(name != null ? name : "?"));
        }
    }

    @Override
    public void onRequestPermissionsResult(int req, String[] perms, int[] results) {
        if (req == REQ_NOTIF) {
            String cb = notifCb; notifCb = null;
            resolve(cb, notificationsOn() ? "true" : "false");
        }
    }

    /* ---------------- helpers ---------------- */

    synchronized String newToken() { return "t" + (++tokenSeq); }

    void resolve(final String cb, final String jsValue) {
        if (cb == null) return;
        runOnUiThread(new Runnable() { @Override public void run() { web.evaluateJavascript(
                "window.__mcNativeResolve&&window.__mcNativeResolve(" + JSONObject.quote(cb) + "," + jsValue + ")", null); } });
    }

    boolean notificationsOn() {
        if (Build.VERSION.SDK_INT >= 33
                && checkSelfPermission("android.permission.POST_NOTIFICATIONS") != PackageManager.PERMISSION_GRANTED) return false;
        return ((android.app.NotificationManager) getSystemService(NOTIFICATION_SERVICE)).areNotificationsEnabled();
    }

    Uri backupTree() {
        String t = prefs().getString("backupTree", null);
        if (t == null) return null;
        Uri tree = Uri.parse(t);
        for (UriPermission p : getContentResolver().getPersistedUriPermissions())
            if (p.getUri().equals(tree) && p.isWritePermission()) return tree;
        return null;   // permission was revoked (e.g. folder deleted)
    }

    String treeName(Uri tree) {
        try {
            Uri doc = DocumentsContract.buildDocumentUriUsingTree(tree, DocumentsContract.getTreeDocumentId(tree));
            try (Cursor c = getContentResolver().query(doc, new String[]{DocumentsContract.Document.COLUMN_DISPLAY_NAME}, null, null, null)) {
                if (c != null && c.moveToFirst()) return c.getString(0);
            }
        } catch (Exception ignored) {}
        return null;
    }

    void setBars(String status, String nav, boolean dark) {
        try {
            Window w = getWindow();
            w.setStatusBarColor(Color.parseColor(status));
            w.setNavigationBarColor(Color.parseColor(nav));
            int flags = w.getDecorView().getSystemUiVisibility();
            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;                  // header is always dark → light icons
            if (Build.VERSION.SDK_INT >= 27) {
                if (dark) flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                else flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            }
            w.getDecorView().setSystemUiVisibility(flags);
        } catch (Exception ignored) {}
    }

    static String safeName(String name) {
        String n = name == null ? "" : name.replaceAll("[\\\\/:*?\"<>|\\p{Cntrl}]", "_").trim();
        if (n.isEmpty() || n.equals(".") || n.equals("..")) n = "file";
        return n.length() > 120 ? n.substring(n.length() - 120) : n;
    }

    /* ---------------- the bridge (window.MemoChatNative) ----------------
       Methods run on a WebView background thread; UI work goes through runOnUiThread.
       Only the app's own page is ever loaded in this WebView (see Client). */
    class Bridge {
        @JavascriptInterface
        public String info() {
            try {
                PackageInfo pi = getPackageManager().getPackageInfo(getPackageName(), 0);
                JSONObject o = new JSONObject();
                o.put("versionName", pi.versionName);
                o.put("versionCode", Build.VERSION.SDK_INT >= 28 ? pi.getLongVersionCode() : pi.versionCode);
                o.put("sdk", Build.VERSION.SDK_INT);
                return o.toString();
            } catch (Exception e) { return "{}"; }
        }

        @JavascriptInterface
        public String takeLaunch() { String s = pendingLaunch; pendingLaunch = null; return s; }

        @JavascriptInterface
        public void setBars(final String status, final String nav, final boolean dark) {
            runOnUiThread(new Runnable() { @Override public void run() { MainActivity.this.setBars(status, nav, dark); } });
        }

        /* --- writing files: saveAs / folderWrite / cacheWrite give a token, then write…close --- */
        @JavascriptInterface
        public void saveAs(final String cb, final String name, final String mime) {
            runOnUiThread(new Runnable() { @Override public void run() {
                if (saveCb != null) resolve(saveCb, "null");
                saveCb = cb;
                Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                i.addCategory(Intent.CATEGORY_OPENABLE);
                i.setType(mime == null || mime.isEmpty() ? "application/octet-stream" : mime);
                i.putExtra(Intent.EXTRA_TITLE, safeName(name));
                try { startActivityForResult(i, REQ_SAVE); }
                catch (ActivityNotFoundException e) { saveCb = null; resolve(cb, "null"); }
            } });
        }

        @JavascriptInterface
        public boolean write(String token, String base64) {
            OutputStream o = outs.get(token);
            if (o == null) return false;
            try { o.write(Base64.decode(base64, Base64.DEFAULT)); return true; }
            catch (Exception e) { return false; }
        }

        @JavascriptInterface
        public boolean close(String token) {
            OutputStream o = outs.remove(token);
            outUris.remove(token);
            if (o == null) return false;
            try { o.close(); return true; } catch (IOException e) { return false; }
        }

        @JavascriptInterface
        public void abort(String token) {
            OutputStream o = outs.remove(token);
            if (o != null) { try { o.close(); } catch (IOException ignored) {} }
            Uri u = outUris.remove(token);
            if (u != null) { try { DocumentsContract.deleteDocument(getContentResolver(), u); } catch (Exception ignored) {} }
            String n = cacheNames.remove(token);
            if (n != null) new File(new File(getCacheDir(), "open"), n).delete();
        }

        /* --- weekly backup folder --- */
        @JavascriptInterface
        public void pickFolder(final String cb) {
            runOnUiThread(new Runnable() { @Override public void run() {
                if (treeCb != null) resolve(treeCb, "null");
                treeCb = cb;
                Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION
                        | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
                try { startActivityForResult(i, REQ_TREE); }
                catch (ActivityNotFoundException e) { treeCb = null; resolve(cb, "null"); }
            } });
        }

        @JavascriptInterface
        public String folderName() {
            Uri tree = backupTree();
            if (tree == null) return "";
            String n = treeName(tree);
            return n != null ? n : "";
        }

        @JavascriptInterface
        public String folderWrite(String name, String mime) {
            Uri tree = backupTree();
            if (tree == null) return null;
            try {
                ContentResolver cr = getContentResolver();
                Uri dir = DocumentsContract.buildDocumentUriUsingTree(tree, DocumentsContract.getTreeDocumentId(tree));
                Uri doc = DocumentsContract.createDocument(cr, dir, mime, safeName(name));
                if (doc == null) return null;
                OutputStream o = cr.openOutputStream(doc, "w");
                if (o == null) return null;
                String tok = newToken();
                outs.put(tok, o); outUris.put(tok, doc);
                return tok;
            } catch (Exception e) { return null; }
        }

        /** deletes all but the newest {@code keep} files whose name starts with {@code prefix} */
        @JavascriptInterface
        public int folderPrune(String prefix, int keep) {
            Uri tree = backupTree();
            if (tree == null) return 0;
            ContentResolver cr = getContentResolver();
            List<Object[]> found = new ArrayList<>();
            try {
                Uri kids = DocumentsContract.buildChildDocumentsUriUsingTree(tree, DocumentsContract.getTreeDocumentId(tree));
                try (Cursor c = cr.query(kids, new String[]{DocumentsContract.Document.COLUMN_DOCUMENT_ID,
                        DocumentsContract.Document.COLUMN_DISPLAY_NAME, DocumentsContract.Document.COLUMN_LAST_MODIFIED}, null, null, null)) {
                    while (c != null && c.moveToNext()) {
                        String n = c.getString(1);
                        if (n != null && n.startsWith(prefix) && n.endsWith(".zip"))
                            found.add(new Object[]{c.getString(0), c.isNull(2) ? 0L : c.getLong(2)});
                    }
                }
            } catch (Exception e) { return 0; }
            Collections.sort(found, new java.util.Comparator<Object[]>() {
                @Override public int compare(Object[] a, Object[] b) { return Long.compare((Long) b[1], (Long) a[1]); }
            });
            int deleted = 0;
            for (int k = Math.max(keep, 1); k < found.size(); k++) {
                try {
                    if (DocumentsContract.deleteDocument(cr, DocumentsContract.buildDocumentUriUsingTree(tree, (String) found.get(k)[0]))) deleted++;
                } catch (Exception ignored) {}
            }
            return deleted;
        }

        /* --- opening an attachment in another app --- */
        @JavascriptInterface
        public String cacheWrite(String name) {
            try {
                File dir = new File(getCacheDir(), "open");
                if (!dir.exists() && !dir.mkdirs()) return null;
                File[] old = dir.listFiles();
                if (old != null) for (File f : old) if (System.currentTimeMillis() - f.lastModified() > 3600_000L) f.delete();
                String n = System.currentTimeMillis() + "-" + safeName(name);
                String tok = newToken();
                outs.put(tok, new FileOutputStream(new File(dir, n)));
                cacheNames.put(tok, n);
                return tok;
            } catch (Exception e) { return null; }
        }

        @JavascriptInterface
        public void openCached(String token, final String mime, final String mode) {
            final String n = cacheNames.remove(token);
            if (n == null) return;
            runOnUiThread(new Runnable() { @Override public void run() {
                Uri u = new Uri.Builder().scheme("content").authority(FilesProvider.AUTHORITY).appendPath(n).build();
                String type = mime == null || mime.isEmpty() ? "application/octet-stream" : mime;
                Intent i;
                if ("view".equals(mode)) { i = new Intent(Intent.ACTION_VIEW); i.setDataAndType(u, type); }
                else { i = new Intent(Intent.ACTION_SEND); i.setType(type); i.putExtra(Intent.EXTRA_STREAM, u);
                       i.setClipData(ClipData.newRawUri("", u)); }
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                try { startActivity(Intent.createChooser(i, null)); } catch (ActivityNotFoundException ignored) {}
            } });
        }

        /* --- secrets (backup password), encrypted with a key kept in the Android Keystore --- */
        @JavascriptInterface
        public boolean secretSet(String key, String value) { return Secrets.set(MainActivity.this, key, value); }

        @JavascriptInterface
        public String secretGet(String key) { return Secrets.get(MainActivity.this, key); }

        @JavascriptInterface
        public void secretDel(String key) { Secrets.delete(MainActivity.this, key); }

        /* --- reminders --- */
        @JavascriptInterface
        public void setAlarms(String json) { Alarms.replace(MainActivity.this, json); }

        @JavascriptInterface
        public String notifState() { return notificationsOn() ? "granted" : "denied"; }

        @JavascriptInterface
        public void requestNotif(final String cb) {
            runOnUiThread(new Runnable() { @Override public void run() {
                if (Build.VERSION.SDK_INT >= 33 && !notificationsOn()) {
                    notifCb = cb;
                    requestPermissions(new String[]{"android.permission.POST_NOTIFICATIONS"}, REQ_NOTIF);
                } else resolve(cb, notificationsOn() ? "true" : "false");
            } });
        }

        @JavascriptInterface
        public void openNotifSettings() {
            runOnUiThread(new Runnable() { @Override public void run() {
                Intent i = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
                try { startActivity(i); } catch (ActivityNotFoundException ignored) {}
            } });
        }

        /* --- updates: reads version.json of the latest GitHub release --- */
        @JavascriptInterface
        public void checkUpdate(final String cb) {
            new Thread(new Runnable() { @Override public void run() {
                String out = "null";
                HttpURLConnection c = null;
                try {
                    c = (HttpURLConnection) new URL(UPDATE_URL).openConnection();
                    c.setConnectTimeout(8000); c.setReadTimeout(8000);
                    c.setInstanceFollowRedirects(true);
                    if (c.getResponseCode() == 200) {
                        try (InputStream in = c.getInputStream()) {
                            ByteArrayOutputStream bo = new ByteArrayOutputStream();
                            byte[] buf = new byte[8192]; int r;
                            while ((r = in.read(buf)) > 0 && bo.size() < 65536) bo.write(buf, 0, r);
                            out = new JSONObject(bo.toString("UTF-8")).toString();   // re-serialised: only valid JSON reaches the page
                        }
                    }
                } catch (Exception ignored) {
                } finally { if (c != null) c.disconnect(); }
                resolve(cb, out);
            } }).start();
        }

        @JavascriptInterface
        public void openUrl(String url) {
            Uri u = Uri.parse(url);
            if ("https".equals(u.getScheme())) runOnUiThread(new Runnable() { @Override public void run() { openExternal(u); } });
        }
    }
}
