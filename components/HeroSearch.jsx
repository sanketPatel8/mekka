import React, { useEffect, useRef, useState } from "react";
import Location from "@/components/common/dropdownSearch/Location";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import Calender from "./common/dropdownSearch/Calender";
import { DateObject } from "react-multi-date-picker";
import NumberOfTravellers from "./common/dropdownSearch/NumberOfTravellers";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeroSearch = ({ CustomClass }) => {
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);
  const [tourMambar, setTourMambar] = useState("");

  const router = useRouter();
  const dropDownContainer = useRef(null);

  const { location, setLocation, calender, tourType, setTourData } =
    useGlobalState();

  const handleDateChange = (newDates) => {
    setDates(newDates);
    const formattedDates = newDates.map((date) => date.format("YYYY-MM-DD"));
  };

  const closeDropdown = () => setCurrentActiveDD("");

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleLocationChange = () => {
    setCurrentActiveDD((prev) => (prev === "location" ? "" : "location"));
  };

  const handleCalenderChange = () => {
    setCurrentActiveDD((prev) => (prev === "calender" ? "" : "calender"));
  };

  const handleTourTypeChange = () => {
    setCurrentActiveDD((prev) => (prev === "tourType" ? "" : "tourType"));
  };

  const handleLocationSelection = (value) => {
    setLocation(value);
    closeDropdown();
  };

  const handleTourTypeSelection = (value) => {
    setTourMambar(value);
    closeDropdown();
  };

  console.log("dates", calender);

  return (
    <div ref={dropDownContainer}>
      <div className="searchForm__form">
        <div className="searchFormItem js-select-control js-form-dd">
          <div
            className="searchFormItem__button"
            onClick={handleLocationChange}
          >
            <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
              <i className="text-20 icon-pin"></i>
            </div>
            <div className="searchFormItem__content">
              <h5>Tour Type</h5>
              <div className="js-select-control-chosen">
                {location ? location : "Search destinations"}
              </div>
            </div>
          </div>

          <Location
            setLocation={handleLocationSelection}
            active={currentActiveDD === "location"}
          />
        </div>

        <div className="searchFormItem js-select-control js-form-dd js-calendar">
          <div
            className="searchFormItem__button"
            onClick={handleCalenderChange}
          >
            <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
              <i className="text-20 icon-calendar"></i>
            </div>
            <div className="searchFormItem__content">
              <h5>Start of trip to end of trip</h5>
              <div>
                <span className="js-first-date">
                  <Calender dates={dates} onDateChange={handleDateChange} />
                </span>
                <span className="js-last-date"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="searchFormItem js-select-control js-form-dd">
          <div
            className="searchFormItem__button"
            onClick={handleTourTypeChange}
          >
            <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
              <i className="text-20 icon-flag"></i>
            </div>
            <div className="searchFormItem__content">
              <h5>Passenger</h5>
              <div className="js-select-control-chosen">
                {tourType ? tourType : "All tour"}
              </div>
            </div>
          </div>

          <NumberOfTravellers
            setTourType={handleTourTypeSelection}
            active={currentActiveDD === "tourType"}
          />
        </div>

        <Link
          href={`/tour/?TourType=${location}&StartDate=${calender[0]}&enddate=${calender[1]}`}
        >
          <div className="searchForm__button">
            <button
              className={`button -info-2 bg-accent-1 ${CustomClass} text-white`}
            >
              <i className="icon-search text-16 mr-10"></i>
              Search
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSearch;
