import { Link } from 'react-router-dom';
import { Stethoscope, CheckCircle2, Clock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { CASOS_CLINICOS } from '../data/casos';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';

const dificultadBadge: Record<string, 'success' | 'warning' | 'error'> = {
  básico: 'success',
  intermedio: 'warning',
  avanzado: 'error',
};

export function CasosPage() {
  const resultadosCasos = useAppStore((s) => s.resultadosCasos);
  const casoResuelto = (casoId: string) => resultadosCasos.find((r) => r.casoId === casoId);
  const totalResueltos = CASOS_CLINICOS.filter((c) => casoResuelto(c.id)).length;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Casos Clínicos"
        subtitle="Practica con casos ficticios elaborados con fines educativos"
        icon={<Stethoscope size={20} />}
      />

      <Alert variant="info" className="mb-6">
        <strong>Aviso educativo:</strong> Todos los casos son ficticios y de uso exclusivamente educativo.
        No representan pacientes reales ni constituyen diagnóstico o recomendación médica.
      </Alert>

      {/* Progreso general */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-700">Progreso general</h2>
          <span className="text-sm text-slate-500">
            {totalResueltos} de {CASOS_CLINICOS.length} completados
          </span>
        </div>
        <ProgressBar
          value={totalResueltos}
          max={CASOS_CLINICOS.length}
          color="green"
          showLabel
        />
      </Card>

      {/* Lista de casos */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {CASOS_CLINICOS.map((caso) => {
          const resultado = casoResuelto(caso.id);
          const pct = resultado
            ? Math.round((resultado.puntaje / resultado.totalPreguntas) * 100)
            : null;

          return (
            <Link key={caso.id} to={`/casos/${caso.id}`}>
              <Card hover className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <Badge variant={dificultadBadge[caso.dificultad]}>{caso.dificultad}</Badge>
                      <Badge variant="neutral">{caso.asignatura}</Badge>
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm leading-snug">
                      {caso.titulo}
                    </h3>
                  </div>
                  {resultado ? (
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        pct !== null && pct >= 70 ? 'bg-emerald-100' : 'bg-amber-100'
                      }`}
                    >
                      <CheckCircle2
                        size={18}
                        className={pct !== null && pct >= 70 ? 'text-emerald-600' : 'text-amber-600'}
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Descripción */}
                <p className="text-xs text-slate-500 mb-3 flex-1 line-clamp-2">
                  {caso.descripcion}
                </p>

                {/* Info */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span>{caso.preguntas.length} preguntas</span>
                  <span>·</span>
                  <span>{caso.conceptosClave.length} conceptos clave</span>
                </div>

                {/* Resultado */}
                {resultado ? (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">Último resultado</span>
                      <span
                        className={`font-bold ${
                          pct !== null && pct >= 70 ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {pct}%
                      </span>
                    </div>
                    <ProgressBar
                      value={resultado.puntaje}
                      max={resultado.totalPreguntas}
                      color={pct !== null && pct >= 70 ? 'green' : 'amber'}
                      size="sm"
                    />
                    <p className="text-xs text-slate-400 mt-1.5">
                      {resultado.puntaje}/{resultado.totalPreguntas} correctas · Click para repetir
                    </p>
                  </div>
                ) : (
                  <div className="bg-primary-50 rounded-lg px-3 py-2 text-center">
                    <p className="text-xs font-medium text-primary-700">Iniciar caso →</p>
                  </div>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
