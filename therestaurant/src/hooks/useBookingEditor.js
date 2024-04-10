import { useState } from "react";
import { reverseTimeSlotMapping } from "../utils/timeSlot";
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
      });
    }
  };

  const hasBookingChanged = ({ guests, name, date, time }) => {
    return (
      guests !== String(initialBookingData.guests) ||
      name !== initialBookingData.name ||
      date !== initialBookingData.date ||
      time !== initialBookingData.time
    );
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

// import { useState } from "react";
// import { reverseTimeSlotMapping } from "../utils/timeSlot";
// import { useContracts } from "../hooks/useContract";
// import useBookingManagement from "../hooks/useBookingManagement";


// function useBookingEditor({ setGuests, setName, setDate, setTime}) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingBookingId, setEditingBookingId] = useState(null);
//   const [readContract, writeContract] = useContracts();

//   const { bookings} =
//     useBookingManagement(readContract, writeContract);
  
//   const startEditBooking = (bookingId) => {
//     const booking = bookings.find((b) => b.id === bookingId);
//     if (booking) {
//       setGuests(String(booking.numberOfGuests));
//       setName(booking.name);
//       setDate(booking.date);
//       setTime(reverseTimeSlotMapping(booking.time));
//       setIsEditing(true); // Make sure this gives the correct value.
//       setEditingBookingId(bookingId);
     
//       // if (formRef && formRef.current) {
//       //   formRef.current.scrollIntoView({ behavior: "smooth" });
//       // }
//     }
//   };

//   const stopEditing = () => {
//     setIsEditing(false);
//     setEditingBookingId(null);
//     // Reset form to initial values.
//     setGuests("1");
//     setName("");
//     setDate("");
//     setTime("18:00 - 21:00");
//   };

//   return {
//     isEditing,
//     editingBookingId,
//     startEditBooking,
//     setIsEditing, 
//     setEditingBookingId,
//     stopEditing,
//   };
// }
// export default useBookingEditor;
