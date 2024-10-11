"use client";

import React, { useEffect, useState } from "react";
import MainInformation from "../MainInformation";
import Gallery1 from "../Galleries/Gallery1";
import OthersInformation from "../OthersInformation";
import Overview from "../Overview";
import Included from "../Included";
import HotelInformation from "../HotelInformation";
import Faq from "../Faq";
import Reviews from "../Reviews";
import TourSingleSidebar from "../TourSingleSidebar";
import RoadMap2 from "../Roadmap2";
import { useTranslation } from "@/app/context/TranslationContext";
import { useSearchParams } from "next/navigation";
import FlightInformation from "../FlightInformation";

export default function SingleFour({ PAckageData }) {
  const [activeAcorditions, setActiveAcorditions] = useState([]);
  const [FlightInc, setFlightInc] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [isLoading, setisLoading] = useState(false)
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const foundTour = PAckageData?.Tour_List?.find((tour) => tour.id == id);
    setFlightInc(foundTour);
  }, [PAckageData]);

  const { translate } = useTranslation();

  return (
    <>
      <section className="py-30 mt-80">
        
        <div className="container">
          <MainInformation PAckageData={PAckageData} />

          <Gallery1 PAckageData={PAckageData} />
        </div>
      </section>

      <section className="layout-pt-md">
        <div className="container pl-lg-auto pl-md-auto pl-0">
          <div className="row y-gap-30 justify-between ml-lg-2 ml-md-0 ml-0 ">
            <div className="col-lg-8 col-11 border-1 single-lft-box-shadow mx-auto">
              <div className="row y-gap-2 justify-between items-center layout-pb-sm">
                <OthersInformation PAckageData={PAckageData} id={id} />
              </div>

              <Overview PAckageData={PAckageData} />

              <div className="accordion -tour-single row y-gap-20 pt-60 md:pt-30 js-accordion">
                <div className="col-12">
                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("Included") ? "is-active" : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setActiveAcorditions((pre) =>
                          pre.includes("Included")
                            ? [...pre.filter((elm) => elm != "Included")]
                            : [...pre, "Included"]
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        {translate("What's Included")}
                      </div>

                      <div className="accordion__icon size-30 text-24 flex-center">
                        <i className="icon-chevron-down"></i>
                        <i className="icon-chevron-up"></i>
                      </div>
                    </div>

                    <div
                      className="accordion__content"
                      style={
                        activeAcorditions.includes("Included")
                          ? { maxHeight: "500px" }
                          : {}
                      }
                    >
                      <div className="pt-20">
                        <Included PAckageData={PAckageData} />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("f_Included")
                        ? "is-active"
                        : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setActiveAcorditions((pre) =>
                          pre.includes("f_Included")
                            ? [...pre.filter((elm) => elm != "f_Included")]
                            : [...pre, "f_Included"]
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        {translate("Flight Information")}
                      </div>

                      <div className="accordion__icon size-30 text-24 flex-center">
                        <i className="icon-chevron-down"></i>
                        <i className="icon-chevron-up"></i>
                      </div>
                    </div>

                    <div
                      className="accordion__content"
                      style={
                        activeAcorditions.includes("f_Included")
                          ? { maxHeight: "500px" }
                          : {}
                      }
                    >
                      <div className="pt-20">
                        <FlightInformation PAckageData={PAckageData} />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("roadmap") ? "is-active" : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setActiveAcorditions((pre) =>
                          pre.includes("roadmap")
                            ? [...pre.filter((elm) => elm != "roadmap")]
                            : [...pre, "roadmap"]
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        {translate("Itinerary")}
                      </div>

                      <div className="accordion__icon size-30 text-24 flex-center">
                        <i className="icon-chevron-down"></i>
                        <i className="icon-chevron-up"></i>
                      </div>
                    </div>

                    <div
                      className="accordion__content"
                      style={
                        activeAcorditions.includes("roadmap")
                          ? { maxHeight: "500px" }
                          : {}
                      }
                    >
                      <div className="pt-20">
                        <RoadMap2 PAckageData={PAckageData} />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("HotelInfo") ? "is-active" : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setActiveAcorditions((pre) =>
                          pre.includes("HotelInfo")
                            ? [...pre.filter((elm) => elm != "HotelInfo")]
                            : [...pre, "HotelInfo"]
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        {translate("Hotel Information")}
                      </div>

                      <div className="accordion__icon size-30 text-24 flex-center">
                        <i className="icon-chevron-down"></i>
                        <i className="icon-chevron-up"></i>
                      </div>
                    </div>

                    <div
                      className="accordion__content"
                      style={
                        activeAcorditions.includes("HotelInfo")
                          ? { maxHeight: "2000px" }
                          : {}
                      }
                    >
                      <div className="pt-20">
                        <HotelInformation
                          PAckageData={PAckageData}
                          hotelData={hotelData}
                          isLoading={isLoading}
                          setisLoading={setisLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("faq") ? "is-active" : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setActiveAcorditions((pre) =>
                          pre.includes("faq")
                            ? [...pre.filter((elm) => elm != "faq")]
                            : [...pre, "faq"]
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        {translate("FAQ")}
                      </div>

                      <div className="accordion__icon size-30 text-24 flex-center">
                        <i className="icon-chevron-down"></i>
                        <i className="icon-chevron-up"></i>
                      </div>
                    </div>

                    <div
                      className="accordion__content"
                      style={
                        activeAcorditions.includes("faq")
                          ? { maxHeight: "500px" }
                          : {}
                      }
                    >
                      <div className="pt-20">
                        <div className="accordion -simple row y-gap-20 js-accordion">
                          <Faq PAckageData={PAckageData} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("roadmap") ? "is-active" : ""
                    }`}
                  >
                    <div
                      className="accordion__content"
                      style={
                        activeAcorditions.includes("roadmap")
                          ? { maxHeight: "500px" }
                          : {}
                      }
                    >
                      <div className="pt-20">
                        {/* <RoadMap /> */}
                        {/* <Extras /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 my-3 my-md-2 my-lg-0">
              <div
                style={{ position: "sticky", top: "10px" }}
                className="d-flex justify-start"
              >
                <TourSingleSidebar
                  PAckageData={PAckageData}
                  setHotelData={setHotelData}
                  isLoading={isLoading}
                  setisLoading={setisLoading}
                />
              </div>
            </div>
          </div>
        
        </div>
        <div className="py-40">
            <span className="border-1-top " />
          </div>
      </section>
    </>
  );
}
