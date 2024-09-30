"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { post } from "@/app/utils/api";
import { showSuccessToast, showErrorToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const [RegisterData, setRegisterData] = useState({
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [confirm_pass, setConfirmpass] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    console.log(value,"value")
    setConfirmpass(value);
    console.log(RegisterData.password);
    if (value !== RegisterData.password) {
      setError("Passwords do not match");
      }else{
        setError("");
      }
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setRegisterData((prevState) => ({
      ...prevState,
      password: passwordValue,
    }));
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError("At least 8 characters include uppercase and lowercase letters, numbers and special characters");
    }  else {
      setPasswordError("");
    }
    if(!passwordValue){
      setPasswordError("");
    }
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const MatchPass = (e) => {
    setConfirm_pass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!RegisterData.name || !RegisterData.surname || !RegisterData.email || !RegisterData.password || !confirm_pass || isChecked === false){
      showErrorToast("Please fill all fields");
      return;
    }
    if (RegisterData.password === confirm_pass) {
      try {
        const response = await post("register", RegisterData);
        showSuccessToast(response.message);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showErrorToast(error.response.data.message);
        } else {
          showErrorToast("An error occurred during registration.");
        }
      }
      setRegisterData({
        name: "",
        surname: "",
        email: "",
        password: "",
      });

      setConfirmpass("");
      setIsChecked(false);
      localStorage.setItem("emailForSignIn", RegisterData.email);
      setTimeout(() => {
        router.push("/verify-email");
      }, 2000);
    } else {
      showErrorToast("password dose not match");
    }
  };

  const { translate } = useTranslation();
  return (
    <section className="mt-header layout-pt-lg layout-pb-lg">
      <ToastContainer />
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30">
              <h1 className="text-30"> {translate("Register")}</h1>
              <div className="text-18 fw-500 mt-20 md:mt-15">
                {translate("Let's Create Your Account!") ||
                  "Find Latest Packages"}
              </div>
              <div className="mt-5">
                {translate("Already Have An Account?") ||
                  "Find Latest Packages"}{" "}
                <Link href="/login" className="text-accent-1">
                  {translate("Log In")}!
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30"
            >
              <div className="form-input my-1">
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  value={RegisterData.name}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {" "}
                  {translate("Name")}
                </label>
              </div>

              <div className="form-input  my-1">
                <input
                  type="text"
                  onChange={handleChange}
                  name="surname"
                  value={RegisterData.surname}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {" "}
                  {translate("Surname")}
                </label>
              </div>

              <div className="form-input my-1">
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={RegisterData.email}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {" "}
                  {translate("Email Address")}
                </label>
              </div>

              <div className="form-input my-1">
                <input
                  type="password"
                  onChange={handlePassword}
                  name="password"
                  value={RegisterData.password}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {translate("Password")}
                </label>
                {passwordError && <div className="text-red">{passwordError}</div>}

              </div>

              <div className="form-input my-1">
                <input
                  type="password"
                  value={confirm_pass}
                  onChange={handlePasswordChange}
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {translate("Confirm Password")}
                </label>
                {error && <div className="text-red">{error}</div>}


              </div>

              <div className="d-flex items-center">
                <label className="form-checkbox d-flex align-items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    className="form-checkbox__input"
                    checked={isChecked}
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
                  <span className="text-14 lh-12 ml-10">
                    {translate(
                      "I have read the data protection and I accept the conditions."
                    )}
                  </span>
                </label>
              </div>

              <button
                className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                type="submit"
              >
                {translate("Register")}
              </button>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <button
                    type="submit"
                    className="button -md -outline-blue-1 text-blue-1 col-12"
                  >
                    <FaFacebookF size={15} className="mx-1" />
                    {translate("Facebook")}
                  </button>
                </div>

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    <FaGoogle size={15} className="mx-1" />
                    {translate("Google")}
                  </button>
                </div>
              </div>
              <br />
              <div className="row y-gap-15">
                <div className="col">
                  <button className="button -md -outline-dark-1 text-dark-1 col-12">
                    <FaApple size={15} className="mx-1" />
                    {translate("Sign in With Apple")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
