"use client";

import React, { useState } from "react";
import MainInformation from "../MainInformation";
import Gallery1 from "../Galleries/Gallery1";
import OthersInformation from "../OthersInformation";
import Overview from "../Overview";
import Included from "../Included";
import RoadMap from "../RoadMap";
import Faq from "../Faq";
import Reviews from "../Reviews";
import TourSingleSidebar from "../TourSingleSidebar";
import OtherInformation2 from "../OtherInformation2";
import RoadMap2 from "../Roadmap2";

export default function SingleFour({ tour }) {
  const [activeAcorditions, setActiveAcorditions] = useState([]);
  return (
    <>
      <section className="py-30 mt-80">
        <div className="container">
          <MainInformation tour={tour} />

          <Gallery1 />
        </div>
      </section>

      <section className="layout-pt-md">
        <div className="container pl-lg-auto pl-md-auto pl-0">
          <div className="row y-gap-30 justify-between ml-lg-2 ml-md-0 ml-0">
            <div className="col-lg-8 border-1 single-lft-box-shadow">
              <div className="row y-gap-2 justify-between items-center layout-pb-sm">
                <OthersInformation />
              </div>
              <div className="row y-gap-20 justify-between items-center layout-pb-sm">
                <OtherInformation2 />
              </div>

              <Overview />

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
                            : [...pre, "Included"],
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        What's Included
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
                        <Included />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("f_Included") ? "is-active" : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setActiveAcorditions((pre) =>
                          pre.includes("f_Included")
                            ? [...pre.filter((elm) => elm != "f_Included")]
                            : [...pre, "f_Included"],
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                       Flight Information
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
                        {/* <Included /> */}
                        <p>Das Al Ebaa Hotel bietet Zimmer in Mekka in der Nähe des Masjid Al Haram King Abdul Aziz Gate und des Masjid Al Haram King Abdullah Expension Gate. Zu den Einrichtungen dieser Unterkunft gehören ein Restaurant, Zimmerservice und eine 24-Stunden-Rezeption sowie kostenfreies WLAN. Private Parkplätze stehen vor Ort zur Verfügung. Das Hotel bietet Ihnen klimatisierte Zimmer mit einem Kleiderschrank, einem Wasserkocher, einem Safe, einem Flachbisss</p>
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
                            : [...pre, "roadmap"],
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        Itinerary
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
                        <RoadMap2 />
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
                            : [...pre, "HotelInfo"],
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        Hotel Information
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
                        <RoadMap />
                        {/* <Gallery1 /> */}
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
                            : [...pre, "faq"],
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">FAQ</div>

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
                          <Faq />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`accordion__item py-30 border-1-top ${
                      activeAcorditions.includes("review") ? "is-active" : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setActiveAcorditions((pre) =>
                          pre.includes("review")
                            ? [...pre.filter((elm) => elm != "review")]
                            : [...pre, "review"],
                        )
                      }
                      className="accordion__button d-flex items-center justify-between"
                    >
                      <div className="text-30 md:text-20 lh-13 fw-700">
                        Customer Reviews
                      </div>

                      <div className="accordion__icon size-30 text-24 flex-center">
                        <i className="icon-chevron-down"></i>
                        <i className="icon-chevron-up"></i>
                      </div>
                    </div>

                    <div
                      className="accordion__content"
                      style={
                        activeAcorditions.includes("review")
                          ? { maxHeight: "500px" }
                          : {}
                      }
                    >
                      <div className="pt-20">
                        {/* <Rating /> */}
                        <Reviews />

                        <button className="button -md -outline-accent-1 text-accent-1 mt-30">
                          See more reviews
                          <i className="icon-arrow-top-right text-16 ml-10"></i>
                        </button>
                        {/* <CommentBox /> */}
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

            <div className="col-lg-4 my-2 my-md-2 my-lg-0">
              <div
                style={{ position: "sticky", top: "10px" }}
                className="d-flex justify-start"
              >
                <TourSingleSidebar />
              </div>
            </div>

          </div>
            <div className="py-40">
            <hr />
            </div>
        </div>
      </section>
    </>
  );
}
