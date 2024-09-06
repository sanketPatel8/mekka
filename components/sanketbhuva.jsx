"use client"

import { useTranslation } from '@/app/context/TranslationContext';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

const MyFormComponent = ({
  adultData,
  Childrendata,
  babyData,
  AdditionalServices,
  
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to handle radio button changes for each group
  const handleRadioChange = (groupIdx, option) => {
    setSelectedOptions((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[groupIdx] = option; // Update the option for the specific group
      return newSelected;
    });
  };

  const initializeFormValues = (count, template) => {
    return Array(count)
      .fill()
      .map(() => ({ ...template }));
  };

  const [formValues, setFormValues] = useState({
    adult: initializeFormValues(adultData?.count, {
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
    }),
    child: initializeFormValues(Childrendata?.count, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
    }),
    baby: initializeFormValues(babyData?.count, {
      name: "",
      surname: "",
      gender: "",
      birthday: "",
      nationality: "",
    }),
  });

  const handleInputChange = (type, index, e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues };
      updatedValues[type][index][name] = value;
      return updatedValues;
    });
  };

  const renderForms = (type, count) => {
    const fields = {
      adult: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        { label: translate("Email"), type: "text", name: "email" },
        { label: translate("Phone"), type: "text", name: "mobile" },
        { label: translate("City"), type: "text", name: "city" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
        { label: translate("House No"), type: "text", name: "houseno" },
        { label: translate("ZIP Code"), type: "text", name: "zipcode" },
        { label: translate("Street"), type: "text", name: "street" },
      ],
      adultFieldsForExtraAdults: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
      ],
      child: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
      ],
      baby: [
        { label: translate("Name"), type: "text", name: "name" },
        { label: translate("Surname"), type: "text", name: "surname" },
        {
          label: translate("Gender"),
          type: "select",
          name: "gender",
          options: ["Male", "Female", "Other"],
        },
        { label: translate("Birthday Date"), type: "date", name: "birthday" },
        {
          label: translate("Nationality"),
          type: "select",
          name: "nationality",
          options: ["Indian", "German", "Canadian"],
        },
      ],
    };

    const shouldShowAdditionalServices = type !== "baby";

    return Array.from({ length: count }).map((_, i) => {
      const isExtraAdult = type === "adult" && i >= 1;
      const currentFields = isExtraAdult
        ? fields.adultFieldsForExtraAdults
        : fields[type];

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
                <span> Is Also The Contact Person For The Reservation.</span>
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
                              <option key={optIndex} value={option.toLowerCase()}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <label className="lh-1 text-16 text-light-1">
                            {formValues[type][i][field.name]
                              ? `${field.label}: ${formValues[type][i][field.name]}`
                              : field.label}
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

                {shouldShowAdditionalServices && (
                  <div className="my-3 border_b px-md-40">
                    <h5 className="text-18 fw-500 my-2">Possible Additional Services Per Person:</h5>
                    <div>
                      {AdditionalServices?.map((group, groupIdx) => (
                        <div key={groupIdx} className="service-group">
                          {group.map((option, idx) => (
                            <div key={option.id} className="d-flex items-center justify-between radio_hight">
                              <div className="d-flex items-center">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
                                    <input
                                      type="radio"
                                      name={`radioGroup-${groupIdx}`}
                                      value={option.id}
                                      checked={selectedOptions[groupIdx]?.id === option.id}
                                      onChange={() => handleRadioChange(groupIdx, option)}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-10">{option.title}</span>
                                  </label>
                                </div>
                              </div>
                              <div className="text-14">+{option.price} €</div>
                            </div>
                          ))}
                        </div>
                      ))}
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

  const { translate } = useTranslation();

  return (
    <div>
      {renderForms('adult', adultData?.count)}
      {renderForms('child', Childrendata?.count)}
      {renderForms('baby', babyData?.count)}
    </div>
  );
};

export default MyFormComponent;
