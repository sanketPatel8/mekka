"use client";

import React, { useEffect, useState } from "react";
import { State } from "@/data/tourSingleContent";
import "@/public/css/index.css";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { showErrorToast } from "@/app/utils/tost";
import { post } from "@/app/utils/api";

export default function TourSingleSidebar({ PAckageData }) {
  const {
    prices,
    HotelSelect,
    setHotelSelect,
    selectedFlights,
    setSelectedFlights,
    total,
    setTotal,
    selectDeparture,
    setselectDeparture,
    selectedCheckbox,
    setselectedCheckbox,
    ExcludeFlight,
    setExcludeFlight,
  } = useGlobalState();

  const searchParams = useSearchParams();
  const Tourid = searchParams.get("id");

  const [extraService, setExtraService] = useState("");
  const [isServicePerPerson, setIsServicePerPerson] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);
  const [SidebarData, setSidebarData] = useState({});
  const [FlightName, setFlightName] = useState([]);
  const [Departure, setDeparture] = useState("");

  const [adultNumber, setAdultNumber] = useState(1);
  const [youthNumber, setYouthNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);

  const handleRadioChange = (e) => {
    const { value, name } = e.target;
    const selectedHotel = JSON.parse(value);

    if (name === "mekka") {
      // Update the HotelSelect state with the selected Mekka hotel details
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        mekka: value,
        mekkaPrice:
          SidebarData?.tour_hotels?.mekka_hotels.find(
            (hotel) => hotel.id === selectedHotel.hotel_id
          )?.hotel_price || 0,
        mekkaId: selectedHotel.hotel_id,
      }));
    } else if (name === "madina") {
      // Update the HotelSelect state with the selected Madina hotel details
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        madina: value,
        madinaPrice:
          SidebarData?.tour_hotels?.medina_hotels.find(
            (hotel) => hotel.id === selectedHotel.hotel_id
          )?.hotel_price || 0,
        madinaId: selectedHotel.hotel_id,
      }));
    }
  };

  const handleHotelChange = (e, elm) => {
    const selectedFlight = {
      id: elm.id,
      name: elm.airline_name,
    };

    // Since it's a radio button, store the selected flight as an object (not an array)
    setSelectedFlights(selectedFlight); // Replace with the selected flight object
  };

  const handleExcludeFlight = () => {
    if (selectedCheckbox === false) {
      setExcludeFlight(1);
      setselectedCheckbox(true);
    } else {
      setExcludeFlight(0);
      setselectedCheckbox(false);
    }
  };

  useEffect(() => {
    // Ensure SidebarData and tour_price are defined and have at least 3 elements
    if (
      SidebarData &&
      Array.isArray(SidebarData.tour_price) &&
      SidebarData.tour_price.length >= 3
    ) {
      const calculatedTotal =
        (Number(SidebarData.tour_price[0]?.price) || 0) * Number(adultNumber) +
        (Number(SidebarData.tour_price[1]?.price) || 0) * Number(youthNumber) +
        (Number(SidebarData.tour_price[2]?.price) || 0) *
          Number(childrenNumber) +
        (Number(HotelSelect.mekkaPrice) || 0) +
        (Number(HotelSelect.madinaPrice) || 0) +
        (Number(extraCharge) || 0);

      if (!isNaN(calculatedTotal)) {
        setTotal(calculatedTotal.toFixed(2));
      } else {
        console.warn("Calculated total is not a number");
        setTotal("0.00");
      }
    } else {
      // Handle cases where SidebarData or tour_price is not defined as expected
      console.warn("SidebarData or tour_price is not defined correctly.");
      setTotal("0.00"); // Set a default total if the data is not available
    }
  }, [
    SidebarData,
    adultNumber,
    youthNumber,
    childrenNumber,
    extraCharge,
    HotelSelect.mekkaPrice,
    HotelSelect.madinaPrice,
    setTotal,
  ]);

  useEffect(() => {
    setExtraCharge(0);
    if (extraService) {
      setExtraCharge((pre) => pre + prices.extraService);
    }
    if (isServicePerPerson) {
      setExtraCharge((pre) => pre + prices.servicePerPerson);
    }
  }, [extraService, isServicePerPerson, setExtraCharge]);

  const [activeTimeDD, setActiveTimeDD] = useState(false);

  const { translate } = useTranslation();

  useEffect(() => {
    setSidebarData(PAckageData?.Tour_Details);
  }, [PAckageData]);

  // for flight name

  const fetchData = async (id) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await post("tour_data", sendData);
      if (response) {
        setFlightName(response.Data);
        setDeparture(response.Data);
      } else {
        console.error("Tours data is undefined in the response.");
      }
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

  useEffect(() => {
    fetchData();
  }, []);

  // local storage

  const [priceObject, setPriceObject] = useState([]);

  const updatePriceObject = () => {
    // const newPriceObject = {};

    // SidebarData?.tour_price?.forEach((group) => {
    //   let count;
    //   let label;

    //   if (group.price_type === "1") {
    //     count = adultNumber;
    //     label = "Adult";
    //   } else if (group.price_type === "2") {
    //     count = youthNumber;
    //     label = "Youth";
    //   } else if (group.price_type === "3") {
    //     count = childrenNumber;
    //     label = "Children";
    //   }

    //   if (count !== undefined) {
    //     const totalPrice = group.price * count;
    //     newPriceObject[label] = {
    //       count,
    //       totalPrice: totalPrice.toFixed(2),
    //     };
    //   }
    // });

    // setPriceObject(newPriceObject);

    const newPriceArray = [];

    // Separate counters for each label (Adult, Youth, Children)
    let adultCounter = 0;
    let youthCounter = 0;
    let childrenCounter = 0;

    // Loop through the tour_price array
    SidebarData?.tour_price?.forEach((group) => {
      let count;
      let label;
      let individualCount;

      // Determine the count and label based on price_type
      if (group.price_type === "1") {
        count = adultNumber;
        label = "Adult";
      } else if (group.price_type === "2") {
        count = youthNumber;
        label = "Child";
      } else if (group.price_type === "3") {
        count = childrenNumber;
        label = "Baby";
      }

      if (label === "Adult") {
        individualCount = ++adultCounter;
      } else if (label === "Child") {
        individualCount = ++youthCounter;
      } else if (label === "Baby") {
        individualCount = ++childrenCounter;
      }

      // If count is defined, process the group
      if (count !== undefined) {
        // For each person (adult/youth/children), add an entry to the array
       
        for (let i = 0; i < count; i++) {
          newPriceArray.push({
            label, // 'Adult', 'Youth', 'Children'
            individualCount,
            price: group.price,
            count: count,
            grandTotal: group.price * count,
            index : i,
            default : group.price
          });
        }
      }

      // Assuming newPriceArray contains the list of individual entries
      // const adultCount = newPriceArray.filter(
      //   (item) => item.label === "Adult"
      // ).length;
      // const youthCount = newPriceArray.filter(
      //   (item) => item.label === "Youth"
      // ).length;
      // const childrenCount = newPriceArray.filter(
      //   (item) => item.label === "Children"
      // ).length;

      // console.log(`Number of Adults: ${adultCount}`);
      // console.log(`Number of Youth: ${youthCount}`);
      // console.log(`Number of Children: ${childrenCount}`);
    });

    // Now we can calculate total prices per category (e.g., all adults)
    const totalPrices = {
      Adult: 0,
      Youth: 0,
      Children: 0,
    };

    // Calculate the total price for each category
    newPriceArray.forEach((entry) => {
      totalPrices[entry.label] += parseFloat(entry.price);
    });

    // Output: array of individuals and the total price for each category
    // console.log("newPriceArray :", newPriceArray); // Array of individuals with price
    // console.log("totalPrices :", totalPrices);
    
    setPriceObject(newPriceArray)// Total price for Adults, Youth, and Children
  };

  useEffect(() => {
    updatePriceObject();
  }, [SidebarData, adultNumber, youthNumber, childrenNumber]);

  useEffect(() => {
    // Ensure localStorage operations are only performed on the client side
    if (typeof window !== "undefined") {
      localStorage.setItem("AdultPrice&count", JSON.stringify(priceObject));
    }
  }, [priceObject]);

  return (
    <div className="tourSingleSidebar">
      <h5 className="text-18 fw-500 mb-20 mt-20">{translate("Tickets")}</h5>

      {SidebarData?.tour_price?.map((group, index) => {
        let count, setCount, typeLabel;

        // Determine the appropriate state and label based on price_type
        if (group.price_type === "1") {
          count = adultNumber;
          setCount = setAdultNumber;
          typeLabel = "Adult";
        } else if (group.price_type === "2") {
          count = youthNumber;
          setCount = setYouthNumber;
          typeLabel = "child";
        } else if (group.price_type === "3") {
          count = childrenNumber;
          setCount = setChildrenNumber;
          typeLabel = "baby";
        } else {
          return null;
        }

        return (
          <div key={index} className="mt-15">
            <div className="d-flex items-center justify-between">
              <div className="text-14 col-8">
                {group.price_type === "1"
                  ? "Adult (18+ Years) "
                  : group.price_type === "2"
                  ? "Child (13-17 Years) "
                  : "Baby (0-12 Years) "}
                <span className="fw-500">
                  {(group.price * count).toFixed(2)} €
                </span>
              </div>

              <div className="d-flex items-center js-counter col-3">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  className="button size-30 border-1 rounded-full js-down col-2"
                >
                  <i className="icon-minus text-10 col-3"></i>
                </button>

                <div className="flex-center ml-10 mr-10 col-2">
                  <div className="text-14 size-20 js-count">{count}</div>
                </div>

                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="button size-30 border-1 rounded-full js-up"
                >
                  <i className="icon-plus text-10"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <hr />

      {/* <div>
        <h5 className="text-18 fw-500 mb-20 mt-20">
          {translate("Hotel For Makka")}
        </h5>
        {SidebarData?.tour_hotels?.mekka_hotels?.map((elm, ind) => (
          <div key={ind}>
            <div className="d-flex items-center justify-between my-1">
              <div className="d-flex items-center">
                <div className="form-radio d-flex items-center">
                  <label className="radio d-flex items-center">
                    <input
                      type="radio"
                      name="mekka"
                      value={`Mekka - ${elm.hotel_name}star`}
                      checked={
                        HotelSelect.mekka === `Mekka - ${elm.hotel_name}star`
                      }
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
              <div className="text-14">{elm.hotel_price} €</div>
            </div>
          </div>
        ))}

        <hr />

        <h5 className="text-18 fw-500 mb-20 mt-20">
          {translate("Hotel For Madina")}
        </h5>

        {SidebarData?.tour_hotels?.medina_hotels?.map((elm) => (
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
                      name="madina"
                      value={`Madina - ${elm.hotel_name}star`}
                      checked={
                        HotelSelect.madina === `Madina - ${elm.hotel_name}star`
                      }
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
              <div className="text-14">{elm.hotel_price} €</div>
            </div>
          </div>
        ))}

      </div>

      <hr /> */}

      <div>
        <h5 className="text-18 fw-500 mb-20 mt-20">
          {translate("Hotel For Mekka")}
        </h5>
        {SidebarData?.tour_hotels?.mekka_hotels?.map((elm, ind) => (
          <div key={ind}>
            <div className="d-flex items-center justify-between my-1">
              <div className="d-flex items-center">
                <div className="form-radio d-flex items-center">
                  <label className="radio d-flex items-center">
                    <input
                      type="radio"
                      name="mekka"
                      value={JSON.stringify({
                        hotel_name: elm.hotel_name,
                        hotel_id: elm.id,
                      })}
                      checked={
                        HotelSelect.mekka &&
                        JSON.parse(HotelSelect.mekka).hotel_name ===
                          elm.hotel_name
                      }
                      onChange={handleRadioChange}
                    />
                    <span className="radio__mark">
                      <span className="radio__icon"></span>
                    </span>
                    <span className="text-14 lh-1 ml-10">
                      {elm.hotel_name != null ? elm.hotel_name : "not found"} (
                      {elm.hotel_stars} star)
                    </span>
                  </label>
                </div>
              </div>
              <div className="text-14">{elm.hotel_price} €</div>
            </div>
          </div>
        ))}

        <hr />

        <h5 className="text-18 fw-500 mb-20 mt-20">
          {translate("Hotel For Madina")}
        </h5>

        {SidebarData?.tour_hotels?.medina_hotels?.map((elm) => (
          <div key={elm.id}>
            <div className="d-flex items-center justify-between my-1">
              <div className="d-flex items-center">
                <div className="form-radio d-flex items-center">
                  <label className="radio d-flex items-center">
                    <input
                      type="radio"
                      name="madina"
                      value={JSON.stringify({
                        hotel_name: elm.hotel_name,
                        hotel_id: elm.id,
                      })}
                      checked={
                        HotelSelect.madina &&
                        JSON.parse(HotelSelect.madina).hotel_name ===
                          elm.hotel_name
                      }
                      onChange={handleRadioChange}
                    />
                    <span className="radio__mark">
                      <span className="radio__icon"></span>
                    </span>
                    <span className="text-14 lh-1 ml-10">
                      {elm.hotel_name != null ? elm.hotel_name : "not found"} (
                      {elm.hotel_stars} star)
                    </span>
                  </label>
                </div>
              </div>
              <div className="text-14">{elm.hotel_price} €</div>
            </div>
          </div>
        ))}
      </div>

      <h5 className="text-18 fw-500 mb-20 mt-20">
        {translate("Flight Booking")}
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
                  {translate(" Flight Booking")}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-14">40 €</div> */}
      </div>

      <hr />

      <div className={` ${selectedCheckbox ? "d-none" : "d-block"}`}>
        <div>
          {FlightName?.airline?.map((elm, i) => (
            <div className="d-flex items-center justify-between my-1" key={i}>
              <div className="d-flex items-center">
                <div className="form-radio d-flex items-center">
                  <label className="radio d-flex items-center">
                    <input
                      type="radio"
                      name={`${elm.id} ( No Stop )`}
                      value={elm.id}
                      checked={selectedFlights?.id === elm.id} // Check if the flight is selected
                      onChange={(e) => handleHotelChange(e, elm)} // Pass elm to the function
                    />
                    <span className="radio__mark">
                      <span className="radio__icon"></span>
                    </span>
                    <span className="text-14 lh-1 ml-10">
                      {elm.airline_name != null
                        ? elm.airline_name
                        : "not found"}{" "}
                      ( No Stop )
                    </span>
                  </label>
                </div>
              </div>

              <div className="text-14">{elm?.price} €</div>
            </div>
          ))}
        </div>

        <hr />

        <div className="searchForm -type-1 -sidebar mt-20">
          <div className="searchForm__form">
            <div className="searchFormItem js-select-control js-form-dd">
              {/* Dropdown Button */}
              <div
                className="searchFormItem__button"
                onClick={() => setActiveTimeDD((pre) => !pre)} // Toggle dropdown
                data-x-click="time"
              >
                <div className="searchFormItem__content">
                  <h5>Departure</h5>
                  <div className="js-select-control-chosen">
                    {selectDeparture?.name
                      ? selectDeparture?.name
                      : "Choose City"}
                  </div>
                </div>
                <div className="searchFormItem__icon_chevron">
                  <i className="icon-chevron-down d-flex text-18"></i>
                </div>
              </div>

              {/* Dropdown List */}
              <div
                className={`searchFormItemDropdown -tour-type ${
                  activeTimeDD ? "is-active" : ""
                }`}
                data-x="time"
                data-x-toggle="is-active"
              >
                <div className="searchFormItemDropdown__container">
                  <div className="searchFormItemDropdown__list sroll-bar-1">
                    {Departure?.departure?.map((elm, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          // Handle selection of departure
                          setselectDeparture((pre) =>
                            pre?.name === elm.departure
                              ? {}
                              : { name: elm.departure, value: elm.id }
                          );
                          setActiveTimeDD(false); // Close dropdown after selection
                        }}
                        className="searchFormItemDropdown__item"
                      >
                        <button className="js-select-control-button">
                          <span className="js-select-control-choice">
                            {elm.departure}
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
            {/* {(
              SidebarData?.tour_price[0].price * adultNumber +
              SidebarData?.tour_price[1].price * youthNumber +
              SidebarData?.tour_price[2].price * childrenNumber +
              extraCharge * 1
            ).toFixed(2)}{" "} */}
            {total} €
          </div>
        </div>
      </div>

      <p className="text-right">Including Taxes And Fees</p>

      <Link
        href={`/booking/?id=${Tourid}&name=${PAckageData?.Tour_Details?.tour_details?.name}&type=${PAckageData?.Tour_Details?.tour_details?.type}&selectedflight=${selectedFlights.name}`}
      >
        <button className="button -md -info-2 col-12 bg-accent-1 text-white mt-20">
          {translate("Book Now")}
        </button>
      </Link>
    </div>
  );
}
