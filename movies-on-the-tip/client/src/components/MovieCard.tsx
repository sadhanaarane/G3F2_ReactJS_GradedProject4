import React from 'react';
import '../styles/MovieCard.css';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    posterurl: string;
  };
  onSelect: (id: string) => void;
  onFavorite: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect, onFavorite }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterurl} alt={movie.title} onClick={() => onSelect(movie.id)} />
      <h3>{movie.title}</h3>
      <button onClick={() => onFavorite(movie.id)}>Favorite</button>
    </div>
  );
};

export default MovieCard;
