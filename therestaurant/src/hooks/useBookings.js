import { useEffect,useState } from "react";
import { useContracts } from "./useContract";
export const useBookings = (restaurantId) => {
    const [bookings, setBookings] = useState([]);
    const [readContract] = useContracts(); 

    useEffect(() => {
        const fetchBookings = async () => {
            if (!readContract) return;

            try {
                const bookingIds = await readContract.getBookings(restaurantId);
                const bookingsData = await Promise.all(
                    bookingIds.map(id =>
                        readContract.bookings(id)
                    )
                );
                setBookings(bookingsData);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
        };

        fetchBookings();
    }, [readContract, restaurantId]);

    return bookings;
};
