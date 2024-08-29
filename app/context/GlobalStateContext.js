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

  const [value, setValue] = useState([200, 60000]);
  const [Distance, setDistance] = useState([0, 500]);

  // fortourfilter data

  const [FilterData, setFilterData] = useState([]);

  // pACKAGEpAGE RADIO BUTTON

  const [HotelSelect, setHotelSelect] = useState({
    mekka: "",
    madina: "",
    mekkaPrice: 0,
    madinaPrice: 0,
  });
  const [FlightSelect, setFlightSelect] = useState("");
  const [selectDeparture, setselectDeparture] = useState("");

  // for package total maintain

  const [total, setTotal] = useState(0);

  // for packagedata share to booking-details page

  const [SharePackageData, setSharePackageData] = useState([]);

  // for demo  tourlist filter data

  // main state of all data

  const [TourData, setTourData] = useState([]);

  const [selectedTourTypes, setSelectedTourTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);

  const handleSelectionChange = (selection, setter) => {
    setter((prevSelections) =>
      prevSelections.includes(selection)
        ? prevSelections.filter((item) => item !== selection)
        : [...prevSelections, selection]
    );
  };

  return (
    <GlobalStateContext.Provider
      value={{
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
        value,
        setValue,
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
        selectedTourTypes,
        setSelectedTourTypes: (selection) =>
          handleSelectionChange(selection, setSelectedTourTypes),
        selectedLanguages,
        setSelectedLanguages: (selection) =>
          handleSelectionChange(selection, setSelectedLanguages),
        selectedCities,
        setSelectedCities: (selection) =>
          handleSelectionChange(selection, setSelectedCities),
        selectedRatings,
        setSelectedRatings: (selection) =>
          handleSelectionChange(selection, setSelectedRatings),
        selectedFeatures,
        setSelectedFeatures: (selection) =>
          handleSelectionChange(selection, setSelectedFeatures),
        selectedDurations,
        setSelectedDurations: (selection) =>
          handleSelectionChange(selection, setSelectedDurations),
        TourData,
        setTourData,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
