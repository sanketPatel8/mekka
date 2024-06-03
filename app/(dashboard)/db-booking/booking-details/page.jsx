"use client";

import React, { useState } from "react";
import States from "@/components/dasboard/main/States";
// import Activities from "./Activities";
// import Statistics from "./Statistics";
import Header from "@/components/dasboard/Header";
// import Header from "../Header";
// import CustomerDBsideBar from "../CustomerDBsideBar";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";
import CustomerDetaTable from "@/components/dasboard/CustomerDetaTable";

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
            {/* <p className="text-30 text-center">Customer - Details</p> */}

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
