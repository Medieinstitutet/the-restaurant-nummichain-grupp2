import { useContracts } from "../hooks/useContract"
import { useRequestAccount } from "../hooks/requestAccount"
import { useEffect, useState } from "react"

import {ethers} from 'ethers'
import { BookingForm } from "./BookingForm"
import '../styles/booking-form.scss'


export const BookingComponent = () => {
    const [readContract, writeContract] = useContracts();
    const account = useRequestAccount()
    const [booking, setBooking] = useState('')
    const [bookingDetails, setBookingDetails] = useState([]) 

useEffect(() => {
    const makeContract = async() => {

    console.log(account);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
    console.log(signer, provider);
    
}
    
makeContract()
}, [readContract, writeContract, account])

const bookingContract = async(numberOfGuests, name, date, time, restaurantId) => {
    try {
       const result =  await writeContract.createBooking(
            numberOfGuests,
            name,
            date,
            time,
            restaurantId
        )
        await result.wait()
        setBooking('Success')
    } catch (error) {
        console.log('there was an error getting contract', error);
        setBooking('Error making a booking')
    }
 
const readBookings = async() => {
    try {
        const bookingCount = await readContract['bookingCount']();
        console.log(bookingCount);
        const bookingsArray = []
        console.log(bookingsArray);
        for(let i=0; i<bookingCount; i++){
            const booking = await readContract.bookings(i)
            bookingsArray.push(booking);
        }
        setBookingDetails(bookingsArray);
    } catch (error) {
        console.log('There was an error fetching bookings', error);
    }
  
    
}

const handleFormSubmit = (bookingData) => {
    bookingContract(
        bookingData.numberOfGuests,
        bookingData.name,
        bookingData.date,
        18,
        bookingData.restaurantId
    );
}

    return(
        <>
    
       <div>
            <button onClick={readBookings}>Fetch Bookings</button>
           
        </div>
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
}