import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import '../styles/FavouriteList.css';

interface FavoritesListProps {
  favoriteMovies: any[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favoriteMovies, onSelect, onRemove }) => {
  return (
    <div className="favorites-list">
      {favoriteMovies.map(movie => (
        <div key={movie.id} className="favorite-item">
          <img
            src={movie.posterurl}
            alt={movie.title}
            className="favorite-image"
            onClick={() => onSelect(movie.id)}
          />
          <div className="favorite-details">
            <h3 className="favorite-title" onClick={() => onSelect(movie.id)}>{movie.title}</h3>
            <p>{movie.description}</p>
            <div className="favorite-actions">
              <span className="view-details" onClick={() => onSelect(movie.id)}>
                View Details
              </span>
              <span className="favorite" onClick={() => onRemove(movie.id)}>
                <FontAwesomeIcon icon={faHeart} className={favoriteMovies.some(fav => fav.id === movie.id) ? 'heart-active' : ''} /> Remove from Favorites
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
