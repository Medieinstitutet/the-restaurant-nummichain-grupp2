import './bookingListA.scss';
import{reverseTimeSlotMapping} from'../../utils/timeSlot'

const BookingsListA = ({ bookings, startEditBooking, handleRemoveBooking,  }) => {
    const numberOfGuestsParsed = parseInt(bookings.numberOfGuests, 10);
    const bookedTables = String(Math.ceil(numberOfGuestsParsed / 6));
    
    return (
      <ul className="bookings-list">
        {bookings.map((booking, index) => (
          <li key={booking.id} className={`booking-item ${index !== bookings.length - 1 ? "with-border" : ""}`}>
            <div className="booking-details">
              <div>Customer Name: {booking.name}</div>
              <div>Date: {booking.date}</div>
              <div>Guests: {String(booking.numberOfGuests)}</div>
              <div>Booked Tables:{String(bookedTables)}</div>
              <div>Time Slot: {reverseTimeSlotMapping(booking.time)}</div>
            </div>
            <div className="booking-actions">
              <button onClick={() => startEditBooking(booking.id)}>Edit</button>
              <button onClick={() => handleRemoveBooking(booking.id)} className="cancel-button">
                Cancel Booking
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default BookingsListA;

// import './bookingListA.scss';
// import{timeSlotMapping} from'../../utils/timeSlot'
// const BookingsListA = ({ bookings, startEditBooking, handleRemoveBooking, guestCount }) => {
//   return (
//     <ul className="bookings-list">
//       {bookings.map((booking, index) => (
//         <li key={booking.id} className={`booking-item ${index !== bookings.length - 1 ? "with-border" : ""}`}>
//           <div className="booking-details">
//             <div>Customer Name: {booking.name}</div>
//             <div>Date: {booking.date}</div>
//             <div>Time: {booking.time}</div>
//             <div>Guests: {booking.numberOfGuests}</div>
//             <div>Guest Count: {guestCount(booking.date)} </div>
//             <div>Time Slot: {timeSlotMapping(booking.time)}</div>
//           </div>
//           <div className="booking-actions">
//             <button onClick={() => startEditBooking(booking.id)}>Edit</button>
//             <button onClick={() => handleRemoveBooking(booking.id)} className="cancel-button">
//               Cancel Booking
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default BookingsListA;
