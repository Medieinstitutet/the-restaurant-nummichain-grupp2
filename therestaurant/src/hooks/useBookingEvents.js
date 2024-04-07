import { useCallback, useEffect, useState } from "react"

export const useBookingEvents = (readContract, timeout) => {
    const [result, setResult] = useState({ create: null, update: null, delete: null });
    const [timeoutId, setTimeoutId] = useState(null);

    const handleEvent = useCallback((eventName, success) => {
        setResult(prevResult => ({ ...prevResult, [eventName]: success ? true : false }));

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => setResult(prevResult => ({ ...prevResult, [eventName]: null })), timeout);
        setTimeoutId(newTimeoutId);

    }, [timeoutId, timeout]);

    useEffect(() => {
        const initEvents = () => {
            if (readContract) {
                readContract.on("BookingCreated", async (success) => {
                    handleEvent('create', success);
                });

                readContract.on("DeletedBooking", async (success) => {
                    handleEvent('delete', success);
                });

                readContract.on("UpdatedBooking", async (booking) => {
                    handleEvent('update', booking);
                });
            }
        }

        initEvents();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                readContract.removeAllListeners();
            }
        }
    }, [readContract, handleEvent, timeoutId]);

    return result;
}