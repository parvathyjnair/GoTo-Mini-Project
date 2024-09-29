function isCompanion(date1, time1, date2, time2){
    // Parse the dates
    const parsedDate1 = new Date(`${date1}T${time1}`);
    const parsedDate2 = new Date(`${date2}T${time2}`);
  
    // Check if dates are equal
    if (date1 === date2) return true;
  
    // Calculate the difference in time between the two dates in milliseconds
    const timeDifference = parsedDate1.getTime() - parsedDate2.getTime();
  
    // Check if the time difference is within one hour (3600000 milliseconds)
    return timeDifference >= 0 && timeDifference <= 3600000;
}

export default isCompanion;
  