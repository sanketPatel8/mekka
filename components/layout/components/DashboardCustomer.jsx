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
    if (option.name === "LogOut") {
      handleLogoutClick(); // Call the logout handler if LogOut is clicked
      return;
    }

    setCurrentOption(option.name); // Update the current option state
    setIsOpen(false); // Close the dropdown
    router.push(option.path); // Redirect to the selected path
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
        {currentOption}{" "}
        <i className="icon-chevron-down text-18"></i>
      </div>

      {isOpen && ( // Show dropdown content only when open
        <div className="headerDropdown__content is-active">
          <div className="headerDropdown">
            <div className="headerDropdown__container row">
              {options.map((option, index) => (
                <Link
                  key={index}
                  href={option.path} // Set the href prop for the Link component
                  className="headerDropdown__item col-12"
                  onClick={(e) => {
                    if (option.name === "LogOut") {
                      e.preventDefault(); // Prevent the default link behavior for logout
                      handleOptionChange(option); // Call the logout handler
                    } else {
                      handleOptionChange(option); // Handle navigation for other options
                    }
                  }}
                >
                  {option.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
