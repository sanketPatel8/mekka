"use client";
import Calender from "@/components/common/dropdownSearch/Calender";
import Location from "@/components/common/dropdownSearch/Location";
import TourType from "@/components/common/dropdownSearch/TourType";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NumberOfTravellers from "@/components/common/dropdownSearch/NumberOfTravellers";
const slides = [
  {
    id: 1,
    imageSrc: "/img/hero/7/mekkabookingBg.png",
    subtitle:
      "das unabhängige",
    title: "Vergleichsportal , günstige Angebote , finden & sparen",
  },
  {
    id: 2,
    imageSrc: "/img/hero/7/mekkabookingBg.png",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
  {
    id: 3,
    imageSrc: "/img/hero/7/mekkabookingBg.png",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
  {
    id: 4,
    imageSrc: "/img/hero/7/mekkabookingBg.png",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
  {
    id: 5,
    imageSrc: "/img/hero/7/mekkabookingBg.png",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
];

export default function Hero7() {
  const router = useRouter();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [TourLocation, setTourLocation] = useState("");
  const [location, setLocation] = useState("");
  const [calender, setCalender] = useState("");
  const [tourType, setTourType] = useState("");
  const [TourMambar, setTourMambar] = useState('')

  useEffect(() => {
    setCurrentActiveDD("");
  }, [location, calender, tourType, setCurrentActiveDD]);
  const dropDownContainer = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setCurrentActiveDD("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <section className="hero -type-7">
        <div className="hero__shape"></div>

        <div className="hero__slider js-section-slider">
          <div className="swiper-wrapper">
            <Swiper
              className="w-100"
              modules={[Navigation]}
              navigation={{
                prevEl: ".js-sliderHero-prev",
                nextEl: ".js-sliderHero-next",
              }}
              breakpoints={{
                500: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 1,
                },
                1200: {
                  slidesPerView: 1,
                },
              }}
            >
              {slides.map((elm, i) => (
                <SwiperSlide key={i}>
                  <div className="hero__bg">
                    <Image
                      width={1920}
                      height={160}
                      src={elm.imageSrc}
                      alt="background"
                    />
                  </div>

                  <div className="container">
                    <div className="row ">
                      <div className="col-lg-8 col-md-10">
                        <div className="hero__content text-left">
                          <h1
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="hero__subtitle text-white mb-20 md:mb-10"
                          >
                            {elm.subtitle}
                          </h1>

                          <h1
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="hero__title text--color-accent-1"
                          >
                            <span style={{fontSize : "5vw", fontWeight : "bold" , color : "#DAC04F "}}><b>{elm.title.split(",")[0]}</b></span>
                            <br className="md:d-none" />
                            <span style={{fontSize : "4vw", fontWeight : "700" , color : "#4198BA ", textAlign : "center"}}><b>{elm.title.split(",")[1]}</b></span>
                            <br className="md:d-none" />
                            <span style={{fontSize : "3vw", fontWeight : "700" , color : "black " , textAlign : "right"}}>{elm.title.split(",")[2]}</span>
                          </h1>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hero__nav d-flex mt-40">
            <button className="button -outline-white rounded-full size-72 flex-center text-white js-sliderHero-prev">
              <i className="icon-arrow-left text-20"></i>
            </button>

            <button className="button -outline-white rounded-full size-72 flex-center text-white ml-10 js-sliderHero-next">
              <i className="icon-arrow-right text-20"></i>
            </button>
          </div>
        </div>

        <div className="hero__filter">
          <div
            ref={dropDownContainer}
            className="searchForm -type-1 shadow-1  rounded-200"
          >
            <div className="searchForm__form">

              <div className="searchFormItem js-select-control js-form-dd">
                <div
                  className="searchFormItem__button"
                  onClick={() =>
                    setCurrentActiveDD((pre) =>
                      pre == "location" ? "" : "location",
                    )
                  }
                >
                  <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
                    <i className="text-20 icon-pin"></i>
                  </div>
                  <div className="searchFormItem__content">
                    <h5>Alle</h5>
                    <div className="js-select-control-chosen">
                      {location ? location : "All Tour"}
                    </div>
                  </div>
                </div>

                <Location
                  setLocation={setLocation}
                  active={currentActiveDD === "location"}
                />
              </div>

              <div className="searchFormItem js-select-control js-form-dd js-calendar">
                <div
                  className="searchFormItem__button"
                  onClick={() =>
                    setCurrentActiveDD((pre) =>
                      pre == "calender" ? "" : "calender",
                    )
                  }
                >
                  <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
                    <i className="text-20 icon-calendar"></i>
                  </div>
                  <div className="searchFormItem__content">
                    <h5>Reisebeginn to Reiseende</h5>
                    <div>
                      <span className="js-first-date">
                        <Calender active={currentActiveDD === "calender"} />
                      </span>
                      <span className="js-last-date"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="searchFormItem js-select-control js-form-dd">
                 <div
                  className="searchFormItem__button"
                  onClick={() =>
                    setTourLocation((pre) =>
                      pre == "tourType" ? "" : "tourType",
                    )
                  }

                  
                >
                  <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
                    <i className="text-20 icon-flag"></i>
                  </div>
                  <div className="searchFormItem__content">
                    <h5>Anzahl Reisende</h5>
                    <div className="js-select-control-chosen">
                      {tourType ? tourType : "All tour"}
                    </div>
                  </div>
                </div>
                <NumberOfTravellers  setTourType={setTourMambar} active={TourLocation === "tourType"} />
              </div>
            </div>

            <div
              onClick={() => router.push("/tour-list-5")}
              className="searchForm__button"
            >
              <button className="button -info-2 bg-accent-1 rounded-200 text-white">
                <i className="icon-search text-16 mr-10"></i>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
