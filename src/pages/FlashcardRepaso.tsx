import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, RefreshCw, AlertTriangle, ArrowLeft, ChevronRight } from 'lucide-react';
import { useAppStore, useFlashcardsPendientes } from '../store/useAppStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { PageHeader } from '../components/layout/PageHeader';
import type { NivelRepaso } from '../types';

type EstadoRepaso = 'inicio' | 'repasando' | 'finalizado';

export function FlashcardRepaso() {
  const pendientes = useFlashcardsPendientes();
  const registrarRepaso = useAppStore((s) => s.registrarRepaso);

  const [estado, setEstado] = useState<EstadoRepaso>('inicio');
  const [indice, setIndice] = useState(0);
  const [volteada, setVolteada] = useState(false);
  const [resultados, setResultados] = useState<Array<{ id: string; nivel: NivelRepaso }>>([]);

  const cola = pendientes.slice(); // copia para sesión
  const actual = cola[indice];
  const progreso = indice;
  const total = cola.length;

  function iniciarSesion() {
    setEstado('repasando');
    setIndice(0);
    setVolteada(false);
    setResultados([]);
  }

  function calificar(nivel: NivelRepaso) {
    registrarRepaso(actual.id, nivel);
    setResultados((r) => [...r, { id: actual.id, nivel }]);

    if (indice + 1 >= total) {
      setEstado('finalizado');
    } else {
      setIndice((i) => i + 1);
      setVolteada(false);
    }
  }

  // ── Pantalla de inicio ──
  if (estado === 'inicio') {
    return (
      <div className="animate-fade-in">
        <PageHeader
          title="Sesión de Repaso"
          subtitle="Repasa las flashcards que tienen pendiente de revisión"
          icon={<BookOpen size={20} />}
          action={
            <Link to="/flashcards">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} /> Mis flashcards
              </Button>
            </Link>
          }
        />

        {pendientes.length === 0 ? (
          <Card className="text-center py-16">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">¡Al día con el repaso!</h2>
            <p className="text-slate-500 mb-6">No tienes flashcards pendientes de repaso por ahora.</p>
            <Link to="/flashcards/crear">
              <Button variant="secondary">Crear nueva flashcard</Button>
            </Link>
          </Card>
        ) : (
          <div className="max-w-lg mx-auto">
            <Card className="text-center">
              <div className="text-5xl mb-4">🃏</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {pendientes.length} tarjeta{pendientes.length !== 1 ? 's' : ''} para repasar
              </h2>
              <p className="text-slate-500 mb-6">
                Completa la sesión para mantener tu racha de estudio. Califica cada tarjeta según qué tan bien la recordaste.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                <div className="bg-emerald-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-emerald-700">Bien</p>
                  <p className="text-xs text-emerald-600">→ en 7 días</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-amber-700">Regular</p>
                  <p className="text-xs text-amber-600">→ en 3 días</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-red-700">Mal</p>
                  <p className="text-xs text-red-600">→ mañana</p>
                </div>
              </div>
              <Button onClick={iniciarSesion} fullWidth size="lg">
                <BookOpen size={20} /> Iniciar sesión
              </Button>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // ── Pantalla finalizado ──
  if (estado === 'finalizado') {
    const bienCount = resultados.filter((r) => r.nivel === 'bien').length;
    const regularCount = resultados.filter((r) => r.nivel === 'regular').length;
    const malCount = resultados.filter((r) => r.nivel === 'mal').length;

    return (
      <div className="animate-fade-in max-w-lg mx-auto">
        <Card className="text-center">
          <div className="text-5xl mb-4">
            {bienCount === total ? '🏆' : bienCount > total / 2 ? '⭐' : '💪'}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">¡Sesión completada!</h2>
          <p className="text-slate-500 mb-6">Repasaste {total} flashcard{total !== 1 ? 's' : ''}</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-emerald-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-emerald-700">{bienCount}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">Bien</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-amber-700">{regularCount}</p>
              <p className="text-xs text-amber-600 font-medium mt-1">Regular</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-red-700">{malCount}</p>
              <p className="text-xs text-red-600 font-medium mt-1">Mal</p>
            </div>
          </div>

          {malCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-left">
              <p className="text-sm text-amber-700">
                <AlertTriangle size={14} className="inline mr-1" />
                Tienes <strong>{malCount}</strong> tarjeta{malCount !== 1 ? 's' : ''} marcada{malCount !== 1 ? 's' : ''} como "Mal". Volverán mañana para reforzarlas.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={iniciarSesion}
              className="flex-1"
            >
              <RefreshCw size={16} /> Otra sesión
            </Button>
            <Link to="/" className="flex-1">
              <Button fullWidth>
                <CheckCircle2 size={16} /> Ir al inicio
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // ── Sesión de repaso ──
  if (!actual) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => setEstado('inicio')}>
          <ArrowLeft size={16} /> Salir
        </Button>
        <div className="flex items-center gap-3 flex-1 mx-4">
          <ProgressBar value={progreso} max={total} color="blue" />
          <span className="text-sm text-slate-500 whitespace-nowrap">{progreso + 1} / {total}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Info */}
        <div className="flex gap-2 mb-4">
          <Badge variant="neutral">{actual.asignatura}</Badge>
          <Badge variant="info">{actual.tema}</Badge>
        </div>

        {/* Tarjeta */}
        <div className="relative" style={{ perspective: '1000px' }}>
          {/* Frente */}
          <Card
            className={`transition-all duration-500 ${volteada ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'}`}
            padding="lg"
          >
            <div className="min-h-[200px] flex flex-col">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Pregunta</p>
              <p className="text-xl font-semibold text-slate-800 flex-1 flex items-center">
                {actual.pregunta}
              </p>
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => setVolteada(true)}
                className="mt-6"
              >
                Ver respuesta <ChevronRight size={18} />
              </Button>
            </div>
          </Card>

          {/* Dorso */}
          {volteada && (
            <Card className="animate-fade-in" padding="lg">
              <div className="min-h-[200px] flex flex-col">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pregunta</p>
                <p className="text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">{actual.pregunta}</p>

                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">Respuesta</p>
                <p className="text-base text-slate-800 flex-1 whitespace-pre-wrap leading-relaxed">
                  {actual.respuesta}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-sm font-medium text-slate-600 mb-3 text-center">
                    ¿Qué tan bien recordaste esta tarjeta?
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => calificar('mal')}
                      className="py-3 px-4 rounded-xl bg-red-50 border-2 border-red-200 hover:bg-red-100 hover:border-red-300 transition-all group"
                    >
                      <span className="text-xl block mb-1">😕</span>
                      <span className="text-sm font-semibold text-red-700 block">Mal</span>
                      <span className="text-xs text-red-500">Mañana</span>
                    </button>
                    <button
                      onClick={() => calificar('regular')}
                      className="py-3 px-4 rounded-xl bg-amber-50 border-2 border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-all group"
                    >
                      <span className="text-xl block mb-1">🤔</span>
                      <span className="text-sm font-semibold text-amber-700 block">Regular</span>
                      <span className="text-xs text-amber-500">En 3 días</span>
                    </button>
                    <button
                      onClick={() => calificar('bien')}
                      className="py-3 px-4 rounded-xl bg-emerald-50 border-2 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all group"
                    >
                      <span className="text-xl block mb-1">✅</span>
                      <span className="text-sm font-semibold text-emerald-700 block">Bien</span>
                      <span className="text-xs text-emerald-500">En {Math.min(actual.intervalo * 2, 60)} días</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
