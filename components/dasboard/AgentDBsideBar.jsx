"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const AgentDBsideBar = ({ setSideBarOpen }) => {
  const pathname = usePathname();
  const { translate } = useTranslation();
  console.log(translate("Dashboard"), "translate");
  const user = typeof window != 'undefined' ? JSON.parse(localStorage.getItem("user")) : '';
  const customer = typeof window != 'undefined' ? JSON.parse(localStorage.getItem("customer")) : '';
  const [sidebarItemsAgentDB, setSidebarItemsAgentDB] = useState([]);

  useEffect(() => {
    const translatedSidebarItems = [
      {
        id: 1,
        href: "/vendor/dashboard",
        iconClass: "icon-dashboard text-26",
        label: translate("Dashboard"),
      },
      {
        id: 2,
        href: "/vendor/booking",
        iconClass: "icon-calendar text-26",
        label: translate("Bookings"),
      },
      {
        id: 3,
        href: "/vendor/listing",
        iconClass: "icon-menu text-26",
        label: translate("My Listings"),
      },
      {
        id: 4,
        href: "/vendor/add-tour",
        iconClass: "icon-clipboard text-26",
        label: translate("Add Tour"),
      },
      {
        id: 5,
        href: "/vendor/profile",
        iconClass: "icon-account text-26",
        label: translate("My Profile"),
      },
      {
        id: 6,
        href: "/vendor/payment-history",
        iconClass: "icon-payment text-26",
        label: translate("Payment History"),
      },
      { id: 7, iconClass: "icon-logout text-26", label: translate("Logout") },
    ];
    setSidebarItemsAgentDB(translatedSidebarItems);
  }, [translate]);
  const handleLogout = () => {
    // Add your logout logic here, e.g. calling an API to log out the user
    // Redirect to the login page or a landing page
    if(typeof window != 'undefined' && user){

      localStorage.removeItem("user");
    window.location.href = "/partner-login";
    }
  };

  return (
    <div>
      <div className="dashboard__sidebar js-dashboard-sidebar bg-light-3 text-dark">
        <div className="dashboard__sidebar_header">
          <span
            onClick={() => setSideBarOpen(false)}
            className="closeSidebar"
          >
            &times;
          </span>
          <Link href={"/"}>
            <Image
              width="167"
              height="32"
              src="/img/general/logo-1.png"
              alt="logo icon"
              priority
            />
          </Link>
        </div>

        <div className="sidebar -dashboard text-black">
          {sidebarItemsAgentDB.map((elm, i) => (
            <div
              key={i}
              className={`sidebar__item ${pathname == elm.href ? "-is-active" : ""
                } `}
            >
              {elm.label === "Logout" ? (
                <a onClick={handleLogout}>
                  <i className={elm.iconClass}></i>
                  <span className="ml-10">{elm.label}</span>
                </a>
              ) : (
                <Link href={elm.href}>
                  <i className={elm.iconClass}></i>
                  <span className="ml-10">{elm.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AgentDBsideBar