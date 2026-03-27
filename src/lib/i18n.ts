import { DEFAULT_LOCALE, type Locale, SITE_URL, isLocale } from '../config/site';

export const getLocaleFromPath = (pathname: string): Locale => {
  const [, maybeLocale] = pathname.split('/');
  return isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
};

export const stripLocaleFromPath = (pathname: string): string => {
  const normalized = pathname === '/' ? pathname : pathname.replace(/\/+$/, '');
  const stripped = normalized.replace(/^\/(tr|en)(?=\/|$)/, '');
  return stripped || '/';
};

export const getLocalizedPath = (locale: Locale, pathname = '/'): string => {
  const stripped = stripLocaleFromPath(pathname);
  return stripped === '/' ? `/${locale}` : `/${locale}${stripped}`;
};

export const switchLocalePath = (
  pathname: string,
  locale: Locale,
  search = '',
  hash = '',
): string => `${getLocalizedPath(locale, pathname)}${search}${hash}`;

export const toAbsoluteUrl = (pathname: string): string => {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
};
