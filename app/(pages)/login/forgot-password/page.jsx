"use client"

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import ForgotPassword from "@/components/pages/ForgotPassword";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Forgot Password - MekkaBooking";
    }
  }, []);
  return (
    <div>
      <main>
        <Header1 />

        <ForgotPassword />

        <FooterTwo />
      </main>
    </div>
  );
};

export default page;
