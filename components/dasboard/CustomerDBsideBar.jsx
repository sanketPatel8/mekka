"use client";

import { sidebarItemsCustomerDB } from "@/data/dashboard";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { showErrorToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "@/app/context/TranslationContext";
import { useAuthContext } from "@/app/hooks/useAuthContext";

const CustomerDBsideBar = ({ setSideBarOpen }) => {
  const pathname = usePathname();
 const Key = process.env.NEXT_PUBLIC_ACCESS_KEY
 const { dispatch} = useAuthContext();

  const handleCloseSidebar = () => {
    setSideBarOpen(false);
  };

  const handleLogoutAndCloseSidebar = async () => {
    localStorage.setItem("CustomerLoginCheck", JSON.stringify(false));
    localStorage.removeItem("customer");

    dispatch({type: "LOGOUT_CUSTOMER"});

  }

  const {translate} = useTranslation()
    

  return (
    <div className="dashboard__sidebar js-dashboard-sidebar bg-light-3 text-dark">
      <div className="dashboard__sidebar_header">
        <span
          onClick={handleCloseSidebar}
          className="closeSidebar"
        >
          &times;
        </span>
        <Link href={"/"}>
          <Image
            width="167"
            height="32"
            src="/img/logo/mekkabooking FINAL.png"
            alt="logo icon"
            priority
          />
        </Link>
      </div>

      <div className="sidebar -dashboard text-black">
        {sidebarItemsCustomerDB.map((elm, i) => (
          <div
            key={i}
            className={`sidebar__item ${
              pathname === elm.href ? "-is-active" : ""
            } `}
          >
            <Link href={elm.href}  onClick={elm.label === "Logout" ? handleLogoutAndCloseSidebar : ""}>
              <i className={elm.iconClass}></i>
              <span className="ml-10">{translate(elm.label)}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDBsideBar;
