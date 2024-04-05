import { useState } from "react";
import { useBookings } from "../../hooks/useBookings";
import { useManageBookings } from "../../hooks/useManageBookings";
import { useContracts } from "../../hooks/useContract";
import Input from "../../UI/Input";
const AdminInterface = ({ restaurantId }) => {
  const [writeContract] = useContracts();
  const { createBooking, removeBooking } = useManageBookings(writeContract);
  const bookings = useBookings(restaurantId);

  const [guests, setGuests] = useState("1");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date().toISOString().split('T')[0];

  const handleCreateBooking = async (e) => {
    e.preventDefault();

    await createBooking(parseInt(guests, 6), name, date, time, restaurantId);
  };

  const handleRemoveBooking = async (id) => {
    await removeBooking(id);
  };

  return (
    <div>
      <h2>Manage Bookings</h2>
      <form onSubmit={handleCreateBooking}>
      <Input
          label="date of arrive"
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div>
          <label htmlFor="timeSlot">Time Slot</label>
          <select
            name="timeSlot"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="18:00">18:00 - 21:00</option>
            <option value="21:00">21:00 - 00:00</option>
          </select>
        </div>
       <div>
       <p>XX Tables available in this settings</p>
        <Input
          label="number of tables"
          type="number"
          placeholder="Number of Tables"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          max="15"
          step="1"
          onInput={(e) =>
            (e.target.value = Math.max(1, parseInt(e.target.value)).toString())
          }
          required
        />
      
    
        </div>
        <Input
          label="customer name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <button type="submit">Confirm Booking</button>
      </form>

      <h3>Current Bookings</h3>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.name} - {booking.date} at {booking.time}
            <button onClick={() => handleRemoveBooking(booking.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInterface;
