// Respuestas del chat de la web. No usa ninguna API: detecta palabras clave en la
// pregunta y elige la respuesta con más coincidencias.
//
// Para añadir un tema nuevo, copia un bloque y cambia:
//   - keywords: palabras o frases que lo activan (sin tildes ni mayúsculas, da igual).
//               Termina en * para aceptar variantes: "automatiz*" vale para automatizar, automatización…
//   - answer:   el texto. Admite **negrita**, listas con "- " y enlaces [texto](/ruta).
//   - followUps: preguntas sugeridas que aparecen debajo de la respuesta.

export type Intent = {
  id: string;
  keywords: string[];
  answer: string;
  followUps?: string[];
};

export const intents: Intent[] = [
  {
    id: "saludo",
    keywords: ["hola", "buenas", "hey", "buenos dias", "buenas tardes", "que tal", "hello", "hi"],
    answer:
      "¡Hola! Soy el asistente de la web de Adrián. Pregúntame por su trabajo, sus casos de éxito, cómo trabaja o cómo contactar con él.",
    followUps: ["¿Qué hace Adrián exactamente?", "¿Cuál es su mejor caso?", "¿Cómo contacto con él?"],
  },
  {
    id: "quien",
    keywords: ["quien", "quien es", "presenta*", "sobre ti", "sobre el", "perfil", "a que se dedica", "que hace adrian", "rol", "puesto", "trabajo actual", "donde trabaja", "empresa"],
    answer:
      "Adrián Rivas trabaja en marketing en **Visual Trans** (grupo Visual MS), software para logística y transporte. Su terreno es donde se cruzan marketing, ventas, datos e IA: construye **sistemas que generan demanda, ordenan el pipeline y automatizan el trabajo repetitivo**.\n\nSu lema: «quitarme mi propio trabajo». Todo lo que hace más de dos veces acaba convertido en un sistema.",
    followUps: ["¿En qué es especialmente bueno?", "¿Cuál es su mejor caso?", "¿Cómo trabaja?"],
  },
  {
    id: "habilidades",
    keywords: ["bueno", "habilidad*", "skill*", "sabe hacer", "especiali*", "fuerte", "puntos fuertes", "experiencia", "experto", "domina", "competencia*", "servicio*", "que ofrece", "aporta*"],
    answer:
      "Sus cuatro grandes áreas:\n- **IA aplicada**: sistemas por capas, agentes y servidores MCP que resuelven trabajo real.\n- **RevOps y HubSpot**: lead scoring, intención de compra, cadencias SDR y datos limpios.\n- **Generación de demanda**: inbound, webinars, email y LinkedIn medidos en reuniones, pipeline y ARR.\n- **Producto**: diseña y construye sus propias apps con IA, como Cashtor.",
    followUps: ["¿Qué ha hecho con IA?", "¿Qué sabe de HubSpot y RevOps?", "¿Qué es Cashtor?"],
  },
  {
    id: "contenido-ia",
    keywords: ["24000", "24.000", "24 000", "ahorr*", "agencia", "contenido*", "redes", "linkedin", "post*", "cuatro capas", "4 capas", "voz", "calendario", "publicaciones"],
    answer:
      "Es su caso estrella. Las redes de Visual Trans costaban **más de 24.000 € al año** en agencia (75 posts al mes, 5 perfiles). Adrián lo internalizó y después diseñó un **sistema de IA de cuatro capas**:\n- **Datos**: patrones sacados de más de 900 posts reales.\n- **Voz**: un documento de más de 10 páginas por perfil.\n- **Estrategia**: reglas de negocio para repartir temas y días.\n- **Generación**: redacta cada post para ese perfil, ese formato y ese día.\n\nResultado: el calendario completo pasa de 12–14 horas a poco más de 1 hora (**−92 %**). [Ver el caso completo](/casos/contenido-ia-24000)",
    followUps: ["¿Ha escrito sobre esto?", "¿Qué más ha hecho con IA?", "¿Cómo contacto con él?"],
  },
  {
    id: "ia",
    keywords: ["ia", "inteligencia artificial", "ai", "claude", "chatgpt", "gpt", "llm", "prompt*", "automatiz*"],
    answer:
      "La IA está en casi todo lo que construye, siempre donde aporta de verdad:\n- **Contenido con IA**: un sistema de cuatro capas que ahorra más de 24.000 € al año. [Ver caso](/casos/contenido-ia-24000)\n- **Departamento de agentes**: agentes y subagentes para contenido, SDR, diseño y reporting, desplegados al equipo como servidor MCP. [Ver caso](/casos/departamento-marketing-agentes-ia)\n- **Cashtor**: una app de cashflow con IA de voz y de datos. [Ver caso](/casos/cashtor)",
    followUps: ["¿Cómo ahorró 24.000 €?", "¿Qué es eso de los agentes?", "¿Qué es Cashtor?"],
  },
  {
    id: "agentes",
    keywords: ["agente*", "mcp", "servidor", "departamento", "equipo de agentes", "subagente*", "claude code", "ejercito"],
    answer:
      "Adrián ha montado un **departamento de marketing hecho de agentes de IA**: agentes y subagentes para contenido, apoyo a SDRs, diseño y reporting.\n\nPara que lo use todo el equipo sin perder el control, lo está convirtiendo en un **servidor MCP remoto**: una sola versión de las instrucciones, credenciales que nunca salen del servidor y uso medido por persona. [Ver el caso](/casos/departamento-marketing-agentes-ia)",
    followUps: ["¿Qué más ha hecho con IA?", "¿Qué sabe de HubSpot?"],
  },
  {
    id: "lead-scoring",
    keywords: ["lead scoring", "scoring", "puntua*", "intencion", "intencion de compra", "leads", "lead", "mql", "sql", "cualifica*"],
    answer:
      "Está unificando en **un único sistema sobre HubSpot** tres piezas que casi siempre van separadas:\n- **Lead scoring de encaje**: qué empresas se parecen a los mejores clientes.\n- **Intención de compra**: qué están haciendo ahora mismo (visitas a precios, webinars, respuestas…).\n- **Automatización SDR**: cuando encaje e intención se cruzan, el lead entra solo en la cadencia correcta.\n\nEl comercial abre su cola y encuentra a quien tiene más probabilidad de comprar hoy. [Ver el caso](/casos/lead-scoring-intencion-compra)",
    followUps: ["¿Y las cadencias SDR?", "¿Qué sabe de HubSpot y RevOps?"],
  },
  {
    id: "cadencias",
    keywords: ["cadencia*", "sdr*", "prospecc*", "outbound", "secuencia*", "comercial*"],
    answer:
      "En Visual Trans llevaban **casi dos años** sin un sistema que ordenase la prospección de las SDRs. Adrián lo diseñó e implementó entero en HubSpot: una **propiedad central de estado de cadencia** y una lógica que decide automáticamente si cada empresa avanza de paso o se queda, según el estado de su tarea.\n\nYa está en producción y es la base del sistema de lead scoring. [Ver el caso](/casos/cadencias-sdr-hubspot)",
    followUps: ["¿Qué es lo del lead scoring?", "¿Qué sabe de HubSpot?"],
  },
  {
    id: "revops",
    keywords: ["hubspot", "revops", "crm", "pipeline", "ventas", "revenue", "arr", "datos", "integracion*", "sales"],
    answer:
      "HubSpot y RevOps son su día a día:\n- **Cadencias SDR** que avanzan solas. [Ver caso](/casos/cadencias-sdr-hubspot)\n- **Lead scoring + intención de compra** unificados. [Ver caso](/casos/lead-scoring-intencion-compra)\n- Integraciones, calidad de datos y trazabilidad de **pipeline y ARR atribuido**.\n\nMide en oportunidades, reuniones y revenue, no en métricas de vanidad.",
    followUps: ["¿Y las cadencias SDR?", "¿Qué es lo del lead scoring?", "¿Qué herramientas usa?"],
  },
  {
    id: "cashtor",
    keywords: ["cashtor", "cashflow", "cash flow", "app", "aplicacion", "finanzas", "gastos", "dinero", "producto", "side project", "proyecto personal"],
    answer:
      "**Cashtor** es su app de cashflow. Registras gastos hablando («he pagado 42 € de gasolina») gracias a una **IA de voz**, y una **IA de datos** te responde con tus propios números: cuánto has gastado, en qué, y si llegas a final de mes.\n\nDemuestra que también sabe hacer producto de principio a fin. [Ver el caso](/casos/cashtor)",
    followUps: ["¿Qué más ha hecho con IA?", "¿En qué es especialmente bueno?"],
  },
  {
    id: "inbound",
    keywords: ["inbound", "demanda", "webinar*", "newsletter", "seo", "marketing", "campaña*", "eventos"],
    answer:
      "Lleva la **generación de demanda inbound** en Visual Trans: webinars de producto, secuencias de email, SEO y contenido en LinkedIn para la empresa y sus directivos. Todo se mide en lo que importa: **reuniones, oportunidades, pipeline y ARR** generados.",
    followUps: ["¿Cómo ahorró 24.000 € con IA?", "¿Qué sabe de HubSpot?"],
  },
  {
    id: "herramientas",
    keywords: ["herramienta*", "stack", "tecnologia*", "software", "usa", "notion", "jira", "programa*", "codigo", "tools"],
    answer:
      "Su stack habitual: **HubSpot**, **Claude y Claude Code**, servidores **MCP**, **Notion**, **Jira**, automatización de marketing y analítica de LinkedIn. Y cuando no existe la herramienta, la construye.",
    followUps: ["¿Qué ha hecho con IA?", "¿Qué es Cashtor?"],
  },
  {
    id: "forma-trabajar",
    keywords: ["como trabaja", "forma de trabajar", "metodolog*", "enfoque", "filosofia", "valores", "personalidad", "como es"],
    answer:
      "Pragmático y orientado a resultado. Parte de **datos reales** antes que de «buenas prácticas», explica el porqué de cada decisión y **documenta lo que construye** para que otros equipos puedan replicarlo, contando también lo que todavía no está resuelto.",
    followUps: ["¿Cuál es su mejor caso?", "¿Ha escrito artículos?"],
  },
  {
    id: "mejor-caso",
    keywords: ["mejor caso", "caso*", "exito*", "logro*", "resultado*", "proyecto*", "portfolio", "ejemplo*", "hitos"],
    answer:
      "Sus casos de éxito:\n- **Contenido con IA**: +24.000 € al año y −92 % de tiempo. [Ver](/casos/contenido-ia-24000)\n- **Lead scoring + intención de compra**. [Ver](/casos/lead-scoring-intencion-compra)\n- **Cadencias SDR en HubSpot**: dos años de problema, resuelto. [Ver](/casos/cadencias-sdr-hubspot)\n- **Departamento de agentes de IA**. [Ver](/casos/departamento-marketing-agentes-ia)\n- **Cashtor**, su app de cashflow. [Ver](/casos/cashtor)",
    followUps: ["¿Cómo ahorró 24.000 €?", "¿Qué es Cashtor?"],
  },
  {
    id: "blog",
    keywords: ["blog", "articulo*", "escrito", "escribe", "publica*", "lee*", "leer"],
    answer:
      "Sí, cuenta lo que construye en su [blog](/blog). El último: [¿Cómo nos ahorramos más de 24.000 € al año en marketing con IA?](/blog/ahorro-24000-marketing-ia)",
    followUps: ["¿Cuál es su mejor caso?", "¿Cómo contacto con él?"],
  },
  {
    id: "contacto",
    keywords: ["contact*", "hablar", "email", "correo", "linkedin", "contrat*", "llamar", "reunion", "colaborar", "colaboracion", "presupuesto", "precio*", "tarifa*", "disponible", "disponibilidad", "freelance", "trabajo", "oferta", "busca"],
    answer:
      "Adrián está abierto a hablar de proyectos de IA aplicada a marketing y ventas, RevOps y automatización. La forma más rápida es la sección de [contacto](/#contacto) de esta web.",
    followUps: ["¿En qué es especialmente bueno?", "¿Cuál es su mejor caso?"],
  },
  {
    id: "gracias",
    keywords: ["gracias", "genial", "perfecto", "vale", "ok", "guay", "top", "thanks"],
    answer: "¡A ti! Si quieres seguir, pregúntame por cualquier caso o por cómo contactar con Adrián.",
    followUps: ["¿Cuál es su mejor caso?", "¿Cómo contacto con él?"],
  },
];

// Cuando ninguna palabra clave coincide
export const fallback = {
  answer:
    "Eso no lo sé. Solo puedo contarte cosas sobre Adrián: su trabajo, sus casos de éxito, cómo trabaja o cómo contactar con él. Si es otra cosa, lo mejor es que se lo preguntes directamente desde la sección de [contacto](/#contacto).",
  followUps: ["¿Qué hace Adrián exactamente?", "¿Cuál es su mejor caso?", "¿Cómo contacto con él?"],
};

export const initialSuggestions = [
  "¿Qué hace Adrián exactamente?",
  "¿Cómo ahorró 24.000 € con IA?",
  "¿Qué sabe de HubSpot y RevOps?",
  "¿Qué es Cashtor?",
];
