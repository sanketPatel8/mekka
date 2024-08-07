"use client";

import React, { useState, useEffect, useRef } from "react";
import { speedFeatures } from "@/data/tourFilteringOptions";
import { FaPersonWalking, FaQuoteRight, FaStar, FaCheck } from "react-icons/fa6";
import { tourDataTwo } from "@/data/tours";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
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

export default function TourList4() {
  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [TourListData, setTourListData] = useState([])
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

  const sendData = {
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    email : "sanket.xceptive+123@gmail.com"
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData function called");
      try {
        const response = await post("tourlist", sendData);
        console.log("Response received:", response);
        setTourListData(response.data); // Assuming response.data contains the data you need
      } catch (error) {
        console.error("Error caught:", error);
        if (error.response && error.response.data && error.response.data.message) {
          showErrorToast("Please verify your email");
        } else {
          showErrorToast("An error occurred during registration.");
        }
      }
    };
  
    console.log("Calling fetchData");
    fetchData();
  }, []);
  

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
                <div>1362 results</div>
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

            <div className="row y-gap-30 pt-30">
              {tourDataTwo.map((elm, i) => (
                <div className="col-12 my-2" key={i}>
                  <div className="tourCard -type-2">
                    <div className="tourCard__image">
                      <Image
                        width={420}
                        height={390}
                        src={elm.imageSrc}
                        alt="image"
                      />
                      <button className="tourCard__favorite" disabled >Direct Flight</button>
                    </div>

                    <div className="tourCard__content">
                      <div className="tourCard__location border_yellow">
                        <FaPersonWalking color="white" size={18} />
                        {elm.location}
                      </div>

                      <h3 className="tourCard__title mt-5">
                        <span>{elm.title}</span>
                      </h3>

                      <p className="tourCard__text mt-5 items-center d-flex">
                        <FontAwesomeIcon icon={faHotel} style={{ color: "#dabf4f" }} className="px-1"/>
                        {elm.description} (3 <FaStar color="#dabf4f" className="mx-1" />)
                      </p>
                      <p className="tourCard__text mt-5 items-center d-flex">
                        <FontAwesomeIcon icon={faHotel} style={{ color: "#dabf4f" }} className="px-1" />
                        {elm.description2} (5 <FaStar color="#dabf4f" className="mx-1" />)
                      </p>
                      <p className="tourCard__text mt-5">
                        <FaQuoteRight color="#dabf4f" size={20} className="mx-1"/> 
                        {elm.description3}
                      </p>

                      <div className="d-flex items-center mt-5">
                        <div className="d-flex items-center x-gap-5">
                          <Stars star={elm.rating} font={12} />
                        </div>

                        <div className="text-14 ml-10">
                          <span className="fw-500">{elm.rating}</span> (
                          {elm.ratingCount}) - IDEALGATE
                        </div>
                      </div>

                      <div className="Location">
                        <span>
                          Departure : London
                        </span>
                      </div>

                      <div className="row x-gap-20 y-gap-5 pt-30">
                        {elm.features?.map((elm2, i2) => (
                          <div key={i2} className="col-auto">
                            <div className="text-14 items-center ">
                            <FaCalendar  color="dabf4f" size={15}/>
                              {elm2.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="tourCard__info">
                      <div className="h-60">
                        <p className="d-flex items-center text-14 p-2 border-info my-2 m_width  ">
                          <IoTimeOutline className="mx-2" color="#DAC04F" size={20}/>
                          {elm.duration}
                        </p>
                        <p className="d-flex items-center text-14 bedrooms p-2 border-info my-2 m_width ">
                          <MdBed className="mx-2" color="#DAC04F" size={20}/>
                          {elm.bedrooms}
                        </p>

                        <div className="tourCard__price">
                          <div></div>

                          <div className="d-flex items-center justify-content-center">
                            <p className="text-20 fw-500 ml-5 text-center">
                              {elm.fromPrice} €  
                            </p>
                          </div>
                          <p className="text-left text-md-center text-lg-center text-xl-center">
                            including taxes and fee
                          </p>
                        </div>
                      </div>

                      <button className="button -outline-accent-1 text-accent-1">
                        <Link href={`/toursingle/${elm.id}`}>
                          SHOW AVAILABILITY
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-center flex-column mt-60">
              <Pagination />

              <div className="text-14 text-center mt-20">
                Showing results 1-30 of 1,415
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
