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
      
      // Then filter by search term
      newFilteredBookings = newFilteredBookings.filter((booking) =>
        booking.name.toLowerCase().includes(searchBookings.toLowerCase())
      );
      
      setFilteredBookings(newFilteredBookings);
    }, [bookings, selectedDate, selectedTimeSlot, searchBookings, timeSlotMapping]);
    
    return filteredBookings;
  };
  
  export default useBookingFilter; 
// import { useEffect, useState } from "react";

// const useBookingFilter= (bookings, selectedDate, selectedTimeSlot, searchBookings, timeSlotMapping) => {
//     const [filteredBookings, setFilteredBookings] = useState([]);
  
//     useEffect(() => {
//       const filterByDateAndTimeSlot = bookings.filter(
//         (booking) =>
//           (!selectedDate || booking.date === selectedDate) &&
//           (!selectedTimeSlot ||
//             booking.time === timeSlotMapping[selectedTimeSlot])
//       );
//       setFilteredBookings(filterByDateAndTimeSlot);
//     }, [bookings, selectedDate, selectedTimeSlot, timeSlotMapping]);
  
//     useEffect(() => {
//       const filterBySearchTerm = filteredBookings.filter((booking) =>
//         booking.name.toLowerCase().includes(searchBookings.toLowerCase())
//       );
//       setFilteredBookings(filterBySearchTerm);
//     }, [searchBookings, filteredBookings]);
  
//     return filteredBookings;
//   };
  
//   export default useBookingFilter;