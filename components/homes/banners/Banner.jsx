import Image from "next/image";
import Link from "next/link";
import React from "react";
import TourSliderTwo from "../tours/TourSliderTwo";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Banner() {
  const { translate } = useTranslation();
  return (
    <section className="cta -type-3">
      <div className="cta__bg">
        <Image width={1530} height={100} src="/img/cta/2/bg.png" alt="image" />

       </div>

    <div className="container">
    <div className="row">
          <div className="col-md-5">
              <div className="cta__content">
              <h2
              data-aos="fade-up"
              data-aos-delay=""
              class="text-40 md:text-30 lh-13 text-left md:text-center lg:text-center xl:text-center text-white"
            >
             {translate("Grab up to") } <span class="text-info-2">{translate("35% off") } </span>
              <br class="lg:hidden sm:hidden xs:hidden" />
              {translate("on your favorite") }
              <br class="lg:hidden" />
              {translate("Destination") }
            </h2>

            {/* <h2 data-aos="fade-up" data-aos-delay="" className="text-40 md:text-30 lh-13 text-xs-center text-sm-left text-md-left text-lg-left text-xl-left" > Grab up to <span className="text-info-2">35% off </span> <br className="lg:d-none sm:d-none xs:d-none" /> on your favorite <br className="lg:d-none" /> Destination </h2> */}


              <p data-aos="fade-up" data-aos-delay="" className="mt-10 text-left md:text-center lg:text-center xl:text-center text-white">
              {translate("Limited time offer, don't miss the opportunity") }
              </p>

              <div className="mt-30 md:mt-20 text-center text-md-left d-flex justify-content-center justify-content-md-start">
                <button
                  data-aos="fade-right"
                  data-aos-delay=""
                  className="button -md -info-2 bg- -info-2 text-white border-1 "
                >
                  <Link href="/tour">
                  {translate("Book Now") }
                    {/* <i className="icon-arrow-top-right ml-10 text-16 text-white"></i> */}
                  </Link>
                </button>
              </div>
              
              </div>
          </div>
          <div className="col-md-7">
            <TourSliderTwo />
          </div>
    </div>
    </div>
    </section>
  );
}
