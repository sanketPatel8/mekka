"use client";

import { useAuthContext } from "@/app/hooks/useAuthContext";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import PartnerLogin from "@/components/pages/PartnerLogin";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { ClipLoader } from "react-spinners";

export default function Page() {

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Partner Login - MekkaBooking";
    }
  }, []);


  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [Loading, setLoading] = useState(true);


  const {user} = useAuthContext();


  const router = useRouter();
  useEffect(()=>{
    if(user){
      router.push("/vendor/dashboard")

      setTimeout(()=> {

        setLoading(false)
      },[2000])
    }else{
      router.push("/partner-login")
      setTimeout(()=> {

        setLoading(false)
      },[1000])
    }
    
  },[user,Loading])

  return (
    <>
      <main>
      {
      Loading ?
      <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "500px" }}
    >
      <ClipLoader color="#DAC04F" size={50} />
    </div>
       :
       <>
        <Header1  />
        <PartnerLogin onLoginSuccess={handleLoginSuccess} />
       </>
      }
        <FooterTwo />
      </main>
    </>
  );
}
