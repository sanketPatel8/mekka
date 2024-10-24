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
import { MdOutlinePersonAddAlt } from "react-icons/md";
import DashboardCustomer from "../components/DashboardCustomer";
import { useAuthContext } from "@/app/hooks/useAuthContext";



export default function Header1() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [LoginCheck, setLoginCheck] = useState(false);
  const {dispatch} = useAuthContext();
  
  const handleLogoutClick = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("customer");
      localStorage.setItem("CustomerLoginCheck", JSON.stringify(false));
    }
    dispatch({ type: "LOGOUT_CUSTOMER" });

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

          <Link href="/" className="header__logo mx-2">
              <Image
                width="167"
                height="80"
                src="/img/general/logo-1.png"
                alt="logo icon"
                priority
              />
            </Link>

          <div className="header__logo">
           
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
            {LoginCheck ? (
              <DashboardCustomer
                onLocaleChange={setLocale}
                handleLogoutClick={handleLogoutClick}
                
              />
            ) : (
              <>
                <button
                  onClick={() => router.push("/register")}
                  className="d-flex items-center"
                >
                  <span>{translate("Register")}</span>
                  {/* <MdOutlinePersonAddAlt size={25} /> */}
                </button>

                <button
                  onClick={LoginCheck ? handleLogoutClick : handleLoginClick}
                  className="d-flex ml-10 items-center"
                >
                  <i className="icon-person text-18"></i>
                </button>
              </>
            )}
          </div>

          <div className="header__right">
            <div className="xl:d-none ml-10">
              <HeaderSerch />
            </div>

            <div className="row items-center">
              <div className={`${!LoginCheck ? "col-2" : "col-3"}`}>
                <div className="d-flex justify-content-center">
                  <Currency currenyLocale={currenyLocale} />
                </div>
              </div>

              <div className={`${!LoginCheck ? "col-2 ml-10" : "col-3 ml-20"}`}>
                <div className="d-flex justify-content-center">
                  <Language
                    parentClass="headerDropdown"
                    onLocaleChange={setLocale}
                    locale={locale}
                  />
                </div>
              </div>

              {/* <div className="col-3">
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
              </div> */}

              {LoginCheck ? (
                <>
                  {/* Reverse order for when logged in */}

                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <DashboardCustomer
                        onLocaleChange={setLocale}
                        handleLogoutClick={handleLogoutClick}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Default order for when not logged in */}
                  <div className="col-3">
                    <div className="d-flex justify-content-center">
                      <Link href="/register" className={`mx-2`}>
                        {translate("Register")}
                      </Link>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <button
                        className="button -sm -info-2 bg-accent-1 rounded-200 text-white ml-10"
                        onClick={handleLoginClick}
                      >
                        {translate("Log In")}
                      </button>
                    </div>
                  </div>
                </>
              )}
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
        currenyLocale={currenyLocale}
        parentClass="headerDropdown"
        onLocaleChange={setLocale}
        locale={locale}
      />
    </>
  );
}
