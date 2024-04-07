import { useBookingEvents } from "../hooks/useBookingEvents";

export const BookingStatus = ({ readContract, timeout }) => {
    const bookingEvents = useBookingEvents(readContract, timeout);

    return (
        <p className="notice">
            {bookingEvents.create === false
                ? "Failed to create booking. Please try again."
                : bookingEvents.create && "Booking created successfully!"}

            {bookingEvents.delete === false
                ? "Failed to delete booking. Please try again."
                : bookingEvents.delete && "Booking deleted successfully!"}

            {bookingEvents.update === false
                ? "Failed to update booking. Please try again."
                : bookingEvents.update && "Booking updated successfully!"}
        </p>
    );
};
