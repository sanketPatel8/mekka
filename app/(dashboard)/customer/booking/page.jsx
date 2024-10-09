"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/dasboard/Header";
import Image from "next/image";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";
import { tourDataTwoOne } from "@/data/tours";
import { FaPersonWalking } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faHotel, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Stars from "@/components/common/Stars";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";
import { POST } from "@/app/utils/api/post";
import { ClipLoader } from "react-spinners";
import { PiBuildingApartmentFill } from "react-icons/pi";

const tabs = ["Approved", "Pending", "Cancelled"];

export default function DbBooking() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [UserID, setUserID] = useState(null);
  const [BookingsCustomer, setBookingsCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListing = async (id) => {
    const formData = new FormData();

    formData.append("user_id", id);

    try {
      setIsLoading(true);
      const response = await POST.request({
        form: formData,
        url: "my_bookings",
      });
      setIsLoading(false);
      setBookingsCustomer(response?.Bookings);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("First Time Data Load ");

    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("customer");

      if (userData && userData !== "undefined") {
        try {
          const userid = JSON.parse(userData);

          if (userid && userid.user) {
            setUserID(userid.user);
          }
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }

    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth >= 1000) {
          setSideBarOpen(true);
        } else {
          setSideBarOpen(false);
        }
      };

      // Set the initial state based on the screen size
      handleResize();

      // Add event listener to update state on resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (UserID !== null) fetchListing(UserID?.id);
  }, [UserID]);

  console.log("UserID", UserID);

  console.log("BookingsCustomer", BookingsCustomer);

  useEffect(() => {
    if (BookingsCustomer && BookingsCustomer.length === 0) {
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [BookingsCustomer]);

  const { translate } = useTranslation();

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
          <h1 className="text-30">{translate("My Booking")}</h1>

          <div className="row mt-20">
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <ClipLoader color="#DAC04F" size={50} />
              </div>
            ) : BookingsCustomer && BookingsCustomer.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center">
                <p>
                  {translate('No bookings available')}{" "}
                  <Link href="/tour" className="text-blue">
                    <b>
                      <i>{translate('Click here')}</i>
                    </b>
                  </Link>{" "}
                  {translate('to book your first tour')}.
                </p>
              </div>
            ) : (
              BookingsCustomer?.map((elm, i) => (
                <div className="col-12 mb-15 " key={i}>
                  <div className="tourCard -type-2 bg-white">
                    <div className="tourCard__image">
                      <Image
                        width={420}
                        height={390}
                        src={elm?.tour_details?.tour_image}
                        alt="image"
                      />
                      <button
                        className={`tourCard__favorite ${
                          elm?.tour_details?.flight_included == "0"
                            ? "d-none"
                            : "d-block"
                        }`}
                      >
                        {translate('Direct Flight')}
                      </button>
                    </div>

                    <div className="tourCard__content">
                      {/* <div className="tourCard__location border_yellow px-2">
                        <FaPersonWalking color="white" size={18} />
                        Zu Kaaba {elm?.tour_details?.distance_to_hotel}
                      </div> */}

                      <h3 className="tourCard__title mt-5">
                        <span>
                          {elm?.tour_details?.type} - {elm?.tour_details?.name}
                        </span>
                      </h3>

                      <p className="tourCard__text mt-5 items-center d-flex">
                        <FontAwesomeIcon
                          icon={faHotel}
                          className="px-1 text-accent-1"
                        />
                        {elm?.mekkahotel?.hotel_name} (
                        {elm?.mekkahotel?.hotel_stars}{" "}
                        <FaStar color="#dabf4f" className="mx-1" />)
                      </p>
                      <p className="tourCard__text mt-5 items-center d-flex ">
                        <FontAwesomeIcon
                          icon={faHotel}
                          className="px-1 text-accent-1"
                        />
                        {elm?.madinahotel?.hotel_name} (5{" "}
                        <FaStar
                          color="#dabf4f"
                          className="mx-1 text-accent-1"
                        />
                        )
                      </p>
                      <p className="tourCard__text mt-5">
                        <FontAwesomeIcon
                          icon={faQuoteRight}
                          className="px-1 text-accent-1"
                        />
                        {elm?.tour_details?.type}
                      </p>

                      {elm?.tour_details?.company_code !== null || elm?.tour_details?.company_code !== " " && (
                        <div className="d-flex items-center mt-5">
                          <div className="d-flex items-center x-gap-5">
                            {/* <Stars
                            star={elm?.tour_details?.rating_count}
                            font={12}
                          /> */}
                            <PiBuildingApartmentFill
                              color="#dabf4f"
                              className=""
                              size={25}
                            />
                          </div>

                          <div className="text-14 ml-10">
                            {elm?.tour_details?.company_code}
                          </div>
                        </div>
                      )}

                      <div className="Location">
                        <span>{translate('Departure')} : {elm?.tour_details?.departures}</span>
                      </div>

                      <div className="row x-gap-20 y-gap-5 pt-30">
                        <div className="text-14 ">
                          {elm?.tour_details?.date_begin} -{" "}
                          {elm?.tour_details?.date_end}
                        </div>
                      </div>
                    </div>

                    <div className="tourCard__info tourCard__info_Dash ">
                      <div className="">
                        <label
                          className={
                            elm.arriving === "Upcoming"
                              ? "text-orange"
                              : elm.arriving === "Completed"
                              ? "text-green"
                              : ""
                          }
                        >
                          <b>{elm.arriving}</b>
                        </label>
                        <div className="d-flex items-center text-14 ">
                          <i className="icon-clock mr-10"></i>
                          {elm?.tour_details?.days_of_stay}
                        </div>

                        <p className="text-center">
                          {translate('Booking No')} : {elm.reservationNumber}
                        </p>
                        <p className="text-center">
                          {translate("Total")} : {elm?.total} €
                        </p>
                        <p className="text-center">{translate('Due')} : {elm.due_payment} € </p>
                      </div>
 
                      <label className="badge bg-secondary"></label>

                      <button className="button -sm -outline-accent-1 text-accent-1">
                        <Link
                          href={`/customer/booking-details/?id=${elm.id}&customerID=${UserID?.id}&TourID=${elm.tourId}`}
                        >
                          {translate("VIEW DETAILS")}
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center pt-30">
            © Copyright MekkaBooking.com {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
