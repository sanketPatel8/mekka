"use client";

import { menuData } from "@/data/mobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Currency from "./Currency";
import Language from "./Langauge";
import { useTranslation } from "@/app/context/TranslationContext";

const socialMediaLinks = [
  { id: 1, class: "icon-facebook", href: "#" },
  { id: 2, class: "icon-twitter", href: "#" },
  { id: 3, class: "icon-instagram", href: "#" },
  { id: 4, class: "icon-linkedin", href: "#" },
];

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  currenyLocale,
  parentClass,
  onLocaleChange,
  locale,
}) {
  const [activeSub, setActiveSub] = useState("");
  const pathname = usePathname();

  const {translate} = useTranslation();

  return (    
    <div
      data-aos="fade"
      data-aos-delay=""
      className={`menu js-menu ${mobileMenuOpen ? "-is-active" : ""} `}
      style={
        mobileMenuOpen
          ? { opacity: "1", visibility: "visible" }
          : { pointerEvents: "none", visibility: "hidden" }
      }
    >
      <div
        onClick={() => setMobileMenuOpen(false)}
        className="menu__overlay js-menu-button"
      ></div>

      <div className="menu__container">
        <div className="menu__header">
          <h4>Main Menu</h4>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="js-menu-button"
          >
            <i className="icon-cross text-10"></i>
          </button>
        </div>

        <div className="menu__content">
        

          <ul
            className="menuNav js-navList -is-active"
            style={{ maxHeight: "calc(100vh - 262px)", overflowY: "auto" }}
          >
            {menuData.map((elm, i) => (
              <li className="menuNav__item" key={elm.id}>
                <Link href={elm.href}>{translate(elm.label)}</Link>
              </li>
            ))}
          </ul>

          <hr />
          
          <div className="row">
            <div className="col-6">
              {" "}
              <Currency currenyLocale={currenyLocale} />
            </div>
            <div className="col-6">
              <Language
                parentClass="headerDropdown"
                onLocaleChange={onLocaleChange}
                locale={locale}
              />
            </div>
          </div>
        </div>

        <div className="menu__footer">
          <i className="icon-headphone text-50"></i>

          <div className="text-20 lh-12 fw-500 mt-20">
            <div>Speak to our expert at</div>
            <div className="text-accent-1">+49 (0)6196 204 72 40</div>
          </div>

          <div className="d-flex items-center x-gap-10 pt-30">
            {socialMediaLinks.map((elm, i) => (
              <div key={i}>
                <a href={elm.href} className="d-block">
                  <i className={elm.class}></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
