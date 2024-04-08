import { useContracts } from "../hooks/useContract";
import { BookingForm } from "./BookingForm";
import { useManageBookings } from "../hooks/useManageBooking";
import { useBookings } from "../hooks/useBookings";
import { BookingStatus } from "../components/BookingStatus";
import "../styles/booking-form.scss";

export const BookingComponent = () => {
    const [readContract, writeContract] = useContracts();
    const { createBooking } = useManageBookings(writeContract);
    const bookings = useBookings(readContract);

    const handleFormSubmit = (bookingData) => {
        createBooking(
            bookingData.numberOfGuests,
            bookingData.name,
            bookingData.date,
            bookingData.time,
            1
        );
    };

    return (
        <>
            <BookingStatus readContract={readContract} timeout={10000} />
            <BookingForm onFormSubmit={handleFormSubmit} bookings={bookings} />
        </>
    );
};
