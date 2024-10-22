"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { tourData } from "@/data/tours";
import Image from "next/image";
import Stars from "../common/Stars";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { useEffect, useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import { useCurrency } from "@/app/context/currencyContext";

export default function TourSlider({ PAckageData }) {
  const { translate } = useTranslation();
  const { formatPrice } = useCurrency();
  const [slibleTourSlider, setslibleTourSlider] = useState([]);

  useEffect(() => {
    setslibleTourSlider(PAckageData?.Tour_List);
  }, [PAckageData]);

  console.log(slibleTourSlider, "slibleTourSlider");

  return (
    <section className="">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            {slibleTourSlider?.length !== 0 && slibleTourSlider && (
              <h2 className="text-30">
                {" "}
                {translate("You might also like...")}
              </h2>
            )}
          </div>
        </div>

        <div className="relative pt-40 sm:pt-20">
          <div
            className="overflow-hidden pb-5 js-section-slider"
            data-gap="30"
            data-slider-cols="xl-4 lg-3 md-2 sm-1 base-1"
            data-nav-prev="js-slider1-prev"
            data-nav-next="js-slider1-next"
          >
            <div className="swiper-wrapper">
              <Swiper
                spaceBetween={30}
                className="w-100"
                pagination={{
                  el: ".pbutton1",
                  clickable: true,
                }}
                navigation={{
                  prevEl: ".js-slider10-prev",
                  nextEl: ".js-slider10-next",
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
                {slibleTourSlider?.map((elm, i) => (
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
                            elm.direct_flight == "0" ? "d-none" : "d-block"
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
                            {" "}
                            {elm.type} - {elm.name}{" "}
                          </span>
                        </h3>

                        <div className="tourCard__rating d-flex items-center text-13 mt-5">
                          <div
                            className={`d-flex x-gap-5 ${
                              elm.rating ? "d-block" : "d-none"
                            }`}
                          >
                            <Stars star={elm.rating} />
                          </div>
                          <p
                            className={`text-dark-1 ml-10 ${
                              elm.rating ? "d-block" : "d-none"
                            }`}
                          >
                            {elm.rating} ({elm.rating}) -
                          </p>{" "}
                          {elm.company_code}
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
                            {translate("From")}{" "}
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
            </div>
          </div>
          {slibleTourSlider?.length !== 0 && (
            <div className="navAbsolute dis_none">
              <button className="navAbsolute__button bg-white js-slider10-prev">
                <i className="icon-arrow-left text-14"></i>
              </button>

              <button className="navAbsolute__button bg-white js-slider10-next">
                <i className="icon-arrow-right text-14"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
