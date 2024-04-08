// Author; Elena Lehto Fredenbrink

import { useState, useEffect } from "react";
import { reverseTimeSlotMapping } from "../utils/timeSlot";

export const useGuestAndTableCount = (
  bookings,
  selectedDate,
  selectedTimeSlot,
) => {
  const [guestCount, setGuestCount] = useState({});
  const [tablesBookedByCustomer, setTablesBookedByCustomer] = useState({});
  const [availableTables, setAvailableTables] = useState(15);

  useEffect(() => {
    const countGuestsByDayAndTimeSlot = () => {
      const guestCount = {};
      const tablesBookedByCustomer = {};

      bookings.forEach((booking) => {
        if (
          booking.date === selectedDate &&
          reverseTimeSlotMapping(booking.time) === selectedTimeSlot
        ) {
          const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
          const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10);
          guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;

          const numberOfTables = Math.ceil(numberOfGuestsParsed / 6);
          tablesBookedByCustomer[booking.name] =
            (tablesBookedByCustomer[booking.name] || 0) + numberOfTables;
        }
      });
      setGuestCount(guestCount);
      setTablesBookedByCustomer(tablesBookedByCustomer);

      const totalBookedTables = Object.values(tablesBookedByCustomer).reduce(
        (acc, cur) => acc + cur,
        0,
      );
      setAvailableTables(Math.max(15 - totalBookedTables, 0));
    };

    countGuestsByDayAndTimeSlot();
  }, [bookings, selectedDate, selectedTimeSlot]);

  return { guestCount, tablesBookedByCustomer, availableTables };
};
