import { useCallback } from "react";
import { timeSlotMapping } from "../utils/timeSlot";




export function useBookingSubmission({
  createBooking,
  editBooking,
  availableTables,
  setGuests,
  setName,
  setDate,
  setTime,
  setIsEditing,
  setEditingBookingId,
  hasBookingChanged,
  restaurantID,
}) {
  return useCallback(
    async (event, { guests, name, date, time, isEditing, editingBookingId }) => {
      event.preventDefault();
      
      const numberOfGuestsParsed = parseInt(guests, 10);
      const requestedTables = Math.ceil(numberOfGuestsParsed / 6);
      const timeSlotNumber = timeSlotMapping[time];
      try{
      if (isEditing && !hasBookingChanged({ numberOfGuestsParsed, name, date, timeSlotNumber })) {
        alert("No changes were made to your reservation!");
        setIsEditing(false);
        setEditingBookingId(null);
        return;
      }

     

      if (availableTables < requestedTables) {
        alert(`Sorry, we do not have enough available tables for the number of guests you have provided. We have ${availableTables} tables left for the requested date and time slot.`);
        return;
      }

      if (isEditing && editingBookingId) {
                  await editBooking(editingBookingId, numberOfGuestsParsed, name, date, timeSlotNumber);
                  console.log('Editing successful');
                  setIsEditing(false); 
                } else {
                  await createBooking(numberOfGuestsParsed, name, date, timeSlotNumber, restaurantID);
                  console.log("Booking creation successful");
                }
        
                // Reset 
                setGuests("1");
                setName("");
                setDate("");
                setTime("18:00 - 21:00");
              } catch (error) {
                console.error("Error when submitting the booking:", error);
              }
            },

    [
      createBooking,
      editBooking,
      availableTables,
      restaurantID,
      setGuests,
      setName,
      setDate,
      setTime,
      setIsEditing,
      setEditingBookingId,
      hasBookingChanged,
    ]
  );
}

// import { useCallback } from "react";
// import { timeSlotMapping } from "../utils/timeSlot";

// export function useBookingSubmission({
//   createBooking,
//   editBooking,
//   availableTables,
//   setGuests,
//   setName,
//   setDate,
//   setTime,
//   setIsEditing,
//   restaurantID,
// }) 
// {
//   return useCallback(
//     async (event, { guests, name, date, time, isEditing, editingBookingId }) => {
//       event.preventDefault();
//       try {
//         const numberOfGuestsParsed = parseInt(guests, 10);
//         const requestedTables = Math.ceil(numberOfGuestsParsed / 6);
//         const timeSlotNumber = timeSlotMapping[time];
        
//         if (availableTables < requestedTables) {
//           alert(`Sorry, we do not have enough available tables for the number of guests you have provided. We have ${availableTables} tables left for the requested date and time slot.`);
//           return;
//         }
        
//         if (isEditing && editingBookingId) {
//           await editBooking(editingBookingId, numberOfGuestsParsed, name, date, timeSlotNumber);
//           console.log('Editing successful');
//           setIsEditing(false); 
//         } else {
//           await createBooking(numberOfGuestsParsed, name, date, timeSlotNumber, restaurantID);
//           console.log("Booking creation successful");
//         }

//         // Reset form fields
//         setGuests("1");
//         setName("");
//         setDate("");
//         setTime("18:00 - 21:00");
//       } catch (error) {
//         console.error("Error when submitting the booking:", error);
//       }
//     },
//     [
//       createBooking,
//       editBooking,
//       availableTables,
//       restaurantID,
//       setGuests,
//       setName,
//       setDate,
//       setTime,
//       setIsEditing, // This is typically stable and shouldn't cause re-creation issues
//     ]
//   );
// }