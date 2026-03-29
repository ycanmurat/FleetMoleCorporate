import type { ProductSlug } from '../data/products';
import type { Locale } from './site';
import { SITE_URL } from './site';

const normalizePathname = (pathname = '/') => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalizedPath === '/' ? '' : normalizedPath.replace(/\/+$/, '');
};

export const getProductSitePath = (
  productSlug: ProductSlug,
  locale: Locale,
  pathname = '/',
) => `/${locale}/${productSlug}${normalizePathname(pathname)}`;

export const getProductSiteUrl = (productSlug: ProductSlug, locale: Locale, pathname = '/') =>
  `${SITE_URL}${getProductSitePath(productSlug, locale, pathname)}`;

export const getProductFaviconPath = (productSlug: ProductSlug) =>
  `/fleetmole-ikonlar/${productSlug}.png`;
