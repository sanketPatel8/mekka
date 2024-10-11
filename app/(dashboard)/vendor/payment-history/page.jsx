"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/dasboard/Header";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import DataTable from "react-data-table-component";
import { useTranslation } from "@/app/context/TranslationContext";
import { POST } from "@/app/utils/api/post";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { ClipLoader } from "react-spinners";
import { showErrorToast } from "@/app/utils/tost";
import Useauthredirect from "@/app/hooks/useAuthRedirect";

export default function DBListing() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState([]);
  const [Total_Earnings, setTotalEarnings] = useState("0");
  const [Total_Pending, setTotalPending] = useState("0");
  const [StatusPaymentHistry, setPaymentHistory] = useState([]);
  const [VendorBookings, setVendorBookings] = useState([]);
  const { user } = useAuthContext();
  const { translate } = useTranslation();

  useEffect(() => {
    const BookingsData = [
      {
        name: translate("Booking Id"),
        selector: (row) => row.BookingId,
        width: "8%",
        sortable: true,
      },
      {
        name: translate("Booking No."),
        selector: (row) => row.BookingNo,
        width: "10%",
        sortable: true,
      },
      {
        name: translate("Customer Name"),
        selector: (row) => row.Full_Name,
        width: "20%",
        sortable: true,
      },
      {
        name: translate("Tour Name"),
        selector: (row) => row.tour_name,
        width: "20%",
        sortable: true,
      },
      {
        name: translate("Total (€) "),
        width: "10%",
        selector: (row) => row.Total_Payment,
        sortable: true,
      },
      {
        name: translate("Paid (€) "),
        selector: (row) => row.paid_amount,
        sortable: true,
        width: "10%",
      },
      {
        name: translate("Due (€) "),
        selector: (row) => row.pending_payment,
        sortable: true,
        width: "10%",
      },
      {
        name: translate("Date "),
        selector: (row) => row.Booking_date,
        sortable: true,
        width: "10%",
      },
      {
        name: translate("Transaction ID "),
        selector: (row) => row.Transation_id,
        sortable: true,
        width: "12%",
      },
    ];

    setVendorBookings(BookingsData);

    setPaymentHistory([
      {
        id: 1,
        title: `${translate("Total Earnings")}`,
        amount: `${Total_Earnings} €`,
        today: "50 €",
        iconClass: "icon-wallet text-accent-1",
      },
      {
        id: 2,
        title:`${translate("Total Pending")}` ,
        amount: `${Total_Pending} €`,
        today: "40+",
        iconClass: "icon-payment text-accent-1",
      },
    ]);
  }, [translate, Total_Earnings, Total_Pending]);

  const company_id = user?.user.company_id;
  const fetchPayments = async () => {
    const formData = new FormData();
    formData.append("company_id", company_id);
    setLoading(true);
    const response = await POST.request({
      form: formData,
      url: "payment_history",
    });
    if (response && response.Total_Earnings && response.Total_Pending) {
      setTotalEarnings(response.Total_Earnings);
      setTotalPending(response.Total_Pending);
      const bookingData = response.Payment_Data.map((payment) => ({
        BookingId: payment.reservation_id,
        BookingNo: payment.reservationNumber,
        Full_Name: payment.name,
        tour_name: payment.tour_name,
        Total_Payment: payment.total,
        Booking_date: payment.date,
        Transation_id: payment.transaction_id,
        pending_payment:payment.pending_payment,
        paid_amount:payment.paid_amount
      }));
      setPayment(bookingData);

      setLoading(false);
    } else {
      setLoading(false);
      showErrorToast("Something went wrong");
    }
  };
  const {handleRedirect} = Useauthredirect();

  useEffect(() => {
    handleRedirect();
    setLoading(false);
    if(user){

      fetchPayments();
    }
  }, [company_id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);

      const handleResize = () => {
        setSideBarOpen(window.innerWidth >= 1000);
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

  if (!mounted) {
    return null; 
  }

  return (
    <div
      className={`dashboard ${
        sideBarOpen ? "-is-sidebar-visible" : ""
      } js-dashboard`}
    >
      <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content_content">
          <h1 className="text-30"> {translate("Payment History")}</h1>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <ClipLoader color="#DAC04F" size={50} />
            </div>
          ) : (
            <>
              <div className="row y-gap-30 mt-20 md:pt-30">
                {StatusPaymentHistry.map((elm, i) => (
                  <div key={i} className="col-xl-3 col-sm-6 py-3 py-lg-1">
                    <div className="rounded-12 bg-white shadow-2 px-30 py-30 h-full">
                      <div className="row y-gap-20 items-center justify-between">
                        <div className="col-auto">
                          <div>{elm.title}</div>
                          <div className="text-30 fw-700">{elm.amount}</div>
                          <div>
                            {/* <span className="text-accent-1">{elm.today}</span> Today */}
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="size-80 flex-center bg-accent-1-05 rounded-full">
                            <i className={`text-30 ${elm.iconClass}`}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:pb-20 mt-60 md:mt-30">
                <DataTable
                  title="Payment Data"
                  columns={VendorBookings}
                  data={payment}
                  highlightOnHover
                  pagination
                />
              </div>
            </>
          )}
          <div className="text-center pt-30">
            © Copyright MekkaBooking.com {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
