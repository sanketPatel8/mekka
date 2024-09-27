"use client";

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Login from "@/components/pages/Login";
import React, { useState, useEffect, useContext } from "react";

export default function Page() {
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <main>
        <Header1 />
        <Login
          onLoginSuccess={handleLoginSuccess}
          classfor={`col-xl-6 col-lg-7 col-md-9`}
          sectionClass={`mt-header layout-pt-lg`}
          hide={true}
        />
        <FooterTwo />
      </main>
    </>
  );
}
