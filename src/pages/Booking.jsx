import React from 'react';
import { useParams, Link } from 'react-router-dom';
import movies from '../data/movies';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="booking-page">
      <h1>Booking for {movie.title}</h1>
      <p>Session: {movie.sessionDateTime}</p>
      <CinemaHall movieId={id} />
      <Link to="/" className="back-link">
        Back to Home
      </Link>
    </div>
  );
};

export default Booking;