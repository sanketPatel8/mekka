// @/app/context/TranslationContext.js
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadTranslations } from '@/app/ilb/i18n';

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [translations, setTranslations] = useState({});
  const [locale, setLocale] = useState('en'); // Default locale

  useEffect(() => {
    async function fetchTranslations() {
      console.log('Fetching translations for locale:', locale);
      const translations = await loadTranslations(locale);
      console.log('Translations fetched:', translations);
      setTranslations(translations);
    }

    fetchTranslations();
  }, [locale]);

  return (
    <TranslationContext.Provider value={{ translations, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  return useContext(TranslationContext);
}
