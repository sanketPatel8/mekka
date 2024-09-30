"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import Stars from "@/components/common/Stars";
import { tourData } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";
import "@/public/css/index.css";
import { post } from "@/app/utils/api";
import { useTranslation } from "@/app/context/TranslationContext";
import { showErrorToast } from "@/app/utils/tost";

export default function TourSliderTwo() {
  const [showSwiper, setShowSwiper] = useState(false);
  const [BestSellerData, setBestSellerData] = useState([]);
  useEffect(() => {
    setShowSwiper(true);
    HandleLoginSubmite();
  }, []);

  const HandleLoginSubmite = async (e) => {
    const BookingLoginData = { AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY };
    try {
      const response = await post("best_seller_tour", BookingLoginData);
      setBestSellerData(response?.Tours);
    } catch (error) {
      console.error("Error:", error); // Log the full error for debugging
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

  const { translate } = useTranslation();

  return (
    <section className="relative">
      <div className="sectionBg -w-1530 rounded-12 "></div>

      <div className="container">
        <div className="row justify-between items-end y-gap-10"></div>

        <div className="relative pt-40 sm:pt-20">
          <div className="overflow-hidden pb-30 js-section-slider">
            <div
              data-aos="fade-up"
              data-aos-delay=""
              className="swiper-wrapper "
            >
              {showSwiper && (
                <Swiper
                  spaceBetween={30}
                  className="w-50"
                  pagination={{
                    el: ".pbutton1",
                    clickable: true,
                  }}
                  navigation={{
                    prevEl: ".prev",
                    nextEl: ".next",
                  }}
                  modules={[Navigation, Pagination]}
                  breakpoints={{
                    500: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 1,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 2,
                    },
                  }}
                >
                  {BestSellerData.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <Link
                        href={`/package/${elm?.slug}?id=${elm?.id}&name=${elm?.slug}`}
                        className="tourCard -type-1 py-10 px-10 border-1 rounded-12 bg-white -hover-shadow"
                      >
                        <div className="tourCard__header">
                          <div className="tourCard__image ratio ratio-28:20">
                            <Image
                              width={421}
                              height={301}
                              src={
                                elm.tour_image
                                  ? elm.tour_image
                                  : "/img/404/imgnotFound.png"
                              }
                              alt="image"
                              className="img-ratio rounded-12"
                            />
                          </div>

                          <button
                            className={`tourCard__favorite ${
                              elm.direct_flight == "0" ||
                              elm.direct_flight == null
                                ? "d-none"
                                : "d-block"
                            }`}
                          >
                            {translate("Direct Flight")}
                          </button>
                        </div>

                        <div className="tourCard__content px-10 pt-10">
                          <div
                            className={`tourCard__location d-flex items-center text-13 text-light-2 border_yellow px-2 ${
                              elm.distance_to_hotel ? "d-none" : "d-block"
                            }`}
                          >
                            <FaPersonWalking color="white" size={18} />
                            Zu Kaaba {elm.distance_to_hotel}
                          </div>

                          <h3
                            className={`tourCard__title text-16 fw-500 mt-5 ${
                              elm.type & elm.name ? "d-none" : "d-block"
                            }`}
                          >
                            <span>
                              {elm.type} - {elm.name}
                            </span>
                          </h3>

                          <div className="tourCard__rating d-flex items-center text-13 mt-5">
                            <div className="d-flex items-center mt-5">
                              <div className="d-flex items-center x-gap-5">
                                {/* <Stars star={elm?.rating_count} font={12} /> */}
                              </div>
                              <div className="text-14 ml-5">
                                {/* <span className="fw-500">{elm?.rating}</span> (
                                {elm?.rating_count}) -{" "} */}
                                {elm?.company_code == null
                                  ? "No Compny  "
                                  : elm?.company_code}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10 ${
                              elm.days_of_stay ? "d-none" : "d-block"
                            }`}
                          >
                            <div className="d-flex items-center">
                              <i className="icon-clock text-16 mr-5"></i>
                              {elm.days_of_stay}
                            </div>

                            <div
                              className={`${
                                elm.tour_price == "0" ? "d-none" : "d-block"
                              }`}
                            >
                              From{" "}
                              <span className="text-16 fw-500">
                                {elm.tour_price} €
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>

          <div className="navAbsolute">
            <button className="navAbsolute__button bg-white js-slider1-prev prev">
              <i className="icon-arrow-left text-14"></i>
            </button>

            <button className="navAbsolute__button bg-white js-slider1-next next">
              <i className="icon-arrow-right text-14"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
