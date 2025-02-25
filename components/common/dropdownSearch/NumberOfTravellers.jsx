"use client";

import { useGlobalState } from "@/app/context/GlobalStateContext";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useState, useEffect } from "react";

const options = ["Adult", "Child", "Baby"];

export default function NumberOfTravellers({ active, setTourType }) {
  const { counts, setCounts } = useGlobalState();
  useEffect(() => {}, []);

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

  const { translate } = useTranslation();

  return (
    <div
      className={`searchFormItemDropdown -tour-type ${
        active ? "is-active" : ""
      } `}
      data-x="tour-type"
      data-x-toggle="is-active"
    >
      <div className="searchFormItemDropdown__container">
        <div className="searchFormItemDropdown__list ">
          {options.map((elm, i) => (
            <div
              onClick={() => setTourType((pre) => (pre === elm ? "" : elm))}
              key={i}
              className="searchFormItemDropdown__item"
            >
              <div className="membar_name_count row">
                <span className="js-select-control-choice col-md-6">
                  <div className="Taveler-col">
                    <span>
                      {translate(
                        elm === "Child"
                          ? "Children"
                          : elm === "Baby"
                          ? "Babies"
                          : "Adult"
                      )}
                    </span>
                    <span className="text-red">
                      {elm === "Child"
                        ? "(up to 11 years)"
                        : elm === "Baby"
                        ? "(0 - 23 months)"
                        : ""}
                    </span>
                  </div>
                </span>
                <span className="member_choose_counter col-md-6">
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
