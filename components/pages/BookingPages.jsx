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
import index from "react-translated";

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
  const [RoomData, setRoomData] = useState([]);
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
    setRoomData(BookingData?.Tour_Details?.tour_rooms);
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

  const [Additional, setAdditional] = useState([]);
  const [RoomPrice, setRoomPrice] = useState([]);

  const getdefaultPriceforType = (type, idx) => {
    const personPrice = AlladultsData?.filter((item) => item.label === type);

    if (!personPrice) {
      return 0; // Default value if no price is found
    }
    return formatPrice(Number(personPrice[idx]?.default)); // Ensure price is a number
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

    const PrAduRomm = RoomPrice.filter(
      (item) => item.category === type && item.index === i
    ).map((item) => Number(item.price) || 0);

    console.log(PrAduRomm, "PrAduRomm");

    const PrefPrice = existingItemsState;

    const additionalPrice = updatePrice.reduce(
      (acc, curr) => acc + (isNaN(Number(curr)) ? 0 : Number(curr)),
      0
    );

    const addiroom = PrAduRomm.reduce(
      (acc, curr) => acc + (isNaN(Number(curr)) ? 0 : Number(curr)),
      0
    );

    const conformSubTotal =
      (isNaN(Number(Original)) ? 0 : Number(Original)) +
      additionalPrice +
      addiroom;

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

  const AddRoomPrice = RoomPrice.map((item) => Number(item.price)).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  console.log(AddRoomPrice, "AddRoomPrice");

  const FetchPromoApi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      coupon_code: promo,
      total_amount: PackagePrices + adultadiPrices + adPrice + AddRoomPrice,
      email: LoginCheck === true ? userData.email : formValues.Adult[0]?.email,
      user_id: LoginCheck === true ? (UserID.id !== null ? UserID.id : 0) : 0,
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

  // for dynamic forms
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
      selectedService: [], // Add field for storing selected service
      price: "",
      title: "",
      additional_services: "",
      services: [],
      tour_room_id: "0",
    }),
    Child: initializeFormValues(Childrendata?.length || 0, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
      selectedService: [], // Add field for storing selected service
      price: "",
      title: "",
      additional_order: "",
      additional_price_id: "",
      services: [],
      tour_room_id: "0",
    }),
    Baby: initializeFormValues(babyData.length || 0, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
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
    selectedService: [], // Add field for storing selected service
    price: "",
    title: "",
    additional_order: "",
    additional_price_id: "",
    services: [],
    tour_room_id: "0",
  });

  useEffect(() => {
    setFormValues({
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
        selectedService: [],
        price: "",
        title: "",
        additional_services: "",
        services: [],
        tour_room_id: "0",
      }),
      Child: initializeFormValues(Childrendata?.length || 0, {
        name: "",
        surname: "",
        gender: "",
        birthday: "",
        nationality: "",
        selectedService: [],
        price: "",
        title: "",
        additional_order: "",
        additional_price_id: "",
        services: [],
        tour_room_id: "0",
      }),
      Baby: initializeFormValues(babyData?.length || 0, {
        name: "",
        surname: "",
        gender: "",
        birthday: "",
        nationality: "",
      }),
      selectedServicePrices: [],
    });
  }, [adultData, Childrendata, babyData]);

  const handleInputChange = (type, index, e, ftype) => {
    let { name, value } = e.target;

    if (ftype === "phone" && name === "mobile") {
      value = e.target.value;
      console.log(value, "value");
    }

    // ✅ If it's the first Adult (index 0) and user is logged in, store in userData instead
    if (LoginCheck === true && type === "Adult" && index === 0) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
      return; // Skip updating formValues for Adult[0]
    }

    // ✅ Continue updating formValues normally
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (!updatedValues[type]) {
        updatedValues[type] = [];
      }

      if (!updatedValues[type][index]) {
        updatedValues[type][index] = {};
      }

      updatedValues[type][index] = {
        ...updatedValues[type][index],
        [name]: value,
      };

      return updatedValues;
    });
  };

  const handleCheckboxChange = (checked, type, i, option, name) => {
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };

      if (type !== "Adult" && type !== "Child") return updatedValues; // Skip Baby

      if (!updatedValues[type]) updatedValues[type] = [];
      if (!updatedValues[type][i]) {
        updatedValues[type][i] = {
          services: [], // Store as a JSON string
          selectedServices: [],
        };
      }

      console.log(option, "option");

      if (LoginCheck === true && type === "Adult" && i === 0) {
        let selectedServicesArray = userData?.selectedServices || [];
        let servicesArray = userData?.services || []; // Parse JSON
        let addiDataArray = [...(Additional || [])];

        console.log(option, "option");

        if (checked) {
          if (!selectedServicesArray.includes(name)) {
            const newService = {
              title: option.title,
              price: option.price,
              additional_order: option.additinoal_order || "",
              additional_price_id: option.id,
            };

            const addiData = {
              id: option.id,
              type,
              title: option.title,
              price: option.price,
              order: option.additinoal_order || "",
              index: i,
            };

            servicesArray.push(JSON.stringify(newService));
            selectedServicesArray.push(name);

            if (
              !addiDataArray.some(
                (item) =>
                  item.id === option.id &&
                  item.index === i &&
                  item.type === type
              )
            ) {
              addiDataArray.push(addiData);
            }
          }
        } else {
          servicesArray = servicesArray.filter(
            (service) => JSON.parse(service).additional_price_id !== option.id
          );
          selectedServicesArray = selectedServicesArray.filter(
            (serviceName) => serviceName !== name
          );

          addiDataArray = addiDataArray.filter(
            (service) =>
              !(
                service.id === option.id &&
                service.index === i &&
                service.type === type
              )
          );
        }

        // ✅ Store `services` as ["{},{},{}"] format
        setUserData((prevUserData) => ({
          ...prevUserData,
          services: servicesArray, // Store array of strings
          selectedServices: selectedServicesArray,
        }));

        setAdditional(addiDataArray);
        return updatedValues;
      }

      // ✅ Continue usual logic for other cases
      let selectedServicesArray =
        formValues?.[type]?.[i]?.selectedServices || [];
      let servicesArray = formValues?.[type]?.[i]?.services || [];
      let addiDataArray = [...(Additional || [])];

      if (checked) {
        if (!selectedServicesArray.includes(name)) {
          const newService = JSON.stringify({
            title: option.title,
            price: option.price,
            additional_order: option.additinoal_order || "",
            additional_price_id: option.id,
          });

          const addiData = {
            id: option.id,
            type,
            title: option.title,
            price: option.price,
            order: option.additinoal_order || "",
            index: i,
          };

          servicesArray.push(newService);
          selectedServicesArray.push(name);

          if (
            !addiDataArray.some(
              (item) =>
                item.id === option.id && item.index === i && item.type === type
            )
          ) {
            addiDataArray.push(addiData);
          }
        }
      } else {
        servicesArray = servicesArray.filter(
          (service) => JSON.parse(service).additional_price_id !== option.id
        );
        selectedServicesArray = selectedServicesArray.filter(
          (serviceName) => serviceName !== name
        );

        addiDataArray = addiDataArray.filter(
          (service) =>
            !(
              service.id === option.id &&
              service.index === i &&
              service.type === type
            )
        );
      }

      setAdditional(addiDataArray);
      updatedValues[type][i].services = servicesArray; // ✅ Store as ["{},{},{}"] format
      updatedValues[type][i].selectedServices = selectedServicesArray;

      return updatedValues;
    });
  };

  // const handleRoomSelection = (category, index, roomId, price) => {
  //   if (LoginCheck === true && category === "Adult" && index === 0) {
  //     console.log("Condition was true");

  //     setUserData((prevUserData) => ({
  //       ...prevUserData,
  //       tour_room_id: roomId,
  //       room_price: price,
  //     }));
  //   } else {
  //     setFormValues((prevValues) => {
  //       const updatedValues = { ...prevValues };

  //       // Ensure category exists as an array
  //       if (!Array.isArray(updatedValues[category])) {
  //         updatedValues[category] = [];
  //       }

  //       // Ensure the specific index exists
  //       updatedValues[category] = updatedValues[category].map((item, i) =>
  //         i === index ? { tour_room_id: roomId, room_price: price } : item
  //       );

  //       // If the index does not exist, create a new entry
  //       if (!updatedValues[category][index]) {
  //         updatedValues[category][index] = {
  //           tour_room_id: roomId,
  //           room_price: price,
  //         };
  //       }

  //       return updatedValues;
  //     });
  //   }
  // };

  const handleRoomSelection = (category, index, roomId, price) => {
    if (LoginCheck === true && category === "Adult" && index === 0) {
      console.log("Condition was true");

      setUserData((prevUserData) => ({
        ...prevUserData,
        tour_room_id: roomId,
      }));
    } else {
      setFormValues((prevValues) => {
        const updatedValues = { ...prevValues };

        // Ensure category exists as an array
        if (!Array.isArray(updatedValues[category])) {
          updatedValues[category] = [];
        }

        // Ensure the specific index exists and remove room_price
        updatedValues[category] = updatedValues[category].map((item, i) =>
          i === index ? { tour_room_id: roomId } : item
        );

        // If the index does not exist, create a new entry without room_price
        if (!updatedValues[category][index]) {
          updatedValues[category][index] = {
            tour_room_id: roomId,
          };
        }

        return updatedValues;
      });
    }
    setRoomPrice((prevRoomPrice) => {
      const updatedRoomPrice = [...prevRoomPrice];

      // Check if the index already exists in the array
      // const existingIndex = updatedRoomPrice.findIndex(
      //   (item) => item.index === index
      // );

      updatedRoomPrice.push({ index, price, category });

      // if (existingIndex !== -1) {
      //   // Update existing entry
      // } else {
      //   // Add new entry
      // }

      return updatedRoomPrice;
    });
  };

  console.log(formValues, "formValues");
  console.log(userData, "userData");
  console.log(RoomPrice, "RoomPrice");

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
        // Set userData state with fetched profile data
        setUserData({
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
          additional_order: userProfile.additional_order || "",
          additional_price_id: userProfile.additional_price_id || "",
        });
      }
    } else {
      console.error("Unexpected response structure:", response);
    }

    return response.user ? [response.user] : [];
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
                  // ✅ Ensuring userData is used for first Adult when LoginCheck is true
                  const fieldValue =
                    LoginCheck === true && type === "Adult" && i === 0
                      ? userData?.[field.name] // Always use userData for first Adult
                      : formValues[type]?.[i]?.[field.name];

                  return (
                    <div key={index} className="col-md-6">
                      <div className="form-input my-1">
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
                                  { target: { name: "mobile", value: e } },
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
                                if (field.type === "date") e.preventDefault();
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
                    {translate("Selecte Bed-Room Per Person")}
                  </h5>
                  <div>
                    {RoomData?.map((e, ind) => {
                      return (
                        <div
                          className="d-flex item-center justify-content-between"
                          key={ind}
                        >
                          <div className="d-flex items-center mx-2">
                            <div className="form-radio d-flex items-center">
                              <label className="radio d-flex items-center lts-gap-10">
                                <input
                                  type="radio"
                                  name={`roomSelection-${type}-${i}`}
                                  value={e.rooms}
                                  checked={
                                    LoginCheck === true &&
                                    type === "Adult" &&
                                    i === 0
                                      ? userData.tour_room_id === e.id
                                      : formValues[type]?.[i]?.tour_room_id ===
                                        e.id
                                  }
                                  onChange={() =>
                                    handleRoomSelection(
                                      type,
                                      i,
                                      e.id,
                                      e.room_price
                                    )
                                  }
                                />
                                <span className="radio__mark">
                                  <span className="radio__icon"></span>
                                </span>
                                <span className="text-14 lh-16 lts-bk-lable">
                                  {e.rooms} ({e.capacity})
                                </span>
                              </label>
                            </div>
                          </div>
                          <p>
                            {e.room_price == "0"
                              ? "inclusive"
                              : `+ ${formatPrice(e.room_price)}`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <hr />
                  <h5 className="text-18 fw-500 my-2">
                    {translate("Possible Additional Services Per Person:")}
                  </h5>
                  <div>
                    {AdditionalServices?.map((option, idx) => {
                      const checkboxName = `checkboxGroup-${type}-${i}-${idx}`;

                      const selectedServicesArray =
                        LoginCheck === true && type === "Adult" && i === 0
                          ? userData?.selectedServices || []
                          : formValues?.[type]?.[i]?.selectedServices || [];

                      const isChecked =
                        selectedServicesArray.includes(checkboxName);

                      return (
                        <div
                          key={option.id}
                          className="d-flex items-center justify-between radio_hight"
                        >
                          <div className="flex items-center">
                            <div className="form-checkbox flex items-center">
                              <input
                                type="checkbox"
                                id={checkboxName}
                                name={checkboxName}
                                checked={isChecked}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    e.target.checked,
                                    type,
                                    i,
                                    option,
                                    checkboxName
                                  )
                                }
                              />
                              <label
                                htmlFor={checkboxName}
                                className="form-checkbox__mark"
                              >
                                <div className="form-checkbox__icon">
                                  <svg
                                    width="10"
                                    height="8"
                                    viewBox="0 0 10 8"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                              </label>
                            </div>
                            <label htmlFor={checkboxName} className="lh-16">
                              {option.title}
                            </label>
                          </div>
                          <div className="text-14">
                            {option.price == "0"
                              ? "Inclusive"
                              : `+ ${formatPrice(option.price)}`}
                          </div>
                        </div>
                      );
                    })}
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

  // all booking priceing count

  useEffect(() => {
    // Ensure the values are always numbers
    const calculatedTotalSum = Number(
      HandlePromo === false
        ? PackagePrices + adultadiPrices + adPrice + AddRoomPrice
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
    AddRoomPrice,
    HandlePromo,
    PromoData,
    Discount,
  ]);

  // for counpon and descount section

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

  // for payment page to booking oage redirect hook

  useEffect(() => {
    if (LoginCheck === true && newdata === null) {
      fetchProfile();
      return;
    }
  }, [LoginCheck, newdata]);

  useEffect(() => {
    if (newdata === null) return; // Stop execution if newdata is null

    const LoginAdultData = localStorage.getItem("LoginUserData");
    const BackAdultData = localStorage.getItem("AllAdultsData");
    const PrevTotal = JSON.parse(localStorage.getItem("BookingTotal") || "{}");
    const PrevService = JSON.parse(
      localStorage.getItem("AdditionalServices") || []
    );

    let parsedAdultData = null;

    if (PrevTotal?.Discount && Object.keys(PrevTotal.Discount).length > 0) {
      setDiscount(PrevTotal.Discount);
      setTotalPaidAmount();
      setShowbtnName(true);
      setHandlePromo(true);
      setpromo(PrevTotal.Discount.coupon_name);
    }

    try {
      if (PrevService.length > 0) setAdditional(PrevService);

      parsedAdultData =
        LoginCheck && LoginAdultData
          ? JSON.parse(LoginAdultData)
          : BackAdultData
          ? JSON.parse(BackAdultData)
          : null;
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return;
    }

    if (!parsedAdultData) return;

    if (LoginCheck === true) {
      setUserData(() => {
        let updatedUser = {};
        try {
          updatedUser = JSON.parse(LoginAdultData);
        } catch (error) {
          console.error("Error parsing LoginAdultData:", error);
        }
        return updatedUser;
      });
    }

    setFormValues((prevValues) => {
      let updatedAdultData = [];
      let updatedChildData = [];

      try {
        updatedAdultData = JSON.parse(BackAdultData)["Adult"];
        updatedChildData = JSON.parse(BackAdultData)["Child"];
      } catch (error) {
        console.error("Error parsing BackAdultData:", error);
      }

      return {
        ...prevValues,
        Adult: updatedAdultData,
        Child: updatedChildData, // Ensure Child data (including services) is updated
      };
    });
  }, [LoginCheck, newdata]);

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return today.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
  };

  const bookingData = {
    AccessKey: "Mekka@24",
    user_id: LoginCheck === true ? (UserID.id !== null ? UserID.id : 0) : 0,
    tour_id: JSON.parse(TourId),
    person: JSON.stringify(
      LoginCheck === true ? userData : formValues.Adult[0]
    ),
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
    total: JSON.parse(PackagePrices + adultadiPrices + adPrice + AddRoomPrice), // old value :- totalSum
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
          Total: PackagePrices + adultadiPrices + adPrice + AddRoomPrice,
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
      Number(PackagePrices) +
      Number(adultadiPrices) +
      Number(adPrice) +
      Number(AddRoomPrice);

      
    setSubTotal(calculatedSubTotal);
  }, [PackagePrices, adultadiPrices, adPrice, AddRoomPrice]);

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
    localStorage.setItem("LoginUserData", JSON.stringify(userData));
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
