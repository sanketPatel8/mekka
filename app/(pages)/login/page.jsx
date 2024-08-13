"use client";

import Count from "@/app/context/LoginState";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Login from "@/components/pages/Login";
import React, { useState, useEffect, useContext } from "react";

export default function Page() {
    const [LoginPer, setLoginPer] = useContext(Count)

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
        <Login onLoginSuccess={handleLoginSuccess} />
        <FooterTwo />
      </main>
    </>
  );
}
