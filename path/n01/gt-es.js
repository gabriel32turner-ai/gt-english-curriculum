/* gt-es.js · Spanish for activity titles (Básico 1).
   - One "ES" chip next to every activity title: shows the title in Spanish, a second click returns to English.
   - One global switch: on pages 3-15 it follows "Ver explicación en español"; on pages 1-2 it is the bar above the stages.
   - Titles with no translation get no chip (never a placeholder). Teacher areas are left alone. */
(function(){
'use strict';
var D={
"Today’s mission": "La misión de hoy",
"You will": "Tú vas a",
"Situation": "Situación",
"Roles": "Roles",
"Done when": "Listo cuando",
"You say": "Tú dices",
"Connect": "Conectar",
"Hook": "Gancho",
"Vocabulary": "Vocabulario",
"Practice": "Práctica",
"Grammar": "Gramática",
"Functional language": "Lenguaje funcional",
"Speaking": "Hablar",
"Wrap-up": "Cierre",
"Warm-up": "Calentamiento",
"Words": "Palabras",
"Language": "Lenguaje",
"Reading": "Lectura",
"Listening": "Escucha",
"Read & Listen": "Leer y escuchar",
"Feedback": "Retroalimentación",
"Extra bank": "Banco extra",
"Quiz 1": "Quiz 1",
"Block 1": "Bloque 1",
"Sessions 1–9": "Sesiones 1–9",
"Welcome to English": "Bienvenido al inglés",
"Where Are You From?": "¿De dónde eres?",
"My Role Today": "Mi puesto hoy",
"Contact Match": "Une los contactos",
"People Around Me": "Las personas a mi alrededor",
"My Circle Has…": "Mi círculo tiene…",
"What Is This?": "¿Qué es esto?",
"First Connection Checkpoint": "Punto de control: primera conexión",
"Everyday Things": "Cosas de todos los días",
"Quiz 1 + My Bag, My Desk": "Quiz 1 + Mi mochila, mi escritorio",
"Spaces That Work": "Espacios que funcionan",
"Find It Fast": "Encuéntralo rápido",
"The Missing Workspace": "El espacio de trabajo perdido",
"A Visitor Needs Help": "Un visitante necesita ayuda",
"My Place": "Mi lugar",
"What it is for": "Para qué sirve",
"The three forms": "Las tres formas",
"Read it with me": "Léelo conmigo",
"The mistake we all make": "El error que todos cometemos",
"Decide and say it": "Decide y dilo",
"The roulette": "La ruleta",
"Build the sentence": "Arma la oración",
"Question set": "Serie de preguntas",
"Three rounds, same conversation": "Tres rondas, la misma conversación",
"With the model": "Con el modelo",
"Chips only": "Solo fichas",
"Nothing on screen": "Sin nada en pantalla",
"Baseline": "Punto de partida",
"You, with the model": "Tú, con el modelo",
"Emma from Toronto": "Emma, de Toronto",
"You, nothing on screen": "Tú, sin nada en pantalla",
"Answer in 5 seconds": "Responde en 5 segundos",
"Before the next class": "Antes de la próxima clase",
"Phrase chips": "Fichas de frases",
"Take 3 pieces to the next class": "Lleva 3 piezas a la próxima clase",
"Talk-time meter": "Medidor de tiempo de habla",
"The phrases": "Las frases",
"Use it or lose it": "Úsalo o piérdelo",
"What you can do today": "Lo que puedes hacer hoy",
"Your turn counter": "Tu contador de turnos",
"From hard to easy on the ear": "De difícil a fácil de oír",
"How sure are you about this week?": "¿Qué tan seguro estás de esta semana?",
"Match them": "Únelos",
"Name what you see": "Nombra lo que ves",
"One question only: what is happening here?": "Una sola pregunta: ¿qué pasa aquí?",
"One small win, out loud": "Un pequeño logro, en voz alta",
"Pick the picture": "Elige la imagen",
"Round 1 · 4 min · the model stays on screen": "Ronda 1 · 4 min · el modelo se queda en pantalla",
"Round 1 · 5 min · the model stays on screen": "Ronda 1 · 5 min · el modelo se queda en pantalla",
"The same conversation, three people, three rounds.": "La misma conversación, tres personas, tres rondas.",
"The same conversation, three rounds — and in the middle you stop being you.": "La misma conversación, tres rondas, y a la mitad dejas de ser tú.",
"A country or a city?": "¿País o ciudad?",
"Badges for today": "Insignias de hoy",
"Do you remember this photo?": "¿Recuerdas esta foto?",
"Find the one that is not English": "Encuentra la que no es inglés",
"From cold to warm": "De frío a cálido",
"It depends on who is asking": "Depende de quién pregunte",
"One question only: what are they telling each other?": "Una sola pregunta: ¿qué se dicen?",
"Tap the right flag": "Toca la bandera correcta",
"Ask your partner": "Pregunta a tu compañero",
"Be one person": "Interpreta a una persona",
"Before you listen": "Antes de escuchar",
"Before you read": "Antes de leer",
"Choose the clear message, then say it": "Elige el mensaje claro y luego dilo",
"A · Choose the clear message, then say it": "A · Elige el mensaje claro y luego dilo",
"B · Fix it, then say it": "B · Corrígelo y luego dilo",
"C · Look and say": "C · Mira y di",
"Clip 1 · main idea": "Clip 1 · idea principal",
"Clip 2 · details": "Clip 2 · detalles",
"Exit sentence": "Oración de salida",
"Exit ticket": "Boleto de salida",
"Fix it, then say it": "Corrígelo y luego dilo",
"If you have time left": "Si sobra tiempo",
"Listen": "Escucha",
"Listen again": "Escucha otra vez",
"Listen again · tell your partner": "Escucha otra vez · cuéntale a tu compañero",
"Listen once": "Escucha una vez",
"Look and say": "Mira y di",
"Next-use phrase": "Frase para usar pronto",
"Now you": "Ahora tú",
"Pick one phrase to use this week": "Elige una frase para usar esta semana",
"Questions you can use": "Preguntas que puedes usar",
"Read": "Lee",
"Say": "Dilo",
"Second try": "Segundo intento",
"Second try and feedback": "Segundo intento y retroalimentación",
"Talk about it": "Habla de eso",
"The conversation": "La conversación",
"Two successes": "Dos logros",
"Up to three upgrades": "Hasta tres mejoras",
"Use these": "Usa estas",
"What I can do now": "Lo que puedo hacer ahora",
"Your turn": "Tu turno",
"Same task. New condition.": "La misma tarea. Nueva condición.",
"Three words, three sentences": "Tres palabras, tres oraciones",
"Which word?": "¿Qué palabra?",
"Check it": "Compruébalo",
"Key and checks": "Respuestas y verificaciones",
"Business event, two rounds": "Evento de negocios, dos rondas",
"Eight words for your role and your work": "Ocho palabras para tu puesto y tu trabajo",
"Roles and jobs in the class chat": "Puestos y trabajos en el chat de la clase",
"Two meetings at the office": "Dos juntas en la oficina",
"What do you say first?": "¿Qué dices primero?",
"A new person says: “And you?” What do you say first?": "Una persona nueva dice: “And you?” ¿Qué dices primero?",
"Class chat · Tuesday": "Chat de la clase · martes",
"Event 1 · The business lunch": "Evento 1 · La comida de negocios",
"Listen to Rahul": "Escucha a Rahul",
"Same event. New condition.": "El mismo evento. Nueva condición.",
"Then say it all: six people, six sentences": "Ahora dilo todo: seis personas, seis oraciones",
"Your role today": "Tu puesto hoy",
"Your city": "Tu ciudad",
"Your question": "Tu pregunta",
"A new contact for the class": "Un contacto nuevo para la clase",
"A new person says: “Hi! Contact details, please?” What do you give first?": "Una persona nueva dice: “Hi! Contact details, please?” ¿Qué das primero?",
"The alphabet": "El alfabeto",
"Numbers 0 to 9, and “double”": "Números del 0 al 9 y “double”",
"Case 1 · The event": "Caso 1 · El evento",
"Case 1 · Two coworkers": "Caso 1 · Dos compañeros de trabajo",
"Class chat · Wednesday": "Chat de la clase · miércoles",
"Contact card, two rounds": "Tarjeta de contacto, dos rondas",
"Contact details in the class chat": "Datos de contacto en el chat de la clase",
"Eight words for contact details": "Ocho palabras para datos de contacto",
"Listen to Lucía": "Escucha a Lucía",
"Same cards. New condition.": "Las mismas tarjetas. Nueva condición.",
"Spell it · say the numbers · repair it": "Deletréalo · di los números · repáralo",
"Then check the contact card": "Luego revisa la tarjeta de contacto",
"Two exchanges of contact details": "Dos intercambios de datos de contacto",
"Case 1 · My team": "Caso 1 · Mi equipo",
"Choose one photo on your phone. Who is in the photo?": "Elige una foto en tu teléfono. ¿Quién está en la foto?",
"Class chat · My people at work": "Chat de la clase · Mi gente en el trabajo",
"Eight words for your people": "Ocho palabras para tu gente",
"Listen to the model": "Escucha el modelo",
"My people map, two rounds": "Mi mapa de personas, dos rondas",
"Photo time in the class chat": "Hora de fotos en el chat de la clase",
"Rahul’s photo": "La foto de Rahul",
"Tell it": "Cuéntalo",
"Useful pairs": "Pares útiles",
"Who is in your photo?": "¿Quién está en tu foto?",
"Who is in your circle?": "¿Quién está en tu círculo?",
"What does this person have?": "¿Qué tiene esta persona?",
"A photo in the break room": "Una foto en la sala de descanso",
"Case 1 · My circle": "Caso 1 · Mi círculo",
"Class chat · Thursday": "Chat de la clase · jueves",
"Eight words for your circle": "Ocho palabras para tu círculo",
"Listen to Emma": "Escucha a Emma",
"My circle, two rounds": "Mi círculo, dos rondas",
"Paola says: “I have a brother.” And you? What do you say?": "Paola dice: “I have a brother.” ¿Y tú? ¿Qué dices?",
"Same circle. New condition.": "El mismo círculo. Nueva condición.",
"Who has what? The class chat": "¿Quién tiene qué? El chat de la clase",
"A box at reception": "Una caja en recepción",
"Box 1 · Kenji at reception": "Caja 1 · Kenji en recepción",
"Class chat · Monday": "Chat de la clase · lunes",
"Eight things you touch every day": "Ocho cosas que tocas todos los días",
"Paola has a notebook, a key and a phone. And you? What is in your bag today?": "Paola tiene una libreta, una llave y un teléfono. ¿Y tú? ¿Qué hay en tu mochila hoy?",
"Same box. New condition.": "La misma caja. Nueva condición.",
"The box at reception · information gap": "La caja en recepción · vacío de información",
"Then say it all: six things, six sentences": "Ahora dilo todo: seis cosas, seis oraciones",
"What is in your bag today?": "¿Qué hay en tu mochila hoy?",
"Case 1 · New at the coworking": "Caso 1 · Nuevo en el coworking",
"Checkpoint evidence and feedback": "Evidencia del punto de control y retroalimentación",
"Coworking León · new people": "Coworking León · gente nueva",
"Eight words for a first meeting": "Ocho palabras para un primer encuentro",
"Mark says: “And you? What’s your name?” What do you say first?": "Mark dice: “And you? What’s your name?” ¿Qué dices primero?",
"New faces at breakfast": "Caras nuevas en el desayuno",
"Same breakfast. One detail changes.": "El mismo desayuno. Cambia un detalle.",
"Say it · Ask it · Fix it": "Dilo · Pregúntalo · Corrígelo",
"The welcome breakfast · one detail changes": "El desayuno de bienvenida · cambia un detalle",
"Who is new today?": "¿Quién es nuevo hoy?",
"Which table?": "¿Qué mesa?",
"How many?": "¿Cuántos?",
"One detail with “the”": "Un detalle con “the”",
"Describe the table · two rounds": "Describe la mesa · dos rondas",
"Eight things at work and at home": "Ocho cosas en el trabajo y en casa",
"How many screens?": "¿Cuántas pantallas?",
"Mark has two screens. And you? How many screens today?": "Mark tiene dos pantallas. ¿Y tú? ¿Cuántas pantallas hoy?",
"Moving day in Irapuato": "Día de mudanza en Irapuato",
"Team chat · Thursday": "Chat del equipo · jueves",
"Desk 1 · Lucía’s desk in Celaya": "Escritorio 1 · El escritorio de Lucía en Celaya",
"Emma has a bag, keys and a computer. And you? What is near you today?": "Emma tiene una mochila, llaves y una computadora. ¿Y tú? ¿Qué tienes cerca hoy?",
"Feedback and next step": "Retroalimentación y siguiente paso",
"Help me find my things · video call": "Ayúdame a encontrar mis cosas · videollamada",
"My bag, my desk": "Mi mochila, mi escritorio",
"Near and far, one and many": "Cerca y lejos, uno y muchos",
"Quiz 1 · Block 1 · Sessions 1–9": "Quiz 1 · Bloque 1 · Sesiones 1–9",
"Quiz 1 · Sessions 1–9": "Quiz 1 · Sesiones 1–9",
"Your result": "Tu resultado",
"Your task": "Tu tarea",
"A good place to work. What is number one for you?": "Un buen lugar para trabajar. ¿Qué es lo más importante para ti?",
"A new coworking space": "Un nuevo espacio de coworking",
"Be the owner": "Sé el dueño",
"Case 1 · Two coworking spaces": "Caso 1 · Dos espacios de coworking",
"Choose your workspace · two rounds": "Elige tu espacio de trabajo · dos rondas",
"Eight places in a building": "Ocho lugares en un edificio",
"The perfect place to work": "El lugar perfecto para trabajar",
"The visitor needs…": "El visitante necesita…",
"Where is it?": "¿Dónde está?",
"Be Mark": "Sé Mark",
"Five small words and three places": "Cinco palabras pequeñas y tres lugares",
"Help the visitor · find it fast": "Ayuda al visitante · encuéntralo rápido",
"Kenji’s first morning": "La primera mañana de Kenji",
"Listen to Mark": "Escucha a Mark",
"Notes on Kenji’s desk · Monday": "Notas en el escritorio de Kenji · lunes",
"Where are my keys?": "¿Dónde están mis llaves?",
"Where are your keys every day?": "¿Dónde están tus llaves todos los días?",
"Be Paola": "Sé Paola",
"Confirm it": "Confírmalo",
"Coworking Querétaro · four rooms": "Coworking Querétaro · cuatro salas",
"Eight things on a workspace map": "Ocho cosas en un mapa del espacio de trabajo",
"Four rooms, one coworking": "Cuatro salas, un coworking",
"Map 1 · Room 3 · coworking in Querétaro": "Mapa 1 · Sala 3 · coworking en Querétaro",
"The missing workspace · information gap": "El espacio de trabajo perdido · vacío de información",
"Three things in your room": "Tres cosas en tu sala",
"What is in your workspace right now?": "¿Qué hay en tu espacio de trabajo ahora?",
"A visitor arrives. What do you say first?": "Llega un visitante. ¿Qué dices primero?",
"Bajío Center · Irapuato · visitor card": "Bajío Center · Irapuato · tarjeta de visitante",
"Be the host": "Sé el anfitrión",
"Case 1 · Bajío Center, Irapuato": "Caso 1 · Bajío Center, Irapuato",
"Eight words to receive a person": "Ocho palabras para recibir a una persona",
"Somebody is at the door": "Alguien está en la puerta",
"The card at the reception desk": "La tarjeta en el escritorio de recepción",
"Thirty seconds to welcome a visitor": "Treinta segundos para recibir a un visitante",
"Welcome a person": "Da la bienvenida a una persona",
"Eight words to describe your place": "Ocho palabras para describir tu lugar",
"Four people, four places": "Cuatro personas, cuatro lugares",
"Four places, one is yours": "Cuatro lugares, uno es el tuyo",
"Our places · a note from each person": "Nuestros lugares · una nota de cada persona",
"Say them from memory": "Dilas de memoria",
"Six sentences about your place": "Seis oraciones sobre tu lugar",
"Which place is YOUR place today?": "¿Cuál es TU lugar hoy?",
"Welcome and Orient": "Da la bienvenida y orienta",
"A first day at a new office": "Un primer día en una oficina nueva",
"Mark, office host": "Mark, anfitrión de la oficina",
"You arrive at a new office. What do you say first?": "Llegas a una oficina nueva. ¿Qué dices primero?",
"Eight words for a first visit": "Ocho palabras para una primera visita",
"Ask it · Tell it": "Pregunta · Responde",
"Rahul’s first visit": "La primera visita de Rahul",
"Mark’s cards for Rahul · Monday": "Las tarjetas de Mark para Rahul · lunes",
"Welcome and orient · secret objective": "Bienvenida y orientación · objetivo secreto",
"Office · Mark’s company in Celaya": "Oficina · la empresa de Mark en Celaya",
"Only you can see this card.": "Solo tú puedes ver esta tarjeta.",
"Questions and answers you can use": "Preguntas y respuestas que puedes usar"
};
var KEEP=/^(?:[A-Za-z]|\d{1,2}|\d+\s?(?:′|min|MIN))$/;
var TITLE='h1,h2,h3,h4,.panel .card > b';
var LABEL='.mcard small,.lab,.ag,#nav a,.steps button,.stepper button';
var EXCL='.t-only,.tnote,details,.vc,[data-mc],.teacher,.pack,[lang=es],.t,.gtes-bar,.es';
var all=[],G={on:false},seen=new WeakSet();

function tnodes(el){return Array.prototype.filter.call(el.childNodes,function(n){return n.nodeType===3&&n.nodeValue.trim()})}
function keyOf(el){var t=tnodes(el);return t.length?t.map(function(n){return n.nodeValue}).join(' ').replace(/\s+/g,' ').trim():''}
function tr(t){
  if(Object.prototype.hasOwnProperty.call(D,t))return D[t];
  var m=/^Before Session (\d+)$/.exec(t);if(m)return 'Antes de la sesión '+m[1];
  var p=t.split(' · ');if(p.length<2)return null;
  var o=[];for(var i=0;i<p.length;i++){
    if(KEEP.test(p[i]))o.push(p[i]);
    else if(Object.prototype.hasOwnProperty.call(D,p[i]))o.push(D[p[i]]);
    else return null}
  return o.join(' · ')}

function setLang(rec,on){
  var f=rec.nodes[0];
  rec.nodes.forEach(function(n,i){n.node.nodeValue=on?(i===0?n.lead+rec.es+n.trail:''):n.orig});
  rec.on=on;
  if(rec.chip){rec.chip.textContent=on?'EN':'ES';rec.chip.setAttribute('aria-pressed',String(on));
    rec.chip.setAttribute('aria-label',on?'See this title in English':'Ver este título en español')}}

function register(el,chip){
  if(seen.has(el))return;seen.add(el);
  var k=keyOf(el);if(!k)return;
  var es=tr(k);if(!es){(window.GTES_MISSING=window.GTES_MISSING||{})[k]=(el.tagName.toLowerCase());return}
  var rec={el:el,es:es,on:false,chip:null,nodes:tnodes(el).map(function(n){var v=n.nodeValue;return{node:n,orig:v,lead:/^\s*/.exec(v)[0],trail:/\s*$/.exec(v)[0]}})};
  if(chip){var b=document.createElement('button');b.type='button';b.className='gtes';b.setAttribute('aria-pressed','false');b.textContent='ES';
    b.setAttribute('aria-label','Ver este título en español');
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();setLang(rec,!rec.on)});
    el.appendChild(b);rec.chip=b}
  all.push(rec);if(G.on)setLang(rec,true)}

function scan(){
  Array.prototype.forEach.call(document.querySelectorAll(TITLE),function(el){if(!el.closest(EXCL)&&!el.matches(EXCL))register(el,true)});
  Array.prototype.forEach.call(document.querySelectorAll(LABEL),function(el){if(!el.closest(EXCL)&&!el.matches(EXCL))register(el,false)})}

function setAll(on){G.on=on;all.forEach(function(r){setLang(r,on)});
  var g=document.getElementById('gtesAll');if(g){g.setAttribute('aria-pressed',String(on));g.textContent=on?'Titles in English':'Títulos en español'}}

function css(){var s=document.createElement('style');s.textContent=
 '.gtes{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;min-width:36px;min-height:28px;margin:0 0 0 12px;padding:0 10px;border:2px solid currentColor;border-radius:999px;background:transparent;color:inherit;font-family:inherit;font-weight:800;font-size:12px;line-height:1;letter-spacing:.04em;text-transform:none;white-space:nowrap;cursor:pointer;vertical-align:middle;opacity:.85}'+
 '.gtes:hover{opacity:1}.gtes:focus-visible,.gtes-all:focus-visible{outline:3px solid #FF5A36;outline-offset:2px}'+
 '.gtes-bar{display:flex;justify-content:flex-end;margin:0 0 12px}'+
 '.gtes-all{min-height:44px;padding:0 18px;border:2px solid #0B0E24;border-radius:999px;background:#fff;color:#0B0E24;font-family:inherit;font-weight:800;font-size:15px;cursor:pointer}'+
 '.gtes-all[aria-pressed=true]{background:#0B0E24;color:#fff}';
 document.head.appendChild(s)}

function bar(){
  var native=document.getElementById('tgES');
  if(native){ /* pages 3-15: follow the existing Spanish switch */
    var sync=function(){setAll(document.body.classList.contains('es-on'))};
    new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});sync();return}
  var host=document.querySelector('main .wrap')||document.querySelector('main');if(!host)return;
  var d=document.createElement('div');d.className='gtes-bar';
  d.innerHTML='<button type="button" class="gtes-all" id="gtesAll" aria-pressed="false">Títulos en español</button>';
  host.insertBefore(d,host.firstChild);
  d.firstChild.addEventListener('click',function(){setAll(!G.on)})}

function init(){css();scan();bar();
  var t=null;new MutationObserver(function(){clearTimeout(t);t=setTimeout(scan,60)}).observe(document.body,{childList:true,subtree:true})}
window.GTES={scan:scan,setAll:setAll,count:function(){return all.length},missing:function(){return window.GTES_MISSING||{}}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
