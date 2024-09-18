"use client";

import React, { useState, useEffect, useRef } from "react";
import { speedFeatures } from "@/data/tourFilteringOptions";
import { FaPersonWalking, FaStar } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdBed } from "react-icons/md";
import Stars from "@/components/common/Stars";
import Pagination from "@/components/common/Pagination";
import Sidebar2 from "@/components/tours/Sidebar2";
import Image from "next/image";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/app/context/TranslationContext";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

export default function TourList4({
  TourData,
  FliterData,
  count,
  range,
  onPageChange,
  setLanActives,
  FilterSidebar,
  LanActives,
  value,
  setValue,
  handleSelectionChange,
}) {
  console.log(handleSelectionChange, "handleSelectionChange tourlist");

  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);


  const [activeIndex, setActiveIndex] = useState(0);
  const startParam = "start";

  // for loader 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (TourData && TourData.length === 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [TourData]);

  // for pagination

  const dropDownContainer = useRef(null);

  const [screenSize, setScreenSize] = React.useState("");

  useEffect(() => {
    setScreenSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", () => {
      setScreenSize([window.innerWidth, window.innerHeight]);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setScreenSize([window.innerWidth, window.innerHeight]);
      });
    };
  }, []);

  const { translate } = useTranslation();

  return (
    <section className="layout-pb-xl">
      <div className="container">
        <div className="row"  id="redirect">
          <div className="col-xl-3 col-lg-4">
            {screenSize[0] && screenSize[0] <= 900 ? (
              <div className="accordion d-none mb-30 lg:d-flex js-accordion">
                <div
                  className={`accordion__item col-12 ${
                    sidebarActive ? "is-active" : ""
                  } `}
                >
                  <button
                    className="accordion__button button -info-2 bg-light-1 px-25 py-10 border-1 rounded-12"
                    onClick={() => setSidebarActive((prev) => !prev)}
                  >
                    <i className="icon-sort-down mr-10 text-16"></i>
                    Filter
                  </button>

                  <div
                    className="accordion__content"
                    style={sidebarActive ? { maxHeight: "2000px" } : {}}
                  >
                    <div className="pt-20">
                      <Sidebar2
                        FliterData={FliterData}
                        setLanActives={setLanActives}
                        FilterSidebar={FilterSidebar}
                        LanActives={LanActives}
                        value={value}
                        setValue={setValue}
                        handleSelectionChange={handleSelectionChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <Sidebar2
                  FliterData={FliterData}
                  setLanActives={setLanActives}
                  FilterSidebar={FilterSidebar}
                  LanActives={LanActives}
                  value={value}
                  setValue={setValue}
                  handleSelectionChange={handleSelectionChange}
                />
              </div>
            )}
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="row y-gap-5 justify-between">
              <div className="col-auto">
                <div>
                  {TourData.length} results
                  {/* from {Route}{" "} */}
                </div>
              </div>

              <div ref={dropDownContainer} className="col-auto">
                <div
                  className={`dropdown -type-2 js-dropdown js-form-dd ${
                    ddActives ? "is-active" : ""
                  } `}
                  data-main-value=""
                >
                  <div className="dropdown__menu js-menu-items">
                    {speedFeatures.map((elm, i) => (
                      <div
                        onClick={() => {
                          setSortOption((pre) => (pre == elm ? "" : elm));
                          setDdActives(false);
                        }}
                        key={i}
                        className="dropdown__item"
                        data-value="fast"
                      >
                        {elm}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <ClipLoader color="#DAC04F" size={50} />
              </div>
            ) : Array.isArray(TourData) && TourData.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center" >
                <p>No Tours Available</p>
              </div>
            ) : (
              Array.isArray(TourData) &&
              TourData.map((elm, ind) => (
                <div className="row mt-20" key={ind}>
                  <div className="col-12 my-0">
                    <div className="tourCard -type-2">
                      <div className="tourCard__image">
                        <Image
                          width={420}
                          height={390}
                          src={
                            elm.tour_image
                              ? elm.tour_image
                              : "/img/404/imgnotFound.png"
                          }
                          alt="image"
                        />
                        <button
                          className={`tourCard__favorite ${
                            elm?.direct_flight == '0' ? "d-none" : "d-block"
                          }`}
                        >
                          {translate("Direct Flight")}
                        </button>
                      </div>
                      <div className="tourCard__content">
                        <div className="tourCard__location border_yellow">
                          <FaPersonWalking color="white" size={18} />
                          zu Kaaba {elm?.distance_to_hotel}
                        </div>
                        <h3 className="tourCard__title mt-5">
                          <span>
                            {elm?.type}-{elm?.name}
                          </span>
                        </h3>
                        <div>
                          <div>
                            <p className="tourCard__text mt-5 items-center d-flex">
                              <FaHotel
                                className="px-1"
                                color="#dabf4f"
                                size={25}
                              />
                              Hotel: {elm?.hotel_name} ({elm?.hotel_stars}{" "}
                              <FaStar color="#dabf4f" className="mx-1" />)
                            </p>
                          </div>
                          <p className="tourCard__text mt-5">
                            <FontAwesomeIcon
                              icon={faQuoteRight}
                              className="px-1 text-accent-1"
                            />
                            {elm.destination}
                          </p>
                        </div>
                        <div className="d-flex items-center mt-5">
                          <div className="d-flex items-center x-gap-5">
                            <Stars star={elm?.rating_count} font={12} />
                          </div>
                          <div className="text-14 ml-10">
                            <span className="fw-500">{elm?.rating}</span> (
                            {elm?.rating_count}) - {elm?.company_name}
                          </div>
                        </div>

                        <div className="row x-gap-20 y-gap-5 pt-30">
                          <div className="col-auto">
                            <div className="d-flex text-14 items-center">
                              <FaCalendar color="dabf4f" size={17} />
                              <p className="mx-1">
                                {elm?.date_begin} - {elm?.date_end}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tourCard__info">
                        <div className="h-60">
                          <p className="d-flex items-center text-14 p-2 border-info my-2 m_width">
                            <IoTimeOutline
                              className="mx-2"
                              color="#DAC04F"
                              size={20}
                            />
                            {elm?.days_of_stay}
                          </p>
                          {elm?.tour_with_service && (
                            <p className="d-flex items-center text-14 bedrooms p-2 border-info my-2 m_width">
                              <MdBed
                                className="mx-2"
                                color="#DAC04F"
                                size={20}
                              />
                              {elm.tour_with_service}
                            </p>
                          )}

                          <div className="tourCard__price">
                            <div></div>
                            <div className="d-flex items-center justify-content-center">
                              <p className="text-20 fw-500 ml-5 text-center">
                                {elm?.tour_price} €
                              </p>
                            </div>
                            <p className="text-left text-md-center text-lg-center text-xl-center">
                              including taxes and fee
                            </p>
                          </div>
                        </div>
                        <button className="button -outline-accent-1 text-accent-1">
                          <Link href={`/package/${elm?.slug}?id=${elm?.id}`}>
                            SHOW AVAILABILITY
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className={`${TourData.length === 0 ? "d-none" : "d-block"}`}>
              <div className="d-flex justify-center flex-column mt-60">
                <Pagination
                  range={range}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  startParam={startParam}
                  onPageChange={onPageChange}
                />

               

                <div className="text-14 text-center mt-20">
                  Showing results 1 - {TourData.length} of {count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
