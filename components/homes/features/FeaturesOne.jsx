// components/homes/features/FeaturesOne.jsx
"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { features } from "@/data/features";

export default function FeaturesOne() {
  const { translate } = useTranslation();

  return (
    <section className="pt-50">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <h2 data-aos="fade-up" className="text-30 md:text-24">
              {translate("Why choose MekkaBooking")}
            </h2>
          </div>
        </div>
        <div  
          data-aos="fade-up"
          className="row md:x-gap-20 pt-40 sm:pt-20 mobile-css-slider -w-280"
        >
          {features.map((elm, i) => (
            <div key={i} className="col-lg-4 col-sm-4 my-4">
              <div className="featureIcon -type-1 pr-40 md:pr-0">
                <div className="featureIcon__icon text-md-left text-center text-sm-center">
                  {elm.iconSrc}
                </div>
                <h3 className="featureIcon__title text-18 fw-500 mt-30 text-center">
                  {translate(elm.title)}
                </h3>
                <p className="featureIcon__text mt-10 text-center">
                  {translate(elm.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
