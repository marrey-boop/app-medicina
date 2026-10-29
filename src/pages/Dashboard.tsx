import { Link } from 'react-router-dom';
import { CreditCard, Stethoscope, BarChart3, BookOpen, ChevronRight, Clock } from 'lucide-react';
import { useResumenProgreso, useFlashcardsPendientes, useAppStore } from '../store/useAppStore';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { CASOS_CLINICOS } from '../data/casos';

function StatCard({
  label,
  value,
  sublabel,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  color: 'blue' | 'green' | 'amber' | 'red' | 'purple';
  icon: React.ReactNode;
}) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {sublabel && <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>}
        </div>
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function Dashboard() {
  const resumen = useResumenProgreso();
  const pendientes = useFlashcardsPendientes();
  const resultadosCasos = useAppStore((s) => s.resultadosCasos);

  const casosResueltos = new Set(resultadosCasos.map((r) => r.casoId));
  const casosDisponibles = CASOS_CLINICOS.filter((c) => !casosResueltos.has(c.id));
  const ultimas5Pendientes = pendientes.slice(0, 5);

  return (
    <div className="animate-fade-in">
      {/* Bienvenida */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Bienvenido a MediFlash Edu 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Tu plataforma de estudio médico. Repasa, practica y aprende a tu ritmo.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Flashcards"
          value={resumen.totalFlashcards}
          sublabel={`${resumen.flashcardsDominadas} dominadas`}
          color="blue"
          icon={<CreditCard size={20} />}
        />
        <StatCard
          label="Para Repasar"
          value={resumen.flashcardsVencidas}
          sublabel="vencidas hoy"
          color={resumen.flashcardsVencidas > 0 ? 'amber' : 'green'}
          icon={<Clock size={20} />}
        />
        <StatCard
          label="Casos Resueltos"
          value={resumen.casosResueltos}
          sublabel={`de ${CASOS_CLINICOS.length} disponibles`}
          color="green"
          icon={<Stethoscope size={20} />}
        />
        <StatCard
          label="Promedio Aciertos"
          value={resumen.casosResueltos > 0 ? `${resumen.promedioAciertos}%` : '—'}
          sublabel={resumen.casosResueltos === 0 ? 'sin casos resueltos' : 'en casos clínicos'}
          color="purple"
          icon={<BarChart3 size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flashcards pendientes */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <CreditCard size={18} className="text-primary-600" />
                Flashcards pendientes de repaso
              </h2>
              <Link
                to="/flashcards/repasar"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                Ver todas <ChevronRight size={14} />
              </Link>
            </div>

            {pendientes.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-sm font-medium text-slate-700">¡Al día con el repaso!</p>
                <p className="text-xs text-slate-400 mt-1">No tienes flashcards pendientes hoy</p>
              </div>
            ) : (
              <div className="space-y-2">
                {ultimas5Pendientes.map((fc) => (
                  <div
                    key={fc.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">{fc.pregunta}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {fc.asignatura} · {fc.tema}
                      </p>
                    </div>
                    <Badge
                      variant={
                        fc.ultimoNivel === 'bien'
                          ? 'success'
                          : fc.ultimoNivel === 'regular'
                          ? 'warning'
                          : fc.ultimoNivel === 'mal'
                          ? 'error'
                          : 'neutral'
                      }
                    >
                      {fc.ultimoNivel}
                    </Badge>
                  </div>
                ))}
                {pendientes.length > 5 && (
                  <p className="text-xs text-slate-400 text-center pt-1">
                    +{pendientes.length - 5} más pendientes
                  </p>
                )}
                <Link to="/flashcards/repasar" className="block mt-3">
                  <button className="w-full py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                    Iniciar sesión de repaso ({pendientes.length})
                  </button>
                </Link>
              </div>
            )}
          </Card>
        </div>

        {/* Casos disponibles */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <Stethoscope size={18} className="text-primary-600" />
                Casos clínicos
              </h2>
              <Link
                to="/casos"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
              >
                Ver todos <ChevronRight size={14} />
              </Link>
            </div>

            <div className="mb-4">
              <ProgressBar
                value={casosResueltos.size}
                max={CASOS_CLINICOS.length}
                color="green"
                label="Completados"
                showLabel
              />
            </div>

            <div className="space-y-2">
              {casosDisponibles.slice(0, 3).map((caso) => (
                <Link key={caso.id} to={`/casos/${caso.id}`}>
                  <div className="p-3 rounded-lg border border-slate-100 hover:border-primary-200 hover:bg-primary-50 transition-all group">
                    <p className="text-sm font-medium text-slate-700 group-hover:text-primary-700 line-clamp-2">
                      {caso.titulo}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="neutral">{caso.asignatura}</Badge>
                      <Badge
                        variant={
                          caso.dificultad === 'básico'
                            ? 'success'
                            : caso.dificultad === 'intermedio'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {caso.dificultad}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}

              {casosDisponibles.length === 0 && (
                <div className="text-center py-4">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-sm text-slate-500">¡Casos completados!</p>
                </div>
              )}
            </div>
          </Card>

          {/* Acceso rápido */}
          <Card className="mt-4">
            <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-primary-600" />
              Acciones rápidas
            </h2>
            <div className="space-y-2">
              <Link
                to="/flashcards/crear"
                className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span className="text-base">➕</span> Nueva flashcard
              </Link>
              <Link
                to="/progreso"
                className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span className="text-base">📊</span> Ver mi progreso
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
