export async function loadTranslations(locale) {
  const res = await fetch(`/locales/${locale}.json`);
  const translations = await res.json();
  return translations;
}
