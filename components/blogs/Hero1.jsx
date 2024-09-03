import Image from "next/image";
import React from "react";

export default function Hero1({ blog, BlogData }) {
  return (
    <section className="hero -type-1 -min-2">
      <div className="hero__bg">
        <Image
          width={1800}
          height={500}
          src={
            BlogData?.imageOne ? BlogData?.imageOne : "/img/404/imgnotFound.png"
          }
          alt="image"
        />
        <Image
          style={{ height: "auto" }}
          width="1800"
          height="40"
          src="/img/hero/1/shape.svg"
          alt="image"
        />
      </div>

      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-12">
            <div className="hero__content">
              <h1 className="hero__title">
                {BlogData?.headOne
                  ? BlogData?.headOne
                  : "Your guide to everywhere"}
              </h1>

              <p
                className="hero__text"
                dangerouslySetInnerHTML={{ __html: BlogData?.headOneText }}
              >
                {/* {BlogData?.headOneText
                  ? BlogData?.headOneText
                  : `Find inspiration, guides and stories for wherever you're going
                Select a destination`} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
