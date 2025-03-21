"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { post } from "@/app/utils/api";
import { showSuccessToast, showErrorToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { POST } from "@/app/utils/api/post";

export default function ForgotPasswordPartner({ onLoginSuccess }) {
  const [email, setEmail] = useState("");

  const route = useRouter()
  const { translate } = useTranslation();


  const HandleLogInChange = (e) => {
    const { name, value } = e.target;
    setEmail(value)
  };

  const handleLoginSubmite = async (e) => {
    e.preventDefault();
   
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await POST.request({form: formData, url:"forgot_password"});
      showSuccessToast(translate, "Mail Sent Successfully");
      setEmail("")
      setTimeout(() => {
        route.push('/partner-login')
      }, 4000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showErrorToast(translate,"Please verify your email");
      } else {
        showErrorToast(translate, "An error occurred during registration");
      }
    }
  };

  return (
    <section className="mt-header layout-pt-lg layout-pb-lg">
      <ToastContainer />
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-7 col-md-9">
            <div className="text-center mb-60 md:mb-30">
              <h1 className="text-30"> {translate("Lost Your Password")}</h1>
            </div>

            <form
              onSubmit={handleLoginSubmite}
              className="contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30"
            >
              <div className="form-input my-1">
                <input
                  type="email"
                  onChange={HandleLogInChange}
                  value={email}
                  name="email"
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {translate("Email Address")}
                </label>
              </div>

              <div className=" d-flex justify-content-center">
                <button
                  type="submit"
                  className="button -md -info-2 bg-accent-1 text-white col-12 mt-30 mx-auto"
                >
                  {translate("Submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
