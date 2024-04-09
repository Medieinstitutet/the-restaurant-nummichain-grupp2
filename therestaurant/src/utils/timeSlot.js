// Author: Elena Lehto Fedenbrink

export const timeSlotMapping ={
    "18:00 - 21:00": BigInt(1),
    "21:00 - 00:00": BigInt(2),
  };
export const reverseTimeSlotMapping = (num) => {
    for (const [key, value] of Object.entries(timeSlotMapping)) {
      if (value === num) {
        return key;
      }
    }
    // Return "21:00 - 00:00" if num equals 2, otherwise default to "18:00 - 21:00"
    return num === 2 ? "21:00 - 00:00" : "18:00 - 21:00";
  };
