import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../data/company';
import { toAbsoluteUrl } from '../lib/i18n';
import { getCorporateSitePath } from './siteConfig';
import { useProductSite } from './ProductSiteContext';

const ProductSiteContact = () => {
  const { lang } = useApp();
  const { product, content } = useProductSite();
  const corporatePath = getCorporateSitePath(lang);
  const productHomePath = getProductSitePath(product.slug, lang);
  const productContactPath = getProductSitePath(product.slug, lang, '/contact');
  const title =
    lang === 'tr' ? `${product.name} | İletişim` : `${product.name} | Contact`;
  const description = content.contact.lead[lang];

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        pathname={productContactPath}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
        alternates={{
          tr: getProductSitePath(product.slug, 'tr', '/contact'),
          en: getProductSitePath(product.slug, 'en', '/contact'),
          'x-default': getProductSitePath(product.slug, 'tr', '/contact'),
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: title,
          description,
          url: toAbsoluteUrl(productContactPath),
        }}
        themeColor={product.theme.primary}
      />

      <div className="product-site-page product-site-page--contact">
        <section className="ps-contact-hero">
          <div className="container ps-contact-grid">
            <div className="ps-contact-copy">
              <span className="ps-chip">{content.contact.chip[lang]}</span>
              <h1>{content.contact.title[lang]}</h1>
              <p className="ps-contact-lead">{content.contact.lead[lang]}</p>

              <div className="ps-contact-actions">
                <a href={`mailto:${COMPANY_INFO.email}`} className="btn-primary">
                  {lang === 'tr' ? 'E-posta Gönder' : 'Send Email'} <ArrowRight size={18} />
                </a>
                <a href={`tel:${COMPANY_INFO.phoneHref}`} className="btn-outline">
                  {lang === 'tr' ? 'Telefonla Ulaşın' : 'Call Us'}
                </a>
              </div>

              <div className="ps-contact-response">
                <strong>{lang === 'tr' ? 'Yanıt hedefi' : 'Response target'}</strong>
                <span>{content.contact.response[lang]}</span>
              </div>
            </div>

            <aside className="ps-contact-card glass-panel">
              <div className="ps-contact-brand">
                <ProductWordmark product={product} height={32} alt="" />
              </div>

              <div className="ps-contact-channel">
                <MapPin size={18} />
                <div>
                  <strong>{lang === 'tr' ? 'Adres' : 'Address'}</strong>
                  <span>{getCompanyAddress(lang)}</span>
                </div>
              </div>

              <div className="ps-contact-channel">
                <Phone size={18} />
                <div>
                  <strong>{lang === 'tr' ? 'Telefon' : 'Phone'}</strong>
                  <a href={`tel:${COMPANY_INFO.phoneHref}`}>{COMPANY_INFO.phoneDisplay}</a>
                </div>
              </div>

              <div className="ps-contact-channel">
                <Mail size={18} />
                <div>
                  <strong>{lang === 'tr' ? 'E-posta' : 'Email'}</strong>
                  <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                </div>
              </div>

              <Link to={corporatePath} className="ps-contact-corporate">
                {lang === 'tr' ? 'FleetMole Corporate’a dön' : 'Back to FleetMole Corporate'}
              </Link>
            </aside>
          </div>
        </section>

        <section className="ps-section">
          <div className="container ps-contact-detail-grid">
            <article className="ps-detail-card glass-panel">
              <span>{content.contact.reasonsTitle[lang]}</span>
              <h2>{lang === 'tr' ? 'Genelde hangi kapsamlarla başlıyoruz?' : 'Where do teams usually start?'}</h2>
              <ul>
                {content.contact.reasons.map((item) => (
                  <li key={item[lang]}>{item[lang]}</li>
                ))}
              </ul>
            </article>

            <article className="ps-detail-card glass-panel">
              <span>{content.contact.topicsTitle[lang]}</span>
              <h2>{lang === 'tr' ? 'Doğru görüşme başlığını seçin' : 'Choose the right conversation topic'}</h2>
              <div className="ps-topic-list">
                {content.contact.topics.map((topic) => (
                  <div key={topic.title[lang]} className="ps-topic-card">
                    <strong>{topic.title[lang]}</strong>
                    <p>{topic.body[lang]}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="ps-section ps-section--soft">
          <div className="container">
            <div className="ps-inline-cta glass-panel">
              <div>
                <span>{product.name}</span>
                <h2>{lang === 'tr' ? 'Ana akışa dönüp ürün yapısını tekrar inceleyin.' : 'Return to the main flow and review the product structure again.'}</h2>
                <p>{product.summary[lang]}</p>
              </div>
              <div className="ps-inline-cta-actions">
                <Link to={productHomePath} className="btn-outline">
                  {lang === 'tr' ? 'Ana Sayfa' : 'Home'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductSiteContact;
