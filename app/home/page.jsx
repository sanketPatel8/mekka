"use client";

import { useEffect, useState } from "react";
import Header1 from "@/components/layout/header/Header1";
import Hero7 from "@/components/homes/heros/Hero7";
import Tour1 from "@/components/homes/tours/Tour1";
import Banner from "@/components/homes/banners/Banner";
import TourSlderOne from "@/components/homes/tours/TourSlderOne";
import TestimonialOne from "@/components/homes/testimonials/TestimonialOne";
import BannerOne from "@/components/homes/banners/BannerOne";
import ArticlesThree from "@/components/homes/articles/ArticlesThree";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

// import Language from "@/components/Langauge"; // Import Language component for locale changes

export default function Home() {
    // page title 

    useEffect(() => {
      if (typeof window !== "undefined") {
        document.title = "Home - MekkaBooking";
      }
    }, []);
  return (
    <>
      <ToastContainer/>
      <main>
        <Hero7 />
        <Header1 />
        <FeaturesOne />
        <Tour1 />
        <Banner />
        <TourSlderOne />
        {/* <TestimonialOne /> */}
        {/* <BannerOne /> */}
        <ArticlesThree />
        <FooterTwo />
      </main>
    </>
  );
}
