import { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const savedLocale = typeof window != 'undefined' ? localStorage.getItem("locale") : '';
    return savedLocale || "DE";
  });
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    localStorage.setItem("locale", locale);

    // Fetch the translation file for the current locale
    fetch(`/locales/${locale}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error fetching translations:", error));
  }, [locale]);

  const translate = (key) => translations[key] || key;

  return (
    <TranslationContext.Provider value={{ translate, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);