import React, { useEffect, useRef, useState } from "react";
import Location from "@/components/common/dropdownSearch/Location";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import Calender from "./common/dropdownSearch/Calender";
import { DateObject } from "react-multi-date-picker";
import NumberOfTravellers from "./common/dropdownSearch/NumberOfTravellers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";

const HeroSearch = ({ CustomClass }) => {
  const { translate } = useTranslation();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);
  const [tourMambar, setTourMambar] = useState("");
  const router = useRouter();
  const dropDownContainer = useRef(null);

  const { location, setLocation, calender, counts } = useGlobalState();
  
  // Handle undefined calendar values gracefully
  const startDate = calender?.[0] ? calender[0].format("YYYY.MM.DD") : "";
  const endDate = calender?.[1] ? calender[1].format("YYYY.MM.DD") : "";

  const handleDateChange = (newDates) => {
    setDates(newDates);
    const formattedDates = newDates.map((date) => date.format("YYYY.MM.DD"));
    console.log("formattedDates", formattedDates);
  };

  const closeDropdown = () => setCurrentActiveDD("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
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

  

  const person = Object.values(counts).reduce((total, count) => total + count, 0);
  


  const handleSearch = () => {
    // Constructing query parameters
    const queryParams = [];
    if (location) queryParams.push(`TourType=${location}`);
    if (startDate) queryParams.push(`StartDate=${startDate}`);
    if (endDate) queryParams.push(`EndDate=${endDate}`);
    if (person) queryParams.push(`person=${person}`);

    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

    return queryString;
  };

  return (
    <div ref={dropDownContainer}>
      <div className="searchForm__form">
        <div className="searchFormItem js-select-control js-form-dd">
          <div className="searchFormItem__button" onClick={handleLocationChange}>
            <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
              <i className="text-20 icon-pin"></i>
            </div>
            <div className="searchFormItem__content">
              <h5>{translate("Tour Type")}</h5>
              <div className="js-select-control-chosen">
                {translate(location) ? translate(location) : translate("Search Destinations")}
              </div>
            </div>
          </div>
          <Location
            setLocation={handleLocationSelection}
            active={currentActiveDD === "location"}
          />
        </div>

        <div className="searchFormItem js-select-control js-form-dd js-calendar">
          <div className="searchFormItem__button" onClick={handleCalenderChange}>
            <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
              <i className="text-20 icon-calendar"></i>
            </div>
            <div className="searchFormItem__content">
              <h5>{translate("Start of trip to end of trip")}</h5>
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
          <div className="searchFormItem__button" onClick={handleTourTypeChange}>
            <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
              <i className="text-20 icon-flag"></i>
            </div>
            <div className="searchFormItem__content">
              <h5>{translate("Passenger")}</h5>
              <div className="js-select-control-chosen">
                {translate("Passenger")} {person ? person : translate("person")}
              </div>
            </div>
          </div>
          <NumberOfTravellers
            setTourType={handleTourTypeSelection}
            active={currentActiveDD === "tourType"}
          />
        </div>

        <Link
          href={`/tour/${handleSearch()}`}
          className="searchForm__button"
        >
          <button className={`button -info-2 bg-accent-1 ${CustomClass} text-white`}>
            <i className="icon-search text-16 mr-10"></i>
            {translate('Search')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSearch;
