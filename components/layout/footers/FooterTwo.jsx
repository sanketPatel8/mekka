"use client"
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

export default function FooterTwo() {
  const {translate} = useTranslation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const handleEmailchange = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  }
  const validate = () => {
    let tempErrors = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      tempErrors.email = 'Invalid email address';

    }

    return tempErrors;
};
  const handleClick = async(e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return;
    }

    if(!email){
      showErrorToast("Email is required");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    console.log(formData,"formData");

    const response = await POST.request({form: formData, url: "newsemail"});
    console.log(response,"response");

    if(response){
      showSuccessToast(response.message);
      setEmail("");
    }else{
      showErrorToast("Email has not been added");
      setEmail("");
    }
    
    
  }
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
                    <div className="text-20 fw-500">
                      {translate("Speak to our expert at")}
                      <span className="text-accent-1"> +49 (0)6196 204 72 40</span>
                   
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-auto">
                <div className="footerSocials">
                  <div className="footerSocials__title">Follow Us</div>

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
                <h4 className="text-20 fw-500">Contact</h4>

                <div className="y-gap-10 mt-20">
                  
                 <div className="footer-flex">
                 <FaPhoneFlip color="white" className="mx-2"/>
                 <a className="d-block" href="#">
                  +49 (0)6196 204 72 40
                  </a>
                 </div>

                 <div className="footer-flex">
                 <MdEmail color="white" className="mx-2"/>
                 <a className="d-block" href="#">
                 info@mekkabooking.com
                  </a>
                 </div>

                 <div className="footer-flex-item-top ">
                 <FaLocationDot color="white" className="mx-2 "/>
                 <p className="d-block" href="#">
                  Mekka Booking GmbH <br /> Frankfurter Str. 92 <br /> 65760 Eschborn
                  </p>
                 </div>
                  
                 
                </div>
              </div>

              <FooterLinks />

              <div className="col-lg-3 col-md-6">
                <h4 className="text-20 fw-500">Newsletter</h4>
                <p className="mt-20">
                  {translate("Subscribe to the free newsletter and stay up to date")}
                </p>

                <div className="footer__newsletter" style={{background:"white",borderRadius:"16px"}}>
                  <input type="email" placeholder="Your email address" value={email} onChange={handleEmailchange}  name="email" style={{width:"75%"}}/>
                  <button type="button" onClick={handleClick}>{translate("Send")}</button>
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
              <div>© Copyright MekkaBookings {new Date().getFullYear()}</div>
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
