"use client";

import Hero1 from "@/components/homes/heros/Hero1";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourList4 from "@/components/tours/TourList4";
import React, { useEffect, useRef, useState } from "react";
import { post } from "../utils/api";
import { showErrorToast } from "../utils/tost";
import { useRouter, useSearchParams } from "next/navigation";
import { POST } from "../utils/api/post";

export default function PageData() {
  const searchParams = useSearchParams();

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
  const [Distance, setDistance] = useState([0, 0]);

  const [range, setRange] = useState(1);
  const [SearchData, setSearchData] = useState({});

  const route = useRouter();

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
      console.log("run search tour ");

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
      value[0] !== 0 ||
      Distance[0] !== 0
      // FilterSidebar.selectedRatings.length !== 0
    ) {
      await FetchFilterData(pageIndex);
    } else {
      await fetchListing(pageIndex);
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
    formData.append("departure", FilterSidebar.selectedCities?.join(", "));
    formData.append("min_price", value[0]);
    formData.append("max_price", value[1]);
    formData.append("min_distance", Distance[0]);
    formData.append("max_distance", Distance[1]);

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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (
        FilterSidebar.selectedTourTypes !== " " ||
        FilterSidebar.selectedLanguages.length !== 0 ||
        FilterSidebar.selectedCities.length !== 0 ||
        FilterSidebar.selectedFeatures.length !== 0 ||
        FilterSidebar.selectedDurations.length !== 0 ||
        value[0] == 0 ||
        Distance[0] == 0
        // FilterSidebar.selectedRatings.length !== 0
      ) {
        FetchFilterData();
      } else if (
        SearchData.tourType !== null ||
        (SearchData.tourType == " " &&
          SearchData.startDate !== null &&
          SearchData.endDate !== null &&
          SearchData.person !== null)
      ) {
        // fetchSearch1Data(
        //   SearchData.tourType,
        //   SearchData.startDate,
        //   SearchData.endDate,
        //   SearchData.person
        // );
        fetchListing();
      } else {
        fetchListing();
      }
    } else {
      isMounted.current = true;
    }
  }, [FilterSidebar, Distance, value]);

  const FetchTourDataAPi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await post("tour_data", sendData);
      setFliterData(response.Data);
    } catch (error) {
      showErrorToast("An error occurred during registration.");
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
    } catch (error) {
      console.error("Error caught:", error);

      showErrorToast("An error occurred during registration.");
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

    // Check if any of the search parameters are non-empty and call the appropriate functions
    if (tourType || startDate || endDate || person) {
      fetchSearch1Data({ tourType, startDate, endDate, person });
      route.push("#redirect");
    } else {
      fetchListing();
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
          />
        </div>
        <FooterTwo />
      </main>
    </>
  );
}
