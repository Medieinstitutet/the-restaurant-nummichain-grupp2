import Input from "../../UI/Input";
import { timeSlotMapping } from "../../utils/timeSlot";
import "./filterSectionA.scss";
import GuestAndTableInfo from"./TablesAndGuestsNumInfo"

const FilterSection = ({
    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
    searchBookings,
    setSearchBookings,
    resetFilters,
    guestCount,
    tableAvailabilityMessage,
    filteredBookings,
}) => {
    return (
        <>
            <div className="filter-section">
                <h3>Filter Bookings</h3>
                <div className="filter-fields">
                    <div className="filter-field">
                        <Input
                            label="Date"
                            className="input"
                            type="date"
                            name="date"
                            id="filterDate"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    <div className="filter-field">
                        <label htmlFor="filterTimeSlot">Time Slot:</label>
                        <select
                            className="input"
                            name="timeSlot"
                            id="filterTimeSlot"
                            value={selectedTimeSlot}
                            onChange={(e) =>
                                setSelectedTimeSlot(e.target.value)
                            }
                        >
                            <option value="">All Time Slots</option>
                            {Object.keys(timeSlotMapping).map((key) => (
                                <option key={key} value={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-field">
                        <Input
                            label="Search"
                            className="input"
                            type="text"
                            name="search"
                            id="filterSearch"
                            placeholder="Enter booking name"
                            value={searchBookings}
                            onChange={(e) => setSearchBookings(e.target.value)}
                        />
                    </div>
                </div>
                <button className="button reset-button" onClick={resetFilters}>
                    Reset Filters
                </button>
                <GuestAndTableInfo
                guestCount={guestCount}
                tableAvailabilityMessage={tableAvailabilityMessage}
                filteredBookings={filteredBookings}
            />
            </div>
           
        </>
    );
};

export default FilterSection;
