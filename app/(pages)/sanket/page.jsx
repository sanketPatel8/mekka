"use client"

import React, { useState } from 'react';

const BookingComponent = () => {
  const [selectedTime, setSelectedTime] = useState(null); // Example state for selected time

  // Function to set selected time
  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  // Determine CSS class or inline style based on selectedTime
  const getStatusColor = () => {
    if (selectedTime === 'Cancelled') {
      return { color: 'red' }; // Red color for Cancelled status
    } else if (selectedTime === 'Completed') {
      return { color: 'green' }; // Green color for Completed status
    } else if (selectedTime === 'In Progress') {
      return { color: 'orange' }; // Orange color for In Progress status
    } else {
      return {}; // Default color or no style applied
    }
  };

  return (
    <div>
      <button onClick={() => handleSelectTime('Cancelled')}>Set Cancelled</button>
      <button onClick={() => handleSelectTime('Completed')}>Set Completed</button>
      <button onClick={() => handleSelectTime('In Progress')}>Set In Progress</button>

      {/* Display the booking status with dynamically applied color */}
      <p className="t_center" style={getStatusColor()}>
        Booking Status : {selectedTime ? selectedTime : "Choose Status"}
      </p>
    </div>
  );
};

export default BookingComponent;
