"use client";

import Useauthredirect from "@/app/hooks/useAuthRedirect";
import Image from "next/image";
import { useEffect, useState } from "react";
import Language from "../layout/components/Langauge";
import { useTranslation } from "@/app/context/TranslationContext";
import Currency from "../layout/components/Currency";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { useAuthContext } from "@/app/hooks/useAuthContext";

export default function Header({ setSideBarOpen, vendorHeader }) {
  // const { handleRedirect } = Useauthredirect();
  // useEffect(() => {
  //   handleRedirect();
  // }, []);
  const [locale, setLocale] = useState("DE"); // default locale
  const {user} = useAuthContext();
  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key.trim()] = value;
      return acc;
    }, {});
    if (cookies.locale) {
      setLocale(cookies.locale);
    }
  }, []);

  const [currenyLocale, setCurrencyLocale] = useState("Euro");

  const { translate } = useTranslation(locale);

  return (
    <div className="dashboard__content_header">
      <div className="d-flex items-center">
        <div className="mr-60">
          <button
            onClick={() => setSideBarOpen((pre) => !pre)}
            className="d-flex js-toggle-db-sidebar"
          >
            <i className="icon-main-menu text-20"></i>
          </button>
        </div>
        {/* 
        <div className="dashboard__content_header_search d-flex items-center py-5 px-20 rounded-200 border-1 md:d-none">
          <i className="icon-search text-18 mr-10"></i>
          <input type="text" placeholder="Search" />
        </div> */}
      </div>

      <div>
        {user?.user?.agency_name && 
        <div className="flex align-items-center" style={{gap:"0.5rem"}}>
          <PiBuildingApartmentFill
            color="#dabf4f"
            className=""
            size={20}
          />
          <div className="">{user?.user?.agency_name}</div>
        </div>
        }
        <div>
          <Language
            parentClass="headerDropdown"
            onLocaleChange={setLocale}
            locale={locale}
          />
        </div>
        {/* <div>
        <Currency currenyLocale={currenyLocale} />
        </div> */}

        {/* <div className="rounded-circle">
          <Image
            width={40}
            height={40}
            src="/img/dashboard/header/1.jpg"
            alt="image"
            className="rounded-circle"
          />
        </div> */}
      </div>
    </div>
  );
}
