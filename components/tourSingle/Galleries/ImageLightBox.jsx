"use client";

import Image from "next/image";
import React from "react";

export default function ImageLightBox({
  imag,
  setActiveLightBox,
  activeLightBox,
  currentSlideIndex,
  setCurrentSlideIndex,
}) {
  return (
    <div
      id="myModal"
      className={`modal ${activeLightBox ? "activeImageLightBox" : ""}`}
    >
      <div
        className="close cursor"
        style={{ zIndex: 1000 }}
        onClick={() => {
          setActiveLightBox(false);
        }}
      >
        <span>&times;</span>
      </div>
      <div className="modal-content">
        {imag?.map((elm, i) => (
          <div
            key={i}
            className={`mySlides ${currentSlideIndex == i ? "fadein" : ""} `}
            style={
              currentSlideIndex == i
                ? { display: "block", height: "100%" }
                : { display: "none", height: "100%" }
            }
          >
            <div className="numbertext">
              {i + 1} / {imag.length}
            </div>
            <Image
              width={850}
              height={510}
              src={elm}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                margin: "auto auto",
              }}
              alt="image"
            />
          </div>
        ))}

        <a
          className="prev"
          onClick={() =>
            setCurrentSlideIndex((pre) =>
              pre == 0 ? imag.length - 1 : pre - 1,
            )
          }
        >
          &#10094;
        </a>
        <a
          className="next"
          onClick={() =>
            setCurrentSlideIndex((pre) =>
              pre == imag.length - 1 ? 0 : pre + 1,
            )
          }
        >
          &#10095;
        </a>
      </div>
    </div>
  );
}
