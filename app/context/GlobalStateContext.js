// contexts/GlobalStateContext.js
import { createContext, useContext, useState } from "react";
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

  const [prices, setPrices] = useState({
    adultPrice: 0,
    youthPrice: 0,
    childrenPrice: 0,
  });

  // for rageslide

 
  const [Distance, setDistance] = useState([0, 500]);

  // fortourfilter data

  const [FilterData, setFilterData] = useState([]);

  // pACKAGEpAGE RADIO BUTTON

  const [HotelSelect, setHotelSelect] = useState({
    mekka: "",
    madina: "",
    mekkaPrice: 0,
    madinaPrice: 0,
    mekkaId: "", // Add mekkaId to the state
    madinaId: "", // Add madinaId to the state
  });
  
  const [FlightSelect, setFlightSelect] = useState("");
  const [selectDeparture, setselectDeparture] = useState("");

  // for package total maintain

  const [total, setTotal] = useState(0);

  // for packagedata share to booking-details page

  const [SharePackageData, setSharePackageData] = useState([]);


  // for hero7 run function


  // no flight booking logic package

  const [selectedCheckbox, setselectedCheckbox] = useState(false);
  const [ExcludeFlight, setExcludeFlight] = useState(0)

  return (
    <GlobalStateContext.Provider
      value={
        {
        loginPer,
        setLoginPer,
        adultNumber,
        setAdultNumber,
        youthNumber,
        setYouthNumber,
        childrenNumber,
        setChildrenNumber,
        location,
        setLocation,
        calender,
        setCalender,
        tourType,
        setTourType,
        dates,
        setDates,
        formattedDates,
        setFormattedDates,
        counts,
        setCounts,
        Distance,
        setDistance,
        FilterData,
        setFilterData,
        prices,
        setPrices,
        HotelSelect,
        setHotelSelect,
        FlightSelect,
        setFlightSelect,
        total,
        setTotal,
        selectDeparture,
        setselectDeparture,
        SharePackageData,
        setSharePackageData,
        selectedCheckbox,
        setselectedCheckbox,
        ExcludeFlight,
        setExcludeFlight
        
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
