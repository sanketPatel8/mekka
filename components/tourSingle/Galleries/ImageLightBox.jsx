"use client";

import Image from "next/image";
import React, { useEffect } from "react";

export default function ImageLightBox({
  images,
  setActiveLightBox,
  activeLightBox,
  currentSlideIndex,
  setCurrentSlideIndex,
}) {
  console.log(images, "images");

  // Check if images array is valid
  if (!images || images.length === 0) {
    
    return null;
  }


  // Auto-close modal when clicking outside of the image
  useEffect(() => {
    const closeModalOnOutsideClick = (e) => {
      if (e.target.id === "myModal") {
        setActiveLightBox(false);
      }
    };
    window.addEventListener("click", closeModalOnOutsideClick);
    return () => window.removeEventListener("click", closeModalOnOutsideClick);
  }, [setActiveLightBox]);

  console.log("currentSlideIndex" , currentSlideIndex);
  

  return (
    <div
      id="myModal"
      className={`modal ${activeLightBox ? "activeImageLightBox" : ""}`}
    >
      {/* Close button */}
      <div
        className="close cursor"
        style={{ zIndex: 1000 }}
        onClick={() => setActiveLightBox(false)}
      >
        <span>&times;</span>
      </div>

      {/* Image slides */}
      <div className="modal-content">
        {images.map((elm, i) => (
          <div
            key={i}
            className={`mySlides ${currentSlideIndex == i ? "fadein" : ""}`}
            style={
              currentSlideIndex === i
                ? { display: "block", height: "100%" }
                : { display: "none", height: "100%" }
            }
          >
            <div className="numbertext">
              {i + 1} / {images.length}
            </div>
            <Image
              width={850}
              height={510}
              src={elm}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                margin: "auto",
              }}
              alt="image"
            />
          </div>
        ))}

        {/* Prev/Next controls */}
        <a
          className="prev"
          onClick={() =>
            setCurrentSlideIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
        >
          &#10094;
        </a>
        <a
          className="next"
          onClick={() =>
            setCurrentSlideIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
        >
          &#10095;
        </a>
      </div>
    </div>
  );
}
