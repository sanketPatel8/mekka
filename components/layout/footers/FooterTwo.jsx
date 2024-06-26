import React from "react";
import Paymentcards from "../components/Paymentcards";
import FooterLinks from "../components/FooterLinks";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Socials from "../components/Socials";
import Image from "next/image";

export default function FooterTwo() {
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
                      Speak to our expert at
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
                  Subscribe to the free newsletter and stay up to date
                </p>

                <div className="footer__newsletter">
                  <input type="Email" placeholder="Your email address" />
                  <button>Send</button>
                </div>


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
