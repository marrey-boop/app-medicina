import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Pencil, Trash2, BookOpen } from 'lucide-react';
import { useAppStore, useFlashcardsPorAsignatura } from '../store/useAppStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/layout/PageHeader';
import type { Flashcard } from '../types';

const nivelBadge: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  bien: 'success',
  regular: 'warning',
  mal: 'error',
  nuevo: 'neutral',
};

const nivelLabel: Record<string, string> = {
  bien: 'Dominada',
  regular: 'Regular',
  mal: 'Por mejorar',
  nuevo: 'Nueva',
};

function FlashcardRow({ fc, onDelete }: { fc: Flashcard; onDelete: (id: string) => void }) {
  const navigate = useNavigate();
  const esVencida = new Date(fc.proximoRepaso) <= new Date();

  return (
    <div className="flex items-center gap-3 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {esVencida && (
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" title="Pendiente de repaso" />
          )}
          <p className="text-sm font-medium text-slate-800 truncate">{fc.pregunta}</p>
        </div>
        <p className="text-xs text-slate-400 truncate">
          {fc.asignatura} · {fc.tema} ·{' '}
          <span className="text-slate-300">Repasada {fc.vecesEstudiada} {fc.vecesEstudiada === 1 ? 'vez' : 'veces'}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge variant={nivelBadge[fc.ultimoNivel]}>{nivelLabel[fc.ultimoNivel]}</Badge>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => navigate(`/flashcards/editar/${fc.id}`)}
            className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(fc.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function FlashcardsPage() {
  const flashcards = useAppStore((s) => s.flashcards);
  const eliminarFlashcard = useAppStore((s) => s.eliminarFlashcard);
  const porAsignatura = useFlashcardsPorAsignatura();

  const [busqueda, setBusqueda] = useState('');
  const [asignaturaFiltro, setAsignaturaFiltro] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const asignaturas = Object.keys(porAsignatura).sort();

  const filtradas = flashcards.filter((fc) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      !texto ||
      fc.pregunta.toLowerCase().includes(texto) ||
      fc.respuesta.toLowerCase().includes(texto) ||
      fc.tema.toLowerCase().includes(texto);
    const coincideAsignatura = !asignaturaFiltro || fc.asignatura === asignaturaFiltro;
    return coincideTexto && coincideAsignatura;
  });

  const pendientesCount = flashcards.filter((fc) => new Date(fc.proximoRepaso) <= new Date()).length;

  function handleDelete(id: string) {
    if (confirmDelete === id) {
      eliminarFlashcard(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Mis Flashcards"
        subtitle={`${flashcards.length} tarjetas en total · ${pendientesCount} pendientes de repaso`}
        icon={<BookOpen size={20} />}
        action={
          <div className="flex gap-2">
            {pendientesCount > 0 && (
              <Link to="/flashcards/repasar">
                <Button variant="secondary" size="sm">
                  Repasar ({pendientesCount})
                </Button>
              </Link>
            )}
            <Link to="/flashcards/crear">
              <Button size="sm">
                <Plus size={16} /> Nueva flashcard
              </Button>
            </Link>
          </div>
        }
      />

      {/* Filtros */}
      <Card className="mb-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por pregunta, respuesta o tema..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={asignaturaFiltro}
              onChange={(e) => setAsignaturaFiltro(e.target.value)}
              className="border border-slate-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="">Todas las asignaturas</option>
              {asignaturas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Lista */}
      {filtradas.length === 0 ? (
        flashcards.length === 0 ? (
          <EmptyState
            icon={<BookOpen />}
            title="Sin flashcards todavía"
            description="Crea tu primera flashcard o completa casos clínicos para generar tarjetas automáticamente."
            action={
              <Link to="/flashcards/crear">
                <Button>
                  <Plus size={16} /> Crear primera flashcard
                </Button>
              </Link>
            }
          />
        ) : (
          <EmptyState
            icon={<Search />}
            title="Sin resultados"
            description="Ninguna flashcard coincide con los filtros aplicados."
            action={
              <Button variant="secondary" onClick={() => { setBusqueda(''); setAsignaturaFiltro(''); }}>
                Limpiar filtros
              </Button>
            }
          />
        )
      ) : (
        <Card padding="none">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <p className="text-xs font-medium text-slate-500">
              {filtradas.length} tarjeta{filtradas.length !== 1 ? 's' : ''}
              {busqueda || asignaturaFiltro ? ' (filtradas)' : ''}
            </p>
          </div>
          {filtradas.map((fc) => (
            <div key={fc.id} className="relative">
              <FlashcardRow fc={fc} onDelete={handleDelete} />
              {confirmDelete === fc.id && (
                <div className="absolute inset-0 bg-red-50 border border-red-200 rounded flex items-center justify-between px-4">
                  <p className="text-sm text-red-700 font-medium">¿Confirmar eliminación?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(fc.id)}
                      className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="text-xs bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
