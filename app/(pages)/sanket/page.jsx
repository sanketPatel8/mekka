"use client";

import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleFour from "@/components/tourSingle/pages/SingleFour";
import { allTour } from "@/data/tours";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {

  
  const [PAckageData, setPAckageData] = useState({});
  const router = useRouter();
  const { query } = router;
  const id = query?.id; 

  // const fetchData = async (e) => {
  //   if (!id) return; 

  //   const Packagedata = {
  //     AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  //     id: id,
  //   };

  //   try {
  //     const response = await post("tour_details", Packagedata);
  //     console.log("this is response for package api :", JSON.stringify(response, null, 2));
      
  //     setPAckageData(response);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.message
  //     ) {
  //       showErrorToast("Please verify your email");
  //     } else {
  //       showErrorToast("An error occurred during registration.");
  //     }
  //   }
  // };


  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        id: "12"
      };
      try {
        const response = await post("tour_details", sendData);
        
        if (response) {
          setPAckageData(response);
          console.log("Tours data:", response); // Check the data being set
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

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   fetchData();
  // }, [id]);

  console.log("data for perent component " + (PAckageData));
  

  const tour = allTour.find((item) => item.id === id) || allTour[0];

  return (
    <>
      <Header1 />
      <SingleFour tour={tour} PAckageData={PAckageData} />
      <TourSlider />
      <FooterTwo />
    </>
  );
}
