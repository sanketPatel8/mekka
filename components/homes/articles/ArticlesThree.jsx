import { articles } from "@/data/articles";
import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/public/css/index.css";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";

export default function ArticlesThree() {
  const [ArticalDAta, setArticalDAta] = useState([]);

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
              {translate("Travel Articles")}
            </h2>
          </div>

          <div className="col-auto">
            <Link
              href={"/tour"}
              data-aos="fade-right"
              data-aos-delay=""
              className="buttonArrow d-flex items-center"
            >
              <span> {translate("See all")}</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay=""
          className="row justify-content-center mb-10"
        >
          {ArticalDAta.slice(0, 3).map((elm, i) => (
            <div
              key={i}
              className="col-lg-3 col-md-5 my-lg-5  my-2 border-1 -hover-shadow rounded-12 mx-2 py-10 px-10 shadow"
            >
              <Link href={`/blog/${elm.id}`} className="blogCard -type-1">
                <div className="blogCard__image ratio ratio-41:30">
                  <Image
                    width={616}
                    height={451}
                    src="/_next/image?url=%2Fimg%2FblogCards%2F1%2Fsimple.jpg&w=1920&q=75"
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
                    dangerouslySetInnerHTML={{ __html: elm.headOneEn }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
