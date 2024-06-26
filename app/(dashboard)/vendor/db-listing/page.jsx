"use client";

import Pagination from "@/components/common/Pagination";
import Header from "@/components/dasboard/Header";
import {tourDataTwoOne } from "@/data/tours";
import Stars from "@/components/common/Stars";
import { useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faHotel, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import Link from "next/link";

export default function DBListing() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30">My Listings</h1>
            <p className="">Lorem ipsum dolor sit amet, consectetur.</p>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:pb-20 mt-60 md:mt-30">

            <div className="row y-gap-30 pt-30">
              {tourDataTwoOne.map((elm, i) => (
                <div className="col-12 my-2 " key={i}>

                  <div className="tourCard -type-2 bg-white">
                    <div className="tourCard__image">
                      <Image
                        width={420}
                        height={390}
                        src={elm.imageSrc}
                        alt="image"
                      />
                      <button className="tourCard__favorite"  >Direct Flight</button>
                    </div>

                    

                    <div className="tourCard__content">
                      <div className="tourCard__location border_yellow px-2">
                        <FaPersonWalking  color="#dabf4f" size={18} />
                        {elm.location}
                      </div>

                      <h3 className="tourCard__title mt-5">
                        <span>{elm.title}</span>
                      </h3>

                      <p className="tourCard__text mt-5 items-center d-flex"><FontAwesomeIcon icon={faHotel} className="px-1 text-accent-1"/>
                       {elm.description} (3 <FaStar color="#dabf4f" className="mx-1" />)
                      </p>
                        <p className="tourCard__text mt-5 items-center d-flex "><FontAwesomeIcon icon={faHotel}  className="px-1 text-accent-1" />
                         {elm.description2} (5 <FaStar color="#dabf4f" className="mx-1 text-accent-1" />)
                         </p>
                        <p className="tourCard__text mt-5"><FontAwesomeIcon icon={faQuoteRight}  className="px-1 text-accent-1" />
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
                            <div className="text-14 ">  
                              {elm2.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="tourCard__info tourCard__info_Dash ">
                      <div className="m-auto">
                      <label className={elm.arriving === 'Upcoming'? 'text-orange' : elm.arriving === 'Completed'? 'text-green' : '' }><b>{elm.arriving}</b></label>
                      <div className="d-flex items-center text-14 ">
                          <i className="icon-clock mr-10"></i>
                          {elm.duration}
                      </div>
                     
                       {/* <p className="text-center">Order : #09889</p> */}
                        <p className="text-center">Total : {elm.price} €</p>
                        {/* <p className="text-center">{elm.pending}</p> */}
             
                        
                      </div>

                      
                        
                        <label className="badge bg-secondary"></label>

                      <button className="button -sm -outline-accent-1 text-accent-1">
                        <Link href="/vendor/db-edit-tour">
                        EDIT TOUR
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

              <div className="mt-4">
                  <Pagination />
              </div>

            </div>

            <div className="text-center pt-30">
              © Copyright MekkaBooking.com {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
