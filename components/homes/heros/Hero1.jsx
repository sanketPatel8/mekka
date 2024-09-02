"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import { useTranslation } from "@/app/context/TranslationContext";
import NumberOfTravellers from "@/components/common/dropdownSearch/NumberOfTravellers";
import Image from "next/image";
import Location from "@/components/common/dropdownSearch/Location";
import Calender from "@/components/common/dropdownSearch/Calender";
import HeroSearch from "@/components/HeroSearch";

export default function Hero1({}) {
  const router = useRouter();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [tourMambar, setTourMambar] = useState("");

  const { location, calender, tourType, setLocation, dates } = useGlobalState();

  const dropDownContainer = useRef();
  

  // const handleDateChange = (newDates) => {
  //   setDates(newDates);
  // };

  const { translate } = useTranslation();

  return (
    <section className="hero -type-1">
      <div className="hero__bg">
        <Image
          width={1800}
          height={560}
          src="/img/hero/1/mekkabookingBg.png"
          alt="image"
        />
        <Image
          width="1800"
          height="40"
          src="/img/hero/1/shape.svg"
          alt="image"
          style={{ height: "auto" }}
        />
      </div>

      <div className="container py-3">
        <div className="row justify-center">
          <div className="col-xl-12 col-lg-12">
            <div className="hero__content">
              <h1
                data-aos={"fade-up"}
                data-aos-delay="100"
                className="hero__title"
              >
                {translate("Your world of joy")}
              </h1>

              <p
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="hero__text"
              >
                {translate(
                  "From local escapes to far-flung adventures, find what makes you happy anytime, anywhere"
                )}
              </p>

              <div
                ref={dropDownContainer}
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="mt-60 md:mt-35"
              >
                <div className="searchForm -type-1">
                  <HeroSearch
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
