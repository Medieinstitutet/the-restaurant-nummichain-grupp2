import { useContracts } from "../hooks/useContract"
import { useEffect, useState } from "react"
import {ethers} from 'ethers'
import { BookingForm } from "./BookingForm"
import '../styles/booking-form.scss'
import { useManageBookings } from "../hooks/useManageBooking"
import { requestAccess } from "../hooks/requestAccount"

export const BookingComponent = () => {
    const [readContract, writeContract] = useContracts()
    const {createBooking} = useManageBookings(writeContract)
    const [booking, setBooking] = useState('')
    const [bookingDetails, setBookingDetails] = useState([]) 
  
useEffect(() => {

   requestAccess()
},[] )

const handleFormSubmit = (bookingData) => {
    createBooking(
        bookingData.numberOfGuests,
        bookingData.name,
        bookingData.date,
        bookingData.time,
        bookingData.restaurantId
    );
    setBooking('booking created successfully ')
    
}

    return(
        <>
        <div>
            {bookingDetails.map((booking, index) => (
                    <div key={index}>
                        <p>Booking ID: {Number(booking.id)}</p>
                        <p>Number of Guests: {booking.numberOfGuests}</p>
                        <p>Name: {booking.name}</p>
                        <p>Date: {booking.date.toString()}</p>
                        <p>Time: {booking.time.toString()}</p>
                        <p>Restaurant ID: {Number(booking.restaurantId)}</p>
                    </div>
                ))}
            </div>

        <BookingForm onFormSubmit={handleFormSubmit}/>
        </>
    )
}