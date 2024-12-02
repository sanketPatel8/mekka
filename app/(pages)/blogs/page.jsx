"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/public/css/index.css";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import Header1 from "@/components/layout/header/Header1";

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Pagination from "@/components/common/Pagination";

export default function ArticlesThree() {
  const [ArticalDAta, setArticalDAta] = useState([]);

  // page title

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Blog List - MekkaBooking";
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      };

      try {
        const response = await post("travel_articles", sendData);
        setArticalDAta(response.Travel_Articles);
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

    fetchData();
  }, []);

  const { translate } = useTranslation();

  const [range, setRange] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const onPageChange = (pageIndex) => {
    console.log(pageIndex);
  };

  const [Lang, setLang] = useState('')



  useEffect(() => {
    const Lang = typeof window !== "undefined" ? localStorage.getItem("locale") : "";
    setLang(Lang)
  })

  const startParam = "start";

  return (
    <section className="layout-pt-xl">
      <Header1 />
      <div className="container">
        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row justify-content-center mb-10 mt-30"
        >
          {ArticalDAta.map((elm, i) => (
            <div
              key={i}
              className="col-lg-3 col-md-4 my-lg-2  my-2 border-1 -hover-shadow rounded-12 mx-2 py-10 px-10 shadow"
            >
              <Link href={`/blog/${elm.id}`} className="blogCard -type-1">
                <div className="blogCard__image ratio ratio-41:30">
                  <Image
                    width={616}
                    height={451}
                    src={
                      elm?.imageOne ? elm?.imageOne : "/img/404/imgnotFound.png"
                    }
                    alt="image"
                    className="img-ratio rounded-12"
                  />

                  {/* <div className="blogCard__badge">{elm.slug}</div> */}
                  <div className="blogCard__badge">
                    {elm.type === "1"
                      ? "Hajj"
                      : elm.type === "2"
                      ? "Umrah"
                      : "Cultural Trips"}
                  </div>
                </div>

                <div className="blogCard__content mt-30">
                  <div className="blogCard__info text-14">
                    <div className="lh-13">{elm.created_at}</div>
                    {/* <div className="blogCard__line"></div> */}
                    {/* <div className="lh-13">By {elm.headOne}</div> */}
                  </div>

                  <h3
                    className="blogCard__title text-18 fw-500 mt-10"
                    dangerouslySetInnerHTML={{ __html: Lang === "EN" ? elm.headOneEn : elm.headOneTr }}
                  />
                </div>
              </Link>
            </div>
          ))}
          <div className={`${ArticalDAta?.length === 0 ? "d-none" : "d-block"}`}>
            <div className="d-flex justify-center flex-column mt-60">
              <Pagination
                range={12}
                activeIndex={2}
                setActiveIndex={setActiveIndex}
                startParam={startParam}
                onPageChange={onPageChange}
              />

              <div className="text-14 text-center mt-20">
                {translate("Showing results")} 1 - {ArticalDAta?.length} of 
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
    </section>
  );
}
