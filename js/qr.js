/* MemoChat QR codes: a small encoder (for showing the sync pairing code) and decoder (for scanning it
   with the camera). Written for this app, no libraries. Versions 1–10, all error-correction levels,
   numeric / alphanumeric / byte data. Exposes window.MemoQR = {encode, svg, decode}. */
(function(){
'use strict';

/* ---------- GF(256), polynomial 0x11D ---------- */
const EXP=new Uint8Array(512), LOG=new Uint8Array(256);
(function(){ let x=1; for(let i=0;i<255;i++){ EXP[i]=x; LOG[x]=i; x<<=1; if(x&0x100) x^=0x11D; } for(let i=255;i<512;i++) EXP[i]=EXP[i-255]; })();
const gmul=(a,b)=> (a&&b) ? EXP[LOG[a]+LOG[b]] : 0;
const gdiv=(a,b)=> a ? EXP[(LOG[a]+255-LOG[b])%255] : 0;
const gpow=p=> EXP[((p%255)+255)%255];

/* ---------- tables (versions 1–10; levels L, M, Q, H) ---------- */
const MAXV=10, ECL={L:0,M:1,Q:2,H:3}, FORMAT_ECL=[1,0,3,2];
const ECC_PER_BLOCK=[[7,10,15,20,26,18,20,24,30,18],[10,16,26,18,24,16,18,22,22,26],[13,22,18,26,18,24,18,22,20,24],[17,28,22,16,22,28,26,26,24,28]];
const NUM_BLOCKS=[[1,1,1,1,1,2,2,2,2,4],[1,1,1,2,2,4,4,4,5,5],[1,1,2,2,4,4,6,6,8,8],[1,1,2,4,4,4,5,6,8,8]];
const ALNUM='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';

function rawModules(v){ let r=(16*v+128)*v+64; if(v>=2){ const n=Math.floor(v/7)+2; r-=(25*n-10)*n-55; if(v>=7) r-=36; } return r; }
function layout(v,e){
  const nb=NUM_BLOCKS[e][v-1], ecc=ECC_PER_BLOCK[e][v-1], raw=Math.floor(rawModules(v)/8);
  return {nb, ecc, raw, data:raw-ecc*nb, short:nb-raw%nb, shortLen:Math.floor(raw/nb)};
}
function alignPos(v){
  if(v===1) return [];
  const n=Math.floor(v/7)+2, size=v*4+17, step=Math.ceil((v*4+4)/(n*2-2))*2, r=[6];
  for(let p=size-7; r.length<n; p-=step) r.splice(1,0,p);
  return r;
}
function formatBits(e, mask){ const d=FORMAT_ECL[e]<<3|mask; let r=d; for(let i=0;i<10;i++) r=(r<<1)^((r>>>9)*0x537); return ((d<<10)|r)^0x5412; }
function versionBits(v){ let r=v; for(let i=0;i<12;i++) r=(r<<1)^((r>>>11)*0x1F25); return v<<12|r; }
const MASKS=[
  (x,y)=>(x+y)%2===0, (x,y)=>y%2===0, (x,y)=>x%3===0, (x,y)=>(x+y)%3===0,
  (x,y)=>(Math.floor(x/3)+Math.floor(y/2))%2===0, (x,y)=>x*y%2+x*y%3===0,
  (x,y)=>(x*y%2+x*y%3)%2===0, (x,y)=>((x+y)%2+x*y%3)%2===0
];

/* ---------- module grid: function patterns and the order of data modules ---------- */
// format bit i lives at FORMAT_POS(n)[0][i] and FORMAT_POS(n)[1][i] ([x, y])
function formatPos(n){
  const a=[], b=[];
  for(let i=0;i<=5;i++) a.push([8,i]);
  a.push([8,7],[8,8],[7,8]);
  for(let i=9;i<15;i++) a.push([14-i,8]);
  for(let i=0;i<8;i++) b.push([n-1-i,8]);
  for(let i=8;i<15;i++) b.push([8,n-15+i]);
  return [a,b];
}
function grid(v){
  const n=v*4+17, m=new Uint8Array(n*n), f=new Uint8Array(n*n);
  const set=(x,y,d)=>{ m[y*n+x]=d?1:0; f[y*n+x]=1; };
  for(let i=0;i<n;i++){ set(6,i,i%2===0); set(i,6,i%2===0); }
  const finder=(cx,cy)=>{ for(let dy=-4;dy<=4;dy++) for(let dx=-4;dx<=4;dx++){
    const x=cx+dx, y=cy+dy, d=Math.max(Math.abs(dx),Math.abs(dy));
    if(x>=0&&x<n&&y>=0&&y<n) set(x,y,d!==2&&d!==4); } };
  finder(3,3); finder(n-4,3); finder(3,n-4);
  const ap=alignPos(v), k=ap.length;
  for(let i=0;i<k;i++) for(let j=0;j<k;j++){
    if((i===0&&j===0)||(i===0&&j===k-1)||(i===k-1&&j===0)) continue;
    for(let dy=-2;dy<=2;dy++) for(let dx=-2;dx<=2;dx++) set(ap[i]+dx, ap[j]+dy, Math.max(Math.abs(dx),Math.abs(dy))!==1);
  }
  const g={v, n, m, f, set};
  writeFormat(g, 0);            // reserves the format areas (and sets the dark module)
  if(v>=7){ const bits=versionBits(v); for(let i=0;i<18;i++){ const d=(bits>>>i)&1, a=n-11+i%3, b=Math.floor(i/3); set(a,b,d); set(b,a,d); } }
  return g;
}
function writeFormat(g, bits){
  const [a,b]=formatPos(g.n);
  for(let i=0;i<15;i++){ const d=(bits>>>i)&1; g.set(a[i][0],a[i][1],d); g.set(b[i][0],b[i][1],d); }
  g.set(8, g.n-8, 1);
}
function dataOrder(g){
  const {n,f}=g, out=[];
  for(let right=n-1; right>=1; right-=2){
    if(right===6) right=5;
    const up=((right+1)&2)===0;
    for(let vert=0; vert<n; vert++) for(let j=0;j<2;j++){
      const x=right-j, y=up ? n-1-vert : vert;
      if(!f[y*n+x]) out.push(y*n+x);
    }
  }
  return out;
}

/* ---------- Reed–Solomon ---------- */
function rsDivisor(deg){
  const r=new Uint8Array(deg); r[deg-1]=1; let root=1;
  for(let i=0;i<deg;i++){ for(let j=0;j<deg;j++){ r[j]=gmul(r[j],root); if(j+1<deg) r[j]^=r[j+1]; } root=gmul(root,2); }
  return r;
}
function rsRemainder(data, div){
  const r=new Uint8Array(div.length);
  for(const b of data){ const f=b^r[0]; r.copyWithin(0,1); r[r.length-1]=0; for(let i=0;i<r.length;i++) r[i]^=gmul(div[i],f); }
  return r;
}
// corrects a block (data + ecc, first byte = highest power) in place; false if it can't be corrected
function rsCorrect(c, ecc){
  const N=c.length, S=new Uint8Array(ecc); let bad=false;
  for(let j=0;j<ecc;j++){ const a=gpow(j); let s=0; for(let k=0;k<N;k++) s=gmul(s,a)^c[k]; S[j]=s; if(s) bad=true; }
  if(!bad) return true;
  // Berlekamp–Massey (polynomials lowest power first)
  let C=[1], B=[1], L=0, m=1, b=1;
  for(let n=0;n<ecc;n++){
    let d=S[n]; for(let i=1;i<=L;i++) d^=gmul(C[i]||0, S[n-i]);
    if(d===0){ m++; continue; }
    const coef=gdiv(d,b), T=C.slice(), need=B.length+m;
    while(C.length<need) C.push(0);
    for(let i=0;i<B.length;i++) C[i+m]^=gmul(coef,B[i]);
    if(2*L<=n){ L=n+1-L; B=T; b=d; m=1; } else m++;
  }
  if(L===0 || 2*L>ecc) return false;
  const ev=(p,x)=>{ let r=0; for(let i=p.length-1;i>=0;i--) r=gmul(r,x)^p[i]; return r; };
  const omega=new Array(ecc).fill(0);
  for(let i=0;i<ecc;i++) for(let j=0;j<C.length && i+j<ecc;j++) omega[i+j]^=gmul(S[i],C[j]);
  const dC=C.map((v,i)=> i%2===1 ? v : 0).slice(1);
  let found=0;
  for(let k=0;k<N;k++){
    const p=N-1-k, Xinv=gpow(-p);
    if(ev(C,Xinv)!==0) continue;
    const den=ev(dC,Xinv); if(!den) return false;
    c[k]^=gmul(gpow(p), gdiv(ev(omega,Xinv), den)); found++;
  }
  if(found!==L) return false;
  for(let j=0;j<ecc;j++){ const a=gpow(j); let s=0; for(let k=0;k<N;k++) s=gmul(s,a)^c[k]; if(s) return false; }
  return true;
}

/* ---------- encoder ---------- */
function penalty(m, n){
  let p=0, dark=0;
  const line=new Uint8Array(n);
  const finderLike=(b)=> line[b]&&!line[b+1]&&line[b+2]&&line[b+3]&&line[b+4]&&!line[b+5]&&line[b+6];
  const light=(from,to)=>{ for(let i=from;i<to;i++) if(i>=0&&i<n&&line[i]) return false; return true; };
  for(let pass=0;pass<2;pass++) for(let a=0;a<n;a++){
    for(let b=0;b<n;b++) line[b]= pass ? m[b*n+a] : m[a*n+b];
    let run=1;
    for(let b=1;b<=n;b++){ if(b<n && line[b]===line[b-1]) run++; else { if(run>=5) p+=run-2; run=1; } }
    for(let b=0;b+7<=n;b++) if(finderLike(b) && (light(b-4,b) || light(b+7,b+11))) p+=40;
  }
  for(let y=0;y<n;y++) for(let x=0;x<n;x++){
    const c=m[y*n+x]; dark+=c;
    if(x<n-1 && y<n-1 && c===m[y*n+x+1] && c===m[(y+1)*n+x] && c===m[(y+1)*n+x+1]) p+=3;
  }
  const k=Math.ceil(Math.abs(dark*20-n*n*10)/(n*n))-1;
  return p + Math.max(0,k)*10;
}
function encode(text, ecl){
  text=String(text);
  const e=ECL[ecl||'M'];
  const alnum=[...text].every(ch=>ALNUM.includes(ch)), bytes=alnum ? null : new TextEncoder().encode(text);
  let v, bits, L;
  for(v=1; v<=MAXV; v++){
    L=layout(v,e); bits=[];
    const push=(val,len)=>{ for(let i=len-1;i>=0;i--) bits.push((val>>>i)&1); };
    if(alnum){
      const cl=v<10?9:11; if(text.length>=(1<<cl)) continue;
      push(2,4); push(text.length,cl);
      for(let i=0;i+1<text.length;i+=2) push(ALNUM.indexOf(text[i])*45+ALNUM.indexOf(text[i+1]),11);
      if(text.length%2) push(ALNUM.indexOf(text[text.length-1]),6);
    } else {
      const cl=v<10?8:16; if(bytes.length>=(1<<cl)) continue;
      push(4,4); push(bytes.length,cl); for(const b of bytes) push(b,8);
    }
    if(bits.length<=L.data*8) break;
  }
  if(v>MAXV) throw new Error('QR: text too long');
  const cap=L.data*8;
  for(let i=0;i<4 && bits.length<cap;i++) bits.push(0);
  while(bits.length%8) bits.push(0);
  const data=[];
  for(let i=0;i<bits.length;i+=8){ let b=0; for(let j=0;j<8;j++) b=b<<1|bits[i+j]; data.push(b); }
  for(let pad=0xEC; data.length<L.data; pad^=0xEC^0x11) data.push(pad);
  // blocks + interleaving
  const div=rsDivisor(L.ecc), blocks=[];
  for(let i=0,k=0;i<L.nb;i++){
    const len=L.shortLen-L.ecc+(i<L.short?0:1), d=data.slice(k,k+len); k+=len;
    const ec=Array.from(rsRemainder(d,div));
    if(i<L.short) d.push(0);
    blocks.push(d.concat(ec));
  }
  const cw=[];
  for(let i=0;i<blocks[0].length;i++) for(let j=0;j<blocks.length;j++)
    if(i!==L.shortLen-L.ecc || j>=L.short) cw.push(blocks[j][i]);
  // place, then pick the mask with the lowest penalty
  const g=grid(v), order=dataOrder(g), n=g.n, base=g.m.slice();
  for(let i=0;i<order.length;i++) base[order[i]] = i<cw.length*8 ? (cw[i>>>3]>>>(7-(i&7)))&1 : 0;
  let best=null, bestP=Infinity;
  for(let mask=0;mask<8;mask++){
    const m=base.slice(), gg={n, m, set:(x,y,d)=>{ m[y*n+x]=d?1:0; }};
    for(const idx of order){ if(MASKS[mask](idx%n, Math.floor(idx/n))) m[idx]^=1; }
    writeFormat(gg, formatBits(e,mask));
    const p=penalty(m,n);
    if(p<bestP){ bestP=p; best=m; }
  }
  return {version:v, size:n, modules:best};
}
// SVG with a 4-module quiet zone; black on white whatever the app theme
function svg(text, ecl){
  const q=encode(text, ecl), n=q.size, b=4, N=n+2*b;
  let d='';
  for(let y=0;y<n;y++) for(let x=0;x<n;x++) if(q.modules[y*n+x]) d+=`M${x+b} ${y+b}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" shape-rendering="crispEdges" role="img"><rect width="${N}" height="${N}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
}

/* ---------- decoder ---------- */
// adaptive threshold (local averages over 8×8 blocks); 1 = dark
function binarize(lum, w, h){
  const B=8, bw=Math.ceil(w/B), bh=Math.ceil(h/B), avg=new Float32Array(bw*bh);
  for(let by=0;by<bh;by++) for(let bx=0;bx<bw;bx++){
    let sum=0, cnt=0, mn=255, mx=0;
    for(let y=by*B; y<Math.min(h,by*B+B); y++) for(let x=bx*B; x<Math.min(w,bx*B+B); x++){ const v=lum[y*w+x]; sum+=v; cnt++; if(v<mn) mn=v; if(v>mx) mx=v; }
    let a=sum/cnt;
    if(mx-mn<=24){
      a=mn/2;
      if(by>0 && bx>0){ const nb=(avg[(by-1)*bw+bx]+2*avg[by*bw+bx-1]+avg[(by-1)*bw+bx-1])/4; if(mn<nb) a=nb; }
    }
    avg[by*bw+bx]=a;
  }
  const out=new Uint8Array(w*h);
  for(let by=0;by<bh;by++) for(let bx=0;bx<bw;bx++){
    let s=0;
    for(let dy=-2;dy<=2;dy++) for(let dx=-2;dx<=2;dx++){
      const yy=Math.min(bh-1,Math.max(0,by+dy)), xx=Math.min(bw-1,Math.max(0,bx+dx)); s+=avg[yy*bw+xx];
    }
    const t=s/25;
    for(let y=by*B; y<Math.min(h,by*B+B); y++) for(let x=bx*B; x<Math.min(w,bx*B+B); x++) out[y*w+x]= lum[y*w+x]<=t ? 1 : 0;
  }
  return out;
}
function ratioOk(c){   // 1:1:3:1:1
  let t=0; for(const v of c){ if(!v) return false; t+=v; }
  if(t<7) return false;
  const m=t/7, mv=m/2;
  return Math.abs(m-c[0])<mv && Math.abs(m-c[1])<mv && Math.abs(3*m-c[2])<3*mv && Math.abs(m-c[3])<mv && Math.abs(m-c[4])<mv;
}
// runs of a finder pattern through (x, y) along (dx, dy): {c:[5 counts], center:offset along the line}
function crossRuns(bin, w, h, x, y, dx, dy, max){
  const at=(i)=>{ const xx=x+dx*i, yy=y+dy*i; return (xx<0||yy<0||xx>=w||yy>=h) ? -1 : bin[yy*w+xx]; };
  if(at(0)!==1) return null;
  const c=[0,0,0,0,0]; let i=0;
  while(at(i)===1 && c[2]<=max){ c[2]++; i--; }
  while(at(i)===0 && c[1]<=max){ c[1]++; i--; }
  while(at(i)===1 && c[0]<=max){ c[0]++; i--; }
  const start=i+1;
  i=1;
  while(at(i)===1 && c[2]<=max){ c[2]++; i++; }
  while(at(i)===0 && c[3]<=max){ c[3]++; i++; }
  while(at(i)===1 && c[4]<=max){ c[4]++; i++; }
  const end=i;     // exclusive
  if(!ratioOk(c)) return null;
  // centre of the middle run, as an image coordinate along the line
  const midStart=start+c[0]+c[1], base=dx ? x : y;
  return {c, total:c[0]+c[1]+c[2]+c[3]+c[4], center:base+midStart+c[2]/2, span:[start,end]};
}
function findFinders(bin, w, h){
  const cands=[];
  const add=(x,y,s)=>{
    for(const c of cands){
      if(Math.abs(c.x-x)<=c.s && Math.abs(c.y-y)<=c.s && Math.abs(c.s-s)<=Math.max(1,c.s*0.4)){
        const n=c.n+1; c.x=(c.x*c.n+x)/n; c.y=(c.y*c.n+y)/n; c.s=(c.s*c.n+s)/n; c.n=n; return;
      }
    }
    cands.push({x, y, s, n:1});
  };
  const runs=new Int32Array(w+1), cols=new Uint8Array(w+1);
  for(let y=0;y<h;y++){
    let k=0, prev=-1;
    for(let x=0;x<w;x++){ const v=bin[y*w+x]; if(v!==prev){ cols[k]=v; runs[k]=0; k++; prev=v; } runs[k-1]++; }
    let pos=0;
    for(let i=0;i+4<k;i++){
      const startI=pos; pos+=runs[i];
      if(cols[i]!==1) continue;
      const c=[runs[i],runs[i+1],runs[i+2],runs[i+3],runs[i+4]];
      if(!ratioOk(c)) continue;
      const cx=Math.floor(startI+c[0]+c[1]+c[2]/2), hTotal=c[0]+c[1]+c[2]+c[3]+c[4];
      const vr=crossRuns(bin,w,h,cx,y,0,1,hTotal*2); if(!vr) continue;
      if(5*Math.abs(vr.total-hTotal)>=2*hTotal) continue;
      const cy=Math.floor(vr.center);
      const hr=crossRuns(bin,w,h,cx,cy,1,0,hTotal*2); if(!hr) continue;
      if(5*Math.abs(hr.total-hTotal)>=2*hTotal) continue;
      add(hr.center, vr.center, (hr.total+vr.total)/14);
    }
  }
  return cands;
}
function pickTriples(cands){
  let cs=cands.filter(c=>c.n>=2);
  if(cs.length<3) cs=cands.slice();
  cs.sort((a,b)=>b.n-a.n); cs=cs.slice(0,10);
  const out=[];
  const d2=(a,b)=>(a.x-b.x)**2+(a.y-b.y)**2;
  for(let i=0;i<cs.length;i++) for(let j=i+1;j<cs.length;j++) for(let k=j+1;k<cs.length;k++){
    const t=[cs[i],cs[j],cs[k]], ss=t.map(c=>c.s);
    if(Math.max(...ss)/Math.min(...ss)>1.5) continue;
    const s=[d2(t[1],t[2]), d2(t[0],t[2]), d2(t[0],t[1])];   // side opposite each vertex
    const top=s.indexOf(Math.max(...s)), o=[0,1,2].filter(q=>q!==top);
    const a=Math.min(s[o[0]],s[o[1]]), b=Math.max(s[o[0]],s[o[1]]), c=s[top];
    const ms=(ss[0]+ss[1]+ss[2])/3;
    if(a < (10*ms)**2) continue;
    const right=Math.abs(c-a-b)/c, iso=Math.sqrt(a/b);
    if(right>0.6 || iso<0.5) continue;
    // order: top-left (the right angle), top-right, bottom-left. Under strong perspective the right angle
    // can be misjudged, so the other two corners are tried too (with a worse score).
    const score=right+(1-iso);
    [top, o[0], o[1]].forEach((corner, r)=>{
      const tl=t[corner], [p,q]=[0,1,2].filter(z=>z!==corner).map(z=>t[z]);
      const cross=(p.x-tl.x)*(q.y-tl.y)-(p.y-tl.y)*(q.x-tl.x);
      out.push({tl, tr:cross>0?p:q, bl:cross>0?q:p, s:ms, score:score+r});
    });
  }
  return out.sort((x,y)=>x.score-y.score).slice(0,12);
}
// solves for the homography mapping 4 module points to 4 image points
function homography(src, dst){
  const A=[];
  for(let i=0;i<4;i++){
    const [u,v]=src[i], [x,y]=dst[i];
    A.push([u,v,1,0,0,0,-u*x,-v*x,x]);
    A.push([0,0,0,u,v,1,-u*y,-v*y,y]);
  }
  for(let c=0;c<8;c++){
    let piv=c; for(let r=c+1;r<8;r++) if(Math.abs(A[r][c])>Math.abs(A[piv][c])) piv=r;
    if(Math.abs(A[piv][c])<1e-12) return null;
    [A[c],A[piv]]=[A[piv],A[c]];
    for(let r=0;r<8;r++){ if(r===c) continue; const f=A[r][c]/A[c][c]; if(f) for(let k=c;k<9;k++) A[r][k]-=f*A[c][k]; }
  }
  const h=[]; for(let i=0;i<8;i++) h.push(A[i][8]/A[i][i]);
  return (u,v)=>{ const d=h[6]*u+h[7]*v+1; return [(h[0]*u+h[1]*v+h[2])/d, (h[3]*u+h[4]*v+h[5])/d]; };
}
// alignment pattern (dark centre module in a light ring) near (ex, ey)
function findAlign(bin, w, h, ex, ey, ms, R){
  const x0=Math.max(0,Math.floor(ex-R)), x1=Math.min(w-1,Math.ceil(ex+R)), y0=Math.max(0,Math.floor(ey-R)), y1=Math.min(h-1,Math.ceil(ey+R));
  const near=(v)=>Math.abs(v-ms)<ms*0.6;
  let best=null, bd=Infinity;
  for(let y=y0;y<=y1;y++){
    const r=[]; let prev=-1;
    for(let x=x0;x<=x1;x++){ const v=bin[y*w+x]; if(v!==prev){ r.push([v,x,0]); prev=v; } r[r.length-1][2]++; }
    for(let i=1;i+1<r.length;i++){
      if(r[i][0]!==1 || !near(r[i-1][2]) || !near(r[i][2]) || !near(r[i+1][2])) continue;
      if(i-1===0 || i+1===r.length-1) continue;   // the light runs must be closed by the dark ring
      const cx=Math.floor(r[i][1]+r[i][2]/2);
      // vertical: dark centre, light ring above and below, then dark again
      const at=yy=> (yy<0||yy>=h) ? -1 : bin[yy*w+cx];
      let up=y, n=0; while(at(up)===1 && n<=2*ms){ up--; n++; } let l1=0; while(at(up)===0 && l1<=2*ms){ up--; l1++; }
      if(at(up)!==1) continue;
      let dn=y+1; while(at(dn)===1 && n<=3*ms){ dn++; n++; } let l2=0; while(at(dn)===0 && l2<=2*ms){ dn++; l2++; }
      if(at(dn)!==1 || !near(n) || !near(l1) || !near(l2)) continue;
      const cy=(up+l1+1 + dn-l2)/2;
      const ax=r[i][1]+r[i][2]/2, d=(ax-ex)**2+(cy-ey)**2;
      if(d<bd){ bd=d; best=[ax, cy]; }
    }
  }
  return best;
}
function readBits(data, v){
  let pos=0;
  const rd=n=>{ let r=0; for(let i=0;i<n;i++){ const bi=pos++; if(bi>=data.length*8) throw 0; r=r<<1|((data[bi>>>3]>>>(7-(bi&7)))&1); } return r; };
  let out='', bytes=[];
  const flush=()=>{ if(bytes.length){ out+=new TextDecoder('utf-8').decode(new Uint8Array(bytes)); bytes=[]; } };
  try{
    while(pos+4<=data.length*8){
      const mode=rd(4);
      if(mode===0) break;
      if(mode===1){ flush(); let n=rd(v<10?10:v<27?12:14);
        while(n>=3){ out+=String(rd(10)).padStart(3,'0'); n-=3; }
        if(n===2) out+=String(rd(7)).padStart(2,'0'); else if(n===1) out+=String(rd(4)); }
      else if(mode===2){ flush(); let n=rd(v<10?9:v<27?11:13);
        while(n>=2){ const x=rd(11); out+=ALNUM[Math.floor(x/45)]+ALNUM[x%45]; n-=2; }
        if(n===1) out+=ALNUM[rd(6)]; }
      else if(mode===4){ let n=rd(v<10?8:16); while(n-->0) bytes.push(rd(8)); }
      else if(mode===7){ rd(8); }
      else break;
    }
  }catch(e){ return null; }
  flush();
  return out;
}
const VALID_FORMATS=[]; for(let e=0;e<4;e++) for(let m=0;m<8;m++) VALID_FORMATS.push({e, m, bits:formatBits(e,m)});
const pop=x=>{ let c=0; while(x){ c+=x&1; x>>>=1; } return c; };
function decodeGrid(sample, v){
  const n=v*4+17, [fa,fb]=formatPos(n);
  let fv1=0, fv2=0;
  for(let i=0;i<15;i++){ fv1|=sample(fa[i][0],fa[i][1])<<i; fv2|=sample(fb[i][0],fb[i][1])<<i; }
  let fmt=null, fd=99;
  for(const f of VALID_FORMATS){ const d=Math.min(pop(f.bits^fv1), pop(f.bits^fv2)); if(d<fd){ fd=d; fmt=f; } }
  if(fd>3) return null;
  const g=grid(v), order=dataOrder(g), L=layout(v,fmt.e), cw=new Uint8Array(L.raw);
  for(let i=0;i<L.raw*8;i++){
    const idx=order[i], x=idx%n, y=Math.floor(idx/n);
    const bit=sample(x,y) ^ (MASKS[fmt.m](x,y)?1:0);
    if(bit) cw[i>>>3]|=1<<(7-(i&7));
  }
  // de-interleave
  const blocks=[]; for(let j=0;j<L.nb;j++) blocks.push(new Array(L.shortLen+1).fill(0));
  let k=0;
  for(let i=0;i<=L.shortLen;i++) for(let j=0;j<L.nb;j++) if(i!==L.shortLen-L.ecc || j>=L.short) blocks[j][i]=cw[k++];
  const data=[];
  for(let j=0;j<L.nb;j++){
    let b=blocks[j];
    if(j<L.short) b=b.slice(0,L.shortLen-L.ecc).concat(b.slice(L.shortLen-L.ecc+1));
    const u=Uint8Array.from(b);
    if(!rsCorrect(u, L.ecc)) return null;
    for(let i=0;i<u.length-L.ecc;i++) data.push(u[i]);
  }
  return readBits(data, v);
}
function tryTriple(bin, w, h, t, deadline){
  const {tl,tr,bl,s}=t;
  const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  // module size: the finder runs were measured along x and y, which is too long for a rotated code
  const ang=Math.atan2(tr.y-tl.y, tr.x-tl.x), ms0=s*Math.max(Math.abs(Math.cos(ang)), Math.abs(Math.sin(ang)));
  const est=(dist(tl,tr)+dist(tl,bl))/2/ms0+7;
  const dims=[];
  for(let v=1;v<=MAXV;v++){ const n=v*4+17; if(Math.abs(n-est)<=9) dims.push(n); }
  dims.sort((a,b)=>Math.abs(a-est)-Math.abs(b-est));
  for(const n of dims){
    const v=(n-17)/4;
    const src=[[3.5,3.5],[n-3.5,3.5],[3.5,n-3.5]], dst=[[tl.x,tl.y],[tr.x,tr.y],[bl.x,bl.y]];
    const brx=tr.x+bl.x-tl.x, bry=tr.y+bl.y-tl.y;
    let fourth=null;
    if(v>=2){
      const ms=(dist(tl,tr)+dist(tl,bl))/2/(n-7), c=1-3/(n-7);
      const ex=tl.x+c*(brx-tl.x), ey=tl.y+c*(bry-tl.y);
      const msAxis=ms/Math.max(Math.abs(Math.cos(ang)), Math.abs(Math.sin(ang)));   // runs along x / y
      for(const R of [4,8,14]){ fourth=findAlign(bin,w,h,ex,ey,msAxis,R*ms); if(fourth) break; }
    }
    const tries=[];
    if(fourth) tries.push([[n-6.5,n-6.5], fourth]);
    tries.push([[n-3.5,n-3.5],[brx,bry]]);
    const attempt=(ms4, ix4, iy4)=>{
      const H=homography(src.concat([ms4]), dst.concat([[ix4,iy4]])); if(!H) return null;
      const sample=(x,y)=>{ const [px,py]=H(x+0.5,y+0.5), ix=Math.floor(px), iy=Math.floor(py); return (ix<0||iy<0||ix>=w||iy>=h) ? 0 : bin[iy*w+ix]; };
      return decodeGrid(sample, v);
    };
    for(const [ms4, img4] of tries){ const r=attempt(ms4, img4[0], img4[1]); if(r!=null) return r; }
    // strong perspective: the 4th point is only an estimate, so try it shifted by up to 2 modules
    const ms=(dist(tl,tr)+dist(tl,bl))/2/(n-7);
    for(const [ms4, img4] of tries){
      for(let rr=1; rr<=4; rr++) for(let dy=-rr; dy<=rr; dy++) for(let dx=-rr; dx<=rr; dx++){
        if(Math.max(Math.abs(dx),Math.abs(dy))!==rr) continue;
        if(Date.now()>deadline) return null;
        const r=attempt(ms4, img4[0]+dx*ms/2, img4[1]+dy*ms/2); if(r!=null) return r;
      }
    }
  }
  return null;
}
// img: ImageData-like {data (RGBA), width, height}; returns the text or null.
// budget: milliseconds to spend at most on hard (strongly skewed) images; the camera gives another frame soon.
function decode(img, budget){
  const w=img.width, h=img.height, d=img.data, lum=new Uint8Array(w*h);
  for(let i=0,j=0;i<lum.length;i++,j+=4) lum[i]=(d[j]*77+d[j+1]*150+d[j+2]*29)>>8;
  const bin=binarize(lum,w,h);
  const deadline=Date.now()+(budget||80);
  for(const t of pickTriples(findFinders(bin,w,h))){ if(Date.now()>deadline) break; const r=tryTriple(bin,w,h,t,deadline); if(r!=null) return r; }
  return null;
}

window.MemoQR={encode, svg, decode};
})();
