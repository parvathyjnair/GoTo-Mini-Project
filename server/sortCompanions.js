function sortCompanions(companionData, givenDate, givenTime) {
    // Function to parse date and time to a Date object
    function parseDateTime(date, time) {
      return new Date(`${date}T${time}`);
    }
  
    // Given date and time as Date object
    const givenDateTime = parseDateTime(givenDate, givenTime);
  
    // Calculate time difference and sort
    companionData.sort((a, b) => {
      const dateTimeA = parseDateTime(a.date, a.time);
      const dateTimeB = parseDateTime(b.date, b.time);
  
      const diffA = Math.abs(dateTimeA - givenDateTime);
      const diffB = Math.abs(dateTimeB - givenDateTime);
  
      return diffA - diffB;
    });
  
    return companionData;
}

export default sortCompanions;

//   const companionData = [
//     { date: "2024-02-10", time: "14:00" },
//     { date: "2024-02-10", time: "12:00" },
//     { date: "2024-02-10", time: "13:00" },
//   ];
  
//   console.log(sortCompanions(companionData, "2024-02-10", "12:30"));
  // This will sort companionData based on the time difference from "2024-02-10" "12:30"
  