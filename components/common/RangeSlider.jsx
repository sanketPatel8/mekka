"use client";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { useCurrency } from "@/app/context/currencyContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DAC04F",
    },
    secondary: {
      main: "#DAC04F",
    },
  },
});

export default function RangeSlider({ value, setValue }) {
  // const {value , setValue} = useGlobalState()
  const {formatPrice} = useCurrency();
  const handleChange = (event, newValue) => { 
    setValue(newValue);
  };
  return (
    <>
      <div className="js-price-rangeSlider" style={{ padding: "40px 15px" }}>
        <div className="px-5">
          <ThemeProvider theme={theme}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              max={100000}
              min={0}
              disableSwap
            />
          </ThemeProvider>
        </div>

        <div className="d-flex justify-between mt-20">
          <div className="">
            <span className="">Price: </span>
            <span className="fw-500 js-lower">{formatPrice(value[0])}</span>
            <span> - </span>
            <span className="fw-500 js-upper">{formatPrice(value[1])}</span>
          </div>
        </div>
      </div>
    </>
  );
}
