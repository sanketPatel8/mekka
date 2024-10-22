"use client"

import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Activity from "@/components/pages/helpCenter/Activity";
import Faq from "@/components/pages/helpCenter/Faq";
import Hero from "@/components/pages/helpCenter/Hero";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Help Center - MekkaBooking";
    }
  }, []);
  return (
    <>
      <main>
        <Header1 />
        <Hero />
        <Activity />
        <Faq />
        <FooterTwo />
      </main>
    </>
  );
}
