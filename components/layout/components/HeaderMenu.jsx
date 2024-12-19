import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/app/context/TranslationContext';
import { usePathname, useSearchParams } from 'next/navigation';

const HeaderMenu = ({ translate }) => {
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Get the current search parameters

  return (
    <div className='header-none'>
      <div className="d-flex" style={{ gap: "15px" }}>
        <div>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            {translate("Home")}
          </Link>
        </div>
        <div>
          <Link href="/tour?type=Umrah" className={pathname === "/tour" && searchParams.get("type") === "Umrah" ? "active" : ""}>
            {translate("Umrah")}
          </Link>
        </div>
        <div>
          <Link href="/tour?type=Hajj" className={pathname === "/tour" && searchParams.get("type") === "Hajj" ? "active" : ""}>
            {translate("Hajj")}
          </Link>
        </div>
        <div>
          <Link href="/tour?type=Kultur Reisen" className={pathname === "/tour" && searchParams.get("type") === "Kultur Reisen" ? "active" : ""}>
            {translate("Culture Trip")}
          </Link>
        </div>
        <div>
          <Link href="/blogs" className={pathname === "/blogs" ? "active" : ""}>
            {translate("Blog")}
          </Link>
        </div>
        <div>
          <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
            {translate("Contact")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;