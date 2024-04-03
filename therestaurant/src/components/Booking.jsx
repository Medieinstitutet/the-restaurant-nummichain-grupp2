import { useContracts } from "../hooks/useContract"
import { useEffect, useState } from "react"
import { contractAddress } from "../config"
import {ethers} from 'ethers'
import { abi } from "../config"
import { BookingForm } from "./BookingForm"
import '../styles/booking-form.scss'


export const BookingComponent = () => {
    const [writeContract, setWriteContract] = useState()
    const [readContract, setReadContract] = useState()
    const [account, setAccount] = useState('')
    const [booking, setBooking] = useState('')
    const [bookingDetails, setBookingDetails] = useState([]) 
    const numberOfGuests = 2;
    const name = "Yelli"
    const date = new Date();
    const time = 18
    const restaurantId = 123

  
    
          
        
    
      

useEffect(() => {
    

    const makeContract = async() => {
            
     

            const requestAccount = async() => {
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(account[0]);
            console.log(account);
        }
        
        requestAccount()
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        console.log(signer, provider);
        const writeContract = new ethers.Contract(
        contractAddress,
        abi, 
        signer
    )
    setWriteContract(writeContract);
    const readContract = new ethers.Contract(
        contractAddress, 
        abi,
        provider
    )
    setReadContract(readContract);
}
    
makeContract()
}, [])

const bookingContract = async() => {
    const provider = writeContract.provider;
    const signer = writeContract.signer;

    try {
       const result =  await writeContract.createBooking(
            2,
            "Yelli",
            "18th of July",
            18,
            123
        )
        await result.wait()
      
        setBooking('Success')
    } catch (error) {
        console.log('there was an error getting contract', error);

        setBooking('Error making a booking')
    }
}  
const readBookings = async() => {
    try {
        const provider = writeContract.provider
        const bookingCount = await readContract['bookingCount']();
        console.log(bookingCount);
        const bookingsArray = []
    
        for(let i=0; i<bookingCount; i++){
            const booking = await readContract.bookings(i)
            bookingsArray.push(booking);
        }
        setBookingDetails(bookingsArray);
    } catch (error) {
        console.log('There was an error fetching bookings', error);
    }
  
    
}

 

    return(
        <>
       <button className="button">18:00 - IN WORKING PROGRESS</button>
       <button className="button">21:00 - IN WORKING PROGRESS</button>
       <div>
       <button className="button" onClick={bookingContract}>Create Booking</button>
            {booking && <p>{booking}</p>}
       </div>
       <div>
            <button onClick={readBookings}>Fetch Bookings</button>
           
        </div>
        <div>
            {bookingDetails.map((booking, index) => (
                    <div key={index}>
                        <p>Booking ID: {booking.id}</p>
                        <p>Number of Guests: {booking.numberOfGuests}</p>
                        <p>Name: {booking.name}</p>
                        <p>Date: {booking.date}</p>
                        <p>Time: {booking.time}</p>
                        <p>Restaurant ID: {booking.restaurantId}</p>
                    </div>
                ))}
            </div>
        <BookingForm/>
        </>
    )
}
