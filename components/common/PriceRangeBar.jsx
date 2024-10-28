"use client";
import { useEffect, useState } from "react";
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

export default function PriceRangeBar({ Distance, FilterDistance , setDistance , FliterData , setFilterDistance }) {
  // const {Distance, setDistance} = useGlobalState()

  const max_dist = Number(FliterData.max_km);
  const min_dist = Number(FliterData.min_km);

  const handleChange = (event, newValue) => {
    
    setFilterDistance(newValue);
    setDisplayValue(newValue)

  };

  const [displayValue, setDisplayValue] = useState([0 , 0]);

  useEffect(() => {
    setDisplayValue([min_dist , max_dist ])
  }, [max_dist , min_dist])
  

  const {translate} = useTranslation();

  console.log(displayValue , "displayValue");
  

  return (
    <>
      <div className="js-price-rangeSlider" style={{ padding: "40px 15px" }}>
        <div className="px-5">
          <ThemeProvider theme={theme}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={displayValue}
              onChange={handleChange}
              valueLabelDisplay="auto"
              max={max_dist}
              min={min_dist}
              disableSwap
            />
          </ThemeProvider>
        </div>

        <div className="d-flex justify-between mt-20">
          <div className="">
            <span className="">{translate('Range')}: </span>
            <span className="fw-500 js-lower">{displayValue[0]} m</span>
            <span> - </span>
            <span className="fw-500 js-upper">{displayValue[1]} m</span>
          </div>
        </div>
      </div>
    </>
  );
}
