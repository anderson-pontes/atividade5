import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/tmdb';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'; // Assumindo que você tem um componente Loader estilizado
import ErrorMessage from '../components/ErrorMessage'; // E um para erros

export default function FavoritesPage() {
  // A lógica de estado e efeitos permanece inalterada.
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('favorites_v1') || '[]');
      return raw.map(id => Number(id)).filter(id => !isNaN(id));
    } catch {
      return [];
    }
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Adicionado para tratar erros da API

  useEffect(() => {
    if (!favorites.length) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);
    Promise.all(favorites.map(id => getMovieDetails(id)))
      .then(res => {
        setMovies(res.filter(Boolean));
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes dos favoritos:", err);
        setError("Não foi possível carregar os filmes favoritos.");
      })
      .finally(() => setLoading(false));
  }, [favorites]);

  useEffect(() => {
    function onStorage() {
      try {
        const raw = JSON.parse(localStorage.getItem('favorites_v1') || '[]');
        setFavorites(raw.map(id => Number(id)));
      } catch {
        setFavorites([]);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function remove(id) {
    const next = favorites.filter(x => x !== id);
    setFavorites(next);
    localStorage.setItem('favorites_v1', JSON.stringify(next));
  }

  return (
    <div>
      {/* 1. Título e textos de apoio com cores ajustadas */}
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Meus Favoritos</h2>

      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && movies.length === 0 && (
        <div className="text-slate-400">Nenhum favorito ainda.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {movies.map(m => (
          // 2. Card com o estilo de "vidro" semitransparente
          <div
            key={m.id}
            className="bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-lg shadow-black/30 p-3 flex flex-col"
          >
            <img
              src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : `https://via.placeholder.com/300x450?text=${encodeURIComponent(m.title)}`}
              alt={m.title}
              className="h-56 object-cover rounded-md"
            />
            <div className="mt-2 flex-1">
              {/* Textos do card com cores de alto contraste */}
              <h3 className="font-semibold text-slate-100">{m.title}</h3>
              <p className="text-sm text-slate-400">
                {m.release_date?.split('-')[0]}
              </p>
            </div>
            {/* 3. Botões de ação com cores consistentes */}
            <div className="mt-2 flex gap-2">
              <Link
                to={`/movie/${m.id}`}
                className="px-3 py-2 bg-slate-700 rounded-md flex-1 text-center text-sm font-semibold text-slate-200 hover:bg-slate-600 transition-colors"
              >
                Detalhes
              </Link>
              <button
                onClick={() => remove(m.id)}
                className="px-3 py-2 bg-rose-600 rounded-md text-white text-sm font-semibold hover:bg-rose-700 transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}