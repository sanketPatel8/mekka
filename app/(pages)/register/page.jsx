"use client"

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import dynamic from "next/dynamic";
// import Register from "@/components/pages/Register";
import React, { useEffect } from "react";
const RegisterPage = dynamic(() => import('@/components/pages/Register'), {
  ssr: false 
});
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
        <RegisterPage />
        <FooterTwo />
      </main>
    </>
  );
}
