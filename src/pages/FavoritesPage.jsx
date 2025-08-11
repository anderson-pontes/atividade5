import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/tmdb';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites_v1') || '[]'); } catch { return []; }
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!favorites.length) return setMovies([]);
    setLoading(true);
    Promise.all(favorites.map(id => getMovieDetails(id))).then(res => {
      setMovies(res.filter(Boolean));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [favorites]);

  function remove(id) {
    const next = favorites.filter(x => x !== id);
    setFavorites(next);
    localStorage.setItem('favorites_v1', JSON.stringify(next));
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Meus Favoritos</h2>
      {loading && <div>Carregando...</div>}
      {movies.length === 0 && <div className="text-gray-500">Nenhum favorito ainda.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {movies.map(m => (
          <div key={m.id} className="bg-white rounded shadow p-3 flex flex-col">
            <img src={m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : `https://via.placeholder.com/300x450?text=${encodeURIComponent(m.title)}`} alt={m.title} className="h-48 object-cover rounded" />
            <div className="mt-2 flex-1">
              <h3 className="font-semibold">{m.title}</h3>
              <p className="text-sm text-gray-500">{m.release_date?.split('-')[0]}</p>
            </div>
            <div className="mt-2 flex gap-2">
              <Link to={`/movie/${m.id}`} className="px-3 py-2 bg-gray-100 rounded flex-1 text-center">Detalhes</Link>
              <button onClick={() => remove(m.id)} className="px-3 py-2 bg-red-400 rounded text-white">Remover</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}