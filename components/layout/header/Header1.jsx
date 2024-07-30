"use client";

import { useState, useEffect } from "react";
import HeaderSerch from "../components/HeaderSerch";
import MobileMenu from "../components/MobileMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Language from "../components/Langauge";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Header1() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);

  // Add a class to the element when scrolled 50px
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setAddClass(true);
    } else {
      setAddClass(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { translate } = useTranslation();

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
                
                {translate("Home") || "Find Latest Packages"}
              </Link>
              <Link href="/tourlist" className="mx-3">
                
                {translate("Tour") || "Find Latest Packages"}
              </Link>
              <Link href="/tourlist?=Hajj" className="mx-3">
                
                {translate("Hajj") || "Find Latest Packages"}
              </Link>
              <Link href="/tourlist?=Umrah" className="mx-3">
                
                {translate("Umrah") || "Find Latest Packages"}
              </Link>
              <Link href="/contact" className="mx-3">
                
                {translate("Contact") || "Find Latest Packages"}
              </Link>
            </div>
          </div>

          <div className="headerMobile__right">
            <button onClick={() => router.push("/tourlist")} className="d-flex">
              <i className="icon-search text-18"></i>
            </button>

            <button
              onClick={() => router.push("/login")}
              className="d-flex ml-10"
            >
              <i className="icon-person text-18"></i>
            </button>
          </div>

          <div className="header__right">
            <div className="xl:d-none ml-10">
              <HeaderSerch />
            </div>

            <Language />

            <Link href="/register" className="ml-10">
            {translate("Register") || "Find Latest Packages"}
            </Link>

            <Link
              href="/login"
              className="button -sm -info-2 bg-accent-1 rounded-200 text-white ml-20"
            >
           {translate("Log In") || "Find Latest Packages"}
            </Link>

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
