(function(){
'use strict';

/* =========================================================
   Icons
   ========================================================= */
const TRIQ_LEAF = 'M0 -10C-6 -3-4.5 3 0 4.5C4.5 3 6 -3 0 -10Z';
function triq(s=11, c='#C9A24A'){ const P='M0 0c0-4 4-6 7-4s2 7-2 7'; return `<svg class="dia" width="${s}" height="${s}" viewBox="-12 -12 24 24" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="${P}"/><path transform="rotate(120)" d="${P}"/><path transform="rotate(240)" d="${P}"/></svg>`; }
const BLOSSOM = s => { let p=''; for(let i=0;i<5;i++){ const a=(i*72-90)*Math.PI/180; p+=`<circle cx="${(Math.cos(a)*5).toFixed(2)}" cy="${(Math.sin(a)*5).toFixed(2)}" r="3.6"/>`; } return `<svg class="dia" width="${s}" height="${s}" viewBox="-12 -12 24 24" fill="none" stroke="#C9A24A" stroke-width="1.5" aria-hidden="true">${p}<circle r="1.6" fill="#C9A24A"/></svg>`; };
function orn(s){ return effTheme()==='dark' ? BLOSSOM(s) : triq(s); }
const ART_KR = {
  sword:'<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="72" cy="22" r="8"/><path d="M4 72l14-22 10 13 22-34 22 34 10-13 14 22"/><path d="M34 52l6 6 10-10 10 10 6-6"/><path d="M4 82c5-5 10-5 15 0s10 5 15 0 10-5 15 0 10 5 15 0 10-5 15 0 10 5 15 0"/><path d="M10 92c5-4 10-4 15 0s10 4 15 0 10-4 15 0 10 4 15 0 10-4 15 0"/></svg>',
  grail:'<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="M40 10h20v5c18 4 30 17 30 35 0 22-17 40-40 40S10 72 10 50c0-18 12-31 30-35z"/><path d="M38 10h24M36 90h28"/><path d="M24 36c8-4 17-6 26-6s18 2 26 6" opacity=".55"/></svg>',
  table:'<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="12" y="12" width="76" height="76" rx="2"/><rect x="18" y="18" width="64" height="64"/><path d="M50 18v64M18 50h64M34 18v64M66 18v64M18 34h64M18 66h64" opacity=".7"/><rect x="40" y="40" width="20" height="20"/><path d="M44 44h12v12H44z" opacity=".6"/></svg>'
};
function art(k){ return effTheme()==='dark' ? ART_KR[k] : ART[k]; }
/* Celtic line icons for thread avatars (light theme). Keyed by emoji; others keep the emoji. */
const CELTIC = {
  scroll:'<path d="M8 4h9a2 2 0 0 1 0 4h-1v10a2 2 0 0 1-2 2H6a2 2 0 0 1 0-4h1V6a2 2 0 0 1 2-2z"/><path d="M7 16h7M10 9.5h3.5M10 12.5h3.5"/>',
  quill:'<path d="M5 20C7 12 11 6 20 3.5c-1 5-4 9.5-9 11.5"/><path d="M20 3.5c-5 .5-8.5 3.5-10.5 7.5"/><path d="M8.5 15.5l2 1.5"/><path d="M3 21h6"/>',
  roundhouse:'<path d="M2.5 12.5L12 4l9.5 8.5"/><path d="M5 11v9h14v-9"/><path d="M10 20v-3.5a2 2 0 0 1 4 0V20"/><path d="M8 8l1.2 2.4M12 5.5v3.5M16 8l-1.2 2.4"/>',
  basket:'<path d="M3.5 10.5h17l-2 9h-13z"/><path d="M7.5 10.5a4.5 4.5 0 0 1 9 0"/><path d="M5 14h14M5.8 17h12.4M9.5 10.5v9M14.5 10.5v9"/>',
  awen:'<circle cx="7.5" cy="5.5" r="1.2"/><circle cx="12" cy="4" r="1.2"/><circle cx="16.5" cy="5.5" r="1.2"/><path d="M12 7.5V20M10 8L5.5 19.5M14 8l4.5 11.5"/>',
  suncross:'<circle cx="12" cy="12" r="6.5"/><path d="M12 2.5v19M2.5 12h19"/><circle cx="12" cy="12" r="2"/>',
  compass:'<circle cx="12" cy="12" r="8.5"/><path d="M12 5l2 7-2 7-2-7z"/><path d="M5 12l7-1.6 7 1.6-7 1.6z" opacity=".7"/>',
  raven:'<path d="M3 13.5c3-.5 5-4 9-4.5 3-.4 5.5 1.3 8.5.5-1 2-3 3.3-5.5 3.5l-2.5 4-1.2-3.2c-3 .3-6 .2-8.3-.3z"/><path d="M20.5 9.5l1.5-.5"/><circle cx="17.3" cy="10.3" r=".6" fill="currentColor"/><path d="M10 16.5L9 20M12.5 16l.5 4"/>',
  hurley:'<path d="M5 3l8 12.5"/><path d="M13 15.5c.5 3 3.5 5 7 4.5-.5-3-3-5.5-5.5-6.3"/><circle cx="6" cy="18" r="2.3"/><path d="M4.5 16.6c1 .6 2 1.6 2.5 3.3"/>',
  wheel:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2"/><path d="M12 3.5v6.5M12 14v6.5M3.5 12H10M14 12h6.5M6 6l4.6 4.6M13.4 13.4L18 18M18 6l-4.6 4.6M10.6 13.4L6 18"/>',
  peaks:'<path d="M2 19.5l6.5-11 4 6 3-4.5 6.5 9.5z"/><path d="M6.6 11.7l1.9 1.3 1.6-1.4M14.4 12.5l1.1.9 1-.8"/>',
  fidchell:'<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16"/><circle cx="9.3" cy="9.3" r="1.3" fill="currentColor"/><circle cx="14.7" cy="14.7" r="1.3" fill="currentColor"/><circle cx="14.7" cy="9.3" r="1.3"/>',
  book:'<path d="M3.5 5.5h6a2.5 2.5 0 0 1 2.5 2.5v11a2 2 0 0 0-2-2H3.5z"/><path d="M20.5 5.5h-6A2.5 2.5 0 0 0 12 8v11a2 2 0 0 1 2-2h6.5z"/><path d="M6 9h3.5M14.5 9H18"/>',
  oak:'<path d="M12 21v-6"/><path d="M12 15c-5 0-8-2.5-8-6 0-2.5 2-3.5 3.5-3 0-2 2-3.5 4.5-3 2.5-.5 4.5 1 4.5 3 1.5-.5 3.5.5 3.5 3 0 3.5-3 6-8 6z"/><path d="M9 21h6"/>',
  harp:'<path d="M6.5 3.5v17h3L19 7.5"/><path d="M6.5 3.5c4.5 0 7.5 3 12.5 4"/><path d="M9.5 5.2v12.3M12.5 6.3v7.3M15.5 7.2v3"/>',
  chalice:'<path d="M6.5 4h11c0 5.5-2.5 8-5.5 8s-5.5-2.5-5.5-8z"/><path d="M12 12v5.5"/><path d="M8 20.5c1-2 7-2 8 0z"/>',
  knot:'<path d="M0 0c0-4 4-6 7-4s2 7-2 7" transform="translate(12 12.5) scale(1.05)"/><path d="M0 0c0-4 4-6 7-4s2 7-2 7" transform="translate(12 12.5) rotate(120) scale(1.05)"/><path d="M0 0c0-4 4-6 7-4s2 7-2 7" transform="translate(12 12.5) rotate(240) scale(1.05)"/>'
};
const CELTIC_FOR = {'📥':'scroll','✉️':'scroll','🧾':'scroll','💼':'quill','📝':'quill','✏️':'quill','🏠':'roundhouse','🏢':'roundhouse','🛒':'basket','🛍️':'basket','💡':'awen','🧠':'awen','✳️':'suncross','☀️':'suncross','🧭':'compass','🗺️':'compass','🤖':'raven','🏒':'hurley','🚴':'wheel','🚲':'wheel','🚗':'wheel','⛷️':'peaks','⛰️':'peaks','❄️':'peaks','🎲':'fidchell','🎮':'fidchell','🧩':'fidchell','📚':'book','📖':'book','🎓':'book','🌳':'oak','🌱':'oak','🌸':'oak','🎵':'harp','🎸':'harp','🍷':'chalice','☕':'chalice','🍳':'chalice','📌':'knot','⭐':'knot'};
const ART = {
  sword:'<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="50" cy="11" r="3.2"/><path d="M48 14.5h4v13h-4z"/><path d="M35 30c5-4 25-4 30 0"/><path d="M47.6 31v29M52.4 31v29M50 31v29"/><path d="M12 89c-2-13 8-24 20-26 7-8 25-10 36-3 13 2 22 13 19 29z"/><path d="M27 76l7-3M64 73l6 3M44 82l9-1"/><path d="M6 89h88"/></svg>',
  grail:'<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M50 4v9M34 9l5 8M66 9l-5 8M24 18l7 5M76 18l-7 5"/><path d="M30 28h40c0 22-9 32-20 32S30 50 30 28z"/><path d="M33 36h34"/><path d="M50 60v14"/><circle cx="50" cy="67" r="3"/><path d="M34 88c3-9 29-9 32 0z"/></svg>',
  table:'<svg class="art" viewBox="-50 -50 100 100" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle r="44"/><circle r="40.5"/><circle r="31"/><circle r="9"/>'+Array.from({length:12},(_,i)=>`<g transform="rotate(${i*30})"><path d="M0 -9V-31"/><path d="M0 -33 2 -36.2 0 -39.4 -2 -36.2Z"/></g>`).join('')+'<path d="M0 0c0-4 4-6 7-4s2 7-2 7"/><path transform="rotate(120)" d="M0 0c0-4 4-6 7-4s2 7-2 7"/><path transform="rotate(240)" d="M0 0c0-4 4-6 7-4s2 7-2 7"/></svg>'
};
const sv = (d, s=20, w=2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  back: sv('<path d="M15 18l-6-6 6-6"/>',22),
  search: sv('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
  moon: sv('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>'),
  sun: sv('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  more: sv('<circle cx="12" cy="5" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/>'),
  plus: sv('<path d="M12 5v14M5 12h14"/>'),
  send: sv('<path d="M5 12h14M13 6l6 6-6 6"/>',20,2.2),
  check: sv('<path d="M5 12l5 5 9-10"/>',14,2.6),
  checkL: sv('<path d="M5 12l5 5 9-10"/>',20,2.4),
  checkS: sv('<path d="M5 12l5 5 9-10"/>',12,3.2),
  pin: sv('<path d="M9 4h6l-1 6 4 4H6l4-4z"/><path d="M12 14v6"/>',16),
  pinM: sv('<path d="M9 4h6l-1 6 4 4H6l4-4z"/><path d="M12 14v6"/>'),
  pinS: sv('<path d="M9 4h6l-1 6 4 4H6l4-4z"/><path d="M12 14v6"/>',13),
  trash: sv('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
  move: sv('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M10 13h6M13 10l3 3-3 3"/>'),
  copyTo: sv('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
  copy: sv('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>'),
  flag: sv('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor"/>'),
  edit: sv('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>'),
  select: sv('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'),
  x: sv('<path d="M6 6l12 12M18 6L6 18"/>'),
  xS: sv('<path d="M6 6l12 12M18 6L6 18"/>',14,2.4),
  list: sv('<path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.5 6l1.5 1.5L7.5 5M3.5 12l1.5 1.5 2.5-2.5M3.5 18l1.5 1.5 2.5-2.5"/>'),
  image: sv('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>'),
  archive: sv('<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/>'),
  settings: sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>'),
  globe: sv('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
  eye: sv('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff: sv('<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.8M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
  filter: sv('<path d="M4 5h16l-6 8v6l-4-2v-4z"/>'),
  restore: sv('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
  download: sv('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
  upload: sv('<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>'),
  doc: sv('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>'),
  newThread: sv('<path d="M4 5h16v11H8l-4 4z"/><path d="M12 8v5M9.5 10.5h5"/>'),
  cal: sv('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
  calS: sv('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',12,2.2),
  clockS: sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',12,2.2),
  bell: sv('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
  gcal: sv('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4"/>'),
  chev: sv('<path d="M6 9l6 6 6-6"/>',18),
  dia: ''
};
function knot(){ return `<svg class="knot" height="18" aria-hidden="true"><rect width="100%" height="18" fill="url(#knotP)"/></svg>`; }

/* =========================================================
   i18n
   ========================================================= */
const T = {
  en:{
    threads:'threads', notesN:n=>`${n} ${n===1?'note':'notes'}`, openN:n=>`${n} open`,
    today:'Today', yesterday:'Yesterday', priority:'Priority',
    pri:['Low','Normal','Higher','Highest'],
    write:'Write a note…', writeList:'One item per line…', writeListDesk:'One item per line (Shift+Enter)…', listTitle:'List title (optional)',
    checklist:'Checklist', photo:'Photo', addWhat:'Add to note', editing:'Editing note', cancel:'Cancel', save:'Save',
    pinned:'Pinned', done:'Done', edited:'edited', noNotes:'No notes yet. Write the first one below.',
    copyText:'Copy text', edit:'Edit', moveTo:'Move to…', copyTo:'Copy to…', changePri:'Priority…', pin:'Pin', unpin:'Unpin',
    markDone:'Mark as done', markUndone:'Mark as not done', select:'Select', del:'Delete',
    copied:'Copied', copyFail:'Copy failed',
    movedTo:n=>`Moved to ${n}`, copiedTo:n=>`Copied to ${n}`, undo:'Undo', toTrash:'Moved to Trash', toTrashN:n=>`${n} notes moved to Trash`,
    selected:n=>`${n} selected`, newThread:'New thread', editThread:'Edit thread', name:'Name', emoji:'Emoji', color:'Colour',
    create:'Create', pinThread:'Pin thread', unpinThread:'Unpin thread', archive:'Archive', unarchive:'Unarchive',
    deleteThread:'Delete thread', hideDone:'Hide done', showDone:'Show done', filterPri:'Filter by priority', selectNotes:'Select notes',
    hiddenDone:n=>`${n} done hidden`, show:'Show', clear:'Clear', all:'All',
    archived:'Archived', archivedThread:'This thread is archived (read-only).', trash:'Trash', settings:'Backup & settings',
    searchPh:'Search notes and threads', searchIn:n=>`Search in ${n}`, allThreads:'All threads', thisThread:n=>`Only ${n}`,
    inclDone:'Include done', resThreads:'Threads', resNotes:'Notes', noRes:'Nothing found.', typeToSearch:'Type to search across all your notes.',
    emptyTrash:'Empty trash', restore:'Restore', delForever:'Delete forever', trashEmpty:'Trash is empty.',
    daysLeft:n=>`Deleted forever in ${n} ${n===1?'day':'days'}`, todayForever:'Will be deleted forever today', trashInfo:'Deleted notes stay here for 30 days.',
    confirmEmpty:'Empty the trash? This cannot be undone.', confirmDelForever:'Delete this note forever? This cannot be undone.',
    restoredTo:n=>`Restored to ${n}`, noArchived:'No archived threads.',
    confirmDelThread:(n,c)=>`Delete “${n}”? Its ${c} notes will move to Trash for 30 days.`, threadDeleted:'Thread deleted',
    language:'Language', theme:'Appearance', system:'System', light:'Light', dark:'Dark',
    backup:'Backup', backupNow:'Back up to file', backupSub:'Full backup (JSON), optional password',
    restoreFile:'Restore from file', restoreSub:'Replaces all current data', exportMd:'Export to Markdown', exportMdSub:'Readable text, one file',
    lastBackup:d=>`Last backup: ${d}`, never:'never', backupNudge:'You haven’t backed up this week.', later:'Later', backUp:'Back up',
    pwOptional:'Password (optional)', pwRepeat:'Repeat password', pwMismatch:'Passwords don’t match.', pwHint:'Leave empty for an unencrypted backup. A lost password cannot be recovered.',
    pwEnter:'This backup is encrypted. Enter its password.', pwWrong:'Wrong password or damaged file.', password:'Password',
    confirmRestore:(t,n)=>`Replace all current data with this backup? (${t} threads, ${n} notes)`, restoredOk:'Backup restored',
    badFile:'This is not a MemoChat backup.', saved:'Saved', declined:'Download cancelled',
    noDownload:'Downloads aren’t available here. Copy the content instead:', copyAll:'Copy all',
    about:'About', aboutText:'Prototype. Data is stored only in this browser on this device — use backups.', reset:'Reset demo data', confirmReset:'Delete all data and load the demo data again?',
    storageOff:'Storage is unavailable here — changes will be lost on reload.',
    history:'Edit history', original:'Original', restoreVer:'Restore this version', restoredVer:'Version restored',
    emptyNote:'Write something first.', notFound:'Note no longer exists.', inboxLocked:'Inbox can’t be archived or deleted.',
    chooseThread:'Choose a thread on the left', chooseSub:'Notes are like messages to yourself.',
    deleteSel:n=>`Move ${n} notes to Trash?`, move:'Move', copyV:'Copy', photoMsg:'Photo', listMsg:'Checklist',
    thisDevice:'Language / Jazyk', defaultLook:'Default', emojiHint:'or type any emoji', listDone:'All ticked — note marked as done',
    dates:'Dates', deadline:'Date…', setDate:'Date and time', addDate:'Date', today2:'Today', tomorrow:'Tomorrow', inWeek:'In a week', pickDate:'Pick date and time…', removeDate:'Remove date',
    date:'Date', timeOpt:'Time (optional)', allDay:'all day', overdue:'Overdue', inMin:n=>`in ${n} min`, inH:n=>`in ${n} h`,
    next30:'Next 30 days', later:'Later', laterSub:'Tap a date to see what it is', showDoneD:'Show done', hideDoneD:'Hide done', copyList:'Copy as text',
    noDates:'No dates ahead', noDatesSub:'Add a date to any note from its menu (hold or right-click) or with + while writing.',
    soonAlert:(r,x)=>`${r}: ${x}`, open:'Open', dateSet:d=>`Date: ${d}`, dateRemoved:'Date removed', earlierDone:'Earlier (done)',
    emptyThreadT:'A blank page', archEmptyT:'Nothing in the archive',
    remind:'Reminder', rAt:'At the time', r15:'15 min before', r1h:'1 hour before', r1d:'1 day before', rMorning:'On the day at 9:00', rDayBefore:'Day before at 9:00', rCustom:'Custom date and time…', rNone:'No reminder', remindAt:'Remind me at',
    remindAlert:(x,d)=>`Reminder: ${x} · ${d}`, remindSet:r=>`Reminder: ${r}`,
    addGcal:'Add to Google Calendar', gcalAgain:'In Google Calendar · add again', calTitle:'Google Calendar',
    calChanged:o=>`This date is in your calendar as ${o}. Update it there too.`, calRemoved:o=>`You removed the date, but your calendar still has the event ${o}. Delete it there too.`,
    calDone:o=>`The note is done. Your calendar still has the event ${o} — delete it there if you don’t need it.`, calDeleted:o=>`The note is in Trash. Your calendar still has the event ${o}.`,
    openCal:'Open calendar', addNew:'Add new', fixed:'Fixed', laterBtn:'Later', calMismatch:'calendar differs', kbHint:'Not quite above the keyboard? Drag the small bar above the text field.',
  },
  cs:{
    threads:'vláken', notesN:n=>`${n} ${n===1?'poznámka':(n>=2&&n<=4?'poznámky':'poznámek')}`, openN:n=>`${n} ${n===1?'otevřená':(n>=2&&n<=4?'otevřené':'otevřených')}`,
    today:'Dnes', yesterday:'Včera', priority:'Priorita',
    pri:['Nízká','Běžná','Vyšší','Nejvyšší'],
    write:'Napiš poznámku…', writeList:'Každá položka na nový řádek…', writeListDesk:'Položka na řádek (Shift+Enter)…', listTitle:'Název seznamu (nepovinné)',
    checklist:'Seznam s políčky', photo:'Fotka', addWhat:'Přidat do poznámky', editing:'Úprava poznámky', cancel:'Zrušit', save:'Uložit',
    pinned:'Připnuto', done:'Hotovo', edited:'upraveno', noNotes:'Zatím žádné poznámky. Napiš první dole.',
    copyText:'Kopírovat text', edit:'Upravit', moveTo:'Přesunout do…', copyTo:'Kopírovat do…', changePri:'Priorita…', pin:'Připnout', unpin:'Odepnout',
    markDone:'Označit jako hotové', markUndone:'Označit jako nehotové', select:'Vybrat', del:'Smazat',
    copied:'Zkopírováno', copyFail:'Kopírování se nezdařilo',
    movedTo:n=>`Přesunuto do ${n}`, copiedTo:n=>`Zkopírováno do ${n}`, undo:'Zpět', toTrash:'Přesunuto do koše', toTrashN:n=>`Do koše: ${n}`,
    selected:n=>`Vybráno: ${n}`, newThread:'Nové vlákno', editThread:'Upravit vlákno', name:'Název', emoji:'Emoji', color:'Barva',
    create:'Vytvořit', pinThread:'Připnout vlákno', unpinThread:'Odepnout vlákno', archive:'Archivovat', unarchive:'Obnovit z archivu',
    deleteThread:'Smazat vlákno', hideDone:'Skrýt hotové', showDone:'Zobrazit hotové', filterPri:'Filtrovat podle priority', selectNotes:'Vybrat poznámky',
    hiddenDone:n=>`Skryté hotové: ${n}`, show:'Zobrazit', clear:'Zrušit', all:'Vše',
    archived:'Archiv', archivedThread:'Vlákno je v archivu (jen pro čtení).', trash:'Koš', settings:'Záloha a nastavení',
    searchPh:'Hledat v poznámkách a vláknech', searchIn:n=>`Hledat v ${n}`, allThreads:'Všechna vlákna', thisThread:n=>`Jen ${n}`,
    inclDone:'Včetně hotových', resThreads:'Vlákna', resNotes:'Poznámky', noRes:'Nic nenalezeno.', typeToSearch:'Piš a hledej ve všech poznámkách.',
    emptyTrash:'Vyprázdnit koš', restore:'Obnovit', delForever:'Trvale smazat', trashEmpty:'Koš je prázdný.',
    daysLeft:n=>`Trvale smazáno za ${n} ${n===1?'den':(n>=2&&n<=4?'dny':'dní')}`, todayForever:'Dnes bude trvale smazána', trashInfo:'Smazané poznámky tu zůstanou 30 dní.',
    confirmEmpty:'Opravdu chcete vyprázdnit koš? Tuto akci nelze vrátit.', confirmDelForever:'Opravdu chcete tuto poznámku trvale smazat? Tuto akci nelze vrátit.',
    restoredTo:n=>`Obnoveno do ${n}`, noArchived:'Žádná archivovaná vlákna.',
    confirmDelThread:(n,c)=>`Smazat „${n}“? Poznámky (${c}) půjdou na 30 dní do koše.`, threadDeleted:'Vlákno smazáno',
    language:'Jazyk', theme:'Vzhled', system:'Systém', light:'Světlý', dark:'Tmavý',
    backup:'Záloha', backupNow:'Zálohovat do souboru', backupSub:'Úplná záloha (JSON), volitelně s heslem',
    restoreFile:'Obnovit ze souboru', restoreSub:'Nahradí všechna současná data', exportMd:'Export do Markdownu', exportMdSub:'Čitelný text v jednom souboru',
    lastBackup:d=>`Poslední záloha: ${d}`, never:'nikdy', backupNudge:'Tento týden jsi nezálohoval/a.', later:'Později', backUp:'Zálohovat',
    pwOptional:'Heslo (nepovinné)', pwRepeat:'Heslo znovu', pwMismatch:'Hesla se neshodují.', pwHint:'Bez hesla vznikne nešifrovaná záloha. Zapomenuté heslo nejde obnovit.',
    pwEnter:'Záloha je šifrovaná. Zadej heslo.', pwWrong:'Špatné heslo nebo poškozený soubor.', password:'Heslo',
    confirmRestore:(t,n)=>`Nahradit všechna současná data touto zálohou? (vláken: ${t}, poznámek: ${n})`, restoredOk:'Záloha obnovena',
    badFile:'Tohle není záloha MemoChatu.', saved:'Uloženo', declined:'Stahování zrušeno',
    noDownload:'Stahování tu není dostupné. Zkopíruj obsah:', copyAll:'Kopírovat vše',
    about:'O aplikaci', aboutText:'Prototyp. Data jsou uložená jen v tomto prohlížeči na tomto zařízení — zálohuj.', reset:'Obnovit ukázková data', confirmReset:'Smazat všechna data a nahrát znovu ukázková?',
    storageOff:'Úložiště tu není dostupné — změny se po obnovení stránky ztratí.',
    history:'Historie úprav', original:'Původní znění', restoreVer:'Obnovit tuto verzi', restoredVer:'Verze obnovena',
    emptyNote:'Nejdřív něco napiš.', notFound:'Poznámka už neexistuje.', inboxLocked:'Inbox nejde archivovat ani smazat.',
    chooseThread:'Vyber vlákno vlevo', chooseSub:'Poznámky jako zprávy sám sobě.',
    deleteSel:n=>`Přesunout ${n} poznámek do koše?`, move:'Přesunout', copyV:'Kopírovat', photoMsg:'Fotka', listMsg:'Seznam',
    thisDevice:'Language / Jazyk', defaultLook:'Výchozí', emojiHint:'nebo napiš libovolné emoji', listDone:'Vše odškrtnuto — poznámka je hotová',
    dates:'Termíny', deadline:'Termín…', setDate:'Datum a čas', addDate:'Termín', today2:'Dnes', tomorrow:'Zítra', inWeek:'Za týden', pickDate:'Vybrat datum a čas…', removeDate:'Odebrat termín',
    date:'Datum', timeOpt:'Čas (nepovinný)', allDay:'celý den', overdue:'Po termínu', inMin:n=>`za ${n} min`, inH:n=>`za ${n} h`,
    next30:'Příštích 30 dní', later:'Později', laterSub:'Ťukni na datum a uvidíš, o co jde', showDoneD:'Zobrazit hotové', hideDoneD:'Skrýt hotové', copyList:'Kopírovat jako text',
    noDates:'Žádné termíny', noDatesSub:'Termín přidáš z nabídky poznámky (podržení / pravé tlačítko) nebo přes + při psaní.',
    soonAlert:(r,x)=>`${r.charAt(0).toUpperCase()+r.slice(1)}: ${x}`, open:'Otevřít', dateSet:d=>`Termín: ${d}`, dateRemoved:'Termín odebrán', earlierDone:'Dříve (hotové)',
    emptyThreadT:'Čistý list', archEmptyT:'Archiv je prázdný',
    remind:'Upozornění', rAt:'V čas termínu', r15:'15 min předem', r1h:'1 hodinu předem', r1d:'1 den předem', rMorning:'V den termínu v 9:00', rDayBefore:'Den předem v 9:00', rCustom:'Vlastní datum a čas…', rNone:'Bez upozornění', remindAt:'Upozornit',
    remindAlert:(x,d)=>`Připomínka: ${x} · ${d}`, remindSet:r=>`Upozornění: ${r}`,
    addGcal:'Přidat do Google Kalendáře', gcalAgain:'V Google Kalendáři · přidat znovu', calTitle:'Google Kalendář',
    calChanged:o=>`Tento termín je v kalendáři jako ${o}. Uprav ho i tam.`, calRemoved:o=>`Termín jsi odebral, ale v kalendáři je pořád událost ${o}. Smaž ji i tam.`,
    calDone:o=>`Poznámka je hotová. V kalendáři zůstala událost ${o} — pokud ji nepotřebuješ, smaž ji tam.`, calDeleted:o=>`Poznámka je v koši. V kalendáři zůstala událost ${o}.`,
    openCal:'Otevřít kalendář', addNew:'Přidat nový', fixed:'Vyřešeno', laterBtn:'Později', calMismatch:'kalendář nesedí', kbHint:'Pole není přesně nad klávesnicí? Posuň ho za malou lištu nad textem.',
  }
};
Object.assign(T.en,{
  welcomeT:'Welcome to MemoChat', welcomeSub:'Have a backup from the prototype? Restore it to bring your notes over.', dismiss:'Dismiss',
  updateReady:'A new version of MemoChat is ready.', reload:'Update', version:v=>`Version ${v}`,
  aboutText:'Your notes are stored only on this device, in this browser. They are not uploaded anywhere — back up regularly.',
  offlineReady:'MemoChat now works offline.'
});
Object.assign(T.cs,{
  welcomeT:'Vítej v MemoChatu', welcomeSub:'Máš zálohu z prototypu? Obnov ji a poznámky se přenesou.', dismiss:'Zavřít',
  updateReady:'Je připravená nová verze MemoChatu.', reload:'Aktualizovat', version:v=>`Verze ${v}`,
  aboutText:'Poznámky jsou uložené jen v tomto zařízení, v tomto prohlížeči. Nikam se nenahrávají — pravidelně zálohuj.',
  offlineReady:'MemoChat teď funguje i offline.'
});
function t(k,...a){ const L=T[S.settings.lang]||T.en; const v=L[k]!==undefined?L[k]:T.en[k]; return typeof v==='function'?v(...a):v; }
function loc(){ return S.settings.lang==='cs'?'cs-CZ':'en-GB'; }

/* =========================================================
   Data
   ========================================================= */
// colours of the default threads (kept for existing data)
const COLORS = {gray:'#8A8F98',blue:'#3D6FB6',purple:'#8A5CC2',pink:'#D16A9B',indigo:'#5866C0',teal:'#219C90',slate:'#64748B',navy:'#2F4B7C',brown:'#8B6A55'};
// general 24-colour palette for the thread picker
const PALETTE = ['#E53935','#D81B60','#F06292','#8E24AA','#5E35B1','#3949AB','#2B4C7E','#1E88E5',
                 '#039BE5','#00ACC1','#00897B','#26A69A','#43A047','#7CB342','#C0CA33','#FDD835',
                 '#FFB300','#FB8C00','#F4511E','#C9A24A','#8D6E63','#6D4C41','#757575','#546E7A'];
const EMOJIS = ['📥','💼','🏠','🛒','💡','📝','📌','📚','🎓','✏️','📅','⏰','✅','⭐','❤️','🔥','🎯','🚀','💰','💳','🧾','📈','🏦','🏢',
  '👨‍👩‍👧','👶','🐶','🐱','🐾','🌱','🌳','🌸','☀️','🌙','❄️','🌊','⛰️','🏖️','✈️','🚗','🚲','🚆','🗺️','🧳',
  '🍳','🍕','🍎','🥗','☕','🍷','🎂','🛍️','👕','💊','🩺','🏃','💪','🧘','⚽','🏀','🎾','🏒','⛷️','🚴','🎲','🎮',
  '🎵','🎸','🎬','📷','🎨','📖','🧩','💻','📱','🖥️','🔧','🛠️','🔑','🔒','💬','📞','✉️','🎁','🎉','🙏','🌍','🇨🇿',
  '🇬🇧','🇰🇷','🏴󠁧󠁢󠁷󠁬󠁳󠁿','🇩🇪','🇫🇷','🇪🇸','🇮🇹','🇯🇵','🤖','✳️','🧭','🧠'];
const DEF_LIGHT = '<svg width="62%" height="62%" viewBox="-12 -12 24 24" fill="none" stroke="#2B4C7E" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M0 0c0-4 4-6 7-4s2 7-2 7"/><path transform="rotate(120)" d="M0 0c0-4 4-6 7-4s2 7-2 7"/><path transform="rotate(240)" d="M0 0c0-4 4-6 7-4s2 7-2 7"/></svg>';
const DEF_DARK = '<svg width="52%" height="58%" viewBox="0 0 22 24" fill="none" stroke="#111A2E" stroke-width="1.6" aria-hidden="true"><path d="M8 3h6v2c4 1 6 4 6 8s-3 8-9 8-9-4-9-8 2-7 6-8z"/></svg>';
const DAY = 86400000;
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-'+Date.now().toString(36)+Math.random().toString(36).slice(2));

let S = {threads:[],notes:[],settings:{}};
const DEFAULT_SETTINGS = {theme:null, lang:'en', lastBackup:null, nudgeSnooze:null, recent:[], welcome:false};

const APP_VERSION = '1.0.0';
const DEFAULT_THREADS = [
  ['Inbox','📥','gray',{system:'inbox',pinned:true}],['Work','💼','blue'],['Home','🏠','purple'],['Shopping','🛒','pink'],['Ideas','💡','indigo'],
  ['Korean','🇰🇷','teal'],['Welsh','🏴󠁧󠁢󠁷󠁬󠁳󠁿','teal'],['Claude','✳️','slate'],['Copilot','🧭','slate'],['AI general','🤖','slate'],
  ['NHL','🏒','navy'],['Cycling','🚴','navy'],['Skiing','⛷️','navy']
];
// first run: the 14 default threads, no notes
function seed(){
  const now = Date.now();
  const threads = DEFAULT_THREADS.map(([name,emoji,color,extra],i)=>Object.assign({id:uid(),name,emoji,color,pinned:false,pinnedAt:null,archived:false,hideDone:false,createdAt:now,lastActivity:now-i},extra||{}));
  threads[0].pinnedAt = now;
  return {threads, notes:[], settings:Object.assign({}, DEFAULT_SETTINGS, {lang:S.settings.lang||'en', theme:S.settings.theme||null, welcome:true})};
}

/* ---------- data sanitizing (backups and stored data are untrusted input) ---------- */
const RE_ID = /^[A-Za-z0-9_-]{1,80}$/;
const RE_PHOTO = /^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+=*$/;
const RE_DATE = /^\d{4}-\d{2}-\d{2}$/, RE_TIME = /^\d{2}:\d{2}$/;
const num = (v, d=null) => (typeof v==='number' && isFinite(v)) ? v : d;
const str = (v, max=200000) => typeof v==='string' ? v.slice(0,max) : '';
function cleanDue(d){
  if(!d || typeof d!=='object' || !RE_DATE.test(d.date||'')) return null;
  const time = RE_TIME.test(d.time||'') ? d.time : null;
  let remind = d.remind;
  if(remind && typeof remind==='object'){
    const at = remind.at;
    remind = (typeof at==='string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(at)) || num(at)!==null ? {at} : undefined;
  }
  else if(!['at','15m','1h','1d','morning','none'].includes(remind)) remind = undefined;
  const o = {date:d.date, time}; if(remind!==undefined) o.remind=remind; return o;
}
function sanitizeData(data){
  const idMap = new Map();
  // valid ids are kept; invalid string ids are remapped consistently (thread ↔ note links survive); missing ids get a fresh one
  const fixId = v => { if(typeof v==='string' && RE_ID.test(v)) return v; if(typeof v!=='string') return uid(); if(!idMap.has(v)) idMap.set(v, uid()); return idMap.get(v); };
  const threads = (Array.isArray(data.threads)?data.threads:[]).filter(x=>x && typeof x==='object').map(x=>({
    id:fixId(x.id), name:str(x.name,200)||'?', emoji:x.emoji?str(x.emoji,16):null, color:colorOf(x.color)?x.color:null,
    system:x.system==='inbox'?'inbox':undefined, pinned:!!x.pinned, pinnedAt:num(x.pinnedAt), archived:!!x.archived, hideDone:!!x.hideDone,
    createdAt:num(x.createdAt,Date.now()), lastActivity:num(x.lastActivity,Date.now()), deletedAt:num(x.deletedAt)
  }));
  threads.forEach(x=>{ if(!x.system) delete x.system; if(x.deletedAt===null) delete x.deletedAt; });
  const tids = new Set(threads.map(x=>x.id));
  const notes = (Array.isArray(data.notes)?data.notes:[]).filter(n=>n && typeof n==='object').map(n=>{
    const o = {
      id:fixId(n.id), threadId:fixId(n.threadId), type:n.type==='list'?'list':'text', text:str(n.text), title:str(n.title,2000),
      items:(Array.isArray(n.items)?n.items:[]).filter(i=>i&&typeof i==='object').map(i=>({id:fixId(i.id), text:str(i.text,5000), done:!!i.done})),
      photo:(typeof n.photo==='string' && RE_PHOTO.test(n.photo)) ? n.photo : null,
      priority:[0,1,2,3].includes(n.priority)?n.priority:1, done:!!n.done, doneAt:num(n.doneAt), pinned:!!n.pinned, pinnedAt:num(n.pinnedAt),
      createdAt:num(n.createdAt,Date.now()), editedAt:num(n.editedAt),
      history:(Array.isArray(n.history)?n.history:[]).filter(v=>v&&typeof v==='object').map(v=>({type:v.type==='list'?'list':'text', text:str(v.text), title:str(v.title,2000),
        items:(Array.isArray(v.items)?v.items:[]).filter(i=>i&&typeof i==='object').map(i=>({id:fixId(i.id), text:str(i.text,5000), done:!!i.done})), at:num(v.at,Date.now())})),
      deletedAt:num(n.deletedAt), due:cleanDue(n.due)
    };
    if(num(n.remindFired)!==null) o.remindFired = n.remindFired;
    if(n.cal && typeof n.cal==='object' && RE_DATE.test(n.cal.date||'')) o.cal = {date:n.cal.date, time:RE_TIME.test(n.cal.time||'')?n.cal.time:null};
    return o;
  }).filter(n=>tids.has(n.threadId));
  const s = (data.settings && typeof data.settings==='object') ? data.settings : {};
  const settings = {
    theme:['light','dark'].includes(s.theme)?s.theme:null, lang:s.lang==='cs'?'cs':'en', lastBackup:num(s.lastBackup), nudgeSnooze:num(s.nudgeSnooze),
    recent:(Array.isArray(s.recent)?s.recent:[]).filter(x=>tids.has(x)).slice(0,5), kbOffset:num(s.kbOffset), kbHint:!!s.kbHint, welcome:!!s.welcome
  };
  return {threads, notes, settings};
}

/* ---------- storage (IndexedDB → localStorage → memory) ---------- */
const Store = {
  mode:'memory', db:null,
  async init(){
    try{
      this.db = await new Promise((res,rej)=>{ const r=indexedDB.open('memochat',1); r.onupgradeneeded=()=>r.result.createObjectStore('kv'); r.onsuccess=()=>res(r.result); r.onerror=()=>rej(r.error); setTimeout(()=>rej('timeout'),3000); });
      this.mode='idb';
      try{ if(navigator.storage && navigator.storage.persist) navigator.storage.persist(); }catch(e){}
      return;
    }catch(e){}
    try{ localStorage.setItem('mc_t','1'); localStorage.removeItem('mc_t'); this.mode='ls'; }catch(e){ this.mode='memory'; }
  },
  async load(){
    try{
      if(this.mode==='idb') return await new Promise((res,rej)=>{ const r=this.db.transaction('kv').objectStore('kv').get('state'); r.onsuccess=()=>res(r.result||null); r.onerror=()=>rej(r.error); });
      if(this.mode==='ls'){ const s=localStorage.getItem('memochat_state'); return s?JSON.parse(s):null; }
    }catch(e){}
    return null;
  },
  async save(obj){
    try{
      if(this.mode==='idb') return await new Promise((res,rej)=>{ const tx=this.db.transaction('kv','readwrite'); tx.objectStore('kv').put(obj,'state'); tx.oncomplete=()=>res(); tx.onerror=()=>rej(tx.error); });
      if(this.mode==='ls') localStorage.setItem('memochat_state', JSON.stringify(obj));
    }catch(e){ console.warn('save failed', e); }
  }
};
let saveTimer=null;
function persist(){ clearTimeout(saveTimer); saveTimer=setTimeout(()=>Store.save(S),250); }
function commit(){ persist(); render(); }

/* =========================================================
   Helpers
   ========================================================= */
const $ = (s,r=document)=>r.querySelector(s);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function linkify(s){
  return esc(s).replace(/\b((https?:\/\/|www\.)[^\s<]+[^\s<.,;:!?)\]'"])/g, m=>{ const href = m.startsWith('www.')?'https://'+m:m; return `<a href="${href.replace(/&amp;/g,'&').replace(/"/g,'%22')}" target="_blank" rel="noopener noreferrer">${m}</a>`; });
}
const thread = id => S.threads.find(x=>x.id===id);
const note = id => S.notes.find(x=>x.id===id);
const liveNotes = tid => S.notes.filter(n=>n.threadId===tid && !n.deletedAt).sort((a,b)=>a.createdAt-b.createdAt);
const activeThreads = () => S.threads.filter(x=>!x.archived && !x.deletedAt);
function sortedThreads(list){
  return list.slice().sort((a,b)=>{
    if(a.pinned!==b.pinned) return a.pinned?-1:1;
    if(a.pinned) return (a.pinnedAt||0)-(b.pinnedAt||0);
    return b.lastActivity-a.lastActivity;
  });
}
const isFine = () => matchMedia('(pointer:fine)').matches;
const isWide = () => matchMedia('(min-width:860px)').matches;
function fmtTime(ts){ return new Date(ts).toLocaleTimeString(loc(),{hour:'2-digit',minute:'2-digit',hour12:false}); }
function startOfDay(ts){ const d=new Date(ts); d.setHours(0,0,0,0); return d.getTime(); }
function dayLabel(ts){
  const d0=startOfDay(Date.now()), d=startOfDay(ts), diff=Math.round((d0-d)/DAY);
  const dark = effTheme()==='dark';
  if(diff===0) return (dark?'오늘 · ':'')+t('today');
  if(diff===1) return (dark?'어제 · ':'')+t('yesterday');
  const sameYear = new Date(ts).getFullYear()===new Date().getFullYear();
  const opts = (d0-d) < 6*DAY ? {weekday:'long', day:'numeric', month:'long'} : {day:'numeric', month:'long', year: sameYear?undefined:'numeric'};
  const s = new Date(ts).toLocaleDateString(loc(), opts);
  return s.charAt(0).toUpperCase()+s.slice(1);
}
function shortWhen(ts){
  const d0=startOfDay(Date.now()), d=startOfDay(ts), diff=Math.round((d0-d)/DAY);
  if(diff===0) return fmtTime(ts);
  if(diff===1) return t('yesterday');
  if(diff<6) return new Date(ts).toLocaleDateString(loc(),{weekday:'short'});
  return new Date(ts).toLocaleDateString(loc(),{day:'numeric',month:'numeric'});
}
function fullWhen(ts){ return new Date(ts).toLocaleString(loc(),{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}); }
function noteText(n){
  if(n.type==='list'){ return [n.title, ...n.items.map(i=>(i.done?'☑ ':'☐ ')+i.text)].filter(Boolean).join('\n'); }
  return n.text||'';
}
function preview(n){
  if(!n) return '';
  if(n.type==='list') return '☑ '+(n.title || n.items.map(i=>i.text).join(', '));
  if(n.photo) return '📷 '+(n.text || t('photoMsg'));
  return n.text;
}
function colorOf(c){ if(!c) return null; return COLORS[c] || (/^#[0-9a-f]{6}$/i.test(c)?c:null); }
// no colour + no emoji = default look of the theme (gold triskele / porcelain moon jar)
function avatar(th, cls='lg'){
  const col = colorOf(th.color), dark = effTheme()==='dark';
  const bg = col || (dark ? '#EDE7DA' : '#D9B45A');
  let inner;
  const ck = th.emoji && CELTIC_FOR[th.emoji];
  const ink = col ? '#FFFBF2' : (dark ? '#111A2E' : '#2B4C7E');
  if(ck) inner = `<svg class="tic" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:${ink}">${CELTIC[ck]}</svg>`;
  else if(th.emoji) inner = esc(th.emoji);
  else if(col) inner = `<span class="ava-letter">${esc((th.name||'?').trim().charAt(0).toUpperCase())}</span>`;
  else inner = dark ? DEF_DARK : DEF_LIGHT;
  return `<div class="avatar ${cls}" style="background:${bg}">${inner}</div>`;
}
function effTheme(){ return S.settings.theme || (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'); }
function applyTheme(){ const th=effTheme(); document.documentElement.dataset.theme=th; document.documentElement.lang=S.settings.lang; const m=$('meta[name=theme-color]'); if(m) m.content = th==='dark'?'#223E68':'#2B4C7E'; }
function themeBtn(){ const dark=effTheme()==='dark'; return `<button class="ib" data-act="toggle-theme" title="${dark?t('light'):t('dark')}" aria-label="${dark?t('light'):t('dark')}">${dark?I.sun:I.moon}</button>`; }
function bumpActivity(tid){ const th=thread(tid); if(th) th.lastActivity=Date.now(); }
/* ---------- deadlines ---------- */
const pad2 = n => String(n).padStart(2,'0');
const ymd = d => `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
function dueParts(due){ const [y,m,d]=due.date.split('-').map(Number); return {y,m,d}; }
function dueStart(due){ const {y,m,d}=dueParts(due); const [h,mi]=(due.time||'00:00').split(':').map(Number); return new Date(y,m-1,d,h,mi).getTime(); }
function dueEnd(due){ if(due.time) return dueStart(due); const {y,m,d}=dueParts(due); return new Date(y,m-1,d+1).getTime(); }
function dueSort(due){ return dueStart(due) + (due.time?1:0); }
function dueDiff(due){ const {y,m,d}=dueParts(due); return Math.round((new Date(y,m-1,d).getTime()-startOfDay(Date.now()))/DAY); }
function isOverdue(n){ return !!n.due && !n.done && Date.now() >= dueEnd(n.due); }
function dueDay(due, long){
  const diff=dueDiff(due); if(diff===0) return t('today2'); if(diff===1) return t('tomorrow'); if(diff===-1) return t('yesterday');
  const {y,m,d}=dueParts(due); const sameY = y===new Date().getFullYear();
  const s = new Date(y,m-1,d).toLocaleDateString(loc(), long ? {weekday:'long',day:'numeric',month:'long',year:sameY?undefined:'numeric'} : {weekday:'short',day:'numeric',month:'short',year:sameY?undefined:'numeric'});
  return s.charAt(0).toUpperCase()+s.slice(1);
}
function dueFull(due){ const {y,m,d}=dueParts(due); const s=new Date(y,m-1,d).toLocaleDateString(loc(),{weekday:'short',day:'numeric',month:'numeric',year:'numeric'}); return s.charAt(0).toUpperCase()+s.slice(1)+' · '+(due.time||t('allDay')); }
function dueLabel(due){ return dueDay(due) + (due.time ? ' '+due.time : ''); }
function relIn(ms){ const m=Math.max(1,Math.round(ms/60000)); return m<60 ? t('inMin',m) : t('inH',Math.round(m/60)); }
function dueChip(n){
  if(!n.due) return '';
  const now=Date.now(), s=dueStart(n.due);
  let cls='due', txt=dueLabel(n.due), ic=n.due.time?I.clockS:I.calS;
  if(!n.done && isOverdue(n)){ cls+=' over'; txt=t('overdue')+' · '+txt; }
  else if(!n.done && (n.due.time ? s-now<DAY : dueDiff(n.due)===0)){ cls+=' soon'; if(n.due.time) txt+=' · '+relIn(s-now); }
  const cm = n.cal ? `<span class="cm">${calConflict(n)?'!':I.calS}</span>` : '';
  return `<span class="${cls}" data-act="due" title="${esc(dueFull(n.due)+' · '+t('remind')+': '+remindLabel(n.due))}">${ic}${esc(txt)}${cm}</span>`;
}
function dueNotes(){ return S.notes.filter(n=>n.due && !n.deletedAt && thread(n.threadId) && !thread(n.threadId).deletedAt && !thread(n.threadId).archived); }
function dueBadge(){ return dueNotes().filter(n=>!n.done && (isOverdue(n) || dueDiff(n.due)===0)).length; }
function noteSnippet(n){ return (n.type==='list' ? (n.title || n.items.map(i=>i.text).join(', ')) : (n.text || (n.photo?'📷 '+t('photoMsg'):''))).split('\n')[0]; }

function counts(tid){ const ns=liveNotes(tid); return {total:ns.length, open:ns.filter(n=>!n.done).length, red:ns.filter(n=>!n.done&&n.priority===3).length}; }

/* =========================================================
   UI state
   ========================================================= */
const ui = {
  left:'list',            // list | search | trash | archive | settings
  threadId:null, showThread:false,
  selecting:false, sel:new Set(),
  filter:null,            // null | Set of priorities
  pinIdx:0,
  comp:{pri:1, mode:'text', photo:null, editing:null},
  search:{q:'', scope:null, pri:new Set(), done:true, from:null},
};
let navDepth = 0;
function pushNav(){ try{ history.pushState({mc:navDepth+1},''); navDepth++; }catch(e){} }
// on-screen back never depends on browser history (the Claude app frame may ignore it)
function goBack(){ handleBack(); }
window.addEventListener('popstate',()=>{ navDepth=Math.max(0,navDepth-1); handleBack(); });
function handleBack(){
  if(closeTopOverlay()) return;
  if(ui.selecting){ exitSelect(); return; }
  if(!isWide() && ui.showThread){ closeThread(); return; }
  if(ui.left==='search' && ui.search.from && !isWide()){ ui.left='list'; ui.showThread=true; ui.threadId=ui.search.from; ui.search.from=null; render(); return; }
  if(ui.left!=='list'){ ui.left='list'; ui.search.from=null; render(); return; }
}

/* =========================================================
   Render
   ========================================================= */
const L = $('#left'), R = $('#right');
function render(){
  applyTheme();
  $('#app').classList.toggle('show-thread', ui.showThread && !!ui.threadId);
  renderLeft();
  renderRight();
}

/* ---------- left pane ---------- */
let leftShell = null;
function renderLeft(){
  const v = ui.left;
  if(v==='list') return renderList();
  if(v==='search') return renderSearch();
  if(v==='trash') return renderTrash();
  if(v==='archive') return renderArchive();
  if(v==='settings') return renderSettings();
  if(v==='agenda') return renderAgenda();
}
function simpleHeader(title, extra=''){
  return `<header class="hdr"><div class="hdr-row"><button class="ib" data-act="back" aria-label="Back">${I.back}</button><div class="ttl"><div class="name">${esc(title)}</div></div>${extra}${themeBtn()}</div></header>${knot()}`;
}
function renderList(){
  const list = sortedThreads(activeThreads());
  const nudge = needsNudge();
  let rows = ''; let sepDone=false;
  list.forEach(th=>{
    if(!th.pinned && !sepDone && list.some(x=>x.pinned)){ rows+='<div class="sep"></div>'; sepDone=true; }
    if(!th.pinned) sepDone=true;
    const ns = liveNotes(th.id); const last = ns[ns.length-1]; const c = counts(th.id);
    rows += `<div class="trow ${ui.threadId===th.id&&isWide()?'active':''}" data-tid="${th.id}">
      ${avatar(th,'md')}
      <div class="tmain"><div class="l1"><div class="tname">${esc(th.name)}</div><div class="ttime">${last?shortWhen(last.createdAt):''}</div></div>
      <div class="l2"><div class="prev">${esc(preview(last))||'&nbsp;'}</div>${c.red?`<span class="badge" title="${t('pri')[3]}"><i></i>${c.red}</span>`:''}${th.pinned?`<span class="pin-ic">${I.pinS}</span>`:''}</div></div>
    </div>`;
  });
  L.innerHTML = `
    <header class="hdr"><div class="hdr-row" style="padding-left:14px">
      <div class="ttl" style="padding-left:2px"><div class="name">MemoChat</div><div class="sub">${list.length} ${t('threads')}</div></div>
      <button class="ib ibw" data-act="agenda" aria-label="${t('dates')}" title="${t('dates')}">${I.cal}${(()=>{ const b=dueBadge(); return b?`<span class="ibadge">${b}</span>`:''; })()}</button>
      <button class="ib" data-act="open-search" aria-label="Search">${I.search}</button>
      ${themeBtn()}
      <button class="ib" data-act="main-menu" aria-label="Menu">${I.more}</button>
    </div></header>${knot()}
    <div class="scroll" id="tlistScroll">
      ${Store.mode==='memory'?`<div class="banner"><div class="grow">${t('storageOff')}</div></div>`:''}
      ${S.settings.welcome && !S.notes.length?`<div class="banner"><div class="grow"><b>${t('welcomeT')}</b><br>${t('welcomeSub')}</div><button class="linkbtn" data-act="welcome-x">${t('dismiss')}</button><button class="btn primary" data-act="import">${t('restore')}</button></div>`:''}
      ${nudge && !(S.settings.welcome && !S.notes.length)?`<div class="banner"><div class="grow">${t('backupNudge')}</div><button class="linkbtn" data-act="snooze-nudge">${t('later')}</button><button class="btn primary" data-act="backup">${t('backUp')}</button></div>`:''}
      <div class="tlist">${rows}<div class="endorn">${orn(15)}</div></div>
    </div>
    <button class="fab" data-act="new-thread" aria-label="${t('newThread')}" title="${t('newThread')}">${sv('<path d="M12 5v14M5 12h14"/>',24,2.4)}</button>`;
}
function needsNudge(){
  const s=S.settings, now=Date.now();
  if(s.nudgeSnooze && now - s.nudgeSnooze < 7*DAY) return false;
  return !s.lastBackup || now - s.lastBackup > 7*DAY;
}

/* ---------- search ---------- */
function renderSearch(){
  const sc = ui.search;
  if(!L.querySelector('#searchInput')){
    L.innerHTML = `
      <header class="hdr"><div class="hdr-row"><button class="ib" data-act="back" aria-label="Back">${I.back}</button>
        <input id="searchInput" class="search" type="search" autocomplete="off" enterkeyhint="search"></div></header>${knot()}
      <div class="sfilters" id="sFilters"></div>
      <div class="scroll" id="sResults"></div>`;
    const inp = $('#searchInput');
    inp.value = sc.q;
    inp.addEventListener('input',()=>{ sc.q=inp.value; renderSearchResults(); });
    setTimeout(()=>inp.focus(),30);
  }
  const inp=$('#searchInput'); const sth = sc.scope && thread(sc.scope);
  inp.placeholder = sth ? t('searchIn', sth.name) : t('searchPh');
  $('#sFilters').innerHTML = `
    ${sth?`<button class="toggle ${sc.scope?'on':''}" data-act="s-scope">${esc(sth.emoji||'')} ${t('thisThread', esc(sth.name))} ${I.xS}</button>`:''}
    ${[0,1,2,3].map(p=>`<button class="dot ${sc.pri.size&&!sc.pri.has(p)?'off':''} ${sc.pri.has(p)?'on':''}" style="background:var(--p${p});${sc.pri.size&&!sc.pri.has(p)?'opacity:.3':''}" data-act="s-pri" data-p="${p}" title="${t('pri')[p]}" aria-label="${t('pri')[p]}"></button>`).join('')}
    <button class="toggle ${sc.done?'on':''}" data-act="s-done">${t('inclDone')}</button>`;
  renderSearchResults();
}
function renderSearchResults(){
  const sc=ui.search, q=sc.q.trim().toLowerCase(), box=$('#sResults'); if(!box) return;
  if(!q && !sc.pri.size){ box.innerHTML=`<div class="empty">${t('typeToSearch')}</div>`; return; }
  const hl = s => { const e=esc(s); if(!q) return e; const qi=esc(q).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); return e.replace(new RegExp(qi,'gi'),m=>`<mark>${m}</mark>`); };
  const ths = q && !sc.scope ? S.threads.filter(x=>!x.deletedAt && x.name.toLowerCase().includes(q)) : [];
  let ns = S.notes.filter(n=>!n.deletedAt && thread(n.threadId) && !thread(n.threadId).deletedAt);
  if(sc.scope) ns = ns.filter(n=>n.threadId===sc.scope);
  if(sc.pri.size) ns = ns.filter(n=>sc.pri.has(n.priority));
  if(!sc.done) ns = ns.filter(n=>!n.done);
  if(q) ns = ns.filter(n=>noteText(n).toLowerCase().includes(q));
  ns.sort((a,b)=>b.createdAt-a.createdAt);
  let h='';
  if(ths.length){ h+=`<div class="section-h">${t('resThreads')}</div>`+ths.map(th=>`<div class="trow" data-tid="${th.id}">${avatar(th,'sm')}<div class="tmain" style="border:0;margin:0;padding:0"><div class="tname">${hl(th.name)}${th.archived?` <span style="font-size:12px;color:var(--muted);font-weight:400">· ${t('archived')}</span>`:''}</div></div></div>`).join(''); }
  if(ns.length){ h+=`<div class="section-h">${t('resNotes')} · ${ns.length}</div>`+ns.slice(0,200).map(n=>{ const th=thread(n.threadId); let txt=noteText(n)||(n.photo?t('photoMsg'):'');
    if(q){ const i=txt.toLowerCase().indexOf(q); if(i>60) txt='…'+txt.slice(i-40); }
    return `<div class="res ${n.done?'dn':''}" data-nid="${n.id}"><span class="stripe" style="background:var(--p${n.priority})"></span><div class="rmain"><div class="rhead">${esc(th.emoji||'')} <b>${esc(th.name)}</b>${th.archived?' · '+t('archived'):''} · ${shortWhen(n.createdAt)}${n.done?' · '+t('done'):''}</div><div class="rtext">${hl(txt)}</div></div></div>`; }).join(''); }
  box.innerHTML = h || `<div class="empty">${t('noRes')}</div>`;
}

/* ---------- trash ---------- */
function renderTrash(){
  purgeTrash();
  const items = S.notes.filter(n=>n.deletedAt).sort((a,b)=>b.deletedAt-a.deletedAt);
  const now=Date.now();
  L.innerHTML = simpleHeader(t('trash'), items.length?`<button class="ib" data-act="empty-trash" title="${t('emptyTrash')}" aria-label="${t('emptyTrash')}">${I.trash}</button>`:'') + `
    <div class="scroll">${items.length?`<div class="section-h">${t('trashInfo')}</div>`:''}${items.map(n=>{
      const th = thread(n.threadId); const left = n.deletedAt + 30*DAY - now; const days = Math.ceil(left/DAY);
      return `<div class="titem"><span class="stripe" style="background:var(--p${n.priority})"></span><div class="tm">
        <div class="tx">${esc(noteText(n)|| (n.photo?'📷 '+t('photoMsg'):''))}</div>
        <div class="info">${th?esc(((th.emoji||'')+' '+th.name).trim())+' · ':''}${shortWhen(n.createdAt)} · ${left<DAY?`<span class="warn">${t('todayForever')}</span>`:t('daysLeft',days)}</div>
        <div class="acts"><button class="btn" data-act="t-restore" data-nid="${n.id}">${t('restore')}</button><button class="btn danger" data-act="t-forever" data-nid="${n.id}">${t('delForever')}</button></div>
      </div></div>`; }).join('') || `<div class="empty">${t('trashEmpty')}</div>`}</div>`;
}
function purgeTrash(){
  const lim = Date.now()-30*DAY; const before=S.notes.length;
  S.notes = S.notes.filter(n=>!(n.deletedAt && n.deletedAt<lim));
  S.threads = S.threads.filter(th=>!(th.deletedAt && !S.notes.some(n=>n.threadId===th.id)));
  if(S.notes.length!==before) persist();
}

/* ---------- archive ---------- */
function renderArchive(){
  const list = S.threads.filter(x=>x.archived && !x.deletedAt).sort((a,b)=>b.lastActivity-a.lastActivity);
  L.innerHTML = simpleHeader(t('archived')) + `<div class="scroll"><div class="tlist">${list.map(th=>{ const ns=liveNotes(th.id), last=ns[ns.length-1];
    return `<div class="trow ${ui.threadId===th.id&&isWide()?'active':''}" data-tid="${th.id}">${avatar(th,'md')}<div class="tmain"><div class="l1"><div class="tname">${esc(th.name)}</div><div class="ttime">${last?shortWhen(last.createdAt):''}</div></div><div class="l2"><div class="prev">${esc(preview(last))||'&nbsp;'}</div></div></div></div>`; }).join('') || `<div class="empty">${art('grail')}<div class="etitle">${t('archEmptyT')}</div>${t('noArchived')}</div>`}</div></div>`;
}

/* ---------- settings ---------- */
function renderSettings(){
  const s=S.settings;
  L.innerHTML = simpleHeader(t('settings')) + `<div class="scroll set">
    <div class="section-h">${t('thisDevice')}</div>
    <div class="grp"><div class="it"><span class="ic">${I.globe}</span><div class="grow">${t('language')}</div><div class="seg"><button class="${s.lang==='en'?'on':''}" data-act="lang" data-v="en">English</button><button class="${s.lang==='cs'?'on':''}" data-act="lang" data-v="cs">Čeština</button></div></div>
    <div class="it"><span class="ic">${I.sun}</span><div class="grow">${t('theme')}</div><div class="seg"><button class="${!s.theme?'on':''}" data-act="theme" data-v="">${t('system')}</button><button class="${s.theme==='light'?'on':''}" data-act="theme" data-v="light">${t('light')}</button><button class="${s.theme==='dark'?'on':''}" data-act="theme" data-v="dark">${t('dark')}</button></div></div></div>
    <div class="section-h">${t('backup')} · ${t('lastBackup', s.lastBackup?fullWhen(s.lastBackup):t('never'))}</div>
    <div class="grp">
      <button class="it" data-act="backup"><span class="ic">${I.download}</span><div class="grow">${t('backupNow')}<div class="small">${t('backupSub')}</div></div></button>
      <button class="it" data-act="import"><span class="ic">${I.upload}</span><div class="grow">${t('restoreFile')}<div class="small">${t('restoreSub')}</div></div></button>
      <button class="it" data-act="export-md"><span class="ic">${I.doc}</span><div class="grow">${t('exportMd')}<div class="small">${t('exportMdSub')}</div></div></button>
    </div>
    <div class="section-h">${t('about')}</div>
    <div class="grp"><div class="it"><div class="grow small" style="margin:0">${t('aboutText')}<br>${t('version', APP_VERSION)}</div></div></div>
  </div>`;
}

/* ---------- right pane (thread) ---------- */
let shownThread = null;
function renderRight(){
  const th = ui.threadId && thread(ui.threadId);
  if(!th || th.deletedAt){
    shownThread=null; ui.threadId=null;
    R.innerHTML = `<header class="hdr"><div class="hdr-row"></div></header>${knot()}<div class="placeholder">${art('sword')}<div class="big">MemoChat</div><div>${t('chooseThread')}</div><div style="font-size:14px">${t('chooseSub')}</div></div>`;
    return;
  }
  if(shownThread!==th.id || !R.querySelector('#msgs')){
    shownThread = th.id;
    R.innerHTML = `<header class="hdr" id="thHdr"></header>${knot()}<div id="pinSlot"></div><div id="filterSlot"></div><div class="msgs" id="msgs"><div class="msgs-inner" id="msgsIn"></div></div><div id="compSlot"></div>`;
    renderComposer(true);
    renderThreadHeader(); renderPinbar(); renderFilterbar(); renderMessages(true);
    return;
  }
  renderThreadHeader(); renderPinbar(); renderFilterbar(); renderMessages(false); renderComposer(false);
}
function renderThreadHeader(){
  const th = thread(ui.threadId), c=counts(th.id), h=$('#thHdr'); if(!h) return;
  if(ui.selecting){
    const n=ui.sel.size;
    h.innerHTML = `<div class="hdr-row"><button class="ib" data-act="sel-exit" aria-label="${t('cancel')}">${I.x}</button><div class="sel-count">${t('selected',n)}</div>
      ${th.archived?`<button class="ib" data-act="sel-copy" ${n?'':'disabled'} title="${t('copyTo')}" aria-label="${t('copyTo')}">${I.copyTo}</button>`:`
      <button class="ib" data-act="sel-move" ${n?'':'disabled'} title="${t('moveTo')}" aria-label="${t('moveTo')}">${I.move}</button>
      <button class="ib" data-act="sel-copy" ${n?'':'disabled'} title="${t('copyTo')}" aria-label="${t('copyTo')}">${I.copyTo}</button>
      <button class="ib" data-act="sel-pri" ${n?'':'disabled'} title="${t('changePri')}" aria-label="${t('changePri')}">${I.flag}</button>
      <button class="ib" data-act="sel-done" ${n?'':'disabled'} title="${t('markDone')}" aria-label="${t('markDone')}">${I.checkL}</button>
      <button class="ib" data-act="sel-del" ${n?'':'disabled'} title="${t('del')}" aria-label="${t('del')}">${I.trash}</button>`}</div>`;
    return;
  }
  h.innerHTML = `<div class="hdr-row">
    <button class="ib back-thread" data-act="back" aria-label="Back">${I.back}</button>
    ${avatar(th)}
    <div class="ttl clickable" data-act="edit-thread"><div class="name">${esc(th.name)}</div><div class="sub">${th.archived?t('archived')+' · ':''}${t('notesN',c.total)} · ${t('openN',c.open)}</div></div>
    <button class="ib" data-act="thread-search" aria-label="Search">${I.search}</button>
    ${themeBtn()}
    <button class="ib" data-act="thread-menu" aria-label="Menu">${I.more}</button></div>`;
}
function pinnedNotes(){ return liveNotes(ui.threadId).filter(n=>n.pinned).sort((a,b)=>(b.pinnedAt||0)-(a.pinnedAt||0)); }
function renderPinbar(){
  const slot=$('#pinSlot'); if(!slot) return;
  const ps = pinnedNotes();
  if(!ps.length){ slot.innerHTML=''; return; }
  if(ui.pinIdx>=ps.length) ui.pinIdx=0;
  const n = ps[ui.pinIdx];
  const txt = (n.type==='list'?(n.title||n.items.map(i=>i.text).join(', ')):(n.text||t('photoMsg'))).split('\n')[0];
  slot.innerHTML = `<div class="pinbar" data-act="pinbar">${I.pin}<span><b>${t('pinned')}${ps.length>1?` ${ui.pinIdx+1}/${ps.length}`:''}</b> · ${esc(txt)}</span></div>`;
}
function renderFilterbar(){
  const slot=$('#filterSlot'); if(!slot) return;
  if(!ui.filter){ slot.innerHTML=''; return; }
  const f=ui.filter;
  slot.innerHTML = `<div class="filterbar">${I.filter}<span>${t('priority')}</span>${[0,1,2,3].map(p=>`<button class="dot ${f.has(p)?'on':''}" style="background:var(--p${p});${f.size&&!f.has(p)?'opacity:.3':''}" data-act="f-pri" data-p="${p}" title="${t('pri')[p]}" aria-label="${t('pri')[p]}"></button>`).join('')}<span style="flex:1"></span><button class="linkbtn" data-act="f-clear">${t('clear')}</button></div>`;
}
function renderMessages(toBottom){
  const box=$('#msgs'), inner=$('#msgsIn'); if(!box) return;
  const th = thread(ui.threadId);
  const nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
  const prevTop = box.scrollTop;
  let ns = liveNotes(th.id);
  const doneCount = ns.filter(n=>n.done).length;
  if(th.hideDone) ns = ns.filter(n=>!n.done);
  if(ui.filter && ui.filter.size) ns = ns.filter(n=>ui.filter.has(n.priority));
  const light = effTheme()==='light';
  let h='', lastDay=null, firstOfDay=false;
  ns.forEach(n=>{
    const d=startOfDay(n.createdAt);
    if(d!==lastDay){ lastDay=d; firstOfDay=true; h+=`<div class="day">${orn(12)}<span>${esc(dayLabel(n.createdAt))}</span>${orn(12)}</div>`; }
    h += noteHTML(n, light && firstOfDay);
    firstOfDay=false;
  });
  if(!liveNotes(th.id).length) h = `<div class="empty">${art('sword')}<div class="etitle">${t('emptyThreadT')}</div>${t('noNotes')}</div>`;
  if(th.hideDone && doneCount) h += `<div class="hiddeninfo">${I.eyeOff}<span>${t('hiddenDone',doneCount)}</span><button class="linkbtn" data-act="toggle-hide">${t('show')}</button></div>`;
  inner.innerHTML = h;
  if(toBottom || nearBottom) box.scrollTop = box.scrollHeight; else box.scrollTop = prevTop;
}
function noteHTML(n, dropcap){
  const sel = ui.selecting && ui.sel.has(n.id);
  let body='';
  if(n.type==='list'){
    if(n.title) body += `<div class="ltitle">${esc(n.title)}</div>`;
    body += n.items.map(it=>`<div class="litem ${it.done?'ck':''}" data-item="${it.id}"><span class="box">${it.done?I.checkS:''}</span><span>${linkify(it.text)}</span></div>`).join('');
  } else if(n.text){
    let txt = linkify(n.text);
    const m = dropcap && !n.photo && n.text.match(/^([A-Za-zÀ-ž][^\s]*)([\s\S]*)$/);
    if(m && !/^(https?:|www\.)/i.test(n.text)){ txt = `<span class="smcap">${esc(m[1])}</span>` + linkify(m[2]); }
    body += `<p class="txt">${txt}</p>`;
  }
  // photo = small thumbnail beside the text; tap opens full size
  if(n.photo) body = `<div class="prow"><img class="photo" src="${n.photo}" alt="" data-act="view-photo">${body?`<div class="ptext">${body}</div>`:''}</div>`;
  const meta = [];
  if(n.pinned) meta.push(I.pinS);
  if(n.editedAt) meta.push(`<span class="edited" data-act="history">${t('edited')}</span>`);
  if(n.due) meta.unshift(dueChip(n));
  meta.push(n.done ? `${I.check}<span>${t('done')} · ${fmtTime(n.doneAt||n.createdAt)}</span>` : `<span title="${fullWhen(n.createdAt)}">${fmtTime(n.createdAt)}</span>`);
  return `<div class="nwrap"><div class="swipebg">${I.checkL}<span>${n.done?t('markUndone'):t('done')}</span></div>
    <article class="note p${n.priority} ${n.done?'done':''} ${sel?'sel':''}" data-nid="${n.id}">
      ${n.pinned && !ui.selecting ? `<span class="orn">${orn(14)}</span>` : ''}
      <span class="stripe"></span><div class="body">${body}<div class="meta">${meta.join('')}</div></div>
      ${ui.selecting?`<span class="selmark">${sel?I.checkS:''}</span>`:''}
    </article></div>`;
}

/* ---------- composer ---------- */
function renderComposer(fresh){
  const slot=$('#compSlot'); if(!slot) return;
  const th=thread(ui.threadId);
  if(th.archived){
    slot.innerHTML = `<div class="archbar">${I.archive}<span style="flex:1">${t('archivedThread')}</span><button class="btn" data-act="unarchive">${t('unarchive')}</button></div>`;
    return;
  }
  if(fresh || !slot.querySelector('#cInput')){
    slot.innerHTML = `<div class="composer"><div class="composer-in">
      <div class="kbgrip" id="kbGrip" title="Drag to fit above the keyboard"><span></span></div>
      <div class="editbar hidden" id="cEditBar"></div>
      <div class="ppreview hidden" id="cPhoto"></div>
      <div class="prirow" id="cPri"></div>
      <input id="cTitle" class="ltinput hidden" maxlength="120">
      <div class="crow">
        <button class="cbtn cplus" data-act="comp-plus" aria-label="${t('addWhat')}" title="${t('addWhat')}">${I.plus}</button>
        <textarea id="cInput" class="cinput" rows="1" enterkeyhint="${isFine()?'send':'enter'}"></textarea>
        <button class="cbtn csend" id="cSend" data-act="send" aria-label="Send">${I.send}</button>
      </div></div></div>`;
    const inp=$('#cInput');
    inp.addEventListener('input',()=>{ autoGrow(inp); updateSend(); });
    inp.addEventListener('keydown',e=>{
      if(e.key==='Enter' && !e.shiftKey && !e.isComposing && isFine()){ e.preventDefault(); sendNote(); }
      else if(e.key==='Escape' && ui.comp.editing){ e.preventDefault(); cancelEdit(); }
    });
    $('#cTitle').addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); inp.focus(); } });
  }
  const c=ui.comp;
  $('#cPri').innerHTML = `<span>${t('priority')}</span>${[0,1,2,3].map(p=>`<button class="dot ${c.pri===p?'on':''}" style="background:var(--p${p})" data-act="comp-pri" data-p="${p}" title="${t('pri')[p]}" aria-label="${t('pri')[p]}${c.pri===p?', selected':''}"></button>`).join('')}
    ${c.due||c.mode==='list'?'<span style="flex:1"></span>':''}${c.due?`<span class="chip" data-act="comp-due" style="cursor:pointer">${c.due.time?I.clockS:I.calS}${esc(dueLabel(c.due))}<button data-act="comp-due-x" aria-label="${t('removeDate')}">${I.xS}</button></span>`:''}
    ${c.mode==='list'?`<span class="chip">${I.list}${t('checklist')}<button data-act="comp-text" aria-label="${t('cancel')}">${I.xS}</button></span>`:''}`;
  const tl=$('#cTitle'); tl.classList.toggle('hidden', c.mode!=='list'); tl.placeholder=t('listTitle');
  const inp=$('#cInput'); inp.placeholder = c.mode==='list' ? (isFine()?t('writeListDesk'):t('writeList')) : t('write');
  const eb=$('#cEditBar');
  if(c.editing){ const n=note(c.editing); eb.classList.remove('hidden'); eb.innerHTML = `${I.edit}<span class="grow"><b>${t('editing')}</b> · ${esc(preview(n)||'')}</span><button class="linkbtn" data-act="cancel-edit">${t('cancel')}</button>`; }
  else eb.classList.add('hidden');
  const pp=$('#cPhoto');
  if(c.photo){ pp.classList.remove('hidden'); pp.innerHTML = `<img src="${c.photo}" alt=""><span style="flex:1">${t('photo')}</span><button class="linkbtn" data-act="comp-photo-x">${t('clear')}</button>`; }
  else pp.classList.add('hidden');
  $('#cSend').innerHTML = c.editing ? I.checkL : I.send;
  updateSend();
}
function autoGrow(el){
  const box=$('#msgs'); const keep = box ? box.scrollTop : 0;
  el.style.height='auto'; el.style.height=Math.min(el.scrollHeight+2,160)+'px';
  if(box) box.scrollTop = keep;
  // keep the caret line visible when typing at the end (e.g. new list item)
  if(el.selectionEnd >= el.value.length - 1) el.scrollTop = el.scrollHeight;
}
/* fit the app to the visible area above the on-screen keyboard */
function fitViewport(){
  const vv=window.visualViewport, app=$('#app'); if(!vv||!app) return;
  app.style.height = vv.height+'px';
  app.style.transform = `translateY(${vv.offsetTop}px)`;
  const a=document.activeElement;
  if(a && (a.id==='cInput'||a.id==='cTitle')){ const box=$('#msgs'); if(box) box.scrollTop=box.scrollHeight; if(a.id==='cInput' && a.selectionEnd>=a.value.length-1) a.scrollTop=a.scrollHeight; }
}
if(window.visualViewport){ visualViewport.addEventListener('resize',fitViewport); visualViewport.addEventListener('scroll',fitViewport); }
const curH = () => window.visualViewport ? visualViewport.height : window.innerHeight;
let fullH = curH(), kbTimer=null;
window.addEventListener('resize',()=>{ if(!isComposerFocused()) fullH = Math.max(curH(), window.innerHeight); });
function isComposerFocused(){ const a=document.activeElement; return !!a && (a.id==='cInput'||a.id==='cTitle'); }
function kbOffset(){ return S.settings.kbOffset || Math.round(Math.min(window.screen && screen.height ? screen.height : window.innerHeight, window.innerHeight+120) * 0.40); }
function applyKb(){ $('#app').style.setProperty('--kb', kbOffset()+'px'); }
document.addEventListener('focusin', e=>{
  if(isFine() || !(e.target.id==='cInput'||e.target.id==='cTitle')) return;
  clearTimeout(kbTimer);
  // assume the keyboard covers the bottom unless the page actually shrinks
  kbTimer = setTimeout(()=>{
    if(!isComposerFocused() || curH() <= fullH*0.85) return;
    applyKb(); $('#app').classList.add('kb-lift');
    const box=$('#msgs'); if(box) box.scrollTop=box.scrollHeight;
    const a=document.activeElement; if(a&&a.id==='cInput') a.scrollTop=a.scrollHeight;
    if(!S.settings.kbHint){ S.settings.kbHint=true; persist(); setTimeout(()=>snack(t('kbHint')),300); }
  }, 300);
});
document.addEventListener('focusout', ()=>{
  setTimeout(()=>{ if(!isComposerFocused() && !kbDrag){ clearTimeout(kbTimer); $('#app').classList.remove('kb-lift'); const box=$('#msgs'); if(box) box.scrollTop=box.scrollHeight; } }, 150);
});
/* drag the grip to match the real keyboard height; remembered */
let kbDrag=null;
['mousedown','touchstart'].forEach(ev=>document.addEventListener(ev, e=>{ if(e.target.closest && e.target.closest('#kbGrip')) e.preventDefault(); }, {capture:true, passive:false}));
document.addEventListener('pointerdown', e=>{
  const gr=e.target.closest('#kbGrip'); if(!gr) return;
  e.preventDefault(); e.stopPropagation();
  kbDrag={y:e.clientY, start:kbOffset(), pid:e.pointerId}; try{ gr.setPointerCapture(e.pointerId); }catch(_){}
}, true);
document.addEventListener('pointermove', e=>{
  if(!kbDrag || e.pointerId!==kbDrag.pid) return;
  const v=Math.max(80, Math.min(window.innerHeight-260, kbDrag.start + (kbDrag.y - e.clientY)));
  S.settings.kbOffset=Math.round(v); applyKb();
}, true);
document.addEventListener('pointerup', e=>{ if(kbDrag && e.pointerId===kbDrag.pid){ kbDrag=null; persist(); const i=$('#cInput'); if(i && !isComposerFocused()) i.focus(); } }, true);
function updateSend(){ const b=$('#cSend'), i=$('#cInput'); if(!b||!i) return; b.disabled = !i.value.trim() && !ui.comp.photo && !($('#cTitle')&&$('#cTitle').value.trim()); }
function resetComposer(){
  ui.comp = {pri:1, mode:'text', photo:null, editing:null, due:null};
  const i=$('#cInput'); if(i){ i.value=''; autoGrow(i); } const tl=$('#cTitle'); if(tl) tl.value='';
}

/* =========================================================
   Actions: notes
   ========================================================= */
function parseItems(raw){ return raw.split('\n').map(s=>s.replace(/^\s*(\[[ xX]?\]|[-*•☐☑])\s*/,'').trim()).filter(Boolean); }
function sendNote(){
  const th=thread(ui.threadId); if(!th || th.archived) return;
  const inp=$('#cInput'), raw=inp.value, c=ui.comp, title=($('#cTitle').value||'').trim();
  if(c.mode==='list'){
    const items=parseItems(raw);
    if(!items.length && !title){ snack(t('emptyNote')); return; }
    if(c.editing){
      const n=note(c.editing); pushHistory(n);
      const old = n.items||[];
      n.type='list'; n.title=title; n.items=items.map(x=>{ const o=old.find(i=>i.text===x); return {id:o?o.id:uid(), text:x, done:o?o.done:false}; }); if(n.done && n.items.some(i=>!i.done && !old.some(o=>o.text===i.text))){ n.done=false; n.doneAt=null; } n.text=''; n.photo=c.photo; n.priority=c.pri; n.due=c.due||null; n.editedAt=Date.now();
      finishEdit(n); return;
    }
    addNote({type:'list', title, items:items.map(x=>({id:uid(),text:x,done:false}))});
  } else {
    const text=raw.replace(/\s+$/,'').replace(/^\n+/,'');
    if(!text.trim() && !c.photo){ return; }
    if(c.editing){
      const n=note(c.editing); pushHistory(n);
      n.type='text'; n.text=text; n.title=''; n.items=[]; n.photo=c.photo; n.priority=c.pri; n.due=c.due||null; n.editedAt=Date.now();
      finishEdit(n); return;
    }
    addNote({type:'text', text});
  }
}
function addNote(o){
  const n = Object.assign({id:uid(), threadId:ui.threadId, type:'text', text:'', title:'', items:[], photo:ui.comp.photo, priority:ui.comp.pri, due:ui.comp.due||null, done:false, doneAt:null, pinned:false, pinnedAt:null, createdAt:Date.now(), editedAt:null, history:[], deletedAt:null}, o);
  S.notes.push(n); bumpActivity(ui.threadId);
  resetComposer(); commit();
  const box=$('#msgs'); if(box) box.scrollTop=box.scrollHeight;
  $('#cInput') && isFine() && $('#cInput').focus();
}
function pushHistory(n){ n.history = n.history||[]; n.history.push({type:n.type, text:n.text, title:n.title, items:JSON.parse(JSON.stringify(n.items||[])), at:n.editedAt||n.createdAt}); }
function finishEdit(n){ bumpActivity(n.threadId); resetComposer(); commit(); flash([n.id]); calCheck(n,'change'); }
function startEdit(id){
  const n=note(id); if(!n) return;
  exitSelect(true);
  ui.comp = {pri:n.priority, mode:n.type==='list'?'list':'text', photo:n.photo, editing:id, due:n.due?Object.assign({},n.due):null};
  renderComposer(false);
  const inp=$('#cInput');
  inp.value = n.type==='list' ? n.items.map(i=>i.text).join('\n') : n.text;
  $('#cTitle').value = n.type==='list' ? (n.title||'') : '';
  autoGrow(inp); updateSend(); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
}
function cancelEdit(){ resetComposer(); renderComposer(false); }
function setDone(ids, val){
  ids.forEach(id=>{ const n=note(id); if(n){ n.done = val; n.doneAt = val?Date.now():null; } });
  commit();
  if(val){ const c=ids.map(note).find(n=>n&&n.cal); if(c) calCheck(c,'done'); }
}
function toggleDone(id){ const n=note(id); if(!n) return; setDone([id], !n.done); }
function setPriority(ids, p){ ids.forEach(id=>{ const n=note(id); if(n) n.priority=p; }); commit(); }
function togglePin(id){ const n=note(id); n.pinned=!n.pinned; n.pinnedAt=n.pinned?Date.now():null; ui.pinIdx=0; commit(); }
function toggleItem(nid, iid){
  const n=note(nid); if(!n||thread(n.threadId).archived) return; const it=n.items.find(i=>i.id===iid); if(!it) return;
  it.done=!it.done;
  const allDone = n.items.length && n.items.every(i=>i.done);
  if(allDone && !n.done){
    // last item ticked → whole note done (with Undo)
    n.done=true; n.doneAt=Date.now(); commit();
    snack(t('listDone'), t('undo'), ()=>{ it.done=false; n.done=false; n.doneAt=null; commit(); });
    calCheck(n,'done');
    return;
  }
  if(!it.done && n.done){ n.done=false; n.doneAt=null; } // unticking reopens the note
  commit();
}
function deleteNotes(ids){
  const now=Date.now(); const prev = ids.map(id=>note(id)).filter(Boolean);
  prev.forEach(n=>{ n.deletedAt=now; if(n.pinned){ n.pinned=false; n.pinnedAt=null; n._wasPinned=true; } });
  exitSelect(true); commit();
  { const c=prev.find(n=>n.cal); if(c) calCheck(c,'deleted'); }
  snack(ids.length>1?t('toTrashN',ids.length):t('toTrash'), t('undo'), ()=>{ prev.forEach(n=>{ n.deletedAt=null; if(n._wasPinned){ n.pinned=true; n.pinnedAt=Date.now(); } delete n._wasPinned; }); commit(); flash(prev.map(n=>n.id)); });
}
async function copyText(s){
  try{ await navigator.clipboard.writeText(s); return true; }catch(e){
    try{ const ta=document.createElement('textarea'); ta.value=s; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); const ok=document.execCommand('copy'); ta.remove(); return ok; }catch(e2){ return false; }
  }
}
function moveOrCopy(ids, targetId, copy){
  const src = ui.threadId; const target = thread(targetId); if(!target) return;
  const list = ids.map(id=>note(id)).filter(Boolean).sort((a,b)=>a.createdAt-b.createdAt);
  let affected=[], undo;
  if(copy){
    const clones = list.map(n=>Object.assign(JSON.parse(JSON.stringify(n)), {id:uid(), threadId:targetId, pinned:false, pinnedAt:null, history:[], editedAt:null, due:null, cal:null}));
    S.notes.push(...clones); affected = clones.map(c=>c.id);
    undo = ()=>{ const set=new Set(affected); S.notes=S.notes.filter(n=>!set.has(n.id)); };
  } else {
    const prev = list.map(n=>[n, n.threadId]);
    list.forEach(n=>{ n.threadId=targetId; }); affected = list.map(n=>n.id);
    undo = ()=>{ prev.forEach(([n,tid])=>{ n.threadId=tid; }); };
  }
  target.lastActivity = Math.max(target.lastActivity, Date.now());
  S.settings.recent = [targetId, ...(S.settings.recent||[]).filter(x=>x!==targetId)].slice(0,5);
  exitSelect(true);
  persist();
  if(!src || !thread(src)){ openThread(targetId, {flash:affected}); }
  else { render(); if(targetId===src) flash(affected); }
  snack(copy?t('copiedTo',target.name):t('movedTo',target.name), [
    {label:t('show'), fn:()=>{ if(!thread(targetId)) return; ui.left='list'; openThread(targetId, {flash:affected.filter(id=>note(id))}); }},
    {label:t('undo'), fn:()=>{
      undo(); persist(); render();
      if(!copy && ui.threadId===src) flash(affected);
    }}
  ]);
}

/* ---------- selection ---------- */
function enterSelect(id){ ui.selecting=true; ui.sel=new Set(id?[id]:[]); render(); }
function exitSelect(silent){ if(!ui.selecting) return; ui.selecting=false; ui.sel.clear(); if(!silent) render(); }
function toggleSel(id){ ui.sel.has(id)?ui.sel.delete(id):ui.sel.add(id); renderThreadHeader(); renderMessages(false); }

/* =========================================================
   Threads
   ========================================================= */
function openThread(id, opts={}){
  const wasShowing = ui.showThread;
  if(ui.threadId!==id){ exitSelect(true); ui.filter=null; ui.pinIdx=0; resetComposer(); }
  ui.threadId=id; ui.showThread=true;
  if(ui.left==='search' && !isWide()) { /* keep search behind */ }
  shownThread=null;
  if(!wasShowing && !isWide()) pushNav();
  render();
  if(opts.flash && opts.flash.length) flash(opts.flash);
  if(isFine() && !thread(id).archived && !(opts.flash&&opts.flash.length)) setTimeout(()=>{ const i=$('#cInput'); i&&i.focus(); },50);
}
function closeThread(){ ui.showThread=false; exitSelect(true); resetComposer(); if(!isWide()){ ui.threadId=null; } render(); }
function flash(ids){
  requestAnimationFrame(()=>{
    let first=null;
    ids.forEach(id=>{ const el=R.querySelector(`.note[data-nid="${id}"]`); if(el){ if(!first) first=el; el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); setTimeout(()=>el.classList.remove('flash'),1700); } });
    if(first) first.scrollIntoView({block:'center', behavior:'smooth'});
  });
}
function threadEditor(th){
  const isNew=!th; const d = th ? {name:th.name, emoji:th.emoji||'', color:th.color||null} : {name:'', emoji:'', color:null};
  const curHex = colorOf(d.color);
  return new Promise(resolve=>{
    const ov = overlay(`<div class="dlg" role="dialog">
      <div class="te-head"><div id="tePrev"></div><h3>${isNew?t('newThread'):t('editThread')}</h3></div>
      <label class="field">${t('name')}<input id="teName" maxlength="40" value="${esc(d.name)}"></label>
      <div class="field">${t('emoji')}
        <div style="display:flex;gap:8px;align-items:center"><input id="teEmoji" maxlength="16" value="${esc(d.emoji)}" placeholder="—" style="width:70px;text-align:center;font-size:20px"><span style="font-size:12px">${t('emojiHint')}</span></div>
        <div class="emojis" id="teEmojis"><button type="button" class="def ${!d.emoji?'on':''}" data-e="">${t('defaultLook')}</button>${EMOJIS.map(e=>`<button type="button" data-e="${e}" class="${e===d.emoji?'on':''}">${e}</button>`).join('')}</div></div>
      <div class="field">${t('color')}<div class="colors" id="teColors">
        <div class="defrow"><button type="button" class="def ${!d.color?'on':''}" data-c="">${t('defaultLook')}</button></div>
        ${PALETTE.map(v=>`<button type="button" data-c="${v}" class="${curHex&&curHex.toLowerCase()===v.toLowerCase()?'on':''}" style="background:${v}" aria-label="${v}"></button>`).join('')}
        ${curHex && !PALETTE.some(v=>v.toLowerCase()===curHex.toLowerCase()) ? `<button type="button" data-c="${esc(d.color)}" class="on" style="background:${curHex}"></button>`:''}
      </div></div>
      <div class="btns"><button class="btn" data-x="cancel">${t('cancel')}</button><button class="btn primary" data-x="ok">${isNew?t('create'):t('save')}</button></div></div>`, true, ()=>resolve(null));
    const nm=$('#teName',ov), em=$('#teEmoji',ov);
    const prev=()=>{ $('#tePrev',ov).innerHTML = avatar({name:nm.value||'?', emoji:em.value.trim(), color:d.color}, 'md'); };
    prev();
    setTimeout(()=>nm.focus(),30);
    nm.addEventListener('input',prev);
    em.addEventListener('input',()=>{ ov.querySelectorAll('#teEmojis button').forEach(x=>x.classList.toggle('on', x.dataset.e===em.value.trim())); prev(); });
    $('#teEmojis',ov).addEventListener('click',e=>{ const b=e.target.closest('[data-e]'); if(!b) return; em.value=b.dataset.e; ov.querySelectorAll('#teEmojis button').forEach(x=>x.classList.toggle('on',x===b)); prev(); });
    $('#teColors',ov).addEventListener('click',e=>{ const b=e.target.closest('[data-c]'); if(!b) return; d.color=b.dataset.c||null; ov.querySelectorAll('#teColors button').forEach(x=>x.classList.toggle('on',x===b)); prev(); });
    const ok=()=>{ const name=nm.value.trim(); if(!name){ nm.focus(); return; } closeOverlay(ov); resolve({name, emoji:em.value.trim()||null, color:d.color||null}); };
    nm.addEventListener('keydown',e=>{ if(e.key==='Enter') ok(); });
    ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return; if(x.dataset.x==='ok') ok(); else { closeOverlay(ov); resolve(null); } });
  });
}
async function newThread(){
  const r = await threadEditor(null); if(!r) return null;
  const th = Object.assign({id:uid(), pinned:false, pinnedAt:null, archived:false, hideDone:false, createdAt:Date.now(), lastActivity:Date.now()}, r);
  S.threads.push(th); persist(); return th;
}
async function editThread(id){ const th=thread(id); const r=await threadEditor(th); if(!r) return; Object.assign(th,r); commit(); }
function togglePinThread(id){ const th=thread(id); th.pinned=!th.pinned; th.pinnedAt=th.pinned?Date.now():null; commit(); }
function archiveThread(id, val){
  const th=thread(id); if(th.system==='inbox'){ snack(t('inboxLocked')); return; }
  th.archived=val; if(val){ th.pinned=false; th.pinnedAt=null; }
  if(val && !isWide()){ ui.showThread=false; ui.threadId=null; }
  commit();
  if(val) snack(`${th.name} → ${t('archived')}`, t('undo'), ()=>{ th.archived=false; commit(); });
}
async function deleteThread(id){
  const th=thread(id); if(th.system==='inbox'){ snack(t('inboxLocked')); return; }
  const c=liveNotes(id).length;
  if(!await confirmDlg(t('deleteThread'), t('confirmDelThread', th.name, c), t('del'), true)) return;
  const now=Date.now(); liveNotes(id).forEach(n=>{ n.deletedAt=now; n.pinned=false; });
  th.deletedAt=now; th.pinned=false;
  if(ui.threadId===id){ ui.threadId=null; ui.showThread=false; }
  commit(); snack(t('threadDeleted'));
}

/* =========================================================
   Overlays: sheets, dialogs, snackbar
   ========================================================= */
const overlays=[]; let swallowUntil=0;
function overlay(html, center, onDismiss){
  const ov=document.createElement('div'); ov.className='ov'+(center?' center':''); ov.innerHTML=html; ov._dismiss=onDismiss; ov._t=Date.now();
  // ignore the click that ends the long-press which opened this overlay
    ov.addEventListener('click',e=>{ if(e.target===ov){ closeOverlay(ov); onDismiss&&onDismiss(); } });
  document.body.appendChild(ov); overlays.push(ov); return ov;
}
function closeOverlay(ov){ const i=overlays.indexOf(ov); if(i>=0) overlays.splice(i,1); ov.remove(); }
function closeTopOverlay(){ const ov=overlays[overlays.length-1]; if(!ov) return false; closeOverlay(ov); ov._dismiss&&ov._dismiss(); return true; }
function sheet(title, items, sub){
  const ov = overlay(`<div class="sheet" role="menu"><div class="grab"></div>${title?`<div class="sh-title">${esc(title)}</div>`:''}${sub?`<div class="sh-sub">${esc(sub)}</div>`:''}
    ${items.map((it,i)=>{ const inner=`<span class="ic">${it.icon||''}</span><span class="grow">${esc(it.label)}</span>${it.check?`<span class="chk">${I.checkL}</span>`:''}${it.right||''}`;
      return it.href ? `<a class="mi" data-i="${i}" href="${esc(it.href)}" target="_blank" rel="noopener noreferrer">${inner}</a>` : `<button class="mi ${it.danger?'danger':''}" data-i="${i}" ${it.disabled?'disabled style="opacity:.4"':''}>${inner}</button>`; }).join('')}</div>`);
  ov.addEventListener('click',e=>{ const b=e.target.closest('[data-i]'); if(!b||b.disabled) return; const it=items[+b.dataset.i];
    if(it.href){ setTimeout(()=>{ closeOverlay(ov); it.fn&&it.fn(); },0); return; }
    closeOverlay(ov); it.fn(); });
  return ov;
}
function confirmDlg(title, text, okLabel, danger){
  return new Promise(res=>{
    const ov=overlay(`<div class="dlg" role="alertdialog"><h3>${esc(title)}</h3><p>${esc(text)}</p><div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary ${danger?'danger':''}" data-x="yes">${esc(okLabel)}</button></div></div>`, true, ()=>res(false));
    ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return; closeOverlay(ov); res(x.dataset.x==='yes'); });
  });
}
let snackEl=null, snackTimer=null;
// snack(msg) · snack(msg, label, fn, ms) · snack(msg, [{label, fn}, …], ms)
function snack(msg, actLabel, fn, ms=5000){
  let acts;
  if(Array.isArray(actLabel)){ acts=actLabel; ms = typeof fn==='number' ? fn : 6000; }
  else acts = actLabel ? [{label:actLabel, fn}] : [];
  if(snackEl) snackEl.remove(); clearTimeout(snackTimer);
  const el=document.createElement('div'); el.className='snack'; el.setAttribute('role','status');
  el.innerHTML = `<span class="msg">${esc(msg)}</span>${acts.map((a,i)=>`<button data-i="${i}">${esc(a.label)}</button>`).join('')}`;
  const comp = ui.showThread && $('#compSlot') ? $('#compSlot').getBoundingClientRect() : null;
  if($('#app').classList.contains('kb-lift')){ el.style.bottom='auto'; el.style.top='88px'; }
  else if(comp && comp.height){ el.style.bottom = (window.innerHeight - comp.top + 12)+'px'; if(isWide()){ el.style.left = (R.getBoundingClientRect().left + R.clientWidth/2)+'px'; } }
  el.querySelectorAll('button[data-i]').forEach(b=>{ b.onclick=()=>{ clearTimeout(snackTimer); el.remove(); if(snackEl===el) snackEl=null; const a=acts[+b.dataset.i]; if(a && a.fn) a.fn(); }; });
  document.body.appendChild(el); snackEl=el;
  snackTimer=setTimeout(()=>{ el.remove(); if(snackEl===el) snackEl=null; }, acts.length?ms:2200);
}

/* ---------- menus ---------- */
function noteMenu(id){
  const n=note(id); if(!n) return; const th=thread(n.threadId); const ro=th.archived;
  const items=[
    {icon:I.copy,label:t('copyText'),fn:async()=>snack(await copyText(noteText(n))?t('copied'):t('copyFail'))},
  ];
  if(!ro) items.push(
    {icon:I.edit,label:t('edit'),fn:()=>startEdit(id)},
    {icon:I.move,label:t('moveTo'),fn:()=>pickThread([id],false)});
  items.push({icon:I.copyTo,label:t('copyTo'),fn:()=>pickThread([id],true)});
  if(!ro) items.push(
    {icon:`<span class="pdot" style="background:var(--p${n.priority})"></span>`,label:t('changePri'),fn:()=>priMenu([id])},
    {icon:I.cal,label:n.due?t('deadline')+' '+dueLabel(n.due):t('deadline'),fn:()=>dueMenu(id)},
    {icon:I.pinM,label:n.pinned?t('unpin'):t('pin'),fn:()=>togglePin(id)},
    {icon:I.checkL,label:n.done?t('markUndone'):t('markDone'),fn:()=>toggleDone(id)},
    {icon:I.select,label:t('select'),fn:()=>enterSelect(id)},
    {icon:I.trash,label:t('del'),danger:true,fn:()=>deleteNotes([id])});
  else items.push({icon:I.select,label:t('select'),fn:()=>enterSelect(id)});
  sheet(null, items, preview(n));
}
function priMenu(ids){
  const cur = ids.length===1 ? note(ids[0]).priority : null;
  sheet(t('priority'), [3,2,1,0].map(p=>({icon:`<span class="pdot" style="background:var(--p${p})"></span>`, label:t('pri')[p], check:cur===p, fn:()=>{ setPriority(ids,p); if(ui.selecting) exitSelect(); }})));
}
function pickThread(ids, copy){
  const cur=ui.threadId;
  let list = activeThreads().filter(x=>x.id!==cur);
  const recent = (S.settings.recent||[]).filter(id=>list.some(x=>x.id===id));
  const inbox = list.find(x=>x.system==='inbox');
  const rest = list.filter(x=>x!==inbox && !recent.includes(x.id)).sort((a,b)=>b.lastActivity-a.lastActivity);
  const ordered = [...(inbox?[inbox]:[]), ...recent.map(id=>thread(id)).filter(x=>x!==inbox), ...rest];
  const items = [{icon:I.newThread,label:t('newThread'),fn:async()=>{ const th=await newThread(); if(th) moveOrCopy(ids, th.id, copy); }}]
    .concat(ordered.map(th=>({icon:avatar(th,'xs'), label:th.name, fn:()=>moveOrCopy(ids, th.id, copy)})));
  sheet(copy?t('copyTo'):t('moveTo'), items);
}
function threadMenu(id, fromList){
  const th=thread(id); const inbox=th.system==='inbox';
  const items=[];
  if(!fromList){
    items.push({icon:th.hideDone?I.eye:I.eyeOff,label:th.hideDone?t('showDone'):t('hideDone'),fn:()=>{ th.hideDone=!th.hideDone; commit(); }});
    items.push({icon:I.filter,label:t('filterPri'),check:!!ui.filter,fn:()=>{ ui.filter = ui.filter?null:new Set(); render(); }});
    items.push({icon:I.cal,label:t('dates'),fn:()=>goLeft('agenda')});
    if(!th.archived) items.push({icon:I.select,label:t('selectNotes'),fn:()=>enterSelect(null)});
  }
  if(!th.archived){
    items.push({icon:I.edit,label:t('editThread'),fn:()=>editThread(id)});
    items.push({icon:I.pinM,label:th.pinned?t('unpinThread'):t('pinThread'),fn:()=>togglePinThread(id)});
  }
  if(!inbox){
    items.push({icon:I.archive,label:th.archived?t('unarchive'):t('archive'),fn:()=>archiveThread(id,!th.archived)});
    items.push({icon:I.trash,label:t('deleteThread'),danger:true,fn:()=>deleteThread(id)});
  }
  sheet(((th.emoji||'')+' '+th.name).trim(), items);
}
function mainMenu(){
  const nArch = S.threads.filter(x=>x.archived&&!x.deletedAt).length, nTrash=S.notes.filter(n=>n.deletedAt).length;
  sheet('MemoChat', [
    {icon:I.newThread,label:t('newThread'),fn:createThreadAndOpen},
    {icon:I.cal,label:t('dates'),fn:()=>goLeft('agenda')},
    {icon:I.archive,label:t('archived'),right:nArch?`<span style="color:var(--muted);font-size:14px">${nArch}</span>`:'',fn:()=>goLeft('archive')},
    {icon:I.trash,label:t('trash'),right:nTrash?`<span style="color:var(--muted);font-size:14px">${nTrash}</span>`:'',fn:()=>goLeft('trash')},
    {icon:I.settings,label:t('settings'),fn:()=>goLeft('settings')},
    {icon:I.globe,label:S.settings.lang==='en'?'Čeština':'English',fn:()=>{ S.settings.lang = S.settings.lang==='en'?'cs':'en'; shownThread=null; commit(); }},
  ]);
}
async function createThreadAndOpen(){ const th=await newThread(); if(th){ ui.left='list'; openThread(th.id); } }
function goLeft(v){ ui.left=v; if(!isWide()) ui.showThread=false; pushNav(); render(); }
function openSearch(scope){
  ui.search.q=''; ui.search.scope=scope||null; ui.search.pri=new Set(); ui.search.done=true;
  ui.search.from = scope && !isWide() ? scope : null;
  if(!isWide()) ui.showThread=false;
  ui.left='search'; L.innerHTML=''; pushNav(); render();
}

/* =========================================================
   Deadlines: menu, dialog, agenda, in-app reminder
   ========================================================= */
/* reminder stored in due.remind: 'at'|'15m'|'1h'|'1d'|'morning'|'none'|{at:'YYYY-MM-DDTHH:MM'} */
function remindOf(due){ return due.remind || (due.time ? '15m' : 'morning'); }
function remindTs(due){
  const r=remindOf(due); if(r==='none') return null;
  if(typeof r==='object'){ const v=new Date(r.at).getTime(); return isNaN(v)?null:v; }
  const s=dueStart(due), {y,m,d}=dueParts(due);
  if(!due.time){ if(r==='1d') return new Date(y,m-1,d-1,9,0).getTime(); return new Date(y,m-1,d,9,0).getTime(); }
  return {at:s, '15m':s-15*60000, '1h':s-3600000, '1d':s-DAY}[r] ?? s-15*60000;
}
function remindLabel(due){
  const r=remindOf(due);
  if(typeof r==='object'){ const v=new Date(r.at); const sd=v.toLocaleDateString(loc(),{weekday:'short',day:'numeric',month:'numeric'}); return sd+' '+pad2(v.getHours())+':'+pad2(v.getMinutes()); }
  return {at:t('rAt'),'15m':t('r15'),'1h':t('r1h'),'1d':due.time?t('r1d'):t('rDayBefore'),morning:t('rMorning'),none:t('rNone')}[r];
}
function remindOptions(due){ return due.time ? ['at','15m','1h','1d','none'] : ['morning','1d','none']; }
function gcalUrl(n){
  const due=n.due, th=thread(n.threadId); const {y,m,d}=dueParts(due);
  const f=dt=>`${dt.getFullYear()}${pad2(dt.getMonth()+1)}${pad2(dt.getDate())}`;
  let dates;
  if(due.time){ const s=new Date(dueStart(due)), e=new Date(dueStart(due)+3600000); const ft=dt=>`${f(dt)}T${pad2(dt.getHours())}${pad2(dt.getMinutes())}00`; dates=`${ft(s)}/${ft(e)}`; }
  else dates=`${f(new Date(y,m-1,d))}/${f(new Date(y,m-1,d+1))}`;
  let tz=''; try{ tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''; }catch(e){}
  const q=new URLSearchParams({action:'TEMPLATE', text:noteSnippet(n).slice(0,120), dates, details:(noteText(n)+'\n\n— MemoChat · '+((th&&th.name)||'')).slice(0,1500)});
  if(tz && due.time) q.set('ctz',tz);
  return 'https://calendar.google.com/calendar/render?'+q.toString();
}
function gcalDayUrl(cal){ const {y,m,d}=dueParts(cal); return `https://calendar.google.com/calendar/r/day/${y}/${m}/${d}`; }
function calConflict(n){ return !!n.cal && (!n.due || n.cal.date!==n.due.date || (n.cal.time||null)!==(n.due.time||null)); }
function calCheck(n, reason){
  if(!n || !n.cal) return;
  if(reason==='change' && !calConflict(n)) return;
  if(reason==='change' && !n.due) reason='removed';
  setTimeout(()=>calDialog(n, reason), 250);
}
function calDialog(n, reason){
  const old = dueFull(n.cal);
  const msg = {change:t('calChanged',old), removed:t('calRemoved',old), done:t('calDone',old), deleted:t('calDeleted',old)}[reason] || t('calChanged',old);
  const canAdd = reason==='change' && n.due && !n.done && !n.deletedAt;
  const ov=overlay(`<div class="dlg"><h3>${I.gcal} ${t('calTitle')}</h3><p>${esc(msg)}</p>
    <div class="btns" style="justify-content:flex-start">
      <a class="btn" href="${gcalDayUrl(n.cal)}" target="_blank" rel="noopener noreferrer">${t('openCal')}</a>
      ${canAdd?`<a class="btn" data-x="add" href="${esc(gcalUrl(n))}" target="_blank" rel="noopener noreferrer">${t('addNew')}</a>`:''}
      <span style="flex:1"></span>
      <button class="btn" data-x="later">${t('laterBtn')}</button>
      <button class="btn primary" data-x="fixed">${t('fixed')}</button></div></div>`, true);
  ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return;
    if(x.dataset.x==='later'){ closeOverlay(ov); return; }
    if(x.dataset.x==='add'){ setTimeout(()=>{ n.cal={date:n.due.date,time:n.due.time||null}; closeOverlay(ov); commit(); },0); return; }
    if(x.dataset.x==='fixed'){ if(n.due && !n.done && !n.deletedAt) n.cal={date:n.due.date,time:n.due.time||null}; else delete n.cal; closeOverlay(ov); commit(); }
  });
}
function remindMenu(target){
  const due = target==='comp' ? ui.comp.due : (note(target)||{}).due; if(!due) return;
  const cur=remindOf(due);
  const set = r => { due.remind=r; if(target==='comp'){ renderComposer(false); } else { const n=note(target); delete n.remindFired; commit(); snack(t('remindSet', remindLabel(due))); } };
  const items = remindOptions(due).map(k=>({icon:k==='none'?I.x:I.bell, label:k==='1d'&&!due.time?t('rDayBefore'):{at:t('rAt'),'15m':t('r15'),'1h':t('r1h'),'1d':t('r1d'),morning:t('rMorning'),none:t('rNone')}[k], check:cur===k, fn:()=>set(k)}));
  items.push({icon:I.cal, label:t('rCustom'), check:typeof cur==='object', fn:()=>{
    const base = typeof cur==='object' ? cur.at : (()=>{ const v=new Date(remindTs(due)||Date.now()); return `${ymd(v)}T${pad2(v.getHours())}:${pad2(v.getMinutes())}`; })();
    const ov=overlay(`<div class="dlg duedlg"><h3>${t('remind')}</h3><label class="field">${t('remindAt')}<input id="rmAt" type="datetime-local" value="${base}"></label><div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('save')}</button></div></div>`, true);
    ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return; if(x.dataset.x==='ok'){ const v=$('#rmAt',ov).value; if(!v) return; closeOverlay(ov); set({at:v}); } else closeOverlay(ov); });
  }});
  sheet(t('remind')+' · '+remindLabel(due), items);
}
function applyDue(target, due){
  const prev = target==='comp' ? ui.comp.due : (note(target)||{}).due;
  if(due && prev && prev.remind && (prev.remind==='none' || typeof prev.remind==='object') && due.remind===undefined) due.remind=prev.remind;
  if(target==='comp'){ ui.comp.due=due; renderComposer(false); const i=$('#cInput'); i&&i.focus(); return; }
  const n=note(target); if(!n) return; n.due=due; delete n.remindFired; commit();
  snack(due?t('dateSet',dueLabel(due)):t('dateRemoved'));
  calCheck(n,'change');
}
function dueMenu(target){
  const cur = target==='comp' ? ui.comp.due : (note(target)||{}).due;
  const day = k => { const d=new Date(); d.setDate(d.getDate()+k); return ymd(d); };
  const items = [
    {icon:I.cal,label:t('today2'),fn:()=>applyDue(target,{date:day(0),time:null})},
    {icon:I.cal,label:t('tomorrow'),fn:()=>applyDue(target,{date:day(1),time:null})},
    {icon:I.cal,label:t('inWeek'),fn:()=>applyDue(target,{date:day(7),time:null})},
    {icon:sv('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),label:t('pickDate'),fn:()=>dueDialog(target,cur)},
  ];
  if(cur){
    items.push({icon:I.bell,label:t('remind')+': '+remindLabel(cur),fn:()=>remindMenu(target)});
    if(target!=='comp'){ const n=note(target); items.push({icon:I.gcal,label:n.cal&&!calConflict(n)?t('gcalAgain'):t('addGcal'),href:gcalUrl(n),fn:()=>{ n.cal={date:n.due.date,time:n.due.time||null}; commit(); }}); }
    items.push({icon:I.x,label:t('removeDate'),danger:true,fn:()=>applyDue(target,null)});
  }
  sheet(cur?t('addDate')+' · '+dueLabel(cur):t('addDate'), items);
}
function dueDialog(target, cur){
  const d = cur ? cur.date : ymd(new Date());
  const ov=overlay(`<div class="dlg duedlg"><h3>${t('setDate')}</h3>
    <div class="row2"><label class="field">${t('date')}<input id="ddDate" type="date" value="${d}"></label>
    <label class="field">${t('timeOpt')}<input id="ddTime" type="time" value="${cur&&cur.time?cur.time:''}"></label></div>
    <label class="field">${t('remind')}<select id="ddRem"></select></label>
    <div class="btns">${cur?`<button class="btn danger" data-x="rm" style="margin-right:auto">${t('removeDate')}</button>`:''}<button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('save')}</button></div></div>`, true);
  const sel=$('#ddRem',ov), tm=$('#ddTime',ov);
  const fill=()=>{ const timed=!!tm.value; const prevVal=sel.value || (cur && typeof cur.remind==='string' ? cur.remind : ''); const opts=remindOptions({time:timed?'x':null});
    sel.innerHTML = opts.map(k=>`<option value="${k}">${k==='1d'&&!timed?t('rDayBefore'):{at:t('rAt'),'15m':t('r15'),'1h':t('r1h'),'1d':t('r1d'),morning:t('rMorning'),none:t('rNone')}[k]}</option>`).join('');
    sel.value = opts.includes(prevVal) ? prevVal : (timed?'15m':'morning'); };
  fill(); tm.addEventListener('input',fill); tm.addEventListener('change',fill);
  ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return;
    if(x.dataset.x==='no'){ closeOverlay(ov); return; }
    if(x.dataset.x==='rm'){ closeOverlay(ov); applyDue(target,null); return; }
    const date=$('#ddDate',ov).value, time=tm.value||null;
    if(!date){ $('#ddDate',ov).focus(); return; }
    closeOverlay(ov); applyDue(target,{date,time,remind:sel.value});
  });
}
function agendaRow(n){
  const th=thread(n.threadId), over=isOverdue(n);
  const time = over ? dueDay(n.due)+(n.due.time?'<br>'+n.due.time:'') : (n.due.time || t('allDay'));
  return `<div class="arow ${over?'over':''} ${n.done?'dn':''}" data-act="a-open" data-nid="${n.id}">
    <span class="stripe" style="background:var(--p${n.priority})"></span>
    <div class="atime">${time}</div>
    <div class="amain"><div class="atext">${esc(noteSnippet(n))}</div><div class="ath">${esc(((th.emoji||'')+' '+th.name).trim())}</div>${calConflict(n)?`<button class="calwarn" data-act="cal-fix" data-nid="${n.id}">${I.calS}${t('calMismatch')}</button>`:''}</div>
    <button class="acheck ${n.done?'on':''}" data-act="a-check" data-nid="${n.id}" aria-label="${n.done?t('markUndone'):t('markDone')}">${n.done?I.checkS:''}</button></div>`;
}
function agendaData(){
  const showDone=!!ui.agendaDone;
  let ns=dueNotes(); if(!showDone) ns=ns.filter(n=>!n.done);
  ns.sort((a,b)=>dueSort(a.due)-dueSort(b.due) || b.priority-a.priority);
  const overdue=ns.filter(n=>isOverdue(n));
  const earlier=ns.filter(n=>n.done && dueDiff(n.due)<0);
  const rest=ns.filter(n=>!overdue.includes(n) && !earlier.includes(n));
  const soon=rest.filter(n=>dueDiff(n.due)<30), later=rest.filter(n=>dueDiff(n.due)>=30);
  return {overdue, earlier, soon, later};
}
function renderAgenda(){
  const {overdue, earlier, soon, later} = agendaData();
  const open = ui.agendaOpen || (ui.agendaOpen=new Set());
  let h='';
  if(overdue.length){ h+=`<div class="agh over">${t('overdue')} <small>· ${overdue.length}</small></div>`+overdue.map(agendaRow).join(''); }
  if(soon.length){
    h+=`<div class="agsub" style="padding-top:14px">${t('next30')}</div>`;
    let last=null;
    soon.forEach(n=>{ if(n.due.date!==last){ last=n.due.date; h+=`<div class="agh">${esc(dueDay(n.due,true))}</div>`; } h+=agendaRow(n); });
  }
  if(later.length){
    h+=`<div class="agh">${t('later')} <small>· ${later.length}</small></div><div class="agsub">${t('laterSub')}</div>`;
    h+=later.map(n=>{ const th=thread(n.threadId), o=open.has(n.id);
      return `<div class="arow compact ${o?'open':''} ${n.done?'dn':''}" data-act="a-toggle" data-nid="${n.id}"><span class="pd" style="background:var(--p${n.priority})"></span><span class="adate">${esc(dueFull(n.due))}</span><span class="chev">${I.chev}</span>
        ${o?`<div class="aexp"><div class="atext">${esc(noteText(n)||noteSnippet(n))}</div><div class="ath">${esc(((th.emoji||'')+' '+th.name).trim())}</div><div><button class="btn" data-act="a-open" data-nid="${n.id}">${t('open')}</button></div></div>`:''}</div>`; }).join('');
  }
  if(earlier.length){ h+=`<div class="agh">${t('earlierDone')}</div>`+earlier.slice(-20).map(agendaRow).join(''); }
  if(!h) h=`<div class="empty">${art('table')}<div class="etitle">${t('noDates')}</div>${t('noDatesSub')}</div>`;
  const sc = L.querySelector('#agScroll'); const top = sc && L.dataset.view==='agenda' ? sc.scrollTop : 0;
  L.innerHTML = simpleHeader(t('dates'), `<button class="ib" data-act="ag-copy" title="${t('copyList')}" aria-label="${t('copyList')}">${I.copy}</button><button class="ib" data-act="ag-done" title="${ui.agendaDone?t('hideDoneD'):t('showDoneD')}" aria-label="${ui.agendaDone?t('hideDoneD'):t('showDoneD')}">${ui.agendaDone?I.eyeOff:I.eye}</button>`) + `<div class="scroll" id="agScroll" style="padding-bottom:30px">${h}</div>`;
  L.dataset.view='agenda'; const ns=$('#agScroll'); if(ns) ns.scrollTop=top;
}
async function copyAgenda(){
  const {overdue, soon} = agendaData(); const nm = n=>{ const th=thread(n.threadId); return ` (${th.name})`; };
  let out = `${t('dates')} — ${t('next30').toLowerCase()}\n`;
  if(overdue.length) out += `\n${t('overdue')}:\n` + overdue.map(n=>`- ${dueLabel(n.due)} · ${noteSnippet(n)}${nm(n)}`).join('\n') + '\n';
  let last=null;
  soon.forEach(n=>{ if(n.due.date!==last){ last=n.due.date; out+=`\n${dueDay(n.due,true)}:\n`; } out += `- ${n.due.time||t('allDay')} · ${noteSnippet(n)}${nm(n)}\n`; });
  snack(await copyText(out.trim())?t('copied'):t('copyFail'));
}
const alerted = new Set();
function checkReminders(){
  const now=Date.now();
  dueNotes().forEach(n=>{
    if(n.done) return;
    const r=remindTs(n.due); if(!r) return;
    if(now>=r && now-r<12*3600000 && n.remindFired!==r && !alerted.has(n.id+'@'+r)){
      alerted.add(n.id+'@'+r); n.remindFired=r; persist();
      const s=dueStart(n.due); const when = dueLabel(n.due) + (n.due.time && s>now ? ' ('+relIn(s-now)+')' : '');
      snack(t('remindAlert', noteSnippet(n), when), t('open'), ()=>openThread(n.threadId,{flash:[n.id]}), 20000);
    }
  });
  if(ui.left==='list'){ const b=$('#left [data-act="agenda"] .ibadge'), c=dueBadge(); if((b?+b.textContent:0)!==c) renderLeft(); }
}

/* =========================================================
   Trash actions
   ========================================================= */
function restoreNote(id){
  const n=note(id); let th=thread(n.threadId);
  if(!th || th.deletedAt){ th = th && th.deletedAt ? (th.deletedAt=null, th.archived=false, th) : S.threads.find(x=>x.system==='inbox'); }
  if(th.archived) th.archived=false;
  n.threadId=th.id; n.deletedAt=null; bumpActivity(th.id); persist();
  snack(t('restoredTo', th.name), t('show'), ()=>{ ui.left='list'; openThread(th.id,{flash:[n.id]}); });
  render();
}
async function forever(id){ if(!await confirmDlg(t('delForever'), t('confirmDelForever'), t('delForever'), true)) return; S.notes=S.notes.filter(n=>n.id!==id); purgeTrash(); commit(); }
async function emptyTrash(){ if(!await confirmDlg(t('emptyTrash'), t('confirmEmpty'), t('emptyTrash'), true)) return; S.notes=S.notes.filter(n=>!n.deletedAt); purgeTrash(); commit(); }

/* =========================================================
   History
   ========================================================= */
function showHistory(id){
  const n=note(id); if(!n||!n.history||!n.history.length) return;
  const ro = thread(n.threadId).archived;
  const ov = overlay(`<div class="sheet"><div class="grab"></div><div class="sh-title">${t('history')}</div><div class="hist">${n.history.map((v,i)=>{
    const txt = v.type==='list' ? [v.title, ...(v.items||[]).map(x=>'☐ '+x.text)].filter(Boolean).join('\n') : v.text;
    return `<div class="hv"><div class="hd">${i===0?t('original')+' · ':''}${fullWhen(v.at)}</div><div class="ht">${esc(txt)}</div>${ro?'':`<button class="btn" data-v="${i}">${t('restoreVer')}</button>`}</div>`; }).join('')}</div></div>`);
  ov.addEventListener('click',e=>{ const b=e.target.closest('[data-v]'); if(!b) return; const v=n.history[+b.dataset.v]; pushHistory(n);
    n.type=v.type; n.text=v.text; n.title=v.title; n.items=JSON.parse(JSON.stringify(v.items||[])); n.editedAt=Date.now();
    closeOverlay(ov); commit(); flash([n.id]); snack(t('restoredVer')); });
}

/* =========================================================
   Photos
   ========================================================= */
function pickPhoto(){ const fi=$('#photoInput'); fi.value=''; fi.click(); }
$('#photoInput').addEventListener('change', async e=>{
  const f=e.target.files[0]; if(!f) return;
  try{ ui.comp.photo = await downscale(f, 1280, .78); if(ui.comp.mode==='list'){} renderComposer(false); $('#cInput').focus(); }catch(err){ snack('Image error'); }
});
function downscale(file, max, q){
  return new Promise((res,rej)=>{
    const url=URL.createObjectURL(file); const img=new Image();
    img.onload=()=>{ let w=img.naturalWidth, h=img.naturalHeight; const k=Math.min(1, max/Math.max(w,h)); w=Math.round(w*k); h=Math.round(h*k);
      const c=document.createElement('canvas'); c.width=w; c.height=h; const ctx=c.getContext('2d'); ctx.fillStyle='#fff'; ctx.fillRect(0,0,w,h); ctx.drawImage(img,0,0,w,h);
      URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', q)); };
    img.onerror=e=>{ URL.revokeObjectURL(url); rej(e); };
    img.src=url;
  });
}
function viewPhoto(src){ if(typeof src!=='string' || !RE_PHOTO.test(src)) return; const v=document.createElement('div'); v.className='viewer'; v.innerHTML=`<img src="${src}" alt="">`; v.onclick=()=>{ v.remove(); const i=overlays.indexOf(v); if(i>=0) overlays.splice(i,1); }; overlays.push(v); v._dismiss=null; document.body.appendChild(v); }

/* =========================================================
   Backup / restore / export
   ========================================================= */
const b64 = u8 => { let s=''; for(let i=0;i<u8.length;i+=0x8000) s+=String.fromCharCode.apply(null, u8.subarray(i,i+0x8000)); return btoa(s); };
const unb64 = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
async function deriveKey(pw, salt, iter){ const base=await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']); return crypto.subtle.deriveKey({name:'PBKDF2', salt, iterations:iter, hash:'SHA-256'}, base, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']); }
async function makeBackup(pw){
  const data = {threads:S.threads, notes:S.notes, settings:Object.assign({},S.settings)};
  const base = {app:'MemoChat', format:1, createdAt:new Date().toISOString()};
  if(!pw) return JSON.stringify(Object.assign(base,{encrypted:false, data}));
  const salt=crypto.getRandomValues(new Uint8Array(16)), iv=crypto.getRandomValues(new Uint8Array(12)), iter=250000;
  const key=await deriveKey(pw, salt, iter);
  const ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, new TextEncoder().encode(JSON.stringify(data))));
  return JSON.stringify(Object.assign(base,{encrypted:true, kdf:'PBKDF2-SHA256', iterations:iter, salt:b64(salt), iv:b64(iv), data:b64(ct)}));
}
async function saveFile(filename, content, onSaved){
  try{
    const type = filename.endsWith('.md') ? 'text/markdown;charset=utf-8' : 'application/json;charset=utf-8';
    const url = URL.createObjectURL(new Blob([content], {type}));
    const a = document.createElement('a'); a.href=url; a.download=filename; a.rel='noopener'; a.style.display='none';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 60000);
    onSaved&&onSaved(); snack(t('saved')); return;
  }catch(e){ console.warn('download failed', e); }
  // fallback: show content to copy
  const ov=overlay(`<div class="dlg"><h3>${esc(filename)}</h3><p>${t('noDownload')}</p><label class="field"><textarea readonly>${esc(content.length>400000?content.slice(0,400000)+'\n…':content)}</textarea></label><div class="btns"><button class="btn" data-x="close">${t('cancel')}</button><button class="btn primary" data-x="copy">${t('copyAll')}</button></div></div>`, true);
  ov.addEventListener('click',async e=>{ const x=e.target.closest('[data-x]'); if(!x) return; if(x.dataset.x==='copy'){ const ok=await copyText(content); snack(ok?t('copied'):t('copyFail')); if(ok) onSaved&&onSaved(); } closeOverlay(ov); });
}
function backupDialog(){
  const ov=overlay(`<div class="dlg"><h3>${t('backupNow')}</h3><p>${t('pwHint')}</p>
    <label class="field">${t('pwOptional')}<input id="bp1" type="password" autocomplete="new-password"></label>
    <label class="field">${t('pwRepeat')}<input id="bp2" type="password" autocomplete="new-password"></label>
    <p id="bpErr" style="color:var(--danger);display:none">${t('pwMismatch')}</p>
    <div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('backUp')}</button></div></div>`, true);
  ov.addEventListener('click',async e=>{ const x=e.target.closest('[data-x]'); if(!x) return;
    if(x.dataset.x==='no'){ closeOverlay(ov); return; }
    const p1=$('#bp1',ov).value, p2=$('#bp2',ov).value;
    if(p1!==p2){ $('#bpErr',ov).style.display='block'; return; }
    closeOverlay(ov);
    const content = await makeBackup(p1);
    const d=new Date(); const stamp=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    await saveFile(`memochat-backup-${stamp}${p1?'-encrypted':''}.json`, content, ()=>{ S.settings.lastBackup=Date.now(); S.settings.nudgeSnooze=null; commit(); });
  });
}
$('#importInput').addEventListener('change', async e=>{
  const f=e.target.files[0]; if(!f) return;
  let obj; try{ obj=JSON.parse(await f.text()); }catch(err){ snack(t('badFile')); return; }
  if(!obj || obj.app!=='MemoChat'){ snack(t('badFile')); return; }
  let data = obj.data;
  if(obj.encrypted){
    data = await new Promise(res=>{
      const ov=overlay(`<div class="dlg"><h3>${t('restoreFile')}</h3><p>${t('pwEnter')}</p><label class="field">${t('password')}<input id="ip" type="password"></label><p id="ipErr" style="color:var(--danger);display:none">${t('pwWrong')}</p><div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('restore')}</button></div></div>`, true, ()=>res(null));
      setTimeout(()=>$('#ip',ov).focus(),30);
      const go=async()=>{ try{ const key=await deriveKey($('#ip',ov).value, unb64(obj.salt), obj.iterations||250000); const pt=await crypto.subtle.decrypt({name:'AES-GCM', iv:unb64(obj.iv)}, key, unb64(obj.data)); closeOverlay(ov); res(JSON.parse(new TextDecoder().decode(pt))); }catch(err){ $('#ipErr',ov).style.display='block'; } };
      $('#ip',ov).addEventListener('keydown',e=>{ if(e.key==='Enter') go(); });
      ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return; if(x.dataset.x==='ok') go(); else { closeOverlay(ov); res(null); } });
    });
    if(!data) return;
  }
  if(!data || !Array.isArray(data.threads) || !Array.isArray(data.notes)){ snack(t('badFile')); return; }
  if(!await confirmDlg(t('restoreFile'), t('confirmRestore', data.threads.filter(x=>!x.deletedAt).length, data.notes.filter(n=>!n.deletedAt).length), t('restore'), true)) return;
  const clean = sanitizeData(data);
  S = {threads:clean.threads, notes:clean.notes, settings:Object.assign({}, DEFAULT_SETTINGS, clean.settings, {lang:S.settings.lang, theme:S.settings.theme, welcome:false})};
  ensureInbox(); ui.threadId=null; ui.showThread=false; ui.left='list'; shownThread=null; commit(); snack(t('restoredOk'));
});
function exportMarkdown(){
  const pe=['🟢','🟡','🟠','🔴'];
  const d=new Date(); const stamp=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  let md = `# MemoChat — ${stamp}\n\n`;
  const ths = sortedThreads(S.threads.filter(x=>!x.deletedAt));
  ths.forEach(th=>{
    const ns=liveNotes(th.id); md += `## ${th.emoji?th.emoji+' ':''}${th.name}${th.archived?' (archived)':''}\n\n`;
    if(!ns.length){ md+='_—_\n\n'; return; }
    let lastDay=null;
    ns.forEach(n=>{
      const dd=new Date(n.createdAt); const day=`${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}-${String(dd.getDate()).padStart(2,'0')}`;
      if(day!==lastDay){ md+=`### ${day}\n\n`; lastDay=day; }
      const head = `- ${pe[n.priority]} ${fmtTime(n.createdAt)}${n.done?' ✓':''}${n.pinned?' 📌':''}${n.due?` 📅 ${n.due.date}${n.due.time?' '+n.due.time:''}`:''}`;
      if(n.type==='list'){ md += `${head} **${n.title||t('checklist')}**\n` + n.items.map(i=>`  - [${i.done?'x':' '}] ${i.text}`).join('\n') + '\n'; }
      else { md += `${head} ${(n.photo?'[📷] ':'')+(n.text||'').split('\n').join('\n  ')}\n`; }
    });
    md+='\n';
  });
  saveFile(`memochat-${stamp}.md`, md);
}
function ensureInbox(){
  if(!S.threads.some(x=>x.system==='inbox' && !x.deletedAt)){
    S.threads.unshift({id:uid(), name:'Inbox', emoji:'📥', color:'gray', system:'inbox', pinned:true, pinnedAt:0, archived:false, hideDone:false, createdAt:Date.now(), lastActivity:Date.now()});
  }
}

/* =========================================================
   Events
   ========================================================= */
document.addEventListener('click', async e=>{
  const a = e.target.closest('[data-act]');
  if(a && !e.target.closest('.ov')){
    const act=a.dataset.act;
    switch(act){
      case 'back': return goBack();
      case 'toggle-theme': S.settings.theme = effTheme()==='dark'?'light':'dark'; return commit();
      case 'main-menu': return mainMenu();
      case 'new-thread': return createThreadAndOpen();
      case 'open-search': return openSearch(null);
      case 'thread-search': return openSearch(ui.threadId);
      case 'thread-menu': return threadMenu(ui.threadId,false);
      case 'edit-thread': { const th=thread(ui.threadId); if(th && !th.archived) editThread(th.id); return; }
      case 'snooze-nudge': S.settings.nudgeSnooze=Date.now(); return commit();
      case 'backup': return backupDialog();
      case 'import': { const fi=$('#importInput'); fi.value=''; return fi.click(); }
      case 'export-md': return exportMarkdown();
      case 'welcome-x': S.settings.welcome=false; return commit();
      case 'lang': S.settings.lang=a.dataset.v; shownThread=null; return commit();
      case 'theme': S.settings.theme=a.dataset.v||null; return commit();
      case 's-scope': ui.search.scope=null; ui.search.from=null; return renderSearch();
      case 's-pri': { const p=+a.dataset.p, s=ui.search.pri; s.has(p)?s.delete(p):s.add(p); return renderSearch(); }
      case 's-done': ui.search.done=!ui.search.done; return renderSearch();
      case 'empty-trash': return emptyTrash();
      case 't-restore': return restoreNote(a.dataset.nid);
      case 't-forever': return forever(a.dataset.nid);
      case 'pinbar': { const ps=pinnedNotes(); const n=ps[ui.pinIdx%ps.length]; if(n){ const th=thread(ui.threadId); if(th.hideDone&&n.done){} flash([n.id]); } ui.pinIdx=(ui.pinIdx+1)%Math.max(1,ps.length); setTimeout(renderPinbar,400); return; }
      case 'f-pri': { const p=+a.dataset.p; ui.filter.has(p)?ui.filter.delete(p):ui.filter.add(p); renderFilterbar(); return renderMessages(false); }
      case 'f-clear': ui.filter=null; return render();
      case 'toggle-hide': { const th=thread(ui.threadId); th.hideDone=!th.hideDone; return commit(); }
      case 'unarchive': return archiveThread(ui.threadId,false);
      case 'comp-pri': ui.comp.pri=+a.dataset.p; return renderComposer(false);
      case 'comp-plus': return sheet(t('addWhat'), [
          {icon:I.list,label:t('checklist'),check:ui.comp.mode==='list',fn:()=>{ ui.comp.mode = ui.comp.mode==='list'?'text':'list'; renderComposer(false); (ui.comp.mode==='list'?$('#cTitle'):$('#cInput')).focus(); }},
          {icon:I.image,label:t('photo'),fn:pickPhoto},
          {icon:I.cal,label:t('addDate'),check:!!ui.comp.due,fn:()=>dueMenu('comp')}]);
      case 'comp-due': if(e.target.closest('[data-act="comp-due-x"]')) return; return dueMenu('comp');
      case 'comp-due-x': ui.comp.due=null; return renderComposer(false);
      case 'agenda': return goLeft('agenda');
      case 'ag-done': ui.agendaDone=!ui.agendaDone; return renderAgenda();
      case 'ag-copy': return copyAgenda();
      case 'cal-fix': { const n=note(a.dataset.nid); if(n) calDialog(n,'change'); return; }
      case 'a-toggle': { const id=a.dataset.nid; const o=ui.agendaOpen||(ui.agendaOpen=new Set()); o.has(id)?o.delete(id):o.add(id); return renderAgenda(); }
      case 'a-check': { const n=note(a.dataset.nid); if(n){ setDone([n.id], !n.done); } return; }
      case 'a-open': { const n=note(a.dataset.nid); if(n) openThread(n.threadId,{flash:[n.id]}); return; }
      case 'comp-text': ui.comp.mode='text'; renderComposer(false); return $('#cInput').focus();
      case 'comp-photo-x': ui.comp.photo=null; return renderComposer(false);
      case 'send': return sendNote();
      case 'cancel-edit': return cancelEdit();
      case 'sel-exit': return exitSelect();
      case 'sel-move': return pickThread([...ui.sel], false);
      case 'sel-copy': return pickThread([...ui.sel], true);
      case 'sel-pri': return priMenu([...ui.sel]);
      case 'sel-done': { const ids=[...ui.sel]; const all=ids.every(id=>note(id).done); setDone(ids,!all); return exitSelect(); }
      case 'sel-del': { const ids=[...ui.sel]; if(ids.length>1 && !await confirmDlg(t('del'), t('deleteSel',ids.length), t('del'), true)) return; return deleteNotes(ids); }
    }
  }
  // thread rows
  const tr = e.target.closest('.trow[data-tid]');
  if(tr && !suppressClick) return openThread(tr.dataset.tid);
  const res = e.target.closest('.res[data-nid]');
  if(res){ const n=note(res.dataset.nid); if(!n) return snack(t('notFound')); const th=thread(n.threadId); if(th.hideDone && n.done){ th.hideDone=false; } if(ui.filter) ui.filter=null; return openThread(n.threadId,{flash:[n.id]}); }
});

/* ---------- note gestures: tap, long-press, swipe, right-click ---------- */
let g=null, suppressClick=false, lastMenuAt=0, lpPending=false;
function openMenuOnce(fn){ const now=Date.now(); if(now-lastMenuAt<700) return; lastMenuAt=now; fn(); }
document.addEventListener('pointerdown', e=>{
  if(e.button!==0) return;
  const el = e.target.closest('.note[data-nid], .trow[data-tid]'); if(!el || e.target.closest('.ov')) return;
  suppressClick=false;
  g = {el, x0:e.clientX, y0:e.clientY, dx:0, swiping:false, moved:false, pid:e.pointerId, isNote:el.classList.contains('note')};
  g.timer = setTimeout(()=>{ if(!g || g.moved) return; suppressClick=true; lpPending=true; if(navigator.vibrate) try{navigator.vibrate(12);}catch(_){}
    const gg=g; g=null;
    if(gg.isNote){ const id=gg.el.dataset.nid; if(ui.selecting) toggleSel(id); else openMenuOnce(()=>noteMenu(id)); }
    else if(ui.left!=='search') openMenuOnce(()=>threadMenu(gg.el.dataset.tid,true));
  }, 480);
});
document.addEventListener('pointermove', e=>{
  if(!g || e.pointerId!==g.pid) return;
  const dx=e.clientX-g.x0, dy=e.clientY-g.y0;
  if(!g.moved && (Math.abs(dx)>8 || Math.abs(dy)>8)){ g.moved=true; clearTimeout(g.timer);
    const th = ui.threadId && thread(ui.threadId);
    if(g.isNote && Math.abs(dx)>Math.abs(dy) && dx<0 && !ui.selecting && th && !th.archived){ g.swiping=true; try{ g.el.setPointerCapture(g.pid); }catch(_){} g.bg=g.el.previousElementSibling; }
  }
  if(g.swiping){ g.dx=Math.max(-140, Math.min(0,dx)); g.el.style.transform=`translateX(${g.dx}px)`; g.el.style.transition='none'; if(g.bg) g.bg.style.opacity = Math.min(1, -g.dx/70); e.preventDefault(); }
});
function endGesture(e){
  if(!g || (e && e.pointerId!==g.pid)) return;
  clearTimeout(g.timer);
  if(g.swiping){ suppressClick=true; const el=g.el, bg=g.bg, hit=g.dx<-70; el.style.transition='transform .18s ease'; el.style.transform=''; if(bg) bg.style.opacity=0;
    if(hit){ const id=el.dataset.nid; setTimeout(()=>toggleDone(id),170); }
    setTimeout(()=>{ suppressClick=false; },50); }
  g=null;
}
window.addEventListener('click', e=>{ if(!swallowUntil) return; const hit = Date.now()<swallowUntil && e.target.closest && e.target.closest('.ov'); swallowUntil=0; if(hit){ e.stopImmediatePropagation(); e.preventDefault(); } }, true);
document.addEventListener('pointerup', e=>{ if(lpPending){ lpPending=false; swallowUntil=Date.now()+350; } endGesture(e); }, true);
document.addEventListener('pointercancel', e=>{ if(g){ clearTimeout(g.timer); if(g.swiping){ g.el.style.transform=''; if(g.bg) g.bg.style.opacity=0; } g=null; } });
document.addEventListener('contextmenu', e=>{
  const n=e.target.closest('.note[data-nid]'); const tr=e.target.closest('.trow[data-tid]');
  if(e.target.closest('a')) return;
  if(n){ e.preventDefault(); if(ui.selecting) return; openMenuOnce(()=>noteMenu(n.dataset.nid)); }
  else if(tr && ui.left!=='search'){ e.preventDefault(); openMenuOnce(()=>threadMenu(tr.dataset.tid,true)); }
});
R.addEventListener('click', e=>{
  const n=e.target.closest('.note[data-nid]'); if(!n) return;
  if(suppressClick){ suppressClick=false; e.preventDefault(); e.stopPropagation(); return; }
  const id=n.dataset.nid;
  if(ui.selecting){ e.preventDefault(); return toggleSel(id); }
  if(e.target.closest('a')) return;
  const it=e.target.closest('.litem[data-item]'); if(it) return toggleItem(id, it.dataset.item);
  if(e.target.closest('[data-act="view-photo"]')) return viewPhoto(note(id).photo);
  if(e.target.closest('[data-act="history"]')) return showHistory(id);
  if(e.target.closest('[data-act="due"]') && !thread(note(id).threadId).archived) return dueMenu(id);
}, true);
R.addEventListener('dblclick', e=>{ const n=e.target.closest('.note[data-nid]'); if(!n || ui.selecting || !isFine() || e.target.closest('.litem')) return; const th=thread(ui.threadId); if(th && !th.archived) startEdit(n.dataset.nid); });
L.addEventListener('click', e=>{ if(suppressClick && e.target.closest('.trow')){ suppressClick=false; e.stopPropagation(); } }, true);

document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    if(closeTopOverlay()) return;
    if(ui.comp.editing) return cancelEdit();
    if(ui.selecting) return exitSelect();
    if(ui.left!=='list' && document.activeElement && document.activeElement.id==='searchInput') return goBack();
  }
  if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openSearch(null); }
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{ if(!S.settings.theme) render(); });
let wasWide=isWide();
window.addEventListener('resize',()=>{ const w=isWide(); if(w!==wasWide){ wasWide=w; if(w && ui.threadId) ui.showThread=true; render(); } });
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden'){ clearTimeout(saveTimer); Store.save(S); } });

/* =========================================================
   Boot
   ========================================================= */
(async function boot(){
  S.settings = Object.assign({}, DEFAULT_SETTINGS);
  applyTheme();
  await Store.init();
  const saved = await Store.load();
  if(saved && Array.isArray(saved.threads)){ const c=sanitizeData(saved); S = {threads:c.threads, notes:c.notes, settings:Object.assign({}, DEFAULT_SETTINGS, c.settings)}; }
  else { S = seed(); persist(); }
  ensureInbox(); purgeTrash();
  setInterval(checkReminders, 30000); setTimeout(checkReminders, 1500);
  if(isWide()){ const inbox=S.threads.find(x=>x.system==='inbox'); ui.threadId=inbox.id; ui.showThread=true; }
  render();
  registerSW();
})();

/* =========================================================
   Service worker: offline + updates
   ========================================================= */
function registerSW(){
  if(!('serviceWorker' in navigator) || location.protocol==='file:') return;
  const hadController = !!navigator.serviceWorker.controller;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', ()=>{ if(!hadController || reloading) return; reloading=true; clearTimeout(saveTimer); Store.save(S).finally(()=>location.reload()); });
  navigator.serviceWorker.register('./sw.js').then(reg=>{
    const offer = w => snack(t('updateReady'), [{label:t('later')}, {label:t('reload'), fn:()=>w.postMessage('skipWaiting')}], 600000);
    if(reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
    reg.addEventListener('updatefound', ()=>{ const w=reg.installing; if(!w) return;
      w.addEventListener('statechange', ()=>{ if(w.state==='installed'){ if(navigator.serviceWorker.controller) offer(w); else snack(t('offlineReady')); } }); });
    // when the app comes back to the foreground: check for a new version, and offer a waiting one again
    // (the offer could have been replaced by another snackbar)
    document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState!=='visible') return;
      if(reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting); else reg.update().catch(()=>{}); });
  }).catch(e=>console.warn('SW registration failed', e));
}
})();
