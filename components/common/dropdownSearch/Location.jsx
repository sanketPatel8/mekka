"use client";
import React from "react";
import { locations } from "@/data/searchDDLocations";
import { useTranslation } from "@/app/context/TranslationContext";

export default function Demo1({ active, setLocation , Tours }) {

  const { translate } = useTranslation();
  return (
    <div
      className={`searchFormItemDropdown -location ${
        active ? "is-active" : ""
      } `}
      data-x="location"
      data-x-toggle="is-active"
    >
      <div className="searchFormItemDropdown__container">
        <div className="searchFormItemDropdown__list sroll-bar-1">
          {Tours.map((elm, i) => (
            <div
              onClick={() =>
                setLocation((pre) => (pre == elm ? "" : elm))
              }
              key={i}
              className="searchFormItemDropdown__item"
            >
              <button className="js-select-control-button">
                <span className="js-select-control-choice">{translate(elm)}</span>
                {/* <span>{elm}</span> */}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
