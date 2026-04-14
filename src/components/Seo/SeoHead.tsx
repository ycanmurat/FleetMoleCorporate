import { useContext, useEffect } from 'react';
import { SITE_NAME } from '../../config/site';
import { SeoRenderContext } from './SeoRenderContext';
import { localeToOgLocale, resolveSeoPayload, type SeoHeadConfig } from './seoUtils';

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

const ensureSingletonMetaTag = (
  selector: string,
  attributes: Record<string, string>,
  shouldRender: boolean,
) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);

  if (!shouldRender) {
    existing?.remove();
    return;
  }

  ensureMetaTag(selector, attributes);
};

const syncMetaTagList = (
  selector: string,
  values: string[],
  createAttributes: (value: string) => Record<string, string>,
) => {
  document.head.querySelectorAll(selector).forEach((element) => element.remove());
  values.forEach((value) => {
    const element = document.createElement('meta');
    Object.entries(createAttributes(value)).forEach(([key, attributeValue]) => {
      element.setAttribute(key, attributeValue);
    });
    document.head.appendChild(element);
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

type SeoHeadProps = SeoHeadConfig;

const SeoHead = (props: SeoHeadProps) => {
  const collector = useContext(SeoRenderContext);
  const payload = resolveSeoPayload(props);

  collector?.set(payload);

  useEffect(() => {
    document.title = payload.title;

    ensureMetaTag('meta[name="application-name"]', { name: 'application-name', content: SITE_NAME });
    ensureMetaTag('meta[name="apple-mobile-web-app-title"]', {
      name: 'apple-mobile-web-app-title',
      content: SITE_NAME,
    });
    ensureMetaTag('meta[name="description"]', { name: 'description', content: payload.description });
    ensureMetaTag('meta[name="robots"]', { name: 'robots', content: payload.robots });
    ensureMetaTag('meta[name="theme-color"]', { name: 'theme-color', content: payload.themeColor });

    ensureMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    ensureMetaTag('meta[property="og:type"]', { property: 'og:type', content: payload.type });
    ensureMetaTag('meta[property="og:title"]', { property: 'og:title', content: payload.title });
    ensureMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: payload.description,
    });
    ensureMetaTag('meta[property="og:url"]', { property: 'og:url', content: payload.canonicalUrl });
    ensureMetaTag('meta[property="og:image"]', { property: 'og:image', content: payload.imageUrl });
    ensureMetaTag('meta[property="og:image:alt"]', { property: 'og:image:alt', content: payload.title });
    ensureMetaTag('meta[property="og:locale"]', {
      property: 'og:locale',
      content: payload.locale === 'tr' ? 'tr_TR' : 'en_US',
    });

    ensureMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    ensureMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: payload.title });
    ensureMetaTag('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: payload.description,
    });
    ensureMetaTag('meta[name="twitter:url"]', { name: 'twitter:url', content: payload.canonicalUrl });
    ensureMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: payload.imageUrl });
    ensureMetaTag('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: payload.title });
    syncMetaTagList(
      'meta[property="og:locale:alternate"][data-seo="og-locale-alternate"]',
      payload.alternates
        .filter(
          (entry): entry is typeof entry & { hrefLang: 'tr' | 'en' } =>
            entry.hrefLang !== 'x-default' && entry.hrefLang !== payload.locale,
        )
        .map((entry) => localeToOgLocale(entry.hrefLang)),
      (value) => ({
        property: 'og:locale:alternate',
        content: value,
        'data-seo': 'og-locale-alternate',
      }),
    );
    ensureSingletonMetaTag(
      'meta[property="article:published_time"]',
      {
        property: 'article:published_time',
        content: payload.articlePublishedTime ?? '',
      },
      payload.type === 'article' && Boolean(payload.articlePublishedTime),
    );
    ensureSingletonMetaTag(
      'meta[property="article:modified_time"]',
      {
        property: 'article:modified_time',
        content: payload.articleModifiedTime ?? '',
      },
      payload.type === 'article' && Boolean(payload.articleModifiedTime),
    );

    ensureLinkTag('link[rel="canonical"]', { rel: 'canonical', href: payload.canonicalUrl });
    ensureLinkTag('link[rel="icon"]', {
      rel: 'icon',
      href: payload.faviconUrl,
      type: payload.faviconType,
    });
    removeMissingAlternates(props.alternates);

    payload.alternates.forEach(({ hrefLang, href }) => {
      ensureLinkTag(`link[rel="alternate"][hreflang="${hrefLang}"]`, {
        rel: 'alternate',
        hreflang: hrefLang,
        href,
        'data-seo': 'alternate',
      });
    });

    const existingSchema = document.head.querySelector<HTMLScriptElement>('script[data-seo="schema"]');
    if (payload.schema) {
      if (!existingSchema) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'schema');
        script.text = JSON.stringify(payload.schema);
        document.head.appendChild(script);
      } else {
        existingSchema.text = JSON.stringify(payload.schema);
      }
    } else {
      existingSchema?.remove();
    }
  }, [payload, props.alternates]);

  return null;
};

export default SeoHead;
