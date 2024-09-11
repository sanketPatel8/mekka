"use client";

import Hero1 from "@/components/homes/heros/Hero1";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourList4 from "@/components/tours/TourList4";
import React, { useEffect, useRef, useState } from "react";
import { post } from "../utils/api";
import { showErrorToast } from "../utils/tost";
import { useGlobalState } from "../context/GlobalStateContext";
import { useSearchParams } from "next/navigation";
import { POST } from "../utils/api/post";

export default function Page() {
  const searchParams = useSearchParams();

  const [count, setCount] = useState(0);
  const [TourListIndex, setTourListIndex] = useState(0);
  const [FliterData, setFliterData] = useState([]);
  const [Route, setRoute] = useState("");
  const [TourData, setTourData] = useState([]);
  const [Page, setPage] = useState(0);
  const [isTourDataFetched, setIsTourDataFetched] = useState(false);
  const [LanActives, setLanActives] = useState([]);
  const [LanArray, setLanArray] = useState([]);
  const [FilterSidebar, setFilterSidebar] = useState({
    selectedTourTypes: [],
    selectedLanguages: [],
    selectedCities: [],
    selectedRatings: [],
    selectedFeatures: [],
    selectedDurations: [],
  });
  const [value, setValue] = useState([0, 0]);

  const handleSelectionChange = (key, value) => {
    setFilterSidebar((prevState) => {
      const isSelected = prevState[key].includes(value);
      return {
        ...prevState,
        [key]: isSelected
          ? prevState[key].filter((item) => item !== value)
          : [...prevState[key], value],
      };
    });
  };

  const [range, setRange] = useState(1);

  const fetchListing = async (pageIndex) => {
    const formData = new FormData();

    formData.append("start", pageIndex || 0);

    try {
      const response = await POST.request({
        form: formData,
        url: "tourlist",
      });
      console.log(response);
      setTourData(response.Tours);
      setRange(response.Total_Page);
      setCount(response.Count);
    } catch (e) {
      console.log(e);
    }
  };

  const onPageChange = async (pageIndex) => {
    const tourType =
      searchParams.get("TourType") === undefined
        ? ""
        : searchParams.get("TourType");
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

    if (tourType || startDate || endDate || person) {
      await fetchSearch1Data({ tourType, startDate, endDate, person });
    } else if (FilterSidebar) {
      await FetchFilterData(pageIndex);
    } else {
      await fetchListing(pageIndex);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  // useEffect(() => {
  //   if (filterParams) {
  //     console.log("filterParams : " , filterParams);

  //       // Assuming filterParams has a property initialIndex
  //     setFilterIndex(filterParams.initialIndex);
  //   }
  // }, [filterParams, setFilterIndex]);

  // const { value } = useGlobalState();
  const isMounted = useRef(false);

  const FetchFilterData = async (pageIndex) => {
    // const sendData = {
    //   AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    //   type: FilterSidebar?.selectedTourTypes.join(", "),
    //   language: LanArray.join(","),
    //   departure: FilterSidebar?.selectedCities.join(", "),
    //   min_price: value[0],
    //   max_price: value[1],
    //   hotel_star: FilterSidebar?.selectedDurations.join(", "),
    //   agent_rating: FilterSidebar?.selectedRatings.join(", "),
    //   amenities: FilterSidebar?.selectedFeatures.join(", "),
    //   start: pageIndex,
    // };
    const formData = new FormData();

    formData.append("start", pageIndex || 0);
    formData.append("type", FilterSidebar?.selectedTourTypes.join(", "));
    formData.append("language", LanArray.join(","));
    formData.append("departure", FilterSidebar?.selectedCities.join(", "));
    formData.append("min_price", value[0]);
    formData.append("max_price", value[1]);
    formData.append("hotel_star", FilterSidebar?.selectedDurations.join(", "));
    formData.append("agent_rating", FilterSidebar?.selectedRatings.join(", "));
    formData.append("amenities", FilterSidebar?.selectedFeatures.join(", "));

    // try {
    //   const response = await post("tourfilter", sendData);
    //   setTourData(response.Tours);
    //   setRoute("filter data");

    //   setRange(response.Total_Page)
    // } catch (error) {
    //   console.error("Error caught:", error);
    //   showErrorToast("An error occurred during registration.");
    // }

    try {
      const response = await POST.request({
        form: formData,
        url: "tourfilter",
      });
      console.log(response);
      setTourData(response.Tours);
      setRange(response.Total_Page);
      setCount(response.Count);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const newLanArray = FilterSidebar?.selectedLanguages.map(
      (_, index) => index
    );
    setLanArray(newLanArray);
  }, [FilterSidebar?.selectedLanguages]);

  useEffect(() => {
    if (isMounted.current) {
      FetchFilterData();
    } else {
      isMounted.current = true;
    }
  }, [FilterSidebar]);

  // const currentResults = Array.isArray(TourData)
  //   ? TourData.slice((TourIndex - 1) * 10, TourIndex * 10)
  //   : [];

  // const fetchData = async (PageIndex) => {
  //   const sendData = {
  //     AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  //     start: PageIndex,
  //   };

  //   try {
  //     const response = await post("tourlist", sendData);
  //     if (response.Tours) {
  //       setTourData(response.Tours);
  //       setCount(response.Count);
  //       setPage(response.Total_Page);
  //       setRoute("Tourlist data");
  //       setIsTourDataFetched(true);
  //     } else {
  //       console.error("Tours data is undefined in the response.");
  //     }
  //   } catch (error) {
  //     console.error("Error caught:", error);
  //     showErrorToast("An error occurred during registration.");
  //   }
  // };

  const FetchTourDataAPi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await post("tour_data", sendData);
      setFliterData(response.Data);
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("An error occurred during registration.");
    }
  };

  const fetchSearch1Data = async ({ tourType, startDate, endDate, person }) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      Keyword: "",
      type: tourType,
      start_date: startDate,
      end_date: endDate,
      person: person,
    };
    try {
      const response = await post("search_tour", sendData);
      setTourData(response.Tour_List);
      setRange(response.Total_Page);
      setRoute("search data");
    } catch (error) {
      console.error("Error caught:", error);

      showErrorToast("An error occurred during registration.");
    }
  };

  useEffect(() => {
    FetchTourDataAPi();
  }, []);

  useEffect(() => {
    const tourType =
      searchParams.get("TourType") === undefined
        ? ""
        : searchParams.get("TourType");
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
    if (
      tourType !== null ||
      startDate !== null ||
      endDate !== null ||
      person !== null
    ) {
      fetchSearch1Data({ tourType, startDate, endDate, person });
    } else {
      // fetchData();
      fetchListing();
    }
  }, [searchParams]);

  return (
    <main>
      <Header1 />
      <Hero1 />
      <div className="mt-50">
        <TourList4
          TourData={TourData}
          FliterData={FliterData}
          count={count}
          range={range}
          onPageChange={onPageChange}
          setLanActives={setLanActives}
          FilterSidebar={FilterSidebar}
          LanActives={LanActives}
          value={value}
          setValue={setValue}
          handleSelectionChange={handleSelectionChange}
        />
      </div>
      <FooterTwo />
    </main>
  );
}
