import { useState } from "react";
import { reverseTimeSlotMapping,timeSlotMapping } from "../utils/timeSlot";
import { useContracts } from "../hooks/useContract";
import useBookingManagement from "../hooks/useBookingManagement";



function useBookingEditor({ setGuests, setName, setDate, setTime }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [initialBookingData, setInitialBookingData] = useState({});
  const [readContract, writeContract] = useContracts();
  const { bookings } = useBookingManagement(readContract, writeContract);

  const startEditBooking = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setGuests(String(booking.numberOfGuests));
      setName(booking.name);
      setDate(booking.date);
      setTime(reverseTimeSlotMapping(booking.time));
      setIsEditing(true);
      setEditingBookingId(bookingId);
      setInitialBookingData({
        guests: String(booking.numberOfGuests),
        name: booking.name,
        date: booking.date,
        time: booking.time,
      }
      );
      
    }
  };
  
  const hasBookingChanged = ({ guests = '', name = '', date = '', time = '' }) => {
    const initialGuests = initialBookingData.guests ?initialBookingData.guests : '';
    const initialName = initialBookingData.name || '';
    const initialDate = initialBookingData.date || '';
    const initialTime = initialBookingData.time || '';
    console.log(`Comparing guests: ${guests || ''} with ${initialGuests}`);
    console.log(`Comparing name: ${name || ''} with ${initialName}`);
    console.log(`Comparing date: ${date || ''} with ${initialDate}`);
    console.log(`Comparing time: ${time || ''} with ${initialTime}`);
console.log(typeof(time))
console.log(typeof(guests))
console.log(typeof(initialGuests))
    // Ensure 'time' is not undefined and then compare
    const mappedTime = timeSlotMapping(time);

 const hasChanged = (
      guests !== initialGuests ||
      name !== initialName ||
      date !== initialDate ||
      String(mappedTime) !== initialTime
    );
    console.log(`Has booking changed: ${hasChanged}`);
    return hasChanged;
};

  const stopEditing = () => {
    setIsEditing(false);
    setEditingBookingId(null);
    setInitialBookingData({});
    setGuests("1");
    setName("");
    setDate("");
    setTime("18:00 - 21:00");
  };

  return {
    isEditing,
    editingBookingId,
    initialBookingData,
    startEditBooking,
    stopEditing,
    hasBookingChanged,
  };
}

export default useBookingEditor;

