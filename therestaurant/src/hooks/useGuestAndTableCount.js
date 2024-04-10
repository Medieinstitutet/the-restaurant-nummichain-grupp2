import { useMemo } from "react";
import { reverseTimeSlotMapping } from "../utils/timeSlot";

export const useGuestAndTableCount = (bookings, selectedDate, selectedTimeSlot) => {
  // Using useMemo to memoize and only recalculate when dependencies change
  const { guestCount, tablesBookedByCustomer, availableTables } = useMemo(() => {
    const guestCount = {};
    const tablesBookedByCustomer = {};

    // Processing bookings to update guest and table counts
    bookings.forEach((booking) => {
      if (
        booking.date === selectedDate &&
        reverseTimeSlotMapping(booking.time) === selectedTimeSlot
      ) {
        const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
        // Ensure numberOfGuests is a valid number before proceeding
        const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10) || 0;
        guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;

        // Calculate tables based on number of guests, assuming each table seats 6
        const numberOfTables = Math.ceil(numberOfGuestsParsed / 6);
        tablesBookedByCustomer[booking.name] =
          (tablesBookedByCustomer[booking.name] || 0) + numberOfTables;
      }
    });

    // Calculate the total booked tables and available tables
    const totalBookedTables = Object.values(tablesBookedByCustomer).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const availableTables = Math.max(15 - totalBookedTables, 0);

    return { guestCount, tablesBookedByCustomer, availableTables };
  }, [bookings, selectedDate, selectedTimeSlot]);

  return { guestCount, tablesBookedByCustomer, availableTables };
};




// import { useState, useEffect } from "react";
// import { reverseTimeSlotMapping } from "../utils/timeSlot";

// export const useGuestAndTableCount = (
//   bookings,
//   selectedDate,
//   selectedTimeSlot,
// ) => {
//   const [guestCount, setGuestCount] = useState({});
//   const [tablesBookedByCustomer, setTablesBookedByCustomer] = useState({});
//   const [availableTables, setAvailableTables] = useState(15);

//   useEffect(() => {
//     const countGuestsByDayAndTimeSlot = () => {
//       const guestCount = {};
//       const tablesBookedByCustomer = {};

//       bookings.forEach((booking) => {
//         if (
//           booking.date === selectedDate &&
//           reverseTimeSlotMapping(booking.time) === selectedTimeSlot
//         ) {
//           const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
//           const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10);
//           guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;

//           const numberOfTables = Math.ceil(numberOfGuestsParsed / 6);
//           tablesBookedByCustomer[booking.name] =
//             (tablesBookedByCustomer[booking.name] || 0) + numberOfTables;
//         }
//       });
//       setGuestCount(guestCount);
//       setTablesBookedByCustomer(tablesBookedByCustomer);

//       const totalBookedTables = Object.values(tablesBookedByCustomer).reduce(
//         (acc, cur) => acc + cur,
//         0,
//       );
//       setAvailableTables(Math.max(15 - totalBookedTables, 0));
//     };

//     countGuestsByDayAndTimeSlot();
//   }, [bookings, selectedDate, selectedTimeSlot]);

//   return { guestCount, tablesBookedByCustomer, availableTables };
// };
