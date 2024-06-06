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

export default function Sidebar2() {
  const [ddActives, setDdActives] = useState(["tourtype"]);
  const [LanActives, setLanActives] = useState([]);
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
                      : [...pre, "tourtype"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Tour Type</h5>

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
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <Image
                                  width="10"
                                  height="8"
                                  src="/img/icons/check.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
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
            <h5 className="text-18 fw-500">Languages</h5>

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
                    <div className="d-flex items-center">
                      <div className="form-checkbox ">
                        <input type="checkbox" name="name" />
                        <div className="form-checkbox__mark">
                          <div className="form-checkbox__icon">
                            <Image
                              width="10"
                              height="8"
                              src="/img/icons/check.svg"
                              alt="icon"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="lh-11 ml-10">{elm}</div>
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
            <h5 className="text-18 fw-500">Departure</h5>

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
                    <div className="d-flex items-center">
                      <div className="form-checkbox ">
                        <input type="checkbox" name="name" />
                        <div className="form-checkbox__mark">
                          <div className="form-checkbox__icon">
                            <Image
                              width="10"
                              height="8"
                              src="/img/icons/check.svg"
                              alt="icon"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="lh-11 ml-10">{elm}</div>
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
                      : [...pre, "pricerange"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Filter Price</h5>

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
                      : [...pre, "Distance"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Distance to Mosque</h5>

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
                      : [...pre, "duration"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Hotel Star</h5>

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
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <Image
                                  width="10"
                                  height="8"
                                  src="/img/icons/check.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
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
                      : [...pre, "rating"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Agent Rating</h5>

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
                        <div className="form-checkbox">
                          <input type="checkbox" name="rating" />
                          <div className="form-checkbox__mark">
                            <div className="form-checkbox__icon">
                              <Image
                                width="10"
                                height="8"
                                src="/img/icons/check.svg"
                                alt="icon"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex x-gap-5 ml-10">
                          <Stars star={elm} font={13} />
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
                      : [...pre, "features"],
                  )
                }
              >
                <h5 className="text-18 fw-500">Amenities</h5>

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
                        <div className="d-flex items-center">
                          <div className="form-checkbox ">
                            <input type="checkbox" name="name" />
                            <div className="form-checkbox__mark">
                              <div className="form-checkbox__icon">
                                <Image
                                  width="10"
                                  height="8"
                                  src="/img/icons/check.svg"
                                  alt="icon"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="lh-11 ml-10">{elm}</div>
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
