import type { Locale } from '../config/site';
import { SITE_URL } from '../config/site';
import { getLocalizedPath } from '../lib/i18n';

export const getCorporateSitePath = (locale: Locale, pathname = '/') =>
  getLocalizedPath(locale, pathname);

export const getCorporateSiteUrl = (locale: Locale, pathname = '/') =>
  `${SITE_URL}${getCorporateSitePath(locale, pathname)}`;
