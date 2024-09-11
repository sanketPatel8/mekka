"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaLuggageCart } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import "@/public/css/index.css";
import Modal from "react-modal";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { BabyData, ReservationData } from "@/data/CustomerBookingData";
import { usePeople } from "@/app/context/PeopleContext";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "40%",
    right: "auto",
    bottom: "auto",
    marginLeft: "10%",
    transform: "translate(-50%, -50%)",
    padding: "5px",
    // borderRadius: '10px',
    width: "100%", // Adjust width as needed
    maxWidth: "700px", // Adjust max-width as needed
    height: "90vh", // Set a specific height for the modal
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

export default function BookingPages({ BookingData }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const TourType = searchParams.get("type");
  const TourName = searchParams.get("name");
  const TourId = searchParams.get("id");

  const [bookingStage, setBookingStage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [LoginISChacked, setLoginISChacked] = useState(false);
  const [BookingLoginData, setBookingLoginData] = useState({
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    email: "",
    password: "",
  });
  const [UserID, setUserID] = useState({});
  const {
    loginPer,
    selectedFlights,
    HotelSelect,
    total,
    selectDeparture,
    SharePackageData,
    selectedCheckbox,
    ExcludeFlight,
  } = useGlobalState();

  const [adultData, setAdultData] = useState([]);
  const [Childrendata, setChildrendata] = useState([]);
  const [babyData, setbabyData] = useState([]);
  const [AlladultsData, setAlladultsData] = useState([]);
  const [ToursPrice, setToursPrice] = useState([]);
  const [AdditionalServices, setAdditionalServices] = useState([]);
  const [selectedFlight, setselectedFlight] = useState([]);

  useEffect(() => {
    setAdditionalServices(BookingData?.Tour_Details?.addtional_price);
    setToursPrice(BookingData?.Tour_Details?.tour_price);
    setselectedFlight();
  }, [BookingData]);

  useEffect(() => {
    // Set modal's app element
    Modal.setAppElement("#openSignIn");

    // Only execute in browser environment
    if (typeof window !== "undefined") {
      // Retrieve and parse the priceObject data from localStorage
      const savedData = localStorage.getItem("AdultPrice&count");
      // console.log("savedData :", savedData);

      const userData = localStorage.getItem("user");

      // Check if savedData exists and is valid JSON
      if (savedData && savedData !== "undefined") {
        try {
          const parsedData = JSON.parse(savedData);

          // console.log("parsedData :", parsedData);

          setAlladultsData(parsedData);

          const adultData = parsedData?.filter(
            (item) => item.label === "Adult"
          );

          // Filter for Youth
          const youthData = parsedData?.filter(
            (item) => item.label === "Child"
          );

          // Filter for Children
          const childrenData = parsedData?.filter(
            (item) => item.label === "Baby"
          );

          setAdultData(adultData);
          setChildrendata(youthData);
          setbabyData(childrenData);

          // Extract the Adult object
          // if (parsedData && parsedData.Adult) {
          //   setAdultData(parsedData.Adult);
          //   setChildrendata(parsedData.Youth);
          //   setbabyData(parsedData.Children);
          // }
        } catch (error) {
          console.error("Error parsing savedData:", error);
        }
      }

      // Check if userData exists and is valid JSON
      if (userData && userData !== "undefined") {
        try {
          const userid = JSON.parse(userData);

          // Extract the user object
          if (userid && userid.user) {
            setUserID(userid.user);
          }
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
  }, []);

  // for adult prices array

  let foundPrices = AlladultsData?.map((item) => item.price);

  let mekkaHotelName = "no select";
  let madinaHotelName = "no select";
  let mekkaid = 0;
  let Madinaid = 0;

  try {
    // Ensure HotelSelect.mekka is a valid JSON string
    if (HotelSelect.mekka) {
      const mekkaHotelData = JSON.parse(HotelSelect.mekka);
      mekkaHotelName = mekkaHotelData.hotel_name || "No Selected";
      mekkaid = mekkaid.hotel_id || 0;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  try {
    if (HotelSelect.madina) {
      const madinaHotel = JSON.parse(HotelSelect.madina);
      madinaHotelName = madinaHotel.hotel_name || "No Selected";
      Madinaid = madinaHotel.hotel_id || 0;
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }

  const HandleLogInDataChange = (e) => {
    const { name, value } = e.target;
    setBookingLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginCheckboxChange = (e) => {
    setLoginISChacked(e.target.checked);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const HandleLoginSubmite = async (e) => {
    e.preventDefault();

    if (LoginISChacked === true) {
      try {
        const response = await post("login", BookingLoginData);
        typeof window != "undefined"
          ? localStorage.setItem("token", response.authorisation.token)
          : "";
        showSuccessToast("Login successful!");

        setTimeout(() => {
          router.push("/customer/db-booking");
        }, 2000);
      } catch (error) {
        console.error("Error:", error); // Log the full error for debugging
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
    } else {
      showErrorToast("ChackBox Was Not Chacked");
    }
  };

  // for promocode

  const [promo, setpromo] = useState("");
  const [PromoData, setPromoData] = useState({});

  const handlepromochange = (e) => {
    setpromo(e.target.value);
  };

  // for dynamic form data and form

  const initializeFormValues = (count, defaultValues) => {
    return Array.from({ length: count }, () => ({ ...defaultValues }));
  };

  const [formValues, setFormValues] = useState({
    Adult: initializeFormValues(adultData?.length || 0, {
      name: "",
      surname: "",
      email: "",
      mobile: "",
      city: "",
      gender: "",
      birthday: "",
      nationality: "",
      houseno: "",
      zipcode: "",
      street: "",
      from: "",
      selectedService: "", // Add field for storing selected service
      selectedPrice: "",
    }),
    Child: initializeFormValues(Childrendata?.length || 0, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
      selectedService: "", // Add field for storing selected service
      selectedPrice: "",
    }),
    Baby: initializeFormValues(babyData.length || 0, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
      selectedService: "", // Add field for storing selected service
    }),
  });

  const handleInputChange = (type, index, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };
      updatedValues[type][index] = {
        ...updatedValues[type][index],
        [name]: value,
      };
      return updatedValues;
    });
  };

  const getPriceForType = (type, idx) => {
    const personPrice = AlladultsData?.filter((item) => item.label === type);

    // console.log("personPrice for function" , personPrice[idx]?.price);

    // console.log(personPrice[idx]);

    if (!personPrice) {
      return 0; // Default value if no price is found
    }
    return Number(personPrice[idx]?.price); // Ensure price is a number
  };

  const getdefaultPriceforType = (type, idx) => {
    const personPrice = AlladultsData?.filter((item) => item.label === type);

    // console.log("personPrice for function" , personPrice[idx]?.price);

    // console.log(personPrice[idx]);

    if (!personPrice) {
      return 0; // Default value if no price is found
    }
    return Number(personPrice[idx]?.default); // Ensure price is a number
  };

  const handleRadioChange = (e, type, i, idx, price) => {
    const selectedValue = e.target.value;

    // Update form values state
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      // Ensure the correct path exists in the state
      if (!updatedValues[type]) {
        updatedValues[type] = {};
      }
      if (!updatedValues[type][i]) {
        updatedValues[type][i] = {};
      }

      // Set the selected service value
      updatedValues[type][i].selectedService = selectedValue;
      updatedValues[type][i].selectedPrice = price;

      return updatedValues;
    });

    updatePriceByTypeAndIndex(type, i, price);

    // console.log("formValues[type]", formValues[type][i]?.selectedPrice);
  };

  const updatePriceByTypeAndIndex = (type, index, newPrice) => {
    console.log("price was change");

    console.log("AlladultsData", AlladultsData);

    const itemsOfType = AlladultsData?.filter((item) => item.label == type);

    console.log("itemsOfType", itemsOfType[index]);

    console.log("index", index);

    // Step 2: Find the item with the specified index
    if (index <= itemsOfType[index]?.index) {
      // Log the item before updating
      // console.log("itemsOfType", itemsOfType[index]);

      const prevPrice = getPriceForType(type, index);
      const addivalue = JSON.parse(newPrice);
      const multiPrice = prevPrice + addivalue;

      // Step 3: Update the price of the item
      const updatedItem = { ...itemsOfType[index], price: multiPrice };

      // Update the state with the new price
      setAlladultsData((prevData) => {
        // Step 1: Filter out the item that needs to be updated
        const updatedData = prevData.map((item) => {
          // Check if the current item matches both type and index
          if (item.label === type && item.index === index) {
            // Return a new object with the updated price
            return { ...item, price: multiPrice };
          }
          // Return the item unchanged if it doesn't match
          return item;
        });

        // Log the updated data
        console.log("Updated data:", updatedData);

        // Return the updated data to update the state
        return updatedData;
      });
    } else {
      console.log("Index out of range");
    }
  };

  const [PriceValue, setPriceValue] = useState(0);

  const renderForms = (type, mainCount) => {
    const fields = {
      Adult: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Email"), type: "text", name: "email" },
        { label: translate("Phone"), type: "text", name: "mobile" },
        { label: translate("City"), type: "text", name: "city" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
        { label: translate("House No"), type: "text", name: "houseno" },
        { label: translate("ZIP Code"), type: "text", name: "zipcode" },
        { label: translate("Street"), type: "text", name: "street" },
        ,
      ],
      adultFieldsForExtraAdults: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
      ],
      Child: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
      ],
      Baby: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
      ],
    };

    const count = mainCount == 0 ? 1 : mainCount;

    const [AdultsType, setAdultsType] = useState(0);
    const [convertedPrices, setConvertedPrices] = useState([]);

    useEffect(() => {
      setAdultsType(type === "Adult" ? 1 : type === "Child" ? 2 : 3);
    }, [type]);

    const totalSum = convertedPrices?.reduce((acc, value) => acc + value, 0);

    // console.log("totalSum" , totalSum);

    useEffect(() => {
      setPriceValue(totalSum);
    }, [totalSum]);

    // for price

    const PrpersonPrice = AlladultsData?.filter((item) => item.label === type);

    let resultPrice;

    if (PrpersonPrice?.length == 0) {
      // If no data is found, assign a default value (e.g., 0)
      resultPrice = 0;
    } else {
      // If data exists, map through it to get the 'price'
      resultPrice = PrpersonPrice?.map((item) => item.price);
    }

    const shouldShowAdditionalServices = type !== "Baby";

    return Array.from({ length: count })?.map((_, i) => {
      const isExtraAdult = type === "Adult" && i >= 1;
      const currentFields = isExtraAdult
        ? fields.adultFieldsForExtraAdults
        : fields[type] || [];

      return (
        <div key={`${type}-${i}`} className="row">
          <div className="form_1 mx-auto">
            <div className="px-50 py-5 yellow_bg">
              <p>
                <span>
                  <FaUser />
                </span>
                <span>
                  <b>{`${i + 1}. ${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Information`}</b>
                </span>
              </p>
              <p>
                <span>
                  <MdError />
                </span>
                <span>{` Is Also The Contact Person For The Reservation.`}</span>
              </p>
            </div>

            <form className="y-gap-30 contactForm px-20 py-20">
              <div className="my-3 row">
                {currentFields?.map((field, index) => (
                  <div
                    key={index}
                    className={`col-md-${field.type === "select" ? "6" : "6"}`}
                  >
                    <div className="form-input my-1">
                      {field.type === "select" ? (
                        <>
                          <select
                            name={field.name}
                            value={formValues[type]?.[i]?.[field.name] || ""} // Safe access to formValues[type] and formValues[type][i]
                            onChange={(e) => handleInputChange(type, i, e)}
                            required
                            className="form-control"
                          >
                            <option value="" disabled>
                              {field.label}
                            </option>
                            {field.options?.map((option, optIndex) => (
                              <option
                                key={optIndex}
                                value={option.toLowerCase()}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                          <label className="lh-1 text-16 text-light-1">
                            {formValues[type]?.[i]?.[field.name]
                              ? `${field.label}: ${
                                  formValues[type]?.[i]?.[field.name]
                                }`
                              : field.label}
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formValues[type]?.[i]?.[field.name] || ""} // Ensure formValues[type][i] is safely accessed
                            onChange={(e) => handleInputChange(type, i, e)}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {field.label}
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-12">
                  <div className="row y-gap-20 items-center justify-between">
                    <div className="col-12 tb-border">
                      <div className="text-14">
                        <p className="d-flex justify-content-between">
                          <span>{translate("Tour Price Per Person")}</span>
                          <span>{`${getdefaultPriceforType(type, i)} €`}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`my-3 border_b px-md-40 ${
                    shouldShowAdditionalServices ? "d-block" : "d-none"
                  }`}
                >
                  <h5 className="text-18 fw-500 my-2">
                    Possible Additional Services Per Person:
                  </h5>
                  <div>
                    {AdditionalServices?.map((option, idx) => (
                      <div
                        key={option.id}
                        className="d-flex items-center justify-between radio_hight"
                      >
                        <div className="d-flex items-center">
                          <div className="form-radio d-flex items-center">
                            <label className="radio d-flex items-center">
                              <input
                                type="radio"
                                name={`radioGroup-${type}-${i}`}
                                value={`${type}-${i}-${idx}-ad-${option.id}-${option.title}`}
                                checked={
                                  formValues[type]?.[i]?.selectedService ==
                                  `${type}-${i}-${idx}-ad-${option.id}-${option.title}`
                                }
                                onChange={(e) =>
                                  handleRadioChange(
                                    e,
                                    type,
                                    i,
                                    idx,
                                    option.price
                                  )
                                } // Ensure type and index are correctly passed
                              />

                              <span className="radio__mark">
                                <span className="radio__icon"></span>
                              </span>
                              <span className="text-14 lh-1 ml-10">
                                {option.title}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="text-14">+ {option.price} €</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 col-md-12">
                  <h5 className="booking-form-price">
                    Subtotal <span>{`${getPriceForType(type, i)} €`}</span>
                  </h5>
                  <p className="text-right">Including Taxes And Fee</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    });
  };

  const [ReservationID, setReservationID] = useState("");

  console.log("foundPrices", foundPrices);

  const totalSum = foundPrices
    ?.map((price) => Number(price)) // Convert each price to a number
    ?.reduce((acc, curr) => acc + curr, 0); // Sum all the numbers

  const taxRate = 0.19;

  const taxAmount = totalSum * taxRate;

  const totalWithTax = totalSum + taxAmount;

  const [HandlePromo, setHandlePromo] = useState(false)

  const TotalPaidAmount = HandlePromo == false ? totalWithTax : PromoData.total_amount
  

  // calling api

  // fathch promo code api

  const FetchPromoApi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      coupon_code: promo,
      total_amount: totalWithTax,
    };

    try {
      const PromoResponse = await post("check_coupon", sendData);
      showSuccessToast(PromoResponse.Message);
      setPromoData(PromoResponse);
      setHandlePromo(true)
      return PromoResponse;
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("Invalid promo code.");
      return null;
    }
  };

    // fathch new booking api

    const FatchallBooking = async (data) => {
      try {
        const response = await post("addbooking", data);
        showSuccessToast(response.Message);
        setReservationID(response.Reservations_id);
      } catch (error) {
        console.error("Error caught:", error);
        showErrorToast("An error occurred during registration.");
      }
    };

  // for form sunmiter button onclick event

  const handleSubmit = async () => {
    try {
      let promoResponse = null;

      // Check if promo is entered and valid
      if (promo) {
        promoResponse = await FetchPromoApi();
      }

      // Create booking data
      const bookingData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        user_id: UserID.id !== null ? UserID.id : "",
        tour_id: TourId,
        person: formValues.Adult[0],
        adult: formValues.Adult.slice(1),
        child: formValues.Child,
        baby: formValues.Baby,
        departure: selectDeparture?.value,
        adult_price: adultData[0]?.default,
        child_price: Childrendata[0]?.default,
        baby_price: babyData[0]?.default,
        total: totalSum,
        amount_paid: TotalPaidAmount,  
        coupon_name: promoResponse ? promoResponse.coupon_name : "", // Use promo data if available
        coupon_amount: promoResponse ? promoResponse.total_amount : 0,
        coupon_percentage: promoResponse ? promoResponse.percentage : 0,
        mekka_hotel: mekkaid,
        madina_hotel: Madinaid,
        flight_id: selectedFlights?.id,
        exclude_flight: ExcludeFlight,
      };

      // Print booking data to console
      console.log("bookingData" , bookingData);
      
      FatchallBooking(bookingData);
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };



  const { translate } = useTranslation();

  return (
    <>
      <section className="layout-pt-md layout-pb-lg mt-header">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-11 mx-auto px-0">
              <div className="bg-white rounded-12  py-15">
                <div className={loginPer === true ? "d-none" : "d-block"}>
                  <button
                    onClick={() => {
                      openModal();
                    }}
                  >
                    <a className="text-accent-1 px-1">
                      {" "}
                      {translate("Sign in")}{" "}
                    </a>{" "}
                  </button>
                  {translate(
                    " Book With Your Saved Details or Continue As a Guest To Book Your Travel."
                  )}
                </div>
              </div>
              <h2 className="text-30 md:text-24 fw-700 bg-Primary">
                {translate("Steps to reserve")}
              </h2>

              <div className="bg-white rounded-12 md:py-20 px-md-20 mt-10">
                {bookingStage == 1 && (
                  <div className="border-1 rounded-12 overflow-hidden shadow-1">
                    <div>
                      {renderForms("Adult", adultData.length)}
                      {renderForms("Child", Childrendata.length)}
                      {renderForms("Baby", babyData.length)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="">
                <div className="bg-white border-1 rounded-12 shadow-2 py-20 px-20 md:py-20 md:px-20 tourSingleSidebar">
                  <h2 className="text-20 fw-500">
                    {translate("Reservation Details")}
                  </h2>

                  <div className="d-flex mt-30">
                    <Image
                      width={90}
                      height={84}
                      src="/img/tourCards/1/13.jpeg"
                      alt="image"
                    />
                    <div className="ml-20">
                      {TourType} - {TourName}{" "}
                    </div>
                  </div>

                  <div className="line mt-10 mb-2"></div>

                  <div className="px-1">
                    <div
                      className={`${selectedCheckbox ? "d-none" : "d-block"}`}
                    >
                      <div
                        className={`d-flex items-center justify-content-space-arround  `}
                      >
                        <div className="mr-5">
                          <FaTelegramPlane size={25} color="#DAC04F" />
                        </div>
                        <div className="text-start">
                          {translate("Airline")}:{" "}
                          {selectedFlights?.name == ""
                            ? "Please Flight Select"
                            : selectedFlights?.name}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand htTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("To")}:{" "}
                        {SharePackageData?.Tour_Details?.tour_details?.travel}
                      </div>
                    </div>

                    <div
                      className={`${selectedCheckbox ? "d-none" : "d-block"}`}
                    >
                      <div
                        className={`d-flex items-center justify-content-space-arround `}
                      >
                        <div className="mr-5">
                          <MdFlightTakeoff size={25} color="#DAC04F" />
                        </div>
                        <div className="text-start">
                          {translate("Departure")} : {selectDeparture?.name} -{" "}
                          {
                            SharePackageData?.Tour_Details?.tour_details
                              ?.date_begin
                          }{" "}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Return")}:{" "}
                        {SharePackageData?.Tour_Details?.tour_details?.date_end}{" "}
                        23:00
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <TbWorld size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Offered Languages")} :{" "}
                        {SharePackageData?.Tour_Details?.en_language}
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaLuggageCart size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Max Luggage Per Person")} :{" "}
                        {SharePackageData?.Tour_Details?.tour_details?.baggage}{" "}
                        kg
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {" "}
                        {mekkaHotelName == ""
                          ? "Please Hotel Select"
                          : mekkaHotelName}
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {madinaHotelName == ""
                          ? "Please Hotel Select"
                          : madinaHotelName}
                      </div>
                    </div>

                    <p className="text-12">
                      (The Standard Offer May Include a Multi-Bed Room.)
                    </p>
                  </div>

                  <div className="line mt-10 mb-10"></div>

                  <div className="">
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Subtotal")}</div>
                      <div className=""> {totalSum} € </div>
                    </div>

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Tax")}</div>
                      <div className=""> {taxAmount} € </div>
                    </div>

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Amount Due")} </div>
                      <div className=""> {TotalPaidAmount} € </div>
                    </div>
                  </div>

                  <hr />

                  <div className="bg-white rounded-12 shadow-2 py-0 px-0 md:py-10 md:px-20 mt-10 ">
                    <h2 className="text-20 fw-500 ">
                      {translate("Do you have a promo code?")}
                    </h2>

                    <form className="contactForm mt-10">
                      <div className="form-input my-1">
                        <input
                          type="text"
                          value={promo}
                          onChange={handlepromochange}
                          required
                        />
                        <label className="lh-2 text-16 text-light-1 top-29">
                          {translate("Promo Code")}
                        </label>
                      </div>
                    </form>
                  </div>

                  <div className="mt-2">
                    {/* <Link href="/payment"> */}
                    <button
                      className={`button -md -info-2 bg-accent-1 text-white col-12 text-end} `}
                      // onClick={HandlePaymentClick}
                      onClick={handleSubmit}
                      // type="submit"
                    >
                      {translate("Proceed to Payment")}
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="openSignIn">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <section className="">
            <div className="d-flex justify-content-between my-1 px-2" id="">
              <h2 className=""></h2>
            </div>

            <form
              onSubmit={HandleLoginSubmite}
              className="contactForm border-1  rounded-12 px-40 py-1 "
            >
              <div className="d-flex justify-content-between">
                <h2 className="text-center">LOG IN</h2>
                <button onClick={closeModal}>
                  <IoClose size={25} />
                </button>
              </div>
              <div className="form-input my-1">
                <input
                  type="email"
                  onChange={HandleLogInDataChange}
                  name="email"
                  value={BookingLoginData.email}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {translate("Email")}
                </label>
              </div>

              <div className="form-input my-1">
                <input
                  type="password"
                  onChange={HandleLogInDataChange}
                  value={BookingLoginData.password}
                  name="password"
                  required
                />
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <div className="row y-ga-10 justify-between items-center pt-10 spacing">
                <div className="col-auto">
                  <div className="d-flex items-center">
                    <label className="form-checkbox d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        className="form-checkbox__input"
                        checked={LoginISChacked}
                        onChange={handleLoginCheckboxChange}
                      />
                      <div className="form-checkbox__mark">
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
                      </div>
                      <span className="text-14 lh-12 ml-10">
                        {translate("Remember me") || "Find Latest Packages"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-auto">
                  <a href="#">Lost your password?</a>
                </div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <button
                    type="submit"
                    className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                  >
                    Log In
                  </button>
                </div>
              </div>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <button
                    type="submit"
                    className="button -md -outline-blue-1 text-blue-1 col-12"
                  >
                    <FaFacebookF size={15} className="mx-1" />
                    Facebook
                  </button>
                </div>

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    <FaGoogle size={15} className="mx-1" />
                    Google
                  </button>
                </div>
              </div>
              <br />
              <div className="row y-gap-15">
                <div className="col">
                  <button className="button -md -outline-dark-1 text-dark-1 col-12">
                    <FaApple size={15} className="mx-1" />
                    Sign in With Apple
                  </button>
                </div>
              </div>
            </form>
          </section>
        </Modal>
      </div>
    </>
  );
}
