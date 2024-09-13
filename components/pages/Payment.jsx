"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaLuggageCart } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { FaHotel } from "react-icons/fa6";
import "@/public/css/index.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";

export default function Payment() {
  const router = useRouter();

  const [roomType, setRoomType] = useState("");
  const [bookingStage, setBookingStage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("adPay");
  const [installmentChecked, setInstallmentChecked] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(0);
  const [SideBarData, setSideBarData] = useState({});
  const [Booking, setBooking] = useState();
  const [ReservationID, setReservationID] = useState("");
  const [todayDate, setTodayDate] = useState('');

  const handleCheckboxChange = (index) => {
    console.log("index", index);

    setSelectedCheckbox(index);
    if (index === 2) {
      setInstallmentChecked(true);
    } else {
      setInstallmentChecked(false);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    console.log("Selected room type:", roomType);
  }, [roomType]);

  useEffect(() => {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getDate().toString().padStart(2, '0')}`;

    
    setTodayDate(formattedDate);

    if (typeof window !== "undefined") {
      const sidebardata = localStorage.getItem("PackageBookingData");

      if (sidebardata && sidebardata !== "undefined") {
        try {
          const asSidebarrData = JSON.parse(sidebardata);

          setSideBarData(asSidebarrData);
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }

      const GetBookingData = localStorage.getItem("BookingData");

      if (GetBookingData && GetBookingData !== "undefined") {
        try {
          const PrevBooking = JSON.parse(GetBookingData);
          setBooking(PrevBooking);
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
  }, []);

  console.log("Booking", Booking);

  const FatchallBooking = async (data) => {
    try {
      const response = await post("addbooking", data);
      console.log("response", response);

      showSuccessToast(response.Message);
      
      setReservationID(response.Reservations_id);
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast(error?.data?.message);
    }
  };

  const handlePayment = () => {
    if (selectedCheckbox === 0) {
      FatchallBooking(Booking);
      setTimeout(() => {
        router.push("#ref");
        setBookingStage((pre) => pre + 1);
      }, 3000);
    }
  };

  console.log("selectedCheckbox", selectedCheckbox);

  const { translate } = useTranslation();

  return (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 px-0 col-11 mx-auto">
            <h2
              className={`text-30 md:text-24 fw-700 bg-Primary ${
                bookingStage === 2 ? "d-none" : "d-block"
              }`}
            >
              {translate("Payment Methods")}
            </h2>

            <div className="bg-white rounded py-30">
              {bookingStage === 1 && (
                <div>
                  <div
                    className="border-1 rounded-12 shadow-1 overflow-hidden"
                    id="ref"
                  >
                    <p className="text-center py-3 bg-color-accent-1 bg-accent-1">
                      <b> {translate("Payment Methods")}</b>
                    </p>
                    <div className="px-3">
                      <div className="d-flex items-center pointer-check py-3">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            id="item2"
                            name="item2"
                            checked={selectedCheckbox === 0}
                            onChange={() => handleCheckboxChange(0)}
                          />
                          <label
                            htmlFor="item2"
                            className="form-checkbox__mark"
                          >
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
                          </label>
                        </div>
                        <label htmlFor="item2" className="lh-16 ml-15">
                          {translate(
                            "Payment in advance. Payment installment is possible."
                          )}
                        </label>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-12">
                          <div
                            className={`p-2 ${
                              selectedOption === "adPay"
                                ? "bg_dark"
                                : "bg_dark_1"
                            }`}
                          >
                            <p>
                              <span>
                                <b>Kontoinhaber:</b>
                              </span>
                              Mekka Booking GmbH
                            </p>
                            <p>
                              <span>
                                <b>IBAN:</b>
                              </span>
                              DE71 5125 0000 0002 2282 11
                            </p>
                            <p>
                              <span>
                                <b>BIC:</b>
                              </span>
                              HELADEF1TSK
                            </p>
                            <p>
                              <span>
                                <b>Bank:</b>
                              </span>
                              Taunus Sparkasse
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-12 my-md-0 my-3">
                          <div className="p-2 border-5 d-inline-block">
                            <p className="py-2">
                              {translate(
                                "You will get an order number after you completed the reservation. The Order number you will need to enter in the “Purpose Code” when you make the payment via bank. You will also get email with all the detail as well."
                              )}
                            </p>
                            <p className="text-red">
                              {translate(
                                "Note: Please make the payment within next 7 days. Post that the order will be cancelled."
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex items-center justify-between py-3">
                        <div className="row ">
                          <div className="col-12">
                            <div className="d-flex items-center pointer-check">
                              <div className="form-checkbox">
                                <input
                                  type="checkbox"
                                  id="item4"
                                  name="item4"
                                  checked={selectedCheckbox === 1}
                                  onChange={() => handleCheckboxChange(1)}
                                />
                                <label
                                  htmlFor="item4"
                                  className="form-checkbox__mark"
                                >
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
                                </label>
                              </div>
                              <label htmlFor="item4" className="lh-16 ml-15">
                                {translate(
                                  "Online Payment (Visa, Mastercard, American Express, Japan Credit Bureau (JCB), Discover)"
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex items-center pointer-check py-3">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            id="installment"
                            name="installment"
                            checked={selectedCheckbox === 2}
                            onChange={() => handleCheckboxChange(2)}
                          />
                          <label
                            htmlFor="installment"
                            className="form-checkbox__mark"
                          >
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
                          </label>
                        </div>
                        <label htmlFor="installment" className="lh-16 ml-15">
                          {translate("Click for Installment Payment")}
                        </label>
                      </div>

                      {installmentChecked && (
                        <div className="y-gap-30 contactForm px-20 py-10">
                          <div className="col-md-12">
                            <h5 className="text-center">
                              Total Amount : <b>2,55.50 €</b>
                            </h5>
                          </div>

                          <div className="row my-3">
                            <div className="col-md-6">
                              <div className="form-input spacing">
                                <input
                                  type="text"
                                  required
                                  placeholder="1st Amount"
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  1st Amount
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-input spacing">
                                <input
                                  type="date"
                                  required
                                  placeholder="1st Date"
                                  onChange={handleDateChange}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  1st Date
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-input spacing">
                                <input
                                  type="text"
                                  required
                                  placeholder="2nd Amount"
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  2nd Amount
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-input spacing">
                                <input
                                  type="date"
                                  required
                                  placeholder="2nd Date"
                                  onChange={handleDateChange}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  2nd Date
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-input spacing">
                                <input
                                  type="text"
                                  required
                                  placeholder="3rd Amount"
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  3rd Amount
                                </label>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-input spacing">
                                <input
                                  type="date"
                                  required
                                  placeholder="3rd Date"
                                  onChange={handleDateChange}
                                />
                                <label className="lh-1 text-16 text-light-1">
                                  3rd Date
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="d-flex items-center pointer-check py-3">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            id="item5"
                            name="data protection and accept"
                          />
                          <label
                            htmlFor="item5"
                            className="form-checkbox__mark"
                          >
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
                          </label>
                        </div>
                        <label htmlFor="item5" className="lh-16 ml-15">
                          {translate(
                            "Yes, I declare my consent to the data protection and accept the Declaration of Consent of mekkabooking GmbH"
                          )}
                        </label>
                      </div>

                      <div className="d-flex items-center pointer-check py-3">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            id="agbAcceptance"
                            name="agbAcceptance"
                          />
                          <label
                            htmlFor="agbAcceptance"
                            className="form-checkbox__mark"
                          >
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
                          </label>
                        </div>
                        <label htmlFor="agbAcceptance" className="lh-16 ml-15">
                          {translate(
                            "I have read the AGB (mekkabooking) and I accept the conditions. This trip is operated by the IDEALGATE."
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    className="border-1 rounded-12 shadow-1 overflow-hidden mt-20"
                    id="ref"
                  >
                    <p className="text-center py-3 bg-color-accent-1 bg-accent-1">
                      <b> {translate("Cancellation Rules")}</b>
                    </p>
                    <div className="px-3">
                      <ul className="">
                        <li className="text-center py-1">
                          {translate(
                            "15% if canceled before 90 days of the trip"
                          )}
                        </li>
                        <li className="text-center py-1">
                          {translate(
                            "60% if canceled before 30 days of the trip"
                          )}
                        </li>
                        <li className="text-center py-1">
                          {translate(
                            "100% if canceled before 7 days of the trip"
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {bookingStage === 2 && (
                <div className="row">
                  <div className="px-lg-0 col-lg-8 col-11 px-0 mx-auto ">
                    <div className="d-flex flex-column items-center text-center">
                      <div className="size-80 rounded-full flex-center bg-accent-1 text-white">
                        <i className="icon-check text-26"></i>
                      </div>

                      <h2 className="text-30 md:text-24 fw-700 mt-20">
                        {translate("Your order was submitted successfully!")}
                      </h2>
                      <div className="mt-10">
                        {translate(
                          " Booking details have been sent to: mekkabooking.com"
                        )}
                      </div>
                    </div>

                    <div className="border-dashed-1 py-30 px-50 rounded-12 mt-30">
                      <div className="row y-gap-15">
                        <div className="col-md-3 col-6">
                          <div>Order Number</div>
                          <div className="text-accent-2">{ReservationID}</div>
                        </div>

                        <div className="col-md-3 col-6">
                          <div>Date</div>
                          <div className="text-accent-2">{todayDate}</div>
                        </div>

                        <div className="col-md-3 col-6">
                          <div>Total</div>
                          <div className="text-accent-2">{SideBarData.BookingFild?.Amount_Paid} €</div>
                        </div>

                        <div className="col-md-3 col-6">
                          <div>Payment Method</div>
                          <div className="text-accent-2">
                            Direct Bank Transfer
                          </div>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-30 md:text-24 fw-700 mt-60 md:mt-30">
                      Order Details
                    </h2>

                    <div className="d-flex item-center justify-between y-gap-5 pt-30">
                      <div className="text-18 fw-500">
                        Westminster Walking Tour & Westminster Abbey Entry
                      </div>
                      <div className="text-18 fw-500"> 182 € </div>
                    </div>

                    <div className="mt-25">
                      <div className="d-flex items-center justify-between">
                        <div className="fw-500">Date:</div>
                        <div className="">06.04.2023</div>
                      </div>

                      <div className="d-flex items-center justify-between">
                        <div className="fw-500">Time:</div>
                        <div className="">10:00 am</div>
                      </div>

                      <div className="d-flex items-center justify-between">
                        <div className="fw-500">Duration:</div>
                        <div className="">12 Days</div>
                      </div>

                      <div className=" items-center justify-between row">
                        <div className="fw-500 col-lg-3 col-11 ">Tickets:</div>
                        <div className="col-lg-9 text-right col-11 ">
                          Adult x2 = 98 € - Youth x3 = 383 € - Children x6 = 394
                          €
                        </div>
                      </div>
                    </div>

                    <div className="line mt-30 mb-30"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="">
              <div className="bg-white rounded-12 border-1 shadow-2 py-20 px-20 md:py-20 md:px-20">
                <h2 className="text-20 fw-500">
                  {" "}
                  {translate("Reservation Details")}
                </h2>

                <div className="d-flex mt-30">
                  <Image
                    width={90}
                    height={84}
                    src="/img/tourCards/1/13.jpeg"
                    alt="image"
                  />
                  <div className="ml-20">Umrah - SOMMER</div>
                </div>

                <div className="line mt-20 mb-2"></div>

                <div className="px-1">
                  <div className="d-flex items-center justify-content-space-arround ">
                    <div className="mr-5">
                      <FaTelegramPlane size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {translate("Airline")} : {SideBarData?.Airline?.name}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <MdFlightLand htTakeoff size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {" "}
                      {translate("Arrival")} : {SideBarData.Arrival}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <MdFlightTakeoff size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {translate("Departure")} : {SideBarData?.Departure?.[1]}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <MdFlightLand size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {" "}
                      {translate("Return")} : {SideBarData.Return}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <TbWorld size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {translate("Offered Languages")} :{" "}
                      {SideBarData.OfferedLanguages} 
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <FaLuggageCart size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {translate("Max Luggage Per Person")} :{" "}
                      {SideBarData.MaxLuggagePerPerson}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <FaHotel size={20} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {" "}
                      {translate("Makka")} - {SideBarData.MakkaHotel?.hotel_name} 
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <FaHotel size={20} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {" "}
                      {translate("Madina")} - {SideBarData.MadinaHotel?.hotel_name} 
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <p className="my-1 fs-6 my-2">
                    (The Standard Offer May Include a Multi-Bed Room.)
                  </p>

                  <p>
                    <b>Selected Additional Services Per Person:</b>
                  </p>
                  <div className="line my-2"></div>

                  {SideBarData?.additionService?.map((e) => (
                    <div key={e.id} className="row">
                      <p className="col-lg-1 col-1">
                        <IoIosBed color="#dabf4f" size={20} />
                      </p>
                      <p className="col-lg-5 col-5">{e.id}</p>
                      {/* <p className="col-lg-4 col-3">+0,00 € x1</p> */}
                      <p className="col-lg-2 col-2">{e.order}</p>
                    </div>
                  ))}
                </div>

                <div className="line mt-10 mb-10"></div>

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500"> {translate("Subtotal")}</div>
                    <div className=""> {SideBarData.BookingFild?.SubTotal} € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <p className="fw-500"> {translate("Tax")}</p>
                    <div className=""> {SideBarData.BookingFild?.Tax} € </div>
                  </div>

                  <div className={`d-flex items-center justify-between ${SideBarData.BookingFild?.Discount == 0 ? 'd-none' : 'd-block'}`}>
                    <div className="fw-500"> {translate("Discount")}</div>
                    <div className={``}>-{SideBarData.BookingFild?.Discount} € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500"> {translate("Amount Due")}</div>
                    <div className=""> {SideBarData.BookingFild?.Amount_Paid}€ </div>
                  </div>
                </div>

                <div className="mt-10">
                  <button
                    onClick={handlePayment}
                    className={`button -md -info-2 bg-accent-1 text-white col-12  € {bookingStage == 1 ? 'hiddenButtonBooking ButtonBooking' : 'ButtonBooking'}  ${
                      bookingStage == 2 ? `d-none` : `d-block`
                    }`}
                  >
                    Complete Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
