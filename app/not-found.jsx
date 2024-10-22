
"use client"

import Header1 from "@/components/layout/header/Header1";
import Image from "next/image";
import React, { useEffect } from "react";
import FooterTwo from "@/components/layout/footers/FooterTwo";


export default function NotFound() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "404 - MekkaBooking";
    }
  }, []);
  return (
    <>
      <main>
        <Header1 />
        <section className="nopage mt-header">
          <div className="container">
            <div className="row y-gap-30 justify-between items-center">
              <div className="col-xl-6 col-lg-6">
                <Image
                  width="629"
                  height="481"
                  src="/img/404/1.svg"
                  alt="image"
                />
              </div>

              <div className="col-xl-5 col-lg-6">
                <div className="nopage__content pr-30 lg:pr-0">
                  <h1>
                    40<span className="text-accent-1">4</span>
                  </h1>
                  <h2 className="text-30 md:text-24 fw-700">
                    Oops! It looks like you're lost.
                  </h2>
                  <p>
                    The page you're looking for isn't available. Try to search
                    again or use the go to.
                  </p>

                  <button className="button -md -info-2 bg-accent-1 text-white mt-25">
                    Go back to homepage
                    <i className="icon-arrow-top-right ml-10"></i>
                  </button>
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
