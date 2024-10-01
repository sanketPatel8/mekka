"use client";

import { useCurrency } from "@/app/context/currencyContext";
import { useState, useEffect, useRef } from "react";

const currencies = ["Euro", "USD"];

export default function Currency({ parentClass, currencyLocale }) {
  const [currentdd, setCurrentdd] = useState("");
  // const [selectedCurrency, setSelectedCurrency] = useState("");
  const dropDownContainer = useRef();
  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (cur) => {
    setCurrency(cur);
    setIsOpen(false);
    setCurrentdd("");
  };
  const [isOpen, setIsOpen] = useState(false);

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
        onClick={() => {
          setCurrentdd((pre) => (pre == "currency" ? "" : "currency"));
          console.log(currentdd, "currentdd");
        }}
      >
        {currency == "Euro" ? "Euro" : "USD"}
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
                  handleCurrencyChange(elm);
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
