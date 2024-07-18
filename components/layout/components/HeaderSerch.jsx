"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function HeaderSerch({ white }) {
  const [selected, setSelected] = useState("");
  const [ddActive, setDdActive] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.value = selected;
  }, [selected]);

  const searchData = [
    {
      id: 1, // Unique ID
      iconClass: "icon-pin text-20",
      title: "Alle",
      location: "Saudi Arabia",
    },
    {
      id: 2, // Unique ID
      iconClass: "icon-pin text-20",
      title: "hajj",
      location: "Saudi Arabia",
    },
    {
      id: 3, // Unique ID
      iconClass: "icon-pin text-20",
      title: "umrah",
      location: "Saudi Arabia",
    },
    {
      id: 7, // Unique ID
      img: `/img/misc/icon.png`,
      title: "cultural-trips",
      location: "Saudi Arabia",
    },
    // {
    //   id: 4, // Unique ID
    //   iconClass: "icon-pin text-20",
    //   title: "Istanbul",
    //   location: "Turkey",
    // },
    // {
    //   id: 5, // Unique ID
    //   iconClass: "icon-pin text-20",
    //   title: "Berlin",
    //   location: "Germany, Europe",
    // },
    // {
    //   id: 6, // Unique ID
    //   iconClass: "icon-pin text-20",
    //   title: "London",
    //   location: "England, Europe",
    // },
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
  return (
    <>
      <div
        ref={dropDownContainer}
        className="header__search js-liverSearch js-form-dd"
        style={{width : "220px"}}
      >
        <i className="icon-search text-18"></i>
        <input
          onChange={(e) => setSelected(e.target.value)}
          ref={inputRef}
          onClick={() => setDdActive((pre) => !pre)}
          type="text"
          placeholder="Search Latest Package"
          className={`js-search ${white ? "text-white" : ""}`}
        />
{/* 
        <div
          className={
            ddActive ? "headerSearchRecent is-active" : "headerSearchRecent"
          }
          data-x="headerSearch"
        >
          <div className="headerSearchRecent__container">
            <div className="headerSearchRecent__title">
              <h4 className="text-18 fw-500">Recent Searches</h4>
            </div>

            <div className="headerSearchRecent__list js-results">
              {searchData
                .filter((elm) => elm.title.includes(selected))
                .map((elm, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelected(elm.title);
                      setDdActive(false);
                    }}
                    className="headerSearchRecent__item js-search-option"
                    data-x-click="headerSearch"
                  >
                    <div className="size-50 bg-white rounded-12 border-1 flex-center">
                      {elm.iconClass && <i className={elm.iconClass}></i>}
                      {elm.img && (
                        <Image
                          width={50}
                          height={50}
                          src={elm.img}
                          alt="image"
                          className="rounded-12"
                        />
                      )}
                    </div>
                    <div className="ml-10">
                      <div className="fw-500 js-search-option-target">
                        {elm.title}
                      </div>
                      <div className="lh-14 text-14 text-light-2">
                        {elm.location}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
