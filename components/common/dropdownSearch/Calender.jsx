"use client";

import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

export default function Calender() {
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  const handleDateChange = (newDates) => {
    setDates(newDates);
    // Format and log the selected dates
    const formattedDates = newDates.map(date => date.format("MMMM DD YYYY"));
    console.log("Selected dates:", formattedDates);
  };

  return (
    <DatePicker
      inputClass="custom_input-picker"
      containerClassName="custom_container-picker"
      value={dates}
      onChange={handleDateChange}
      numberOfMonths={2}
      offsetY={10}
      range
      rangeHover
      format="MMMM DD YYYY" // Update the format here if needed
    />
  );
}
