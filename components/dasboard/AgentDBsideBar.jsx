"use client";

import { sidebarItemsAgentDB } from "@/data/dashboard";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AgentDBsideBar = ({ setSideBarOpen }) => {
  const pathname = usePathname();
  const user = typeof window != 'undefined' ? JSON.parse(localStorage.getItem("user")) : '';
  const customer = typeof window != 'undefined' ? JSON.parse(localStorage.getItem("customer")) : '';

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