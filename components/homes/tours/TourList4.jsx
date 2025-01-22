"use client";

import React, { useState, useEffect, useRef } from "react";
import { speedFeatures } from "@/data/tourFilteringOptions";
import { FaPersonWalking, FaStar } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoPeopleSharp, IoTimeOutline } from "react-icons/io5";
import { MdBed, MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import Stars from "@/components/common/Stars";
import { PiBuildingApartmentFill } from "react-icons/pi";
import Pagination from "@/components/common/Pagination";
import Sidebar2 from "@/components/tours/Sidebar2";
import Image from "next/image";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/app/context/TranslationContext";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { useCurrency } from "@/app/context/currencyContext";

export default function TourList4({
  filterType,
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
  activeIndex,
  setActiveIndex,
  Distance,
  setDistance,
  FilterPrice,
  setFilterPrice,
  setFilterDistance,
  FilterDistance,
}) {
  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const { formatPrice } = useCurrency();
  const startParam = "start";

  // for loader

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (TourData) {
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

  const truncateHotelName = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    if (words.length > 4) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return name;
  };

  const { translate } = useTranslation();

  return (
    <section className="layout-pb-xl">
      <div className="container">
        <div className="row">
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
                        Distance={Distance}
                        setDistance={setDistance}
                        FilterPrice={FilterPrice}
                        setFilterPrice={setFilterPrice}
                        setFilterDistance={setFilterDistance}
                        FilterDistance={FilterDistance}
                        filterType={filterType}
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
                  Distance={Distance}
                  setDistance={setDistance}
                  FilterPrice={FilterPrice}
                  setFilterPrice={setFilterPrice}
                  setFilterDistance={setFilterDistance}
                  FilterDistance={FilterDistance}
                  filterType={filterType}
                />
              </div>
            )}
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="row y-gap-5 justify-between">
              <div className="col-auto">
                <div>
                  {count} {count <= 1 ? "Result" : translate("Results")}
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
            ) : Array.isArray(TourData) && TourData.length == 0 ? (
              <div className="d-flex justify-content-center align-items-center">
                <p>{translate("No Tours Available")}</p>
              </div>
            ) : (
              Array.isArray(TourData) &&
              TourData.map((elm, ind) => (
                <div className="row mt-20" key={ind}>
                  <div className="col-12 my-0">
                    <Link
                      href={`/package/${elm?.slug}?id=${elm?.id}&name=${elm?.slug}`}
                      className="tourCard -type-2"
                    >
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
                            elm?.direct_flight == "0" ? "d-none" : "d-block"
                          }`}
                        >
                          {translate("Direct Flight")}
                        </button>
                        <div
                          className={`Pay later ${
                            elm.later_payment == 1 ? "d-block" : "d-none"
                          }`}
                        >
                          {translate("Pay Later")}
                        </div>
                      </div>
                      <div className="tourCard__content">
                        <div className="d-flex gap-2 items-center">
                          {/* <div className="tourCard__location border_yellow mx-2">
                            <FaPersonWalking color="white" size={18} />
                            zu Kaaba {elm?.distance_to_hotel}
                          </div> */}
                          <div
                            className={`tourCard__location d-flex items-center text-13 text-light-2 border_yellow px-2 my-2 `}
                          >
                            {/* <FaCalendar color="dabf4f" size={17} /> */}
                            {elm.date_begin} - {elm.date_end}
                          </div>
                        </div>
                        <h3 className="tourCard__title fw-700 mt-5">
                          <span>
                            {elm?.type}-{elm?.name}
                          </span>
                        </h3>
                        <div>
                          <div className="mt-5">
                            {elm?.tour_hotels?.mekka_hotels?.[0] && (
                              <p className="tourCard__text mt-5 items-center d-flex">
                                <FaHotel
                                  className="pe-2"
                                  color="#dabf4f"
                                  size={30}
                                />
                                <div
                                  className=" flex-column "
                                  style={{ display: "flex" }}
                                >
                                  <div className="text-12">
                                    <span style={{ fontWeight: "700" }}>
                                      Hotel Mekka :{" "}
                                    </span>{" "}
                                    <span className="hotel_name">
                                      {truncateHotelName(
                                        elm?.tour_hotels?.mekka_hotels[0]
                                          ?.hotel_name
                                      )}
                                    </span>{" "}
                                    (
                                    {
                                      elm.tour_hotels?.mekka_hotels[0]
                                        ?.hotel_stars
                                    }{" "}
                                    <FaStar color="#dabf4f" className="" /> )
                                  </div>

                                  <div className="text-12">
                                    <span style={{ fontWeight: "700" }}>
                                      Hotel Madina :{" "}
                                    </span>{" "}
                                    <span className="hotel_name">
                                      {truncateHotelName(
                                        elm?.tour_hotels?.medina_hotels[0]
                                          ?.hotel_name
                                      )}
                                    </span>{" "}
                                    (
                                    {
                                      elm.tour_hotels?.medina_hotels[0]
                                        ?.hotel_stars
                                    }{" "}
                                    <FaStar
                                      color="#dabf4f"
                                      className=""
                                      style={{ fontSize: "10px" }}
                                    />{" "}
                                    )
                                  </div>
                                </div>
                              </p>
                            )}
                          </div>

                          {/* <p className="tourCard__text mt-5 ">
                            <FontAwesomeIcon
                              icon={faQuoteRight}
                              className="px-1 text-accent-1 "
                            />
                            {translate("Destination")} : {elm.type == "Hajj"
                              ? "JED"
                              : elm.type == "Umrah"
                              ? "MAD"
                              : "ALL"}
                          </p> */}
                        </div>

                        <p className="mt-5">
                          <div className="  d-flex items-center">
                            <MdFlightTakeoff size={22} color="#DAC04F" />
                            <span
                              className="text-12 ms-2"
                              style={{ fontWeight: "700" }}
                            >
                              {translate("Departure")} :{" "}
                            </span>
                            <span className="text-13 ms-2">
                              {elm?.departures}
                            </span>
                          </div>
                          <div className="d-flex items-center">
                            <MdFlightLand size={22} color="#DAC04F" />
                            <span
                              className="text-13 ms-2"
                              style={{ fontWeight: "700" }}
                            >
                              {translate("Arrival")} :{" "}
                            </span>
                            <span className="text-13 ms-2">{elm?.arrival}</span>
                          </div>
                        </p>

                        {elm?.company_name !== " " &&
                          elm?.company_name !== null && (
                            <p className="d-flex items-center mt-5">
                              <div className="d-flex items-center x-gap-5">
                                {/* <Stars star={elm?.rating_count} font={12} /> */}
                                <IoPeopleSharp
                                  color="#dabf4f"
                                  className="pe-2"
                                  size={30}
                                />
                              </div>
                              <div className="text-13 ml-5">
                                <span className="fw-700">
                                  {translate("Organizer")} :{" "}
                                </span>
                                {/* {elm?.rating_count}) - */}
                                {elm?.company_name}
                              </div>
                            </p>
                          )}

                        <div className=" mt-5 ">
                          <FaPersonWalking color="#3f97ca" size={23} />
                          <span
                            className="text-13 ms-2 "
                            style={{ color: "#3f97ca", fontWeight: "700" }}
                          >
                            {translate("Distance to the Kaaba")} :{" "}
                          </span>
                          <span
                            className="text-13 ms-2"
                            style={{ color: "#3f97ca" }}
                          >
                            {elm?.distance_to_hotel}{" "}
                          </span>
                        </div>

                        {/* <div className="row x-gap-20 y-gap-5 ">
                          <div className="col-auto">
                            <div className="d-flex text-14 items-center">
                              <FaCalendar color="dabf4f" size={17} />
                              <p className="mx-1">
                                {elm?.date_begin} - {elm?.date_end}
                              </p>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <div className="tourCard__info">
                        <div className="h-60">
                          <p className="d-flex items-center text-14 p-2 border-info my-2 m_width tab-font-12">
                            <IoTimeOutline
                              className="mx-2"
                              color="#DAC04F"
                              size={20}
                            />
                            {elm?.days_of_stay}
                          </p>
                          {elm?.tour_with_service && (
                            <p className="d-flex items-center text-14 bedrooms p-2 border-info my-2 m_width ">
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
                              <p className="text-26 fw-700 ml-5 text-center">
                                {formatPrice(elm?.tour_price)}
                              </p>
                            </div>
                            <p className="text-center ">
                              {translate("including taxes and fee")}
                            </p>
                          </div>
                        </div>
                        <button className="button -outline-accent-1 text-accent-1">
                          <Link
                            href={`/package/${elm?.slug}?id=${elm?.id}&name=${elm?.slug}`}
                          >
                            {translate("Details & Booking")}
                          </Link>
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}

            <div className={`${TourData?.length === 0 ? "d-none" : "d-block"}`}>
              <div className="d-flex justify-center flex-column mt-60">
                <Pagination
                  range={range}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  startParam={startParam}
                  onPageChange={onPageChange}
                />

                <div className="text-14 text-center mt-20">
                  {translate("Total")} - {count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
