"use client";
import { useState , useEffect } from "react";
import Slider from "@mui/material/Slider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

export default function RangeSlider({ value, setValue, FliterData, FilterPrice, setFilterPrice }) {
  const { formatPrice } = useCurrency();
  const maxPrice = Number(FliterData.max_price);
  const minPrice = Number(FliterData.min_price);
  const [displayValue, setDisplayValue] = useState([0 , 0]);

  


  useEffect(() => {
    // Update the displayValue if maxPrice or minPrice changes
    setDisplayValue([minPrice, maxPrice]);
  }, [maxPrice, minPrice]);

  const handleChange = (event, newValue) => {
    setDisplayValue(newValue);
  };

  const handleChangeCommitted = (event, newValue) => {
    setFilterPrice(newValue);
  };

  
  

  const { translate } = useTranslation();


  

  return (
    <>
      <div className="js-price-rangeSlider" style={{ padding: "40px 15px" }}>
        <div className="px-5">
          <ThemeProvider theme={theme}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={displayValue}
              onChange={handleChange}
              onChangeCommitted={handleChangeCommitted}
              valueLabelDisplay="auto"
              max={maxPrice}
              min={minPrice}
              disableSwap
            />
          </ThemeProvider>
        </div>

        <div className="d-flex justify-between mt-20">
          <div className="">
            <span className="">{translate("Price")}: </span>
            <span className="fw-500 js-lower">{formatPrice(displayValue[0])}</span>
            <span> - </span>
            <span className="fw-500 js-upper">{formatPrice(displayValue[1])}</span>
          </div>
        </div>
      </div>
    </>
  );
}
