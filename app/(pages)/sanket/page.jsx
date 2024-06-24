"use client"

import React, { useState } from "react";
import { State } from "@/data/tourSingleContent";

const page = () => {

  const [Flight, setFlight] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);

  return (
    <div>
      <div
        className={`searchForm -type-1 -sidebar mt-20 ${
          Flight === true ? "d-none" : "d-block"
        }`}
      >
        <div className="searchForm__form">
          <div className="searchFormItem js-select-control js-form-dd">
            <div
              className="searchFormItem__button"
              onClick={() => setActiveTimeDD((pre) => !pre)}
              data-x-click="time"
            >
              <div className="searchFormItem__content">
                <h5>Departure </h5>
                <div className="js-select-control-chosen">
                  {selectedTime ? selectedTime : "Choose City"}
                </div>
              </div>
              <div className="searchFormItem__icon_chevron">
                <i className="icon-chevron-down d-flex text-18"></i>
              </div>
            </div>

            <div
              className={`searchFormItemDropdown -tour-type ${
                activeTimeDD ? "is-active" : ""
              }`}
              data-x="time"
              data-x-toggle="is-active"
            >
              <div className="searchFormItemDropdown__container">
                <div className="searchFormItemDropdown__list sroll-bar-1">
                  {State.map((elm, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedTime((pre) => (pre == elm ? "" : elm));
                        setActiveTimeDD(false);
                      }}
                      className="searchFormItemDropdown__item"
                    >
                      <button className="js-select-control-button">
                        <span className="js-select-control-choice">{elm}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
