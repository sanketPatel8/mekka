"use client";

import React, { useEffect, useRef, useState } from "react";
import { toursTypes, features } from "@/data/tourFilteringOptions";
import RangeSlider from "@/components/common/RangeSlider";
import Stars from "@/components/common/Stars";
import PriceRangeBar from "@/components/common/PriceRangeBar";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Sidebar2({
  FliterData,
  setLanActives,
  FilterSidebar,
  LanActives,
  value,
  setValue,
  handleSelectionChange,
  Distance,
  setDistance,
  FilterPrice,
  setFilterPrice,
  setFilterDistance,
  FilterDistance
}) {
  const [ddActives, setDdActives] = useState(["tourtype"]);
  const handleChange = (key, value) => {
    handleSelectionChange(key, value);
  };

  useEffect(() => {
   
  }, [FilterSidebar]);

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
                    {FliterData?.tour_type?.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            {/* <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm}
                                    name={elm}
                                    checked={FilterSidebar?.selectedTourTypes.includes(
                                      elm
                                    )}
                                    onChange={() =>
                                      handleChange("selectedTourTypes", elm)
                                    }
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
                                  {translate(elm)}
                                </label>
                              </div>
                            </div> */}
                            <div className="col-12">
                              <div className="form-radio d-flex items-center">
                                <label className="radio d-flex items-center ">
                                  <input
                                    type="radio"
                                    id={elm}
                                    name="selectedTourTypes"
                                    value={elm}
                                    checked={
                                      FilterSidebar?.selectedTourTypes === elm
                                    }
                                    onChange={() =>
                                      handleChange("selectedTourTypes", elm)
                                    }
                                  />
                                  <span className="radio__mark">
                                    <span className="radio__icon"></span>
                                  </span>
                                  <span className="text-14 lh-1 ml-10">
                                    {translate(elm)}
                                  </span>
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

        {/* <div className="sidebar__item">
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
                                <div className="form-radio">
                                  <input
                                    type="radio"
                                    id={elm}
                                    name="selectedTourTypes"
                                    value={elm}
                                    checked={
                                      FilterSidebar?.selectedTourTypes === elm
                                    }
                                    onChange={() =>
                                      handleChange("selectedTourTypes", elm)
                                    }
                                  />
                                  <label
                                    htmlFor={elm}
                                    className="form-radio__mark"
                                  >
                                    <div className="form-radio__icon">
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
                                  {translate(elm)}
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
        </div> */}

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                LanActives?.includes("Langauge") ? "is-active" : ""
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
                  LanActives?.includes("Langauge") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {FliterData?.languages?.map((elm, i) => (
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
                                    checked={FilterSidebar?.selectedLanguages.includes(
                                      elm.id
                                    )}
                                    onChange={() =>
                                      handleChange("selectedLanguages", elm.id)
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
                ddActives?.includes("country") ? "is-active" : ""
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
                  ddActives?.includes("country") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {FliterData?.departure?.map((elm, i) => (
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
                                    checked={FilterSidebar?.selectedCities.includes(
                                      elm.id
                                    )}
                                    onChange={() =>
                                      handleChange("selectedCities", elm.id)
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
                ddActives?.includes("Distance") ? "is-active" : ""
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
                <PriceRangeBar FilterDistance={FilterDistance} Distance={Distance} setDistance={setDistance} FliterData={FliterData} setFilterDistance={setFilterDistance} />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives?.includes("pricerange") ? "is-active" : ""
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
                  ddActives?.includes("pricerange")
                    ? { maxHeight: "300px" }
                    : {}
                }
              >
                <RangeSlider
                  min={FilterSidebar?.min_price}
                  max={FilterSidebar?.max_price}
                  step={10}
                  value={value}
                  setValue={setValue}
                  FliterData={FliterData}
                  FilterPrice={FilterPrice}
                  setFilterPrice={setFilterPrice}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives?.includes("dur ation") ? "is-active" : ""
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
                  ddActives?.includes("duration") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {FliterData?.hotel_stars?.map((elm, i) => (
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
                                    checked={FilterSidebar?.selectedDurations.includes(
                                      elm
                                    )}
                                    onChange={() =>
                                      handleChange("selectedDurations", elm)
                                    }
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
                                  {elm} {translate("Star")}
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

        {/* <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item ${
                ddActives?.includes("rating") ? "is-active" : ""
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
                  ddActives?.includes("rating") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {FliterData?.agent_stars?.map((star, i) => (
                      <div key={i} className="d-flex items-center">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            id={`rating-${star}`}
                            name={star}
                            checked={FilterSidebar?.selectedRatings.includes(
                              star
                            )}
                            onChange={() =>
                              handleChange("selectedRatings", star)
                            }
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
        </div> */}

        {/* <div className="sidebar__item">
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
                    {FliterData?.amenities?.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm?.options_en}
                                    name={elm?.options_en}
                                    checked={FilterSidebar?.selectedFeatures.includes(elm?.options_en)}

                                    onChange={() => handleChange("selectedFeatures", elm?.options_en)}

                                  />
                                  <label
                                    htmlFor={elm?.options_en}
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
                                  htmlFor={elm?.option}
                                  className="lh-16 ml-15"
                                >
                                  {elm?.option}
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
        </div> */}

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
                      ? prev.filter((elm) => elm !== "features")
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
                    {FliterData?.amenities?.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id={elm?.option}
                                    name={elm?.option}
                                    // Check if this option is selected
                                    checked={FilterSidebar?.selectedFeatures.includes(
                                      elm?.id
                                    )}
                                    // Update the selected features
                                    onChange={() =>
                                      handleSelectionChange(
                                        "selectedFeatures",
                                        elm?.id
                                      )
                                    }
                                  />
                                  <label
                                    htmlFor={elm?.option}
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
                                  htmlFor={elm?.option}
                                  className="lh-16 ml-15"
                                >
                                  {elm?.option}
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
