"use client";

import React, { useEffect, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import Image from "next/image";
import { State} from "@/data/tourSingleContent";
import "@/public/css/index.css"
import Link from "next/link";

export default function TourSingleSidebar() {
  const prices = {
    adultPrice: 94,
    youthPrice: 84,
    childrenPrice: 20,
    extraService: 40,
    servicePerPerson: 40,
  };

  const [adultNumber, setAdultNumber] = useState(3);
  const [youthNumber, setYouthNumber] = useState(2);
  const [childrenNumber, setChildrenNumber] = useState(4);
  const [extraService, setExtraService] = useState('');
  const [isServicePerPerson, setIsServicePerPerson] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);
  const [hotelMakka, setHotelMakka] = useState("");
  const [hotelMadina, setHotelMadina] = useState("");
  const [roomType, setRoomType] = useState("");
  const [Flight, setFlight] = useState(false);
  const [radioValue, setRadioValue] = useState(""); 
  

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };


  useEffect(() => {
    setExtraCharge(0);
    if (extraService) {
      setExtraCharge((pre) => pre + prices.extraService);
    }
    if (isServicePerPerson) {
      setExtraCharge((pre) => pre + prices.servicePerPerson);
    }
  }, [extraService, isServicePerPerson, setExtraCharge]);

  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);

  const handleChange = (e) => {
    setHotelMakka(e.target.value)
  }
  return (
    <div className="tourSingleSidebar">
      <h5 className="text-18 fw-500 mb-20 mt-20">Tickets</h5>

      <div>
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Adult (18+ years){" "}
            <span className="fw-500">
              {(prices.adultPrice * adultNumber).toFixed(2)} €
            </span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setAdultNumber((pre) => (pre > 1 ? pre - 1 : pre))}
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{adultNumber}</div>
            </div>

            <button
              onClick={() => setAdultNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-15">
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Youth (13-17 years){" "}
            <span className="fw-500">
              {(prices.youthPrice * youthNumber).toFixed(2)} €
            </span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() => setYouthNumber((pre) => (pre > 1 ? pre - 1 : pre))}
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{youthNumber}</div>
            </div>

            <button
              onClick={() => setYouthNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-15">
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Children (0-12 years){" "}
            <span className="fw-500">
              {(prices.childrenPrice * childrenNumber).toFixed(2)} €
            </span>
          </div>

          <div className="d-flex items-center js-counter">
            <button
              onClick={() =>
                setChildrenNumber((pre) => (pre > 1 ? pre - 1 : pre))
              }
              className="button size-30 border-1 rounded-full js-down"
            >
              <i className="icon-minus text-10"></i>
            </button>

            <div className="flex-center ml-10 mr-10">
              <div className="text-14 size-20 js-count">{childrenNumber}</div>
            </div>

            <button
              onClick={() => setChildrenNumber((pre) => pre + 1)}
              className="button size-30 border-1 rounded-full js-up"
            >
              <i className="icon-plus text-10"></i>
            </button>
          </div>
        </div>
      </div>

      <hr />

      <h5 className="text-18 fw-500 mb-20 mt-20">Hotel For Makka</h5>

      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
        <div className="form-radio d-flex items-center">
                      <label className="radio">
                        <input
                          type="radio"
                          name="radioGroup"
                          value="mekka-3star"
                          checked={radioValue === "mekka-3star"}
                          onChange={handleRadioChange}
                        />
                        <span className="radio__mark">
                          <span className="radio__icon"></span>
                        </span>
                        {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                      </label>
                    </div>
          <div className="ml-10">Hotel-name ( 3 Star )</div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <div className="d-flex justify-between mt-1">
        <div className="d-flex items-center">
        <div className="form-radio d-flex items-center">
                      <label className="radio">
                        <input
                          type="radio"
                          name="radioGroup"
                          value="mekka-4star"
                          checked={radioValue === "mekka-4star"}
                          onChange={handleRadioChange}
                        />
                        <span className="radio__mark">
                          <span className="radio__icon"></span>
                        </span>
                        {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                      </label>
                    </div>

          <div className="ml-10">Hotel-name ( 4 Star )</div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <div className="d-flex justify-between mt-1">
        <div className="d-flex">
        <div className="form-radio d-flex items-center">
                      <label className="radio">
                        <input
                          type="radio"
                          name="radioGroup"
                          value="mekka-5star"
                          checked={radioValue === "mekka-5star"}
                          onChange={handleRadioChange}
                        />
                        <span className="radio__mark">
                          <span className="radio__icon"></span>
                        </span>
                        {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                      </label>
                    </div>

          <div className="ml-10">Hotel-name ( 5 Star )</div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <hr />

      <h5 className="text-18 fw-500 mb-20 mt-20">Hotel For Madina</h5>

      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
        <div className="form-radio d-flex items-center">
                      <label className="radio">
                        <input
                          type="radio"
                          name="radioGroup"
                          value="madina-3star"
                          checked={radioValue === "madina-3star"}
                          onChange={handleRadioChange}
                        />
                        <span className="radio__mark">
                          <span className="radio__icon"></span>
                        </span>
                        {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                      </label>
                    </div>
          <div className="ml-10">Hotel-name ( 3 Star )</div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <div className="d-flex justify-between mt-1">
        <div className="d-flex items-center">
        <div className="form-radio d-flex items-center">
                      <label className="radio">
                        <input
                          type="radio"
                          name="radioGroup"
                          value="madina-4star"
                          checked={radioValue === "madina-4star"}
                          onChange={handleRadioChange}
                        />
                        <span className="radio__mark">
                          <span className="radio__icon"></span>
                        </span>
                        {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                      </label>
                    </div>

          <div className="ml-10">Hotel-name ( 4 Star )</div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <div className="d-flex justify-between mt-1">
        <div className="d-flex">
        <div className="form-radio d-flex items-center">
                      <label className="radio">
                        <input
                          type="radio"
                          name="radioGroup"
                          value="madina-5star"
                          checked={radioValue === "madina-5star"}
                          onChange={handleRadioChange}
                        />
                        <span className="radio__mark">
                          <span className="radio__icon"></span>
                        </span>
                        {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                      </label>
                    </div>

          <div className="ml-10">Hotel-name ( 5 Star )</div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <hr />

      <h5 className="text-18 fw-500 mb-20 mt-20">Flight Booking</h5>

      <div className="d-flex items-center justify-between pt-1">
        <div className="d-flex items-center">
          <div className="form-checkbox">
            <input
              checked={Flight ? true : false}
              onChange={() => setFlight((pre) => !pre)}
              type="checkbox"
            />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon">
                <Image
                  width="10"
                  height="8"
                  src="/img/icons/check.svg"
                  alt="icon"
                />
              </div>
            </div>
          </div>
          <div className="ml-10">Exclude Flight Booking</div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <hr />

      <div className={`searchForm -type-1 -sidebar mt-20 ${Flight === true ? 'd-none' : 'd-block'}`}>

        <div className="searchForm__form">
          <div className="searchFormItem js-select-control js-form-dd">
            <div
              className="searchFormItem__button"
              onClick={() => setActiveTimeDD((pre) => !pre)}
              data-x-click="time"
            >
              {/* <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                <i className="text-20 icon-clock"></i>
              </div> */}
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

      {/* <div className="line mt-20 mb-20"></div> */}

      <div className="d-flex items-center justify-between pt-1">
        <div className="text-18 fw-500">Total:</div>
        <div>
          <div className="text-18 fw-500">
            
            {(
              prices.adultPrice * adultNumber +
              prices.youthPrice * youthNumber +
              prices.childrenPrice * childrenNumber +
              extraCharge * 1
            ).toFixed(2)} €
          </div>
          <span className="text-center">including taxes and fees</span>
        </div>
      </div>

      <Link href='/booking'>
          <button className="button -md -info-2 col-12 bg-accent-1 text-white mt-20">
            Book Now
            {/* <i className="icon-arrow-top-right ml-10"></i> */}
          </button>
        
      </Link>
    </div>
  );
}
