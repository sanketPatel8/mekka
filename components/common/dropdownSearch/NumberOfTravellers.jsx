import React, { useState, useEffect } from "react";

const options = ["Adult", "Children", "Babies"];

export default function NumberOfTravellers({ active, setTourType }) {
  const [counts, setCounts] = useState({
    Adult: 1,
    Children: 0,
    Babies: 0,
  });

  useEffect(() => {
    console.log("Initial counts state:", counts);
  }, []);

  const decr = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(prevCounts[type] - 1, 0),
    }));
  };

  const incr = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  return (
    <div
      className={`searchFormItemDropdown -tour-type ${
        active ? "is-active" : ""
      } `}
      data-x="tour-type"
      data-x-toggle="is-active"
    >
      <div className="searchFormItemDropdown__container">
        <div className="searchFormItemDropdown__list scroll-bar-1">
          {options.map((elm, i) => (
            <div
              onClick={() => setTourType((pre) => (pre === elm ? "" : elm))}
              key={i}
              className="searchFormItemDropdown__item"
            >
              <div className="membar_name_count scroll-bar-1">
                <span className="js-select-control-choice">{elm}</span>
                <span className="member_choose_counter">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      decr(elm);
                    }}
                  >
                    -
                  </button>
                  <p>{counts[elm]}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      incr(elm);
                    }}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
