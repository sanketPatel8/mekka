"use client";

import Hero1 from "@/components/homes/heros/Hero1";
import FooterOne from "@/components/layout/footers/FooterOne";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Sanket from "@/components/sanketbhuva";
import TourList4 from "@/components/tours/TourList4";
import React, { useEffect, useState } from "react";

export default function page() {
  const [heroData, setHeroData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("heroData in Page:", heroData); // Log heroData in Page component
  }, [heroData]);
  return (
    <>
      <main>
        <Header1 />

        <div className="mt-50">
          <Sanket
            range={5}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>

        {/* <FooterTwo /> */}
      </main>
    </>
  );
}
