"use client";

import React from "react";

export default function Pagination({
  range ,
  activeIndex,
  setActiveIndex,
}) {
  const visibleRange = 5; // Number of buttons visible at once (excluding "..." indicators)

  const handleClick = (type, index) => {
    if (type === "prev") {
      setActiveIndex((prev) => (prev - 10 >= 0 ? prev - 10 : 0));
    } else if (type === "next") {
      setActiveIndex((prev) => Math.min(prev + 10, range - 1));
    } else if (type === "page") {
      const pageIndex = index * 10; // Assuming each page represents 10 items
      setActiveIndex(pageIndex);
    }
  };

  const generatePaginationButtons = () => {
    let start = Math.max(0, activeIndex - Math.floor(visibleRange / 2)); // Adjust start index
    let end = Math.min(range - 1, start + visibleRange - 1); // Adjust end index

    // Adjust start if the range exceeds the limit
    if (end === range - 1) {
      start = Math.max(0, range - visibleRange);
    }

    // Adjust end if we are at the beginning of the pagination
    if (start === 0) {
      end = Math.min(visibleRange - 1, range - 1);
    }

    const buttons = [];
    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick("page", i)}
          className={activeIndex === i * 10 ? "is-active" : ""}
        >
          {i + 1} {/* Display page number starting from 1 */}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div>
      {/* Display the current activeIndex value */}
      <p>Current Active Index: {activeIndex}</p>

      <div className="pagination justify-center">
        <button
          onClick={() => handleClick("prev")}
          className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
        >
          <i className="icon-arrow-left text-15"></i>
        </button>

        <div className="pagination__count">
          {activeIndex > visibleRange - 3 && (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleClick("page", 0)}
                className={activeIndex === 0 ? "is-active" : ""}
              >
                1 {/* Display first page */}
              </div>
              {activeIndex > visibleRange - 2 && <div>...</div>}
            </>
          )}

          {generatePaginationButtons()}

          {activeIndex < range - visibleRange && (
            <>
              {activeIndex < range - visibleRange + 1 && <div>...</div>}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleClick("page", Math.floor((range - 1) / 10))}
                className={activeIndex === (range - 1) ? "is-active" : ""}
              >
                {range} {/* Display last page */}
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => handleClick("next")}
          className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
        >
          <i className="icon-arrow-right text-15"></i>
        </button>
      </div>
    </div>
  );
}
