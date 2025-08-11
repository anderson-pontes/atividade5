import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getMovieDetails, IMG_BASE } from '../services/tmdb';

export default function DetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites_v1') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMovieDetails(id)
      .then(d => setData(d))
      .catch(err => setError(err.message || 'Erro ao carregar detalhes'))
      .finally(() => setLoading(false));
  }, [id]);

  function toggleFavorite() {
    // A lógica de favoritar permanece a mesma
    const numericId = Number(id);
    const isFavorite = favorites.some(fav => fav.id === numericId);
    let next;
    if (isFavorite) {
      next = favorites.filter(fav => fav.id !== numericId);
    } else {
      next = [...favorites, { id: numericId, poster_path: data.poster_path, title: data.title, release_date: data.release_date }];
    }
    setFavorites(next);
    localStorage.setItem('favorites_v1', JSON.stringify(next));
  }
  
  // Verifica se o filme atual é um favorito
  const isCurrentlyFavorite = favorites.some(fav => fav.id === Number(id));

  if (loading) return <Loader text="Carregando detalhes..." />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!data) return null; // Adicionado para evitar erro se 'data' for nulo

  const poster = data.poster_path ? `${IMG_BASE}${data.poster_path}` : `https://via.placeholder.com/400x600?text=${encodeURIComponent(data.title)}`;
  const director = data.credits?.crew?.find(c => c.job === 'Director')?.name || 'Desconhecido';
  const cast = data.credits?.cast?.slice(0, 6).map(c => c.name).join(', ');

  return (
    // 1. Contêiner com fundo escuro, semitransparente e efeito de desfoque
    <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-lg shadow-black/30 p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <img src={poster} alt={data.title} className="w-full md:col-span-1 object-cover rounded-lg" />
      
      <div className="md:col-span-2">
        {/* 2. Cores de texto ajustadas para alto contraste */}
        <h1 className="text-3xl font-bold text-slate-100">{data.title} 
          <span className="text-slate-400 font-normal ml-2">({data.release_date?.split('-')[0]})</span>
        </h1>
        <p className="mt-4 text-slate-300 leading-relaxed">{data.overview}</p>

        <div className="mt-6 border-t border-slate-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
          <div><strong className="font-semibold text-slate-100">Diretor:</strong> {director}</div>
          <div><strong className="font-semibold text-slate-100">Gênero:</strong> {data.genres?.map(g => g.name).join(', ')}</div>
          <div className="sm:col-span-2"><strong className="font-semibold text-slate-100">Elenco:</strong> {cast}</div>
          <div><strong className="font-semibold text-slate-100">Avaliação:</strong> ⭐ {Number(data.vote_average).toFixed(1)} / 10</div>
        </div>
        
        {/* 3. Botões com cores consistentes com o tema */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button 
            onClick={toggleFavorite} 
            className={`px-5 py-2 rounded-lg font-semibold transition-colors ${
              isCurrentlyFavorite 
                ? 'bg-amber-500 text-slate-900 hover:bg-amber-600' 
                : 'bg-sky-600 text-slate-100 hover:bg-sky-700'
            }`}
          >
            {isCurrentlyFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
          </button>
          <Link 
            to="/" 
            className="px-5 py-2 rounded-lg font-semibold bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
          >
            Voltar para a Busca
          </Link>
        </div>
      </div>
    </div>
  );
}