"use client";

import React from "react";

export default function PaginationForTourList({
  range,
  TourIndex,
  setTourIndex,
}) {
  const visibleRange = 5; // Number of buttons visible at once (excluding "..." indicators)

  // Handler for pagination number clicks
  const handlePaginationClick = (pageIndex) => {
    setTourIndex(pageIndex * 10);
  };

  // Handler for next button click
  const handleNextClick = () => {
    setTourIndex((prev) => Math.min(prev + 10, (range - 1) * 10));
  };

  // Handler for previous button click
  const handlePreviousClick = () => {
    setTourIndex((prev) => Math.max(prev - 10, 0));
  };

  const generatePaginationButtons = () => {
    let currentIndex = TourIndex / 10; // Current active page index
    let start = Math.max(0, currentIndex - Math.floor(visibleRange / 2));
    let end = Math.min(range - 1, start + visibleRange - 1);

    // Adjust start and end if range is small
    if (end - start + 1 < visibleRange) {
      start = Math.max(0, end - visibleRange + 1);
    }

    const buttons = [];
    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => handlePaginationClick(i)}
          className={currentIndex === i ? "is-active" : ""}
        >
          {i + 1}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div>
      <p>Current Active Index: {TourIndex / 10}</p>

      <div className="pagination justify-center">
        <button
          onClick={handlePreviousClick}
          className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
          disabled={TourIndex === 0}
        >
          <i className="icon-arrow-left text-15"></i>
        </button>

        <div className="pagination__count">
          {/* Display "1" button and "..." before current range if necessary */}
          {TourIndex / 10 > Math.floor(visibleRange / 2) && (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handlePaginationClick(0)}
                className={TourIndex === 0 ? "is-active" : ""}
              >
                1
              </div>
              {TourIndex / 10 > Math.floor(visibleRange / 2) && <div>...</div>}
            </>
          )}

          {generatePaginationButtons()}

          {/* Display "..." and last button if necessary */}
          {TourIndex / 10 < range - Math.floor(visibleRange / 2) - 1 && (
            <>
              {TourIndex / 10 < range - visibleRange && <div>...</div>}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handlePaginationClick(range - 1)}
                className={TourIndex / 10 === range - 1 ? "is-active" : ""}
              >
                {range}
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleNextClick}
          className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
          disabled={TourIndex >= (range - 1) * 10}
        >
          <i className="icon-arrow-right text-15"></i>
        </button>
      </div>
    </div>
  );
}
