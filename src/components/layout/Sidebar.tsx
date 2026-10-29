import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  CreditCard,
  Stethoscope,
  BarChart3,
  Plus,
  BookOpen,
} from 'lucide-react';
import { useFlashcardsPendientes } from '../../store/useAppStore';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Inicio', exact: true },
  { to: '/flashcards', icon: CreditCard, label: 'Flashcards', badge: 'pendientes' },
  { to: '/casos', icon: Stethoscope, label: 'Casos Clínicos' },
  { to: '/progreso', icon: BarChart3, label: 'Mi Progreso' },
];

export function Sidebar() {
  const pendientes = useFlashcardsPendientes();

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 shadow-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary-600 flex items-center justify-center shadow-md">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm leading-tight">MediFlash</p>
            <p className="text-xs text-slate-400">Plataforma Educativa</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label, exact, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={clsx(
                    'h-4.5 w-4.5 flex-shrink-0',
                    isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'
                  )}
                  size={18}
                />
                <span className="flex-1">{label}</span>
                {badge === 'pendientes' && pendientes.length > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {pendientes.length}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Acceso rápido */}
      <div className="px-3 pb-4 space-y-1 border-t border-slate-100 pt-3">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Acceso Rápido
        </p>
        <NavLink
          to="/flashcards/crear"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )
          }
        >
          <Plus className="text-slate-400" size={18} />
          Nueva flashcard
        </NavLink>
        <NavLink
          to="/flashcards/repasar"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )
          }
        >
          <BookOpen className="text-slate-400" size={18} />
          Repasar ahora
        </NavLink>
      </div>

      {/* Aviso educativo */}
      <div className="px-4 pb-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-700 font-medium">⚕️ Solo uso educativo</p>
          <p className="text-xs text-amber-600 mt-0.5 leading-tight">
            No constituye diagnóstico ni recomendación médica.
          </p>
        </div>
      </div>
    </aside>
  );
}
