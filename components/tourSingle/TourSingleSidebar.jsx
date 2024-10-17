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
import { POST } from "@/app/utils/api/post";
import { useCurrency } from "@/app/context/currencyContext";
import { ToastContainer } from "react-toastify";

export default function TourSingleSidebar({
  PAckageData,
  ThumbnailImage,
  setHotelData,
  isLoading,
  setisLoading
}) {
  const {
    prices,
    HotelSelect,
    setHotelSelect,
    selectedFlights,
    setSelectedFlights,
    total,
    setTotal,
    selectedCheckbox,
    setselectedCheckbox,
    setExcludeFlight,
  } = useGlobalState();

  const searchParams = useSearchParams();
  const Tourid = searchParams.get("id");
  const [extraService, setExtraService] = useState("");
  const [isServicePerPerson, setIsServicePerPerson] = useState(false);
  const [extraCharge, setExtraCharge] = useState(0);
  const [SidebarData, setSidebarData] = useState({});

  const [adultNumber, setAdultNumber] = useState(1);
  const [youthNumber, setYouthNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);

  const [selectedmekkaHotelPrice, setselectedmekkaHotelPrice] = useState(0);
  const [selectedMadinaHotelPrice, setselectedMadinaHotelPrice] = useState(0);
  const [SelectedAirlinePrice, setSelectedAirlinePrice] = useState(0);
  const [SElectedDeparturePrice, setSElectedDeparturePrice] = useState(0);
  const [Render, setRender] = useState(false);
  const [mekkaId, setmekkaId] = useState("");
  const [madinaId, setmadinaId] = useState("");
  const { formatPrice } = useCurrency();
  const [selectDeparture, setselectDeparture] = useState({
    name: "",
  });

  const [LocalData, setLocalData] = useState([]);

  useEffect(() => {
    if (SidebarData?.tour_hotels?.mekka_hotels?.length > 0) {
      const firstMekkaHotel = SidebarData.tour_hotels.mekka_hotels[0];
      setmekkaId(firstMekkaHotel.id);
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        mekka: JSON.stringify({
          hotel_name: firstMekkaHotel.hotel_name,
          hotel_id: firstMekkaHotel.id,
        }),
        mekkaPrice: firstMekkaHotel.hotel_price,
        mekkaId: firstMekkaHotel.id,
      }));
      setselectedmekkaHotelPrice(firstMekkaHotel.hotel_price);
    }
    if (SidebarData?.tour_hotels?.medina_hotels?.length > 0) {
      const firstMadinaHotel = SidebarData.tour_hotels.medina_hotels[0];
      setmadinaId(firstMadinaHotel.id);
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        madina: JSON.stringify({
          hotel_name: firstMadinaHotel.hotel_name,
          hotel_id: firstMadinaHotel.id,
        }),
        madinaPrice: firstMadinaHotel.hotel_price,
        madinaId: firstMadinaHotel.id,
      }));
      setselectedMadinaHotelPrice(firstMadinaHotel.hotel_price);
    }

    if (SidebarData?.tour_details?.airlines?.length > 0) {
      const firstFlight = SidebarData.tour_details.airlines[0];
      setSelectedFlights({
        id: firstFlight.id,
        name: firstFlight.airline_name,
        price: firstFlight.flight_amount,
        luggage: firstFlight.luggage,
      });
      setSelectedAirlinePrice(firstFlight.flight_amount);
    }
  }, [SidebarData]);

  useEffect(() => {
    fetchHotelData();
  }, [mekkaId, madinaId]);

  const fetchHotelData = async () => {
    setisLoading(true)
    const formData = new FormData();
    formData.append("tour_id", Tourid);
    formData.append("mekka_id", mekkaId);
    formData.append("madina_id", madinaId);

    const response = await POST.request({
      form: formData,
      url: "gettourhoteldata ",
    });

    if (response) {
      setisLoading(false)
      console.log("response.hotel_data" , response.hotel_data);
      
      setHotelData(response.hotel_data);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const PrevPrice = localStorage.getItem("previousAdults");
      setLocalData(JSON.parse(PrevPrice));
    }
  }, []);

  useEffect(() => {
    if (Render === true) {
      setRender(true);
    }
  }, [Render]);

  const handleRadioChange = (e) => {
    const { value, name } = e.target;

    // Parse the selected hotel details
    let selectedHotel;
    try {
      selectedHotel = JSON.parse(value); // Ensure it's valid JSON
    } catch (error) {
      return; // Exit if value isn't valid JSON
    }

    if (name === "mekka") {
      // Find the price of the selected Mekka hotel
      const mekkaPrice =
        SidebarData?.tour_hotels?.mekka_hotels.find(
          (hotel) => hotel.id === selectedHotel.hotel_id
        )?.hotel_price || 0;

      // Update the HotelSelect state with the selected Mekka hotel details
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        mekka: value,
        mekkaPrice,
        mekkaId: selectedHotel.hotel_id,
      }));
      setmekkaId(selectedHotel.hotel_id);

      // Update Mekka hotel price in selectedmekkaHotelPrice state
      setselectedmekkaHotelPrice(mekkaPrice);

      fetchHotelData();
    } else if (name === "madina") {
      // Find the price of the selected Madina hotel
      const madinaPrice =
        SidebarData?.tour_hotels?.medina_hotels.find(
          (hotel) => hotel.id === selectedHotel.hotel_id
        )?.hotel_price || 0;

      // Update the HotelSelect state with the selected Madina hotel details
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        madina: value,
        madinaPrice,
        madinaId: selectedHotel.hotel_id,
      }));
      setmadinaId(selectedHotel.hotel_id);

      setselectedMadinaHotelPrice(madinaPrice);
      fetchHotelData();
    }
  };

  const handleHotelChange = (e, elm) => {
    const selectedFlight = {
      id: elm.id,
      name: elm.airline_name,
      price: elm.flight_amount,
      luggage: elm.luggage,
    };

    setSelectedFlights(selectedFlight); // Replace with the selected flight object
    setSelectedAirlinePrice(selectedFlight.price);
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
        (Number(extraCharge) || 0);

      if (!isNaN(calculatedTotal)) {
        setTotal(calculatedTotal.toFixed(2));
      } else {
        console.warn("Calculated total is not a number");
        setTotal("0.00");
      }
    } else {
      console.warn("SidebarData or tour_price is not defined correctly.");
      setTotal("0.00"); 
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

  // local storage

  const [priceObject, setPriceObject] = useState([]);
  const [PrevAdultSelect, setPrevAdultSelect] = useState([]);

  const updatePriceObject = () => {
    const newPriceArray = [];

    let adultCounter = 0;
    let youthCounter = 0;
    let childrenCounter = 0;

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
            count: i,
            grandTotal: group.price * count,
            index: i,
            default: group.price,
          });
        }
      }
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

    setPriceObject(newPriceArray);
  };

  const updateAdultsObject = () => {
    const newPriceArray = [];
    const newPriceAdultArray = [];

    let adultCounter = 0;
    let youthCounter = 0;
    let childrenCounter = 0;

    let adultTotal = 0;
    let youthTotal = 0;
    let childrenTotal = 0;

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
            price: JSON.parse(group.price),
            count: i,
            grandTotal: JSON.parse(group.price) * count,
            index: i,
            default: JSON.parse(group.price),
          });

          // Calculate total for each group (adult, child, baby)
          if (label === "Adult") {
            adultTotal += JSON.parse(group.price);
          } else if (label === "Child") {
            youthTotal += JSON.parse(group.price);
          } else if (label === "Baby") {
            childrenTotal += JSON.parse(group.price);
          }
        }
      }
    });

    // Push grand total and count of adults, youth, and children into newPriceAdultArray
    newPriceAdultArray.push({
      label: "Adult",
      count: adultNumber,
      grandTotal: adultTotal,
    });

    newPriceAdultArray.push({
      label: "Child",
      count: youthNumber,
      grandTotal: youthTotal,
    });

    newPriceAdultArray.push({
      label: "Baby",
      count: childrenNumber,
      grandTotal: childrenTotal,
    });

    // Now we can calculate total prices per category (e.g., all adults)
    const totalPrices = {
      Adult: adultTotal,
      Youth: youthTotal,
      Children: childrenTotal,
    };

    setPriceObject(newPriceArray);
    setPrevAdultSelect(newPriceAdultArray); // assuming you are setting this somewhere
  };

  useEffect(() => {
    updatePriceObject();
  }, [SidebarData, adultNumber, youthNumber, childrenNumber]);

  // Extract prices and labels into an object

  const priceObjectwithlab = SidebarData?.tour_price?.map(item => ({
    type: item.price_type,  // Storing price_type as type
    price: item.price       // Storing price
  }));
  

  

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("AdultPrice&count", JSON.stringify(priceObject));
      localStorage.setItem("previousAdults", JSON.stringify(PrevAdultSelect));
      localStorage.setItem("priceObjectwithlab", JSON.stringify(priceObjectwithlab));
    }
  }, [priceObject]);

  // handle booking

  const router = useRouter();

  const SelectedAllPrice =
    JSON.parse(total) +
    JSON.parse(selectedmekkaHotelPrice) +
    JSON.parse(selectedMadinaHotelPrice) +
    JSON.parse(
      SidebarData?.tour_details?.flight_included !== "0" &&
        selectedCheckbox == false
        ? SelectedAirlinePrice
        : 0
    ) +
    JSON.parse(
      SidebarData?.tour_details?.flight_included !== "0" &&
        selectedCheckbox == false
        ? selectDeparture.price === undefined
          ? 0
          : selectDeparture.price
        : 0
    );

 

  const FlightAndHotelPrice =
    JSON.parse(selectedmekkaHotelPrice) +
    JSON.parse(selectedMadinaHotelPrice) +
    JSON.parse(
      SidebarData?.tour_details?.flight_included !== "0" &&
        selectedCheckbox == false
        ? SelectedAirlinePrice
        : 0
    ) +
    JSON.parse(
      SidebarData?.tour_details?.flight_included !== "0" &&
        selectedCheckbox == false
        ? selectDeparture.price === undefined
          ? 0
          : selectDeparture.price
        : 0
    );

  const mekkaHotel = JSON.parse(HotelSelect.mekka);
  const madinaHotel = JSON.parse(HotelSelect.madina);

  const PackageBookingData = {
    name: SidebarData?.tour_details?.name,
    type: SidebarData?.tour_details?.type,
    TourThumbnail: SidebarData?.tour_details?.tour_image[0],
    Airline: selectedFlights,
    To: SidebarData?.tour_details?.travel,
    Departure: selectDeparture,
    Return: SidebarData?.tour_details?.date_end,
    OfferedLanguages: SidebarData?.en_language,
    MaxLuggagePerPerson: 0,
    MakkaHotel: mekkaHotel,
    MadinaHotel: madinaHotel,
    FlightAndHotel: FlightAndHotelPrice,
    duration: SidebarData?.tour_details?.travel_duration,
    startDate: SidebarData?.tour_details?.date_begin,
    endDate: SidebarData?.tour_details?.date_end,
    selectedCheckbox: selectedCheckbox,
  };

  const handleBooking = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "SelectedPackageHotelNDFlight",
        JSON.stringify(FlightAndHotelPrice)
      );

      localStorage.setItem(
        "PackageBookingData",
        JSON.stringify(PackageBookingData)
      );

      localStorage.setItem(
        "company_code",
        SidebarData?.tour_details?.company_code
      );
    }

    setRender(true);
    updateAdultsObject();

    if (
      selectDeparture.name === "" &&
      selectedCheckbox === false &&
      SidebarData?.tour_details?.flight_included !== "0"
    ) {
      showErrorToast("Please Select Departure");
      return;
    } else {
      router.push(
        `/booking/?id=${Tourid}&name=${SidebarData?.tour_details?.name}&type=${
          SidebarData?.tour_details?.type
        }&selectedflight=${
          selectedFlights?.name === undefined ? "" : selectedFlights?.name
        }`
      );
      localStorage.setItem("Redirect_Login",`/booking?id=${Tourid}&name=${SidebarData?.tour_details?.name}&type=${
          SidebarData?.tour_details?.type
        }&selectedflight=${
          selectedFlights?.name === undefined ? "" : selectedFlights?.name
        }`);
        localStorage.removeItem("AllAdultsData")
        localStorage.removeItem("BookingData")
    }
  };

  const handleIncrement = (price_type) => {
    if (price_type === "1") {
      setAdultNumber((prev) => prev + 1);
    } else if (price_type === "2") {
      setYouthNumber((prev) => prev + 1);
    } else if (price_type === "3") {
      setChildrenNumber((prev) => prev + 1);
    }
  };

  const handleDecrement = (price_type) => {
    if (price_type === "1") {
      setAdultNumber((prev) => Math.max(prev - 1, 1));
    } else if (price_type === "2") {
      setYouthNumber((prev) => Math.max(prev - 1, 0));
    } else if (price_type === "3") {
      setChildrenNumber((prev) => Math.max(prev - 1, 0));
    }
  };

  const totalSelected = adultNumber + youthNumber + childrenNumber;


  return (
    <>
      <div className="tourSingleSidebar">
        <h5 className="text-18 fw-500 mb-20 mt-20">{translate("Tickets")}</h5>

        {totalSelected > SidebarData?.tour_details?.capacity_empty && (
          <div className="error-message text-red-500">
            {translate("Selected passengers exceed available seats")}
          </div>
        )}

        {SidebarData?.tour_price?.map((group, index) => {
          let count, typeLabel;

          if (group.price_type === "1") {
            count = adultNumber;
            typeLabel = "Adult";
          } else if (group.price_type === "2") {
            count = youthNumber;
            typeLabel = "Child";
          } else if (group.price_type === "3") {
            count = childrenNumber;
            typeLabel = "Baby";
          } else {
            return null;
          }

          return (
            <div key={index} className="mt-15">
              <div className="d-flex items-center justify-between">
                <div className="text-14 col-8">
                  {group.price_type === "1"
                    ? `${translate("Adult")} 18+ ${translate("Years")}`
                    : group.price_type === "2"
                    ? `${translate("Child")} 13-17 ${translate("Years")}`
                    : `${translate("Baby")} 0-12 ${translate("Years")}` }
                  <span className="fw-500">
                    {""} {formatPrice((group.price * count).toFixed(2))}
                  </span>
                </div>

                <div className="d-flex items-center js-counter col-3">
                  <button
                    onClick={() => handleDecrement(group.price_type)}
                    className="button size-30 border-1 rounded-full js-down col-2"
                  >
                    <i className="icon-minus text-10 col-3"></i>
                  </button>

                  <div className="flex-center ml-10 mr-10 col-2">
                    <div className="text-14 size-20 js-count">{count}</div>
                  </div>

                  <button
                    onClick={() => handleIncrement(group.price_type)}
                    className="button size-30 border-1 rounded-full js-up"
                    disabled={
                      totalSelected >= SidebarData?.tour_details?.capacity_empty
                    } // Disable if limit exceeded
                  >
                    <i className="icon-plus text-10"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* {SidebarData?.tour_price?.map((group, index) => {
          let count, typeLabel;

          if (group.price_type === "1") {
            count = adultNumber;
            typeLabel = "Adult";
          } else if (group.price_type === "2") {
            count = youthNumber;
            typeLabel = "Child";
          } else if (group.price_type === "3") {
            count = childrenNumber;
            typeLabel = "Baby";
          } else {
            return null;
          }

          return (
            <div key={index} className="mt-15">
              <div className="d-flex items-center justify-between">
                <div className="text-14 col-8">
                  {group.price_type === "1"
                    ? "Adult (18+ Years)"
                    : group.price_type === "2"
                    ? "Child (13-17 Years)"
                    : "Baby (0-12 Years)"}
                  <span className="fw-500">
                    {""} {formatPrice((group.price * count).toFixed(2))}
                  </span>
                </div>

                <div className="d-flex items-center js-counter col-3">
                  <button
                    onClick={() => handleDecrement(group.price_type)}
                    className="button size-30 border-1 rounded-full js-down col-2"
                  >
                    <i className="icon-minus text-10 col-3"></i>
                  </button>

                  <div className="flex-center ml-10 mr-10 col-2">
                    <div className="text-14 size-20 js-count">{count}</div>
                  </div>

                  <button
                    onClick={() => handleIncrement(group.price_type)}
                    className="button size-30 border-1 rounded-full js-up"
                  >
                    <i className="icon-plus text-10"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })} */}

        <hr />

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
                        required
                      />
                      <span className="radio__mark">
                        <span className="radio__icon"></span>
                      </span>
                      <span className="text-14 lh-1 ml-10">
                        {elm.hotel_name != null ? elm.hotel_name : "not found"}{" "}
                        ({elm.hotel_stars} star)
                      </span>
                    </label>
                  </div>
                </div>
                <div className="text-14">{formatPrice(elm.hotel_price)}</div>
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
                        {elm.hotel_name != null ? elm.hotel_name : "not found"}{" "}
                        ({elm.hotel_stars} star)
                      </span>
                    </label>
                  </div>
                </div>
                <div className="text-14">{formatPrice(elm.hotel_price)}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${
            SidebarData?.tour_details?.flight_included == "0"
              ? "d-none"
              : "d-block"
          }`}
        >
          <div
            className={`${
              SidebarData?.tour_details?.flight_exclude == "0"
                ? "d-none"
                : "d-block"
            }`}
          >
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
                        <label
                          htmlFor="item4"
                          className="form-checkbox__mark ml-0"
                        >
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
            </div>
            <hr />
          </div>

          <div className={` ${selectedCheckbox ? "d-none" : "d-block"}`}>
            <div>
              <h5 className="text-18 fw-500 mb-20 mt-20">
                {translate("Select Flight")}
              </h5>
              {SidebarData?.tour_details?.airlines?.map((elm, i) => (
                <div
                  className="d-flex items-center justify-between my-1"
                  key={i}
                >
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
                          ( {elm.no_of_stop} Stop )
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="text-14">
                    {formatPrice(elm?.flight_amount)}
                  </div>
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
                    onClick={() => setActiveTimeDD((pre) => !pre)}
                    data-x-click="time"
                  >
                    <div className="searchFormItem__content">
                      <h5>{translate('Departure')}</h5>
                      <div className={`js-select-control-chosen `}>
                        {selectDeparture?.name
                          ? selectDeparture?.name
                          : translate('Departure') }
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
                        {SidebarData?.tour_details?.departures?.map(
                          (elm, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                // Handle selection of departure
                                setselectDeparture((pre) =>
                                  pre?.name === elm.departure
                                    ? {}
                                    : {
                                        name: elm.departure,
                                        value: elm.id,
                                        price: elm.price,
                                      }
                                );
                                setActiveTimeDD(false); // Close dropdown after selection
                              }}
                              className="searchFormItemDropdown__item"
                            >
                              <button className="js-select-control-button">
                                <span className="js-select-control-choice">
                                  {elm.departure == "" &&
                                  elm.departure == undefined
                                    ? "No Departure"
                                    : elm.departure}
                                </span>
                                <span>{formatPrice(elm.price)}</span>
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex items-center justify-between pt-1">
          <div className="text-18 fw-500">{translate('Total')}:</div>
          <div>
            <div className="text-18 fw-500">
              {formatPrice(SelectedAllPrice)}
            </div>
          </div>
        </div>

        {SidebarData?.tour_details?.capacity_empty > 0 ? (
          <button
            className="button -md -info-2 col-12 bg-accent-1 text-white mt-20"
            type="submit"
            onClick={handleBooking}
          >
            {translate("Book Now")}
          </button>
        ) : (
          <button
            className="button -md -info-2 col-12 bg-accent-1 text-white mt-20"
            type="button"
            disabled
          >
            {translate("No Seat Available")}
          </button>
        )}
      </div>
    </>
  );
}
