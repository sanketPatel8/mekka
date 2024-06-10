"use client";

import { sidebarItems, sidebarItemsCustomerDB } from "@/data/dashboard";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const CustomerDBsideBar = ({ setSideBarOpen }) => {
    const pathname = usePathname();

    // const [setSideBarOpen, setSideBarOpen] = useState(true)
  return (
    <div>
        <div className="dashboard__sidebar js-dashboard-sidebar bg-light-3 text-dark">
      <div className="dashboard__sidebar_header">
        <span
          onClick={() => setSideBarOpen(true)}
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
        {sidebarItemsCustomerDB.map((elm, i) => (
          <div
            key={i}
            className={`sidebar__item ${
              pathname == elm.href ? "-is-active" : ""
            } `}
          >
            <Link href={elm.href}>
              <i className={elm.iconClass}></i>
              <span className="ml-10">{elm.label}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default CustomerDBsideBar