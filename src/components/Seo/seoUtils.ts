import { SITE_NAME, type Locale } from '../../config/site';
import { toAbsoluteUrl } from '../../lib/i18n';

export interface SeoHeadConfig {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  image?: string;
  favicon?: string;
  robots?: string;
  type?: 'website' | 'article';
  themeColor?: string;
  alternates?: Partial<Record<Locale | 'x-default', string>>;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export interface ResolvedSeoAlternate {
  href: string;
  hrefLang: Locale | 'x-default';
}

export interface ResolvedSeoPayload {
  title: string;
  description: string;
  locale: Locale;
  robots: string;
  type: 'website' | 'article';
  themeColor: string;
  canonicalUrl: string;
  imageUrl: string;
  faviconUrl: string;
  faviconType: string;
  alternates: ResolvedSeoAlternate[];
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const localeToOgLocale = (locale: Locale) => (locale === 'tr' ? 'tr_TR' : 'en_US');

const toAbsoluteAssetUrl = (value: string) =>
  value.startsWith('http') || value.startsWith('data:') ? value : toAbsoluteUrl(value);

export const getFaviconType = (href: string) => {
  if (href.endsWith('.png')) {
    return 'image/png';
  }

  if (href.endsWith('.svg')) {
    return 'image/svg+xml';
  }

  return 'image/x-icon';
};

export const resolveSeoPayload = ({
  title,
  description,
  pathname,
  locale,
  image = '/og-image.svg',
  favicon = '/favicon.svg',
  robots = 'index,follow',
  type = 'website',
  themeColor = '#203A74',
  alternates,
  schema,
}: SeoHeadConfig): ResolvedSeoPayload => ({
  title,
  description,
  locale,
  robots,
  type,
  themeColor,
  canonicalUrl: toAbsoluteUrl(pathname),
  imageUrl: toAbsoluteAssetUrl(image),
  faviconUrl: toAbsoluteAssetUrl(favicon),
  faviconType: getFaviconType(toAbsoluteAssetUrl(favicon)),
  alternates: Object.entries(alternates ?? {}).map(([hrefLang, href]) => ({
    href: toAbsoluteUrl(href),
    hrefLang: hrefLang as Locale | 'x-default',
  })),
  schema,
});

export const serializeSeoHead = (payload: ResolvedSeoPayload) => {
  const ogLocale = localeToOgLocale(payload.locale);
  const alternateOgLocales = payload.alternates
    .filter(
      (entry): entry is ResolvedSeoAlternate & { hrefLang: Locale } =>
        entry.hrefLang !== 'x-default' && entry.hrefLang !== payload.locale,
    )
    .map((entry) => localeToOgLocale(entry.hrefLang));
  const schemaJson = payload.schema ? JSON.stringify(payload.schema).replace(/</g, '\\u003c') : null;

  const tags = [
    `<title>${escapeHtml(payload.title)}</title>`,
    `<meta name="application-name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta name="description" content="${escapeHtml(payload.description)}" />`,
    `<meta name="robots" content="${escapeHtml(payload.robots)}" />`,
    `<meta name="theme-color" content="${escapeHtml(payload.themeColor)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:type" content="${escapeHtml(payload.type)}" />`,
    `<meta property="og:title" content="${escapeHtml(payload.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(payload.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(payload.canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(payload.imageUrl)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(payload.title)}" />`,
    `<meta property="og:locale" content="${escapeHtml(ogLocale)}" />`,
    ...alternateOgLocales.map(
      (value) => `<meta property="og:locale:alternate" content="${escapeHtml(value)}" />`,
    ),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(payload.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(payload.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(payload.imageUrl)}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(payload.title)}" />`,
    `<link rel="canonical" href="${escapeHtml(payload.canonicalUrl)}" />`,
    `<link rel="icon" href="${escapeHtml(payload.faviconUrl)}" type="${escapeHtml(payload.faviconType)}" />`,
    ...payload.alternates.map(
      (entry) =>
        `<link rel="alternate" hreflang="${escapeHtml(entry.hrefLang)}" href="${escapeHtml(entry.href)}" data-seo="alternate" />`,
    ),
  ];

  if (schemaJson) {
    tags.push(`<script type="application/ld+json" data-seo="schema">${schemaJson}</script>`);
  }

  return tags.join('\n    ');
};
