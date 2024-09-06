import { useTranslation } from "@/app/context/TranslationContext";
import { useState, useEffect, useRef } from "react";

const currencies = ["DE", "EN"];

export default function Language({ parentClass, onLocaleChange, locale }) {
  const [currentdd, setCurrentdd] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(locale);
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

  const handleLocaleChange = (locale) => {
    console.log("Changing locale to:", locale); // Debugging statement
    setSelectedCurrency(locale);
    if (onLocaleChange) {
      onLocaleChange(locale);
    }
    setCurrentdd("");
  };

  const { setLocale } = useTranslation();

  return (
    <div
      ref={dropDownContainer}
      className={`${parentClass ? parentClass : "headerDropdown js-form-dd"}`}
    >
      <div
        className="headerDropdown__button"
        onClick={() =>
          setCurrentdd((prev) => (prev === "currency" ? "" : "currency"))
        }
      >
        {selectedCurrency === "EN" ? "EN" : "DE"}
        <i className="icon-chevron-down text-18"></i>
      </div>

      <div
        className={`headerDropdown__content ${currentdd === "currency" ? "is-active" : ""
          }`}
      >
        <div className="headerDropdown">
          <div className="headerDropdown__container">
            <div className="d-flex flex-column">
              {currencies.map((currency) => (
                <button
                  key={currency}
                  onClick={() => {
                    setLocale(currency);
                    setSelectedCurrency(currency);
                    handleLocaleChange(currency);
                  }}
                >
                  {currency === "EN" ? "EN" : "DE"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}