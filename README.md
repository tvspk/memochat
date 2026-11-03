# MemoChat

Notes as a chat with yourself. An installable, offline-first web app (PWA) for Android, Windows and Linux.

**App:** https://tvspk.github.io/memochat/

- Your notes are stored only on your device (IndexedDB in the browser). Nothing is uploaded anywhere.
- Attachments (photos and any files) are kept in their original quality, stored on the device next to the notes.
- Back up regularly: ⋮ → Backup & settings → Back up to file. The backup is one ZIP file with notes and attachments, optionally encrypted with a password. Older JSON backups (also from the prototype) can still be restored.
- Share to MemoChat from other apps (text, links, one photo): Share → MemoChat → choose a thread.
- Long-press the app icon for shortcuts: Inbox, Work, Search.

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
