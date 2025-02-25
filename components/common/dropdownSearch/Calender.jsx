import React from "react";
import DatePicker from "react-multi-date-picker";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Calender() {
  const { calender, setCalender, setFormattedDates } = useGlobalState();

  const handleDateChange = (newDates) => {
    setCalender(newDates); // Update the global state with the selected dates

    const formattedDates = newDates.map((date) => date.format("DD.MM.YYYY"));
    setFormattedDates(formattedDates); // Store the formatted dates globally
  };

  const { translate } = useTranslation();

  return (
    <DatePicker
      value={calender}
      onChange={handleDateChange}
      numberOfMonths={2}
      offsetY={10}
      range
      rangeHover
      format="DD.MM.YYYY"
      inputClass="custom_input-picker"
      containerClassName="custom_container-picker"
      placeholder={translate("Select Desired Date")}
      minDate={new Date()}
    />
  );
}
