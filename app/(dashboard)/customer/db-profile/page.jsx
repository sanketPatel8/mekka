"use client";

import Header from "@/components/dasboard/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomerDBsideBar from "@/components/dasboard/CustomerDBsideBar";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Profile() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("/img/dashboard/addtour/1.jpg");

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
        <CustomerDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30"> {translate("My Booking") } - Customer Name</h1>
            <div className="mt-20 rounded-12 bg-white shadow-2 px-40 py-40 ">
              <h5 className="text-20 fw-500 mb-30">  {translate("Profile Details") }</h5>

              <div className="contactForm  y-gap-30">
                <div className="row my-3">
                
                
                <div className="col-md-6">
                  <div className="form-input my-1">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">  {translate("Name") }</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input my-1">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">  {translate("Surname") }</label>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-input my-1">
                    <input type="Email" required />
                    <label className="lh-1 text-16 text-light-1">  {translate("Email") }</label>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-input my-1">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                        {translate("Password") }
                    </label>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-input my-1">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                        {translate("Confirm Password") }
                    </label>
                  </div>
                </div>

                </div>

                


                <div className="col-12">
                  <h4 className="text-18 fw-500 mb-20">  {translate("Your photo") }</h4>
                  <div className="row x-gap-20 y-gap">
                    {image1 ? (
                      <div className="col-auto my-3">
                        <div className="relative">
                          <Image
                            width={200}
                            height={200}
                            src={image1}
                            alt="image"
                            className="size-200 rounded-12 object-cover my-3"
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
                            Upload Images
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

                  <div className="text-14 mt-20">
                    {translate("  PNG or JPG no bigger than 800px wide and tall.") }
                  </div>

                  <button className="button -md -info-2 bg-accent-1 text-white mt-30">
                   {translate("Save Changes ") }
                    <i className="icon-arrow-top-right text-16 ml-10"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-30">
              <h5 className="text-20 fw-500 mb-30">  {translate("Change Password") }</h5>

              <div className="contactForm y-gap-30">
                <div className="row y-gap-30">
                  <div className="col-md-6">
                    <div className="form-input my-1">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                          {translate("Old password") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row y-gap-30">
                  <div className="col-md-6">
                    <div className="form-input my-1">
                      <input type="text" required />
                      <label className="lh-1 text-16 text-light-1">
                          {translate("New password") }
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-input my-1">
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
                      <i className="icon-arrow-top-right text-16 ml-10"></i>
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
