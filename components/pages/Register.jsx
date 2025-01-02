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
import { ClipLoader } from "react-spinners";
import dynamic from "next/dynamic";
import { POST } from "@/app/utils/api/post";
import { jwtDecode } from "jwt-decode";
import {
  LoginSocialFacebook,
  LoginSocialGoogle,
  LoginSocialApple,
} from "reactjs-social-login";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useGlobalState } from "@/app/context/GlobalStateContext";

export default function Register() {
  const { translate } = useTranslation();
  const { dispatch } = useAuthContext();

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
  const [isLoading, setIsLoading] = useState(false);
    const { LoginPer, setLoginPer } = useGlobalState();
    const [socialLoginLoading, setSocialLoginLoading] = useState({
      google: false,
      facebook: false,
      apple: false,
    });
  

  const handlePasswordChange = (e) => {
    const { value } = e.target;
  
    setConfirmpass(value);

    if (value !== RegisterData.password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  
  const signinSocial = async ({ type, email, id, name, data }) => {
  
    if (type === "apple") {
      const token = data.authorization.id_token;
      const decodedToken = jwtDecode(token);

     

      const appleData = {
        email: decodedToken.email,
        auth_provider: type,
        provider_id: decodedToken.sub,
        name: ""
      };



      const resp = await POST.request({
        form: appleData,
        url: "social_register",
      });

   

      if (resp.Status == "1") {

        showSuccessToast(translate, "User created successfully");
        localStorage.setItem("customer", JSON.stringify(resp));
        localStorage.setItem("CustomerLoginCheck", JSON.stringify(true));
        dispatch({ type: "LOGIN_CUSTOMER", payload: resp });
        setSocialLoginLoading({ google: false, facebook: false, apple: false });


        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          name: "",
          surname: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          setLoginPer(true);
          router.push("/customer/booking");
        }, 1000);
  
        setConfirmpass("");
  
        setIsChecked(false);
  
        // localStorage.setItem("emailForSignIn", email);
  
        // Redirect after successful registration
        // setTimeout(() => {
        //   router.push("/login");
        // }, 2000);
       
      }
      else if (resp.Status == "-2"){
        // showSuccessToast(translate,"Email already exists");
        // localStorage.setItem("customer", JSON.stringify(resp));
        // localStorage.setItem("CustomerLoginCheck", JSON.stringify(true));
        // dispatch({ type: "LOGIN_CUSTOMER", payload: resp });
        

        // setRegisterData({
        //   AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        //   name: "",
        //   surname: "",
        //   email: "",
        //   password: "",
        // });

        // setTimeout(() => {
        //   setLoginPer(true);
        //   router.push("/customer/booking");
        // }, 1000);

        showErrorToast(translate,"You are already registered with this email please login from login page ");
        setSocialLoginLoading({ google: false, facebook: false, apple: false });

        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          name: "",
          surname: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);


        
      }else if(resp.Status == "0"){
        showErrorToast(translate,"Invalid Credentials")
        setSocialLoginLoading({ google: false, facebook: false, apple: false });

      }
    } else {
      const resp = await POST.request({
        form: {
          email:email,
          auth_provider: type,
          provider_id: id,
          name: name,
        },
        url: "social_register",
      });
   
      if (resp.Status == "1") {

      
        showSuccessToast(translate, "User created successfully");
        localStorage.setItem("customer", JSON.stringify(resp));
        localStorage.setItem("CustomerLoginCheck", JSON.stringify(true));
        dispatch({ type: "LOGIN_CUSTOMER", payload: resp });
        setSocialLoginLoading({ google: false, facebook: false, apple: false });


        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          name: "",
          surname: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          setLoginPer(true);
          router.push("/customer/booking");
        }, 1000);


  
        setConfirmpass("");
  
        setIsChecked(false);
  
        // localStorage.setItem("emailForSignIn", email);
  
        // Redirect after successful registration
        // setTimeout(() => {
        //   router.push("/login");
        // }, 2000);
       
      } else if(resp.Status == "-2"){
        showErrorToast(translate,"You are already registered with this email please login from login page ");
        setSocialLoginLoading({ google: false, facebook: false, apple: false });

        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          name: "",
          surname: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);


      }else{
        showErrorToast(translate, "Invalid Credentials");
        setSocialLoginLoading({ google: false, facebook: false, apple: false });

        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          name: "",
          surname: "",
          email: "",
          password: "",
        });
      }
    }
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setRegisterData((prevState) => ({
      ...prevState,
      password: passwordValue,
    }));
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError(
        "At least 8 characters include uppercase and lowercase letters, numbers and special characters"
      );
    } else {
      setPasswordError("");
    }
    if (!passwordValue) {
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
    setConfirmpass(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if(!RegisterData.name || !RegisterData.surname || !RegisterData.email || !RegisterData.password || !confirm_pass || isChecked === false){
  //     showErrorToast("Please fill all fields");
  //     return;
  //   }
  //   if(!passwordRegex.test(RegisterData.password)){
  //     if (RegisterData.password === confirm_pass) {
  //       try {
  //         const response = await post("register", RegisterData);
  //         showSuccessToast(response.message);
  //       } catch (error) {
  //         if (
  //           error.response &&
  //           error.response.data &&
  //           error.response.data.message
  //         ) {
  //           showErrorToast(error.response.data.message);
  //           setTimeout(() => {
  //             router.push("/verify-email");
  //           }, 2000);
  //         } else {
  //           showErrorToast("An error occurred during registration.");
  //         }
  //       }
  //       setRegisterData({
  //         name: "",
  //         surname: "",
  //         email: "",
  //         password: "",
  //       });

  //       setConfirmpass("");
  //       setIsChecked(false);
  //       localStorage.setItem("emailForSignIn", RegisterData.email);

  //     } else {
  //       showErrorToast("password dose not match");
  //     }
  //   }else{
  //     showErrorToast('Please Fill Proper Password')
  //   }

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !RegisterData.name ||
      !RegisterData.surname ||
      !RegisterData.email ||
      !RegisterData.password ||
      !confirm_pass 
      
    ) {
      showErrorToast(translate, "Please fill all fields");
      return;
    }

    if(
      isChecked === false
    ){
      showErrorToast(translate, "Please Accept the terms and conditions");
      return;
    }

    // Validate the password using regex
    if (!passwordRegex.test(RegisterData.password)) {
      showErrorToast(translate, 
        "Please check your password. It must meet the required criteria"
      );
      return;
    }

    // Check if passwords match
    if (RegisterData.password !== confirm_pass) {
      showErrorToast(translate, "Passwords do not match");
      return;
    }

    // If all validation passes, then make the API call
    try {
      setIsLoading(true);
      const response = await post("register", RegisterData);
      if(response.status === "1"){
        setIsLoading(false)
        showSuccessToast(translate, "User created successfully");
        // Clear the form and set email in local storage
        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
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
      }else if(response.status === "0"){
        setIsLoading(false)
        showErrorToast(translate, "Email already Exist");
        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          name: "",
          surname: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);

      }
     
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setIsLoading(false)
        setRegisterData({
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          name: RegisterData.name ,
          surname: RegisterData.surname ,
          email: "",
          password: RegisterData.password,
        });
        showErrorToast(translate, "Email already exists");
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
                {passwordError && (
                  <div className="text-red font_11">{passwordError}</div>
                )}
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
                {error && <div className="text-red font_11">{error}</div>}
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
                      "I have read the" )} <Link href={"/Datenschutz"} className="text-blue" target="_blank">{translate("data protection")}</Link>  {translate("and I accept the")} <Link href={"/Terms-of-Use"} target="_blank" className="text-blue">{translate("conditions.")}</Link>
                    
                  </span>
                </label>
              </div>

              <button
                className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                type="submit"
              >
                {isLoading ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "30px", width: "100%" }}
                      >
                        <ClipLoader color="#ffffff" size={30} />
                      </div>
                    ) : (
                      translate("Register")
                    )}
                
              </button>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

              <div className="row y-gap-15">
                    <div className="col">
                      <button
                        type="button"
                        className="button -md -outline-blue-1 text-blue-1 col-12"
                      >
                        {(!socialLoginLoading?.facebook && (

                        <LoginSocialFacebook
                          appId={
                            process.env.NEXT_PUBLIC_REACT_APP_FB_APP_ID || ""
                          }
                          fieldsProfile={
                            "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                          }
                          scope="email,public_profile"
                          onLoginStart={() =>
                            setSocialLoginLoading({
                              google: false,
                              facebook: true,
                              apple: false,
                            })
                          }                          onResolve={({ provider, data }) => {
                            const { id, name, email } = data;
                       
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
                            console.error(err);
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
                      <button
                        type="button"
                        className="button -md -outline-red-1 text-red-1 col-12"
                      >
                       {(!socialLoginLoading?.google && (

                        <LoginSocialGoogle
                          client_id={
                            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
                          }
                          client_secret={
                            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ""
                          }
                          redirect_uri={typeof window !== "undefined" ? window.location.origin + "/login" : ""}
                          onLoginStart={() =>
                            setSocialLoginLoading({
                              google: true,
                              facebook: false,
                              apple: false,
                            })
                          }                          scope="openid profile email"
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
                          onReject={(err) => {
                            console.error(err);
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
                        
                      </button>
                      
                    </div>
                  </div>
                  <br />
                  <div className="row y-gap-15">
                    <div className="col">
                      <button
                        type="button"
                        className="button -md -outline-dark-1 text-dark-1 col-12"
                      >
                       {(!socialLoginLoading?.apple && (

                        <LoginSocialApple
                          client_id={
                            process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || ""
                          }
                          scope={"name email"}
                          redirect_uri={typeof window !== "undefined" ? window.location.origin + "/login" : ""}
                          onLoginStart={() =>
                            setSocialLoginLoading({
                              google: false,
                              facebook: false,
                              apple: true,
                            })
                          }                          onResolve={({ provider, data }) => {
                        
                            signinSocial({ type: "apple", data: data });
                          }}
                          onReject={(err) => {
                            console.error(err);
                          }}
                        >
                          <FaApple size={15} className="mx-1" />
                          {translate("Sign up With Apple")}
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
  );
}
