import { useState, useCallback, useEffect } from "react";
import { useContracts } from "../../hooks/useContract";
import Input from "../../UI/Input";
import useBookingManagement from "../../hooks/useBookingManagement";
// import memoize from 'memoize-one';

const timeSlotMapping = {
  "18:00 - 21:00": BigInt(1),
  "21:00 - 00:00": BigInt(2),
};
// const totalSeats = 15 * 6;
// Function to reverse the time slot mapping
const reverseTimeSlotMapping = (num) => {
  for (const [key, value] of Object.entries(timeSlotMapping)) {
    if (value === num) {
      return key;
    }
  }
  // Return "21:00 - 00:00" if num equals 2, otherwise default to "18:00 - 21:00"
  return num === 2 ? "21:00 - 00:00" : "18:00 - 21:00";
};

// const filterBookings = memoize((bookings, selectedDate, selectedTimeSlot) => {
//   return bookings.filter(booking =>
//     (!selectedDate || booking.date === selectedDate) &&
//     (!selectedTimeSlot || booking.time === timeSlotMapping[selectedTimeSlot])
//   );
// });
// const countGuestsByDayAndTimeSlot = (bookings) => {
//   const guestCount = {};
//   bookings.forEach((booking) => {
//     const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
//     const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10);
//     guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;
//   });
//   return guestCount;
// };

const AdminInterface = () => {
  const [readContract, writeContract] = useContracts();
  const { bookings, createBooking, editBooking, removeBooking } =
    useBookingManagement(readContract, writeContract);

  const [guests, setGuests] = useState("1");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("18:00 - 21:00");
  const [isEditing, setIsEditing] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [guestCount, setGuestCount] = useState({});
  const [searchBookings, setSearchBookings] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  // const filteredBookings = filterBookings(bookings, selectedDate, selectedTimeSlot);
  // const [availabilityMessagebleSeats, setAvailableSeats] = useState(90);
  const [tableAvailabilityMessage, setTableAvailabilityMessage] = useState("");

  const [availableTables, setAvailableTables] = useState(15);
  const [tablesBookedByCustomer, setTablesBookedByCustomer] = useState({});
  // const [customerBookings, setCustomerBookings] = useState({});
  const today = new Date().toISOString().split("T")[0];
  const restaurantID = 1;

  const countGuestsByDayAndTimeSlot = (bookings) => {
    const guestCount = {};
    const tablesBookedByCustomer = {};

    bookings.forEach((booking) => {
      if (
        booking.date === selectedDate &&
        reverseTimeSlotMapping(booking.time) === selectedTimeSlot
      ) {
        const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
        const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10);
        guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;

        // Calculate the number of tables booked by each customer
        const numberOfTables = Math.ceil(numberOfGuestsParsed / 6);
        if (!tablesBookedByCustomer[booking.name]) {
          tablesBookedByCustomer[booking.name] = 0;
        }
        tablesBookedByCustomer[booking.name] += numberOfTables;
      }
    });
    return { guestCount, tablesBookedByCustomer };
  };
  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      console.log("Initial bookings:", bookings);
      const { guestCount, tablesBookedByCustomer } =
        countGuestsByDayAndTimeSlot(bookings, selectedDate, selectedTimeSlot);

      console.log("Guest Count:", guestCount);
      console.log("Tables Booked by Customer:", tablesBookedByCustomer);

      const totalBookedTables = Object.values(tablesBookedByCustomer).reduce(
        (acc, cur) => acc + cur,
        0,
      );
      console.log("Total Booked Tables:", totalBookedTables);

      setGuestCount(guestCount);
      setAvailableTables(Math.max(15 - totalBookedTables, 0)); 
      setTablesBookedByCustomer(tablesBookedByCustomer);
      setTableAvailabilityMessage("");
    } else {

      setTableAvailabilityMessage(
        "Please select a date and time to check table availability.",
      );
     
      setGuestCount({});
      setTablesBookedByCustomer({});
      setAvailableTables(15); 
    }
  }, [bookings, selectedDate, selectedTimeSlot]);

  useEffect(() => {
    console.log("Tables Booked By Customer:", tablesBookedByCustomer);
    console.log("Available Tables:", availableTables);
  }, [tablesBookedByCustomer, availableTables]);

  const filterBookingsByDateAndTimeSlot = useCallback(() => {
    return bookings.filter(
      (booking) =>
        (!selectedDate || booking.date === selectedDate) &&
        (!selectedTimeSlot ||
          booking.time === timeSlotMapping[selectedTimeSlot]),
    );
  }, [bookings, selectedDate, selectedTimeSlot]);

  
  useEffect(() => {
    const filteredBookings = filterBookingsByDateAndTimeSlot();
    setFilteredBookings(filteredBookings);
  }, [filterBookingsByDateAndTimeSlot]);

  // Update filtered bookings based on selected date and time slot
  // useEffect(() => {
  //   const filteredBookings = filterBookingsByDateAndTimeSlot();
  //   setFilteredBookings(filteredBookings);
  // }, [filterBookingsByDateAndTimeSlot]);
  // const filteredSearchedBookings = useMemo(() => {
  //   return filteredBookings.filter(booking =>
  //     booking.name.toLowerCase().includes(searchBookings.toLowerCase())
  //   );
  // }, [filteredBookings, searchBookings]);

  //  useEffect(() => {
  //   const [tablesBookedByCustomer])GuestsByDayAndTimeSlot = (bookings) => {
  //     const guestCount = {};
  //     const customerBookings = {};//////////////////////////
  //     bookings.forEach((booking) => {
  //       const key = `${booking.date}-${reverseTimeSlotMapping(booking.time)}`;
  //       const numberOfGuestsParsed = parseInt(booking.numberOfGuests, 10);
  //       guestCount[key] = (guestCount[key] || 0) + numberOfGuestsParsed;
  //       if (!customerBookings[booking.name]) { /////
  //         customerBookings[booking.name] = 1;////////
  //       } else { ///////
  //         customerBookings[booking.name]++; /////
  //       }/////////
  //     });//////////
  //     return { guestCount, customerBookings };/////////////

  //   };

  //   const { guestCount, customerBookings } = countGuestsByDayAndTimeSlot(bookings);
  //   setGuestCount(guestCount);
  //   setCustomerBookings(customerBookings);

  //   const bookedSeats = Object.values(guestCount).reduce((acc, cur) => acc + cur, 0);
  //   const remainingSeats = totalSeats - bookedSeats;
  //   setAvailableTables(Math.floor(remainingSeats / 6));
  // }, [bookings]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const numberOfGuestsParsed = parseInt(guests, 10);
       const requestedTables = Math.ceil(numberOfGuestsParsed / 6);

      const timeSlotNumber = timeSlotMapping[time];
      console.log(typeof timeSlotNumber);
      // const key = `${date}-${time}`;
      // console.log(typeof(time))
      // if (guestCount[key] + numberOfGuestsParsed > availableSeats) {
      //   alert(`No available seats for the selected date and time slot! remaining seats: ${availableSeats}`);
      //   return;
      // }
      if (availableTables <= 0 ) {
        alert(
          "Sorry, the restaurant is fully booked for the selected date and time slot.",
        );
        return;
      }
      if (availableTables < requestedTables) {
        alert(`Sorry, there are not enough tables available for the number of guests. We have ${availableTables}tables left for the resquested date and time slot`);
        return; 
      }

      if (isEditing && editingBookingId) {
        await editBooking(
          editingBookingId,
          numberOfGuestsParsed,
          name,
          date,
          timeSlotNumber,
        );
        console.log(typeof timeSlotNumber);
      } else {
        await createBooking(
          numberOfGuestsParsed,
          name,
          date,
          timeSlotNumber,
          restaurantID,
        );
        console.log(typeof timeSlotNumber);
      }

      setGuests("1");
      setName("");
      setDate("");
      setTime("18:00 - 21:00");
      setIsEditing(false);
      setEditingBookingId(null);
    },
    [
      createBooking,
      editBooking,
      guests,
      name,
      date,
      time,
      isEditing,
      editingBookingId,
    ],
  );

  const startEditBooking = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setGuests(String(booking.numberOfGuests));
      setName(booking.name);
      setDate(booking.date);
      setTime(reverseTimeSlotMapping(booking.time));
      setIsEditing(true);
      setEditingBookingId(bookingId);
    }
  };

  const handleRemoveBooking = async (id) => {
    await removeBooking(id);
  };

  const handleChangeInSearch = (e) => {
    setSearchBookings(e.target.value);
  };
  const searchFilteredBookings = filteredBookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchBookings.toLowerCase()),
  );
  const resetFilters = () => {
    setSelectedDate("");
    setSelectedTimeSlot("");
    setSearchBookings("");
  };

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
          // max={availableSeats}
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
      <div style={{marginButtom: 0 }}>
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
                index !== filteredBookings.length - 1
                  ? "1px solid #ccc"
                  : "none",
            }}
          >
            <div>
              <span>{`CustomerName: ${booking.name}`}</span>
              <div style={{ marginTop: "0.5rem" }}>
                <span> {`Date: ${booking.date}`}</span>
              </div>
              <span>{`Time: ${reverseTimeSlotMapping(booking.time)}`}</span>
              <div style={{ marginTop: "0.5rem" }}>
                <span>{`Guests: ${booking.numberOfGuests}`}</span>
              </div>
            </div>
            <div style={{ marginTop: "0.5rem", color: "#888" }}>
              <span>
                Tables Booked By Customer:{" "}
                {tablesBookedByCustomer[booking.name] || 0}
              </span>
            </div>

            <button onClick={() => startEditBooking(booking.id)}>Edit</button>
            <button onClick={() => handleRemoveBooking(booking.id)}>
              Cancel Booking
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInterface;

