"use client";

import React, { useEffect, useState } from "react";
import ImageLightBox from "./ImageLightBox";
import Image from "next/image";
const imagessss = [
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
  const [Images, setImages] = useState([]);

  useEffect(() => {
    setImages(PAckageData?.Tour_Details?.tour_details?.tour_image);
  }, [PAckageData]);

  console.log("Images", Images);

  const imagesWithDimensions = [
    { width: 1155, height: 765 }, // Size for first image
    { width: 765, height: 375 }, // Size for second image
    { width: 375, height: 375 }, // Size for third image
    { width: 375, height: 375 }, // Size for fourth image
  ];

  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid mobile-css-slider-2">
          {/* <Image
            width={1155}
            height={765}
            src={Images[0].image}
            alt="image"
            className="obj-cover"
          />
          <Image
            width={765}
            height={375}
            src={Images[1].image}
            alt="image"
            className="obj-cover"
          />
          <Image
            width={375}
            height={375}
            src={Images[2].image}
            alt="image"
            className="obj-cover"
          />  
          <Image
            width={375}
            height={375}
            src={Images[3].image}
            alt="image"
            className="obj-cover"
          /> */}

          {/* {Images &&
            Images.length > 0 &&
            Images
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
              ))} */}

          {Images && Images.length > 0 && Images.slice(0 , 4)?.map((img, index) => (
            <Image
              key={index} 
              width={imagesWithDimensions[index]?.width || 100}
              height={imagesWithDimensions[index]?.height || 100} 
              src={img} 
              alt={`image-${index}`} 
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
        imag={Images}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </>
  );
}
