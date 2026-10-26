/* ==========================================================================
   Ilustraciones SVG originales de la cartilla.
   Se insertan "en línea" (no como <img>) para que respondan al control
   "Reducir animaciones" y usen las variables de color de styles.css.
   Ninguna escena reproduce estímulos ni ejercicios reales de las pruebas.
   ========================================================================== */
const ILUS = (() => {
  const wrap = (vb, label, inner) =>
    `<svg viewBox="${vb}" role="img" aria-label="${label}" focusable="false" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

  /* Persona: mujer mayor, busto (cabello canoso recogido) */
  const woman = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-56 190V150c0-50 22-84 56-84s56 34 56 84v40z" fill="var(--lav-400)"/>
    <path d="M-13 66q13 16 26 0l-3-14h-20z" fill="var(--skin)"/>
    <circle cx="0" cy="34" r="28" fill="var(--skin)"/>
    <circle cx="0" cy="-3" r="12" fill="#d9d9e4"/>
    <path d="M-29 34c-2-22 12-34 29-34s31 12 29 34c-6-14-14-20-29-20s-23 6-29 20z" fill="#d9d9e4"/>
    <circle cx="-10" cy="36" r="2.8" fill="var(--ink)"/><circle cx="10" cy="36" r="2.8" fill="var(--ink)"/>
    <ellipse cx="-17" cy="46" rx="5" ry="3" fill="var(--pink-300)" opacity=".85"/>
    <ellipse cx="17" cy="46" rx="5" ry="3" fill="var(--pink-300)" opacity=".85"/>
    <path d="M-8 47q8 7 16 0" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M-20 98q20 12 40 0" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>
  </g>`;

  /* Cerebro amigable */
  const brain = (x, y, s = 1, i = 5) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="ill-item bob" style="--i:${i}">
    <g fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="4">
      <circle cx="-20" cy="6" r="24"/><circle cx="20" cy="6" r="24"/><circle cx="-12" cy="-16" r="20"/><circle cx="14" cy="-16" r="20"/><circle cx="0" cy="22" r="20"/>
    </g>
    <g fill="var(--pink-300)">
      <circle cx="-20" cy="6" r="22"/><circle cx="20" cy="6" r="22"/><circle cx="-12" cy="-16" r="18"/><circle cx="14" cy="-16" r="18"/><circle cx="0" cy="22" r="18"/>
    </g>
    <path d="M0 -32v24M-30 -6q8-8 16 0M14 -8q8 8 16 0M-34 16q8 6 14 0M20 18q8 6 14 0" fill="none" stroke="var(--pink-700)" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <circle cx="-9" cy="8" r="3.2" fill="var(--ink)"/><circle cx="9" cy="8" r="3.2" fill="var(--ink)"/>
    <path d="M-8 17q8 8 16 0" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="-17" cy="16" rx="5" ry="3" fill="#fff" opacity=".6"/><ellipse cx="17" cy="16" rx="5" ry="3" fill="#fff" opacity=".6"/>
  </g></g>`;

  /* Iconos para burbujas (caja de 76 x 76) */
  const I = {
    plate: `<circle cx="30" cy="40" r="19" fill="var(--yellow-100)" stroke="var(--yellow-700)" stroke-width="3"/><circle cx="30" cy="40" r="10" fill="none" stroke="var(--yellow-700)" stroke-width="2"/><ellipse cx="60" cy="26" rx="5" ry="8" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="2.5"/><path d="M60 34v24" stroke="var(--yellow-700)" stroke-width="3" stroke-linecap="round"/>`,
    shirt: `<path d="M22 24l12-6c2 5 8 5 10 0l12 6 6 12-10 5v21H26V41l-10-5z" fill="var(--blue-300)" stroke="var(--blue-700)" stroke-width="2.5" stroke-linejoin="round"/>`,
    brush: `<g transform="rotate(-28 38 40)"><rect x="10" y="44" width="46" height="9" rx="4" fill="var(--teal-300)" stroke="var(--teal-700)" stroke-width="2.5"/><rect x="52" y="34" width="14" height="14" rx="3" fill="#fff" stroke="var(--teal-700)" stroke-width="2.5"/><path d="M55 34v-6M59 34v-6M63 34v-6" stroke="var(--teal-700)" stroke-width="2.5" stroke-linecap="round"/></g>`,
    feet: `<ellipse cx="28" cy="50" rx="8" ry="12" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="2.5"/><ellipse cx="49" cy="30" rx="8" ry="12" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="2.5"/>`,
    phone: `<rect x="24" y="12" width="28" height="52" rx="7" fill="var(--blue-100)" stroke="var(--blue-700)" stroke-width="3"/><circle cx="38" cy="56" r="2.5" fill="var(--blue-700)"/><path d="M31 26h14M31 34h14M31 42h8" stroke="var(--blue-700)" stroke-width="2.5" stroke-linecap="round"/>`,
    basket: `<circle cx="30" cy="30" r="7" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="2"/><circle cx="47" cy="29" r="7" fill="var(--teal-300)" stroke="var(--teal-700)" stroke-width="2"/><path d="M14 36h48l-6 26H20z" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="3" stroke-linejoin="round"/><path d="M26 46v8M38 46v8M50 46v8" stroke="var(--yellow-700)" stroke-width="2.5" stroke-linecap="round"/>`,
    coins: `<ellipse cx="38" cy="54" rx="19" ry="7" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="2.5"/><ellipse cx="38" cy="45" rx="19" ry="7" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="2.5"/><ellipse cx="38" cy="36" rx="19" ry="7" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="2.5"/><ellipse cx="38" cy="27" rx="19" ry="7" fill="var(--yellow-100)" stroke="var(--yellow-700)" stroke-width="2.5"/>`,
    pillbox: `<rect x="10" y="26" width="56" height="28" rx="8" fill="var(--lav-100)" stroke="var(--lav-700)" stroke-width="3"/><path d="M24 26v28M38 26v28M52 26v28" stroke="var(--lav-700)" stroke-width="2.5"/><circle cx="17" cy="40" r="3.5" fill="var(--pink-300)"/><circle cx="45" cy="40" r="3.5" fill="var(--teal-300)"/><circle cx="59" cy="40" r="3.5" fill="var(--yellow-300)"/>`,
    sunCloud: `<circle cx="28" cy="28" r="11" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="2.5"/><path d="M28 8v5M10 28h5M15 15l4 4M41 15l-4 4" stroke="var(--yellow-700)" stroke-width="2.5" stroke-linecap="round"/><path d="M26 62a10 10 0 0 1 1-19 14 14 0 0 1 27 4 8 8 0 0 1 0 15z" fill="#fff" stroke="var(--blue-700)" stroke-width="3" stroke-linejoin="round"/>`,
    heart: `<path d="M38 62C12 46 17 20 30 20c5 0 8 3 8 7 0-4 3-7 8-7 13 0 18 26-8 42z" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="3" stroke-linejoin="round"/>`,
    tea: `<path d="M18 36h32v14a14 14 0 0 1-14 14h-4a14 14 0 0 1-14-14z" fill="#fff" stroke="var(--teal-700)" stroke-width="3"/><path d="M50 40h4a6 6 0 0 1 0 12h-4" fill="none" stroke="var(--teal-700)" stroke-width="3"/><path d="M28 30c-2-4 2-6 0-10M38 30c-2-4 2-6 0-10" fill="none" stroke="var(--teal-500)" stroke-width="3" stroke-linecap="round"/>`,
    rain: `<path d="M20 44a10 10 0 0 1 1-19 14 14 0 0 1 27 4 8 8 0 0 1 0 15z" fill="var(--blue-100)" stroke="var(--blue-700)" stroke-width="3" stroke-linejoin="round"/><path d="M26 52l-3 8M38 52l-3 8M50 52l-3 8" stroke="var(--blue-700)" stroke-width="3" stroke-linecap="round"/>`,
    wave: `<path d="M8 40q8-18 15 0t15 0 15 0 15 0" fill="none" stroke="var(--pink-700)" stroke-width="4.5" stroke-linecap="round"/><path d="M8 54q8-12 15 0t15 0 15 0 15 0" fill="none" stroke="var(--pink-300)" stroke-width="4.5" stroke-linecap="round"/>`,
    tension: `<circle cx="38" cy="38" r="7" fill="none" stroke="var(--lav-700)" stroke-width="3.5"/><circle cx="38" cy="38" r="15" fill="none" stroke="var(--lav-700)" stroke-width="3.5" stroke-dasharray="62 32"/><circle cx="38" cy="38" r="23" fill="none" stroke="var(--lav-400)" stroke-width="3.5" stroke-dasharray="84 60"/>`,
    calendar: `<rect x="14" y="16" width="48" height="46" rx="8" fill="#fff" stroke="var(--blue-700)" stroke-width="3"/><path d="M14 24a8 8 0 0 1 8-8h32a8 8 0 0 1 8 8v8H14z" fill="var(--blue-300)"/><circle cx="28" cy="44" r="3" fill="var(--blue-700)"/><circle cx="38" cy="44" r="3" fill="var(--blue-700)"/><circle cx="48" cy="44" r="3" fill="var(--pink-700)"/><circle cx="28" cy="54" r="3" fill="var(--blue-700)"/><circle cx="38" cy="54" r="3" fill="var(--blue-700)"/>`,
    clock: `<circle cx="38" cy="38" r="24" fill="#fff" stroke="var(--blue-700)" stroke-width="3.5"/><path d="M38 22v17l11 7" fill="none" stroke="var(--blue-700)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    speech: `<path d="M12 18h52v32H36l-12 12V50H12z" fill="var(--lav-100)" stroke="var(--lav-700)" stroke-width="3" stroke-linejoin="round"/><circle cx="28" cy="34" r="3.2" fill="var(--lav-700)"/><circle cx="38" cy="34" r="3.2" fill="var(--lav-700)"/><circle cx="48" cy="34" r="3.2" fill="var(--lav-700)"/>`,
    words: `<rect x="14" y="40" width="48" height="22" rx="6" fill="var(--blue-100)" stroke="var(--blue-700)" stroke-width="2.5"/><rect x="14" y="26" width="48" height="22" rx="6" fill="var(--yellow-100)" stroke="var(--yellow-700)" stroke-width="2.5"/><rect x="14" y="12" width="48" height="22" rx="6" fill="var(--pink-100)" stroke="var(--pink-700)" stroke-width="2.5"/><path d="M24 23h26" stroke="var(--pink-700)" stroke-width="3" stroke-linecap="round"/>`,
    clipboard: `<rect x="16" y="14" width="44" height="52" rx="7" fill="#fff" stroke="var(--teal-700)" stroke-width="3"/><rect x="28" y="9" width="20" height="10" rx="4" fill="var(--teal-300)" stroke="var(--teal-700)" stroke-width="2.5"/><path d="M24 32l4 4 7-8M24 48l4 4 7-8M42 33h10M42 49h10" fill="none" stroke="var(--teal-700)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    stop: `<polygon points="28,13 48,13 63,28 63,48 48,63 28,63 13,48 13,28" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="3" stroke-linejoin="round"/><rect x="25" y="34" width="26" height="8" rx="3" fill="#fff"/>`,
    fork: `<path d="M38 66V42M38 42L20 20M38 42L58 20" fill="none" stroke="var(--teal-700)" stroke-width="5" stroke-linecap="round"/><path d="M12 28l8-10 10 5M64 28l-6-10-10 4" fill="none" stroke="var(--teal-500)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    bulb: `<path d="M38 10a18 18 0 0 0-10 33v8h20v-8a18 18 0 0 0-10-33z" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="3" stroke-linejoin="round"/><path d="M29 59h18M32 66h12" stroke="var(--yellow-700)" stroke-width="3" stroke-linecap="round"/>`,
    book: `<path d="M38 22c-8-6-18-6-26-2v38c8-4 18-4 26 2 8-6 18-6 26-2V20c-8-4-18-4-26 2z" fill="#fff" stroke="var(--lav-700)" stroke-width="3" stroke-linejoin="round"/><path d="M38 22v38" stroke="var(--lav-700)" stroke-width="3"/><path d="M18 32q8-3 14 0M18 42q8-3 14 0M44 32q8-3 14 0M44 42q8-3 14 0" fill="none" stroke="var(--lav-400)" stroke-width="2.5" stroke-linecap="round"/>`,
    puzzle: `<path d="M16 26h14a6 6 0 1 1 12 0h14v14a6 6 0 1 0 0 12v12H16z" fill="var(--teal-300)" stroke="var(--teal-700)" stroke-width="3" stroke-linejoin="round"/>`,
    numbers: `<rect x="10" y="22" width="56" height="34" rx="9" fill="var(--yellow-100)" stroke="var(--yellow-700)" stroke-width="3"/><text x="38" y="47" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="var(--yellow-700)">1 2 3</text>`,
    key: `<circle cx="26" cy="38" r="13" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="3"/><circle cx="26" cy="38" r="4.5" fill="#fff"/><path d="M39 38h24M55 38v10M62 38v7" fill="none" stroke="var(--yellow-700)" stroke-width="4" stroke-linecap="round"/>`,
    moon: `<path d="M50 14a24 24 0 1 0 14 40A20 20 0 0 1 50 14z" fill="var(--lav-300)" stroke="var(--lav-700)" stroke-width="3" stroke-linejoin="round"/><circle cx="56" cy="22" r="3" fill="var(--yellow-300)"/><circle cx="64" cy="34" r="2" fill="var(--yellow-300)"/>`,
    people: `<circle cx="26" cy="28" r="10" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="3"/><path d="M8 62c0-14 8-22 18-22s18 8 18 22z" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="3" stroke-linejoin="round"/><circle cx="52" cy="32" r="8" fill="var(--blue-300)" stroke="var(--blue-700)" stroke-width="3"/><path d="M40 62c0-11 6-18 12-18s14 7 14 18z" fill="var(--blue-300)" stroke="var(--blue-700)" stroke-width="3" stroke-linejoin="round"/>`,
    cross: `<rect x="14" y="14" width="48" height="48" rx="14" fill="#fff" stroke="var(--teal-700)" stroke-width="3"/><path d="M38 24v28M24 38h28" stroke="var(--teal-500)" stroke-width="9" stroke-linecap="round"/>`,
    ear: `<path d="M38 12c-12 0-20 8-20 20 0 8 4 12 6 18 2 6 0 12 8 12 6 0 8-6 8-10 0-8 12-10 12-24 0-10-6-16-14-16z" fill="var(--pink-100)" stroke="var(--pink-700)" stroke-width="3" stroke-linejoin="round"/><path d="M32 28c0-6 12-6 12 2 0 6-8 8-8 14" fill="none" stroke="var(--pink-700)" stroke-width="3" stroke-linecap="round"/>`,
    one: `<circle cx="38" cy="38" r="26" fill="var(--blue-100)" stroke="var(--blue-700)" stroke-width="3"/><path d="M32 30l8-6v30M30 54h20" fill="none" stroke="var(--blue-700)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
    walk: `<circle cx="40" cy="16" r="7" fill="var(--teal-300)" stroke="var(--teal-700)" stroke-width="3"/><path d="M40 26l-6 18 12 8 4 14M34 44l-10 16M38 32l-12 6M42 32l12 10" fill="none" stroke="var(--teal-700)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
    brain: `<g fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="3"><circle cx="28" cy="40" r="16"/><circle cx="48" cy="40" r="16"/><circle cx="32" cy="26" r="14"/><circle cx="46" cy="26" r="14"/><circle cx="38" cy="50" r="13"/></g><g fill="var(--pink-300)"><circle cx="28" cy="40" r="14.5"/><circle cx="48" cy="40" r="14.5"/><circle cx="32" cy="26" r="12.5"/><circle cx="46" cy="26" r="12.5"/><circle cx="38" cy="50" r="11.5"/></g><circle cx="32" cy="40" r="2.4" fill="var(--ink)"/><circle cx="44" cy="40" r="2.4" fill="var(--ink)"/><path d="M33 47q5 5 10 0" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/>`,
    eye: `<path d="M8 38q30-30 60 0-30 30-60 0z" fill="#fff" stroke="var(--blue-700)" stroke-width="3"/><circle cx="38" cy="38" r="10" fill="var(--blue-500)"/><circle cx="42" cy="34" r="3" fill="#fff"/>`,
    shelf: `<rect x="12" y="14" width="52" height="52" rx="6" fill="#fbf1e1" stroke="var(--wood)" stroke-width="3"/><path d="M12 40h52" stroke="var(--wood)" stroke-width="3"/><rect x="18" y="22" width="7" height="18" rx="2" fill="var(--pink-300)"/><rect x="28" y="24" width="7" height="16" rx="2" fill="var(--blue-300)"/><rect x="38" y="20" width="7" height="20" rx="2" fill="var(--yellow-300)"/><rect x="20" y="48" width="7" height="18" rx="2" fill="var(--lav-300)"/><rect x="30" y="46" width="7" height="20" rx="2" fill="var(--teal-300)"/>`,
    house: `<path d="M10 38L38 14l28 24" fill="none" stroke="var(--pink-700)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 34v28h40V34L38 18z" fill="var(--yellow-100)" stroke="var(--yellow-700)" stroke-width="3" stroke-linejoin="round"/><rect x="32" y="44" width="12" height="18" rx="3" fill="var(--teal-300)" stroke="var(--teal-700)" stroke-width="2.5"/>`,
    alert: `<path d="M38 10L68 62H8z" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="3.5" stroke-linejoin="round"/><path d="M38 28v18" stroke="var(--pink-700)" stroke-width="5" stroke-linecap="round"/><circle cx="38" cy="54" r="3" fill="var(--pink-700)"/>`,
    chat: `<path d="M12 18h52v32H36l-12 12V50H12z" fill="var(--yellow-100)" stroke="var(--yellow-700)" stroke-width="3" stroke-linejoin="round"/><path d="M24 30h28M24 38h18" stroke="var(--yellow-700)" stroke-width="3" stroke-linecap="round"/>`,
    breath: `<path d="M10 30q14-12 28 0t28 0M10 46q14-12 28 0t28 0" fill="none" stroke="var(--teal-500)" stroke-width="5" stroke-linecap="round"/>`,
    star: `<path d="M38 10l8 18 20 2-15 14 5 20-18-11-18 11 5-20L10 30l20-2z" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="3" stroke-linejoin="round"/>`
  };
  /* Icono suelto sobre fondo redondeado, reutilizable en tarjetas */
  const icon = (k, label = '', bg = '#ffffff') =>
    `<svg viewBox="0 0 76 76" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'} focusable="false" xmlns="http://www.w3.org/2000/svg"><rect width="76" height="76" rx="22" fill="${bg}"/>${I[k]}</svg>`;

  const POS = [[16, 22], [16, 150], [308, 22], [308, 150]];
  const bub = (n, k, i) => `<g transform="translate(${POS[n][0]} ${POS[n][1]})"><g class="ill-item" style="--i:${i}"><rect width="76" height="76" rx="22" fill="#fff" opacity=".96"/>${I[k]}</g></g>`;
  const scene = (bg, label, keys) => wrap('0 0 400 300', label,
    `<rect width="400" height="300" fill="${bg}"/><circle cx="200" cy="175" r="118" fill="#fff" opacity=".5"/>` +
    `<g class="ill-item" style="--i:0">${woman(200, 82, 1.25)}</g>` + keys.map((k, n) => bub(n, k, n + 1)).join(''));

  /* Escenas de las siete pruebas */
  const pruebas = {
    barthel: scene('var(--teal-100)', 'Mujer mayor rodeada de dibujos de actividades básicas: comer, vestirse, cepillarse los dientes y caminar', ['plate', 'shirt', 'brush', 'feet']),
    lawton: scene('var(--yellow-100)', 'Mujer mayor rodeada de dibujos de actividades cotidianas: teléfono, canasta de compras, monedas y pastillero', ['phone', 'basket', 'coins', 'pillbox']),
    yesavage: scene('var(--lav-100)', 'Mujer mayor rodeada de dibujos que representan el estado de ánimo: sol con nube, corazón y taza de té', ['sunCloud', 'heart', 'tea', 'calendar']),
    dass: scene('var(--pink-100)', 'Mujer mayor rodeada de tres símbolos: nube con lluvia (ánimo), ondas (inquietud) y círculos de tensión (estrés)', ['rain', 'wave', 'tension', 'tea']),
    neuropsi: scene('var(--blue-100)', 'Mujer mayor rodeada de calendario, reloj, globo de diálogo y tarjetas de palabras', ['calendar', 'clock', 'speech', 'words']),
    banfe: scene('var(--teal-100)', 'Mujer mayor rodeada de lista de tareas, señal de alto, camino que se bifurca y una idea', ['clipboard', 'stop', 'fork', 'bulb']),
    wais: scene('var(--lav-100)', 'Mujer mayor rodeada de libro abierto, bombilla, pieza de rompecabezas y números', ['book', 'bulb', 'puzzle', 'numbers'])
  };

  /* Portada */
  const agenda = `<g transform="translate(30 186) rotate(-8)"><g class="ill-item" style="--i:2">
      <rect x="6" y="4" width="112" height="146" rx="14" fill="var(--teal-500)"/>
      <rect x="14" width="104" height="146" rx="12" fill="#fff" stroke="var(--teal-700)" stroke-width="3"/>
      <path d="M34 38h66M34 60h66M34 82h44" stroke="var(--blue-300)" stroke-width="6" stroke-linecap="round"/>
      <circle cx="96" cy="112" r="11" fill="var(--pink-300)"/><path d="M90 112l4 4 7-8" fill="none" stroke="var(--pink-700)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="14" cy="24" r="6" fill="var(--teal-700)"/><circle cx="14" cy="64" r="6" fill="var(--teal-700)"/><circle cx="14" cy="104" r="6" fill="var(--teal-700)"/></g></g>`;
  const fotos = `<g transform="translate(398 40) rotate(6)"><g class="ill-item" style="--i:3">
      <rect width="104" height="82" rx="10" fill="#fff" stroke="var(--pink-700)" stroke-width="3"/>
      <rect x="10" y="10" width="84" height="62" rx="6" fill="var(--blue-100)"/><circle cx="32" cy="30" r="9" fill="var(--yellow-300)"/>
      <path d="M10 72l26-26 20 17 16-13 22 22z" fill="var(--teal-300)"/></g></g>
    <g transform="translate(440 140) rotate(-5)"><g class="ill-item" style="--i:4">
      <rect width="80" height="66" rx="10" fill="#fff" stroke="var(--lav-700)" stroke-width="3"/>
      <rect x="8" y="8" width="64" height="50" rx="6" fill="var(--lav-100)"/>
      <path d="M40 46C26 38 29 24 36 24c3 0 4 2 4 4 0-2 1-4 4-4 7 0 10 14-4 22z" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="2"/></g></g>`;
  const libros = `<g transform="translate(396 316)"><g class="ill-item" style="--i:5">
      <rect x="0" y="62" width="136" height="28" rx="7" fill="var(--lav-300)" stroke="var(--lav-700)" stroke-width="3"/>
      <rect x="10" y="32" width="114" height="28" rx="7" fill="var(--pink-300)" stroke="var(--pink-700)" stroke-width="3"/>
      <rect x="4" y="2" width="122" height="28" rx="7" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="3"/>
      <path d="M16 76h40M26 46h40M18 16h40" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".8"/></g></g>`;
  const llaves = `<g transform="translate(44 352)"><g class="ill-item" style="--i:6">
      <circle cx="30" cy="22" r="16" fill="none" stroke="var(--ink)" stroke-width="4"/>
      <g transform="rotate(30 30 38)"><rect x="24" y="34" width="12" height="52" rx="6" fill="var(--yellow-300)" stroke="var(--yellow-700)" stroke-width="3"/><circle cx="30" cy="44" r="4" fill="#fff"/><path d="M36 70h10M36 80h8" stroke="var(--yellow-700)" stroke-width="4" stroke-linecap="round"/></g>
      <g transform="rotate(-24 30 38)"><rect x="24" y="34" width="12" height="46" rx="6" fill="var(--teal-300)" stroke="var(--teal-700)" stroke-width="3"/><circle cx="30" cy="44" r="4" fill="#fff"/><path d="M24 66h-9M24 76h-7" stroke="var(--teal-700)" stroke-width="4" stroke-linecap="round"/></g></g></g>`;
  const portada = wrap('0 0 560 460', 'Portada: una mujer mayor sonriente con una agenda, fotografías, libros, llaves y un cerebro amigable a su alrededor',
    `<ellipse cx="280" cy="250" rx="250" ry="200" fill="var(--teal-100)"/><ellipse cx="300" cy="270" rx="190" ry="160" fill="#fff" opacity=".55"/>
     <circle cx="70" cy="70" r="20" fill="var(--yellow-300)" opacity=".7"/><circle cx="505" cy="400" r="26" fill="var(--lav-300)" opacity=".7"/><circle cx="520" cy="250" r="12" fill="var(--pink-300)"/>
     <g class="ill-item" style="--i:0">${woman(282, 120, 1.9)}</g>${agenda}${fotos}${libros}${llaves}${brain(142, 96, 1.15, 7)}
     <g class="ill-item" style="--i:8"><path d="M205 36l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="var(--yellow-300)"/><path d="M360 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="var(--lav-400)"/></g>`);

  /* Biblioteca (actividad A): atender y registrar, guardar y recordar */
  const COL = ['var(--pink-300)', 'var(--blue-300)', 'var(--yellow-300)', 'var(--lav-300)', 'var(--teal-300)'];
  const BW = [18, 22, 16, 24, 20, 18, 22, 16], BH = [44, 52, 40, 54, 46, 50, 42, 48];
  const estante = (gapRow, gapIdx) => {
    let out = `<rect x="244" y="20" width="224" height="266" rx="12" fill="#fbf1e1" stroke="var(--wood)" stroke-width="4"/>`;
    let gap = null;
    [96, 170, 244].forEach((y, r) => {
      out += `<rect x="250" y="${y}" width="212" height="8" rx="3" fill="var(--wood)"/>`;
      let x = 262;
      BW.forEach((w, i) => {
        if (r === gapRow && i === gapIdx) { gap = { x, w, y }; x += w + 4; return; }
        const h = BH[(i + r * 3) % 8];
        out += `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="3" fill="${COL[(i + r) % 5]}" stroke="var(--ink)" stroke-opacity=".25"/>`;
        x += w + 4;
      });
    });
    return { out, gap };
  };
  const salaBase = `<rect width="480" height="300" fill="var(--lav-100)"/><rect y="264" width="480" height="36" fill="var(--teal-100)"/>`;
  const escritorio = `<rect x="12" y="206" width="220" height="72" rx="10" fill="var(--wood)"/><rect x="12" y="206" width="220" height="10" rx="5" fill="#00000014"/>`;
  const libroVertical = (g) => `<rect x="${g.x}" y="${g.y - 54}" width="${g.w}" height="54" rx="3" fill="var(--teal-500)" stroke="var(--ink)" stroke-opacity=".35"/><rect x="${g.x + 4}" y="${g.y - 44}" width="${g.w - 8}" height="6" rx="2" fill="#fff" opacity=".85"/>`;

  const biblio = {};
  { // Paso 1: llega el libro y se recibe con atención
    const e = estante(1, 3);
    biblio[1] = wrap('0 0 480 300', 'Paso 1: en la biblioteca llega un libro con la etiqueta Ana y la bibliotecaria lo recibe con atención',
      `${salaBase}${e.out}<g class="ill-item" style="--i:0">${woman(118, 62, 1)}</g>${escritorio}
       <g class="anim-arrive"><rect x="92" y="184" width="76" height="24" rx="5" fill="var(--teal-500)" stroke="var(--ink)" stroke-opacity=".4"/><rect x="92" y="194" width="76" height="3" fill="#fff" opacity=".7"/><text x="130" y="206" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#fff">Ana</text></g>
       <g class="ill-item" style="--i:2"><ellipse cx="200" cy="70" rx="25" ry="15" fill="#fff" stroke="var(--blue-700)" stroke-width="3.5"/><circle cx="200" cy="70" r="8" fill="var(--blue-700)"/><circle cx="203" cy="67" r="2.6" fill="#fff"/></g>`);
  }
  { // Paso 2: el libro se guarda en su lugar
    const e = estante(1, 3);
    biblio[2] = wrap('0 0 480 300', 'Paso 2: el libro se coloca en un lugar del estante para guardarlo',
      `${salaBase}${e.out}<g class="ill-item" style="--i:0">${woman(118, 62, 1)}</g>${escritorio}
       <g class="anim-shelve">${libroVertical(e.gap)}</g>
       <g class="ill-item" style="--i:3"><path d="M${e.gap.x - 10} ${e.gap.y - 66}l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="var(--yellow-300)"/><path d="M${e.gap.x + 42} ${e.gap.y - 40}l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="var(--lav-400)"/></g>
       <g transform="translate(172 8)"><g class="ill-item" style="--i:2"><rect width="52" height="52" rx="16" fill="#fff"/><g transform="scale(.68) translate(8 8)">${I.heart}</g></g></g>`);
  }
  { // Paso 3: se busca y se recupera el libro
    const e = estante(1, 3);
    biblio[3] = wrap('0 0 480 300', 'Paso 3: la bibliotecaria saca el libro del estante y recuerda que se llamaba Ana',
      `${salaBase}${e.out}<g class="ill-item" style="--i:0">${woman(118, 62, 1)}</g>${escritorio}
       <g class="anim-pull"><rect x="86" y="150" width="76" height="24" rx="5" fill="var(--teal-500)" stroke="var(--ink)" stroke-opacity=".4"/><rect x="86" y="160" width="76" height="3" fill="#fff" opacity=".7"/><text x="124" y="172" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#fff">Ana</text><ellipse cx="86" cy="164" rx="9" ry="8" fill="var(--skin)"/><ellipse cx="162" cy="164" rx="9" ry="8" fill="var(--skin)"/></g>
       <g class="ill-item" style="--i:3"><g transform="translate(176 0) scale(.82)">${I.bulb}</g></g>
       <g class="ill-item" style="--i:4"><rect x="12" y="10" width="124" height="34" rx="17" fill="#fff" stroke="var(--teal-700)" stroke-width="3"/><text x="74" y="33" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="var(--teal-700)">¡Se llama Ana!</text></g>`);
  }

  return { ...pruebas, icon, portada, biblio1: biblio[1], biblio2: biblio[2], biblio3: biblio[3] };
})();
