"use client";

import { useAuthContext } from "@/app/hooks/useAuthContext";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Login from "@/components/pages/Login";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

export default function Page() {
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [Loading, setLoading] = useState(true);


  const {customer} = useAuthContext();

  const router = useRouter();
  useEffect(()=>{
    if(customer){
      router.push("/customer/booking")

      setTimeout(()=> {

        setLoading(false)
      },[2000])
    }else{
      router.push("/login")
      setTimeout(()=> {

        setLoading(false)
      },[1000])
    }
    
  },[customer,Loading])

  return (
    <>
      <ToastContainer/>
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
       
       <Header1 />
       <Login
         onLoginSuccess={handleLoginSuccess}
         classfor={`col-xl-6 col-lg-7 col-md-9`}
         sectionClass={`mt-header layout-pt-lg`}
         hide={true}
         path={`/customer/booking`}
         Loading = {Loading}
       />
       </>
  
  }
    
    
        <FooterTwo />
      </main>
    </>
  );
}
