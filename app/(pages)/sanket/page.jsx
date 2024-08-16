"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import Stars from "@/components/common/Stars";
// import { tourData } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";
import { showErrorToast } from "@/app/utils/tost";
import { post } from "@/app/utils/api";

export default function TourSlderOne() {
  const [showSwiper, setShowSwiper] = useState(false);
  const [TopTranding, setTopTranding] = useState([]);

  useEffect(() => {
    setShowSwiper(true);
    fetchData();
  }, []);

  const fetchData = async (id) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await post("top_trending", sendData);
      if (response) {
        console.log("Top tranding res : ", response.Tours);

        setTopTranding(response.Tours);
      } else {
        console.error("Tours data is undefined in the response.");
      }
    } catch (error) {
      console.error("Error caught:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showErrorToast("Please verify your email");
      } else {
        showErrorToast("An error occurred during registration.");
      }
    }
  };

  console.log("TopTranding was : ", TopTranding);

  const { translate } = useTranslation();

  return (
    <section className="layout-pt-sm layout-pb-sm relative">
      <div className="sectionBg -w-1530 rounded-12 bg-light-1"> </div>

      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24"
            >
              {translate("Top Trending")}
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tour"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span> {translate("See all")}</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="relative pt-40 sm:pt-20">
          <div className="overflow-hidden pb-10 js-section-slider">
            <div
              data-aos="fade-up"
              data-aos-delay=""
              className="swiper-wrapper"
            >
              {TopTranding?.map((elm, i) => (
                <Link href={`/package/${elm.id}`} key={i}>
                  <div className="tourCard__header">
                    <div className="tourCard__image ratio ratio-28:20">
                      <Image
                        width={421}
                        height={301}
                        src="/_next/image?url=%2Fimg%2FtourCards%2F1%2F13.jpeg&w=1080&q=75"
                        alt="image"
                        className="img-ratio rounded-12"
                      />
                    </div>

                    <button
                      className={`tourCard__favorite ${
                        elm.direct_flight == 0 ? "d-block" : "d-none"
                      }`}
                    >
                      Direct Flight
                    </button>
                  </div>

                  <div className="tourCard__content px-10 pt-10">
                    <div className="tourCard__location d-flex items-center text-13 text-light-2 border_yellow px-2">
                      <FaPersonWalking
                        color="white"
                        size={18}
                        className="mr-2"
                      />
                      {elm.distance_to_hotel}
                    </div>

                    <h3 className="tourCard__title text-16 fw-500 mt-5">
                      <span>
                        {" "}
                        {elm.type} - {elm.name}{" "}
                      </span>
                    </h3>

                    <div className="tourCard__rating d-flex items-center text-13 mt-5">
                      <div className="d-flex x-gap-5">
                        <Stars star={elm.rating} />
                      </div>
                      <p className="text-dark-1 ml-10">
                        {elm.rating} ({elm.rating})
                      </p>{" "}
                      - {elm.company_name}
                    </div>
                    <div className="Location">
                      <span>Departure : {elm.departures}</span>
                    </div>

                    <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                      <div className="d-flex items-center">
                        <i className="icon-clock text-16 mr-5"></i>
                        {elm.days_of_stay}
                      </div>

                      <div>
                        From{" "}
                        <span className="text-16 fw-500">
                          {elm.tour_price} €
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="navAbsolute">
            <button className="navAbsolute__button bg-white js-slider1-prev prev1">
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button className="navAbsolute__button bg-white js-slider1-next next1">
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
