import { useTranslation } from "@/app/context/TranslationContext";
import Image from "next/image";
import React from "react";

export default function BannerOne() {
  const { translate } = useTranslation();
  return (
    <section className="cta -type-1 banner-one-main-pt-30 pt-10 border-1">
      <div className="cta__bg">
        <Image width={1920} height={300} src="/img/cta/1/Frame 3.jpg" alt="image" className="full_width"/>
      </div>

      <div className="container">
        <div className="row justify-between">
          <div className="col-xl-5 col-lg-6">
            <div className="cta__content">
              <h2
                data-aos="fade-up"
                data-aos-delay=""
                className="text-40 md:text-24 lh-13 text-white text-left md:text-center lg:text-center xl:text-center"
              >
               {translate("Get 10% off your 1st") || "Find Latest Packages"}
                <br className="lg:d-none" />
                {translate("booking") || "Find Latest Packages"}
              </h2>

              <p
                data-aos="fade-up"
                data-aos-delay=""
                className="mt-10  text-left md:text-center lg:text-center xl:text-center text-white "
              >
                {translate("To get a discount enter your email address and you will") || "Find Latest Packages"}
                <br className="lg:d-none" />
                {translate("get code on your email") || "Find Latest Packages"}
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay=""
                className="text-18  mt-40 md:mt-20 text-left md:text-center lg:text-center xl:text-center text-white "
                >
                {translate("Get a magic link sent to your email") || "Find Latest Packages"}
              </div>

              <div className="mt-10">
                <div className="singleInput -type-2 row x-gap-10 y-gap-10">
                  <div className="col-md-auto col-12">
                    <input type="email" placeholder="Email" className="" />
                  </div>
                  <div className="col-md-auto col-12">
                    <button
                      data-aos="fade-right"
                      data-aos-delay=""
                      className="button -md -accent-1 bg-white col-12 text-accent-2"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 pt-3 ">
            <div className="cta__image">
              <Image
                width={667}
                height={500}
                src="/img/cta/1/mobile.png"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
