"use client";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { useTranslation } from "@/app/context/TranslationContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DAC04F", // Change this color to your desired primary color
    },
    secondary: {
      main: "#DAC04F", // Change this color to your desired secondary color
    },
  },
});

export default function PriceRangeBar({ Distance, setDistance , FliterData }) {
  // const {Distance, setDistance} = useGlobalState()

  const handleChange = (event, newValue) => {
    console.log("newValue" , newValue); 
    
    setDistance(newValue);
  };

  const {translate} = useTranslation();

  return (
    <>
      <div className="js-price-rangeSlider" style={{ padding: "40px 15px" }}>
        <div className="px-5">
          <ThemeProvider theme={theme}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={Distance}
              onChange={handleChange}
              valueLabelDisplay="auto"
              max={FliterData?.max_km}
              min={FliterData?.min_km}
              disableSwap
            />
          </ThemeProvider>
        </div>

        <div className="d-flex justify-between mt-20">
          <div className="">
            <span className="">{translate('Range')}: </span>
            <span className="fw-500 js-lower">{Distance[0]} m</span>
            <span> - </span>
            <span className="fw-500 js-upper">{Distance[1]} m</span>
          </div>
        </div>
      </div>
    </>
  );
}
