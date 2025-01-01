import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/app/context/TranslationContext';
import { usePathname, useSearchParams } from 'next/navigation';

const HeaderMenu = ({ translate }) => {
  const pathname = usePathname(); 
  const searchParams = useSearchParams(); 

  return (
    <div className='header-none'>
      <div className="d-flex" style={{ gap: "15px" }}>
        <div>
          <Link href="/" className={pathname === "/" ? "active tab-font-12" : "tab-font-12"}>
            {translate("Home")}
          </Link>
        </div>
        <div>
          <Link href="/tour?Umrahtype=Umrah" className={pathname === "/tour" && searchParams.get("Umrahtype") === "Umrah" ? "active tab-font-12" : "tab-font-12"}>
            {translate("Umrah")}
          </Link>
        </div>
        <div>
          <Link href="/tour?Hajjtype=Hajj" className={pathname === "/tour" && searchParams.get("Hajjtype") === "Hajj" ? "active tab-font-12" : "tab-font-12"}>
            {translate("Hajj")}
          </Link>
        </div>
        <div>
          <Link href="/tour?Culturetype=Culture Trip" className={pathname === "/tour" && searchParams.get("Culturetype") === "Culture Trip" ? "active tab-font-12" : "tab-font-12"}>
            {translate("Culture Trip")}
          </Link>
        </div>
        <div>
          <Link href="/blogs" className={pathname === "/blogs" ? "active tab-font-12" : "tab-font-12"}>
            {translate("Blog")}
          </Link>
        </div>
        <div>
          <Link href="/contact" className={pathname === "/contact" ? "active tab-font-12" : "tab-font-12"}>
            {translate("Contact")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;