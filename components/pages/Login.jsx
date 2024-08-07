"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { post } from "@/app/utils/api";
import { showSuccessToast, showErrorToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";

export default function Login ( { onLoginSuccess } ) {
  const [LogInData, setLogInData] = useState({
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    email: "",
    password: "",
  });
  const [LoginISChacked, setLoginISChacked] = useState(false);

  const router = useRouter();

  const HandleLogInChange = (e) => {
    const { name, value } = e.target;
    setLogInData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginCheckboxChange = (e) => {
    setLoginISChacked(e.target.checked);
  };

  const handleLoginSubmite = async (e) => {
    e.preventDefault();

    console.log("Form submitted");
    console.log("LoginISChacked:", LoginISChacked);

    if (LoginISChacked === true) {
      try {
        const response = await post("login", LogInData);
        localStorage.setItem("token", response.authorisation.token);
        showSuccessToast("Login successful! ");
        setTimeout(() => {
          onLoginSuccess()
        }, 3000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showErrorToast("Please verify your email");
        } else {
          showErrorToast("An error occurred during registration.");
        }
      }
    } else {
      showErrorToast("please check checkbox");
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
              <h1 className="text-30">
                {" "}
                {translate("Log In") || "Find Latest Packages"}
              </h1>
              <div className="text-18 fw-500 mt-20 md:mt-15">
                {translate("We're Glad To See You Again!") ||
                  "Find Latest Packages"}
              </div>
              <div className="mt-5">
                {translate("Don't Have An Account?") || "Find Latest Packages"}
                <Link href="/register" className="text-accent-1">
                  {translate("Sign Up!") || "Find Latest Packages"}
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleLoginSubmite}
              className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30"
            >
            
              <div className="form-input my-1">
                <input
                  type="email"
                  onChange={HandleLogInChange}
                  value={LogInData.email}
                  name="email"
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {translate("Email Address") || "Find Latest Packages"}
                </label>
              </div>

              <div className="form-input my-1">
                <input
                  type="password"
                  onChange={HandleLogInChange}
                  value={LogInData.password}
                  name="password"
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {" "}
                  {translate("Password") || "Find Latest Packages"}
                </label>
              </div>

              <div className="d-flex items-center">
                <label className="form-checkbox d-flex align-items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    className="form-checkbox__input"
                    checked={LoginISChacked}
                    onChange={handleLoginCheckboxChange}
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
                    {translate("Erinnere dich an mich") ||
                      "Find Latest Packages"}
                  </span>
                </label>
              </div>

              <div className="row y-gap-15">
                <div className="col-lg-6 col-12">
                  {/* <Link href='/customer/db-booking/'> */}
                  <button
                    type="submit"
                    className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                  >
                    {translate("Log In") || "Find Latest Packages"}
                  </button>
                  {/* </Link> */}
                </div>

                {/* <div className="col-lg-6 col-12">
                <Link href='/vendor/db-main/'>
                      <button
                        type="submit"
                        className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                      >
                         {translate("Vendor Log in") || "Find Latest Packages"}
                      </button>
                  </Link>
                </div> */}
              </div>

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
                    {translate("Facebook") || "Find Latest Packages"}
                  </button>
                </div>

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                    <FaGoogle size={15} className="mx-1" />
                    {translate("Google") || "Find Latest Packages"}
                  </button>
                </div>
              </div>
              <br />
              <div className="row y-gap-15">
                <div className="col">
                  <button className="button -md -outline-dark-1 text-dark-1 col-12">
                    <FaApple size={15} className="mx-1" />
                    {translate("Sign in With Apple") || "Find Latest Packages"}
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
