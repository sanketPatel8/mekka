import Header1 from "@/components/layout/header/Header1";
import TourList6 from "@/components/tours/TourList6";
import React from "react";

export const metadata = {
  title: "Tour-list-8 || mekkaBooking - Travel & Tour React NextJS Template",
  description: "mekkaBooking - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        <Header1 />
        <TourList6 />
      </main>
    </>
  );
}
