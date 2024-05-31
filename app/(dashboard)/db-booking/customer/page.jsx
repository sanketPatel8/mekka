"use client";

import React, { useState } from "react";
import Header from "@/components/dasboard/Header";
import Pagination from "@/components/common/Pagination";
import { bookingData } from "@/data/dashboard";
import Image from "next/image";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";
import { tourDataTwo } from "@/data/tours";
import { LiaKaabaSolid } from "react-icons/lia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faHotel, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Stars from "@/components/common/Stars";
import Link from "next/link";

const tabs = ["Approved", "Pending", "Cancelled"];

export default function DbBooking() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("Approved");
  return (
    <div
      className={`dashboard ${
        sideBarOpen ? "-is-sidebar-visible" : ""
      } js-dashboard`}
    >
      <CustomerDBsideBar setSideBarOpen={setSideBarOpen} />

      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content_content">
          <h1 className="text-30">My Booking</h1>
          <p className="">Lorem ipsum dolor sit amet, consectetur.</p>

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
                    </div>

                    <div className="tourCard__content">
                      <div className="tourCard__location">
                        <LiaKaabaSolid color="#dabf4f" size={25} />
                        {elm.location}
                      </div>

                      <h3 className="tourCard__title mt-5">
                        <span>{elm.title}</span>
                      </h3>

                      <p className="tourCard__text mt-5 items-center d-flex"><FontAwesomeIcon icon={faHotel} style={{ color: "#dabf4f" }} className="px-1"/>
                       {elm.description} (3 <FaStar color="#dabf4f" className="mx-1" />)
                      </p>
                        <p className="tourCard__text mt-5 items-center d-flex "><FontAwesomeIcon icon={faHotel} style={{ color: "#dabf4f" }} className="px-1" />
                         {elm.description2} (5 <FaStar color="#dabf4f" className="mx-1" />)
                         </p>
                        <p className="tourCard__text mt-5"><FontAwesomeIcon icon={faQuoteRight} style={{ color: "#dabf4f" }} className="px-1" />
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

                      

                      <div className="row x-gap-20 y-gap-5 pt-30">
                        {elm.features?.map((elm2, i2) => (
                          <div key={i2} className="col-auto">
                            <div className="text-14 ">  
                                <FontAwesomeIcon icon={`${elm2.icon}`} />
                              {elm2.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="tourCard__info">
                      <div className="h-60">
                        <div className="d-flex items-center text-14">
                          <i className="icon-clock mr-10"></i>
                          {elm.duration}
                        </div>

                      
                      </div>

                      <button className="button -outline-accent-1 text-accent-1">
                        <Link href="/db-booking/booking-details">
                        VIEW DETAILS
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          <div className="text-center pt-30">
            © Copyright MekkaBooking.com {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
