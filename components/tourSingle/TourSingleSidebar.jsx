"use client";

import React, { useEffect, useState } from "react";
import { State } from "@/data/tourSingleContent";
import "@/public/css/index.css";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";

export default function TourSingleSidebar() {
  const prices = {
    adultPrice: 94,
    youthPrice: 84,
    childrenPrice: 20,
    extraService: 40,
    servicePerPerson: 40,
  };

  const [PackageData, setPackageData] = useState([]);

  const sendData = {
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    id: 12,
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData function called");
      try {
        const response = await post("tour_details", sendData);
        setPackageData(response);
      } catch (error) {
        console.error("Error caught:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showErrorToast("Please verify your email");
        } else {
          showErrorToast("An error occurred during registration.");
        }
      }
    };

    fetchData();
  }, []);

  const [adultNumber, setAdultNumber] = useState(3);
  const [youthNumber, setYouthNumber] = useState(2);
  const [childrenNumber, setChildrenNumber] = useState(4);
  const [extraService, setExtraService] = useState("");
  const [isServicePerPerson, setIsServicePerPerson] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);
  const [radioValue, setRadioValue] = useState("");
  const [selectedCheckbox, setselectedCheckbox] = useState(false);

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleExcludeFlight = () => {
    if (selectedCheckbox === false) {
      setselectedCheckbox(true);
    } else {
      setselectedCheckbox(false);
    }
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

  const { translate } = useTranslation();
  return (
    <div className="tourSingleSidebar">
      <h5 className="text-18 fw-500 mb-20 mt-20">
        {translate("Tickets") }
      </h5>

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

      <div>
        <h5 className="text-18 fw-500 mb-20 mt-20">
          {translate("Hotel For Makka") }
        </h5>
        {/* {mekkaHotels.map((elm , ind) => (
          <div key={ind}>
            <div
              className="d-flex items-center justify-between my-1"
              key={elm.id}
            >
              <div className="d-flex items-center">
                <div className="form-radio d-flex items-center">
                  <label className="radio d-flex items-center">
                    <input
                      type="radio"
                      name="radioGroup"
                      value={`mekka-${elm.hotel_stars}star`}
                      checked={radioValue === `mekka-${elm.hotel_stars}star`}
                      onChange={handleRadioChange}
                    />
                    <span className="radio__mark">
                      <span className="radio__icon"></span>
                    </span>
                    <span className="text-14 lh-1 ml-10">
                      {elm.hotel_name} ({elm.hotel_stars} star)
                    </span>
                  </label>
                </div>
              </div>
              <div className="text-14">40 €</div>
            </div>
          </div>
        ))} */}

        <hr />

        <h5 className="text-18 fw-500 mb-20 mt-20">
          {translate("Hotel For Madina") }
        </h5>
        {/* {madinaHotels.map((elm) => (
          <div>
            <div
              className="d-flex items-center justify-between my-1"
              key={elm.id}
            >
              <div className="d-flex items-center">
                <div className="form-radio d-flex items-center">
                  <label className="radio d-flex items-center">
                    <input
                      type="radio"
                      name="radioGroup"
                      value={`madina-${elm.hotel_stars}star`}
                      checked={radioValue === `madina-${elm.hotel_stars}star`}
                      onChange={handleRadioChange}
                    />
                    <span className="radio__mark">
                      <span className="radio__icon"></span>
                    </span>
                    <span className="text-14 lh-1 ml-10">
                      {elm.hotel_name} ({elm.hotel_stars} star)
                    </span>
                  </label>
                </div>
              </div>
              <div className="text-14">40 €</div>
            </div>
          </div>
        ))} */}
      </div>

      <hr />

      <h5 className="text-18 fw-500 mb-20 mt-20">
        {translate("Flight Booking") }
      </h5>

      <div className="d-flex items-center justify-between pt-1">
        <div className="d-flex items-center justify-between">
          <div className="row ">
            <div className="col-12">
              <div className="d-flex items-center pointer-check">
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="item4"
                    name="item4"
                    checked={selectedCheckbox}
                    onChange={handleExcludeFlight}
                  />
                  <label htmlFor="item4" className="form-checkbox__mark ml-0">
                    <div className="form-checkbox__icon">
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                <label htmlFor="item4" className="lh-16 ml-15">
                  Exclude 
                  {translate(" Flight Booking") }
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="text-14">40 €</div>
      </div>

      <hr />

      <div className={` ${selectedCheckbox ? "d-none" : "d-block"}`}>
        <div>
          <div className="d-flex items-center justify-between my-1">
            <div className="d-flex items-center">
              <div className="form-radio d-flex items-center">
                <label className="radio  d-flex items-center">
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Flight-1"
                    checked={radioValue === "Flight-1"}
                    onChange={handleRadioChange}
                  />
                  <span className="radio__mark">
                    <span className="radio__icon"></span>
                  </span>
                  <span className="text-14 lh-1 ml-10">IndiGo ( No Stop )</span>
                </label>
              </div>
            </div>

            <div className="text-14">40 €</div>
          </div>

          <div className="d-flex items-center justify-between my-1">
            <div className="d-flex items-center">
              <div className="form-radio d-flex items-center">
                <label className="radio  d-flex items-center">
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Flight-2"
                    checked={radioValue === "Flight-2"}
                    onChange={handleRadioChange}
                  />
                  <span className="radio__mark">
                    <span className="radio__icon"></span>
                  </span>
                  <span className="text-14 lh-1 ml-10">
                    Akasa Air ( 1 Stop )
                  </span>
                </label>
              </div>
            </div>

            <div className="text-14">40 €</div>
          </div>

          <div className="d-flex items-center justify-between my-1">
            <div className="d-flex items-center">
              <div className="form-radio d-flex items-center">
                <label className="radio  d-flex items-center">
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Flight-3"
                    checked={radioValue === "Flight-3"}
                    onChange={handleRadioChange}
                  />
                  <span className="radio__mark">
                    <span className="radio__icon"></span>
                  </span>
                  <span className="text-14 lh-1 ml-10">Vistara ( 2 Stop )</span>
                </label>
              </div>
            </div>

            <div className="text-14">40 €</div>
          </div>

          <div className="d-flex items-center justify-between my-1">
            <div className="d-flex items-center">
              <div className="form-radio d-flex items-center">
                <label className="radio  d-flex items-center">
                  <input
                    type="radio"
                    name="radioGroup"
                    value="Flight-4"
                    checked={radioValue === "Flight-4"}
                    onChange={handleRadioChange}
                  />
                  <span className="radio__mark">
                    <span className="radio__icon"></span>
                  </span>
                  <span className="text-14 lh-1 ml-10">
                    Club One Air ( 4 Stop )
                  </span>
                </label>
              </div>
            </div>

            <div className="text-14">40 €</div>
          </div>
        </div>
        <hr />
        <div className="searchForm -type-1 -sidebar mt-20">
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
                          <span className="js-select-control-choice">
                            {elm}
                          </span>
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

      <div className="d-flex items-center justify-between pt-1">
        <div className="text-18 fw-500">Total:</div>
        <div>
          <div className="text-18 fw-500">
            {(
              prices.adultPrice * adultNumber +
              prices.youthPrice * youthNumber +
              prices.childrenPrice * childrenNumber +
              extraCharge * 1
            ).toFixed(2)}{" "}
            €
          </div>
        </div>
      </div>
      <p className="text-right">Including Taxes And Fees</p>

      <Link href="/booking">
        <button className="button -md -info-2 col-12 bg-accent-1 text-white mt-20">
          {translate("Book Now") }
        </button>
      </Link>
    </div>
  );
}
