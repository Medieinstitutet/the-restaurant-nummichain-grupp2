// Author: Elena Lehto Fedenbrink

export const timeSlotMapping ={
    "18:00 - 21:00": BigInt(1),
    "21:00 - 00:00": BigInt(2),
  };
export const reverseTimeSlotMapping = (num) => {
    for (const [key, value] of Object.entries(timeSlotMapping)) {
      if (value === num) {
        return key;
      }
    }
    // Return "21:00 - 00:00" if num equals 2, otherwise default to "18:00 - 21:00"
    return num === 2 ? "21:00 - 00:00" : "18:00 - 21:00";
  };
// export  const countGuestsByDayAndTimeSlot = (bookings) => {
//     const guestCount = {};
//     const tablesBookedByCustomer = {};

//     bookings.forEach((booking) => {
//       if (
//         booking.date === selectedDate &&
//         reverseTimeSlotMapping(booking.time) === selectedTimeSlot
//       ) {
//         const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
//         const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10);
//         guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;

//         // Calculate the number of tables booked by each customer
//         const numberOfTables = Math.ceil(numberOfGuestsParsed / 6);
//         if (!tablesBookedByCustomer[booking.name]) {
//           tablesBookedByCustomer[booking.name] = 0;
//         }
//         tablesBookedByCustomer[booking.name] += numberOfTables;
//       }
//     });
//     return { guestCount, tablesBookedByCustomer };
//   };