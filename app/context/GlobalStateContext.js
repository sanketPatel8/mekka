// contexts/GlobalStateContext.js
import { createContext, useContext, useState } from 'react';
import { DateObject } from "react-multi-date-picker";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [loginPer, setLoginPer] = useState(false);
  const [adultNumber, setAdultNumber] = useState(1);
  const [youthNumber, setYouthNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);

   // for hero 7 

  const [location, setLocation] = useState("");
  const [calender, setCalender] = useState("");
  const [tourType, setTourType] = useState("");
  const [formattedDates, setFormattedDates] = useState([]);
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);
  const [counts, setCounts] = useState({
    Adult: 1,
    child: 0,
    baby: 0,
  });

  

  return (
    <GlobalStateContext.Provider
      value={{ loginPer, setLoginPer, adultNumber, setAdultNumber, youthNumber, setYouthNumber, childrenNumber, setChildrenNumber , location , setLocation , calender , setCalender , tourType , setTourType , dates , setDates , formattedDates , setFormattedDates , counts , setCounts}}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
