

export const useManageBookings = (writeContract) => {


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
    const editBooking = async (id, numberOfGuests, name, date, time) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.editBooking(id, numberOfGuests, name, date, time);
            await transaction.wait();
            console.log("Booking edited successfully");
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
        } catch (error) {
            console.error("Error removing booking:", error);
        }
    };

    return { createBooking, removeBooking,editBooking };
};
