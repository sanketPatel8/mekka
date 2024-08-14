// contexts/GlobalStateContext.js
import { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [loginPer, setLoginPer] = useState(false);
  const [adultNumber, setAdultNumber] = useState(1);
  const [youthNumber, setYouthNumber] = useState(0);
  const [childrenNumber, setChildrenNumber] = useState(0);

  return (
    <GlobalStateContext.Provider
      value={{ loginPer, setLoginPer, adultNumber, setAdultNumber, youthNumber, setYouthNumber, childrenNumber, setChildrenNumber }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
