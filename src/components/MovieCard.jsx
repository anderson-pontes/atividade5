import React from 'react';
import { Link } from 'react-router-dom';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const poster = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : `https://via.placeholder.com/300x450?text=${encodeURIComponent(movie.title)}`;

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-lg shadow-black/30 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-sky-900/40">
      <img src={poster} alt={movie.title} className="h-56 w-full object-cover" />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-100">{movie.title}</h3>
          <p className="text-sm text-slate-400">{movie.release_date?.split('-')[0]}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="px-3 py-2 bg-slate-700 rounded-md flex-1 text-center text-sm font-semibold text-slate-200 hover:bg-sky-700 transition-colors"
          >
            Detalhes
          </Link>
          <button
            onClick={() => onToggleFavorite(movie.id)}
            className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
              isFavorite
                ? 'bg-amber-500 text-slate-900 hover:bg-amber-600'
                : 'bg-slate-700 text-slate-200 hover:bg-sky-700'
            }`}
          >
            {isFavorite ? 'Remover' : 'Favoritar'}
          </button>
        </div>
      </div>
    </div>
  );
}
