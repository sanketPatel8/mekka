"use client";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { ThemeProvider } from "@mui/material/styles";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EB662B", // Change this color to your desired primary color
    },
    secondary: {
      main: "#f50057", // Change this color to your desired secondary color
    },
  },
});

export default function PriceRangeBar() {
  const [value, setValue] = useState([0, 500]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="js-price-rangeSlider" style={{ padding: "20px 15px" }}>
        <div className="px-5">
          <ThemeProvider theme={theme}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              max={1500}
              min={100}
              disableSwap
            />
          </ThemeProvider>
        </div>

        <div className="d-flex justify-between mt-20">
          <div className="">
            <span className="">Range: </span>
            <span className="fw-500 js-lower">{value[0]} m</span>
            <span> - </span>
            <span className="fw-500 js-upper">{value[1]} m</span>
          </div>
        </div>
      </div>
    </>
  );
}
