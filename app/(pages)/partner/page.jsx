"use client";

import React, { useState, useEffect } from "react";
import Header1 from "@/components/layout/header/Header1";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import { POST } from "@/app/utils/api/post";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
// import "select2/dist/js/select2.min.js";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "@/app/context/TranslationContext";
import { countries } from "@/data/nationalities";
import { ClipLoader } from "react-spinners";
import { set } from "lodash";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCountryCode } from "@/app/context/useCountryCode";

const page = () => {
  const [From, setFrom] = useState("Frankfurt(FRA)");
  const [gender, setGender] = useState("");
  const [Nationality, setNationality] = useState("");
  const [radioValue, setRadioValue] = useState("mosque");
  const [customGender, setCustomGender] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [company_email, setCompanyEmail] = useState("");
  const [company_mobile, setCompanyMobile] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState("");
  const [website, setWebsite] = useState("");
  const { translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const options = [
    { value: "1", label: "Zip Code" },
    { value: "2", label: "152523" },
    { value: "3", label: "1634748" },
  ];
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "Partner Registration - MekkaBooking";
    }
  }, []);

  const { countryCode } = useCountryCode();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Import Select2 only on the client-side
  //     import("select2/dist/js/select2.min.js").then(() => {
  //       // Ensure jQuery is available globally
  //       window.$ = window.jQuery = $;

  //       // Initialize Select2 on the component
  //       $("#my-select").select2({
  //         placeholder: "Select an option",
  //         width: "100%",
  //       });
  //     });

  //     // Cleanup Select2 on component unmount
  //     return () => {
  //       if ($.fn.select2) {
  //         $("#my-select").select2("destroy");
  //       }
  //     };
  //   }
  // }, []);

  const HandleCountryChange = (newValue, actionMeta) => {
    setSelectedCountry(newValue);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleInputChange = (setter) => (e) => {
    const { value } = e.target;
    setter(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (!password) {
      setError(`${translate("Please enter password first")}`);
    } else if (password && value !== password) {
      setError(`${translate("Passwords do not match")}`);
    } else if (password && value === password) {
      setError("");
    }
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError(
        `${translate(
          "At least 8 characters include uppercase and lowercase letters, numbers and special characters"
        )}`
      );
    } else {
      setPasswordError("");
    }
    if (!passwordValue) {
      setPasswordError("");
    }
  };
  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  const validate = () => {
    let tempErrors = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      tempErrors.email = `${translate("Invalid email address")}`;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(company_email)) {
      tempErrors.company_email = `${translate("Invalid email address")}`;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/.test(
        password
      )
    ) {
      tempErrors.password = `${translate(
        "At least 8 characters include uppercase and lowercase letters, numbers and special characters"
      )}`;
    }
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !surname ||
      !email ||
      !password ||
      !mobile ||
      !street ||
      !houseNumber ||
      !zipcode ||
      !city ||
      !state ||
      !companyName ||
      !SelectedCountry ||
      !company_email ||
      !company_mobile ||
      !agreeToTerms
    ) {
      showErrorToast(translate, "Please fill all the fields");
      return;
    }

    const tempErrors = validate();

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      showErrorToast(translate, "Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast(translate, "Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("mobile", mobile);
    formData.append("street", street);
    formData.append("houseNumber", houseNumber);
    formData.append("zipcode", zipcode);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("companyName", companyName);
    formData.append("company_email", company_email);
    formData.append("company_mobile", company_mobile);
    formData.append("is_mosque", radioValue === "mosque" ? 1 : 0);
    formData.append("country", SelectedCountry.value);
    formData.append("website", website);

    const url = `vendor_register`;
    try {
      setIsLoading(true);
      const response = await POST.request({
        form: formData,
        url: url,
        header: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === "success") {
        setIsLoading(false);

        showSuccessToast(translate, "User created successfully");
        router.push("/thank-you");
      } else if (response.status === "error") {
        console.error("error");
        setIsLoading(false);
        showErrorToast(translate, "Email already exists");
      }
    } catch (err) {
      console.error("error5");
      setIsLoading(false);
      showErrorToast(translate, "Something went wrong");
    }
  };
  const handleCompanyMobileNumberChange = (e) => {
    setCompanyMobile(e);
  };
  const handleMobileNumberChange = (e) => {
    setMobile(e);
  };

  return (
    <>
      <ToastContainer />
      <Header1 />
      <div className="mt-80 mb-80">
        <h1 className="text-center items-pedding">
          {translate("Partner Registration")}{" "}
        </h1>
        <div className="container">
          <form
            className=" d-flex flex-column w-100"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="row shadow-2">
              <div className="col-md-6 col-12 text-center p-5 border-1 ">
                <h1>{translate("Organization")}</h1>

                <div className="form_2">
                  <div className=" y-gap-30 contactForm px-20 py-20 ">
                    <div className="flex-center">
                      <div className="d-flex items-center mx-2">
                        <div className="form-radio d-flex items-center">
                          <label className="radio">
                            <input
                              type="radio"
                              name="radioGroup"
                              value="travel_agency"
                              checked={radioValue === "travel_agency"}
                              onChange={handleRadioChange}
                            />
                            <span className="radio__mark">
                              <span className="radio__icon"></span>
                            </span>
                            {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                          </label>
                        </div>
                        <div className="ml-10">{translate("Agency")}</div>
                      </div>
                      <div className="d-flex items-center mx-2">
                        <div className="form-radio d-flex items-center">
                          <label className="radio">
                            <input
                              type="radio"
                              name="radioGroup"
                              value="mosque"
                              checked={radioValue === "mosque"}
                              onChange={handleRadioChange}
                            />
                            <span className="radio__mark">
                              <span className="radio__icon"></span>
                            </span>
                            {/* <span className="text-14 lh-1 ml-10"></span> */}
                          </label>
                        </div>
                        <div className="ml-10">{translate("Mosque")}</div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={handleInputChange(setCompanyName)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Organization Name")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={state}
                            onChange={handleInputChange(setState)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("State")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={street}
                            onChange={handleInputChange(setStreet)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Street")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={houseNumber}
                            onChange={handleInputChange(setHouseNumber)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("House No")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        {/* <div>
                          <div className="">
                            <select id="my-select"  value={zipcode} onChange={handleInputChange(setZipcode)} className="form-control">
                              {options.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div> */}
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={zipcode}
                            onChange={handleInputChange(setZipcode)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Zip Code")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={handleInputChange(setCity)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("City")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input my-1 d-flex flex-column align-items-center add-tour-type">
                          <CreatableSelect
                            value={SelectedCountry}
                            onChange={HandleCountryChange}
                            options={countries.map((country) => ({
                              value: country.name,
                              label: country.name,
                            }))}
                            className="custom-select"
                            placeholder={`${translate("Select Country")} *`}
                            classNamePrefix="react-select"
                            isClearable
                            formatCreateLabel={(inputValue) =>
                              `Create custom Country: "${inputValue}"`
                            }
                            styles={{
                              option: (provided) => ({
                                ...provided,
                                textAlign: "left", // Align option text to the right
                              }),
                              singleValue: (provided) => ({
                                ...provided,
                                textAlign: "left", // Align selected value text to the right
                              }),
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          {/* <input
                            type="text"
                            min={0}
                            max={10}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            required
                            value={company_mobile}
                            onChange={handleCompanyMobileNumberChange}
                          /> */}
                          <PhoneInput
                            country={company_mobile !== "" ? "" : countryCode}
                            value={company_mobile}
                            onChange={handleCompanyMobileNumberChange}
                            inputProps={{
                              name: "phone",
                              required: true,
                              autoFocus: true,
                            }}
                            inputClass="phonenumber_input"
                            containerStyle={{
                              width: "100%",
                              marginBottom: "10px",
                              backgroundColor: "white",
                            }}
                            inputStyle={{
                              width: "100%",
                              padding: "12px 45px",
                              borderRadius: "4px",
                              border: "1px solid #E7E6E6",
                              fontSize: "16px",
                              boxSizing: "border-box",
                              borderRadius: "12px",
                              backgroundColor: "white",
                            }}
                            className="form-input  "
                            enableSearch={true}
                          />
                          {/* <label className="lh-1 text-16 text-light-1">
                            {translate("Phone Number")}{" "}
                            <span className="text-red font_11">*</span>
                          </label> */}
                          <label className="phone_lable">
                            {translate("Phone Number")}
                            <span className="text-red font_11">*</span>
                            {/* <span className="text_red">{PhoneError}</span> */}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="email"
                            required
                            value={company_email}
                            className="mb-1"
                            onChange={handleInputChange(setCompanyEmail)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("E-Mail Adress")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                          {errors.company_email && (
                            <span className="text-red font_11">
                              {" "}
                              {errors.company_email}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input m-0">
                          <input
                            type="text"
                            required
                            defaultValue={
                              website !== "null" && website !== ""
                                ? website
                                : ""
                            }
                            onChange={handleInputChange(setWebsite)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {" "}
                            {translate("Website")}
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
                <h1>{translate("Authorised Person")}</h1>
                <div className="form_2">
                  <div className=" y-gap-30 contactForm px-20 py-20 ">
                    <div className="row my-3">
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={handleInputChange(setName)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Name")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={surname}
                            onChange={handleInputChange(setSurname)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Surname")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        {/* <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            maxLength={10}
                            value={mobile}
                            onChange={handleMobileNumberChange}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Phone Number")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                        </div> */}
                        <div className="form-input spacing">
                          {/* <input
                            type="text"
                            min={0}
                            max={10}
                            pattern="[0-9]{10}"
                            maxLength={10}
                            required
                            value={company_mobile}
                            onChange={handleCompanyMobileNumberChange}
                          /> */}
                          <PhoneInput
                            country={mobile !== "" ? "" : countryCode}
                            value={mobile}
                            onChange={handleMobileNumberChange}
                            inputProps={{
                              name: "phone",
                              required: true,
                              autoFocus: true,
                            }}
                            inputClass="phonenumber_input"
                            containerStyle={{
                              width: "100%",
                              marginBottom: "10px",
                              backgroundColor: "white",
                            }}
                            inputStyle={{
                              width: "100%",
                              padding: "12px 45px",
                              borderRadius: "4px",
                              border: "1px solid #E7E6E6",
                              fontSize: "16px",
                              boxSizing: "border-box",
                              borderRadius: "12px",
                              backgroundColor: "white",
                            }}
                            className="form-input  "
                            enableSearch={true}
                          />
                          {/* <label className="lh-1 text-16 text-light-1">
                            {translate("Phone Number")}{" "}
                            <span className="text-red font_11">*</span>
                          </label> */}
                          <label className="phone_lable">
                            {translate("Phone Number")}
                            <span className="text-red font_11">*</span>
                            {/* <span className="text_red">{PhoneError}</span> */}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          <input
                            type="text"
                            required
                            value={email}
                            className="mb-1"
                            onChange={handleInputChange(setEmail)}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Email Adresse")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                          {errors.email && (
                            <span className="text-red font_11">
                              {" "}
                              {errors.email}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-input spacing">
                          <input
                            type="password"
                            required
                            value={password}
                            className="mb-0"
                            onChange={handlePassword}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Password")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                          {/* <span className="text-red font_11">
                            {translate(
                              "At least 8 characters include uppercase and lowercase letters, numbers and special characters"
                            )}
                          </span> */}
                          {/* {errors.password && <div className='text-red font_11'> {errors.password}</div>} */}

                          {passwordError && (
                            <div className="text-red  font_11">
                              {passwordError}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-input spacing">
                          <input
                            type="password"
                            required
                            className="mb-2"
                            onChange={handlePasswordChange}
                            value={confirmPassword}
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Confirm Password")}{" "}
                            <span className="text-red font_11">*</span>
                          </label>
                          {error && (
                            <div className="text-red font_11">{error}</div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex items-center mt-3">
                        <label className="form-checkbox d-flex align-items-center">
                          <input
                            type="checkbox"
                            name="name"
                            className="form-checkbox__input"
                            checked={agreeToTerms}
                            onChange={handleCheckboxChange}
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
                          <span className="text-14 lh-12 ml-10 text-left">
                            {translate("I have read the")}{" "}
                            <Link
                              href={"/Datenschutz"}
                              className="text-blue"
                              target="_blank"
                            >
                              {translate("data protection")}
                            </Link>{" "}
                            {translate("and I accept the")}{" "}
                            <Link
                              href={"/Terms-of-Use"}
                              className="text-blue"
                              target="_blank"
                            >
                              {translate("Terms")}
                            </Link>
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="flex-center">
                        <button
                          type="submit"
                          className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                        >
                          {isLoading ? (
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: "30px", width: "100%" }}
                            >
                              <ClipLoader color="#ffffff" size={30} />
                            </div>
                          ) : (
                            translate("Submit")
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterTwo />
    </>
  );
};

export default page;
