import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import BookingService from '../services/BookingService';

const CinemaHall = ({ movieId }) => {
  const totalRows = 5;
  const totalSeatsPerRow = 10;

  const initializeSeats = () => {
    const bookedSeats = BookingService.getBookedSeatsForMovie(movieId);
    return Array(totalRows)
      .fill()
      .map(() =>
        Array(totalSeatsPerRow)
          .fill()
          .map(() => ({ booked: false, selected: false }))
      )
      .map((row, rowIndex) =>
        row.map((seat, seatIndex) => {
          const seatLabel = `Row ${rowIndex + 1}, Seat ${seatIndex + 1}`;
          return {
            ...seat,
            booked: bookedSeats.includes(seatLabel),
          };
        })
      );
  };

  const [seats, setSeats] = useState(initializeSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleSeatClick = (row, seat) => {
    if (seats[row][seat].booked) return;

    const updatedSeats = [...seats];
    updatedSeats[row][seat].selected = !updatedSeats[row][seat].selected;
    setSeats(updatedSeats);

    const seatLabel = `Row ${row + 1}, Seat ${seat + 1}`;
    if (updatedSeats[row][seat].selected) {
      setSelectedSeats([...selectedSeats, seatLabel]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatLabel));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat.');
      return;
    }
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      BookingService.saveBooking(movieId, selectedSeats, formData);
      setShowForm(false);
      setSelectedSeats([]);
      setFormData({ name: '', phone: '', email: '' });
      setSeats(initializeSeats()); // Оновлюємо місця після бронювання
      toast.success('Booking successful!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="cinema-hall">
      <h2>Cinema Hall</h2>
      <div className="seats-grid">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${
                  seat.booked ? 'booked' : seat.selected ? 'selected' : 'available'
                }`}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}
              >
                {seatIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <h3>Selected Seats:</h3>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>{seat}</li>
            ))}
          </ul>
        ) : (
          <p>No seats selected.</p>
        )}
      </div>
      <button onClick={handleBooking} className="confirm-booking-button">
        Book Selected Seats
      </button>

      {showForm && (
        <div className="booking-form">
          <h3>Enter Your Details</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <button type="submit" className="submit-booking-button">
              Confirm Booking
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CinemaHall;