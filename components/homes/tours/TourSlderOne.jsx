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
import { useCurrency } from "@/app/context/currencyContext";
import { PiBuildingApartmentFill } from "react-icons/pi";

export default function TourSlderOne() {
  const [showSwiper, setShowSwiper] = useState(false);
  const [TopTranding, setTopTranding] = useState([]);
  const { formatPrice } = useCurrency();
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
        setTopTranding(response.Tours);

        console.log(TopTranding.length, "TopTranding");
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

  const { translate } = useTranslation();

  return (
    <section className="layout-pt-sm layout-pb-sm relative">
      <div className="sectionBg -w-1530 rounded-12 bg-light-1"> </div>

      {TopTranding.length !== 0 && (
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
                {showSwiper && (
                  <Swiper
                    spaceBetween={30}
                    className="w-100"
                    pagination={{
                      el: ".pbutton1",
                      clickable: true,
                    }}
                    navigation={{
                      prevEl: ".prev1",
                      nextEl: ".next1",
                    }}
                    modules={[Navigation, Pagination]}
                    breakpoints={{
                      500: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1200: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {TopTranding?.map((elm, i) => (
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

                            <div
                              className={`tourCard__location d-flex items-center text-13 text-light-2 border_yellow px-2 my-2 `}
                            >
                              {elm.date_begin} - {elm.date_end}
                            </div>

                            <h3
                              className={`tourCard__title text-16 fw-500 mt-5 ${
                                elm.type & elm.name ? "d-none" : "d-block"
                              }`}
                            >
                              <span>
                                {" "}
                                {elm.type} - {elm.name}{" "}
                              </span>
                            </h3>

                            <div className="tourCard__rating d-flex items-center text-13 mt-5">
                              <div className="d-flex items-center mt-5">
                                <div className="d-flex items-center x-gap-5">
                                  {/* <Stars star={elm?.rating_count} font={12} /> */}
                                </div>
                                {elm?.company_name && (
                                  <div className="text-14 ml-5">
                                    <span className="fw-500">
                                      {elm?.rating}
                                    </span>
                                    {/* {elm?.rating_count}) -{" "} */}
                                    <div className="items-center">
                                      <PiBuildingApartmentFill
                                        color="#dabf4f"
                                        className=""
                                        size={20}
                                      />{" "}
                                      <span>
                                        {elm?.company_name == null
                                          ? "  "
                                          : elm?.company_name}{" "}
                                      </span>
                                    </div>
                                  </div>
                                )}
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
                           
                                <span className="text-16 fw-500">
                                  {formatPrice(elm.tour_price)}
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
            {TopTranding.length > 4 && (
              <div className="navAbsolute">
                <button className="navAbsolute__button bg-white js-slider1-prev prev1">
                  <i className="icon-arrow-left text-14"></i>
                </button>

                <button className="navAbsolute__button bg-white js-slider1-next next1">
                  <i className="icon-arrow-right text-14"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
