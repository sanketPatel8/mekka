"use client"

import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { useTranslation } from "@/app/context/TranslationContext";
import { useGlobalState } from '@/app/context/GlobalStateContext';

const initializeFormValues = (count, template) => {
  return Array(count)
    .fill()
    .map(() => ({ ...template }));
};

const FormComponent = () => {
  const { adultNumber, youthNumber, childrenNumber , loginPer } = useGlobalState();
  const { translate } = useTranslation();
  const [formValues, setFormValues] = useState({
    adult: initializeFormValues(adultNumber, {
      name: "",
      surname: "",
      email: "",
      mobile: "",
      city: "",
      gender: "",
      birthday: "",
      nationality: "",
      houseno: "",
      zipcode: "",
      street: "",
      from: "",
      roomPreference: "", // Add this field
    }), 
    child: initializeFormValues(youthNumber, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
    }),
    baby: initializeFormValues(childrenNumber, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
    }),
  });

  useEffect(() => {
    // Client-side only logic if needed
  }, []);

  const handleInputChange = (type, index, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };
      updatedValues[type][index][name] = value;
      return updatedValues;
    });
  };

  const handleRadioChange = (type, index, e) => {
    handleInputChange(type, index, e); // Use handleInputChange to update the radio button value
  };

  const renderForms = (type, count) => {
    const fields = {
      adult: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Email"), type: "text", name: "email" },
        { label: translate("Phone"), type: "text", name: "mobile" },
        { label: translate("City"), type: "text", name: "city" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
        { label: translate("House No"), type: "text", name: "houseno" },
        { label: translate("ZIP Code"), type: "text", name: "zipcode" },
        { label: translate("Street"), type: "text", name: "street" },
        { label: translate("From"), type: "select", name: "from", options: ["Frankfurt(FRA)"] },
        { label: translate("Room Preference"), type: "radio", name: "roomPreference", options: ["4 Bettzimmer (Standard)", "3 Bettzimmer", "2 Bettzimmer", "1 Bettzimmer"] },
      ],
      adultFieldsForExtraAdults: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
        { label: translate("Room Preference"), type: "radio", name: "roomPreference", options: ["4 Bettzimmer (Standard)", "3 Bettzimmer", "2 Bettzimmer", "1 Bettzimmer"] },
      ],
      child: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
      ],
      baby: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Gender"), type: "select", name: "gender", options: ["Male", "Female", "Other"] },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        { label: translate("Nationality"), type: "select", name: "nationality", options: ["Indian", "German", "Canadian"] },
      ],
    };
  
    const shouldShowAdditionalServices = type !== "baby";
  
    return Array.from({ length: count }).map((_, i) => {
      const isExtraAdult = type === "adult" && i >= 1;
      const currentFields = isExtraAdult ? fields.adultFieldsForExtraAdults : fields[type];
      
      return (
        <div key={`${type}-${i}`} className="row">
          <div className="form_1 mx-auto">
            <div className="px-50 py-5 yellow_bg">
              <p>
                <span><FaUser /></span>
                <span><b>{`${i + 1}. ${type.charAt(0).toUpperCase() + type.slice(1)} Information`}</b></span>
              </p>
              <p>
                <span><MdError /></span>
                <span>{` Is Also The Contact Person For The Reservation.`}</span>
              </p>
            </div>
  
            <form className="y-gap-30 contactForm px-20 py-20">
              <div className="my-3 row">
                {currentFields?.map((field, index) => (
                  <div key={index} className={`col-md-${field.type === "select" ? "6" : "6"}`}>
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
                            <option value="" disabled>{field.label}</option>
                            {field.options.map((option, optIndex) => (
                              <option key={optIndex} value={option.toLowerCase()}>{option}</option>
                            ))}
                          </select>
                          <label className="lh-1 text-16 text-light-1">
                            {formValues[type][i][field.name] ? `${field.label}: ${formValues[type][i][field.name]}` : field.label}
                          </label>
                        </>
                      ) : field.type === "radio" ? (
                        <>
                          {field.options.map((option, optIndex) => (
                            <div key={optIndex} className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
                                    <input
                                      type="radio"
                                      name={field.name}
                                      value={option}
                                      checked={formValues[type][i][field.name] === option}
                                      onChange={(e) => handleRadioChange(type, i, e)}
                                    />
                                    <span className="radio__mark"><span className="radio__icon"></span></span>
                                    <span className="text-14 lh-1 ml-10">{option}</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formValues[type][i][field.name]}
                            onChange={(e) => handleInputChange(type, i, e)}
                            required
                            className="form-control"
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {formValues[type][i][field.name] ? `${field.label}: ${formValues[type][i][field.name]}` : field.label}
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                ))}
  
                {shouldShowAdditionalServices && (
                  <div className="col-lg-6">
                    <label className="lh-1 text-16 text-light-1">Additional Services</label>
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio d-flex items-center">
                          <input
                            type="checkbox"
                            name="additionalServices"
                            value="add1"
                            onChange={(e) => handleInputChange(type, i, e)}
                          />
                          <span className="radio__mark"><span className="radio__icon"></span></span>
                          <span className="text-14 lh-1 ml-10">Extra Luggage</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("First adult information:", formValues.adult[0]);

    const filteredAdultInfo = formValues.adult
      .filter((_, index) => index !== 0) // Exclude the first adult
      .map(adult => {
        // Remove empty values from each adult's info
        return Object.fromEntries(
          Object.entries(adult).filter(([key, value]) => value !== "")
        );
      });

    console.log("Remaining adults' information (excluding the first and without empty values):", filteredAdultInfo);

    console.log("Youth information:", formValues.child);
    console.log("Children information:", formValues.baby);
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderForms("adult", adultNumber)}
      {renderForms("child", youthNumber)}
      {renderForms("baby", childrenNumber)}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
