"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { post } from "@/app/utils/api";
import { showSuccessToast, showErrorToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { Auth } from "@/app/utils/api/authenticate";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import dynamic from "next/dynamic";
import { POST } from "@/app/utils/api/post";
import { ClipLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import {
  LoginSocialFacebook,
  LoginSocialGoogle,
  LoginSocialApple,
} from "reactjs-social-login";

export default function Login({
  onLoginSuccess,
  classfor,
  sectionClass,
  hide,
  path,
  Loading,
  bookingPage,
}) {
  // const LoginSocialFacebook = dynamic(
  //   () => import("reactjs-social-login").then((mod) => mod.LoginSocialFacebook),
  //   { ssr: false }
  // );
  // const LoginSocialGoogle = dynamic(
  //   () => import("reactjs-social-login").then((mod) => mod.LoginSocialGoogle),
  //   { ssr: false }
  // );
  // const LoginSocialApple = dynamic(
  //   () => import("reactjs-social-login").then((mod) => mod.LoginSocialApple),
  //   { ssr: false }
  // );

  const [LogInData, setLogInData] = useState({
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    email: "",
    password: "",
  });
  const { LoginPer, setLoginPer } = useGlobalState();
  const [LoginISChacked, setLoginISChacked] = useState(false);
  const { dispatch } = useAuthContext();
  const [LoginChecked, setLoginChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { translate } = useTranslation();
  const LoginUpdate = () => {
    const loginStatus = JSON.parse(localStorage.getItem("CustomerLoginCheck"));

    const updatedStatus = loginStatus !== undefined ? true : false;
  };

  const [socialLoginLoading, setSocialLoginLoading] = useState({
    google: false,
    facebook: false,
    apple: false,
  });
  const [redirectUri, setRedirectUri] = useState("");
  const [redirectpath, setRedirectPath] = useState("");

  useEffect(() => {
    // Set redirect URI only in the browser
    if (typeof window !== "undefined") {
      setRedirectUri(`${window.location.origin}/login`);
    }
  }, []);

  useEffect(() => {
    const redirect = localStorage.getItem("Redirect_Login");
    console.log(redirect);
    setRedirectPath(redirect);
  }, []);

  const signinSocial = async ({ type, email, id, name, data }) => {
    if (type === "apple") {
      const token = data.authorization.id_token;
      const decodedToken = jwtDecode(token);

      const appleData = {
        email: decodedToken.email,
        auth_provider: type,
        provider_id: decodedToken.sub,
        name: "",
      };

      const resp = await POST.request({
        form: appleData,
        url: "social_login",
      });

      if (resp.Status == 1) {
        showSuccessToast(translate, "Successfully logged in");
        localStorage.setItem("customer", JSON.stringify(resp));
        dispatch({ type: "LOGIN_CUSTOMER", payload: resp });
        setSocialLoginLoading({ google: false, facebook: false, apple: false });

        // if (redirectpath == null) {
        //   setTimeout(() => {
        //     setLoginPer(true);
        //     router.push(path);
        //   }, 1000);
        // }
      }
    } else {
      const resp = await POST.request({
        form: {
          email: email,
          auth_provider: type,
          provider_id: id,
          name: name,
        },
        url: "social_login",
      });
      console.log(resp,"resp")
      if (resp.Status == 1) {
        
        showSuccessToast(translate, "Successfully logged in");
        localStorage.setItem("customer", JSON.stringify(resp));
        dispatch({ type: "LOGIN_CUSTOMER", payload: resp });
        LoginUpdate();
        setSocialLoginLoading({ google: false, facebook: false, apple: false });

        if (redirectpath == null) {
          setTimeout(() => {
            setLoginPer(true);
            router.push("/customer/booking");
          }, 1000);
        }
      } else {
        showErrorToast(translate, "Invalid Credentials");
        setLogInData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          email: "",
          password: "",
        });
        setSocialLoginLoading({ google: false, facebook: false, apple: false });
      }
    }
  };

  const HandleLogInChange = useCallback((e) => {
    const { name, value } = e.target;
    setLogInData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleLoginCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setLoginISChacked(isChecked);
    localStorage.setItem("LoginISChacked", isChecked);
  };

  // useEffect(() => {
  //   // Load the Facebook SDK
  //   const loadFBSDK = () => {
  //     if (typeof window !== "undefined" && !window.FB) {
  //       window.fbAsyncInit = function () {
  //         window.FB.init({
  //           appId: process.env.NEXT_PUBLIC_REACT_APP_FB_APP_ID,
  //           cookie: true,
  //           xfbml: true,
  //           version: "v10.0", // Use the latest version
  //         });
  //       };

  //       const script = document.createElement("script");
  //       script.src = "https://connect.facebook.net/en_US/sdk.js";
  //       script.async = true;
  //       document.body.appendChild(script);
  //     }
  //   };

  //   loadFBSDK();
  // }, []);

  // const handleFacebookLogin = (data) => {
  //   const { id, name, email } = data;
  //   if (typeof window !== "undefined") {
  //     window.FB.getLoginStatus((response) => {
  //       if (response.status === "connected") {
  //         signinSocial({
  //           type: "facebook",
  //           data: { id, name, email },
  //         });
  //       }
  //     });
  //     // Avoid calling window.FB.logout() directly if not needed
  //   }
  // };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    Auth.handleForm({ form: e, url: "login", type: "Add User", post: post });
  };

  const post = (data) => {
    // const form = document.querySelector("form");
    // form.classList.remove("was-validated");
    // setLoading(true);
    setIsLoading(true);
    Auth.user(data)
      .then((resp) => {
        setIsLoading(false);
        if (resp.status == "error") {
          showErrorToast(translate, resp.message);
        } else if (resp.status == "success") {
          if (resp.user.user_type == "customer") {
            localStorage.setItem("customer", JSON.stringify(resp));
            localStorage.setItem("CustomerLoginCheck", JSON.stringify(true));

            dispatch({ type: "LOGIN_CUSTOMER", payload: resp });
            // LoginUpdate();

            showSuccessToast(translate, "Login successful!");
            // setTimeout(() => {
            //   setLoginPer(true)
            //   router.push(path);
            // }, 2000);
            const redirect = localStorage.getItem("Redirect_Login");
            if (redirect) {
              setTimeout(() => {
                window.location.reload();
                localStorage.removeItem("Redirect_Login");
              }, 2000);
            } else if (redirect == null) {
              setTimeout(() => {
                setLoginPer(true);
                router.push(path);
              }, 2000);
            }
          } else if (resp.user.user_type == "vendor") {
            showErrorToast(
              translate,
              "Invalid Credentials. If you are tour agent, please login from the partner login page"
            );
            setLogInData({
              AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
              email: "",
              password: "",
            });
          }
        }
      })
      .catch((err) => {
        showErrorToast(
          translate,
          "Invalid Credentials. If you are tour agent, please login from the partner login page"
        );
        setIsLoading(false);
      });
  };

  return (
    <>
      {Loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "500px" }}
        >
          <ClipLoader color="#DAC04F" size={50} />
        </div>
      ) : (
        <section className={`${sectionClass}  `}>
          <div className={hide === false ? "d-none" : "d-block"}></div>
          <div className="container">
            <div className="row justify-center">
              <div className={classfor}>
                <div className="text-center mb-30 md:mb-30">
                  <h1 className="text-30"> {translate("Log In")}</h1>
                  <div className={hide === false ? "d-none" : "d-block"}>
                    <div className="text-18 fw-500 mt-20 md:mt-15">
                      {translate("We're Glad To See You Again!")}
                    </div>
                    <div className="mt-5">
                      {translate("Don't Have An Account?")}
                      <Link href="/register" className="text-accent-1">
                        {" "}
                        {translate("Sign Up")}!
                      </Link>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleLoginSubmit}
                  className={`${
                    bookingPage === true
                      ? `contactForm  rounded-12 px-60 ${hide === false ? 'py-0' : 'py-60'} md:px-25 md:py-30`
                      : " mb-30 contactForm border-1 rounded-12 px-60 py-60 md:px-25 md:py-30 "
                  }`}
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
                      {translate("Email Address")}{" "}
                      <span className="text-red">*</span>
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
                      {translate("Password")}{" "}
                      <span className="text-red">*</span>
                    </label>
                  </div>

                  <div className="d-flex justify-content-end">
                    {/* <div className="d-flex items-center">
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
                </div> */}
                    <button>
                      <Link href="/login/forgot-password">
                        {translate("Lost your password")}?
                      </Link>
                    </button>
                  </div>

                  <div className="row y-gap-15">
                    <div className=" col-12">
                      <button
                        type="submit"
                        className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                      >
                        {isLoading ? (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "30px", width: "100%" }}
                          >
                            <ClipLoader color="#ffffff" size={30} />
                          </div>
                        ) : (
                          translate("Log In")
                        )}
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
                        className="button mdButton -outline-blue-1 text-blue-1 col-12"
                        style={{ height: "60px" }}
                      >
                        {/* <FaFacebookF size={15} className="mx-1" />
                         {translate("Facebook")} */}

                        {(!socialLoginLoading?.facebook && (
                          // <LoginSocialFacebook
                          //   appId={
                          //     process.env.NEXT_PUBLIC_REACT_APP_FB_APP_ID || ""
                          //   }
                          //   fieldsProfile="id,name,email"
                          //   scope="email"
                          //   onLoginStart={() =>
                          //     setSocialLoginLoading({
                          //       google: false,
                          //       facebook: true,
                          //       apple: false,
                          //     })
                          //   }
                          //   onResolve={({ provider, data }) =>
                          //     handleFacebookLogin(data)
                          //   }
                          //   onLoginSuccess={() =>
                          //     setSocialLoginLoading({
                          //       google: false,
                          //       facebook: false,
                          //       apple: false,
                          //     })
                          //   }
                          //   onReject={(err) =>
                          //     setSocialLoginLoading({
                          //       google: false,
                          //       facebook: false,
                          //       apple: false,
                          //     })
                          //   }
                          // >
                          //   <FaFacebookF size={15} className="mx-1" />
                          //   {translate("Facebook")}
                          // </LoginSocialFacebook>

                          <LoginSocialFacebook
                                                    appId={
                                                      process.env.NEXT_PUBLIC_REACT_APP_FB_APP_ID || ""
                                                    }
                                                    fieldsProfile={
                                                      "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                                                    }
                                                    scope="email,public_profile"
                                                    onLoginStart={() => console.log("start")}
                                                    onResolve={({ provider, data }) => {
                                                      const { id, name, email } = data;
                                                      console.log(data);
                                                      typeof window !== "undefined" ? window.FB.getLoginStatus((response) => {
                                                        if (response.status === "connected") {
                                                          signinSocial({
                                                            type: "facebook",
                                                            data: { id, name, email },
                                                          });
                                                        }
                                                      }):"";
                                                      typeof window !== "undefined" ? window.FB.logout() : "";
                                                    }}
                                                    onReject={(err) => {
                                                      console.log(err);
                                                    }}
                                                  >
                                                    <FaFacebookF size={15} className="mx-1" />
                                                    {translate("Facebook")}
                                                  </LoginSocialFacebook>
                        )) || (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "30px", width: "100%" }}
                          >
                            <ClipLoader color="#1967D2" size={30} />
                          </div>
                        )}
                      </button>
                    </div>

                    <div className="col">
                      <div
                        className="button -md -outline-red-1 text-red-1 col-12"
                        style={{ height: "60px" }}
                      >
                        {/* <FaGoogle size={15} className="mx-1" />
                          {translate("Google")} */}
                        {(!socialLoginLoading?.google && (
                          <LoginSocialGoogle
                            client_id={
                              process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
                            }
                            redirect_uri={redirectUri}
                            client_secret={
                              process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ""
                            }
                            // redirect_uri={window.location.origin + "/login"}
                            onLoginStart={() =>
                              setSocialLoginLoading({
                                google: true,
                                facebook: false,
                                apple: false,
                              })
                            }
                            scope="openid profile email"
                            discoveryDocs="claims_supported"
                            access_type="online"
                            onResolve={({ provider, data }) => {
                              signinSocial({
                                type: "google",
                                email: data?.email || "",
                                id: data.sub || "",
                                name: data?.given_name,
                                data,
                              });
                            }}
                            onLoginSuccess={() => {
                              setSocialLoginLoading({
                                google: false,
                                facebook: false,
                                apple: false,
                              });
                            }}
                            onReject={(err) => {
                              setSocialLoginLoading({
                                google: false,
                                facebook: false,
                                apple: false,
                              });
                            }}
                          >
                            <FaGoogle size={15} className="mx-1" />
                            {translate("Google")}
                          </LoginSocialGoogle>
                        )) || (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "30px", width: "100%" }}
                          >
                            <ClipLoader color="#D93025" size={30} />
                          </div>
                        )}
                      </div>
                      {/* <button
                    type="button"
                    className="button -md -outline-red-1 text-red-1 col-12"
                  >
                    {translate("Google")}
                  </button> */}
                    </div>
                  </div>
                  <br />
                  <div className="row y-gap-15">
                    <div className="col">
                      <button
                        type="button"
                        className="button -md -outline-dark-1 text-dark-1 col-12"
                        style={{ height: "60px" }}
                      >
                        {/* <FaApple size={15} className="mx-1" />
                          {translate("Sign in With Apple")} */}
                        {(!socialLoginLoading?.apple && (
                          <LoginSocialApple
                            client_id={
                              process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || ""
                            }
                            scope={"name email"}
                            // redirect_uri={window.location.origin + "/login"}
                            onLoginStart={() =>
                              setSocialLoginLoading({
                                google: false,
                                facebook: false,
                                apple: true,
                              })
                            }
                            redirect_uri={window.location.origin + "/login"}
                            onResolve={({ provider, data }) => {
                              signinSocial({ type: "apple", data: data });
                            }}
                            onLoginSuccess={() => {
                              setSocialLoginLoading({
                                google: false,
                                facebook: false,
                                apple: false,
                              });
                            }}
                            onReject={(err) => {
                              setSocialLoginLoading({
                                google: false,
                                facebook: false,
                                apple: false,
                              });
                            }}
                          >
                            <FaApple size={15} className="mx-1" />
                            {translate("Sign in With Apple")}
                          </LoginSocialApple>
                        )) || (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "30px", width: "100%" }}
                          >
                            <ClipLoader color="#000000" size={30} />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
