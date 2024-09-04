import React, { useState, useEffect } from 'react';

const Pagination = ({
  range, // Total number of pages
  activeIndex, // Current page index
  setActiveIndex, // Function to update the current page index
  startParam, // Parameter name for the start index (e.g., "start")
  onPageChange, // Callback function to handle page changes
}) => {
  const [data, setData] = useState([]); // Fetched data
  const [loading, setLoading] = useState(false); // Loading indicator

  // useEffect(() => {
  //   const fetchPageData = async () => {
  //     setLoading(true);
  //     const response = await fetch(`https://example.com/api/data?${startParam}=${activeIndex * 10}&limit=10`);
  //     const jsonData = await response.json();
  //     setData(jsonData.data);
  //     setLoading(false);
  //   };

  //   fetchPageData();
  // }, [activeIndex, startParam]);

  const handleClick = (type, index) => {
    if (type === 'prev') {
      setActiveIndex((prev) => Math.max(0, prev - 1));
    } else if (type === 'next') {
      setActiveIndex((prev) => Math.min(prev + 1, range - 1));
    } else if (type === 'page') {
      setActiveIndex(index+1);
      onPageChange(index);
    }
  };

  const generatePaginationButtons = () => {
    const buttons = [];
    for (let i = 0; i < range; i++) {
      buttons.push(
        <div
          key={i}
          style={{ cursor: 'pointer' }}
          onClick={() => handleClick('page', i)}
          className={activeIndex === i ? 'is-active' : ''}
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
        <p>Loading...</p>
      ) : (
        <div>
          {/* <p>Current Active Index: {activeIndex}</p> */}
          <div className="pagination justify-center">
            <button
              onClick={() => handleClick('prev')}
              className="pagination__button customStylePaginationPre button -accent-1 mr-15 -prev"
            >
              <i className="icon-arrow-left text-15"></i>
            </button>

            <div className="pagination__count">
              {generatePaginationButtons()}
            </div>

            <button
              onClick={() => handleClick('next')}
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