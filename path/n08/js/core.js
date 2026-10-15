/* GT Intermedio 2 · shared session engine · v1.0 */
window.GT=(function(){
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const st={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
const SPK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>';
const mk=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
const shuf=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};

/* ---- speech: mp3 first, browser voice as visible fallback ---- */
const TTS='speechSynthesis' in window; let voices=[];
function loadV(){try{voices=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang))}catch(e){}}
if(TTS){loadV();try{speechSynthesis.onvoiceschanged=loadV}catch(e){}}
function pick(pref){return voices.find(v=>pref.test(v.name+' '+v.lang))||voices[0]}
function say(t,opt){opt=opt||{};if(!TTS)return false;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang=opt.lang||'en-US';u.rate=opt.rate||.86;const v=opt.voice||pick(/US|United States/i);if(v)u.voice=v;if(opt.onend)u.onend=opt.onend;speechSynthesis.speak(u);return true}catch(e){return false}}
function note(msg,warn){$$('.anote').forEach(n=>{n.hidden=false;n.textContent=msg;n.classList.toggle('warn',!!warn)})}
let cur=null;
function clip(file,text,opt,cb){
 try{if(cur){cur.pause();cur=null}}catch(e){}
 let used=false;
 const fb=()=>{if(used)return;used=true;
   if(say(text,Object.assign({},opt||{},{onend:cb})))note('Audio no disponible: se usa la voz del navegador. (Audio file pending)',true);
   else{note('Audio no disponible: lee el texto en voz alta.',true);if(cb)setTimeout(cb,600)}};
 try{const a=new Audio('audio/'+file);a.playbackRate=(opt&&opt.slow)?0.82:1;cur=a;
   a.addEventListener('error',fb);a.addEventListener('ended',()=>{if(cb)cb()});
   const p=a.play();if(p&&p.catch)p.catch(fb)}catch(e){fb()}}

/* ---- XP / nav / clock / timers ---- */
let xp=0;const done=new Set();let links=[],secs=[];
function addXP(n,key){if(key){if(done.has(key))return;done.add(key)}xp+=n;const e=$('#xp');if(e)e.textContent=xp+' XP'}
function markDone(i){links[i]&&links[i].classList.add('done')}
function timer(el,onEnd){if(!el)return null;const tot=+el.dataset.sec;let left=tot,id=null;
 const o=el.querySelector('output'),g=el.querySelector('[data-a=go]');
 const draw=()=>{o.textContent=fmt(left);el.classList.toggle('end',left===0)};
 const stop=()=>{clearInterval(id);id=null;g.textContent='Start'};
 g.onclick=()=>{if(id){stop();return}if(!left)left=tot;g.textContent='Pause';id=setInterval(()=>{left--;draw();if(left<=0){stop();onEnd&&onEnd()}},1000)};
 const r=el.querySelector('[data-a=re]');if(r)r.onclick=()=>{stop();left=tot;draw()};
 draw();return{reset(){stop();left=tot;draw()},stop}}

function hearBtn(label,fn,txt){const b=mk('button','hearbtn',SPK+'<span>'+(txt||'hear')+'</span>');
 b.setAttribute('aria-label','Hear: '+label);b.onclick=e=>{e.stopPropagation();fn()};return b}
function tickBtn(label,fn){const b=mk('button','k-tick','<i></i><span>'+label+'</span>');
 b.setAttribute('aria-pressed','false');
 b.onclick=()=>{const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);fn&&fn(on,b)};return b}

/* ---- "decide and say it": pick the right full sentence, no gaps ---- */
function decide(box,items,onScore){let first=0,n=0;
 items.forEach((it,i)=>{
  const d=mk('div','mcq');
  d.innerHTML='<div class="q"><span class="n">'+(i+1)+'</span>'+it.q+'</div><div class="opts"></div><div class="fb" aria-live="polite"></div>';
  const fb=d.querySelector('.fb');let lock=false,miss=false;
  const order=it.keep?it.o.map((t,k)=>[t,k]):shuf(it.o.map((t,k)=>[t,k]));
  order.forEach(([t,k])=>{const b=mk('button','opt',t);
   b.onclick=()=>{if(lock)return;
    if(k===it.a){b.classList.add('ok');lock=true;n++;if(!miss)first++;
      fb.className='fb ok';fb.textContent='✓ '+(it.ok||'Now say it out loud.');
      addXP(6,'dec'+box.id+i);onScore&&onScore(first,n,items.length)}
    else{b.classList.add('no');miss=true;fb.className='fb no';fb.textContent='✗ '+(it.no||'Try the other one.')}};
   d.querySelector('.opts').appendChild(b)});
  box.appendChild(d)})}

/* ---- "repair it before you send it" ---- */
function repair(box,items,onFix){let n=0;
 items.forEach(([bad,good],i)=>{const d=mk('div','k-fix','<div class="t">'+bad+'</div>');
  const b=mk('button','btn main','I said the correct version');const m=mk('div','ok','');m.hidden=true;
  b.onclick=()=>{if(d.classList.contains('fixed'))return;d.classList.add('fixed');b.hidden=true;m.hidden=false;
   m.textContent='✓ '+good;n++;addXP(4,'rep'+box.id+i);onFix&&onFix(n)};
  d.appendChild(b);d.appendChild(m);box.appendChild(d)})}

/* ---- speaking deck: cards + follow-ups ---- */
function deck(box,cards,onSpoke){let i=0,spoken=0;
 const im=mk('div','im'),dq=mk('div','dq');box.className='k-deck';box.appendChild(im);box.appendChild(dq);
 const dots=mk('div','k-dots');
 const draw=()=>{const c=cards[i];
  im.style.backgroundImage='url('+c.img+')';
  dq.innerHTML='<div class="qn">CARD '+(i+1)+' OF '+cards.length+' · '+c.tag+'</div><div class="qt">'+c.q+'</div><div class="fu">'+c.fu.map(f=>'<span>'+f+'</span>').join('')+'</div>';
  const row=mk('div','row');
  const prev=mk('button','btn','← Back'),next=mk('button','btn','Next →');
  prev.onclick=()=>{i=(i-1+cards.length)%cards.length;draw()};
  next.onclick=()=>{i=(i+1)%cards.length;draw()};
  const t=tickBtn('I answered this card out loud',on=>{spoken+=on?1:-1;onSpoke&&onSpoke(spoken,cards.length);if(on)addXP(6,'spk'+box.id+i)});
  t.style.maxWidth='340px';
  row.appendChild(prev);row.appendChild(next);row.appendChild(dots);
  dq.appendChild(row);dq.appendChild(t);
  dots.innerHTML='';cards.forEach((_,k)=>{const b=mk('button');b.setAttribute('aria-current',k===i);b.setAttribute('aria-label','Card '+(k+1));b.onclick=()=>{i=k;draw()};dots.appendChild(b)})};
 draw()}

function init(opts){
 secs=$$('.sec');const steps=$('#steps');
 secs.forEach((s,i)=>{const a=mk('a');a.href='#'+s.id;a.innerHTML='<b>'+(i+1)+'</b>'+s.dataset.name;
  a.style.setProperty('--c',getComputedStyle(s).getPropertyValue('--c'));steps.appendChild(a)});
 links=[...steps.children];
 const onScroll=()=>{let c=0;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<200)c=i});
  links.forEach((a,i)=>a.classList.toggle('on',i===c));
  $('#pbar').style.width=((c+1)/secs.length*100)+'%';
  const on=links[c];if(on&&steps.scrollWidth>steps.clientWidth)steps.scrollLeft=on.offsetLeft-40};
 addEventListener('scroll',onScroll,{passive:true});onScroll();
 /* time table */
 let tot=0,rows='';secs.forEach((s,i)=>{const d=+s.dataset.dur;tot+=d;
  rows+='<tr><td>'+(i+1)+'</td><td>'+s.dataset.name+'</td><td>'+s.dataset.min+'</td><td>'+d+' min</td></tr>'});
 const tt=$('#timeTable');
 if(tt)tt.innerHTML='<table><tr><th>#</th><th>Etapa</th><th>Minutos</th><th>Duración</th></tr>'+rows+
   '</table><p class="tot" id="timeTot" data-total="'+tot+'">Total: '+tot+' min '+(tot===60?'✓':'✗ (deben ser 60)')+'</p>';
 /* views */
 const setView=s=>{document.body.classList.toggle('student',s);$('#tgStudent').setAttribute('aria-pressed',s);$('#tgTeacher').setAttribute('aria-pressed',!s)};
 $('#tgStudent').onclick=()=>setView(true);$('#tgTeacher').onclick=()=>setView(false);
 const setMode=m=>{$$('[data-m]').forEach(e=>e.hidden=e.dataset.m!==m);
  $('#tgGroup').setAttribute('aria-pressed',m==='group');$('#tgOne').setAttribute('aria-pressed',m==='one');st.set('gt-i2-mode',m)};
 $('#tgGroup').onclick=()=>setMode('group');$('#tgOne').onclick=()=>setMode('one');setMode(st.get('gt-i2-mode')||'group');
 /* class clock */
 let cs=0,cId=null;const ck=$('#clock');
 ck.onclick=()=>{if(cId){clearInterval(cId);cId=null}else cId=setInterval(()=>{cs++;ck.textContent=fmt(cs)},1000)};
 return {secs:secs.length,total:tot}}

return {$,$$,mk,shuf,st,fmt,clip,say,note,addXP,markDone,timer,hearBtn,tickBtn,decide,repair,deck,init,SPK};
})();
