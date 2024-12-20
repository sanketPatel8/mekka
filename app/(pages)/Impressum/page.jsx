"use client"
import React, { useEffect } from 'react'
import { FaRegClipboard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCurtainsClosed } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import Header1 from '@/components/layout/header/Header1';
import FooterOne from '@/components/layout/footers/FooterOne';
import FooterTwo from '@/components/layout/footers/FooterTwo';
import { useTranslation } from '@/app/context/TranslationContext';


const Impressum = () => {
  const { translate } = useTranslation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Impressum - MekkaBooking";
    }
  }, []);
  return (
    <>
      <Header1 />
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <h1>{translate("Imprint")}</h1>

        <p className="text-center">{translate("Liability and data protection information")}</p>

        <div className="d-flex flex-wrap flex-row justify-content-center ">
          <div className='width_responsive'>
            <div
              className="d-flex gap-4 align-items-center  py-3 m-3 "
              style={{ border: "2px solid black" }}
            >
              <div className="mx-3">
                <FaRegClipboard size={50} />
              </div>
              <div>
                <p>
                  <b>{translate("Tax Number")}</b>
                </p>
                <p>043 239 18079</p>
              </div>
            </div>
            <div
              className="d-flex flex-row gap-4 align-items-center p-3 m-3"
              style={{ border: "2px solid black" }}
            >
              <div className="mx-3">
                <FaPhoneAlt size={50} />
              </div>
              <div>
                <p>
                  <b>{translate("Phone")}</b>
                </p>
                <p>+49 (0) 6196 204 72 40</p>
              </div>
            </div>
            <div
              className="d-flex flex-row gap-4 align-items-center p-3 m-3"
              style={{ border: "2px solid black" }}
            >
              <div className="mx-3">
                <IoLocationOutline size={50} />
              </div>
              <div>
                <p>
                  <b>{translate("Name and Adress")}</b>
                </p>
                <p>
                  Mekka Booking GmbH <br /> Frankfurter Str. 92 <br />
                  65760 Eschborn
                </p>
              </div>
            </div>
          </div>
          <div>
            <div
              className="d-flex flex-row gap-4 align-items-center p-3 m-3"
              style={{ border: "2px solid black" }}
            >
              <div className="mx-3">
                <MdOutlineCurtainsClosed size={50} />
              </div>
              <div>
                <p>
                  <b>{translate("District Court Frankfurt am Main")}</b>
                </p>
                <p>HRB: 116404</p>
              </div>
            </div>
            <div
              className="d-flex flex-row gap-4 align-items-center p-3 m-3"
              style={{ border: "2px solid black" }}
            >
              <div className="mx-3">
                <FaUserTie size={50} />
              </div>
              <div>
                <p>
                  <b>{translate('Chairman')}</b>
                </p>
                <p>Kagan Kahraman</p>
              </div>
            </div>
          </div>
        </div>

        <p>
        {translate("By using the website and the contact form of the provider www.mekkabooking.de, no contractual relationship is established between the user and the provider.")}
        </p>
        <br />

        <p>
        {translate("If you provide us with personal data, we will treat it with care and in accordance with data protection regulations. We are of course at your disposal for questions and suggestions.")}
        </p>
        <br />

        <p>
        {translate("Your data will not be shared with third parties. If you have expressly agreed, we will use your data to inform you about new products and innovations in the future. You can withdraw your consent to this at any time. You have the option to query the data stored about you free of charge and to have it changed or deleted.")}


        </p>
        <br />

        <p>
        {translate("Trademarks and brands are usually not identified as such. The lack of such labeling does not mean that it is a free name in the sense of trademark and trademark law.")}
        </p>
        <br />

        <p>
        {translate("The information on this website has been carefully checked and is updated regularly. There is no guarantee of completeness, correctness, and timeliness. All information can be removed or changed at any time without prior notice.")}
        </p>
        <br />

        <p>
        {translate("Despite careful control of the content, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content")}
        </p>
        <br />

        <p>
        {translate("All texts, illustrations and photos are the intellectual property of www.mekkabooking.de and may not be copied or reproduced.")}
        </p>
        <br />
      </div>
      <FooterTwo />
    </>
  );
};

export default Impressum;
