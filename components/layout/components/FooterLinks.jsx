
"use client"
import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function FooterLinks() {
  const { translate } = useTranslation();

  const [sections, setSections] = useState([]);

  useEffect(() => {
    const newSections = [
      {
        title:`${translate("Company")}`,
        links: [
          { id: 1, text: `${translate("Contact")}`, href: "/contact" },
          { id: 2, text: `${translate("Login")}`, href: "/login" },
          { id: 3, text: `${translate("Sign Up")}`, href: "/register" },
          { id: 4, text: `${translate("Partners")}`, href: "/partner" },
          { id: 4, text: `${translate("Partners Login")}`, href: "/partner-login" },
          { id: 5, text: `${translate("My Account")}`, href: "/vendor/dashboard" },
        ],
      },
      {
        title:`${translate("Support")}`,
        links: [
          { id: 9, text:`${translate("Terms of Use")}`, href: "/Terms-of-Use" },
          { id: 10, text:`${translate("Imprint")}`, href: "/Impressum" },
          { id: 11, text:`${translate("Data Protection")}`, href: "/Datenschutz" },
          { id: 12, text:`${translate("Cookie Policy")}` , href: "/cookie-richtline" },
        ],
      },
    ];
    setSections(newSections);
  },[sections]);

  return (
    <>
      {sections.map((elm, i) => (
        <div key={i} className="col-lg-auto col-6">
          <h4 className="text-20 fw-500">{elm.title}</h4>

          <div className="y-gap-10 mt-20">
            {elm.links.map((elm2, i2) => (
              <Link key={i2} className="d-block fw-500" href={elm2.href}>
                {elm2.text}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
