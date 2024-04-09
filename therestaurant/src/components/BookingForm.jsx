import { useEffect, useState } from "react";
import { useValidateTimeslots } from "../hooks/useValidateTimeslots";

import "../styles/booking-form.scss";

export const BookingForm = ({ onFormSubmit, bookings }) => {
    const [bookingForm, setBookingForm] = useState({
        numberOfGuests: 1,
        name: "",
        date: "",
        time: 1,
        restaurantId: 1,
    });

    const { s1Available, s2Available } = useValidateTimeslots(
        bookingForm.date,
        bookings
    );

    useEffect(() => {
        setBookingForm((prevBookingForm) => ({
            ...prevBookingForm,
            time: s1Available ? 1 : s2Available ? 2 : 0,
        }));
    }, [bookingForm.date, s1Available, s2Available]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingForm({
            ...bookingForm,
            [name]: value,
        });
    };

    const handleTimeButtonClick = (time) => {
        setBookingForm({
            ...bookingForm,
            time: time,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(bookingForm);
        setBookingForm({
            numberOfGuests: "",
            name: "",
            date: "",
            time: "",
            restaurantId: "",
        });
    };

    const hasSlotTimePassed = (targetTime) => {
        const parts = targetTime.split(":");
        const targetHours = parseInt(parts[0], 10);
        const targetMinutes = parseInt(parts[1], 10);

        const currentDate = new Date();

        currentDate.setHours(targetHours);
        currentDate.setMinutes(targetMinutes);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);

        return currentDate > new Date(bookingForm.date);
    };

    return (
        <div>
            <h2>Book your virtual seat</h2>
            <form className="booking-form" onSubmit={handleSubmit}>
                <label>
                    Number of Guests:
                    <input
                        type="number"
                        name="numberOfGuests"
                        value={bookingForm.numberOfGuests}
                        onChange={handleInputChange}
                        min="1"
                        max="6"
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={bookingForm.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={bookingForm.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                    />
                </label>
                <button
                    type="button"
                    style={{
                        background:
                            (!s1Available || hasSlotTimePassed("18:00")) &&
                            "#bbb",
                        cursor:
                            (!s1Available || hasSlotTimePassed("18:00")) &&
                            "not-allowed",
                    }}
                    className={bookingForm.time === 1 ? "selected" : ""}
                    onClick={() => handleTimeButtonClick(1)}
                    disabled={!s1Available || hasSlotTimePassed("18:00")}
                >
                    {s1Available
                        ? hasSlotTimePassed("18:00")
                            ? "Unavailable"
                            : "18:00"
                        : "Fully Booked"}
                </button>
                <button
                    type="button"
                    style={{
                        background:
                            (!s2Available || hasSlotTimePassed("21:00")) &&
                            "#bbb",
                        cursor:
                            (!s2Available || hasSlotTimePassed("21:00")) &&
                            "not-allowed",
                    }}
                    className={bookingForm.time === 2 ? "selected" : ""}
                    onClick={() => handleTimeButtonClick(2)}
                    disabled={!s2Available || hasSlotTimePassed("21:00")}
                >
                    {s2Available
                        ? hasSlotTimePassed("21:00")
                            ? "Unavailable"
                            : "21:00"
                        : "Fully Booked"}
                </button>
                <br />
                <button type="submit">Book</button>
            </form>
        </div>
    );
};
