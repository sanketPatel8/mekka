"use client";

import Header from "@/components/dasboard/Header";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Map from "@/components/pages/contact/Map";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import CreatableSelect from "react-select/creatable";
import { FaStar } from "react-icons/fa";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import $ from "jquery";
import "select2/dist/css/select2.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const tabs = [
  "Content",
  "Pricing",
  "Included",
  "Overview",
  "Itinerary",
  "Flight Hotel And Visa",
];

export default function AddTour() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [showAddMekkaHotelPositive, setshowAddMekkaHotelPositive] =
    useState(false);
  const [showAddMadinaHotelPositive, setshowAddMadinaHotelPositive] =
    useState(false);
  const [SelectedTour, setSelectedTour] = useState("");
  const [gender, setGender] = useState("");
  const [Hotel, setHotel] = useState("");
  const [activeTab, setActiveTab] = useState("Content");
  const [image1, setImage1] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [image2, setImage2] = useState("/img/dashboard/addtour/1.jpg");
  const [image3, setImage3] = useState("/img/dashboard/addtour/2.jpg");
  const [image4, setImage4] = useState("/img/dashboard/addtour/3.jpg");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mekkaRows, setMekkaRows] = useState([
    { hotel: null, price: "", customGender: "", gender: null },
  ]);
  const [madinaRows, setMadinaRows] = useState([
    { hotel: null, price: "", customGender: "", gender: null },
  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [price, setPrice] = useState("123");

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
      setPrice(""); // Clear the price value if the checkbox is unchecked
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setIsChecked(event);
  };

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
    {
      value: "voco Makkah an IHG HotelOpens ",
      label: "voco Makkah an IHG HotelOpens  (4 Star)",
    },
    { value: "Arayik ResortOpens", label: "Arayik ResortOpens (3 Star)" },
    { value: "WA HotelOpen ", label: "WA HotelOpen (5 Star)" },
    {
      value: "JOUDYAN Red Sea Mall Jeddah By ELAF",
      label: "JOUDYAN Red Sea Mall Jeddah By ELAF (5 Star)",
    },
    {
      value: "Park Inn by Radisson Makkah Aziziyah",
      label: "Park Inn by Radisson Makkah Aziziyah (3 Star)",
    },
  ];

  const Madina = [
    { value: "Madinah Hilton ", label: "Madinah Hilton  (4 Star)" },
    {
      value: "Dar Al-Taqwa Hotel Madinah ",
      label: "Dar Al-Taqwa Hotel Madinah  (5 Star)",
    },
    {
      value: "Leader Al-Muna Kareem Hotel ",
      label: "Madinah Hilton  (4 Star)",
    },
    {
      value: "Meshal Hotel Al Madina ",
      label: "Meshal Hotel Al Madina  (3 Star)",
    },
  ];

  const options = [
    { value: "Umrah", label: "Umrah" },
    { value: "Hajj", label: "Hajj" },
    { value: "ALl", label: "All" },
  ];

  const HandleTourChange = (newValue, actionMeta) => {
    setSelectedTour(newValue);
    console.log(newValue);
  };

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  // for add hotel and remove hotels

  const handleAddMekkaRow = () => {
    setMekkaRows([
      ...mekkaRows,
      { hotel: null, price: "", customGender: "", gender: null },
    ]);
  };

  const handleRemoveMekkaRow = (index) => {
    if (mekkaRows.length === 1) {
      return; // Do not remove the last row
    }
    const newRows = [...mekkaRows];
    newRows.splice(index, 1);
    setMekkaRows(newRows);
  };

  const handleAddMadinaRow = () => {
    setMadinaRows([
      ...madinaRows,
      { hotel: null, price: "", customGender: "", gender: null },
    ]);
  };

  const handleRemoveMadinaRow = (index) => {
    if (madinaRows.length === 1) {
      return; // Do not remove the last row
    }
    const newRows = [...madinaRows];
    newRows.splice(index, 1);
    setMadinaRows(newRows);
  };

  const handleMekkaChange = (value, index) => {
    const newRows = [...mekkaRows];
    newRows[index].hotel = value;
    setMekkaRows(newRows);
  };

  const handleMadinaChange = (value, index) => {
    const newRows = [...madinaRows];
    newRows[index].hotel = value;
    setMadinaRows(newRows);
  };

  const selectRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.$ = window.jQuery = $;
      import("select2").then(() => {
        $(selectRef.current).select2();
        return () => {
          $(selectRef.current).select2("destroy");
        };
      });
    }
  }, []);

  // for add flight name and amount booking

  const [flightRow, setFlightRow] = useState([
    { Flight: " ", price: " ", Stop: " " },
  ]);

  const handleFlightChange = (e, index, field) => {
    const { value } = e.target;
    const newRows = [...flightRow];
    newRows[index][field] = value;
    setFlightRow(newRows);
  };

  const HandleAddFlightRow = () => {
    setFlightRow([...flightRow, { Flight: " ", price: " ", Stop: " " }]);
  };

  const HandleRemoveFlightRow = (index) => {
    if (flightRow.length === 1) {
      return; // Do not remove the last row
    }
    const newRows = [...flightRow];
    newRows.splice(index, 1);
    setFlightRow(newRows);
  };

  const ChooseFlight = [
    { value: "Indigo ", label: "Indigo" },
    {
      value: "Air India ",
      label: "Air India",
    },
    {
      value: "Air India Express ",
      label: "Air India Express",
    },
    {
      value: "Air Asia India ",
      label: "Air Asia India",
    },
    {
      value: "Air Asia ",
      label: "Air Asia",
    },
    {
      value: "Akasa Air ",
      label: "Akasa Air",
    },
    {
      value: "Vistara ",
      label: "Vistara",
    },
    {
      value: "SpiceJet ",
      label: "SpiceJet",
    },
  ];

  const handleFlightSelectChange = (value, index) => {
    const newRows = [...flightRow];
    newRows[index].Flight = value;
    setFlightRow(newRows);
  }

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

            <div className="rounded-12 bg-white shadow-2 px-40 pt-30 pb-30 mt-20">
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
                          <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                            <div className="row ">
                              <div className="col-md-6">
                                <div className="form-input my-1 d-flex flex-column align-items-center add-tour-type">
                                  <CreatableSelect
                                    value={SelectedTour}
                                    onChange={HandleTourChange}
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
                                      value={SelectedTour}
                                      onChange={(e) =>
                                        setSelectedTour(e.target.value)
                                      }
                                      placeholder="Enter custom gender"
                                      className="form-control mt-2 custom-input"
                                    />
                                  )}
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Tour Name
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <input type="number" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Seat Availibility
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <input type="date" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Start Date of Tour
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <input type="date" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    End Date of Tour
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1 position-relative">
                                  <select
                                    ref={selectRef}
                                    className="js-example-basic-multiple"
                                    name="states[]"
                                    multiple="multiple"
                                    placeholder="Langauge"
                                  >
                                    <option value="ENG">English</option>
                                    <option value="GER">German</option>
                                    <option value="TUR">Turkis</option>
                                    <option value="ARB">Arbic</option>
                                  </select>
                                  <label className="multi-lan-select">
                                    Langauge
                                  </label>
                                </div>
                              </div>
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
                                PNG or JPG no Bigger Than 800px Wide And Tall.
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
                        <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
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
                        <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                          <div className="contactForm row y-gap-30 items-center ">
                            <div className="col-lg-4">
                              <div className="form-input my-1">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Price (€) Per Adult
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-input my-1">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Price (€) Per Child
                                </label>
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-input my-1">
                                <input type="text" required />
                                <label className="lh-1 text-16 text-light-1">
                                  Price (€) Per Baby
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mt-30">
                            <h3 className="text-18 fw-500 mb-20">
                              Additional Services{" "}
                            </h3>

                            <div className="row">
                              <div className="col-lg-4">
                                <p>Additional Services</p>
                              </div>
                              <div className="col-lg-6">
                                <p>Price (€) Per Person</p>
                              </div>
                            </div>

                            <div className="contactForm row y-gap-30 items-center pt-lg-0 pt-10">
                              <div className="col-lg-4">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="bedroom1"
                                      name="bedroom1"
                                      checked={isChecked}
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="bedroom1"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="bedroom1"
                                    className="lh-16 ml-15"
                                  >
                                    1 Bed-Room
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-input my-1">
                                  <input
                                    type="number"
                                    value={isChecked ? price : ""}
                                    onChange={handlePriceChange}
                                    required
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="contactForm row y-gap-30 items-center pt-lg-0 pt-10">
                              <div className="col-lg-4">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="bedroom2"
                                      name="bedroom2"
                                      checked={isChecked}
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="bedroom2"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="bedroom2"
                                    className="lh-16 ml-15"
                                  >
                                    2 Bed-Room
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-input my-1">
                                  <input
                                    type="number"
                                    value={isChecked ? price : ""}
                                    onChange={handlePriceChange}
                                    required
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="contactForm row y-gap-30 items-center pt-lg-0 pt-10">
                              <div className="col-lg-4">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="bedroom3"
                                      name="bedroom3"
                                      checked={isChecked}
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="bedroom3"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="bedroom3"
                                    className="lh-16 ml-15"
                                  >
                                    3 Bed-Room
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-input my-1">
                                  <input
                                    type="number"
                                    value={isChecked ? price : ""}
                                    onChange={handlePriceChange}
                                    required
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="contactForm row y-gap-30 items-center pt-lg-0 pt-10">
                              <div className="col-lg-4">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="bedroom4"
                                      name="bedroom4"
                                      checked={isChecked}
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      htmlFor="bedroom4"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="bedroom4"
                                    className="lh-16 ml-15"
                                  >
                                    4 Bed-Room
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-input my-1">
                                  <input
                                    type="number"
                                    value={isChecked ? price : ""}
                                    onChange={handlePriceChange}
                                    required
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    Price
                                  </label>
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
                      </div>

                      <div
                        className={`tabs__pane ${
                          activeTab == "Included" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <div className="row justify-between y-gap-30 contactForm px-lg-20 px-0">
                          <div className="col-md-4">
                            <div className="row y-gap-20">
                              <div className="col-12 px-0 my-1">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="item1"
                                      name="item1"
                                    />
                                    <label
                                      htmlFor="item1"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="item1"
                                    className="lh-16 ml-15"
                                  >
                                    Beverages, drinking water, morning tea and
                                    buffet lunch
                                  </label>
                                </div>
                              </div>

                              <div className="col-12 px-0 my-1">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="item2"
                                      name="item2"
                                    />
                                    <label
                                      htmlFor="item2"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="item2"
                                    className="lh-16 ml-15"
                                  >
                                    Local taxes
                                  </label>
                                </div>
                              </div>

                              <div className="col-12 px-0 my-1">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="item3"
                                      name="item3"
                                    />
                                    <label
                                      htmlFor="item3"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="item3"
                                    className="lh-16 ml-15"
                                  >
                                    Tour Guide
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="row y-gap-20">
                              <div className="col-12 px-0 my-1">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="item4"
                                      name="item4"
                                    />
                                    <label
                                      htmlFor="item4"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="item4"
                                    className="lh-16 ml-15"
                                  >
                                    Wifi
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 px-0 my-1">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="item5"
                                      name="item5"
                                    />
                                    <label
                                      htmlFor="item5"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="item5"
                                    className="lh-16 ml-15"
                                  >
                                    Hotel pickup and drop-off by air-conditioned
                                    minivan
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="row y-gap-20">
                              <div className="col-12 px-0 my-1">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="item6"
                                      name="item6"
                                    />
                                    <label
                                      htmlFor="item6"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="item6"
                                    className="lh-16 ml-15"
                                  >
                                    InsuranceTransfer to a private pier
                                  </label>
                                </div>
                              </div>

                              <div className="col-12 px-0 my-1">
                                <div className="d-flex items-center pointer-check">
                                  <div className="form-checkbox">
                                    <input
                                      type="checkbox"
                                      id="item7"
                                      name="item7"
                                    />
                                    <label
                                      htmlFor="item7"
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor="item7"
                                    className="lh-16 ml-15"
                                  >
                                    Soft drinks
                                  </label>
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
                        <div className="y-gap-30 contactForm px-lg-20 px-0 ">
                          <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
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
                          <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                            <div className="row ">
                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Day 1 :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <textarea
                                    type="text"
                                    required
                                    rows={1}
                                    cols={80}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    Description :
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Day 2 :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <textarea
                                    type="text"
                                    required
                                    rows={1}
                                    cols={80}
                                  />
                                  <label className="lh-1 text-16 text-light-1">
                                    Description :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <input type="text" required />
                                  <label className="lh-1 text-16 text-light-1">
                                    Day 3 :
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-input my-1">
                                  <textarea
                                    type="text"
                                    required
                                    rows={1}
                                    cols={80}
                                  />
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
                          activeTab == "Flight Hotel And Visa"
                            ? "is-tab-el-active"
                            : ""
                        }`}
                      >
                        <div className=" y-gap-30 contactForm px-lg-20 px-0 ">
                          <div className="d-flex item-center justify-content-between">
                            <h6>Visa Processing</h6>
                            <div className="flex_start visaYESNOFLEx my-3">
                              <div className="d-flex items-center mx-2">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
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
                                    <span className="text-14 lh-1 ml-5">
                                      Yes
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex items-center mx-2">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
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
                                    <span className="text-14 lh-1 ml-5">
                                      No
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <h6>Mekka Hotel</h6>

                            <ul className="">
                              {mekkaRows.map((row, index) => (
                                <li key={index}>
                                  <div className="col-md-12 row">
                                    <div className="col-4 form-input spacing d-flex flex-column align-items-center hotel-mekka">
                                      <CreatableSelect
                                        value={row.hotel}
                                        onChange={(value) =>
                                          handleMekkaChange(value, index)
                                        }
                                        options={options2}
                                        className="custom-select Hotel-Mekka-dd"
                                        placeholder="Select Hotel For Mekka"
                                        classNamePrefix="react-select"
                                        isClearable
                                        formatCreateLabel={(inputValue) =>
                                          `Not Found: "${inputValue}"`
                                        }
                                      />
                                    </div>

                                    <div className="col-md-4">
                                      <div className="form-input spacing">
                                        <input type="text" required />
                                        <label className="lh-1 text-16 text-light-1">
                                          Hotel Price
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-2 d-flex">
                                      <button
                                        type="button"
                                        className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3 "
                                        onClick={handleAddMekkaRow}
                                      >
                                        +
                                      </button>
                                      {index > 0 && (
                                        <button
                                          type="button"
                                          className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-md-3 mx-1`}
                                          onClick={() =>
                                            handleRemoveMekkaRow(index)
                                          }
                                        >
                                          -
                                        </button>
                                      )}
                                    </div>
                                    <div className="col-md-8">
                                      <div className="form-input m-0">
                                        <textarea required rows="1"></textarea>
                                        <label className="lh-1 text-16 text-light-1">
                                          Description
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>

                            <h6>Madina Hotel</h6>
                            <ul className="">
                              {madinaRows.map((row, index) => (
                                <li key={index}>
                                  <div className="col-md-12 row">
                                    <div className="col-4 form-input spacing d-flex flex-column align-items-center">
                                      <CreatableSelect
                                        value={row.hotel}
                                        onChange={(value) =>
                                          handleMadinaChange(value, index)
                                        }
                                        options={Madina}
                                        className="custom-select Hotel-Madina-dd"
                                        placeholder="Select Hotel For Madina"
                                        classNamePrefix="react-select"
                                        isClearable
                                        formatCreateLabel={(inputValue) =>
                                          `Not Found: "${inputValue}"`
                                        }
                                      />
                                    </div>

                                    <div className="col-md-4">
                                      <div className="form-input spacing">
                                        <input type="text" required />
                                        <label className="lh-1 text-16 text-light-1">
                                          Hotel Price
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-2 d-flex">
                                      <button
                                        type="button"
                                        className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                        onClick={handleAddMadinaRow}
                                      >
                                        +
                                      </button>
                                      {index > 0 && (
                                        <button
                                          type="button"
                                          className={`button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3`}
                                          onClick={() =>
                                            handleRemoveMadinaRow(index)
                                          }
                                        >
                                          -
                                        </button>
                                      )}
                                    </div>
                                    <div className="col-md-8">
                                      <div className="form-input m-0">
                                        <textarea required rows="1"></textarea>
                                        <label className="lh-1 text-16 text-light-1">
                                          Description
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="d-flex item-center justify-content-between">
                            <h6>
                              Free cancellation (up to 14 days before travel
                              date)
                            </h6>
                            <div className="flex_start visaYESNOFLEx my-3">
                              <div className="d-flex items-center mx-2">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="FreeCancel_Yes"
                                      checked={radioValue === "FreeCancel_Yes"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-5">
                                      Yes
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex items-center mx-2">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
                                    <input
                                      type="radio"
                                      name="radioGroup"
                                      value="FreeCancel_No"
                                      checked={radioValue === "FreeCancel_No"}
                                      onChange={handleRadioChange}
                                    />
                                    <span className="radio__mark">
                                      <span className="radio__icon"></span>
                                    </span>
                                    <span className="text-14 lh-1 ml-5">
                                      No
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex item-center justify-content-between pt-10">
                            <h6>Add Flight Details</h6>
                            {/* <div className="flex_start visaYESNOFLEx my-3">
                              <div className="d-flex items-center mx-2">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
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
                                    <span className="text-14 lh-1 ml-5">
                                      Yes
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="d-flex items-center mx-2">
                                <div className="form-radio d-flex items-center">
                                  <label className="radio d-flex items-center">
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
                                    <span className="text-14 lh-1 ml-5">
                                      No
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div> */}
                          </div>
                          <div className="form_2">
                            <div className=" y-gap-30 contactForm py-20 ">
                              {flightRow.map((row, index) => {
                                return (
                                  <div className="row">
                                    <div className="col-md-5">
                                    <CreatableSelect
                                        value={row.Flight}
                                          onChange={(value) =>
                                          handleFlightSelectChange(value, index)
                                        }
                                        options={ChooseFlight}
                                        className="custom-select Hotel-Madina-dd"
                                        placeholder="Select Flight"
                                        classNamePrefix="react-select"
                                        isClearable
                                        formatCreateLabel={(inputValue) =>
                                          `Not Found: "${inputValue}"`
                                        }
                                      />
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-input spacing">
                                        <input
                                          type="text"
                                          required
                                          value={row.price}
                                          onChange={(e) =>
                                            handleFlightChange(
                                              e,
                                              index,
                                              "price"
                                            )
                                          }
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          Flight Amount
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-input spacing">
                                        <input
                                          type="number"
                                          required
                                          value={row.Stop}
                                          onChange={(e) =>
                                            handleFlightChange(e, index, "Stop")
                                          }
                                        />
                                        <label className="lh-1 text-16 text-light-1">
                                          No of Flight Stops
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-2 d-flex">
                                      <button
                                        type="button"
                                        className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                        onClick={HandleAddFlightRow}
                                      >
                                        +
                                      </button>
                                      {index > 0 && (
                                        <button
                                          type="button"
                                          className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-1 mx-md-3"
                                          onClick={() =>
                                            HandleRemoveFlightRow(index)
                                          }
                                        >
                                          -
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
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
