"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function HeaderSerch({ white }) {
  const [selected, setSelected] = useState("");
  const [ddActive, setDdActive] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [showSearchbar, setShowSearchbar] = useState(false);

  const inputRef = useRef();
  const dropDownContainer = useRef();
  const searchResultsRef = useRef();

  useEffect(() => {
    inputRef.current.value = selected;
  }, [selected]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActive(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (selected.length > 0) {
      const fetchData = async () => {
        const sendData = {
          AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
          keyword: selected,
        };

        try {
          const response = await post("search_tour", sendData);
      
          setSearchData(response.Tour_List);
          setShowSearchbar(true);
          setDdActive(true);
        } catch (error) {
          console.error("Error caught:", error);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            showErrorToast(translate, "Please verify your email");
          } else {
            showErrorToast(translate, "An error occurred during registration");
          }
        }
      };

      fetchData();
    } else {
      setShowSearchbar(false);
      setDdActive(false);
    }
  }, [selected]);

  const {translate} = useTranslation()

  return (
    <>
      <div
        ref={dropDownContainer}
        className="header__search js-liverSearch js-form-dd"
      >
        <i className="icon-search text-18"></i>
        <input
          onChange={(e) => {
            setSelected(e.target.value);
            if (e.target.value.length > 0) {
              setDdActive(true); // Activate dropdown if text length is greater than 0
            } else {
              setDdActive(false); // Hide dropdown if text length is 0
            }
          }}
          ref={inputRef}
          type="text"
          placeholder={translate("Search Packages")}
          className={`js-search tab-font-12 ${white ? "text-white" : ""}`}
        />

        <div
          ref={searchResultsRef}
          className={
            ddActive ? "headerSearchRecent is-active" : "headerSearchRecent"
          }
          data-x="headerSearch"
        >
          <div
            className={`headerSearchRecent__container ${
              showSearchbar === false ? "d-none" : "d-block"
            }`}
          >
            <div className="headerSearchRecent__title">
              <h4 className="text-18 fw-500">Search Packages</h4>
            </div>

            <div className={`headerSearchRecent__list js-results `}>
              {SearchData.slice(0, 10).map((elm, i) => (
                <Link href={`/package/${elm?.slug}?id=${elm?.id}&name=${elm?.slug}`} key={i}>
                  <button
                    className="headerSearchRecent__item js-search-option"
                    data-x-click="headerSearch"
                  >
                    <div className="ml-10">
                      <div className="fw-500 js-search-option-target">
                        {elm.name}
                      </div>
                      <div className="lh-14 text-14 text-light-2">
                        {elm.type}
                      </div>
                    </div>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
