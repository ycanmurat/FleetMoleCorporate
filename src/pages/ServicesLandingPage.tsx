import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { COMPANY_NAME, SITE_URL } from '../config/site';
import { useApp } from '../context/AppContext';
import {
  CONTENT_SECTION_MAP,
  getContentPath,
} from '../data/navigation';
import { getProductBySlug } from '../data/products';
import { SERVICES_LANDING_CONTENT } from '../data/servicesContent';
import './ServicesLandingPage.css';

const ServicesLandingPage = () => {
  const { lang, localizePath } = useApp();
  const section = CONTENT_SECTION_MAP.services;
  const title = `${section.label[lang]} | ${COMPANY_NAME}`;
  const description = SERVICES_LANDING_CONTENT.heroLead[lang];

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        pathname={localizePath('/services')}
        locale={lang}
        alternates={{
          tr: '/tr/services',
          en: '/en/services',
          'x-default': '/tr/services',
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description,
          url: `${SITE_URL}${localizePath('/services')}`,
          publisher: {
            '@type': 'Organization',
            name: COMPANY_NAME,
          },
        }}
      />

      <div className="services-landing">
        <section className="services-hero">
          <div className="container services-hero-grid">
            <div className="services-copy">
              <span className="services-chip">
                <Sparkles size={14} />
                {SERVICES_LANDING_CONTENT.heroEyebrow[lang]}
              </span>
              <h1>{SERVICES_LANDING_CONTENT.heroTitle[lang]}</h1>
              <p className="services-lead">{SERVICES_LANDING_CONTENT.heroLead[lang]}</p>
              <p className="services-body">{SERVICES_LANDING_CONTENT.heroBody[lang]}</p>

              <div className="services-actions">
                <a href="#services-directory" className="btn-primary">
                  {SERVICES_LANDING_CONTENT.primaryCta[lang]} <ArrowRight size={18} />
                </a>
                <Link to={localizePath('/contact')} className="btn-outline">
                  {SERVICES_LANDING_CONTENT.secondaryCta[lang]}
                </Link>
              </div>
            </div>

            <aside className="services-hero-panel glass-panel">
              <div className="services-panel-head">
                <span>{lang === 'tr' ? 'Operasyon Özeti' : 'Operational Snapshot'}</span>
                <strong>{section.label[lang]}</strong>
              </div>

              <div className="services-metrics">
                {SERVICES_LANDING_CONTENT.metrics.map((metric) => (
                  <article key={metric.label.tr} className="services-metric">
                    <strong>{metric.value[lang]}</strong>
                    <span>{metric.label[lang]}</span>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="services-section" id="services-directory">
          <div className="container">
            <div className="services-section-head">
              <span>{section.eyebrow[lang]}</span>
              <h2>{section.title[lang]}</h2>
              <p>{section.description[lang]}</p>
            </div>

            <div className="services-card-grid">
              {section.items.map((item) => (
                <Link
                  key={item.slug}
                  to={localizePath(getContentPath('services', item.slug))}
                  className="services-card glass-panel"
                >
                  <div className="services-card-head">
                    <span className="services-card-icon">
                      <item.icon size={18} />
                    </span>
                    <ArrowRight size={16} />
                  </div>

                  <h3>{item.title[lang]}</h3>
                  <p>{item.description[lang]}</p>

                  <ul className="services-card-points">
                    {item.highlights[lang].slice(0, 3).map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  {item.relatedProducts?.length ? (
                    <div className="services-card-products">
                      {item.relatedProducts.flatMap((slug) => {
                        const product = getProductBySlug(slug);
                        return product ? [
                          <ProductWordmark
                            key={product.slug}
                            product={product}
                            className="services-card-wordmark"
                            height={20}
                            alt=""
                          />,
                        ] : [];
                      })}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="container">
            <div className="services-section-head">
              <span>{lang === 'tr' ? 'Akış Tasarımı' : 'Flow Design'}</span>
              <h2>{SERVICES_LANDING_CONTENT.processTitle[lang]}</h2>
              <p>{SERVICES_LANDING_CONTENT.processDescription[lang]}</p>
            </div>

            <div className="services-process-grid">
              {SERVICES_LANDING_CONTENT.process.map((step) => (
                <article key={step.title.tr} className="services-process-card glass-panel">
                  <h3>{step.title[lang]}</h3>
                  <p>{step.body[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-section services-section--integrations">
          <div className="container">
            <div className="services-section-head">
              <span>{lang === 'tr' ? 'Ürün Entegrasyonu' : 'Product Integration'}</span>
              <h2>{SERVICES_LANDING_CONTENT.integrationTitle[lang]}</h2>
              <p>{SERVICES_LANDING_CONTENT.integrationDescription[lang]}</p>
            </div>

            <div className="services-integration-grid">
              {SERVICES_LANDING_CONTENT.integrations.map((integration) => {
                const product = getProductBySlug(integration.product);

                if (!product) {
                  return null;
                }

                return (
                  <article key={integration.product} className="services-integration-card glass-panel">
                    <ProductWordmark product={product} height={28} alt="" className="services-integration-wordmark" />
                    <h3>{integration.title[lang]}</h3>
                    <p>{integration.body[lang]}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="container">
            <div className="services-cta glass-panel">
              <div>
                <span>{section.label[lang]}</span>
                <h2>{SERVICES_LANDING_CONTENT.ctaTitle[lang]}</h2>
                <p>{SERVICES_LANDING_CONTENT.ctaBody[lang]}</p>
              </div>

              <div className="services-cta-actions">
                <Link to={localizePath('/contact')} className="btn-primary">
                  {lang === 'tr' ? 'Demo ve Kapsam Talep Edin' : 'Request a Demo and Scope'} <ArrowRight size={18} />
                </Link>
                <Link to={localizePath('/')} className="btn-outline">
                  {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesLandingPage;
