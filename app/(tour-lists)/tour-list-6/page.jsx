import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero from "@/components/tours/Hero";
import TourList5 from "@/components/tours/TourList5";
import React from "react";

export const metadata = {
  title: "Tour-list-6 || mekkaBooking - Travel & Tour React NextJS Template",
  description: "mekkaBooking - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        <Header1 />
        <Hero />
        <TourList5 />
        <FooterOne />
      </main>
    </>
  );
}
