# MemoChat

Notes as a chat with yourself. An installable, offline-first web app (PWA) for Android, Windows and Linux.

**App:** https://tvspk.github.io/memochat/

- Your notes are stored on your device (IndexedDB in the browser, or inside the Android app). Nothing is uploaded unless you turn on sync.
- Attachments (photos and any files) are kept in their original quality, stored on the device next to the notes.
- Back up regularly: ⋮ → Backup & settings → Back up to file. The backup is one ZIP file with notes and attachments, optionally encrypted with a password. Older JSON backups (also from the prototype) can still be restored.
- Share to MemoChat from other apps (text, links, one photo): Share → MemoChat → choose a thread.
- Long-press the app icon for shortcuts: Inbox, Work, Search.

## Sync (optional)

Phone and computer can exchange changes once a day (and on "Sync now") through a **private** GitHub
repository of your own (e.g. `memochat-sync`), used as an encrypted mailbox:

- Set it up in ⋮ → Backup & settings → Sync with a fine-grained token that can access only that repository
  (Repository permissions → Contents: Read and write). The first device shows an 8-word pairing code;
  enter it on the other device.
- Everything stored in the repository is encrypted (AES-256-GCM, key derived from the pairing code with HKDF).
  The token and the code stay on the device (Android Keystore in the app, a non-extractable key in the browser).
- Each device writes its whole state to its own branch `mc-<device id>` (one commit without history);
  attachments are stored as encrypted pieces of up to 8 MiB. The newer change of a note wins; if both devices
  changed the same note, the other version is kept in the note's edit history. Notes deleted forever stay deleted
  (tombstones). Language and appearance are not synced.
- The pairing code can also be shown as a QR code and scanned with the camera (`js/qr.js`, no libraries).
- Android also syncs in the background (`SyncJob.java`, `SyncCore.java`): about a minute after the app is left and
  about once a day, it uploads the phone's state (prepared and encrypted by the app) and checks the other devices.
  It sets reminders for their dated notes and makes the app sync at once when opened. Notes are merged only in the app.

## Structure

| Path | What it is |
|---|---|
| `index.html` | page shell (with Content Security Policy) |
| `css/app.css` | styles |
| `js/app.js` | the whole app (no framework, no build step) |
| `fonts/` | self-hosted fonts (SIL Open Font License, see `fonts/LICENSE-*`) |
| `icons/` | app icons |
| `manifest.webmanifest` | install metadata |
| `sw.js.template` → `sw.js` | service worker (offline cache, updates) |
| `scripts/build_sw.py` | regenerates `sw.js` |

## Android app (APK)

`android/` wraps the same web app in a small native shell (WebView + Java bridge): files are served
from the APK, data lives in the app (not in Chrome), reminders are system notifications (AlarmManager),
weekly backup goes to a folder you choose, sharing and icon shortcuts work right away.

- Built by GitHub Actions (`.github/workflows/apk.yml`, `android/build.sh`) with the official Android SDK.
- Signed with the release key from the repository secrets `MEMOCHAT_KEYSTORE` (base64) and
  `MEMOCHAT_KEYSTORE_PASSWORD`. **Every update must be signed with this same key.**
- A new GitHub release (with `memochat.apk` and `version.json`) is published when `APP_VERSION`
  in `js/app.js` is new. Installed apps check `version.json` and offer the update.
- Latest APK: https://github.com/tvspk/memochat/releases/latest/download/memochat.apk

## Making a change

1. Edit the files.
2. Run `python3 scripts/build_sw.py`. This updates the offline file list and the version, so installed apps offer the update.
3. For a new Android release, raise `APP_VERSION` in `js/app.js` (e.g. 1.3.0 → 1.3.1).
4. Commit and push to `main`. GitHub Pages publishes the web app in about a minute; GitHub Actions builds and releases the APK.
