"use client";

import Pagination from "@/components/common/Pagination";
import Header from "@/components/dasboard/Header";
import { tourDataTwoOne } from "@/data/tours";
import Stars from "@/components/common/Stars";
import { useEffect, useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faHotel, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import Link from "next/link";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "@/app/context/TranslationContext";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "40%",
    right: "auto",
    bottom: "auto",
    marginLeft: "10%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
    width: "100%", 
    maxWidth: "700px", 
    height: "30vh", 
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

export default function DBListing() {
  const [sideBarOpen, setSideBarOpen] = useState(true);


  // for opent rejected pop-up box 

  const [invoice, setinvoice] = useState(false)

  useEffect (() => {
    Modal.setAppElement('#invoice')
  }, []);


  function openInvoice() {
    setinvoice(true);
  }

  function closeInvoice() {
    setinvoice(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Indicate that the component has mounted
      // setMounted(true);

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

  const { translate } = useTranslation();

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
            <h1 className="text-30">  {translate("My Listings") }</h1>

            <div className="row y-gap-30 mt-20">
              {tourDataTwoOne.map((elm, i) => (
                <div className="col-12 mb-15" key={i}>
                  <div className="tourCard -type-2 bg-white">
                    <div className="tourCard__image">
                      <Image
                        width={420}
                        height={390}
                        src={elm.imageSrc}
                        alt="image"
                      />
                      <button className="tourCard__favorite">
                        Direct Flight
                      </button>
                    </div>

                    <div className="tourCard__content">
                      <div className="tourCard__location border_yellow px-2">
                        <FaPersonWalking color="white" size={18} />
                        {elm.location}
                      </div>

                      <h3 className="tourCard__title mt-5">
                        <span>{elm.title}</span>
                      </h3>

                      <p className="tourCard__text mt-5 items-center d-flex">
                        <FontAwesomeIcon
                          icon={faHotel}
                          className="px-1 text-accent-1"
                        />
                        {elm.description} (3{" "}
                        <FaStar color="#dabf4f" className="mx-1" />)
                      </p>
                      <p className="tourCard__text mt-5 items-center d-flex ">
                        <FontAwesomeIcon
                          icon={faHotel}
                          className="px-1 text-accent-1"
                        />
                        {elm.description2} (5{" "}
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
                        <span>Departure : London</span>
                      </div>

                      <div className="row x-gap-20 y-gap-5 pt-30">
                        {elm.features?.map((elm2, i2) => (
                          <div key={i2} className="col-auto">
                            <div className="text-14 ">{elm2.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="tourCard__info tourCard__info_Dash ">
                      <div className="">
                        <button
                          className={
                            elm.vendor_Listning === "Pending"
                              ? "badge-orange"
                              : elm.vendor_Listning === "Approved"
                              ? "badge-green"
                              : elm.vendor_Listning === "Rejected"
                              ? "badge-red"
                              : ""
                          }

                          onClick={openInvoice}
                        >
                          <b>{elm.vendor_Listning}</b>
                        </button>

                        <div className="d-flex items-center text-14 ">
                          <i className="icon-clock mr-10"></i>
                          {elm.duration}
                        </div>

                        <p className="text-cente text-Danger">
                          Available Seats : 5 / 100
                        </p>
                        <p className="text-center">Total : {elm.price} €</p>
                      </div>

                      <label className="badge bg-secondary"></label>

                      <button className="button -sm -outline-accent-1 text-accent-1">
                        <Link href="/vendor/db-edit-tour">EDIT TOUR</Link>
                      </button>
                      <a href="#" className="mt-5 text-center">
                        <span>Duplicate Tour</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Pagination />
            </div>

            <div id="invoice">
              <Modal
                isOpen={invoice}
                onRequestClose={closeInvoice}
                style={customStyles}
                contentLabel="Pending Payment Modal"
              >
                <div className="d-flex justify-content-between" id="modelopen">
                  <h2 className="px-20">Reason for Rejected</h2>
                  <button onClick={closeInvoice}>
                    <IoClose size={25} />
                  </button>
                </div>

                <p className="mx-3">Your cover letter is your chance to show that you are a good match for the job and for the company</p>
              </Modal>
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
