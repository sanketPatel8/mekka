"use client";

import React, { useState } from "react";
import Location from "@/components/common/dropdownSearch/Location";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import Calender from "./common/dropdownSearch/Calender";
import { DateObject } from "react-multi-date-picker";
import NumberOfTravellers from "./common/dropdownSearch/NumberOfTravellers";
import { useRouter } from "next/navigation";

const HeroSearch = ({ CustomClass }) => {
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);
  const [tourMambar, setTourMambar] = useState("");

  const router = useRouter();

  const {
    location,
    setLocation,
    calender,
    tourType,
    setTourData,
  } = useGlobalState();

  const handleDateChange = (newDates) => {
    setDates(newDates);
    const formattedDates = newDates.map((date) => date.format("YYYY-MM-DD"));
  };

  const handleFormClick = () => {
    // fetchSearch1Data();
    router.push("/tour");
  };

  return (
    <div>
      <div className="searchForm__form">
        <div className="searchFormItem js-select-control js-form-dd">
          <div
            className="searchFormItem__button"
            onClick={() =>
              setCurrentActiveDD((pre) => (pre == "location" ? "" : "location"))
            }
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
            setLocation={setLocation}
            active={currentActiveDD === "location"}
          />
        </div>

        <div className="searchFormItem js-select-control js-form-dd js-calendar">
          <div
            className="searchFormItem__button"
            onClick={() =>
              setCurrentActiveDD((pre) => (pre == "calender" ? "" : "calender"))
            }
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
            onClick={() =>
              setCurrentActiveDD((pre) => (pre == "tourType" ? "" : "tourType"))
            }
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
            setTourType={setTourMambar}
            active={currentActiveDD === "tourType"}
          />
        </div>

        <div onClick={handleFormClick} className="searchForm__button">
          <button className={`button -info-2 bg-accent-1 ${CustomClass} text-white`}>
            <i className="icon-search text-16 mr-10"></i>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
