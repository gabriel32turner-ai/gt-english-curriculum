# CLAUDE.md — gt-english-curriculum

> Archivo de instrucciones permanentes de GT English Training.
> Claude Code lo lee automáticamente al iniciar sesión en esta carpeta.
> No hace falta mencionarlo ni pegarlo en cada prompt.

---

## Qué es este repo

Material de curriculum y herramientas HTML de GT English Training.
Todo se sirve por **GitHub Pages** (`gabriel32turner-ai.github.io/gt-english-curriculum/`)
y se conecta al **GT Portal** a través del **Cloudflare Worker existente**
(`gt-portal-worker.gabriel32turner.workers.dev`). **Notion** es la base de datos central.

---

## REGLAS DURAS (no romper nunca)

1. **Edición quirúrgica, no reescritura.** Para archivos existentes, cambia SOLO lo que se pide,
   con ediciones puntuales. NUNCA regeneres un archivo HTML completo salvo que yo lo pida
   explícitamente con la palabra **"reescribe completo"**.

2. **Una tarea por turno.** Ejecuta solo lo pedido. Cuando termines, **detente y reporta el cambio específico**.
   No avances a mejoras adicionales por iniciativa propia dentro del mismo turno.

3. **Imágenes: solo `images.pexels.com` o base64 embebido.** NUNCA `images.unsplash.com` (bloquea hotlinking).

4. **HTML autónomo.** Todas las herramientas son archivos standalone, sin dependencias de servidor.
   CSS y JS van dentro del mismo archivo. Sin `localStorage` / `sessionStorage`.

5. **Integraciones → siempre por el Cloudflare Worker existente.** No propongas Netlify, Vercel
   ni sistemas paralelos. Si algo necesita backend, pasa por el Worker.

6. **Cero datos inventados.** En reportes y material: solo lo que realmente se hizo. Sin filas de skills
   no cubiertas, sin placeholders, sin métricas falsas.

7. **Prohibido "value stack"** en cualquier output o sugerencia.

---

## Branding (tokens fijos)

- **Navy** `#0b1520` · **Gold** `#c9922a`
- Tipografías: **Cormorant Garamond** (display), **DM Sans** (texto), **DM Mono** (mono/código).
  En algunas tools también: Playfair Display / Instrument Serif.
- Logo: `GT_Logo_B___Speech_Dark.png`

---

## Cómo trabajar (método)

- Antes de un cambio de varios pasos, presenta primero un **plan corto** (qué archivos, qué cambia) y espera mi OK.
- Si el archivo es grande, **localiza el bloque exacto** a editar antes de tocar nada.
- Si falta info (qué archivo, qué tarjeta, qué clase), **pregunta ANTES de inventar**.
- Al cerrar, reporta el cambio concreto — ej. "cambié `.vp` → `.v-emoji` en 6 vocab cards (~líneas 120–180)".
  No reportes "actualicé el archivo".

---

## Cotizadores

- Cotizador **general** (cliente): SIEMPRE muestra los **3 planes simultáneos**. Nunca pre-selecciones ni ocultes opciones.
- Salida PDF vía `@media print`.
- Cotizador **corporativo** (interno): precios + IVA 16%; notas internas excluidas del PDF.

---

## Notion (si la tarea lo toca)

- El nombre de la propiedad tipo `title` **varía por base**: `Nombre` en `contenido`, `Empresa` en `leads`.
  Verifica con `notion-fetch` ANTES de escribir.
- La API solo **archiva**; el borrado permanente es manual en la UI de Notion.

---

## Material de clase nuevo

Estructura de sesión: **Show & Tell (5') → Vocab Injection (8') → Choose & Speak (10') →
Question Cards (12') → My Sentence (5')**.
Eje = **speaking**. Nunca gramática aislada. Incluir teacher notes + model answers + timing exacto.
