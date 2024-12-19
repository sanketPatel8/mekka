"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
// import BookingPages from "@/components/pages/BookingPages";
const BookingPage = dynamic(() => import('@/components/pages/BookingPages'), {
  ssr: false 
});
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const Tourid = searchParams.get("id");
  const {translate} = useTranslation();
  const [BookingData, setBookingData] = useState({});

    // page title 

    useEffect(() => {
     
        document.title = "New Booking - MekkaBooking";
    
    }, []);

  const FetchBookingData = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      id: Tourid,
    };

    try {
      const response = await post("tour_details", sendData);
      setBookingData(response);
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast(translate, "An error occurred during registration.");
    }
  };

  useEffect(() => {
    FetchBookingData();
  }, [Tourid]);

  // console.log(BookingData?.Tour_Details?.addtional_price);

  return (
    <>
      <main>
        <Header1 />
        <BookingPage BookingData={BookingData} />
        <FooterTwo />
      </main>
    </>
  );
}
