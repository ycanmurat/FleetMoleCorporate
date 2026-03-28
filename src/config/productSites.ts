import type { ProductSlug } from '../data/products';
import type { Locale } from './site';

const PRODUCT_SITE_PORTS: Record<ProductSlug, number> = {
  manager: 4101,
  rent: 4102,
  tracker: 4103,
  trader: 4104,
  partner: 4105,
  tyre: 4106,
  smart: 4107,
};

const PRODUCT_SITE_ENV_URLS: Record<ProductSlug, string | undefined> = {
  manager: import.meta.env.VITE_MANAGER_SITE_URL,
  rent: import.meta.env.VITE_RENT_SITE_URL,
  tracker: import.meta.env.VITE_TRACKER_SITE_URL,
  trader: import.meta.env.VITE_TRADER_SITE_URL,
  partner: import.meta.env.VITE_PARTNER_SITE_URL,
  tyre: import.meta.env.VITE_TYRE_SITE_URL,
  smart: import.meta.env.VITE_SMART_SITE_URL,
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const getDefaultOrigin = (productSlug: ProductSlug) =>
  import.meta.env.DEV
    ? `http://localhost:${PRODUCT_SITE_PORTS[productSlug]}`
    : `https://${productSlug}.fleetmole.com`;

export const PRODUCT_SITE_ORIGINS = Object.fromEntries(
  Object.entries(PRODUCT_SITE_ENV_URLS).map(([slug, value]) => [
    slug,
    trimTrailingSlash(value ?? getDefaultOrigin(slug as ProductSlug)),
  ]),
) as Record<ProductSlug, string>;

export const getProductSitePath = (locale: Locale, pathname = '/') => {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const cleanedPath = normalizedPath === '/' ? '' : normalizedPath.replace(/\/+$/, '');
  return `/${locale}${cleanedPath}`;
};

export const getProductSiteUrl = (productSlug: ProductSlug, locale: Locale, pathname = '/') =>
  `${PRODUCT_SITE_ORIGINS[productSlug]}${getProductSitePath(locale, pathname)}`;
