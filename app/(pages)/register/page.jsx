"use client"

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Register from "@/components/pages/Register";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Registration - MekkaBooking";
    }
  }, []);
  return (
    <>
      <main>
        <Header1 />
        <Register />
        <FooterTwo />
      </main>
    </>
  );
}
