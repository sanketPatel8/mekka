"use client"

import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import BookingPages from "@/components/pages/BookingPages";
import Payment from "@/components/pages/Payment";
import React, { useEffect } from "react";

export default function payment() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Payment - MekkaBooking";
    }
  }, []);
  return (
    <>
      <main>
        <Header1 />
        {/* <BookingPages /> */}
        <Payment />
        <FooterTwo />
      </main>
    </>
  );
}
