const BOOKINGS_KEY = 'movie_bookings';


const getBookings = () => {
  const bookings = localStorage.getItem(BOOKINGS_KEY);
  return bookings ? JSON.parse(bookings) : [];
};


const saveBookings = (bookings) => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};


const getBookedSeatsForMovie = (movieId) => {
  const bookings = getBookings();
  const movieBookings = bookings.filter((booking) => booking.movieId === parseInt(movieId));
  return movieBookings.flatMap((booking) => booking.seats);
};


const saveBooking = (movieId, seats, userData) => {
  const bookings = getBookings();
  const newBooking = {
    movieId: parseInt(movieId),
    seats,
    userData,
    timestamp: new Date().toISOString(),
  };
  bookings.push(newBooking);
  saveBookings(bookings);
};

export default {
  getBookedSeatsForMovie,
  saveBooking,
};