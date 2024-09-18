import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Pagination = ({
  range, 
  activeIndex, 
  setActiveIndex, 
  startParam, 
  onPageChange, 
}) => {
  const [data, setData] = useState([]); // Fetched data
  const [loading, setLoading] = useState(false); // Loading indicator

  const handleClick = (type, index) => {
    if (type === "prev") {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (type === "next") {
      setActiveIndex((prev) => Math.min(prev + 1, range - 1));
    } else if (type === "page") {
      setActiveIndex(index);
      if (index === 0) {
        onPageChange(index);
      } else {
        onPageChange(index * 10);
      }
    }
  };

  const generatePaginationButtons = () => {
    const buttons = [];
    for (let i = 0; i < range; i++) {
      buttons.push(
        <div
          key={i}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick("page", i)}
          className={activeIndex === i ? "is-active" : ""}
        >
          {i + 1} {/* Display page number starting from 1 */}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <ClipLoader color="#DAC04F" size={50} />
        </div>
      ) : (
        <div>
          {/* <p>Current Active Index: {activeIndex}</p> */}
          <div className="pagination justify-center">
            <button
              onClick={() => handleClick("prev")}
              className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
            >
              <i className="icon-arrow-left text-15"></i>
            </button>

            <div className="pagination__count">
              {generatePaginationButtons()}
            </div>

            <button
              onClick={() => handleClick("next")}
              className="pagination__button customStylePaginationNext button -accent-1 ml-15 -next"
            >
              <i className="icon-arrow-right text-15"></i>
            </button>
          </div>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Pagination;
