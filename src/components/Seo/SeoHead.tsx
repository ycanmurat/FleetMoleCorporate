import { useEffect } from 'react';
import type { Locale } from '../../config/site';
import { SITE_NAME } from '../../config/site';
import { toAbsoluteUrl } from '../../lib/i18n';

interface SeoHeadProps {
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

const getFaviconType = (href: string) => {
  if (href.endsWith('.png')) {
    return 'image/png';
  }

  if (href.endsWith('.svg')) {
    return 'image/svg+xml';
  }

  return 'image/x-icon';
};

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const ensureLinkTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const removeMissingAlternates = (alternates: SeoHeadProps['alternates']) => {
  document.head
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][data-seo="alternate"]')
    .forEach((link) => {
      const hrefLang = link.getAttribute('hreflang') as keyof NonNullable<typeof alternates> | null;
      if (!hrefLang || !alternates?.[hrefLang]) {
        link.remove();
      }
    });
};

const SeoHead = ({
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
}: SeoHeadProps) => {
  useEffect(() => {
    const canonicalUrl = toAbsoluteUrl(pathname);
    const imageUrl = image.startsWith('http') ? image : toAbsoluteUrl(image);
    const faviconUrl = favicon.startsWith('http') ? favicon : toAbsoluteUrl(favicon);

    document.title = title;

    ensureMetaTag('meta[name="description"]', { name: 'description', content: description });
    ensureMetaTag('meta[name="robots"]', { name: 'robots', content: robots });
    ensureMetaTag('meta[name="theme-color"]', { name: 'theme-color', content: themeColor });

    ensureMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    ensureMetaTag('meta[property="og:type"]', { property: 'og:type', content: type });
    ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    ensureMetaTag('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    ensureMetaTag('meta[property="og:locale"]', { property: 'og:locale', content: locale === 'tr' ? 'tr_TR' : 'en_US' });

    ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    ensureLinkTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    ensureLinkTag('link[rel="icon"]', {
      rel: 'icon',
      href: faviconUrl,
      type: getFaviconType(faviconUrl),
    });
    removeMissingAlternates(alternates);

    Object.entries(alternates ?? {}).forEach(([hrefLang, href]) => {
      ensureLinkTag(`link[rel="alternate"][hreflang="${hrefLang}"]`, {
        rel: 'alternate',
        hreflang: hrefLang,
        href: toAbsoluteUrl(href),
        'data-seo': 'alternate',
      });
    });

    const existingSchema = document.head.querySelector<HTMLScriptElement>('script[data-seo="schema"]');
    if (schema) {
      if (!existingSchema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'schema');
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      } else {
        existingSchema.text = JSON.stringify(schema);
      }
    } else {
      existingSchema?.remove();
    }
  }, [alternates, description, favicon, image, locale, pathname, robots, schema, themeColor, title, type]);

  return null;
};

export default SeoHead;
