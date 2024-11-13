"use client";

import Header from "@/components/dasboard/Header";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/pages/contact/Map";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import CreatableSelect from "react-select/creatable";
import { FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import $, { get } from "jquery";
import "select2/dist/css/select2.css";
import { useTranslation } from "@/app/context/TranslationContext";
import { toast, ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import ItineraryDayInput from "@/components/dasboard/addTour/ItineraryDayInput";
import { POST } from "@/app/utils/api/post";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { ClipLoader } from "react-spinners";
import draftToHtml from "draftjs-to-html";
import VendorFooter from "@/components/dasboard/VendorFooter";
import { useRouter } from "next/navigation";
import Useauthredirect from "@/app/hooks/useAuthRedirect";
import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";


const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const tabs = [
  "Content",
  "Pricing",
  "Included",
  "Overview",
  "Itinerary",
  "Flight Hotel And Visa",
];
const handleHotelPriceChange = (e, index) => {
  const value = e.target.value;
  if (!/^[0-9]+$/.test(value)) {
    // Display an error message
    console.error("Invalid hotel price");
  } else {
    setMekkaRows(prevRows => {
      const newRows = [...prevRows];
      newRows[index].hotel_price = value;
      return newRows;
    });
  }
};

export default function AddTour() {
  const { user } = useAuthContext();
  const numberInputRef1 = useRef(null);
  const numberInputRef2 = useRef(null);
  const numberInputRef3 = useRef(null);
  const numberInputRef4 = useRef(null);
  const numberInputRef5 = useRef(null);
  const numberInputRef6 = useRef(null);
  const numberInputRef7 = useRef(null);
  const numberInputRef8 = useRef(null);
  const numberInputRef9 = useRef(null);
  const numberInputRef10 = useRef(null);
  const numberInputRef11 = useRef(null);

  // Function to disable scrolling on number inputs
  const disableScroll = (event) => {
    event.preventDefault(); // Prevent scrolling
  };

  const router = useRouter();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [SelectedTour, setSelectedTour] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date_begin, setDateBegin] = useState("");
  const [date_end, setDateEnd] = useState("");
  const [tour_languages, setTourLanguages] = useState("");

  const [adult_price, setAdultPrice] = useState("");
  const [gender, setGender] = useState("");
  const [child_price, setChildPrice] = useState("");
  const [baby_price, setBabyPrice] = useState("");
  const [activeTab, setActiveTab] = useState("Content");
  const [image1, setImage1] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [image2, setImage2] = useState([]);
  const [route_data, setRouteData] = useState([]);
  const [hotel_data, setHotelData] = useState([]);
  const [tour_included, setTourIncluded] = useState(0);
  const [tour_info, setTourInfo] = useState("");
  const [free_cancellation, setFreeCancellation] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isChecked, setIsChecked] = useState(false);
  const [price, setPrice] = useState("123");
  const [services, setServices] = useState([
    { id: 1, title: "1-bed room", price: "", checked: false },
    { id: 2, title: "2-bed room", price: "", checked: false },
    { id: 3, title: "3-bed room", price: "", checked: false },
    { id: 4, title: "4-bed room", price: "", checked: false },
  ]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [enabledTabs, setEnabledTabs] = useState([0]);
  const [visa_processing, setVisaProcessing] = useState(0);
  const [dayData, setDayData] = useState("");
  const [daysCount, setDaysCount] = useState(0);
  const [dayDescription, setDayDescription] = useState("");
  const [flightInformation, setFlightInformation] = useState("");
  const [included, setIncluded] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [mekkaRows, setMekkaRows] = useState([
    { hotel_name: null, hotel_price: "", hotel_info: "" },
  ]);
  const [madinaRows, setMadinaRows] = useState([
    { hotel_name: null, hotel_price: "", hotel_info: "" },
  ]);
  const [departureRows, setDepartureRows] = useState([
    { departure_id: "", price: "" },
  ]);

  const [arrivalrow, setArrivalrow] = useState([
    { arrival_id: "" },
  ]);

  const [flightRow, setFlightRow] = useState([
    { flight_id: " ", flight_amount: " ", no_of_stop: " ", luggage: "" },
  ]);

  const [mekkaHotel, setMekkaHotel] = useState([]);
  const [madinaHotel, setMadinaHotel] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [Arrival, setArrival] = useState([])
  const [flightDetails, setFlightDetails] = useState([]);
  const [tourType, setTourType] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [languagesData, setlanguagesData] = useState([]);
  const [radioValueVisa, setRadioValueVisa] = useState('No');
  const [radioValueExcludeFlight, setRadioValueExcludeFlight] = useState('No');
  const [radioValueFlight, setRadioValueFlight] = useState('No');

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minEndDate, setMinEndDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Add Tour - MekkaBooking";
    }
  }, []);
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleStartDateChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue) {
      setIsFocused(false);
    }
    setDateBegin(inputValue);

    const nextDay = new Date(inputValue);
    nextDay.setDate(nextDay.getDate() + 1);
    setMinDate(nextDay.toISOString().split("T")[0]);


  };

  const handleKeyUp = (e) => {
    setIsFocused(false)
  }

  const handleDateFocus = (e) => {
    // Ensure this is a user gesture
    if (e.target === document.activeElement) {
      e.target.showPicker();
    }
  };

  const handleFocus = (e) => {

  }
  // const handleStartDateKeyDown = (e) => {
  //   const inputValue = e.target.value;
  //   const dateParts = inputValue.split('-');
  //   console.log(dateParts,"dateParts")
  //   const selectedDate = getTodayDate();
  //   console.log(selectedDate,"selectedDate")
  //   setDateBegin(inputValue);
  //   const nextDay = new Date(selectedDate);
  //   nextDay.setDate(nextDay.getDate() + 1);
  //   setMinDate(nextDay.toISOString().split("T")[0]);

  // //   if (!/[\d-]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
  // //     e.preventDefault();
  // //     return;
  // // }
  // //     if (dateParts.length === 3) {
  // //       console.log("date")
  // //       const year = dateParts[0];
  // //       console.log(year,"year")
  // //       if (year.length < 4) {
  // //         return; // Allow typing in the year part
  // //       }else{
  // //         console.log("else part")
  // //           // Check if the year is greater than 2023
  // //           if (parseInt(year) <= 2023) {
  // //             console.error("Year must be greater than 2023");
  // //             setDateBegin("");
  // //             return; // Exit if the year is invalid
  // //           }

  // //           const minDate = getTodayDate();
  // //           console.log(minDate, "minDate");
  // //           console.log(selectedDate < minDate, "selectedDate < minDate");

  // //           if (selectedDate < minDate) {
  // //             setDateBegin(minDate);
  // //             setMinDate(minDate);
  // //           } else {

  // //           }
  // //         } 
  // //     }


  // };
  // const handleEndDateKeyDown = (e) => {
  //   const inputValue = e.target.value;
  //   const dateParts = inputValue.split('-');
  //   console.log(dateParts,"dateParts")

  //   setDateEnd(inputValue);



  // };

  const handleEndDateChange = (e) => {
    const inputValue = e.target.value;
    setDateEnd(inputValue);


    // if (dateParts.length === 3) {
    //   const day = dateParts[0];
    //   const month = dateParts[1];
    //   const year = dateParts[2];

    //   const selectedDate = new Date(`${year}-${month}-${day}`);
    //   const dateBegin = new Date(date_begin);

    //   if (dateBegin && selectedDate < dateBegin) {
    //     setDateEnd(dateBegin);
    //   } else {
    //     setDateEnd(inputValue);
    //   }
    // } else {
    //   setDateEnd(inputValue);
    // }
  };


  const handleStartDateBlur = () => {
    const [day, month, year] = date_begin.split('-');
    if (day && month && year) {
      const formattedDate = formatDateToMMDDYYYY(`${year}-${month}-${day}`);
      console.log(formattedDate, "formattedDate")
      setStartDate(formattedDate);

    }
  };

  const handleEndDateBlur = () => {
    const [day, month, year] = date_end.split('-');
    if (day && month && year) {
      const formattedDate = formatDateToMMDDYYYY(`${year}-${month}-${day}`);
      setDateEnd(formattedDate);
      const start_Date = new Date(date_begin);
      const endDate = new Date(date_end);
      const daysDifference = Math.round((endDate - start_Date) / (1000 * 3600 * 24));
      setDaysCount(daysDifference + 1)
    }
  };

  const { handleRedirect } = Useauthredirect();

  useEffect(() => {
    handleRedirect();
    // setIsLoading(false);
    accessdata()
  }, []);

  useEffect(() => {
    // Attach wheel event listeners to each input ref
    const refs = [
      numberInputRef1,
      numberInputRef2,
      numberInputRef3,
      numberInputRef4,
      numberInputRef5,
      numberInputRef6,
      numberInputRef7,
      numberInputRef8,
      numberInputRef9,
      numberInputRef10,
      numberInputRef11,
    ];

    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.addEventListener('wheel', disableScroll);
      }
    });

    // Cleanup event listeners on unmount
    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          ref.current.removeEventListener('wheel', disableScroll);
        }
      });
    };


  }, []);


  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsFocused(false);
    });
  }, [isFocused])

  const { translate } = useTranslation();



  useEffect(() => {


    setMinEndDate(getTodayDate());
  }, []);





  const accessdata = async () => {
    // setIsLoading(true);
    const url = "tour_data"

    try {
      const response = await POST.request({ url: url })
      // setIsLoading(false);
      if (response.Data) {
        setMekkaHotel(response.Data.mekka_hotels)
        setMadinaHotel(response.Data.medina_hotels)
        setFlightDetails(response.Data.airline)
        setTourType(response.Data.tour_type)
        setlanguagesData(response.Data.languages)
        setIncluded(response.Data.amenities)
        setDepartures(response.Data.departure)
        setArrival(response.Data.arrival)
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleTabClick = (tab, index) => {
    if (index < activeTabIndex) {
      setCanGoBack(true);
    } else {
      setCanGoBack(false);
    }

    setActiveTab(tab);
    setActiveTabIndex(index);

  };

  const handlePrevTab = () => {
    const prevTabIndex = activeTabIndex - 1;
    if (prevTabIndex >= 0) {
      setActiveTabIndex(prevTabIndex);
      setActiveTab(tabs[prevTabIndex]);
    }
  };

  const handleNextTab = () => {
    if (isCurrentTabValid()) {
      const nextTabIndex = activeTabIndex + 1;
      if (nextTabIndex < tabs.length) {
        setActiveTabIndex(nextTabIndex);
        setActiveTab(tabs[nextTabIndex]);
        setEnabledTabs((prevEnabledTabs) => [...prevEnabledTabs, nextTabIndex]);
      }
    } else {

      showErrorToast(translate, "Please fill in all required fields before proceeding");
    }

  }
  const handleDayDescriptionChange = (dayNumber, dayData, description) => {
    setRouteData((prevData) => {
      const updatedData = [...prevData];
      if (updatedData.length < dayNumber) {
        updatedData.push({ day: dayNumber, dayData, description });
      } else {
        updatedData[dayNumber - 1] = { day: dayNumber, dayData, description };
      }
      return updatedData;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setSideBarOpen(true);
      } else {
        setSideBarOpen(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setActiveTab(tabs[activeTabIndex]);
  }, [activeTabIndex]);
  const handleCheckboxChange = (event, id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, checked: event.target.checked } : service
    );
    setServices(updatedServices);
  };

  const handlePriceChange = (event, id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, price: event.target.value } : service
    );
    setServices(updatedServices);
  };



  const handleDeleteImage2 = (index, event) => {
    event.preventDefault();
    const newImages = [...image2];
    const newFiles = [...selectedFiles];

    // Remove the image from the state
    newImages.splice(index, 1);
    newFiles.splice(index, 1); // Remove corresponding file from selectedFiles

    setImage2(newImages);
    setSelectedFiles(newFiles); // Update selected files
  };
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };



  const handleImageChange2 = (event) => {
    const files = event.target.files;
    const uploadedImages = [...image2]; // Retain previously uploaded images
    const newFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadedImages.push(reader.result); // Append new image
        newFiles.push(file); // Track the new file for submission
        setSelectedFiles((prev) => [...prev, file]); // Update selected files
      };
      reader.readAsDataURL(file);
    }

    Promise.all(newFiles).then(() => {
      setImage2(uploadedImages); // Update state with all images
    });
  };

  const handleImageChange = (event, func) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        func(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };


  const HandleTourChange = (newValue, actionMeta) => {
    setSelectedTour(newValue);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const options = tourType.map((type) => ({
    value: type,
    label: `${type}`,
  }));

  const options2 = mekkaHotel.map((hotel) => ({
    value: hotel.id,
    label: `${hotel.hotel_name} (${hotel.hotel_stars} Star)`,
  }));

  const Madina = madinaHotel.map((hotel) => ({
    value: hotel.id,
    label: `${hotel.hotel_name} (${hotel.hotel_stars} Star)`,
  }));

  const departureOption = departures.map((departure) => ({
    value: departure.id,
    label: `${departure.departure}`,
  }));

  const ArrivalOption = Arrival?.map((arr) => ({
    value: arr.id,
    label: `${arr.arrival}`
  }))

  const ChooseFlight = flightDetails.map((flight) => ({
    value: flight.id,
    label: `${flight.airline_name}`,
  }));



  const handleAddMekkaRow = () => {
    setMekkaRows([
      ...mekkaRows,
      { hotel_name: null, hotel_price: "", hotel_info: "" },
    ]);
  };

  const handleRemoveMekkaRow = (index) => {
    if (mekkaRows.length === 1) {
      return;
    }
    const newRows = [...mekkaRows];
    newRows.splice(index, 1);
    setMekkaRows(newRows);
  };

  const handleAddMadinaRow = () => {
    setMadinaRows([
      ...madinaRows,
      { hotel_name: null, hotel_price: "", hotel_info: "" },
    ]);
  };

  const handleRemoveMadinaRow = (index) => {
    if (madinaRows.length === 1) {
      return;
    }
    const newRows = [...madinaRows];
    newRows.splice(index, 1);
    setMadinaRows(newRows);
  };

  const handleAddDepartureRow = () => {
    setDepartureRows([
      ...departureRows,
      { departure_id: "", price: "" },
    ]);
  };

  const handleAddArrivalRow = () => {
    setArrivalrow([
      ...arrivalrow,
      { arrival_id: "" },
    ]);
  };

  const handleRemoveDepartureRow = (index) => {
    if (departureRows.length === 1) {
      return;
    }
    const newRows = [...departureRows];
    newRows.splice(index, 1);
    setDepartureRows(newRows);
  };

  const handleRemoveArrivalRow = (index) => {
    if (arrivalrow.length === 1) {
      return;
    }
    const newRows = [...arrivalrow];
    newRows.splice(index, 1);
    setArrivalrow(newRows);
  };

  const handleMekkaChange = (value, index) => {
    if (!value) return;
    const selectedOption = mekkaHotel.find((option) => option.id === value.value);

    const mekkaData = {
      ...mekkaRows[index],
      hotel_id: selectedOption?.id || "",
      hotel_name: selectedOption?.hotel_name || "",
    };
    const newRows = [...mekkaRows];
    newRows[index] = mekkaData;
    setMekkaRows(newRows);
  };

  const handleMadinaChange = (value, index) => {
    if (!value) return;
    const selectedOption = madinaHotel.find((option) => option.id === value.value);

    const madinaData = {
      ...madinaRows[index],
      hotel_id: selectedOption?.id || "",
      hotel_name: selectedOption?.hotel_name || "",
    };
    const newRows = [...madinaRows];
    newRows[index] = madinaData;
    setMadinaRows(newRows);

  };

  const handleDepartureChange = (value, index) => {
    console.log(value);

    if (!value) return;
    const selectedOption = departures.find((option) => option.id === value.value);

    const departureData = {
      ...departureRows[index],
      departure_id: selectedOption?.id || "",

    };

    console.log(departureData, "departureData");

    const newRows = [...departureRows];
    newRows[index] = departureData;
    setDepartureRows(newRows);

  };

  const handleArrivalchange = (value, index) => {
    console.log(value, "value");

    if (!value) return;
    const selectedOption = Arrival.find((option) => option.id === value.value);

    console.log("selectedOption", selectedOption);


    const ArrivalData = {
      ...arrivalrow[index],
      arrival_id: selectedOption?.id || "",

    };

    console.log("ArrivalData", ArrivalData);


    const newRows = [...arrivalrow];
    newRows[index] = ArrivalData;
    console.log("newRows", newRows);


    setArrivalrow(newRows);

  };

  const allArivalJoin = arrivalrow.map((item) => item.arrival_id).join(", ")

  const selectRef = useRef(null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      window.$ = window.jQuery = $;
      import("select2").then(() => {
        $(selectRef.current).select2();
        return () => {
          $(selectRef.current).select2("destroy");
        };
      });
    }


  }, []);

  const handleFlightChange = (e, index, field) => {
    const { value } = e.target;
    const newRows = [...flightRow];
    newRows[index][field] = value;
    setFlightRow(newRows);
  };

  const HandleAddFlightRow = () => {
    setFlightRow([...flightRow, { flight_id: " ", flight_amount: " ", no_of_stop: " ", luggage: "" },
    ]);
  };

  const HandleRemoveFlightRow = (index) => {
    if (flightRow.length === 1) {
      return;
    }
    const newRows = [...flightRow];
    newRows.splice(index, 1);
    setFlightRow(newRows);
  };



  const handleFlightSelectChange = (value, index) => {
    const newRows = [...flightRow];
    newRows[index].flight_id = value;
    setFlightRow(newRows);
  };


  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    if (e.target.type === 'date') {
      const formattedDate = formatDateToDDMMYYYY(value);
      setter(formattedDate);
    } else {
      setter(value);
    }

  };

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const formatDateToMMDDYYYY = (date) => {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  };
  const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start; // Difference in milliseconds
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days
    return daysDiff + 1; // Include the start day
  };
  const isCurrentTabValid = () => {
    const totalDays = calculateDaysBetweenDates(date_begin, date_end);

    if (activeTab === "Content") {
      return (SelectedTour && name && capacity && date_begin && date_end && selectRef.current.value && image2.length > 0 && departureRows.length > 0 &&
        departureRows.every((departure) => departure.departure_id));
    } else if (activeTab === "Pricing") {
      return adult_price && child_price && baby_price;
    } else if (activeTab === "Included") {
      return true
    } else if (activeTab === "Overview") {
      return editorState !== EditorState.createEmpty();
    } else if (activeTab === "Itinerary") {

      const isValidItinerary = route_data.length === totalDays && route_data.every(route =>
        route.dayData && route.description && route.day
      );

      return isValidItinerary; // Return the result of the validity check
    } else if (activeTab === "Flight Hotel And Visa") {

      return mekkaRows.every((mekka) => mekka.hotel_name, mekka.hotel_price, mekka.hotel_info) && madinaRows.every((madina) => madina.hotel_name, madina.hotel_price, madina.hotel_info) && flightRow.every((flight) => flight.flight_id && flight.flight_amount && flight.no_of_stop && flight.luggage) && flightInformation && radioValueVisa && radioValueExcludeFlight;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);




    const languageValues = $(selectRef.current).val();

    const languageString = languageValues.join(',');

    const mekkaData = mekkaRows.map((mekka) => ({
      hotel_type: 1,
      hotel_name: mekka.hotel_name ? mekka.hotel_name : '',
      hotel_id: mekka.hotel_id ? mekka.hotel_id : '',
      hotel_price: mekka.hotel_price,
      hotel_info: mekka.hotel_info,

    }))

    const madinaData = madinaRows.map((madina) => ({
      hotel_type: 2,
      hotel_name: madina.hotel_name ? madina.hotel_name : '',
      hotel_id: madina.hotel_id ? madina.hotel_id : '',
      hotel_price: madina.hotel_price,
      hotel_info: madina.hotel_info
    }))
    const departureData = departureRows.map((departure) => ({
      departure_id: departure.departure_id ? departure.departure_id : '',
      price: departure.price ? departure.price : '',
    }))


    const flightData = flightRow.map((flight) => ({
      flight_id: flight.flight_id ? flight.flight_id.value : '',
      flight_amount: flight.flight_amount,
      no_of_stop: flight.no_of_stop,
      luggage: flight.luggage
    }))

    if (!mekkaData.some((mekka) => mekka.hotel_name && mekka.hotel_price && mekka.hotel_info) ||
      !madinaData.some((madina) => madina.hotel_name && madina.hotel_price && madina.hotel_info) ||
      (radioValueFlight === "Yes" ? !flightData.some((flight) => flight.flight_id && flight.flight_amount && flight.no_of_stop && flight.luggage) : false) || !flightInformation) {
      setLoading(false);
      showErrorToast(translate, "Please fill in all required fields before proceeding");
      return;
    }


    const hotel_data = [...mekkaData, ...madinaData];

    const checkedServices = services.filter((service) => service.checked);
    const servicesData = checkedServices.reduce((acc, service) => {
      if (service.price !== "") {
        acc.push({ title: service.title, price: service.price });
      }
      return acc;
    }, []);

    const checkedIncluded = included.filter((item) => item.checked);
    const includedData = checkedIncluded.map((item) => item.id).join(",");
    const tourInfo = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const newRouteData = route_data.map((day, index) => (
      {
        day: day.dayData,
        description: day.description
      }
    ));


    // const image2File = document.querySelector('input[name="image2"]').files;

    // const image2FileArray = Object.entries(image2File).map(([key, value]) => value);
    // console.log(image2FileArray,"image2FileArray")

    const formData = new FormData();

    formData.append("type", SelectedTour.value);
    formData.append("name", name);
    formData.append("capacity", capacity);
    formData.append("date_begin", date_begin);
    formData.append("date_end", date_end);
    formData.append("tour_languages", languageString);
    formData.append("departures", JSON.stringify(departureData));
    formData.append("adult_price", adult_price);
    formData.append("child_price", child_price);
    formData.append("baby_price", baby_price);
    formData.append("addition_service", JSON.stringify(servicesData));
    formData.append("tour_included", includedData);
    formData.append("flight_info", flightInformation);
    formData.append("tour_info", tourInfo);
    formData.append("route_data", JSON.stringify(newRouteData));
    formData.append("hotel_data", JSON.stringify(hotel_data));
    formData.append("flight_data", radioValueFlight === "Yes" ? JSON.stringify(flightData) : "");
    formData.append("visa_processing", radioValueVisa === "Yes" ? 1 : 0);
    formData.append("flight_exclude", radioValueExcludeFlight === "Yes" ? 1 : 0);
    formData.append("user_id", user?.user.id);
    formData.append("company_id", user?.user.company_id);
    formData.append("arrival" , allArivalJoin)
    // image2FileArray.forEach((file, index) => {
    //   formData.append(`tour_image[${index}]`, file);
    // });
    console.log(selectedFiles, "selectedFiles")
    selectedFiles.forEach((file, index) => {
      formData.append(`tour_image[${index}]`, file);
    });
    const url = "addtour";

    try {
      const response = await POST.request({ form: formData, url: url, headers: { "Content-Type": "multipart/form-data" } });
      setLoading(false);
      if (response) {
        showSuccessToast(translate, "Tour Added Successfully");
        setTimeout(() => {

          router.push("/vendor/listing");
        }, 1000)
        // setActiveTab("Content");
        // setActiveTabIndex(0);
        // setSelectedTour("");  
        // setName("");
        // setCapacity("");
        // setDateBegin("");
        // setDateEnd("");
        // setTourLanguages("");
        // setAdultPrice("");
        // setChildPrice("");
        // setBabyPrice("");
        // setGender("");
        // setEditorState(EditorState.createEmpty());
        // $(selectRef.current).val('').trigger('change');
        // setImage2([]);
        // services.forEach((service) => {
        //   service.checked = false;
        //   service.price = "";
        // })
        // setIncluded(included.map((item) => ({ ...item, checked: false })));
        // setRouteData([]);
        // setHotelData([]);
        // setDepartures([]);
        // setTourIncluded(0);
        // setTourInfo("");
        // setFreeCancellation(0);
        // setPrice("123");
        // setAmenities([]);
        // setDaysCount(0);
        // setDayData("");
        // setDayDescription("");
        // setMekkaRows([{ hotel_name: null, hotel_price: "",hotel_info:"" }]);
        // setMadinaRows([{ hotel_name: null, hotel_price: "",hotel_info:"" }]);
        // setDepartureRows([{ departure_id: "", price:"" }]);
        // setFlightRow([{ flight_id: " ", flight_amount: " ", no_of_stop: " ",luggage:"" }]);
        // setRadioValueFlight('No');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>

      <ToastContainer />

      <div
        className={`dashboard overflow-hidden ${sideBarOpen ? "-is-sidebar-visible" : ""
          } js-dashboard `}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content ">
            <h1 className="text-30">
              {translate("Add Tour")}
            </h1>

            <div className="rounded-12 bg-white shadow-2 px-40 py-40 mt-20">
              <div className="tabs -underline-2 js-tabs">
                <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                  {tabs.map((elm, i) => (
                    <div
                      key={elm}
                      className="col-auto"
                    >
                      <button
                        className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${activeTab == elm ? "is-tab-el-active" : ""
                          }`}

                        onClick={() => isNextClicked && handleTabClick(elm, i)}
                        disabled={i > activeTabIndex && !enabledTabs.includes(i)}

                      >
                        {i + 1}. {translate(elm)}
                      </button>
                    </div>
                  ))}
                </div>

                <form
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="row pt-40">
                    <div className="col-xl-12 col-lg-12">
                      <div className="tabs__content js-tabs-content">
                        <div
                          className={`tabs__pane  ${activeTab == "Content" ? "is-tab-el-active" : ""
                            }`}
                        >
                          <div className="form_2">
                            <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                              <div className="row ">
                                <div className="col-md-6">
                                  <div className="form-input my-1 d-flex flex-column align-items-center add-tour-type">
                                    <CreatableSelect
                                      value={SelectedTour}
                                      onChange={HandleTourChange}
                                      options={options}
                                      className="custom-select"
                                      placeholder={`${translate("Select Tour Type (Required)")}`}
                                      classNamePrefix="react-select"
                                      isClearable
                                      formatCreateLabel={(inputValue) =>
                                        `Create custom gender: "${inputValue}"`
                                      }
                                    />
                                    {gender && gender.__isNew__ && (
                                      <input
                                        type="text"
                                        value={SelectedTour}
                                        onChange={(e) =>
                                          setSelectedTour(e.target.value)
                                        }
                                        placeholder="Enter custom gender"
                                        className="form-control mt-2 custom-input"
                                      />
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input type="text" required value={name} onChange={handleInputChange(setName)} />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Tour Name") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input type="number" min={1} ref={numberInputRef1} required value={capacity} onChange={handleInputChange(setCapacity)}
                                      onKeyDown={(e) => {
                                        if (!isFocused) return;

                                        if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                          e.preventDefault();
                                        }
                                      }}
                                      onKeyUp={() => setIsFocused(false)}

                                      onFocus={() => setIsFocused(true)}
                                      onBlur={() => setIsFocused(false)}
                                    />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Seat Availibility") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input type="date" required value={date_begin || ''} pattern="\d{2}-\d{2}-\d{4}" onBlur={handleStartDateBlur} onFocus={handleDateFocus} onKeyDown={(e) => e.preventDefault()} onChange={handleStartDateChange} min={minEndDate} />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Start Date of Tour") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input type="date" required value={date_end || ''} pattern="\d{2}-\d{2}-\d{4}" onBlur={handleEndDateBlur} disabled={isFocused} onFocus={handleDateFocus} onKeyDown={(e) => e.preventDefault()} onChange={handleEndDateChange} min={minDate}
                                    />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("End Date of Tour") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1 position-relative">
                                    <select
                                      ref={selectRef}
                                      className="js-example-basic-multiple w-100"
                                      name="states[]"
                                      multiple="multiple"
                                      placeholder="Langauge"
                                    >
                                      {languagesData.map((language) => (
                                        <option key={language.id} value={language.id}>
                                          {translate(language.languages_en) ||
                                            "Find Latest Packages"}
                                        </option>
                                      ))}
                                      {/* <option value="ENG">
                                            {" "}
                                            {translate("English") ||
                                              "Find Latest Packages"}
                                          </option>
                                          <option value="GER">
                                            {" "}
                                            {translate("German") ||
                                              "Find Latest Packages"}
                                          </option>
                                          <option value="TUR">
                                            {" "}
                                            {translate("Turkis") ||
                                              "Find Latest Packages"}
                                          </option>
                                          <option value="ARB">
                                            {" "}
                                            {translate("Arbic") ||
                                              "Find Latest Packages"}
                                          </option> */}
                                    </select>
                                    <label className="multi-lan-select">
                                      {translate("Language") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <h6>
                                    {" "}
                                    {translate("Departure")}
                                  </h6>
                                  <ul className="">

                                    {departureRows.map((row, index) => (
                                      <li key={index}>
                                        <div className=" row">
                                          <div className="col-lg-8">
                                            <div className="row">
                                              <div className="col-md-8 form-input spacing d-flex flex-column align-items-center">
                                                <CreatableSelect
                                                  value={row.id}
                                                  onChange={(value) =>
                                                    handleDepartureChange(value, index)
                                                  }
                                                  options={departureOption}
                                                  className="custom-select Hotel-Madina-dd"
                                                  placeholder={`${translate("Select Departure (Required)")}`}
                                                  classNamePrefix="react-select"
                                                  isClearable
                                                  formatCreateLabel={(inputValue) =>
                                                    `Not Found: "${inputValue}"`
                                                  }
                                                />
                                              </div>

                                              <div className="col-md-3">
                                                {/* <div className="form-input spacing">
                                                  <input type="number" required ref={numberInputRef2}
                                                    value={departureRows[index].hotel_price}
                                                    onChange={(e) => setDepartureRows(prevRows => {
                                                      const newRows = [...prevRows];
                                                      newRows[index].price = e.target.value;
                                                      return newRows;
                                                    })}
                                                    onKeyDown={(e) => {
                                                      if (!isFocused) return;
          
                                                      if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                    onKeyUp={()=>setIsFocused(false)}
                                                    onFocus={() => setIsFocused(true)}
                                                    onBlur={() => setIsFocused(false)}
                                                    />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {" "}
                                                    {translate("Price") ||
                                                      "Find Latest Packages"} <span className="text-red">*</span>
                                                  </label>
                                                </div> */}
                                                <div className="col-2 d-flex">
                                                  <button
                                                    type="button"
                                                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                                    onClick={handleAddDepartureRow}
                                                    style={{ height: "fit-content" }}

                                                  >
                                                    +
                                                  </button>
                                                  {index > 0 && (
                                                    <button
                                                      type="button"
                                                      className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                                      style={{ height: "fit-content" }}

                                                      onClick={() =>
                                                        handleRemoveDepartureRow(index)
                                                      }
                                                    >
                                                      -
                                                    </button>
                                                  )}
                                                </div>
                                              </div>

                                            </div>
                                          </div>




                                          <hr />
                                        </div>
                                      </li>
                                    ))}

                                  </ul>
                                </div>
                                <div className="col-md-12">
                                  <h6>
                                    {" "}
                                    {translate("Arrival")}
                                  </h6>
                                  <ul className="">

                                    {arrivalrow.map((row, index) => (
                                      <li key={index}>
                                        <div className=" row">
                                          <div className="col-lg-8">
                                            <div className="row">
                                              <div className="col-md-8 form-input spacing d-flex flex-column align-items-center">
                                                <CreatableSelect
                                                  value={row.id}
                                                  onChange={(value) =>
                                                    handleArrivalchange(value, index)
                                                  }
                                                  options={ArrivalOption}
                                                  className="custom-select Hotel-Madina-dd"
                                                  placeholder={`${translate("Select Arrival (Required)")}`}
                                                  classNamePrefix="react-select"
                                                  isClearable
                                                  formatCreateLabel={(inputValue) =>
                                                    `Not Found: "${inputValue}"`
                                                  }
                                                />
                                              </div>

                                              <div className="col-md-3">
                                                {/* <div className="form-input spacing">
                                                  <input type="number" required ref={numberInputRef2}
                                                    value={departureRows[index].hotel_price}
                                                    onChange={(e) => setDepartureRows(prevRows => {
                                                      const newRows = [...prevRows];
                                                      newRows[index].price = e.target.value;
                                                      return newRows;
                                                    })}
                                                    onKeyDown={(e) => {
                                                      if (!isFocused) return;
          
                                                      if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                    onKeyUp={()=>setIsFocused(false)}
                                                    onFocus={() => setIsFocused(true)}
                                                    onBlur={() => setIsFocused(false)}
                                                    />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {" "}
                                                    {translate("Price") ||
                                                      "Find Latest Packages"} <span className="text-red">*</span>
                                                  </label>
                                                </div> */}
                                                <div className="col-2 d-flex">
                                                  <button
                                                    type="button"
                                                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                                    onClick={handleAddArrivalRow}
                                                    style={{ height: "fit-content" }}

                                                  >
                                                    +
                                                  </button>
                                                  {index > 0 && (
                                                    <button
                                                      type="button"
                                                      className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                                      style={{ height: "fit-content" }}

                                                      onClick={() =>
                                                        handleRemoveArrivalRow(index)
                                                      }
                                                    >
                                                      -
                                                    </button>
                                                  )}
                                                </div>
                                              </div>

                                            </div>
                                          </div>




                                          <hr />
                                        </div>
                                      </li>
                                    ))}

                                  </ul>
                                </div>
                              </div>

                              <div className="col-12">
                                <h4 className="text-18 fw-500 mb-20">
                                  {" "}
                                  {translate("Gallery")} <span className="text-red">*</span>
                                </h4>

                                <div className="row x-gap-20 y-gap-20">
                                  {image2.map((image, index) => (
                                    <div className="col-auto my-2" key={index}>
                                      <div className="relative">
                                        <Image
                                          width={200}
                                          height={200}
                                          src={image}
                                          alt={`image-${index}`}
                                          className="size-200 rounded-12 object-cover"
                                        />
                                        <button
                                          onClick={(e) => handleDeleteImage2(index, e)}
                                          className="absoluteIcon1 button -dark-1"
                                        >
                                          <i className="icon-delete text-18"></i>
                                        </button>


                                      </div>
                                    </div>
                                  ))}

                                  <div className="col-auto my-2">
                                    <label
                                      htmlFor="imageInp2"
                                      className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                    >
                                      <Image
                                        width="40"
                                        height="40"
                                        alt="image"
                                        src={"/img/dashboard/upload.svg"}
                                      />

                                      <div className="text-16 fw-500 text-accent-1 mt-10">
                                        {translate("Upload Images")}
                                      </div>
                                    </label>
                                    <input
                                      onChange={handleImageChange2}
                                      accept="image/jpg,image/png"
                                      id="imageInp2"
                                      type="file"
                                      name="image2"
                                      multiple
                                      style={{ display: "none" }}
                                      onClick={(e) => e.target.value = null}

                                    />
                                  </div>
                                </div>

                                <div className="text-14 mt-20">
                                  {translate("PNG or JPG no Bigger Than 800px Wide And Tall.")}
                                </div>
                              </div>


                            </div>
                          </div>
                          {activeTabIndex < tabs.length - 1 && (
                            <button
                              className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                              onClick={handleNextTab}
                              type="button"
                            >
                              {translate("Next")}
                            </button>
                          )}

                        </div>

                        <div
                          className={`tabs__pane  ${activeTab === "Pricing" ? "is-tab-el-active" : ""
                            }`}
                        >
                          <div className="y-gap-30 contactForm px-lg-20 px-0 ">
                            <div className="contactForm row y-gap-30 items-center ">
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input type="number" ref={numberInputRef3} required value={adult_price} onChange={handleInputChange(setAdultPrice)}
                                    onKeyDown={(e) => {
                                      setIsFocused(true);
                                      if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                        e.preventDefault();
                                      }
                                    }}
                                    onKeyUp={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Adult") ||
                                      "Find Latest Packages"} <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input type="number" ref={numberInputRef4} required value={child_price} onChange={handleInputChange(setChildPrice)}
                                    onKeyDown={(e) => {
                                      setIsFocused(true);
                                      if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                        e.preventDefault();
                                      }
                                    }}
                                    onKeyUp={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Child") ||
                                      "Find Latest Packages"} <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input type="number" ref={numberInputRef5} required value={baby_price} onChange={handleInputChange(setBabyPrice)}
                                    onKeyDown={(e) => {
                                      setIsFocused(true);
                                      if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                        e.preventDefault();
                                      }
                                    }}
                                    onKeyUp={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)} />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Baby") ||
                                      "Find Latest Packages"} <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="mt-30">
                              <h3 className="text-18 fw-500 mb-20">
                                {translate("Additional Services") ||
                                  "Find Latest Packages"}
                              </h3>

                              <div className="row">
                                <div className="col-lg-4">
                                  <p>
                                    {" "}
                                    {translate("Additional Services") ||
                                      "Find Latest Packages"}
                                  </p>
                                </div>
                                <div className="col-lg-6">
                                  <p>
                                    {" "}
                                    {translate("Price (€) Per Person") ||
                                      "Find Latest Packages"}
                                  </p>
                                </div>
                              </div>

                              {services.map((service, index) => (
                                <div
                                  key={service.id}
                                  className="contactForm row y-gap-30 items-center pt-lg-0 pt-10"
                                >
                                  <div className="col-lg-4">
                                    <div className="d-flex items-center pointer-check">
                                      <div className="form-checkbox">
                                        <input
                                          type="checkbox"
                                          id={`service-${service.id}`}
                                          checked={service.checked}
                                          onChange={(event) => handleCheckboxChange(event, service.id)}
                                        />
                                        <label
                                          htmlFor={`service-${service.id}`}
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
                                        htmlFor={`service-${service.id}`}
                                        className="lh-16 ml-15 my-2"
                                      >
                                        {index + 1} {translate("Bed-Room")}
                                      </label>
                                    </div>
                                  </div>
                                  {service.checked && (
                                    <div className="col-lg-6">
                                      <div className="form-input my-1">
                                        <input
                                          type="number"
                                          ref={numberInputRef6}
                                          id={`service-${service.id}`}
                                          value={service.price}
                                          onChange={(event) => handlePriceChange(event, service.id)}
                                          required

                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          {translate("Price")}
                                        </label>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}


                            </div>
                          </div>
                          <div className=" flex_start">

                            {activeTabIndex < tabs.length - 1 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                onClick={handleNextTab}
                                type="button"
                              >
                                {translate("Next")}
                              </button>
                            )}
                            {activeTabIndex > 0 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                onClick={handlePrevTab}
                                type="button"
                              >
                                {translate("Previous")}
                              </button>
                            )}
                          </div>

                        </div>

                        <div
                          className={`tabs__pane ${activeTab == "Included" ? "is-tab-el-active" : ""
                            }`}
                        >
                          <div className="row  y-gap-30 contactForm px-lg-20 px-0">
                            {included.map((item, index) => (
                              <div className="col-md-4">
                                <div className="row y-gap-20">
                                  <div className="col-12 px-0 my-1">

                                    <div className="d-flex items-center pointer-check">
                                      <div className="form-checkbox" >

                                        <input
                                          type="checkbox"
                                          id={`item-${item.id}`}
                                          name={`item-${item.id}`}
                                          checked={item.checked}
                                          onChange={(e) => {
                                            const updatedIncluded = included.map((includedItem) =>
                                              includedItem.id === item.id
                                                ? { ...includedItem, checked: e.target.checked }
                                                : includedItem
                                            );
                                            setIncluded(updatedIncluded);
                                          }}

                                        />
                                        <label
                                          htmlFor={`item-${item.id}`}
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
                                        htmlFor={`item-${item.id}`}
                                        className="lh-16 ml-15"
                                      >
                                        {translate(item.option) || "Find Latest Packages"}
                                      </label>
                                    </div>
                                  </div>


                                </div>
                              </div>
                            ))}


                          </div>
                          <div className=" flex_start">

                            {activeTabIndex < tabs.length - 1 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                onClick={handleNextTab}
                                type="button"
                              >
                                {translate("Next")}
                              </button>
                            )}
                            {activeTabIndex > 0 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                onClick={handlePrevTab}
                                type="button"
                              >
                                {translate("Previous")}
                              </button>
                            )}
                          </div>

                        </div>

                        <div
                          className={`tabs__pane  ${activeTab == "Overview" ? "is-tab-el-active" : ""
                            }`}
                        >
                          <div className="y-gap-30 contactForm px-lg-20 px-0 ">
                            {/* <Editor
                                  editorState={editorState}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={onEditorStateChange}
                                /> */}

                            {typeof window != "undefined" && <Editor editorState={editorState} toolbarClassName="border" wrapperClassName="" editorClassName="border px-2" onEditorStateChange={(e) => setEditorState(e)} />}
                            <input type="hidden" name="Title" id="Title" value={editorState && draftToHtml(convertToRaw(editorState.getCurrentContent()))} />

                          </div>
                          <div className=" flex_start">

                            {activeTabIndex < tabs.length - 1 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                onClick={handleNextTab}
                                type="button"
                              >
                                {translate("Next")}
                              </button>
                            )}
                            {activeTabIndex > 0 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                onClick={handlePrevTab}
                                type="button"
                              >
                                {translate("Previous")}
                              </button>
                            )}
                          </div>
                        </div>

                        <div
                          className={`tabs__pane  ${activeTab == "Itinerary" ? "is-tab-el-active" : ""
                            }`}
                        >
                          <div className="form_2">
                            <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                              {Array.from({ length: daysCount }, (_, i) => i + 1).map((dayNumber) => (
                                // <ItineraryDayInput key={dayNumber} dayNumber={dayNumber} />

                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-input my-1">
                                      <input
                                        type="text"
                                        required
                                        value={route_data.find((day) => day.day === dayNumber)?.dayData || ""}
                                        onChange={(e) => handleDayDescriptionChange(dayNumber, e.target.value, route_data.find((day) => day.day === dayNumber)?.description || "")}
                                        className=""
                                      />
                                      <label className="lh-1 text-16 text-light-1">{translate("Day")} {dayNumber} <span className="text-red">*</span></label>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input my-1">
                                      <textarea
                                        type="text"
                                        required
                                        rows="2"
                                        cols="80"
                                        value={route_data.find((day) => day.day === dayNumber)?.description || ""}
                                        onChange={(e) => handleDayDescriptionChange(dayNumber, route_data.find((day) => day.day === dayNumber)?.dayData, e.target.value)}
                                      />
                                      <label className="lh-1 text-16 text-light-1">{translate("Description")} <span className="text-red">*</span></label>
                                    </div>
                                  </div>
                                </div>
                              ))}


                            </div>
                          </div>
                          <div className=" flex_start">

                            {activeTabIndex < tabs.length - 1 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                onClick={handleNextTab}
                                type="button"
                              >
                                {translate("Next")}
                              </button>
                            )}
                            {activeTabIndex > 0 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                onClick={handlePrevTab}
                                type="button"
                              >
                                {translate("Previous")}
                              </button>
                            )}
                          </div>
                        </div>

                        <div
                          className={`tabs__pane  ${activeTab == "Flight Hotel And Visa"
                            ? "is-tab-el-active"
                            : ""
                            }`}
                        >
                          <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                            <div className="d-flex item-center justify-content-between">
                              <h6>
                                {" "}
                                {translate("Visa Processing")}
                              </h6>
                              <div className="flex_start visaYESNOFLEx my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupVisa"
                                        value="Yes"
                                        checked={radioValueVisa === "Yes"}
                                        onChange={(event) => setRadioValueVisa(event.target.value)}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      <span className="text-14 lh-1 ml-5">
                                        {" "}
                                        {translate("Yes")}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupVisa"
                                        value="No"
                                        checked={radioValueVisa === "No"}
                                        onChange={(event) => setRadioValueVisa(event.target.value)}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      <span className="text-14 lh-1 ml-5">
                                        {" "}
                                        {translate("No")}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <h6>
                                {" "}
                                {translate("Mekka Hotel")}
                              </h6>

                              <ul className="">
                                {mekkaRows.map((row, index) => (
                                  <li key={index}>
                                    <div className=" row">
                                      <div className="col-lg-8">
                                        <div className="row">

                                          <div className="col-lg-6 col-md-auto col-12 form-input spacing d-flex flex-column align-items-center hotel-mekka">
                                            <CreatableSelect
                                              value={row.id}
                                              onChange={(value) =>
                                                handleMekkaChange(value, index)
                                              }
                                              options={options2}
                                              className="custom-select Hotel-Mekka-dd"
                                              placeholder={`${translate("Select Hotel For Mekka (Required)")}`}
                                              classNamePrefix="react-select"
                                              isClearable
                                              formatCreateLabel={(inputValue) =>
                                                `Not Found: "${inputValue}"`
                                              }
                                            />
                                          </div>

                                          <div className="col-lg-6 col-md-auto col-12">
                                            <div className="form-input spacing">
                                              <input type="number" ref={numberInputRef7} required
                                                value={mekkaRows[index].hotel_price}
                                                onChange={(e) => setMekkaRows(prevRows => {
                                                  const newRows = [...prevRows];
                                                  newRows[index].hotel_price = e.target.value;
                                                  return newRows;
                                                })}
                                                onKeyDown={(e) => {
                                                  setIsFocused(true);
                                                  if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                    e.preventDefault();
                                                  }
                                                }}
                                                onKeyUp={() => setIsFocused(false)}
                                                onFocus={() => setIsFocused(true)}
                                                onBlur={() => setIsFocused(false)}
                                              />
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Hotel Price") ||
                                                  "Find Latest Packages"} <span className="text-red">*</span>
                                              </label>
                                            </div>
                                          </div>

                                          <div className="col-lg-12 col-md-auto col-12">
                                            <div className="form-input m-0">
                                              <textarea required rows="1"
                                                value={mekkaRows[index].hotel_info}
                                                onChange={(e) => setMekkaRows(prevRows => {
                                                  const newRows = [...prevRows];
                                                  newRows[index].hotel_info = e.target.value;
                                                  return newRows;
                                                })}
                                              ></textarea>
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Description") ||
                                                  "Find Latest Packages"} <span className="text-red">*</span>
                                              </label>
                                            </div>
                                          </div>
                                        </div>

                                      </div>

                                      <div className="col-2 d-flex">
                                        <button
                                          type="button"
                                          className="button -sm -info-2 bg-accent-1 text-white  my-4 text-40 mx-1 mx-md-3 "
                                          style={{ height: "fit-content", width: "fit-content" }}
                                          onClick={handleAddMekkaRow}
                                        >
                                          +
                                        </button>
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-md-3 mx-1`}
                                            style={{ height: "fit-content", width: "fit-content" }}

                                            onClick={() =>
                                              handleRemoveMekkaRow(index)
                                            }
                                          >
                                            -
                                          </button>
                                        )}
                                      </div>

                                      <hr />
                                    </div>
                                  </li>
                                ))}
                              </ul>

                              <h6>
                                {" "}
                                {translate("Madina Hotel ")}
                              </h6>
                              <ul className="">

                                {madinaRows.map((row, index) => (
                                  <li key={index}>
                                    <div className=" row">
                                      <div className="col-lg-8">
                                        <div className="row">
                                          <div className="col-md-6 form-input spacing d-flex flex-column align-items-center">
                                            <CreatableSelect
                                              value={row.id}
                                              onChange={(value) =>
                                                handleMadinaChange(value, index)
                                              }
                                              options={Madina}
                                              className="custom-select Hotel-Madina-dd"
                                              placeholder={`${translate("Select Hotel For Madina (Required)")}`}
                                              classNamePrefix="react-select"
                                              isClearable
                                              formatCreateLabel={(inputValue) =>
                                                `Not Found: "${inputValue}"`
                                              }
                                            />
                                          </div>

                                          <div className="col-md-6">
                                            <div className="form-input spacing">
                                              <input
                                                type="text"
                                                required
                                                value={madinaRows[index].hotel_price}
                                                onChange={(e) => setMadinaRows(prevRows => {
                                                  const newRows = [...prevRows];
                                                  newRows[index].hotel_price = e.target.value;
                                                  return newRows;
                                                })}
                                                onKeyDown={(e) => {
                                                  setIsFocused(true);
                                                  if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                    e.preventDefault();
                                                  }
                                                }}
                                                onKeyUp={() => setIsFocused(false)}
                                                onFocus={() => setIsFocused(true)}
                                                onBlur={() => setIsFocused(false)}
                                              />
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Hotel Price") ||
                                                  "Find Latest Packages"} <span className="text-red">*</span>
                                              </label>
                                            </div>
                                          </div>


                                          <div className="col-md-12">
                                            <div className="form-input m-0">
                                              <textarea required rows="1"
                                                value={madinaRows[index].hotel_info}
                                                onChange={(e) => setMadinaRows(prevRows => {
                                                  const newRows = [...prevRows];
                                                  newRows[index].hotel_info = e.target.value;
                                                  return newRows;
                                                })}
                                              ></textarea>
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Description") ||
                                                  "Find Latest Packages"} <span className="text-red">*</span>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-2 d-flex">
                                        <button
                                          type="button"
                                          className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                          onClick={handleAddMadinaRow}
                                          style={{ height: "fit-content", width: "fit-content" }}

                                        >
                                          +
                                        </button>
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                            style={{ height: "fit-content", width: "fit-content" }}

                                            onClick={() =>
                                              handleRemoveMadinaRow(index)
                                            }
                                          >
                                            -
                                          </button>
                                        )}
                                      </div>


                                      <hr />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="d-flex flex-wrap item-center justify-content-between">
                              <h6>
                                {translate("Allow Exclude Flight Details")}
                              </h6>
                              <div className="flex_start visaYESNOFLEx my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupFreeCancel"
                                        value="Yes"
                                        checked={radioValueExcludeFlight === "Yes"}
                                        onChange={(event) => setRadioValueExcludeFlight(event.target.value)}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      <span className="text-14 lh-1 ml-5">
                                        {" "}
                                        {translate("Yes")}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupFreeCancel"
                                        value="No"
                                        checked={radioValueExcludeFlight === "No"}
                                        onChange={(event) => setRadioValueExcludeFlight(event.target.value)}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      <span className="text-14 lh-1 ml-5">
                                        {" "}
                                        {translate("No")}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" ">
                              <h6 className="mb-1">
                                {translate("Add Flight Information")}
                              </h6>

                              <div className="col-12">
                                <div className="form-input m-0">
                                  <textarea
                                    type="text"
                                    required
                                    rows="3"
                                    value={flightInformation}

                                    onChange={(e) => setFlightInformation(e.target.value)}
                                  />
                                  <label className="lh-1 text-16 text-light-1">{translate("Flight Information")} <span className="text-red">*</span></label>
                                </div>
                              </div>

                            </div>
                            {/* <div className="d-flex item-center justify-content-between">
                                  <h6>
                                  {translate("Free cancellation (up to 14 days before travel date)") }
                                  </h6>
                                  <div className="flex_start visaYESNOFLEx my-3">
                                    <div className="d-flex items-center mx-2">
                                      <div className="form-radio d-flex items-center">
                                        <label className="radio d-flex items-center">
                                        <input
                                            type="radio"
                                            name="radioGroupFreeCancel"
                                            value="Yes"
                                            checked={radioValueFreeCancel === "Yes"}
                                            onChange={(event) => setRadioValueFreeCancel(event.target.value)}
                                          />
                                          <span className="radio__mark">
                                            <span className="radio__icon"></span>
                                          </span>
                                          <span className="text-14 lh-1 ml-5">
                                            {" "}
                                            {translate("Yes") }
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="d-flex items-center mx-2">
                                      <div className="form-radio d-flex items-center">
                                        <label className="radio d-flex items-center">
                                        <input
                                            type="radio"
                                            name="radioGroupFreeCancel"
                                            value="No"
                                            checked={radioValueFreeCancel === "No"}
                                            onChange={(event) => setRadioValueFreeCancel(event.target.value)}
                                          />
                                          <span className="radio__mark">
                                            <span className="radio__icon"></span>
                                          </span>
                                          <span className="text-14 lh-1 ml-5">
                                            {" "}
                                            {translate("No") }
                                          </span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                            <div className="d-flex item-center justify-content-between">
                              <h6>
                                {translate("Enter Flight Details")}
                              </h6>
                              <div className="flex_start visaYESNOFLEx my-2">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupFlight"
                                        value="Yes"
                                        checked={radioValueFlight === "Yes"}
                                        onChange={(event) => setRadioValueFlight(event.target.value)}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      <span className="text-14 lh-1 ml-5">
                                        {" "}
                                        {translate("Yes")}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupFlight"
                                        value="No"
                                        checked={radioValueFlight === "No"}
                                        onChange={(event) => setRadioValueFlight(event.target.value)}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      <span className="text-14 lh-1 ml-5">
                                        {" "}
                                        {translate("No")}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {radioValueFlight === "Yes" && (
                              <>
                                <div className="d-flex item-center justify-content-between pt-10">
                                  <h6>
                                    {" "}
                                    {translate("Add Flight Details")}
                                  </h6>
                                </div>
                                <div className="form_2">
                                  <div className=" y-gap-30 contactForm py-20 ">
                                    {flightRow.map((row, index) => {
                                      return (
                                        <div className="row">
                                          <div className="col-md-9">
                                            <div className="row">

                                              <div className="col-md-6">
                                                <CreatableSelect
                                                  value={row.flight_id}
                                                  onChange={(value) =>
                                                    handleFlightSelectChange(value, index)
                                                  }
                                                  options={ChooseFlight}
                                                  className="custom-select Flight-selected-dd"
                                                  placeholder={`${translate("Select Flight")}`}
                                                  classNamePrefix="react-select"
                                                  isClearable
                                                  formatCreateLabel={(inputValue) =>
                                                    `Not Found: "${inputValue}"`
                                                  }
                                                />
                                              </div>
                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input
                                                    type="number"
                                                    ref={numberInputRef9}
                                                    required
                                                    value={flightRow[index].flight_amount}
                                                    onChange={(e) => setFlightRow(prevRows => {
                                                      const newRows = [...prevRows];
                                                      newRows[index].flight_amount = e.target.value;
                                                      return newRows;
                                                    })}
                                                    onKeyDown={(e) => {
                                                      setIsFocused(true);
                                                      if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                    onKeyUp={() => setIsFocused(false)}
                                                    onFocus={() => setIsFocused(true)}
                                                    onBlur={() => setIsFocused(false)}
                                                  />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {" "}
                                                    {translate("Flight Amount") ||
                                                      "Find Latest Packages"}
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input
                                                    type="number"
                                                    ref={numberInputRef10}
                                                    required
                                                    value={flightRow[index].no_of_stop}
                                                    onChange={(e) => setFlightRow(prevRows => {
                                                      const newRows = [...prevRows];
                                                      newRows[index].no_of_stop = e.target.value;
                                                      return newRows;
                                                    })}
                                                  />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {" "}
                                                    {translate("No of Flight Stops") ||
                                                      "Find Latest Packages"}
                                                  </label>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input
                                                    type="number"
                                                    ref={numberInputRef11}
                                                    required
                                                    value={flightRow[index].luggage}
                                                    onChange={(e) => setFlightRow(prevRows => {
                                                      const newRows = [...prevRows];
                                                      newRows[index].luggage = e.target.value;
                                                      return newRows;
                                                    })}
                                                  />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {" "}
                                                    {translate("Luggage") ||
                                                      "Find Latest Packages"}
                                                  </label>
                                                </div>
                                              </div>
                                            </div>

                                          </div>
                                          {/* <div className="col-md-2 col-lg-auto col-12 d-flex">
                                            <button
                                              type="button"
                                              className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                              onClick={HandleAddFlightRow}
                                              style={{height:"fit-content"}}

                                            >
                                              +
                                            </button>
                                            {index > 0 && (
                                              <button
                                                type="button"
                                                className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                                onClick={() =>
                                                  HandleRemoveFlightRow(index)
                                                }
                                                style={{height:"fit-content"}}

                                              >
                                                -
                                              </button>
                                            )}
                                          </div> */}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </>
                            )}

                          </div>

                          <div className=" flex_start">

                            <button type="submit" className="button -sm -info-2 bg-accent-1 text-white  mt-4  ">
                              {loading ? <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ height: "30px", width: "100%" }}
                              >
                                <ClipLoader color="#ffffff" size={30} />
                              </div>
                                :
                                translate("Save Details")
                              }
                            </button>
                            {activeTabIndex > 0 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                onClick={handlePrevTab}
                                type="button"
                              >
                                {translate("Previous")}
                              </button>
                            )}
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>

            <VendorFooter />
          </div>
        </div>
      </div>

    </>
  );
}
