/**
 * Locale, Region, and Currency Types and Definitions
 *
 * Implements strict separation between:
 * - interfaceLocale (e.g. en-IN, en-US, ar-AE, ta-IN, hi-IN)
 * - region (e.g. IN, US, GB, DE, FR, ES, PL, AU, KW, BH, JO, AE)
 * - displayCurrency (ISO 4217, e.g. INR, USD, GBP, EUR, AUD, PLN, KWD, BHD, JOD, AED)
 */

export type SupportedLocale =
  | 'en-IN'
  | 'en-US'
  | 'en-GB'
  | 'en-AU'
  | 'ta-IN'
  | 'hi-IN'
  | 'mr-IN'
  | 'te-IN'
  | 'de-DE'
  | 'fr-FR'
  | 'es-ES'
  | 'pl-PL'
  | 'ar-KW'
  | 'ar-BH'
  | 'ar-JO'
  | 'ar-AE';

export type SupportedRegion =
  | 'IN'
  | 'US'
  | 'GB'
  | 'AU'
  | 'DE'
  | 'FR'
  | 'ES'
  | 'PL'
  | 'KW'
  | 'BH'
  | 'JO'
  | 'AE';

export type SupportedCurrency =
  | 'INR'
  | 'USD'
  | 'GBP'
  | 'EUR'
  | 'AUD'
  | 'PLN'
  | 'KWD'
  | 'BHD'
  | 'JOD'
  | 'AED';

export interface LocaleInfo {
  code: SupportedLocale;
  languageCode: string; // e.g. 'en', 'ar', 'ta'
  name: string; // native display name
  region: SupportedRegion;
  defaultCurrency: SupportedCurrency;
  isRtl?: boolean;
}

export interface RegionInfo {
  code: SupportedRegion;
  name: string;
  defaultCurrency: SupportedCurrency;
  flag: string;
  nationalCurrency?: SupportedCurrency;
  currencyNote?: string;
}

export interface CurrencyInfo {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  minorUnits: number; // ISO 4217 decimal digits (e.g. 3 for KWD, BHD, JOD; 2 for USD, EUR, INR)
}

export const LOCALES: Record<SupportedLocale, LocaleInfo> = {
  'en-IN': { code: 'en-IN', languageCode: 'en', name: 'English (India)', region: 'IN', defaultCurrency: 'INR' },
  'en-US': { code: 'en-US', languageCode: 'en', name: 'English (United States)', region: 'US', defaultCurrency: 'USD' },
  'en-GB': { code: 'en-GB', languageCode: 'en', name: 'English (United Kingdom)', region: 'GB', defaultCurrency: 'GBP' },
  'en-AU': { code: 'en-AU', languageCode: 'en', name: 'English (Australia)', region: 'AU', defaultCurrency: 'AUD' },
  'ta-IN': { code: 'ta-IN', languageCode: 'ta', name: 'தமிழ் (இந்தியா)', region: 'IN', defaultCurrency: 'INR' },
  'hi-IN': { code: 'hi-IN', languageCode: 'hi', name: 'हिन्दी (भारत)', region: 'IN', defaultCurrency: 'INR' },
  'mr-IN': { code: 'mr-IN', languageCode: 'mr', name: 'मराठी (भारत)', region: 'IN', defaultCurrency: 'INR' },
  'te-IN': { code: 'te-IN', languageCode: 'te', name: 'తెలుగు (భారతదేశం)', region: 'IN', defaultCurrency: 'INR' },
  'de-DE': { code: 'de-DE', languageCode: 'de', name: 'Deutsch (Deutschland)', region: 'DE', defaultCurrency: 'EUR' },
  'fr-FR': { code: 'fr-FR', languageCode: 'fr', name: 'Français (France)', region: 'FR', defaultCurrency: 'EUR' },
  'es-ES': { code: 'es-ES', languageCode: 'es', name: 'Español (España)', region: 'ES', defaultCurrency: 'EUR' },
  'pl-PL': { code: 'pl-PL', languageCode: 'pl', name: 'Polski (Polska)', region: 'PL', defaultCurrency: 'EUR' },
  'ar-KW': { code: 'ar-KW', languageCode: 'ar', name: 'العربية (الكويت)', region: 'KW', defaultCurrency: 'KWD', isRtl: true },
  'ar-BH': { code: 'ar-BH', languageCode: 'ar', name: 'العربية (البحرين)', region: 'BH', defaultCurrency: 'BHD', isRtl: true },
  'ar-JO': { code: 'ar-JO', languageCode: 'ar', name: 'العربية (الأردن)', region: 'JO', defaultCurrency: 'JOD', isRtl: true },
  'ar-AE': { code: 'ar-AE', languageCode: 'ar', name: 'العربية (الإمارات)', region: 'AE', defaultCurrency: 'AED', isRtl: true },
};

export const REGIONS: Record<SupportedRegion, RegionInfo> = {
  IN: { code: 'IN', name: 'India', defaultCurrency: 'INR', flag: '🇮🇳' },
  US: { code: 'US', name: 'United States', defaultCurrency: 'USD', flag: '🇺🇸' },
  GB: { code: 'GB', name: 'United Kingdom', defaultCurrency: 'GBP', flag: '🇬🇧' },
  AU: { code: 'AU', name: 'Australia', defaultCurrency: 'AUD', flag: '🇦🇺' },
  DE: { code: 'DE', name: 'Germany', defaultCurrency: 'EUR', flag: '🇩🇪' },
  FR: { code: 'FR', name: 'France', defaultCurrency: 'EUR', flag: '🇫🇷' },
  ES: { code: 'ES', name: 'Spain', defaultCurrency: 'EUR', flag: '🇪🇸' },
  PL: {
    code: 'PL',
    name: 'Poland',
    defaultCurrency: 'EUR', // European display mode
    nationalCurrency: 'PLN', // Official national currency
    currencyNote: 'Defaults to EUR under European display mode. Official national currency is Polish Złoty (PLN).',
    flag: '🇵🇱'
  },
  KW: { code: 'KW', name: 'Kuwait', defaultCurrency: 'KWD', flag: '🇰🇼' },
  BH: { code: 'BH', name: 'Bahrain', defaultCurrency: 'BHD', flag: '🇧🇭' },
  JO: { code: 'JO', name: 'Jordan', defaultCurrency: 'JOD', flag: '🇯🇴' },
  AE: { code: 'AE', name: 'United Arab Emirates', defaultCurrency: 'AED', flag: '🇦🇪' },
};

export const CURRENCIES: Record<SupportedCurrency, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', minorUnits: 2 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', minorUnits: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', minorUnits: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', minorUnits: 2 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', minorUnits: 2 },
  PLN: { code: 'PLN', symbol: 'zł', name: 'Polish Złoty', minorUnits: 2 },
  KWD: { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', minorUnits: 3 },
  BHD: { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar', minorUnits: 3 },
  JOD: { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar', minorUnits: 3 },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', minorUnits: 2 },
};

export interface UserPreferences {
  interfaceLocale: SupportedLocale;
  region: SupportedRegion;
  marketCountry?: SupportedRegion;
  marketCity?: string;
  displayCurrency: SupportedCurrency;
  currencyPreferenceSource: 'explicit' | 'user_profile' | 'guest_local' | 'inferred' | 'default';
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  interfaceLocale: 'en-IN',
  region: 'IN',
  marketCountry: 'IN',
  marketCity: 'All',
  displayCurrency: 'INR',
  currencyPreferenceSource: 'default',
};
