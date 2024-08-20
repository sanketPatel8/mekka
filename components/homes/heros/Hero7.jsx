"use client";
import Calender from "@/components/common/dropdownSearch/Calender";
import Location from "@/components/common/dropdownSearch/Location";
import TourType from "@/components/common/dropdownSearch/TourType";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import NumberOfTravellers from "@/components/common/dropdownSearch/NumberOfTravellers";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { showErrorToast } from "@/app/utils/tost";
import { post } from "@/app/utils/api";

const slides = [
  {
    id: 1,
    imageSrc: "/img/hero/7/pxfuel 1.jpg",
    subtitle: "the independent",
    title: "comparison portal, find cheap, offers & save",
  },
  {
    id: 2,
    imageSrc: "/img/hero/7/image 2.jpg",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
  {
    id: 3,
    imageSrc: "/img/hero/7/image 3.jpg",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
  {
    id: 4,
    imageSrc: "/img/hero/7/image 4.jpg",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
  {
    id: 5,
    imageSrc: "/img/hero/7/image 1.jpg",
    subtitle:
      "Search, compare and book 15,000+ multiday tours all over the world.",
    title: "Tours and Trip packages, Globally",
  },
];

export default function Hero7() {
  const router = useRouter();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [tourMambar, setTourMambar] = useState("");
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  const { location, setLocation, calender, tourType } = useGlobalState();

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

  const handleFormClick = () => {
    const fetchData = async () => {
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        Keyword: "",
        type: location,
        start_date: calender[0],
        end_date: calender[1],
      };
      try {
        const response = await post("search_tour", sendData);
        console.log(response);
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
    fetchData();
    console.log("Form Data was hero 7", location, calender, tourType);
    router.push("/tour");
  };

  const handleDateChange = (newDates) => {
    setDates(newDates);
    const formattedDates = newDates.map((date) => date.format("MMMM DD YYYY"));
    console.log("Selected dates:", formattedDates);
  };

  return (
    <>
      <section className="hero -type-7">
        <div className="hero__shape"></div>

        <div className="hero__slider js-section-slider">
          <div className="swiper-wrapper">
            <Swiper
              className="w-100"
              modules={[Navigation, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                    <div className="row">
                      <div className="col-lg-8 col-md-10">
                        <div className="hero__content">
                          <h1
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="hero__subtitle text-white mb-5 md:mb-5"
                          >
                            {elm.subtitle}
                          </h1>

                          <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="hero__title text--color-accent-1"
                          >
                            <h2 className="text_50 text-xs-center text-sm-left text-md-left text-lg-left text-xl-left">
                              {elm.title.split(",")[0]}
                            </h2>
                          </div>
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
            className="searchForm -type-1 shadow-1 rounded-200"
          >
            <div className="searchForm__form">
              <div className="searchFormItem js-select-control js-form-dd">
                <div
                  className="searchFormItem__button"
                  onClick={() =>
                    setCurrentActiveDD((pre) =>
                      pre == "location" ? "" : "location"
                    )
                  }
                >
                  <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
                    <i className="text-20 icon-pin"></i>
                  </div>
                  <div className="searchFormItem__content">
                    <h5>Tour Type</h5>
                    <div className="js-select-control-chosen">
                      {location ? location : "Search destinations"}
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
                      pre == "calender" ? "" : "calender"
                    )
                  }
                >
                  <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
                    <i className="text-20 icon-calendar"></i>
                  </div>
                  <div className="searchFormItem__content">
                    <h5>Start of trip to end of trip</h5>
                    <div>
                      <span className="js-first-date">
                        <Calender
                          dates={dates}
                          onDateChange={handleDateChange}
                        />
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
                    setCurrentActiveDD((pre) =>
                      pre == "tourType" ? "" : "tourType"
                    )
                  }
                >
                  <div className="searchFormItem__icon size-50 rounded-full border-1 flex-center">
                    <i className="text-20 icon-flag"></i>
                  </div>
                  <div className="searchFormItem__content">
                    <h5>Passenger</h5>
                    <div className="js-select-control-chosen">
                      {tourType ? tourType : "All tour"}
                    </div>
                  </div>
                </div>

                <NumberOfTravellers
                  setTourType={setTourMambar}
                  active={currentActiveDD === "tourType"}
                />
              </div>
            </div>

            <div onClick={handleFormClick} className="searchForm__button">
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
