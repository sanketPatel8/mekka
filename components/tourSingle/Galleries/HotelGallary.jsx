"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageLightBox from "./ImageLightBox";

const images = [
  { id: 0, image: `/img/hotel photo/makka-1.jpeg` , name : 'makka'},
  { id: 1, image: `/img/hotel photo/makka-2.jpeg` , name : 'makka'},
  { id: 2, image: `/img/hotel photo/makka-3.jpeg` , name : 'makka'},
  { id: 3, image: `/img/hotel photo/makka-4.jpeg` , name : 'makka'},
  { id: 4, image: `/img/hotel photo/makka-5.jpeg` , name : 'makka'},
  { id: 5, image: `/img/hotel photo/makka-6.jpeg` , name : 'makka'},
  { id: 6, image: `/img/hotel photo/madina-1.jpeg` , name : 'madina'},
  { id: 7, image: `/img/hotel photo/madina-2.jpeg` , name : 'madina'},
  { id: 8, image: `/img/hotel photo/madina-3.jpeg` , name : 'madina'},
  { id: 9, image: `/img/hotel photo/madina-4.jpeg` , name : 'madina'},
  { id: 10, image: `/img/hotel photo/madina-5.jpeg` , name : 'madina' },
  { id: 11, image: `/img/hotel photo/madina-6.jpeg` , name : 'madina' },
];

export default function HotelGallary({ name }) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  name
  return (
    <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid_hotels mobile-css-slider-2">
          {images.filter(image => image.name === name).map((image, index) => (
            <Image
              key={image.id}
              width={500}
              height={300}
              src={image.image}
              alt="hotel image"
              onClick={() => {
                setActiveLightBox(true);
                setCurrentSlideIndex(image.id);
              }}
              style={{ cursor: "pointer", height: "30vh" }}
            />
          ))}
        </div>
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
