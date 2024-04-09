import { useState, useEffect } from "react";
import { useContracts } from "../../hooks/useContract";

import useBookingManagement from "../../hooks/useBookingManagement";
import { useGuestAndTableCount } from "../../hooks/useGuestAndTableCount";
import useBookingFilter from "../../hooks/useBookingFilter";
import { useBookingSubmission } from "../../hooks/useBookingHandleSubmition";
import useBookingEditor from "../../hooks/useBookingEditor";

import BookingsListA from "./BookingListA";

import Input from "../../UI/Input";

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
  const [tableAvailabilityMessage, setTableAvailabilityMessage] = useState("");
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
      // Handle errors, e.g., display error message to user
      console.error("Failed to process booking:", error);
    }
  };

  const handleRemoveBooking = async (id) => {
    await removeBooking(id);
  };

  const handleChangeInSearch = (e) => {
    setSearchBookings(e.target.value);
  };

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

      const totalBookedTables = Object.values(tablesBookedByCustomer).reduce(
        (acc, cur) => acc + cur,
        0,
      );
      console.log("Total Booked Tables:", totalBookedTables);

      setTableAvailabilityMessage("");
    } else {
      setTableAvailabilityMessage(
        "Please select a date and time to check table availability.",
      );
    }
  }, [bookings, selectedDate, selectedTimeSlot]);

  const filteredBookingsData = useBookingFilter(
    bookings,
    selectedDate,
    selectedTimeSlot,
    searchBookings,
    timeSlotMapping,
  );
  const searchFilteredBookings = filteredBookingsData.filter((booking) =>
    booking.name.toLowerCase().includes(searchBookings.toLowerCase()),
  );

  return (
    <div>
      <h2>{isEditing ? "Edit Booking" : "Create Booking"}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Date of Arrival"
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div>
          <label htmlFor="timeSlot">Time Slot</label>
          <select
            name="timeSlot"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {Object.keys(timeSlotMapping).map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Number of Guests"
          type="number"
          placeholder="Number of Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          step="1"
          required
        />
        <Input
          label="Customer Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">
          {isEditing ? "Save Changes" : "Confirm Booking"}
        </button>
        <button
  type="button"
  onClick={() => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      stopEditing();
    }
  }}
>
  Clear
</button>
      </form>
      {/* <ul>
        {Object.entries(tablesBookedByCustomer).booking(([customer, numTables]) => (
          <li key={customer}>
            {`${customer}: ${numTables} tables`}
          </li>
        ))}
      </ul>  */}
      <h3>Filter Bookings</h3>
      <div>
        <label htmlFor="filterDate">Select Date:</label>
        <input
          type="date"
          id="filterDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="filterTimeSlot">Select Time Slot:</label>
        <select
          id="filterTimeSlot"
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          <option value="">All Time Slots</option>
          {Object.keys(timeSlotMapping).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginButtom: 0 }}>
        <Input
          label="Search Bookings"
          type="text"
          placeholder="Search Bookings"
          value={searchBookings}
          onChange={handleChangeInSearch}
        />
        <button onClick={resetFilters}>Reset All Filters</button>
      </div>
      <h3>Chech Table Availability </h3>
      <div>{tableAvailabilityMessage && <p>{tableAvailabilityMessage}</p>}</div>
      <div>
        Available Tables: {console.log(availableTables) || availableTables}
      </div>{" "}
      {/*behöver utredas/*}
      {/* <ul>
        {/* {Object.entries(customerBookings).booking(([customer, numTables]) => (
          <li key={customer}>
            {`${customer}: ${numTables} tables`}
          </li> */}
      {/* ))}
      </ul> */}
      <h3>Customer Bookings</h3>
      <h3>Guest Count</h3>
      <h4>Per selected date and Time:</h4>
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
          >
            <div>
              <BookingsListA
                bookings={searchFilteredBookings}
                startEditBooking={startEditBooking}
                handleRemoveBooking={handleRemoveBooking}
                guestCount={guestCount}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInterface;
