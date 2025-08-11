import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import FavoritesPage from './pages/FavoritesPage';

export default function App() {
  return (
    <Router>
      {/* 1. Cabeçalho com efeito de vidro, fixo no topo */}
      <header className="bg-slate-900/80 backdrop-blur-md text-slate-100 py-4 border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* 2. Logo com a cor de destaque do tema */}
          <Link 
            to="/" 
            className="text-2xl font-bold tracking-wider text-sky-400 hover:text-sky-300 transition-colors"
          >
            FilmesFinder
          </Link>
          
          {/* 3. Botão de navegação consistente com o resto do design */}
          <nav className="flex gap-4 items-center">
            <Link 
              to="/favorites" 
              className="px-4 py-2 rounded-lg font-semibold text-slate-200 bg-slate-700 hover:bg-slate-600 transition-colors"
            >
              Favoritos
            </Link>
          </nav>

        </div>
      </header>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </Router>
  );
}