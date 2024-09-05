"use client";

import React from "react";

export default function Pagination({
  range,
  activeIndex,
  setActiveIndex,
}) {
  const visibleRange = 5; // Number of buttons visible at once (excluding "..." indicators)

  // Handler for pagination number clicks
  const handlePaginationClick = (pageIndex) => {
    setActiveIndex(pageIndex);
  };

  // Handler for next button click
  const handleNextClick = () => {
    setActiveIndex((prev) => Math.min(prev + 1, range - 1));
  };

  // Handler for previous button click
  const handlePreviousClick = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const generatePaginationButtons = () => {
    let start = Math.max(0, activeIndex - Math.floor(visibleRange / 2));
    let end = Math.min(range - 1, start + visibleRange - 1);

    if (end === range - 1) {
      start = Math.max(0, range - visibleRange);
    }

    if (start === 0) {
      end = Math.min(visibleRange - 1, range - 1);
    }

    const buttons = [];
    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => handlePaginationClick(i)}
          className={activeIndex === i ? "is-active" : ""}
        >
          {i + 1}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div>
      <p>Current Active Index: {activeIndex + 1}</p>

      <div className="pagination justify-center">
        <button
          onClick={handlePreviousClick}
          className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
          disabled={activeIndex === 0}
        >
          <i className="icon-arrow-left text-15"></i>
        </button>

        <div className="pagination__count">
          {activeIndex > Math.floor(visibleRange / 2) && (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handlePaginationClick(0)}
                className={activeIndex === 0 ? "is-active" : ""}
              >
                1
              </div>
              {activeIndex > Math.floor(visibleRange / 2) && <div>...</div>}
            </>
          )}

          {generatePaginationButtons()}

          {activeIndex < range - Math.floor(visibleRange / 2) && (
            <>
              {activeIndex < range - visibleRange && <div>...</div>}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handlePaginationClick(range - 1)}
                className={activeIndex === range - 1 ? "is-active" : ""}
              >
                {range}
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleNextClick}
          className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
          disabled={activeIndex === range - 1}
        >
          <i className="icon-arrow-right text-15"></i>
        </button>
      </div>
    </div>
  );
}
