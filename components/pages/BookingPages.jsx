"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext, useRef } from "react";
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
import { POST } from "@/app/utils/api/post";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { nationalities } from "@/data/nationalities";
import Login from "./Login";
import { useCurrency } from "@/app/context/currencyContext";

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
    width: "100%",
    maxWidth: "700px",
    height: "90vh",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

export default function BookingPages({ BookingData }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formRef = useRef(null);

  const TourType = searchParams.get("type");
  const TourName = searchParams.get("name");
  const TourId = searchParams.get("id");
  const { formatPrice } = useCurrency();

  const [bookingStage, setBookingStage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [LoginISChacked, setLoginISChacked] = useState(false);
  const [asLogin, setasLogin] = useState(false);
  const [BookingLoginData, setBookingLoginData] = useState({
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    email: "",
    password: "",
  });
  const [UserID, setUserID] = useState(0);
  const { selectedCheckbox, ExcludeFlight } = useGlobalState();
  const { customer } = useAuthContext();

  const [adultData, setAdultData] = useState([]);
  const [Childrendata, setChildrendata] = useState([]);
  const [babyData, setbabyData] = useState([]);
  const [AlladultsData, setAlladultsData] = useState([]);
  const [AdditionalServices, setAdditionalServices] = useState([]);
  const [existingItemsState, setExistingItemsState] = useState([]);
  const [Discount, setDiscount] = useState({});

  const [PackagePrices, setPackagePrices] = useState(0);
  const [BookingApiData, setBookingApiData] = useState({});

  const [BookingSideBar, setBookingSideBar] = useState({});

  useEffect(() => {
    setAdditionalServices(BookingData?.Tour_Details?.addtional_price);
  }, [BookingData]);

  const [LoginCheck, setLoginCheck] = useState();

  useEffect(() => {
    // Set modal's app element
    Modal.setAppElement("#openSignIn");

    // Only execute in browser environment
    if (typeof window !== "undefined") {
      // Retrieve and parse the priceObject data from localStorage
      const savedData = localStorage.getItem("AdultPrice&count");

      const Login = localStorage.getItem("LoginISChacked");
      const userData = localStorage.getItem("customer");

      const PackagePrice = localStorage.getItem("SelectedPackageHotelNDFlight");

      const SidebarData = localStorage.getItem("PackageBookingData");

      const loginStatus = JSON.parse(
        localStorage.getItem("CustomerLoginCheck")
      );
      if (loginStatus && loginStatus !== "undefined") {
        try {
          const loginChk = JSON.parse(loginStatus);
          setLoginCheck(loginChk);
        } catch (error) {
          console.error(error);
        }
      }

      // Check if savedData exists and is valid JSON
      if (savedData && savedData !== "undefined") {
        try {
          const parsedData = JSON.parse(savedData);

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
        } catch (error) {
          console.error("Error parsing savedData:", error);
        }
      }

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

      if (Login && Login !== "undefined") {
        try {
          const asLogin = JSON.parse(Login);

          // Extract the user object
          if (asLogin && asLogin.user) {
            setUserID(asLogin.user);
          }
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }

      if (PackagePrice && PackagePrice !== "undefined") {
        try {
          const parsedPackagePrice = JSON.parse(PackagePrice);

          // setPackagePrices(parsedPackagePrice);
        } catch (error) {
          console.error("Error parsing savedData:", error);
        }
      }

      if (SidebarData && SidebarData !== "undefined") {
        try {
          const BookingSideData = JSON.parse(SidebarData);
          setBookingSideBar(BookingSideData);
          setPackagePrices(BookingSideData.FlightAndHotel);
        } catch (error) {
          console.error("Error parsing savedData:", error);
        }
      }
    }
  }, []);

  // for adult prices array

  let foundPrices = AlladultsData?.map((item) => item.price);

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

    try {
      const response = await post("login", BookingLoginData);
      typeof window != "undefined"
        ? localStorage.setItem("token", response.authorisation.token)
        : "";
      showSuccessToast("Login successful!");

      setTimeout(() => {
        router.push("/");
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
  };

  // for promocode

  const [promo, setpromo] = useState("");
  const [PromoData, setPromoData] = useState({});

  const handlepromochange = (e) => {
    setpromo(e.target.value);
  };

  // for dynamic form data and form

  // const initializeFormValues = (count, defaultValues) => {
  //   return Array.from({ length }, () => ({ ...defaultValues }));
  // };

  const initializeFormValues = (count, defaultValues) => {
    if (count === 0) {
      return []; // If count is 0, return an empty array
    }
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
      houseNumber: "",
      zipcode: "",
      street: "",
      from: "",
      selectedService: "", // Add field for storing selected service
      price: "",
      title: "",
      additional_order: "",
      additional_price_id: "",
    }),
    Child: initializeFormValues(Childrendata?.length || 0, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
      selectedService: "", // Add field for storing selected service
      price: "",
      title: "",
      additional_order: "",
      additional_price_id: "",
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

  // for profile data
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
    city: "",
    gender: "",
    birthday: "",
    nationality: "",
    houseNumber: "",
    zipcode: "",
    street: "",
    from: "",
    selectedService: "", // Add field for storing selected service
    price: "",
    title: "",
    additional_order: "",
    additional_price_id: "",
  });

  const [Additional, setAdditional] = useState([]);
  // for form validation

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Extract form values and validate
    const allValues = Object.values(formValues).flat();
    const isValid = validateForm(
      allValues.map((field) => Object.values(field)).flat()
    );
    setIsFormValid(isValid);
  }, [formValues]);

  const getdefaultPriceforType = (type, idx) => {
    const personPrice = AlladultsData?.filter((item) => item.label === type);

    if (!personPrice) {
      return 0; // Default value if no price is found
    }
    return formatPrice(Number(personPrice[idx]?.default)); // Ensure price is a number
  };

  const handleInputChange = (type, index, e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (!updatedValues[type]) {
        updatedValues[type] = [];
      }
      if (!updatedValues[type][index]) {
        updatedValues[type][index] = {};
      }

      // Update the form values
      updatedValues[type][index] = {
        ...updatedValues[type][index],
        [name]: value,
      };

      // Optional: Update userData if type is 'Adult' and index is 0
      if (type === "Adult" && index === 0) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          [name]: value, // Update userData if necessary
        }));
      }

      return updatedValues;
    });
  };

  const handleRadioChange = (e, type, i, idx, price, order, title, optid) => {
    const selectedValue = e.target.value;

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      // Ensure the correct path exists in the state
      if (!updatedValues[type]) {
        updatedValues[type] = [];
      }
      if (!updatedValues[type][i]) {
        updatedValues[type][i] = {};
      }

      // Update the form values with the new radio button selection
      updatedValues[type][i] = {
        ...updatedValues[type][i],
        selectedService: selectedValue,
        price: price,
        title: title,
        additional_order: order,
        additional_price_id: optid,
      };

      // Optional: Update userData if type is 'Adult' and index is 0
      if (type === "Adult" && i === 0) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          selectedService: selectedValue,
          price: price,
          title: title,
          additional_order: order,
          additional_price_id: optid,
        }));
      }

      return updatedValues;
    });

    setAdditional((prevAdditional) => {
      const newItem = {
        type: type || "",
        price: price || "",
        title: title || "",
        index: i !== undefined ? i : 0,
        order: order || "",
        id: optid || "",
      };

      // Find all existing items with the same index and type
      const existingItems = prevAdditional.filter(
        (item) => item.index === newItem.index && item.type === newItem.type
      );

      // Set existing items in a separate state to access outside of this function
      if (existingItems.length > 0) {
        setExistingItemsState(existingItems); // Store the matching items
      }

      // Filter and update state
      const updatedAdditional = prevAdditional.filter(
        (item) => !(item.index === newItem.index && item.type === newItem.type)
      );

      return [...updatedAdditional, newItem];
    });

    getPriceForadditional(type, i);
  };

  console.log("Additional", Additional);

  const getPriceForadditional = (type, idx) => {
    const personPrice = AlladultsData?.filter((item) => item.label === type);
    const AdditionalPrice = Additional.filter((item) => item.index === idx);

    if (!personPrice) {
      return 0; // Default value if no price is found
    }
    return Number(personPrice[idx]?.price); // Ensure price is a number
  };

  const SubtotalPriceWithAdditional = (type, i) => {
    const Original = getPriceForType(type, i);

    const updatePrice = Additional.filter(
      (item) => item.type === type && item.index === i
    ).map((item) => item.price);

    const PrefPrice = existingItemsState;

    const additionalPrice = isNaN(Number(updatePrice[0]))
      ? 0
      : Number(updatePrice[0]);

    const conformSubTotal =
      (isNaN(Number(Original)) ? 0 : Number(Original)) + additionalPrice;

    return formatPrice(conformSubTotal);
  };

  const getPriceForType = (type, idx) => {
    const personPrice = AlladultsData?.filter((item) => item.label === type);
    const AdditionalPrice = Additional.filter((item) => item.index === idx);

    if (!personPrice) {
      return 0; // Default value if no price is found
    }
    return Number(personPrice[idx]?.price); // Ensure price is a number
  };

  const validateForm = () => {
    const validateGroup = (group, checkFirstOnly = false) => {
      if (group.length === 0) return false; // Ensure group has at least one item

      if (checkFirstOnly) {
        // Only validate the first item in the group
        const firstItem = group[0]; // Assuming group is an array
        if (!firstItem) return false; // Ensure firstItem is not undefined or null

        return Object.values(firstItem).every((value) => value !== "");
      } else {
        // Validate all items in the group
        return group.every((item) => {
          return Object.values(item).every((value) => value !== "");
        });
      }
    };

    if (LoginCheck === true) {
      // Validate only the first entry of the Adult group
      return validateGroup(formValues.Adult, true); // Validate first form for Adult
    } else {
      // Validate all groups: Adult, Child, and Baby
      return (
        validateGroup(formValues.Adult) &&
        validateGroup(formValues.Child) &&
        validateGroup(formValues.Baby)
      );
    }
  };

  const [HandlePromo, setHandlePromo] = useState(false);
  const [ShowbtnName, setShowbtnName] = useState(false);

  const adultadiPrices = foundPrices
    ?.map((price) => Number(price))
    ?.reduce((acc, curr) => acc + curr, 0);

  // allPrice

  const adPrice = Additional.map((item) => Number(item.price)).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const totalSum =
    HandlePromo === false
      ? PackagePrices + adultadiPrices + adPrice
      : PromoData.total_amount !== undefined
      ? PromoData.total_amount
      : PackagePrices + adultadiPrices;

  // calling api

  const FetchPromoApi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      coupon_code: promo,
      total_amount: PackagePrices + adultadiPrices + adPrice,
    };

    try {
      const PromoResponse = await post("check_coupon", sendData);
      if (PromoResponse.Status == 1) {
        showSuccessToast(PromoResponse.Message);
        setDiscount(PromoResponse);
        setHandlePromo(true);
      } else {
        showErrorToast("Invalid promo code.");
        setHandlePromo(false);
      }

      setPromoData(PromoResponse);

      return PromoResponse;
    } catch (error) {
      console.error("Error caught:", error);
      return null;
    }
  };

  // fathch new booking api

  // fatch profileapi

  const fetchProfile = async () => {
    const url = "my_profile";
    const response = await POST.request({
      url: url,
      token: `${customer?.authorisation.token}`,
    });

    // Handle case where response.user is a single object
    if (response.user && typeof response.user === "object") {
      const userProfile = response.user;
      setUserData({
        name: userProfile.name || "",
        surname: userProfile.surname || "",
        email: userProfile.email || "",
        mobile: userProfile.mobile || "",
        city: userProfile.city || "",
        gender: userProfile.gender || "",
        birthday: userProfile.birthday || "",
        nationality: userProfile.nationality || "",
        houseNumber: userProfile.houseNumber || "",
        zipcode: userProfile.zipcode || "",
        street: userProfile.street || "",
        from: userProfile.from || "",
        selectedService: userProfile.selectedService || "",
        price: userProfile.price || "",
        title: userProfile.title || "",
        additional_order: userProfile.additional_order || "",
        additional_price_id: userProfile.additional_price_id || "",
        address: userProfile.address || "",
      });
    } else {
      console.error("Unexpected response structure:", response);
    }

    return response.user ? [response.user] : [];
  };

  const taxRate = 0.19;

  const taxAmount = JSON.parse(totalSum) * taxRate;

  const totalWithTax = JSON.parse(totalSum);

  const formattedTaxAmount = taxAmount.toFixed(2);

  const TotalPaidAmount = totalWithTax.toFixed(2);

  // for form sunmiter button onclick event

  const handlePromoSubmit = async () => {
    FetchPromoApi();
    setShowbtnName(true);
  };

  const handlePromoremove = () => {
    if (HandlePromo == true) {
      setHandlePromo(false);
      showSuccessToast("Remove Sucessfull");
    } else if (HandlePromo == false) {
      setHandlePromo(true);
    }
    setShowbtnName(false);
  };

  useEffect(() => {
    if (LoginCheck === true) {
      fetchProfile();
    } else {
      console.log("User not logged in");
    }
  }, [LoginCheck, customer]);

  const renderForms = (type, count) => {
    const fields = {
      Adult: [
        {
          label: translate("Name"),
          type: "text",
          name: "name",
          value: userData.name,
        },
        {
          label: translate("Surname"),
          type: "text",
          name: "surname",
          value: userData.surname,
        },
        {
          label: translate("Email"),
          type: "email",
          name: "email",
          value: userData.email,
        },
        {
          label: translate("Phone"),
          type: "number",
          name: "mobile",
          value: userData.mobile,
        },
        {
          label: translate("City"),
          type: "text",
          name: "city",
          value: userData.city,
        },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
          value: userData.gender,
        },
        {
          label: translate("Birthday Date"),
          type: "date",
          name: "birthday",
          value: userData.birthday,
        },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: nationalities,
          value: userData.nationality,
        },
        {
          label: translate("House No"),
          type: "text",
          name: "houseNumber",
          value: userData.houseNumber,
        },
        {
          label: translate("ZIP Code"),
          type: "text",
          name: "zipcode",
          value: userData.zipcode,
        },
        {
          label: translate("Street"),
          type: "text",
          name: "street",
          value: userData.street,
        },
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
          options: nationalities,
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
          options: nationalities,
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
          options: nationalities,
        },
      ],
    };

    // for price

    const PrpersonPrice = AlladultsData?.filter((item) => item.label === type);

    let resultPrice;

    if (AlladultsData)
      if (PrpersonPrice?.length == 0) {
        resultPrice = 0;
      } else {
        resultPrice = PrpersonPrice?.map((item) => item.price);
      }

    const shouldShowAdditionalServices = type !== "Baby";

    return Array.from({ length: count })?.map((_, i) => {
      const isExtraAdult = type === "Adult" && i >= 1;
      const currentFields = isExtraAdult
        ? fields.adultFieldsForExtraAdults
        : fields[type] || [];

      const isFormPrefilled = LoginCheck && i === 0;

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

            <div className="y-gap-30 contactForm px-20 py-20">
              <div className="my-3 row">
                {currentFields?.map((field, index) => {
                  const fieldValue =
                    LoginCheck === true && type === "Adult" && i === 0
                      ? userData?.[field.name]
                      : formValues[type]?.[i]?.[field.name];

                  return (
                    <div
                      key={index}
                      className={`col-md-${
                        field.type === "select" ? "6" : "6"
                      }`}
                    >
                      <div className="form-input my-1">
                        {field.type === "select" ? (
                          <>
                            <select
                              name={field.name}
                              value={fieldValue || ""}
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
                              {fieldValue
                                ? `${field.label}: ${
                                    fieldValue.charAt(0).toUpperCase() +
                                    fieldValue.slice(1)
                                  }`
                                : field.label}
                            </label>
                          </>
                        ) : (
                          <>
                            <input
                              type={field.type}
                              name={field.name}
                              value={fieldValue}
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
                  );
                })}

                <div className="col-12">
                  <div className="row y-gap-20 items-center justify-between">
                    <div className="col-12 tb-border">
                      <div className="text-14">
                        <p className="d-flex justify-content-between">
                          <span>{translate("Tour Price Per Person")}</span>
                          <span>{`${getdefaultPriceforType(type, i)} `}</span>
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
                                // const handleRadioChange = (e, type, i , idx ,  price, order, title, optid) => {
                                onChange={(e) =>
                                  handleRadioChange(
                                    e,
                                    type,
                                    i,
                                    idx,
                                    option.price,
                                    option.additinoal_order,
                                    option.title,
                                    option.id
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
                        <div className="text-14">
                          + {formatPrice(option.price)}{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 col-md-12">
                  <h5 className="booking-form-price">
                    Subtotal{" "}
                    <span>{`${SubtotalPriceWithAdditional(type, i)} `}</span>
                  </h5>
                  <p className="text-right">Including Taxes And Fee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  console.log("UserID", UserID);

  const bookingData = {
    AccessKey: "Mekka@24",
    user_id: LoginCheck === true ? (UserID.id !== null ? UserID.id : 0) : 0,
    tour_id: JSON.parse(TourId),
    person:
      LoginCheck == true
        ? JSON.stringify(userData)
        : JSON.stringify(formValues.Adult[0]),
    ...(formValues.Adult.slice(1).length !== 0 && {
      adult: JSON.stringify(formValues.Adult.slice(1)),
    }),
    ...(formValues.Child.length !== 0 && {
      child: JSON.stringify(formValues.Child),
    }),
    // Exclude the baby field if its length is 0
    ...(formValues.Baby.length !== 0 && {
      baby: JSON.stringify(formValues.Baby),
    }),
    departure: JSON.parse(
      BookingSideBar?.Departure?.value === undefined
        ? 0
        : BookingSideBar?.Departure?.value
    ),
    adult_price: JSON.parse(adultData.length === 0 ? 0 : adultData[0]?.default),
    child_price: JSON.parse(
      Childrendata.length === 0 ? 0 : Childrendata[0]?.default
    ),
    baby_price: JSON.parse(babyData.length === 0 ? 0 : babyData[0]?.default),
    total: JSON.parse(TotalPaidAmount), // old value :- totalSum
    amount_paid: 0, // OLD VALUE :- JSON.parse(TotalPaidAmount)
    coupon_name: Discount?.coupon_name || "",
    coupon_amount: Discount?.coupon_amount || 0,
    coupon_percentage: Discount?.coupon_percentage || 0,
    mekka_hotel: BookingSideBar.MakkaHotel?.hotel_id,
    madina_hotel: BookingSideBar.MadinaHotel?.hotel_id,
    flight_id: selectedCheckbox !== false ? 0 : BookingSideBar.Airline?.id,
    exclude_flight: JSON.parse(ExcludeFlight),
    // tax: JSON.parse(formattedTaxAmount),
  };

  console.log("ExcludeFlight", ExcludeFlight);

  const handleUpdateLocalStorage = () => {
    const SidebarData = localStorage.getItem("PackageBookingData");
    if (SidebarData && SidebarData !== "undefined") {
      try {
        const BookingSideData = JSON.parse(SidebarData);

        // New price object to add
        const newPrice = {
          SubTotal: totalSum,
          Tax: formattedTaxAmount,
          Amount_Paid: TotalPaidAmount,
          Discount: Discount,
        };

        // Add new data to existing storage object
        BookingSideData.BookingFild = newPrice;

        // Save updated data back to localStorage
        localStorage.setItem(
          "PackageBookingData",
          JSON.stringify(BookingSideData)
        );

        // Update state to reflect new data
        setBookingSideBar(BookingSideData);

        console.log("Object updated successfully in localStorage");
      } catch (error) {
        console.error("Error updating SidebarData:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("BookingData", JSON.stringify(bookingData));
      localStorage.setItem("AdditionalServices", JSON.stringify(Additional));
    }

    handleUpdateLocalStorage();

    router.push("/payment");
  };

  const handleExternalButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // This triggers form submission
    }
  };

  console.log("formValues", formValues);

  console.log(
    " adultData babyData Childrendata",
    adultData.length,
    babyData.length,
    Childrendata.length
  );

  const { translate } = useTranslation();

  return (
    <>
      {/* sidebarr no aa badhi data static che to ane jyare page refrash thay tyare kai rite jato na re evu store karavi sakay  */}

      <section className="layout-pt-md layout-pb-lg mt-header">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-11 mx-auto px-0">
              <div className="bg-white rounded-12  py-15">
                <div className={LoginCheck === true ? "d-none" : "d-block"}>
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
                    <form onSubmit={handleSubmit} ref={formRef}>
                      {renderForms("Adult", adultData.length)}
                      {renderForms("Child", Childrendata.length)}
                      {renderForms("Baby", babyData.length)}
                      <div className="mt-2">
                        {/* <Link href="/payment"> */}
                        <button
                          className={`button -md -info-2 bg-accent-1 text-white col-12 text-end d-none`}
                          // onClick={HandlePaymentClick}
                          // onClick={handleSubmit}

                          type="submit"
                        >
                          {translate("Proceed to Payment")}
                        </button>
                        {/* </Link> */}
                      </div>
                    </form>
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
                      src={BookingSideBar.TourThumbnail}
                      alt="image"
                    />
                    <div className="ml-20">
                      {TourType} - {TourName}{" "}
                    </div>
                  </div>

                  <div className="line mt-10 mb-2"></div>

                  <div className="px-1">
                    <div
                      className={`${
                        (selectedCheckbox &&
                          BookingSideBar?.Airline === null) ||
                        BookingSideBar.selectedCheckbox !== false
                          ? "d-none"
                          : "d-block"
                      }`}
                    >
                      <div
                        className={`d-flex items-center justify-content-space-arround  `}
                      >
                        <div className="mr-5">
                          <FaTelegramPlane size={25} color="#DAC04F" />
                        </div>
                        <div className="text-start">
                          {translate("Airline")}:{" "}
                          {BookingSideBar?.Airline?.name}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand htTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("To")}:{" "}
                        {BookingSideBar?.type == "Umrah"
                          ? "MED"
                          : BookingSideBar?.type == "Hajj" ||
                            BookingSideBar?.type == "Hadsch"
                          ? "JED"
                          : "MED & JED"}
                      </div>
                    </div>

                    <div
                      className={`${
                        BookingSideBar.selectedCheckbox !== false
                          ? "d-none"
                          : "d-block"
                      }`}
                    >
                      <div
                        className={`d-flex items-center justify-content-space-arround `}
                      >
                        <div className="mr-5">
                          <MdFlightTakeoff size={25} color="#DAC04F" />
                        </div>
                        <div className="text-start">
                          {translate("Departure")} :{" "}
                          {BookingSideBar?.Departure?.name}
                          {/* {BookingSideBar?.Departure?.[0]} */}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Return")}: {BookingSideBar?.Return}
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <TbWorld size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Offered Languages")} :{" "}
                        {BookingSideBar?.OfferedLanguages}
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaLuggageCart size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Max Luggage Per Person")} :{" "}
                        {BookingSideBar?.Airline?.luggage === null
                          ? " null aa raha hei ! "
                          : BookingSideBar?.Airline?.luggage}{" "}
                        kg
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Mekka :- {BookingSideBar?.MakkaHotel?.hotel_name}
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Madina :- {BookingSideBar?.MadinaHotel?.hotel_name}
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
                      <div className=""> {formatPrice(totalSum)} </div>
                    </div>

                    <div
                      className={`${
                        ShowbtnName === false ? "d-none" : "d-block"
                      }`}
                    >
                      <div className={`d-flex items-center justify-between `}>
                        <div className="fw-500">{translate("Discount")}</div>
                        <div className=""> - {Discount.Discount} € </div>
                      </div>
                    </div>

                    {/* <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Tax")}(19%)</div>
                      <div className=""> {formattedTaxAmount} € </div>
                    </div> */}

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Amount Due")} </div>
                      <div className=""> {formatPrice(TotalPaidAmount)} </div>
                    </div>
                  </div>

                  {/* <p className="text-right">Including Tax</p> */}

                  <hr />

                  <div className="bg-white rounded-12 shadow-2 py-0 px-0 md:py-10 md:px-20 mt-10 ">
                    <h2 className="text-20 fw-500 ">
                      {translate("Do you have a promo code?")}
                    </h2>

                    <form className="contactForm mt-10">
                      <div className="d-flex align-items-center">
                        <div className="form-input my-1" style={{ flex: 1 }}>
                          <input
                            type="text"
                            value={promo}
                            onChange={handlepromochange}
                            required
                            disabled={ShowbtnName}
                          />
                          <label className="lh-2 text-16 text-light-1 top-29">
                            {translate("Promo Code")}
                          </label>
                        </div>

                        {ShowbtnName === false ? (
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-2 ml-10 text-end"
                            onClick={handlePromoSubmit}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {translate("Apply")}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-2 ml-10 text-end"
                            onClick={handlePromoremove}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {translate("Remove")}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="mt-2">
                    <button
                      className={`button -md -info-2 bg-accent-1 text-white col-12 text-end `}
                      onClick={handleExternalButtonClick}
                    >
                      {translate("Proceed to Payment")}
                    </button>
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

            {/* <form
              onSubmit={HandleLoginSubmite}
              className="contactForm border-1  rounded-12 px-40 py-1 "
            >
              <div className="d-flex justify-content-between">
                <h2 className="text-center">SIGN IN</h2>
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
            </form> */}

            <button onClick={closeModal}>
              <IoClose size={25} />
            </button>

            <Login classfor={`col-12`} sectionClass={` `} hide={false} />
          </section>
        </Modal>
      </div>
    </>
  );
}
