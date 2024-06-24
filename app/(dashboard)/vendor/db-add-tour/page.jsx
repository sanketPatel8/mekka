"use client";

import Header from "@/components/dasboard/Header";
import { useState } from "react";
import Image from "next/image";
import Map from "@/components/pages/contact/Map";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import CreatableSelect from "react-select/creatable";
import { FaStar } from "react-icons/fa";
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

const tabs = ["Content", "Pricing", "Included", "Overview" , "Itinerary" , "General Information"];
// const tabs = ["Content", "Location", "Pricing", "Included", "Overview" , "Itinerary" , "General Information"];
const Tab1 = [
  "Content",
  "Overview",
  "Included",
  "Itinerary",
  "General Information",
  "Extras",
];
export default function AddTour() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [custoer, mGender , setCustomGender] = useState('')
  const [gendsetGender] = useState("");
  const [Hotel, setHotel] = useState("")
  const [activeTab, setActiveTab] = useState("Content");
  const [image1, setImage1] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [image2, setImage2] = useState("/img/dashboard/addtour/1.jpg");
  const [image3, setImage3] = useState("/img/dashboard/addtour/2.jpg");
  const [image4, setImage4] = useState("/img/dashboard/addtour/3.jpg");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

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

  const options2 = [
    { value: "voco Makkah an IHG HotelOpens ", label: "voco Makkah an IHG HotelOpens  (4 Star)" },
    { value: "Arayik ResortOpens", label: "Arayik ResortOpens (3 Star)" },
    { value: "WA HotelOpen ", label: "WA HotelOpen (5 Star)" },
    { value: "JOUDYAN Red Sea Mall Jeddah By ELAF", label: "JOUDYAN Red Sea Mall Jeddah By ELAF (5 Star)" },
    { value: "Park Inn by Radisson Makkah Aziziyah", label: "Park Inn by Radisson Makkah Aziziyah (3 Star)" },
  ];

  const Madina = [
 
    {value: "Madinah Hilton ", label: "Madinah Hilton  (4 Star)" }, 
    {value: "Dar Al-Taqwa Hotel Madinah ", label: "Dar Al-Taqwa Hotel Madinah  (5 Star)" }, 
    {value: "Leader Al-Muna Kareem Hotel ", label: "Madinah Hilton  (4 Star)" }, 
    {value: "Meshal Hotel Al Madina ", label: "Meshal Hotel Al Madina  (3 Star)" }, 
   
  ]

  const options = [
    { value: "Umrah", label: "Umrah" },
    { value: "Hajj", label: "Hajj" },
    { value: "ALl", label: "All" },
    // { value: "21365", label: "21365" },
    // { value: "27257", label: "27257" },
  ];

  const handleGenderChange = (newValue, actionMeta) => {
    // if (actionMeta.action === "create-option") {
    //   setCustomGender(newValue.value);
    // } else {
    //   setCustomGender("");
    // }
    // setGender(newValue);
    console.log(newValue)
  };

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  return (
    <>
      <div
        className={`dashboard overflow-hidden ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard `}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content ">
            <h1 className="text-30">Add Tour</h1>
            <p className="">Lorem ipsum dolor sit amet, consectetur.</p>

            <div className="rounded-12 bg-white shadow-2 px-40 pt-40 pb-30 mt-60">
              <div className="tabs -underline-2 js-tabs">
                <div className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20 js-tabs-controls">
                  {tabs.map((elm, i) => (
                    <div
                      onClick={() => setActiveTab(elm)}
                      key={i}
                      className="col-auto"
                    >
                      <button
                        className={`tabs__button text-20 lh-12 fw-500 pb-15 lg:pb-0 js-tabs-button ${
                          activeTab == elm ? "is-tab-el-active" : ""
                        }`}
                      >
                        {i + 1}. {elm}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="row pt-40">
                  <div className="col-xl-12 col-lg-12">
                    <div className="tabs__content js-tabs-content">
                      <div
                        className={`tabs__pane  ${
                          activeTab == "Content" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="form_2">
                          <div className=" y-gap-30 contactForm px-20 py-20 ">
                            <div className="row ">
                              <div className="col-md-6">
                                <div className="form-input spacing d-flex flex-column align-items-center add-tour-type">
                                  <CreatableSelect
                                    value={gender}
                                    onChange={handleGenderChange}
                                    options={options}
                                    className="custom-select"
                                    placeholder="Select or Tour Type"
                                    classNamePrefix="react-select"
                                    isClearable
                                    formatCreateLabel={(inputValue) =>
                                      `Create custom gender: "${inputValue}"`
                                    }
                                  />
                                  {gender && gender.__isNew__ && (
                                    <input
                                      type="text"
                                      value={customGender}
                                      onChange={(e) =>
                                        setCustomGender(e.target.value)
                                      }
                                      placeholder="Enter custom gender"
                                      className="form-control mt-2 custom-input"
                                    />
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Tour Name
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Seat availibility
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="date" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Start date of tour
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="date" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    End date of tour
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price per adult
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price per child
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price per baby
                                  </label>
                                </div>
                              </div>

                              {/* <div className="col-md-6">
                                <div className="form-input spacing">
                                  <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                    className="form-control"
                                  >
                                    <option value="male">Pending</option>
                                    <option value="female">Approved</option>
                                    <option value="other">Rejected</option>
                                  </select>
                                  <label className="lh-1 text-16 text-light-1">
                                    {gender}
                                  </label>
                                </div>
                              </div> */}

                            </div>

                            <div className="col-12">
                            <h4 className="text-18 fw-500 mb-20">Gallery</h4>

                            <div className="row x-gap-20 y-gap-20">
                              {image1 ? (
                                <div className="col-auto  ">
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
                                <div className="col-auto  ">
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
                                    onChange={(e) =>
                                      handleImageChange(e, setImage1)
                                    }
                                    accept="image/*"
                                    id="imageInp1"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                              {image2 ? (
                                <div className="col-auto  ">
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
                                <div className="col-auto  ">
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
                                      Upload Images
                                    </div>
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      handleImageChange(e, setImage2)
                                    }
                                    accept="image/*"
                                    id="imageInp2"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                              {image3 ? (
                                <div className="col-auto ">
                                  <div className="relative">
                                    <Image
                                      width={200}
                                      height={200}
                                      src={image3}
                                      alt="image"
                                      className="size-200 rounded-12 object-cover"
                                    />
                                    <button
                                      onClick={() => {
                                        setImage3("");
                                      }}
                                      className="absoluteIcon1 button -dark-1"
                                    >
                                      <i className="icon-delete text-18"></i>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-auto ">
                                  <label
                                    htmlFor="imageInp3"
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
                                    onChange={(e) =>
                                      handleImageChange(e, setImage3)
                                    }
                                    accept="image/*"
                                    id="imageInp3"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                              {image4 ? (
                                <div className="col-auto ">
                                  <div className="relative">
                                    <Image
                                      width={200}
                                      height={200}
                                      src={image4}
                                      alt="image"
                                      className="size-200 rounded-12 object-cover"
                                    />
                                    <button
                                      onClick={() => {
                                        setImage4("");
                                      }}
                                      className="absoluteIcon1 button -dark-1"
                                    >
                                      <i className="icon-delete text-18"></i>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="col-auto ">
                                  <label
                                    htmlFor="imageInp4"
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
                                    onChange={(e) =>
                                      handleImageChange(e, setImage4)
                                    }
                                    accept="image/*"
                                    id="imageInp4"
                                    type="file"
                                    style={{ display: "none" }}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="text-14 mt-20">
                              PNG or JPG no bigger than 800px wide and tall.
                            </div>
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                                  SAVE DETAILS
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`tabs__pane  ${
                          activeTab == "Location" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="contactForm row y-gap-30">
                          <div className="col-12">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                City
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                State
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Address
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Zip Code
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Map Latitude
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Map Longitude
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-input ">
                              <input type="text" required />
                              <label className="lh-1 text-16 text-light-1">
                                Map Zoom
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="map relative mt-30">
                          <Map />
                        </div>

                        <button className="button -md -dark-1 bg-accent-1 text-white mt-30">
                          Save Changes
                          <i className="icon-arrow-top-right text-16 ml-10"></i>
                        </button>
                      </div>

                      <div
                        className={`tabs__pane  ${
                          activeTab == "Pricing" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="mt-30">
                          <h3 className="text-18 fw-500 mb-20">Extra Price</h3>

                          <div className="contactForm row y-gap-30 items-center">
                            <div className="col-lg-4">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Add Service per booking
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Description
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="d-flex items-center">
                                <div className="form-input ">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price
                                  </label>
                                </div>

                                <button className="text-18 ml-20">
                                  <i className="icon-delete"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="contactForm row y-gap-30 items-center pt-10">
                            <div className="col-lg-4">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Add Service per booking
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Description
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="d-flex items-center">
                                <div className="form-input ">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price
                                  </label>
                                </div>

                                <button className="text-18 ml-20">
                                  <i className="icon-delete"></i>
                                </button>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="mt-30">
                          <h3 className="text-18 fw-500 mb-20">Extra Additional services </h3>

                          <div className="row">
                            <div className="col-lg-6">
                              <p>Additional services</p>
                            </div>
                            <div className="col-lg-6">
                              <p>Price (€) per person</p>
                            </div>
                          </div>

                          <div className="contactForm row y-gap-30 items-center">
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                1 Bettzimmer
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="Number" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Price
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="contactForm row y-gap-30 items-center">
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                2 Bettzimmer
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="Number" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Price
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="contactForm row y-gap-30 items-center">
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                3 Bettzimmer
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="Number" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Price
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="contactForm row y-gap-30 items-center">
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                4 Bettzimmer
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-input ">
                                <input type="Number" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Price
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* <div className="mt-30">
                            <button className="button -md -outline-dark-1 bg-light-1">
                              <i className="icon-add-button text-16 mr-10"></i>
                              Add Item
                            </button>
                          </div> */}
                        </div>
                        <div className="col-12">
                              <div className="row">
                                <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                                  SAVE DETAILS
                                </button>
                              </div>
                            </div>
                      </div>

                      <div
                        className={`tabs__pane  ${
                          activeTab == "Included" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="row y-gap-20 justify-between">
                          <div className="col-md-4">
                            <div className="row y-gap-20">
                              <div className="col-12">
                                <div className="d-flex items-center">
                                  <div className="form-checkbox ">
                                    <input type="checkbox" name="name" />
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
                                  </div>

                                  <div className="lh-16 ml-15">
                                    Beverages, drinking water, morning tea and
                                    buffet lunch
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="d-flex items-center">
                                  <div className="form-checkbox ">
                                    <input type="checkbox" name="name" />
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
                                  </div>

                                  <div className="lh-16 ml-15">Local taxes</div>
                                </div>
                              </div>

                              

                              

                              <div className="col-12">
                                <div className="d-flex items-center">
                                  <div className="form-checkbox ">
                                    <input type="checkbox" name="name" />
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
                                  </div>

                                  <div className="lh-16 ml-15">Tour Guide</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="row y-gap-20">
                              <div className="col-12">
                                <div className="d-flex items-center">
                                  <div className="form-checkbox ">
                                    <input type="checkbox" name="name" />
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
                                  </div>

                                  <div className="lh-16 ml-15"> Wifi</div>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="d-flex items-center">
                                  <div className="form-checkbox ">
                                    <input type="checkbox" name="name" />
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
                                  </div>

                                  <div className="lh-16 ml-15">
                                    Hotel pickup and drop-off by air-conditioned
                                    minivan
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="row y-gap-20">
                            <div className="col-12">
                                <div className="d-flex items-center">
                                  <div className="form-checkbox ">
                                    <input type="checkbox" name="name" />
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
                                  </div>

                                  <div className="lh-16 ml-15">
                                    InsuranceTransfer to a private pier
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="d-flex items-center">
                                  <div className="form-checkbox ">
                                    <input type="checkbox" name="name" />
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
                                  </div>

                                  <div className="lh-16 ml-15">Soft drinks</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                              <div className="row">
                                <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                                  SAVE DETAILS
                                </button>
                              </div>
                            </div>
                      </div>

                      <div
                        className={`tabs__pane  ${
                          activeTab == "Overview" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div>
                          <Editor
                            editorState={editorState}
                            // toolbarClassName="toolbarClassName"
                            // wrapperClassName="wrapperClassName"
                            // editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                          />
                          <div className="col-12">
                              <div className="row">
                                <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                                  SAVE DETAILS
                                </button>
                              </div>
                            </div>
                        </div>
                      </div>

                      <div
                        className={`tabs__pane  ${
                          activeTab == "Itinerary" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="form_2">
                          <div className=" y-gap-30 contactForm px-20 py-20 ">
                            <div className="row ">
                              

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Day 1 :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <textarea type="text" required  rows={1} cols={80}  />
                                  <label className="lh-1 text-16 text-light-1">
                                  Description :
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Day 2 :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <textarea type="text" required  rows={1} cols={80}  />
                                  <label className="lh-1 text-16 text-light-1">
                                  Description :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Day 3 :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <textarea type="text" required  rows={1} cols={80}  />
                                  <label className="lh-1 text-16 text-light-1">
                                  Description :
                                  </label>
                                </div>
                              </div>

                              
                            </div>

                            <div className="col-12">
                              <div className="row">
                                <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                                  SAVE DETAILS
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`tabs__pane  ${
                          activeTab == "General Information" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="">
                          <div className="d-flex item-center justify-content-between">
                            <h6>Visa processing</h6>
                            <div className="flex_start my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="Yes"
                                        checked={radioValue === "Yes"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10"></span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                    Yes
                                  </div>
                                </div>
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="No"
                                        checked={radioValue === "No"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                  No
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div className="d-flex item-center justify-content-between">
                            <h6>Hotel included</h6>
                            <div className="flex_start my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="Hotel_Yes"
                                        checked={radioValue === "Hotel_Yes"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10"></span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                    Yes
                                  </div>
                                </div>
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="Hotel_No"
                                        checked={radioValue === "Hotel_No"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                  No
                                  </div>
                                </div>
                            </div>
                          </div>
                          <br />
                          <div className="">
                            <h6>Mekka Hotel</h6>
                            <ul className="mx-3">
                              <li>
                                <div className="col-md-6">
                                <div className="form-input spacing d-flex flex-column align-items-centerc hotel-mekka">
                                  <CreatableSelect
                                    value={Hotel}
                                    onChange={handleGenderChange}
                                    options={options2}
                                    className="custom-select"
                                    placeholder="Select Hotel For Mekka"
                                    classNamePrefix="react-select"
                                    isClearable
                                    formatCreateLabel={(inputValue) =>
                                      `Create custom gender: "${inputValue}"`
                                    }
                                  />
                                  {Hotel && Hotel.__isNew__ && (
                                    <input
                                      type="text"
                                      value={customGender}
                                      onChange={(e) =>
                                        setCustomGender(e.target.value)
                                      }
                                      placeholder="Enter custom gender"
                                      className="form-control mt-2 custom-input"
                                    />
                                  )}
                                </div>
                                </div>
                              </li>
                              {/* <li className="d-flex item-center my-2">Taj Hotel : ( 3<FaStar className="mx-1"/> )   1.799,00 €</li> */}
                              {/* <li className="d-flex item-center my-2">Marriott Hotel : ( 5<FaStar className="mx-1"/> ) 2.000,00 €</li> */}
                            </ul>

                            <h6>Madina Hotel</h6>
                            <ul className="mx-3">
                            <li>
                                <div className="col-md-6">
                                <div className="form-input spacing d-flex flex-column align-items-center">
                                  <CreatableSelect
                                    value={gender}
                                    onChange={handleGenderChange}
                                    options={Madina}
                                    className="custom-select"
                                    placeholder="Select Hotel For Madina"
                                    classNamePrefix="react-select"
                                    isClearable
                                    formatCreateLabel={(inputValue) =>
                                      `Create custom gender: "${inputValue}"`
                                    }
                                  />
                                  {gender && gender.__isNew__ && (
                                    <input
                                      type="text"
                                      value={customGender}
                                      onChange={(e) =>
                                        setCustomGender(e.target.value)
                                      }
                                      placeholder="Enter custom gender"
                                      className="form-control mt-2 custom-input"
                                    />
                                  )}
                                </div>
                                </div>
                            </li>
                              {/* <li className="d-flex item-center my-2">Orchid Hotel : ( 3<FaStar className="mx-1"/> )   1.799,00 €</li>
                              <li className="d-flex item-center my-2">Empire Royale Hotel - Hostel Hotel : ( 5<FaStar className="mx-1"/> ) 5.799,00 €</li> */}
                            </ul>
                          </div>
                          <br />
                          <div className="d-flex item-center justify-content-between">
                            <h6>Free cancellation (up to 14 days before travel date)</h6>
                            <div className="flex_start my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="Cancel_yes"
                                        checked={radioValue === "Cancel_yes"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10"></span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                    Yes
                                  </div>
                                </div>
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="Cancel_No"
                                        checked={radioValue === "Cancel_No"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                  No
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div className="d-flex item-center justify-content-between">
                            <h6>Direct Flight</h6>
                            <div className="flex_start my-3">
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="Flight_Yes"
                                        checked={radioValue === "Flight_Yes"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10"></span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                    Yes
                                  </div>
                                </div>
                                <div className="d-flex items-center mx-2">
                                  <div className="form-radio d-flex items-center">
                                    <label className="radio">
                                      <input
                                        type="radio"
                                        name="radioGroup"
                                        value="Flight_No"
                                        checked={radioValue === "Flight_No"}
                                        onChange={handleRadioChange}
                                      />
                                      <span className="radio__mark">
                                        <span className="radio__icon"></span>
                                      </span>
                                      {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                                    </label>
                                  </div>
                                  <div className="ml-10">
                                  No
                                  </div>
                                </div>
                            </div>
                          </div>
                          <br />
                          <div className="form_2">
                            <div className=" y-gap-30 contactForm px-20 py-20 ">
                              <div className="row ">
                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Flight Amount
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    No Of Flight Stops
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                    className="form-control"
                                  >
                                    <option value="English">English</option>
                                    <option value="German">German</option>
                                    <option value="Turkish">Turkish</option>
                                    <option value="Arabic">Arabic</option>
                                  </select>
                                  <label className="lh-1 text-16 text-light-1">
                                    {gender}
                                  </label>
                                </div>
                              </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="form_2">
                            <div className=" y-gap-30 contactForm px-20 py-20 ">
                              <div className="row ">
                              <div className="col-md-6">
                                <div className="form-input spacing">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    No Of Flight Stops
                                  </label>
                                </div>
                              </div>
                              </div>
                            </div>
                          </div> */}
                          <div className="col-12">
                              <div className="row">
                                <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                                  SAVE DETAILS
                                </button>
                              </div>
                            </div>
                        </div>
                      </div>

                    </div>
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
