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
import Useauthredirect from "@/app/hooks/useAuthRedirect";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sidebar() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const { user, dispatch } = useAuthContext();
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Dashboard - MekkaBooking";
    }
  }, []);

  const company_id = user === null ? 0 : user?.user.company_id;


  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams to get query parameters

  useEffect(() => {
    const key = searchParams.get("key"); // Get the 'key' parameter from the URL

    if (key) {
      fetchUser(key); // Pass key to fetchUser 
    }else{
      fetchDetails();
    }
  }, [searchParams]); // Depend on searchParams


  const fetchUser = async (key) => {
    const formData = new FormData();
    formData.append("key", key);
    setLoading(true);
    const response = await POST.request({
      form: formData,
      url: "agent_login",
    });
    if (response) {
      localStorage.setItem("user",JSON.stringify(response));    
      dispatch({ type: "LOGIN", payload: response });
      setLoading(false);
      fetchDetails();
    }   
  }

  const { handleRedirect } = Useauthredirect();
  // useEffect(() => {
  //   handleRedirect();
  //   setLoading(false);
  //   fetchDetails();
  // }, [company_id]);

  const fetchDetails = async () => {
    const formData = new FormData();
    formData.append("company_id", company_id);
    setLoading(true);
    const response = await POST.request({
      form: formData,
      url: "vendor_dashboard",
    });
    if (response) {
      setData(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    
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
  }, []);

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
            <h1 className="text-30"> {translate("Dashboard")}</h1>  
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <ClipLoader color="#DAC04F" size={50} />
              </div>
            ) : (
              <>
                <States data={data} loading={loading} />

                <div className="row pt-30 mt-20 y-gap-30">
                  <Statistics data={data} />

                  
                </div>
              </>
            )}

            <div className="text-center pt-30">
              © {translate("Copyright MekkaBooking.com")} {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
