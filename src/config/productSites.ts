import type { ProductSlug } from '../data/products';
import type { Locale } from './site';
import { SITE_URL } from './site';

export type ProductSitePathMode = 'embedded' | 'standalone';

const normalizePathname = (pathname = '/') => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalizedPath === '/' ? '' : normalizedPath.replace(/\/+$/, '');
};

export const getProductSitePath = (
  productSlug: ProductSlug,
  locale: Locale,
  pathname = '/',
  mode: ProductSitePathMode = 'embedded',
) => {
  const basePath = mode === 'standalone' ? `/${locale}` : `/${locale}/${productSlug}`;
  return `${basePath}${normalizePathname(pathname)}`;
};

export const getProductSiteUrl = (
  productSlug: ProductSlug,
  locale: Locale,
  pathname = '/',
  mode: ProductSitePathMode = 'embedded',
) => `${SITE_URL}${getProductSitePath(productSlug, locale, pathname, mode)}`;

export const getProductFaviconPath = (productSlug: ProductSlug) =>
  `/fleetmole-ikonlar/${productSlug}.png`;
