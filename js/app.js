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
  clip: sv('<path d="M20 11.5l-7.8 7.8a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8"/>'),
  film: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/>'),
  music: sv('<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
  share: sv('<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>'),
  qr: sv('<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>'),
  sync: sv('<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 3v5h5"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 21v-5h-5"/>'),
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
  offlineReady:'MemoChat now works offline.',
  saveTo:'Save to…', shareEmpty:'There was nothing to save in what was shared.', shareCancelled:'Sharing cancelled', chooseAgain:'Choose thread',
  file:'File', bigFileT:'Large file', bigFile:(n,s)=>`“${n}” is ${s}. Save it anyway? Large files take space on this device and make backups bigger.`,
  filesUnavailable:'Files can’t be stored in this browser.', fileSaveFail:'Couldn’t save the file. Is the device full?', fileMissing:'This file is no longer available.',
  saveToDevice:'Save to device', openIn:'Open in another app…', close:'Close', storageUsed:s=>`Used on this device: ${s}`,
  backupWorking:'Preparing the backup…', restoreWorking:(i,n)=>`Restoring files ${i} / ${n}…`, backupTooLarge:'The backup is larger than 4 GB, which isn’t supported yet.',
  weeklyT:'Weekly backup', weeklySub:f=>f?`Time for this week’s backup. It will be saved to “${f}”.`:'Time for this week’s backup. Choose a folder for your backups first (ideally one that Google Drive keeps in sync).',
  tomorrow2:'Tomorrow', folderNeeded:'No folder chosen — the backup was not made.', folderLost:'MemoChat can no longer write to the backup folder. Choose it again.',
  weeklyDone:f=>`Backup saved to “${f}”.`, weeklySection:'Weekly backup', backupFolder:'Backup folder', noFolder:'not chosen', changeFolder:'Choose folder',
  encryptWeekly:'Encrypt with a password', encOn:'On', encOff:'Off', setPwT:'Password for weekly backups', setPwSub:'MemoChat keeps it in the phone’s secure key store, so you won’t have to type it. Write it down too: without it the backups can’t be opened.',
  backupToFolder:'Back up now to the folder', keepN:'The 4 newest backups are kept; older ones are deleted.',
  notifSection:'Reminders', notifOn:'Notifications are on', notifOff:'Notifications are off', notifAllow:'Allow', notifSettings:'Settings',
  apkUpdate:v=>`MemoChat ${v} is available.`, download:'Download', openApp:'Open in app…', shareTo:'Share…',
  backupDueT:'Time for the weekly backup', backupDueSub:'Open MemoChat and confirm the backup.',
  aboutApk:'Your notes are stored only in this app on this phone. Nothing is uploaded anywhere — the weekly backup keeps a copy in the folder you choose.',
  writing:'Saving…',
  backupFailed:'The backup failed.', backupDamaged:'The backup file is damaged. Nothing was changed.', backupSub:'Notes and attachments (ZIP), optional password', attachments:'Attachments'
});
Object.assign(T.cs,{
  welcomeT:'Vítej v MemoChatu', welcomeSub:'Máš zálohu z prototypu? Obnov ji a poznámky se přenesou.', dismiss:'Zavřít',
  updateReady:'Je připravená nová verze MemoChatu.', reload:'Aktualizovat', version:v=>`Verze ${v}`,
  aboutText:'Poznámky jsou uložené jen v tomto zařízení, v tomto prohlížeči. Nikam se nenahrávají — pravidelně zálohuj.',
  offlineReady:'MemoChat teď funguje i offline.',
  saveTo:'Uložit do…', shareEmpty:'Ve sdíleném obsahu nebylo nic k uložení.', shareCancelled:'Sdílení zrušeno', chooseAgain:'Vybrat vlákno',
  file:'Soubor', bigFileT:'Velký soubor', bigFile:(n,s)=>`„${n}“ má ${s}. Přesto uložit? Velké soubory zabírají místo v zařízení a zvětšují zálohy.`,
  filesUnavailable:'V tomto prohlížeči nejde ukládat soubory.', fileSaveFail:'Soubor se nepodařilo uložit. Není plné úložiště?', fileMissing:'Tento soubor už není k dispozici.',
  saveToDevice:'Uložit do zařízení', openIn:'Otevřít v jiné aplikaci…', close:'Zavřít', storageUsed:s=>`Zabráno v zařízení: ${s}`,
  backupWorking:'Připravuji zálohu…', restoreWorking:(i,n)=>`Obnovuji soubory ${i} / ${n}…`, backupTooLarge:'Záloha je větší než 4 GB, to zatím není podporováno.',
  weeklyT:'Týdenní záloha', weeklySub:f=>f?`Je čas na týdenní zálohu. Uloží se do složky „${f}“.`:'Je čas na týdenní zálohu. Nejdřív vyber složku pro zálohy (ideálně takovou, kterou synchronizuje Google Disk).',
  tomorrow2:'Zítra', folderNeeded:'Nebyla vybraná složka, záloha se neudělala.', folderLost:'MemoChat už nemůže zapisovat do složky se zálohami. Vyber ji znovu.',
  weeklyDone:f=>`Záloha uložená do složky „${f}“.`, weeklySection:'Týdenní záloha', backupFolder:'Složka pro zálohy', noFolder:'nevybraná', changeFolder:'Vybrat složku',
  encryptWeekly:'Šifrovat heslem', encOn:'Zapnuto', encOff:'Vypnuto', setPwT:'Heslo pro týdenní zálohy', setPwSub:'MemoChat ho uschová v bezpečném úložišti klíčů telefonu, takže ho nebudeš muset psát. Zapiš si ho i jinam: bez něj zálohy nepůjde otevřít.',
  backupToFolder:'Zálohovat teď do složky', keepN:'Uchovávají se 4 nejnovější zálohy, starší se mažou.',
  notifSection:'Upozornění', notifOn:'Upozornění jsou zapnutá', notifOff:'Upozornění jsou vypnutá', notifAllow:'Povolit', notifSettings:'Nastavení',
  apkUpdate:v=>`Je dostupná nová verze MemoChatu ${v}.`, download:'Stáhnout', openApp:'Otevřít v aplikaci…', shareTo:'Sdílet…',
  backupDueT:'Čas na týdenní zálohu', backupDueSub:'Otevři MemoChat a potvrď zálohu.',
  aboutApk:'Poznámky jsou uložené jen v této aplikaci v tomto telefonu. Nikam se nenahrávají — týdenní záloha drží kopii ve složce, kterou si vybereš.',
  writing:'Ukládám…',
  backupFailed:'Zálohu se nepodařilo vytvořit.', backupDamaged:'Soubor zálohy je poškozený. Nic se nezměnilo.', backupSub:'Poznámky i přílohy (ZIP), volitelně s heslem', attachments:'Přílohy'
});
Object.assign(T.en,{
  syncSection:'Sync', syncSetup:'Set up sync', syncSetupSub:'Phone and computer exchange changes once a day, encrypted, through your private GitHub repository.',
  syncBroken:'The sync key can’t be read on this device. Set up sync again (your notes stay).',
  syncNow:'Sync now', syncLast:d=>`Last sync: ${d}`, syncNever:'Not synced yet', syncing:'Syncing…',
  syncFiles:(i,n)=>`Downloading files ${i} / ${n}…`, syncUp:(i,n)=>`Uploading files ${i} / ${n}…`, syncDone:'Synced',
  syncCode:'Pairing code', syncCodeSub:'To connect another device', syncCodeShow:'Enter these 8 words on the device you want to connect. Keep them private.',
  syncOff:'Disconnect this device', syncOffSub:r=>`Stops syncing with ${r}. Notes stay here.`, syncOffBtn:'Disconnect',
  syncOffConfirm:'Disconnect this device from sync? Notes stay on this device; the other devices keep theirs.', syncOffDone:'Sync is off on this device',
  syncT:'Set up sync', syncIntro:'Paste the token for your private repository (it starts with github_pat_). It stays on this device and is used only for the repository below.',
  syncToken:'Token', syncRepo:'Repository', syncConnect:'Connect', syncChecking:'Checking…',
  syncCodeT:'Your pairing code', syncCodeNew:'Save these 8 words in your password manager now. You’ll type them on your other device, and without them no other device can read your synced notes.',
  syncCodeSaved:'I’ve saved it', copyCode:'Copy',
  syncEnterT:'Pairing code', syncEnter:'This repository is already used by your other device. Enter its 8-word pairing code or scan it as a QR code (on the other device: ⋮ → Backup & settings → Pairing code).',
  syncCodeBad:'Enter the 8 words of the code.', syncCodeWrong:'This code doesn’t match. Check the words.',
  syncNewToken:'Enter a new token', syncNewTokenSub:r=>`Create a new token for ${r} on GitHub (Contents: Read and write) and paste it here.`,
  syncTokenOld:'The token is almost a year old and may expire soon.', syncErrOtherBox:'This token opens a different sync repository.',
  syncErrOffline:'No internet connection. Sync will try again later.', syncErrToken:'The token is invalid or has expired. Create a new one and enter it here.',
  syncErrRepo:'Repository not found, or the token has no access to it.', syncErrPublic:'The repository must be private.',
  syncErrDamaged:'Some synced data couldn’t be read. The rest was synced.', syncErrHttp:s=>`GitHub refused the request (${s}). Try again later.`, syncErrOther:'Sync failed. Try again later.',
  fileNotYet:'This file hasn’t been downloaded yet. Sync again later.', aboutSync:'Sync is on: changes are stored encrypted in your private GitHub repository.'
});
Object.assign(T.cs,{
  syncSection:'Synchronizace', syncSetup:'Nastavit synchronizaci', syncSetupSub:'Telefon a počítač si jednou denně šifrovaně vymění změny přes tvůj soukromý repozitář na GitHubu.',
  syncBroken:'Klíč synchronizace nejde v tomto zařízení přečíst. Nastav synchronizaci znovu (poznámky zůstanou).',
  syncNow:'Synchronizovat teď', syncLast:d=>`Naposledy: ${d}`, syncNever:'Zatím nesynchronizováno', syncing:'Synchronizuji…',
  syncFiles:(i,n)=>`Stahuji soubory ${i} / ${n}…`, syncUp:(i,n)=>`Nahrávám soubory ${i} / ${n}…`, syncDone:'Synchronizováno',
  syncCode:'Párovací kód', syncCodeSub:'Pro připojení dalšího zařízení', syncCodeShow:'Tato slova zadej v zařízení, které chceš připojit. Nikomu je neukazuj.',
  syncOff:'Odpojit toto zařízení', syncOffSub:r=>`Ukončí synchronizaci s ${r}. Poznámky tu zůstanou.`, syncOffBtn:'Odpojit',
  syncOffConfirm:'Odpojit toto zařízení od synchronizace? Poznámky v něm zůstanou, ostatní zařízení si nechají svoje.', syncOffDone:'Synchronizace je v tomto zařízení vypnutá',
  syncT:'Nastavit synchronizaci', syncIntro:'Vlož token ke svému soukromému repozitáři (začíná github_pat_). Zůstane jen v tomto zařízení a použije se jen pro repozitář níže.',
  syncToken:'Token', syncRepo:'Repozitář', syncConnect:'Připojit', syncChecking:'Ověřuji…',
  syncCodeT:'Tvůj párovací kód', syncCodeNew:'Hned si těchto 8 slov ulož do správce hesel. Zadáš je v druhém zařízení a bez nich žádné jiné zařízení synchronizované poznámky nepřečte.',
  syncCodeSaved:'Mám uloženo', copyCode:'Kopírovat',
  syncEnterT:'Párovací kód', syncEnter:'Tento repozitář už používá tvoje druhé zařízení. Zadej jeho párovací kód (8 slov), nebo ho naskenuj jako QR kód (v druhém zařízení: ⋮ → Záloha a nastavení → Párovací kód).',
  syncCodeBad:'Zadej 8 slov kódu.', syncCodeWrong:'Kód nesedí. Zkontroluj slova.',
  syncNewToken:'Vložit nový token', syncNewTokenSub:r=>`Na GitHubu vytvoř nový token pro ${r} (Contents: Read and write) a vlož ho sem.`,
  syncTokenOld:'Token je skoro rok starý, brzy může vypršet.', syncErrOtherBox:'Tento token otevírá jiný repozitář synchronizace.',
  syncErrOffline:'Není připojení k internetu. Synchronizace to zkusí později.', syncErrToken:'Token je neplatný nebo vypršel. Vytvoř nový a vlož ho sem.',
  syncErrRepo:'Repozitář nebyl nalezen nebo k němu token nemá přístup.', syncErrPublic:'Repozitář musí být soukromý (Private).',
  syncErrDamaged:'Část synchronizovaných dat nešla přečíst. Zbytek se synchronizoval.', syncErrHttp:s=>`GitHub požadavek odmítl (${s}). Zkus to později.`, syncErrOther:'Synchronizace se nepovedla. Zkus to později.',
  fileNotYet:'Tento soubor se ještě nestáhl. Synchronizuj znovu později.', aboutSync:'Synchronizace je zapnutá: změny se šifrovaně ukládají do tvého soukromého repozitáře na GitHubu.'
});
Object.assign(T.en,{ syncBg:'Also runs in the background about once a day', syncBgLast:s=>`last ${s}` });
Object.assign(T.cs,{ syncBg:'Běží i na pozadí, zhruba jednou denně', syncBgLast:s=>`naposledy ${s}` });
Object.assign(T.en,{
  qrShow:'Show QR code', qrHide:'Hide QR code', qrShowHint:'On the other device tap “Scan QR code”. The code hides itself in 2 minutes.',
  qrScan:'Scan QR code', qrScanT:'Scan the pairing code',
  qrScanSub:'On the other device open ⋮ → Backup & settings → Pairing code → Show QR code, and point the camera at it.',
  qrStarting:'Starting the camera…', qrLooking:'Looking for the code…',
  qrNoCam:'The camera isn’t available here. Type the 8 words instead.',
  qrDenied:'MemoChat isn’t allowed to use the camera. Allow it in the app settings, or type the 8 words instead.',
  qrWrong:'This isn’t a MemoChat pairing code.'
});
Object.assign(T.cs,{
  qrShow:'Zobrazit QR kód', qrHide:'Skrýt QR kód', qrShowHint:'V druhém zařízení ťukni na „Naskenovat QR kód“. Kód se za 2 minuty sám skryje.',
  qrScan:'Naskenovat QR kód', qrScanT:'Naskenuj párovací kód',
  qrScanSub:'V druhém zařízení otevři ⋮ → Záloha a nastavení → Párovací kód → Zobrazit QR kód a namiř na něj fotoaparát.',
  qrStarting:'Zapínám fotoaparát…', qrLooking:'Hledám kód…',
  qrNoCam:'Fotoaparát tady není dostupný. Opiš raději 8 slov.',
  qrDenied:'MemoChat nemá povolený fotoaparát. Povol ho v nastavení aplikace, nebo opiš 8 slov.',
  qrWrong:'Tohle není párovací kód MemoChatu.'
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

let S = {threads:[],notes:[],tombs:{},settings:{}};

/* ---------- Android app (APK): bridge to the native side ----------
   In the APK, window.MemoChatNative is provided by MainActivity.java. In a browser it is absent
   and everything falls back to the web behaviour. */
const NATIVE = (typeof window.MemoChatNative==='object' && window.MemoChatNative) || null;
const nativeCbs = new Map(); let nativeSeq = 0;
window.__mcNativeResolve = (id, v) => { const f=nativeCbs.get(id); if(f){ nativeCbs.delete(id); f(v); } };
// calls an asynchronous native method; the first argument is a callback id that Java resolves later
function nativeAsync(method, ...args){
  return new Promise(res=>{ const id='c'+(++nativeSeq); nativeCbs.set(id,res); try{ NATIVE[method](id, ...args); }catch(e){ nativeCbs.delete(id); res(null); } });
}
// streams a Blob to a native output (token from saveAs / folderWrite / cacheWrite) in base64 pieces
async function nativeWrite(token, blob){
  const STEP=768*1024;
  for(let off=0; off<blob.size; off+=STEP){
    const u8=new Uint8Array(await blob.slice(off, off+STEP).arrayBuffer());
    if(!NATIVE.write(token, b64(u8))) throw new Error('write');
  }
  if(!NATIVE.close(token)) throw new Error('close');
}
function nativeInfo(){ try{ return JSON.parse(NATIVE.info()); }catch(e){ return {}; } }
function b64(u8){ let s=''; for(let i=0;i<u8.length;i+=0x8000) s+=String.fromCharCode.apply(null, u8.subarray(i,i+0x8000)); return btoa(s); }
const DEFAULT_SETTINGS = {theme:null, lang:'en', lastBackup:null, nudgeSnooze:null, recent:[], welcome:false};

const APP_VERSION = '1.5.0';
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
  return {threads, notes:[], tombs:{}, settings:Object.assign({}, DEFAULT_SETTINGS, {lang:S.settings.lang||'en', theme:S.settings.theme||null, welcome:true})};
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
const RE_MIME = /^[a-z0-9][a-z0-9!#$&^_.+-]{0,63}\/[a-z0-9][a-z0-9!#$&^_.+-]{0,99}$/i;
function cleanType(v){ return (typeof v==='string' && RE_MIME.test(v)) ? v.toLowerCase() : 'application/octet-stream'; }
function cleanName(v){ return typeof v==='string' ? v.replace(/[\u0000-\u001f\u007f\/\\]/g,'').trim().slice(0,200) : ''; }
function sanitizeData(data){
  const idMap = new Map();
  // valid ids are kept; invalid string ids are remapped consistently (thread ↔ note links survive); missing ids get a fresh one
  const fixId = v => { if(typeof v==='string' && RE_ID.test(v)) return v; if(typeof v!=='string') return uid(); if(!idMap.has(v)) idMap.set(v, uid()); return idMap.get(v); };
  const threads = (Array.isArray(data.threads)?data.threads:[]).filter(x=>x && typeof x==='object').map(x=>({
    id:fixId(x.id), name:str(x.name,200)||'?', emoji:x.emoji?str(x.emoji,16):null, color:colorOf(x.color)?x.color:null,
    system:x.system==='inbox'?'inbox':undefined, pinned:!!x.pinned, pinnedAt:num(x.pinnedAt), archived:!!x.archived, hideDone:!!x.hideDone,
    createdAt:num(x.createdAt,Date.now()), lastActivity:num(x.lastActivity,Date.now()), deletedAt:num(x.deletedAt), updatedAt:num(x.updatedAt)
  }));
  threads.forEach(x=>{ if(!x.system) delete x.system; if(x.deletedAt===null) delete x.deletedAt; if(x.updatedAt===null) delete x.updatedAt; });
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
      deletedAt:num(n.deletedAt), updatedAt:num(n.updatedAt), due:cleanDue(n.due),
      attachments:(Array.isArray(n.attachments)?n.attachments:[]).filter(a=>a && typeof a==='object' && typeof a.id==='string' && RE_ID.test(a.id)).map(a=>({
        id:a.id, name:cleanName(a.name)||'file', type:cleanType(a.type), size:num(a.size,0), thumb:(typeof a.thumb==='string' && RE_PHOTO.test(a.thumb)) ? a.thumb : null }))
    };
    if(o.updatedAt===null) delete o.updatedAt;
    if(num(n.remindFired)!==null) o.remindFired = n.remindFired;
    if(n.cal && typeof n.cal==='object' && RE_DATE.test(n.cal.date||'')) o.cal = {date:n.cal.date, time:RE_TIME.test(n.cal.time||'')?n.cal.time:null};
    return o;
  }).filter(n=>tids.has(n.threadId));
  const s = (data.settings && typeof data.settings==='object') ? data.settings : {};
  const settings = {
    theme:['light','dark'].includes(s.theme)?s.theme:null, lang:s.lang==='cs'?'cs':'en', lastBackup:num(s.lastBackup), nudgeSnooze:num(s.nudgeSnooze),
    recent:(Array.isArray(s.recent)?s.recent:[]).filter(x=>tids.has(x)).slice(0,5), kbOffset:num(s.kbOffset), kbHint:!!s.kbHint, welcome:!!s.welcome,
    backupEncrypt:!!s.backupEncrypt, backupSnooze:num(s.backupSnooze), notifAsked:!!s.notifAsked, updCheck:num(s.updCheck)
  };
  return {threads, notes, settings, tombs:cleanTombs(data.tombs)};
}
/* tombstones: ids of threads and notes deleted forever → time of deletion; they stop other devices
   from bringing those items back through sync. Kept for TOMB_DAYS. */
const TOMB_DAYS = 400;
function cleanTombs(v){
  const out={}, lim=Date.now()-TOMB_DAYS*DAY;
  if(v && typeof v==='object' && !Array.isArray(v)) for(const k of Object.keys(v).slice(0,200000)){ const at=num(v[k]); if(RE_ID.test(k) && at!==null && at>lim) out[k]=at; }
  return out;
}

/* ---------- storage (IndexedDB → localStorage → memory) ---------- */
const Store = {
  mode:'memory', db:null,
  async init(){
    try{
      // v1: 'kv' (app state, pending share) · v2: + 'files' (attachment blobs, key = attachment id)
      this.db = await new Promise((res,rej)=>{ const r=indexedDB.open('memochat',2);
        r.onupgradeneeded=()=>{ const db=r.result; if(!db.objectStoreNames.contains('kv')) db.createObjectStore('kv'); if(!db.objectStoreNames.contains('files')) db.createObjectStore('files'); };
        r.onsuccess=()=>{ const db=r.result; db.onversionchange=()=>db.close(); res(db); }; r.onerror=()=>rej(r.error); setTimeout(()=>rej('timeout'),5000); });
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
  // read a value and delete it (used for content shared from other apps)
  async take(key){
    if(this.mode!=='idb') return null;
    try{ return await new Promise((res,rej)=>{ const tx=this.db.transaction('kv','readwrite'), st=tx.objectStore('kv'); let v=null;
      const r=st.get(key); r.onsuccess=()=>{ v=r.result||null; if(v!==null) st.delete(key); }; tx.oncomplete=()=>res(v); tx.onerror=()=>rej(tx.error); }); }
    catch(e){ return null; }
  },
  // attachment blobs (rejects on failure, e.g. device full)
  _files(mode, fn){ return new Promise((res,rej)=>{ if(this.mode!=='idb') return rej(new Error('no-idb')); const tx=this.db.transaction('files',mode); let out;
    const r=fn(tx.objectStore('files')); if(r) r.onsuccess=()=>{ out=r.result; }; tx.oncomplete=()=>res(out); tx.onerror=()=>rej(tx.error); tx.onabort=()=>rej(tx.error||new Error('abort')); }); },
  putFile(id, blob){ return this._files('readwrite', st=>st.put(blob, id)); },
  getFile(id){ return this._files('readonly', st=>st.get(id)); },
  fileKeys(){ return this._files('readonly', st=>st.getAllKeys()); },
  deleteFiles(ids){ return this._files('readwrite', st=>{ ids.forEach(id=>st.delete(id)); }); },
  // other values in 'kv' (sync settings); rejects on failure
  _kv(mode, fn){ return new Promise((res,rej)=>{ if(this.mode!=='idb') return rej(new Error('no-idb')); const tx=this.db.transaction('kv',mode); let out;
    const r=fn(tx.objectStore('kv')); if(r) r.onsuccess=()=>{ out=r.result; }; tx.oncomplete=()=>res(out); tx.onerror=()=>rej(tx.error); tx.onabort=()=>rej(tx.error||new Error('abort')); }); },
  kvGet(k){ return this._kv('readonly', st=>st.get(k)); },
  kvPut(k, v){ return this._kv('readwrite', st=>st.put(v, k)); },
  kvDel(k){ return this._kv('readwrite', st=>st.delete(k)); },
  async save(obj){
    try{
      if(this.mode==='idb') return await new Promise((res,rej)=>{ const tx=this.db.transaction('kv','readwrite'); tx.objectStore('kv').put(obj,'state'); tx.oncomplete=()=>res(); tx.onerror=()=>rej(tx.error); });
      if(this.mode==='ls') localStorage.setItem('memochat_state', JSON.stringify(obj));
    }catch(e){ console.warn('save failed', e); }
  }
};
let saveTimer=null;
function persist(){ clearTimeout(saveTimer); saveTimer=setTimeout(()=>{ stampChanges(); Store.save(S); nativeAlarms(); },250); }
/* every change to a thread or a note sets its updatedAt (used to merge devices when sync arrives);
   compares a light signature of each item with the one from the last save */
const lastSig = new Map(); let sigReady=false;
const sigOf = x => JSON.stringify(x, (k,v)=> (k==='updatedAt'||k==='history'||k==='thumb'||k==='photo'||k==='remindFired') ? undefined : v);
function stampChanges(){
  const now=Date.now(), seen=new Set();
  for(const x of S.threads.concat(S.notes)){
    const sig=sigOf(x), prev=lastSig.get(x.id);
    if(sigReady && prev!==sig) x.updatedAt=now;
    else if(!x.updatedAt) x.updatedAt = x.editedAt || x.createdAt || now;
    lastSig.set(x.id, sig); seen.add(x.id);
  }
  // items that disappeared were deleted forever (trash emptied, purged after 30 days, undo of a copy…)
  if(!S.tombs) S.tombs={};
  for(const id of [...lastSig.keys()]) if(!seen.has(id)){ lastSig.delete(id); if(sigReady) S.tombs[id]=now; }
  sigReady=true;
}
// after the data was replaced as a whole (restore, sync): remember the new state without stamping it as changed
function resetSigs(){
  lastSig.clear();
  for(const x of S.threads.concat(S.notes)){ if(!x.updatedAt) x.updatedAt = x.editedAt || x.createdAt || Date.now(); lastSig.set(x.id, sigOf(x)); }
  sigReady=true;
}
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
function attSummary(n){
  const a=n.attachments||[]; if(!a.length) return '';
  return (a[0].thumb?'📷 ':'📎 ') + a[0].name + (a.length>1 ? ` +${a.length-1}` : '');
}
function preview(n){
  if(!n) return '';
  if(n.type==='list') return '☑ '+(n.title || n.items.map(i=>i.text).join(', '));
  if(n.photo) return '📷 '+(n.text || t('photoMsg'));
  if(!n.text && (n.attachments||[]).length) return attSummary(n);
  if((n.attachments||[]).length) return (n.attachments[0].thumb?'📷 ':'📎 ')+n.text;
  return n.text;
}
function searchText(n){ return noteText(n)+' '+(n.attachments||[]).map(a=>a.name).join(' '); }
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
function applyTheme(){ const th=effTheme(); document.documentElement.dataset.theme=th; document.documentElement.lang=S.settings.lang; const m=$('meta[name=theme-color]'); if(m) m.content = th==='dark'?'#223E68':'#2B4C7E';
  if(NATIVE) try{ NATIVE.setBars(th==='dark'?'#223E68':'#2B4C7E', th==='dark'?'#111A2E':'#EFE5CC', th==='dark'); }catch(e){} }
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
function noteSnippet(n){ return (n.type==='list' ? (n.title || n.items.map(i=>i.text).join(', ')) : (n.text || (n.photo?'📷 '+t('photoMsg'):attSummary(n)))).split('\n')[0]; }

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
  comp:{pri:1, mode:'text', photo:null, atts:[], editing:null},
  search:{q:'', scope:null, pri:new Set(), done:true, from:null},
};
let navDepth = 0;
function pushNav(){ if(NATIVE) return; try{ history.pushState({mc:navDepth+1},''); navDepth++; }catch(e){} }
// on-screen back never depends on browser history (the Claude app frame may ignore it)
function goBack(){ handleBack(); }
window.addEventListener('popstate',()=>{ navDepth=Math.max(0,navDepth-1); handleBack(); });
// Android back button in the APK: true = handled inside the app, false = leave the app
window.__mcBack = () => {
  if(overlays.length || ui.selecting || (!isWide() && ui.showThread) || ui.left!=='list'){ handleBack(); return true; }
  if(ui.comp.editing){ cancelEdit(); return true; }
  return false;
};
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
  if(NATIVE) return false;
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
  if(q) ns = ns.filter(n=>searchText(n).toLowerCase().includes(q));
  ns.sort((a,b)=>b.createdAt-a.createdAt);
  let h='';
  if(ths.length){ h+=`<div class="section-h">${t('resThreads')}</div>`+ths.map(th=>`<div class="trow" data-tid="${th.id}">${avatar(th,'sm')}<div class="tmain" style="border:0;margin:0;padding:0"><div class="tname">${hl(th.name)}${th.archived?` <span style="font-size:12px;color:var(--muted);font-weight:400">· ${t('archived')}</span>`:''}</div></div></div>`).join(''); }
  if(ns.length){ h+=`<div class="section-h">${t('resNotes')} · ${ns.length}</div>`+ns.slice(0,200).map(n=>{ const th=thread(n.threadId); let txt=noteText(n)||(n.photo?t('photoMsg'):attSummary(n));
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
        <div class="tx">${esc(noteText(n)|| (n.photo?'📷 '+t('photoMsg'):attSummary(n)))}</div>
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
    ${syncSettingsHTML()}
    ${NATIVE ? nativeSettingsHTML() : ''}
    <div class="grp"><div class="it"><div class="grow small" style="margin:0" id="stUse">&nbsp;</div></div></div>
    <div class="section-h">${t('about')}</div>
    <div class="grp"><div class="it"><div class="grow small" style="margin:0">${NATIVE?t('aboutApk'):t('aboutText')}${syncOn()?'<br>'+t('aboutSync'):''}<br>${t('version', NATIVE ? (nativeInfo().versionName||APP_VERSION) : APP_VERSION)}</div></div></div>
  </div>`;
  try{ navigator.storage.estimate().then(e=>{ const el=$('#stUse'); if(el) el.textContent=t('storageUsed', fmtSize(e.usage||0)); }).catch(()=>{}); }catch(e){}
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
  const txt = (n.type==='list'?(n.title||n.items.map(i=>i.text).join(', ')):(n.text||attSummary(n)||t('photoMsg'))).split('\n')[0];
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
    const m = dropcap && !n.photo && !(n.attachments||[]).some(a=>a.thumb) && n.text.match(/^([A-Za-zÀ-ž][^\s]*)([\s\S]*)$/);
    if(m && !/^(https?:|www\.)/i.test(n.text)){ txt = `<span class="smcap">${esc(m[1])}</span>` + linkify(m[2]); }
    body += `<p class="txt">${txt}</p>`;
  }
  // photo = small thumbnail beside the text; tap opens full size
  if(n.photo) body = `<div class="prow"><img class="photo" src="${n.photo}" alt="" data-act="view-photo">${body?`<div class="ptext">${body}</div>`:''}</div>`;
  // attachments: one picture sits beside the text like the old photo; several pictures form a row of thumbnails; other files are chips
  const atts = n.attachments||[];
  if(atts.length){
    const pics = atts.filter(a=>a.thumb), files = atts.filter(a=>!a.thumb);
    const thumb = a => `<img class="photo" src="${a.thumb}" alt="${esc(a.name)}" title="${esc(a.name)}" data-act="view-att" data-aid="${a.id}">`;
    const chips = files.map(a=>`<button class="afile" data-act="view-att" data-aid="${a.id}">${fileIcon(a.type)}<span class="anm">${esc(a.name)}</span><small>${fmtSize(a.size)}</small></button>`).join('');
    if(pics.length===1 && !n.photo) body = `<div class="prow">${thumb(pics[0])}<div class="ptext">${body}${chips}</div></div>`;
    else body = (pics.length?`<div class="agrid">${pics.map(thumb).join('')}</div>`:'') + body + chips;
  }
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
  if(c.photo || c.atts.length){
    pp.classList.remove('hidden');
    pp.innerHTML = (c.photo?`<div class="achip"><img src="${c.photo}" alt=""><button data-act="comp-photo-x" aria-label="${t('clear')}">${I.xS}</button></div>`:'')
      + c.atts.map((a,i)=>`<div class="achip">${a.thumb?`<img src="${a.thumb}" alt="">`:`<span class="aic">${fileIcon(a.type)}</span><span class="anm">${esc(a.name)}<small>${fmtSize(a.size)}</small></span>`}<button data-act="comp-att-x" data-ai="${i}" aria-label="${t('clear')}">${I.xS}</button></div>`).join('');
  }
  else { pp.classList.add('hidden'); pp.innerHTML=''; }
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
function updateSend(){ const b=$('#cSend'), i=$('#cInput'); if(!b||!i) return; b.disabled = !!ui.sending || (!i.value.trim() && !ui.comp.photo && !ui.comp.atts.length && !($('#cTitle')&&$('#cTitle').value.trim())); }
function resetComposer(){
  ui.comp = {pri:1, mode:'text', photo:null, atts:[], editing:null, due:null};
  const i=$('#cInput'); if(i){ i.value=''; autoGrow(i); } const tl=$('#cTitle'); if(tl) tl.value='';
}

/* =========================================================
   Actions: notes
   ========================================================= */
function parseItems(raw){ return raw.split('\n').map(s=>s.replace(/^\s*(\[[ xX]?\]|[-*•☐☑])\s*/,'').trim()).filter(Boolean); }
// write new attachment blobs to the database; returns the metadata to keep in the note (null on failure)
async function storeCompAtts(c=ui.comp){
  try{ for(const a of c.atts){ if(a.blob){ await Store.putFile(a.id, a.blob); delete a.blob; } } }
  catch(e){ console.warn('file save failed', e); snack(t('fileSaveFail')); return null; }
  return c.atts.map(a=>({id:a.id, name:a.name, type:a.type, size:a.size, thumb:a.thumb||null}));
}
async function sendNote(){
  if(ui.sending) return;
  ui.sending=true;
  try{ await sendNoteNow(); } finally { ui.sending=false; updateSend(); }
}
async function sendNoteNow(){
  const th=thread(ui.threadId); if(!th || th.archived) return;
  const tid=th.id;
  const inp=$('#cInput'), raw=inp.value, c=ui.comp, title=($('#cTitle').value||'').trim();
  if(c.mode==='list'){
    const items=parseItems(raw);
    if(!items.length && !title && !c.atts.length){ snack(t('emptyNote')); return; }
    const attachments = await storeCompAtts(c); if(!attachments) return;
    if(c.editing){
      const n=note(c.editing); if(!n) return; pushHistory(n);
      const old = n.items||[];
      n.type='list'; n.title=title; n.items=items.map(x=>{ const o=old.find(i=>i.text===x); return {id:o?o.id:uid(), text:x, done:o?o.done:false}; }); if(n.done && n.items.some(i=>!i.done && !old.some(o=>o.text===i.text))){ n.done=false; n.doneAt=null; } n.text=''; n.photo=c.photo; n.attachments=attachments; n.priority=c.pri; n.due=c.due||null; n.editedAt=Date.now();
      finishEdit(n, c); return;
    }
    addNote({threadId:tid, type:'list', title, items:items.map(x=>({id:uid(),text:x,done:false})), attachments}, c);
  } else {
    const text=raw.replace(/\s+$/,'').replace(/^\n+/,'');
    if(!text.trim() && !c.photo && !c.atts.length){ return; }
    const attachments = await storeCompAtts(c); if(!attachments) return;
    if(c.editing){
      const n=note(c.editing); if(!n) return; pushHistory(n);
      n.type='text'; n.text=text; n.title=''; n.items=[]; n.photo=c.photo; n.attachments=attachments; n.priority=c.pri; n.due=c.due||null; n.editedAt=Date.now();
      finishEdit(n, c); return;
    }
    addNote({threadId:tid, type:'text', text, attachments}, c);
  }
}
// c = the composer state the note was written in; if the user has meanwhile opened another thread
// (saving large files takes a moment), the note still goes to its own thread and the new composer is left alone
function addNote(o, c=ui.comp){
  const n = Object.assign({id:uid(), threadId:ui.threadId, type:'text', text:'', title:'', items:[], photo:c.photo, attachments:[], priority:c.pri, due:c.due||null, done:false, doneAt:null, pinned:false, pinnedAt:null, createdAt:Date.now(), editedAt:null, history:[], deletedAt:null}, o);
  S.notes.push(n); bumpActivity(n.threadId);
  const same = ui.comp===c;
  if(same) resetComposer();
  commit();
  if(same){ const box=$('#msgs'); if(box) box.scrollTop=box.scrollHeight; $('#cInput') && isFine() && $('#cInput').focus(); }
}
function pushHistory(n){ n.history = n.history||[]; n.history.push({type:n.type, text:n.text, title:n.title, items:JSON.parse(JSON.stringify(n.items||[])), at:n.editedAt||n.createdAt}); }
function finishEdit(n, c=ui.comp){ bumpActivity(n.threadId); if(ui.comp===c) resetComposer(); commit(); flash([n.id]); calCheck(n,'change'); }
function startEdit(id){
  const n=note(id); if(!n) return;
  exitSelect(true);
  ui.comp = {pri:n.priority, mode:n.type==='list'?'list':'text', photo:n.photo, atts:(n.attachments||[]).map(a=>Object.assign({},a)), editing:id, due:n.due?Object.assign({},n.due):null};
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
function sheet(title, items, sub, onDismiss){
  const ov = overlay(`<div class="sheet" role="menu"><div class="grab"></div>${title?`<div class="sh-title">${esc(title)}</div>`:''}${sub?`<div class="sh-sub">${esc(sub)}</div>`:''}
    ${items.map((it,i)=>{ const inner=`<span class="ic">${it.icon||''}</span><span class="grow">${esc(it.label)}</span>${it.check?`<span class="chk">${I.checkL}</span>`:''}${it.right||''}`;
      return it.href ? `<a class="mi" data-i="${i}" href="${esc(it.href)}" target="_blank" rel="noopener noreferrer">${inner}</a>` : `<button class="mi ${it.danger?'danger':''}" data-i="${i}" ${it.disabled?'disabled style="opacity:.4"':''}>${inner}</button>`; }).join('')}</div>`, false, onDismiss);
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
// target threads for move/copy/share: Inbox first, then recently used, then the rest by activity
function orderedTargets(excludeId){
  const list = activeThreads().filter(x=>x.id!==excludeId);
  const recent = (S.settings.recent||[]).filter(id=>list.some(x=>x.id===id));
  const inbox = list.find(x=>x.system==='inbox');
  const rest = list.filter(x=>x!==inbox && !recent.includes(x.id)).sort((a,b)=>b.lastActivity-a.lastActivity);
  return [...(inbox?[inbox]:[]), ...recent.map(id=>thread(id)).filter(x=>x!==inbox), ...rest];
}
function pickThread(ids, copy){
  const ordered = orderedTargets(ui.threadId);
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
    ...(syncOn() ? [{icon:I.sync,label:t('syncNow'),fn:()=>syncNow(true)}] : []),
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
  const n=note(target); if(!n) return; n.due=due; delete n.remindFired; commit(); if(due) askNotifOnce();
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
    if(!NATIVE && now>=r && now-r<12*3600000 && n.remindFired!==r && !alerted.has(n.id+'@'+r)){
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
async function forever(id){ if(!await confirmDlg(t('delForever'), t('confirmDelForever'), t('delForever'), true)) return; S.notes=S.notes.filter(n=>n.id!==id); purgeTrash(); commit(); gcFiles(); }
async function emptyTrash(){ if(!await confirmDlg(t('emptyTrash'), t('confirmEmpty'), t('emptyTrash'), true)) return; S.notes=S.notes.filter(n=>!n.deletedAt); purgeTrash(); commit(); gcFiles(); }

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
function pickFile(){ const fi=$('#fileInput'); fi.value=''; fi.click(); }
['#photoInput','#fileInput'].forEach(sel=>$(sel).addEventListener('change', async e=>{
  const files=[...e.target.files]; if(!files.length) return;
  await addFilesToComposer(files); const i=$('#cInput'); if(i) i.focus();
}));

/* =========================================================
   Attachments: original files, stored separately from the notes
   ========================================================= */
const BIG_FILE = 100*1024*1024;
const IMG_TYPES = /^image\/(jpeg|png|webp|gif|avif|bmp)$/;
function fmtSize(b){
  const u=['B','kB','MB','GB']; let i=0, v=b||0; while(v>=1024 && i<u.length-1){ v/=1024; i++; }
  return (i?v.toLocaleString(loc(),{maximumFractionDigits:v<10?1:0}):v)+' '+u[i];
}
function fileIcon(type){ return /^image\//.test(type)?I.image : /^video\//.test(type)?I.film : /^audio\//.test(type)?I.music : I.doc; }
function defaultName(type){
  const ext = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif','video/mp4':'mp4','audio/mpeg':'mp3','application/pdf':'pdf','text/plain':'txt'}[type] || 'bin';
  const d=new Date(); return `memochat-${d.getFullYear()}${pad2(d.getMonth()+1)}${pad2(d.getDate())}-${pad2(d.getHours())}${pad2(d.getMinutes())}${pad2(d.getSeconds())}.${ext}`;
}
async function addFilesToComposer(files){
  if(Store.mode!=='idb'){ snack(t('filesUnavailable')); return; }
  for(const f of files){
    if(!(f instanceof Blob)) continue;
    const type=cleanType(f.type), name=cleanName(f.name)||defaultName(type);
    if(f.size > BIG_FILE && !await confirmDlg(t('bigFileT'), t('bigFile', name, fmtSize(f.size)), t('save'))) continue;
    let thumb=null; if(IMG_TYPES.test(type)){ try{ thumb = await downscale(f, 320, .8); }catch(e){ thumb=null; } }
    ui.comp.atts.push({id:uid(), name, type, size:f.size, thumb, blob:f});
  }
  renderComposer(false);
}
async function attBlob(aid){ try{ return await Store.getFile(aid); }catch(e){ return null; } }
function findAtt(nid, aid){ const n=note(nid); return n && (n.attachments||[]).find(a=>a.id===aid); }
async function openAtt(nid, aid){
  const a=findAtt(nid, aid); if(!a) return;
  const blob=await attBlob(aid); if(!blob){ snack(syncOn() ? t('fileNotYet') : t('fileMissing')); return; }
  const typed = blob.type===a.type ? blob : new Blob([blob], {type:a.type});
  if(IMG_TYPES.test(a.type) || /^(video|audio)\//.test(a.type)) return mediaViewer(typed, a);
  fileMenu(typed, a);
}
function canShareFile(file){ if(NATIVE) return true; try{ return !!(navigator.canShare && navigator.canShare({files:[file]})); }catch(e){ return false; } }
async function nativeOpenFile(blob, a, mode){
  const tok=NATIVE.cacheWrite(a.name); if(!tok){ snack(t('copyFail')); return; }
  try{ await nativeWrite(tok, blob); NATIVE.openCached(tok, a.type, mode); }catch(e){ snack(t('copyFail')); }
}
async function shareAtt(blob, a){
  if(NATIVE) return nativeOpenFile(blob, a, 'send');
  const file=new File([blob], a.name, {type:a.type});
  try{ await navigator.share({files:[file], title:a.name}); }catch(e){ if(e && e.name!=='AbortError') snack(t('copyFail')); }
}
function fileMenu(blob, a){
  const items=[{icon:I.download, label:t('saveToDevice'), fn:()=>saveFile(a.name, blob)}];
  if(NATIVE){ items.push({icon:I.doc, label:t('openApp'), fn:()=>nativeOpenFile(blob,a,'view')}, {icon:I.share, label:t('shareTo'), fn:()=>nativeOpenFile(blob,a,'send')}); return sheet(a.name, items, fmtSize(a.size)+' · '+a.type); }
  if(canShareFile(new File([blob], a.name, {type:a.type}))) items.push({icon:I.share, label:t('openIn'), fn:()=>shareAtt(blob,a)});
  sheet(a.name, items, fmtSize(a.size)+' · '+a.type);
}
// full-size picture, or a player for video and audio; buttons to save or open elsewhere
function mediaViewer(blob, a){
  const url=URL.createObjectURL(blob);
  const v=document.createElement('div'); v.className='viewer';
  const media = IMG_TYPES.test(a.type) ? `<img src="${url}" alt="${esc(a.name)}">`
    : /^video\//.test(a.type) ? `<video src="${url}" controls autoplay playsinline></video>` : `<audio src="${url}" controls autoplay></audio>`;
  v.innerHTML = `<div class="vbar"><span class="vname">${esc(a.name)} · ${fmtSize(a.size)}</span>
    <button class="ib" data-v="save" aria-label="${t('saveToDevice')}" title="${t('saveToDevice')}">${I.download}</button>
    ${canShareFile(new File([blob], a.name, {type:a.type}))?`<button class="ib" data-v="share" aria-label="${t('openIn')}" title="${t('openIn')}">${I.share}</button>`:''}
    <button class="ib" data-v="close" aria-label="${t('close')}" title="${t('close')}">${I.x}</button></div>${media}`;
  const close=()=>{ v.remove(); const i=overlays.indexOf(v); if(i>=0) overlays.splice(i,1); URL.revokeObjectURL(url); };
  v._dismiss=()=>URL.revokeObjectURL(url);
  v.addEventListener('click', e=>{ const b=e.target.closest('[data-v]');
    if(b){ e.stopPropagation(); if(b.dataset.v==='save') saveFile(a.name, blob); else if(b.dataset.v==='share') shareAtt(blob,a); else close(); return; }
    if(e.target===v || e.target.tagName==='IMG') close(); });
  overlays.push(v); document.body.appendChild(v);
}
// delete stored files that no note (including notes in Trash) and no draft refers to
async function gcFiles(){
  if(Store.mode!=='idb') return;
  try{
    const keys=await Store.fileKeys();
    // references are collected only after reading the keys, so a file saved meanwhile is never mistaken for an orphan
    const used=new Set(); S.notes.forEach(n=>(n.attachments||[]).forEach(a=>used.add(a.id))); (ui.comp.atts||[]).forEach(a=>used.add(a.id));
    const dead=keys.filter(k=>!used.has(k));
    if(dead.length) await Store.deleteFiles(dead);
  }catch(e){ console.warn('gc failed', e); }
}
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
const unb64 = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
async function deriveKey(pw, salt, iter){ const base=await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']); return crypto.subtle.deriveKey({name:'PBKDF2', salt, iterations:iter, hash:'SHA-256'}, base, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']); }
/* ---------- Backup format 2: a ZIP file (stored, no compression) ----------
   memochat.json        {app:'MemoChat', format:2, createdAt, encrypted, [kdf, iterations, salt]}
   data.json(.enc)      {threads, notes, settings} — same shape as format 1
   files/<id>(.enc)     original attachment bytes
   Encrypted entries are a sequence of records: [12-byte IV][4-byte length, big-endian][AES-GCM ciphertext],
   each record ≤ 4 MiB of plaintext, with "<entry name>|<record no>|<last?1:0>" as additional data, so records
   can't be reordered, swapped between files or cut off unnoticed. Format-1 JSON backups can still be restored. */
const ENC_CHUNK = 4*1024*1024;
const CRC_T = (()=>{ const t=new Uint32Array(256); for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c = c&1 ? 0xEDB88320^(c>>>1) : c>>>1; t[n]=c>>>0; } return t; })();
function crc32(u8, prev=0){ let c=~prev; for(let i=0;i<u8.length;i++) c=CRC_T[(c^u8[i])&0xff]^(c>>>8); return (~c)>>>0; }
class ZipWriter {
  constructor(){ this.parts=[]; this.pend=[]; this.pendSize=0; this.offset=0; this.cd=[]; const d=new Date();
    this.time=(d.getHours()<<11)|(d.getMinutes()<<5)|(d.getSeconds()>>1); this.date=((d.getFullYear()-1980)<<9)|((d.getMonth()+1)<<5)|d.getDate(); }
  _out(u8){ this.pend.push(u8); this.pendSize+=u8.length; this.offset+=u8.length; if(this.pendSize>=16*1024*1024) this._flush(); }
  _flush(){ if(this.pend.length){ this.parts.push(new Blob(this.pend)); this.pend=[]; this.pendSize=0; } }   // large backups live in Blobs, not in JS memory
  async add(name, produce){
    if(this.cd.length>=65535) throw new Error('too-large');
    const nameB=new TextEncoder().encode(name), off=this.offset;
    const h=new DataView(new ArrayBuffer(30));
    h.setUint32(0,0x04034b50,true); h.setUint16(4,20,true); h.setUint16(6,0x0808,true);   // flags: sizes in data descriptor, UTF-8 names
    h.setUint16(10,this.time,true); h.setUint16(12,this.date,true); h.setUint16(26,nameB.length,true);
    this._out(new Uint8Array(h.buffer)); this._out(nameB);
    let crc=0, size=0;
    await produce(u8=>{ crc=crc32(u8,crc); size+=u8.length; this._out(u8); });
    if(this.offset > 0xFFFFFFF0) throw new Error('too-large');
    const dd=new DataView(new ArrayBuffer(16)); dd.setUint32(0,0x08074b50,true); dd.setUint32(4,crc,true); dd.setUint32(8,size,true); dd.setUint32(12,size,true);
    this._out(new Uint8Array(dd.buffer));
    this.cd.push({nameB, crc, size, off});
  }
  finish(){
    const start=this.offset;
    for(const e of this.cd){
      const h=new DataView(new ArrayBuffer(46));
      h.setUint32(0,0x02014b50,true); h.setUint16(4,20,true); h.setUint16(6,20,true); h.setUint16(8,0x0808,true);
      h.setUint16(12,this.time,true); h.setUint16(14,this.date,true); h.setUint32(16,e.crc,true); h.setUint32(20,e.size,true); h.setUint32(24,e.size,true);
      h.setUint16(28,e.nameB.length,true); h.setUint32(42,e.off,true);
      this._out(new Uint8Array(h.buffer)); this._out(e.nameB);
    }
    const size=this.offset-start; if(this.offset > 0xFFFFFFF0) throw new Error('too-large');
    const end=new DataView(new ArrayBuffer(22)); end.setUint32(0,0x06054b50,true); end.setUint16(8,this.cd.length,true); end.setUint16(10,this.cd.length,true);
    end.setUint32(12,size,true); end.setUint32(16,start,true);
    this._out(new Uint8Array(end.buffer)); this._flush();
    return new Blob(this.parts, {type:'application/zip'});
  }
}
// reads stored ZIP entries straight from the file (no full load into memory)
async function readZip(file){
  const tailLen=Math.min(file.size, 22+65535), tail=new DataView(await file.slice(file.size-tailLen).arrayBuffer());
  let p=-1; for(let i=tailLen-22;i>=0;i--){ if(tail.getUint32(i,true)===0x06054b50){ p=i; break; } }
  if(p<0) throw new Error('not-zip');
  const count=tail.getUint16(p+10,true), cdSize=tail.getUint32(p+12,true), cdOff=tail.getUint32(p+16,true);
  if(cdOff+cdSize>file.size) throw new Error('bad-zip');
  const cd=new DataView(await file.slice(cdOff, cdOff+cdSize).arrayBuffer()), dec=new TextDecoder(), entries=new Map();
  let q=0;
  for(let i=0;i<count;i++){
    if(q+46>cd.byteLength || cd.getUint32(q,true)!==0x02014b50) throw new Error('bad-zip');
    const method=cd.getUint16(q+10,true), csize=cd.getUint32(q+20,true), nl=cd.getUint16(q+28,true), el=cd.getUint16(q+30,true), cl=cd.getUint16(q+32,true), lo=cd.getUint32(q+42,true);
    entries.set(dec.decode(new Uint8Array(cd.buffer, cd.byteOffset+q+46, nl)), {method, csize, lo}); q+=46+nl+el+cl;
  }
  const blobOf = async name => {
    const e=entries.get(name); if(!e) return null; if(e.method!==0) throw new Error('compressed');
    const lh=new DataView(await file.slice(e.lo, e.lo+30).arrayBuffer()); if(lh.getUint32(0,true)!==0x04034b50) throw new Error('bad-zip');
    const start=e.lo+30+lh.getUint16(26,true)+lh.getUint16(28,true); if(start+e.csize>file.size) throw new Error('bad-zip');
    return file.slice(start, start+e.csize);
  };
  return {entries, blobOf};
}
const aad = (name,i,last) => new TextEncoder().encode(`${name}|${i}|${last?1:0}`);
async function encRecord(key, name, i, last, u8){
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM', iv, additionalData:aad(name,i,last)}, key, u8));
  const r=new Uint8Array(16+ct.length); r.set(iv,0); new DataView(r.buffer).setUint32(12,ct.length,false); r.set(ct,16); return r;
}
async function decryptEntry(key, name, blob, type){
  const out=[]; let off=0, i=0, last=false;
  while(off<blob.size){
    if(last) throw new Error('trailing');
    const h=new DataView(await blob.slice(off,off+16).arrayBuffer()); if(h.byteLength<16) throw new Error('short');
    const iv=new Uint8Array(h.buffer.slice(0,12)), len=h.getUint32(12,false);
    if(off+16+len>blob.size) throw new Error('short');
    last = off+16+len===blob.size;
    out.push(new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM', iv, additionalData:aad(name,i,last)}, key, await blob.slice(off+16, off+16+len).arrayBuffer())));
    off+=16+len; i++;
  }
  if(!last) throw new Error('short');
  return new Blob(out, {type:type||''});
}
// pushes a Blob into a ZIP entry in ≤4 MiB pieces, encrypted if a key is given
async function writeBlobEntry(zip, name, blob, key){
  await zip.add(name, async write=>{
    if(!blob.size){ if(key) write(await encRecord(key, name, 0, true, new Uint8Array(0))); return; }
    for(let off=0, i=0; off<blob.size; off+=ENC_CHUNK, i++){
      const part=new Uint8Array(await blob.slice(off, off+ENC_CHUNK).arrayBuffer()), last=off+ENC_CHUNK>=blob.size;
      write(key ? await encRecord(key, name, i, last, part) : part);
    }
  });
}
async function makeBackup(pw){
  const data = {threads:S.threads, notes:S.notes, settings:Object.assign({},S.settings)};
  const meta = {app:'MemoChat', format:2, createdAt:new Date().toISOString(), encrypted:!!pw};
  let key=null;
  if(pw){ const salt=crypto.getRandomValues(new Uint8Array(16)), iter=250000; key=await deriveKey(pw, salt, iter); Object.assign(meta, {kdf:'PBKDF2-SHA256', iterations:iter, salt:b64(salt), cipher:'AES-GCM'}); }
  const zip=new ZipWriter(), enc=key?'.enc':'';
  await zip.add('memochat.json', async w=>w(new TextEncoder().encode(JSON.stringify(meta, null, 1))));
  await writeBlobEntry(zip, 'data.json'+enc, new Blob([JSON.stringify(data)]), key);
  const ids=[...new Set(S.notes.flatMap(n=>(n.attachments||[]).map(a=>a.id)))];
  for(const id of ids){ const b=await attBlob(id); if(b) await writeBlobEntry(zip, 'files/'+id+enc, b, key); }
  return zip.finish();
}
async function saveFile(filename, content, onSaved){
  if(NATIVE){
    const mime = content instanceof Blob && content.type ? content.type : filename.endsWith('.zip') ? 'application/zip' : filename.endsWith('.md') ? 'text/markdown' : filename.endsWith('.json') ? 'application/json' : 'application/octet-stream';
    const blob = content instanceof Blob ? content : new Blob([content], {type:mime});
    const tok = await nativeAsync('saveAs', filename, mime.split(';')[0]);
    if(!tok){ snack(t('declined')); return; }
    try{ if(blob.size>4*1024*1024) snack(t('writing'), null, null); await nativeWrite(tok, blob); onSaved&&onSaved(); snack(t('saved')); }
    catch(e){ try{ NATIVE.abort(tok); }catch(_){} snack(t('fileSaveFail')); }
    return;
  }
  try{
    const type = filename.endsWith('.md') ? 'text/markdown;charset=utf-8' : 'application/json;charset=utf-8';
    const url = URL.createObjectURL(content instanceof Blob ? content : new Blob([content], {type}));
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
    snack(t('backupWorking'), null, null);
    let content;
    try{ content = await makeBackup(p1); }
    catch(err){ console.warn('backup failed', err); snack(err && err.message==='too-large' ? t('backupTooLarge') : t('backupFailed')); return; }
    const d=new Date(); const stamp=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    await saveFile(`memochat-backup-${stamp}${p1?'-encrypted':''}.zip`, content, ()=>{ S.settings.lastBackup=Date.now(); S.settings.nudgeSnooze=null; commit(); });
  });
}
// asks for the backup password until tryPw(pw) succeeds; resolves with its result, or null if cancelled
function askPassword(tryPw){
  return new Promise(res=>{
    const ov=overlay(`<div class="dlg"><h3>${t('restoreFile')}</h3><p>${t('pwEnter')}</p><label class="field">${t('password')}<input id="ip" type="password"></label><p id="ipErr" style="color:var(--danger);display:none">${t('pwWrong')}</p><div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('restore')}</button></div></div>`, true, ()=>res(null));
    setTimeout(()=>$('#ip',ov).focus(),30);
    let busy=false;
    const go=async()=>{ if(busy) return; busy=true; try{ const r=await tryPw($('#ip',ov).value); closeOverlay(ov); res(r); }catch(err){ $('#ipErr',ov).style.display='block'; } busy=false; };
    $('#ip',ov).addEventListener('keydown',e=>{ if(e.key==='Enter') go(); });
    ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return; if(x.dataset.x==='ok') go(); else { closeOverlay(ov); res(null); } });
  });
}
async function readBackupFile(f){
  const head=new Uint8Array(await f.slice(0,4).arrayBuffer());
  if(head[0]===0x50 && head[1]===0x4b && head[2]===3 && head[3]===4){
    // format 2 (ZIP)
    const zip=await readZip(f);
    const metaB=await zip.blobOf('memochat.json'); if(!metaB) throw new Error('bad');
    const meta=JSON.parse(await metaB.text()); if(!meta || meta.app!=='MemoChat' || meta.format!==2) throw new Error('bad');
    let key=null, data;
    if(meta.encrypted){
      const db=await zip.blobOf('data.json.enc'); if(!db) throw new Error('bad');
      const r=await askPassword(async pw=>{ const k=await deriveKey(pw, unb64(meta.salt), meta.iterations||250000); const d=JSON.parse(await (await decryptEntry(k, 'data.json.enc', db)).text()); return {k, d}; });
      if(!r) return null; key=r.k; data=r.d;
    } else { const db=await zip.blobOf('data.json'); if(!db) throw new Error('bad'); data=JSON.parse(await db.text()); }
    const fileOf = async (id, type) => { const name='files/'+id+(key?'.enc':''); const b=await zip.blobOf(name); if(!b) return null; return key ? decryptEntry(key, name, b, type) : b; };
    return {data, fileOf};
  }
  // format 1 (JSON, from the prototype or MemoChat 1.0–1.1)
  const obj=JSON.parse(await f.text());
  if(!obj || obj.app!=='MemoChat') throw new Error('bad');
  let data=obj.data;
  if(obj.encrypted){
    data=await askPassword(async pw=>{ const key=await deriveKey(pw, unb64(obj.salt), obj.iterations||250000); const pt=await crypto.subtle.decrypt({name:'AES-GCM', iv:unb64(obj.iv)}, key, unb64(obj.data)); return JSON.parse(new TextDecoder().decode(pt)); });
    if(!data) return null;
  }
  return {data, fileOf:async()=>null};
}
$('#importInput').addEventListener('change', async e=>{
  const f=e.target.files[0]; if(!f) return;
  let b; try{ b=await readBackupFile(f); }catch(err){ console.warn(err); snack(t('badFile')); return; }
  if(!b) return;
  const data=b.data;
  if(!data || !Array.isArray(data.threads) || !Array.isArray(data.notes)){ snack(t('badFile')); return; }
  const clean = sanitizeData(data);
  if(!await confirmDlg(t('restoreFile'), t('confirmRestore', clean.threads.filter(x=>!x.deletedAt).length, clean.notes.filter(n=>!n.deletedAt).length), t('restore'), true)) return;
  // files first; the notes are replaced only after all files are in place
  const atts=[...new Map(clean.notes.flatMap(n=>(n.attachments||[]).map(a=>[a.id,a]))).values()];
  for(let i=0;i<atts.length;i++){
    if(i%5===0) snack(t('restoreWorking', i+1, atts.length), null, null);
    let blob;
    try{ blob=await b.fileOf(atts[i].id, atts[i].type); }catch(err){ console.warn('backup damaged', err); snack(t('backupDamaged')); return; }
    try{ if(blob) await Store.putFile(atts[i].id, blob); }catch(err){ console.warn('restore file failed', err); snack(t('fileSaveFail')); return; }
  }
  // tombstones stay (they belong to this device's sync history, backups don't carry them)
  S = {threads:clean.threads, notes:clean.notes, tombs:S.tombs||{}, settings:Object.assign({}, DEFAULT_SETTINGS, clean.settings, {lang:S.settings.lang, theme:S.settings.theme, welcome:false})};
  clean.threads.concat(clean.notes).forEach(x=>{ delete S.tombs[x.id]; });
  resetComposer();
  ensureInbox(); resetSigs(); ui.threadId=null; ui.showThread=false; ui.left='list'; shownThread=null; commit(); snack(t('restoredOk'));
  gcFiles();
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
      (n.attachments||[]).forEach(a=>{ md += `  - 📎 ${a.name} (${fmtSize(a.size)})\n`; });
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
          {icon:I.clip,label:t('file'),fn:pickFile},
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
      case 'comp-att-x': ui.comp.atts.splice(+a.dataset.ai,1); return renderComposer(false);
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
  { const va=e.target.closest('[data-act="view-att"]'); if(va) return openAtt(id, va.dataset.aid); }
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
   Sync: phone ↔ computer through the user's private GitHub repository ("mailbox")
   ---------------------------------------------------------
   - Each device keeps its whole state (threads, notes, tombstones) as ONE encrypted file "state"
     on its own branch mc-<device id>. Every upload replaces the branch with a fresh commit without
     parents, so the repository does not grow with history.
   - Attachments are stored next to it as encrypted pieces "a-<attachment id>-<n>" (≤ 8 MiB each).
     A device's tree also lists pieces uploaded by other devices, so they stay as long as any device needs them.
   - Merging: per item, the newer updatedAt wins; when both sides changed a note since the last sync,
     the losing text goes to the note's history. Tombstones carry "deleted forever".
   - Encryption: AES-256-GCM with a key derived (HKDF-SHA-256) from the 8-word pairing code. The code and
     the token stay on the device (Android Keystore in the APK, a non-extractable key in IndexedDB on the web).
     GitHub only ever sees encrypted data; the token can reach only the mailbox repository.
   ========================================================= */
const SYNC_WORDS = 'abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual adapt add addict address adjust admit adult advance advice aerobic affair afford afraid again age agent agree ahead aim air airport aisle alarm album alcohol alert alien all alley allow almost alone alpha already also alter always amateur amazing among amount amused analyst anchor ancient anger angle angry animal ankle announce annual another answer antenna antique anxiety any apart apology appear apple approve april arch arctic area arena argue arm armed armor army around arrange arrest arrive arrow art artefact artist artwork ask aspect assault asset assist assume asthma athlete atom attack attend attitude attract auction audit august aunt author auto autumn average avocado avoid awake aware away awesome awful awkward axis baby bachelor bacon badge bag balance balcony ball bamboo banana banner bar barely bargain barrel base basic basket battle beach bean beauty because become beef before begin behave behind believe below belt bench benefit best betray better between beyond bicycle bid bike bind biology bird birth bitter black blade blame blanket blast bleak bless blind blood blossom blouse blue blur blush board boat body boil bomb bone bonus book boost border boring borrow boss bottom bounce box boy bracket brain brand brass brave bread breeze brick bridge brief bright bring brisk broccoli broken bronze broom brother brown brush bubble buddy budget buffalo build bulb bulk bullet bundle bunker burden burger burst bus business busy butter buyer buzz cabbage cabin cable cactus cage cake call calm camera camp can canal cancel candy cannon canoe canvas canyon capable capital captain car carbon card cargo carpet carry cart case cash casino castle casual cat catalog catch category cattle caught cause caution cave ceiling celery cement census century cereal certain chair chalk champion change chaos chapter charge chase chat cheap check cheese chef cherry chest chicken chief child chimney choice choose chronic chuckle chunk churn cigar cinnamon circle citizen city civil claim clap clarify claw clay clean clerk clever click client cliff climb clinic clip clock clog close cloth cloud clown club clump cluster clutch coach coast coconut code coffee coil coin collect color column combine come comfort comic common company concert conduct confirm congress connect consider control convince cook cool copper copy coral core corn correct cost cotton couch country couple course cousin cover coyote crack cradle craft cram crane crash crater crawl crazy cream credit creek crew cricket crime crisp critic crop cross crouch crowd crucial cruel cruise crumble crunch crush cry crystal cube culture cup cupboard curious current curtain curve cushion custom cute cycle dad damage damp dance danger daring dash daughter dawn day deal debate debris decade december decide decline decorate decrease deer defense define defy degree delay deliver demand demise denial dentist deny depart depend deposit depth deputy derive describe desert design desk despair destroy detail detect develop device devote diagram dial diamond diary dice diesel diet differ digital dignity dilemma dinner dinosaur direct dirt disagree discover disease dish dismiss disorder display distance divert divide divorce dizzy doctor document dog doll dolphin domain donate donkey donor door dose double dove draft dragon drama drastic draw dream dress drift drill drink drip drive drop drum dry duck dumb dune during dust dutch duty dwarf dynamic eager eagle early earn earth easily east easy echo ecology economy edge edit educate effort egg eight either elbow elder electric elegant element elephant elevator elite else embark embody embrace emerge emotion employ empower empty enable enact end endless endorse enemy energy enforce engage engine enhance enjoy enlist enough enrich enroll ensure enter entire entry envelope episode equal equip era erase erode erosion error erupt escape essay essence estate eternal ethics evidence evil evoke evolve exact example excess exchange excite exclude excuse execute exercise exhaust exhibit exile exist exit exotic expand expect expire explain expose express extend extra eye eyebrow fabric face faculty fade faint faith fall false fame family famous fan fancy fantasy farm fashion fat fatal father fatigue fault favorite feature february federal fee feed feel female fence festival fetch fever few fiber fiction field figure file film filter final find fine finger finish fire firm first fiscal fish fit fitness fix flag flame flash flat flavor flee flight flip float flock floor flower fluid flush fly foam focus fog foil fold follow food foot force forest forget fork fortune forum forward fossil foster found fox fragile frame frequent fresh friend fringe frog front frost frown frozen fruit fuel fun funny furnace fury future gadget gain galaxy gallery game gap garage garbage garden garlic garment gas gasp gate gather gauge gaze general genius genre gentle genuine gesture ghost giant gift giggle ginger giraffe girl give glad glance glare glass glide glimpse globe gloom glory glove glow glue goat goddess gold good goose gorilla gospel gossip govern gown grab grace grain grant grape grass gravity great green grid grief grit grocery group grow grunt guard guess guide guilt guitar gun gym habit hair half hammer hamster hand happy harbor hard harsh harvest hat have hawk hazard head health heart heavy hedgehog height hello helmet help hen hero hidden high hill hint hip hire history hobby hockey hold hole holiday hollow home honey hood hope horn horror horse hospital host hotel hour hover hub huge human humble humor hundred hungry hunt hurdle hurry hurt husband hybrid ice icon idea identify idle ignore ill illegal illness image imitate immense immune impact impose improve impulse inch include income increase index indicate indoor industry infant inflict inform inhale inherit initial inject injury inmate inner innocent input inquiry insane insect inside inspire install intact interest into invest invite involve iron island isolate issue item ivory jacket jaguar jar jazz jealous jeans jelly jewel job join joke journey joy judge juice jump jungle junior junk just kangaroo keen keep ketchup key kick kid kidney kind kingdom kiss kit kitchen kite kitten kiwi knee knife knock know lab label labor ladder lady lake lamp language laptop large later latin laugh laundry lava law lawn lawsuit layer lazy leader leaf learn leave lecture left leg legal legend leisure lemon lend length lens leopard lesson letter level liar liberty library license life lift light like limb limit link lion liquid list little live lizard load loan lobster local lock logic lonely long loop lottery loud lounge love loyal lucky luggage lumber lunar lunch luxury lyrics machine mad magic magnet maid mail main major make mammal man manage mandate mango mansion manual maple marble march margin marine market marriage mask mass master match material math matrix matter maximum maze meadow mean measure meat mechanic medal media melody melt member memory mention menu mercy merge merit merry mesh message metal method middle midnight milk million mimic mind minimum minor minute miracle mirror misery miss mistake mix mixed mixture mobile model modify mom moment monitor monkey monster month moon moral more morning mosquito mother motion motor mountain mouse move movie much muffin mule multiply muscle museum mushroom music must mutual myself mystery myth naive name napkin narrow nasty nation nature near neck need negative neglect neither nephew nerve nest net network neutral never news next nice night noble noise nominee noodle normal north nose notable note nothing notice novel now nuclear number nurse nut oak obey object oblige obscure observe obtain obvious occur ocean october odor off offer office often oil okay old olive olympic omit once one onion online only open opera opinion oppose option orange orbit orchard order ordinary organ orient original orphan ostrich other outdoor outer output outside oval oven over own owner oxygen oyster ozone pact paddle page pair palace palm panda panel panic panther paper parade parent park parrot party pass patch path patient patrol pattern pause pave payment peace peanut pear peasant pelican pen penalty pencil people pepper perfect permit person pet phone photo phrase physical piano picnic picture piece pig pigeon pill pilot pink pioneer pipe pistol pitch pizza place planet plastic plate play please pledge pluck plug plunge poem poet point polar pole police pond pony pool popular portion position possible post potato pottery poverty powder power practice praise predict prefer prepare present pretty prevent price pride primary print priority prison private prize problem process produce profit program project promote proof property prosper protect proud provide public pudding pull pulp pulse pumpkin punch pupil puppy purchase purity purpose purse push put puzzle pyramid quality quantum quarter question quick quit quiz quote rabbit raccoon race rack radar radio rail rain raise rally ramp ranch random range rapid rare rate rather raven raw razor ready real reason rebel rebuild recall receive recipe record recycle reduce reflect reform refuse region regret regular reject relax release relief rely remain remember remind remove render renew rent reopen repair repeat replace report require rescue resemble resist resource response result retire retreat return reunion reveal review reward rhythm rib ribbon rice rich ride ridge rifle right rigid ring riot ripple risk ritual rival river road roast robot robust rocket romance roof rookie room rose rotate rough round route royal rubber rude rug rule run runway rural sad saddle sadness safe sail salad salmon salon salt salute same sample sand satisfy satoshi sauce sausage save say scale scan scare scatter scene scheme school science scissors scorpion scout scrap screen script scrub sea search season seat second secret section security seed seek segment select sell seminar senior sense sentence series service session settle setup seven shadow shaft shallow share shed shell sheriff shield shift shine ship shiver shock shoe shoot shop short shoulder shove shrimp shrug shuffle shy sibling sick side siege sight sign silent silk silly silver similar simple since sing siren sister situate six size skate sketch ski skill skin skirt skull slab slam sleep slender slice slide slight slim slogan slot slow slush small smart smile smoke smooth snack snake snap sniff snow soap soccer social sock soda soft solar soldier solid solution solve someone song soon sorry sort soul sound soup source south space spare spatial spawn speak special speed spell spend sphere spice spider spike spin spirit split spoil sponsor spoon sport spot spray spread spring spy square squeeze squirrel stable stadium staff stage stairs stamp stand start state stay steak steel stem step stereo stick still sting stock stomach stone stool story stove strategy street strike strong struggle student stuff stumble style subject submit subway success such sudden suffer sugar suggest suit summer sun sunny sunset super supply supreme sure surface surge surprise surround survey suspect sustain swallow swamp swap swarm swear sweet swift swim swing switch sword symbol symptom syrup system table tackle tag tail talent talk tank tape target task taste tattoo taxi teach team tell ten tenant tennis tent term test text thank that theme then theory there they thing this thought three thrive throw thumb thunder ticket tide tiger tilt timber time tiny tip tired tissue title toast tobacco today toddler toe together toilet token tomato tomorrow tone tongue tonight tool tooth top topic topple torch tornado tortoise toss total tourist toward tower town toy track trade traffic tragic train transfer trap trash travel tray treat tree trend trial tribe trick trigger trim trip trophy trouble truck true truly trumpet trust truth try tube tuition tumble tuna tunnel turkey turn turtle twelve twenty twice twin twist two type typical ugly umbrella unable unaware uncle uncover under undo unfair unfold unhappy uniform unique unit universe unknown unlock until unusual unveil update upgrade uphold upon upper upset urban urge usage use used useful useless usual utility vacant vacuum vague valid valley valve van vanish vapor various vast vault vehicle velvet vendor venture venue verb verify version very vessel veteran viable vibrant vicious victory video view village vintage violin virtual virus visa visit visual vital vivid vocal voice void volcano volume vote voyage wage wagon wait walk wall walnut want warfare warm warrior wash wasp waste water wave way wealth weapon wear weasel weather web wedding weekend weird welcome west wet whale what wheat wheel when where whip whisper wide width wife wild will win window wine wing wink winner winter wire wisdom wise wish witness wolf woman wonder wood wool word work world worry worth wrap wreck wrestle wrist write wrong yard year yellow you young youth zebra zero zone zoo'.split(' ');
const SYNC_API = 'https://api.github.com';
const SYNC_META = 'memochat-sync.json';
const SYNC_PART = 8*1024*1024;            // attachment piece size (GitHub accepts blobs up to 100 MB)
const SYNC_EVERY = DAY;                   // automatic sync at most once a day
const SYNC_RETRY = 30*60000;              // after a failed attempt, wait before trying again automatically
const SYNC_STALE = 300*DAY;               // ignore devices that have not synced for this long
const RE_REPO = /^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}$/;
const RE_BRANCH = /^mc-[a-f0-9]{12}$/;
const RE_PART = /^a-([A-Za-z0-9_-]{1,80})-(\d{1,5})$/;
let syncCfg = null;        // {repo, deviceId, branch, lastSync, lastAttempt, lastError, seen:{branch:commit}, files:{attId:[blob sha…]}, upHash, joined, tokenAt}
let syncSec = null;        // {token, code}
let syncKey = null;        // CryptoKey from the pairing code
let syncBusy = false, syncProg = '';
const syncOn = () => !!(syncCfg && syncSec && syncKey);

class SyncError extends Error { constructor(kind, status, detail){ super(kind); this.kind=kind; this.status=status||0; this.detail=detail||''; } }

/* ---------- pairing code and key ---------- */
function syncNewCode(){ return [...crypto.getRandomValues(new Uint16Array(8))].map(x=>SYNC_WORDS[x & 2047]).join(' '); }
// accepts the 8 words in any case, with numbers or punctuation between them; 4 letters are enough (unique in the list)
function syncParseCode(s){
  const ws=String(s||'').toLowerCase().replace(/[^a-z]+/g,' ').trim().split(' ').filter(Boolean);
  if(ws.length!==8) return null;
  const out=[];
  for(const w of ws){ const m = SYNC_WORDS.includes(w) ? w : (w.length>=4 ? SYNC_WORDS.find(x=>x.startsWith(w.slice(0,4))) : null); if(!m) return null; out.push(m); }
  return out.join(' ');
}
async function syncDeriveKey(code){
  const te=new TextEncoder(), ikm=await crypto.subtle.importKey('raw', te.encode(code), 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey({name:'HKDF', hash:'SHA-256', salt:te.encode('MemoChat sync v1'), info:te.encode('data')}, ikm, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']);
}
// one encrypted piece = one record of the backup format: [IV 12 B][length 4 B][AES-GCM], AAD "<name>|<n>|<last>"
function syncSeal(key, name, i, last, u8){ return encRecord(key, name, i, last, u8); }
async function syncOpen(key, name, i, last, u8){
  if(!(u8 instanceof Uint8Array) || u8.length<16+16) throw new Error('short');
  const len=new DataView(u8.buffer, u8.byteOffset, 16).getUint32(12,false);
  if(16+len!==u8.length) throw new Error('length');
  return new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM', iv:u8.slice(0,12), additionalData:aad(name,i,last)}, key, u8.subarray(16)));
}
const SYNC_CHECK = 'MemoChat sync check';
async function syncCheckBlob(key){ return b64(await syncSeal(key, 'check', 0, true, new TextEncoder().encode(SYNC_CHECK))); }
async function syncCheckOk(key, check){ try{ return new TextDecoder().decode(await syncOpen(key, 'check', 0, true, unb64(check)))===SYNC_CHECK; }catch(e){ return false; } }
async function gzip(u8, on){
  const s=new Blob([u8]).stream().pipeThrough(on ? new CompressionStream('gzip') : new DecompressionStream('gzip'));
  return new Uint8Array(await new Response(s).arrayBuffer());
}
async function sha256hex(s){ return [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join(''); }

/* ---------- token and code: Android Keystore (APK) / non-extractable key in IndexedDB (web) ---------- */
async function syncSecretSave(o){
  if(NATIVE){ try{ return !!(NATIVE.secretSet('syncToken', o.token) && NATIVE.secretSet('syncCode', o.code)); }catch(e){ return false; } }
  try{
    const k=await crypto.subtle.generateKey({name:'AES-GCM', length:256}, false, ['encrypt','decrypt']), iv=crypto.getRandomValues(new Uint8Array(12));
    const ct=await crypto.subtle.encrypt({name:'AES-GCM', iv}, k, new TextEncoder().encode(JSON.stringify({token:o.token, code:o.code})));
    await Store.kvPut('syncSecret', {k, iv, ct}); return true;
  }catch(e){ console.warn('sync secret', e); return false; }
}
async function syncSecretLoad(){
  if(NATIVE){ try{ const token=NATIVE.secretGet('syncToken'), code=NATIVE.secretGet('syncCode'); return token&&code ? {token, code} : null; }catch(e){ return null; } }
  try{ const v=await Store.kvGet('syncSecret'); if(!v || !v.k || !v.iv || !v.ct) return null;
    const o=JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM', iv:v.iv}, v.k, v.ct)));
    return typeof o.token==='string' && typeof o.code==='string' ? {token:o.token, code:o.code} : null;
  }catch(e){ return null; }
}
async function syncSecretDel(){
  if(NATIVE){ try{ NATIVE.secretDel('syncToken'); NATIVE.secretDel('syncCode'); }catch(e){} return; }
  try{ await Store.kvDel('syncSecret'); }catch(e){}
}
function syncCleanCfg(c){
  if(!c || typeof c!=='object' || !RE_REPO.test(c.repo||'') || !RE_BRANCH.test(c.branch||'')) return null;
  const seen={}, files={};
  if(c.seen && typeof c.seen==='object') for(const k of Object.keys(c.seen)) if(RE_BRANCH.test(k) && /^[a-f0-9]{40}$/.test(c.seen[k])) seen[k]=c.seen[k];
  if(c.files && typeof c.files==='object') for(const k of Object.keys(c.files)){ const v=c.files[k]; if(RE_ID.test(k) && Array.isArray(v) && v.length && v.every(s=>/^[a-f0-9]{40}$/.test(s))) files[k]=v.slice(); }
  return {repo:c.repo, deviceId:c.branch.slice(3), branch:c.branch, lastSync:num(c.lastSync,0), lastAttempt:num(c.lastAttempt,0), lastError:typeof c.lastError==='string'?c.lastError.slice(0,40):null,
    seen, files, upHash:typeof c.upHash==='string'?c.upHash:null, joined:!!c.joined, tokenAt:num(c.tokenAt,Date.now())};
}
async function syncSaveCfg(){ try{ if(syncCfg) await Store.kvPut('sync', syncCfg); else await Store.kvDel('sync'); }catch(e){ console.warn('sync cfg', e); } }

/* ---------- GitHub REST API (only api.github.com is allowed by the CSP) ---------- */
async function gh(token, method, path, body, raw){
  let r;
  try{
    r = await fetch(SYNC_API+path, {method, cache:'no-store', credentials:'omit', referrerPolicy:'no-referrer',
      headers:Object.assign({Authorization:'Bearer '+token, Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json'}, body ? {'Content-Type':'application/json'} : {}),
      body: body ? JSON.stringify(body) : undefined});
  }catch(e){ throw new SyncError('offline'); }
  if(r.status===401) throw new SyncError('token', 401);
  if(!r.ok){ let m=''; try{ m=String((await r.json()).message||''); }catch(e){} throw new SyncError(r.status===404?'notfound':r.status===403?'forbidden':'http', r.status, m.slice(0,200)); }
  if(raw) return new Uint8Array(await r.arrayBuffer());
  if(r.status===204) return null;
  try{ return await r.json(); }catch(e){ throw new SyncError('http', r.status, 'json'); }
}
// checks the token and the repository; returns "owner/name"
async function syncCheckRepo(token, input){
  let repo=String(input||'').trim().replace(/^https:\/\/github\.com\//,'').replace(/\.git$/,'').replace(/\/+$/,'');
  if(!repo.includes('/')){ const u=await gh(token,'GET','/user'); if(!u || typeof u.login!=='string') throw new SyncError('http'); repo=u.login+'/'+(repo||'memochat-sync'); }
  if(!RE_REPO.test(repo)) throw new SyncError('notfound');
  const info=await gh(token,'GET',`/repos/${repo}`);
  if(!info || info.private!==true) throw new SyncError('public');
  return info.full_name && RE_REPO.test(info.full_name) ? info.full_name : repo;
}
async function syncReadMeta(token, repo){
  let r;
  try{ r=await gh(token,'GET',`/repos/${repo}/contents/${SYNC_META}`); }
  catch(e){ if(e.kind==='notfound') return null; throw e; }
  try{ const m=JSON.parse(new TextDecoder().decode(unb64(String(r.content||'').replace(/\s+/g,'')))); if(m && m.app==='MemoChat' && m.sync===1 && typeof m.check==='string') return m; }catch(e){}
  throw new SyncError('meta');
}

/* ---------- merging two states ---------- */
const histKey = v => `${v.at}|${v.type}|${v.text}|${v.title}|${JSON.stringify(v.items||[])}`;
const contentOf = n => JSON.stringify([n.type, n.text, n.title, n.items||[]]);
// L = this device, R = another device. o.since: last sync (to recognise edits on both sides), o.join: first sync of this device
function syncMerge(L, R, o){
  const now=o.now||Date.now();
  const tombs=Object.assign({}, L.tombs||{});
  for(const [id,at] of Object.entries(R.tombs||{})) if(!(tombs[id]>=at)) tombs[id]=at;
  let lThreads=L.threads, lNotes=L.notes;
  if(o.join){
    // a device joining: its default threads become the ones that already exist; threads with the same name are joined
    const rIds=new Set(R.threads.map(x=>x.id));
    if(!lNotes.length) lThreads=lThreads.filter(x=>rIds.has(x.id));
    else {
      const key = x => x.system==='inbox' ? '\u0000inbox' : x.name.trim().toLowerCase();
      const byKey=new Map(); R.threads.filter(x=>!x.deletedAt).forEach(x=>{ if(!byKey.has(key(x))) byKey.set(key(x), x.id); });
      const remap=new Map(); lThreads.forEach(x=>{ if(!rIds.has(x.id) && !x.deletedAt && byKey.has(key(x))) remap.set(x.id, byKey.get(key(x))); });
      if(remap.size){ lThreads=lThreads.filter(x=>!remap.has(x.id)); lNotes=lNotes.map(n=>remap.has(n.threadId) ? Object.assign({}, n, {threadId:remap.get(n.threadId), updatedAt:now}) : n); }
      // empty threads the other devices don't have are default threads deleted there: not brought back
      const used=new Set(lNotes.map(n=>n.threadId)); lThreads=lThreads.filter(x=>rIds.has(x.id) || used.has(x.id));
    }
  }
  const histKeys = n => (n.history||[]).map(histKey).join('\n');
  // newer wins; on a tie the same item is picked on every device
  const pick = (a,b) => { const ua=a.updatedAt||0, ub=b.updatedAt||0; if(ua!==ub) return ua>ub?[a,b]:[b,a]; return sigOf(a)+histKeys(a)>=sigOf(b)+histKeys(b)?[a,b]:[b,a]; };
  const mergeNote = (w,l) => {
    const hist=new Map(); (w.history||[]).concat(l.history||[]).forEach(v=>hist.set(histKey(v), v));
    let editedAt=w.editedAt;
    // both sides changed it since the last sync: keep the losing text in the history, nothing is lost
    if(contentOf(w)!==contentOf(l) && (w.updatedAt||0)>o.since && (l.updatedAt||0)>o.since){
      const v={type:l.type, text:l.text, title:l.title, items:JSON.parse(JSON.stringify(l.items||[])), at:l.editedAt||l.createdAt};
      hist.set(histKey(v), v); if(!editedAt) editedAt=w.updatedAt;
    }
    const history=[...hist.values()].sort((a,b)=>a.at-b.at || (histKey(a)<histKey(b)?-1:1));
    if(editedAt===w.editedAt && history.length===(w.history||[]).length && history.every((v,i)=>histKey(v)===histKey(w.history[i]))) return w;
    return Object.assign({}, w, {history, editedAt});
  };
  const mergeList = (ls, rs, isNote) => {
    const m=new Map(); ls.forEach(x=>m.set(x.id,[x,null])); rs.forEach(x=>{ const e=m.get(x.id); if(e) e[1]=x; else m.set(x.id,[null,x]); });
    const out=[];
    for(const [id,[a,b]] of m){
      let x = a&&b ? (()=>{ const [w,l]=pick(a,b); return isNote ? mergeNote(w,l) : w; })() : (a||b);
      if(tombs[id]!==undefined && tombs[id] >= (x.updatedAt||0)) continue;    // deleted forever (and not edited since)
      out.push(x);
    }
    return out;
  };
  let threads=mergeList(lThreads, R.threads, false), notes=mergeList(lNotes, R.notes, true);
  // same 30-day rule as the Trash on every device
  const lim=now-30*DAY; notes=notes.filter(n=>!(n.deletedAt && n.deletedAt<lim));
  // one Inbox: the one with the smallest id stays (same choice on every device)
  const inboxes=threads.filter(x=>x.system==='inbox' && !x.deletedAt).sort((a,b)=>a.id<b.id?-1:1);
  const keep=inboxes[0];
  if(inboxes.length>1){
    const gone=new Set(inboxes.slice(1).map(x=>x.id));
    threads=threads.filter(x=>!gone.has(x.id)); gone.forEach(id=>{ tombs[id]=now; });
    notes=notes.map(n=>gone.has(n.threadId) ? Object.assign({}, n, {threadId:keep.id, updatedAt:now}) : n);
  }
  // notes whose thread no longer exists anywhere go to the Inbox
  const tids=new Set(threads.map(x=>x.id));
  if(keep) notes=notes.map(n=>tids.has(n.threadId) ? n : Object.assign({}, n, {threadId:keep.id, updatedAt:now}));
  else notes=notes.filter(n=>tids.has(n.threadId));
  threads=threads.filter(x=>!(x.deletedAt && !notes.some(n=>n.threadId===x.id)));
  return {threads, notes, tombs};
}

/* ---------- the state this device uploads ---------- */
// the JSON and a hash that tells whether it (or the attachments it lists) changed since the last upload
// (in the stored form: a note made a moment ago and the same note after a restart give the same hash)
async function syncStatePack(files){
  const c=sanitizeData({threads:S.threads, notes:S.notes, tombs:S.tombs});
  const json=JSON.stringify({app:'MemoChat', format:1, threads:c.threads, notes:c.notes, tombs:c.tombs});
  return {json, hash:await sha256hex(json+'\n'+JSON.stringify(Object.entries(files).sort()))};
}
// [flag][gzip or plain JSON], encrypted as record "state", base64
async function syncSealState(key, json){
  let body=new TextEncoder().encode(json), flag=0;
  try{ body=await gzip(body, true); flag=1; }catch(e){}
  const plain=new Uint8Array(body.length+1); plain[0]=flag; plain.set(body,1);
  return b64(await syncSeal(key, 'state', 0, true, plain));
}

/* ---------- Android: sync in the background (SyncJob / SyncCore.java) ----------
   When the app is left it hands its encrypted state to the Android side. A job then uploads it, and once a day
   (also with the app closed) looks for changes from the other devices: it sets the reminders for them and
   remembers that the app should sync as soon as it is opened. Notes are merged only here, in the app. */
const nativeBg = () => !!(NATIVE && NATIVE.syncPrepare && NATIVE.syncBgInfo);
let bgHanding=false;
async function syncHandOver(){
  if(!nativeBg() || !syncOn() || !syncKey || bgHanding || syncBusy) return;
  bgHanding=true;
  try{
    clearTimeout(saveTimer); stampChanges(); await Store.save(S);
    const cfg=syncCfg, ids=new Set(), files={};
    S.notes.forEach(n=>(n.attachments||[]).forEach(a=>ids.add(a.id)));
    for(const id of ids) if(cfg.files[id]) files[id]=cfg.files[id];      // attachments not uploaded yet: next sync in the app
    const {json, hash}=await syncStatePack(files);
    const state=await syncSealState(syncKey, json);
    if(syncCfg!==cfg) return;
    NATIVE.syncPrepare(JSON.stringify({repo:cfg.repo, branch:cfg.branch, hash, upHash:cfg.upHash, state, files, seen:cfg.seen,
      lang:S.settings.lang, photoMsg:t('photoMsg'), allDay:t('allDay')}));
  }catch(e){ console.warn('sync hand-over', e); }
  finally{ bgHanding=false; }
}
// what the background job did: {repo, branch, uploadedHash, uploadedAt, newsAt, lastRun, lastError, busy}
function syncBgInfo(){
  if(!nativeBg() || !syncOn()) return null;
  let i=null; try{ i=JSON.parse(NATIVE.syncBgInfo()||'null'); }catch(e){}
  if(!i || typeof i!=='object' || i.repo!==syncCfg.repo || i.branch!==syncCfg.branch) return i && i.busy ? {busy:true} : null;
  // the job uploaded the state after the app's last sync: remember it, so the app doesn't upload the same again
  if(typeof i.uploadedHash==='string' && num(i.uploadedAt,0) > (syncCfg.lastSync||0) && i.uploadedHash!==syncCfg.upHash){ syncCfg.upHash=i.uploadedHash; syncSaveCfg(); }
  return i;
}

/* ---------- one sync run ---------- */
function syncSetProg(s){ syncProg=s; const el=$('#syncLine'); if(el) el.textContent=s; }
async function syncNow(manual){
  if(!syncOn() || syncBusy) return false;
  if(Store.mode!=='idb') return false;
  syncBusy=true; syncSetProg(t('syncing')); if(ui.left==='settings') renderLeft();
  // a background run is just uploading: wait for it (at most a minute), then use what it did
  for(let i=0; i<60 && (syncBgInfo()||{}).busy; i++) await new Promise(r=>setTimeout(r,1000));
  syncBgInfo();
  const cfg=syncCfg, token=syncSec.token, key=syncKey, P=`/repos/${cfg.repo}`;
  cfg.lastAttempt=Date.now(); syncSaveCfg();
  let damaged=false, ok=false;
  try{
    // 0) changes made a moment ago are stamped and saved first
    clearTimeout(saveTimer); stampChanges(); await Store.save(S); nativeAlarms();
    // 1) what the devices have uploaded
    const refs=await gh(token,'GET',`${P}/git/matching-refs/heads/mc-`);
    const known=new Set(), remote=new Map(), states=[];
    let ownCommit=null;
    for(const ref of (Array.isArray(refs)?refs:[])){
      const branch=String(ref.ref||'').replace(/^refs\/heads\//,''), csha=ref.object && ref.object.sha;
      if(!RE_BRANCH.test(branch) || !/^[a-f0-9]{40}$/.test(csha||'')) continue;
      const own = branch===cfg.branch; if(own) ownCommit=csha;
      const c=await gh(token,'GET',`${P}/git/commits/${csha}`);
      if(!own && Date.parse((c.committer||{}).date||0) < Date.now()-SYNC_STALE) continue;
      const tsha=c && c.tree && c.tree.sha; if(!/^[a-f0-9]{40}$/.test(tsha||'')) throw new SyncError('http', 0, 'tree');
      const tr=await gh(token,'GET',`${P}/git/trees/${tsha}`);
      let stateSha=null; const parts=new Map();
      for(const e of (Array.isArray(tr.tree)?tr.tree:[])){
        if(e.type!=='blob' || !/^[a-f0-9]{40}$/.test(e.sha||'')) continue;
        known.add(e.sha);
        if(e.path==='state') stateSha=e.sha;
        const m=RE_PART.exec(e.path||''); if(m){ const a=parts.get(m[1])||[]; a[+m[2]]=e.sha; parts.set(m[1], a); }
      }
      for(const [id,a] of parts) if(!remote.has(id) && a.length && a.every(Boolean)) remote.set(id, a);
      if(!own && stateSha && cfg.seen[branch]!==csha) states.push({branch, csha, sha:stateSha});
    }
    // 2) merge the other devices' states
    let changed=false;
    for(const st of states){
      let data;
      try{
        const u8=await syncOpen(key, 'state', 0, true, await gh(token,'GET',`${P}/git/blobs/${st.sha}`,null,true));
        const body = u8[0]===1 ? await gzip(u8.subarray(1), false) : u8.subarray(1);
        data=JSON.parse(new TextDecoder().decode(body));
        if(!data || data.app!=='MemoChat' || !Array.isArray(data.threads) || !Array.isArray(data.notes)) throw new Error('shape');
      }catch(e){ if(e instanceof SyncError) throw e; console.warn('sync: unreadable state of', st.branch, e); damaged=true; continue; }
      const R=sanitizeData({threads:data.threads, notes:data.notes, tombs:data.tombs});
      clearTimeout(saveTimer); stampChanges();       // edits made while downloading count as local changes
      const m=syncMerge({threads:S.threads, notes:S.notes, tombs:S.tombs}, R, {since:cfg.lastSync||0, join:!cfg.joined, now:Date.now()});
      S.threads=m.threads; S.notes=m.notes; S.tombs=m.tombs; ensureInbox(); resetSigs();
      cfg.seen[st.branch]=st.csha; cfg.joined=true; changed=true;
    }
    if(changed){ await Store.save(S); render(); nativeAlarms(); }
    // 3) attachments this device doesn't have yet
    const atts=new Map(); S.notes.forEach(n=>(n.attachments||[]).forEach(a=>{ if(!atts.has(a.id)) atts.set(a.id, a); }));
    const have=new Set(await Store.fileKeys());
    const get=[...atts.values()].filter(a=>!have.has(a.id) && remote.has(a.id));
    for(let i=0;i<get.length;i++){
      const a=get[i], shas=remote.get(a.id), out=[];
      syncSetProg(t('syncFiles', i+1, get.length));
      try{ for(let j=0;j<shas.length;j++) out.push(await syncOpen(key, 'a-'+a.id, j, j===shas.length-1, await gh(token,'GET',`${P}/git/blobs/${shas[j]}`,null,true))); }
      catch(e){ if(e instanceof SyncError) throw e; console.warn('sync: unreadable file', a.id, e); damaged=true; continue; }
      if(!S.notes.some(n=>(n.attachments||[]).some(x=>x.id===a.id))) continue;   // its note went away meanwhile
      await Store.putFile(a.id, new Blob(out, {type:a.type}));
    }
    // 4) upload this device's state (and attachments nobody has uploaded yet).
    //    Pieces uploaded by an earlier, interrupted run are re-used (trust=true); only if GitHub has
    //    dropped them meanwhile (the tree is refused) they are uploaded again.
    const upFiles = async trust => {
      const files={}, mine = id => cfg.files[id] && (trust || cfg.files[id].every(s=>known.has(s)));
      const upl=[...atts.keys()].filter(id=>!remote.has(id) && !mine(id));
      let done=0;
      for(const id of atts.keys()){
        if(remote.has(id)){ files[id]=remote.get(id); continue; }
        if(mine(id)){ files[id]=cfg.files[id]; continue; }
        const b=await Store.getFile(id).catch(()=>null); if(!b) continue;
        syncSetProg(t('syncUp', ++done, upl.length));
        const n=Math.max(1, Math.ceil(b.size/SYNC_PART)), shas=[];
        for(let j=0;j<n;j++){
          const part=new Uint8Array(await b.slice(j*SYNC_PART, (j+1)*SYNC_PART).arrayBuffer());
          const r=await gh(token,'POST',`${P}/git/blobs`, {content:b64(await syncSeal(key, 'a-'+id, j, j===n-1, part)), encoding:'base64'});
          shas.push(r.sha); known.add(r.sha);
        }
        files[id]=shas; cfg.files[id]=shas; await syncSaveCfg();      // remembered, so an interrupted run doesn't upload it again
      }
      return files;
    };
    for(let attempt=0; ; attempt++){
      const files=await upFiles(attempt===0);
      clearTimeout(saveTimer); stampChanges(); await Store.save(S);
      const {json, hash}=await syncStatePack(files);
      cfg.files=files;
      if(hash===cfg.upHash && ownCommit) break;
      syncSetProg(t('syncing'));
      const blob=await gh(token,'POST',`${P}/git/blobs`, {content:await syncSealState(key, json), encoding:'base64'});
      const tree=[{path:'state', mode:'100644', type:'blob', sha:blob.sha}];
      for(const [id,shas] of Object.entries(files)) shas.forEach((s,j)=>tree.push({path:`a-${id}-${j}`, mode:'100644', type:'blob', sha:s}));
      let tr;
      try{ tr=await gh(token,'POST',`${P}/git/trees`, {tree}); }
      catch(e){ if(attempt===0 && e instanceof SyncError && e.status===422) continue; throw e; }
      const cm=await gh(token,'POST',`${P}/git/commits`, {message:'MemoChat sync', tree:tr.sha, parents:[]});
      if(ownCommit) await gh(token,'PATCH',`${P}/git/refs/heads/${cfg.branch}`, {sha:cm.sha, force:true});
      else await gh(token,'POST',`${P}/git/refs`, {ref:'refs/heads/'+cfg.branch, sha:cm.sha});
      cfg.upHash=hash;
      break;
    }
    cfg.joined=true; cfg.lastSync=Date.now(); cfg.lastError=damaged?'damaged':null; ok=true;
  }catch(e){
    console.warn('sync failed', e);
    cfg.lastError = e instanceof SyncError ? e.kind : 'other';
    if(e instanceof SyncError && e.kind==='http' && e.status) cfg.lastError='http:'+e.status;
  }finally{
    syncBusy=false; syncProg='';
    if(syncCfg===cfg) await syncSaveCfg();
    if(ui.left==='settings') renderLeft();
  }
  if(ok) setTimeout(syncHandOver, 0);          // the background job starts from the merged state
  if(ok && manual) snack(damaged ? t('syncErrDamaged') : t('syncDone'));
  else if(!ok && (manual || ['token','notfound','forbidden','public'].includes(cfg.lastError)))
    snack(syncErrText(cfg.lastError), manual || ui.left==='settings' ? null : t('settings'), ()=>goLeft('settings'), 10000);
  return ok;
}
function syncErrText(k){
  if(!k) return '';
  if(k==='offline') return t('syncErrOffline');
  if(k==='token') return t('syncErrToken');
  if(k==='notfound' || k==='forbidden') return t('syncErrRepo');
  if(k==='public') return t('syncErrPublic');
  if(k==='damaged' || k==='meta') return t('syncErrDamaged');
  if(k.startsWith('http')) return t('syncErrHttp', k.slice(5)||'?');
  return t('syncErrOther');
}
// automatic: when the app opens or comes back, at most once a day
function syncMaybe(){
  if(!syncOn() || syncBusy || navigator.onLine===false) return;
  const now=Date.now(), bg=syncBgInfo();
  if(bg && bg.busy){ setTimeout(syncMaybe, 5000); return; }
  // the background job found changes from another device that aren't merged yet
  if(bg && num(bg.newsAt,0) > (syncCfg.lastSync||0) && now-(syncCfg.lastAttempt||0) >= 60000){ syncNow(false); return; }
  if(now-(syncCfg.lastSync||0) < SYNC_EVERY || now-(syncCfg.lastAttempt||0) < SYNC_RETRY) return;
  syncNow(false);
}
async function syncBoot(){
  if(Store.mode!=='idb') return;
  try{ syncCfg=syncCleanCfg(await Store.kvGet('sync')); }catch(e){ syncCfg=null; }
  if(syncCfg){ syncSec=await syncSecretLoad(); if(syncSec){ try{ syncKey=await syncDeriveKey(syncSec.code); }catch(e){ syncKey=null; } } }
  if(ui.left==='settings') renderLeft();
  setTimeout(syncMaybe, 3000);
  document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='visible') setTimeout(syncMaybe, 1500); else syncHandOver(); });
  window.addEventListener('online', ()=>setTimeout(syncMaybe, 3000));
}

/* ---------- setting up, pairing code, disconnecting ---------- */
function syncCodeHTML(code){
  return `<ol class="codewords">${code.split(' ').map(w=>`<li>${esc(w)}</li>`).join('')}</ol>`;
}
function syncSetup(){
  const ov=overlay(`<div class="dlg"><h3>${t('syncT')}</h3><p>${t('syncIntro')}</p>
    <label class="field">${t('syncToken')}<input id="syTok" type="password" autocomplete="off" spellcheck="false" placeholder="github_pat_…"></label>
    <label class="field">${t('syncRepo')}<input id="syRepo" type="text" autocomplete="off" spellcheck="false" value="memochat-sync"></label>
    <p id="syErr" class="err" style="color:var(--danger);display:none"></p>
    <div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('syncConnect')}</button></div></div>`, true);
  setTimeout(()=>$('#syTok',ov).focus(),30);
  let busy=false;
  const err = s => { const e=$('#syErr',ov); e.textContent=s; e.style.display=s?'block':'none'; };
  ov.addEventListener('click', async e=>{
    const x=e.target.closest('[data-x]'); if(!x || busy) return;
    if(x.dataset.x==='no'){ closeOverlay(ov); return; }
    const token=$('#syTok',ov).value.trim();
    if(!/^[A-Za-z0-9_]{20,255}$/.test(token)){ err(t('syncErrToken')); return; }
    busy=true; x.disabled=true; err(''); x.textContent=t('syncChecking');
    try{
      const repo=await syncCheckRepo(token, $('#syRepo',ov).value);
      const meta=await syncReadMeta(token, repo);
      closeOverlay(ov);
      let code;
      if(meta){ code=await syncAskCode(meta.check); if(!code) return; }
      else {
        code=syncNewCode();
        if(!await syncShowCode(code, true)) return;
        const k=await syncDeriveKey(code);
        const content=b64(new TextEncoder().encode(JSON.stringify({app:'MemoChat', sync:1, created:new Date().toISOString(), check:await syncCheckBlob(k)}, null, 1)));
        try{ await gh(token,'PUT',`/repos/${repo}/contents/${SYNC_META}`, {message:'MemoChat sync', content}); }
        catch(e2){
          // created meanwhile by another device: use that one
          const m2=await syncReadMeta(token, repo).catch(()=>null); if(!m2) throw e2;
          code=await syncAskCode(m2.check); if(!code) return;
        }
      }
      await syncConnect(token, repo, code);
    }catch(e2){
      console.warn('sync setup', e2);
      const k = e2 instanceof SyncError ? e2.kind : 'other';
      if(overlays.includes(ov)){ busy=false; x.disabled=false; x.textContent=t('syncConnect'); err(syncErrText(k)); }
      else snack(syncErrText(k), null, null, 10000);
    }
  });
}
async function syncConnect(token, repo, code){
  if(!await syncSecretSave({token, code})){ snack(t('syncErrOther')); return; }
  const dev=[...crypto.getRandomValues(new Uint8Array(6))].map(b=>b.toString(16).padStart(2,'0')).join('');
  syncCfg={repo, deviceId:dev, branch:'mc-'+dev, lastSync:0, lastAttempt:0, lastError:null, seen:{}, files:{}, upHash:null, joined:false, tokenAt:Date.now()};
  syncSec={token, code}; syncKey=await syncDeriveKey(code);
  await syncSaveCfg();
  if(ui.left==='settings') renderLeft();
  await syncNow(true);
}
// shows the 8 words; first=true: "I've saved it" is required. The QR code (same 8 words) is shown only on request.
const QR_PREFIX='MEMOCHAT:', QR_SHOW_MS=120000;
function syncCodeQR(code){ return window.MemoQR ? window.MemoQR.svg(QR_PREFIX+code.toUpperCase(), 'M') : ''; }
function syncShowCode(code, first){
  return new Promise(res=>{
    const canQR=!!window.MemoQR;
    const ov=overlay(`<div class="dlg"><h3>${first?t('syncCodeT'):t('syncCode')}</h3><p>${first?t('syncCodeNew'):t('syncCodeShow')}</p>${syncCodeHTML(code)}
      <div class="qrbox" hidden><div class="qrimg"></div><p class="small">${t('qrShowHint')}</p></div>
      <div class="btns">${canQR?`<button class="btn" data-x="qr">${t('qrShow')}</button>`:''}<button class="btn" data-x="copy">${t('copyCode')}</button>${first?`<button class="btn" data-x="no">${t('cancel')}</button>`:''}<button class="btn primary" data-x="ok">${first?t('syncCodeSaved'):t('close')}</button></div></div>`, true, ()=>res(false));
    let timer=0;
    const box=$('.qrbox',ov), qb=$('[data-x="qr"]',ov);
    const hideQR=()=>{ clearTimeout(timer); timer=0; box.hidden=true; $('.qrimg',box).innerHTML=''; if(qb) qb.textContent=t('qrShow'); };
    ov.addEventListener('click', async e=>{ const x=e.target.closest('[data-x]'); if(!x) return;
      if(x.dataset.x==='qr'){
        if(!box.hidden){ hideQR(); return; }
        try{ $('.qrimg',box).innerHTML=syncCodeQR(code); }catch(er){ console.warn('qr', er); return; }
        box.hidden=false; qb.textContent=t('qrHide');
        timer=setTimeout(hideQR, QR_SHOW_MS);
        box.scrollIntoView({block:'nearest'});
        return;
      }
      if(x.dataset.x==='copy'){ snack(await copyText(code.split(' ').map((w,i)=>`${i+1}. ${w}`).join('\n')) ? t('copied') : t('copyFail')); return; }
      hideQR(); closeOverlay(ov); res(x.dataset.x==='ok'); });
  });
}
// camera scanner; resolves with the scanned text that accept() returned true for, or null
function qrScan(accept){
  return new Promise(res=>{
    let stream=null, timer=0, done=false, busy=false, detector=null;
    const finish=v=>{ if(done) return; done=true; clearTimeout(timer); if(stream) stream.getTracks().forEach(tr=>{ try{ tr.stop(); }catch(e){} }); if(overlays.includes(ov)) closeOverlay(ov); res(v); };
    const ov=overlay(`<div class="dlg"><h3>${t('qrScanT')}</h3><p>${t('qrScanSub')}</p>
      <div class="qrcam"><video playsinline muted autoplay></video><div class="qrframe"></div></div>
      <p class="small qrstate">${t('qrStarting')}</p>
      <div class="btns"><button class="btn" data-x="no">${t('cancel')}</button></div></div>`, true, ()=>finish(null));
    const video=$('video',ov), state=$('.qrstate',ov), canvas=document.createElement('canvas');
    const say=(s, bad)=>{ state.textContent=s; state.style.color=bad?'var(--danger)':''; };
    ov.addEventListener('click', e=>{ const x=e.target.closest('[data-x]'); if(x && x.dataset.x==='no') finish(null); });
    const tick=async ()=>{
      if(done) return;
      if(!busy && video.readyState>=2 && video.videoWidth){
        busy=true;
        try{
          const k=Math.min(1, 800/Math.max(video.videoWidth, video.videoHeight));
          const w=canvas.width=Math.round(video.videoWidth*k), h=canvas.height=Math.round(video.videoHeight*k);
          const ctx=canvas.getContext('2d', {willReadFrequently:true});
          ctx.drawImage(video, 0, 0, w, h);
          let text=null;
          if(detector){ try{ const r=await detector.detect(canvas); if(r && r[0] && r[0].rawValue) text=r[0].rawValue; }catch(e){ detector=null; } }
          if(text==null && window.MemoQR) text=window.MemoQR.decode(ctx.getImageData(0, 0, w, h), 80);
          if(text!=null && !done){ if(accept(text)){ finish(text); return; } say(t('qrWrong'), true); }
        }catch(e){ console.warn('qr scan', e); }
        busy=false;
      }
      timer=setTimeout(tick, 150);
    };
    (async ()=>{
      if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ say(t('qrNoCam'), true); return; }
      try{
        stream=await navigator.mediaDevices.getUserMedia({audio:false, video:{facingMode:{ideal:'environment'}, width:{ideal:1280}, height:{ideal:720}}});
      }catch(e){
        console.warn('camera', e);
        say(e && (e.name==='NotAllowedError' || e.name==='SecurityError') ? t('qrDenied') : t('qrNoCam'), true); return;
      }
      if(done){ stream.getTracks().forEach(tr=>tr.stop()); return; }
      try{ if('BarcodeDetector' in window){ const f=await window.BarcodeDetector.getSupportedFormats(); if(f.includes('qr_code')) detector=new window.BarcodeDetector({formats:['qr_code']}); } }catch(e){ detector=null; }
      video.srcObject=stream;
      try{ await video.play(); }catch(e){}
      say(t('qrLooking'));
      tick();
    })();
  });
}
// the pairing code inside a scanned QR (null if it isn't one)
function qrToCode(text){
  const s=String(text||'').trim();
  if(s.slice(0, QR_PREFIX.length).toUpperCase()!==QR_PREFIX) return null;
  return syncParseCode(s.slice(QR_PREFIX.length));
}
// asks for the code of an existing mailbox until it matches; resolves with the normalised code or null
function syncAskCode(check){
  return new Promise(res=>{
    const ov=overlay(`<div class="dlg"><h3>${t('syncEnterT')}</h3><p>${t('syncEnter')}</p>
      <label class="field"><textarea id="syCode" rows="3" autocomplete="off" autocapitalize="none" spellcheck="false"></textarea></label>
      <p id="syCErr" style="color:var(--danger);display:none"></p>
      <div class="btns">${window.MemoQR?`<button class="btn" data-x="scan">${I.qr} ${t('qrScan')}</button>`:''}<button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('syncConnect')}</button></div></div>`, true, ()=>res(null));
    setTimeout(()=>$('#syCode',ov).focus(),30);
    let busy=false;
    ov.addEventListener('click', async e=>{ const x=e.target.closest('[data-x]'); if(!x || busy) return;
      if(x.dataset.x==='no'){ closeOverlay(ov); res(null); return; }
      if(x.dataset.x==='scan'){
        const txt=await qrScan(s=>!!qrToCode(s));
        if(!txt || !overlays.includes(ov)) return;
        $('#syCode',ov).value=qrToCode(txt);
        $('[data-x="ok"]',ov).click();     // checks the code against the mailbox, as if typed
        return;
      }
      const er=$('#syCErr',ov), code=syncParseCode($('#syCode',ov).value);
      if(!code){ er.textContent=t('syncCodeBad'); er.style.display='block'; return; }
      busy=true;
      const ok=await syncCheckOk(await syncDeriveKey(code), check);
      busy=false;
      if(!ok){ er.textContent=t('syncCodeWrong'); er.style.display='block'; return; }
      closeOverlay(ov); res(code); });
  });
}
function syncNewToken(){
  const ov=overlay(`<div class="dlg"><h3>${t('syncNewToken')}</h3><p>${t('syncNewTokenSub', esc(syncCfg.repo))}</p>
    <label class="field">${t('syncToken')}<input id="syTok" type="password" autocomplete="off" spellcheck="false" placeholder="github_pat_…"></label>
    <p id="syErr" style="color:var(--danger);display:none"></p>
    <div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('save')}</button></div></div>`, true);
  setTimeout(()=>$('#syTok',ov).focus(),30);
  let busy=false;
  ov.addEventListener('click', async e=>{ const x=e.target.closest('[data-x]'); if(!x || busy) return;
    if(x.dataset.x==='no'){ closeOverlay(ov); return; }
    const token=$('#syTok',ov).value.trim(), er=$('#syErr',ov);
    const fail = s => { er.textContent=s; er.style.display='block'; busy=false; x.disabled=false; };
    if(!/^[A-Za-z0-9_]{20,255}$/.test(token)) return fail(t('syncErrToken'));
    busy=true; x.disabled=true;
    try{
      const repo=await syncCheckRepo(token, syncCfg.repo);
      const meta=await syncReadMeta(token, repo);
      if(!meta || !await syncCheckOk(syncKey, meta.check)) return fail(t('syncErrOtherBox'));
      if(!await syncSecretSave({token, code:syncSec.code})) return fail(t('syncErrOther'));
      syncSec={token, code:syncSec.code}; syncCfg.tokenAt=Date.now(); syncCfg.lastError=null; syncCfg.lastAttempt=0; await syncSaveCfg();
      closeOverlay(ov); await syncNow(true);
    }catch(e2){ fail(syncErrText(e2 instanceof SyncError ? e2.kind : 'other')); }
  });
}
async function syncDisconnect(){
  if(!await confirmDlg(t('syncOff'), t('syncOffConfirm'), t('syncOffBtn'), true)) return;
  const cfg=syncCfg, sec=syncSec;
  syncCfg=null; syncSec=null; syncKey=null;
  await syncSecretDel(); await syncSaveCfg();
  if(nativeBg() && NATIVE.syncBgReset) try{ NATIVE.syncBgReset(); }catch(e){}
  // this device's branch is no longer needed (the other devices already have its notes)
  if(cfg && sec) gh(sec.token,'DELETE',`/repos/${cfg.repo}/git/refs/heads/${cfg.branch}`).catch(()=>{});
  if(ui.left==='settings') renderLeft();
  snack(t('syncOffDone'));
}
function syncBgLine(){
  if(!nativeBg()) return '';
  const i=syncBgInfo()||{};
  return `<div class="small">${esc(t('syncBg'))}${num(i.lastRun,0) ? ' · '+esc(t('syncBgLast', fullWhen(i.lastRun))) : ''}</div>`;
}
function syncSettingsHTML(){
  if(Store.mode!=='idb') return '';
  if(!syncOn()){
    const broken = !!syncCfg;    // settings exist but the token/code couldn't be read
    return `<div class="section-h">${t('syncSection')}</div><div class="grp">
      <button class="it" data-act="sync-setup"><span class="ic">${I.sync}</span><div class="grow">${t('syncSetup')}<div class="small">${broken?t('syncBroken'):t('syncSetupSub')}</div></div></button></div>`;
  }
  const c=syncCfg, err=c.lastError && !syncBusy ? syncErrText(c.lastError) : '';
  const line = syncBusy ? (syncProg||t('syncing')) : (c.lastSync ? t('syncLast', fullWhen(c.lastSync)) : t('syncNever'));
  const old = Date.now()-(c.tokenAt||Date.now()) > 350*DAY;
  return `<div class="section-h">${t('syncSection')}</div><div class="grp">
    <button class="it" data-act="sync-now"><span class="ic">${I.sync}</span><div class="grow">${t('syncNow')}<div class="small" id="syncLine">${esc(line)}</div>${err?`<div class="small" style="color:var(--danger)">${esc(err)}</div>`:''}${syncBgLine()}</div></button>
    ${c.lastError==='token'||old?`<button class="it" data-act="sync-token"><span class="ic">${I.edit}</span><div class="grow">${t('syncNewToken')}<div class="small">${old&&c.lastError!=='token'?t('syncTokenOld'):esc(c.repo)}</div></div></button>`:''}
    <button class="it" data-act="sync-code"><span class="ic">${I.eye}</span><div class="grow">${t('syncCode')}<div class="small">${t('syncCodeSub')}</div></div></button>
    <button class="it" data-act="sync-off"><span class="ic">${I.x}</span><div class="grow">${t('syncOff')}<div class="small">${t('syncOffSub', esc(c.repo))}</div></div></button>
  </div>`;
}
document.addEventListener('click', e=>{
  const a=e.target.closest('[data-act^="sync-"]'); if(!a || e.target.closest('.ov')) return;
  const act=a.dataset.act;
  if(act==='sync-setup') return syncSetup();
  if(act==='sync-now') return syncNow(true);
  if(act==='sync-token') return syncOn() && syncNewToken();
  if(act==='sync-code') return syncOn() && syncShowCode(syncSec.code, false);
  if(act==='sync-off') return syncDisconnect();
});

/* =========================================================
   Boot
   ========================================================= */
(async function boot(){
  S.settings = Object.assign({}, DEFAULT_SETTINGS);
  applyTheme();
  await Store.init();
  const saved = await Store.load();
  if(saved && Array.isArray(saved.threads)){ const c=sanitizeData(saved); S = {threads:c.threads, notes:c.notes, tombs:c.tombs, settings:Object.assign({}, DEFAULT_SETTINGS, c.settings)}; setTimeout(gcFiles, 8000); }
  else { S = seed(); persist(); }
  stampChanges();            // remembers the loaded state; anything purged below gets a tombstone
  ensureInbox(); purgeTrash();
  setInterval(checkReminders, 30000); setTimeout(checkReminders, 1500);
  if(isWide()){ const inbox=S.threads.find(x=>x.system==='inbox'); ui.threadId=inbox.id; ui.showThread=true; }
  render();
  registerSW();
  handleLaunch();
  if(NATIVE) nativeBoot();
  syncBoot();
})();

/* =========================================================
   Launch: icon shortcuts (?open=…) and sharing from other apps (?share=1)
   ========================================================= */
function handleLaunch(){
  const q = new URLSearchParams(location.search);
  if(!q.has('share') && !q.has('open')) return;
  try{ history.replaceState(history.state, '', location.pathname); }catch(e){}
  if(q.has('share')) return receiveShare();
  const what = q.get('open'), act = activeThreads();
  if(what==='search') return openSearch(null);
  let th = what==='work' ? act.find(x=>!x.system && x.name.trim().toLowerCase()==='work') : null;
  th = th || act.find(x=>x.system==='inbox');
  if(th){ ui.left='list'; openThread(th.id); }
}
async function receiveShare(){
  const sh = await Store.take('share'); if(!sh || typeof sh!=='object') return;
  return receiveShareData(sh);
}
async function receiveShareData(sh){
  const title=str(sh.title,2000).trim(), text=str(sh.text).trim(), url=str(sh.url,5000).trim();
  const parts=[];
  if(title && !text.includes(title) && title!==url) parts.push(title);
  if(text) parts.push(text);
  if(url && !text.includes(url)) parts.push(url);
  const body = parts.join('\n');
  const files = (Array.isArray(sh.files) ? sh.files : []).filter(f=>f instanceof Blob);
  if(!body && !files.length){ snack(t('shareEmpty')); return; }
  // the shared content goes into the composer of the chosen thread, so a comment, priority or date can be added before sending
  const deliver = async id => {
    if(!thread(id)) return;
    S.settings.recent = [id, ...(S.settings.recent||[]).filter(x=>x!==id)].slice(0,5); persist();
    ui.left='list'; openThread(id);
    ui.comp.mode='text'; ui.comp.editing=null; renderComposer(false);
    if(files.length) await addFilesToComposer(files);
    const inp=$('#cInput');
    if(inp){ inp.value = inp.value.trim() ? inp.value.replace(/\s+$/,'')+'\n'+body : body; autoGrow(inp); updateSend(); inp.focus(); try{ inp.setSelectionRange(inp.value.length, inp.value.length); }catch(e){} }
  };
  const choose = () => {
    const items = [{icon:I.newThread, label:t('newThread'), fn:async()=>{ const th=await newThread(); if(th) deliver(th.id); else choose(); }}]
      .concat(orderedTargets(null).map(th=>({icon:avatar(th,'xs'), label:th.name, fn:()=>deliver(th.id)})));
    const fprev = files.length ? (/^image\//.test(files[0].type)?'📷 ':'📎 ') + (cleanName(files[0].name)||'') + (files.length>1?` +${files.length-1}`:'') : '';
    const prev = [fprev, body.split('\n')[0]].filter(Boolean).join(' · ');
    sheet(t('saveTo'), items, prev.length>90 ? prev.slice(0,90)+'…' : prev, ()=>snack(t('shareCancelled'), t('chooseAgain'), choose, 10000));
  };
  choose();
}

/* =========================================================
   Service worker: offline + updates
   ========================================================= */
function registerSW(){
  if(NATIVE || !('serviceWorker' in navigator) || location.protocol==='file:') return;
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
/* =========================================================
   Android app (APK) only: notifications, weekly backup, launch intents, updates.
   Every function here returns early in a browser (NATIVE is null).
   ========================================================= */
let lastAlarmSig = '';
// next weekly-backup reminder: 7 days after the last backup (or after "Tomorrow"), at 18:00
function nextBackupAt(){
  const s=S.settings;
  let at = s.lastBackup ? s.lastBackup + 7*DAY : Date.now() + DAY;
  if(s.backupSnooze && s.backupSnooze > at) at = s.backupSnooze;
  at = Math.max(at, Date.now() + 60000);
  const d=new Date(at); d.setHours(18,0,0,0); if(d.getTime() < at) d.setDate(d.getDate()+1);
  return d.getTime();
}
// hands the full list of upcoming reminders to Android (AlarmManager); only when it changed
function nativeAlarms(){
  if(!NATIVE) return;
  const now=Date.now(), list=[];
  dueNotes().forEach(n=>{
    if(n.done) return;
    const r=remindTs(n.due); if(!r || r<=now) return;
    const th=thread(n.threadId);
    list.push({id:'n-'+n.id, at:r, title:noteSnippet(n)||t('photoMsg'), text:(th?th.name+' · ':'')+dueFull(n.due), note:n.id});
  });
  list.sort((a,b)=>a.at-b.at);
  const out=list.slice(0,250);
  if(S.notes.length) out.push({id:'backup', at:nextBackupAt(), title:t('backupDueT'), text:t('backupDueSub'), backup:true});
  const sig=JSON.stringify(out); if(sig===lastAlarmSig) return; lastAlarmSig=sig;
  try{ NATIVE.setAlarms(sig); }catch(e){}
  if(list.length) askNotifOnce();
}
// Android 13+ asks for notification permission; we ask once, later only via Settings
async function askNotifOnce(){
  if(!NATIVE || S.settings.notifAsked) return;
  let st='denied'; try{ st=NATIVE.notifState(); }catch(e){ return; }
  if(st==='granted') return;
  S.settings.notifAsked=true; persist();
  await nativeAsync('requestNotif');
  if(ui.left==='settings') renderLeft();
}
function nativeSettingsHTML(){
  const s=S.settings; let folder='', notif='denied';
  try{ folder=NATIVE.folderName()||''; }catch(e){}
  try{ notif=NATIVE.notifState(); }catch(e){}
  return `<div class="section-h">${t('weeklySection')}</div>
    <div class="grp">
      <div class="it"><span class="ic">${I.archive}</span><div class="grow">${t('backupFolder')}<div class="small">${esc(folder||t('noFolder'))}</div></div><button class="btn" data-act="n-folder">${t('changeFolder')}</button></div>
      <div class="it"><span class="ic">${I.settings}</span><div class="grow">${t('encryptWeekly')}</div><div class="seg"><button class="${s.backupEncrypt?'':'on'}" data-act="n-enc" data-v="0">${t('encOff')}</button><button class="${s.backupEncrypt?'on':''}" data-act="n-enc" data-v="1">${t('encOn')}</button></div></div>
      <button class="it" data-act="n-backup"><span class="ic">${I.download}</span><div class="grow">${t('backupToFolder')}<div class="small">${t('keepN')}</div></div></button>
    </div>
    <div class="section-h">${t('notifSection')}</div>
    <div class="grp"><div class="it"><span class="ic">${I.bell}</span><div class="grow">${notif==='granted'?t('notifOn'):t('notifOff')}</div>${notif==='granted'?'':`<button class="btn" data-act="n-notif">${t('notifAllow')}</button>`}</div></div>`;
}
document.addEventListener('click', async e=>{
  const a=e.target.closest('[data-act^="n-"]'); if(!a || !NATIVE || e.target.closest('.ov')) return;
  const act=a.dataset.act;
  if(act==='n-folder'){ const r=await nativeAsync('pickFolder'); if(r) renderLeft(); }
  else if(act==='n-enc'){
    const on=a.dataset.v==='1'; if(on===!!S.settings.backupEncrypt) return;
    if(on){ const pw=await askNewPassword(); if(!pw) return; if(!NATIVE.secretSet('backupPw', pw)){ snack(t('backupFailed')); return; } }
    else { try{ NATIVE.secretDel('backupPw'); }catch(_){} }
    S.settings.backupEncrypt=on; commit();
  }
  else if(act==='n-backup'){ await runWeeklyBackup(); }
  else if(act==='n-notif'){
    if(!S.settings.notifAsked){ S.settings.notifAsked=true; persist(); await nativeAsync('requestNotif'); renderLeft(); }
    else NATIVE.openNotifSettings();
  }
});
function askNewPassword(){
  return new Promise(res=>{
    const ov=overlay(`<div class="dlg"><h3>${t('setPwT')}</h3><p>${t('setPwSub')}</p>
      <label class="field">${t('password')}<input id="np1" type="password" autocomplete="new-password"></label>
      <label class="field">${t('pwRepeat')}<input id="np2" type="password" autocomplete="new-password"></label>
      <p id="npErr" style="color:var(--danger);display:none">${t('pwMismatch')}</p>
      <div class="btns"><button class="btn" data-x="no">${t('cancel')}</button><button class="btn primary" data-x="ok">${t('save')}</button></div></div>`, true, ()=>res(null));
    setTimeout(()=>$('#np1',ov).focus(),30);
    ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return;
      if(x.dataset.x==='no'){ closeOverlay(ov); res(null); return; }
      const p1=$('#np1',ov).value, p2=$('#np2',ov).value;
      if(!p1 || p1!==p2){ $('#npErr',ov).style.display='block'; return; }
      closeOverlay(ov); res(p1); });
  });
}
let weeklyBusy=false;
function weeklyDue(){
  const s=S.settings, now=Date.now();
  if(!S.notes.length) return false;                       // nothing to back up yet (fresh install)
  if(s.backupSnooze && now < s.backupSnooze) return false;
  return !s.lastBackup || now - s.lastBackup >= 7*DAY;
}
async function weeklyPrompt(force){
  if(!NATIVE || weeklyBusy || overlays.length) return;
  if(!force && !weeklyDue()) return;
  weeklyBusy=true;
  try{
    let folder=''; try{ folder=NATIVE.folderName()||''; }catch(e){}
    const ok = await new Promise(res=>{
      const ov=overlay(`<div class="dlg" role="alertdialog"><h3>${t('weeklyT')}</h3><p>${esc(t('weeklySub', folder))}</p><div class="btns"><button class="btn" data-x="no">${t('tomorrow2')}</button><button class="btn primary" data-x="yes">${t('backUp')}</button></div></div>`, true, ()=>res(false));
      ov.addEventListener('click',e=>{ const x=e.target.closest('[data-x]'); if(!x) return; closeOverlay(ov); res(x.dataset.x==='yes'); });
    });
    if(!ok){ const d=new Date(); d.setDate(d.getDate()+1); d.setHours(0,0,0,0); S.settings.backupSnooze=d.getTime(); persist(); return; }
    await runWeeklyBackup();
  } finally { weeklyBusy=false; }
}
// ZIP backup into the chosen folder; keeps the 4 newest backups there
async function runWeeklyBackup(){
  let folder=''; try{ folder=NATIVE.folderName()||''; }catch(e){}
  if(!folder){ folder=await nativeAsync('pickFolder'); if(!folder){ snack(t('folderNeeded')); return false; } }
  let pw='';
  if(S.settings.backupEncrypt){
    try{ pw=NATIVE.secretGet('backupPw')||''; }catch(e){}
    if(!pw){ pw=await askNewPassword(); if(!pw) return false; try{ NATIVE.secretSet('backupPw', pw); }catch(e){} }
  }
  snack(t('backupWorking'), null, null);
  let blob;
  try{ blob=await makeBackup(pw); }
  catch(err){ snack(err && err.message==='too-large' ? t('backupTooLarge') : t('backupFailed')); return false; }
  const d=new Date(), stamp=`${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
  let tok=null; try{ tok=NATIVE.folderWrite(`memochat-backup-${stamp}${pw?'-encrypted':''}.zip`, 'application/zip'); }catch(e){}
  if(!tok){ snack(t('folderLost')); return false; }
  try{ await nativeWrite(tok, blob); }
  catch(e){ try{ NATIVE.abort(tok); }catch(_){} snack(t('fileSaveFail')); return false; }
  try{ NATIVE.folderPrune('memochat-backup-', 4); }catch(e){}
  S.settings.lastBackup=Date.now(); S.settings.backupSnooze=null; S.settings.nudgeSnooze=null; commit();
  snack(t('weeklyDone', folder));
  if(ui.left==='settings') renderLeft();
  return true;
}
// launches from Android: icon shortcut, notification tap, sharing from another app
// launches that arrive before the data is loaded wait for nativeBoot()
let nativeBooted=false; const launchQueue=[];
window.__mcLaunch = o => { if(nativeBooted) handleNativeLaunch(o); else launchQueue.push(o); };
async function handleNativeLaunch(o){
  if(!o || typeof o!=='object') return;
  if(o.open){
    const act=activeThreads();
    if(o.open==='search') return openSearch(null);
    let th = o.open==='work' ? act.find(x=>!x.system && x.name.trim().toLowerCase()==='work') : null;
    th = th || act.find(x=>x.system==='inbox');
    if(th){ ui.left='list'; openThread(th.id); }
    return;
  }
  if(o.note){
    const n=note(o.note); if(!n || n.deletedAt) return;
    const th=thread(n.threadId); if(!th) return;
    if(th.hideDone && n.done) th.hideDone=false;
    ui.left='list'; openThread(th.id, {flash:[n.id]}); return;
  }
  if(o.backup) return weeklyPrompt(true);
  if(o.share){
    const sh=o.share, files=[];
    for(const f of (Array.isArray(sh.files)?sh.files:[])){
      if(!f || typeof f.url!=='string' || !/^\/__share\/\d+$/.test(f.url)) continue;   // only files Android handed over
      try{ const r=await fetch(f.url); if(!r.ok) continue; const b=await r.blob(); files.push(new File([b], cleanName(f.name)||'', {type:cleanType(f.type||b.type)})); }catch(e){}
    }
    return receiveShareData({title:str(sh.title,2000), text:str(sh.text), url:'', files});
  }
}
async function checkApkUpdate(){
  const s=S.settings; if(s.updCheck && Date.now()-s.updCheck < 20*3600000) return;
  const r=await nativeAsync('checkUpdate'); if(!r || typeof r!=='object') return;
  s.updCheck=Date.now(); persist();
  const info=nativeInfo();
  if(num(r.versionCode,0) > num(info.versionCode,0) && typeof r.apk==='string' && /^https:\/\/github\.com\/tvspk\/memochat\/releases\/download\/[\w.-]+\/[\w.-]+\.apk$/.test(r.apk))
    snack(t('apkUpdate', str(r.versionName,20)), [{label:t('later')}, {label:t('download'), fn:()=>NATIVE.openUrl(r.apk)}], 30000);
}
function nativeBoot(){
  let L=null; try{ const j=NATIVE.takeLaunch(); if(j) L=JSON.parse(j); }catch(e){}
  if(L) handleNativeLaunch(L);
  nativeBooted=true; while(launchQueue.length) handleNativeLaunch(launchQueue.shift());
  nativeAlarms();
  setTimeout(()=>{ if(!L || !L.backup) weeklyPrompt(false); }, 2000);
  document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='visible'){ nativeAlarms(); setTimeout(()=>weeklyPrompt(false), 800); } });
  setTimeout(checkApkUpdate, 5000);
}

})();
