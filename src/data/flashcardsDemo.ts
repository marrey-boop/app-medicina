import type { Flashcard } from '../types';

/**
 * Flashcards de ejemplo pre-cargadas para demostrar la funcionalidad.
 * El estudiante puede crear, editar y eliminar sus propias flashcards.
 */
export const FLASHCARDS_DEMO: Flashcard[] = [
  {
    id: 'fc-demo-001',
    pregunta: '¿Cuáles son los cuatro signos vitales principales?',
    respuesta:
      'Frecuencia cardíaca (FC), Presión arterial (PA), Frecuencia respiratoria (FR) y Temperatura corporal (T°). Algunos incluyen SpO₂ como quinto signo vital.',
    asignatura: 'Semiología Médica',
    tema: 'Signos Vitales',
    proximoRepaso: new Date().toISOString(),
    intervalo: 1,
    vecesEstudiada: 0,
    ultimoNivel: 'nuevo',
    fechaCreacion: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fc-demo-002',
    pregunta: '¿Qué es el triángulo de auscultación?',
    respuesta:
      'Espacio entre el borde inferior del trapecio, el borde superior del dorsal ancho y el borde medial de la escápula. Es el punto donde se ausculta más claramente el murmullo vesicular, ya que hay menos masa muscular.',
    asignatura: 'Semiología Médica',
    tema: 'Aparato Respiratorio',
    proximoRepaso: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    intervalo: 3,
    vecesEstudiada: 2,
    ultimoNivel: 'regular',
    fechaCreacion: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fc-demo-003',
    pregunta: '¿Qué diferencia la crepitación de la subcrepitación en la auscultación pulmonar?',
    respuesta:
      'Crepitación: ruido fino, seco, similar al frotar cabello entre los dedos. Se produce al final de la inspiración por apertura de alvéolos colapsados (fibrosis, neumonía). Subcrepitación: ruido más grueso y húmedo, por secreciones en bronquiolos (bronquitis, edema).',
    asignatura: 'Semiología Médica',
    tema: 'Aparato Respiratorio',
    proximoRepaso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    intervalo: 7,
    vecesEstudiada: 5,
    ultimoNivel: 'bien',
    fechaCreacion: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fc-demo-004',
    pregunta: '¿Qué es la escala de Glasgow y para qué se usa?',
    respuesta:
      'Escala para evaluar el nivel de conciencia. Evalúa tres parámetros: apertura ocular (1-4), respuesta verbal (1-5) y respuesta motora (1-6). Puntaje máximo 15 (consciente) y mínimo 3 (coma profundo). Se usa en trauma, emergencias neurológicas y UCI.',
    asignatura: 'Neurología',
    tema: 'Semiología Neurológica',
    proximoRepaso: new Date().toISOString(),
    intervalo: 1,
    vecesEstudiada: 1,
    ultimoNivel: 'mal',
    fechaCreacion: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fc-demo-005',
    pregunta: '¿Cuáles son los criterios de SIRS (Síndrome de Respuesta Inflamatoria Sistémica)?',
    respuesta:
      'Se requieren ≥2 de los siguientes: (1) T° >38°C o <36°C, (2) FC >90 lpm, (3) FR >20 rpm o PaCO₂ <32 mmHg, (4) Leucocitos >12.000 o <4.000 cel/μL o >10% de cayados. El SIRS con foco infeccioso define sepsis (criterios actuales han evolucionado con Sepsis-3).',
    asignatura: 'Medicina Interna',
    tema: 'Sepsis',
    proximoRepaso: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    intervalo: 1,
    vecesEstudiada: 3,
    ultimoNivel: 'regular',
    fechaCreacion: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fc-demo-006',
    pregunta: '¿Qué es el signo de Babinski y qué indica?',
    respuesta:
      'Extensión del hallux y abanico del resto de los dedos al estimular la planta del pie con un objeto romo. Es normal en menores de 2 años (tractos piramidales inmaduros). En adultos indica lesión de la vía piramidal (motoneurona superior).',
    asignatura: 'Neurología',
    tema: 'Semiología Neurológica',
    proximoRepaso: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    intervalo: 7,
    vecesEstudiada: 4,
    ultimoNivel: 'bien',
    fechaCreacion: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
