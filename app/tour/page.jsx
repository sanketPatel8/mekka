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
  const [range, setRange] = useState(1);

  const route = useRouter();

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
      route.push("#redirect");
    } catch (e) {
      console.log(e);
    }
  };

  const onPageChange = async (pageIndex) => {
    console.log("pageIndex", pageIndex);

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
      console.log("fetch search data");
    } else if (FilterSidebar) {
      await fetchListing(pageIndex);
      console.log("fetch Filter Data");
    } else {
      await FetchFilterData(pageIndex);
      console.log("fetch Listning Data");
    }
  };

  useEffect(() => {
    FetchTourDataAPi()
    fetchListing();
  }, []);

  const isMounted = useRef(false);
  const Lan_ids = FilterSidebar?.selectedLanguages?.map(
    (language) => language.id
  );

  const FetchFilterData = async (pageIndex) => {
    const formData = new FormData();

    formData.append("start", pageIndex || 0);
    formData.append("type", FilterSidebar?.selectedTourTypes.join(", "));
    formData.append("language", Lan_ids.join(","));
    formData.append("departure", FilterSidebar?.selectedCities.join(", "));
    formData.append("min_price", value[0]);
    formData.append("max_price", value[1]);
    formData.append("hotel_star", FilterSidebar?.selectedDurations.join(", "));
    formData.append("agent_rating", FilterSidebar?.selectedRatings.join(", "));
    formData.append("amenities", FilterSidebar?.selectedFeatures.join(", "));

    try {
      const response = await POST.request({
        form: formData,
        url: "tourfilter",
      });
      setTourData(response.Tours);
      setRange(response.Total_Page);
      setCount(response.Count);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      FetchFilterData();
    } else {
      isMounted.current = true;
    }
  }, [FilterSidebar]);

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
  // console.log("endDate" , endDate);
    
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
    const tourType =
      searchParams.get("TourType") === undefined
        ? ""
        : searchParams.get("TourType");
    const startDate =
      searchParams.get("StartDate") === undefined
        ? ""
        : searchParams.get("StartDate");
    const endDate =
      searchParams.get("EndDate") === undefined
        ? ""
        : searchParams.get("EndDate");
    const person =
      searchParams.get("person") === undefined
        ? ""
        : searchParams.get("person");

        console.log("endDate" , endDate);
        
    if (
      (tourType !== null && tourType !== undefined && tourType !== "") ||
      (startDate !== null && startDate !== undefined && startDate !== "") ||
      (endDate !== null && endDate !== undefined && endDate !== "") ||
      (person !== null && person !== undefined)
    ) {
      fetchSearch1Data({ tourType, startDate, endDate, person });
      route.push("#redirect");
    } else {
      // fetchData();
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
    </>
  );
}
