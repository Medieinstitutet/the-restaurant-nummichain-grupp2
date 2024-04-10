

const GuestAndTableInfo = ({ guestCount, tableAvailabilityMessage }) => {
    return (
        <div >
            <h3>Check Table Availability</h3>
            <p>{tableAvailabilityMessage}</p>
            
           
            <div>Guest Count Per selected date and Time:</div>
            <ul>
                {Object.keys(guestCount).map((key) => (
                    <li key={key}>{`Date: ${key}: Guests: ${guestCount[key]}`}</li>
                
                ))}
            </ul>
        </div>
    );
};

export default GuestAndTableInfo;
