// currency.js
import { useState, useEffect, useRef } from "react";
import { useCurrency } from "@/app/context/currency-context";

const currencies = ["€", "$"];

export default function Currency({ parentClass }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const dropDownContainer = useRef(null);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

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
    console.log("hi")
    setCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropDownContainer}
      className={`${parentClass ? parentClass : "currencyDropdown"}`}
    >
      <div
        className="currencyDropdown__button"
        onClick={() => {}}
      >
        {selectedCurrency === "€" ? "Euro" : "USD"}
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