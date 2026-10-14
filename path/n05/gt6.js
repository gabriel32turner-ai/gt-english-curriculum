/* GT English Path · Elemental 2 · engine v7 — route 7/8/8/9/7/15/6 (program 40). One marker: sentences said. */
(function(){
'use strict';
var D=window.SESSION,ID=D.id,P='gt05m-',$=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var store={get:function(k,d){try{var v=localStorage.getItem(P+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem(P+k,JSON.stringify(v))}catch(e){}}};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
var S={said:store.get('said-'+ID,0),done:store.get('done-'+ID,{}),flags:store.get('flags-'+ID,{}),cur:0};
function save(){store.set('said-'+ID,S.said);store.set('done-'+ID,S.done);store.set('flags-'+ID,S.flags)}
function said(n){S.said=Math.max(0,S.said+(n===undefined?1:n));save();$$('.pts b').forEach(function(e){e.textContent=S.said})}
function once(key,fn){if(!S.flags[key]){S.flags[key]=1;fn&&fn();save();return true}return false}
/* device voice stand-in until the ElevenLabs files exist */
var vo=null;function voices(){try{vo=speechSynthesis.getVoices().filter(function(v){return /^en/i.test(v.lang)})}catch(e){vo=[]}}
function speakText(t,sp,done){try{if(!window.speechSynthesis){done&&done();return}var u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.85;u.pitch=sp==='B'?1.25:sp==='A'?.9:1;if(vo&&vo.length){u.voice=vo[sp==='B'&&vo[1]?1:0]}u.onend=function(){done&&done()};u.onerror=function(){done&&done()};speechSynthesis.speak(u)}catch(e){done&&done()}}
try{voices();speechSynthesis.onvoiceschanged=voices}catch(e){}
document.addEventListener('click',function(e){var b=e.target.closest('[data-say]');if(b){try{speechSynthesis.cancel()}catch(x){}speakText(b.getAttribute('data-say'))}});
function sayBtn(t){return '<button type="button" class="say" data-say="'+esc(t)+'" aria-label="Listen: '+esc(t)+'">Listen</button>'}
function timerHTML(m,light){return '<span class="timer'+(light?' light':'')+'" data-min="'+m+'"><span class="tm">'+m+':00</span><button type="button">Start</button></span>'}
function wireTimer(el){var t=$('.tm',el),b=$('button',el),s=+el.dataset.min*60,left=s,iv=null;
 function draw(){var m=Math.floor(left/60),x=left%60;t.textContent=m+':'+(x<10?'0':'')+x;el.classList.toggle('end',left===0)}
 b.onclick=function(){if(iv){clearInterval(iv);iv=null;b.textContent='Start';return}if(left===0){left=s;draw()}b.textContent='Pause';iv=setInterval(function(){left--;draw();if(left<=0){clearInterval(iv);iv=null;b.textContent='Again'}},1000)};draw()}
function toggles(){var v=store.get('view','student'),m=store.get('mode','group');document.body.dataset.view=v;document.body.dataset.mode=m;
 $$('.seg[data-k="view"] button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===v)});
 $$('.seg[data-k="mode"] button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.v===m)});
 $$('.seg button').forEach(function(b){b.onclick=function(){store.set(b.parentNode.dataset.k,b.dataset.v);toggles()}})}
function how(h){return '<div class="how3"><h4>What to do</h4><ol>'+h.steps.map(function(s){return '<li>'+esc(s)+'</li>'}).join('')+'</ol>'+(h.t?'<div class="sayl"><b>Teacher says</b> “'+esc(h.t)+'”</div>':'')+(h.s?'<div class="sayl"><b>Students say</b> “'+esc(h.s)+'”</div>':'')+'<div class="done"><b>Done when</b> '+esc(h.done)+'</div></div>'}
function tn(t){return '<div class="tn"><h4>Teacher notes</h4><div class="cols"><div><b>Step by step</b><p>'+esc(t[0])+'</p></div><div><b>What to say</b><p>'+esc(t[1])+'</p></div><div><b>Watch out · key</b><p>'+esc(t[2])+'</p></div></div></div>'}
function esBtn(){return '<button type="button" class="btn ghost sm esb" aria-expanded="false">Ver explicación en español</button>'}
function sw(label,key,onfirst){var id='c'+Math.random().toString(36).slice(2,8);return '<label class="sw"><input type="checkbox" id="'+id+'" data-sk="'+esc(key)+'"'+(S.flags['k-'+key]?' checked':'')+'> '+esc(label)+'</label>'}
function wireSw(root,pts){$$('[data-sk]',root).forEach(function(c){c.onchange=function(){var k='k-'+c.dataset.sk;if(c.checked){once(k,function(){said(pts===undefined?1:pts)})}}})}
var M={warm:7,vocab:8,gram:8,read:9,listen:7,speak:15,close:6};
var order=['warm','vocab','gram','read','listen','speak','close'];
var NAMES={warm:['Warm-up','Speak from minute one'],vocab:['Vocabulary Challenge','Say the word'],gram:['Language for the task','Use it now'],read:['Reading + noticing','Read, notice, reuse'],listen:['Listening','Listen twice'],speak:['Speaking',D.speak.name],close:['Feedback + second try','Say it again with fewer prompts']};
var FN={warm:warm,vocab:vocab,gram:gram,read:read,listen:listen,speak:speak,close:close};
var PH={warm:'hero',vocab:'a',gram:'b',read:'c',listen:'a',speak:'hero',close:'b'};
var start=0,PANELS=order.map(function(k,i){var p={k:k,n:i+1,t:NAMES[k][0],tag:NAMES[k][1],m:M[k],s:start,e:start+M[k]};start+=M[k];return p});
function mcard(){var c=D.card;return '<div class="mcard" aria-label="Mission card"><div><b>Today you will</b><span>'+esc(D.can.replace(/^I can /,'')).replace(/^./,function(x){return x.toUpperCase()})+'</span></div><div><b>Situation</b><span>'+esc(c.situation)+'</span></div><div><b>You will say</b><span>'+c.phrases.map(esc).join('<br>')+'</span></div><div><b>Roles</b><span>'+esc(c.roles)+'</span></div><div><b>Done when</b><span>'+esc(c.finished)+'</span></div></div>'}
function rescue(){var r=D.rescue;return '<div class="rescue"><b>Stuck? Say:</b>'+r.map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div>'}
function build(){
 var H=D.photos.hero;$('#hero').innerHTML='<img class="bg" src="'+H.src+'" alt="'+esc(H.alt)+'"><div class="wrap"><span class="kick">Gabriel Turner - Your Business Coach · Elemental 2 · Session '+D.n+'</span><h1>'+esc(D.title)+'</h1><p class="can">'+esc(D.can)+'</p><div class="chips"><span class="chip">60 min</span><span class="chip">You speak about '+D.talk+' min</span><span class="chip">'+esc(D.focus)+'</span></div>'+mcard()+'</div>';
 var pan='';PANELS.forEach(function(p){var ph=D.photos[PH[p.k]];
  pan+='<section class="panel sec" id="p-'+p.k+'" data-min="'+p.s+'–'+p.e+'" hidden><div class="banner"><img class="bg" src="'+ph.src+'" alt="'+esc(ph.alt)+'"><div class="t"><div><div class="tag">Step '+p.n+' · '+esc(p.tag)+'</div><h2>'+esc(p.t)+'</h2></div>'+timerHTML(p.m)+'</div></div><div class="body"><div class="mount"></div><div class="pager"><button type="button" class="btn ghost sm" data-go="-1"'+(p.n===1?' hidden':'')+'>Back</button><span class="c">'+p.n+' / '+PANELS.length+' · '+p.m+' min</span><button type="button" class="btn teal sm" data-go="1" data-done="'+p.k+'">'+(p.n===PANELS.length?'Finish':'Done, next')+'</button></div></div></section>'});
 $('#panels').innerHTML=pan;
 PANELS.forEach(function(p){FN[p.k]($('.mount',$('#p-'+p.k)),p)});
 $$('.timer').forEach(wireTimer);
 $$('.esb').forEach(function(b){b.onclick=function(){var open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!open);b.textContent=open?'Ver explicación en español':'Hide Spanish';$$('.es',b.closest('.mount')).forEach(function(e){e.hidden=open})}});
 $('#stepper').innerHTML=PANELS.map(function(p){return '<button type="button" class="st" data-i="'+(p.n-1)+'"><i>'+p.n+'</i>'+esc(p.t)+' <small>'+p.m+'′</small></button>'}).join('');
 $('#agenda').innerHTML=PANELS.map(function(p){return '<button type="button" class="ag" data-i="'+(p.n-1)+'"><span class="n">'+p.n+'</span><b>'+esc(p.t)+'</b><span>'+p.m+' min</span></button>'}).join('');
 $$('#stepper [data-i],#agenda [data-i]').forEach(function(b){b.onclick=function(){go(+b.dataset.i,true)}});
 $$('[data-go]').forEach(function(b){b.onclick=function(){if(b.dataset.done){S.done[b.dataset.done]=1;save()}go(S.cur+(+b.dataset.go),true)}});
}
function go(i,sc){if(i<0)i=0;if(i>PANELS.length-1)i=PANELS.length-1;S.cur=i;
 PANELS.forEach(function(p,k){$('#p-'+p.k).hidden=k!==i});
 $$('#stepper .st').forEach(function(b,k){b.setAttribute('aria-current',k===i?'step':'false');b.classList.toggle('done',!!S.done[PANELS[k].k])});
 if(PANELS[i].k==='close')renderClose();
 if(history.replaceState)history.replaceState(null,'','#'+(i+1));
 if(sc){var s=$('#panels');window.scrollTo({top:s.getBoundingClientRect().top+window.scrollY-84,behavior:'smooth'})}}
/* 1 WARM-UP */
function warm(el){var W=D.warm;
 el.innerHTML='<p class="lead big">'+esc(D.title)+'</p><div class="model"><b>Can-do</b> '+esc(D.can)+'</div>'+how(W.how)+
 '<div class="qcards">'+W.qs.map(function(q,i){return '<div class="qc"><div class="n">'+(i+1)+'</div><div><div class="qt">'+esc(q.q)+' '+sayBtn(q.q)+'</div><div class="fu">'+q.f.map(function(f){return '<span>'+esc(f)+'</span>'}).join('')+'</div>'+sw('We answered','w'+i)+'</div></div>'}).join('')+'</div>'+tn(W.tn);
 wireSw(el)}
/* 2 VOCABULARY CHALLENGE: definition -> say the word -> check -> one true example */
function vocab(el){var V=D.vocab,W=V.words,lt='ABCDEFGH',sel=-1,got={};
 el.innerHTML='<p class="lead big">Read the meaning. Say the word. Then check it.</p>'+how(V.how)+
 '<div class="vm"><div class="vdefs" id="vdefs">'+W.map(function(w,i){return '<button type="button" class="vdef" data-i="'+i+'"><i>'+(i+1)+'</i><span>'+esc(w.def)+'</span><em class="ck" aria-hidden="true"></em></button>'}).join('')+'</div><div class="vbank" id="vbank"><div class="kicker">Choose the word</div>'+shuffle(W.map(function(w,i){return i})).map(function(i){return '<button type="button" class="vw" data-i="'+i+'"><b>'+lt[i]+'</b> '+esc(W[i].w)+'</button>'}).join('')+'</div></div>'+
 '<div class="row">'+esBtn()+'<span class="stat">Matched <b id="vm">0</b>/'+W.length+'</span><span class="stat">Examples said <b id="vx">0</b>/'+W.length+'</span></div><div class="vdet" id="vd"><span>Tap a meaning first.</span></div>'+tn(V.tn);
 function upd(){$('#vm').textContent=Object.keys(got).length;$('#vx').textContent=W.filter(function(_,i){return S.flags['k-vx'+i]}).length}
 function pickDef(i){sel=i;$$('.vdef').forEach(function(b){b.classList.toggle('on',+b.dataset.i===i)});if(got[i])exampleBox(i);else $('#vd').innerHTML='<b class="big">'+(i+1)+'. '+esc(W[i].def)+'</b><span class="note">Say the word aloud. Then tap it on the right.</span>'}
 function exampleBox(i){var w=W[i];$('#vd').innerHTML='<b class="big">'+esc(w.w)+'</b> '+sayBtn(w.w)+'<span class="es" hidden>'+esc(w.es)+'</span><div class="note">Say one true sentence about you. Example:</div><span class="bubble">'+esc(w.ex)+'</span> '+sayBtn(w.ex)+'<br>'+sw('I said a true sentence','vx'+i);wireSw($('#vd'));$$('[data-sk]',$('#vd')).forEach(function(c){var o=c.onchange;c.onchange=function(){o.call(c);upd()}})}
 $$('.vdef').forEach(function(b){b.onclick=function(){pickDef(+b.dataset.i)}});
 $$('.vw').forEach(function(b){b.onclick=function(){if(sel<0){$('#vd').innerHTML='<span class="note">Tap a meaning first.</span>';return}var i=+b.dataset.i;if(i===sel){got[i]=1;b.disabled=true;b.classList.add('right');$$('.vdef')[i].classList.add('got');upd();exampleBox(i)}else{b.classList.add('wrong');setTimeout(function(){b.classList.remove('wrong')},500);$('#vd').innerHTML='<b class="big">'+(sel+1)+'. '+esc(W[sel].def)+'</b><span class="note">Not this one. Say another word.</span>'}}});
 W.forEach(function(_,i){if(S.flags['k-vx'+i]){got[i]=1;$$('.vdef')[i].classList.add('got');$$('.vw').forEach(function(b){if(+b.dataset.i===i){b.disabled=true;b.classList.add('right')}})}});upd()}
/* 3 GRAMMAR FOR THE TASK */
function gram(el){var G=D.gram;
 el.innerHTML='<p class="lead big">'+esc(G.lead)+'</p><div class="rule"><span class="tag">Use it now</span><p class="big">'+G.rule.map(esc).join('<br>')+'</p><div class="es" hidden>'+esc(G.es)+'</div></div><div class="useful">'+G.useful.map(function(u){return '<button type="button" class="uf" data-say="'+esc(u.replace(/\.\.\./g,'').replace(/…/g,''))+'">'+esc(u)+'</button>'}).join('')+'</div><div class="row">'+esBtn()+'</div>'+how(G.how)+
 '<div class="sec2"><h3>1 · Choose, then say it <span class="lbl">Model to your idea</span></h3><div id="dr"></div></div>'+
 '<div class="sec2"><h3>2 · '+esc(G.say.title)+' <span class="lbl">Say it aloud</span></h3><div id="sy"></div></div>'+
 '<div class="sec2"><h3>3 · Your turn <span class="lbl">Three true sentences</span></h3><div id="tu"></div></div>'+tn(G.tn);
 var di=0,dc=0,dr=$('#dr'),DR=G.drill;
 function dq(){if(di>=DR.length){dr.innerHTML='<div class="fb ok"><b>'+dc+' of '+DR.length+'</b> right. Say it aloud: “'+dc+' of '+DR.length+'.”</div>';return}
  var q=DR[di];dr.innerHTML='<div class="dots">'+DR.map(function(_,k){return '<i class="'+(k<di?'on':k===di?'cur':'')+'"></i>'}).join('')+'</div><p class="q-sit mcq"><span class="q">'+esc(q.sit)+'</span></p><div class="pick2">'+q.o.map(function(o,j){return '<button type="button" class="btn ghost" data-j="'+j+'">'+esc(o)+'</button>'}).join('')+'</div><div id="df"></div>';
  $$('.pick2 button',dr).forEach(function(b){b.onclick=function(){var ok=+b.dataset.j===q.ans;$$('.pick2 button',dr).forEach(function(x){x.disabled=true;if(+x.dataset.j===q.ans)x.classList.add('good');else if(x===b)x.classList.add('bad')});if(ok)dc++;
   $('#df').innerHTML='<div class="fb '+(ok?'ok':'no')+'"><b>'+(ok?'Yes.':'Not this time.')+'</b> '+esc(q.why)+' '+sayBtn(q.o[q.ans])+'<span class="bubble">'+esc(q.o[q.ans])+'</span>'+sw('I said it','d'+di)+'<button type="button" class="btn sm teal" id="dn">'+(di===DR.length-1?'See result':'Next')+'</button></div>';
   wireSw($('#df'));$('#dn').onclick=function(){di++;dq()}}})}
 dq();
 $('#sy').innerHTML='<ol class="sylist">'+G.say.items.map(function(it,i){return '<li><div class="q">'+esc(it.t)+'</div><div class="row"><button type="button" class="btn ghost sm shm" data-i="'+i+'">Show a model</button>'+sw('I said it','s'+i)+'</div><div class="bubble" hidden>'+esc(it.m)+' '+sayBtn(it.m)+'</div></li>'}).join('')+'</ol>';
 $$('.shm').forEach(function(b){b.onclick=function(){$('.bubble',b.closest('li')).hidden=false;b.hidden=true}});wireSw($('#sy'));
 var tu=$('#tu'),ti=0,T=G.turn,tq=shuffle(T.chips);
 function tr(){if(ti>=3){tu.innerHTML='<div class="fb ok"><b>3 sentences about you.</b> Say your best one again without looking.</div>';return}
  tu.innerHTML='<div class="qd"><div class="kicker">Round '+(ti+1)+' of 3</div><div class="q big">'+esc(tq[ti%tq.length])+'</div><div class="f"><span>'+esc(T.prompt)+'</span></div></div><div class="row" style="margin-top:12px">'+sw('I said it','t'+ti)+'<button type="button" class="btn sm teal" id="tn2">Next</button></div>';
  wireSw(tu);$('#tn2').onclick=function(){ti++;tr()}}
 tr()}
function rsp(i,t){return '<span class="rs" data-i="'+i+'" tabindex="0" role="button" aria-pressed="false">'+esc(t)+'</span>'}
function readBody(R){var k=0;
 if(R.cards)return '<div class="pcards" id="rt">'+R.cards.map(function(c){return '<article class="pc"><img src="'+c.img.src+'" alt="'+esc(c.img.alt)+'"><div class="pcb"><h4>'+esc(c.name)+' <small>'+esc(c.sub)+'</small></h4><ul>'+c.facts.map(function(f){return '<li>'+rsp(k++,f)+'</li>'}).join('')+'</ul></div></article>'}).join('')+'</div>';
 if(R.agenda){var ph=D.photos.d;return (ph?'<img class="agimg" src="'+ph.src+'" alt="'+esc(ph.alt)+'">':'')+'<div class="ag2" id="rt"><div class="agt">'+esc(R.agenda.who)+'</div>'+R.agenda.items.map(function(a){return '<div class="agr '+(a.ok?'ok':'no')+'"><span class="when">'+esc(a.when)+'</span><span class="plan">'+esc(a.plan)+'</span><b class="mk" aria-label="'+(a.ok?'done':'not done')+'">'+(a.ok?'✓':'✗')+'</b>'+rsp(k++,a.s)+'</div>'}).join('')+'</div>'}
 return '<div class="rtxt" id="rt">'+R.text.map(function(s,i){return rsp(i,s)+' '}).join('')+'</div>'}
/* 4 READING + NOTICING */
function read(el){var R=D.read,pick={},hid=false;
 el.innerHTML='<p class="lead big">'+esc(R.title)+'</p>'+how(R.how)+
 readBody(R)+'<div class="row">'+'<button type="button" class="btn ghost sm" data-say="'+esc(R.text.join(' '))+'">Listen to the text</button>'+'<button type="button" class="btn ghost sm" id="rh">Hide the text</button>'+'<span class="stat">Underlined <b id="ru">0</b>/2</span></div>'+
 '<div class="sec2"><h3>1 · Main idea <span class="lbl">One question</span></h3><div class="mq" data-kind="idea"><p class="q-sit mcq"><span class="q">'+esc(R.idea.q)+'</span></p><div class="opts">'+R.idea.o.map(function(o,j){return '<button type="button" class="btn ghost sm" data-j="'+j+'">'+esc(o)+'</button>'}).join('')+'</div><div class="mfb"></div></div></div>'+
 '<div class="sec2"><h3>2 · Underline two useful examples <span class="lbl">Tap two sentences above</span></h3><p class="note">'+esc(R.notice)+'</p><div id="ru2"></div></div>'+
 '<div class="sec2"><h3>3 · Reuse one in your own answer <span class="lbl">Say it</span></h3><div class="qd"><div class="q big">'+esc(R.reuse)+'</div></div><div class="row">'+sw('I reused a sentence in a true answer','r1')+'</div></div>'+
 '<div class="sec2"><h3>4 · Tell it again <span class="lbl">Text hidden</span></h3><div class="model amber"><b>Say</b> '+esc(R.retell)+'</div><div class="row">'+sw('I told it again without the text','r2')+'</div></div>'+tn(R.tn);
 wireSw(el);
 function draw(){$('#ru').textContent=Object.keys(pick).length;$('#ru2').innerHTML=Object.keys(pick).length?'<ul class="ulist">'+Object.keys(pick).map(function(i){return '<li>'+esc(R.text[i])+'</li>'}).join('')+'</ul>':''}
 $$('.rs',el).forEach(function(s){function t(){var i=s.dataset.i;if(pick[i]){delete pick[i];s.classList.remove('u')}else{if(Object.keys(pick).length>=2)return;pick[i]=1;s.classList.add('u')}s.setAttribute('aria-pressed',!!pick[i]);draw()}s.onclick=t;s.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}}});
 $('#rh').onclick=function(){hid=!hid;$('#rt').classList.toggle('blur',hid);this.textContent=hid?'Show the text':'Hide the text'};
 var m=$('.mq',el),b=$$('button',m);b.forEach(function(x){x.onclick=function(){var ok=+x.dataset.j===R.idea.a;b.forEach(function(y){y.disabled=true;if(+y.dataset.j===R.idea.a)y.classList.add('good');else if(y===x)y.classList.add('bad')});$('.mfb',m).innerHTML='<div class="fb '+(ok?'ok':'no')+'">'+esc(R.idea.why)+'</div>'}})}
/* 5 LISTENING */
function listen(el){var Q=D.listen,playing=0,stopFlag=false;
 el.innerHTML='<p class="lead big">'+esc(Q.title)+'</p><div class="model"><b>Scene</b> '+esc(Q.scene)+'</div>'+how(Q.how)+
 '<div class="player"><button type="button" class="btn teal" id="pl1">▶ Listen 1 · the situation</button><button type="button" class="btn amber" id="pl2">▶ Listen 2 · detail and next action</button><button type="button" class="btn ghost sm" id="pls">Stop</button><span class="stat" id="pst"></span></div><div class="miss ct" hidden>Teacher: audio files are not in the folder yet. The device voice plays the lines. Real audio replaces it later.</div>'+
 '<div class="mcqs"><div class="mq" data-kind="idea"><p class="q-sit mcq"><span class="q">After Listen 1 · '+esc(Q.idea.q)+'</span></p><div class="opts">'+Q.idea.o.map(function(o,j){return '<button type="button" class="btn ghost sm" data-j="'+j+'">'+esc(o)+'</button>'}).join('')+'</div><div class="mfb"></div></div></div>'+
 '<div class="sec2"><h3>After Listen 2 <span class="lbl">Say it</span></h3><div class="acts2">'+Q.acts.map(function(a,i){return '<div class="actrow"><div class="q">'+esc(a)+'</div>'+sw('I did it','la'+i)+'</div>'}).join('')+'</div></div>'+
 '<div class="tn"><h4>Teacher notes · script and answers</h4><div class="cols"><div><b>Script (read aloud, two times)</b><p>'+Q.lines.map(function(l){return l.sp+': '+esc(l.t)}).join('<br>')+'</p></div><div><b>Answer key</b><p>'+Q.key.map(esc).join('<br>')+'</p></div><div><b>Watch out</b><p>'+esc(Q.watch)+'</p></div></div></div>';
 wireSw(el);
 function play(){if(playing)return;playing=1;stopFlag=false;var i=0;
  function next(){if(stopFlag||i>=Q.lines.length){playing=0;$('#pst').textContent='';return}var l=Q.lines[i++];$('#pst').textContent='Line '+i+' of '+Q.lines.length;
   var a=new Audio(l.file),fell=false;function fb(){if(fell)return;fell=true;$('.miss',el).hidden=false;speakText(l.t,l.sp,function(){setTimeout(next,250)})}
   a.onerror=fb;a.onended=function(){if(!fell)setTimeout(next,250)};var p=a.play();if(p&&p.catch)p.catch(fb)}
  next()}
 $('#pl1').onclick=play;$('#pl2').onclick=play;$('#pls').onclick=function(){stopFlag=true;playing=0;try{speechSynthesis.cancel()}catch(e){}$('#pst').textContent=''};
 var m=$('.mq',el),b=$$('button',m);b.forEach(function(x){x.onclick=function(){var ok=+x.dataset.j===Q.idea.a;b.forEach(function(y){y.disabled=true;if(+y.dataset.j===Q.idea.a)y.classList.add('good');else if(y===x)y.classList.add('bad')});$('.mfb',m).innerHTML='<div class="fb '+(ok?'ok':'no')+'">'+esc(Q.idea.why)+'</div>'}})}
/* 6 SPEAKING (per-session dynamic) */
function twistBlock(K){var T=K.twist;return '<div class="twist"><button type="button" class="btn amber" id="tw">Twist!</button><div id="twc" class="changecard" hidden>'+(T.img?'<img class="twimg" src="'+T.img.src+'" alt="'+esc(T.img.alt)+'">':'')+'<b>'+esc(T.title)+'</b><span>'+esc(T.text)+'</span>'+(T.opts?'<div class="twopts">'+T.opts.map(function(o,i){return '<button type="button" class="btn ghost sm" data-to="'+i+'">'+esc(o)+'</button>'}).join('')+'</div><div class="note" id="two"></div>':'')+'<span>'+sw('We handled the twist','tw')+'</span></div></div>'}
function finalBlock(K){return '<div class="sec2"><h3>Your final message <span class="lbl">Tick when you did it</span></h3><div class="model amber"><b>Say</b> '+esc(K.final.say)+' '+sayBtn(K.final.say)+'</div><div class="grid2">'+K.final.check.map(function(c,i){return '<label class="chk"><input type="checkbox" data-m="'+i+'"'+(S.flags['m'+i]?' checked':'')+'>'+esc(c)+'</label>'}).join('')+'</div><div class="row">'+timerHTML(K.final.min||2,true)+'</div></div>'}
function wireFinal(el){wireSw(el);$$('[data-m]',el).forEach(function(c){c.onchange=function(){if(c.checked)once('m'+c.dataset.m,function(){said(1)})}});var t=$('#tw',el);if(t)t.onclick=function(){$('#twc').hidden=false;this.hidden=true};$$('[data-to]',el).forEach(function(b){b.onclick=function(){$$('[data-to]',el).forEach(function(x){x.classList.toggle('good',x===b)});$('#two').textContent=D.speak.twist.say[+b.dataset.to]}});$$('.timer',el).forEach(wireTimer)}
function speak(el){var K=D.speak;var head='<p class="lead big">'+esc(K.lead)+'</p>'+how(K.how)+rescue()+'<div class="model"><b>Model</b> <span class="bubble">'+esc(K.model)+'</span>'+sayBtn(K.model)+'</div>';
 if(K.kind==='findwho')return findwho(el,K,head);if(K.kind==='choose')return choose(el,K,head);if(K.kind==='detective')return detective(el,K,head);if(K.kind==='map')return cmap(el,K,head);if(K.kind==='story')return story(el,K,head);if(K.kind==='tennis')return tennis(el,K,head);return gap(el,K,head)}
/* find someone who (S01) */
function findwho(el,K,head){
 el.innerHTML=head+'<div class="fwl">'+K.rows.map(function(r,i){return '<div class="fw"><div class="fwh"><i>'+(i+1)+'</i><b>'+esc(r.t)+'</b></div><div class="qt">'+esc(r.q)+' '+sayBtn(r.q)+'</div><div class="fu">'+r.f.map(function(f){return '<span>'+esc(f)+'</span>'}).join('')+'</div><div class="row"><label class="nm">Name <input type="text" class="nmi" data-nm="'+i+'" placeholder="Who?" maxlength="24" value="'+esc(S.flags['nm'+i]||'')+'"></label>'+sw('I asked','fa'+i)+sw('I asked a follow-up','ff'+i)+'<button type="button" class="btn ghost sm" data-card="'+i+'">Prefer not to share? Use a profile</button></div><div class="fwc" hidden><b>'+esc(r.card[0])+'</b> '+esc(r.card[1])+' '+sayBtn(r.card[1])+'</div></div>'}).join('')+'</div>'+
 '<div class="sec2"><h3>Report two findings <span class="lbl">Tell the group</span></h3><p class="note">'+esc(K.reportHint)+'</p><div class="row">'+sw('I reported finding 1','rp1')+sw('I reported finding 2','rp2')+'</div></div>'+twistBlock(K)+finalBlock(K)+tn(K.tn);
 $$('.nmi',el).forEach(function(i){i.oninput=function(){S.flags['nm'+i.dataset.nm]=i.value;save()}});
 $$('[data-card]',el).forEach(function(b){b.onclick=function(){var c=$('.fwc',b.closest('.fw'));c.hidden=!c.hidden}});
 wireFinal(el)}
/* choose one (S02) */
function choose(el,K,head){var side=S.flags.side===undefined?-1:S.flags.side,tw=!!S.flags.cw;
 el.innerHTML=head+'<div class="vs">'+K.opts.map(function(o,i){return '<button type="button" class="opt o'+i+'" data-i="'+i+'"><b>'+esc(o.t)+'</b><span>'+esc(o.sub)+'</span></button>'}).join('')+'</div><div id="ch"></div><div class="twist"><button type="button" class="btn amber" id="ctw">Twist!</button><div id="ctc" class="changecard" hidden><b>'+esc(K.twist.title)+'</b><span>'+esc(K.twist.text)+'</span><div id="cta"></div></div></div>'+finalBlock(K)+tn(K.tn);
 function args(i,pre){var o=K.opts[i];return '<div class="args"><div class="kicker">'+esc(o.t)+'</div>'+o.args.map(function(a,k){return '<div class="actrow"><div class="q">'+esc(a)+'</div>'+sw('I said it',pre+i+'_'+k)+'</div>'}).join('')+'</div>'}
 function draw(){$$('.opt',el).forEach(function(b){b.classList.toggle('on',+b.dataset.i===side)});
  $('#ch').innerHTML=side<0?'<div class="qd"><div class="kicker">Step 1</div><div class="q big">Tap the option you choose. Then give two reasons about last weekend.</div></div>':'<div class="sec2"><h3>I choose: '+esc(K.opts[side].t)+' <span class="lbl">Give two reasons</span></h3>'+args(side,'a')+'</div>';
  wireSw($('#ch'));
  if(tw&&side>=0){$('#ctc').hidden=false;$('#ctw').hidden=true;$('#cta').innerHTML='<p class="note">Now defend the other option:</p>'+args(1-side,'b');wireSw($('#cta'))}}
 $$('.opt',el).forEach(function(b){b.onclick=function(){side=+b.dataset.i;S.flags.side=side;save();draw()}});
 $('#ctw').onclick=function(){if(side<0){$('#ch').insertAdjacentHTML('beforeend','<div class="fb no">Choose an option first.</div>');return}tw=true;S.flags.cw=1;save();draw()};
 draw();wireFinal(el)}
/* detective (S01, S04) */
function detective(el,K,head){var ci=0,rev={};
 el.innerHTML=head+'<div class="tabs" id="ct">'+K.cases.map(function(c,i){return '<button type="button" class="tab" data-i="'+i+'">Case '+(i+1)+(i?' · switch roles':'')+'</button>'}).join('')+'</div><div id="case"></div><div id="rep"></div>'+twistBlock(K)+finalBlock(K)+tn(K.tn);
 function draw(){var c=K.cases[ci];$$('#ct .tab').forEach(function(b,i){b.classList.toggle('on',i===ci)});rev=S.flags['rv'+ci]||{};
  $('#case').innerHTML='<div class="clues"><h4>'+esc(c.title)+'</h4>'+c.clues.map(function(x){return '<div class="clue"><b>'+esc(x.t)+'</b><span>'+esc(x.text)+'</span></div>'}).join('')+'</div><div class="starters"><b>Ask clear past questions:</b>'+K.starters.map(function(s){return '<span>'+esc(s)+'</span>'}).join('')+'</div><div class="facts">'+c.facts.map(function(f,i){return '<button type="button" class="fact'+(rev[i]?' open':'')+'" data-i="'+i+'"><span class="cat">'+esc(f.cat)+'</span><span class="ans">'+(rev[i]?esc(f.a):'?')+'</span><span class="ct">Example question: '+esc(f.q)+'</span></button>'}).join('')+'</div><div class="row"><span class="stat">Answered <b id="fa">'+Object.keys(rev).length+'</b>/'+c.facts.length+'</span><span class="note">Partner: tap a card only after a clear question.</span></div>';
  $$('.fact',el).forEach(function(b){b.onclick=function(){var i=+b.dataset.i;if(rev[i])return;rev[i]=1;S.flags['rv'+ci]=rev;save();said(1);draw();rep()}});rep()}
 function rep(){var c=K.cases[ci],n=Object.keys(rev).length;$('#rep').innerHTML=n>=Math.min(4,c.facts.length)?'<div class="sec2"><h3>'+esc(K.report.title)+' <span class="lbl">'+esc(K.report.lbl)+'</span></h3><div class="row"><button type="button" class="btn ghost sm" id="hc">Hide the cards</button>'+timerHTML(1,true)+sw('I gave my update','rp'+ci)+'</div></div>':'';if(n>=Math.min(4,c.facts.length)){wireSw($('#rep'));$$('.timer',$('#rep')).forEach(wireTimer);$('#hc').onclick=function(){var f=$('.facts');f.classList.toggle('blur');this.textContent=f.classList.contains('blur')?'Show the cards':'Hide the cards'}}}
 $$('#ct .tab').forEach(function(b){b.onclick=function(){ci=+b.dataset.i;draw()}});draw();wireFinal(el)}
/* conversation map (S02) */
function cmap(el,K,head){var on=-1,conn=S.flags.conn||[];
 el.innerHTML=head+'<div class="cmap" id="cm">'+K.nodes.map(function(n,i){return '<button type="button" class="node n'+i+'" data-i="'+i+'"><b>'+esc(n.t)+'</b><span>'+esc(n.hint)+'</span></button>'}).join('')+'</div><div class="qd" id="nq"><div class="kicker">Tap a branch</div><div class="q big">Choose where to start.</div></div>'+
 '<div class="sec2"><h3>Connect two branches <span class="lbl">because or but</span></h3><div class="row"><select id="ca" aria-label="First branch">'+K.nodes.map(function(n,i){return '<option value="'+i+'">'+esc(n.t)+'</option>'}).join('')+'</select><select id="cc" aria-label="Connector"><option>because</option><option>but</option></select><select id="cb" aria-label="Second branch">'+K.nodes.map(function(n,i){return '<option value="'+i+'"'+(i===1?' selected':'')+'>'+esc(n.t)+'</option>'}).join('')+'</select><button type="button" class="btn teal sm" id="cx">Make the link</button></div><div id="cl"></div><div class="row"><span class="stat">Links <b id="cn">0</b>/2</span></div></div>'+twistBlock(K)+finalBlock(K)+tn(K.tn);
 function links(){$('#cn').textContent=conn.length;$('#cl').innerHTML=conn.map(function(c){var cc=c.split(' ')[1];return '<div class="sayline"><b>Say one true sentence:</b> '+esc(c)+'. Example: '+esc(K.ex[cc])+' '+sayBtn(K.ex[cc])+'</div>'}).join('')}
 $$('.node',el).forEach(function(b){b.onclick=function(){on=+b.dataset.i;var n=K.nodes[on];$$('.node').forEach(function(x){x.classList.toggle('on',x===b)});$('#nq').innerHTML='<div class="kicker">'+esc(n.t)+'</div><div class="q big">'+esc(n.qs[0])+'</div><div class="f">'+n.qs.slice(1).map(function(f){return '<span>'+esc(f)+'</span>'}).join('')+'</div><div class="row" style="margin-top:12px">'+sw('I spoke about this branch','nd'+on)+sw('I asked a follow-up','nf'+on)+'</div>';wireSw($('#nq'))}});
 $('#cx').onclick=function(){var a=+$('#ca').value,b=+$('#cb').value,c=$('#cc').value;if(a===b)return;var t=K.nodes[a].t+' '+c+' '+K.nodes[b].t;if(conn.indexOf(t)<0){conn.push(t);S.flags.conn=conn;save();said(1)}links()};
 links();wireFinal(el)}
/* story builder (S03) */
function story(el,K,head){var shown=S.flags.st||[],first=-1;
 el.innerHTML=head+'<div class="sb"><div class="kicker" id="sk">Step 1 · Choose the first picture and start the story.</div><div class="spics" id="sp">'+K.pics.map(function(p,i){return '<button type="button" class="spic" data-i="'+i+'"><img src="'+p.src+'" alt="'+esc(p.alt)+'"><span>'+esc(p.label)+'</span></button>'}).join('')+'</div><div class="seq" id="seq"></div><div class="row"><button type="button" class="btn teal sm" id="nx" hidden>Add the next picture</button><button type="button" class="btn ghost sm" id="hp" hidden>Hide the pictures · retell</button></div></div>'+
 '<div class="sec2"><h3>Sequence words <span class="lbl">Use all four</span></h3><div class="grid2">'+K.seqw.map(function(w,i){return '<label class="chk"><input type="checkbox" data-sq="'+i+'"'+(S.flags['sq'+i]?' checked':'')+'>'+esc(w)+'</label>'}).join('')+'</div></div>'+twistBlock(K)+finalBlock(K)+tn(K.tn);
 function draw(){
  $('#seq').innerHTML=shown.map(function(i,k){return '<div class="step"><b>'+K.seqw[Math.min(k,3)]+'</b><span>Say a sentence about “'+esc(K.pics[i].label)+'”.</span>'+sw('I said it','st'+k)+'</div>'}).join('');wireSw($('#seq'));
  $('#nx').hidden=shown.length===0||shown.length>=K.pics.length;$('#hp').hidden=shown.length<K.pics.length;
  $$('.spic',el).forEach(function(b,i){b.hidden=shown.length>0&&shown.indexOf(i)<0})}
 $$('.spic',el).forEach(function(b){b.onclick=function(){var i=+b.dataset.i;if(shown.length===0){shown=[i];S.flags.st=shown;save();$('#sk').textContent='Step 2 · Say how the story starts. Then add the next picture.';b.classList.add('on');draw();return}if(shown.indexOf(i)<0&&shown.length<K.pics.length){shown.push(i);S.flags.st=shown;save();b.classList.add('on');draw()}}});
 $('#nx').onclick=function(){var left=K.pics.map(function(_,i){return i}).filter(function(i){return shown.indexOf(i)<0});if(left.length){var i=left[0];shown.push(i);S.flags.st=shown;save();$$('.spic')[i].classList.add('on');draw()}};
 $('#hp').onclick=function(){var s=$('#sp');s.classList.toggle('off');this.textContent=s.classList.contains('off')?'Show the pictures':'Hide the pictures · retell';$('#sk').textContent='Step 3 · Pictures hidden. Retell the whole story with a clear ending.'};
 $$('[data-sq]',el).forEach(function(c){c.onchange=function(){if(c.checked)once('sq'+c.dataset.sq,function(){said(1)})}});
 shown.forEach(function(i){$$('.spic')[i].classList.add('on')});draw();wireFinal(el)}
/* opinion tennis (S05) */
function tennis(el,K,head){var rally=S.flags.ral||0,i=-1,deck=shuffle(K.deck),resp=0;
 el.innerHTML=head+'<div class="court"><div class="kicker" id="tk">Serve</div><div class="q big" id="ts">Press Serve.</div><div class="conn" id="tc"><button type="button" class="btn ghost sm" data-c="because">because</button><button type="button" class="btn ghost sm" data-c="but">but</button><button type="button" class="btn ghost sm" data-c="so">so</button></div><div id="tp" class="fb ok" hidden></div><div class="row" style="margin-top:12px"><button type="button" class="btn teal sm" id="sv">Serve</button><button type="button" class="btn amber sm" id="rt2" disabled>Return (+1)</button><span class="stat">Rally <b id="rl">'+rally+'</b></span></div></div>'+
 '<div class="sec2"><h3>Your serve <span class="lbl">Two statements for your partner</span></h3><p class="note">'+esc(K.serve)+'</p><div class="row">'+sw('I made statement 1','sv1')+sw('I made statement 2','sv2')+'</div></div>'+twistBlock(K)+finalBlock(K)+tn(K.tn);
 var chosen='';
 $$('#tc button').forEach(function(b){b.onclick=function(){chosen=b.dataset.c;$$('#tc button').forEach(function(x){x.classList.toggle('good',x===b)});$('#rt2').disabled=false}});
 $('#sv').onclick=function(){i=(i+1)%deck.length;var d=deck[i];$('#ts').textContent=d;$('#tk').textContent='Statement '+(i+1);$('#tp').hidden=true;chosen='';$$('#tc button').forEach(function(x){x.classList.remove('good')});$('#rt2').disabled=true};
 $('#rt2').onclick=function(){rally++;S.flags.ral=rally;resp++;save();said(1);$('#rl').textContent=rally;var p=$('#tp');if(resp%2===0){p.hidden=false;p.textContent=K.personal}else p.hidden=true;$('#rt2').disabled=true};
 wireFinal(el)}
/* information gap (S06) */
function gap(el,K,head){var ci=0;
 el.innerHTML=head+'<div class="tabs" id="ct">'+K.cards.map(function(c,i){return '<button type="button" class="tab" data-i="'+i+'">Card '+(i+1)+(i?' · switch roles':'')+'</button>'}).join('')+'</div><div id="gc"></div>'+twistBlock(K)+finalBlock(K)+tn(K.tn);
 function draw(){var c=K.cards[ci],rev=S.flags['gr'+ci]||{};$$('#ct .tab').forEach(function(b,i){b.classList.toggle('on',i===ci)});
  $('#gc').innerHTML='<div class="appt"><h4>'+esc(c.title)+'</h4><div class="known">'+c.known.map(function(k){return '<div><b>'+esc(k.l)+'</b><span>'+esc(k.v)+'</span></div>'}).join('')+'</div><div class="miss2">'+c.hidden.map(function(h,i){return '<button type="button" class="gf'+(rev[i]?' open':'')+'" data-i="'+i+'"><b>'+esc(h.l)+'</b><span>'+(rev[i]?esc(h.v):'???')+'</span><em class="ct">Example question: '+esc(h.q)+'</em></button>'}).join('')+'</div></div><div class="starters"><b>Ask:</b>'+K.starters.map(function(s){return '<span>'+esc(s)+'</span>'}).join('')+'</div><div class="row"><span class="stat">Questions answered <b>'+Object.keys(rev).length+'</b>/'+c.hidden.length+'</span><button type="button" class="btn ghost sm" id="hc">Hide the card · summarize</button>'+sw('I summarized without looking','gs'+ci)+'</div><p class="note">Partner: tap a field only after a clear question. Do not show the card.</p>';
  $$('.gf',el).forEach(function(b){b.onclick=function(){var i=+b.dataset.i;if(rev[i])return;rev[i]=1;S.flags['gr'+ci]=rev;save();said(1);draw()}});
  $('#hc').onclick=function(){$('.appt').classList.toggle('blur');this.textContent=$('.appt').classList.contains('blur')?'Show the card':'Hide the card · summarize'};wireSw($('#gc'))}
 $$('#ct .tab').forEach(function(b){b.onclick=function(){ci=+b.dataset.i;draw()}});draw();wireFinal(el)}
/* 7 FEEDBACK + SECOND ATTEMPT */
function close(el){el.innerHTML='<div id="rs"></div>'}
function renderClose(){var C=D.close,el=$('#p-close .mount'),nextHref=C.next&&C.next.href?C.next.href:'index.html',hid=false;
 el.innerHTML='<p class="lead big">'+esc(D.can)+'</p>'+how(C.how)+
 '<div class="sec2"><h3>Second try <span class="lbl">Fewer prompts</span></h3><div class="model amber" id="m2"><b>Say</b> <span id="m2t">'+esc(C.second)+'</span> '+sayBtn(C.second)+'</div><div class="row"><button type="button" class="btn ghost sm" id="m2h">Hide the model</button>'+timerHTML(C.secondMin,true)+sw('I did my second try with fewer prompts','sec')+'</div></div>'+
 '<div class="sec2"><h3>I can… <span class="lbl">Tick honestly</span></h3><div class="grid2">'+C.check.map(function(c,i){return '<label class="chk"><input type="checkbox" data-c="'+i+'"'+(S.flags['c'+i]?' checked':'')+'>'+esc(c)+'</label>'}).join('')+'</div></div>'+
 '<div class="results"><div class="res"><b>'+S.said+'</b><span>sentences you said today</span></div><div class="res"><b id="capn">0</b><span>of '+C.check.length+' "I can…" ticked</span></div></div>'+
 '<div class="sec2"><h3>Close-out <span class="lbl">Say it aloud</span></h3><p class="big">'+esc(C.closeout)+'</p></div>'+
 '<div class="sec2"><h3>Before the next class <span class="lbl">2 to 4 minutes</span></h3><p class="big">'+esc(C.transfer)+'</p></div>'+
 '<div class="next"><img src="'+D.photos.c.src+'" alt="'+esc(D.photos.c.alt)+'"><div><div class="kicker">Next session</div><h3>'+esc(C.next.title)+'</h3><p>'+esc(C.next.text)+'</p><a class="btn amber sm" href="'+nextHref+'">'+(C.next.href?'Open next session':'Back to the course')+'</a></div></div>'+tn(C.tn);
 $$('.timer',el).forEach(wireTimer);wireSw(el);$('#m2h').onclick=function(){hid=!hid;$('#m2t').parentNode.classList.toggle('blur',hid);this.textContent=hid?'Show the model':'Hide the model'};
 function capn(){var n=0;$$('[data-c]',el).forEach(function(c){if(c.checked)n++});var e=$('#capn',el);if(e)e.textContent=n}
 $$('[data-c]',el).forEach(function(c){c.onchange=function(){if(c.checked)S.flags['c'+c.dataset.c]=1;else delete S.flags['c'+c.dataset.c];save();capn()}});capn()}
window.addEventListener('DOMContentLoaded',function(){toggles();build();said(0);var h=parseInt((location.hash||'#1').slice(1),10)||1;go(h-1,false)});
})();
