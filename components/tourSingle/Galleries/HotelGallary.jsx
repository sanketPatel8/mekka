"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageLightBox from "./ImageLightBox";

const images = [
  {
    id: 1,
    image: `/img/hotel photo/makka-1.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/makka-2.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/makka-3.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/makka-4.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/makka-5.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/makka-6.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/madina-1.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/madina-2.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/madina-3.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/madina-4.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/madina-5.jpeg`,
  },
  {
    id: 1,
    image: `/img/hotel photo/madina-6.jpeg`,
  },
];
export default function HotelGallary(props) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid_hotels mobile-css-slider-2">
          <Image
            width={500}
            height={300}
            src={props.img1}
            alt="image"
            onClick={() => setActiveLightBox(true)}
            style={{cursor : "pointer", height:"30vh"}}
          />
          <Image
            width={500}
            height={300}
            src={props.img2}
            alt="image"
            onClick={() => setActiveLightBox(true)}
            style={{cursor : "pointer", height:"30vh"}}
          />
          <Image
            width={500}
            height={300}
            src={props.img3}
            alt="image"
            onClick={() => setActiveLightBox(true)}
            style={{cursor : "pointer", height:"30vh"}}
          />
          <Image
            width={500}
            height={300}
            src={props.img4}
            alt="image"
            onClick={() => setActiveLightBox(true)}
            style={{cursor : "pointer", height:"30vh"}}
          />
          <Image
            width={500}
            height={300}
            src={props.img5}
            alt="image"
            onClick={() => setActiveLightBox(true)}
            style={{cursor : "pointer", height:"30vh"}}
          />
          <Image
            width={500}
            height={300}
            src={props.img6}
            alt="image"
            onClick={() => setActiveLightBox(true)}
            style={{cursor : "pointer", height:"30vh"}}
          />
           
        </div>

        {/* <div className="tourSingleGrid__button">
          <div
            style={{ cursor: "pointer" }}
            className="js-gallery"
            data-gallery="gallery1"
          >
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
        </div> */}
      </div>
      <ImageLightBox
        images={images}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </>
  );
}
