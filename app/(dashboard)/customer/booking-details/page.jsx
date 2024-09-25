"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/dasboard/Header";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";
import { useSearchParams } from "next/navigation";
import { POST } from "@/app/utils/api/post";

// Dynamically import CustomerDetaTable with client-side only rendering
const CustomerDetaTable = dynamic(
  () => import("@/components/dasboard/CustomerDetaTable"),
  { ssr: false }
);

export default function CustomerDb() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [BookingDetails, setBookingDetails] = useState([]);

  const searchParams = useSearchParams();
  const Tourid = searchParams.get("id");
  const CustomerID = searchParams.get("customerID");

  console.log(Tourid, CustomerID);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const formData = new FormData();

      formData.append("user_id", CustomerID);
      formData.append("id", Tourid);

      try {
        const response = await POST.request({
          form: formData,
          url: "booking_details",
        });
        setBookingDetails(response?.Bookings);
      } catch (e) {
        console.log(e);
      }
    };

    fetchBookingDetails();
  }, [Tourid, CustomerID]);

  console.log("BookingDetails", BookingDetails);

  return (
    <div
      className={`dashboard ${
        sideBarOpen ? "-is-sidebar-visible" : ""
      } js-dashboard`}
    >
      <CustomerDBsideBar setSideBarOpen={setSideBarOpen} />

      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content_content">
          <CustomerDetaTable BookingDetails={BookingDetails} CustomerID={CustomerID} />

          <div className="text-center pt-30">
            © Copyright MekkaBooking.com {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
