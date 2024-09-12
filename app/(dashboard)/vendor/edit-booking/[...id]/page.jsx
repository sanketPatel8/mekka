"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/dasboard/Header";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import DataTable from "react-data-table-component";
import { bookingData } from "@/data/dashboard";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import DocumentStatusManager from "@/components/dasboard/DocumentStatusManager";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";

const tabs = ["All", "Completed", "In Progress", "Cancelled"];

export default function DbBooking({ params }) {

  const {user} = useAuthContext();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [bookings, setBookings] = useState({});
  const [radioValue, setRadioValue] = useState("");
  console.log(params.id[0], "params");
  const id = params.id[0];
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };


  // useEffect(() => {
  //   // Filter data based on currentTab
  //   let filtered = [];
  //   if (currentTab === "All") {
  //     filtered = bookingData;
  //   } else {
  //     filtered = bookingData.filter((item) => item.Status === currentTab);
  //   }
  //   setFilteredData(filtered);

    
  // }, [currentTab]);

  const fetchDetails = async () => {
    const formData = new FormData();
    formData.append("user_id", user?.user?.id);
    formData.append("id", id);

    const response = await POST.request({form:formData, url: "booking_details"});
    if(response){
      setBookings(response.Bookings)
    }
    console.log(response, "response");
  }

  useEffect(()=>{
      fetchDetails();
  },[user])

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
    { name: "Booking No.", selector: (row) => row.BookingNo, width: "170px" },
    {
      name: "Status",
      selector: (row) => row.Status,
      cell: (row) => <StatusCell row={row} />,
      sortable: true,
    },
    { name: "Full Name", selector: (row) => row.Full_Name, width: "190px" },
    { name: "Tour Name", selector: (row) => row.Tour_name, width: "150px" },
    { name: "Total (€) ", selector: (row) => row.Total_Payment },
    { name: "Pending (€) ", selector: (row) => row.Pending_Payment },
    { name: "Terms ", selector: (row) => row.Payment_Terms },
    { name: "Method ", selector: (row) => row.Payment_Method },
    { name: "Visas", selector: (row) => row.Visas },
    { name: "Flight", selector: (row) => row.Flight },
    {
      name: "Initiated By",
      selector: (row) => row.Initiated_By_Admin,
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => (
        <Link href="/vendor/db-edit-booking">
          {" "}
          <button
            className="button -md py-1 -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            // onClick={openAdult1Deta}
          >
             {translate("Edit") }
          </button>
        </Link>
      ),
      width: "110px",
    },
  ];

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
         

            <DocumentStatusManager Customerid = {params} bookings={bookings}/>

          <div className="text-center pt-30">
            © Copyright MekkaBooking.com {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
