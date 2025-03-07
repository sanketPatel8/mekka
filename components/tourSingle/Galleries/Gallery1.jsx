"use client";

import React, { useEffect, useState } from "react";
import ImageLightBox from "./ImageLightBox";
import Image from "next/image";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Gallery1({ PAckageData }) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [Images, setImages] = useState([]);

  useEffect(() => {
    // Log to ensure PAckageData has the right structure
   
    setImages(PAckageData?.Tour_Details?.tour_details?.tour_image || []);
  }, [PAckageData]);

  const imagesWithDimensions = [
    { width: 1155, height: 765 }, // Size for first image
    { width: 765, height: 375 },  // Size for second image
    { width: 375, height: 375 },  // Size for third image
    { width: 375, height: 375 },  // Size for fourth image
  ];

  const openLightBox = () => {
  
    setActiveLightBox(true); // This should update state
  };

  const {translate} = useTranslation()

  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid mobile-css-slider-2">
          {Images &&
            Images.length > 0 &&
            Images.slice(0, 4)?.map((img, index) => (
              <Image
                key={index}
                width={imagesWithDimensions[index]?.width || 100}
                height={imagesWithDimensions[index]?.height || 100}
                src={
                  img == "" && img == null
                    ? "img/404/imgnotFound.png"
                    : img
                }
                alt={`image-${index}`}
                className="obj-cover"
              />
            ))}
        </div>

        <div
          className={`tourSingleGrid__button ${
            Images?.length === 1 ? "d-none" : "d-block"
          }`}
        >
          <div
            style={{ cursor: "pointer" }}
            className="js-gallery"
            data-gallery="gallery1"
          >
            <span
              onClick={openLightBox}
              className="button -accent-1 py-10 px-20 rounded-200 bg-dark-1 lh-16 text-white"
            >
              {translate("See All Photos")}
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox component */}
      <ImageLightBox
        images={Images}  // Corrected prop name from 'imag' to 'images'
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </>
  );
}
