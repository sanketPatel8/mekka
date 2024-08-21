"use client";

import React, { useState, useEffect, useRef } from "react";
import { speedFeatures } from "@/data/tourFilteringOptions";
import { FaPersonWalking, FaStar } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdBed } from "react-icons/md";
import Stars from "../common/Stars";
import Pagination from "../common/Pagination";
import Sidebar2 from "./Sidebar2";
import Image from "next/image";
import { post } from "@/app/utils/api";
import Link from "next/link";
import { showErrorToast } from "@/app/utils/tost";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function TourList4({heroData}) {
  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [TourListData, setTourListData] = useState([]);
  const [count, setCount] = useState("");
  const [Dataid, setDataid] = useState("");
  const [AllPage, setAllPage] = useState("");
  // for paination

  const Router = useRouter();

  const [activeIndex, setActiveIndex] = useState(1);

  const dropDownContainer = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActives(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        start: activeIndex ,
        type : "",
      };
      console.log("activeIndex was :" , activeIndex);
      
      try {
        const response = await post("tourlist", sendData);
        setCount(response.Count);
        if (response.Tours) {
          setTourListData(response.Tours);
          setAllPage(response.Total_Page);
          // console.log("Tours data:", response.Tours); // Check the data being set
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

    fetchData();
  }, [activeIndex]);

  console.log("Tour list data was : " , TourListData);
  console.log("heroData was : " , heroData);
  
  

  
  // pagination

  // Callback function to handle index updates
  const handleIndexChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="layout-pb-xl">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <div className="lg:d-none">
              <Sidebar2 />
            </div>

            <div className="accordion d-none mb-30 lg:d-flex js-accordion">
              <div
                className={`accordion__item col-12 ${
                  sidebarActive ? "is-active" : ""
                } `}
              >
                <button
                  className="accordion__button button -dark-1 bg-light-1 px-25 py-10 border-1 rounded-12"
                  onClick={() => setSidebarActive((pre) => !pre)}
                >
                  <i className="icon-sort-down mr-10 text-16"></i>
                  Filter
                </button>

                <div
                  className="accordion__content"
                  style={sidebarActive ? { maxHeight: "2000px" } : {}}
                >
                  <div className="pt-20">
                    <Sidebar2 />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="row y-gap-5 justify-between">
              <div className="col-auto">
                <div>{heroData.Tour_List?.length} results</div>
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

            {heroData.Tour_List?.map((elm, ind) => (
              <div className="row mt-20" key={ind}>
                <div className="col-12 my-0">
                  <div className="tourCard -type-2">
                    <div className="tourCard__image">
                      <Image
                        width={420}
                        height={390}
                        // src={TourListData?.tour_image}
                        src="/_next/image?url=%2Fimg%2FtourCards%2F1%2F13.jpeg&w=1080&q=75"
                        alt="image"
                      />

                      <button
                        className={`tourCard__favorite ${
                          elm?.direct_flight === 0 ? "d-none" : "d-block"
                        }`}
                      >
                        Direct Flight
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
                          <Stars star={elm?.rating} font={12} />
                        </div>

                        <div className="text-14 ml-10">
                          <span className="fw-500">{elm?.rating}</span> (
                          {elm?.rating_count}) - {elm?.company_name}
                        </div>
                      </div>

                      <div className="Location">
                        <span>Departure : {elm?.departures}</span>
                      </div>

                      <div className="row x-gap-20 y-gap-5 pt-30">
                        <div className="col-auto">
                          <div className="d-flex text-14 items-center ">
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
                        <p className="d-flex items-center text-14 p-2 border-info my-2 m_width  ">
                          <IoTimeOutline
                            className="mx-2"
                            color="#DAC04F"
                            size={20}
                          />
                          {elm?.days_of_stay}
                        </p>
                        <p
                          className={`d-flex items-center text-14 bedrooms p-2 border-info my-2 m_width ${
                            elm?.tour_with_service == null
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <MdBed className="mx-2" color="#DAC04F" size={20} />
                          {elm?.tour_with_service}
                        </p>

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
            ))}

            <div className="d-flex justify-center flex-column mt-60">
              <Pagination
                range={AllPage}
                activeIndex={activeIndex}
                setActiveIndex={handleIndexChange}
              />

              <div className="text-14 text-center mt-20">
                Showing results 1-10 of {heroData.Tour_List?.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
