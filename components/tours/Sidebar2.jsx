"use client";

import React, { useState } from "react";
import Calender from "../common/dropdownSearch/Calender";
import {
  durations,
  languages,
  toursTypes,
  features,
  rating,
  city,
} from "@/data/tourFilteringOptions";
import RangeSlider from "../common/RangeSlider";
import Stars from "../common/Stars";
import Image from "next/image";
import PriceRangeBar from "../common/PriceRangeBar";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Sidebar2() {
  const [ddActives, setDdActives] = useState(["tourtype"]);
  const [LanActives, setLanActives] = useState([]);

  const { translate } = useTranslation();
  return (
    <div className="sidebar -type-1 rounded-12">
      <div className="sidebar__content">
        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("tourtype") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("tourtype")
                      ? [...pre.filter((elm) => elm != "tourtype")]
                      : [...pre, "tourtype"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {" "}
                  {translate("Tour Type") }
                </h5>

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
                          <div className="row ">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input type="checkbox" id={elm} name={elm} />
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
              } `}
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
                <h5 className="text-18 fw-500">
                  {" "}
                  {translate("Languages") }
                </h5>

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
                    {languages.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row ">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input type="checkbox" id={elm} name={elm} />
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
                LanActives.includes("country") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setLanActives((prev) =>
                    prev.includes("country")
                      ? prev.filter((elm) => elm !== "country")
                      : [...prev, "country"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {translate("Departure") }
                </h5>

                <div className="accordion__icon flex-center">
                  <i className="icon-chevron-down"></i>
                  <i className="icon-chevron-down"></i>
                </div>
              </div>

              <div
                className="accordion__content"
                style={
                  LanActives.includes("country") ? { maxHeight: "300px" } : {}
                }
              >
                <div className="pt-15">
                  <div className="d-flex flex-column y-gap-15">
                    {city.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row ">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input type="checkbox" id={elm} name={elm} />
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
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("pricerange") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button mb-10 d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("pricerange")
                      ? [...pre.filter((elm) => elm != "pricerange")]
                      : [...pre, "pricerange"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {translate("Filter Price") }
                </h5>

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
                <div className="pt-15">
                  <RangeSlider />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("Distance") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button mb-10 d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("Distance")
                      ? [...pre.filter((elm) => elm != "Distance")]
                      : [...pre, "Distance"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {translate("Distance to Mosque") }
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
                <div className="pt-15">
                  <PriceRangeBar />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__item">
          <div className="accordion -simple-2 js-accordion">
            <div
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("duration") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("duration")
                      ? [...pre.filter((elm) => elm != "duration")]
                      : [...pre, "duration"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {translate("Hotel Star") }
                </h5>

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
                    {durations.map((elm, i) => (
                      <div key={i}>
                        <div className="d-flex items-center justify-between">
                          <div className="row ">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input type="checkbox" id={elm} name={elm} />
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
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("rating") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("rating")
                      ? [...pre.filter((elm) => elm != "rating")]
                      : [...pre, "rating"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {translate("Agent Rating") }
                </h5>

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
                    {rating.map((elm, i) => (
                      <div key={i} className="d-flex">
                        <div className="d-flex items-center justify-between">
                          <div className="row ">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input type="checkbox" id={elm} name={elm} />
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
                                <label
                                  htmlFor={elm}
                                  className="lh-16 ml-15 d-flex mx-1"
                                >
                                  <Stars star={elm} font={13} />
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
              className={`accordion__item js-accordion-item-active ${
                ddActives.includes("features") ? "is-active" : ""
              } `}
            >
              <div
                className="accordion__button d-flex items-center justify-between"
                onClick={() =>
                  setDdActives((pre) =>
                    pre.includes("features")
                      ? [...pre.filter((elm) => elm != "features")]
                      : [...pre, "features"]
                  )
                }
              >
                <h5 className="text-18 fw-500">
                  {translate("Amenities") }
                </h5>

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
                          <div className="row ">
                            <div className="col-12">
                              <div className="d-flex items-center pointer-check">
                                <div className="form-checkbox">
                                  <input type="checkbox" id={elm} name={elm} />
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
