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

    return (
        <div>
            <h2>New Booking</h2>
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
                <br />
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
                <br />
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={bookingForm.date}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button
                    type="button"
                    style={{
                        background: !s1Available && "#ddd",
                        cursor: !s1Available && "not-allowed",
                    }}
                    className={bookingForm.time === 1 ? "selected" : ""}
                    onClick={() => handleTimeButtonClick(1)}
                    disabled={!s1Available}
                >
                    {s1Available ? "18:00" : "Fully Booked"}
                </button>
                <button
                    type="button"
                    style={{
                        background: !s2Available && "#ddd",
                        cursor: !s2Available && "not-allowed",
                    }}
                    className={bookingForm.time === 2 ? "selected" : ""}
                    onClick={() => handleTimeButtonClick(2)}
                    disabled={!s2Available}
                >
                    {s2Available ? "21:00" : "Fully Booked"}
                </button>
                <br />
                <button type="submit">Book</button>
            </form>
        </div>
    );
};
