'use client'

import React, { useState, useEffect } from "react";
import Header from "@/components/dasboard/Header";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import DataTable from "react-data-table-component";
import { bookingData } from "@/data/dashboard";


const tabs = ["All", "Completed", "In Progress", "Cancelled"];

export default function DbBooking() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter data based on currentTab
    let filtered = [];
    if (currentTab === "All") {
      filtered = bookingData;
    } else {
      filtered = bookingData.filter(item => item.Status === currentTab);
    }
    setFilteredData(filtered);
  }, [currentTab]);

  const StatusCell = ({ row }) => {
    const statusStyles = {
      color: row.Status === 'Cancelled' ? 'red' : row.Status === 'Completed' ? 'green' : row.Status === 'Pending' ? 'orange' : 'orange',
    };
    return <span style={statusStyles}>{row.Status}</span>;
  };

  const VandorBookings = [
    { name: "Booking No.", selector: (row) => row.BookingNo ,  width: "170px" },
    { name: "Status", selector: (row) => row.Status, cell: (row) => <StatusCell row={row} /> , sortable: true, },
    { name: "Full Name", selector: (row) => row.Full_Name, width: "190px" },
    { name: "Total (€) ", selector: (row) => row.Total_Payment },
    { name: "Pending (€) ", selector: (row) => row.Pending_Payment },
    { name: "Terms ", selector: (row) => row.Payment_Terms },
    { name: "Method ", selector: (row) => row.Payment_Method },
    { name: "Visas", selector: (row) => row.Visas },
    { name: "Flight", selector: (row) => row.Flight },
    { name: "Tour Name", selector: (row) => row.Tour_name , width : "150px" },
    { name: "Initiated By", selector: (row) => row.Initiated_By_Admin  , width: "150px"},
    {
      name: "Action",
      selector: (row) => (
        <button
          className="button -md py-1 -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
          // onClick={openAdult1Deta}
        >
          Edit
        </button>
      ) , width: "110px"
    },
  ];

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
          <h1 className="text-30">My Booking</h1>
          <p className="">Lorem ipsum dolor sit amet, consectetur.</p>

          <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 md:px-20 md:pt-20 md:mb-20 mt-60">
            <div className="tabs -underline-2 js-tabs">
              <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className="col-auto"
                    onClick={() => setcurrentTab(tab)}
                  >
                    <button
                      className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                        tab === currentTab ? "is-tab-el-active" : ""
                      }`}
                    >
                      {tab}
                    </button>
                  </div>
                ))}
              </div>

              <DataTable
                columns={VandorBookings}
                data={filteredData}
                highlightOnHover
                pagination
                subHeader
              />
            </div>
          </div>

          <div className="text-center pt-30">
            © Copyright MekkaBooking.com {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
