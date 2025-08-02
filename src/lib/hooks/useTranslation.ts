'use client'
import { Translations } from '@/types/translation';
import { useParams } from 'next/navigation';

const translations: Record<string, Translations> = {
  en: require('@/locales/en/common.json'),
  fr: require('@/locales/fr/common.json'),
};

export const useTranslation = (): Translations => {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return translations[locale] || translations.en;
};