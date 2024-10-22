"use client"

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Content from "@/components/pages/terms/Content";
import PageHeader from "@/components/pages/terms/PageHeader";
import React, { useEffect } from "react";



export default function page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Terms - MekkaBooking";
    }
  }, []);
  return (
    <>
      <main>
        <Header1 />
        <PageHeader />
        <Content />
        <FooterTwo />
      </main>
    </>
  );
}
