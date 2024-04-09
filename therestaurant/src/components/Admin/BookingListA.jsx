import './bookingListA.scss';
import{reverseTimeSlotMapping} from'../../utils/timeSlot'

const BookingsListA = ({ bookings, startEditBooking, handleRemoveBooking,  }) => {
    
    
    // meddelande till reviewer: första retur
    return (
        <ul className="bookings-list">
          {bookings.map((booking, index) => {
            // Calculate booked tables for each booking inside the map function, kept as a number
            const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10);
            const bookedTables = Math.ceil(numberOfGuestsParsed / 6);
    
            return (
              <li key={booking.id} className={`booking-item ${index !== bookings.length - 1 ? "with-border" : ""}`}>
                <div className="booking-details">
                  <div>Customer Name: {booking.name}</div>
                  <div>Date: {booking.date}</div>
                  <div>Guests: {String(booking.numberOfGuests)}</div>
                  <div>Booked Tables: {bookedTables}</div> {/* No need to convert to string */}
                  <div>Time Slot: {reverseTimeSlotMapping(booking.time)}</div>
                </div>
                <div className="booking-actions">
                  <button onClick={() => startEditBooking(booking.id)}>Edit</button>
                  <button onClick={() => handleRemoveBooking(booking.id)} className="cancel-button">
                    Cancel Booking
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      );
    };
    
    export default BookingsListA;
