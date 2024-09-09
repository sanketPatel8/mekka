"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { post } from "@/app/utils/api";
import { showSuccessToast, showErrorToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { Auth } from "@/app/utils/api/authenticate";
import { useAuthContext } from "@/app/hooks/useAuthContext";

export default function Login({ onLoginSuccess }) {
  const [LogInData, setLogInData] = useState({
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    email: "",
    password: "",
  });
  const { LoginPer, setLoginPer } = useGlobalState()
  const [LoginISChacked, setLoginISChacked] = useState(false);
  const { dispatch } = useAuthContext();

  const router = useRouter();

  const { translate } = useTranslation();

  // Save data to local storage on input change
  const HandleLogInChange = (e) => {
    const { name, value } = e.target;
    setLogInData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setLoginISChacked(isChecked);
    typeof window != 'undefined' ? localStorage.setItem("LoginISChacked", isChecked) : '';
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();


    //   try {
    //     const response = await post("login", LogInData);
    //     localStorage.setItem("token", response.authorisation.token);
    //     localStorage.setItem("user", JSON.stringify(response.user));
    //     showSuccessToast("Login successful!");
    //     setTimeout(() => {
    //       setLoginPer(true) 
    //       router.push('/vendor/db-main');
    //     }, 2000);
    //   } catch (error) {
    //     if (
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       showErrorToast(error.response.data.message || "An error occurred.");
    //     } else {
    //       showErrorToast("An error occurred during login.");
    //     }

    // } 
    Auth.handleForm({ form: e, url: 'login', type: 'Add User', post: post });

  };

  const post = (data) => {
    // const form = document.querySelector("form");
    // form.classList.remove("was-validated");
    // setLoading(true);
    Auth.user(data)
      .then((resp) => {
        console.log(resp)
        if (resp.status == "error") {
          showErrorToast(resp.message);
        }

        
        if (resp.user.user_type == "vendor") {
          typeof window != 'undefined' ? localStorage.setItem("user", JSON.stringify(resp)) : '';
          dispatch({ type: "LOGIN", payload: resp });
          showSuccessToast("Login successful!");
          setTimeout(() => {
            setLoginPer(true)
            router.push('/vendor/dashboard');
          }, 1000);
        }
        else if (resp.user.user_type == "customer") {
          typeof window != 'undefined' ? localStorage.setItem("user", JSON.stringify(resp)) : '';
          dispatch({ type: "LOGIN", payload: resp });
          showSuccessToast("Login successful!");
          setTimeout(() => {
            setLoginPer(true)
            router.push('/');
          }, 1000);
        } 
        
        // if (resp.data == "" || resp.data == null) {
        //   toast.error(resp.error);
        //   setLoading(false);
        // }
        // else if (resp.data.business_verified == 0) {
        //   toast.success("Logged In successfully. Please setup your business now.");
        //   localStorage.setItem("user", JSON.stringify(resp.data));
        //   dispatch({ type: "LOGIN", payload: resp.data });
        //   setLoading(false);
        //   setTimeout(() => {
        //     router.push('/vendor/business-information');
        //   }, 1000);
        // }
        // else if (resp.data.business_verified == 1) {
        //   toast.success("Logged In Successfully.");
        //   localStorage.setItem("user", JSON.stringify(resp.data));
        //   dispatch({ type: "LOGIN", payload: resp.data });
        //   setLoading(false);
        //   setTimeout(() => {
        //     router.push('/vendor/booking');
        //   }, 1000);
        // } else {
        //   toast.error(resp.error);
        //   setLoading(false);
        // }
      })
      .catch((err) => {
        // showErrorToast("Invalid Email or Password");
      });
  };


  return (
    <section className="mt-header layout-pt-lg layout-pb-lg">
      <ToastContainer />
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30">
              <h1 className="text-30"> {translate("Log In")}</h1>
              <div className="text-18 fw-500 mt-20 md:mt-15">
                {translate("We're Glad To See You Again!")}
              </div>
              <div className="mt-5">
                {translate("Don't Have An Account?")}
                <Link href="/register" className="text-accent-1">
                  {translate("Sign Up!")}
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleLoginSubmit}
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
                  {translate("Email Address")}
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
                  {translate("Password")}
                </label>
              </div>

              <div className="d-flex justify-content-between">
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
                      {translate("Remember me")}
                    </span>
                  </label>
                </div>
                <button>
                  <Link href="/login/forgot-password">
                    Lost your password?
                  </Link>
                </button>
              </div>

              <div className="row y-gap-15">
                <div className="col-lg-6 col-12">
                  <button
                    type="submit"
                    className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                  >
                    {translate("Log In")}
                  </button>
                </div>
              </div>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                <div className="col">
                  <button
                    type="button"
                    className="button -md -outline-blue-1 text-blue-1 col-12"
                  >
                    <FaFacebookF size={15} className="mx-1" />
                    {translate("Facebook")}
                  </button>
                </div>

                <div className="col">
                  <button type="button" className="button -md -outline-red-1 text-red-1 col-12">
                    <FaGoogle size={15} className="mx-1" />
                    {translate("Google")}
                  </button>
                </div>
              </div>
              <br />
              <div className="row y-gap-15">
                <div className="col">
                  <button type="button" className="button -md -outline-dark-1 text-dark-1 col-12">
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
