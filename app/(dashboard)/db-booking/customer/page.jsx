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

          {/* <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:mb-20 mt-60">
            <div className="tabs -underline-2 js-tabs">
              <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                {tabs.map((elm, i) => (
                  <div
                    key={i}
                    className="col-auto"
                    onClick={() => setcurrentTab(elm)}
                  >
                    <button
                      className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                        elm == currentTab ? "is-tab-el-active" : ""
                      }`}
                    >
                      {elm}
                    </button>
                  </div>
                ))}
              </div>

              <div className="tabs__content js-tabs-content">
                <div className="tabs__pane -tab-item-1 is-tab-el-active">
                  <div className="overflowAuto">
                    <table className="tableTest mb-30">
                      <thead className="bg-light-1 rounded-12">
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Start date</th>
                          <th>End date</th>
                          <th>Details</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookingData
                          .filter((elm) => elm.status == currentTab)
                          .map((elm, i) => (
                            <tr key={i}>
                              <td>{elm.orderNumber}</td>

                              <td className="min-w-300">
                                <div className="d-flex items-center">
                                  <Image
                                    width={70}
                                    height={65}
                                    src={elm.imageUrl}
                                    alt="image"
                                  />
                                  <div className="ml-20">{elm.title}</div>
                                </div>
                              </td>

                              <td>{elm.startDate}</td>

                              <td>{elm.endDate}</td>

                              <td>{elm.numberOfPeople}</td>

                              <td>{elm.cost}</td>

                              <td>
                                <div
                                  className={`circle ${
                                    elm.status == "Approved"
                                      ? "text-purple-1"
                                      : elm.status == "Pending"
                                      ? "text-yellow-1"
                                      : "text-red-2"
                                  } `}
                                >
                                  {elm.status}
                                </div>
                              </td>

                              <td>
                                <div className="d-flex items-center">
                                  <button className="button -dark-1 size-35 bg-light-1 rounded-full flex-center">
                                    <i className="icon-pencil text-14"></i>
                                  </button>

                                  <button className="button -dark-1 size-35 bg-light-1 rounded-full flex-center ml-10">
                                    <i className="icon-delete text-14"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <Pagination />

                  <div className="text-14 text-center mt-20">
                    Showing results 1-30 of 1,415
                  </div>
                </div>
              </div>
            </div>
          </div> */}

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

                      {/* {elm.badgeText && (
                        <div className="tourCard__badge">
                          <div className="bg-accent-1 rounded-12 text-white lh-11 text-13 px-15 py-10">
                            {elm.badgeText}
                          </div>
                        </div>
                      )} */}

                      {/* {elm.featured && (
                        <div className="tourCard__badge">
                          <div className="bg-accent-2 rounded-12 text-white lh-11 text-13 px-15 py-10">
                            FEATURED
                          </div>
                        </div>
                      )} */}

                      {/* <div className="tourCard__favorite">
                        <button className="button -accent-1 size-35 bg-white rounded-full flex-center">
                          <i className="icon-heart text-15"></i>
                        </button>
                      </div> */}
                    </div>

                    <div className="tourCard__content">
                      <div className="tourCard__location">
                        {/* <i className="icon-pin"></i> */}
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
                            <div className="text-14 ">  {/*color `${elm2.icon} mr-10`*/ }
                              {/* <i className={`${elm2.icon} mr-10`}></i> */}
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

                        <div className="tourCard__price">
                          <div>{elm.price} €</div>

                          <div className="d-flex items-center justify-content-center">
                            
                            <p className="text-20 fw-500 ml-5 text-center">
                            {elm.fromPrice} €  
                            </p>
                            
                          </div>
                          <p>including taxes and fee</p>
                        </div>
                      </div>

                      <button className="button -outline-accent-1 text-accent-1">
                        <Link href={`/tour-single-4/${elm.id}`}>
                        SHOW AVAILABILITY
                          {/* <i className="icon-arrow-top-right ml-10"></i> */}
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          <div className="text-center pt-30">
            © Copyright Viatours {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
