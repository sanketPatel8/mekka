"use client";

import Hero1 from "@/components/homes/heros/Hero1";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourList4 from "@/components/tours/TourList4";
import React, { useEffect, useState } from "react";
import { post } from "../utils/api";
import { showErrorToast } from "../utils/tost";
import { useGlobalState } from "../context/GlobalStateContext";
import { useSearchParams } from "next/navigation";


export default function Page() {
  const searchParams = useSearchParams();

  const [count, setCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [FliterData, setFliterData] = useState([]);
  const [Route, setRoute] = useState("");
  const [TourData, setTourData] = useState([]);
  const [Page, setPage] = useState(0);

  const currentResults = Array.isArray(TourData)
    ? TourData.slice((activeIndex - 1) * 10, activeIndex * 10)
    : [];

  const fetchData = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      start:  activeIndex ,
    };

    try {
      const response = await post("tourlist", sendData);
      if (response.Tours) {
        setTourData(response.Tours);
        setCount(response.Count);
        setPage(response.Total_Page);
        setRoute("Tourlist data");
      } else {
        console.error("Tours data is undefined in the response.");
      }
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("An error occurred during registration.");
    }
  };

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

  const fetchSearch1Data = async ({ tourType, startDate, endDate }) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      Keyword: "",
      type: tourType,
      start_date: startDate,
      end_date: endDate,
    };
    try {
      const response = await post("search_tour", sendData);
      setTourData(response.Tour_List);
      setRoute("search data");
    } catch (error) {
      console.error("Error caught:", error);

      showErrorToast("An error occurred during registration.");
    }
  };

  useEffect(() => {
    FetchTourDataAPi();
    fetchData();
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
    if (tourType !== null || startDate !== null || endDate !== null) {
      fetchSearch1Data({ tourType, startDate, endDate });
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [activeIndex]);

  console.log("searchParams : ", searchParams);

  return (
    <main>
      <Header1 />
      <Hero1 />
      <div className="mt-50">
        <TourList4
          TourData={TourData}
          currentResults={currentResults}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          FliterData={FliterData}
          Route={Route}
          setTourData={setTourData}
          setRoute={setRoute}
          Page={Page}
          count={count}
        />
      </div>
      <FooterTwo />
    </main>
  );
}
