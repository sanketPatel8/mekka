"use client";

import { useEffect, useState } from "react";
import HeaderSerch from "../components/HeaderSerch";
import Destinations from "../components/Destinations";
import Activities from "../components/Activities";
import Currency from "../components/Currency";
import MobileMenu from "../components/MobileMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Header1() {

  const router = useRouter();
  const pageNavigate = (pageName) => {
    router.push(pageName);
  };
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

  return (
    <>
      <header
        className={`header -type-1 js-header ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container container">
          <div className="headerMobile__left">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn js-menu-button"
            >
              <i className="icon-main-menu"></i>
            </button>
          </div>

          <div className="header__logo">
            <Link href="/" className="header__logo mx-3">
              <Image
                width="167"
                height="32"
                src="/img/general/logo-1.png"
                alt="logo icon"
                priority
              />
            </Link>
            <Link href="/" className="ml-10 mx-3 d-none d-lg-block">
                Home
              </Link>
              <Link href="/tour-list-1" className="ml-10 mx-3 d-none d-lg-block">
                tour
              </Link>
              <Link href="/tour-single-4/3" className="ml-10 mx-3 d-none d-lg-block">
                singleTour
              </Link>
              <Link href="/booking-pages" className="ml-10 mx-3 d-none d-lg-block">
                BookingTour
              </Link>
              <Link href="/db-main" className="ml-10 mx-3 d-none d-lg-block">
                Dashboard
              </Link>
              <Link href="/contact" className="ml-10 mx-3 d-none d-lg-block">
                Contect
              </Link>
           
          </div>

          <div className="headerMobile__right">
            <button
              onClick={() => pageNavigate("/tour-list-1")}
              className="d-flex"
            >
              <i className="icon-search text-18"></i>
            </button>

            <button
              onClick={() => pageNavigate("/login")}
              className="d-flex ml-20"
            >
              <i className="icon-person text-18"></i>
            </button>
          </div>

          <div className="header__right">
          <div className="xl:d-none ml-10">
              <HeaderSerch />
            </div>
            
            <Currency />

            <Link href="/register" className="ml-10">Sign up</Link>

            <Link href="/login" className="button -sm -dark-1 bg-accent-1 rounded-200 text-white ml-20">Log in</Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="header__menuBtn ml-30 js-menu-button d-block d-sm-none"
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
