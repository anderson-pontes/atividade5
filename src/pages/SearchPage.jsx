import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { searchMovies } from '../services/tmdb';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites_v1') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    searchMovies(query, page)
      .then(data => {
        setMovies(data.results || []);
        setTotalPages(Math.max(1, Math.ceil((data.total_results || 0) / 20)));
      })
      .catch(err => setError(err.message || 'Erro ao buscar'))
      .finally(() => setLoading(false));
  }, [query, page]);

  function onSearch() {
    setPage(1);
    // effect fará a busca
  }

  function toggleFavorite(id) {
    const exists = favorites.includes(id);
    const next = exists ? favorites.filter(x => x !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem('favorites_v1', JSON.stringify(next));
  }

  return (
    <div className="space-y-6">
      <SearchBar value={query} onChange={setQuery} onSubmit={onSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} isFavorite={favorites.includes(movie.id)} onToggleFavorite={toggleFavorite} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}