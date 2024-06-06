"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/dasboard/Header";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";

// Dynamically import CustomerDetaTable with client-side only rendering
const CustomerDetaTable = dynamic(() => import("@/components/dasboard/CustomerDetaTable"), { ssr: false });

export default function CustomerDb() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <CustomerDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <CustomerDetaTable />

            <div className="text-center pt-30">
              © Copyright MekkaBooking.com {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
