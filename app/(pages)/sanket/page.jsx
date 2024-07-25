"use client";

import Header from "@/components/dasboard/Header";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";

// Import Editor dynamically without SSR
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
  const [activeTab, setActiveTab] = useState("Content");

  // State to manage checkbox and price inputs
  const [services, setServices] = useState({
    bedroom1: { checked: false, price: "" },
    bedroom2: { checked: false, price: "" },
    bedroom3: { checked: false, price: "" },
    bedroom4: { checked: false, price: "" },
  });

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setServices((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked },
    }));
  };

  const handlePriceChange = (event) => {
    const { id, value } = event.target;
    setServices((prev) => ({
      ...prev,
      [id]: { ...prev[id], price: value },
    }));
  };

  return (
    <>
      <div
        className={`dashboard overflow-hidden ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard `}
      >
        <AgentDBsideBar  setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content ">
            <h1 className="text-30">Add Tour</h1>

            <div className="rounded-12 bg-white shadow-2 px-40 py-40 mt-20">
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
                          activeTab === elm ? "is-tab-el-active" : ""
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
                          activeTab === "Pricing" ? "is-tab-el-active" : ""
                        }`}
                      >
                        <form className="y-gap-30 contactForm px-lg-20 px-0 ">
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
                              Additional Services
                            </h3>

                            <div className="row">
                              <div className="col-lg-4">
                                <p>Additional Services</p>
                              </div>
                              <div className="col-lg-6">
                                <p>Price (€) Per Person</p>
                              </div>
                            </div>

                            {Object.keys(services).map((id, index) => (
                              <div key={id} className="contactForm row y-gap-30 items-center pt-lg-0 pt-10">
                                <div className="col-lg-4">
                                  <div className="d-flex items-center pointer-check">
                                    <div className="form-checkbox">
                                      <input
                                        type="checkbox"
                                        id={id}
                                        checked={services[id].checked}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label
                                        htmlFor={id}
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
                                      htmlFor={id}
                                      className="lh-16 ml-15 my-2"
                                    >
                                      {index + 1} Bed-Room
                                    </label>
                                  </div>
                                </div>
                                {services[id].checked && (
                                  <div className="col-lg-6">
                                    <div className="form-input my-1">
                                      <input
                                        type="number"
                                        id={id}
                                        value={services[id].price}
                                        onChange={handlePriceChange}
                                        required
                                      />
                                      <label className="lh-1 text-16 text-light-1">
                                        Price
                                      </label>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}

                            <div className="col-12">
                              <div className="row">
                                <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3">
                                  SAVE DETAILS
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
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
