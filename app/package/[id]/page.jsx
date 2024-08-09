"use client";

import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleFour from "@/components/tourSingle/pages/SingleFour";
import { allTour } from "@/data/tours";

import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const id = params.id;
  const [PAckageData, setPAckageData] = useState("");

  const fatchData = async (e) => {

    const Packagedata = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      id : "226",
    };
    try {
      const response = await post("tour_details", Packagedata);
      setPAckageData(response.Tour_Details);  
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showErrorToast("Please verify your email");
      } else {
        showErrorToast("An error occurred during registration.");
      }
    }
  };

  console.log(PAckageData);
  

  useEffect(() => {
    fatchData();
  }, []);

  const tour = allTour.find((item) => item.id == id) || allTour[0];

  console.log(params);

  return (
    <>
      <Header1 />
      <SingleFour tour={tour} TourDetaild={PAckageData} />
      <TourSlider />
      <FooterTwo />
    </>
  );
}
