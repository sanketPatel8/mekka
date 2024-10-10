"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
// import { testimonialsOne } from "@/data/testimonials";
import Image from "next/image";
import { useTranslation } from "@/app/context/TranslationContext";

export default function TestimonialOne() {
  const { translate } = useTranslation();

   const [testimonialsOne, setTestimonialsOne] = useState([]);

  useEffect(()=>{

    const reviews = [
      {
        id: 1,
        imageSrc: "/img/404/user.jpg",
        title: `5 ${translate("Stars")}`,
        content:
          `${translate("The organization and planning was flexible and adapted to the group, which is a huge plus from my point of view. The group leader was very educated and professional. I was able to learn a lot of new things and take a lot with me for my life. Apart from the price-performance ratio, which no other organization can match, I can wholeheartedly and with a clear conscience recommend the Umrah with Sheikh Yassin.")}`,
        authorName: "Chahid Mouhinou",
        autorRole: "5 stars",
      },
      {
        id: 2,
        imageSrc: "/img/404/user.jpg",
        title: `5 ${translate("Stars")}`,
        content:
        `${translate("First of all, thank you for the most wonderful experience. It was perfect from start to finish. Yasmin, who took care of the visa, did a great job. Fast and smooth. The tour guide Khattab was a very personable and competent tour guide. The way he told us things was really good and it was nice to listen to him. He also felt responsible for everything. Simply a great team. Definitely highly recommended! Thank you")}`,
        authorName: "Ali Shams",
        authorRole: "Explorer",
      },
      {
        id: 3,
        imageSrc: "/img/404/user.jpg",
        title: `5 ${translate("Stars")}`,
        content:
        `${translate("Salam, I am very grateful that this site exists. It helped me and my family plan their trip perfectly and the people at Mekkabooking are reliable and trustworthy: everything was perfect from start to finish. Thanks also to Yasim")}`,
        authorName: "Munim Oualali",
        authorRole: "Adventurer",
      },
      {
        id: 4,
        imageSrc: "/img/404/user.jpg",
        title: `5 ${translate("Stars")}`,
        content:
        `${translate("I did my Umrah with the organizer. Everything was great. Khattab is a great tour guide. Thank you for everything.")}`,
        authorName: "Aseel M",
        authorRole: "Adventurer",
      },
      
    ];
    setTestimonialsOne(reviews)
  },[translate])
  
  return (
    <section className="relative layout-pt-xl layout-pb-xl">
      <div className="sectionBg md:d-none">
        <Image
          width={1920}
          height={871}
          src="/img/testimonials/1/1.png"
          alt="image"
          className=""
        />
      </div>

      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24"
            >
                   {translate("Customer Reviews") }
            </h2>
          </div>
        </div>

        <div className="row justify-center pt-60 md:pt-20">
          <div className="col-xl-6 col-md-8 col-sm-10">
            <div className="overflow-hidden js-section-slider">
              <div
                data-aos="fade-up"
                data-aos-delay=""
                className="swiper-wrapper"
              >
                <Swiper
                  spaceBetween={30}
                  className="w-100"
                  loop
                  pagination={{
                    el: ".pbutton2",
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  breakpoints={{
                    500: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 1,
                    },
                    1024: {
                      slidesPerView: 1,
                    },
                    1200: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {testimonialsOne.map((elm, i) => (
                    <SwiperSlide key={i}>
                      <div className="testimonials -type-1 pt-10 text-center">
                        <div className="testimonials__image size-100 rounded-full">
                          <Image
                            width={150}
                            height={150}
                            src={elm.imageSrc}
                            alt="image"
                            className="rounded-full"
                          />

                          <div className="testimonials__icon">
                            <svg
                              width="16"
                              height="13"
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3165 0.838867C12.1013 1.81846 10.9367 3.43478 9.77215 5.63887C8.65823 7.84295 8 10.2429 7.8481 12.8389H12.4557C12.4051 8.87152 13.6203 5.24703 16 1.91642L13.3165 0.838867ZM5.51899 0.838867C4.25316 1.81846 3.08861 3.43478 1.92405 5.63887C0.810126 7.84295 0.151899 10.2429 0 12.8389H4.60759C4.55696 8.87152 5.77215 5.19805 8.20253 1.91642L5.51899 0.838867Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="text-18 fw-500 text-accent-1 mt-60 md:mt-40">
                          {elm.title}
                        </div>

                        <div className="text-20 fw-500 mt-20">
                          {elm.content}
                        </div>

                        <div className="mt-20 md:mt-40">
                          <div className="lh-16 text-16 fw-500">
                            {elm.authorName}
                          </div>
                          {/* <div className="lh-16">{elm.authorRole}</div> */}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="pagination -type-1 justify-center pt-60 md:pt-40 js-testimonials-pagination swiperPagination1">
                <div className="pagination__button pbutton2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
