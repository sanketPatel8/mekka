"use client";

import React, { useEffect, useRef, useState } from "react";

export default function HeaderSerch({ white }) {
  const [selected, setSelected] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = selected;
  }, [selected]);
;

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
