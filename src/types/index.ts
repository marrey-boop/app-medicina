// ─── Flashcards ───────────────────────────────────────────────────────────────

export type NivelRepaso = 'bien' | 'regular' | 'mal' | 'nuevo';

export interface Flashcard {
  id: string;
  pregunta: string;
  respuesta: string;
  asignatura: string;
  tema: string;
  /** Fecha ISO del próximo repaso */
  proximoRepaso: string;
  /** Intervalo actual en días */
  intervalo: number;
  /** Veces estudiada */
  vecesEstudiada: number;
  /** Último resultado */
  ultimoNivel: NivelRepaso;
  /** Fue creada automáticamente desde un caso clínico */
  origenCaso?: string;
  fechaCreacion: string;
}

export interface SesionRepaso {
  flashcardId: string;
  nivel: NivelRepaso;
  fecha: string;
}

// ─── Casos Clínicos ───────────────────────────────────────────────────────────

export interface OpcionRespuesta {
  id: string;
  texto: string;
  /** Si esta opción es la correcta */
  esCorrecta: boolean;
  /** Explicación específica de por qué esta opción es correcta o incorrecta */
  explicacion: string;
}

export interface PreguntaCaso {
  id: string;
  enunciado: string;
  opciones: OpcionRespuesta[];
  /** Explicación educativa global de la pregunta */
  explicacionGeneral: string;
  /** Concepto clave que se puede convertir en flashcard */
  conceptoClave?: {
    pregunta: string;
    respuesta: string;
  };
}

export interface CasoClinico {
  id: string;
  titulo: string;
  asignatura: string;
  tema: string;
  dificultad: 'básico' | 'intermedio' | 'avanzado';
  descripcion: string;
  /** Datos del paciente ficticio (solo para contexto educativo) */
  paciente: {
    edad: number;
    sexo: 'masculino' | 'femenino';
    motivoConsulta: string;
    antecedentes: string;
    examenFisico: string;
    examenes?: string;
  };
  preguntas: PreguntaCaso[];
  /** Conceptos clave generales del caso */
  conceptosClave: Array<{
    pregunta: string;
    respuesta: string;
    asignatura: string;
    tema: string;
  }>;
  advertenciaEducativa: string;
}

// ─── Resultados ───────────────────────────────────────────────────────────────

export interface RespuestaEstudiante {
  preguntaId: string;
  opcionSeleccionadaId: string;
  esCorrecta: boolean;
  tiempoRespuesta?: number;
}

export interface ResultadoCaso {
  id: string;
  casoId: string;
  casoTitulo: string;
  fecha: string;
  respuestas: RespuestaEstudiante[];
  puntaje: number;
  totalPreguntas: number;
  tiempoTotal?: number;
}

// ─── Progreso ─────────────────────────────────────────────────────────────────

export interface EstadisticaAsignatura {
  asignatura: string;
  totalFlashcards: number;
  flashcardsDominadas: number;
  casosResueltos: number;
  promedioAciertos: number;
}

export interface ResumenProgreso {
  totalFlashcards: number;
  flashcardsHoy: number;
  flashcardsVencidas: number;
  casosResueltos: number;
  promedioAciertos: number;
  rachaEstudio: number;
  estadisticasPorAsignatura: EstadisticaAsignatura[];
}
