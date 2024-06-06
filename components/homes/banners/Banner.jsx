import Image from "next/image";
import Link from "next/link";
import React from "react";
import TourSliderTwo from "../tours/TourSliderTwo";

export default function Banner() {
  return (
    <section className="cta -type-3">
      <div className="cta__bg">
        <Image width={1530} height={100} src="/img/cta/2/bg.png" alt="image" />

        {/* <div className="cta__image">
          <Image width={100} height={600} src="/img/cta/2/bg.png" alt="image" />
          <Image
            width="40"
            height="600"
            src="/img/cta/2/shape.svg"
            alt="image"
          />
          <Image
            width="390"
            height="35"
            src="/img/cta/2/shape2.svg"
            alt="image"
          />
        </div> */}
      </div>

    {/* <div className="container">
      <div className="row">
          <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-7">
              
          
          </div>
      </div>
    </div> */}

    <div className="container">
    <div className="row">
          <div className="col-md-5">
              <div className="cta__content">
              <h2
                data-aos="fade-up"
                data-aos-delay=""
                className="text-40 md:text-30  lh-13"
              >
                Grab up to <span className="text-accent-1">35% off</span>
                <br className="lg:d-none" />
                on your favorite
                <br className="lg:d-none" />
                Destination
              </h2>

              <p data-aos="fade-up" data-aos-delay="" className="mt-10">
                Limited time offer, don't miss the opportunity
              </p>

              <div className="mt-30 md:mt-20">
                <button
                  data-aos="fade-right"
                  data-aos-delay=""
                  className="button -md -info-2 bg- -info-2 text-white border-1"
                >
                  <Link href="/tour-list-5">
                    Book Now
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
