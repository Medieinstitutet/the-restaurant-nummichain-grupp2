

export const useManageBookings = (writeContract, ) => {
    console.log('writeContract initialized:', writeContract);



    const createBooking = async (numberOfGuests, name, date, time, restaurantId) => {
        if (!writeContract){ 
        
            console.log('writeContract is undefined');
            return;
        }
        console.log('Parameters:', { numberOfGuests, name, date, time, restaurantId })
        try {
            const transaction = await writeContract.createBooking(
                numberOfGuests, name, date, time, restaurantId
            );
            const receipt= await transaction.wait();
            console.log("Booking created successfully", receipt);
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
