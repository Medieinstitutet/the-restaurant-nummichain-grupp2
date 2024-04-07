import React, { useState } from 'react';
import '../styles/booking-form.scss'

export const BookingForm = ({onFormSubmit}) => {
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

    const handleTimeButtonClick = (time) => {
        setBookingForm({
            ...bookingForm,
            time: time // setting a time, type:time (converted to number in the contract)
        });
        console.log(time);//checking the time returns to the console correctly 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // validate imputs
        if (!bookingForm.numberOfGuests || !bookingForm.name || !bookingForm.date || !bookingForm.time || !bookingForm.restaurantId) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
    

        console.log('Form submitted:', bookingForm);
        //pass the component
        onFormSubmit(bookingForm);
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
                    Restaurant ID:
                    <input
                        type="text"
                        name="restaurantId"
                        value={bookingForm.restaurantId}
                        onChange={handleInputChange}
                    />
                </label>
                <br/>
                <button type="button" className={bookingForm.time === '18:00' ? 'selected' : ''} onClick={() => handleTimeButtonClick('18')}>
                    18:00 
                </button>
                <button type="button" className={bookingForm.time === '21:00' ? 'selected' : ''} onClick={() => handleTimeButtonClick('21')}>
                    21:00 
                </button>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};