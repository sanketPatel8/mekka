"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function BannerOne() {
  const { translate } = useTranslation();

  const [DiscountMail, setDiscountMail] = useState("");

  const handlemailchange = (e) => {
    setDiscountMail(e.target.value);
  };

  const fetchwelcomediscount = async (id) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      email: DiscountMail,
    };

    try {
      const response = await post("welcome_discount", sendData);
      if (response?.Status == 1 && response?.Message) {
        showSuccessToast(response.Message);
        console.log(response.Message);
      } else if (response?.Message) {
        showErrorToast(response.Message);
      }
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("An error occurred during registration.");
    }
  };

  const HandleDiscountClick = () => {
    fetchwelcomediscount();
  };

  return (
    <div className="">
      <ToastContainer />
      <section className="cta -type-1 banner-one-main-pt-30 pt-10 border-1">
        <div className="cta__bg">
          <Image
            width={1920}
            height={300}
            src="/img/cta/1/Frame 3.jpg"
            alt="image"
            className="full_width"
          />
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
                  {translate("Get 10% off your 1st")}
                  <br className="lg:d-none" />
                  {translate("booking")}
                </h2>

                <p
                  data-aos="fade-up"
                  data-aos-delay=""
                  className="mt-10  text-left md:text-center lg:text-center xl:text-center text-white "
                >
                  {translate(
                    "To get a discount enter your email address and you will"
                  )}
                  <br className="lg:d-none" />
                  {translate("get code on your email")}
                </p>

                <div
                  data-aos="fade-up"
                  data-aos-delay=""
                  className="text-18  mt-40 md:mt-20 text-left md:text-center lg:text-center xl:text-center text-white "
                >
                  {translate("Get a magic link sent to your email")}
                </div>

                <div className="mt-10">
                  <div className="singleInput -type-2 row x-gap-10 y-gap-10">
                    <div className="col-md-auto col-12">
                      <input
                        type="email"
                        placeholder="Email"
                        className=""
                        value={DiscountMail}
                        onChange={handlemailchange}
                      />
                    </div>
                    <div className="col-md-auto col-12">
                      <button
                        data-aos="fade-right"
                        data-aos-delay=""
                        className="button -md -accent-1 bg-white col-12 text-accent-2"
                        onClick={HandleDiscountClick}
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
    </div>
  );
}
