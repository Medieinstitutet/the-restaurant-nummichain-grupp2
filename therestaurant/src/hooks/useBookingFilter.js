// // Author Elena Lehto Fredenbrink 

import{useState, useEffect} from 'react'


const useBookingFilter = (bookings, selectedDate, selectedTimeSlot, searchBookings, timeSlotMapping) => {
    const [filteredBookings, setFilteredBookings] = useState([]);
    
    useEffect(() => {
      // Filter bookings by date and time slot first
      let newFilteredBookings = bookings.filter(
        (booking) =>
          (!selectedDate || booking.date === selectedDate) &&
          (!selectedTimeSlot || booking.time === timeSlotMapping[selectedTimeSlot])
      );
      
    
      newFilteredBookings = newFilteredBookings.filter((booking) =>
        booking.name.toLowerCase().includes(searchBookings.toLowerCase())
      );
      
      setFilteredBookings(newFilteredBookings);
    }, [bookings, selectedDate, selectedTimeSlot, searchBookings, timeSlotMapping]);
    
    return filteredBookings;
  };
  
  export default useBookingFilter; 
