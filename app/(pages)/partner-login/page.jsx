"use client";

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import PartnerLogin from "@/components/pages/PartnerLogin";
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
        <Header1  />
        <PartnerLogin onLoginSuccess={handleLoginSuccess} />
        <FooterTwo />
      </main>
    </>
  );
}
