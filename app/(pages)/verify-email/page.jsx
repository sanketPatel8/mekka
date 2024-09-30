"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";

export default function Page() {
  const { translate } = useTranslation();



  return (
    <>
      <main>
        <Header1 />
        <section className="mt-header layout-pt-lg layout-pb-lg">
          <div className="container">
            <div className="row justify-center">
              <div className="col-xl-10 col-lg-7 col-md-9">
                <div className="d-flex justify-content-center align-items-center flex-column mb-60 md:mb-30">
                  <h2 className="text-center">
                    {translate(
                      "Thank you for registering with MekkaBooking.com"
                    )}
                  </h2>
                  <div className="text-18 fw-500 mt-20 md:mt-15 text-center">
                    {translate(
                      "We have sent an email to your registered email id. Please verify your email address before login your account. Please check your spam/junk folder incase you did not see the email."
                    )}
                  </div>
                  <Link
                    className="button -md -info-2 bg-accent-1 text-white  mt-30"
                    href="/login"
                    style={{ width: "fit-content" }}
                  >
                    {translate("Resend Email")}{" "}
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
