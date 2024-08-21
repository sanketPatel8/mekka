"use client";

import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function HeaderSerch({ white }) {
  const [selected, setSelected] = useState("");
  const [ddActive, setDdActive] = useState(false);
  const [SearchData, setSearchData] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = selected;
  }, [selected]);

  const searchData = [
    {
      id: 1, // Unique ID
      iconClass: "icon-pin text-20",
      title: "Phuket",
      location: "Thailand, Asia",
    },
    {
      id: 2, // Unique ID
      iconClass: "icon-price-tag text-20",
      title: "London Day Trips",
      location: "England",
    },
    {
      id: 3, // Unique ID
      iconClass: "icon-flag text-20",
      title: "Europe",
      location: "Country",
    },
    {
      id: 7, // Unique ID
      img: `/img/misc/icon.png`,
      title: "Centipede Tour - Guided Arizona Desert Tour by ATV",
      location: "Country",
    },
    {
      id: 4, // Unique ID
      iconClass: "icon-pin text-20",
      title: "Istanbul",
      location: "Turkey",
    },
    {
      id: 5, // Unique ID
      iconClass: "icon-pin text-20",
      title: "Berlin",
      location: "Germany, Europe",
    },
    {
      id: 6, // Unique ID
      iconClass: "icon-pin text-20",
      title: "London",
      location: "England, Europe",
    },
  ];
  const dropDownContainer = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActive("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        keyword: selected,
      };

      try {
        const response = await post("search_tour", sendData);
        console.log("search responese was : ", SearchData);
        setSearchData(response.Tour_List);
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
  }, [selected]);

  return (
    <>
      <div
        ref={dropDownContainer}
        className="header__search js-liverSearch js-form-dd"
      >
        <i className="icon-search text-18"></i>
        <input
          onChange={(e) => setSelected(e.target.value)}
          ref={inputRef}
          onClick={() => setDdActive((pre) => !pre)}
          type="text"
          placeholder="Search destinations or activities"
          className={`js-search ${white ? "text-white" : ""}`}
        />

        <div
          className={
            ddActive ? "headerSearchRecent is-active" : "headerSearchRecent"
          }
          data-x="headerSearch"
        >
          <div className="headerSearchRecent__container">
            <div className="headerSearchRecent__title">
              <h4 className="text-18 fw-500">Search Your Destination</h4>
            </div>

            <div className="headerSearchRecent__list js-results">
              {SearchData.map((elm, i) => (
                <Link href={`/package/${elm?.slug}?id=${elm?.id}`} key={i}>
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
