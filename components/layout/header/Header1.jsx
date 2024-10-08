"use client";

import { useState, useEffect } from "react";
import HeaderSerch from "../components/HeaderSerch";
import MobileMenu from "../components/MobileMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Language from "../components/Langauge";
import { useTranslation } from "@/app/context/TranslationContext";
import Currency from "../components/Currency";
import { FaUserPlus, FaUser } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import DashboardCustomer from "../components/DashboardCustomer";

export default function Header1() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [LoginCheck, setLoginCheck] = useState(false);

  const handleLogoutClick = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("customer");
      localStorage.setItem("CustomerLoginCheck", JSON.stringify(false));
    }
    setLoginCheck(false);
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const [locale, setLocale] = useState("DE");
  const [currenyLocale, setCurrencyLocale] = useState("Euro");

  useEffect(() => {
    // Get cookies to set the locale
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key.trim()] = value;
      return acc;
    }, {});

    if (cookies.locale) {
      setLocale(cookies.locale);
    }

    // Get the login status from localStorage
    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("CustomerLoginCheck");

      if (loginStatus !== null && loginStatus !== "undefined") {
        try {
          setLoginCheck(JSON.parse(loginStatus));
        } catch (error) {
          console.error("Error parsing login status:", error);
        }
      }
    }
  }, []);

  const { translate } = useTranslation(locale);

  return (
    <>
      <header
        className={`header -type-1 js-header ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container container px-0">
          <div className="headerMobile__left">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button>
          </div>

          <div className="header__logo">
            <Link href="/" className="header__logo mx-2">
              <Image
                width="167"
                height="32"
                src="/img/general/logo-1.png"
                alt="logo icon"
                priority
              />
            </Link>
            <div className="media">
              <Link href="/" className="mx-3">
                {translate("Home")}
              </Link>
              <Link href="/tour" className="mx-3">
                {translate("Tour")}
              </Link>
              <Link href="/tour?type=Hajj" className="mx-3">
                {translate("Hajj")}
              </Link>
              <Link href="/tour?type=Umrah" className="mx-3">
                {translate("Umrah")}
              </Link>

              <Link href="/contact" className="mx-3">
                {translate("Contact")}
              </Link>
            </div>
          </div>

          <div className="headerMobile__right">
            <button onClick={() => router.push("/tour")} className="d-flex">
              <i className="icon-search text-18"></i>
            </button>

            <button
              onClick={LoginCheck ? handleLogoutClick : handleLoginClick}
              className="d-flex ml-10"
            >
              <i className="icon-person text-18"></i>
            </button>
          </div>

          <div className="header__right">
            <div className="xl:d-none ml-10">
              <HeaderSerch />
            </div>

            <div className="row items-center">
              <div className="col-2 ">
                <div className="d-flex justify-content-center">
                  <Currency currenyLocale={currenyLocale} />
                </div>
              </div>

              <div className="col-2 ml-10">
                <div className="d-flex justify-content-center">
                  <Language
                    parentClass="headerDropdown"
                    onLocaleChange={setLocale}
                    locale={locale}
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="d-flex justify-content-center">
                  <Link href={LoginCheck ? "" : "/register"} className={`mx-2`}>
                    {LoginCheck ? (
                      <DashboardCustomer
                        onLocaleChange={setLocale}
                        handleLogoutClick={handleLogoutClick}
                      />
                    ) : (
                      translate("Register")
                    )}
                  </Link>
                </div>
              </div>

              <div className="col-4">
                <div className="d-flex justify-content-center">
                  {LoginCheck !== null && (
                    <>
                      {!LoginCheck && (
                        <button
                          className="button -sm -info-2 bg-accent-1 rounded-200 text-white ml-10"
                          onClick={handleLoginClick}
                        >
                          {translate("Log In")}
                        </button>
                      )}

                      {LoginCheck && (
                        <button
                          className="button -sm -info-2 bg-accent-1 rounded-200 text-white ml-10"
                          onClick={handleLogoutClick}
                        >
                          {translate('Log Out')}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn ml-30 js-menu-button"
              id="menuhide"
            >
              <i className="icon-main-menu"></i>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
    </>
  );
}
