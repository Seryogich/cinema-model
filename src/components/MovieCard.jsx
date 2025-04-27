import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
      <h3>{movie.title}</h3>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Session:</strong> {movie.sessionDateTime}</p>
      <button onClick={handleBook} className="book-button">
        Book Now
      </button>
    </div>
  );
};

export default MovieCard;