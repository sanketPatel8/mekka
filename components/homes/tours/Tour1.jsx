"use client"

import Stars from "@/components/common/Stars";
import { tourData } from "@/data/tours";
import { useTranslation } from "@/app/context/TranslationContext";
import { FaPersonWalking } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { post } from "@/app/utils/api";


export default function Tour1() {

  const [LatestPackage, setLatestPackage] = useState([])

  console.log( "Latest Package for " , LatestPackage);
  

  useEffect(() => {
    const fetchData = async (id) => { 
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      };
      try {
        const response = await post("latest_tourlist", sendData);
        if (response) {
          setLatestPackage ( response);
        } else {
          console.error("Tours data is undefined in the response.");
        }
      } catch (error) {
        console.error("Error caught:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showErrorToast("Please verify your email");
        } else {
          showErrorToast("An error occurred during registration.");
        }
      }
    };
    fetchData()
  }, []);

  const { translate } = useTranslation();
    
  return (
    <section className="layout-pt-xl layout-pb-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-right"
              data-aos-delay=""
              className="text-30 md:text-24"
            >
              {translate("Find Latest Packages") }
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tour"}
              data-aos="fade-left"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span> {translate("See all") }</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300"
        >
          {LatestPackage?.Tours?.slice(0, 8)?.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6 my-2">
              <Link
                href={`/package/${elm.id}`}
                className="tourCard -type-1 py-10 px-10 border-1 rounded-12  -hover-shadow"
              >
                <div className="tourCard__header">
                  <div className="tourCard__image ratio ratio-28:20">
                    <Image
                      width={421}
                      height={301}
                      src="/_next/image?url=%2Fimg%2FtourCards%2F1%2F13.jpeg&w=1080&q=75"
                      alt="image"
                      className="img-ratio rounded-12"
                    />
                  </div>

                  <button className={`tourCard__favorite ${elm.direct_flight == 0 ? 'd-block' : 'd-none'}`}>Direct Flight</button>
                </div>

                <div className="tourCard__content px-10 pt-10">
                  <div className="tourCard__location d-flex items-center text-13 text-light-2 border_yellow px-2">
                    <FaPersonWalking color="white" size={18} />
                    Zu Kaaba {elm.distance_to_hotel}
                  </div>

                  <h3 className="tourCard__title text-16 fw-500 mt-5">
                    <span>{elm.type} - {elm.name}</span>
                  </h3>

                  <div className="tourCard__rating d-flex items-center text-13 mt-5">
                    <div className="d-flex x-gap-5">
                      <Stars star={elm.rating} />
                      {/* <Stars star="4" /> */}
                    </div>

                    <span className="text-dark-1 ml-10">
                      {elm.rating} ({elm.rating}) - {elm.company_name}
                    </span>
                  </div>
                  <div className="Location">
                    <span>Departure : From {elm.departures}</span>
                  </div>

                  <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                    <div className="d-flex items-center">
                      <i className="icon-clock text-16 mr-5"></i>
                       {elm.days_of_stay}
                    </div>

                    <div>
                       <span className="text-16 fw-500">{elm.tour_price} €</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
