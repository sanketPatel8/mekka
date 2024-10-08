import { createContext, useContext, useState, useEffect } from "react";
import { POST } from "../utils/api/post";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const savedCurrency  = typeof window != 'undefined' ? localStorage.getItem("currency") : '';
    return savedCurrency  || "Euro";
  });
  const [currencyUSD, setCurrencyUSD] = useState(0);
  const [currencyEUR, setCurrencyEUR] = useState(0);
  useEffect(() => {
    localStorage.setItem("currency", currency);

    fetchCurrencyDetails();
  }, [currency]);


  const fetchCurrencyDetails = async() => {
    const response = await POST.request({url:"currecyDetails"});
    console.log(response, "response");
    if(response){
        setCurrencyUSD(response.Currency?.USD);
        setCurrencyEUR(response.Currency?.EUR);
    }
  }

  const formatPrice = (price) => {
    if (currency === "EURO") {
      const eurAmount = price / currencyEUR;
      return new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
      }).format(eurAmount);
    } else if (currency === "USD") {
  
      const usdAmount = price * currencyUSD;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(usdAmount);


    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency,formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);