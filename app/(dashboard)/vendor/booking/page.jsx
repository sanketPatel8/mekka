"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/dasboard/Header";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { useTranslation } from "@/app/context/TranslationContext";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
import { ClipLoader } from "react-spinners";
import Useauthredirect from "@/app/hooks/useAuthRedirect";

// const tabs = ["All", "Completed", "In Progress", "Cancelled"];

export default function DbBooking() {
  const { translate } = useTranslation();
  const [tabs, setTabs] = useState([]);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(bookings);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [VendorBookings, setVendorBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Bookings - MekkaBooking";
    }
  }, []);
  useEffect(() => {
    const tabContent = [
      translate("All"),
      // translate("Upcoming Bookings"),
      translate("Upcoming Bookings"),
      translate("In Progress"),
      translate("Completed"),
      translate("Cancelled"),

    ];
    setTabs(tabContent);

    const BookingsData = [
      // {
      //   name: translate("Id"),
      //   selector: (row) => row.BookingId,
      //   sortable: true,
      //   width:"5%",
        
      // },
      {
        name: translate("Booking No."),
        selector: (row) => row.BookingNo,

        sortable: true,
        width:"12%",

      },
      {
        name: translate("Status"),
        selector: (row) => row.Status,
        sortable: true,
        width:"12%",

      },
      {
        name: translate("Full Name"),
        selector: (row) => row.Full_Name,
        sortable: true,
        width:"12%",

      },
      {
        name: translate("Tour Name"),
        selector: (row) => row.Tour_name,
        sortable: true,
        width:"10%",

      },
      {
        name: translate("Total (€)"),
        selector: (row) => row.Total_Payment,
        sortable: true,
        width:"8%",

      },
      {
        name: translate("Pending (€)"),
        selector: (row) => row.Pending_Payment,
        sortable: true,
        width:"9%",

      },
   
      {
        name: translate("Method"),
        selector: (row) => row.Payment_Method,
        sortable: true,
        // width:"10%",

      },
      {
        name: translate("Visas"),
        selector: (row) => row.Visas,
        sortable: true,
        // width:"6%",

      },
      {
        name: translate("Flight"),
        selector: (row) => row.Flight,
        sortable: true,
        // width:"6%",

      },
      {
        name: translate("Initiated By"),
        selector: (row) => row.Initiated_By_Admin,
        sortable: true,
        // width:"9%",

      },
      {
        name: translate("Action"),
        selector: (row) => (
          <Link href={`/vendor/edit-booking/${row.BookingId}`}>
            <button
              className="button -md  -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
              style={{ width: "fit-content", padding: "5px 16px" }}
            >
              {translate("Edit")}
            </button>
          </Link>
        ),
        width:"10%"
      },
    ];

    setVendorBookings(BookingsData);
  }, [translate]);
  const fetchBookings = async (tab) => {
    const formData = new FormData();
    formData.append("company_id", user?.user.company_id);
    setLoading(true);
    const response = await POST.request({
      form: formData,
      url: "tour_bookings",
    });

    if (tab === "All") {
      setLoading(false);
      const bookingsData = response.Bookings.map((booking) => ({
        BookingId: booking.reservation_id,
        BookingNo: booking.reservationNumber,
        Status: booking.reservation_status,
        Full_Name: booking.name,
        Tour_name: booking.tour_name,
        Total_Payment: booking.total,
        Pending_Payment: booking.pending_payment,
        Payment_Method: booking.payment_method,
        Visas: booking.visa_confirm,
        Flight: booking.plane_confirm,
        Initiated_By_Admin: booking.initiated_by_admin,
      }));
      setBookings(bookingsData);
    } else if (tab === "Completed") {
      setLoading(false);
      const bookingsData = response.Completed_Bookings.map((booking) => ({
        BookingId: booking.reservation_id,
        BookingNo: booking.reservationNumber,
        Status: booking.reservation_status,
        Full_Name: booking.name,
        Tour_name: booking.tour_name,
        Total_Payment: booking.total,
        Pending_Payment: booking.pending_payment,
        Payment_Terms: booking.payment_terms,
        Payment_Method: booking.payment_method,
        Visas: booking.visa_confirm,
        Flight: booking.plane_confirm,
        Initiated_By_Admin: booking.initiated_by_admin,
      }));
      setBookings(bookingsData);
    } else if (tab === "In Progress") {
      setLoading(false);
      const bookingsData = response.In_Progress_Bookings.map((booking) => ({
        BookingId: booking.reservation_id,
        BookingNo: booking.reservationNumber,
        Status: booking.reservation_status,
        Full_Name: booking.name,
        Tour_name: booking.tour_name,
        Total_Payment: booking.total,
        Pending_Payment: booking.pending_payment,
        Payment_Terms: booking.payment_terms,
        Payment_Method: booking.payment_method,
        Visas: booking.visa_confirm,
        Flight: booking.plane_confirm,
        Initiated_By_Admin: booking.initiated_by_admin,
      }));
      setBookings(bookingsData);
    } else if (tab === "Cancelled") {
      setLoading(false);
      const bookingsData = response.Cancelled_Bookings.map((booking) => ({
        BookingId: booking.reservation_id,
        BookingNo: booking.reservationNumber,
        Status: booking.reservation_status,
        Full_Name: booking.name,
        Tour_name: booking.tour_name,
        Total_Payment: booking.total,
        Pending_Payment: booking.pending_payment,
        Payment_Terms: booking.payment_terms,
        Payment_Method: booking.payment_method,
        Visas: booking.visa_confirm,
        Flight: booking.plane_confirm,
        Initiated_By_Admin: booking.initiated_by_admin,
      }));
      setBookings(bookingsData);
    } 
    
    else if(tab === "Upcoming Bookings") {
      setLoading(false);
      
      const bookingsData = response.Open_Bookings.map((booking) => ({
        BookingId: booking.reservation_id,
        BookingNo: booking.reservationNumber,
        Status: booking.reservation_status,
        Full_Name: booking.name,
        Tour_name: booking.tour_name,
        Total_Payment: booking.total,
        Pending_Payment: booking.pending_payment,
        Payment_Terms: booking.payment_terms,
        Payment_Method: booking.payment_method,
        Visas: booking.visa_confirm,
        Flight: booking.plane_confirm,
        Initiated_By_Admin: booking.initiated_by_admin,
      }));
      setBookings(bookingsData);
    }
    // else if(tab === "Upcoming Bookings") {
    //   setLoading(false);
      
    //   const bookingsData = response.Upcoming_Bookings.map((booking) => ({
    //     BookingId: booking.reservation_id,
    //     BookingNo: booking.reservationNumber,
    //     Status: booking.reservation_status,
    //     Full_Name: booking.name,
    //     Tour_name: booking.tour_name,
    //     Total_Payment: booking.total,
    //     Pending_Payment: booking.pending_payment,
    //     Payment_Terms: booking.payment_terms,
    //     Payment_Method: booking.payment_method,
    //     Visas: booking.visa_confirm,
    //     Flight: booking.plane_confirm,
    //     Initiated_By_Admin: booking.initiated_by_admin,
    //   }));
    //   setBookings(bookingsData);
    // }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth >= 1000) {
          setSideBarOpen(true);
        } else {
          setSideBarOpen(false);
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const {handleRedirect} = Useauthredirect();

  useEffect(() => {
    handleRedirect();
    setLoading(false);
    setIsClient(true);
    fetchBookings(currentTab);
  }, [currentTab]);

  useEffect(() => {
    const filteredItems = bookings.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
    setFilteredData(filteredItems);
  }, [filterText, bookings]);

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  useEffect(() => {
    let filtered = [];
    if (currentTab === "All") {
      filtered = bookings;
    } else {
      filtered = bookings.filter((item) => item.Status === currentTab);
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

  if (!isClient) {
    return null;
  }

  const setCurrentTab = (tab) => {
    setcurrentTab(tab);
    fetchBookings(tab);
  };

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
          <h1 className="text-30"> {translate("My Booking")}</h1>
          <div className="rounded-12 bg-white shadow-2 px-40 py-40 mt-20 ">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <ClipLoader color="#DAC04F" size={50} />
              </div>
            ) : (
              <div className="tabs -underline-2 js-tabs">
                <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                  {tabs.map((tab, index) => (
                    <div
                      key={index}
                      className="col-auto"
                      onClick={() => setCurrentTab(tab)}
                    >
                      <button
                        className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                          tab === currentTab ? "is-tab-el-active" : ""
                        }`}
                      >
                        {translate(tab)}
                      </button>
                    </div>
                  ))}
                </div>
                <DataTable
                  columns={VendorBookings}
                  data={filteredData}
                  highlightOnHover
                  pagination
                  subHeader
                  subHeaderComponent={
                    <div className="d-flex items-center border-1 px-lg-3 py-lg-2 rounded">
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
            )}
          </div>
          <div className="text-center pt-30">
            © {translate("Copyright MekkaBooking.com")} {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
