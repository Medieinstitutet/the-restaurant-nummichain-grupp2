import React, { useState } from 'react';
import '../styles/booking-form.scss'

export const BookingForm = () => {
    const [bookingForm, setBookingForm] = useState({
        numberOfGuests: '',
        name: '',
        date: '',
        time: '',
        restaurantId: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingForm({
            ...bookingForm,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate that all imputs are present
        if (!bookingForm.numberOfGuests || !bookingForm.name || !bookingForm.date || !bookingForm.time || !bookingForm.restaurantId) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
       
        console.log('Form submitted:', bookingForm);
        // reeset
        setBookingForm({
            numberOfGuests: '',
            name: '',
            date: '',
            time: '',
            restaurantId: ''
        });
        setErrorMessage('');
    };

    return (
        <div>
            <h2>New Booking</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form className = "booking-form" onSubmit={handleSubmit}>
                <label>
                    Number of Guests:
                    <input
                        type="number"
                        name="numberOfGuests"
                        value={bookingForm.numberOfGuests}
                        onChange={handleInputChange}
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
                    />
                </label>
                <br />
                <label>
                    Time:
                    <input
                        type="time"
                        name="time"
                        value={bookingForm.time}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Restaurant ID:
                    <input
                        type="text"
                        name="restaurantId"
                        value={bookingForm.restaurantId}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
