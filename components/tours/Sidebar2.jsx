"use client";

import React, { useEffect, useState } from "react";
import { toursTypes, features } from "@/data/tourFilteringOptions";
import RangeSlider from "@/components/common/RangeSlider";
import Stars from "@/components/common/Stars";
import PriceRangeBar from "@/components/common/PriceRangeBar";
import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import { useGlobalState } from "@/app/context/GlobalStateContext";

export default function Sidebar2() {
  const [ddActives, setDdActives] = useState(["tourtype"]);
  const [LanActives, setLanActives] = useState([]);
  const [TourData, setTourData] = useState({});
  const { value , setFilterData } = useGlobalState();


  // Generic handleChange function for all selections
  const useHandleSelection = () => {
    const [selections, setSelections] = useState([]);

    const handleSelectionChange = (item) => {
      setSelections((prevSelections) =>
        prevSelections.includes(item)
          ? prevSelections.filter((selection) => selection !== item)
          : [...prevSelections, item]
      );
    };

    useEffect(() => {
      console.log("update state update useEffect");

      const fetchData = async () => {
        const sendData = {
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          type: selectedTourTypes.join(", "),
          language: 1 ,
          departure: selectedCities.join(", "),
          min_price: value[0],
          max_price: value[1],
          hotel_star: selectedDurations.join(", "),
          agent_rating: selectedRatings.join(", "),
          amenities: selectedFeatures.join(", "),
          start: 0,
        };

        try {
          const response = await post("tourfilter", sendData);
          setFilterData(response.Tours);
        } catch (error) {
          console.error("Error caught:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            showErrorToast("Please verify your email");
          } else {
            showErrorToast("An error occurred during registration.");
          }
        }
        
      };

      fetchData();
    }, [selections]);

    return [selections, handleSelectionChange];
  };

  // Using the generic function for each selection type
  const [selectedTourTypes, handleTourTypeChange] = useHandleSelection();
  const [selectedLanguages, handleLanguageChange] = useHandleSelection();
  const [selectedCities, handleCityChange] = useHandleSelection();
  const [selectedRatings, handleRatingChange] = useHandleSelection();
  const [selectedFeatures, handleFeatureChange] = useHandleSelection();
  const [selectedDurations, handleDurationChange] = useHandleSelection();

  // with tourdata api call
  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      };

      try {
        const response = await post("tour_data", sendData);
        setTourData(response.Data);
      } catch (error) {
        console.error("Error caught:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showErrorToast("Please verify your email");
        } else {
          showErrorToast("An error occurred during registration.");
        }
      }
    };

    fetchData();
  }, []);

  const { translate } = useTranslation();

  return (
    <div className="sidebar -type-1 rounded-12">
      <div className="sidebar__content">
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("tourtype") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((prev) =>
                    prev.includes("tourtype")
                      ? [...prev.filter((elm) => elm !== "tourtype")]
                      : [...prev, "tourtype"]
                  )
                }
              >
                <h5 className="text-18 fw-500">{translate("Tour Type")}</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("tourtype") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {toursTypes.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm}
                                    name={elm}
                                    checked={selectedTourTypes.includes(elm)}
                                    onChange={() => handleTourTypeChange(elm)}
                                  />
                                  <label
                                    htmlFor={elm}
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
                                <label htmlFor={elm} className="lh-16 ml-15">
                                  {elm}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                LanActives.includes("Langauge") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setLanActives((prev) =>
                    prev.includes("Langauge")
                      ? prev.filter((elm) => elm !== "Langauge")
                      : [...prev, "Langauge"]
                  )
                }
              >
                <h5 className="text-18 fw-500">{translate("Languages")}</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  LanActives.includes("Langauge") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {TourData.languages?.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm.languages_en}
                                    name={elm.languages_en}
                                    checked={selectedLanguages.includes(
                                      elm.languages_en
                                    )}
                                    onChange={() =>
                                      handleLanguageChange(elm.languages_en)
                                    }
                                  />
                                  <label
                                    htmlFor={elm.languages_en}
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
                                  htmlFor={elm.languages_en}
                                  className="lh-16 ml-15"
                                >
                                  {elm.languages_en}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("country") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((prev) =>
                    prev.includes("country")
                      ? [...prev.filter((elm) => elm !== "country")]
                      : [...prev, "country"]
                  )
                }
              >
                <h5 className="text-18 fw-500">{translate("Departure")}</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("country") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {TourData.departure?.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm.departure}
                                    name={elm.departure}
                                    checked={selectedCities.includes(
                                      elm.departure
                                    )}
                                    onChange={() =>
                                      handleCityChange(elm.departure)
                                    }
                                  />
                                  <label
                                    htmlFor={elm.departure}
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
                                  htmlFor={elm.departure}
                                  className="lh-16 ml-15"
                                >
                                  {elm.departure}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("Distance") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((prev) =>
                    prev.includes("Distance")
                      ? [...prev.filter((elm) => elm !== "Distance")]
                      : [...prev, "Distance"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {translate("Distance to Mosque")}
                </h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("Distance") ? { maxHeight: "300px" } : {}
                }
              >
                <PriceRangeBar />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("pricerange") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((prev) =>
                    prev.includes("pricerange")
                      ? [...prev.filter((elm) => elm !== "pricerange")]
                      : [...prev, "pricerange"]
                  )
                }
              >
                <h5 className="text-18 fw-500">{translate("Filter Price")}</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("pricerange") ? { maxHeight: "300px" } : {}
                }
              >
                <RangeSlider min={0} max={1000} step={10} />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("dur ation") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((prev) =>
                    prev.includes("duration")
                      ? [...prev.filter((elm) => elm !== "duration")]
                      : [...prev, "duration"]
                  )
                }
              >
                <h5 className="text-18 fw-500">{translate("Hotel Star")}</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("duration") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {TourData?.hotel_stars?.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm}
                                    name={elm}
                                    checked={selectedDurations.includes(elm)}
                                    onChange={() => handleDurationChange(elm)}
                                  />
                                  <label
                                    htmlFor={elm}
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
                                <label htmlFor={elm} className="lh-16 ml-15">
                                  {elm} Star
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("rating") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((prev) =>
                    prev.includes("rating")
                      ? prev.filter((elm) => elm !== "rating")
                      : [...prev, "rating"]
                  )
                }
              >
                <h5 className="text-18 fw-500">{translate("Agent Rating")}</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  ddActives.includes("rating") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {TourData.agent_stars?.map((star, i) => (
                      <div key={i} className="d-flex items-center">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            id={`rating-${star}`}
                            name={star}
                            checked={selectedRatings.includes(star)}
                            onChange={() => handleRatingChange(star)}
                          />
                          <label
                            htmlFor={`rating-${star}`}
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
                          htmlFor={`rating-${star}`}
                          className="lh-16 ml-15 d-flex mx-1 cur_point"
                        >
                          <Stars star={star} font={13} />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives.includes("features") ? "is-active" : ""
              }`}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((prev) =>
                    prev.includes("features")
                      ? [...prev.filter((elm) => elm !== "features")]
                      : [...prev, "features"]
                  )
                }
              >
                <h5 className="text-18 fw-500">{translate("Amenities")}</h5>
                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>
              <div
                className="accordion__content"
                style={
                  ddActives.includes("features") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {features.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm}
                                    name={elm}
                                    checked={selectedFeatures.includes(elm)}
                                    onChange={() => handleFeatureChange(elm)}
                                  />
                                  <label
                                    htmlFor={elm}
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
                                <label htmlFor={elm} className="lh-16 ml-15">
                                  {elm}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
