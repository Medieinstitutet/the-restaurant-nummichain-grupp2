import FormManagement from "./FormManagement";
import { useState, useEffect } from "react";
import { useContracts } from "../../hooks/useContract";

import useBookingManagement from "../../hooks/useBookingManagement";
// import { useGuestAndTableCount } from "../../hooks/useGuestAndTableCount";
import { calculateGuestAndTableCount } from "../../utils/checkTableAvailabity";
import useBookingFilter from "../../hooks/useBookingFilter";
import { useBookingSubmission } from "../../hooks/useBookingHandleSubmition";
import useBookingEditor from "../../hooks/useBookingEditor";

import BookingsListA from "./BookingListA";
import FilterSection from "./FilterSectionA.jsx";


import { timeSlotMapping } from "../../utils/timeSlot";

const AdminInterface = () => {
    const [readContract, writeContract] = useContracts();
    const { bookings, createBooking, editBooking, removeBooking } =
        useBookingManagement(readContract, writeContract);

    const [guests, setGuests] = useState("1");
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("18:00 - 21:00");
    const [availabilityInfo, setAvailabilityInfo] = useState({guestCount: {}, tablesBookedByCustomer: {}, availableTables: 15});
    
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [searchBookings, setSearchBookings] = useState("");

    const today = new Date().toISOString().split("T")[0];
    const [tableAvailabilityMessage, setTableAvailabilityMessage] =
        useState("");
    const restaurantID = 1;

    // const { guestCount, tablesBookedByCustomer, availableTables } =
    //     useGuestAndTableCount(bookings, selectedDate, selectedTimeSlot);

    const {
        isEditing,
        editingBookingId,
        startEditBooking,
        stopEditing,
        hasBookingChanged,
        setIsEditing,
        setEditingBookingId,
    } = useBookingEditor({
        setGuests,
        setName,
        setDate,
        setTime,
    });

    const submitBooking = useBookingSubmission({
        createBooking,
        editBooking,
        // availableTables,
        setGuests,
        setName,
        setDate,
        setTime,
        setIsEditing,
        setEditingBookingId,
        hasBookingChanged,
        restaurantID,
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
         
            await submitBooking(event, {
                guests,
                name,
                date,
                time,
                isEditing,
                editingBookingId,
            });
        } catch (error) {
            console.error("Failed to process booking:", error);
        }
    };

    const handleRemoveBooking = async (id) => {
        await removeBooking(id);
    };

    // const handleChangeInSearch = (e) => {
    //   setSearchBookings(e.target.value);
    // };

    const resetFilters = () => {
        setSelectedDate("");
        setSelectedTimeSlot("");
        setSearchBookings("");
    };

    useEffect(() => {
        if (selectedDate && selectedTimeSlot) {
            const { guestCount, tablesBookedByCustomer, availableTables } = calculateGuestAndTableCount(bookings, selectedDate, selectedTimeSlot);
            setAvailabilityInfo({ guestCount, tablesBookedByCustomer, availableTables });
            setTableAvailabilityMessage(`Available Tables: ${availableTables}`);
        } else {
            setTableAvailabilityMessage("Please select a date and time to check table availability.");
        }
    }, [bookings, selectedDate, selectedTimeSlot]);

    const filteredBookingsData = useBookingFilter(
        bookings,
        selectedDate,
        selectedTimeSlot,
        searchBookings,
        timeSlotMapping
    );
    const searchFilteredBookings = filteredBookingsData.filter((booking) =>
        booking.name.toLowerCase().includes(searchBookings.toLowerCase())
    );

    return (
        <>
            <FilterSection
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
                searchBookings={searchBookings}
                setSearchBookings={setSearchBookings}
                resetFilters={resetFilters}
                guestCount={availabilityInfo.guestCount}
                tableAvailabilityMessage={tableAvailabilityMessage}
                filteredBookings={searchFilteredBookings}
                />

            <FormManagement
                guests={guests}
                setGuests={setGuests}
                name={name}
                setName={setName}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                isEditing={isEditing}
                handleSubmit={handleSubmit}
                stopEditing={stopEditing}
                today={today}
                hasBookingChanged={hasBookingChanged}
                
            />
            <BookingsListA
                bookings={searchFilteredBookings}
                startEditBooking={startEditBooking}
                handleRemoveBooking={handleRemoveBooking}
                // guestCount={guestCount}
            />
            
        </>
    );
};

export default AdminInterface;
