// src/pages/MovieDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import FavoriteButton from '../components/FavoriteButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';


const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/movie/${id}`, {
          params: { append_to_response: 'credits' },
        });
        setMovie(response.data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do filme.');
      } finally {
        setLoading(false);
      }
    };


    fetchMovieDetails();
  }, [id]);


  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;


  const director = movie.credits?.crew.find(member => member.job === 'Director');


  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-start">
      <img
        src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
        alt={movie.title}
        className="w-64 h-auto rounded-lg shadow-md mb-4 md:mb-0 md:mr-8"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
        <p className="text-gray-600 italic mb-3">{movie.tagline}</p>
        <h3 className="text-lg font-semibold mb-1">Sinopse</h3>
        <p className="text-gray-700 mb-3">{movie.overview || 'Não disponível.'}</p>
        <p className="text-gray-700 mb-2"><strong>Avaliação:</strong> {movie.vote_average.toFixed(1)} / 10</p>
        {director && <p className="text-gray-700 mb-2"><strong>Diretor:</strong> {director.name}</p>}
        {movie.credits?.cast.length > 0 && (
          <p className="text-gray-700 mb-2">
            <strong>Elenco:</strong> {movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}...
          </p>
        )}
        <div className="mt-4">
          <FavoriteButton movie={movie} />
        </div>
      </div>
    </div>
  );
};


export default MovieDetailsPage;