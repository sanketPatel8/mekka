"use client";

import { useCurrency } from "@/app/context/currencyContext";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const options = [
  { name: "booking", path: "/customer/booking" },
  { name: "profile", path: "/customer/profile" },
  { name: "Log Out", path: "" },
];

export default function DashboardCustomer({ parentClass, handleLogoutClick }) {
  const [currentOption, setCurrentOption] = useState("");
  const dropDownContainer = useRef();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option) => {
    setCurrency(option); // Set currency for Euro or USD

    setCurrentOption(option); // Set selected option
    setIsOpen(false); // Close the dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setIsOpen(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropDownContainer}
      className={`${parentClass ? parentClass : "headerDropdown js-form-dd"}`}
    >
      <div
        className="headerDropdown__button"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown
      >
        {currentOption || currency}{" "}
        {/* Show current option or default currency */}
        <i className="icon-chevron-down text-18"></i>
      </div>

      {isOpen && ( // Show dropdown content only when open
        <div className="headerDropdown__content is-active">
          <div className="headerDropdown">
            <div className="headerDropdown__container">
              {options.map((option, index) => (
                <div
                  onClick={() => handleOptionChange(option.name)}
                  key={index}
                  className="headerDropdown__item"
                >
                  <Link href={option.path} className="currencyhov">
                    {option.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
