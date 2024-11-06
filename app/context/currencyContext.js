import { createContext, useContext, useState, useEffect } from "react";
import { POST } from "../utils/api/post";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const savedCurrency = typeof window != 'undefined' ? localStorage.getItem("currency") : '';
    return savedCurrency || "EURO";
  });
  const [currencyUSD, setCurrencyUSD] = useState(0);
  const [currencyEUR, setCurrencyEUR] = useState(0);
  useEffect(() => {
    localStorage.setItem("currency", currency);

    fetchCurrencyDetails();
  }, [currency]);


  const fetchCurrencyDetails = async () => {
    const response = await POST.request({ url: "currecyDetails" });
    if (response) {
      setCurrencyUSD(response.Currency?.USD);
      setCurrencyEUR(response.Currency?.EUR);
    }
  }

  const formatPrice = (price) => {
    // console.log("price" , price);

    if (currency === "EURO") {
      console.log("price", price);
      console.log("currencyEUR", currencyEUR);

      const eurAmount = price / currencyEUR;

      console.log("eurAmount", eurAmount);

      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(eurAmount);
    } else if (currency === "USD") {

      const usdAmount = price * currencyUSD;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(usdAmount);


    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);