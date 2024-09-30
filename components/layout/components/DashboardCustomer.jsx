"use client";

import { useCurrency } from "@/app/context/currencyContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link"; // Ensure Link is imported

const options = [
  { name: "Booking", path: "/customer/booking" },
  { name: "Profile", path: "/customer/profile" },
  { name: "LogOut", path: "" }, // Ensure to handle logout separately
];

export default function DashboardCustomer({ parentClass, handleLogoutClick }) {
  const [currentOption, setCurrentOption] = useState("Dashboard");
  const dropDownContainer = useRef();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOptionChange = (option) => {
    // Your logic for handling option changes (if needed)
    console.log("Option changed:", option); // Example logging
  };

  const handleButtonClick = (option) => {
    if (option.name === "LogOut") {
      // Add your logout logic here
      handleLogoutClick(); // Replace this with your logout logic
      // Optionally redirect after logout
    } else {
      // Navigate to the specified path
      router.push(option.path);
    }
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
        {currentOption} <i className="icon-chevron-down text-18"></i>
      </div>

      {isOpen && ( // Show dropdown content only when open
        <div className="headerDropdown__content is-active">
          <div className="headerDropdown">
            <div className="headerDropdown__container row">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="headerDropdown__item col-12"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent any default button behavior
                    handleOptionChange(option); // Call your option change handler
                    handleButtonClick(option); // Handle navigation or logout
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
