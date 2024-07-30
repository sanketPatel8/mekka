import { articles } from "@/data/articles";
import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import '@/public/css/index.css'
import { useTranslation } from "@/app/context/TranslationContext";

export default function ArticlesThree() {
  const { translate } = useTranslation();
  return (
    <section className="layout-pt-xl">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2
              data-aos="fade-up"
              data-aos-delay=""
              className="text-30 md:text-24 "
            >
             {translate("ArticlesThree") || "Find Latest Packages"}
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tourlist"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center"
            >
              <span> {translate("seeAll") || "Find Latest Packages"}</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row justify-content-center mb-10"
        >
          {blogs.slice(0, 3).map((elm, i) => (
            <div key={i} className="col-lg-3 col-md-5 my-lg-5  my-2 border-1 -hover-shadow rounded-12 mx-2 py-10 px-10 shadow">
              <Link
                href={`/toursingle/${elm.id}`}
                className="blogCard -type-1"
              >
                <div className="blogCard__image ratio ratio-41:30">
                  <Image
                    width={616}
                    height={451}
                    src={elm.image}
                    alt="image"
                    className="img-ratio rounded-12"
                  />

                  <div className="blogCard__badge">{elm.badge}</div>
                </div>

                <div className="blogCard__content mt-30">
                  <div className="blogCard__info text-14">
                    <div className="lh-13">{elm.date}</div>
                    <div className="blogCard__line"></div>
                    <div className="lh-13">By {elm.author}</div>
                  </div>

                  <h3 className="blogCard__title text-18 fw-500 mt-10">
                    {elm.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
