"use client";

import Header from "@/components/dasboard/Header";
import { useEffect, useState } from "react";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import { PaymentPendingHistry, StatusPaymentHistry } from "@/data/dashboard";
import DataTable from "react-data-table-component";

export default function DBListing() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  const VandorBookings = [
    {
      name: "Order No.",
      selector: (row) => row.BookingNo,
      width: "170px",
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.Full_Name,
      width: "190px",
      sortable: true,
    },
    {
      name: "Tour Name",
      selector: (row) => row.Last_Name,
      width: "190px",
      sortable: true,
    },
    {
      name: "Total (€) ",
      selector: (row) => row.Total_Payment,
      sortable: true,
    },
    { name: "Paid (€) ", selector: (row) => row.Payment_Tax, sortable: true },
    { name: "Date ", selector: (row) => row.Booking_date, sortable: true  , width : "100px"},
    { name: "Transaction ID ", selector: (row) => row.Transation_id, sortable: true  , width : "150px"},
  ];

  useEffect(() => {
    // Indicate that the component has mounted
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering client-specific elements until the component has mounted
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
          <h1 className="text-30">Payment History</h1>

          <div className="row y-gap-30 pt-30 md:pt-30">
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
              columns={VandorBookings}
              data={PaymentPendingHistry}
              highlightOnHover
              pagination
            />
          </div>

          <div className="text-center pt-30">
            © Copyright MekkaBooking.com {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
