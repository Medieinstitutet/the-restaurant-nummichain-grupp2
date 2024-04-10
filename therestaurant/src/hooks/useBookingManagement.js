import { useEffect, useState } from "react";

const useBookingManagement = (readContract, writeContract) => {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        if (!readContract) return;

        try {
            const bookingCount = Number(await readContract['bookingCount']());
            const allBookings = [];

            for (let i = 1; i <= bookingCount; i++) {
                const booking = await readContract.bookings(i)
                if (booking.name) {
                    allBookings.push(booking);
                }
            }
            setBookings(allBookings);
        } catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    };

    const createBooking = async (numberOfGuests, name, date, time, restaurantId) => {
        if (!writeContract) {
            console.log('writeContract is undefined');
            return;
        }

        console.log('Parameters:', { numberOfGuests, name, date, time, restaurantId })
        try {
            const transaction = await writeContract.createBooking(
                numberOfGuests, name, date, time, restaurantId
            );
            await transaction.wait();
            console.log("Booking created successfully");

            fetchBookings();
        } catch (error) {
            console.error("Error creating booking:", error);
            console.error("Detailed error message:", error.message);
        }
    };

    const editBooking = async (id, numberOfGuests, name, date, time) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.editBooking(id, numberOfGuests, name, date, time);
            await transaction.wait();
            console.log("Booking edited successfully");

            fetchBookings();
        } catch (error) {
            console.error("Error editing booking:", error);
        }
    };

    const removeBooking = async (bookingId) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.removeBooking(bookingId);
            await transaction.wait();
            console.log("Booking removed successfully");

            fetchBookings();
        } catch (error) {
            console.error("Error removing booking:", error);
        }
    };

    useEffect(() => {
        console.log("Fetching bookings...");
        fetchBookings();
    }, [readContract]);

    return { bookings, createBooking, removeBooking, editBooking };
};

export default useBookingManagement;
