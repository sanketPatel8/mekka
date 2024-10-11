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
  console.log(onPageChange, "onPageChange");

  const handleClick = (type, index) => {
    console.log("Handle Click Value ", type, index);

    if (type === "prev") {
      console.log("prev");
      const newIndex = Math.max(0, index - 1);
      setActiveIndex(newIndex);

      onPageChange(newIndex * 10);
    } else if (type === "next") {
      console.log("next");
      const newIndex = Math.min(index + 1, range - 1);
      setActiveIndex(newIndex);
      onPageChange(newIndex * 10);
    } else if (type === "page") {
      console.log("page");
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
          {i + 1}
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
              onClick={() => handleClick("prev", activeIndex)}
              className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
            >
              <i className="icon-arrow-left text-15"></i>
            </button>

            <div className="pagination__count">
              {generatePaginationButtons()}
            </div>

            <button
              onClick={() => handleClick("next", activeIndex)}
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
