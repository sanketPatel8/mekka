"use client";

import Header from "@/components/dasboard/Header";
import { useState, useRef, useEffect, use } from "react";
import Image from "next/image";
import Map from "@/components/pages/contact/Map";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import CreatableSelect from "react-select/creatable";
import { FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import $ from "jquery";
import "select2/dist/css/select2.css";
import { useTranslation } from "@/app/context/TranslationContext";
import { useParams, useRouter } from "next/navigation";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
import { languages } from "@/data/tourFilteringOptions";
import { showErrorToast } from "@/app/utils/tost";
import { toast, ToastContainer } from "react-toastify";

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
  const {user} = useAuthContext();

  const params = useParams();
  const id = params.id[0];
  const [tourDetails,setTourDetails] = useState({});

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
  const [tour_included, setTourIncluded] = useState(0);
  const [tour_info, setTourInfo] = useState("");
  const [tourInformation, setTourInformation] = useState("");
  const [free_cancellation, setFreeCancellation] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [departureRows, setDepartureRows] = useState([
    { departure_id:"", price: "",id:"" },
  ]);
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
  const [dayData,setDayData] = useState("");
  const [daysCount, setDaysCount] = useState(0);
  const [dayDescription, setDayDescription] = useState("");
  const [included,setIncluded] = useState([
    // { title: "Beverages, drinking water, morning tea an buffet lunch", value: "1", checked: false },
    // { title: "Wifi", value: "2", checked: false },
    // { title: "InsuranceTransfer to a private pier", value: "3", checked: false },
    // { title: "Local taxes", value: "4", checked: false },
    // { title: "Hotel pickup and drop-off by air-conditioned minivan", value: "5", checked: false },
    // { title: "Soft drinks", value: "6", checked: false },
    // { title: "Tour Guide", value: "7", checked: false },
  ]);
  const [includedData, setIncludedData] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [mekkaRows, setMekkaRows] = useState([
    { hotel_id:"",hotel_name: null, hotel_price: "",hotel_info:"" },

  ]);
  const [madinaRows, setMadinaRows] = useState([
    {hotel_id:"", hotel_name: null, hotel_price: "",hotel_info:"" },
  ]);
  const [flightRow, setFlightRow] = useState([
    { flight_id: " ", flight_amount: " ", no_of_stop: " ",luggage:"" },
  ]);
  const [mekkaHotel, setMekkaHotel] = useState([]);
  const [madinaHotel, setMadinaHotel] = useState([]);
  const [departures, setDepartures] = useState([]);

  const [flightDetails, setFlightDetails] = useState([]);
  const [tourType, setTourType] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [departureDetails, setDepartureDetails] = useState([]);
  const [tourInclude, setTourInclude] = useState("");
  const [radioValueVisa, setRadioValueVisa] = useState('No');
  const [languagesData, setlanguagesData] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  // const [radioValueFreeCancel, setRadioValueFreeCancel] = useState('No');
  const [radioValueExcludeFlight, setRadioValueExcludeFlight] = useState('No');

  const [radioValueFlight, setRadioValueFlight] = useState('No');
  const options2 = mekkaHotel.map((hotel) => ({
    value: hotel.id,
    label: `${hotel.hotel_name} (${hotel.hotel_stars} Star)`,
  }));
  const fetchTour = async (id) => {
    const formData = new FormData();
    formData.append("id", id);
    const response = await POST.request({form:formData , url: "tourdetails"});
    if(response){
      setTourInformation(response.Tour_Details.details.tour_info);
      setTourDetails(response.Tour_Details.details);
      setAdditionalServices(response.Tour_Details.addition_service);
      setFlightData(response.Tour_Details.flight_data);
      setDepartureDetails(response.Tour_Details.departure_data);
      setHotelData(response.Tour_Details.hotel_data);
      setTourInclude(response.Tour_Details.details.tour_included);
      const adultPrice = response.Tour_Details.adult_price.map((price) => (setAdultPrice(price.price)));
      const childPrice = response.Tour_Details.child_price.map((price) => (setChildPrice(price.price)));
      const babyPrice = response.Tour_Details.baby_price.map((price) => (setBabyPrice(price.price)));

      

    }
  }
  const accessdata = async() => {
    const url ="tour_data"

    try{
      const response = await POST.request({url:url})
      if(response.Data){
        setMekkaHotel(response.Data.mekka_hotels)
        setMadinaHotel(response.Data.medina_hotels)
        setFlightDetails(response.Data.airline)
        setTourType(response.Data.tour_type)
        setlanguagesData(response.Data.languages)
        setIncludedData(response.Data.amenities)
        setDepartures(response.Data.departure)
      }
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setSideBarOpen(true);
      } else {
        setSideBarOpen(false);
      }
    };

    fetchTour(id);
    accessdata();
    
 
    // Set the initial state based on the screen size
    handleResize();

    // Add event listener to update state on resize
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const formatedDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };

  useEffect(()=>{

    if(tourInformation){
      const editorContent = ContentState.createFromText(tourInformation);
    const editorState = EditorState.createWithContent(editorContent);
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const plainText = rawContent.blocks[0].text;
    setTourInfo(plainText);
    setEditorState(editorState);
    }


  },[tourInformation])
  useEffect(() => {
    console.log(tourInclude,"tourInclude");
    console.log(includedData,"included");
      const updatedIncluded = includedData.map((item) => {
        console.log(item,"item")
        const isChecked = tourInclude.includes(item.id);
        
        console.log(isChecked,"isChecked");
        return { ...item, checked: isChecked };
      });
      setIncluded(updatedIncluded);
      console.log(updatedIncluded,"updatedIncluded");
    
  }, [ tourInclude,includedData]);
useEffect(() => {
  if(departureDetails){
    const updatedDepartures = departureDetails.map((departure) => {
      const foundDeparture = departures.find((departureData) => departureData.id === departure.departure_id);
      if (foundDeparture) {
        return { ...departure, departure_id: foundDeparture.id };
      }
      return departure;
    });
    setDepartureRows(updatedDepartures);
  }
},[departureDetails])

  useEffect(() => {
    if(tourDetails){
      setSelectedTour({value:tourDetails.type,label:tourDetails.type});
      setDateBegin(formatedDate(tourDetails.date_begin));
      setDateEnd(formatedDate(tourDetails.date_end));

      // setDepartures(SelectRef(tourDetails.departures) || []);
      if(tourDetails.tour_image){
        setImage2(tourDetails.tour_image || []);

//         const base64Images = [];

// image2.forEach((file) => {
//   const reader = new FileReader();
//   reader.onload = () => {
//     const base64String = reader.result;
//     base64Images.push(`data:${file.type};base64,${base64String}`);
//   };
//   reader.readAsDataURL(file);
// });

// console.log(base64Images);
        
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
      {tourDetails.flight_info !== ""  ? setFlightInformation(tourDetails.flight_info) : setFlightInformation("")}
      {tourDetails.flight_exclude == 1 ? setRadioValueExcludeFlight("Yes") : setRadioValueExcludeFlight("No")}
     
      
      {tourDetails.visa_processing === 1 ? setRadioValueVisa("Yes") : setRadioValueVisa("No")}
      {tourDetails.free_cancellation === 1 ? setRadioValueVisa("Yes") : setRadioValueVisa("No")}
      // if(tourDetails){
      //   console.log(tourDetails.tour_info,"tourDetails.tour_info");
      //   const editorContent = ContentState.createFromText(tourDetails.tour_info);
      //     const editorState = EditorState.createWithContent(editorContent);
      //     setEditorState(editorState);
      //     console.log(editorState,"editorState");
      // }

      // const editorContent = ContentState.createFromText(tourDetails.tour_info);
      // const editorState = EditorState.createWithContent(editorContent);
      // setEditorState(editorState);
  


      // setEditorState(tourDetails.tour_info);


  
    }
    
    // console.log(image2,"image2");
    
    // const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${tourDetails.tour_image}`;
    // const imageUrl = `${process.env.NEXT_PUBLIC_URL}/uploads/${image2.map((image) => image).join('')}`;
    // const imageUrls = Array.isArray(image2);
    // console.log(imageUrls,"imageUrls");
  }, [tourDetails]);



  useEffect(() => {
    if(additionalServices){
      const updatedServices = services.map((service) => {
        const foundService = additionalServices.find((additionalService) => additionalService.title === service.title);

        if (foundService) {
          return { ...service, checked: true, price: foundService.price };
        }
        return service;
      });
      setServices(updatedServices);
    

    }

  },[additionalServices]);

  
  useEffect(()=>{
    if(flightData){
      {flightData.length > 0 ? setRadioValueFlight("Yes") : setRadioValueFlight("No")}
      if(flightData.length > 0){
        const updatedFlight = flightData.map((flight) => {
          const foundFlight = flightDetails.find((flightData) => flightData.id === flight.flight_id);
          if (foundFlight) {
            return { ...flight, flight_id: foundFlight.flight_id, flight_amount: foundFlight.flight_amount, no_of_stop: foundFlight.no_of_stop, luggage: foundFlight.luggage,flight_name:foundFlight.airline_name };
          }
          return flight;
        });
        setFlightRow(updatedFlight);
      }else{

        setFlightData(...flightRow);
      }
    }
  },[flightData])

  useEffect(() => {
    const mekkaHotels = hotel_data.filter((hotel) => hotel.hotel_type == '1');
    const madinaHotels = hotel_data.filter((hotel) => hotel.hotel_type == '2');
    // mekkaHotels.map((hotel) => {
    //   // const foundHotel = mekkaHotel.find((hotelData) => hotelData.id === hotel.hotel_id);
    //   const updatedMekka = mekkaRows.map((mekka) => {
    //     return { ...mekka, hotel_id:hotel.id, hotel_name: hotel.hotel_name, hotel_price: hotel.hotel_price, hotel_info: hotel.hotel_info };
    //   });
    //   console.log(updatedMekka,"updatedMekka");
    //   setMekkaRows(updatedMekka);
    //   console.log(mekkaRows,"mekkaRows");
    // })
    if(mekkaHotels){

      const updatedMekka = mekkaHotels.map((hotel) => {
        return {
          hotel_id: hotel.id,
          hotel_name: hotel.hotel_name,
          hotel_price: hotel.hotel_price,
          hotel_info: hotel.hotel_info,
        };
      });
    
      setMekkaRows(updatedMekka);
    }

    if(madinaHotels){
      const updatedMadina = madinaHotels.map((hotel) => {
        return {
          hotel_id: hotel.id,
          hotel_name: hotel.hotel_name,
          hotel_price: hotel.hotel_price,
          hotel_info: hotel.hotel_info,
        };
      });
      setMadinaRows(updatedMadina);
  
    }

    // if(hotel_data){
    //   hotel_data.map((hotel) => {
    //     if (hotel.hotel_type == 1) {
     
    //       const foundHotel = mekkaHotel.find((hotelData) => hotelData.id === hotel.hotel_id);
     
    //       const updatedMekka = mekkaHotels.map((mekka) => {
          
    //           return { ...mekka, hotel_id:hotel.id, hotel_name: hotel.hotel_name, hotel_price: hotel.hotel_price, hotel_info: hotel.hotel_info };
            
    //       });
    //       console.log(updatedMekka,"updatedMekka");
    //       setMekkaRows(updatedMekka);
          
    //     } else {
    //       const updatedMadina = madinaRows.map((madina) => {
          
    //         return { ...madina, hotel_id:hotel.id, hotel_name: hotel.hotel_name, hotel_price: hotel.hotel_price, hotel_info: hotel.hotel_info };
          
    //     });
         
    //       setMadinaRows(updatedMadina);
    //     }

    //   });

    // }
  },[hotel_data]);

  useEffect(() => {
    if (date_begin && date_end) {
      const startDate = new Date(formatDateToMMDDYYYY(date_begin));
      const endDate = new Date(formatDateToMMDDYYYY(date_end));
      const timeDifference = endDate.getTime() - startDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      setDaysCount(Math.ceil(daysDifference));
    }
  }, [date_begin, date_end]);

  const onEditorStateChange = (newEditorState) => {
    const editorContent = newEditorState.getCurrentContent();
    const rawContent = convertToRaw(editorContent);
    const plainText = rawContent.blocks[0].text;
    setTourInfo(plainText);
    setEditorState(newEditorState);
    };

  const handleDeleteImage2 = (index) => {
    const newImages = [...image2];
    newImages.splice(index, 1);
    setImage2(newImages);
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

  const isCurrentTabValid = () => {
    if (activeTab === "Content") {
      return (SelectedTour && name && capacity && date_begin && date_end && selectRef.current.value  && image2.length > 0 && departureRows.length > 0 &&
        departureRows.every((departure) => departure.departure_id && departure.price));
      } else if (activeTab === "Pricing") {
      return adult_price && child_price && baby_price ;
    } else if (activeTab === "Included") {
      return true
    } else if (activeTab === "Overview") {
      return editorState !== EditorState.createEmpty();
    } else if (activeTab === "Itinerary") {
      
      return route_data.every((day) => day.dayData && day.description);
    } else if (activeTab === "Flight Hotel And Visa") {
  
      return mekkaRows.every((mekka) =>mekka.hotel_id, mekka.hotel_name,mekka.hotel_price,mekka.hotel_info) && madinaRows.every((madina) => madina.hotel_id,madina.hotel_name,madina.hotel_price,madina.hotel_info) && flightRow.every((flight) => flight.flight_id && flight.flight_amount && flight.no_of_stop && flight.luggage && flightInformation &&  radioValueVisa && radioValueExcludeFlight);
    }
    return false;
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
    showErrorToast("Please fill in all required fields before proceeding.");
  }
  // const nextTabIndex = activeTabIndex + 1;
  //   if (nextTabIndex < tabs.length) {
  //     setActiveTabIndex(nextTabIndex);
  //     setActiveTab(tabs[nextTabIndex]);
  //     setEnabledTabs((prevEnabledTabs) => [...prevEnabledTabs, nextTabIndex]);
  //   }

  } 
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

    // Set the initial state based on the screen size
    handleResize();

    // Add event listener to update state on resize
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
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

  // for add hotel and remove hotels

  // hotels for makka and madina

  

 
  const handleImageChange2 = (event) => {
    const files = event.target.files;
    const promises = [];
    const uploadedImages = [...image2];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          uploadedImages.push(reader.result);
          resolve();
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }
  
    Promise.all(promises).then(() => {
      setImage2(uploadedImages);
    });
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
  const departureOption = departures.map((departure) => ({
    value: departure.id,
    label: `${departure.departure}`,
  }));

  const handleAddDepartureRow = () => {
    setDepartureRows([
      ...departureRows,
      { departure_id:"", price: "",id:"" },
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
      { hotel_id:"",hotel_name: null, hotel_price: "",hotel_info:"" },
    ]);
  };

  const handleRemoveMekkaRow = (index) => {
    if (mekkaRows.length === 1) {
      return; // Do not remove the last row
    }
    const newRows = [...mekkaRows];
    newRows.splice(index, 1);
    setMekkaRows(newRows);
  };

  const handleAddMadinaRow = () => {
    setMadinaRows([
      ...madinaRows,
      { hotel_id:"",hotel_name: null, hotel_price: "",hotel_info:"" },
    ]);
  };

  const handleRemoveMadinaRow = (index) => {
    if (madinaRows.length === 1) {
      return; // Do not remove the last row
    }
    const newRows = [...madinaRows];
    newRows.splice(index, 1);
    setMadinaRows(newRows);
  };
  const handleMekkaChange = (value, index) => {
    if (!value) return; // add this line to check if value is null or undefined
    const selectedOption = mekkaHotel.find((option) => option.id === value.value);
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
    if (!value) return; // add this line to check if value is null or undefined
    const selectedOption = departures.find((option) => option.id === value.value);
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
  // const handleMekkaChange = (value, index) => {
  //   if (!value) return; // add this line to check if value is null or undefined
  //   const selectedOption = mekkaHotel.find((option) => option.id === value.value);
  
  //   const mekkaData = {
  //     ...mekkaRows[index],
  //     hotel_id: selectedOption?.id || "",
  //     hotel_name: selectedOption?.hotel_name || "",
  //   };
  //   const newRows = [...mekkaRows];
  //   newRows[index] = mekkaData;
  //   setMekkaRows(newRows);
  // };

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

  
  const handleFlightSelectChange = (value, index) => {
    if (!value) return; 
    const selectedOption = flightDetails.find((option) => option.id === value.value);

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


  // for add flight name and amount booking



  const handleFlightChange = (e, index, field) => {
    const { value } = e.target;
    const newRows = [...flightRow];
    newRows[index][field] = value;
    setFlightRow(newRows);
  };

  const HandleAddFlightRow = () => {
    setFlightRow([...flightRow, { flight_id: " ", flight_amount: " ", no_of_stop: " ",luggage:"" },
    ]);
  };

  const HandleRemoveFlightRow = (index) => {
    if (flightRow.length === 1) {
      return; // Do not remove the last row
    }
    const newRows = [...flightRow];
    newRows.splice(index, 1);
    setFlightRow(newRows);
  };

  



  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    // Check if the value is a date and format it as dd-mm-yyyy
    if (e.target.type === 'date') {
        const formattedDate = formatDateToDDMMYYYY(value);
        setter(formattedDate);
    } else {
        setter(value);
    }

  };

  const { translate } = useTranslation();

  const handleSubmit = async(e) => {
    e.preventDefault();
 

  
    const end_date = formatDateToMMDDYYYY(date_end);
    const start_date = formatDateToMMDDYYYY(date_begin);

    const languageValues = $(selectRef.current).val();

    // Convert language values to a comma-separated string
    const languageString = languageValues.join(',');

  
    const mekkaData =mekkaRows.map((mekka)=>({
      hotel_type:1,
      hotel_name: mekka.hotel_name ? mekka.hotel_name : '', 
      hotel_id: mekka.hotel_id ? mekka.hotel_id : '', 
      hotel_price:mekka.hotel_price,
      hotel_info:mekka.hotel_info,

    }))

    const madinaData =madinaRows.map((madina)=>({
      hotel_type:2,
      hotel_name: madina.hotel_name ? madina.hotel_name : '', 
      hotel_id: madina.hotel_id ? madina.hotel_id : '',
      hotel_price:madina.hotel_price,
      hotel_info:madina.hotel_info
    }))

    
    const flightData =flightRow.map((flight)=>({ 
      flight_id: flight.flight_id ? flight.flight_id.value : '',
      flight_amount: flight.flight_amount,
      no_of_stop: flight.no_of_stop,
      luggage: flight.luggage
    }))

    if (!mekkaData.some((mekka) => mekka.hotel_name && mekka.hotel_price && mekka.hotel_info) ||
    !madinaData.some((madina) => madina.hotel_name && madina.hotel_price && madina.hotel_info) ||
    (radioValueFlight === "Yes" ? !flightData.some((flight) => flight.flight_id && flight.flight_amount && flight.no_of_stop && flight.luggage) : false)) {
      showErrorToast("Please fill in all required fields before proceeding.");
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
    const editorValue = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
  
    const newRouteData = route_data.map((day, index) => (
      {
        day:day.dayData,
        description:day.description
      }
    ));
    // const itineraryData = {
    //   itinerary: route_data.map((day, index) => ({
    //     day: index + 1,
    //     description: day.description,
    //   })),
    // };


    const image2File = document.querySelector('input[name="image2"]').files;
    const image2FileArray = Object.entries(image2File).map(([key, value]) => value);
    // const binaryImages = [];

    // for (let i = 0; i < image2File.length; i++) {
    //   const file = image2File[i];
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const binaryData = reader.result;
    //     binaryImages.push(binaryData);
    //   };
    //   reader.readAsBinaryString(file);
    // }
    
    // console.log(binaryImages,"binaryImages");

    const departureData =departureRows.map((departure)=>({
      departure_id: departure.departure_id ? departure.departure_id : '',
      price: departure.price ? departure.price : '',
      id: departure.id ? departure.id : ''
    }))


    const formData = new FormData();

    formData.append("type", SelectedTour.value);
    formData.append("name", name);
    formData.append("capacity", capacity);
    formData.append("date_begin", start_date);
    formData.append("date_end", end_date);
    formData.append("tour_languages", languageString);
    formData.append("adult_price", adult_price);
    formData.append("child_price", child_price);
    formData.append("baby_price", baby_price);
    formData.append("addition_service", JSON.stringify(servicesData));
    formData.append("tour_included", includedData);
    formData.append("tour_info", editorValue || "");
    formData.append("flight_info", flightInformation);
    formData.append("route_data", JSON.stringify(newRouteData));
    formData.append("hotel_data", JSON.stringify(hotel_data));
    formData.append("flight_data", radioValueFlight === "Yes" ? JSON.stringify(flightData):"");
    formData.append("visa_processing", radioValueVisa === "Yes" ? 1 : 0);
    formData.append("flight_exclude", radioValueExcludeFlight === "Yes" ? 1 : 0);
    formData.append("user_id", user?.user.id);
    formData.append("company_id", user?.user.company_id);
    image2FileArray.forEach((file, index) => {
      formData.append(`tour_image[${index}]`, file);
    });
    formData.append("departures ", departureData);

    const url = "updatetour";

    try{
      const response = await POST.request({ form:formData , url:url, headers: { "Content-Type": "multipart/form-data" } });
      if(response){
        toast.success("Tour Added Successfully");
        setActiveTab("Content");
        setActiveTabIndex(0);
        fetchTour(id);
        // setSelectedTour({});  
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
        // $(selectDepartureRef.current).val('').trigger('change');
        // setImage2([]);
        // services.forEach((service) => {
        //   service.checked = false;
        //   service.price = "";
        // })
        // setIncluded(included.map((item) => ({ ...item, checked: false })));
        // setRouteData([]);
        // setHotelData([]);
        // setTourIncluded(0);
        // setTourInfo("");
        // setFreeCancellation(0);
        // setPrice("123");
        // setAmenities([]);
        // setDaysCount(0);
        // setDayData("");
        // setDayDescription("");
        // setMekkaRows([{ hotel_id:"",hotel_name: null, hotel_price: "",hotel_info:"" }]);
        // setMadinaRows([{  hotel_id:"",hotel_name: null, hotel_price: "",hotel_info:"" }]);
        // setFlightRow([{ flight_id: " ", flight_amount: " ", no_of_stop: " ",luggage:"" }]);
        // setRadioValueFlight('No');
      }
    }catch(error){
      console.error(error);
    }
  }
  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
};

const formatDateToMMDDYYYY = (date) => {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
};
  return (
    <>
      <ToastContainer/>
      <div
        className={`dashboard overflow-hidden ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard `}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content ">
            <h1 className="text-30">
               {translate("Edit Tour") }
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
                        className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                          activeTab == elm ? "is-tab-el-active" : ""
                        }`}

                        onClick={() => isNextClicked && handleTabClick(elm, i)}
                        disabled={i > activeTabIndex && !enabledTabs.includes(i)}

                      >
                        {i + 1}. {elm}
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
                                      placeholder="Select or Tour Type (required)"
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
                                    <input type="text" required value={ name} onChange={handleInputChange(setName)}/>
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Tour Name")  ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input type="number" min={1} required value={capacity} onChange={handleInputChange(setCapacity)}/>
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Seat Availibility") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input type="date" required value={date_begin? formatDateToMMDDYYYY(date_begin) : ''} onChange={handleInputChange(setDateBegin)}/>
                                    <label className="lh-1 text-16 text-light-1">
                                      {translate("Start Date of Tour") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="form-input my-1">
                                    <input type="date" required value={date_end? formatDateToMMDDYYYY(date_end) : ''} onChange={handleInputChange(setDateEnd)}/>
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
                                      multiple={true}
                                      placeholder="Langauge"
                                      defaultValue={tourDetails.tour_languages}
                                    >
                                      {languagesData.map((language) => (
                                        <option key={language.id} value={language.id}
                                        selected={tourDetails.tour_languages && tourDetails.tour_languages.includes(language.id)}>
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
                                      {translate("Langauge") ||
                                        "Find Latest Packages"} <span className="text-red">*</span>
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                <h6>
                                {" "}
                                {translate("Departure ") }
                              </h6>
                              <ul className="">
                                
                                {departureRows.map((row, index) => (
                                  <li key={index}>
                                    <div className=" row">
                                      <div className="col-lg-8">
                                        <div className="row">
                                          <div className="col-md-6 form-input spacing d-flex flex-column align-items-center">
                                            <CreatableSelect
                                              value={{ value: departureRows[index].departure_id, label: departureRows[index].departure }}
                                              onChange={(value) =>
                                                handleDepartureChange(value, index)
                                              }
                                              options={departureOption}
                                              className="custom-select Hotel-Madina-dd"
                                              placeholder="Select Departure (required)"
                                              classNamePrefix="react-select"
                                              isClearable
                                              formatCreateLabel={(inputValue) =>
                                                `Not Found: "${inputValue}"`
                                              }
                                            />
                                          </div>

                                          <div className="col-md-6">
                                            <div className="form-input spacing">
                                              <input type="number" required
                                                value={departureRows[index].price}
                                                onChange={(e) => setDepartureRows(prevRows => {
                                                  const newRows = [...prevRows];
                                                  newRows[index].price = e.target.value;
                                                  return newRows;
                                                })} />
                                              <label className="lh-1 text-16 text-light-1">
                                                {" "}
                                                {translate(" Price") ||
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
                                          onClick={handleAddDepartureRow}
                                          style={{height:"fit-content"}}

                                        >
                                          +
                                        </button>
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                            style={{height:"fit-content"}}

                                            onClick={() =>
                                              handleRemoveDepartureRow(index)
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
                              </div>

                              <div className="col-12">
                                <h4 className="text-18 fw-500 mb-20">
                                  {" "}
                                  {translate("Gallery") } <span className="text-red">*</span>
                                </h4>

                                <div className="row x-gap-20 y-gap-20">
                                  {image2.map((image, index) => (
                                    <div className="col-auto my-2" key={index}>
                                      <div className="relative">
                                        <Image
                                          width={200}
                                          height={200}
                                          src={image} alt={`image-${index}`} className="size-200 rounded-12 object-cover"
                                        />
                                        <button
                                          onClick={() => handleDeleteImage2(index)}
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
                                        name="image2"
                                        src={"/img/dashboard/upload.svg"}
                                      />

                                      <div className="text-16 fw-500 text-accent-1 mt-10">
                                        {translate("Upload Images") }
                                      </div>
                                    </label>
                                    <input
                                      onChange={handleImageChange2}
                                      accept="image/*"
                                      id="imageInp2"
                                      type="file"
                                      name="image2"
                                      multiple
                                      style={{ display: "none" }}
                                    />
                                  </div>
                                </div>

                                <div className="text-14 mt-20">
                                  PNG or JPG no Bigger Than 800px Wide And Tall.
                                </div>
                              </div>

                            
                            </div>
                          </div>
                          {activeTabIndex < tabs.length - 1 && (
                            <button
                              className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                              onClick={handleNextTab }
                              type="button"
                            >
                              Next
                            </button>
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
                                  <input type="number" required value={adult_price} onChange={handleInputChange(setAdultPrice)}/>
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Adult") ||
                                      "Find Latest Packages"} <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input type="number" required value={child_price} onChange={handleInputChange(setChildPrice)} />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("Price (€) Per Child") ||
                                      "Find Latest Packages"} <span className="text-red">*</span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div className="form-input my-1">
                                  <input type="number" required value={baby_price} onChange={handleInputChange(setBabyPrice)}/>
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
                                        {index + 1} Bed-Room
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
                                          onChange={(event) => handlePriceChange(event, service.id)}
                                          required
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Price
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
                              Next
                            </button>
                          )}
                          {activeTabIndex > 0 && (
                            <button
                              className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                              onClick={handlePrevTab}
                              type="button"
                            >
                              Previous
                            </button>
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
                                                {translate(item.option) || "Find Latest Packages" }
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
                                  Next
                                </button>
                              )}
                              {activeTabIndex > 0 && (
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  Previous
                                </button>
                              )}
                            </div>
                      
                        </div>

                        <div
                          className={`tabs__pane  ${
                            activeTab == "Overview" ? "is-tab-el-active" : ""
                          }`}
                        >
                          <div className="y-gap-30 contactForm px-lg-20 px-0 ">
                            <Editor
                              editorState={editorState}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              onEditorStateChange={onEditorStateChange}
                            />
                  
                          </div>
                          <div className=" flex_start">

                              {activeTabIndex < tabs.length - 1 && (
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4  "
                                  onClick={handleNextTab}
                                  type="button"
                                >
                                  Next
                                </button>
                              )}
                              {activeTabIndex > 0 && (
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  Previous
                                </button>
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
                                {Array.from({ length: daysCount }, (_, i) => i + 1).map((dayNumber) => (
                                  // <ItineraryDayInput key={dayNumber} dayNumber={dayNumber} />

                                  <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-input my-1">
                                    <input
                                        type="text"
                                        required
                                        value={route_data.find((day) => day.day === dayNumber)?.dayData || ""}
                                        onChange={(e) => handleDayDescriptionChange(dayNumber, e.target.value, "")}
                                        className=""
                                      />
                                      <label className="lh-1 text-16 text-light-1">Day {dayNumber} <span className="text-red">*</span></label>
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
                                      <label className="lh-1 text-16 text-light-1">Description <span className="text-red">*</span></label>
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
                                  Next
                                </button>
                              )}
                              {activeTabIndex > 0 && (
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  Previous
                                </button>
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
                            <div className="d-flex item-center justify-content-between">
                              <h6>
                                {" "}
                                {translate("Visa Processing") }
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
                                        {translate("No") }
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <h6>
                                {" "}
                                {translate("Mekka Hotel") }
                              </h6>

                              <ul className="">
                                {mekkaRows.map((row, index) => (
                                  <li key={index}>
                                    <div className=" row">
                                      <div className="col-lg-8">
                                        <div className="row">

                                          <div className="col-lg-6 col-md-auto col-12 form-input spacing d-flex flex-column align-items-center hotel-mekka">
                                            <CreatableSelect
                                              value={{ value: mekkaRows[index].hotel_id, label: mekkaRows[index].hotel_name }}
                                              onChange={(value) =>
                                                handleMekkaChange(value, index)
                                              }
                                              options={options2}
                                              className="custom-select Hotel-Mekka-dd"
                                              placeholder="Select Hotel For Mekka(required)"
                                              classNamePrefix="react-select"
                                              isClearable
                                              formatCreateLabel={(inputValue) =>
                                                `Not Found: "${inputValue}"`
                                              }
                                            />
                                          </div>

                                          <div className="col-lg-6 col-md-auto col-12">
                                            <div className="form-input spacing">
                                              <input type="number" required  
                                              value={mekkaRows[index].hotel_price}
                                              onChange={(e) => setMekkaRows(prevRows => {
                                                const newRows = [...prevRows];
                                                newRows[index].hotel_price = e.target.value;
                                                return newRows;
                                              })}
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
                                          style={{height:"fit-content"}}
                                          onClick={handleAddMekkaRow}
                                        >
                                          +
                                        </button>
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-md-3 mx-1`}
                                            style={{height:"fit-content"}}

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
                                {translate("Madina Hotel ") }
                              </h6>
                              <ul className="">
                                
                                {madinaRows.map((row, index) => (
                                  <li key={index}>
                                    <div className=" row">
                                      <div className="col-lg-8">
                                        <div className="row">
                                          <div className="col-md-6 form-input spacing d-flex flex-column align-items-center">
                                            <CreatableSelect
                                              value={{ value: madinaRows[index].hotel_id, label: madinaRows[index].hotel_name }}
                                              onChange={(value) =>
                                                handleMadinaChange(value, index)
                                              }
                                              options={Madina}
                                              className="custom-select Hotel-Madina-dd"
                                              placeholder="Select Hotel For Madina (required)"
                                              classNamePrefix="react-select"
                                              isClearable
                                              formatCreateLabel={(inputValue) =>
                                                `Not Found: "${inputValue}"`
                                              }
                                            />
                                          </div>

                                          <div className="col-md-6">
                                            <div className="form-input spacing">
                                              <input type="number" required
                                                value={madinaRows[index].hotel_price}
                                                onChange={(e) => setMadinaRows(prevRows => {
                                                  const newRows = [...prevRows];
                                                  newRows[index].hotel_price = e.target.value;
                                                  return newRows;
                                                })} />
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
                                          style={{height:"fit-content"}}

                                        >
                                          +
                                        </button>
                                        {index > 0 && (
                                          <button
                                            type="button"
                                            className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                            style={{height:"fit-content"}}

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
                            <div className="d-flex item-center justify-content-between">
                              <h6>
                              {translate("Exclude Flight Details") }
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
                                        checked={radioValueExcludeFlight === "No"}
                                        onChange={(event) => setRadioValueExcludeFlight(event.target.value)}
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
                            </div>
                            <div className=" ">
                            <h6>
                              {translate("Add Flight Information") }
                              </h6>
                             
                                <div className="col-12">
                                    <div className="form-input my-1">
                                    <textarea
                                          type="text"
                                          required
                                          rows="3"
                                          value={flightInformation}
                                          onChange={(e) => setFlightInformation(e.target.value)}
                                        />
                                      <label className="lh-1 text-16 text-light-1">Flight Information <span className="text-red">*</span></label>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex item-center justify-content-between">
                              <h6>
                              {translate("Include Flight Details") }
                              </h6>
                              <div className="flex_start visaYESNOFLEx my-3">
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
                                        {translate("No") }
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
                                {translate("Add Flight Details") }
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
                                              value={{ value: flightRow[index].id, label: flightRow[index].flight_name }}
                                              onChange={(value) =>
                                                  handleFlightSelectChange(value, index)
                                                }
                                                options={ChooseFlight}
                                                className="custom-select Flight-selected-dd"
                                                placeholder="Select Flight"
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
                                                  value={flightRow[index].flight_amount}
                                                  onChange={(e) => setFlightRow(prevRows => {
                                                    const newRows = [...prevRows];
                                                    newRows[index].flight_amount = e.target.value;
                                                    return newRows;
                                                  })}
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
                                      <div className="col-md-2 col-lg-auto col-12 d-flex">
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
                                      </div>
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
                            {" "}
                            {translate("Save Details") }
                          </button>
                              {activeTabIndex > 0 && (
                                <button
                                  className="button -sm -info-2 bg-accent-1 text-white  mt-4 "
                                  onClick={handlePrevTab}
                                  type="button"
                                >
                                  Previous
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

            <div className="text-center pt-30">
              © Copyright MekkaBooking.com {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
