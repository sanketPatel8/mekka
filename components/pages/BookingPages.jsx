"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaLuggageCart } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import "@/public/css/index.css";
import Modal from "react-modal";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
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
    padding: "5px",
    // borderRadius: '10px',
    width: "100%", // Adjust width as needed
    maxWidth: "700px", // Adjust max-width as needed
    height: "90vh", // Set a specific height for the modal
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

export default function BookingPages() {
  const [roomType, setRoomType] = useState("");
  const [bookingStage, setBookingStage] = useState(1);
  const [gender, setGender] = useState("Gender");
  const [Nationality, setNationality] = useState("Nationality");
  const [From, setFrom] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [radioValue, setRadioValue] = useState(""); // Initial state for the radio buttons

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  let subtitle;

  useEffect(() => {
    console.log("Selected room type:", roomType);
  }, [roomType]);

  useEffect(() => {
    Modal.setAppElement("#openSignIn");
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const { translate } = useTranslation();

  return (
    <>
      <section className="layout-pt-md layout-pb-lg mt-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-11 mx-auto px-0">
              <div className="bg-white rounded-12  py-15">
                <button
                  onClick={() => {
                    openModal();
                  }}
                >
                  <a className="text-accent-1 px-1">
                    {" "}
                    {translate("Sign in") }{" "}
                  </a>{" "}
                </button>
                {translate(
                  " Book With Your Saved Details or Continue As a Guest To Book Your Travel."
                ) }
              </div>
              <h2 className="text-30 md:text-24 fw-700 bg-Primary">
                {translate("Steps to reserve") }
              </h2>

              <div className="bg-white rounded-12 md:py-20 px-md-20 mt-10">
                {bookingStage == 1 && (
                  <div className="border-1 rounded-12 overflow-hidden shadow-1">
                    <div className="form_1">
                      <div className="px-50 py-5 yellow_bg">
                        <p>
                          <span>
                            <FaUser />
                          </span>
                          <span>
                            {" "}
                            <b>
                              1.{" "}
                              {translate("Adult information") ||
                                "Find Latest Packages"}
                            </b>
                          </span>
                        </p>
                        <p>
                          <span>
                            <MdError />
                          </span>
                          <span>
                            {" "}
                            {translate(
                              " Is Also The Contact Person For The Reservation."
                            ) }
                          </span>
                        </p>
                      </div>

                      <form className=" y-gap-30 contactForm px-20 py-20 ">
                        <div className="my-3 row">
                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                              {translate("Name") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Surname") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Email") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Phone") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("City") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={gender}
                                onChange={(e) => {
                                  setGender(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Select Gender</option> */}
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {gender}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="date" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Birthday Date") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={Nationality}
                                onChange={(e) => {
                                  setNationality(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Nationality</option> */}
                                <option value="indian">Indian</option>
                                <option value="german">German</option>
                                <option value="canadian">Canadian</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {Nationality}
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("House No") }
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("ZIP Code") }
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Street") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={From}
                                onChange={(e) => {
                                  setFrom(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                <option value="">{translate("City") }</option>
                                <option value="Frankfurt(FRA)">
                                  Frankfurt(FRA)
                                </option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {From}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row y-gap-20 items-center justify-between ">
                            <div className="col-12 tb-border">
                              <div className="text-14 ">
                                <p className="d-flex justify-content-between">
                                  <span>{translate("Tour Price Per Person") }</span>{" "}
                                  <span>1.339,00 €</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 border_b px-md-40">
                          <h5 className="text-18 fw-500 my-2">
                            {translate("Possible Additional Services Per Person") }:
                          </h5>

                          <div>
                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-1-4bad"
                                      checked={radioValue === "ad-1-4bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      4 Bettzimmer (Standard)
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">0,00 €</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-1-3bad"
                                      checked={radioValue === "ad-1-3bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      3 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+100,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-1-2bad"
                                      checked={radioValue === "ad-1-2bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      2 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+230,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-1-1bad"
                                      checked={radioValue === "ad-1-1bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      1 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+450,00€</div>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <p className="text-right text-20">
                            {translate("Subtotal") }{" "}
                            <span className="text-accent-1">
                              <b>1.789,00 €</b>
                            </span>
                          </p>
                          <p className="text-right text-15">
                            {translate("Including Taxes And Fee") }
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="form_2">
                      <div className="px-50 py-5 yellow_bg">
                        <p>
                          <span>
                            <FaUser />
                          </span>
                          <span>
                            {" "}
                            <b>2 . Adult Information</b>
                          </span>
                        </p>
                      </div>
                      <div className=" y-gap-30 contactForm px-20 py-20 ">
                        <div className="row my-3">
                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                              {translate("Name") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Surname") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={gender}
                                onChange={(e) => {
                                  setGender(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Select Gender</option> */}
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {gender}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="date" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Birthday Date") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={Nationality}
                                onChange={(e) => {
                                  setNationality(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Nationality</option> */}
                                <option value="indian">Indian</option>
                                <option value="german">German</option>
                                <option value="canadian">Canadian</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {Nationality}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row y-gap-20 items-center justify-between">
                            <div className="col-12 tb-border">
                              <div className="text-14">
                                <p className="d-flex justify-content-between">
                                  <span>{translate("Tour Price Per Person") }</span>{" "}
                                  <span>1.339,00 €</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 border_b px-md-40">
                          <h5 className="text-18 fw-500 my-2">
                            {translate("Possible Additional Services Per Person") }:
                          </h5>

                          <div>
                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="adu-2-4bad"
                                      checked={radioValue === "adu-2-4bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      4 Bettzimmer (Standard)
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">0,00 €</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="adu-2-3bad"
                                      checked={radioValue === "adu-2-3bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      3 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+100,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="adu-2-2bad"
                                      checked={radioValue === "adu-2-2bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      2 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+230,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-2-1bad"
                                      checked={radioValue === "ad-2-1bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      1 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+450,00€</div>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <p className="text-right text-20">
                            {translate("Subtotal") }{" "}
                            <span className="text-accent-1">
                              <b>1.789,00 €</b>
                            </span>
                          </p>
                          <p className="text-right text-15">
                            {translate("Including Taxes And Fee") }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="form_3">
                      <div className="px-50 py-5 yellow_bg">
                        <p>
                          <span>
                            <FaUser />
                          </span>
                          <span>
                            {" "}
                            <b>3 . Adult Information</b>
                          </span>
                        </p>
                      </div>
                      <div className=" y-gap-30 contactForm px-20 py-20">
                        <div className="row my-3">
                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Name
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Surname") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={gender}
                                onChange={(e) => {
                                  setGender(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Select Gender</option> */}
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {gender}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="date" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Birthday Date") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={Nationality}
                                onChange={(e) => {
                                  setNationality(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Nationality</option> */}
                                <option value="indian">Indian</option>
                                <option value="german">German</option>
                                <option value="canadian">Canadian</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {Nationality}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row y-gap-20 items-center justify-between">
                            <div className="col-12 tb-border">
                              <div className="text-14 ">
                                <p className="d-flex justify-content-between">
                                  <span>{translate("Tour Price Per Person") }</span>{" "}
                                  <span>1.339,00 €</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 border_b px-md-40">
                          <h5 className="text-18 fw-500 my-2">
                            {translate("Possible Additional Services Per Person") }:
                          </h5>

                          <div>
                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-3-4bad"
                                      checked={radioValue === "ad-3-4bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      4 Bettzimmer (Standard)
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">0,00 €</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-3-3bad"
                                      checked={radioValue === "ad-3-3bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      3 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+100,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-3-2bad"
                                      checked={radioValue === "ad-3-2bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      2 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+230,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="ad-3-1bad"
                                      checked={radioValue === "ad-3-1bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      1 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+450,00€</div>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <p className="text-right text-20">
                            {translate("Subtotal") }{" "}
                            <span className="text-accent-1">
                              <b>1.789,00 €</b>
                            </span>
                          </p>
                          <p className="text-right text-15">
                            {translate("Including Taxes And Fee") }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="form_4">
                      <div className="px-50 py-5 yellow_bg">
                        <p>
                          <span>
                            <FaUser />
                          </span>
                          <span>
                            {" "}
                            <b>1 . Child Information</b>
                          </span>
                        </p>
                      </div>
                      <form className=" y-gap-30 contactForm px-20 py-20 ">
                        <div className="row my-3">
                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Name
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Surname") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={gender}
                                onChange={(e) => {
                                  setGender(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Select Gender</option> */}
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {gender}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="date" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Birthday Date") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={Nationality}
                                onChange={(e) => {
                                  setNationality(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Nationality</option> */}
                                <option value="indian">Indian</option>
                                <option value="german">German</option>
                                <option value="canadian">Canadian</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {Nationality}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 ">
                          <div className="row y-gap-20 items-center justify-between">
                            <div className="col-12 tb-border">
                              <div className="text-14 ">
                                <p className="d-flex justify-content-between">
                                  <span>Tour Price Per Child</span>{" "}
                                  <span>1.339,00 €</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 border_b px-md-40">
                          <h5 className="text-18 fw-500 my-2">
                            {translate("Possible Additional Services Per Person") }:
                          </h5>

                          <div>
                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="Child-1-4bad"
                                      checked={radioValue === "Child-1-4bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      4 Bettzimmer (Standard)
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">0,00 €</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="Child-1-3bad"
                                      checked={radioValue === "Child-1-3bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      3 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+100,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="Child-1-2bad"
                                      checked={radioValue === "Child-1-2bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      2 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+230,00€</div>
                            </div>

                            <div className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio  d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="Child-1-1bad"
                                      checked={radioValue === "Child-1-1bad"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">
                                      1 Bettzimmer
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+450,00€</div>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <p className="text-right text-20">
                            {translate("Subtotal") }{" "}
                            <span className="text-accent-1">
                              <b>1.789,00 €</b>
                            </span>
                          </p>
                          <p className="text-right text-15">
                            {translate("Including Taxes And Fee") }
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="form_5">
                      <div className="px-50 py-5 yellow_bg">
                        <p>
                          <span>
                            <FaUser />
                          </span>
                          <span>
                            {" "}
                            <b>1 . Baby Information</b>
                          </span>
                        </p>
                      </div>
                      <form className="y-gap-30 contactForm px-20 py-20">
                        <div className="row my-3">
                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Name
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Surname") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={gender}
                                onChange={(e) => {
                                  setGender(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Select Gender</option> */}
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {gender}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input type="date" required />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Birthday Date") }
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <select
                                value={Nationality}
                                onChange={(e) => {
                                  setNationality(e.target.value);
                                }}
                                required
                                className="form-control"
                              >
                                {/* <option value="" disabled>Nationality</option> */}
                                <option value="indian">Indian</option>
                                <option value="german">German</option>
                                <option value="canadian">Canadian</option>
                              </select>
                              <label className="lh-1 text-16 text-light-1">
                                {Nationality}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="row y-gap-20 items-center justify-between">
                            <div className="col-12 tb-border">
                              <div className="">
                                <p className="text-right text-20">
                                  {translate("Subtotal") }{" "}
                                  <span className="text-accent-1">
                                    <b>1.789,00 €</b>
                                  </span>
                                </p>
                                <p className="text-right text-15">
                                  {translate("Including Taxes And Fee") }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="">
                <div className="bg-white border-1 rounded-12 shadow-2 py-20 px-20 md:py-20 md:px-20 tourSingleSidebar">
                  <h2 className="text-20 fw-500">Reservation Details</h2>

                  <div className="d-flex mt-30">
                    <Image
                      width={90}
                      height={84}
                      src="/img/tourCards/1/13.jpeg"
                      alt="image"
                    />
                    <div className="ml-20">Umrah - SOMMER</div>
                  </div>

                  <div className="line mt-10 mb-2"></div>

                  <div className="px-1">
                    <div className="d-flex items-center justify-content-space-arround ">
                      <div className="mr-5">
                        <FaTelegramPlane size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        d Airline: Royal Jordanian, Egyptair
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">From: Frankfurt (FRA)</div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand htTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">To: Medina</div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Departure : 26.06.2024 18:00
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightLand size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Return : 05.07.2024 23:00
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <TbWorld size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Offered Languages: German, Arabic
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaLuggageCart size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        Max Luggage Per Person: 30 kg
                      </div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">Mekka - (Hotel Name)</div>
                    </div>

                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <FaHotel size={20} color="#DAC04F" />
                      </div>
                      <div className="text-start">Madina - (Hotel Name)</div>
                    </div>

                    <p className="text-12">
                      (The Standard Offer May Include a Multi-Bed Room.)
                    </p>
                  </div>

                  <div className="line mt-10 mb-10"></div>

                  <div className="">
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">{translate("Subtotal") }</div>
                      <div className=""> 182 € </div>
                    </div>

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">Tax</div>
                      <div className=""> 23 € </div>
                    </div>

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">Amount Due</div>
                      <div className=""> 43,242 € </div>
                    </div>
                  </div>
                  <hr />
                  <div className="bg-white rounded-12 shadow-2 py-0 px-0 md:py-10 md:px-20 mt-10 ">
                    <h2 className="text-20 fw-500 ">
                      Do you have a promo code?
                    </h2>

                    <form className="contactForm mt-10">
                      <div className="form-input my-1">
                        <input type="text" required />
                        <label className="lh-2 text-16 text-light-1 top-29">
                          Promo Code
                        </label>
                      </div>
                    </form>
                  </div>

                  <div className="mt-2">
                    <Link href="/payment">
                      <button
                        className={`button -md -info-2 bg-accent-1 text-white col-12 text-end} `}
                      >
                        Proceed to Payment
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="openSignIn">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <section className="">
            <div className="d-flex justify-content-between my-1 px-2" id="">
              <h2 className=""></h2>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="contactForm border-1  rounded-12 px-40 py-1 "
            >
              <div className="d-flex justify-content-between">
                <h2 className="text-center">LOG IN</h2>
                <button onClick={closeModal}>
                  <IoClose size={25} />
                </button>
              </div>
              <div className="form-input my-1">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">
                  {translate("Email") } 
                </label>
              </div>

              <div className="form-input my-1">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <div className="row y-ga-10 justify-between items-center pt-10 spacing">
                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="form-checkbox ">
                      <input type="checkbox" name="name" />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="lh-11 ml-10">Remember me</div>
                  </div>
                </div>

                <div className="col-auto">
                  <a href="#">Lost your password?</a>
                </div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <Link href="/customer/db-booking">
                    <button
                      type="submit"
                      className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                    >
                      Customer Log In
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <button
                    type="submit"
                    className="button -md -outline-blue-1 text-blue-1 col-12"
                  >
                    <FaFacebookF size={15} className="mx-1" />
                    Facebook
                  </button>
                </div>

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    <FaGoogle size={15} className="mx-1" />
                    Google
                  </button>
                </div>
              </div>
              <br />
              <div className="row y-gap-15">
                <div className="col">
                  <button className="button -md -outline-dark-1 text-dark-1 col-12">
                    <FaApple size={15} className="mx-1" />
                    Sign in With Apple
                  </button>
                </div>
              </div>
            </form>
          </section>
        </Modal>
      </div>
    </>
  );
}
