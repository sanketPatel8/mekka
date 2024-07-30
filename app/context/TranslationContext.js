"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Fetch the translation file for the current locale
    fetch(`/locales/${locale}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data)); // No array indexing needed
  }, [locale]);

  const translate = (key) => translations[key] || key;

  return (
    <TranslationContext.Provider value={{ translate, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
