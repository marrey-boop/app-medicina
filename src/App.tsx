import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { FlashcardFormPage } from './pages/FlashcardFormPage';
import { FlashcardRepaso } from './pages/FlashcardRepaso';
import { CasosPage } from './pages/CasosPage';
import { CasoDetallePage } from './pages/CasoDetallePage';
import { ProgresoPage } from './pages/ProgresoPage';
import { useAppStore } from './store/useAppStore';

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function AppInitializer() {
  const inicializar = useAppStore((s) => s.inicializarDemoSiNecesario);
  useEffect(() => {
    inicializar();
  }, [inicializar]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInitializer />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/flashcards/crear" element={<FlashcardFormPage />} />
          <Route path="/flashcards/editar/:id" element={<FlashcardFormPage />} />
          <Route path="/flashcards/repasar" element={<FlashcardRepaso />} />
          <Route path="/casos" element={<CasosPage />} />
          <Route path="/casos/:id" element={<CasoDetallePage />} />
          <Route path="/progreso" element={<ProgresoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
