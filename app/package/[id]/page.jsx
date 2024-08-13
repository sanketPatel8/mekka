"use client";

import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleFour from "@/components/tourSingle/pages/SingleFour";
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [PAckageData, setPAckageData] = useState({});

  const fetchData = async (id) => {
   
    
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      id: id // Passing the id to sendData
    };

    try {
      const response = await post("tour_details", sendData);
      if (response) {
        setPAckageData(response);
      } else {
        console.error("Tours data is undefined in the response.");
      }
    } catch (error) {
      console.error("Error caught:", error);
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

  useEffect(() => {
    if (id) {
      fetchData(id); // Pass the id to fetchData
    }
  }, [id]);

  return (
    <>
      <Header1 />
      <SingleFour PAckageData={PAckageData} />
      <TourSlider PAckageData={PAckageData} />
      <FooterTwo />
    </>
  );
}
