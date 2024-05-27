"use client";

import { useState, useEffect, useRef } from "react";

const currencies = [
  "DE",
  "EN",
];

export default function Langauge({ parentClass } ) {
  const [currentdd, setCurrentdd] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("DE");
  const dropDownContainer = useRef();
  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setCurrentdd("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div
      ref={dropDownContainer}
      className={`${parentClass ? parentClass : "headerDropdown  js-form-dd"}`}
    >
      <div
        className="headerDropdown__button"
        onClick={() =>
          setCurrentdd((pre) => (pre == "currency" ? "" : "currency"))
        }
      >
        {selectedCurrency}
        <i className="icon-chevron-down text-18"></i>
      </div>

      <div
        className={`headerDropdown__content ${
          currentdd == "currency" ? "is-active" : ""
        } `}
      >
        <div className="headerDropdown">
          <div className="headerDropdown__container">
            {currencies.map((elm, i) => (
              <div
                onClick={() => {
                  setSelectedCurrency(elm);
                  setCurrentdd("");
                }}
                key={i}
                className="headerDropdown__item"
              >
                <button className="currencyhov">{elm}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
