export const SITE_NAME = 'FleetMole';
export const COMPANY_NAME = 'FleetMole Group';
export const DEFAULT_LOCALE = 'tr' as const;
export const SUPPORTED_LOCALES = ['tr', 'en'] as const;
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://fleetmole.com').replace(/\/$/, '');
export const DEFAULT_THEME_COLOR = '#203A74';

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const isLocale = (value?: string): value is Locale =>
  Boolean(value) && SUPPORTED_LOCALES.includes(value as Locale);
