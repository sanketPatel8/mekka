"use client";

import React from "react";

export default function Pagination({
  range = 20,
  activeIndex,
  setActiveIndex,
}) {
  const visibleRange = 5; // Number of buttons visible at once (excluding "..." indicators)
  
  const generatePaginationButtons = () => {
    let start = Math.max(1, activeIndex - Math.floor(visibleRange / 2));
    let end = Math.min(range, start + visibleRange - 1);

    if (end === range) {
      start = Math.max(1, range - visibleRange + 1);
    }

    const buttons = [];
    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => setActiveIndex(i)}
          className={activeIndex === i ? `is-active` : ""}
        >
          {i}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div className="pagination justify-center">
      <button
        onClick={() => setActiveIndex((pre) => (pre > 1 ? pre - 1 : 1))}
        className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
      >
        <i className="icon-arrow-left text-15"></i>
      </button>

      <div className="pagination__count">
        {activeIndex > visibleRange - 2 && (
          <>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setActiveIndex(1)}
              className={activeIndex === 1 ? `is-active` : ""}
            >
              1
            </div>
            {activeIndex > visibleRange - 1 && <div>...</div>}
          </>
        )}
        
        {generatePaginationButtons()}

        {activeIndex < range - (visibleRange - 2) && (
          <>
            {activeIndex < range - (visibleRange - 1) && <div>...</div>}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setActiveIndex(range)}
              className={activeIndex === range ? `is-active` : ""}
            >
              {range}
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => setActiveIndex((pre) => (pre < range ? pre + 1 : pre))}
        className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
      >
        <i className="icon-arrow-right text-15"></i>
      </button>
    </div>
  );
}
