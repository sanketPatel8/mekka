import Image from "next/image";
import React from "react";

export default function Hero1({ blog, BlogData }) {
  return (
    <section className="hero -type-1 -min-2 ">
      <div className="hero__bg ">
        <Image
          width={1800}
          height={700}
          src={
            BlogData?.imageOne === ""
              ? "/img/404/imgnotFound.png"
              : BlogData.imageOne
          }
          alt="image"
        />
        {/* <Image
          style={{ height: "auto" }}
          width="1800"
          height="40"
          src="/img/hero/1/shape.svg"
          alt="image"
        /> */}
      </div>
    </section>
  );
}
