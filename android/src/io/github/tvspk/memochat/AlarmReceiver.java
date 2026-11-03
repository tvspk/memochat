package io.github.tvspk.memochat;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

/** Shows the notification for a reminder; tapping it opens the note (or the backup dialog). */
public class AlarmReceiver extends BroadcastReceiver {
    static final String CHANNEL = "reminders";

    @Override
    public void onReceive(Context c, Intent in) {
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        if (nm.getNotificationChannel(CHANNEL) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, c.getString(R.string.channel_reminders), NotificationManager.IMPORTANCE_HIGH);
            ch.enableVibration(true);
            nm.createNotificationChannel(ch);
        }
        String id = in.getStringExtra("id");
        if (id == null) id = "x";
        String title = in.getStringExtra("title");
        String text = in.getStringExtra("text");
        Intent open = new Intent(c, MainActivity.class)
                .setData(new Uri.Builder().scheme("memochat").opaquePart("notification/" + id).build())
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        if (in.getBooleanExtra("backup", false)) open.putExtra("backup", true);
        else open.putExtra("note", in.getStringExtra("note"));
        PendingIntent pi = PendingIntent.getActivity(c, id.hashCode(), open,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification n = new Notification.Builder(c, CHANNEL)
                .setSmallIcon(R.drawable.ic_notif)
                .setColor(0xFF2B4C7E)
                .setContentTitle(title != null ? title : "MemoChat")
                .setContentText(text)
                .setStyle(new Notification.BigTextStyle().bigText(text))
                .setCategory(Notification.CATEGORY_REMINDER)
                .setAutoCancel(true)
                .setContentIntent(pi)
                .build();
        try { nm.notify(id.hashCode(), n); } catch (SecurityException ignored) { /* notifications not allowed */ }
    }
}
