import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

const FavoriteButton = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const isMovieFavorite = isFavorite(movie.id);

  const handleToggleFavorite = () => {
    if (isMovieFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      {isMovieFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
    </button>
  );
};

export default FavoriteButton;