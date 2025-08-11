export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  // Não lançar imediatamente; a app tratará o erro. Mas é útil logar.
  console.warn('VITE_TMDB_API_KEY não definido — defina no .env');
}

export async function searchMovies(query, page = 1) {
  if (!API_KEY) throw new Error('Chave TMDB não encontrada (VITE_TMDB_API_KEY)');
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`);
  if (!res.ok) throw new Error('Erro ao consultar TMDB');
  return res.json();
}

export async function getMovieDetails(id) {
  if (!API_KEY) throw new Error('Chave TMDB não encontrada (VITE_TMDB_API_KEY)');
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`);
  if (!res.ok) throw new Error('Erro ao carregar detalhes do filme');
  return res.json();
}