"use client";

import React, { useEffect, useState } from "react";
// import Sidebar from "../Sidebar";
import States from "./States";
import Activities from "./Activities";
import Statistics from "./Statistics";
import Header from "../Header";
// import SidebarAgent from "../SidebarAgent";
import AgentDBsideBar from "../AgentDBsideBar";
import { useTranslation } from "@/app/context/TranslationContext";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
import { ClipLoader } from "react-spinners";

export default function Sidebar() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const {user} = useAuthContext();  

  const company_id = user === null ? 0 : user?.user.company_id;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    const formData = new FormData();
    formData.append("company_id", company_id);
    setLoading(true)
    const response = await POST.request({form:formData, url:"vendor_dashboard"})
    if(response){
      setData(response)
      setLoading(false)
    }
   }

  

  useEffect(() => {
    fetchDetails();
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

    
  }, [company_id]);


  


  const { translate } = useTranslation();
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />
        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30"> {translate("Dashboard") }</h1>
        { loading ?       
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <ClipLoader color="#DAC04F" size={50} />
            </div>
            :
          <>
            <States data={data} loading={loading}/>
            
            <div className="row pt-30 mt-20 y-gap-30">
              <Statistics />

              {/* <div className="col-xl-4 col-lg-12 col-md-6">
                <div className="px-30 py-25 rounded-12 bg-white shadow-2">
                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500"> {translate("Recent Activities") }</div>
                  </div>

                  <Activities />

                  <div className="pt-40">
                    <button className="button -md -outline-accent-1 col-12 text-accent-1">
                       {translate("View More") }
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
            </>
}

            <div className="text-center pt-30">
              © Copyright MekkaBooking.com {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
