(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();function V(t,s){const i={};for(const n of s)t[n.id]!=null&&(i[n.dim]=(i[n.dim]||0)+t[n.id]);return i}function N(t,s){const i={};for(const[n,e]of Object.entries(t))e<=s.L[1]?i[n]="L":e>=s.H[0]?i[n]="H":i[n]="M";return i}const H={L:1,M:2,H:3};function Z(t){return t.replace(/-/g,"").split("")}function D(t,s,i){const n=Z(i);let e=0,o=0;for(let g=0;g<s.length;g++){const d=H[t[s[g]]]||2,l=H[n[g]]||2,u=Math.abs(d-l);e+=u,u===0&&o++}const c=Math.max(0,Math.round((1-e/30)*100));return{distance:e,exact:o,similarity:c}}function Y(t,s,i,n,e={}){const o=i.map(l=>({...l,...D(t,s,l.pattern)}));o.sort((l,u)=>l.distance-u.distance||u.exact-l.exact||u.similarity-l.similarity);const c=o[0],g=n.find(l=>l.code==="SMOKER"),d=n.find(l=>l.code==="BALANCED");return e.isSmoker&&g?{primary:{...g,similarity:c.similarity,exact:c.exact},secondary:c,rankings:o,mode:"smoker"}:c.similarity<60&&d?{primary:{...d,similarity:c.similarity,exact:c.exact},secondary:c,rankings:o,mode:"balanced"}:{primary:c,secondary:o[1]||null,rankings:o,mode:"normal"}}function O(t){const s=[...t];for(let i=s.length-1;i>0;i--){const n=Math.floor(Math.random()*(i+1));[s[i],s[n]]=[s[n],s[i]]}return s}function j(t,s){const i=[...t],n=Math.floor(Math.random()*(i.length+1));return i.splice(n,0,s),i}function K(t,s,i){const n=[...t],e=n.findIndex(o=>o.id===s);return e>=0&&n.splice(e+1,0,i),n}function q(t,s,i){const n=O(t.main),e=t.special.find(r=>r.id===s.smokeGate.questionId),o=t.special.find(r=>r.id==="smoke_gate_q2");let c=j(n,e),g=0,d={},l=!1;const u={fill:document.getElementById("progress-fill"),text:document.getElementById("progress-text"),qText:document.getElementById("question-text"),options:document.getElementById("options")};function m(){return c.length}function a(){const r=g/m()*100;u.fill.style.width=r+"%",u.text.textContent=`${g} / ${m()}`}function y(){const r=c[g];u.qText.textContent=r.text,u.options.innerHTML="",r.options.forEach(h=>{const p=document.createElement("button");p.className="btn btn-option",p.textContent=h.label,p.addEventListener("click",()=>f(r,h)),u.options.appendChild(p)}),a()}function f(r,h){d[r.id]=h.value,r.id===s.smokeGate.questionId&&h.value===s.smokeGate.triggerValue&&(c=K(c,r.id,o)),r.id==="smoke_gate_q2"&&h.value===s.smokeGate.smokerTriggerValue&&(l=!0),g++,g>=m()?i(d,l):y()}function I(){g=0,d={},l=!1,c=j(O(t.main),e),y()}return{start:I,renderQuestion:y}}const F={L:1,M:2,H:3};function G(t,s,i,n){var f,I;const e=t.getContext("2d"),o=window.devicePixelRatio||1,c=320;t.width=c*o,t.height=c*o,t.style.width=c+"px",t.style.height=c+"px",e.scale(o,o);const g=c/2,d=c/2,l=c/2-40,u=i.length,m=Math.PI*2/u,a=-Math.PI/2;e.clearRect(0,0,c,c);for(let r=3;r>=1;r--){const h=r/3*l;e.beginPath(),e.arc(g,d,h,0,Math.PI*2),e.fillStyle=r===3?"rgba(76, 103, 82, 0.08)":r===2?"rgba(76, 103, 82, 0.05)":"rgba(76, 103, 82, 0.03)",e.fill(),e.strokeStyle="rgba(76, 103, 82, 0.15)",e.lineWidth=.5,e.stroke()}e.font="10px system-ui, sans-serif",e.textAlign="center",e.textBaseline="middle";for(let r=0;r<u;r++){const h=a+r*m,p=g+Math.cos(h)*l,x=d+Math.sin(h)*l;e.beginPath(),e.moveTo(g,d),e.lineTo(p,x),e.strokeStyle="rgba(76, 103, 82, 0.12)",e.lineWidth=.5,e.stroke();const C=l+22,M=g+Math.cos(h)*C,k=d+Math.sin(h)*C,w=i[r],S=((I=(f=n[w])==null?void 0:f.name)==null?void 0:I.replace(/^[A-Za-z0-9]+\s*/,""))||w;e.fillStyle="#6b7b6e",e.fillText(S,M,k)}const y=i.map(r=>F[s[r]]||2);e.beginPath();for(let r=0;r<u;r++){const h=a+r*m,p=y[r]/3*l,x=g+Math.cos(h)*p,C=d+Math.sin(h)*p;r===0?e.moveTo(x,C):e.lineTo(x,C)}e.closePath(),e.fillStyle="rgba(76, 103, 82, 0.25)",e.fill(),e.strokeStyle="rgba(76, 103, 82, 0.7)",e.lineWidth=2,e.stroke();for(let r=0;r<u;r++){const h=a+r*m,p=y[r]/3*l,x=g+Math.cos(h)*p,C=d+Math.sin(h)*p;e.beginPath(),e.arc(x,C,3,0,Math.PI*2),e.fillStyle="#4c6752",e.fill()}}const z={L:1,M:2,H:3},X={L:"低",M:"中",H:"高"};async function U(t,s,i,n,e){const d=document.createElement("canvas");d.width=720*2,d.height=1280*2;const l=d.getContext("2d");l.scale(2,2),l.fillStyle="#f0f4f1",l.fillRect(0,0,720,1280);const u=32,m=32,a=656;b(l,u,m,a,1216,20),l.fillStyle="#ffffff",l.fill(),l.shadowColor="transparent";let f=m+48;l.textAlign="center",l.font='400 22px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillStyle="#6b7b6e";const I=e==="smoker"?"隐藏画像已激活":e==="balanced"?"系统强制兜底":"你的主类型";l.fillText(I,720/2,f),f+=56,l.font='900 72px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillStyle="#4c6752",l.fillText(t.code,720/2,f),f+=40,l.font='600 32px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillStyle="#2c3e2d",l.fillText(t.cn,720/2,f),f+=36;const r=`匹配度 ${t.similarity}%`+(t.exact!=null?` · 精准命中 ${t.exact}/15 维`:"");l.font='500 20px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif';const h=l.measureText(r).width+40;b(l,(720-h)/2,f-16,h,36,18),l.fillStyle="#e8f0ea",l.fill(),l.fillStyle="#4c6752",l.fillText(r,720/2,f+6),f+=44,l.font='italic 600 22px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillStyle="#2c3e2d";const p=_(l,t.intro||"",a-80);for(const v of p)l.fillText(v,720/2,f),f+=30;f+=16;const x=720/2,C=f+150,M=130;J(l,x,C,M,s,i,n),f=C+M+40,f+=10,l.textAlign="left";const k=u+48,w=a-96,S=110;for(const v of i){const L=s[v]||"M",A=z[L],T=n[v];if(!T)continue;const R=T.name.replace(/^[A-Za-z0-9]+\s*/,"");l.font='600 16px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillStyle="#2c3e2d",l.fillText(R,k,f);const W=k+S,B=w-S-50,P=12;b(l,W,f-10,B,P,6),l.fillStyle="#e8f0ea",l.fill();const Q=A/3*B;b(l,W,f-10,Q,P,6),l.fillStyle=A===3?"#2d7a4a":A===2?"#4c6752":"#b8860b",l.fill(),l.textAlign="right",l.font='600 14px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillStyle=A===3?"#2d7a4a":A===2?"#4c6752":"#b8860b",l.fillText(X[L],k+w,f),l.textAlign="left",f+=26}f+=16,l.textAlign="center",l.font='400 18px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',l.fillStyle="#aab8ac",l.fillText("SBTI 人格测试 · 仅供娱乐",720/2,1280-m-24);const E=document.createElement("a");E.download=`SBTI-${t.code}.png`,E.href=d.toDataURL("image/png"),E.click()}function J(t,s,i,n,e,o,c){var m;const g=o.length,d=Math.PI*2/g,l=-Math.PI/2;for(let a=3;a>=1;a--){const y=a/3*n;t.beginPath(),t.arc(s,i,y,0,Math.PI*2),t.fillStyle=a===3?"rgba(76,103,82,0.06)":a===2?"rgba(76,103,82,0.04)":"rgba(76,103,82,0.02)",t.fill(),t.strokeStyle="rgba(76,103,82,0.12)",t.lineWidth=.5,t.stroke()}t.font='400 12px system-ui, "PingFang SC", "Microsoft YaHei", sans-serif',t.textAlign="center",t.textBaseline="middle";for(let a=0;a<g;a++){const y=l+a*d,f=s+Math.cos(y)*n,I=i+Math.sin(y)*n;t.beginPath(),t.moveTo(s,i),t.lineTo(f,I),t.strokeStyle="rgba(76,103,82,0.1)",t.lineWidth=.5,t.stroke();const r=n+24,h=s+Math.cos(y)*r,p=i+Math.sin(y)*r,x=(((m=c[o[a]])==null?void 0:m.name)||o[a]).replace(/^[A-Za-z0-9]+\s*/,"");t.fillStyle="#6b7b6e",t.fillText(x,h,p)}const u=o.map(a=>z[e[a]]||2);t.beginPath();for(let a=0;a<g;a++){const y=l+a*d,f=u[a]/3*n,I=s+Math.cos(y)*f,r=i+Math.sin(y)*f;a===0?t.moveTo(I,r):t.lineTo(I,r)}t.closePath(),t.fillStyle="rgba(76,103,82,0.2)",t.fill(),t.strokeStyle="rgba(76,103,82,0.6)",t.lineWidth=2,t.stroke();for(let a=0;a<g;a++){const y=l+a*d,f=u[a]/3*n,I=s+Math.cos(y)*f,r=i+Math.sin(y)*f;t.beginPath(),t.arc(I,r,3,0,Math.PI*2),t.fillStyle="#4c6752",t.fill()}}function b(t,s,i,n,e,o){t.beginPath(),t.moveTo(s+o,i),t.lineTo(s+n-o,i),t.quadraticCurveTo(s+n,i,s+n,i+o),t.lineTo(s+n,i+e-o),t.quadraticCurveTo(s+n,i+e,s+n-o,i+e),t.lineTo(s+o,i+e),t.quadraticCurveTo(s,i+e,s,i+e-o),t.lineTo(s,i+o),t.quadraticCurveTo(s,i,s+o,i),t.closePath()}function _(t,s,i){if(!s)return[];const n=[];let e="";for(const o of s){const c=e+o;t.measureText(c).width>i&&e?(n.push(e),e=o):e=c}return e&&n.push(e),n}const ee={L:"低",M:"中",H:"高"},te={L:"level-low",M:"level-mid",H:"level-high"};function le(t,s,i,n,e){const{primary:o,secondary:c,rankings:g,mode:d}=t,l=document.getElementById("result-kicker");d==="smoker"?l.textContent="隐藏画像已激活":d==="balanced"?l.textContent="系统强制兜底":l.textContent="你的主类型",document.getElementById("result-code").textContent=o.code,document.getElementById("result-name").textContent=o.cn,document.getElementById("result-badge").textContent=`匹配度 ${o.similarity}%`+(o.exact!=null?` · 精准命中 ${o.exact}/15 维`:""),document.getElementById("char-type-name").textContent=o.cn,document.getElementById("char-type-code").textContent=o.code,document.getElementById("char-tagline").textContent=o.intro||"",document.getElementById("char-illus").innerHTML=ie(o.code),document.getElementById("result-intro").textContent=o.intro||"",document.getElementById("result-desc").textContent=o.desc||"";const u=document.getElementById("result-secondary");c&&(d==="smoker"||d==="balanced")?(u.style.display="",document.getElementById("secondary-info").textContent=`${c.code}（${c.cn}）· 匹配度 ${c.similarity}%`):u.style.display="none";const m=document.getElementById("radar-chart");G(m,s,i,n);const a=document.getElementById("dimensions-detail");a.innerHTML="";for(const h of i){const p=s[h]||"M",x=n[h];if(!x)continue;const C=document.createElement("div");C.className="dim-row",C.innerHTML=`
      <div class="dim-header">
        <span class="dim-name">${x.name}</span>
        <span class="dim-level ${te[p]}">${ee[p]}</span>
      </div>
      <div class="dim-desc">${x.levels[p]}</div>
    `,a.appendChild(C)}const y=document.getElementById("top-list");y.innerHTML="",g.slice(0,5).forEach((h,p)=>{const x=document.createElement("div");x.className="top-item",x.innerHTML=`
      <span class="top-rank">#${p+1}</span>
      <span class="top-code">${h.code}</span>
      <span class="top-name">${h.cn}</span>
      <span class="top-sim">${h.similarity}%</span>
    `,y.appendChild(x)}),document.getElementById("disclaimer").textContent=d==="normal"?e.display.funNote:e.display.funNoteSpecial;const I=document.getElementById("btn-download");I.onclick=()=>{U(o,s,i,n,d)};const r=document.getElementById("btn-agent");r.onclick=()=>{navigator.clipboard.writeText("git clone https://github.com/pingfanfan/SBTI.git && cd SBTI && npm install && npm run dev").then(()=>{r.textContent="已复制!",setTimeout(()=>{r.textContent="复制一键部署命令"},2e3)})}}function ie(t){const s=(t||"").toUpperCase(),i="#5a7a5c",n="#f5cba7",e="#3d5443",o="#8aac8c",c="#c8deca";return["ANX","STRESS","OVERTHINK","WIKI-R","OBSESS","PANIC-B"].includes(s)?`<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="115" rx="26" ry="28" fill="${i}"/>
      <rect x="54" y="76" width="13" height="14" rx="4" fill="${n}"/>
      <ellipse cx="60" cy="67" rx="19" ry="20" fill="${n}"/>
      <ellipse cx="60" cy="51" rx="19" ry="12" fill="${e}"/>
      <ellipse cx="44" cy="61" rx="7" ry="9" fill="${e}"/>
      <ellipse cx="76" cy="61" rx="7" ry="9" fill="${e}"/>
      <ellipse cx="52" cy="66" rx="4.5" ry="5" fill="white"/>
      <ellipse cx="68" cy="66" rx="4.5" ry="5" fill="white"/>
      <circle cx="52" cy="67" r="2.5" fill="#333"/>
      <circle cx="68" cy="67" r="2.5" fill="#333"/>
      <circle cx="53.2" cy="65.5" r="1" fill="white"/>
      <circle cx="69.2" cy="65.5" r="1" fill="white"/>
      <path d="M46 60 Q52 56 58 60" stroke="${e}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M62 60 Q68 56 74 60" stroke="${e}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M53 78 Q60 74 67 78" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="78" cy="57" rx="3" ry="4.5" fill="#b0d4ea"/>
      <path d="M34 100 Q24 86 27 76" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="27" cy="74" rx="6" ry="6" fill="${n}"/>
      <path d="M86 100 Q96 86 93 76" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="93" cy="74" rx="6" ry="6" fill="${n}"/>
      <rect x="44" y="140" width="12" height="10" rx="3" fill="${e}"/>
      <rect x="64" y="140" width="12" height="10" rx="3" fill="${e}"/>
      <circle cx="96" cy="42" r="2.5" fill="${o}" opacity="0.7"/>
      <circle cx="103" cy="33" r="4" fill="${o}" opacity="0.55"/>
      <circle cx="111" cy="22" r="7" fill="${o}" opacity="0.45"/>
      <text x="108" y="26" font-size="8" fill="${e}" text-anchor="middle" font-family="sans-serif">?!</text>
    </svg>`:["SED","SLOTH","ZOMBIE","DEAD","WRECK","JOKER","MEH"].includes(s)?`<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="118" width="100" height="12" rx="6" fill="${c}"/>
      <rect x="18" y="92" width="84" height="32" rx="10" fill="${i}"/>
      <rect x="26" y="76" width="12" height="18" rx="4" fill="${n}"/>
      <rect x="82" y="76" width="12" height="18" rx="4" fill="${n}"/>
      <rect x="54" y="72" width="12" height="14" rx="4" fill="${n}"/>
      <ellipse cx="60" cy="62" rx="19" ry="20" fill="${n}"/>
      <ellipse cx="60" cy="46" rx="19" ry="12" fill="${e}"/>
      <ellipse cx="52" cy="61" rx="4" ry="4.5" fill="white"/>
      <ellipse cx="68" cy="61" rx="4" ry="4.5" fill="white"/>
      <circle cx="52" cy="62.5" r="2.2" fill="#333"/>
      <circle cx="68" cy="62.5" r="2.2" fill="#333"/>
      <path d="M52 70 Q60 74 68 70" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M48 56 Q52 59 56 56" stroke="${e}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M64 56 Q68 59 72 56" stroke="${e}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <rect x="44" y="128" width="14" height="16" rx="4" fill="${e}"/>
      <rect x="62" y="128" width="14" height="16" rx="4" fill="${e}"/>
      <text x="90" y="50" font-size="18" text-anchor="middle" font-family="sans-serif" fill="${o}" opacity="0.7">z</text>
      <text x="100" y="38" font-size="14" text-anchor="middle" font-family="sans-serif" fill="${o}" opacity="0.55">z</text>
      <text x="108" y="26" font-size="10" text-anchor="middle" font-family="sans-serif" fill="${o}" opacity="0.4">z</text>
    </svg>`:["GRIND","H3","STRESS","TRUST-D","COPY-P"].includes(s)?`<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="115" rx="26" ry="28" fill="${i}"/>
      <rect x="54" y="76" width="13" height="14" rx="4" fill="${n}"/>
      <rect x="56" y="82" width="8" height="20" rx="2" fill="${e}"/>
      <ellipse cx="60" cy="67" rx="19" ry="20" fill="${n}"/>
      <ellipse cx="60" cy="51" rx="19" ry="12" fill="${e}"/>
      <ellipse cx="52" cy="66" rx="4.5" ry="5" fill="white"/>
      <ellipse cx="68" cy="66" rx="4.5" ry="5" fill="white"/>
      <circle cx="52" cy="67" r="2.5" fill="#333"/>
      <circle cx="68" cy="67" r="2.5" fill="#333"/>
      <path d="M54 75 Q60 77 66 75" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M34 102 Q30 115 32 128" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="32" cy="130" rx="6" ry="6" fill="${n}"/>
      <path d="M86 102 Q96 112 92 126" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <rect x="88" y="118" width="20" height="14" rx="4" fill="${e}"/>
      <rect x="91" y="114" width="6" height="6" rx="2" fill="${e}"/>
      <rect x="103" y="114" width="6" height="6" rx="2" fill="${e}"/>
      <rect x="44" y="140" width="12" height="10" rx="3" fill="${e}"/>
      <rect x="64" y="140" width="12" height="10" rx="3" fill="${e}"/>
    </svg>`:["RATIO","DR.PRO","DATA-D","CLUELESS","BAL-S"].includes(s)?`<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="55" cy="108" rx="22" ry="26" fill="${i}"/>
      <rect x="49" y="72" width="12" height="14" rx="4" fill="${n}"/>
      <ellipse cx="55" cy="63" rx="18" ry="19" fill="${n}"/>
      <ellipse cx="55" cy="48" rx="18" ry="11" fill="${e}"/>
      <ellipse cx="47" cy="62" rx="4" ry="4.5" fill="white"/>
      <ellipse cx="63" cy="62" rx="4" ry="4.5" fill="white"/>
      <circle cx="47" cy="63" r="2.2" fill="#333"/>
      <circle cx="63" cy="63" r="2.2" fill="#333"/>
      <path d="M49 72 Q55 76 61 72" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M33 90 Q20 78 24 66" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="24" cy="64" rx="6" ry="6" fill="${n}"/>
      <path d="M77 90 Q88 80 84 68" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <ellipse cx="84" cy="66" rx="6" ry="6" fill="${n}"/>
      <path d="M43 132 Q36 144 28 148" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M67 132 Q76 140 80 150" stroke="${e}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <circle cx="88" cy="42" r="6" fill="#f5e642" opacity="0.8"/>
      <path d="M85 42 L91 42 M88 39 L88 45 M86 40 L90 44 M90 40 L86 44" stroke="#e8a82a" stroke-width="1" stroke-linecap="round"/>
    </svg>`:`<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="115" rx="26" ry="28" fill="${i}"/>
    <rect x="54" y="76" width="13" height="14" rx="4" fill="${n}"/>
    <ellipse cx="60" cy="67" rx="19" ry="20" fill="${n}"/>
    <ellipse cx="60" cy="51" rx="19" ry="12" fill="${e}"/>
    <ellipse cx="52" cy="66" rx="4.5" ry="5" fill="white"/>
    <ellipse cx="68" cy="66" rx="4.5" ry="5" fill="white"/>
    <circle cx="52" cy="67" r="2.5" fill="#333"/>
    <circle cx="68" cy="67" r="2.5" fill="#333"/>
    <circle cx="53.2" cy="65.5" r="1" fill="white"/>
    <circle cx="69.2" cy="65.5" r="1" fill="white"/>
    <path d="M54 75 Q60 77 66 75" stroke="#c0896b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M34 100 Q28 114 30 130" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
    <ellipse cx="30" cy="131" rx="6" ry="6" fill="${n}"/>
    <path d="M86 100 Q92 114 90 130" stroke="${i}" stroke-width="10" stroke-linecap="round" fill="none"/>
    <ellipse cx="90" cy="131" rx="6" ry="6" fill="${n}"/>
    <rect x="44" y="140" width="12" height="10" rx="3" fill="${e}"/>
    <rect x="64" y="140" width="12" height="10" rx="3" fill="${e}"/>
  </svg>`}async function $(t){return(await fetch(t)).json()}async function ne(){const[t,s,i,n]=await Promise.all([$(new URL("/SBTI/assets/questions-DkWDMz-v.json",import.meta.url).href),$(new URL("/SBTI/assets/dimensions-DQ9sMkDw.json",import.meta.url).href),$(new URL("/SBTI/assets/types-D-LZ8fV2.json",import.meta.url).href),$(new URL("data:application/json;base64,ewogICJzY29yaW5nIjogewogICAgImxldmVsVGhyZXNob2xkcyI6IHsKICAgICAgIkwiOiBbCiAgICAgICAgMiwKICAgICAgICAzCiAgICAgIF0sCiAgICAgICJNIjogWwogICAgICAgIDQsCiAgICAgICAgNAogICAgICBdLAogICAgICAiSCI6IFsKICAgICAgICA1LAogICAgICAgIDYKICAgICAgXQogICAgfSwKICAgICJsZXZlbE51bWVyaWMiOiB7CiAgICAgICJMIjogMSwKICAgICAgIk0iOiAyLAogICAgICAiSCI6IDMKICAgIH0sCiAgICAibWF4RGlzdGFuY2UiOiAzMCwKICAgICJmYWxsYmFja1RocmVzaG9sZCI6IDYwCiAgfSwKICAiZGlzcGxheSI6IHsKICAgICJ0aXRsZSI6ICLlgaXlurfpo47pmannlLvlg4/or4TkvLAiLAogICAgInN1YnRpdGxlIjogIuS9oOeahOi6q+S9k++8jOato+WcqOaChOaChOWRiuivieS9oOS4gOS6m+S6i+OAgiIsCiAgICAiYXV0aG9yIjogIuWBpeW6t+enkeaZrumhtemdoumFjeWll+a1i+ivlSIsCiAgICAiZnVuTm90ZSI6ICLmnKzmtYvor5Xku4XkvpvlgaXlurfmlZnogrLlj4LogIPvvIzkuI3mnoTmiJDljLvnlpflu7rorq7jgILmtYvlh7rkuInpq5jpooTlpIflhpvkuZ/or7fkuI3opoHlj6rmmK/miKrlm77lj5HmnIvlj4vlnIjvvIzopoHljrvkvZPmo4DjgIIiLAogICAgImZ1bk5vdGVTcGVjaWFsIjogIuacrOa1i+ivleS7heS+m+WBpeW6t+aVmeiCsuWPguiAg+OAgumakOiXj+eUu+WDj+iAgeeDn+aequWSjOWdh+ihoeWFnOW6leWdh+Wxnuezu+e7n+eJueauiuacuuWItu+8jOivt+WLv+Wwhue7k+aenOS9nOS4uuWMu+eWl+iviuaWreS+neaNruOAgiIKICB9LAogICJzbW9rZUdhdGUiOiB7CiAgICAicXVlc3Rpb25JZCI6ICJzbW9rZV9nYXRlX3ExIiwKICAgICJ0cmlnZ2VyVmFsdWUiOiAzLAogICAgInNtb2tlclRyaWdnZXJWYWx1ZSI6IDIKICB9Cn0=",import.meta.url).href)]),e={intro:document.getElementById("page-intro"),quiz:document.getElementById("page-quiz"),result:document.getElementById("page-result")};function o(d){Object.values(e).forEach(l=>l.classList.remove("active")),e[d].classList.add("active"),window.scrollTo(0,0)}function c(d,l){const u=V(d,t.main),m=N(u,n.scoring.levelThresholds),a=Y(m,s.order,i.standard,i.special,{isSmoker:l});le(a,m,s.order,s.definitions,n),o("result")}const g=q(t,n,c);document.getElementById("btn-start").addEventListener("click",()=>{g.start(),o("quiz")}),document.getElementById("btn-restart").addEventListener("click",()=>{g.start(),o("quiz")})}ne();
