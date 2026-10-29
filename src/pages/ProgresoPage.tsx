import { Link } from 'react-router-dom';
import { BarChart3, CreditCard, Stethoscope, CheckCircle2, TrendingUp, Calendar } from 'lucide-react';
import { useAppStore, useResumenProgreso, useFlashcardsPorAsignatura } from '../store/useAppStore';
import { CASOS_CLINICOS } from '../data/casos';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PageHeader } from '../components/layout/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function ProgresoPage() {
  const resumen = useResumenProgreso();
  const flashcards = useAppStore((s) => s.flashcards);
  const resultadosCasos = useAppStore((s) => s.resultadosCasos);
  const porAsignatura = useFlashcardsPorAsignatura();

  const asignaturas = Object.keys(porAsignatura).sort();

  // Flashcards vencidas (pendientes)
  const vencidas = flashcards.filter((fc) => new Date(fc.proximoRepaso) <= new Date());
  // Próximas (en los próximos 7 días)
  const proximas = flashcards.filter((fc) => {
    const d = new Date(fc.proximoRepaso);
    const hoy = new Date();
    const en7 = new Date();
    en7.setDate(en7.getDate() + 7);
    return d > hoy && d <= en7;
  });

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Mi Progreso"
        subtitle="Resumen de tu actividad de estudio"
        icon={<BarChart3 size={20} />}
      />

      {/* Resumen estadístico */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-primary-600">{resumen.totalFlashcards}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Total flashcards</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-emerald-600">{resumen.flashcardsDominadas}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Dominadas</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-amber-500">{resumen.flashcardsVencidas}</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Pendientes hoy</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {resumen.casosResueltos > 0 ? `${resumen.promedioAciertos}%` : '—'}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-medium">Promedio aciertos</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Progreso por asignatura */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={18} className="text-primary-600" />
            <h2 className="font-semibold text-slate-800">Flashcards por asignatura</h2>
          </div>
          {asignaturas.length === 0 ? (
            <EmptyState
              icon={<CreditCard />}
              title="Sin flashcards"
              description="Crea flashcards para ver estadísticas por asignatura."
              action={
                <Link to="/flashcards/crear">
                  <button className="btn-primary text-sm px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    Crear primera flashcard
                  </button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {asignaturas.map((asignatura) => {
                const fcs = porAsignatura[asignatura];
                const dominadas = fcs.filter((fc) => fc.ultimoNivel === 'bien' && fc.vecesEstudiada >= 2).length;
                const pct = fcs.length > 0 ? Math.round((dominadas / fcs.length) * 100) : 0;
                return (
                  <div key={asignatura}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700 truncate flex-1">{asignatura}</span>
                      <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                        {dominadas}/{fcs.length} dominadas
                      </span>
                    </div>
                    <ProgressBar
                      value={dominadas}
                      max={fcs.length}
                      color={pct >= 70 ? 'green' : pct >= 40 ? 'amber' : 'blue'}
                      size="sm"
                      showLabel
                    />
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Historial de casos */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Stethoscope size={18} className="text-primary-600" />
              <h2 className="font-semibold text-slate-800">Historial de casos</h2>
            </div>
            <Badge variant="neutral">{resultadosCasos.length} resueltos</Badge>
          </div>

          {/* Progreso casos */}
          <div className="mb-4">
            <ProgressBar
              value={new Set(resultadosCasos.map((r) => r.casoId)).size}
              max={CASOS_CLINICOS.length}
              color="green"
              label="Casos completados"
              showLabel
            />
          </div>

          {resultadosCasos.length === 0 ? (
            <EmptyState
              icon={<Stethoscope />}
              title="Sin casos resueltos"
              description="Completa tu primer caso clínico para ver el historial."
              action={
                <Link to="/casos">
                  <button className="text-sm px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                    Ver casos disponibles
                  </button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-2">
              {[...resultadosCasos].reverse().slice(0, 5).map((resultado) => {
                const pct = Math.round((resultado.puntaje / resultado.totalPreguntas) * 100);
                return (
                  <div
                    key={resultado.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50"
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                        pct >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {pct}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {resultado.casoTitulo}
                      </p>
                      <p className="text-xs text-slate-400">
                        {resultado.puntaje}/{resultado.totalPreguntas} correctas · {formatFecha(resultado.fecha)}
                      </p>
                    </div>
                    {pct >= 70 ? (
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    ) : (
                      <TrendingUp size={16} className="text-amber-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
              {resultadosCasos.length > 5 && (
                <p className="text-xs text-center text-slate-400 pt-1">
                  +{resultadosCasos.length - 5} intentos anteriores
                </p>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Plan de repaso */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-primary-600" />
          <h2 className="font-semibold text-slate-800">Plan de repaso</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-red-700">⚠️ Vencidas</span>
              <span className="text-xs font-bold text-red-600">{vencidas.length}</span>
            </div>
            {vencidas.slice(0, 4).map((fc) => (
              <div key={fc.id} className="text-xs text-slate-500 py-1 border-b border-slate-50 truncate">
                {fc.pregunta}
              </div>
            ))}
            {vencidas.length > 4 && (
              <p className="text-xs text-slate-400 mt-1">+{vencidas.length - 4} más</p>
            )}
            {vencidas.length === 0 && (
              <p className="text-xs text-slate-400">¡Sin vencidas! 🎉</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-amber-700">📅 Próximos 7 días</span>
              <span className="text-xs font-bold text-amber-600">{proximas.length}</span>
            </div>
            {proximas.slice(0, 4).map((fc) => (
              <div key={fc.id} className="text-xs text-slate-500 py-1 border-b border-slate-50 flex justify-between gap-2">
                <span className="truncate">{fc.pregunta}</span>
                <span className="flex-shrink-0 text-slate-400">
                  {new Date(fc.proximoRepaso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            ))}
            {proximas.length > 4 && (
              <p className="text-xs text-slate-400 mt-1">+{proximas.length - 4} más</p>
            )}
            {proximas.length === 0 && (
              <p className="text-xs text-slate-400">Sin repaso próximo.</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-emerald-700">✅ Dominadas</span>
              <span className="text-xs font-bold text-emerald-600">{resumen.flashcardsDominadas}</span>
            </div>
            <div className="mt-2">
              <ProgressBar
                value={resumen.flashcardsDominadas}
                max={resumen.totalFlashcards || 1}
                color="green"
                showLabel
              />
              <p className="text-xs text-slate-400 mt-2">
                {resumen.totalFlashcards > 0
                  ? `${Math.round((resumen.flashcardsDominadas / resumen.totalFlashcards) * 100)}% del total dominado`
                  : 'Crea flashcards para empezar'}
              </p>
            </div>
          </div>
        </div>

        {vencidas.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link to="/flashcards/repasar">
              <button className="w-full py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                Iniciar sesión de repaso ({vencidas.length} pendientes)
              </button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
