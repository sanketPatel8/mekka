import Stars from "@/components/common/Stars";
import { tourData } from "@/data/tours";
import { useTranslation } from "@/app/context/TranslationContext";
import { FaPersonWalking } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";


export default function Tour1() {


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
              {translate("Find Latest Packages") || "Find Latest Packages"}
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tourlist"}
              data-aos="fade-left"
              data-aos-delay=""
              className="buttonArrow d-flex items-center "
            >
              <span> {translate("See all") || "Find Latest Packages"}</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row y-gap-30 justify-between pt-40 sm:pt-20 mobile-css-slider -w-300"
        >
          {tourData.map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-6 my-2">
              <Link
                href={`/toursingle/${elm.id}`}
                className="tourCard -type-1 py-10 px-10 border-1 rounded-12  -hover-shadow"
              >
                <div className="tourCard__header">
                  <div className="tourCard__image ratio ratio-28:20">
                    <Image
                      width={421}
                      height={301}
                      src={elm.imageSrc}
                      alt="image"
                      className="img-ratio rounded-12"
                    />
                  </div>

                  <button className="tourCard__favorite">Direct Flight</button>
                </div>

                <div className="tourCard__content px-10 pt-10">
                  <div className="tourCard__location d-flex items-center text-13 text-light-2 border_yellow px-2">
                    {/* <i className="icon-pin d-flex text-16 text-light-2 mr-5"></i> */}
                    <FaPersonWalking color="white" size={18} />
                    {elm.location}
                  </div>

                  <h3 className="tourCard__title text-16 fw-500 mt-5">
                    <span>{elm.title}</span>
                  </h3>

                  <div className="tourCard__rating d-flex items-center text-13 mt-5">
                    <div className="d-flex x-gap-5">
                      <Stars star={elm.rating} />
                    </div>

                    <span className="text-dark-1 ml-10">
                      {elm.rating} ({elm.ratingCount}) - IDEALGATE
                    </span>
                  </div>
                  <div className="Location">
                    <span>Departure : London</span>
                  </div>

                  <div className="d-flex justify-between items-center border-1-top text-13 text-dark-1 pt-10 mt-10">
                    <div className="d-flex items-center">
                      <i className="icon-clock text-16 mr-5"></i>
                      {elm.duration}
                    </div>

                    <div>
                      From <span className="text-16 fw-500">{elm.price} €</span>
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
