"use client";

import Useauthredirect from "@/app/hooks/useAuthRedirect";
import Image from "next/image";
import { useEffect } from "react";
import Language from "../layout/components/Langauge";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Header({ setSideBarOpen }) {
  const {handleRedirect} = Useauthredirect();
  useEffect(() => {
    handleRedirect();
  }, []);
  const { translate } = useTranslation();

  const locale = "DE"; 

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
        <div>
          <Language  parentClass="headerDropdown" onLocaleChange={() => {}} locale={locale} />
        </div>

        

        <div className="rounded-circle">
          <Image
            width={40}
            height={40}
            src="/img/dashboard/header/1.jpg"
            alt="image"
            className="rounded-circle"
          />
        </div>
      </div>
    </div>
  );
}
