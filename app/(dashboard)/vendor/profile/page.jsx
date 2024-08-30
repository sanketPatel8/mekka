"use client";

import Header from "@/components/dasboard/Header";
import { useState , useEffect } from "react";
import Image from "next/image";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import $ from "jquery";
import "select2/dist/css/select2.css";
import CreatableSelect from "react-select/creatable";
import { useTranslation } from "@/app/context/TranslationContext";
import { useAuthContext } from "@/app/hooks/useAuthContext";

export default function Profile() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("/img/dashboard/addtour/1.jpg");
  const [SelectedCountry, setSelectedCountry] = useState("");

  const {user} = useAuthContext();

  const handleImageChange = (event, func) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        func(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const CountryOptions = [
    { value: "India", label: "India" },
    { value: "Algeria", label: "Algeria" },
    { value: "Afghanistan", label: "Afghanistan" },
  ];

  const HandleCountryChange = (newValue, actionMeta) => {
    setSelectedCountry(newValue);
    console.log(newValue);
  };

  useEffect(() => {
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

  const { translate } = useTranslation();

  return (
    <>
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30"> {translate("My Profile") }</h1>
            <div className="mt-20 rounded-12 bg-white shadow-2 px-40 py-40">
              <h5 className="text-20 fw-500 mb-30"> {translate("Profile Details") }</h5>

              <div className="contactForm row my-1">
                <div className="col-md-6">
                  <div className="form-input m-0 ">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("First Name") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Last Name") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Company Name") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="email" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Email Id") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Contact No") }
                    </label>
                  </div>
                </div>

                {/* change dropdown  */}

                <div className="col-md-6">
                <div className="form-input my-1 d-flex flex-column align-items-center add-tour-type">
                    <CreatableSelect
                      value={SelectedCountry}
                      onChange={HandleCountryChange}
                      options={CountryOptions}
                      className="custom-select"
                      placeholder="Select Country  "
                      classNamePrefix="react-select"
                      isClearable
                      formatCreateLabel={(inputValue) =>
                        `Create custom gender: "${inputValue}"`
                      }
                    />
                    </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1"> {translate("City") }</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1"> {translate("Street") }</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("House No") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("ZIP Code") }
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1"> {translate("Website") }</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input m-0 ">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                       {translate("Tax Number") }
                    </label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-input m-0">
                    <textarea required rows="2"></textarea>
                    <label className="lh-1 text-16 text-light-1"> {translate("Info") }</label>
                  </div>
                </div>

                <div className="col-12">
                  <h4 className="text-18 fw-500 mb-20"> {translate("Company Logo") }</h4>
                  <div className="row x-gap-20 y-gap my-1">
                    {image1 ? (
                      <div className="col-auto">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image1}
                            alt="image"
                            className="size-200 rounded-12 object-cover"
                          />
                          <button
                            onClick={() => {
                              setImage1("");
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
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={(e) => handleImageChange(e, setImage1)}
                          accept="image/*"
                          id="imageInp1"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                  </div>

                  <h4 className="text-18 fw-500 mb-20 mt-20"> {translate("Documents") }</h4>
                  <div className="row x-gap-20 y-gap">
                    {image1 ? (
                      <div className="col-auto">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image1}
                            alt="image"
                            className="size-200 rounded-12 object-cover"
                          />
                          <button
                            onClick={() => {
                              setImage1("");
                            }}
                            className="absoluteIcon1 button -dark-1"
                          >
                            <i className="icon-delete text-18"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-auto my-2">
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
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={(e) => handleImageChange(e, setImage1)}
                          accept="image/*"
                          id="imageInp1"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                    {image2 ? (
                      <div className="col-auto my-2">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image2}
                            alt="image"
                            className="size-200 rounded-12 object-cover"
                          />
                          <button
                            onClick={() => {
                              setImage2("");
                            }}
                            className="absoluteIcon1 button -dark-1"
                          >
                            <i className="icon-delete text-18"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-auto my-2">
                        <label
                          htmlFor="imageInp2"
                          className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          <div className="text-16 fw-500 text-accent-1 mt-10">
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={(e) => handleImageChange(e, setImage2)}
                          accept="image/*"
                          id="imageInp2"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                    {image2 ? (
                      <div className="col-auto my-2">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image2}
                            alt="image"
                            className="size-200 rounded-12 object-cover"
                          />
                          <button
                            onClick={() => {
                              setImage2("");
                            }}
                            className="absoluteIcon1 button -dark-1"
                          >
                            <i className="icon-delete text-18"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-auto my-2">
                        <label
                          htmlFor="imageInp2"
                          className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          <div className="text-16 fw-500 text-accent-1 mt-10">
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={(e) => handleImageChange(e, setImage2)}
                          accept="image/*"
                          id="imageInp2"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                    {image2 ? (
                      <div className="col-auto my-2">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image2}
                            alt="image"
                            className="size-200 rounded-12 object-cover"
                          />
                          <button
                            onClick={() => {
                              setImage2("");
                            }}
                            className="absoluteIcon1 button -dark-1"
                          >
                            <i className="icon-delete text-18"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-auto my-2">
                        <label
                          htmlFor="imageInp2"
                          className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          <div className="text-16 fw-500 text-accent-1 mt-10">
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={(e) => handleImageChange(e, setImage2)}
                          accept="image/*"
                          id="imageInp2"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                    {image2 ? (
                      <div className="col-auto my-2">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image2}
                            alt="image"
                            className="size-200 rounded-12 object-cover"
                          />
                          <button
                            onClick={() => {
                              setImage2("");
                            }}
                            className="absoluteIcon1 button -dark-1"
                          >
                            <i className="icon-delete text-18"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-auto my-2">
                        <label
                          htmlFor="imageInp2"
                          className="size-200 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column"
                        >
                          <Image
                            width="40"
                            height="40"
                            alt="image"
                            src={"/img/dashboard/upload.svg"}
                          />

                          <div className="text-16 fw-500 text-accent-1 mt-10">
                             {translate("Upload Images") }
                          </div>
                        </label>
                        <input
                          onChange={(e) => handleImageChange(e, setImage2)}
                          accept="image/*"
                          id="imageInp2"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="text-14 mt-20">
                    PDF or PNG or JPG or DOC no bigger than 800px wide and tall.
                  </div>

                  <button className="button -md -info-2 bg-accent-1 text-white mt-30">
                     {translate("Save Changes") }
                    {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
              <h5 className="text-20 fw-500 mb-30">  {translate("Payout Account (IBAN)") }</h5>

              <div className="contactForm ">

                <div className="row ">
                  <div className="col-md-6">
                    <div className="form-input my-1 ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                         {translate("Bank Name") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6">
                    <div className="form-input my-1 ">
                      <input type="text" required />
                      <label className="lh-1 te xt-16 text-light-1">
                         {translate("Owner Name") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-input my-1 ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1"> {translate("IBAN") }</label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button className="button -md -info-2 bg-accent-1 text-white mt-15">
                       {translate("Save Changes") }
                      {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
              <h5 className="text-20 fw-500 mb-30"> {translate("Change Password") }</h5>

              <div className="contactForm ">
                <div className="row my-1">
                  <div className="col-md-6">
                    <div className="form-input m-0 ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                         {translate("Old password") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row my-1">
                  <div className="col-md-6">
                    <div className="form-input m-0 ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                         {translate("New password") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-input m-0 ">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                         {translate("Confirm new password") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button className="button -md -info-2 bg-accent-1 text-white">
                       {translate("Save Changes") }
                      {/* <i className="icon-arrow-top-right text-16 ml-10"></i> */}
                    </button>
                  </div>
                </div>
              </div>
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
