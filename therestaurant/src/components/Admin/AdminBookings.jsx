// import { useState } from 'react';
// import { useBookings, useManageBookings } from './useCallback(
//   () => {
//     first
//   },
//   [second],
// )
// ';

// const AdminInterface = ({ restaurantId }) => {
//   const bookings = useBookings(restaurantId);
//   const { createBooking, removeBooking } = useManageBookings();
//   const [guests, setGuests] = useState('');
//   const [name, setName] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');

//   const handleCreateBooking = async (e) => {
//     e.preventDefault();
//     // Assuming your inputs are validated
//     await createBooking(parseInt(guests, 10), name, date, time, restaurantId);
//     // Reset form fields or provide feedback to the user
//   };

//   const handleRemoveBooking = async (id) => {
//     await removeBooking(id);
//     // Provide feedback or refresh the bookings list
//   };

//   return (
//     <div>
//       <h2>Manage Bookings</h2>
//       <form onSubmit={handleCreateBooking}>
//         <input type="number" placeholder="Number of Guests" value={guests} onChange={(e) => setGuests(e.target.value)} />
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//         <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
//         <button type="submit">Create Booking</button>
//       </form>

//       <h3>Current Bookings</h3>
//       <ul>
//         {bookings.map((booking) => (
//           <li key={booking.id}>
//             {booking.name} - {booking.date} at {booking.time}
//             <button onClick={() => handleRemoveBooking(booking.id)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminInterface;