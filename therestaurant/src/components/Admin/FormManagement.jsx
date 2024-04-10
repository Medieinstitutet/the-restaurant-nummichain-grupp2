import Input from "../../UI/Input";
import { timeSlotMapping } from "../../utils/timeSlot";
import "./formManagement.scss";
const FormManagement = ({
  guests,
  setGuests,
  name,
  setName,
  date,
  setDate,
  time,
  setTime,
  isEditing,
  handleSubmit,
  stopEditing,
  today,
}) => {
  return (
    <div className="form-management">
      <h1>{isEditing ? "Edit Booking" : "Create Booking"}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Date of Arrival"
          type="date"
          min={today}
          value={date}
          className="input-field" // Added class for styling
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div>
          <label htmlFor="timeSlot">Time Slot</label>
          <select
            name="timeSlot"
            className="input-field" // Use the same class for consistent styling
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
          value={guests}
          className="input-field" // Added class for styling
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          step="1"
          required
        />
        <Input
          label="Customer Name"
          type="text"
          value={name}
          className="input-field" // Added class for styling
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          {isEditing ? "Save Changes" : "Confirm Booking"}
        </button>
        <button
          type="button"
          className="cancel-button" // Use specific class for the cancel button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear the form?")) {
              stopEditing();
            }
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default FormManagement;
