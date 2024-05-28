"use client";

import React, { useEffect, useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import Image from "next/image";
import { times } from "@/data/tourSingleContent";
import "@/public/css/index.css"

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

      <h6 className="text-12 fw-500 mb-20 mt-20"><b>Hotel For Makka</b></h6>

      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-radio">
            <input
              type="radio"
              name="hotelMakka"
              value="3Star"
              className="radio-label"
              checked={hotelMakka === "3Star"}
              onChange={(e) => setHotelMakka(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
                <Image
                  width="10"
                  height="8"
                  src="/img/icons/check.svg"
                  alt="icon"
                />
              </div>
            </div>
          </div>
          <div className="ml-10">3 Star</div>
        </div>

        <div className="text-14">€40</div>
      </div>

      <div className="d-flex justify-between mt-20">
        <div className="d-flex">
          <div className="form-radio mt-5">
            <input
              type="radio"
              name="hotelMakka"
              value="4Star"
              className="radio-label"
              checked={hotelMakka === "4Star"}
              onChange={(e) => setHotelMakka(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
                <Image
                  width="10"
                  height="8"
                  src="/img/icons/check.svg"
                  alt="icon"
                />
              </div>
            </div>
          </div>

          <div className="ml-10">4 Star</div>
        </div>

        <div className="text-14">€40</div>
      </div>

      <div className="d-flex justify-between mt-20">
        <div className="d-flex">
          <div className="form-radio mt-5">
            <input
              type="radio"
              name="hotelMakka"
              value="5Star"
              className="radio-label"
              checked={hotelMakka === "5Star"}
              onChange={(e) => setHotelMakka(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
                <Image
                  width="10"
                  height="8"
                  src="/img/icons/check.svg"
                  alt="icon"
                />
              </div>
            </div>
          </div>

          <div className="ml-10">5 Star</div>
        </div>

        <div className="text-14">€40</div>
      </div>

      <hr />

      <h6 className="text-12 fw-500 mb-20 mt-20"><b>Hotel For Madina</b></h6>

      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-radio">
            <input
              type="radio"
              name="hotelMadina"
              value="3Star"
              className="radio-label"
              checked={hotelMadina === "3Star"}
              onChange={(e) => setHotelMadina(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
                <Image
                  width="10"
                  height="8"
                  src="/img/icons/check.svg"
                  alt="icon"
                />
              </div>
            </div>
          </div>
          <div className="ml-10">3 Star</div>
        </div>

        <div className="text-14">€40</div>
      </div>

      <div className="d-flex justify-between mt-20">
        <div className="d-flex">
          <div className="form-radio mt-5">
            <input
              type="radio"
              name="hotelMadina"
              value="4Star"
              className="radio-label"
              checked={hotelMadina === "4Star"}
              onChange={(e) => setHotelMadina(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
                <Image
                  width="10"
                  height="8"
                  src="/img/icons/check.svg"
                  alt="icon"
                />
              </div>
            </div>
          </div>

          <div className="ml-10">4 Star</div>
        </div>

        <div className="text-14">€40</div>
      </div>

      <div className="d-flex justify-between mt-20">
        <div className="d-flex">
          <div className="form-radio mt-5">
            <input
              type="radio"
              name="hotelMadina"
              value="5Star"
              className="radio-label"
              checked={hotelMadina === "5Star"}
              onChange={(e) => setHotelMadina(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
                <Image
                  width="10"
                  height="8"
                  src="/img/icons/check.svg"
                  alt="icon"
                />
              </div>
            </div>
          </div>

          <div className="ml-10">5 Star</div>
        </div>

        <div className="text-14">€40</div>
      </div>

      <hr />

      <h5 className="text-18 fw-500 mb-20 mt-20">Possible additional services per person:</h5>

      <div className="d-flex items-center justify-between">
        <div className="d-flex items-center">
          <div className="form-radio">
            <input
              type="radio"
              name="roomType"
              className="radio-label"
              value="4Bettzimmer"
              checked={roomType === "4Bettzimmer"}
              onChange={(e) => setRoomType(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
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
          <div className="form-radio">
            <input
              type="radio"
              name="roomType"
              value="3Bettzimmer"
              className="radio-label"
              checked={roomType === "3Bettzimmer"}
              onChange={(e) => setRoomType(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
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
          <div className="form-radio">
            <input
              type="radio"
              name="roomType"
              value="2Bettzimmer"
              className="radio-label"
              checked={roomType === "2Bettzimmer"}
              onChange={(e) => setRoomType(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
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
          <div className="form-radio">
            <input
              type="radio"
              name="roomType"
              value="1Bettzimmer"
              className="radio-label"
              checked={roomType === "1Bettzimmer"}
              onChange={(e) => setRoomType(e.target.value)}
            />
            <div className="form-radio__mark">
              <div className="form-radio__icon">
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
          <span className="text-center">Tax included</span>
        </div>
      </div>

      <button className="button -md -info-2 col-12 bg-accent-1 text-white mt-20">
        Book Now
        <i className="icon-arrow-top-right ml-10"></i>
      </button>
    </div>
  );
}
