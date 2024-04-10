import FormManagement from "./FormManagement";
import { useState, useEffect } from "react";
import { useContracts } from "../../hooks/useContract";

import useBookingManagement from "../../hooks/useBookingManagement";
import { useGuestAndTableCount } from "../../hooks/useGuestAndTableCount";
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

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [searchBookings, setSearchBookings] = useState("");

    const today = new Date().toISOString().split("T")[0];
    const [tableAvailabilityMessage, setTableAvailabilityMessage] =
        useState("");
    const restaurantID = 1;

    const { guestCount, tablesBookedByCustomer, availableTables } =
        useGuestAndTableCount(bookings, selectedDate, selectedTimeSlot);

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
        availableTables,
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
            // Call submitBooking with form data, handling both create and edit operations
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
            console.log("Initial bookings:", bookings);

            console.log("Guest Count:", guestCount);
            console.log("Tables Booked by Customer:", tablesBookedByCustomer);

            const totalBookedTables = Object.values(
                tablesBookedByCustomer
            ).reduce((acc, cur) => acc + cur, 0);
            console.log("Total Booked Tables:", totalBookedTables);

            // Log for debugging purposes
            console.log(
                "Available Tables (inside useEffect):",
                availableTables
            );

            setTableAvailabilityMessage(`Available Tables: ${availableTables}`);
        } else {
            setTableAvailabilityMessage(
                "Please select a date and time to check table availability."
            );
        }
    }, [bookings, selectedDate, selectedTimeSlot, availableTables]);

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
            />
            <BookingsListA
                bookings={searchFilteredBookings}
                startEditBooking={startEditBooking}
                handleRemoveBooking={handleRemoveBooking}
                guestCount={guestCount}
            />
            <div>
                <h3>Chech Table Availability </h3>
                <div>
                    {tableAvailabilityMessage && (
                        <p>{tableAvailabilityMessage}</p>
                    )}
                </div>

                <h3>Customer Bookings</h3>
                <h4>Per selected date and Time:</h4>
                <h3>Guest Count </h3>
                {Object.keys(guestCount).map((key) => (
                    <div key={key}>{`${key}: ${guestCount[key]}`}</div>
                ))}
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {searchFilteredBookings.map((booking, index) => (
                        <li
                            key={booking.id}
                            style={{
                                borderBottom:
                                    index !== filteredBookingsData.length - 1
                                        ? "1px solid #ccc"
                                        : "none",
                            }}
                        ></li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default AdminInterface;
