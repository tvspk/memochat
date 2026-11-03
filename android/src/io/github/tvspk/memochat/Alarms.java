package io.github.tvspk.memochat;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Reminder schedule. The page sends the complete list of upcoming reminders
 * ([{id, at, title, text, note?, backup?}]); it is stored and every item gets an AlarmManager alarm.
 * After a reboot or an app update BootReceiver schedules the stored list again.
 */
final class Alarms {
    private Alarms() {}

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences("memochat_alarms", Context.MODE_PRIVATE); }

    static synchronized void replace(Context c, String json) {
        JSONArray next;
        try { next = new JSONArray(json); } catch (Exception e) { return; }
        cancelAll(c);
        prefs(c).edit().putString("list", next.toString()).apply();
        scheduleAll(c, next);
    }

    static synchronized void reschedule(Context c) {
        try { scheduleAll(c, new JSONArray(prefs(c).getString("list", "[]"))); } catch (Exception ignored) {}
    }

    private static void cancelAll(Context c) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        try {
            JSONArray old = new JSONArray(prefs(c).getString("list", "[]"));
            for (int k = 0; k < old.length(); k++) {
                JSONObject o = old.optJSONObject(k);
                if (o == null) continue;
                PendingIntent pi = PendingIntent.getBroadcast(c, 0, intent(c, o),
                        PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE);
                if (pi != null) { am.cancel(pi); pi.cancel(); }
            }
        } catch (Exception ignored) {}
    }

    private static void scheduleAll(Context c, JSONArray list) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        long now = System.currentTimeMillis();
        boolean exact = Build.VERSION.SDK_INT < 31 || am.canScheduleExactAlarms();
        for (int k = 0; k < list.length(); k++) {
            JSONObject o = list.optJSONObject(k);
            if (o == null) continue;
            long at = o.optLong("at", 0);
            if (at <= now) continue;
            PendingIntent pi = PendingIntent.getBroadcast(c, 0, intent(c, o),
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            try {
                if (exact) am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
                else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
            } catch (SecurityException e) {
                am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
            }
        }
    }

    /** one intent per reminder id (the data URI makes them distinct for PendingIntent) */
    private static Intent intent(Context c, JSONObject o) {
        String id = o.optString("id", "");
        return new Intent(c, AlarmReceiver.class)
                .setAction("io.github.tvspk.memochat.REMINDER")
                .setData(new Uri.Builder().scheme("memochat").opaquePart("alarm/" + id).build())
                .putExtra("id", id)
                .putExtra("title", o.optString("title", "MemoChat"))
                .putExtra("text", o.optString("text", ""))
                .putExtra("note", o.optString("note", ""))
                .putExtra("backup", o.optBoolean("backup", false));
    }
}
