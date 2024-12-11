import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/app/context/TranslationContext';
import { useRouter } from 'next/navigation';

const HeaderMenu = ({ translate, activeLink, setActiveLink }) => {

  
  const handleLinkClick = (link) => {
    localStorage.setItem("pathRedirect",link)
  };

  return (
    <div>
      <div className="d-flex" style={{ gap: "15px" }}>
        <div>
          <Link href="/" className={activeLink === "/" ? "active" : ""} onClick={() => handleLinkClick("/")}>
            {translate("Home")}
          </Link>
        </div>
        <div>
          <Link href="/tour?type=Umrah" className={activeLink === "/tour?type=Umrah" ? "active" : ""} onClick={() => handleLinkClick("/tour?type=Umrah")}>
            {translate("Umrah")}
          </Link>
        </div>
        <div>
          <Link href="/tour?type=Hajj" className={activeLink === "/tour?type=Hajj" ? "active" : ""} onClick={() => handleLinkClick("/tour?type=Hajj")}>
            {translate("Hajj")}
          </Link>
        </div>
        <div>
          <Link href="/tour?type=Kultur Reisen" className={activeLink === "/tour?type=Kultur Reisen" ? "active" : ""} onClick={() => handleLinkClick("/tour?type=Kultur Reisen")}>
            {translate("Culture Trip")}
          </Link>
        </div>
        <div>
          <Link href="/blogs" className={activeLink === "/blogs" ? "active" : ""} onClick={() => handleLinkClick("/blogs")}>
            {translate("Blog")}
          </Link>
        </div>
        <div>
          <Link href="/contact" className={activeLink === "/contact" ? "active" : ""} onClick={() => handleLinkClick("/contact")}>
            {translate("Contact")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;