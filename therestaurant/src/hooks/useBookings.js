import { useEffect,useState } from "react";

export const useBookings = (readContract) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
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

        fetchBookings();
    }, [readContract]);

    return bookings;

};
