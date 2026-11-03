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

## Making a change

1. Edit the files.
2. Run `python3 scripts/build_sw.py`. This updates the offline file list and the version, so installed apps offer the update.
3. Commit and push to `main`. GitHub Pages publishes in about a minute.
