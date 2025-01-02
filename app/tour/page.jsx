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

  const filterUmrah = searchParams.get("Umrahtype");
  const filterHajj = searchParams.get("Hajjtype");
  const filterCulture = searchParams.get("Culturetype");

  const tourType = searchParams.get("TourType") || "";
  const startDate = searchParams.get("StartDate") || "";
  const endDate = searchParams.get("EndDate") || "";
  const person = searchParams.get("person") || "";

  const { translate } = useTranslation();

  const [count, setCount] = useState(0);
  const [FliterData, setFliterData] = useState([]);
  const [Route, setRoute] = useState("");
  const [TourData, setTourData] = useState([]);
  const [LanActives, setLanActives] = useState([]);
  const [FilterSidebar, setFilterSidebar] = useState({
    selectedTourTypes: "",
    selectedLanguages: [],
    selectedCities: [],
    // selectedRatings: [],
    selectedFeatures: [],
    selectedDurations: [],
  });
  const [TourList, setTourList] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [value, setValue] = useState([0, 0]);
  const [Distance, setDistance] = useState([0, 0]);
  const [FilterPrice, setFilterPrice] = useState([0, 0]);
  const [FilterDistance, setFilterDistance] = useState([0, 0]);
  const [range, setRange] = useState(1);
  const [SearchData, setSearchData] = useState({});
  const [maxDistance, setMaxDistanse] = useState(0);
  const [minDistance, setMinDistanse] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [FilterChange, setFilterChange] = useState(false);
  const [SearchCheck, setSearchCheck] = useState(false);

  const route = useRouter();

  // page title

  useEffect(() => {
    const firstNonNull = filterUmrah || filterHajj || filterCulture || null;
    
    setFilterSidebar((prevState) => ({
      ...prevState, // Copy the previous state
      selectedTourTypes: firstNonNull, // Store the first non-null value
    }));
  }, [filterUmrah, filterHajj, filterCulture]);

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

  const onPageChange = async (pageIndex) => {
    // Retrieve search parameters
    const tourTypeFromParam = searchParams.get("TourType") || "";
    const typeFromParam = searchParams.get("type") || "";
    const tourType = tourTypeFromParam || typeFromParam || "";

    const startDate = searchParams.get("StartDate") || "";
    const endDate = searchParams.get("enddate") || "";
    const person = searchParams.get("person") || "";

    const headerType = searchParams.get("type") || "";

    if (tourType || startDate || endDate || person) {
      if (FilterChange === false) {
       
        
        await fetchSearch1Data({
          pageIndex,
          tourType,
          startDate,
          endDate,
          person,
        });
      } else {
        FetchFilterData(pageIndex);
      }
    }
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [FilterSidebar]);

  useEffect(() => {
    FetchTourDataAPi();
  }, []);

  const FetchFilterData = async (pageIndex) => {
    const formData = new FormData();

    formData.append("start", pageIndex || 0);
    formData.append("type", FilterSidebar?.selectedTourTypes);
    formData.append("language", FilterSidebar.selectedLanguages?.join(","));
    formData.append("departure", FilterSidebar.selectedCities?.join(", "));
    ``;
    formData.append("min_price", FilterPrice[0]);
    formData.append("max_price", FilterPrice[1]);
    formData.append("min_distance", FilterDistance[0]);
    formData.append("max_distance", FilterDistance[1]);

    formData.append("hotel_star", FilterSidebar?.selectedDurations.join(", "));
    // formData.append("agent_rating", FilterSidebar?.selectedRatings.join(", "));
    formData.append("amenities", FilterSidebar?.selectedFeatures.join(", "));
    formData.append("filter_type", SearchCheck === true ? "search" : "all");
    formData.append("start_date", SearchData.startDate);
    formData.append("end_date", SearchData.endDate);
    formData.append("person", SearchData.person);

    try {
      const response = await POST.request({
        form: formData,
        url: "tourfilter",
      });
      setFilterChange(true);
      setTourData(response.Tours);
      setRange(response.Total_Page);
      setCount(response.Count);
      route.push("#redirect");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (FilterSidebar || FilterPrice || FilterDistance) {
      if(FilterSidebar?.selectedTourTypes !== null && FilterSidebar?.selectedTourTypes !== '' ){
        FetchFilterData();
      }
  
    } 
  }, [
    FilterSidebar,
    FilterPrice,
    FilterDistance,
    tourType,
    startDate,
    endDate,
    person,
  ]);

  const FetchTourDataAPi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await post("tour_data", sendData);

      setFliterData(response.Data);
      setDistance([response?.Data?.min_km, response?.Data?.max_km]);
      setValue([response?.Data?.min_price, response?.Data?.max_price]);
      setMaxDistanse(response?.Data?.max_km);
      setMaxValue(response?.Data?.max_price);
      setMinDistanse(response?.Data?.min_km);
      setMinValue(response?.Data?.min_price);
    } catch (error) {
      showErrorToast(translate, "An error occurred during registration");
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
      setFilterChange(false);
      setSearchCheck(true);
      setTourData(response.Tour_List);
      setRange(response.Total_Page);
      setCount(response.Count);
      setRoute("search data");
      route.push("#redirect");
    } catch (error) {
      console.error("Error caught:", error);

      showErrorToast(translate, "An error occurred during registration");
    }
  };

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
            // filterType={filterType}
          />
        </div>
        <FooterTwo />
      </main>
    </>
  );
}
