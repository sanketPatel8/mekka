"use client";

import { useState, useEffect, useContext } from "react";
import HeaderSerch from "../components/HeaderSerch";
import MobileMenu from "../components/MobileMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Language from "../components/Langauge";
import { useTranslation } from "@/app/context/TranslationContext";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import Currency from "../components/Currency";

export default function Header1({ isLoggedIn }) {
  const router = useRouter();
  const { loginPer, setLoginPer } = useGlobalState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);

  const handleLogoutClick = () => {
    typeof window != "undefined" ? localStorage.removeItem("token") : null;
    LogOutUpdate();
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const LogOutUpdate = () => {
    setLoginPer(false);
  };

  const { translate } = useTranslation();
  const locale = "DE"; 
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
              <Link href="/tour?=Hajj" className="mx-3">
                {translate("Hajj")}
              </Link>
              <Link href="/tour?=Umrah" className="mx-3">
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
              onClick={loginPer ? handleLogoutClick : handleLoginClick}
              className="d-flex ml-10"
            >
              <i className="icon-person text-18"></i>
            </button>
          </div>

          <div className="header__right">
            <div className="xl:d-none ml-10">
              <HeaderSerch />
            </div>

            <div className="d-flex items-center">
              <Currency />

              <Language parentClass="headerDropdown" onLocaleChange={() => {}} locale={locale} />

              <Link
                href="/register"
                className={`ml-5 ${loginPer == true ? "d-none" : "d-block"}`}
              >
                {translate("Register")}
              </Link>

              <button
                className="button -sm -info-2 bg-accent-1 rounded-200 text-white ml-10"
                onClick={loginPer ? handleLogoutClick : handleLoginClick}
              >
                {loginPer === true ? "Log Out" : "Log In"}
              </button>
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
