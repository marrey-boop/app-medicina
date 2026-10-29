import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Flashcard, NivelRepaso, ResultadoCaso, SesionRepaso } from '../types';
import { FLASHCARDS_DEMO } from '../data/flashcardsDemo';

// ─── Intervalos de repaso espaciado ──────────────────────────────────────────
const INTERVALOS: Record<NivelRepaso, number> = {
  bien: 7,
  regular: 3,
  mal: 1,
  nuevo: 1,
};

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
  // ── Flashcards
  flashcards: Flashcard[];
  sesionesRepaso: SesionRepaso[];

  // ── Resultados de casos
  resultadosCasos: ResultadoCaso[];

  // ── Acciones de flashcards
  agregarFlashcard: (data: Omit<Flashcard, 'id' | 'proximoRepaso' | 'intervalo' | 'vecesEstudiada' | 'ultimoNivel' | 'fechaCreacion'>) => string;
  editarFlashcard: (id: string, data: Partial<Pick<Flashcard, 'pregunta' | 'respuesta' | 'asignatura' | 'tema'>>) => void;
  eliminarFlashcard: (id: string) => void;
  registrarRepaso: (flashcardId: string, nivel: NivelRepaso) => void;

  // ── Acciones de casos
  guardarResultadoCaso: (resultado: Omit<ResultadoCaso, 'id'>) => void;

  // ── Inicialización
  inicializado: boolean;
  inicializarDemoSiNecesario: () => void;
}

function generarId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      flashcards: [],
      sesionesRepaso: [],
      resultadosCasos: [],
      inicializado: false,

      inicializarDemoSiNecesario: () => {
        const { inicializado } = get();
        if (!inicializado) {
          set({
            flashcards: FLASHCARDS_DEMO,
            inicializado: true,
          });
        }
      },

      agregarFlashcard: (data) => {
        const id = generarId();
        const nueva: Flashcard = {
          ...data,
          id,
          proximoRepaso: new Date().toISOString(),
          intervalo: 1,
          vecesEstudiada: 0,
          ultimoNivel: 'nuevo',
          fechaCreacion: new Date().toISOString(),
        };
        set((state) => ({ flashcards: [...state.flashcards, nueva] }));
        return id;
      },

      editarFlashcard: (id, data) => {
        set((state) => ({
          flashcards: state.flashcards.map((fc) =>
            fc.id === id ? { ...fc, ...data } : fc
          ),
        }));
      },

      eliminarFlashcard: (id) => {
        set((state) => ({
          flashcards: state.flashcards.filter((fc) => fc.id !== id),
        }));
      },

      registrarRepaso: (flashcardId, nivel) => {
        const { flashcards } = get();
        const fc = flashcards.find((f) => f.id === flashcardId);
        if (!fc) return;

        const nuevoIntervalo =
          nivel === 'bien'
            ? Math.min(fc.intervalo * 2, 60)
            : INTERVALOS[nivel];

        const proximoRepaso = (() => {
          const fecha = new Date();
          fecha.setDate(fecha.getDate() + nuevoIntervalo);
          return fecha.toISOString();
        })();

        const sesion: SesionRepaso = {
          flashcardId,
          nivel,
          fecha: new Date().toISOString(),
        };

        set((state) => ({
          flashcards: state.flashcards.map((f) =>
            f.id === flashcardId
              ? {
                  ...f,
                  proximoRepaso,
                  intervalo: nuevoIntervalo,
                  vecesEstudiada: f.vecesEstudiada + 1,
                  ultimoNivel: nivel,
                }
              : f
          ),
          sesionesRepaso: [...state.sesionesRepaso, sesion],
        }));
      },

      guardarResultadoCaso: (resultado) => {
        const nuevo: ResultadoCaso = {
          ...resultado,
          id: generarId(),
        };
        set((state) => ({
          resultadosCasos: [...state.resultadosCasos, nuevo],
        }));
      },
    }),
    {
      name: 'mediflash-edu-store',
      version: 1,
    }
  )
);

// ─── Selectores derivados ─────────────────────────────────────────────────────

export function useFlashcardsPendientes() {
  const flashcards = useAppStore((s) => s.flashcards);
  const hoy = new Date();
  return flashcards.filter((fc) => new Date(fc.proximoRepaso) <= hoy);
}

export function useFlashcardsPorAsignatura() {
  const flashcards = useAppStore((s) => s.flashcards);
  const mapa: Record<string, Flashcard[]> = {};
  for (const fc of flashcards) {
    if (!mapa[fc.asignatura]) mapa[fc.asignatura] = [];
    mapa[fc.asignatura].push(fc);
  }
  return mapa;
}

export function useResumenProgreso() {
  const flashcards = useAppStore((s) => s.flashcards);
  const resultadosCasos = useAppStore((s) => s.resultadosCasos);
  const hoy = new Date();

  const vencidas = flashcards.filter((fc) => new Date(fc.proximoRepaso) <= hoy);
  const dominadas = flashcards.filter((fc) => fc.ultimoNivel === 'bien' && fc.vecesEstudiada >= 2);

  const promedioAciertos =
    resultadosCasos.length === 0
      ? 0
      : Math.round(
          (resultadosCasos.reduce((acc, r) => acc + r.puntaje / r.totalPreguntas, 0) /
            resultadosCasos.length) *
            100
        );

  return {
    totalFlashcards: flashcards.length,
    flashcardsVencidas: vencidas.length,
    flashcardsDominadas: dominadas.length,
    casosResueltos: resultadosCasos.length,
    promedioAciertos,
  };
}
