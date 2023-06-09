exports.getTrainsInNext12hrs = (trainsData) => {
  const currentDateTime = new Date();
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();
  const currentSecond = currentDateTime.getSeconds();
  const result = [];

  for (const train of trainsData) {
    let departureMinutes = train.departureTime.Minutes + train.delayedBy;
    let departureHours = train.departureTime.Hours;

    if (currentHour >= 12) {
      // converting it to 24 hr format
      if (departureHours < 12) {
        departureHours += 24;
      }
    }

    if (departureMinutes >= 60) {
      departureMinutes -= 60; // Adjust minutes
      departureHours++; // Increment hours
    }

    // Checking if the train departs within the next 12 hours
    if (
      departureHours - currentHour <= 12 &&
      departureHours - currentHour >= 0
    ) {
      if (departureHours - currentHour === 0) {
        if (departureMinutes - currentMinute >= 30) {
          // If the train departs within the current hour and has at least 30 minutes remaining
          result.push(train);
        }
      } else {
        if (departureHours - currentHour === 12) {
          if (departureMinutes - currentMinute <= 0) {
            // If the train departs exactly 12 hours from the current hour and has not yet departed
            result.push(train);
          }
        } else {
          // For all other trains within the next 12 hours
          result.push(train);
        }
      }
    }
  }

  return result; // Return the filtered train list
};
