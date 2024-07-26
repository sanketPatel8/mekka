"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/dasboard/Header";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import DataTable from "react-data-table-component";
import { bookingData } from "@/data/dashboard";
import Link from "next/link";

const tabs = ["All", "Completed", "In Progress", "Cancelled"];

export default function DbBooking() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("All");
  const [filteredData, setFilteredData] = useState(bookingData);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized filtered items based on filterText
  const filteredItems = useMemo(() => {
    return filteredData.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
  }, [filterText, filteredData]);

  // Function to handle clearing filter and resetting pagination
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText('');
    }
  };

  useEffect(() => {
    // Filter data based on currentTab
    let filtered = [];
    if (currentTab === "All") {
      filtered = bookingData;
    } else {
      filtered = bookingData.filter((item) => item.Status === currentTab);
    }
    setFilteredData(filtered);
  }, [currentTab]);

  const StatusCell = ({ row }) => {
    const statusStyles = {
      color:
        row.Status === "Cancelled"
          ? "red"
          : row.Status === "Completed"
          ? "green"
          : row.Status === "Pending"
          ? "orange"
          : "orange",
    };
    return <span style={statusStyles}>{row.Status}</span>;
  };

  const VandorBookings = [
    { name: "Booking No.", selector: (row) => row.BookingNo, width: "170px", sortable: true },
    {
      name: "Status",
      selector: (row) => row.Status,
      cell: (row) => <StatusCell row={row} />,
      sortable: true,
    },
    { name: "Full Name", selector: (row) => row.Full_Name, width: "190px", sortable: true },
    { name: "Tour Name", selector: (row) => row.Tour_name, width: "150px", sortable: true },
    { name: "Total (€) ", selector: (row) => row.Total_Payment, sortable: true },
    { name: "Pending (€) ", selector: (row) => row.Pending_Payment, sortable: true },
    { name: "Terms ", selector: (row) => row.Payment_Terms, sortable: true },
    { name: "Method ", selector: (row) => row.Payment_Method, sortable: true },
    { name: "Visas", selector: (row) => row.Visas, width: "150px", sortable: true },
    { name: "Flight", selector: (row) => row.Flight, width: "150px", sortable: true },
    {
      name: "Initiated By",
      selector: (row) => row.Initiated_By_Admin,
      width: "150px", sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link href={`/vendor/db-edit-booking/${row.BookingNo}`}>
          <button
            className="button -md py-1 -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
          >
            Edit
          </button>
        </Link>
      ),
      width: "110px",
    },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className={`dashboard ${sideBarOpen ? "-is-sidebar-visible" : ""} js-dashboard`}>
      <AgentDBsideBar setSideBarOpen={setSideBarOpen} />
      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />
        <div className="dashboard__content_content">
          <h1 className="text-30">My Booking</h1>
          <div className="rounded-12 bg-white shadow-2 px-40 py-40 mt-20 ">
            <div className="tabs -underline-2 js-tabs">
              <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className="col-auto"
                    onClick={() => setcurrentTab(tab)}
                  >
                    <button
                      className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${tab === currentTab ? "is-tab-el-active" : ""}`}
                    >
                      {tab}
                    </button>
                  </div>
                ))}
              </div>
              <DataTable
                columns={VandorBookings}
                data={filteredItems}
                highlightOnHover
                pagination
                subHeader
                subHeaderComponent={
                  <div className="d-flex items-center border-1 px-3 py-2 rounded">
                    <input
                      type="text"
                      placeholder="Search all columns"
                      value={filterText}
                      className="ml-10 "
                      onChange={(e) => setFilterText(e.target.value)}
                    />
                     <span className="form-input m-0 ">
                      <input type="text" required />
                    </span>
                    <button onClick={handleClear}>Clear</button>
                  </div>
                }
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
