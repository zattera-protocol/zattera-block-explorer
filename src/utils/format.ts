import type { SupportedLanguage } from '../types';

const localeMap: Record<SupportedLanguage, string> = {
  ko: 'ko-KR',
  ja: 'ja-JP',
  en: 'en-US',
};

export const formatTimestampWithLocale = (timestamp: string | null | undefined, language: SupportedLanguage = 'en'): string => {
  if (!timestamp) return 'N/A';

  const locale = localeMap[language] || language || 'en-US';
  return new Date(`${timestamp}Z`).toLocaleString(locale);
};

// Format large numbers with K, M, B suffixes
export const formatCompactNumber = (num: number | null | undefined): string => {
  if (typeof num !== 'number' || isNaN(num)) return String(num);

  const absNum = Math.abs(num);

  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }

  return num.toLocaleString();
};
