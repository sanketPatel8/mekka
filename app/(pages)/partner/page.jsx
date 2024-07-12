"use client";

import React, { useState, useEffect } from "react";
import Header1 from "@/components/layout/header/Header1";
import CreatableSelect from "react-select/creatable";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";

const page = () => {
  const [From, setFrom] = useState("Frankfurt(FRA)");
  const [gender, setGender] = useState("");
  const [Nationality, setNationality] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [customGender, setCustomGender] = useState("");

  const options = [
    { value: "1", label: "Zip Code" },
    { value: "2", label: "152523" },
    { value: "3", label: "1634748" },
  ];

  useEffect(() => {
    // Initialize Select2 on the component
    $("#my-select").select2({
      placeholder: "Select an option",
      width: "100%",
    });

    // Cleanup Select2 on component unmount
    return () => {
      $("#my-select").select2("destroy");
    };
  }, []);


  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  return (
    <>
      <Header1 />
      <div className="mt-80">
        <h1 className="text-center my-5">Partner Registration</h1>
        <div className="container">
          <div className="row shadow-2">
            <div className="col-md-6 col-12 text-center p-5 border-1 ">
              <h1>Organization</h1>
              <div className="form_2">
                <div className=" y-gap-30 contactForm px-20 py-20 ">
                  <div className="flex-center">
                    <div className="d-flex items-center mx-2">
                      <div className="form-radio d-flex items-center">
                        <label className="radio">
                          <input
                            type="radio"
                            name="radioGroup"
                            value="f-1-bed-4"
                            checked={radioValue === "f-1-bed-4"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          {/* <span className="text-14 lh-1 ml-10"></span> */}
                        </label>
                      </div>
                      <div className="ml-10">Mosque</div>
                    </div>
                    <div className="d-flex items-center mx-2">
                      <div className="form-radio d-flex items-center">
                        <label className="radio">
                          <input
                            type="radio"
                            name="radioGroup"
                            value="f-1-bed-3"
                            checked={radioValue === "f-1-bed-3"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                        </label>
                      </div>
                      <div className="ml-10">Travel Agency</div>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Organization Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          State
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <div className="">
                          <select id="my-select" className="form-control">
                            {options.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          City
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Street
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          House No
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          E-Mail Address
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Phone Number
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-12">
                <div className="flex-center">
                  <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">CANCEL</button>
                </div>
              </div> */}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 text-center border-1 p-5">
              <h1>Authorised Person</h1>
              <div className="form_2">
                <div className=" y-gap-30 contactForm px-20 py-20 ">
                  <div className="row my-3">
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Surname
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          E-mail Address
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <input type="text" required />
                        <label className="lh-1 text-16 text-light-1">
                          Phone Number
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-input spacing">
                        <input type="password" required />
                        <label className="lh-1 text-16 text-light-1">
                          Password
                        </label>
                        <span>
                          At least 8 characters include uppercase and lowercase
                          letters, numbers and special characters
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-input spacing">
                        <input type="password" required />
                        <label className="lh-1 text-16 text-light-1">
                          Confirm Password*
                        </label>
                      </div>
                    </div>
                    <div className="d-flex items-center">
                      <label className="form-checkbox d-flex align-items-center">
                        <input
                          type="checkbox"
                          name="name"
                          className="form-checkbox__input"
                        />
                        <div className="form-checkbox__mark">
                          <div className="form-checkbox__icon">
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        </div>
                        <span className="text-14 lh-12 ml-10">
                          I have read the data protection and I accept the
                          conditions.
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="flex-center">
                      <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
