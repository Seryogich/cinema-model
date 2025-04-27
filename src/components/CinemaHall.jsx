import React, { useState } from 'react';

const CinemaHall = () => {
  //сітка 5x10 
  const totalRows = 5;
  const totalSeatsPerRow = 10;
  const initialSeats = Array(totalRows)
    .fill()
    .map(() =>
      Array(totalSeatsPerRow)
        .fill()
        .map(() => ({ booked: false, selected: false }))
    );

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Імітуємо деякі заброньовані місця
  const bookSomeSeats = () => {
    const updatedSeats = [...seats];
    updatedSeats[0][2].booked = true;
    updatedSeats[1][5].booked = true;
    updatedSeats[3][8].booked = true;
    setSeats(updatedSeats);
  };

  // Викликаємо функцію один раз при завантаженні компонента
  React.useEffect(() => {
    bookSomeSeats();
  }, []);

  const handleSeatClick = (row, seat) => {
    if (seats[row][seat].booked) return; // Не дозволяємо вибирати заброньовані місця

    const updatedSeats = [...seats];
    updatedSeats[row][seat].selected = !updatedSeats[row][seat].selected;
    setSeats(updatedSeats);

    // Оновлюємо список вибраних місць
    if (updatedSeats[row][seat].selected) {
      setSelectedSeats([...selectedSeats, `Row ${row + 1}, Seat ${seat + 1}`]);
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s !== `Row ${row + 1}, Seat ${seat + 1}`));
    }
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
    </div>
  );
};

export default CinemaHall;