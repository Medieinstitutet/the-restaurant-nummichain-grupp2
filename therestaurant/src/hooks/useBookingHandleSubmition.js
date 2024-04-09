import { useCallback } from "react";
import { timeSlotMapping } from "../utils/timeSlot";

export function useBookingSubmission({
  createBooking,
  editBooking,
  availableTables,
  setIsEditing,
  setGuests,
  setName,
  setDate,
  setTime,
  setEditingBookingId,
  restaurantID,
}) {
  const handleCreateSubmit = useCallback(
    async (
      event,
      { guests, name, date, time, isEditing, editingBookingId },
    ) => {
      event.preventDefault();
      try {
        const numberOfGuestsParsed = parseInt(guests, 10);
        const requestedTables = Math.ceil(numberOfGuestsParsed / 6);
        const timeSlotNumber = timeSlotMapping[time];
        console.log("Requested Tables:", requestedTables);
        console.log("Available Tables:", availableTables);

        if (availableTables <= 0) {
          alert(
            "Sorry, the restaurant is fully booked for the selected date and time slot.",
          );
          return;
        }

        if (availableTables < requestedTables) {
          alert(
            `Sorry, we do not have enough available tables for the number of guests you have provided. We have ${availableTables} tables left for the requested date and time slot.`,
          );
          return;
        }

        if (isEditing && editingBookingId) {
          await editBooking(
            editingBookingId,
            numberOfGuestsParsed,
            name,
            date,
            timeSlotNumber,
          );
        } else {
          await createBooking(
            numberOfGuestsParsed,
            name,
            date,
            timeSlotNumber,
            restaurantID,
          );
        }

        setGuests("1");
        setName("");
        setDate("");
        setTime("18:00 - 21:00");
        setIsEditing(false);
        setEditingBookingId(null);
      } catch (error) {
        console.error("Error when submitting the booking:", error);
      }
    },
    [
      createBooking,
      editBooking,
      availableTables,
      restaurantID,
      setIsEditing,
      setGuests,
      setName,
      setDate,
      setTime,
      setEditingBookingId,
    ],
  );

  return handleCreateSubmit;
}
