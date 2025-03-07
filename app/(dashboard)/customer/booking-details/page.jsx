"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";
import { useSearchParams } from "next/navigation";
import { POST } from "@/app/utils/api/post";
import { useTranslation } from "@/app/context/TranslationContext";
import CustomerHeader from "@/components/dasboard/CustomerHeader";

// Dynamically import CustomerDetaTable with client-side only rendering
const CustomerDetaTable = dynamic(
  () => import("@/components/dasboard/CustomerDetaTable"),
  { ssr: false }
);



export default function CustomerDb() {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const {translate} = useTranslation()
 

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Booking Details - MekkaBooking";
    }
  }, []);

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

  return (
    <div
      className={`dashboard ${
        sideBarOpen ? "-is-sidebar-visible" : ""
      } js-dashboard`}
    >
      <CustomerDBsideBar setSideBarOpen={setSideBarOpen} />

      <div className="dashboard__content">
        <CustomerHeader setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content_content">
          <CustomerDetaTable />

          <div className="text-center pt-30">
            © {translate("Copyright MekkaBooking.com")} {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
