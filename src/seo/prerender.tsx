import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { SeoRenderContext } from '../components/Seo/SeoRenderContext';
import { serializeSeoHead, type ResolvedSeoPayload } from '../components/Seo/seoUtils';
import { SITE_URL, SUPPORTED_LOCALES, type Locale } from '../config/site';
import { AppProvider } from '../context/AppContext';
import { CONTENT_SECTIONS } from '../data/navigation';
import { PRODUCTS, getProductBySlug, type ProductSlug } from '../data/products';
import { stripLocaleFromPath, toAbsoluteUrl } from '../lib/i18n';
import ProductSiteApp from '../product-sites/ProductSiteApp';
import { ProductSiteProvider } from '../product-sites/ProductSiteContext';
import { getProductSiteLegalPages } from '../product-sites/legalContent';
import { HARDWARE_PRODUCTS } from '../product-sites/productsData';
import { ProductSiteRuntimeProvider } from '../product-sites/ProductSiteRuntimeContext';

export interface PrerenderRoute {
  indexable: boolean;
  locale: Locale;
  path: string;
}

export interface PrerenderRenderResult {
  appHtml: string;
  headHtml: string;
  locale: Locale;
  seo: ResolvedSeoPayload;
}

const dedupeRoutes = (routes: PrerenderRoute[]) =>
  [...new Map(routes.map((route) => [route.path, route])).values()].sort((left, right) =>
    left.path.localeCompare(right.path),
  );

const getLocaleFromRoutePath = (path: string): Locale => {
  const [, maybeLocale] = path.split('/');
  return (SUPPORTED_LOCALES.find((locale) => locale === maybeLocale) ?? 'tr') as Locale;
};

const createSeoCollector = () => {
  let payload: ResolvedSeoPayload | null = null;

  return {
    get payload() {
      return payload;
    },
    set(nextPayload: ResolvedSeoPayload) {
      payload = nextPayload;
    },
  };
};

const renderWithSeo = (path: string, element: ReactElement): PrerenderRenderResult => {
  const locale = getLocaleFromRoutePath(path);
  const collector = createSeoCollector();
  const appHtml = renderToString(
    <MemoryRouter initialEntries={[path]}>
      <SeoRenderContext.Provider value={{ set: collector.set }}>
        <AppProvider>{element}</AppProvider>
      </SeoRenderContext.Provider>
    </MemoryRouter>,
  );

  if (!collector.payload) {
    throw new Error(`Missing SEO payload for route: ${path}`);
  }

  return {
    appHtml,
    headHtml: serializeSeoHead(collector.payload),
    locale,
    seo: collector.payload,
  };
};

export const renderCorporateRoute = (path: string) => renderWithSeo(path, <App />);

export const renderProductSiteRoute = (productSlug: ProductSlug, path: string) =>
  renderWithSeo(
    path,
    <ProductSiteRuntimeProvider mode="standalone">
      <ProductSiteProvider productSlug={productSlug}>
        <ProductSiteApp />
      </ProductSiteProvider>
    </ProductSiteRuntimeProvider>,
  );

export const getCorporatePrerenderRoutes = (): PrerenderRoute[] => {
  const routes: PrerenderRoute[] = [];

  SUPPORTED_LOCALES.forEach((locale) => {
    routes.push(
      { path: `/${locale}`, locale, indexable: true },
      { path: `/${locale}/contact`, locale, indexable: true },
      { path: `/${locale}/services`, locale, indexable: true },
      { path: `/${locale}/login`, locale, indexable: false },
      { path: `/${locale}/register`, locale, indexable: false },
      { path: `/${locale}/forgot-password`, locale, indexable: false },
    );

    CONTENT_SECTIONS.forEach((section) => {
      section.items.forEach((item) => {
        routes.push({
          path: `/${locale}/${section.id}/${item.slug}`,
          locale,
          indexable: true,
        });
      });
    });

    PRODUCTS.forEach((product) => {
      routes.push(
        { path: `/${locale}/${product.slug}`, locale, indexable: true },
        { path: `/${locale}/${product.slug}/contact`, locale, indexable: true },
      );

      getProductSiteLegalPages(product).forEach((page) => {
        routes.push({
          path: `/${locale}/${product.slug}/legal/${page.slug}`,
          locale,
          indexable: true,
        });
      });

      if (product.slug !== 'tracker') {
        return;
      }

      routes.push(
        { path: `/${locale}/${product.slug}/products`, locale, indexable: true },
        { path: `/${locale}/${product.slug}/demo`, locale, indexable: true },
        { path: `/${locale}/${product.slug}/admin/contacts`, locale, indexable: false },
      );

      HARDWARE_PRODUCTS.forEach((hardwareProduct) => {
        routes.push({
          path: `/${locale}/${product.slug}/products/${hardwareProduct.id}`,
          locale,
          indexable: true,
        });
      });
    });
  });

  return dedupeRoutes(routes);
};

export const getProductSitePrerenderRoutes = (productSlug: ProductSlug): PrerenderRoute[] => {
  const product = getProductBySlug(productSlug);

  if (!product) {
    throw new Error(`Unknown product slug for prerender: ${productSlug}`);
  }

  const routes: PrerenderRoute[] = [];

  SUPPORTED_LOCALES.forEach((locale) => {
    routes.push(
      { path: `/${locale}`, locale, indexable: true },
      { path: `/${locale}/contact`, locale, indexable: true },
    );

    getProductSiteLegalPages(product).forEach((page) => {
      routes.push({
        path: `/${locale}/legal/${page.slug}`,
        locale,
        indexable: true,
      });
    });

    if (productSlug !== 'tracker') {
      return;
    }

    routes.push(
      { path: `/${locale}/products`, locale, indexable: true },
      { path: `/${locale}/demo`, locale, indexable: true },
      { path: `/${locale}/admin/contacts`, locale, indexable: false },
    );

    HARDWARE_PRODUCTS.forEach((hardwareProduct) => {
      routes.push({
        path: `/${locale}/products/${hardwareProduct.id}`,
        locale,
        indexable: true,
      });
    });
  });

  return dedupeRoutes(routes);
};

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const buildSitemapXml = (routes: PrerenderRoute[]) => {
  const routeGroups = new Map<string, Partial<Record<Locale | 'x-default', string>>>();
  const lastmod = new Date().toISOString().slice(0, 10);

  routes
    .filter((route) => route.indexable)
    .forEach((route) => {
      const groupKey = stripLocaleFromPath(route.path);
      const group = routeGroups.get(groupKey) ?? {};
      group[route.locale] = route.path;
      group['x-default'] = group.tr ?? route.path;
      routeGroups.set(groupKey, group);
    });

  const urlEntries = [...routeGroups.values()]
    .flatMap((group) =>
      SUPPORTED_LOCALES.flatMap((locale) => {
        const currentPath = group[locale];

        if (!currentPath) {
          return [];
        }

        const alternates = [
          ...SUPPORTED_LOCALES.flatMap((alternateLocale) => {
            const alternatePath = group[alternateLocale];

            return alternatePath
              ? [
                  `<xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${escapeXml(
                    toAbsoluteUrl(alternatePath),
                  )}" />`,
                ]
              : [];
          }),
          group['x-default']
            ? `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(
                toAbsoluteUrl(group['x-default']),
              )}" />`
            : '',
        ]
          .filter(Boolean)
          .join('\n    ');

        return [
          `  <url>
    <loc>${escapeXml(toAbsoluteUrl(currentPath))}</loc>
    <lastmod>${lastmod}</lastmod>
    ${alternates}
  </url>`,
        ];
      }),
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>
`;
};

export const buildRobotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
