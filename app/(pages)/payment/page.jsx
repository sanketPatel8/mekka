import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import BookingPages from "@/components/pages/BookingPages";
import Payment from "@/components/pages/Payment";
import React from "react";

export const metadata = {
  title: "Booking-page || mekkaBooking - Travel & Tour React NextJS Template",
  description: "mekkaBooking - Travel & Tour React NextJS Template",
};

export default function payment() {
  return (
    <>
      <main>
        <Header1 />
        {/* <BookingPages /> */}
        <Payment />
        <FooterOne />
      </main>
    </>
  );
}
