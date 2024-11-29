"use client"

import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import ContactForm from "@/components/pages/contact/ContactForm";
import Locations from "@/components/pages/contact/Locations";
import Map from "@/components/pages/contact/Map";
import React, { useEffect } from "react";

export default function page() {
    // page title 

    useEffect(() => {
      if (typeof window !== "undefined") {
        document.title = "Contact Us - MekkaBooking";
      }
    }, []);

  return (
    <>
      <main>
        <Header1 />
        {/* <Map /> */}
        {/* <Locations /> */}
        <ContactForm />
        <FooterTwo />
      </main>
    </>
  );
}
