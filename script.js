'use strict';
/* ==========================================================================
   CARTILLA PSICOEDUCATIVA · script.js
   1) DATOS: todos los datos del paciente y del informe. Es lo ÚNICO que hay que
      editar para actualizar la cartilla (ver LEEME.md).
   2) Lógica de navegación, accesibilidad y actividades.
   No se envía nada a servicios externos ni se escribe información clínica en la consola.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) DATOS (fuente: "TRABAJO TERCER MOMENTO NEURO Vs2 1 noche.docx")
   Regla: si un dato no existe, escribe null o déjalo vacío: la cartilla mostrará
   "Información pendiente de confirmar".
   -------------------------------------------------------------------------- */
const PENDIENTE = 'Información pendiente de confirmar';

const DATOS = {
  paciente: {
    nombre: 'Magnolia Gil Rojas',
    nombreAutorizado: false,        // ← cambiar a true SOLO si el nombre está confirmado y autorizado
    edad: 72
    // No se incluyen cédula, teléfono ni dirección.
  },
  informe: {
    fechaEntrega: '26/10/2026',
    sesiones: 4,
    fechasAplicacion: null,         // el informe trae fechas incompletas: pendiente de confirmar
    elaboro: 'Yara Victoria Morales Flórez y Valery Cañon Bedoya (psicólogas en formación, IV semestre)',
    avala: 'Asesora Katherine Rincón, TP 198913 COLPSIC · Universidad Cooperativa de Colombia, Villavicencio',
    mostrarProfesionales: true
  },
  numeroEmergencias: '123',         // Colombia; confirmar según el lugar

  /* Capacidades que se conservan y aspectos para apoyar (según el informe) */
  fortalezas: [
    'Independencia total en las actividades básicas y en las de la vida diaria.',
    'Orientación completa en tiempo, lugar y persona.',
    'Lenguaje claro: te expresas y comprendes bien.',
    'Vocabulario amplio y razonamiento con palabras (comprensión verbal alta).',
    'Planeación, control de impulsos y pensamiento abstracto.',
    'Cuentas mentales (sumas y restas) con precisión y velocidad.',
    'Hábito de lectura de dos a tres horas al día.'
  ],
  apoyos: [
    'Recordar información después de un rato (evocación diferida).',
    'Rapidez en tareas con tiempo.',
    'Ordenar palabras alfabéticamente y recordar el orden de una secuencia visual.',
    'Armar rompecabezas visuales con buen tiempo.',
    'Estado de ánimo: síntomas leves que conviene explorar (no es un diagnóstico).'
  ],

  /* Las siete pruebas. Cada una usa su propia escala: no se comparan entre sí. */
  pruebas: [
    {
      id: 'barthel', nombre: 'Índice de Barthel', corto: 'Barthel', grupo: 'Vida diaria', icono: 'shirt',
      version: 'Versión original · 10 actividades básicas',
      queBusca: 'Conocer cómo se desenvuelve una persona en actividades básicas, como comer, vestirse, bañarse o desplazarse.',
      relacion: 'Son las cosas que hacemos cada mañana para cuidarnos y movernos por la casa. La prueba pregunta por lo que la persona hace de verdad en su día a día.',
      resultado: '100 puntos de 100',
      etiquetas: [{ t: 'Independencia total', k: 'fuerte' }],
      significa: 'Haces tus actividades básicas sin necesitar ayuda de otra persona, según los criterios de la prueba.',
      r5: {
        explora: 'Qué tan independiente eres en 10 actividades básicas: comer, pasar de la silla a la cama, asearte, usar el baño, bañarte, caminar, subir escaleras, vestirte y controlar el intestino y la vejiga.',
        encontro: '100 puntos de 100: independencia total.',
        vida: 'Puedes cuidar de ti misma y moverte con seguridad por tu casa sin ayuda. Es una fortaleza.'
      },
      detalles: [['Puntaje', '100 de 100'], ['Rango en el informe', '100 = independencia'], ['Actividades revisadas', '10 actividades básicas']],
      pendiente: null
    },
    {
      id: 'lawton', nombre: 'Escala de Lawton y Brody', corto: 'Lawton y Brody', grupo: 'Vida diaria', icono: 'basket',
      version: 'Versión de 8 actividades instrumentales',
      queBusca: 'Conocer la autonomía en actividades como hacer compras, manejar dinero u organizar los medicamentos.',
      relacion: 'Son tareas que nos permiten vivir de forma independiente en la comunidad: llamar por teléfono, comprar, cocinar, usar transporte o pagar cuentas.',
      resultado: '8 puntos de 8',
      etiquetas: [{ t: 'Autonomía total', k: 'fuerte' }],
      significa: 'Te desenvuelves de forma autónoma en las tareas que piden más organización, según los ítems de la versión aplicada.',
      r5: {
        explora: 'Qué tan autónoma eres en 8 actividades: usar el teléfono, hacer compras, preparar la comida, cuidar la casa, lavar la ropa, usar el transporte, responsabilizarte de tu medicación y manejar tu dinero.',
        encontro: '8 puntos de 8: autonomía total.',
        vida: 'Los olvidos que notas no han limitado, según esta escala, tus compras, tu dinero, tu medicación ni tu transporte. También es una fortaleza.'
      },
      detalles: [['Puntaje', '8 de 8'], ['Categoría para mujeres', 'Autónoma (8)'], ['Actividades revisadas', 'teléfono, compras, comida, casa, ropa, transporte, medicación y dinero']],
      pendiente: null
    },
    {
      id: 'yesavage', nombre: 'Escala de Yesavage (GDS-15)', corto: 'Yesavage', grupo: 'Estado de ánimo', icono: 'sunCloud',
      version: 'Versión abreviada · 15 preguntas de Sí / No',
      queBusca: 'Explorar señales relacionadas con el estado de ánimo en personas mayores durante la última semana.',
      relacion: 'Habla de cómo nos hemos sentido: satisfacción con la vida, interés por hacer cosas, energía y esperanza.',
      resultado: '5 puntos de 15',
      etiquetas: [{ t: 'En el punto de corte: conviene explorar el ánimo', k: 'conversar' }],
      significa: 'No es un diagnóstico de depresión. Es una señal de tamizaje que invita a conversar sobre tu ánimo, tus intereses y tu bienestar.',
      r5: {
        explora: 'Señales relacionadas con el estado de ánimo durante la última semana, con 15 preguntas de respuesta Sí o No pensadas para personas mayores.',
        encontro: '5 puntos. La tabla de la escala ubica 0 a 5 como “sin depresión”. El informe señala que 5 está en el punto de corte y que puede sugerir síntomas del ánimo, por lo que recomienda explorar más.',
        vida: 'No significa que tengas depresión. Es una invitación a conversar sobre tu ánimo, tus intereses, tu motivación y tu bienestar emocional.'
      },
      detalles: [['Puntaje', '5 de 15'], ['Rangos de la tabla', '0–5 sin depresión · 6–9 probable depresión · 10–15 depresión establecida'], ['Tipo de resultado', 'Tamizaje; por sí solo no permite un diagnóstico']],
      pendiente: 'El informe describe este puntaje de dos formas (rango “sin depresión” y “punto de corte”).'
    },
    {
      id: 'dass', nombre: 'DASS-21', corto: 'DASS-21', grupo: 'Estado de ánimo', icono: 'rain',
      version: 'Autoinforme de 21 frases · última semana',
      queBusca: 'Explorar síntomas relacionados con la depresión, la ansiedad y el estrés durante la última semana.',
      relacion: 'Pregunta por tensión, inquietud, desánimo y dificultad para relajarse: cosas que influyen en cómo nos sentimos y en cómo recordamos.',
      resultado: 'Depresión 10 · Ansiedad 4 · Estrés 14',
      etiquetas: [{ t: 'Depresión: leve', k: 'conversar' }, { t: 'Ansiedad: normal', k: 'fuerte' }, { t: 'Estrés: normal', k: 'fuerte' }],
      significa: 'Podría haber algunos síntomas del ánimo, como menos motivación o desánimo. Hay que revisarlos con la entrevista y tu contexto. No es un diagnóstico.',
      r5: {
        explora: 'Qué tan intensos fueron, en la última semana, los malestares relacionados con el ánimo (depresión), la inquietud (ansiedad) y la tensión (estrés).',
        encontro: 'Depresión: nivel leve (10). Ansiedad: normal (4). Estrés: normal (14).',
        vida: 'Puede haber algunos síntomas del ánimo, como menos motivación, dificultad para sentir satisfacción o desánimo. La puntuación sola no dice cuáles son ni es un diagnóstico. En ansiedad y en estrés no hubo elevación.'
      },
      tabla: { cols: ['Dimensión', 'Puntaje', 'Nivel en el informe'], filas: [['Depresión', '10', 'Leve'], ['Ansiedad', '4', 'Normal'], ['Estrés', '14', 'Normal']] },
      detalles: [],
      pendiente: 'Conviene que el profesional confirme el baremo usado para estos puntajes.'
    },
    {
      id: 'neuropsi', nombre: 'NEUROPSI Breve', corto: 'NEUROPSI Breve', grupo: 'Pensamiento y memoria', icono: 'brain',
      version: 'Tamizaje de 8 áreas · baremo de 66 a 85 años y 5 a 9 años de estudio',
      queBusca: 'Explorar distintas capacidades, como orientación, atención, memoria y lenguaje.',
      relacion: 'Es un vistazo general a cómo funcionan tus capacidades de pensamiento: ubicarte, concentrarte, aprender algo nuevo, recordarlo y comunicarte.',
      resultado: '110 puntos de 130',
      etiquetas: [{ t: 'Rango normal', k: 'fuerte' }, { t: 'Recuerdo después de un rato: leve dificultad puntual', k: 'apoyo' }],
      significa: 'Tu funcionamiento global está en rango normal para tu edad y escolaridad. Recordar después de un rato fue un poco más difícil; con pistas lo lograste mejor.',
      r5: {
        explora: 'Un vistazo general a ocho capacidades: orientación, atención y concentración, registro de información nueva, recuerdo después de un rato, lenguaje, lectura, escritura y organización del pensamiento.',
        encontro: '110 puntos de 130. Comparado con personas de 66 a 85 años y de 5 a 9 años de estudio, el informe lo ubica en rango normal.',
        vida: 'Te ubicas bien en el tiempo y el lugar, te comunicas con claridad y aprendes información nueva. El recuerdo después de un rato fue un poco más difícil, y las pistas te ayudaron.'
      },
      tabla: {
        cols: ['Capacidad', 'Obtenido'],
        filas: [['Orientación', '6 de 6'], ['Atención y concentración', '21 de 27'], ['Registro de información nueva (codificación)', '16,5 de 18'], ['Recuerdo después de un rato (evocación)', '21,5 de 30'], ['Lenguaje', '22 de 26'], ['Lectura', '3 de 3'], ['Escritura', '2 de 2'], ['Organización del pensamiento (funciones ejecutivas)', '18 de 18']],
        nota: 'Cada fila tiene su propio máximo. No son comparables entre sí.'
      },
      nota: 'El informe aclara que la leve dificultad en el recuerdo diferido no configura un deterioro en esta evaluación de tamizaje.',
      detalles: [],
      pendiente: 'El texto del informe y su tabla difieren en algunos subtotales; aquí se usan los de la tabla.'
    },
    {
      id: 'banfe', nombre: 'BANFE-3', corto: 'BANFE-3', grupo: 'Pensamiento y memoria', icono: 'clipboard',
      version: 'Batería de funciones ejecutivas · 15 procesos en 3 áreas',
      queBusca: 'Explorar habilidades para organizarse, controlar respuestas, cambiar de estrategia y resolver problemas.',
      relacion: 'Son las habilidades que usas para planear tu día, decidir con calma, administrar tus medicinas y tu dinero o corregir un plan cuando algo cambia.',
      resultado: 'Resultado total: normal',
      etiquetas: [{ t: 'Total: normal', k: 'fuerte' }, { t: 'Planeación y memoria de trabajo: normalmente alta', k: 'fuerte' }, { t: 'Rapidez y orden de secuencias: para apoyar', k: 'apoyo' }],
      significa: 'Planeas muy bien, controlas tus impulsos y piensas con ideas abstractas. Algunas tareas con tiempo o de ordenar información fueron más lentas.',
      r5: {
        explora: 'Las funciones ejecutivas: planear, controlar impulsos, mantener y usar información en la mente, cambiar de estrategia y resolver problemas.',
        encontro: 'Control de impulsos y decisiones: normal. Pensamiento abstracto y conocimiento de la propia memoria: normal. Memoria de trabajo y planeación: normalmente alta. Resultado total: normal.',
        vida: 'Fortalezas: decides sin dejarte llevar por impulsos, planeas muy bien, haces cuentas mentales con solidez y entiendes ideas abstractas. Para apoyar: fuiste más lenta en tareas con tiempo y te costó ordenar palabras alfabéticamente y recordar el orden de una secuencia visual.'
      },
      tabla: {
        cols: ['Área', 'Puntuación normalizada', 'Categoría en el informe'],
        filas: [['Orbitofrontal (control y decisiones)', '101', 'Normal'], ['Prefrontal anterior (ideas abstractas)', '111', 'Normal'], ['Dorsolateral (memoria de trabajo y planeación)', '131', 'Normalmente alta'], ['Total de la batería', '112', 'Normal']],
        nota: 'Las puntuaciones normalizadas ya consideran edad y escolaridad.'
      },
      detalles: [],
      pendiente: 'Las puntuaciones naturales de los subtotales del informe no coinciden entre sí; por eso aquí solo se muestran las normalizadas.'
    },
    {
      id: 'wais', nombre: 'WAIS-IV', corto: 'WAIS-IV', grupo: 'Pensamiento y memoria', icono: 'book',
      version: 'Escala de Wechsler para adultos, 4.ª edición · 4 índices y resultado global',
      queBusca: 'Conocer diferentes capacidades de razonamiento, comprensión, memoria de trabajo y rapidez para realizar determinadas tareas.',
      relacion: 'Muestra con qué recursos cuentas para entender, razonar, retener datos en la mente y resolver tareas visuales. Algunos se forman con los años de estudio y lectura.',
      resultado: 'Comprensión verbal 123 · Razonamiento visual 101 · Memoria de trabajo 110 · Velocidad 102',
      etiquetas: [{ t: 'Comprensión verbal: alta', k: 'fuerte' }, { t: 'Capacidad global: promedio alto', k: 'fuerte' }, { t: 'Rompecabezas visual: relativamente más difícil', k: 'apoyo' }],
      significa: 'Tu mayor fortaleza son las palabras y los conocimientos. En tareas visuales y de rapidez tu rendimiento fue el esperado para tu edad.',
      r5: {
        explora: 'Cuatro grandes capacidades: comprender y razonar con palabras, razonar con información visual, retener y usar información en la mente, y rapidez en tareas visuales sencillas.',
        encontro: 'Comprensión verbal: alta (123). Razonamiento visual: promedio (101). Memoria de trabajo: promedio alto (110). Velocidad de procesamiento: promedio (102). Capacidad global: promedio alto (111).',
        vida: 'Tu mayor fortaleza son las palabras: vocabulario, razonamiento y conocimientos acumulados, que se relacionan con tu hábito de leer. En tareas visuales y con tiempo tu rendimiento fue el esperado; el rompecabezas visual fue lo más difícil y notaste frustración con los tiempos.'
      },
      tabla: {
        cols: ['Capacidad', 'Puntuación compuesta', 'Percentil', 'Clasificación en el informe'],
        filas: [['Comprensión verbal', '123', '94', 'Muy superior / alto'], ['Razonamiento visual', '101', '53', 'Promedio'], ['Memoria de trabajo', '110', '75', 'Promedio alto'], ['Velocidad de procesamiento', '102', '55', 'Promedio'], ['Capacidad global (total)', '111', '77', 'Promedio alto']],
        nota: 'El percentil indica cuántas de cada 100 personas de su grupo de edad obtienen un resultado igual o menor.'
      },
      nota: 'El informe señala que la diferencia entre la parte verbal y la visual es esperable en el envejecimiento normal, y que tu alta comprensión verbal indica una alta reserva cognitiva.',
      detalles: [],
      pendiente: 'El informe nombra la comprensión verbal como “muy superior / alto” en la tabla y como “superior” en la conclusión; la memoria de trabajo aparece como 110 y como 109.'
    }
  ],

  /* Plan de intervención del informe (24 semanas) */
  plan: {
    estructura: '1 sesión semanal de 60 minutos y unos 20 minutos de tarea diaria en casa',
    etapas: [
      { cuando: 'Semanas 1 y 2', titulo: 'Entender y calmar', texto: 'Te explican tus resultados y qué es la reserva cognitiva. Taller “Olvido normal frente a señal de alarma”. Aprendes respiración diafragmática. Meta: disminuir la preocupación anticipada.' },
      { cuando: 'Semanas 3 y 4', titulo: 'Cuidar el ánimo', texto: 'Programar tres actividades agradables con sentido cada semana, llevar un diario de gratitud y logros, y registrar pensamientos. Meta: bajar el nivel de depresión del DASS-21 de 10 a menos de 6.' },
      { cuando: 'Semanas 5 a 8', titulo: 'Memoria de trabajo', texto: 'Ordenar listas por categorías, como la del mercado; asociar recados con lugares que conoces bien; escuchar secuencias de sonidos; ejercicios para señalar sin repetir.' },
      { cuando: 'Semanas 9 a 12', titulo: 'Rapidez y organización', texto: 'Tareas de rapidez con tarjetas, reforzando el esfuerzo y no el tiempo; búsqueda de símbolos 10 minutos al día; caminar mientras dices palabras; laberintos y torre con planeación en voz alta.' },
      { cuando: 'Semanas 13 a 16', titulo: 'Recuerdo y lectura', texto: 'Resumir en voz alta y por escrito tus lecturas y anotar vocabulario nuevo; repetir diez palabras a los 5, 15 y 30 minutos; entender refranes y textos de doble sentido.' },
      { cuando: 'Semanas 17 a 20', titulo: 'Autonomía', texto: 'Agenda y calendario en el celular con alarmas para medicación y citas; manejo de dinero y pagos; planear el menú y el presupuesto de la semana; cocinar con recetas por pasos.' },
      { cuando: 'Semanas 21 a 24', titulo: 'Mantener y cerrar', texto: 'Baile con secuencias o tai-chi dos veces por semana, con valoración médica previa; historia de vida y espiritualidad como apoyo; practicar qué hacer si olvidas llaves o citas; nueva evaluación.' }
    ]
  },
  familiaInforme: [
    'No corregirla constantemente ni tratarla como a una niña.',
    'Conocer la diferencia entre un olvido habitual y una señal de alarma (taller con la familia).',
    'Acompañar como compañía, no como supervisión, y hacer una salida social a la semana con ella.',
    'No hacer por ella lo que puede hacer, como la lista del mercado, para cuidar su autonomía.',
    'Dejarle más tiempo para responder (alrededor de un 30 % más) y no terminarle las frases.',
    'Ver su manera cuidadosa de hacer las cosas como una estrategia, no como lentitud.',
    'Usar recordatorios visuales, sin palabras, y supervisar las finanzas a distancia, no de forma presencial.',
    'Compartir un club de lectura familiar una vez por semana con hijos y nietos.',
    'Al final, acordar el seguimiento anual y el control médico.'
  ],

  /* Para revisión profesional (se muestra al final de la cartilla, no se imprime) */
  revision: [
    'No se recibió la imagen de referencia; solo el informe .docx. Las siete pruebas y su orden se tomaron del informe.',
    'Nombre de la paciente: el informe no indica autorización para mostrarlo en esta cartilla. Está oculto (DATOS.paciente.nombreAutorizado = false).',
    'Fechas de aplicación incompletas en el informe (“09/2026, 25-09/2026, 02-10/2026, 02-10/2026”); el campo “Fecha de evaluación” está en blanco.',
    'Yesavage: 5 puntos cae en el rango 0–5 (“No depresión”) de la tabla, pero el texto lo llama “punto de corte” y la conclusión final habla de “sintomatología depresiva leve”. La cartilla muestra ambas lecturas sin asignar una categoría nueva.',
    'La descripción de Yesavage en “Atributos que evalúan las pruebas” repite el texto de Lawton y Brody.',
    'DASS-21: no hay respuestas marcadas en la hoja. Los puntajes (10 / 4 / 14) parecen ya multiplicados por 2 (puntos de corte de la versión larga). Confirmar baremo.',
    'BANFE-3: los subtotales naturales no cuadran (orbitofrontal 192 frente a 32 sumando puntajes codificados; total 398,5 frente a 428,5 sumando subtotales). Solo se muestran puntuaciones normalizadas y categorías.',
    'WAIS-IV: comprensión verbal 123 figura como “Muy Superior / Alto” en la tabla y “Superior” en la conclusión; memoria de trabajo figura como 110 en la tabla y 109 en la conclusión.',
    'NEUROPSI Breve: el texto cita memoria 38/42 (la tabla da 38/48), lenguaje y lecto-escritura 28/31 (tabla: 27/31), funciones ejecutivas 18/19 (tabla: 18/18) y una suma de lenguaje de 23 (tabla: 22). Se usó la tabla.',
    'Lawton y Brody: el ítem “Cuidado de la casa” repite las opciones de “Preparación de la comida”. No cambia el 8/8.',
    'Barthel: la fecha de aplicación dice “primer semestre” sin fecha concreta.',
    'El antecedente de Alzheimer en la madre solo aparece en el modo “Quiero saber un poco más”; el profesional decide si conviene mostrarlo.',
    'Número de emergencias 123 (Colombia): confirmar para el lugar de residencia.',
    'La cartilla habla de “tú”; el informe usa tercera persona. Ajustar a “usted” si se prefiere.',
    'No se incluyeron cédula, teléfono ni dirección de la paciente.'
  ]
};

/* --------------------------------------------------------------------------
   Contenido de las actividades (educativo, sin puntuaciones)
   -------------------------------------------------------------------------- */
const PASOS_A = [
  { titulo: 'Prestar atención y registrar', ilus: 'biblio1', texto: 'En la biblioteca llega un libro con la etiqueta «Ana». La bibliotecaria lo mira y lo recibe con atención.', ejemplo: 'Cuando conoces a alguien, primero escuchas su nombre.', mas: 'Si estamos distraídos o preocupados, este primer paso se hace con menos claridad.' },
  { titulo: 'Guardar', ilus: 'biblio2', texto: 'El libro se coloca en su lugar del estante. Así queda guardado.', ejemplo: 'Después lo guardas.', mas: 'Repetir el nombre y relacionarlo con algo ayuda a guardarlo mejor.' },
  { titulo: 'Recordar', ilus: 'biblio3', texto: 'Más tarde la bibliotecaria busca el libro, lo encuentra y recuerda: ¡se llama Ana!', ejemplo: 'Más adelante intentas recordarlo.', mas: 'A veces el libro tarda en aparecer. Una pista, como “empezaba con A”, puede ayudar.', fin: '¡Completaste el recorrido! Puedes repetirlo cuando quieras.' }
];

const PARES_B = [
  { id: 'cita', icono: 'calendar', sit: 'Tengo una cita médica el jueves.', est: 'Anotarla en una agenda o calendario y poner una alarma.', por: 'Una alarma te avisa aunque estés ocupada.' },
  { id: 'llaves', icono: 'key', sit: 'Llego a casa con las llaves en la mano.', est: 'Guardarlas siempre en el mismo lugar.', por: 'Un lugar fijo hace que no tengas que acordarte: las buscas donde siempre están.' },
  { id: 'mercado', icono: 'basket', sit: 'Voy a hacer el mercado.', est: 'Escribir la lista ordenada por grupos: frutas, aseo, granos.', por: 'Agrupar por categorías hace la lista más fácil de recordar y de seguir.' },
  { id: 'medic', icono: 'pillbox', sit: 'Debo tomar mis medicamentos a ciertas horas.', est: 'Usar un pastillero y una alarma.', por: 'El pastillero muestra si ya tomaste la dosis, y la alarma marca la hora.' },
  { id: 'nombre', icono: 'people', sit: 'Me presentan a una persona nueva.', est: 'Repetir su nombre en voz alta y asociarlo con algo.', por: 'Repetir y asociar ayuda a registrar y guardar el nombre.' },
  { id: 'cocina', icono: 'one', sit: 'Estoy cocinando y suena el teléfono.', est: 'Hacer una cosa a la vez: apagar el fuego antes de contestar.', por: 'Atender una sola cosa evita distracciones y descuidos.' }
];
const ORDEN_EST_B = [3, 0, 4, 1, 5, 2];

const MITOS = [
  { m: 'Olvidar dónde dejé las llaves quiere decir que tendré Alzheimer.', r: 'Olvidos ocasionales son frecuentes a cualquier edad, sobre todo con cansancio, prisa o preocupaciones. Lo que se valora es si los olvidos son cada vez más frecuentes y afectan la vida diaria.' },
  { m: 'Con los años, toda la memoria empeora.', r: 'Con la edad algunas cosas, como la rapidez, pueden cambiar. Otras, como el vocabulario y los conocimientos, suelen mantenerse. Leer, moverse y relacionarse con otros se asocia con un buen envejecimiento mental.' },
  { m: 'Usar agenda o alarmas es “hacer trampa”.', r: 'Los apoyos externos los usan personas de todas las edades. Anotar libera atención para otras cosas.' },
  { m: 'Dormir mal no tiene que ver con la memoria.', r: 'El sueño ayuda a que lo aprendido se asiente. Dormir poco puede dificultar la atención y el recuerdo.' },
  { m: 'Si un familiar tuvo Alzheimer, seguro lo tendré.', r: 'Tener un familiar con Alzheimer puede aumentar la probabilidad, pero no significa que una persona lo desarrollará. Muchas personas con ese antecedente no lo desarrollan.' },
  { m: 'La tristeza o las preocupaciones no afectan la memoria.', r: 'El ánimo y las preocupaciones pueden hacer más difícil concentrarse y, por eso, recordar. Hablar de ellas también cuida la memoria.' }
];

const ACCIONES_D = [
  { id: 'agenda', icono: 'calendar', t: 'Anotar mis citas en una agenda o calendario.' },
  { id: 'alarma', icono: 'clock', t: 'Poner una alarma para mi medicación y mis citas.' },
  { id: 'llaves', icono: 'key', t: 'Guardar mis llaves y objetos importantes en un lugar fijo.' },
  { id: 'una', icono: 'one', t: 'Hacer una cosa a la vez.' },
  { id: 'agrad', icono: 'star', t: 'Programar una actividad agradable esta semana.' },
  { id: 'salir', icono: 'people', t: 'Compartir un rato con mi familia o mis amistades.' },
  { id: 'resp', icono: 'breath', t: 'Hacer respiraciones lentas cuando me sienta tensa.' },
  { id: 'sueno', icono: 'moon', t: 'Acostarme y levantarme a horas parecidas.' },
  { id: 'leer', icono: 'book', t: 'Leer algo que me guste y contárselo a alguien.' },
  { id: 'salud', icono: 'cross', t: 'Asistir a mis controles y seguir las indicaciones del equipo de salud.' },
  { id: 'mover', icono: 'walk', t: 'Moverme o caminar un rato, si mi médico lo permite.' }
];

const CAPITULOS = [
  'Bienvenida', '¿Por qué me evaluaron?', '¿Cómo funciona mi memoria?', 'Conozcamos las pruebas', 'Entendamos mis resultados',
  '¿Qué significa la conclusión?', 'Mi memoria en la vida diaria', '¿Cómo puedo cuidarme?', '¿Cómo puede ayudar mi familia?',
  '¿Cuándo debo consultar?', 'Mi resumen y mis compromisos'
];

/* --------------------------------------------------------------------------
   2) LÓGICA
   -------------------------------------------------------------------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const KEY = 'cartilla-preferencias-v1';
const SIMBOLO = { fuerte: '✔', apoyo: '◆', conversar: '●', neutral: '■' };

const estado = { cap: 1, visitados: new Set([1]), escala: 1, reducir: false, modo: 'breve', plan: [] };

/* Preferencias: solo interfaz y avance. Nunca datos clínicos. */
function guardar() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ cap: estado.cap, visitados: [...estado.visitados], escala: estado.escala, reducir: estado.reducir, modo: estado.modo, plan: estado.plan }));
  } catch (e) { /* almacenamiento no disponible: la cartilla sigue funcionando */ }
}
function cargar() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!p) return;
    if (Array.isArray(p.visitados)) estado.visitados = new Set(p.visitados.filter((n) => n >= 1 && n <= 11));
    if (typeof p.escala === 'number') estado.escala = Math.min(1.6, Math.max(0.9, p.escala));
    if (typeof p.reducir === 'boolean') estado.reducir = p.reducir;
    if (p.modo === 'mas' || p.modo === 'breve') estado.modo = p.modo;
    if (Array.isArray(p.plan)) estado.plan = p.plan.filter((id) => ACCIONES_D.some((a) => a.id === id)).slice(0, 3);
    if (Number.isInteger(p.cap) && p.cap >= 1 && p.cap <= 11) estado.cap = p.cap;
  } catch (e) { /* datos dañados: se ignoran */ }
}

/* Iconos incrustados */
function pintarIconos(raiz = document) {
  $$('[data-icon]', raiz).forEach((el) => {
    if (el.dataset.done) return;
    el.innerHTML = ILUS.icon(el.dataset.icon, '', el.dataset.bg || '#fff');
    el.dataset.done = '1';
    if (!el.classList.contains('ico')) el.classList.add('ico', 'ico--sm');
  });
}

/* ---- Tamaño de texto, animaciones y modo ---- */
function aplicarEscala() {
  document.documentElement.style.setProperty('--escala', estado.escala);
  $('#btn-menos').disabled = estado.escala <= 0.9;
  $('#btn-mas').disabled = estado.escala >= 1.6;
}
function aplicarMovimiento() {
  document.body.classList.toggle('reduce-motion', estado.reducir);
  const b = $('#btn-motion');
  b.setAttribute('aria-pressed', String(estado.reducir));
  b.textContent = estado.reducir ? '✓ Animaciones reducidas' : 'Reducir animaciones';
  if (estado.reducir) $$('.reveal').forEach((e) => e.classList.add('visible'));
}
function aplicarModo() {
  document.body.dataset.modo = estado.modo;
  $('#modo-breve').setAttribute('aria-pressed', String(estado.modo === 'breve'));
  $('#modo-mas').setAttribute('aria-pressed', String(estado.modo === 'mas'));
  const h = $('#modo-hint');
  if (h) {
    h.textContent = estado.modo === 'mas'
      ? '✓ Mostrando detalles ampliados, tablas y notas clínicas'
      : '✓ Mostrando explicación breve y directa';
  }
}

/* ---- Navegación entre capítulos ---- */
function construirIndice() {
  $('#chapters').innerHTML = CAPITULOS.map((t, i) =>
    `<li data-li="${i + 1}"><button type="button" data-go="${i + 1}"><span class="num" aria-hidden="true">${i + 1}</span><span>${esc(t)}</span></button></li>`).join('');
}
function actualizarAvance() {
  const n = estado.visitados.size;
  $('#progress-label').textContent = `Avance de lectura: ${n} de 11 capítulos`;
  $('#progress-bar').style.width = `${Math.round((n / 11) * 100)}%`;
  $('.progress-track').setAttribute('aria-valuenow', String(n));
  $('.progress-track').setAttribute('aria-valuetext', `${n} de 11 capítulos leídos`);
}
function ir(n, { foco = true } = {}) {
  n = Math.min(11, Math.max(1, Number(n) || 1));
  estado.cap = n; estado.visitados.add(n);
  $$('.chapter').forEach((s) => {
    const activo = Number(s.dataset.cap) === n;
    s.hidden = !activo;
    s.classList.remove('enter');
    if (activo) { void s.offsetWidth; s.classList.add('enter'); }
  });
  $$('#chapters button').forEach((b) => {
    const es = Number(b.dataset.go) === n;
    if (es) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    b.parentElement.classList.toggle('visited', estado.visitados.has(Number(b.dataset.go)));
  });
  $('#btn-prev').disabled = n === 1;
  $('#btn-next').disabled = n === 11;
  $('#where').textContent = `Capítulo ${n} de 11 · ${CAPITULOS[n - 1]}`;
  actualizarAvance(); guardar();
  $('#sidebar').classList.remove('open'); $('#btn-menu').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0 });
  if (foco) { const h = $(`#h-${n}`); if (h) h.focus({ preventScroll: true }); }
  observarReveal();
}

/* ---- Aparición suave de secciones ---- */
let observador = null;
function observarReveal() {
  const objetivos = $$('.reveal:not(.visible)');
  if (estado.reducir || !('IntersectionObserver' in window)) { objetivos.forEach((e) => e.classList.add('visible')); return; }
  if (!observador) {
    observador = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observador.unobserve(e.target); } }), { threshold: 0.08 });
  }
  objetivos.forEach((e) => observador.observe(e));
}

/* ---- Etiquetas con símbolo + texto (el color nunca es la única señal) ---- */
const chip = (e) => `<span class="chip chip--${e.k}"><span aria-hidden="true">${SIMBOLO[e.k]}</span>${esc(e.t)}</span>`;
const pendienteHtml = (t) => (t ? `<p class="pending-note"><span class="pending" title="${esc(PENDIENTE)}">${esc(PENDIENTE)}: ${esc(t)}</span></p>` : '');
function tablaHtml(t) {
  if (!t) return '';
  return `<table class="score-table"><thead><tr>${t.cols.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.filas.map((f) => `<tr>${f.map((c, i) => (i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table>${t.nota ? `<p class="small">${esc(t.nota)}</p>` : ''}`;
}

/* ---- Capítulo 4: pruebas ---- */
const TONOS = ['teal', 'yellow', 'lav', 'pink', 'blue', 'teal', 'lav'];
function renderPruebas() {
  const P = DATOS.pruebas;
  $('#test-select').innerHTML = P.map((p, i) => `<li><button type="button" class="btn" data-test="${i}" aria-pressed="false">${i + 1}. ${esc(p.corto)}</button></li>`).join('');
  $('#pruebas-root').innerHTML = P.map((p, i) => `
    <article class="test-card card tone-${TONOS[i]}" id="test-${i}" aria-labelledby="test-h-${i}" hidden>
      <div>
        <button type="button" class="scene-btn" data-scene="${i}" aria-label="Repetir la animación de la escena de ${esc(p.corto)}">${ILUS[p.id]}</button>
        <p class="scene-cap">Pulsa el dibujo para repetir la animación. Es una escena de ejemplo, no un ejercicio real de la prueba.</p>
      </div>
      <div>
        <h3 id="test-h-${i}"><span class="badge-num" aria-hidden="true">${i + 1}</span>${esc(p.nombre)}</h3>
        <p class="chips"><span class="chip chip--neutral">${esc(p.version)}</span></p>
        <div class="qa"><h4>¿Qué busca conocer?</h4><p>${esc(p.queBusca)}</p></div>
        <div class="qa"><h4>¿Cómo se relaciona con mi vida?</h4><p>${esc(p.relacion)}</p></div>
        <button type="button" class="btn btn--primary" data-result="${i}" aria-expanded="false" aria-controls="res-${i}">Ver mi resultado</button>
        <div class="result-box" id="res-${i}" hidden>
          <div class="qa"><h4>¿Cuál fue mi resultado?</h4><p class="chips" style="margin:.2rem 0 .5rem">${p.etiquetas.map(chip).join('')}</p><p><strong>${esc(p.resultado)}</strong></p></div>
          <div class="qa"><h4>¿Qué significa para mí?</h4><p>${esc(p.significa)}</p></div>
          ${pendienteHtml(p.pendiente)}
        </div>
        <div class="nav-in">
          <button type="button" class="btn btn--small" data-tnav="${i - 1}" ${i === 0 ? 'disabled' : ''}>← Prueba anterior</button>
          <button type="button" class="btn btn--small" data-tnav="${i + 1}" ${i === P.length - 1 ? 'disabled' : ''}>Prueba siguiente →</button>
        </div>
      </div>
    </article>`).join('');
  mostrarPrueba(0, false);
}
function mostrarPrueba(i, foco = true) {
  $$('.test-card').forEach((c, k) => { c.hidden = k !== i; });
  $$('#test-select .btn').forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
  if (foco) { const c = $(`#test-${i}`); c.scrollIntoView({ block: 'nearest' }); $(`#test-h-${i}`).setAttribute('tabindex', '-1'); $(`#test-h-${i}`).focus({ preventScroll: true }); }
}

/* ---- Capítulo 5: resultados ---- */
function renderResultados() {
  $('#fortalezas-root').innerHTML = `
    <div class="two-cols reveal">
      <div class="card tone-teal"><h3>Lo que se conserva y es una fortaleza</h3><ul class="list-clean">${DATOS.fortalezas.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>
      <div class="card tone-lav"><h3>Lo que conviene apoyar y seguir observando</h3><ul class="list-clean support">${DATOS.apoyos.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></div>
    </div>
    <p class="small">Cada símbolo y cada etiqueta tienen texto: ✔ fortaleza · ◆ para apoyar · ● para conversar. No dependen del color.</p>`;
  const grupos = [...new Set(DATOS.pruebas.map((p) => p.grupo))];
  $('#resultados-root').innerHTML = grupos.map((g) => `
    <h3 class="section-title">${esc(g)}</h3>
    ${DATOS.pruebas.filter((p) => p.grupo === g).map((p) => `
      <article class="card result-card reveal" aria-labelledby="rh-${p.id}">
        <header>${ILUS.icon(p.icono, '', 'var(--teal-100)').replace('<svg', '<svg class="ico"')}<div><h3 id="rh-${p.id}">${esc(p.nombre)}</h3><p class="chips" style="margin:.3rem 0 0">${p.etiquetas.map(chip).join('')}</p></div></header>
        <div class="qa3">
          <div><h4>¿Qué capacidad se exploró?</h4><p>${esc(p.r5.explora)}</p></div>
          <div><h4>¿Qué encontró la evaluación?</h4><p>${esc(p.r5.encontro)}</p></div>
          <div><h4>¿Cómo puede entenderse en la vida cotidiana?</h4><p>${esc(p.r5.vida)}</p></div>
        </div>
        <div class="mas">
          ${p.detalles.length ? `<dl class="kv">${p.detalles.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
          ${tablaHtml(p.tabla)}
          ${p.nota ? `<p class="small">${esc(p.nota)}</p>` : ''}
        </div>
        ${pendienteHtml(p.pendiente)}
      </article>`).join('')}`).join('');
}

/* ---- Capítulos 8 y 9: plan y familia ---- */
function renderPlan() {
  $('#plan-timeline').innerHTML = DATOS.plan.etapas.map((e) => `<li class="reveal"><span class="when">${esc(e.cuando)}</span><div><h4>${esc(e.titulo)}</h4><p>${esc(e.texto)}</p></div></li>`).join('');
  $('#familia-informe').innerHTML = DATOS.familiaInforme.map((t) => `<li>${esc(t)}</li>`).join('');
}

/* ---- Actividad A ---- */
let pasoA = 0;
function renderA() {
  const p = PASOS_A[pasoA], ultimo = pasoA === PASOS_A.length - 1;
  $('#stage-a').innerHTML = ILUS[p.ilus];
  $('#dots-a').innerHTML = PASOS_A.map((s, i) => `<li ${i === pasoA ? 'aria-current="step"' : ''}>${i + 1}. ${esc(s.titulo)}</li>`).join('');
  $('#caption-a').innerHTML = `<strong>${esc(p.titulo)}</strong><p>${esc(p.texto)}</p><p><em>${esc(p.ejemplo)}</em></p><p class="small mas">${esc(p.mas)}</p>${p.fin ? `<p class="feedback done" style="display:block">${esc(p.fin)}</p>` : ''}`;
  $('#a-prev').disabled = pasoA === 0;
  $('#a-next').textContent = ultimo ? '↺ Volver a empezar' : 'Continuar →';
}

/* ---- Actividad B ---- */
const B = { sit: null, hechas: new Set() };
function renderB() {
  $('#sit-list').innerHTML = PARES_B.map((p) => `<li><button type="button" class="match-btn ${B.hechas.has(p.id) ? 'is-done' : ''}" data-sit="${p.id}" aria-pressed="${B.sit === p.id}" ${B.hechas.has(p.id) ? 'aria-disabled="true"' : ''}>${ILUS.icon(p.icono)}<span>${esc(p.sit)}</span></button></li>`).join('');
  $('#est-list').innerHTML = ORDEN_EST_B.map((i) => PARES_B[i]).map((p) => `<li><button type="button" class="match-btn ${B.hechas.has(p.id) ? 'is-done' : ''}" data-est="${p.id}" ${B.hechas.has(p.id) ? 'aria-disabled="true"' : ''}><span>${esc(p.est)}</span></button></li>`).join('');
}
function mensajeB(texto, tipo = '') { const f = $('#b-feedback'); f.className = `feedback ${tipo}`; f.textContent = texto; }
function clicSit(id) {
  if (B.hechas.has(id)) return;
  B.sit = id; renderB();
  mensajeB(`Elegiste: «${PARES_B.find((p) => p.id === id).sit}» Ahora elige un apoyo.`);
  $(`[data-sit="${id}"]`).focus();
}
function clicEst(id) {
  if (B.hechas.has(id)) return;
  if (!B.sit) { mensajeB('Primero elige una situación a la izquierda.', 'gentle'); return; }
  const sit = PARES_B.find((p) => p.id === B.sit);
  if (id === B.sit) {
    B.hechas.add(id); B.sit = null; renderB();
    if (B.hechas.size === PARES_B.length) mensajeB('¡Relacionaste todas las situaciones! Puedes usar estos apoyos en tu día a día o repetir la actividad.', 'done');
    else mensajeB(`¡Muy bien! ${sit.por}`, 'done');
  } else {
    const otra = PARES_B.find((p) => p.id === id);
    mensajeB(`Ese apoyo es útil, pero sirve más para otra situación: «${otra.sit}». Para esta, prueba con otro.`, 'gentle');
  }
}
function reiniciarB() { B.sit = null; B.hechas.clear(); renderB(); mensajeB(''); }

/* ---- Actividad C ---- */
function renderC() {
  $('#myths').innerHTML = MITOS.map((m, i) => `
    <div class="myth"><button type="button" aria-pressed="false" data-myth="${i}">
      <span class="label">Creencia común</span><span class="claim">${esc(m.m)}</span>
      <span class="real"><span class="label">Lo que se sabe</span>${esc(m.r)}</span>
      <span class="hint hint-closed">Pulsa para ver la explicación</span><span class="hint hint-open">Pulsa para taparla</span>
    </button></div>`).join('');
}

/* ---- Actividad D y resumen ---- */
function renderD() {
  $('#plan-options').innerHTML = ACCIONES_D.map((a) => `<li><label class="plan-opt"><input type="checkbox" value="${a.id}" ${estado.plan.includes(a.id) ? 'checked' : ''}>${ILUS.icon(a.icono).replace('<svg', '<svg class="ico ico--sm" style="margin:0;flex:none"')}<span>${esc(a.t)}</span></label></li>`).join('');
  actualizarD();
}
function actualizarD(mensaje = true) {
  const n = estado.plan.length;
  $$('#plan-options input').forEach((i) => { i.disabled = n >= 3 && !i.checked; });
  const f = $('#d-feedback');
  f.className = `feedback ${n === 3 ? 'done' : ''}`;
  f.textContent = !mensaje || n === 0 ? '' : n < 3 ? `Elegiste ${n} de 3. Puedes elegir ${3 - n} más, o quedarte con ${n === 1 ? 'esta' : 'estas'}.` : 'Tu plan está listo: tres acciones realistas. Lo verás en tu resumen, más abajo.';
  renderResumen();
}
function renderResumen() {
  const d = DATOS, nombre = d.paciente.nombreAutorizado ? d.paciente.nombre : null;
  const plan = estado.plan.map((id) => ACCIONES_D.find((a) => a.id === id)).filter(Boolean);
  $('#resumen-root').innerHTML = `
    <div class="print-only"><h2>Mi resumen · Conozcamos nuestra memoria y cuidemos nuestra salud mental</h2></div>
    ${nombre ? `<p><strong>${esc(nombre)}</strong></p>` : ''}
    <p class="small">Informe entregado el ${esc(d.informe.fechaEntrega || PENDIENTE)}. Este resumen explica el informe con palabras sencillas y no lo reemplaza.</p>
    <h3>Lo que encontró mi evaluación</h3>
    <table><tbody>${d.pruebas.map((p) => `<tr><th scope="row">${esc(p.nombre)}</th><td>${p.etiquetas.map((e) => `${SIMBOLO[e.k]} ${esc(e.t)}`).join(' · ')}</td></tr>`).join('')}</tbody></table>
    <p class="small">Cada prueba tiene su propia escala; no se comparan entre sí. Los detalles están en los capítulos 4 y 5.</p>
    <h3>Mis fortalezas</h3><ul class="list-clean">${d.fortalezas.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    <h3>Lo que conviene apoyar y seguir observando</h3><ul class="list-clean support">${d.apoyos.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
    <h3>Mi pequeño plan de cuidado</h3>
    ${plan.length ? `<ol>${plan.map((a) => `<li>${esc(a.t)}</li>`).join('')}</ol>` : '<p class="small">Aún no elegí acciones. Puedes hacerlo en la actividad D, más arriba.</p>'}
    <h3>Cómo puede ayudar mi familia</h3>
    <ul class="list-clean small-icons"><li>Escuchar sin burlarse y darme tiempo para responder.</li><li>Preguntarme antes de ayudar y dejarme hacer lo que puedo.</li><li>Acompañarme a las consultas si lo deseo.</li></ul>
    <h3>Cuándo consultar</h3>
    <ul class="list-clean small-icons"><li>Si los olvidos aumentan o afectan mi vida diaria: pedir una cita con mi profesional.</li><li>Si hay un cambio repentino (confusión, dificultad para hablar, debilidad de un lado del cuerpo, pérdida de visión) o pensamientos de hacerme daño: llamar de inmediato al ${esc(d.numeroEmergencias)}.</li></ul>
    <p class="small">“Acompañar también es permitir que la persona siga haciendo lo que puede.” Esta cartilla ayuda a comprender la información; no es una prueba diagnóstica.</p>`;
}
function imprimirResumen() {
  document.body.classList.add('print-resumen');
  const limpiar = () => { document.body.classList.remove('print-resumen'); window.removeEventListener('afterprint', limpiar); };
  window.addEventListener('afterprint', limpiar);
  window.print();
}

/* ---- Portada, pie y revisión ---- */
function renderPortadaYPie() {
  $('#portada-art').innerHTML = ILUS.portada;
  if (DATOS.paciente.nombreAutorizado && DATOS.paciente.nombre) {
    const n = $('#nombre-bienvenida'); n.hidden = false; n.textContent = `Para ${DATOS.paciente.nombre}`;
  }
  $('#num-emergencias').textContent = DATOS.numeroEmergencias || PENDIENTE;
  const i = DATOS.informe;
  $('#pie-fuente').textContent = `Contenido basado en el informe neuropsicológico entregado el ${i.fechaEntrega || PENDIENTE}.` +
    (i.mostrarProfesionales ? ` Elaboró: ${i.elaboro}. Firma y aprueba: ${i.avala}.` : '');
  $('#revision-list').innerHTML = DATOS.revision.map((t) => `<li>${esc(t)}</li>`).join('');
}

/* ---- Eventos ---- */
function conectar() {
  document.addEventListener('click', (ev) => {
    const t = ev.target.closest('button, [data-go]');
    if (!t) return;
    if (t.dataset.go) { ir(t.dataset.go); return; }
    if (t.dataset.test !== undefined) { mostrarPrueba(Number(t.dataset.test)); return; }
    if (t.dataset.tnav !== undefined) { mostrarPrueba(Number(t.dataset.tnav)); return; }
    if (t.dataset.scene !== undefined) { const i = Number(t.dataset.scene); t.innerHTML = ILUS[DATOS.pruebas[i].id]; return; }
    if (t.dataset.result !== undefined) {
      const i = t.dataset.result, caja = $(`#res-${i}`), abierto = caja.hidden;
      caja.hidden = !abierto; t.setAttribute('aria-expanded', String(abierto));
      t.textContent = abierto ? 'Ocultar mi resultado' : 'Ver mi resultado';
      if (abierto) caja.classList.add('pulse-once');
      return;
    }
    if (t.dataset.sit) { clicSit(t.dataset.sit); return; }
    if (t.dataset.est) { clicEst(t.dataset.est); return; }
    if (t.dataset.myth !== undefined) { t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true')); return; }
  });

  $('#btn-prev').addEventListener('click', () => ir(estado.cap - 1));
  $('#btn-next').addEventListener('click', () => ir(estado.cap + 1));
  $('#btn-menu').addEventListener('click', () => {
    const s = $('#sidebar'), abierto = s.classList.toggle('open');
    $('#btn-menu').setAttribute('aria-expanded', String(abierto));
  });
  $('#btn-menos').addEventListener('click', () => { estado.escala = Math.max(0.9, +(estado.escala - 0.1).toFixed(2)); aplicarEscala(); guardar(); });
  $('#btn-mas').addEventListener('click', () => { estado.escala = Math.min(1.6, +(estado.escala + 0.1).toFixed(2)); aplicarEscala(); guardar(); });
  $('#btn-motion').addEventListener('click', () => { estado.reducir = !estado.reducir; aplicarMovimiento(); guardar(); });
  $('#modo-breve').addEventListener('click', () => { estado.modo = 'breve'; aplicarModo(); guardar(); });
  $('#modo-mas').addEventListener('click', () => { estado.modo = 'mas'; aplicarModo(); guardar(); });

  $('#a-next').addEventListener('click', () => { pasoA = pasoA === PASOS_A.length - 1 ? 0 : pasoA + 1; renderA(); });
  $('#a-prev').addEventListener('click', () => { if (pasoA > 0) { pasoA -= 1; renderA(); } });
  $('#b-reset').addEventListener('click', reiniciarB);
  $('#c-reset').addEventListener('click', () => $$('#myths button').forEach((b) => b.setAttribute('aria-pressed', 'false')));
  $('#d-reset').addEventListener('click', () => { estado.plan = []; $$('#plan-options input').forEach((i) => { i.checked = false; }); actualizarD(false); guardar(); });
  $('#plan-options').addEventListener('change', (ev) => {
    const i = ev.target; if (!(i instanceof HTMLInputElement)) return;
    if (i.checked) { if (estado.plan.length >= 3) { i.checked = false; return; } estado.plan.push(i.value); }
    else estado.plan = estado.plan.filter((x) => x !== i.value);
    actualizarD(); guardar();
  });
  $('#btn-print').addEventListener('click', imprimirResumen);

  /* Flechas de teclado dentro del índice de capítulos (además de Tab) */
  $('#chapters').addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
    const bs = $$('#chapters button'), i = bs.indexOf(document.activeElement);
    if (i < 0) return;
    ev.preventDefault();
    bs[(i + (ev.key === 'ArrowDown' ? 1 : -1) + bs.length) % bs.length].focus();
  });
}

/* ---- Inicio ---- */
function iniciar() {
  estado.reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cargar();
  pintarIconos();
  construirIndice();
  renderPortadaYPie(); renderPruebas(); renderResultados(); renderPlan(); renderA(); renderB(); renderC(); renderD();
  pintarIconos();
  aplicarEscala(); aplicarMovimiento(); aplicarModo();
  conectar();
  const m = /^#cap-(\d+)$/.exec(location.hash);
  ir(m ? Number(m[1]) : estado.cap, { foco: false });
}
document.addEventListener('DOMContentLoaded', iniciar);
