"use client";

import Hero1 from "@/components/homes/heros/Hero1";
import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourList4 from "@/components/tours/TourList4";
import React, { useEffect, useState } from "react";
import { post } from "../utils/api";
import { showErrorToast } from "../utils/tost";
import { useGlobalState } from "../context/GlobalStateContext";

export default function page() {
  const [count, setCount] = useState("");
  const [activeIndex, setActiveIndex] = useState(1);
  const [FliterData, setFliterData] = useState([]);

  const {
    location,
    calender,
    value,
    selectedTourTypes,
    selectedLanguages,
    selectedCities,
    selectedRatings,
    selectedFeatures,
    selectedDurations,
    TourData,
    setTourData,
  } = useGlobalState();

  const currentResults = Array.isArray(TourData)
    ? TourData.slice((activeIndex - 1) * 10, activeIndex * 10)
    : [];

  // Fetch data for the tour list and hero section combined

  const fetchData = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      start: activeIndex,
      type: location,
      start_date: calender[0],
      end_date: calender[1],
    };

    try {
      const response = await post("tourlist", sendData);
      if (response.Tours) {
        setTourData(response.Tours);
        setCount(response.count);
      } else {
        console.error("Tours data is undefined in the response.");
      }
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("An error occurred during registration.");
    }
  };

  useEffect(() => {
    console.log("tourlist effect run");
    FetchTourDataAPi();
    fetchData();
  }, []);

  // Fetch filtered data

  const FetchFilterData = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      type: selectedTourTypes.join(", "),
      language: selectedLanguages.join(", "),
      departure: selectedCities.join(", "),
      min_price: value[0],
      max_price: value[1],
      hotel_star: selectedDurations.join(", "),
      agent_rating: selectedRatings.join(", "),
      amenities: selectedFeatures.join(", "),
      start: 0,
    };

    try {
      const response = await post("tourfilter", sendData);
      setTourData(response.Tours);
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("An error occurred during registration.");
    }
  };

  useEffect(() => {
    FetchFilterData();
  }, [
    selectedTourTypes,
    selectedLanguages,
    selectedCities,
    selectedRatings,
    selectedFeatures,
    selectedDurations,
    value,
  ]);

  // Fetch additional filter data if needed
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

  return (
    <>
      <main>
        <Header1 />
        <Hero1 setTourData={setTourData} />

        <div className="mt-50">
          <TourList4
            TourData={TourData}
            currentResults={currentResults}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            FliterData={FliterData}
          />
        </div>

        <FooterTwo />
      </main>
    </>
  );
}
