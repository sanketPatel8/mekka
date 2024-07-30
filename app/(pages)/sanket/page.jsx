"use client";

import { useEffect, useState } from "react";

const fetchTranslations = async (locale) => {
  try {
    const res = await fetch(`/locales/${locale}.json`);
    if (!res.ok)
      throw new Error(`Failed to fetch translations: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(error);
    return {}; // Return an empty object in case of an error
  }
};

const TranslationComponent = () => {
  const [translations, setTranslations] = useState({});
  const [locale, setLocale] = useState("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTranslations(locale)
      .then((data) => {
        setTranslations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching translations:", error);
        setLoading(false);
      });
  }, [locale]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <h1>{translations.welcome || "Welcome"}</h1>
      )}
      <button onClick={() => setLocale("en")} className="mx-3">
        English
      </button>
      <button onClick={() => setLocale("de")}>German</button>
    </div>
  );
};

export default TranslationComponent;
