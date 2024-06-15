import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/MovieList.css';
import { getFavorites, addFavorite, removeFavorite } from '../services/FavouriteService'; // Adjust the import path according to your project structure

export interface Movie {
  id: string;
  title: string;
  posterurl: string;
  description: string;
}

interface MovieListProps {
  movies: any[];
  favorites: any[];
  onSelect: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelect }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const savedFavorites = await getFavorites();
      setFavorites(savedFavorites);
    };
    fetchFavorites();
  }, []);

  const handleFavorite = async (id: string) => {
    const isFavorite = favorites.some(movie => movie.id === id);
    if (isFavorite) {
      await removeFavorite(id);
      setFavorites(favorites.filter(movie => movie.id !== id));
    } else {
      const movie = movies.find(movie => movie.id === id)!;
      await addFavorite(movie);
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-item">
          <img
            src={movie.posterurl}
            alt={movie.title}
            className="movie-image"
            onClick={() => onSelect(movie.id)}
          />
          <h3 className="movie-title" onClick={() => onSelect(movie.id)}>
            {movie.title}
          </h3>
          <p>{movie.description}</p>
          <div className="movie-actions">
            <span className="view-details" onClick={() => onSelect(movie.id)}>
              View Details
            </span>
            <span
              className={`favorite ${favorites.some(fav => fav.id === movie.id) ? 'favorite-active' : 'favorite-inactive'}`}
              onClick={() => handleFavorite(movie.id)}
            >
              <FontAwesomeIcon icon={faHeart} /> {favorites.some(fav => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
