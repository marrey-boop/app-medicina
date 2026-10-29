import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Stethoscope,
  Plus,
  User,
  FileText,
  Activity,
} from 'lucide-react';
import { CASOS_CLINICOS } from '../data/casos';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PageHeader } from '../components/layout/PageHeader';
import type { RespuestaEstudiante, PreguntaCaso, OpcionRespuesta } from '../types';
import { clsx } from 'clsx';

type EstadoCaso = 'presentacion' | 'preguntas' | 'resultado';

// ─── Pregunta individual ──────────────────────────────────────────────────────

function PreguntaView({
  pregunta,
  numero,
  total,
  onResponder,
}: {
  pregunta: PreguntaCaso;
  numero: number;
  total: number;
  onResponder: (respuesta: RespuestaEstudiante) => void;
}) {
  const [seleccionada, setSeleccionada] = useState<string | null>(null);
  const [confirmada, setConfirmada] = useState(false);

  const opcionCorrecta = pregunta.opciones.find((o) => o.esCorrecta);
  const opcionSeleccionada = pregunta.opciones.find((o) => o.id === seleccionada);

  function confirmar() {
    if (!seleccionada || confirmada) return;
    setConfirmada(true);
  }

  function siguiente() {
    if (!seleccionada || !opcionCorrecta) return;
    onResponder({
      preguntaId: pregunta.id,
      opcionSeleccionadaId: seleccionada,
      esCorrecta: opcionSeleccionada?.esCorrecta ?? false,
    });
  }

  function getEstiloOpcion(opcion: OpcionRespuesta) {
    if (!confirmada) {
      return clsx(
        'border-2 rounded-xl p-4 cursor-pointer transition-all duration-150',
        seleccionada === opcion.id
          ? 'border-primary-500 bg-primary-50'
          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      );
    }
    if (opcion.esCorrecta) return 'border-2 border-emerald-400 bg-emerald-50 rounded-xl p-4';
    if (opcion.id === seleccionada && !opcion.esCorrecta)
      return 'border-2 border-red-400 bg-red-50 rounded-xl p-4';
    return 'border-2 border-slate-100 bg-slate-50 rounded-xl p-4 opacity-60';
  }

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="neutral">
          Pregunta {numero} de {total}
        </Badge>
        <ProgressBar value={numero - 1} max={total} color="blue" />
      </div>

      <Card className="mb-4">
        <p className="text-base font-semibold text-slate-800 leading-relaxed">
          {pregunta.enunciado}
        </p>
      </Card>

      <div className="space-y-3 mb-4">
        {pregunta.opciones.map((opcion) => (
          <div
            key={opcion.id}
            onClick={() => !confirmada && setSeleccionada(opcion.id)}
            className={getEstiloOpcion(opcion)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {confirmada ? (
                  opcion.esCorrecta ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : opcion.id === seleccionada ? (
                    <XCircle size={18} className="text-red-500" />
                  ) : (
                    <div className="h-4.5 w-4.5 rounded-full border-2 border-slate-300" />
                  )
                ) : (
                  <div
                    className={clsx(
                      'h-4 w-4 rounded-full border-2 mt-0.5',
                      seleccionada === opcion.id
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-slate-300'
                    )}
                  />
                )}
              </div>
              <div className="flex-1">
                <p
                  className={clsx(
                    'text-sm font-medium',
                    confirmada && opcion.esCorrecta
                      ? 'text-emerald-800'
                      : confirmada && opcion.id === seleccionada && !opcion.esCorrecta
                      ? 'text-red-800'
                      : 'text-slate-700'
                  )}
                >
                  {opcion.texto}
                </p>
                {confirmada && opcion.id === seleccionada && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed border-t border-slate-200 pt-2">
                    {opcion.explicacion}
                  </p>
                )}
                {confirmada && opcion.esCorrecta && opcion.id !== seleccionada && (
                  <p className="text-xs text-emerald-700 mt-2 leading-relaxed border-t border-emerald-200 pt-2">
                    {opcion.explicacion}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explicación general tras confirmar */}
      {confirmada && (
        <Alert
          variant={opcionSeleccionada?.esCorrecta ? 'success' : 'warning'}
          title={opcionSeleccionada?.esCorrecta ? '✅ Respuesta correcta' : '❌ Respuesta incorrecta'}
          className="mb-4"
        >
          <p className="text-sm">{pregunta.explicacionGeneral}</p>
        </Alert>
      )}

      {/* Botones */}
      <div className="flex gap-3">
        {!confirmada ? (
          <Button
            fullWidth
            disabled={!seleccionada}
            onClick={confirmar}
          >
            Confirmar respuesta
          </Button>
        ) : (
          <Button fullWidth onClick={siguiente} variant="success">
            {numero === total ? 'Ver resultados' : 'Siguiente pregunta'} <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Página principal del caso ────────────────────────────────────────────────

export function CasoDetallePage() {
  const { id } = useParams<{ id: string }>();
  const guardarResultadoCaso = useAppStore((s) => s.guardarResultadoCaso);
  const agregarFlashcard = useAppStore((s) => s.agregarFlashcard);
  const flashcards = useAppStore((s) => s.flashcards);

  const caso = CASOS_CLINICOS.find((c) => c.id === id);

  const [estado, setEstado] = useState<EstadoCaso>('presentacion');
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestas, setRespuestas] = useState<RespuestaEstudiante[]>([]);
  const [flashcardsAgregadas, setFlashcardsAgregadas] = useState<Set<string>>(new Set());

  if (!caso) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">Caso clínico no encontrado.</p>
        <Link to="/casos">
          <Button variant="secondary">Volver a casos</Button>
        </Link>
      </div>
    );
  }

  function handleResponder(respuesta: RespuestaEstudiante) {
    const nuevas = [...respuestas, respuesta];
    setRespuestas(nuevas);

    if (indicePregunta + 1 >= caso!.preguntas.length) {
      const puntaje = nuevas.filter((r) => r.esCorrecta).length;
      guardarResultadoCaso({
        casoId: caso!.id,
        casoTitulo: caso!.titulo,
        fecha: new Date().toISOString(),
        respuestas: nuevas,
        puntaje,
        totalPreguntas: caso!.preguntas.length,
      });
      setEstado('resultado');
    } else {
      setIndicePregunta((i) => i + 1);
    }
  }

  function agregarFlashcardDesde(pregunta: string, respuesta: string, key: string) {
    agregarFlashcard({
      pregunta,
      respuesta,
      asignatura: caso!.asignatura,
      tema: caso!.tema,
      origenCaso: caso!.id,
    });
    setFlashcardsAgregadas((s) => new Set([...s, key]));
  }

  const puntaje = respuestas.filter((r) => r.esCorrecta).length;
  const pct = Math.round((puntaje / caso.preguntas.length) * 100);

  // ── Presentación del caso ──
  if (estado === 'presentacion') {
    return (
      <div className="animate-fade-in">
        <PageHeader
          title={caso.titulo}
          icon={<Stethoscope size={20} />}
          action={
            <Link to="/casos">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} /> Casos
              </Button>
            </Link>
          }
        />

        {/* Aviso educativo */}
        <Alert variant="warning" className="mb-6">
          <strong>{caso.advertenciaEducativa}</strong>
        </Alert>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <Badge variant={caso.dificultad === 'básico' ? 'success' : caso.dificultad === 'intermedio' ? 'warning' : 'error'}>
            {caso.dificultad}
          </Badge>
          <Badge variant="neutral">{caso.asignatura}</Badge>
          <Badge variant="info">{caso.tema}</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Datos del paciente ficticio */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-primary-600" />
              <h3 className="font-semibold text-slate-800">Datos del paciente ficticio</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-slate-600">Edad:</span>{' '}
                <span className="text-slate-800">{caso.paciente.edad} años</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Sexo:</span>{' '}
                <span className="text-slate-800 capitalize">{caso.paciente.sexo}</span>
              </div>
              <div>
                <span className="font-medium text-slate-600">Motivo de consulta:</span>
                <p className="text-slate-800 mt-1 leading-relaxed">{caso.paciente.motivoConsulta}</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <FileText size={16} className="text-primary-600" />
                <h4 className="font-semibold text-slate-800 text-sm">Antecedentes</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{caso.paciente.antecedentes}</p>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-primary-600" />
                <h4 className="font-semibold text-slate-800 text-sm">Examen físico</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{caso.paciente.examenFisico}</p>
            </Card>
          </div>
        </div>

        {caso.paciente.examenes && (
          <Card className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-primary-600" />
              <h4 className="font-semibold text-slate-800 text-sm">Exámenes complementarios</h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{caso.paciente.examenes}</p>
          </Card>
        )}

        <Card className="mb-6 bg-primary-50 border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-primary-800">{caso.preguntas.length} preguntas de selección múltiple</p>
              <p className="text-sm text-primary-600 mt-0.5">Lee cuidadosamente cada pregunta antes de responder</p>
            </div>
            <Button onClick={() => setEstado('preguntas')} size="lg">
              Iniciar caso <ChevronRight size={18} />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ── Preguntas ──
  if (estado === 'preguntas') {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => { setEstado('presentacion'); setIndicePregunta(0); setRespuestas([]); }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <p className="text-xs text-slate-400 mb-1">{caso.titulo}</p>
            <ProgressBar value={indicePregunta} max={caso.preguntas.length} color="blue" />
          </div>
        </div>

        <PreguntaView
          pregunta={caso.preguntas[indicePregunta]}
          numero={indicePregunta + 1}
          total={caso.preguntas.length}
          onResponder={handleResponder}
        />
      </div>
    );
  }

  // ── Resultado ──
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/casos" className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="text-xs text-slate-400">Resultado</p>
          <h1 className="font-bold text-slate-900">{caso.titulo}</h1>
        </div>
      </div>

      {/* Resumen */}
      <Card className="mb-6 text-center">
        <div className={`text-5xl mb-3`}>
          {pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '💪' : '📖'}
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">{pct}% de aciertos</h2>
        <p className="text-slate-500 mb-4">
          {puntaje} de {caso.preguntas.length} preguntas correctas
        </p>
        <ProgressBar
          value={puntaje}
          max={caso.preguntas.length}
          color={pct >= 70 ? 'green' : pct >= 50 ? 'amber' : 'red'}
          showLabel
        />
        <p className="text-sm text-slate-500 mt-3">
          {pct >= 80
            ? '¡Excelente desempeño! Tienes un muy buen dominio de este tema.'
            : pct >= 60
            ? 'Buen trabajo. Revisa las preguntas incorrectas y sus explicaciones.'
            : 'Hay conceptos que necesitan refuerzo. Crea flashcards de los temas difíciles.'}
        </p>
      </Card>

      {/* Revisión por pregunta */}
      <h2 className="font-semibold text-slate-800 mb-4">Revisión de respuestas</h2>
      <div className="space-y-4 mb-6">
        {caso.preguntas.map((pregunta, idx) => {
          const respuesta = respuestas[idx];
          const opcionDada = pregunta.opciones.find((o) => o.id === respuesta?.opcionSeleccionadaId);
          const opcionCorrecta = pregunta.opciones.find((o) => o.esCorrecta);

          return (
            <Card key={pregunta.id}>
              <div className="flex items-start gap-3 mb-3">
                {respuesta?.esCorrecta ? (
                  <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5" size={18} />
                ) : (
                  <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{pregunta.enunciado}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-slate-500">
                      Tu respuesta:{' '}
                      <span className={respuesta?.esCorrecta ? 'text-emerald-700 font-medium' : 'text-red-700 font-medium'}>
                        {opcionDada?.texto}
                      </span>
                    </p>
                    {!respuesta?.esCorrecta && (
                      <p className="text-xs text-slate-500">
                        Respuesta correcta:{' '}
                        <span className="text-emerald-700 font-medium">{opcionCorrecta?.texto}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 mb-3">
                {pregunta.explicacionGeneral}
              </div>

              {/* Crear flashcard desde concepto clave */}
              {pregunta.conceptoClave && (
                <div className="border border-dashed border-primary-200 rounded-lg p-3 bg-primary-50">
                  <p className="text-xs font-semibold text-primary-700 mb-1">💡 Concepto clave</p>
                  <p className="text-xs text-primary-600 mb-2">{pregunta.conceptoClave.pregunta}</p>
                  {flashcardsAgregadas.has(`pregunta-${pregunta.id}`) ? (
                    <p className="text-xs text-emerald-600 font-medium">✅ Flashcard agregada</p>
                  ) : (
                    <button
                      onClick={() =>
                        agregarFlashcardDesde(
                          pregunta.conceptoClave!.pregunta,
                          pregunta.conceptoClave!.respuesta,
                          `pregunta-${pregunta.id}`
                        )
                      }
                      className="text-xs text-primary-700 border border-primary-300 bg-white hover:bg-primary-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Plus size={12} /> Crear flashcard de este concepto
                    </button>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Conceptos clave generales */}
      {caso.conceptosClave.length > 0 && (
        <>
          <h2 className="font-semibold text-slate-800 mb-4">
            Conceptos clave del caso
          </h2>
          <div className="space-y-3 mb-6">
            {caso.conceptosClave.map((concepto, idx) => {
              const key = `concepto-${idx}`;
              const yaExiste = flashcards.some(
                (fc) => fc.pregunta === concepto.pregunta && fc.origenCaso === caso.id
              );
              return (
                <Card key={idx} className="border-l-4 border-primary-400">
                  <p className="text-sm font-medium text-slate-800 mb-1">{concepto.pregunta}</p>
                  <p className="text-xs text-slate-500 mb-3">{concepto.respuesta}</p>
                  {(flashcardsAgregadas.has(key) || yaExiste) ? (
                    <p className="text-xs text-emerald-600 font-medium">✅ Ya está en tus flashcards</p>
                  ) : (
                    <button
                      onClick={() =>
                        agregarFlashcardDesde(concepto.pregunta, concepto.respuesta, key)
                      }
                      className="text-xs text-primary-700 border border-primary-300 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Plus size={12} /> Agregar a mis flashcards
                    </button>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Acciones finales */}
      <div className="flex gap-3">
        <Link to="/casos" className="flex-1">
          <Button variant="secondary" fullWidth>
            <ArrowLeft size={16} /> Volver a casos
          </Button>
        </Link>
        <Link to="/flashcards" className="flex-1">
          <Button fullWidth>
            Ver mis flashcards <ChevronRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
