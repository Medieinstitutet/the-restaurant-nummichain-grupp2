import { useMemo } from "react";
import { reverseTimeSlotMapping } from "../utils/timeSlot";

export const useGuestAndTableCount = (bookings, selectedDate, selectedTimeSlot) => {
  
  const { guestCount, tablesBookedByCustomer, availableTables } = useMemo(() => {
    const guestCount = {};
    const tablesBookedByCustomer = {};

    
    bookings.forEach((booking) => {
      if (
        booking.date === selectedDate &&
        reverseTimeSlotMapping(booking.time) === selectedTimeSlot
      ) {
        const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
        // Ensure numberOfGuests is a valid number before proceeding
        const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10) || 0;
        guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;

       
        const numberOfTables = Math.ceil(numberOfGuestsParsed / 6);
        tablesBookedByCustomer[booking.name] =
          (tablesBookedByCustomer[booking.name] || 0) + numberOfTables;
      }
    });

    
    const totalBookedTables = Object.values(tablesBookedByCustomer).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const availableTables = Math.max(15 - totalBookedTables, 0);

    return { guestCount, tablesBookedByCustomer, availableTables };
  }, [bookings, selectedDate, selectedTimeSlot]);

  return { guestCount, tablesBookedByCustomer, availableTables };
};

