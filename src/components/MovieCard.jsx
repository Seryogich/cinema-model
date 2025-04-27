import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
      <h3>{movie.title}</h3>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Session:</strong> {movie.sessionDateTime}</p>
    </div>
  );
};

export default MovieCard;