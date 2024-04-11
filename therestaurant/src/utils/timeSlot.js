// Author: Elena Lehto Fedenbrink

export const timeSlotMapping ={
    "18:00 - 21:00": BigInt(1),
    "21:00 - 00:00": BigInt(2),
  };
// export const reverseTimeSlotMapping = (num) => {
//     for (const [key, value] of Object.entries(timeSlotMapping)) {
//       if (value === num) {
//         return key;
//       }
//     }
//     // Return "21:00 - 00:00" if num equals 2, otherwise default to "18:00 - 21:00"
//     return num === 2 ? "21:00 - 00:00" : "18:00 - 21:00";
//   };

//   export const mapTimeSlot = (timeSlot) => {
//     return timeSlotMapping[timeSlot] || null; // Return null if time slot is not defined
// };
export const reverseTimeSlotMapping = (num) => {
  // Convert num to BigInt for proper comparison if it's not already a BigInt
  const bigIntNum = typeof num === 'bigint' ? num : BigInt(num);
  for (const [key, value] of Object.entries(timeSlotMapping)) {
      if (value === bigIntNum) {
          return key;
      }
  }
  // Return "21:00 - 00:00" if num equals BigInt(2), otherwise default to "18:00 - 21:00"
  return bigIntNum === BigInt(2) ? "21:00 - 00:00" : "18:00 - 21:00";
};