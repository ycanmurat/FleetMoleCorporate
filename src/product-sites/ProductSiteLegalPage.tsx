import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SeoHead from '../components/Seo/SeoHead';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { toAbsoluteUrl } from '../lib/i18n';
import { getProductSiteLegalPage } from './legalContent';
import { useProductSite } from './ProductSiteContext';

const ProductSiteLegalPage = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const { pageSlug } = useParams<{ pageSlug: string }>();
  const page = getProductSiteLegalPage(product, pageSlug);
  const productHomePath = getProductSitePath(product.slug, lang);
  const pagePath = getProductSitePath(product.slug, lang, `/legal/${pageSlug ?? ''}`);

  if (!page) {
    return <Navigate to={productHomePath} replace />;
  }

  return (
    <>
      <SeoHead
        title={`${page.title[lang]} | ${product.name}`}
        description={page.description[lang]}
        pathname={pagePath}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
        alternates={{
          tr: getProductSitePath(product.slug, 'tr', `/legal/${page.slug}`),
          en: getProductSitePath(product.slug, 'en', `/legal/${page.slug}`),
          'x-default': getProductSitePath(product.slug, 'tr', `/legal/${page.slug}`),
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: page.title[lang],
          description: page.description[lang],
          url: toAbsoluteUrl(pagePath),
        }}
        themeColor={product.theme.primary}
      />

      <div className="product-site-page ps-legal-page">
        <section className="ps-hero ps-legal-hero">
          <div className="container ps-legal-hero-grid">
            <div className="ps-contact-copy">
              <span className="ps-chip">{lang === 'tr' ? 'Yasal İçerik' : 'Legal Content'}</span>
              <h1>{page.title[lang]}</h1>
              <p className="ps-contact-lead">{page.intro[lang]}</p>
            </div>

            <aside className="ps-legal-aside glass-panel">
              <strong>{product.name}</strong>
              <p>{page.description[lang]}</p>
              <div className="ps-legal-aside-list">
                {page.sections.map((section) => (
                  <div key={section.title[lang]} className="ps-legal-aside-item">
                    <CheckCircle2 size={16} />
                    <span>{section.title[lang]}</span>
                  </div>
                ))}
              </div>
              <Link to={getProductSitePath(product.slug, lang, '/contact')} className="btn-primary">
                {lang === 'tr' ? 'İletişime Geçin' : 'Contact the Team'} <ArrowRight size={18} />
              </Link>
            </aside>
          </div>
        </section>

        <section className="ps-section">
          <div className="container ps-legal-grid">
            {page.sections.map((section) => (
              <article key={section.title[lang]} className="ps-legal-card glass-panel">
                <span>{section.title[lang]}</span>
                {section.body.map((paragraph) => (
                  <p key={paragraph[lang]}>{paragraph[lang]}</p>
                ))}

                {section.bullets ? (
                  <ul>
                    {section.bullets[lang].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductSiteLegalPage;
