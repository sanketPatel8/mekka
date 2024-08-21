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

export default function Hero1({ onDataFetch }) {
  const router = useRouter();
  const [currentActiveDD, setCurrentActiveDD] = useState("");
  const [tourMambar, setTourMambar] = useState("");
  const { location, calender, tourType, setLocation, dates } = useGlobalState();

  const dropDownContainer = useRef();

  // Close dropdown when clicking outside
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

  // Fetch data and pass it to the parent component
  useEffect(() => {
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

        // Check if response is an object with expected properties
        if (response && typeof response === "object" && response.Tour_List) {
          console.log("Fetched data in Hero1:", response);

          // Pass data to parent component
          if (onDataFetch) {
            onDataFetch(response);
          }
        } else {
          console.error("Response is not a valid data object:", response);
          showErrorToast("Unexpected response format.");
        }
      } catch (error) {
        console.error("Error caught:", error);
        showErrorToast("An error occurred.");
      }
    };
    fetchData();
  }, [onDataFetch, location, calender]);

  const handleDateChange = (newDates) => {
    setDates(newDates);
    const formattedDates = newDates.map((date) => date.format("YYYY-MM-DD"));
    console.log("Selected dates:", formattedDates);
  };

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
                  <div className="searchForm__form">
                    <div
                      className={`searchFormItem js-select-control js-form-dd ${
                        currentActiveDD === "location" ? "active" : ""
                      }`}
                    >
                      <div
                        className="searchFormItem__button"
                        onClick={() =>
                          setCurrentActiveDD((prev) =>
                            prev === "location" ? "" : "location"
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
                        setLocation={(value) => {
                          setLocation(value);
                          setCurrentActiveDD("");
                        }}
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

                  <div className="searchForm__button">
                    <button
                      onClick={() => router.push("/tour")}
                      className="button -info-2 bg-accent-1 text-white"
                    >
                      <i className="icon-search text-16 mr-10"></i>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
