"use client";

import React, { useState } from "react";
import ImageLightBox from "./ImageLightBox";
import Image from "next/image";
const images = [
  {
    id: 1,
    image: `/img/tourSingle/1/1.png`,
  },
  {
    id: 1,
    image: `/img/tourSingle/1/2.png`,
  },
  {
    id: 1,
    image: `/img/tourSingle/1/3.png`,
  },
  {
    id: 1,
    image: `/img/tourSingle/1/4.png`,
  },
];
export default function Gallery1({ PAckageData }) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  const imag = PAckageData?.Tour_Details?.tour_details?.tour_image;

  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid mobile-css-slider-2">
          {/* <Image
            width={1155}
            height={765}
            src={imag[0]}
            alt="image"
            className="obj-cover"
          />
          <Image
            width={765}
            height={375}
            src={imag[1]}
            alt="image"
            className="obj-cover"
          />
          <Image
            width={375}
            height={375}
            src={imag[2]}
            alt="image"
            className="obj-cover"
          />
          <Image
            width={375}
            height={375}
            src={imag[3]}
            alt="image"
            className="obj-cover"
          /> */}

          {imag &&
            imag.length > 0 &&
            imag
              .slice(0, 4)
              .map((img, index) => (
                <Image
                  key={index}
                  width={index === 0 ? 1155 : index === 1 ? 765 : 375}
                  height={index === 0 ? 765 : 375}
                  src={img}
                  alt={`image-${index + 1}`}
                  className="obj-cover"
                />
              ))}
        </div>

        <div className="tourSingleGrid__button">
          <div
            style={{ cursor: "pointer" }}
            className="js-gallery"
            data-gallery="gallery1"
          >
            <span
              onClick={() => setActiveLightBox(true)}
              className="button -accent-1 py-10 px-20 rounded-200 bg-dark-1 lh-16 text-white"
            >
              See all photos
            </span>
          </div>
          <a
            href="/img/tourSingle/1/2.png"
            className="js-gallery"
            data-gallery="gallery1"
          ></a>
          <a
            href="/img/tourSingle/1/3.png"
            className="js-gallery"
            data-gallery="gallery1"
          ></a>
          <a
            href="/img/tourSingle/1/4.png"
            className="js-gallery"
            data-gallery="gallery1"
          ></a>
        </div>
      </div>
      <ImageLightBox
        imag={imag}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </>
  );
}
