"use client";

import { useGlobalState } from "@/app/context/GlobalStateContext";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";

const MyComponent = () => {
  const [radioValue, setRadioValue] = useState("");
  const { adultNumber, youthNumber , childrenNumber } = useGlobalState();
  console.log("form count was " , adultNumber , youthNumber , childrenNumber);

  const initializeFormValues = (count, template) => {
    return Array(count).fill().map(() => ({ ...template }));
  };

  const [formValues, setFormValues] = useState({
    adult: initializeFormValues(adultNumber, { name: "", surname: "", email: "", phone: "", city: "", gender: "", birthdayDate: "", nationality: "", houseNo: "", zipCode: "", street: "", from: "" }),
    youth: initializeFormValues(youthNumber, { name: "", surname: "", gender: "", birthdayDate: "", nationality: "" }),
    children: initializeFormValues(childrenNumber, { name: "", surname: "", gender: "", birthdayDate: "", nationality: "" }),
  });

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleInputChange = (type, index, e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => {
      const updatedValues = { ...prevValues };
      updatedValues[type][index][name] = value;
      return updatedValues;
    });
  };

  const renderForms = (type, count) => {
    const fields = {
      adult: [
        { label: "Name", type: "text", name: "name" },
        { label: "Surname", type: "text", name: "surname" },
        { label: "Email", type: "text", name: "email" },
        { label: "Phone", type: "text", name: "phone" },
        { label: "City", type: "text", name: "city" },
        { label: "Gender", type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: "Birthday Date", type: "date", name: "birthdayDate" },
        { label: "Nationality", type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
        { label: "House No", type: "text", name: "houseNo" },
        { label: "ZIP Code", type: "text", name: "zipCode" },
        { label: "Street", type: "text", name: "street" },
        { label: "From", type: "select", name: "from", options: ["Frankfurt(FRA)"] }
      ],
      youth: [
        { label: "Name", type: "text", name: "name" },
        { label: "Surname", type: "text", name: "surname" },
        { label: "Gender", type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: "Birthday Date", type: "date", name: "birthdayDate" },
        { label: "Nationality", type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] }
      ],
      children: [
        { label: "Name", type: "text", name: "name" },
        { label: "Surname", type: "text", name: "surname" },
        { label: "Gender", type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: "Birthday Date", type: "date", name: "birthdayDate" },
        { label: "Nationality", type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] }
      ]
    };

    const shouldShowAdditionalServices = type !== "children";

    let forms = [];
    for (let i = 0; i < count; i++) {
      forms.push(
        <div key={`${type}-${i}`} className="row">
          <div className="form_1 col-6 mx-auto">
            <div className="px-50 py-5 yellow_bg">
              <p>
                <span>
                  <FaUser />
                </span>
                <span>
                  <b>{`${i + 1}. ${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Information`}</b>
                </span>
              </p>
              <p>
                <span>
                  <MdError />
                </span>
                <span>
                  {" "}
                  {`Is Also The Contact Person For The Reservation.`}
                </span>
              </p>
            </div>

            <form className="y-gap-30 contactForm px-20 py-20">
              <div className="my-3 row">
                {fields[type].map((field, index) => (
                  <div
                    key={index}
                    className={`col-md-${field.type === "select" ? "6" : "6"}`}
                  >
                    <div className="form-input my-1">
                      {field.type === "select" ? (
                        <>
                          <select
                            name={field.name}
                            value={formValues[type][i][field.name]}
                            onChange={(e) => handleInputChange(type, i, e)}
                            required
                            className="form-control"
                          >
                            <option value="" disabled>
                              {field.label}
                            </option>
                            {field.options.map((option, optIndex) => (
                              <option
                                key={optIndex}
                                value={option.toLowerCase()}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                          <label className="lh-1 text-16 text-light-1">
                            {field.label}
                          </label>
                        </>
                      ) : (
                        <>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formValues[type][i][field.name]}
                            onChange={(e) => handleInputChange(type, i, e)}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {field.label}
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-12">
                  <div className="row y-gap-20 items-center justify-between">
                    <div className="col-12 tb-border">
                      <div className="text-14">
                        <p className="d-flex justify-content-between">
                          <span>Tour Price Per Person</span>
                          <span>1.339,00 €</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`my-3 border_b px-md-40 ${shouldShowAdditionalServices ? "d-block" : "d-none"}`}
                >
                  <h5 className="text-18 fw-500 my-2">
                    Possible Additional Services Per Person:
                  </h5>

                  <div>
                    {/* Radio buttons for additional services */}
                    {[
                      "4 Bettzimmer (Standard)",
                      "3 Bettzimmer",
                      "2 Bettzimmer",
                      "1 Bettzimmer",
                    ].map((option, idx) => (
                      <div
                        key={idx}
                        className="d-flex items-center justify-between radio_hight"
                      >
                        <div className="d-flex items-center">
                          <div className="form-radio d-flex items-center">
                            <label className="radio d-flex items-center">
                              <input
                                type="radio"
                                name={`radioGroup-${i}`} // Ensure unique radio group names
                                value={`ad-1-${idx + 1}bad`}
                                checked={radioValue === `ad-1-${idx + 1}bad`}
                                onChange={handleRadioChange}
                              />
                              <span className="radio__mark">
                                <span className="radio__icon"></span>
                              </span>
                              <span className="text-14 lh-1 ml-10">
                                {option}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="text-14">
                          {idx === 0 ? "0,00 €" : `+${(idx + 1) * 100},00€`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 col-md-12">
                  <p>
                    All Prices Include VAT. The City Tax Is Paid By The Guest
                    On Arrival.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return forms;
  };

  // Function to handle form submission and print data
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formValues);
  };

  return (
    <div>
      {renderForms("adult", adultNumber)}
      {renderForms("youth", youthNumber)}
      {renderForms("children", childrenNumber)}

      {/* Submit button to print form values */}
      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="btn btn-primary">
          Print Form Data
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
