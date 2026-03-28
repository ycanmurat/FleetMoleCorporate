import type { Locale } from '../config/site';

const CORPORATE_SITE_URL = (
  import.meta.env.VITE_CORPORATE_SITE_URL ??
  (import.meta.env.DEV ? 'http://localhost:5173' : 'https://fleetmole.com')
).replace(/\/+$/, '');

export const getCorporateSiteUrl = (locale: Locale, pathname = '/') => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const trimmedPath = normalizedPath === '/' ? '' : normalizedPath.replace(/\/+$/, '');
  return `${CORPORATE_SITE_URL}/${locale}${trimmedPath}`;
};
