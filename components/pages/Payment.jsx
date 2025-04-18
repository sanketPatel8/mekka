"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaUser } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaLuggageCart } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { FaHotel, FaStar } from "react-icons/fa6";
import "@/public/css/index.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
// import Stripeform from "../stripe/stripeform";
import { useCurrency } from "@/app/context/currencyContext";
import { type } from "jquery";
import { ClipLoader } from "react-spinners";
import { first, set } from "lodash";
import { IoMdArrowRoundBack } from "react-icons/io";
import dynamic from "next/dynamic";
const StripeformPage = dynamic(() => import("../stripe/stripeform"), {
  ssr: false,
});

export default function Payment() {
  const router = useRouter();

  const { translate } = useTranslation();

  const [roomType, setRoomType] = useState("");
  const [bookingStage, setBookingStage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("adPay");
  const [installmentChecked, setInstallmentChecked] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(0);
  const [SideBarData, setSideBarData] = useState([]);
  const [Booking, setBooking] = useState();
  const [ReservationID, setReservationID] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [LocalAdults, setLocalAdults] = useState([]);
  const [GetAdditionals, setGetAdditionals] = useState([]);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [dateBegin, setDateBegin] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [seconddate, setSecondDate] = useState("");
  const [minEndDate, setMinEndDate] = useState("");
  const [maxEndDate, setMaxEndDate] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [firstAmount, setFirstAmount] = useState("");
  const [minFirstAmount, setMinFirstAmount] = useState("");
  const [secondAmount, setSecondAmount] = useState("");
  const [thirdAmount, setThirdAmount] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [amount, setAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [payableAmount, setPayableAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [rawAmount, setRawAmout] = useState("");
  const [laterPayment, setLaterPayment] = useState("");
  const [companyCode, setCompanyCode] = useState("");

  useEffect(() => {
    setCompanyCode(localStorage.getItem("company_code"));
  });

  const dateInputRef = useRef(null);

  const handleDateFocus = (e) => {
    e.target.showPicker(); // This will open the date picker
  };
  // alert(companyCode)

  const handleCheckboxChange = (index) => {
    setSelectedCheckbox(index);
    if (index === 2) {
      setInstallmentChecked(true);
    } else {
      setInstallmentChecked(false);
    }
  };

  const formatPriceChange = (price) => {
    if (isNaN(price) || price.length === 0) {
      return "";
    }
  };

  //   const handleFirstAmountChange = (e) => {
  //     setIsFocused(true);

  //     const inputValue = e.target.value;

  //     if (inputValue === '' || isNaN(inputValue)) {
  //       setRawAmout("");
  //       setFirstAmount("");
  //       setThirdAmount(secondAmount ? secondAmount : 0)
  //       setPayableAmount("")
  //       return;
  //     }

  //     const rawAmount = parseFloat(inputValue);

  //     const totalAmount = SideBarData?.BookingFild?.SubTotal;
  //     const second  = secondAmount ? secondAmount : 0;

  //     if ((rawAmount + second) > totalAmount) {
  //       showErrorToast(translate, "Your amount is higher than total amount");
  //     } else {

  //       setFirstAmount(rawAmount);
  //       setThirdAmount(totalAmount - (rawAmount - secondAmount));
  //       if (rawAmount > 0) {
  //         const fees = calculateTotalWithFee(rawAmount);
  //         const amountPayable = rawAmount + fees;
  //         setPayableAmount(amountPayable);
  //       }
  //     }
  //   };

  // const handleSecondAmountChange = (e) => {

  //     const inputValue = e.target.value;

  //     if (inputValue === '' || isNaN(inputValue)) {
  //       setRawAmout("");
  //       setSecondAmount("");
  //       setThirdAmount(firstAmount ? firstAmount : 0)

  //       return;
  //     }

  //     const first = firstAmount? firstAmount : 0;

  //     const rawAmount = parseFloat(e.target.value) ;
  //     const totalAmount = SideBarData?.BookingFild?.SubTotal;

  //     if ((rawAmount + first) > totalAmount) {
  //       showErrorToast(translate,"Your amount is higher than total amount")

  //     } else {
  //         setSecondAmount(rawAmount);
  //         setThirdAmount(totalAmount - firstAmount - rawAmount);
  //     }
  // };
  const handleFirstAmountChange = (e) => {
    setIsFocused(true);
    const inputValue = e.target.value;

    if (inputValue === "" || isNaN(inputValue)) {
      setRawAmout("");
      setFirstAmount("");
      setThirdAmount(secondAmount ? secondAmount : 0);
      setPayableAmount("");
      return;
    }

    const rawAmount = parseFloat(inputValue);
    const totalAmount = SideBarData?.BookingFild?.SubTotal;
    const second = secondAmount ? secondAmount : 0;

    if (rawAmount + second > totalAmount) {
      showErrorToast(translate, "Your amount is higher than total amount");
    } else {
      setFirstAmount(rawAmount);
      recalculateAmounts(rawAmount, second);
    }
  };

  const handleSecondAmountChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "" || isNaN(inputValue)) {
      setRawAmout("");
      setSecondAmount("");
      setThirdAmount(firstAmount ? firstAmount : 0);
      return;
    }

    const rawAmount = parseFloat(inputValue);
    const totalAmount = SideBarData?.BookingFild?.SubTotal;
    const first = firstAmount ? firstAmount : 0;

    if (rawAmount + first > totalAmount) {
      showErrorToast(translate, "Your amount is higher than total amount");
    } else {
      setSecondAmount(rawAmount);
      recalculateAmounts(first, rawAmount);
    }
  };

  const recalculateAmounts = (first, second) => {
    const totalAmount = SideBarData?.BookingFild?.SubTotal;
    const total = first + second;

    if (total < totalAmount) {
      const thirdAmountValue = parseFloat(totalAmount - total).toFixed(2);
      setThirdAmount(thirdAmountValue);
    } else {
      setThirdAmount(0);
    }

    if (total === totalAmount) {
      setThirdAmount(0);
    }
  };
  useEffect(() => {
    if (secondAmount && dateBegin) {
      calculateThirdAmount();
    }
  }, [secondAmount, dateBegin]);

  const calculateThirdAmount = () => {
    const firstAmountValue = parseFloat(firstAmount);
    const secondAmountValue = parseFloat(secondAmount);

    const totalAmount = SideBarData?.BookingFild?.SubTotal;

    const total = firstAmountValue + secondAmountValue;

    if (total < totalAmount) {
      const thirdAmountValue = parseFloat(totalAmount - total).toFixed(2);

      setThirdAmount(thirdAmountValue);
    } else {
      setThirdAmount(0);
    }

    if (total == totalAmount) {
      setThirdAmount(0);
    }
  };

  useEffect(() => {}, [roomType]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}.${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${currentDate.getFullYear()}`;

    setTodayDate(formattedDate);

    const sidebardata = localStorage.getItem("PackageBookingData");

    try {
      const asSidebarrData = JSON.parse(sidebardata);
      setLaterPayment(asSidebarrData?.laterPayment);
      setSideBarData(asSidebarrData);
    } catch (error) {
      console.error("Error parsing userData:", error);
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

    const GetAdultsData = localStorage.getItem("previousAdults");

    if (GetAdultsData && GetAdultsData !== "undefined") {
      try {
        const GetPrevAdults = JSON.parse(GetAdultsData);
        setLocalAdults(GetPrevAdults);
      } catch (error) {
        console.error("error");
      }
    }

    const GetAdditionalServicePerPerson =
      localStorage.getItem("AdditionalServices");

    if (
      GetAdditionalServicePerPerson &&
      GetAdditionalServicePerPerson !== "undefined"
    ) {
      try {
        const GetAdditionl = JSON.parse(GetAdditionalServicePerPerson);
        setGetAdditionals(GetAdditionl);
      } catch (error) {
        console.error("error");
      }
    }
  }, []);

  // function isValidDate(date) {
  //   const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  //   return dateRegex.test(date);
  // }

  const parseDate = (dateString) => {
    const parts = dateString.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    return new Date(year, month - 1, day);
  };

  // const formatDateToDDMMYYYY = (date) => {
  //   const [year, month, day] = date.split("-");
  //   return `${day}-${month}-${year}`;
  // };

  // const formatDateToMMDDYYYY = (date) => {
  //   const [day, month, year] = date.split("-");
  //   return `${year}-${month}-${day}`;
  // };

  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    if (SideBarData?.startDate) {
      const startDateString = SideBarData?.startDate;
      if (startDateString) {
        try {
          const startDate = parseDate(startDateString);

          const sixDaysBefore = new Date(
            startDate.getTime() - 7 * 24 * 60 * 60 * 1000
          );

          const sixDaysBeforeString = sixDaysBefore.toISOString().split("T")[0];

          if (sixDaysBeforeString > todayString) {
            setDateEnd(sixDaysBeforeString);
            setMaxEndDate(sixDaysBeforeString);
          } else {
            const nextDay = today.setDate(today.getDate() + 1);
            const nextDayString = new Date(nextDay).toISOString().split("T")[0];
            setDateEnd(nextDayString);
            setMaxEndDate(nextDayString);
          }
        } catch (error) {
          console.error("Error parsing date string:", error);
        }
      }
    }
    setSecondAmount("");
    setDateBegin(todayString);
    setMinEndDate(todayString);
  }, [SideBarData?.startDate]);

  const handleDateChange = useCallback(
    (event) => {
      const selectedDate = event.target.value;
      const maxDateValue = dateEnd;

      if (selectedDate > maxDateValue) {
        setSecondDate(maxDateValue);
      } else {
        setSecondDate(selectedDate);
      }
    },
    [dateEnd]
  );

  const calculateTotalWithFee = (amount) => {
    console.log(amount, "amount");

    const feePercentage = 0.03;
    const fee = amount * feePercentage;
    return fee;
  };

  const handleEndDateChange = (event) => {
    const selectedDate = event.target.value;
    setDateEnd(selectedDate);
  };

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.addEventListener("change", handleDateChange);
    }

    return () => {
      if (dateInputRef.current) {
        dateInputRef.current.removeEventListener("change", handleDateChange);
      }
    };
  }, [handleDateChange]);

  const FatchallBooking = async (data) => {
    setIsLoading(true);
    try {
      const response = await post("addbooking", data);

      if (response.Status == "1") {
        setIsLoading(false);
        showSuccessToast(translate, "Booking successful");
        setBookingStage((pre) => pre + 1);
        setReservationID(response.reservationNumber);
      } else {
        showErrorToast(translate, "Booking failed");
      }
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast(translate, "Booking failed");
    }
  };
  const handleClose = () => {
    setShowStripeModal(false);
  };
  const handlePayment = () => {
    const agbAcceptance = document.getElementById("agbAcceptance");
    const item5 = document.getElementById("item5");
    setIsLoading(true);
    if (selectedCheckbox === 0 && (laterPayment == 0 || laterPayment == null)) {
      if (!agbAcceptance?.checked || !item5?.checked) {
        showErrorToast(translate, "Please accept terms and conditions");
        setIsLoading(false);
        return;
      }
      const newBooking = { ...Booking, paymentType: 1 };
      FatchallBooking(newBooking);
      setTimeout(() => {
        // router.push("#ref");
        document.querySelector("#ref").scrollIntoView({
          block: "start",
          inline: "start",
          behavior: "smooth",
        });
        setIsLoading(false);

        setTimeout(() => {
          localStorage.removeItem("AdultPrice&count");
          localStorage.removeItem("SelectedPackageHotelNDFlight");
          localStorage.removeItem("PackageBookingData");
          localStorage.removeItem("AllAdultsData");
          localStorage.removeItem("AdditionalServices");
          localStorage.removeItem("getUserData");
          localStorage.removeItem("Redirect_Login");
        }, 10000);
      }, 3000);
    }

    if (selectedCheckbox === 1 && (laterPayment == 0 || laterPayment == null)) {
      if (!agbAcceptance.checked || !item5.checked) {
        showErrorToast(translate, "Please accept terms and conditions");
        setIsLoading(false);
        return;
      }
      setShowStripeModal(true);
      setIsLoading(false);
      const newBooking = { ...Booking, paymentType: 2 };
      setBooking(newBooking);
      setAmount(SideBarData?.BookingFild?.SubTotal);
    }

    if (selectedCheckbox === 2 && (laterPayment == 0 || laterPayment == null)) {
      if (!firstAmount || !secondAmount || !seconddate || !thirdAmount) {
        showErrorToast(translate, "Please fill all the fields");
        setIsLoading(false);
        return;
      }

      if (!agbAcceptance?.checked || !item5?.checked) {
        showErrorToast(translate, "Please accept terms and conditions");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);

      setShowStripeModal(true);

      const newBooking = {
        ...Booking,
        paymentType: 3,
        payment_plan_1: firstAmount,
        payment_plan_2: secondAmount,
        payment_plan_3: thirdAmount,
        payment_plan_date_1: dateBegin,
        payment_plan_date_2: seconddate,
        payment_plan_date_3: dateEnd,
      };
      setBooking(newBooking);
      setAmount(firstAmount);
    }

    if (laterPayment == 1) {
      if (!agbAcceptance?.checked || !item5?.checked) {
        showErrorToast(translate, "Please accept terms and conditions");
        setIsLoading(false);
        return;
      }
      const newBooking = { ...Booking, paymentType: 4 };

      FatchallBooking(newBooking);
      setTimeout(() => {
        router.push("#ref");
        document.querySelector("#ref").scrollIntoView({
          block: "start",
          inline: "start",
          behavior: "smooth",
        });
        setIsLoading(false);

        setTimeout(() => {
          localStorage.removeItem("AdultPrice&count");
          localStorage.removeItem("SelectedPackageHotelNDFlight");
          localStorage.removeItem("PackageBookingData");
          localStorage.removeItem("AllAdultsData");
          localStorage.removeItem("AdditionalServices");
          localStorage.removeItem("getUserData");
          localStorage.removeItem("Redirect_Login");
        }, 10000);
      }, 3000);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(amount); // Convert to euros (assuming amount is in cents)
  };

  return (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 px-0 col-11 mx-auto" id="ref">
            <h2
              className={`text-30 md:text-24 fw-700 bg-Primary ${
                bookingStage === 2 ? "d-none" : "d-block"
              }`}
            >
              <button
                onClick={() => {
                  router.back();
                  localStorage.setItem("getUserData", "true");
                }}
              >
                <IoMdArrowRoundBack />{" "}
              </button>{" "}
              {translate("Payment Methods")}
            </h2>

            <div className="bg-white rounded py-30">
              {bookingStage === 1 && (
                <div>
                  <div className="border-1 rounded-12 shadow-1 overflow-hidden">
                    <p className="text-center py-3 bg-color-accent-1 bg-accent-1">
                      <b> {translate("Payment Methods")}</b>
                    </p>

                    {(laterPayment == 0 || laterPayment == null) && (
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
                              "Payment in advance. Payment installment is possible. Full Payment (using Visa, Mastercard, American Express, Japan Credit Bureau (JCB), Discover)"
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
                                    "Full Payment using (Visa, Mastercard, American Express, Japan Credit Bureau (JCB), Discover)"
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
                                {translate("Total Amount")} :{" "}
                                <b>
                                  {formatCurrency(
                                    SideBarData?.BookingFild?.SubTotal
                                  )}
                                </b>
                              </h5>
                            </div>

                            <div className="row my-3">
                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input
                                    type="number"
                                    required
                                    value={firstAmount}
                                    onChange={handleFirstAmountChange}
                                    placeholder=""
                                    className="mb-0"
                                    onKeyDown={(e) => {
                                      if (!isFocused) return;

                                      if (
                                        !/^[0-9]+$/.test(e.key) &&
                                        e.key !== "Backspace" &&
                                        e.key !== "Tab"
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                    onKeyUp={() => setIsFocused(false)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("1st Amount")}
                                    <span className="text-red"> *</span>
                                  </label>
                                  <span className="text-mekka ml-10">
                                    {translate(
                                      "This amount will be done using credit card (Stripe)"
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input
                                    type="date"
                                    required
                                    placeholder=""
                                    value={dateBegin}
                                    disabled={true}
                                    min={minEndDate}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("1st Date")}
                                    <span className="text-red"> *</span>
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input
                                    type="text"
                                    required
                                    value={secondAmount}
                                    onChange={handleSecondAmountChange}
                                    placeholder=""
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("2nd Amount")}
                                    <span className="text-red"> *</span>
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input
                                    type="date"
                                    required
                                    placeholder=""
                                    // value={formatDateToMMDDYYYY(seconddate)}
                                    // value={seconddate == "" ? "dd-mm-yyyy" :seconddate }
                                    value={seconddate}
                                    onChange={handleDateChange}
                                    min={minEndDate}
                                    // max={maxEndDate}
                                    onFocus={handleDateFocus}
                                    onKeyDown={(e) => e.preventDefault()}
                                    ref={dateInputRef}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("2nd Date")}
                                    <span className="text-red"> *</span>
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input
                                    type="text"
                                    required
                                    value={formatCurrency(thirdAmount)}
                                    disabled={true}
                                    placeholder=""
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("3rd Amount")}
                                    <span className="text-red"> *</span>
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input
                                    type="date"
                                    required
                                    placeholder="3rd Date"
                                    value={dateEnd}
                                    max={maxEndDate}
                                    min={seconddate}
                                    onFocus={handleDateFocus}
                                    onKeyDown={(e) => e.preventDefault()}
                                    disabled={seconddate === "" ? true : false}
                                    onChange={handleEndDateChange}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    {translate("3rd Date")}
                                    <span className="text-red"> *</span>
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
                              // onChange={handleDisabled}
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
                            <span className="text-red">* </span>
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
                              // onChange={handleDisabled}
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
                          <label
                            htmlFor="agbAcceptance"
                            className="lh-16 ml-15"
                          >
                            <span className="text-red">* </span>
                            <span>
                              {translate(
                                "I have read the AGB (mekkabooking) and I accept the conditions"
                              )}
                            </span>
                            {/* {companyCode && translate(`. This trip is operated by ${companyCode}.`)} */}
                            <span
                              className={companyCode ? "d-none" : "d-block"}
                            >
                              {translate(
                                `This trip is operated by ${companyCode}.`
                              )}
                            </span>
                            {/* {companyCode !== null && (
                                <div >
                                  {translate(
                                    `This trip is operated by ${companyCode}.`
                                  )}
                                </div>
                              )} */}
                          </label>
                        </div>
                      </div>
                    )}

                    {laterPayment == 1 && (
                      <div className="px-3">
                        <div className="d-flex items-center pointer-check py-3">
                          {/* <div className="form-checkbox">
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
                            </div> */}
                          <div className="lh-16 ml-15">
                            {translate(
                              "Pay Later (Using Bank Transfer Or Clicking On Stripe Link)"
                            )}
                          </div>
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
                                  "Note: Please keep the bank details for your reference.  Make payment upon return of your travel."
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex items-center pointer-check py-3">
                          <div className="form-checkbox">
                            <input
                              type="checkbox"
                              id="item5"
                              name="data protection and accept"
                              // onChange={handleDisabled}
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
                            <span className="text-red">* </span>
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
                              // onChange={handleDisabled}
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
                          <label
                            htmlFor="agbAcceptance"
                            className="lh-16 ml-15"
                          >
                            <span className="text-red">* </span>
                            <span>
                              {translate(
                                "I have read the AGB (mekkabooking) and I accept the conditions."
                              )}
                            </span>
                            {/* {companyCode && translate(`. This trip is operated by ${companyCode}.`)} */}
                            <span
                              className={companyCode ? "d-none" : "d-block"}
                            >
                              {translate(
                                `This trip is operated by ${companyCode}.`
                              )}
                            </span>
                            {/* {companyCode !== null && (
                                <div >
                                  {translate(
                                    `This trip is operated by ${companyCode}.`
                                  )}
                                </div>
                              )} */}
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-1 rounded-12 shadow-1 overflow-hidden mt-20">
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
                          "Booking details have been sent to your registered email address"
                        )}
                        .
                      </div>
                    </div>

                    <div className="border-dashed-1 py-30 px-10 rounded-12 mt-30">
                      <div className="row ">
                        <div className="col-md-4 col-6">
                          <span>{translate("Reservation Number")}</span>
                          <div className="text-accent-2">{ReservationID}</div>
                        </div>

                        <div className="col-md-2 col-6">
                          <span>{translate("Date")}</span>
                          <div className="text-accent-2">{todayDate}</div>
                        </div>

                        <div className="col-md-3 col-6">
                          <span>{translate("Total")}</span>
                          <div className="text-accent-2">
                            {formatCurrency(SideBarData?.BookingFild?.SubTotal)}
                          </div>
                        </div>

                        <div className="col-md-3 col-6">
                          <span>{translate("Payment Method")}</span>
                          <div className="text-accent-2">
                            {translate(
                              laterPayment == 0 || laterPayment == null
                                ? selectedCheckbox == 0
                                  ? "Direct Bank Transfer"
                                  : "Online"
                                : "Pay Later"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <h2 className="text-30 md:text-24 fw-700 mt-60 md:mt-30">
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
                        <div className="fw-500">Duration:</div>
                        <div className="">{SideBarData?.duration} Days</div>
                      </div>

                      <div className="items-center justify-between row">
                        <div className="fw-500 col-lg-2 col-11">Tickets:</div>
                        <div className="text-right col-10 row">
                          {LocalAdults.map((e, ind) => (
                            <div key={ind} className="col-4">
                              <p>
                                {e.label} X {e.count} = {e.grandTotal} €
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div> */}
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

                <div className="line mt-20 mb-2"></div>

                <div className="d-flex mt-30">
                  <Image
                    width={90}
                    height={84}
                    src={SideBarData?.TourThumbnail}
                    alt="image"
                    className="Payment_Sidebar_img"
                  />
                  <div className="ml-20">
                    {SideBarData?.type} - {SideBarData?.name}
                  </div>
                </div>

                <div className="line mt-20 mb-2"></div>

                <div className="px-1">
                  <div
                    className={
                      SideBarData?.selectedCheckbox !== false ||
                      SideBarData?.Airline?.flight_name == null
                        ? "d-none"
                        : "d-block"
                    }
                  >
                    <div className="d-flex items-center justify-content-space-arround ">
                      <div className="mr-5">
                        <FaTelegramPlane size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Airline")} :{" "}
                        {SideBarData?.Airline?.flight_name}
                      </div>
                    </div>
                    <div className="line mt-5 mb-5"></div>
                  </div>

                  <div
                    className={
                      SideBarData?.selectedCheckbox !== false ||
                      SideBarData?.Departure?.name == ""
                        ? "d-none"
                        : "d-block"
                    }
                  >
                    <div className="d-flex items-center justify-content-space-arround">
                      <div className="mr-5">
                        <MdFlightTakeoff size={25} color="#DAC04F" />
                      </div>
                      <div className="text-start">
                        {translate("Departure")} :{" "}
                        {SideBarData?.Departure?.name}
                      </div>
                    </div>
                    <div className="line mt-5 mb-5"></div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <MdFlightTakeoff size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {translate("Departure Date")} : {SideBarData?.startDate}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <MdFlightLand size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {translate("Arrival")}: {SideBarData?.Arrival?.name}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <MdDateRange size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {" "}
                      {translate("Return")} : {SideBarData?.Return}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <TbWorld size={25} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {translate("Offered Languages")} :{" "}
                      {SideBarData?.OfferedLanguages?.length > 0
                        ? SideBarData.OfferedLanguages.join(", ")
                        : translate("No Languages Available")}
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div
                    className={
                      SideBarData?.selectedCheckbox !== false
                        ? "d-none"
                        : "d-block"
                    }
                  >
                    {SideBarData?.Airline !== null && (
                      <div>
                        {/* <div className="line mt-5 mb-5"></div> */}
                        <div className="d-flex items-center justify-content-space-arround">
                          <div className="mr-5">
                            <FaLuggageCart size={25} color="#DAC04F" />
                          </div>
                          <div className="text-start">
                            {translate("Max Luggage Per Person")} :{" "}
                            {SideBarData?.MaxLuggagePerPerson === null
                              ? " null aa raha hei ! "
                              : SideBarData?.MaxLuggagePerPerson}{" "}
                            kg
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="line mt-5 mb-5"></div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <FaHotel size={20} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {" "}
                      {translate("Makka")} :{" "}
                      {SideBarData?.MakkaHotel?.hotel_name} -{" "}
                      <span className="items-cen">
                        (<FaStar color="#dabf4f" className="" />{" "}
                        {SideBarData?.mekkaHotelStar})
                      </span>
                    </div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5">
                      <FaHotel size={20} color="#DAC04F" />
                    </div>
                    <div className="text-start">
                      {" "}
                      {translate("Madina")} :{" "}
                      {SideBarData?.MadinaHotel?.hotel_name} -{" "}
                      <span className="items-cen">
                        (<FaStar color="#dabf4f" className="" />{" "}
                        {SideBarData?.MadinaHotlStar})
                      </span>
                    </div>
                  </div>

                  {GetAdditionals.length !== 0 && (
                    <>
                      <div className="line mt-5 mb-5"></div>

                      <p className="my-1 text-14 my-2">
                        (
                        {translate(
                          "The Standard Offer May Include a Multi-Bed Room"
                        )}
                        .)
                      </p>

                      <div>
                        <b>
                          {translate(
                            "Selected Additional Services Per Person:"
                          )}
                        </b>
                        <div className="line my-2"></div>
                        {GetAdditionals.map((e, index) => (
                          <div className="row" key={index}>
                            <div className="col">
                              <IoIosBed size={20} color="#DAC04F" />
                            </div>
                            <div className="col-6">{e.title}</div>
                            <div className="col-4">
                              {formatCurrency(e.price)}{" "}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="line mt-10 mb-10"></div>

                <div className="d-flex items-center justify-between">
                  <div className="fw-500"> {translate("Subtotal")}</div>
                  <div className="">
                    {" "}
                    {formatCurrency(SideBarData?.BookingFild?.Total)}{" "}
                  </div>
                </div>

                {SideBarData?.BookingFild?.Discount?.Discount !== null &&
                SideBarData?.BookingFild?.Discount?.Discount !== undefined ? (
                  <div className="">
                    <div className={`d-flex items-center justify-between`}>
                      <div className="fw-500">
                        {" "}
                        {translate("Discount")}{" "}
                        {`(${SideBarData?.BookingFild?.Discount?.coupon_name})`}
                      </div>
                      <div className="">
                        -
                        {formatCurrency(
                          SideBarData?.BookingFild?.Discount?.Discount || 0
                        )}{" "}
                      </div>
                    </div>
                  </div>
                ) : null}
                {selectedCheckbox === 1 && !paidAmount ? (
                  SideBarData?.BookingFild?.Discount?.Discount !== undefined ? (
                    <div className="">
                      <div className={`d-flex items-center justify-between`}>
                        <div className="fw-500"> {translate("Amount Due")}</div>
                        <div className="">
                          {formatCurrency(
                            SideBarData?.BookingFild?.Total -
                              SideBarData?.BookingFild?.Discount?.Discount
                          )}{" "}
                        </div>
                      </div>

                      <div className="d-flex items-center justify-between paymentGateway">
                        <div className="fw-500">
                          {" "}
                          {translate("Payment Gateway Fees (3%)")}
                        </div>
                        <div className="">
                          {formatCurrency(
                            calculateTotalWithFee(
                              SideBarData?.BookingFild?.Total -
                                SideBarData?.BookingFild?.Discount?.Discount
                            )
                          )}
                        </div>
                      </div>

                      {/* <div className="d-flex items-center justify-between">
                          <div className="fw-500"> {translate("Amount Payable")}</div>
                          <div className=""> {formatCurrency((calculateTotalWithFee(SideBarData?.BookingFild?.Total - SideBarData?.BookingFild?.Discount?.Discount)) + (SideBarData?.BookingFild?.Total - SideBarData?.BookingFild?.Discount?.Discount))} </div>
                        </div> */}
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex items-center justify-between  paymentGateway">
                        <div className="fw-500">
                          {" "}
                          {translate("Payment Gateway Fees (3%)")}
                        </div>
                        <div className="">
                          {" "}
                          {formatCurrency(
                            calculateTotalWithFee(
                              SideBarData?.BookingFild?.Total
                            )
                          )}{" "}
                        </div>
                      </div>

                      {/* <div className="d-flex items-center justify-between">
                    <div className="fw-500"> {translate("Amount Payable")}</div>
                    <div className=""> {formatCurrency(calculateTotalWithFee(SideBarData?.BookingFild?.Total) + SideBarData?.BookingFild?.Total)} </div>
                  </div> */}
                    </div>
                  )
                ) : (
                  ""
                )}

                {/* {
                  ((selectedCheckbox === 2 ) && payableAmount) ?( SideBarData?.BookingFild?.Discount?.Discount !== undefined ? (
                    
                    <div>

                    <div className="d-flex items-center justify-between">
                      <div className="fw-500"> {translate("Payment Gateway Fees (3%)")}</div>
                      <div className=""> {formatCurrency(calculateTotalWithFee(SideBarData?.BookingFild?.Total))} </div>
                    </div>
                    
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500"> {translate("Amount Payable")}</div>
                      <div className=""> {formatCurrency(calculateTotalWithFee(SideBarData?.BookingFild?.Total) + SideBarData?.BookingFild?.Total)} </div>
                    </div>
  
                  </div>)
                  : "") :""
                } */}
                <div className="">
                  {selectedCheckbox == 2 &&
                    !paidAmount &&
                    SideBarData?.BookingFild?.Discount?.Discount && (
                      <div className={`d-flex items-center justify-between`}>
                        <div className="fw-500"> {translate("Amount Due")}</div>
                        <div className="">
                          {formatCurrency(
                            SideBarData?.BookingFild?.Total -
                              SideBarData?.BookingFild?.Discount?.Discount
                          )}{" "}
                        </div>
                      </div>
                    )}

                  {payableAmount !== paidAmount && selectedCheckbox == 2 && (
                    <>
                      <div className="d-flex items-center justify-between">
                        <div className="fw-500">
                          {" "}
                          {translate("Payment Gateway Fees (3%)")}
                        </div>
                        <div className="">
                          {firstAmount > 0
                            ? formatCurrency(calculateTotalWithFee(firstAmount))
                            : formatCurrency(
                                calculateTotalWithFee(
                                  SideBarData?.BookingFild?.Total
                                )
                              )}
                        </div>
                      </div>

                      <div className="d-flex items-center justify-between">
                        <div className="fw-500">
                          {" "}
                          {translate("Amount Payable")}
                        </div>
                        <div className="">
                          {" "}
                          {formatCurrency(
                            firstAmount + calculateTotalWithFee(firstAmount)
                          )}{" "}
                        </div>
                      </div>
                    </>
                  )}
                  {payableAmount === paidAmount && selectedCheckbox == 2 && (
                    <>
                      <div className="d-flex items-center justify-between">
                        <div className="fw-500">
                          {" "}
                          {translate("Payment Gateway Fees (3%)")}
                        </div>
                        <div className="">
                          {firstAmount > 0
                            ? formatCurrency(calculateTotalWithFee(firstAmount))
                            : formatCurrency(
                                calculateTotalWithFee(
                                  SideBarData?.BookingFild?.Total
                                )
                              )}
                        </div>
                      </div>
                    </>
                  )}

                  {paidAmount && selectedCheckbox === 1 && (
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500">
                        {" "}
                        {translate("Payment Gateway Fees (3%)")}
                      </div>
                      <div className="">
                        {formatCurrency(
                          calculateTotalWithFee(SideBarData?.BookingFild?.Total)
                        )}
                      </div>
                    </div>
                  )}

                  {paidAmount && (
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500"> {translate("Amount Paid")}</div>
                      <div className=""> {formatCurrency(paidAmount)} </div>
                    </div>
                  )}

                  {paidAmount && selectedCheckbox === 1 && (
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500"> {translate("Amount Due")}</div>
                      <div className=""> {formatCurrency(0.0)} </div>
                    </div>
                  )}
                  {selectedCheckbox === 0 && (
                    <div className="d-flex items-center justify-between">
                      <div className="fw-500"> {translate("Amount Due")}</div>
                      <div className="">
                        {" "}
                        {formatCurrency(
                          SideBarData?.BookingFild?.SubTotal
                        )}{" "}
                      </div>
                    </div>
                  )}

                  {installmentChecked === true &&
                    paidAmount &&
                    SideBarData?.BookingFild?.SubTotal - paidAmount > 0 && (
                      <div className="d-flex items-center justify-between">
                        <div className="fw-500"> {translate("Amount Due")}</div>
                        <div className="">
                          {" "}
                          {formatCurrency(
                            SideBarData?.BookingFild?.SubTotal - firstAmount
                          )}{" "}
                        </div>
                      </div>
                    )}
                </div>

                <div className="mt-10">
                  <button
                    onClick={handlePayment}
                    // disabled={disabled}
                    className={`button -md -info-2 bg-accent-1 text-white col-12  € {bookingStage == 1 ? 'hiddenButtonBooking ButtonBooking' : 'ButtonBooking'}  ${
                      bookingStage == 2 ? `d-none` : `d-block`
                    }`}
                  >
                    {isLoading ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "30px", width: "100%" }}
                      >
                        <ClipLoader color="#ffffff" size={30} />
                      </div>
                    ) : (
                      translate("Complete Reservation")
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showStripeModal && (
        <StripeformPage
          amount={amount ? amount : SideBarData?.BookingFild?.SubTotal}
          setPaidAmount={setPaidAmount}
          Booking={Booking}
          setReservationID={setReservationID}
          showStripeModal={showStripeModal}
          handleClose={handleClose}
          setBookingStage={setBookingStage}
        />
      )}
    </section>
  );
}
