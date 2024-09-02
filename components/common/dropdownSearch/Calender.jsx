import React from "react";
import DatePicker from "react-multi-date-picker";
import { useGlobalState } from "@/app/context/GlobalStateContext";

export default function Calender() {
  const { calender, setCalender, setFormattedDates } = useGlobalState();

  const handleDateChange = (newDates) => {
    setCalender(newDates); // Update the global state with the selected dates

    const formattedDates = newDates.map((date) => date.format("YYYY.MM.DD"));
    setFormattedDates(formattedDates); // Store the formatted dates globally

    console.log("Selected dates:", formattedDates);
  };

  return (
    <DatePicker
      value={calender}
      onChange={handleDateChange}
      numberOfMonths={2}
      offsetY={10}
      range
      rangeHover
      format="YYYY.MM.DD"
      inputClass="custom_input-picker"
      containerClassName="custom_container-picker"
      placeholder="Please Select Your Date "
    />
  );
}
