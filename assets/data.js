/* =========================================================
   QUADRA ACADEMY — Catálogo de cursos
   ---------------------------------------------------------
   Editá este archivo para cargar tus cursos.
   - price / oldPrice en guaraníes (número, sin puntos).
   - video de cada lección:
       'youtube:ID'   → video de YouTube (recomendado: "no listado")
       'vimeo:ID'     → video de Vimeo (ideal con privacidad por dominio)
       'https://…mp4' → archivo de video directo
   - free: true      → lección de vista previa, visible sin comprar.
   En producción con Supabase, los videos de las lecciones pagas
   se leen de la tabla lesson_videos (protegida), no de acá.
   ========================================================= */
(function () {
  var SAMPLE = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

  function L(id, title, dur, free) { return { id: id, title: title, dur: dur, free: !!free, video: SAMPLE }; }

  window.QA_CATEGORIES = ['Todos', 'Contabilidad', 'Tributación', 'Laboral', 'Inteligencia artificial'];

  window.QA_COURSES = [
    {
      slug: 'contabilidad-desde-cero',
      title: 'Contabilidad desde cero',
      category: 'Contabilidad',
      glyph: 'Debe & Haber',
      c1: 'rgba(18,184,134,.55)', c2: 'rgba(44,197,232,.3)',
      level: 'Inicial', hours: 14, price: 390000, oldPrice: 590000,
      short: 'Partida doble, plan de cuentas, asientos y estados contables con casos de empresas paraguayas.',
      description: 'El curso para entender la contabilidad de verdad, sin fórmulas de memoria. Vas a registrar operaciones reales, armar el libro diario y mayor, y llegar al balance general y estado de resultados de una pyme.',
      outcomes: ['Registrar asientos con la lógica de la partida doble', 'Armar un plan de cuentas para una pyme', 'Llevar libro diario, mayor y balance de sumas y saldos', 'Preparar balance general y estado de resultados', 'Hacer ajustes y cierre del ejercicio', 'Leer estados contables para tomar decisiones'],
      modules: [
        { title: 'Fundamentos', lessons: [L('c1-1', 'Qué es la contabilidad y para qué sirve', '08:20', true), L('c1-2', 'Activo, pasivo y patrimonio neto', '12:45'), L('c1-3', 'La partida doble explicada con ejemplos', '15:10')] },
        { title: 'Registración', lessons: [L('c1-4', 'Plan de cuentas paso a paso', '14:30'), L('c1-5', 'Libro diario y libro mayor', '18:05'), L('c1-6', 'Balance de sumas y saldos', '11:40')] },
        { title: 'Estados contables', lessons: [L('c1-7', 'Ajustes y cierre del ejercicio', '16:25'), L('c1-8', 'Balance general y estado de resultados', '19:50')] }
      ]
    },
    {
      slug: 'tributacion-paraguay',
      title: 'Tributación en Paraguay: IVA, IRE e IRP',
      category: 'Tributación',
      glyph: 'IVA · IRE',
      c1: 'rgba(31,91,255,.6)', c2: 'rgba(126,232,196,.25)',
      level: 'Intermedio', hours: 18, price: 490000, oldPrice: 690000,
      short: 'El sistema tributario de la Ley 6380 aplicado: liquidaciones, formularios y calendario de vencimientos ante la DNIT.',
      description: 'Aprendé a liquidar los principales impuestos del país con ejemplos completos: IVA general y diferenciado, IRE General y Simple, IRP-RSP e IDU. Cada clase termina con el formulario resuelto en Marangatu.',
      outcomes: ['Entender la estructura de la Ley 6380/19', 'Liquidar IVA mensual (Form. 120)', 'Calcular IRE General, Simple y Resimple', 'Declarar IRP de rentas y servicios personales', 'Aplicar retenciones y percepciones', 'Organizar el calendario fiscal por RUC'],
      modules: [
        { title: 'Marco general', lessons: [L('t-1', 'Panorama del sistema tributario paraguayo', '10:15', true), L('t-2', 'RUC, obligaciones y Marangatu', '13:30')] },
        { title: 'IVA', lessons: [L('t-3', 'Hecho generador, base y tasas', '17:40'), L('t-4', 'Crédito fiscal y liquidación del Form. 120', '22:10'), L('t-5', 'Retenciones de IVA', '14:55')] },
        { title: 'Impuestos a la renta', lessons: [L('t-6', 'IRE General: renta neta y deducciones', '21:30'), L('t-7', 'IRE Simple y Resimple', '12:20'), L('t-8', 'IRP-RSP paso a paso', '18:45'), L('t-9', 'IDU y distribución de utilidades', '11:05')] }
      ]
    },
    {
      slug: 'facturacion-electronica-sifen',
      title: 'Facturación electrónica SIFEN',
      category: 'Tributación',
      glyph: 'SIFEN',
      c1: 'rgba(44,197,232,.55)', c2: 'rgba(31,91,255,.35)',
      level: 'Intermedio', hours: 8, price: 290000, oldPrice: 390000,
      short: 'Documentos electrónicos, KuDE, CDC, eventos y conciliación contra libros y RG 90.',
      description: 'Todo lo que un contador necesita para acompañar a sus clientes en SIFEN: tipos de documentos, eventos de cancelación e inutilización, validaciones y cómo cruzar los DE con la contabilidad y el registro de comprobantes.',
      outcomes: ['Conocer los tipos de documento electrónico', 'Leer un KuDE y validar el CDC', 'Gestionar eventos: cancelación, inutilización, conformidad', 'Conciliar DE recibidos contra libros', 'Preparar el registro de comprobantes (RG 90)'],
      modules: [
        { title: 'SIFEN en la práctica', lessons: [L('s-1', 'Qué cambia con la facturación electrónica', '09:30', true), L('s-2', 'Tipos de DE, KuDE y CDC', '14:10'), L('s-3', 'Eventos del receptor y del emisor', '12:50')] },
        { title: 'Control y conciliación', lessons: [L('s-4', 'Descarga y validación de DE recibidos', '15:20'), L('s-5', 'Cruce SIFEN vs. libros vs. RG 90', '19:35')] }
      ]
    },
    {
      slug: 'ips-aportes-y-planillas',
      title: 'IPS: aportes, planillas y REI',
      category: 'Laboral',
      glyph: 'IPS',
      c1: 'rgba(126,232,196,.5)', c2: 'rgba(18,184,134,.35)',
      level: 'Inicial', hours: 9, price: 320000, oldPrice: 450000,
      short: 'Inscripción patronal, alta y baja de asegurados, cálculo de aportes y planillas mensuales en el sistema REI.',
      description: 'Un recorrido completo por las obligaciones con el Instituto de Previsión Social: desde inscribir al empleador hasta presentar la planilla mensual sin rechazos, con casos de salario mínimo, comisiones, horas extras y vacaciones.',
      outcomes: ['Inscribir empleadores y asegurados', 'Calcular aportes obrero-patronales', 'Presentar planillas en el sistema REI', 'Tratar horas extras, comisiones y aguinaldo', 'Gestionar altas, bajas y reposos', 'Evitar multas y recargos'],
      modules: [
        { title: 'Obligaciones con el IPS', lessons: [L('i-1', 'El IPS y quiénes deben aportar', '08:45', true), L('i-2', 'Inscripción patronal y del asegurado', '13:15')] },
        { title: 'Aportes y planillas', lessons: [L('i-3', 'Cálculo de aportes: casos prácticos', '17:30'), L('i-4', 'Planilla mensual en el REI', '20:05'), L('i-5', 'Altas, bajas, reposos y rectificativas', '14:40')] }
      ]
    },
    {
      slug: 'ministerio-de-trabajo',
      title: 'Ministerio de Trabajo: contratos y planillas',
      category: 'Laboral',
      glyph: 'MTESS',
      c1: 'rgba(138,154,176,.55)', c2: 'rgba(18,184,134,.3)',
      level: 'Intermedio', hours: 10, price: 350000, oldPrice: 490000,
      short: 'Registro obrero patronal, planillas anuales, contratos, liquidaciones y obligaciones ante el MTESS.',
      description: 'Las obligaciones laborales que todo estudio contable gestiona: inscripción en el MTESS, planillas de sueldos y de empleados, contratos de trabajo, preaviso, indemnización y liquidación final según el Código Laboral.',
      outcomes: ['Inscribir la empresa en el MTESS', 'Presentar planillas de empleados, sueldos y resumen general', 'Redactar contratos de trabajo correctos', 'Calcular vacaciones, aguinaldo y liquidaciones', 'Calcular preaviso e indemnización', 'Prepararse para una inspección laboral'],
      modules: [
        { title: 'Registro y planillas', lessons: [L('m-1', 'Obligaciones del empleador ante el MTESS', '09:55', true), L('m-2', 'Planillas anuales paso a paso', '18:20')] },
        { title: 'Relación laboral', lessons: [L('m-3', 'Contratos de trabajo y período de prueba', '13:45'), L('m-4', 'Vacaciones, aguinaldo y horas extras', '16:10'), L('m-5', 'Preaviso, indemnización y liquidación final', '21:00')] }
      ]
    },
    {
      slug: 'ia-para-contadores',
      title: 'IA para contadores',
      category: 'Inteligencia artificial',
      glyph: 'IA ✦',
      c1: 'rgba(31,91,255,.55)', c2: 'rgba(126,232,196,.4)',
      level: 'Todos los niveles', hours: 7, price: 350000, oldPrice: 520000,
      short: 'Usá ChatGPT, Claude y Gemini para analizar extractos, redactar informes, consultar normativa y automatizar tareas del estudio.',
      description: 'Inteligencia artificial aplicada al trabajo diario de un estudio contable. Prompts listos para usar, flujos para procesar planillas y documentos, análisis de estados contables y buenas prácticas para proteger la información de tus clientes.',
      outcomes: ['Escribir prompts efectivos para tareas contables', 'Analizar extractos y planillas con IA', 'Redactar informes y notas a clientes en minutos', 'Consultar normativa con fuentes verificables', 'Automatizar tareas repetitivas del estudio', 'Cuidar la confidencialidad de los datos'],
      modules: [
        { title: 'Primeros pasos', lessons: [L('a-1', 'Qué puede (y qué no) hacer la IA por un contador', '10:30', true), L('a-2', 'El prompt contable: estructura y ejemplos', '14:50')] },
        { title: 'Casos de uso', lessons: [L('a-3', 'Análisis de extractos y mayores', '17:15'), L('a-4', 'Informes de gestión y notas a clientes', '13:40'), L('a-5', 'Consultas tributarias con verificación', '12:25'), L('a-6', 'Automatizaciones con planillas', '18:30')] }
      ]
    },
    {
      slug: 'ia-para-emprendedores',
      title: 'IA para emprendedores',
      category: 'Inteligencia artificial',
      glyph: 'IA ⟶ $',
      c1: 'rgba(18,184,134,.5)', c2: 'rgba(31,91,255,.4)',
      level: 'Todos los niveles', hours: 6, price: 290000, oldPrice: 420000,
      short: 'Marketing, ventas, finanzas y atención al cliente con herramientas de IA, sin saber programar.',
      description: 'Para dueños de negocio que quieren hacer más con menos. Vas a armar tu plan de negocio, contenido para redes, respuestas de atención al cliente, un tablero de finanzas y pequeños asistentes que trabajan por vos.',
      outcomes: ['Validar ideas y armar un plan de negocio', 'Crear contenido para redes y anuncios', 'Atender clientes por WhatsApp con plantillas de IA', 'Ordenar tus finanzas y flujo de caja', 'Elegir herramientas sin gastar de más'],
      modules: [
        { title: 'Tu negocio con IA', lessons: [L('e-1', 'El mapa de herramientas de IA para pymes', '09:10', true), L('e-2', 'Plan de negocio y propuesta de valor', '15:30')] },
        { title: 'Vender y operar', lessons: [L('e-3', 'Contenido y anuncios que convierten', '16:45'), L('e-4', 'Atención al cliente con plantillas', '12:15'), L('e-5', 'Finanzas simples: flujo de caja con IA', '14:20')] }
      ]
    },
    {
      slug: 'excel-para-contadores',
      title: 'Excel para contadores',
      category: 'Contabilidad',
      glyph: 'Σ fx',
      c1: 'rgba(18,184,134,.45)', c2: 'rgba(138,154,176,.35)',
      level: 'Inicial', hours: 11, price: 290000, oldPrice: 390000,
      short: 'Tablas dinámicas, BUSCARX, conciliaciones y reportes automáticos para el día a día contable.',
      description: 'Las funciones y técnicas de Excel que más usa un contador: limpieza de extractos, conciliaciones con BUSCARX, tablas dinámicas para el mayor, plantillas de IVA y reportes que se actualizan solos.',
      outcomes: ['Limpiar y ordenar extractos bancarios', 'Conciliar con BUSCARX y COINCIDIR', 'Resumir el mayor con tablas dinámicas', 'Armar plantillas de liquidación de IVA', 'Crear reportes automáticos'],
      modules: [
        { title: 'Base sólida', lessons: [L('x-1', 'Atajos y formato que ahorran horas', '11:20', true), L('x-2', 'Limpieza de datos importados', '15:00')] },
        { title: 'Excel contable', lessons: [L('x-3', 'Conciliación bancaria con BUSCARX', '19:40'), L('x-4', 'Tablas dinámicas para el mayor', '17:25'), L('x-5', 'Plantilla de IVA mensual', '16:05')] }
      ]
    }
  ];

  // Utilidades
  window.QA_findCourse = function (slug) {
    for (var i = 0; i < window.QA_COURSES.length; i++) if (window.QA_COURSES[i].slug === slug) return window.QA_COURSES[i];
    return null;
  };
  window.QA_lessons = function (course) {
    var out = [];
    course.modules.forEach(function (m) { m.lessons.forEach(function (l) { out.push(l); }); });
    return out;
  };
})();
