import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../styles/MovieDetail.css';

interface MovieDetailProps {
  movie: {
    title: string;
    posterurl: string;
    storyline: string;
    genres: string[];
    actors: string[];
    releaseDate: string;
  };
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClose = () => {
    window.location.reload(); // Navigate back to the previous page
  };

  return (
    <div className="movie-detail">
      <img src={movie.posterurl} alt={movie.title} />
      <button onClick={handleClose}>Close</button> {/* Close button */}
      <h2>{movie.title}</h2>
      <p>{movie.storyline}</p>
      <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
      <p><strong>Actors:</strong> {movie.actors.join(', ')}</p>
      <p><strong>Release Date:</strong> {movie.releaseDate}</p>
    </div>
  );
};

export default MovieDetail;
