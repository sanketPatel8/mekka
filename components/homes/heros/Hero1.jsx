"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/context/TranslationContext";
import Image from "next/image";
import HeroSearch from "@/components/HeroSearch";

export default function Hero1({}) {
  const dropDownContainer = useRef();

  const { translate } = useTranslation();

  return (
    <section className="hero -type-2">
      <div className="hero__bg ">
       <div className="flex-center"> 
       <Image
          width={1800}
          height={560}
          src="/img/hero/1/mekkabookingBg.png"
          alt="image"
        />
       </div>
        <Image
          width="1800"
          height="40"
          src="/img/hero/1/shape.svg"
          alt="image"
          style={{ height: "auto" }}
        />
      </div>

      <div className="container py-3"  >
        <div className="row justify-center">
          <div className="col-xl-12 col-lg-12">
            <div className="hero__content">
              <h1
                data-aos={"fade-up"}
                data-aos-delay="100"
                className="hero__title text-center"
              >
                {translate("Your world of joy")}
              </h1>

              <p
                data-aos={"fade-up"}
                data-aos-delay="300"
                className="hero__text text-center"
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
                <div className="searchForm -type-1 " id="redirect">
                  <HeroSearch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
