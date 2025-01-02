"use client";
import React, { useState } from "react";
import Paymentcards from "../components/Paymentcards";
import FooterLinks from "../components/FooterLinks";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Socials from "../components/Socials";
import Image from "next/image";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { POST } from "@/app/utils/api/post";
import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export default function FooterTwo() {
  const { translate } = useTranslation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const handleEmailchange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };
  const validate = () => {
    let tempErrors = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      tempErrors.email = "Invalid email address";
    }

    return tempErrors;
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (!email) {
      showErrorToast(translate, "Email is required");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    const response = await POST.request({ form: formData, url: "newsemail" });
   

    if (response.status === "1") {
      showSuccessToast(translate, "Email successfully added");
      setEmail("");
    } else {
      showErrorToast(translate, "Email already added");
      setEmail("");
    }
  };
  return (
    <footer className="footer -type-1 -dark bg-info-2 text-white">
      <div className="footer__main">
        <div className="footer__bg">
          <Image
            width="1800"
            height="627"
            src="/img/footer/1/bg.svg"
            alt="image"
          />
        </div>

        <div className="container">
          <div className="footer__info">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="row y-gap-20 items-center">
                  <div className="col-auto">
                    <i className="icon-headphone text-50"></i>
                  </div>

                  <div className="col-auto">
                    <div className="text-20 text_16 fw-500 d-flex flex-column gap-2">
                      {" "}
                      {/* Flex column for separate lines */}
                      <span>
                        {translate("Call us!")}{" "}
                        <Link
                          href="tel:+4961962047240"
                          className="text-accent-1"
                          target="_blank"
                        >
                          +49 (0)6196 204 72 40
                        </Link>
                      </span>
                      <span>
                        {translate("Write to us WhatsApp")}{" "}
                        <Link
                          href="https://api.whatsapp.com/send/?phone=4961962047240&text&type=phone_number&app_absent=0"
                          target="_blank"
                        >
                          <IoLogoWhatsapp size={30} color="white" />
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-auto">
                <div className="footerSocials">
                  <div className="footerSocials__title">
                    {translate("Follow Us")}
                  </div>

                  <div className="footerSocials__icons">
                    <Socials />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__content">
            <div className="row y-gap-40 justify-between">
              <div className="col-lg-4 col-md-6">
                <h4 className="text-20 fw-500">{translate("Contact")}</h4>

                <div className="y-gap-10 mt-20">
                  <div className="footer-flex">
                    <FaPhoneFlip color="white" className="mx-2" />
                    <a
                      className="d-block"
                      href="tel:+4961962047240"
                      target="_blank"
                    >
                      +49 (0)6196 204 72 40
                    </a>
                  </div>

                  <div className="footer-flex">
                    <MdEmail color="white" className="mx-2" />
                    <a
                      className="d-block"
                      href="https://outlook.live.com/owa/?path=/mail/action/compose&to=info@mekkabooking.com"
                      target="_blank"
                    >
                      info@mekkabooking.com
                    </a>
                  </div>

                  {/* <div className="footer-flex-item-top ">
                    <FaLocationDot color="white" className="mx-2 " />
                    <p className="d-block" href="#">
                      Mekka Booking GmbH <br /> Frankfurter Str. 92 <br />{" "}
                      Helfmann-Park 8
                    </p>
                  </div> */}
                </div>
              </div>

              <FooterLinks />

              <div className="col-lg-3 col-md-6">
                <h4 className="text-20 fw-500">{translate("Newsletter")}</h4>
                <p className="mt-20">
                  {translate(
                    "Subscribe to our newsletter and don't miss any promotions!"
                  )}
                </p>

                <div
                  className="footer__newsletter"
                  style={{ background: "white", borderRadius: "16px" }}
                >
                  <input
                    type="email"
                    placeholder={`${translate("Your email address")}`}
                    value={email}
                    onChange={handleEmailchange}
                    name="email"
                    style={{ width: "75%" }}
                  />
                  <button type="button" onClick={handleClick}>
                    {translate("Send")}
                  </button>
                </div>
                {errors.email && <div className="text-red">{errors.email}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <div className="row y-gap-5 justify-between items-center">
            <div className="col-auto">
              <div>
                © {new Date().getFullYear()}{" "}
                <Link href="/">mekkabooking.com</Link>{" "}
              </div>
            </div>

            <div className="col-auto">
              <div className="footer__images d-flex items-center x-gap-10">
                <Paymentcards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
