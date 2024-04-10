import { useEffect, useState } from "react"

export const useValidateTimeslots = (date, bookings) => {
    const [s1Available, setS1Available] = useState(true);
    const [s2Available, setS2Available] = useState(true);

    useEffect(() => {
        const setSlot = (slotSetter, time, bookings) => {
            const count = bookings.filter((booking) => Number(booking[4]) === time).length;
            slotSetter(count <= 14);
        };

        const filteredBookings = bookings.filter((booking) => booking[3] === date);

        setSlot(setS1Available, 1, filteredBookings);
        setSlot(setS2Available, 2, filteredBookings);

    }, [date, bookings]);

    return { s1Available, s2Available }
};