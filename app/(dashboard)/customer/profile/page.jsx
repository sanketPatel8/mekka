"use client";

import Header from "@/components/dasboard/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";
import { useTranslation } from "@/app/context/TranslationContext";
import { POST } from "@/app/utils/api/post";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the library's CSS for styling

export default function Profile() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [UserProfile, setUserProfile] = useState([]);
  // const [formData, setFormData] = useState({
  //   name: "",
  //   surname: "",
  //   email: "",
  //   image1: "",
  // });
  // const [passwordData, setPasswordData] = useState({
  //   oldPassword: "",
  //   newPassword: "",
  //   confirmPassword: "",
  // });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [fileBlob, setFileBlob] = useState({});

  const [USerData, setUSerData] = useState([]);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(true);
  const [image1, setImage1] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [PhoneError, setPhoneError] = useState("");

  // const handlePhoneChange = (e) => {
  //   const value = e.target.value;
  //   const regex = /^[0-9]{0,10}$/; // Adjust the regex as needed
  //   if (regex.test(value)) {
  //     setPhone(value); // Update phone only if it's valid
  //     setPhoneError("*");
  //   } else {
  //     setPhoneError("");
  //   }
  // };

  const handlePhoneChange = (value) => {
    setPhone(value);

    // Validation: Check if phone number is too short or too long
    if (value.length < 10 || value.length > 15) {
      setPhoneError(translate("Phone number must be between 10 and 15 digits"));
    }
    // Validation to ensure only numbers
    else if (!/^\d+$/.test(value.replace(/[^0-9]/g, ""))) {
      setPhoneError(translate("Phone number can only contain digits"));
    }
    // Validation to ensure country code is present
    else if (!value.includes("+")) {
      setPhoneError(translate("Please include country code"));
    } else {
      setPhoneError(""); // Clear error if the phone number is valid
    }
  };

  console.log("Phone", Phone);

  // console.log("formData", formData?.image1);

  const { user, customer } = useAuthContext();

  console.log("customer", customer);

  const fetchProfile = async () => {
    const url = "my_profile";
    const response = await POST.request({
      url: url,
      token: `${customer?.authorisation.token}`,
      user_id: customer?.user?.id,
    });
    setLoading(false);

    // Handle case where response.user is a single object
    if (response.user && typeof response.user === "object") {
      const userProfile = response.user;
      setUserProfile(userProfile);
      setName(userProfile.name);
      setSurname(userProfile.surname);
      setEmail(userProfile.email);
      setPhone(userProfile.mobile);
      setImage1(userProfile.profile_image);
      setFileBlob(userProfile.profile_image);
    } else {
      console.error("Unexpected response structure:", response);
    }

    return response.user ? [response.user] : [];
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");

      if (userData && userData !== "undefined") {
        try {
          const userid = JSON.parse(userData);

          if (userid && userid.user) {
            setUSerData(userid.user);
          }
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }

    if (customer) {
      fetchProfile();
    }

    if (typeof window !== "undefined") {
      // Indicate that the component has mounted
      // setMounted(true);

      const handleResize = () => {
        if (window.innerWidth >= 1000) {
          setSideBarOpen(true);
        } else {
          setSideBarOpen(false);
        }
      };

      // Set the initial state based on the screen size
      handleResize();

      // Add event listener to update state on resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const allowedType = ["image/jpeg", "image/x-png", "image/png"];
    if (file && allowedType.includes(file?.type)) {
      setImage1(file);
      const blobUrl = URL.createObjectURL(file);
      setFileBlob(blobUrl);
    }

    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     setFormData((prevData) => ({
    //       ...prevData,
    //       image1: reader.result, // Set the uploaded image URL
    //     }));
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  //   const fetchUpdateProfile = async (type) => {
  //     const formDatas = new FormData();

  //     // Append form data fields
  //     formDatas.append("id", customer?.user?.id);
  //     formDatas.append("type", "profile");
  //     formDatas.append("name", name);
  //     formDatas.append("surname", surname);
  //     formDatas.append("email", email);
  //     formDatas.append("image", image1);

  //     setIsLoading(true);

  //     try {
  //       const response = await POST.request({
  //         form: formDatas,
  //         url: "update_profile",
  //       });

  //       if (response) {
  //         setIsLoading(false);
  //         showSuccessToast(response?.message);

  //       }
  //     } catch (e) {
  //
  //       setIsLoading(false);
  //   };
  // }

  const [someObject, setSomeObject] = useState({ toggle: false });

  // Function to update the toggle
  const toggleHandler = () => {
    setSomeObject((prevObject) => ({
      ...prevObject, // Keep other properties
      toggle: !prevObject.toggle, // Update the 'toggle' property
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //const formType = e.target.value
    const formDatas = new FormData();

    const formType = e.target.name;

    if (formType === "profile") {
      if (!name || !surname || !email || !image1) {
        showErrorToast("Please fill all fields");
        return;
      }
    } else if (formType === "change_password") {
      if (!old_password || !password || !confirm_password) {
        showErrorToast("Please fill all fields");
        return;
      }
    }

    switch (formType) {
      case "profile":
        formDatas.append("id", customer?.user?.id);
        formDatas.append("type", "profile");
        formDatas.append("name", name);
        formDatas.append("surname", surname);
        formDatas.append("email", email);
        formDatas.append("phone", Phone);
        formDatas.append("image", image1);
        break;

      case "change_password":
        formDatas.append("id", customer?.user?.id);
        formDatas.append("type", "change_password");
        formDatas.append("old_password", old_password);
        formDatas.append("password", password);
        break;

      default:
        break;
    }

    if (formType === "profile") {
      setIsLoading(true);
      const response = await POST.request({
        form: formDatas,
        url: "update_profile",
      });

      setIsLoading(false);
      if (response.status === "success") {
        showSuccessToast(response?.message);
        fetchProfile();
      } else if (response.status === "error") {
        showErrorToast(response?.message);
      }
    } else if (formType === "change_password") {
      setIsPasswordLoading(true);
      if (confirm_password === password) {
        const response = await POST.request({
          form: formDatas,
          url: "update_profile",
        });
        setIsPasswordLoading(false);
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
        if (response.status === "success") {
          showSuccessToast(response?.message);
          fetchProfile();
        } else {
          showErrorToast(response?.message);
        }
      } else {
        setIsPasswordLoading(false);
        showErrorToast("please fill proper details");
      }
    }
    // fetchUpdateProfile();
  };

  // const handleChange = (e) => {
  //   const {  value } = e.target;
  //   setPasswordData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const fetchUpdatePassword = async (type) => {
  //   const formDatas = new FormData();

  //
  //   formDatas.append("id", USerData?.id);
  //   formDatas.append("type", "change_password");
  //   formDatas.append("old_password", passwordData?.oldPassword);
  //   formDatas.append("password", passwordData?.newPassword);

  //   try {
  //     const response = await POST.request({
  //       form: formDatas,
  //       url: "update_profile",
  //     });

  //     if(response.status === "success"){

  //     showSuccessToast(response?.message);

  //     }else{

  //       showErrorToast(response?.message);

  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (value !== password) {
      setError("Passwords do not match");
    } else {
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
        "Password must contain at least 8 characters, including uppercase, lowercase letters, numbers and special characters "
      );
    } else {
      setPasswordError("");
    }
    if (!passwordValue) {
      setPasswordError("");
    }
  };
  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswordData((prevData) => ({
  //     ...prevData,
  //     [e.target.name]: value,
  //   }));
  //   if (value !== passwordData.newPassword) {
  //     setError("Passwords do not match");
  //     }else{
  //       setError("");
  //     }
  // }
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // const handlePassword = (e) => {
  //   const {name,value} = e.target;
  //   setPasswordData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  //   if (!passwordRegex.test(value)) {
  //     setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase letters, numbers and special characters");
  //   }  else {
  //     setPasswordError("");
  //   }
  //   if(!value){
  //     setPasswordError("");
  //   }
  // };
  const { translate } = useTranslation();
  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <ToastContainer />
        <CustomerDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <ClipLoader color="#DAC04F" size={50} />
              </div>
            ) : (
              <>
                <h1 className="text-30">
                  {translate("Profile").charAt(0).toUpperCase() +
                    translate("Profile").slice(1)}{" "}
                  -{" "}
                  {UserProfile?.name?.charAt(0).toUpperCase() +
                    UserProfile?.name?.slice(1)}{" "}
                  {UserProfile?.surname?.charAt(0).toUpperCase() +
                    UserProfile?.surname?.slice(1)}
                </h1>

                <div className="mt-20 rounded-12 bg-white shadow-2 px-40 py-40 ">
                  <h5 className="text-20 fw-500 mb-30">
                    {" "}
                    {translate("Profile Details")}
                  </h5>

                  <form
                    className="contactForm y-gap-30"
                    onSubmit={handleSubmit}
                    name="profile"
                  >
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <>
                        <div className="row my-3">
                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Name")}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                required
                              />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Surname")}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                              <label className="lh-1 text-16 text-light-1">
                                {translate("Email")}
                              </label>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-input my-1">
                              <PhoneInput
                                country={"in"} 
                                value={Phone}
                                onChange={handlePhoneChange}
                                inputProps={{
                                  name: "phone",
                                  required: true,
                                  autoFocus: true,
                                }}
                                containerStyle={{
                                  width: "100%", 
                                  marginBottom: "10px",
                                  backgroundColor : "white"
                                }}
                                inputStyle={{
                                  width: "100%",
                                  padding: "12px 45px", 
                                  borderRadius: "4px",
                                  border: "1px solid #E7E6E6",
                                  fontSize: "16px",
                                  boxSizing: "border-box",
                                  borderRadius : "12px",
                                  backgroundColor : "white"
                                }}
                                className = "form-input  "
                              />
                              <label className="phone_lable">
                                {translate("Phone")}
                                {/* <span className="text_red">{PhoneError}</span> */}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <h4 className="text-18 fw-500 mb-20">
                            {translate("Your photo")}
                          </h4>
                          <div className="row x-gap-20 y-gap">
                            {image1 ? (
                              <div className="col-auto my-3">
                                <div className="relative">
                                  <Image
                                    width={200}
                                    height={200}
                                    src={fileBlob}
                                    alt="image"
                                    className="size-200 rounded-12 object-cover"
                                  />
                                  <button
                                    onClick={() => {
                                      setImage1("");
                                      setFileBlob({});
                                    }}
                                    className="absoluteIcon1 button -dark-1"
                                  >
                                    <i className="icon-delete text-18"></i>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="col-auto">
                                <label
                                  htmlFor="imageInp1"
                                  className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                                >
                                  <Image
                                    width="40"
                                    height="40"
                                    alt="image"
                                    src={"/img/dashboard/upload.svg"}
                                  />

                                  <div className="text-16 fw-500 text-accent-1 mt-10">
                                    {translate("Upload Images")}
                                  </div>
                                </label>
                                <input
                                  onChange={handleImageChange}
                                  accept="image/*"
                                  id="imageInp1"
                                  type="file"
                                  style={{ display: "none" }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="text-14 mt-20">
                            {translate(
                              "PNG or JPG no bigger than 800px wide and tall."
                            )}
                          </div>

                          <button
                            className="button -md -info-2 bg-accent-1 text-white mt-30"
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
                              translate("Save Changes")
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>

                <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
                  <h5 className="text-20 fw-500 mb-30">
                    {" "}
                    {translate("Change Password")}
                  </h5>

                  <form
                    className="contactForm y-gap-30"
                    onSubmit={handleSubmit}
                    name="change_password"
                  >
                    <div className="row y-gap-30">
                      <div className="col-md-6">
                        <div className="form-input my-1">
                          <input
                            type="password"
                            name="oldPassword"
                            value={old_password}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Old password")}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row y-gap-30">
                      <div className="col-md-6">
                        <div className="form-input my-1">
                          <input
                            type="password"
                            name="newPassword"
                            value={password}
                            onChange={handlePassword}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("New password")}
                          </label>
                          {passwordError && (
                            <div className="text-red mb-1">{passwordError}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-input my-1">
                          <input
                            type="password"
                            name="confirmPassword"
                            value={confirm_password}
                            onChange={handlePasswordChange}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Confirm new password")}
                          </label>
                          {error && <div className="text-red">{error}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <button
                          className="button -md -info-2 bg-accent-1 text-white"
                          type="submit"
                        >
                          {isPasswordLoading ? (
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: "30px", width: "100%" }}
                            >
                              <ClipLoader color="#ffffff" size={30} />
                            </div>
                          ) : (
                            translate("Save Changes")
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="text-center pt-30">
                  © {translate("Copyright MekkaBooking.com")}{" "}
                  {new Date().getFullYear()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
