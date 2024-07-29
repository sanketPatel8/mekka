import { useTranslations } from '@/app/context/TranslationContext';

export function useTranslation() {
  const { translations } = useTranslations();
  return (key) => translations[key] || key;
}
