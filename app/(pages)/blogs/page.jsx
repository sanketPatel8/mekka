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
import { POST } from "@/app/utils/api/post";
import { ClipLoader } from "react-spinners";

export default function ArticlesThree() {
  const [ArticalDAta, setArticalDAta] = useState([]);
  const [range, setRange] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [Lang, setLang] = useState('')

  // page title

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Blog List - MekkaBooking";
    }
  }, []);

  const fetchData = async (pageIndex = 0) => {
    const formData = new FormData();
    formData.append("start", pageIndex);

    setIsLoading(true); // Set loading state to true


    try {
      const response = await POST.request({
        form: formData,
        url: "travel_articles",
      });
      setArticalDAta(response.Travel_Articles);
      setCount(response.Count);
      setRange(response.Total_Page);
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
    }finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [Lang]);


  const { translate } = useTranslation();

  
  const onPageChange = async (pageIndex) => {
    fetchData(pageIndex); 
  };






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
        className="row justify-content-center mb-10 mt-30">

        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <ClipLoader color="#DAC04F" size={50} />
          </div>
        ) : ArticalDAta.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center">
            <p>{translate("No Articles Available")}</p>
          </div>
        ) : (
          <>
            {ArticalDAta.slice(0, 9).map((elm, i) => (
              <div
                key={i}
                className="col-lg-3 col-md-4 my-lg-2 my-2 border-1 -hover-shadow rounded-12 mx-2 py-10 px-10 shadow"
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
                    </div>

                    <h3
                      className="blogCard__title text-18 fw-500 mt-10"
                      dangerouslySetInnerHTML={{ __html: Lang === "EN" ? elm.headOneEn : elm.headOne }}
                    />
                  </div>
                </Link>
              </div>
            ))}
            <div className={`${ArticalDAta.length === 0 ? "d-none" : "d-block"}`}>
              <div className="d-flex justify-center flex-column mt-60">
                <Pagination
                  range={range}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  startParam="start"
                  onPageChange={onPageChange}
                />

                <div className="text-14 text-center mt-20">
                  {translate("Showing results")} 1 - {range} of {count}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    <FooterTwo />
  </section>

  );
}
