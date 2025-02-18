"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaLuggageCart } from "react-icons/fa";
import { FaHotel, FaStar } from "react-icons/fa6";
import "@/public/css/index.css";
import Modal from "react-modal";
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
import { ClipLoader } from "react-spinners";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCountryCode } from "@/app/context/useCountryCode";
import { update } from "lodash";

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
    height: "10vh",
    overflowY: "scroll",
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
  const { countryCode } = useCountryCode();

  const [bookingStage, setBookingStage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
  const [HandlePromo, setHandlePromo] = useState(false);
  const [ShowbtnName, setShowbtnName] = useState(false);
  const [PackagePrices, setPackagePrices] = useState(0);
  const [BookingSideBar, setBookingSideBar] = useState({});
  const newdata = localStorage.getItem("getUserData");
  const taxRate = 0.19;
  const [totalSum, setTotalSum] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [formattedTaxAmount, setFormattedTaxAmount] = useState("0.00");
  const [TotalPaidAmount, setTotalPaidAmount] = useState("0.00");
  const [SubTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setAdditionalServices(BookingData?.Tour_Details?.addtional_price);
    localStorage.setItem(
      "additionalfordashboard",
      JSON.stringify(BookingData?.Tour_Details?.addtional_price)
    );
  }, [BookingData]);

  const [LoginCheck, setLoginCheck] = useState();

  useEffect(() => {
    // Set modal's app element
    Modal.setAppElement("#openSignIn");

    // Only execute in browser environment

    // Retrieve and parse the priceObject data from localStorage
    const savedData = localStorage.getItem("AdultPrice&count");

    const Login = localStorage.getItem("LoginISChacked");
    const userData = localStorage.getItem("customer");

    const PackagePrice = localStorage.getItem("SelectedPackageHotelNDFlight");

    const SidebarData = localStorage.getItem("PackageBookingData");

    const BackAdultData = localStorage.getItem("AllAdultsData");

    const loginStatus = JSON.parse(localStorage.getItem("CustomerLoginCheck"));

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

        const adultData = parsedData?.filter((item) => item.label === "Adult");

        // Filter for Youth
        const youthData = parsedData?.filter((item) => item.label === "Child");

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

    if (BackAdultData && BackAdultData !== "undefined") {
      try {
        const AdultD = JSON.parse(BackAdultData);

        // Extract the user object
        if (AdultD) {
          setFormValues((prevValues) => {
            const updatedValues = { ...prevValues };

            if (!updatedValues["Adult"]) {
              updatedValues["Adult"] = [];
            }
            if (!updatedValues["Adult"][0]) {
              updatedValues["Adult"][0] = {};
            }

            AdultD?.Adult?.map(
              (e, i) =>
                (updatedValues["Adult"][i] = {
                  ...updatedValues["Adult"][i],
                  name: e.name,
                  surname: e.surname,
                  birthday: e.birthday,
                  city: e.city,
                  email: e.email,
                  gender: e.gender,
                  houseNumber: e.houseNumber,
                  mobile: e.mobile,
                  nationality: e.nationality,
                  street: e.street,
                  zipcode: e.zipcode,
                })
            );

            AdultD?.Child?.map(
              (e, i) =>
                (updatedValues["Child"][i] = {
                  ...updatedValues["Child"][i],
                  name: e.name,
                  surname: e.surname,
                  birthday: e.birthday,
                  city: e.city,
                  email: e.email,
                  gender: e.gender,
                  houseNumber: e.houseNumber,
                  mobile: e.mobile,
                  nationality: e.nationality,
                  street: e.street,
                  zipcode: e.zipcode,
                })
            );
            AdultD?.Baby?.map(
              (e, i) =>
                (updatedValues["Baby"][i] = {
                  ...updatedValues["Baby"][i],
                  name: e.name,
                  surname: e.surname,
                  birthday: e.birthday,
                  city: e.city,
                  email: e.email,
                  gender: e.gender,
                  houseNumber: e.houseNumber,
                  mobile: e.mobile,
                  nationality: e.nationality,
                  street: e.street,
                  zipcode: e.zipcode,
                })
            );

            return updatedValues;
          });
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
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
  }, []);

  // for adult prices array

  let foundPrices = AlladultsData?.map((item) => item.price);

  function openModal() {
    setIsOpen(true);
    localStorage.setItem("setIsOpen", JSON.stringify(true));
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const [promo, setpromo] = useState("");
  const [PromoData, setPromoData] = useState({});
  const [ShowPhoneError, setShowPhoneError] = useState("");

  const handlepromochange = (e) => {
    setpromo(e.target.value);
  };

  // for dynamic form data and form

  const initializeFormValues = (count, defaultValues) => {
    if (count === 0) {
      return [];
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
      additional_services: "",
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
      selectedService: "",
      additional_services: "",
    }),
    selectedServicePrices: [],
  });

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

  const getdefaultPriceforType = (type, idx) => {
    const personPrice = AlladultsData?.filter((item) => item.label === type);

    if (!personPrice) {
      return 0; // Default value if no price is found
    }
    return formatPrice(Number(personPrice[idx]?.default)); // Ensure price is a number
  };

  // const handleInputChange = (type, index, e, ftype) => {
  //   let { name, value } = e.target;

  //   if (ftype === "phone" && name === "mobile") {
  //     // Perform any validation or formatting here if needed
  //     value = e.target.e;
  //   }

  //   // Update form values
  //   setFormValues((prevValues) => {
  //     const updatedValues = { ...prevValues };

  //     console.log(updatedValues, "updatedValues");

  //     // Ensure type array exists
  //     if (!updatedValues[type]) {
  //       updatedValues[type] = [];
  //     }

  //     // Ensure object exists for the specific index
  //     if (!updatedValues[type][index]) {
  //       updatedValues[type][index] = {};
  //     }

  //     // Store the validated value (including mobile number)
  //     updatedValues[type][index] = {
  //       ...updatedValues[type][index],
  //       [name]: value, // Store the value (e.g., phone number)
  //     };

  //     if (type === "Adult" && index === 0) {
  //       // Reset Adult[0] if the conditions don't match
  //       updatedValues.Adult[0] = {
  //         ...updatedValues.Adult[0],
  //         [name]: value,
  //       };
  //     } else {
  //       updatedValues.Adult[0] = {}; // Reset Adult[0] if not matching condition
  //     }

  //     return updatedValues;
  //   });
  // };

  const handleInputChange = (type, index, e, ftype) => {
    let { name, value } = e.target;

    if (ftype === "phone" && name === "mobile") {
      // Perform any validation or formatting here if needed
      value = e.target.e;
    }

    // Update form values
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      console.log(updatedValues, "updatedValues");

      // Ensure type array exists
      if (!updatedValues[type]) {
        updatedValues[type] = [];
      }

      // Ensure object exists for the specific index
      if (!updatedValues[type][index]) {
        updatedValues[type][index] = {};
      }

      // Store the validated value (including mobile number)
      updatedValues[type][index] = {
        ...updatedValues[type][index],
        [name]: value, // Store the value (e.g., phone number)
      };

      // If LoginCheck is true, update Adult[0] with a default object and the new value
      if (LoginCheck === true && type === "Adult" && index === 0) {
        updatedValues.Adult[0] = {
          ...updatedValues.Adult[0], // Preserve any existing values in Adult[0]
          [name]: value, // Update the specific field
        };
      } else {
        updatedValues.Adult[0] = {}; // Reset Adult[0] if conditions aren't met
      }

      return updatedValues;
    });
  };

  const handleCheckboxChange = (
    e,
    type,
    i,
    idx,
    price,
    order,
    title,
    optid,
    isChecked
  ) => {
    const value = `${type}-${i}-${idx}-ad-${optid}-${title}`;

    // Update the form values state

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      // Ensure the correct path exists in the state
      if (!updatedValues[type]) {
        updatedValues[type] = [];
      }
      if (!updatedValues[type][i]) {
        updatedValues[type][i] = {
          selectedServices: [], // Initialize selectedServices array
          selectedPrices: [],
          services: [],
        };
      }

      if (!updatedValues[type][i].selectedServices) {
        updatedValues[type][i].selectedServices = [];
      }
      if (!updatedValues[type][i].selectedPrices) {
        updatedValues[type][i].selectedPrices = [];
      }
      if (!updatedValues[type][i].services) {
        updatedValues[type][i].services = [];
      }

      // Update the selected services and prices based on checkbox state
      const Services = {
        price: price,
        title: title,
        additional_order: order,
        additional_price_id: optid,
      };

      if (isChecked) {
        updatedValues[type][i].selectedServices.push(value);
        updatedValues[type][i].selectedPrices.push(price);
        updatedValues[type][i].services.push(JSON.stringify(Services));
      } else {
        updatedValues[type][i].selectedServices = updatedValues[type][
          i
        ].selectedServices.filter((item) => item !== value);
        updatedValues[type][i].selectedPrices = updatedValues[type][
          i
        ].selectedPrices.filter((item) => item !== price);
        updatedValues[type][i].services = updatedValues[type][
          i
        ].services.filter((item) => item !== JSON.stringify(Services));
      }

      if (type === "Adult" && i === 0) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          selectedService: updatedValues[type][i].selectedServices,
          price: updatedValues[type][i].selectedPrices,
          title: updatedValues[type][i].services
            .map((item) => item.title)
            .join(", "), // Join titles for display
          additional_order: updatedValues[type][i].services
            .map((item) => item.order)
            .join(", "),
          additional_price_id: updatedValues[type][i].services
            .map((item) => item.id)
            .join(", "),
          services: updatedValues[type][i].services,
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

      // Remove the item if it exists (for unchecked checkboxes)
      const updatedAdditional = prevAdditional.filter(
        (item) =>
          !(
            item.index === newItem.index &&
            item.type === newItem.type &&
            item.id === newItem.id
          )
      );

      // Add the new item if checked
      if (isChecked) {
        return [...updatedAdditional, newItem]; // Add new item if checked
      } else {
        return updatedAdditional; // Return updatedAdditional if unchecked
      }
    });

    const subtotal = SubtotalPriceWithAdditional(type, i);
  };

  const handleDateFocus = (e) => {
    // Ensure this is a user gesture
    if (e.target === document.activeElement) {
      e.target.showPicker();
    }
  };

  const SubtotalPriceWithAdditional = (type, i) => {
    const Original = getPriceForType(type, i);

    const updatePrice = Additional.filter(
      (item) => item.type === type && item.index === i
    ).map((item) => item.price);

    const PrefPrice = existingItemsState;

    const additionalPrice = updatePrice.reduce(
      (acc, curr) => acc + (isNaN(Number(curr)) ? 0 : Number(curr)),
      0
    );

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

  const adultadiPrices = foundPrices
    ?.map((price) => Number(price))
    ?.reduce((acc, curr) => acc + curr, 0);

  const adPrice = Additional.map((item) => Number(item.price)).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const FetchPromoApi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      coupon_code: promo,
      total_amount: PackagePrices + adultadiPrices + adPrice,
      email: formValues.Adult[0]?.email,
    };

    try {
      const PromoResponse = await post("check_coupon", sendData);

      if (PromoResponse.Status !== "0") {
        setShowbtnName(true);
        showSuccessToast(translate, "Promo code applied successfully");
        setDiscount(PromoResponse);
        setHandlePromo(true);
      } else {
        setShowbtnName(false);
        showErrorToast(translate, "Invalid promo code");
        setHandlePromo(false);
        setDiscount(0);
      }

      setPromoData(PromoResponse);
      return PromoResponse;
    } catch (error) {
      console.error("Error caught:", error);
      return null;
    }
  };

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

      if (newdata === null) {
        // Create an object from userProfile data without "name"
        const profileData = {
          surname: userProfile.surname || "",
          name: userProfile.name || "",
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
          additional_services: userProfile.additional_order || "", // Assuming additional_order should map to additional_services
        };

        // Push profileData to formValues.Adult array
        setFormValues((prevValues) => ({
          ...prevValues,
          Adult: [...prevValues.Adult, profileData],
        }));
      }
    } else {
      console.error("Unexpected response structure:", response);
    }

    return response.user ? [response.user] : [];
  };

  useEffect(() => {
    // Ensure the values are always numbers
    const calculatedTotalSum = Number(
      HandlePromo === false
        ? PackagePrices + adultadiPrices + adPrice
        : PromoData?.total_amount !== undefined
        ? PromoData.total_amount
        : PackagePrices + adultadiPrices
    );

    // Check if it's a valid number before setting state
    if (!isNaN(calculatedTotalSum)) {
      setTotalSum(calculatedTotalSum);

      // Calculate tax
      const calculatedTax = calculatedTotalSum * taxRate;
      setTaxAmount(calculatedTax);
      setFormattedTaxAmount(calculatedTax.toFixed(2));

      if (Object.keys(Discount).length > 0) {
        setTotalPaidAmount(Discount?.total_amount);
      } else {
        setTotalPaidAmount(calculatedTotalSum.toFixed(2));
      }
    } else {
      console.error("Invalid totalSum value:", calculatedTotalSum);
    }
  }, [
    PackagePrices,
    adultadiPrices,
    adPrice,
    HandlePromo,
    PromoData,
    Discount,
  ]);

  // for form sunmiter button onclick event

  const handlePromoSubmit = async () => {
    FetchPromoApi();
    // setShowbtnName(true);
  };

  const handlePromoremove = () => {
    if (HandlePromo) {
      // If a promo is applied
      setHandlePromo(false); // Remove the promo
      showSuccessToast(translate, "Promo removed successfully");
      setDiscount(0); // Reset the discount
      setTotalPaidAmount(SubTotal);
    } else {
      showErrorToast(translate, "No promo to remove");
    }

    setShowbtnName(false); // Hide the remove button after promo is removed
  };

  useEffect(() => {
    if (LoginCheck === true && newdata === null) {
      fetchProfile();
      return;
    }

    const BackAdultData = localStorage.getItem("AllAdultsData");
    const LoginAdultData = localStorage.getItem("LoginUserData");
    const PrevTotal = JSON.parse(localStorage.getItem("BookingTotal"));
    const PrevService = JSON.parse(localStorage.getItem("AdditionalServices"));

    console.log(JSON.parse(LoginAdultData), "LoginAdultData");
    console.log(JSON.parse(BackAdultData), "BackAdultData");

    // setUserData(JSON.parse(LoginAdultData));

    let parsedAdultData = null;
    let parsedLoginData = null;

    if (
      PrevTotal &&
      PrevTotal !== "undefined" &&
      Object.keys(PrevTotal.Discount).length > 0
    ) {
      setDiscount(PrevTotal.Discount);
      setTotalPaidAmount();
      setShowbtnName(true);
      setHandlePromo(true);
      setpromo(PrevTotal?.Discount?.coupon_name);
    }

    try {
      if (BackAdultData && BackAdultData !== "undefined") {
        parsedAdultData = JSON.parse(BackAdultData);
      }
      if (PrevService && PrevService !== "undefined") {
        setAdditional(PrevService);
      }
    } catch (error) {
      console.error("Error parsing userData:", error);
      return;
    }

    // If no BackAdultData, return early
    if (!parsedAdultData) return;

    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (!updatedValues["Adult"]) updatedValues["Adult"] = [];

      // Use BackAdultData for setting values
      parsedAdultData?.Adult?.forEach((e, i) => {
        updatedValues["Adult"][i] = {
          ...updatedValues["Adult"][i],
          name: e.name,
          surname: e.surname,
          birthday: e.birthday,
          city: e.city,
          email: e.email,
          gender: e.gender,
          houseNumber: e.houseNumber,
          mobile: e.mobile,
          nationality: e.nationality,
          street: e.street,
          zipcode: e.zipcode,
          services: e.services || [],
          selectedPrices: e.selectedPrices || [],
          selectedServices: e.selectedServices || [],
        };

        // Ensure services-related selections are updated
        if (e.services?.length > 0) {
          e.services.forEach((additional) => {
            const serviceValue = `Adult-${i}-${additional.additional_order}-ad-${additional.additional_price_id}-${additional.title}`;
            updatedValues["Adult"][i].selectedServices.push(serviceValue);
            updatedValues["Adult"][i].selectedPrices.push(additional.price);
          });
        }
      });

      parsedAdultData?.Child?.forEach((e, i) => {
        updatedValues["Child"] = updatedValues["Child"] || [];
        updatedValues["Child"][i] = {
          ...updatedValues["Child"][i],
          name: e.name,
          surname: e.surname,
          birthday: e.birthday,
          city: e.city,
          email: e.email,
          gender: e.gender,
          houseNumber: e.houseNumber,
          mobile: e.mobile,
          nationality: e.nationality,
          street: e.street,
          zipcode: e.zipcode,
        };
      });

      parsedAdultData?.Baby?.forEach((e, i) => {
        updatedValues["Baby"] = updatedValues["Baby"] || [];
        updatedValues["Baby"][i] = {
          ...updatedValues["Baby"][i],
          name: e.name,
          surname: e.surname,
          birthday: e.birthday,
          city: e.city,
          email: e.email,
          gender: e.gender,
          houseNumber: e.houseNumber,
          mobile: e.mobile,
          nationality: e.nationality,
          street: e.street,
          zipcode: e.zipcode,
        };
      });

      return updatedValues;
    });
  }, [LoginCheck, newdata]);

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return today.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
  };

  const renderForms = (type, count) => {
    const fields = {
      Adult: [
        {
          label: translate("Name"),
          type: "text",
          name: "name",
        },
        {
          label: translate("Surname"),
          type: "text",
          name: "surname",
          value: userData?.surname,
        },
        {
          label: translate("Email"),
          type: "email",
          name: "email",
          value: userData?.email,
        },
        {
          label: translate("Phone"),
          type: "number",
          name: "mobile",
          value: userData?.mobile,
        },
        {
          label: translate("City"),
          type: "text",
          name: "city",
          value: userData?.city,
        },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: [translate("Male"), translate("Female"), translate("Other")],
          value: userData?.gender,
        },
        {
          label: translate("Birthday Date"),
          type: "date",
          name: "birthday",
          value: userData?.birthday,
        },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: nationalities,
          value: userData?.nationality,
        },
        {
          label: translate("House No"),
          type: "text",
          name: "houseNumber",
          value: userData?.houseNumber,
        },
        {
          label: translate("ZIP Code"),
          type: "text",
          name: "zipcode",
          value: userData?.zipcode,
        },
        {
          label: translate("Street"),
          type: "text",
          name: "street",
          value: userData?.street,
        },
      ],
      adultFieldsForExtraAdults: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: [translate("Male"), translate("Female"), translate("Other")],
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
          options: [translate("Male"), translate("Female"), translate("Other")],
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
          options: [translate("Male"), translate("Female"), translate("Other")],
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

      return (
        <div key={`${type}-${i}`} className="row">
          <div className="form_1 mx-auto">
            <div className="px-50 py-5 yellow_bg">
              <p>
                <span>
                  <FaUser />
                </span>
                <span>
                  <b>{`${i + 1}. ${translate(
                    type.charAt(0).toUpperCase() + type.slice(1)
                  )} ${translate("Information")}`}</b>
                </span>
              </p>
              <p>
                <span>
                  <MdError />
                </span>
                <span>
                  {translate("Is Also The Contact Person For The Reservation.")}
                </span>
              </p>
            </div>

            <div className="y-gap-30 contactForm px-20 py-20">
              <div className="my-3 row">
                {currentFields?.map((field, index) => {
                  const fieldValue =
                    LoginCheck === true &&
                    type === "Adult" &&
                    newdata === null &&
                    i === 0
                      ? formValues[type]?.[i]?.[field.name]
                      : formValues[type]?.[i]?.[field.name];

                  return (
                    <div key={index} className="col-md-6">
                      <div className="form-input my-1">
                        {/* {field.type === "select" ? (
                          <>
                            <select
                              name={field.name}
                              value={fieldValue || ""}
                              onChange={(e) =>
                                handleInputChange(type, i, e, field.type)
                              }
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

                            <label className="lh-1 text-16 text-light-1 dd_l_top10">
                              {
                                // fieldValue
                                //   ? `${field.label}: ${
                                //       fieldValue.charAt(0).toUpperCase() +
                                //       fieldValue.slice(1)
                                //     }`
                                //   :
                                field.label
                              }{" "}
                              <span className="text-red">*</span>
                            </label>
                          </>
                        ) : (
                          <>
                            <input
                              type={field.type}
                              name={field.name}
                              value={fieldValue || ""}
                              onChange={(e) =>
                                handleInputChange(type, i, e, field.type)
                              }
                              maxLength={
                                field.type == "number" ? 15 : undefined
                              }
                              max={
                                field.type == "date"
                                  ? getTodayDate()
                                  : undefined
                              }
                              required
                            />

                            <label className="lh-1 text-16 text-light-1">
                              {field.label === "Phone" ? (
                                <>
                                  {field.label}
                                  {ShowPhoneError && (
                                    <span style={{ color: "red" }}>
                                      {ShowPhoneError}
                                    </span>
                                  )}
                                </>
                              ) : (
                                field.label
                              )}{" "}
                              <span className="text-red">*</span>
                            </label>
                          </>
                        )} */}
                        {field.type === "select" ? (
                          <>
                            <select
                              name={field.name}
                              value={fieldValue || ""}
                              onChange={(e) =>
                                handleInputChange(type, i, e, field.type)
                              }
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

                            <label className="lh-1 text-16 text-light-1 dd_l_top10">
                              {field.label} <span className="text-red">*</span>
                            </label>
                          </>
                        ) : field.type === "number" ? (
                          <>
                            <PhoneInput
                              country={countryCode}
                              value={fieldValue}
                              onChange={(e) =>
                                handleInputChange(
                                  type,
                                  i,
                                  { target: { name: "mobile", e } },
                                  "phone"
                                )
                              }
                              inputProps={{
                                name: "mobile",
                                required: true,
                                autoFocus: true,
                              }}
                              inputClass="phonenumber_input"
                              containerStyle={{
                                width: "100%",
                                marginBottom: "10px",
                                backgroundColor: "white",
                              }}
                              inputStyle={{
                                width: "100%",
                                padding: "12px 45px",
                                borderRadius: "4px",
                                border: "1px solid #E7E6E6",
                                fontSize: "16px",
                                boxSizing: "border-box",
                                backgroundColor: "white",
                              }}
                              className="form-input"
                              enableSearch={true}
                            />
                            <label className="phone_lable">
                              {translate("Phone")}
                              <span className="text-red"> *</span>
                            </label>
                          </>
                        ) : (
                          <>
                            <input
                              type={field.type}
                              name={field.name}
                              value={fieldValue || ""}
                              onChange={(e) =>
                                handleInputChange(type, i, e, field.type)
                              }
                              maxLength={
                                field.type === "number" ? 15 : undefined
                              }
                              max={
                                field.type === "date"
                                  ? getTodayDate()
                                  : undefined
                              }
                              onFocus={
                                field.type === "date"
                                  ? handleDateFocus
                                  : undefined
                              }
                              onKeyDown={(e) => {
                                field.type == "date" ? e.preventDefault() : "";
                              }}
                              required
                            />
                            <label className="lh-1 text-16 text-light-1">
                              {field.label === "Phone" ? (
                                <>
                                  {field.label}
                                  {ShowPhoneError && (
                                    <span style={{ color: "red" }}>
                                      {ShowPhoneError}
                                    </span>
                                  )}
                                </>
                              ) : (
                                field.label
                              )}{" "}
                              <span className="text-red">*</span>
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
                    {translate("Possible Additional Services Per Person:")}
                  </h5>
                  <div>
                    {AdditionalServices?.map((option, idx) => (
                      <div
                        key={option.id}
                        className="d-flex items-center justify-between radio_hight"
                      >
                        <div className="flex items-center">
                          <div className="form-checkbox flex items-center ">
                            <input
                              type="checkbox"
                              id={`checkbox-${type}-${i}-${idx}`}
                              name={`checkboxGroup-${type}-${i}-${idx}`}
                              checked={formValues[type]?.[
                                i
                              ]?.selectedServices?.includes(
                                `${type}-${i}-${idx}-ad-${option.id}-${option.title}`
                              )}
                              onChange={(e) => {
                                const isChecked = e.target.checked;

                                handleCheckboxChange(
                                  e,
                                  type,
                                  i,
                                  idx,
                                  option.price,
                                  option.additinoal_order,
                                  option.title,
                                  option.id,
                                  isChecked
                                );
                              }}
                            />
                            <label
                              htmlFor={`checkbox-${type}-${i}-${idx}`}
                              className="form-checkbox__mark"
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
                          <label
                            htmlFor={`checkbox-${type}-${i}-${idx}`}
                            className="lh-16 "
                          >
                            {option.title}
                          </label>
                        </div>

                        {/* <label htmlFor={`checkbox-${type}-${i}-${idx}`} className="form-checkbox__mark d-flex items-center">

    <div className="text-14 lh-1 ml-10">{option.title}</div>
  </label> */}

                        <div className="text-14">
                          + {formatPrice(option.price)}{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 col-md-12">
                  <h5 className="booking-form-price">
                    {translate("Subtotal")}{" "}
                    <span>{`${SubtotalPriceWithAdditional(type, i)} `}</span>
                  </h5>
                  <p className="text-right">
                    {translate("Including Taxes And Fee")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const bookingData = {
    AccessKey: "Mekka@24",
    user_id: LoginCheck === true ? (UserID.id !== null ? UserID.id : 0) : 0,
    tour_id: JSON.parse(TourId),
    person: JSON.stringify(formValues.Adult[0]),
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
    arrival: BookingSideBar?.Arrival?.value,
    adult_price: JSON.parse(adultData.length === 0 ? 0 : adultData[0]?.default),
    child_price: JSON.parse(
      Childrendata.length === 0 ? 0 : Childrendata[0]?.default
    ),
    baby_price: JSON.parse(babyData.length === 0 ? 0 : babyData[0]?.default),
    total: JSON.parse(PackagePrices + adultadiPrices + adPrice), // old value :- totalSum
    amount_paid: 0, // OLD VALUE :- JSON.parse(TotalPaidAmount)
    coupon_name: Discount?.coupon_name || "",
    coupon_amount: Discount?.Discount || 0,
    coupon_percentage: Discount?.percentage || 0,
    mekka_hotel: BookingSideBar.MakkaHotel?.hotel_id,
    madina_hotel: BookingSideBar.MadinaHotel?.hotel_id,
    flight_id: BookingSideBar.Airline?.id,
    exclude_flight: JSON.parse(ExcludeFlight),
    total_person: adultData.length + Childrendata.length + babyData.length,
    // tax: JSON.parse(formattedTaxAmount),
  };

  const handleUpdateLocalStorage = () => {
    const SidebarData = localStorage.getItem("PackageBookingData");
    if (SidebarData && SidebarData !== "undefined") {
      try {
        const BookingSideData = JSON.parse(SidebarData);

        // New price object to add
        const newPrice = {
          Total: PackagePrices + adultadiPrices + adPrice,
          SubTotal: totalSum,
          Tax: formattedTaxAmount,
          Amount_Paid: TotalPaidAmount,
          Discount: Discount,
          Promo: promo,
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
      } catch (error) {
        console.error("Error updating SidebarData:", error);
      }
    }
  };

  useEffect(() => {
    const calculatedSubTotal =
      Number(PackagePrices) + Number(adultadiPrices) + Number(adPrice);
    setSubTotal(calculatedSubTotal);
  }, [PackagePrices, adultadiPrices, adPrice]);

  const BookingTotal = {
    Discount: Discount,
    GrandTotal: TotalPaidAmount,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    localStorage.setItem("BookingData", JSON.stringify(bookingData));
    localStorage.setItem("AdditionalServices", JSON.stringify(Additional));
    localStorage.setItem("AllAdultsData", JSON.stringify(formValues));
    // localStorage.setItem("LoginUserData", JSON.stringify(userData));
    localStorage.setItem("BookingTotal", JSON.stringify(BookingTotal));

    handleUpdateLocalStorage();

    setTimeout(() => {
      setIsLoading(false);
      router.push("/payment");
    }, 2000);
  };

  const handleExternalButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // This triggers form submission
    }
  };

  const { translate } = useTranslation();

  const discountClass =
    Object.keys(Discount).length === 0 || Discount == 0 ? "d-none" : "d-block";

  return (
    <>
      <section className="layout-pt-md layout-pb-lg mt-header">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-11 mx-auto px-0">
              <div
                className={
                  LoginCheck === true
                    ? "d-none"
                    : "d-block bg-white rounded-12  py-15"
                }
              >
                <div>
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
                    "Book With Your Saved Details or Continue As a Guest To Book Your Travel."
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
                          {isLoading ? (
                            // <div
                            //   className="d-flex justify-content-center align-items-center"
                            //   style={{ height: "30px", width: "100%" }}
                            // >
                            //   <ClipLoader color="#ffffff" size={30} />
                            // </div>
                            <span>Loading.....</span>
                          ) : (
                            translate("Proceed to Payment")
                          )}

                          {/* {translate("Proceed to Payment")} */}
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
                      height={100}
                      src={BookingSideBar.TourThumbnail}
                      alt="image"
                      className="object-cover max-h-100"
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
                        BookingSideBar.selectedCheckbox !== false ||
                        BookingData?.Tour_Details?.tour_details
                          ?.flight_included == "0"
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
                          {BookingSideBar?.Airline?.airline_name}
                        </div>
                      </div>
                    </div>

                    {/* <div className="d-flex items-center justify-content-space-arround">
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
                    </div> */}

                    <div
                      className={`${
                        BookingSideBar.selectedCheckbox !== false ||
                        BookingData?.Tour_Details?.tour_details
                          ?.flight_included == "0"
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
                        {translate("Arrival")}: {BookingSideBar?.Arrival?.name}
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdDateRange size={25} color="#DAC04F" />
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
                        {/* {BookingSideBar?.OfferedLanguages} */}
                        {BookingSideBar?.OfferedLanguages?.length > 0
                          ? BookingSideBar.OfferedLanguages.join(", ")
                          : translate("No Languages Available")}
                      </div>
                    </div>

                    {/* {BookingSideBar?.Airline !== null || BookingSideBar?.Airline !== "" && ( */}
                    <div
                      className={
                        BookingSideBar?.selectedCheckbox !== true
                          ? "d-block"
                          : "d-none"
                      }
                    >
                      <div className="d-flex items-center justify-content-space-arround">
                        <div className="mr-5">
                          <FaLuggageCart size={25} color="#DAC04F" />
                        </div>
                        <div className="text-start">
                          {translate("Max Luggage Per Person")} :{" "}
                          {BookingSideBar?.MaxLuggagePerPerson === 0
                            ? "  "
                            : BookingSideBar?.MaxLuggagePerPerson}{" "}
                          kg
                        </div>
                      </div>
                    </div>
                    {/* )} */}

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Mekka : {BookingSideBar?.MakkaHotel?.hotel_name} -{" "}
                        <span className="items-cen">
                          (<FaStar color="#dabf4f" className="" />{" "}
                          {BookingSideBar?.mekkaHotelStar})
                        </span>
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Madina : {BookingSideBar?.MadinaHotel?.hotel_name} -{" "}
                        <span className="items-cen">
                          (<FaStar color="#dabf4f" className="" />{" "}
                          {BookingSideBar?.MadinaHotlStar})
                        </span>
                      </div>
                    </div>

                    <p className="text-12">
                      (
                      {translate(
                        "The Standard Offer May Include a Multi-Bed Room"
                      )}
                      .)
                    </p>
                  </div>

                  <div className="line mt-10 mb-10"></div>

                  <div className="">
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Subtotal")}</div>
                      <div className=""> {formatPrice(SubTotal)} </div>
                    </div>

                    <div className={discountClass}>
                      <div className={`d-flex items-center justify-between `}>
                        <div className="fw-500">
                          {translate("Discount")} {`(${Discount.coupon_name})`}
                        </div>
                        <div className="">
                          {" "}
                          - {formatPrice(Discount.Discount)}{" "}
                        </div>
                      </div>
                    </div>

                    {/* <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Tax")}(19%)</div>
                      <div className=""> {formattedTaxAmount} € </div>
                    </div> */}

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Grand Total")} </div>
                      <div className=""> {formatPrice(TotalPaidAmount)} </div>
                    </div>
                  </div>

                  <hr />

                  <div className="bg-white rounded-12 shadow-2 py-0 px-0 md:py-10 md:px-20 mt-10 promo ">
                    <h2 className="text-20 fw-500 min-prom ">
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
                            className="button px-40 py-10 -info-2 bg-accent-1 text-white col-2 ml-10 text-end"
                            onClick={handlePromoSubmit}
                            // style={{ whiteSpace: "nowrap" }}
                          >
                            {translate("Apply")}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="button px-40 py-10 -info-2 bg-accent-1 text-white col-2 ml-10 text-end"
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
                      {isLoading ? (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "30px", width: "100%" }}
                        >
                          <ClipLoader color="#ffffff" size={30} />
                        </div>
                      ) : (
                        translate("Proceed to Payment")
                      )}
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
          id="signInModal"
        >
          <section className="pb-20">
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

            <Login
              classfor={`col-12 model-height-90`}
              sectionClass={` `}
              hide={false}
              path={`/tour`}
              bookingPage={true}
            />
          </section>
        </Modal>
      </div>
    </>
  );
}
