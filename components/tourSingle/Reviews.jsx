"use client"

import { reviews } from "@/data/tourSingleContent";
import React, { useEffect, useState } from "react";
import Stars from "../common/Stars";
import Image from "next/image";

export default function Reviews({ PAckageData }) {

  const [ReviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    setReviewsData(PAckageData?.Tour_Details?.customer_review || []);
  }, [PAckageData]);
  
  return (
    <>
      {ReviewsData.map((elm, i) => (
        <div key={i} className="pt-30">
          <div className="row justify-between">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="size-40 rounded-full">
                  <Image
                    width={40}
                    height={40}
                    src="/_next/image?url=%2Fimg%2Freviews%2Favatars%2F1.png&w=96&q=75"
                    alt="image"
                    className="img-cover"
                  />
                </div>

                <div className="text-16 fw-500 ml-20">{elm.user_name}</div>
              </div>
            </div>

            <div className="col-auto">
              <div className="text-14 text-light-2">{elm.review_date}</div>
            </div>
          </div>

          <div className="d-flex items-center mt-15">
            <div className="d-flex x-gap-5">
              <Stars star={elm.review_rating} />
            </div>
            <div className="text-16 fw-500 ml-10">{elm.title}</div>
          </div>

          <p className="mt-10">{elm.descriptions}</p>

          {/* <div className="row x-gap-20 y-gap-20 pt-20">
            {elm.images.map((elm2, i2) => (
              <div key={i2} className="col-auto">
                <div className="size-130">
                  <Image
                    width={195}
                    height={195}
                    src={elm2}
                    alt="image"
                    className="img-cover rounded-12"
                  />
                </div>
              </div>
            ))}
          </div> */}

          {/* <div className="d-flex x-gap-30 items-center mt-20">
            <div>
              <a href="#" className="d-flex items-center">
                <i className="icon-like text-16 mr-10"></i>
                Helpful
              </a>
            </div>
            <div>
              <a href="#" className="d-flex items-center">
                <i className="icon-dislike text-16 mr-10"></i>
                Not helpful
              </a>
            </div>
          </div> */}
        </div>
      ))}
    </>
  );
}
