"use client";

import React, { useEffect, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import Image from "next/image";
import { times } from "@/data/tourSingleContent";

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
  const [isExtraService, setisExtraService] = useState(false);
  const [SingBed, setSingBed] = useState(false);
  const [twoBed, setTwoBed] = useState(false);
  const [ThreeBad, setThreeBad] = useState(false);
  const [fourbad, setFourbad] = useState(false);
  const [Flight, setFlight] = useState(false);

  const [isServicePerPerson, setIsServicePerPerson] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);
  useEffect(() => {
    setExtraCharge(0);
    if (isExtraService) {
      setExtraCharge((pre) => pre + prices.extraService);
    }
    if (isServicePerPerson) {
      setExtraCharge((pre) => pre + prices.servicePerPerson);
    }
  }, [isExtraService, isServicePerPerson, setExtraCharge]);

  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);

  return (
    <div className="tourSingleSidebar">
      <h5 className="text-18 fw-500 mb-20 mt-20">Tickets</h5>

      <div>
        <div className="d-flex items-center justify-between">
          <div className="text-14">
            Adult (18+ years){" "}
            <span className="fw-500">
            €{(prices.adultPrice * adultNumber).toFixed(2)}
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
            €{(prices.youthPrice * youthNumber).toFixed(2)}
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
            €{(prices.childrenPrice * childrenNumber).toFixed(2)}
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

      <h5 className="text-18 fw-500 mb-20 mt-20">Hotel selection</h5>

<div className="d-flex items-center justify-between">
  <div className="d-flex items-center">
    <div className="form-checkbox">
      <input
        checked={isExtraService ? true : false}
        onChange={() => setisExtraService((pre) => !pre)}
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
    <div className="ml-10">Hotel For Mekka (3 star)</div>
  </div>

  <div className="text-14">€40</div>
</div>

<div className="d-flex justify-between mt-20">
  <div className="d-flex">
    <div className="form-checkbox mt-5">
      <input
        checked={isServicePerPerson ? true : false}
        onChange={() => setIsServicePerPerson((pre) => !pre)}
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

    <div className="ml-10">
      Hotel for Madina (5 star)
      {/* <div className="lh-16">
        Adult: <span className="fw-500">€17.00</span> - Youth:{" "}
        <span className="fw-500">€14.00</span>
      </div> */}
    </div>
  </div>

  <div className="text-14">€40</div>
</div>

<hr />

      <h5 className="text-18 fw-500 mb-20 mt-20">Possible additional services per person:</h5>

      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-checkbox">
            <input
              checked={fourbad ? true : false}
              onChange={() => setFourbad((pre) => !pre)}
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
          <div className="ml-10">4 Bettzimmer (Standard)</div>
        </div>

        <div className="text-14">+0,00€</div>
      </div>
      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-checkbox">
            <input
              checked={SingBed ? true : false}
              onChange={() => setSingBed((pre) => !pre)}
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
          <div className="ml-10">3 Bettzimmer</div>
        </div>

        <div className="text-14">+100,00€</div>
      </div>
      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-checkbox">
            <input
              checked={ThreeBad ? true : false}
              onChange={() => setThreeBad((pre) => !pre)}
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
          <div className="ml-10">2 Bettzimmer</div>
        </div>

        <div className="text-14">+230,00€</div>
      </div>
      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-checkbox">
            <input
              checked={twoBed ? true : false}
              onChange={() => setTwoBed((pre) => !pre)}
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
          <div className="ml-10">1 Bettzimmer</div>
        </div>

        <div className="text-14">+450,00€</div>
      </div>

      

      <hr />

      <h5 className="text-18 fw-500 mb-20 mt-20">Flight Booking</h5>

      <div className="d-flex items-center justify-between">
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
          <div className="ml-10">Is flight included?</div>
        </div>

        <div className="text-14">€40</div>
      </div>


      <div className="line mt-20 mb-20"></div>

      <div className="d-flex items-center justify-between">
        <div className="text-18 fw-500">Total:</div>
        <div>
        <div className="text-18 fw-500">
        €
          {(
            prices.adultPrice * adultNumber +
            prices.youthPrice * youthNumber +
            prices.childrenPrice * childrenNumber +
            extraCharge * 1
          ).toFixed(2)}
        </div>
          <span className="text-center">included</span>
        </div>
      </div>

      <button className="button -md -info-2 col-12 bg-accent-1 text-white mt-20">
        Book Now
        <i className="icon-arrow-top-right ml-10"></i>
      </button>
    </div>
  );
}
