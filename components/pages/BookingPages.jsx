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
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/app/context/GlobalStateContext";

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

export default function BookingPages() {
  const [roomType, setRoomType] = useState("");
  const [bookingStage, setBookingStage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [LoginISChacked, setLoginISChacked] = useState(false);
  const [BookingLoginData, setBookingLoginData] = useState({
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    email: "",
    password: "",
  });
  const { adultNumber, youthNumber, childrenNumber , loginPer , FlightSelect , HotelSelect , total , setTotal , selectDeparture } = useGlobalState();

  const router = useRouter();

  const HandleLogInDataChange = (e) => {
    const { name, value } = e.target;
    setBookingLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };3 

  const handleLoginCheckboxChange = (e) => {
    setLoginISChacked(e.target.checked);
  };

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  const HandlePaymentClick = () => {

    if (loginPer === true) {
      router.push("/payment");
    } else {
      router.push("/login");
      if (loginPer === true) {
        router.push("/payment");
      }
    }
  };

  useEffect(() => {}, [roomType]);

  useEffect(() => {
    Modal.setAppElement("#openSignIn");
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const HandleLoginSubmite = async (e) => {
    e.preventDefault();

    console.log("Form submitted");
    console.log("LoginISChacked:", LoginISChacked);

    if (LoginISChacked === true) {
      try {
        const response = await post("login", BookingLoginData);
        localStorage.setItem("token", response.authorisation.token);
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

  // for dynamic form data and form

  
  const initializeFormValues = (count, template) => {
    return Array(count)
      .fill()
      .map(() => ({ ...template }));
  };

  const [formValues, setFormValues] = useState({
    adult: initializeFormValues(adultNumber, {
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
    }), 
    child: initializeFormValues(youthNumber, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
    }),
    baby: initializeFormValues(childrenNumber, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
    }),
  });

  const handleInputChange = (type, index, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };
      updatedValues[type][index][name] = value;
      return updatedValues;
    });
  };

  const renderForms = (type, count) => {
    const fields = {
      adult: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Email"), type: "text", name: "email" },
        { label: translate("Phone"), type: "text", name: "mobile" },
        { label: translate("City"), type: "text", name: "city" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
        { label: translate("House No"), type: "text", name: "houseno" },
        { label: translate("ZIP Code"), type: "text", name: "zipcode" },
        { label: translate("Street"), type: "text", name: "street" },
        { label: translate("From"), type: "select", name: "from", options: ["Frankfurt(FRA)"] },
      ],
      adultFieldsForExtraAdults: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
      ],
      child: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
      ],
      baby: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
      ],
    };
  
    const shouldShowAdditionalServices = type !== "baby";
  
    return Array.from({ length: count }).map((_, i) => {
      const isExtraAdult = type === "adult" && i >= 1;
      const currentFields = isExtraAdult ? fields.adultFieldsForExtraAdults : fields[type];
      
      return (
        <div key={`${type}-${i}`} className="row">
          <div className="form_1 mx-auto">
            <div className="px-50 py-5 yellow_bg">
              <p>
                <span><FaUser /></span>
                <span><b>{`${i + 1}. ${type.charAt(0).toUpperCase() + type.slice(1)} Information`}</b></span>
              </p>
              <p>
                <span><MdError /></span>
                <span>{` Is Also The Contact Person For The Reservation.`}</span>
              </p>
            </div>
  
            <form className="y-gap-30 contactForm px-20 py-20">
              <div className="my-3 row">
                {currentFields?.map((field, index) => (
                  <div key={index} className={`col-md-${field.type === "select" ? "6" : "6"}`}>
                    <div className="form-input my-1">
                      {field.type === "select" ? (
                        <>
                          <select
                            name={field.name}
                            value={formValues[type][i][field.name]}
                            onChange={(e) => handleInputChange(type, i, e)}
                            required
                            className="form-control"
                          >
                            <option value="" disabled>{field.label}</option>
                            {field.options.map((option, optIndex) => (
                              <option key={optIndex} value={option.toLowerCase()}>{option}</option>
                            ))}
                          </select>
                          <label className="lh-1 text-16 text-light-1">
                            {formValues[type][i][field.name] ? `${field.label}: ${formValues[type][i][field.name]}` : field.label}
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formValues[type][i][field.name]}
                            onChange={(e) => handleInputChange(type, i, e)}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">{field.label}</label>
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
                          <span>Tour Price Per Person</span>
                          <span>1.339,00 €</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <div className={`my-3 border_b px-md-40 ${shouldShowAdditionalServices ? "d-block" : "d-none"}`}>
                  <h5 className="text-18 fw-500 my-2">Possible Additional Services Per Person:</h5>
                  <div>
                    {["4 Bettzimmer (Standard)", "3 Bettzimmer", "2 Bettzimmer", "1 Bettzimmer"].map((option, idx) => (
                      <div key={idx} className="d-flex items-center justify-between radio_hight">
                        <div className="d-flex items-center">
                          <div className="form-radio d-flex items-center">
                            <label className="radio d-flex items-center">
                              <input
                                type="radio"
                                name={`radioGroup-${i}`}
                                value={`ad-1-${idx + 1}bad`}
                                checked={radioValue === `ad-1-${idx + 1}bad`}
                                onChange={handleRadioChange}
                              />
                              <span className="radio__mark"><span className="radio__icon"></span></span>
                              <span className="text-14 lh-1 ml-10">{option}</span>
                            </label>
                          </div>
                        </div>
                        <div className="text-14">{idx === 0 ? "0,00 €" : `+${(idx + 1) * 100},00€`}</div>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="mt-3 col-md-12">
                  <h5 className="booking-form-price">Subtotal <span>1.749,00 €</span></h5>
                  <p className="text-right">Including Taxes And Fee</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    });
  };
  

  // Function to handle form submission and print data

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("First adult information:", formValues.adult[0]);
  
    const filteredAdultInfo = formValues.adult
      .filter((_, index) => index !== 0) // Exclude the first adult
      .map(adult => {
        // Remove empty values from each adult's info
        return Object.fromEntries(
          Object.entries(adult).filter(([key, value]) => value !== "")
        );
      });
  
    console.log("Remaining adults' information (excluding the first and without empty values):", filteredAdultInfo);
  
    console.log("Youth information:", formValues.child);
    console.log("Children information:", formValues.baby);
  };
  
  console.log("HotelSelect.mekka" , HotelSelect.mekka);
  

  const { translate } = useTranslation();

  return (
    <>
      <section className="layout-pt-md layout-pb-lg mt-header">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-11 mx-auto px-0">
              <div className="bg-white rounded-12  py-15">
                <button
                  onClick={() => {
                    openModal();
                  }}
                >
                  <a className="text-accent-1 px-1"> {translate("Sign in")} </a>{" "}
                </button>
                {translate(
                  " Book With Your Saved Details or Continue As a Guest To Book Your Travel."
                )}
              </div>
              <h2 className="text-30 md:text-24 fw-700 bg-Primary">
                {translate("Steps to reserve")}
              </h2>

              <div className="bg-white rounded-12 md:py-20 px-md-20 mt-10">
                {bookingStage == 1 && (
                  <div className="border-1 rounded-12 overflow-hidden shadow-1">
                    <div>
                      {renderForms("adult", adultNumber)}
                      {renderForms("child", youthNumber)}
                      {renderForms("baby", childrenNumber)}

                      {/* Submit button to print form values */}
                      <div className="text-center mt-4">
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary"
                        >
                          Print Form Data
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="">
                <div className="bg-white border-1 rounded-12 shadow-2 py-20 px-20 md:py-20 md:px-20 tourSingleSidebar">
                  <h2 className="text-20 fw-500">Reservation Details</h2>

                  <div className="d-flex mt-30">
                    <Image
                      width={90}
                      height={84}
                      src="/img/tourCards/1/13.jpeg"
                      alt="image"
                    />
                    <div className="ml-20">Umrah - SOMMER</div>
                  </div>

                  <div className="line mt-10 mb-2"></div>

                  <div className="px-1">
                    <div className="d-flex items-center justify-content-space-arround ">
                      <div className="mr-5">
                        <FaTelegramPlane size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Airline: {FlightSelect == "" ? "Please Flight Select" : FlightSelect}
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">From: {selectDeparture}</div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand htTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">To: Medina</div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Departure : 26.06.2024 18:00
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Return : 05.07.2024 23:00
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <TbWorld size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Offered Languages: German, Arabic
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaLuggageCart size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Max Luggage Per Person: 30 kg
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start"> {HotelSelect.mekka == "" ? "Please Hotel Select" : HotelSelect.mekka}</div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">{HotelSelect.madina == "" ? "Please Hotel Select" : HotelSelect.madina}</div>
                    </div>

                    <p className="text-12">
                      (The Standard Offer May Include a Multi-Bed Room.)
                    </p>
                  </div>

                  <div className="line mt-10 mb-10"></div>

                  <div className="">
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Subtotal")}</div>
                      <div className=""> {total} € </div>
                    </div>

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">Tax</div>
                      <div className=""> 23 € </div>
                    </div>

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">Amount Due</div>
                      <div className=""> {total} € </div>
                    </div>
                  </div>
                  <hr />
                  <div className="bg-white rounded-12 shadow-2 py-0 px-0 md:py-10 md:px-20 mt-10 ">
                    <h2 className="text-20 fw-500 ">
                      Do you have a promo code?
                    </h2>

                    <form className="contactForm mt-10">
                      <div className="form-input my-1">
                        <input type="text"  required />
                        <label className="lh-2 text-16 text-light-1 top-29">
                          Promo Code
                        </label>
                      </div>
                    </form>
                  </div>

                  <div className="mt-2">
                    {/* <Link href="/payment"> */}
                    <button
                      className={`button -md -info-2 bg-accent-1 text-white col-12 text-end} `}
                      onClick={HandlePaymentClick}
                    >
                      Proceed to Payment
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
