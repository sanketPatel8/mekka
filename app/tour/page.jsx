"use client";

import Hero1 from "@/components/homes/heros/Hero1";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourList4 from "@/components/tours/TourList4";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { post } from "../utils/api";
import { showErrorToast } from "../utils/tost";
import { useRouter, useSearchParams } from "next/navigation";
import { POST } from "../utils/api/post";
import { useTranslation } from "../context/TranslationContext";

export default function PageData() {
  const searchParams = useSearchParams();
  const {translate} = useTranslation()

  const [count, setCount] = useState(0);
  const [FliterData, setFliterData] = useState([]);
  const [Route, setRoute] = useState("");
  const [TourData, setTourData] = useState([]);
  const [LanActives, setLanActives] = useState([]);
  const [FilterSidebar, setFilterSidebar] = useState({
    selectedTourTypes: " ",
    selectedLanguages: [],
    selectedCities: [],
    // selectedRatings: [],
    selectedFeatures: [],
    selectedDurations: [],
  });
  
  const [TourList, setTourList] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [value, setValue] = useState([0, 0]);
  const [Distance, setDistance] = useState([0 , 0 ]);

  const [FilterPrice, setFilterPrice] = useState([0 , 0])
  const [FilterDistance, setFilterDistance] = useState([0 , 0])

  const [range, setRange] = useState(1);
  const [SearchData, setSearchData] = useState({});
  const [maxDistance , setMaxDistanse]  = useState(0);
  const [minDistance , setMinDistanse]  = useState(0);
  const [maxValue , setMaxValue]  = useState(0);
  const [minValue , setMinValue]  = useState(0);


  const route = useRouter();

  // page title 

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Tour List - MekkaBooking";
    }
  }, []);

  const handleSelectionChange = (key, value) => {
    setFilterSidebar((prevState) => {
      if (key === "selectedTourTypes") {
        return {
          ...prevState,
          [key]: value, // Directly set the selected value
        };
      }

      // For other keys (like arrays), keep the original logic
      const isSelected = prevState[key].includes(value);
      return {
        ...prevState,
        [key]: isSelected
          ? prevState[key].filter((item) => item !== value)
          : [...prevState[key], value],
      };
    });
  };

  const fetchListing = async (pageIndex) => {
    const formData = new FormData();

    formData.append("start", pageIndex || 0);

    try {
      const response = await POST.request({
        form: formData,
        url: "tourlist",
      });
      setTourData(response.Tours);
      setRange(response.Total_Page);
      setCount(response.Count);
      setTourList(true);

      route.push("#redirect");
    } catch (e) {
      console.error(e);
    }
  };

  const onPageChange = async (pageIndex) => {
    const tourTypeFromParam = searchParams.get("TourType") || "";
    const typeFromParam = searchParams.get("type") || "";

    const tourType = tourTypeFromParam || typeFromParam || "";

    const startDate =
      searchParams.get("StartDate") === undefined
        ? ""
        : searchParams.get("StartDate");
    const endDate =
      searchParams.get("enddate") === undefined
        ? ""
        : searchParams.get("enddate");
    const person =
      searchParams.get("person") === undefined
        ? ""
        : searchParams.get("person");

    const HeaderType =
      searchParams.get("type") === undefined ? "" : searchParams.get("type");

    if (tourType || startDate || endDate || person) {

      await fetchSearch1Data({
        pageIndex,
        tourType,
        startDate,
        endDate,
        person,
      });
    } else if (
      FilterSidebar.selectedTourTypes !== " " ||
      FilterSidebar.selectedLanguages.length !== 0 ||
      FilterSidebar.selectedCities.length !== 0 ||
      FilterSidebar.selectedFeatures.length !== 0 ||
      FilterSidebar.selectedDurations.length !== 0 ||
      (FilterPrice[1] !== 0 || FilterPrice[0] !== 0) ||
      (FilterDistance[1] !== 0 || FilterDistance[0] !== 0)
    ) {
    } else {
      
      await  fetchListing(pageIndex);
    }
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [FilterSidebar]);

  
  

  useEffect(() => {
    FetchTourDataAPi();
    if (
      SearchData.tourType === null &&
      SearchData.startDate === null &&
      SearchData.endDate === null &&
      SearchData.person === null
    ) {
      fetchListing();
    }
  }, []);

  const isMounted = useRef(false);

  const FetchFilterData = async (pageIndex) => {
    const formData = new FormData();

    formData.append("start", pageIndex || 0);
    formData.append("type", FilterSidebar?.selectedTourTypes);
    formData.append("language", FilterSidebar.selectedLanguages?.join(","));
    formData.append("departure", FilterSidebar.selectedCities?.join(", "));``
    formData.append("min_price", FilterPrice[0]);
    formData.append("max_price", FilterPrice[1]);
    formData.append("min_distance", FilterDistance[0]);
    formData.append("max_distance", FilterDistance[1]);

    formData.append("hotel_star", FilterSidebar?.selectedDurations.join(", "));
    // formData.append("agent_rating", FilterSidebar?.selectedRatings.join(", "));
    formData.append("amenities", FilterSidebar?.selectedFeatures.join(", "));
    formData.append("filter_type", SearchData.tourType);
    formData.append("start_date", SearchData.startDate);
    formData.append("end_date", SearchData.endDate);
    formData.append("person", SearchData.person);

    try {
      const response = await POST.request({
        form: formData,
        url: "tourfilter",
      });
      setTourData(response.Tours);
      setRange(response.Total_Page);
      setCount(response.Count);
      route.push("#redirect");
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Extract search parameters
  //     const tourTypeFromParam = searchParams.get("TourType") || "";
  //     const typeFromParam = searchParams.get("type") || "";
  //     const startDate = searchParams.get("StartDate") || "";
  //     const endDate = searchParams.get("EndDate") || "";
  //     const person = searchParams.get("person") || "";
  
  //     // Set the search data state
  //     const searchData = {
  //       tourType: tourTypeFromParam || typeFromParam || "",
  //       startDate,
  //       endDate,
  //       person,
  //     };
  
  //     setSearchData(searchData);
  
  //     // Check if there are search parameters
  //     const hasSearchParams = Object.values(searchData).some(value => value);
      
  //     // Check if there are filter selections
  //     const hasFilters = 
  //       FilterSidebar.selectedTourTypes !== " " ||
  //       FilterSidebar.selectedLanguages.length > 0 ||
  //       FilterSidebar.selectedCities.length > 0 ||
  //       FilterSidebar.selectedFeatures.length > 0 ||
  //       FilterSidebar.selectedDurations.length > 0 ||
  //       (FilterPrice[1] !== 0 || FilterPrice[0] !== 0) ||
  //       (FilterDistance[1] !== 0 || FilterDistance[0] !== 0);
  
  //     try {
  //       if (hasFilters) {
  //         await FetchFilterData();
  //       } else if (hasSearchParams) {
  //         await fetchSearch1Data(searchData);
  //       } else {
  //         await fetchListing();
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle error appropriately
  //     }
  //   };
  
  //   fetchData();
  // }, [FilterSidebar, FilterPrice, FilterDistance, searchParams]); 
  useEffect(() => {


      if (
        FilterSidebar.selectedTourTypes !== " " ||
        FilterSidebar.selectedLanguages.length !== 0 ||
        FilterSidebar.selectedCities.length !== 0 ||
        FilterSidebar.selectedFeatures.length !== 0 ||
        FilterSidebar.selectedDurations.length !== 0 ||
        (FilterPrice[1] !== 0 || FilterPrice[0] !== 0 ) ||
        (FilterDistance[1] !== 0 || FilterDistance[0] !== 0 )
        
      ) {
        
        FetchFilterData();
      }

  }, [FilterSidebar, FilterPrice, FilterDistance ]);

  const FetchTourDataAPi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {

      const response = await post("tour_data", sendData);
      console.log(response, "response");
      setFliterData(response.Data);
      setDistance([response?.Data?.min_km , response?.Data?.max_km])
      setValue([response?.Data?.min_price , response?.Data?.max_price])
      setMaxDistanse(response?.Data?.max_km)
      setMaxValue(response?.Data?.max_price)
      setMinDistanse(response?.Data?.min_km)
      setMinValue(response?.Data?.min_price)
      
    } catch (error) {
      showErrorToast(translate,"An error occurred during registration");
    }
  };

  const fetchSearch1Data = async ({
    pageIndex,
    tourType,
    startDate,
    endDate,
    person,
  }) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      Keyword: "",
      type: tourType,
      start_date: startDate,
      end_date: endDate,
      person: person,
      start: pageIndex || 0,
    };
    try {
      const response = await post("search_tour", sendData);
      setTourData(response.Tour_List);
      setRange(response.Total_Page);
      setCount(response.Count);
      setRoute("search data");
      route.push("#redirect");
    } catch (error) {
      console.error("Error caught:", error);

      showErrorToast(translate,"An error occurred during registration");
    }
  };

  useEffect(() => {

    const tourTypeFromParam = searchParams.get("TourType") || "";
    const typeFromParam = searchParams.get("type") || "";

    // Choose the appropriate value for tourType
    const tourType = tourTypeFromParam || typeFromParam || "";

    const startDate = searchParams.get("StartDate") || "";
    const endDate = searchParams.get("EndDate") || "";
    const person = searchParams.get("person") || "";
  
    if(
      (FilterSidebar.selectedTourTypes == " " &&
      FilterSidebar.selectedLanguages.length == 0 &&
      FilterSidebar.selectedCities.length == 0 &&
      FilterSidebar.selectedFeatures.length == 0 &&
      FilterSidebar.selectedDurations.length == 0 ) &&
      (tourType == "" && startDate == "" && endDate == "" && person == "")
    ){
      fetchListing();
    }
  },[FilterSidebar,searchParams]);

  useEffect(() => {
    // Get both parameters (TourType and Type)
    const tourTypeFromParam = searchParams.get("TourType") || "";
    const typeFromParam = searchParams.get("type") || "";

    // Choose the appropriate value for tourType
    const tourType = tourTypeFromParam || typeFromParam || "";

    const startDate = searchParams.get("StartDate") || "";
    const endDate = searchParams.get("EndDate") || "";
    const person = searchParams.get("person") || "";

    // Set the search data state
    setSearchData({
      tourType,
      startDate,
      endDate,
      person,
    });

    if (tourType || startDate || endDate || person) {
      fetchSearch1Data({ tourType, startDate, endDate, person });
      route.push("#redirect");
    } 
  }, [searchParams]);

  return (
    <>
      <main>
        <Header1 />
        <Hero1 />
        <div className="mt-50">
          <TourList4
            TourData={TourData}
            FliterData={FliterData}
            count={count}
            range={range}
            Distance={Distance}
            setDistance={setDistance}
            onPageChange={(index) => onPageChange(index)}
            setLanActives={setLanActives}
            FilterSidebar={FilterSidebar}
            LanActives={LanActives}
            value={value}
            setValue={setValue}
            handleSelectionChange={handleSelectionChange}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            FilterPrice={FilterPrice}
            setFilterPrice={setFilterPrice}
            setFilterDistance={setFilterDistance}
            FilterDistance={FilterDistance}
          />
        </div>
        <FooterTwo />
      </main>
    </>
  );
}
