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

export default function Profile() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [UserProfile, setUserProfile] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    image1: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [USerData, setUSerData] = useState([]);

  const [loading, setLoading] = useState(false);

  // console.log("formData", formData?.image1);

  const { user , customer } = useAuthContext();

  console.log("user" , customer?.authorisation.token); 
  

  const fetchProfile = async () => {
    const url = "my_profile";
    const response = await POST.request({
      url: url,
      token: `${customer?.authorisation.token}`,
    });

    // Handle case where response.user is a single object
    if (response.user && typeof response.user === "object") {
      const userProfile = response.user;
      setUserProfile(userProfile);
      setFormData({
        name: userProfile.name || "",
        surname: userProfile.surname || "",
        email: userProfile.email || "",
        image1: userProfile.image || "", // Assuming API returns image URL
      });
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

    if(customer){
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

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          image1: reader.result, // Set the uploaded image URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchUpdateProfile = async (type) => {
    const formDatas = new FormData();

    // console.log("Update data: ", formDatas)
    formDatas.append("id", USerData?.id);
    formDatas.append("type", "profile");
    formDatas.append("name", formData?.name);
    formDatas.append("surname", formData?.surname);
    formDatas.append("email", formData?.email);
    formDatas.append("image", formData.image1);

    try {
      const response = await POST.request({
        form: formDatas,
        url: "update_profile",
      });
      showSuccessToast(response?.message);
    } catch (e) {
      console.log(e);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //const formType = e.target.value
    fetchUpdateProfile();
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchUpdatePassword = async (type) => {
    const formDatas = new FormData();

    // console.log("Update data: ", formDatas)
    formDatas.append("id", USerData?.id);
    formDatas.append("type", "change_password");
    formDatas.append("old_password", passwordData?.oldPassword);
    formDatas.append("password", passwordData?.newPassword);

    try {
      const response = await POST.request({
        form: formDatas,
        url: "update_profile",
      });
      showSuccessToast(response?.message);
    } catch (e) {
      console.log(e);
    }
  };

  const submitPasswordForm = (e) => {
    e.preventDefault();
    if (passwordData?.confirmPassword === passwordData?.newPassword) {
      fetchUpdatePassword();
    } else {
      showErrorToast("please fill proper details");
    }
    console.log(passwordData);
  };

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
            <h1 className="text-30">
              {translate("Profile").charAt(0).toUpperCase() +
                translate("Profile").slice(1)}{" "}
              -
              {" "}{UserProfile?.name?.charAt(0).toUpperCase() +
                UserProfile?.name?.slice(1)}{" "}
              {UserProfile?.surname?.charAt(0).toUpperCase() +
                UserProfile?.surname?.slice(1)}
            </h1>

            <div className="mt-20 rounded-12 bg-white shadow-2 px-40 py-40 ">
              <h5 className="text-20 fw-500 mb-30">
                {" "}
                {translate("Profile Details")}
              </h5>

              <form className="contactForm y-gap-30" onSubmit={handleSubmit}>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <div className="row my-3">
                      <div className="col-md-6">
                        <div className="form-input my-1">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
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
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Surname")}
                          </label>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-input my-1">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="lh-1 text-16 text-light-1">
                            {translate("Email")}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <h4 className="text-18 fw-500 mb-20">
                        {translate("Your photo")}
                      </h4>
                      <div className="row x-gap-20 y-gap">
                        {formData.image1 ? (
                          <div className="col-auto my-3">
                            <div className="relative">
                              <Image
                                width={200}
                                height={200}
                                src={formData.image1}
                                alt="image"
                                className="size-200 rounded-12 object-cover my-3"
                              />
                              <button
                                onClick={() => {
                                  setFormData((prevData) => ({
                                    ...prevData,
                                    image1: "",
                                  }));
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
                              onChange={(e) =>
                                handleImageChange(e, setFormData)
                              }
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

                      <button className="button -md -info-2 bg-accent-1 text-white mt-30">
                        {translate("Save Changes")}
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
                onSubmit={submitPasswordForm}
              >
                <div className="row y-gap-30">
                  <div className="col-md-6">
                    <div className="form-input my-1">
                      <input
                        type="text"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
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
                        type="text"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("New password")}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-input my-1">
                      <input
                        type="text"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Confirm new password")}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button
                      className="button -md -info-2 bg-accent-1 text-white"
                      type="submit"
                    >
                      {translate("Save Changes")}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="text-center pt-30">
              © Copyright MekkaBooking.com {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
