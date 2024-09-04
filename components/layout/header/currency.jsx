"use client";

import { useState, useEffect, useRef } from "react";

const currencies = ["$", "€"];

export default function currency({ parentClass }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("€");
  const dropDownContainer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownContainer.current && !dropDownContainer.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropDownContainer}
      className={`${parentClass ? parentClass : "currencyDropdown"}`}
    >
      <div
        className="currencyDropdown__button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedCurrency}
        <i className="icon-chevron-down text-18"></i>
      </div>

      {isOpen && (
        <div className="currencyDropdown__content is-active">
          {currencies.map((currency) => (
            <button
              key={currency}
              onClick={() => handleCurrencyChange(currency)}
              className={`currencyDropdown__item ${selectedCurrency === currency ? 'is-active' : ''}`}
            >
              {currency}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
