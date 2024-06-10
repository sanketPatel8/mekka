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
import '@/public/css/index.css'

export default function TourSliderTwo() {
  const [showSwiper, setShowSwiper] = useState(false);
  useEffect(() => {
    setShowSwiper(true);
  }, []);

  return (
    <section className="relative">
      <div className="sectionBg -w-1530 rounded-12 "></div>

      <div className="container">
        <div className="row justify-between items-end y-gap-10">
        </div>

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
                  {tourData.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <Link
                        href={`/toursingle/${elm.id}`}
                        className="tourCard -type-1 py-10 px-10 border-1 rounded-12 bg-white -hover-shadow"
                      >
                        <div className="tourCard__header">
                          <div className="tourCard__image ratio ratio-28:20">
                            <Image
                              width={421}
                              height={301}
                              src={elm.imageSrc}
                              alt="image"
                              className="img-ratio rounded-12"
                            />
                          </div>

                          <button className="tourCard__favorite">Direct Flight</button>
                        </div>

                        <div className="tourCard__content px-10 pt-10">
                          <div className="tourCard__location d-flex items-center text-13 text-light-2 border_yellow px-2">
                            {/* <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i> */}
                            <FaPersonWalking  color="#dabf4f" size={18} />
                            {elm.location}
                          </div>

                          <h3 className="tourCard__title text-16 fw-500 mt-5">
                            <span>{elm.title}</span>
                          </h3>

                          <div className="tourCard__rating d-flex items-center text-13 mt-5">
                            <div className="d-flex x-gap-5">
                              <Stars star={elm.rating} />
                            </div>

                            <span className="text-dark-1 ml-10">
                              {elm.rating} ({elm.ratingCount}) 
                            </span> - IDEALGATE 
                          </div>

                          <div className="Location">
                          <span>
                              Departure : London
                            </span>
                          </div>

                          <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                            <div className="d-flex items-center">
                              <i className="icon-clock text-16 mr-5"></i>
                              {elm.duration}
                            </div>

                            <div>
                              From{" "}
                              <span className="text-16 fw-500">
                              {elm.price} €
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
