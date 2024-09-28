"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";

export default function Page() {
  const { translate } = useTranslation();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 10000);
  }, []);

  return (
    <>
      <main>
        <Header1 />
        <section className="mt-header layout-pt-lg layout-pb-lg">
          <div className="container">
            <div className="row justify-center">
              <div className="col-xl-8 col-lg-7 col-md-9">
                <div className="d-flex justify-content-center align-items-center flex-column mb-60 md:mb-30">
                  <h1 className="text-center">
                    {translate("Thank you for verifying you email")}
                  </h1>
                  <div className="text-18 fw-500 mt-20 md:mt-15 text-center">
                    {translate(
                      "You can now login and book the tour, manage your account etc.."
                    )}
                  </div>
                  <Link
                    className="button -md -info-2 bg-accent-1 text-white  mt-30"
                    href="/login"
                    style={{ width: "fit-content" }}
                  >
                    {translate("Continue Login")}{" "}
                  </Link>
                  {/* <Link
                    className="button -md -info-2 bg-accent-1 text-white  mt-30"
                    href="/login"
                    style={{ width: "fit-content" }}
                  >
                    {translate("Login")}{" "}
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterTwo />
      </main>
    </>
  );
}
