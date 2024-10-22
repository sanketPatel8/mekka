"use client";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";
import { useGlobalState } from "@/app/context/GlobalStateContext";
import { useCurrency } from "@/app/context/currencyContext";
import { useTranslation } from "@/app/context/TranslationContext";

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

export default function RangeSlider({ value, setValue , FliterData }) {
  const {formatPrice} = useCurrency();

   // Convert min_price and max_price to numbers
   const maxPrice = Number(FliterData.max_price);
   const minPrice = Number(FliterData.min_price);

  const handleChange = (event, newValue) => { 
    setValue(newValue);
  };

  const {translate} = useTranslation()
  
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
             max={maxPrice}  
              min={minPrice} 
              disableSwap
            />
          </ThemeProvider>
        </div>

        <div className="d-flex justify-between mt-20">  
          <div className="">
            <span className="">{translate('Price')}: </span>
            <span className="fw-500 js-lower">{formatPrice(value[0])}</span>
            <span> - </span>
            <span className="fw-500 js-upper">{formatPrice(value[1])}</span>
          </div>
        </div>
      </div>
    </>
  );
}
