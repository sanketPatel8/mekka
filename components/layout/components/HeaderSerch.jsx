"use client";

import { showErrorToast } from "@/app/utils/tost";
import React, { useEffect, useRef, useState } from "react";
import { post } from "@/app/utils/api";

export default function HeaderSerch({ white }) {
  const [selected, setSelected] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = selected;
    const fetchData = async (id) => {
   
    
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        keyword: selected // Passing the id to sendData
      };
  
      try {
        const response = await post("search_tour", sendData);
        if (response) {
          // console.log("api response : " , response);
        } else {
          console.error("Tours data is undefined in the response.");
        }
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
    fetchData()
  }, [selected]);

  
  

  const dropDownContainer = useRef();

  
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
        
          type="text"
          placeholder="Search Latest Package"
          className={`js-search ${white ? "text-white" : ""}`}
        />

      </div>
    </>
  );
}
