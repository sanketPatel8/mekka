"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageLightBox from "./ImageLightBox";



export default function HotelGallary({  mekkaHotel,madinaHotel }) {
  const [activeLightBox, setActiveLightBox] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
 
  return (
    <>  
    
    {mekkaHotel && mekkaHotel.length > 0 && (
      <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid_hotels mobile-css-slider-2">
          { mekkaHotel.map((image, index) => (
            <Image
              key={index}
              width={500}
              height={300}
              src={image}
              alt="hotel image"
              onClick={() => {
                setActiveLightBox(true);
                setCurrentSlideIndex(image);
              }}
              style={{ cursor: "pointer", height: "30vh" }}
            />
          ))}
        </div>
      </div>
      
      <ImageLightBox
        images={mekkaHotel}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
      </>
    )}

    {madinaHotel && madinaHotel.length > 0 && (
      <>
      <div className="tourSingleGrid -type-1 mt-30">
        <div className="tourSingleGrid__grid_hotels mobile-css-slider-2">
          { madinaHotel.map((image, index) => (
            <Image
              key={index}
              width={500}
              height={300}
              src={image}
              alt="madina_image"
              onClick={() => {
                setActiveLightBox(true);
                setCurrentSlideIndex(image);
              }}
              style={{ cursor: "pointer", height: "30vh" }}
            />
          ))}
        </div>
      </div>
      
      <ImageLightBox
        images={madinaHotel}
        activeLightBox={activeLightBox}
        setActiveLightBox={setActiveLightBox}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
      </>
    )}
    </>
  );
}
