import { useContracts } from "./useContract";
export const useManageBookings = () => {
    const [writeContract] = useContracts(); // Assuming useContracts() is set up correctly

    const createBooking = async (numberOfGuests, name, date, time, restaurantId) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.createBooking(
                numberOfGuests, name, date, time, restaurantId
            );
            await transaction.wait();
            console.log("Booking created successfully");
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    const removeBooking = async (bookingId) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.removeBooking(bookingId);
            await transaction.wait();
            console.log("Booking removed successfully");
        } catch (error) {
            console.error("Error removing booking:", error);
        }
    };

    return { createBooking, removeBooking };
};
