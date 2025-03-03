"use client";

import Header from "@/components/dasboard/Header";
import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import Map from "@/components/pages/contact/Map";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import CreatableSelect from "react-select/creatable";
import { FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
} from "draft-js";
import draftToHtml, { stateToHTML } from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import $ from "jquery";
import "select2/dist/css/select2.css";
import { useTranslation } from "@/app/context/TranslationContext";
import { useParams, useRouter } from "next/navigation";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
import { languages } from "@/data/tourFilteringOptions";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { toast, ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Useauthredirect from "@/app/hooks/useAuthRedirect";
import { update } from "lodash";
import Select from "react-select";

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

export default function EditTour() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { translate } = useTranslation();
  const params = useParams();
  const id = params.id[0];
  const [tourDetails, setTourDetails] = useState({});
  const [Arrival, setArrival] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [SelectedTour, setSelectedTour] = useState({ value: "", label: "" });
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [date_begin, setDateBegin] = useState("");
  const [date_end, setDateEnd] = useState("");
  const [tour_languages, setTourLanguages] = useState("");
  const [flightInformation, setFlightInformation] = useState("");
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
  const [arrival_data, setArrivalData] = useState([]);
  const [tour_included, setTourIncluded] = useState(0);
  const [tour_info, setTourInfo] = useState("");
  const [tourInformation, setTourInformation] = useState("");
  const [free_cancellation, setFreeCancellation] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [departureRows, setDepartureRows] = useState([
    { departure_id: "", price: "", id: "" },
  ]);
  const [arrivalrow, setArrivalrow] = useState([{ arrival_id: "", name: "" }]);
  const [isChecked, setIsChecked] = useState(false);

  const [price, setPrice] = useState("123");
  const [services, setServices] = useState([
    { id: 5, title: "Breakfast", price: "", checked: false },
    { id: 6, title: "Dinner", price: "", checked: false },
    { id: 7, title: "Sahour", price: "", checked: false },
    { id: 8, title: "Iftar", price: "", checked: false },
  ]);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [enabledTabs, setEnabledTabs] = useState([0]);
  const [visa_processing, setVisaProcessing] = useState(0);
  const [dayData, setDayData] = useState("");
  const [daysCount, setDaysCount] = useState(0);
  const [dayDescription, setDayDescription] = useState("");
  const [included, setIncluded] = useState([]);
  const [includedData, setIncludedData] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [mekkaRows, setMekkaRows] = useState([
    { hotel_id: "", hotel_name: null, hotel_price: "", hotel_info: "", id: "" },
  ]);
  const [madinaRows, setMadinaRows] = useState([
    { hotel_id: "", hotel_name: null, hotel_price: "", hotel_info: "", id: "" },
  ]);
  const [flightRow, setFlightRow] = useState([
    {
      flight_id: " ",
      flight_amount: "0",
      no_of_stop: " ",
      luggage: "",
      id: "",
    },
  ]);
  const [mekkaHotel, setMekkaHotel] = useState([]);
  const [madinaHotel, setMadinaHotel] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [BedRoomData, setBedRoomData] = useState([]);
  const [startDate, setStartDate] = useState("");

  const [flightDetails, setFlightDetails] = useState([]);
  const [tourType, setTourType] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [departureDetails, setDepartureDetails] = useState([]);
  const [tourInclude, setTourInclude] = useState("");
  const [radioValueVisa, setRadioValueVisa] = useState("No");
  const [languagesData, setlanguagesData] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [radioValueExcludeFlight, setRadioValueExcludeFlight] = useState("No");
  const [loading, setLoading] = useState(false);
  // const [radioValueFlight, setRadioValueFlight] = useState("No");
  const [minEndDate, setMinEndDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [uploadedImage, setUploadedImage] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [newImageIndex, setNewImageIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uncheckedIds, setUncheckedIds] = useState([]);
  const [DeletedDeparture, setDeletedDeparture] = useState([]);
  const [DeletedArrival, setDeletedArrival] = useState([]);
  const bedroomOptions = [
    { value: "1-Bed-room", label: "1 Bedroom" },
    { value: "2-Bed-room", label: "2 Bedroom" },
    { value: "3-Bed-room", label: "3 Bedroom" },
    { value: "4-Bed-room", label: "4 Bedroom" },
  ];

  const [bedroomRows, setBedroomRows] = useState([
    { id: "0", bedroom_name: null, bedroom_capacity: "" },
  ]);
  const [RemoveBed, setRemoveBed] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Edit Tour - MekkaBooking";
    }
  }, []);
  const options2 = mekkaHotel.map((hotel) => ({
    value: hotel.id,
    label: `${hotel.hotel_name} (${hotel.hotel_stars} Star)`,
  }));
  const fetchTour = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    const response = await POST.request({ form: formData, url: "tourdetails" });
    if (response) {
      setTourInformation(response.Tour_Details.details.tour_info);
      setTourDetails(response.Tour_Details.details);
      setAdditionalServices(response.Tour_Details.addition_service || "");
      setFlightData(response.Tour_Details.flight_data);
      setDepartureDetails(response.Tour_Details.departure_data);
      setHotelData(response.Tour_Details.hotel_data);
      setBedRoomData(response.Tour_Details.room_data);
      setTourInclude(response.Tour_Details.details.tour_included || "");
      setAdultPrice(JSON.parse(response.Tour_Details.adult_price[0].price));
      setChildPrice(JSON.parse(response.Tour_Details.child_price[0].price));
      setBabyPrice(JSON.parse(response.Tour_Details.baby_price[0].price));
      setArrivalData(JSON.parse(response.Tour_Details.details.arrival));
    }
  };

  const accessdata = async () => {
    const url = "tour_data";

    try {
      const response = await POST.request({ url: url });
      if (response.Data) {
        setMekkaHotel(response.Data.mekka_hotels);
        setMadinaHotel(response.Data.medina_hotels);
        setFlightDetails(response.Data.airline);
        setTourType(response.Data.tour_type);
        setlanguagesData(response.Data.languages);
        setIncludedData(response.Data.amenities);
        setDepartures(response.Data.departure);
        setArrival(response.Data.arrival);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { handleRedirect } = Useauthredirect();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setSideBarOpen(true);
      } else {
        setSideBarOpen(false);
      }
    };
    handleRedirect();
    setLoading(false);
    fetchTour(id);
    accessdata();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleStartDateChange = (e) => {
    const [day, month, year] = e.target.value.split("-");
    if (day && month && year) {
      const selectedDate = new Date(e.target.value);
      const today = new Date();

      const min_date = new Date(today.toISOString().split("T")[0]);

      if (selectedDate < min_date) {
        setDateBegin(min_date);
        setMinDate(min_date);
        setDateEnd(min_date);
      } else {
        setDateBegin(e.target.value);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setMinDate(nextDay.toISOString().split("T")[0]);
      }

      const newTotalDays = calculateDaysBetweenDates(e.target.value, date_end);
      if (newTotalDays < route_data.length) {
        setRouteData(route_data.slice(0, newTotalDays));
      }
    }
  };

  const handleDateFocus = (e) => {
    // Ensure this is a user gesture
    if (e.target === document.activeElement) {
      e.target.showPicker();
    }
  };

  const handleEndDateChange = (e) => {
    const [day, month, year] = e.target.value.split("-");
    if (day && month && year) {
      const formattedDate = new Date(e.target.value);
      const dateBegin = new Date(date_begin);
      if (dateBegin && formattedDate < dateBegin) {
        setDateEnd(dateBegin);
      } else {
        setDateEnd(e.target.value);

        const newTotalDays = calculateDaysBetweenDates(
          date_begin,
          e.target.value
        );
        if (newTotalDays < route_data.length) {
          setRouteData(route_data.slice(0, newTotalDays));
        }
      }
    }
  };

  const handleStartDateBlur = () => {
    const [day, month, year] = date_begin.split("-");
    if (day && month && year) {
      const formattedDate = formatDateToMMDDYYYY(`${year}-${month}-${day}`);

      setStartDate(formattedDate);
    }
  };

  const handleEndDateBlur = () => {
    const [day, month, year] = date_end.split("-");
    if (day && month && year) {
      const formattedDate = formatDateToMMDDYYYY(`${year}-${month}-${day}`);
      setDateEnd(formattedDate);
      const start_Date = new Date(date_begin);
      const endDate = new Date(date_end);
      const daysDifference = Math.round(
        (endDate - start_Date) / (1000 * 3600 * 24)
      );
      setDaysCount(daysDifference + 1);
    }
  };
  const formatedDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (tourInformation) {
      const htmlToDraft = require("html-to-draftjs").default;

      const blocksFromHtml = htmlToDraft(tourInformation);
      const { contentBlocks, entityMap } = blocksFromHtml;

      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);

      setEditorState(editorState);
    }
  }, [tourInformation]);
  useEffect(() => {
    const updatedIncluded = includedData.map((item) => {
      const isChecked = tourInclude.split(",").includes(item.id);

      return { ...item, checked: isChecked };
    });
    setIncluded(updatedIncluded);
  }, [tourInclude, includedData]);

  useEffect(() => {
    const updatedServices = services.map((service) => {
      const foundService = additionalServices.find(
        (additionalService) => additionalService.title === service.title
      );
      if (foundService) {
        return {
          ...service,
          checked: true,
          price: foundService.price,
          service_id: foundService.id,
          title: foundService.title,
        };
      }
      return service;
    });
    setServices(updatedServices);
  }, [additionalServices]);
  useEffect(() => {
    if (departureDetails) {
      const updatedDepartures = departureDetails.map((departure) => {
        const foundDeparture = departures.find(
          (departureData) => departureData.id === departure.departure_id
        );
        if (foundDeparture) {
          return { ...departure, departure_id: foundDeparture.id };
        }
        return departure;
      });
      setDepartureRows(updatedDepartures);
    }
  }, [departureDetails]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsFocused(false);
    });
  }, [isFocused]);

  useEffect(() => {
    if (tourDetails) {
      setSelectedTour({ value: tourDetails.type, label: tourDetails.type });

      if (tourDetails.tour_image) {
        setImage2(tourDetails.tour_image || []);
      }
      setName(tourDetails.name);
      setCapacity(tourDetails.capacity);
      if (tourDetails.route_data) {
        try {
          const newRouteData = JSON.parse(tourDetails.route_data);
          if (newRouteData) {
            setDaysCount(newRouteData.length);
            const newRouteDataLen = newRouteData.map((day, index) => ({
              day: day.day_number,
              dayData: day.day,
              description: day.description,
            }));

            setRouteData(newRouteDataLen);
          }
        } catch (error) {
          console.error(error);
        }
      }
      {
        tourDetails.flight_info !== ""
          ? setFlightInformation(tourDetails.flight_info)
          : setFlightInformation("");
      }
      {
        tourDetails.flight_exclude == 1
          ? setRadioValueExcludeFlight("Yes")
          : setRadioValueExcludeFlight("No");
      }

      {
        tourDetails.visa_processing == 1
          ? setRadioValueVisa("Yes")
          : setRadioValueVisa("No");
      }
    }
  }, [tourDetails]);

  useEffect(() => {
    if (tourDetails && tourDetails.date_begin) {
      setSelectedTour({ value: tourDetails.type, label: tourDetails.type });
      setDateBegin(tourDetails.date_begin);
      setDateEnd(tourDetails.date_end);
      setMinEndDate(tourDetails.date_begin);
      const nextDay = new Date(tourDetails.date_begin);
      nextDay.setDate(nextDay.getDate() + 1);
      setMinDate(nextDay.toISOString().split("T")[0]);
    }
  }, [tourDetails]);

  useEffect(() => {
    if (flightData) {
      if (flightData.length > 0) {
        const updatedFlight = flightData.map((flight) => {
          const foundFlight = flightDetails.find(
            (flightData) => flightData.id === flight.flight_id
          );
          if (foundFlight) {
            return {
              ...flight,
              flight_id: foundFlight.id,
              flight_name: foundFlight.airline_name,
            };
          }
          return flight;
        });
        setFlightRow(updatedFlight);
      } else {
        setFlightData(...flightRow);
      }
    }
  }, [flightData, flightDetails]);

  useEffect(() => {
    const mekkaHotels = hotel_data.filter((hotel) => hotel.hotel_type == "1");
    const madinaHotels = hotel_data.filter((hotel) => hotel.hotel_type == "2");

    if (mekkaHotels) {
      const updatedMekka = mekkaHotels.map((hotel) => {
        return {
          hotel_id: hotel.hotel_id,
          hotel_name: hotel.hotel_name,
          hotel_price: hotel.hotel_price,
          hotel_info: hotel.hotel_info,
          id: hotel.id,
        };
      });

      setMekkaRows(updatedMekka);
    }

    if (madinaHotels) {
      const updatedMadina = madinaHotels.map((hotel) => {
        return {
          hotel_id: hotel.hotel_id,
          hotel_name: hotel.hotel_name,
          hotel_price: hotel.hotel_price,
          hotel_info: hotel.hotel_info,
          id: hotel.id,
        };
      });
      setMadinaRows(updatedMadina);
    }
  }, [hotel_data]);

  useEffect(() => {
    if (date_begin && date_end) {
      const startDate = new Date(formatDateToMMDDYYYY(date_begin));
      const endDate = new Date(formatDateToMMDDYYYY(date_end));
      const daysDifference = Math.round(
        (endDate - startDate) / (1000 * 3600 * 24)
      );
      setDaysCount(daysDifference + 1);
    }
  }, []);
  useEffect(() => {
    if (arrival_data.length > 0) {
      const updatedArrival = arrival_data.map((arrival) => {
        return {
          arrival_id: arrival.arrival_id,
          name: arrival.arrival,
        };
      });
      setArrivalrow(updatedArrival);
    }
  }, [arrival_data]);
  useEffect(() => {
    console.log(BedRoomData, "BedRoomData");
    const updateBed = BedRoomData.map((bed) => {
      return {
        id: bed.id,
        bedroom_name: bed.rooms,
        bedroom_capacity: bed.capacity,
      };
    });
    setBedroomRows(updateBed);
  }, [BedRoomData]);

  console.log(bedroomRows, "bedroomRows");

  const onEditorStateChange = (newEditorState) => {
    const editorContent = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(editorContent);
    const plainText = rawContent.blocks[0].text;
    setTourInfo(plainText);
    setEditorState(newEditorState);
  };

  const handleDeleteImage2 = async (index, event) => {
    event.preventDefault();

    if (index < image2.length) {
      const url = new URL(image2[index]);
      const fileName = url.pathname.split("/").pop();

      const formData = new FormData();
      formData.append("image", fileName);
      formData.append("type", "tour_image");
      formData.append("tour_id", id);

      const response = await POST.request({
        form: formData,
        url: "remove_imageordocument",
      });
      if (response.Status === "1") {
        showSuccessToast(translate, "Image removed successfully");
        fetchTour(id);
      } else {
        showErrorToast(translate, "Something went wrong");
      }
    } else {
      const newImagesCopy = [...newImages];
      newImagesCopy.splice(index - image2.length, 1);
      setNewImages(newImagesCopy);
      const uploadedImagesCopy = { ...uploadedImage };
      delete uploadedImagesCopy[index - image2.length];
      setUploadedImage(uploadedImagesCopy);
    }
  };

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

  const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start; // Difference in milliseconds
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days
    return daysDiff + 1; // Include the start day
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
      showErrorToast(
        translate,
        "Please fill in all required fields before proceeding"
      );
    }
  };
  const handleDayDescriptionChange = (dayNumber, dayData, description) => {
    setRouteData((prevData) => {
      const newData = [...prevData];
      const existingDay = newData.find((day) => day.day === dayNumber);
      if (existingDay) {
        existingDay.dayData = dayData;
        existingDay.description = description;
      } else {
        newData.push({ day: dayNumber, dayData, description });
      }
      return newData;
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
  // const handleCheckboxChange = (event, id) => {
  //   const updatedServices = services.map((service) =>
  //     service.id === id
  //       ? { ...service, checked: event.target.checked, service_id: 0 }
  //       : service
  //   );
  //   setServices(updatedServices);
  // };

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;

    const updatedServices = services.map((service) =>
      service.id === id
        ? { ...service, checked: isChecked }
        : { ...service, checked: service.checked }
    );

    const serviceId = services.find((service) => service.id === id).service_id;

    // Update services state
    setServices(updatedServices);

    // Update unchecked IDs state
    if (!isChecked) {
      setUncheckedIds((prev) => [...prev, serviceId]);
    } else {
      setUncheckedIds((prev) =>
        prev.filter((uncheckedId) => uncheckedId !== serviceId)
      ); // Remove from unchecked array
    }
  };

  const handlePriceChange = (event, id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, price: event.target.value } : service
    );
    setServices(updatedServices);
  };

  const handleImageChange2 = (event) => {
    const files = event.target.files;
    const promises = [];
    const uploadedImagesCopy = [...newImages];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          uploadedImagesCopy.push(reader.result);
          setUploadedImage((prevUploadedImages) => ({
            ...prevUploadedImages,
            [newImageIndex + i]: file,
          }));
          resolve();
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }

    Promise.all(promises).then(() => {
      setNewImages(uploadedImagesCopy);
      setNewImageIndex(newImageIndex + files.length);
    });
  };

  const HandleTourChange = (newValue, actionMeta) => {
    setSelectedTour(newValue);
  };

  const handleBedroomChange = (selectedOption, index) => {
    console.log(selectedOption, "selectedOption");

    setBedroomRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].bedroom_name = selectedOption ? selectedOption.value : "";
      return newRows;
    });
  };

  const handleCapacityChange = (e, index) => {
    setBedroomRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index].bedroom_capacity = e.target.value;
      return newRows;
    });
  };

  // const handleRadioChange = (event) => {
  //   setRadioValue(event.target.value);
  // };

  const options = tourType.map((type) => ({
    value: type,
    label: `${type}`,
  }));
  const departureOption = departures.map((departure) => ({
    value: departure.id,
    label: `${departure.departure}`,
  }));

  const ArrivalOption = Arrival?.map((arr) => ({
    value: arr.id,
    label: `${arr.arrival}`,
  }));

  const handleAddDepartureRow = () => {
    setDepartureRows([
      ...departureRows,
      { departure_id: "", price: "", id: "0" },
    ]);
  };

  const handleAddArrivalRow = () => {
    setArrivalrow([...arrivalrow, { arrival_id: "", name: "" }]);
  };

  const handleAddBedroomRow = () => {
    setBedroomRows([
      ...bedroomRows,
      { id: "0", bedroom_name: "", bedroom_capacity: "" },
    ]);
  };

  const handleRemoveBedroomRow = (index, data) => {
    console.log(data, "data");
    RemoveBed.push(data.id);
    setBedroomRows(bedroomRows.filter((_, i) => i !== index));
  };

  console.log(RemoveBed, "RemoveBed");

  const handleRemoveDepartureRow = (index) => {
    const id = departureRows[index].id;
    if (departureRows.length === 1) {
      return;
    }
    const newRows = [...departureRows];
    newRows.splice(index, 1);
    setDepartureRows(newRows);
    const newDeletedDeparture = [...DeletedDeparture];
    newDeletedDeparture.push(id);
    setDeletedDeparture(newDeletedDeparture);
    // setDeletedDeparture()
  };

  const handleRemoveArrivalRow = (index) => {
    const id = arrivalrow[index].arrival_id;

    if (arrivalrow.length === 1) {
      return;
    }
    const newRows = [...arrivalrow];
    newRows.splice(index, 1);
    setArrivalrow(newRows);
    const newDeletedArrival = [...DeletedArrival];
    newDeletedArrival.push(id);
    setDeletedArrival(newDeletedArrival);
  };

  const Madina = madinaHotel.map((hotel) => ({
    value: hotel.id,
    label: `${hotel.hotel_name} (${hotel.hotel_stars} Star)`,
  }));

  const ChooseFlight = flightDetails.map((flight) => ({
    value: flight.id,
    label: `${flight.airline_name}`,
  }));

  const handleAddMekkaRow = () => {
    setMekkaRows([
      ...mekkaRows,
      {
        hotel_id: "",
        hotel_name: null,
        hotel_price: "",
        hotel_info: "",
        id: "",
      },
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
      {
        hotel_id: "",
        hotel_name: null,
        hotel_price: "",
        hotel_info: "",
        id: "",
      },
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
  const handleMekkaChange = (value, index) => {
    if (!value) return;
    const selectedOption = mekkaHotel.find(
      (option) => option.id === value.value
    );
    const mekkaData = {
      ...mekkaRows[index],
      hotel_id: selectedOption.id,
      hotel_name: selectedOption.hotel_name,
    };
    const newRows = [...mekkaRows];
    newRows[index] = mekkaData;
    setMekkaRows(newRows);
  };

  const handleDepartureChange = (value, index) => {
    if (!value) return;
    const selectedOption = departures.find(
      (option) => option.id === value.value
    );
    if (departureRows[index].departure_id !== selectedOption?.id) {
      const departureData = {
        ...departureRows[index],
        departure_id: selectedOption?.id || "",
        departure: selectedOption?.departure || "",
      };
      const newRows = [...departureRows];
      newRows[index] = departureData;
      setDepartureRows(newRows);
    }
  };

  const handleArrivalchange = (value, index) => {
    if (!value) return;
    const selectedOption = Arrival.find((option) => option.id === value.value);

    const ArrivalData = {
      ...arrivalrow[index],
      arrival_id: selectedOption?.id || "",
      name: selectedOption?.arrival || "",
    };

    const newRows = [...arrivalrow];
    newRows[index] = ArrivalData;

    setArrivalrow(newRows);
  };

  const handleMadinaChange = (value, index) => {
    if (!value) return;
    const selectedOption = madinaHotel.find(
      (option) => option.id === value.value
    );

    const madinaData = {
      ...madinaRows[index],
      hotel_id: selectedOption?.id || "",
      hotel_name: selectedOption?.hotel_name || "",
    };
    const newRows = [...madinaRows];
    newRows[index] = madinaData;
    setMadinaRows(newRows);
  };

  const handleFlightSelectChange = (value, index) => {
    if (!value) return;
    const selectedOption = flightDetails.find(
      (option) => option.id === value.value
    );

    const flight_data = {
      ...flightRow[index],
      flight_id: selectedOption?.id || "",
      flight_name: selectedOption?.airline_name || "",
    };

    const newRows = [...flightRow];
    newRows[index] = flight_data;
    setFlightRow(newRows);
  };

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

  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    if (e.target.type === "date") {
      const formattedDate = formatDateToDDMMYYYY(value);
      setter(formattedDate);
    } else {
      setter(value);
    }
  };

  const isCurrentTabValid = () => {
    const totalDays = calculateDaysBetweenDates(date_begin, date_end);

    if (activeTab === "Content") {
      return (
        SelectedTour &&
        name &&
        capacity &&
        date_begin &&
        date_end &&
        selectRef.current.value &&
        departureRows.length > 0 &&
        bedroomRows.length > 0 &&
        bedroomRows.every((bed) => bed.bedroom_capacity && bed.bedroom_name) &&
        departureRows.every(
          (departure) => departure.departure_id && departure.price
        ) &&
        (image2.length > 0 ||
          Object.keys(uploadedImage).some((key) => uploadedImage[key])) &&
        arrivalrow.length > 0 &&
        arrivalrow.every((arrival) => arrival.arrival_id && arrival.name)
      );
    } else if (activeTab === "Pricing") {
      return adult_price >= 0 && child_price >= 0 && baby_price >= 0;
    } else if (activeTab === "Included") {
      return true;
    } else if (activeTab === "Overview") {
      return editorState !== EditorState.createEmpty();
    } else if (activeTab === "Itinerary") {
      // const isValidItinerary = route_data.length === totalDays && route_data.every(route =>
      //   route.dayData && route.description && route.day
      // );

      // return isValidItinerary;
      return true;
    } else if (activeTab === "Flight Hotel And Visa") {
      return (
        mekkaRows.every(
          (mekka) => mekka.hotel_id,
          mekka.hotel_name,
          mekka.hotel_price,
          mekka.hotel_info
        ) &&
        madinaRows.every(
          (madina) => madina.hotel_id,
          madina.hotel_name,
          madina.hotel_price,
          madina.hotel_info
        ) &&
        flightRow.every(
          (flight) =>
            flight.flight_id &&
            flight.flight_amount &&
            flight.no_of_stop &&
            flight.luggage &&
            flightInformation &&
            radioValueVisa &&
            radioValueExcludeFlight
        )
      );
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const totalDays = calculateDaysBetweenDates(date_begin, date_end);

    if (
      !date_begin ||
      !date_end ||
      !name ||
      !capacity ||
      departureRows.length == 0 ||
      (image2.length == 0 && newImages.length == 0) ||
      BedRoomData == 0 ||
      bedroomRows.some((bed) => !bed.bedroom_capacity || !bed.bedroom_name) ||
      !selectRef.current.value ||
      baby_price < 0 ||
      adult_price < 0 ||
      child_price < 0 ||
      arrivalrow.length == 0 ||
      arrivalrow.some((arrival) => !arrival.arrival_id || !arrival.name)
    ) {
      showErrorToast(
        translate,
        "Please fill in all required fields before proceeding"
      );
      setLoading(false);
      return;
    }

    // if(arrivalrow.length == 0 || arrivalrow.some((arrival) => !arrival.arrival_id || !arrival.name)){
    //   showErrorToast(translate, "Please fill in all required fields before proceeding");
    //   setLoading(false);
    //   return;
    // }

    // if (calculateDaysBetweenDates(date_begin, date_end) !== totalDays) {
    //   showErrorToast(
    //     translate,
    //     "Please fill in all day and description fields in the itinerary"
    //   );
    //   setLoading(false);
    //   return;
    // }

    const hasEmptyDayOrDescription = route_data.some((day) => {
      const { dayData, description } = day;
      return !dayData || !description;
    });

    // if (hasEmptyDayOrDescription || route_data.length !== totalDays) {
    //   showErrorToast(
    //     translate,
    //     "Please fill in all day and description fields in the itinerary"
    //   );
    //   setLoading(false);
    //   return;
    // }

    const end_date = formatDateToMMDDYYYY(date_end);
    const start_date = formatDateToMMDDYYYY(date_begin);

    const languageValues = $(selectRef.current).val();

    const languageString = languageValues.join(",");

    const mekkaData = mekkaRows.map((mekka) => ({
      hotel_type: 1,
      hotel_name: mekka.hotel_name ? mekka.hotel_name : "",
      hotel_id: mekka.hotel_id ? mekka.hotel_id : "",
      hotel_price: mekka.hotel_price,
      hotel_info: mekka.hotel_info,
      id: mekka.id ? mekka.id : 0,
    }));
    // const arrivalData = arrivalrow.map((arrival) => ({
    //   arrival: arrival.arrival_id ? arrival.arrival_id : "",
    // }));

    const madinaData = madinaRows.map((madina) => ({
      hotel_type: 2,
      hotel_name: madina.hotel_name ? madina.hotel_name : "",
      hotel_id: madina.hotel_id ? madina.hotel_id : "",
      hotel_price: madina.hotel_price,
      hotel_info: madina.hotel_info,
      id: madina.id ? madina.id : 0,
    }));

    const flight_data = flightRow.map((flight) => ({
      flight_id: flight.flight_id ? flight.flight_id : "",
      flight_amount: flight.flight_amount || 0,
      no_of_stop: flight.no_of_stop,
      luggage: flight.luggage,
      id: flight.id ? flight.id : 0,
    }));

    const BadData = bedroomRows.map((bed) => ({
      id: bed.id,
      rooms: bed.bedroom_name,
      capacity: bed.bedroom_capacity,
    }));

    const arrivalData = arrivalrow.map((arrival) => ({
      arrival_id: arrival.arrival_id ? arrival.arrival_id : "",
      name: arrival.name ? arrival.name : "",
    }));

    const ArrivalidArray = arrivalrow.map((item) => item?.arrival_id);

    if (
      !mekkaData.some(
        (mekka) => mekka.hotel_name && mekka.hotel_price && mekka.hotel_info
      ) &&
      !madinaData.some(
        (madina) => madina.hotel_name && madina.hotel_price && madina.hotel_info
      ) &&
      !BedRoomData.some((bed) => bed.bedroom_name && bed.bedroom_capacity) &&
      !flightData.some(
        (flight) =>
          flight.flight_id &&
          flight.flight_amount &&
          flight.no_of_stop &&
          flight.luggage
      ) &&
      !flightInformation
    ) {
      setLoading(false);
      showErrorToast(
        translate,
        "Please fill in all required fields before proceeding"
      );
      return;
    }

    const hotel_data = [...mekkaData, ...madinaData];

    const checkedServices = services.filter((service) => service.checked);
    const servicesData = checkedServices.reduce((acc, service) => {
      if (service.price !== "") {
        acc.push({
          title: service.title,
          price: service.price,
          service_id: service.service_id || 0,
        });
      }
      return acc;
    }, []);

    const checkedIncluded = included.filter((item) => item.checked);
    const includedData = checkedIncluded.map((item) => item.id).join(",");

    const newRouteData = route_data.map((day, index) => ({
      day: day.dayData,
      description: day.description,
    }));

    const tourInfo = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const image2FileArray = Object.entries(uploadedImage).map(
      ([key, value]) => value
    );

    const departureData = departureRows.map((departure) => ({
      departure_id: departure.departure_id ? departure.departure_id : "",
      price: departure.price ? departure.price : "",
      id: departure.id ? departure.id : "",
    }));

    const formData = new FormData();

    formData.append("type", SelectedTour.value);
    formData.append("name", name);
    formData.append("capacity", capacity);
    formData.append("date_begin", formatDateToMMDDYYYY(start_date));
    formData.append("date_end", formatDateToDDMMYYYY(end_date));
    formData.append("tour_languages", languageString);
    formData.append("adult_price", adult_price);
    formData.append("child_price", child_price);
    formData.append("baby_price", baby_price);
    formData.append("addition_service", JSON.stringify(servicesData));
    formData.append("tour_included", includedData);
    formData.append("tour_info", tourInfo);
    formData.append("flight_info", flightInformation);
    formData.append("route_data", JSON.stringify(newRouteData));
    formData.append("hotel_data", JSON.stringify(hotel_data));
    formData.append("flight_data", JSON.stringify(flight_data));
    formData.append("room_data", JSON.stringify(BadData));
    formData.append("visa_processing", radioValueVisa === "Yes" ? 1 : 0);
    formData.append("user_id", user?.user.id);
    formData.append("company_id", user?.user.company_id);
    formData.append("tour_id", id);
    formData.append("arrival", ArrivalidArray);
    formData.append("deleted_services", uncheckedIds.join(",") || "");
    formData.append("deleted_departure", DeletedDeparture.join(",") || "");
    formData.append("deleted_arrival", DeletedArrival.join(",") || "");
    formData.append("deleted_rooms", RemoveBed.join(",") || "");

    if (image2FileArray.length === 0) {
      formData.append("tour_image", "");
    } else {
      image2FileArray.forEach((file, index) => {
        formData.append(`tour_image[${index}]`, file);
      });
    }
    formData.append("departures", JSON.stringify(departureData));

    const url = "updatetour";

    try {
      const response = await POST.request({
        form: formData,
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      if (response) {
        showSuccessToast(translate, "Tour Updated Successfully");
        // setActiveTab("Content");
        // setActiveTabIndex(0);
        // fetchTour(id);
        setTimeout(() => {
          router.push("/vendor/listing");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatDateToMMDDYYYY = (date) => {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`dashboard overflow-hidden ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard `}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content ">
            <h1 className="text-30">{translate("Edit Tour")}</h1>

            <div className="rounded-12 bg-white shadow-2 px-40 py-60 mt-20">
              <div className="tabs -underline-2 js-tabs">
                <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                  {tabs.map((elm, i) => (
                    <div key={elm} className="col-auto">
                      <button
                        className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                          activeTab == elm ? "is-tab-el-active" : ""
                        }`}
                        onClick={() => isNextClicked && handleTabClick(elm, i)}
                        disabled={
                          i > activeTabIndex && !enabledTabs.includes(i)
                        }
                      >
                        {i + 1}. {translate(elm)}
                      </button>
                    </div>
                  ))}
                </div>

                <form noValidate onSubmit={handleSubmit}>
                  <div className="row pt-40">
                    <div className="col-xl-12 col-lg-12">
                      <div className="tabs__content js-tabs-content">
                        <div
                          className={`tabs__pane  ${
                            activeTab == "Content" ? "is-tab-el-active" : ""
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
                                      placeholder={`${translate(
                                        "Select Tour Type (Required)"
                                      )}`}
                                      classNamePrefix="react-select"
                                      isClearable
                                      formatCreateLabel={(inputValue) =>
                                        `Create custom gender: "${inputValue}"`
                                      }
                                    />
                                    {gender && gender.__isNew__ && (
                                      <input
                                        type="text"
                                        value={tourDetails.type || SelectedTour}
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
                                    <input
                                      type="text"
                                      required
                                      value={name}
                                      onChange={handleInputChange(setName)}
                                    />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Tour Name") ||
                                        "Find Latest Packages"}{" "}
                                      <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input
                                      type="number"
                                      min={1}
                                      required
                                      value={capacity}
                                      onChange={handleInputChange(setCapacity)}
                                      onKeyDown={(e) => {
                                        setIsFocused(true);
                                        if (
                                          !/^[0-9]+$/.test(e.key) &&
                                          e.key !== "Backspace" &&
                                          e.key !== "Tab"
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      onKeyUp={() => setIsFocused(false)}
                                      onFocus={() => setIsFocused(true)}
                                      onBlur={() => setIsFocused(false)}
                                    />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Seat Availibility") ||
                                        "Find Latest Packages"}{" "}
                                      <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input
                                      type="date"
                                      required
                                      value={date_begin || ""}
                                      pattern="\d{2}-\d{2}-\d{4}"
                                      min={minEndDate}
                                      onBlur={handleStartDateBlur}
                                      onChange={handleStartDateChange}
                                      onFocus={handleDateFocus}
                                      onKeyDown={(e) => e.preventDefault()}
                                    />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Start Date of Tour") ||
                                        "Find Latest Packages"}{" "}
                                      <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input
                                      type="date"
                                      required
                                      value={date_end || ""}
                                      min={minDate}
                                      pattern="\d{2}-\d{2}-\d{4}"
                                      onBlur={handleEndDateBlur}
                                      onChange={handleEndDateChange}
                                      onFocus={handleDateFocus}
                                      onKeyDown={(e) => e.preventDefault()}
                                    />
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("End Date of Tour") ||
                                        "Find Latest Packages"}{" "}
                                      <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1 position-relative">
                                    <select
                                      ref={selectRef}
                                      className="js-example-basic-multiple"
                                      name="states[]"
                                      multiple={true}
                                      placeholder="Langauge"
                                    >
                                      {languagesData.map((language) => (
                                        <option
                                          key={language.id}
                                          value={language.id}
                                          selected={
                                            tourDetails.tour_languages &&
                                            tourDetails.tour_languages.includes(
                                              language.id
                                            )
                                          }
                                        >
                                          {translate(language.languages_en) ||
                                            "Find Latest Packages"}
                                        </option>
                                      ))}
                                    </select>
                                    <label className="multi-lan-select">
                                      {translate("Langauge") ||
                                        "Find Latest Packages"}{" "}
                                      <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <h6>{translate("Bedroom Details")}</h6>
                                  <ul>
                                    {bedroomRows.map((row, index) => (
                                      <li key={index}>
                                        <div className="row items-center">
                                          <div className="col-lg-8">
                                            <div className="row items-center">
                                              <div className="col-lg-6 ">
                                                <Select
                                                  value={bedroomOptions.find(
                                                    (option) =>
                                                      option.value ===
                                                      row.bedroom_name
                                                  )}
                                                  onChange={(value) =>
                                                    handleBedroomChange(
                                                      value,
                                                      index
                                                    )
                                                  }
                                                  options={bedroomOptions}
                                                  classNamePrefix="react-select"
                                                  isClearable
                                                  placeholder={translate(
                                                    "Select Bedroom Name (Required)"
                                                  )}
                                                />
                                              </div>

                                              <div className="col-lg-6 ">
                                                <div className="form-input my-1">
                                                  <input
                                                    type="number"
                                                    min={1}
                                                    required
                                                    value={row.bedroom_capacity}
                                                    onChange={(e) =>
                                                      handleCapacityChange(
                                                        e,
                                                        index
                                                      )
                                                    }
                                                    onKeyDown={(e) => {
                                                      if (!isFocused) return;

                                                      if (
                                                        !/^[0-9]+$/.test(
                                                          e.key
                                                        ) &&
                                                        e.key !== "Backspace" &&
                                                        e.key !== "Tab"
                                                      ) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                    onKeyUp={() =>
                                                      setIsFocused(false)
                                                    }
                                                    onFocus={() =>
                                                      setIsFocused(true)
                                                    }
                                                    onBlur={() =>
                                                      setIsFocused(false)
                                                    }
                                                  />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {translate(
                                                      "Enter Bedroom Capacity"
                                                    )}
                                                    <span className="text-red">
                                                      *
                                                    </span>
                                                  </label>
                                                </div>
                                                {/* <div className="form-input my-1">
                                                  <input
                                                    type="number"
                                                    min={1}
                                                    required
                                                    value={capacity}
                                                    onChange={handleInputChange(
                                                      setCapacity
                                                    )}
                                                    onKeyDown={(e) => {
                                                      setIsFocused(true);
                                                      if (
                                                        !/^[0-9]+$/.test(
                                                          e.key
                                                        ) &&
                                                        e.key !== "Backspace" &&
                                                        e.key !== "Tab"
                                                      ) {
                                                        e.preventDefault();
                                                      }
                                                    }}
                                                    onKeyUp={() =>
                                                      setIsFocused(false)
                                                    }
                                                    onFocus={() =>
                                                      setIsFocused(true)
                                                    }
                                                    onBlur={() =>
                                                      setIsFocused(false)
                                                    }
                                                  />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {translate(
                                                      "Seat Availibility"
                                                    ) ||
                                                      "Find Latest Packages"}{" "}
                                                    <span className="text-red">
                                                      *
                                                    </span>
                                                  </label>
                                                </div> */}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-2 d-flex">
                                            <button
                                              type="button"
                                              className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                              onClick={handleAddBedroomRow}
                                              style={{
                                                height: "fit-content",
                                              }}
                                            >
                                              +
                                            </button>
                                            {index > 0 && (
                                              <button
                                                type="button"
                                                className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                                style={{
                                                  height: "fit-content",
                                                }}
                                                onClick={() =>
                                                  handleRemoveBedroomRow(
                                                    index,
                                                    row
                                                  )
                                                }
                                              >
                                                -
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="col-md-12">
                                  <h6> {translate("Departure")}</h6>
                                  <ul className="">
                                    {departureRows.map((row, index) => (
                                      <li key={index}>
                                        <div className=" row">
                                          <div className="col-lg-8">
                                            <div className="row">
                                              <div className="col-md-6 form-input spacing d-flex flex-column align-items-center">
                                                <CreatableSelect
                                                  value={{
                                                    value:
                                                      departureRows[index]
                                                        .departure_id,
                                                    label:
                                                      departureRows[index]
                                                        .departure,
                                                  }}
                                                  onChange={(value) =>
                                                    handleDepartureChange(
                                                      value,
                                                      index
                                                    )
                                                  }
                                                  options={departureOption}
                                                  className="custom-select Hotel-Madina-dd"
                                                  placeholder={`${translate(
                                                    "Select Departure (Required)"
                                                  )}`}
                                                  classNamePrefix="react-select"
                                                  isClearable
                                                  formatCreateLabel={(
                                                    inputValue
                                                  ) =>
                                                    `Not Found: "${inputValue}"`
                                                  }
                                                />
                                              </div>

                                              <div className="col-md-6">
                                                {/* <div className="form-input spacing">
                                                  <input
                                                    type="number"
                                                    required
                                                    value={
                                                      departureRows[index].price
                                                    }
                                                    onChange={(e) =>
                                                      setDepartureRows(
                                                        (prevRows) => {
                                                          const newRows = [
                                                            ...prevRows,
                                                          ];
                                                          newRows[index].price =
                                                            e.target.value;
                                                          return newRows;
                                                        }
                                                      )
                                                    }
                                                    onKeyDown={(e) => {
                                                      setIsFocused(true);
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
                                                      "Find Latest Packages"}{" "}
                                                    <span className="text-red">
                                                      *
                                                    </span>
                                                  </label>
                                                </div> */}
                                                <div className="col-2 d-flex">
                                                  <button
                                                    type="button"
                                                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                                    onClick={
                                                      handleAddDepartureRow
                                                    }
                                                    style={{
                                                      height: "fit-content",
                                                    }}
                                                  >
                                                    +
                                                  </button>
                                                  {index > 0 && (
                                                    <button
                                                      type="button"
                                                      className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                                      style={{
                                                        height: "fit-content",
                                                      }}
                                                      onClick={() =>
                                                        handleRemoveDepartureRow(
                                                          index
                                                        )
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
                                  <h6> {translate("Arrival")}</h6>
                                  <ul className="">
                                    {arrivalrow.map((row, index) => (
                                      <li key={index}>
                                        <div className=" row">
                                          <div className="col-lg-8">
                                            <div className="row">
                                              <div className="col-md-8 form-input spacing d-flex flex-column align-items-center">
                                                <CreatableSelect
                                                  value={
                                                    arrivalrow[index]?.name
                                                      ? {
                                                          value:
                                                            arrivalrow[index]
                                                              .arrival_id,
                                                          label:
                                                            arrivalrow[index]
                                                              .name,
                                                        }
                                                      : null
                                                  }
                                                  onChange={(value) =>
                                                    handleArrivalchange(
                                                      value,
                                                      index
                                                    )
                                                  }
                                                  options={ArrivalOption}
                                                  className="custom-select Hotel-Madina-dd"
                                                  placeholder={`${translate(
                                                    "Select Arrival (Required)"
                                                  )}`}
                                                  classNamePrefix="react-select"
                                                  isClearable
                                                  formatCreateLabel={(
                                                    inputValue
                                                  ) =>
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
                                                    onClick={
                                                      handleAddArrivalRow
                                                    }
                                                    style={{
                                                      height: "fit-content",
                                                    }}
                                                  >
                                                    +
                                                  </button>
                                                  {index > 0 && (
                                                    <button
                                                      type="button"
                                                      className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                                      style={{
                                                        height: "fit-content",
                                                      }}
                                                      onClick={() =>
                                                        handleRemoveArrivalRow(
                                                          index
                                                        )
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
                                  {translate("Gallery")}{" "}
                                  <span className="text-red">*</span>
                                </h4>

                                <div className="row x-gap-20 y-gap-20">
                                  {[...image2, ...newImages].map(
                                    (image, index) => (
                                      <div
                                        className="col-auto my-2"
                                        key={index}
                                      >
                                        <div className="relative">
                                          <Image
                                            width={200}
                                            height={200}
                                            src={image}
                                            alt={`image-${index}`}
                                            className="size-200 rounded-12 object-cover"
                                          />
                                          <button
                                            onClick={(e) =>
                                              handleDeleteImage2(index, e)
                                            }
                                            className="absoluteIcon1 button -dark-1"
                                          >
                                            <i className="icon-delete text-18"></i>
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )}

                                  <div className="col-auto my-2">
                                    <label
                                      htmlFor="imageInp2"
                                      className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                    >
                                      <Image
                                        width="40"
                                        height="40"
                                        alt="image"
                                        name="image2"
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
                                    />
                                  </div>
                                </div>

                                <div className="text-14 mt-20">
                                  {translate(
                                    "PNG or JPG no Bigger Than 800px Wide And Tall."
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          {activeTabIndex < tabs.length - 1 && (
                            <div className="d-flex">
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4 me-2"
                                onClick={handleNextTab}
                                type="button"
                              >
                                {translate("Next")}
                              </button>
                              <button
                                type="submit"
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                              >
                                {loading ? (
                                  <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{ height: "30px", width: "100%" }}
                                  >
                                    <ClipLoader color="#ffffff" size={30} />
                                  </div>
                                ) : (
                                  translate("Save Details")
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                        <div
                          className={`tabs__pane  ${
                            activeTab === "Pricing" ? "is-tab-el-active" : ""
                          }`}
                        >
                          <div className="y-gap-30 contactForm px-lg-20 px-0 ">
                            <div className="contactForm row y-gap-30 items-center ">
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input
                                    type="number"
                                    required
                                    value={adult_price}
                                    onChange={handleInputChange(setAdultPrice)}
                                    onKeyDown={(e) => {
                                      setIsFocused(true);
                                      if (
                                        !/^[0-9]+$/.test(e.key) &&
                                        e.key !== "Backspace" &&
                                        e.key !== "Tab"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onKeyUp={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Adult") ||
                                      "Find Latest Packages"}{" "}
                                    <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input
                                    type="number"
                                    required
                                    value={child_price}
                                    onChange={handleInputChange(setChildPrice)}
                                    onKeyDown={(e) => {
                                      setIsFocused(true);
                                      if (
                                        !/^[0-9]+$/.test(e.key) &&
                                        e.key !== "Backspace" &&
                                        e.key !== "Tab"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onKeyUp={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Child") ||
                                      "Find Latest Packages"}{" "}
                                    <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input
                                    type="number"
                                    required
                                    value={baby_price}
                                    onChange={handleInputChange(setBabyPrice)}
                                    onKeyDown={(e) => {
                                      setIsFocused(true);
                                      if (
                                        !/^[0-9]+$/.test(e.key) &&
                                        e.key !== "Backspace" &&
                                        e.key !== "Tab"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onKeyUp={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Baby") ||
                                      "Find Latest Packages"}{" "}
                                    <span className="text-red">*</span>
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

                              {services.map((service) => (
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
                                          checked={service.checked || false}
                                          onChange={(event) =>
                                            handleCheckboxChange(
                                              event,
                                              service.id
                                            )
                                          }
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
                                        {translate(service.title)}
                                      </label>
                                    </div>
                                  </div>
                                  {service.checked && (
                                    <div className="col-lg-6">
                                      <div className="form-input my-1">
                                        <input
                                          type="number"
                                          id={`service-${service.id}`}
                                          value={service.price}
                                          onChange={(event) =>
                                            handlePriceChange(event, service.id)
                                          }
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
                              <div className="d-flex">
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 me-2 "
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  {translate("Previous")}
                                </button>
                                <button
                                  type="submit"
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                >
                                  {loading ? (
                                    <div
                                      className="d-flex justify-content-center align-items-center"
                                      style={{ height: "30px", width: "100%" }}
                                    >
                                      <ClipLoader color="#ffffff" size={30} />
                                    </div>
                                  ) : (
                                    translate("Save Details")
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className={`tabs__pane ${
                            activeTab == "Included" ? "is-tab-el-active" : ""
                          }`}
                        >
                          <div className="row  y-gap-30 contactForm px-lg-20 px-0">
                            {included.map((item, index) => (
                              <div className="col-md-4" key={index}>
                                <div className="row y-gap-20">
                                  <div className="col-12 px-0 my-1">
                                    <div className="d-flex items-center pointer-check">
                                      <div className="form-checkbox">
                                        <input
                                          type="checkbox"
                                          id={`item-${item.id}`}
                                          name={`item-${item.id}`}
                                          checked={item.checked}
                                          onChange={(e) => {
                                            const updatedIncluded =
                                              included.map((includedItem) =>
                                                includedItem.id === item.id
                                                  ? {
                                                      ...includedItem,
                                                      checked: e.target.checked,
                                                    }
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
                                        {translate(item.option) ||
                                          "Find Latest Packages"}
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
                              <div className="d-flex">
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 me-2 "
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  {translate("Previous")}
                                </button>
                                <button
                                  type="submit"
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                >
                                  {loading ? (
                                    <div
                                      className="d-flex justify-content-center align-items-center"
                                      style={{ height: "30px", width: "100%" }}
                                    >
                                      <ClipLoader color="#ffffff" size={30} />
                                    </div>
                                  ) : (
                                    translate("Save Details")
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className={`tabs__pane  ${
                            activeTab == "Overview" ? "is-tab-el-active" : ""
                          }`}
                        >
                          <div className="y-gap-30 contactForm px-lg-20 px-0 ">
                            {typeof window != "undefined" && (
                              <Editor
                                editorState={editorState}
                                toolbarClassName="border"
                                wrapperClassName=""
                                editorClassName="border px-2"
                                onEditorStateChange={(e) => setEditorState(e)}
                              />
                            )}
                            <input
                              type="hidden"
                              name="Title"
                              id="Title"
                              value={
                                editorState &&
                                draftToHtml(
                                  convertToRaw(editorState.getCurrentContent())
                                )
                              }
                            />
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
                              <div className="d-flex">
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 me-2 "
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  {translate("Previous")}
                                </button>
                                <button
                                  type="submit"
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                >
                                  {loading ? (
                                    <div
                                      className="d-flex justify-content-center align-items-center"
                                      style={{ height: "30px", width: "100%" }}
                                    >
                                      <ClipLoader color="#ffffff" size={30} />
                                    </div>
                                  ) : (
                                    translate("Save Details")
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className={`tabs__pane  ${
                            activeTab == "Itinerary" ? "is-tab-el-active" : ""
                          }`}
                        >
                          <div className="form_2">
                            <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                              {Array.from(
                                { length: daysCount },
                                (_, i) => i + 1
                              ).map((dayNumber) => (
                                // <ItineraryDayInput key={dayNumber} dayNumber={dayNumber} />

                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-input my-1">
                                      <input
                                        type="text"
                                        value={
                                          route_data.find(
                                            (day) => day.day === dayNumber
                                          )?.dayData || ""
                                        }
                                        onChange={(e) =>
                                          handleDayDescriptionChange(
                                            dayNumber,
                                            e.target.value,
                                            ""
                                          )
                                        }
                                        className=""
                                      />
                                      <label className="lh-1 text-16 text-light-1">
                                        {translate("Day")} {dayNumber}{" "}
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-input my-1">
                                      <textarea
                                        type="text"
                                        rows="2"
                                        cols="80"
                                        value={
                                          route_data.find(
                                            (day) => day.day === dayNumber
                                          )?.description || ""
                                        }
                                        onChange={(e) =>
                                          handleDayDescriptionChange(
                                            dayNumber,
                                            route_data.find(
                                              (day) => day.day === dayNumber
                                            )?.dayData,
                                            e.target.value
                                          )
                                        }
                                      />
                                      <label className="lh-1 text-16 text-light-1">
                                        {translate("Description")}{" "}
                                      </label>
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
                              <div className="d-flex">
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 me-2"
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  {translate("Previous")}
                                </button>
                                <button
                                  type="submit"
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                >
                                  {loading ? (
                                    <div
                                      className="d-flex justify-content-center align-items-center"
                                      style={{ height: "30px", width: "100%" }}
                                    >
                                      <ClipLoader color="#ffffff" size={30} />
                                    </div>
                                  ) : (
                                    translate("Save Details")
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          className={`tabs__pane  ${
                            activeTab == "Flight Hotel And Visa"
                              ? "is-tab-el-active"
                              : ""
                          }`}
                        >
                          <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                            <div className="d-flex item-center  border-1 px-3 mb-4 justify-content-between">
                              <h5> {translate("Visa Processing")}</h5>
                              <div className="flex_start visaYESNOFLEx my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupVisa"
                                        value="Yes"
                                        checked={radioValueVisa === "Yes"}
                                        onChange={(event) =>
                                          setRadioValueVisa(event.target.value)
                                        }
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
                                        onChange={(event) =>
                                          setRadioValueVisa(event.target.value)
                                        }
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
                              <h6> {translate("Mekka Hotel")}</h6>

                              <ul className="">
                                {mekkaRows.map((row, index) => (
                                  <li key={index}>
                                    <div className=" row">
                                      <div className="col-lg-8">
                                        <div className="row">
                                          <div className="col-lg-6 col-md-auto col-12 form-input spacing d-flex flex-column align-items-center hotel-mekka">
                                            <CreatableSelect
                                              value={{
                                                value:
                                                  mekkaRows[index].hotel_id,
                                                label:
                                                  mekkaRows[index].hotel_name,
                                              }}
                                              onChange={(value) =>
                                                handleMekkaChange(value, index)
                                              }
                                              options={options2}
                                              className="custom-select Hotel-Mekka-dd"
                                              placeholder={`${translate(
                                                "Select Hotel For Mekka (Required)"
                                              )}`}
                                              classNamePrefix="react-select"
                                              isClearable
                                              formatCreateLabel={(inputValue) =>
                                                `Not Found: "${inputValue}"`
                                              }
                                            />
                                          </div>

                                          <div className="col-lg-6 col-md-auto col-12">
                                            <div className="form-input spacing">
                                              <input
                                                type="number"
                                                required
                                                value={
                                                  mekkaRows[index].hotel_price
                                                }
                                                onChange={(e) =>
                                                  setMekkaRows((prevRows) => {
                                                    const newRows = [
                                                      ...prevRows,
                                                    ];
                                                    newRows[index].hotel_price =
                                                      e.target.value;
                                                    return newRows;
                                                  })
                                                }
                                                onKeyDown={(e) => {
                                                  setIsFocused(true);
                                                  if (
                                                    !/^[0-9]+$/.test(e.key) &&
                                                    e.key !== "Backspace" &&
                                                    e.key !== "Tab"
                                                  ) {
                                                    e.preventDefault();
                                                  }
                                                }}
                                                onKeyUp={() =>
                                                  setIsFocused(false)
                                                }
                                                onFocus={() =>
                                                  setIsFocused(true)
                                                }
                                                onBlur={() =>
                                                  setIsFocused(false)
                                                }
                                              />
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Hotel Price") ||
                                                  "Find Latest Packages"}{" "}
                                                <span className="text-red">
                                                  *
                                                </span>
                                              </label>
                                            </div>
                                          </div>

                                          <div className="col-lg-12 col-md-auto col-12">
                                            <div className="form-input m-0">
                                              <textarea
                                                required
                                                rows="1"
                                                value={
                                                  mekkaRows[index].hotel_info
                                                }
                                                onChange={(e) =>
                                                  setMekkaRows((prevRows) => {
                                                    const newRows = [
                                                      ...prevRows,
                                                    ];
                                                    newRows[index].hotel_info =
                                                      e.target.value;
                                                    return newRows;
                                                  })
                                                }
                                              ></textarea>
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Description") ||
                                                  "Find Latest Packages"}{" "}
                                                <span className="text-red">
                                                  *
                                                </span>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-2 d-flex">
                                        <button
                                          type="button"
                                          className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                          style={{ height: "fit-content" }}
                                          onClick={handleAddMekkaRow}
                                        >
                                          +
                                        </button>
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                            style={{ height: "fit-content" }}
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

                              <h6> {translate("Madina Hotel ")}</h6>
                              <ul className="">
                                {madinaRows.map((row, index) => (
                                  <li key={index}>
                                    <div className=" row">
                                      <div className="col-lg-8">
                                        <div className="row">
                                          <div className="col-md-6 form-input spacing d-flex flex-column align-items-center">
                                            <CreatableSelect
                                              value={{
                                                value:
                                                  madinaRows[index].hotel_id,
                                                label:
                                                  madinaRows[index].hotel_name,
                                              }}
                                              onChange={(value) =>
                                                handleMadinaChange(value, index)
                                              }
                                              options={Madina}
                                              className="custom-select Hotel-Madina-dd"
                                              placeholder={`${translate(
                                                "Select Hotel For Madina (Required)"
                                              )}`}
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
                                                required
                                                value={
                                                  madinaRows[index].hotel_price
                                                }
                                                onChange={(e) =>
                                                  setMadinaRows((prevRows) => {
                                                    const newRows = [
                                                      ...prevRows,
                                                    ];
                                                    newRows[index].hotel_price =
                                                      e.target.value;
                                                    return newRows;
                                                  })
                                                }
                                                onKeyDown={(e) => {
                                                  setIsFocused(true);
                                                  if (
                                                    !/^[0-9]+$/.test(e.key) &&
                                                    e.key !== "Backspace" &&
                                                    e.key !== "Tab"
                                                  ) {
                                                    e.preventDefault();
                                                  }
                                                }}
                                                onKeyUp={() =>
                                                  setIsFocused(false)
                                                }
                                                onFocus={() =>
                                                  setIsFocused(true)
                                                }
                                                onBlur={() =>
                                                  setIsFocused(false)
                                                }
                                              />
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Hotel Price") ||
                                                  "Find Latest Packages"}{" "}
                                                <span className="text-red">
                                                  *
                                                </span>
                                              </label>
                                            </div>
                                          </div>

                                          <div className="col-md-12">
                                            <div className="form-input m-0">
                                              <textarea
                                                required
                                                rows="1"
                                                value={
                                                  madinaRows[index].hotel_info
                                                }
                                                onChange={(e) =>
                                                  setMadinaRows((prevRows) => {
                                                    const newRows = [
                                                      ...prevRows,
                                                    ];
                                                    newRows[index].hotel_info =
                                                      e.target.value;
                                                    return newRows;
                                                  })
                                                }
                                              ></textarea>
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate("Description") ||
                                                  "Find Latest Packages"}{" "}
                                                <span className="text-red">
                                                  *
                                                </span>
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
                            {/* <div className="d-flex flex-wrap item-center justify-content-between">
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
                                        checked={
                                          radioValueExcludeFlight === "Yes"
                                        }
                                        onChange={(event) =>
                                          setRadioValueExcludeFlight(
                                            event.target.value
                                          )
                                        }
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
                                        checked={
                                          radioValueExcludeFlight === "No"
                                        }
                                        onChange={(event) =>
                                          setRadioValueExcludeFlight(
                                            event.target.value
                                          )
                                        }
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
                            </div> */}
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
                                    onChange={(e) =>
                                      setFlightInformation(e.target.value)
                                    }
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Flight Information")}{" "}
                                    <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            {/* <div className="d-flex flex-wrap item-center justify-content-between">
                              <h6>{translate("Enter Flight Details")}</h6>
                              <div className="flex_start visaYESNOFLEx my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio d-flex items-center">
                                      <input
                                        type="radio"
                                        name="radioGroupFlight"
                                        value="Yes"
                                        checked={radioValueFlight === "Yes"}
                                        onChange={(event) =>
                                          setRadioValueFlight(
                                            event.target.value
                                          )
                                        }
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
                                        onChange={(event) =>
                                          setRadioValueFlight(
                                            event.target.value
                                          )
                                        }
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
                            </div> */}

                            <div className="d-flex item-center justify-content-between pt-10">
                              <h6> {translate("Add Flight Details")}</h6>
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
                                              value={{
                                                value: flightRow[index].id,
                                                label:
                                                  flightRow[index].flight_name,
                                              }}
                                              onChange={(value) =>
                                                handleFlightSelectChange(
                                                  value,
                                                  index
                                                )
                                              }
                                              options={ChooseFlight}
                                              className="custom-select Flight-selected-dd"
                                              placeholder={`${translate(
                                                "Select Flight"
                                              )}`}
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
                                                required
                                                value={
                                                  flightRow[index].flight_amount
                                                }
                                                onChange={(e) =>
                                                  setFlightRow((prevRows) => {
                                                    const newRows = [
                                                      ...prevRows,
                                                    ];
                                                    newRows[
                                                      index
                                                    ].flight_amount =
                                                      e.target.value;
                                                    return newRows;
                                                  })
                                                }
                                                onKeyDown={(e) => {
                                                  setIsFocused(true);
                                                  if (
                                                    !/^[0-9]+$/.test(e.key) &&
                                                    e.key !== "Backspace" &&
                                                    e.key !== "Tab"
                                                  ) {
                                                    e.preventDefault();
                                                  }
                                                }}
                                                onKeyUp={() =>
                                                  setIsFocused(false)
                                                }
                                                onFocus={() =>
                                                  setIsFocused(true)
                                                }
                                                onBlur={() =>
                                                  setIsFocused(false)
                                                }
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
                                                required
                                                value={
                                                  flightRow[index].no_of_stop
                                                }
                                                onChange={(e) =>
                                                  setFlightRow((prevRows) => {
                                                    const newRows = [
                                                      ...prevRows,
                                                    ];
                                                    newRows[index].no_of_stop =
                                                      e.target.value;
                                                    return newRows;
                                                  })
                                                }
                                                onKeyDown={(e) => {
                                                  setIsFocused(true);
                                                  if (
                                                    !/^[0-9]+$/.test(e.key) &&
                                                    e.key !== "Backspace" &&
                                                    e.key !== "Tab"
                                                  ) {
                                                    e.preventDefault();
                                                  }
                                                }}
                                                onKeyUp={() =>
                                                  setIsFocused(false)
                                                }
                                                onFocus={() =>
                                                  setIsFocused(true)
                                                }
                                                onBlur={() =>
                                                  setIsFocused(false)
                                                }
                                              />
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate(
                                                  "No of Flight Stops"
                                                ) || "Find Latest Packages"}
                                              </label>
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="form-input spacing">
                                              <input
                                                type="number"
                                                required
                                                value={flightRow[index].luggage}
                                                onChange={(e) =>
                                                  setFlightRow((prevRows) => {
                                                    const newRows = [
                                                      ...prevRows,
                                                    ];
                                                    newRows[index].luggage =
                                                      e.target.value;
                                                    return newRows;
                                                  })
                                                }
                                                onKeyDown={(e) => {
                                                  setIsFocused(true);
                                                  if (
                                                    !/^[0-9]+$/.test(e.key) &&
                                                    e.key !== "Backspace" &&
                                                    e.key !== "Tab"
                                                  ) {
                                                    e.preventDefault();
                                                  }
                                                }}
                                                onKeyUp={() =>
                                                  setIsFocused(false)
                                                }
                                                onFocus={() =>
                                                  setIsFocused(true)
                                                }
                                                onBlur={() =>
                                                  setIsFocused(false)
                                                }
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
                                              style={{ height: "fit-content" }}
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
                                                style={{
                                                  height: "fit-content",
                                                }}
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
                          </div>
                          <div className=" flex_start">
                            {activeTabIndex > 0 && (
                              <button
                                className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                onClick={handlePrevTab}
                                type="button"
                              >
                                {translate("Previous")}
                              </button>
                            )}
                            <button
                              type="submit"
                              className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                            >
                              {loading ? (
                                <div
                                  className="d-flex justify-content-center align-items-center"
                                  style={{ height: "30px", width: "100%" }}
                                >
                                  <ClipLoader color="#ffffff" size={30} />
                                </div>
                              ) : (
                                translate("Save Details")
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center pt-30">
              © {translate("Copyright MekkaBooking.com")}{" "}
              {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
