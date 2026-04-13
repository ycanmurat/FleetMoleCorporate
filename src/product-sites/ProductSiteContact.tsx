import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactInquiryForm from '../components/ContactInquiryForm/ContactInquiryForm';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../data/company';
import { PRODUCTS } from '../data/products';
import { toAbsoluteUrl } from '../lib/i18n';
import { getCorporateSitePath } from './siteConfig';
import { useProductSite } from './ProductSiteContext';
import { useProductSitePathMode } from './ProductSiteRuntimeContext';

const ProductSiteContact = () => {
  const { lang } = useApp();
  const { product, content } = useProductSite();
  const pathMode = useProductSitePathMode();
  const corporatePath = getCorporateSitePath(lang);
  const productHomePath = getProductSitePath(product.slug, lang, '/', pathMode);
  const productContactPath = getProductSitePath(product.slug, lang, '/contact', pathMode);
  const title = lang === 'tr' ? `${product.name} | İletişim` : `${product.name} | Contact`;
  const description = content.contact.lead[lang];

  const productOptions = [
    {
      label: product.name,
      value: product.slug,
    },
    ...PRODUCTS.filter((item) => item.slug !== product.slug).map((item) => ({
      label: item.name,
      value: item.slug,
    })),
  ];

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        pathname={productContactPath}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
        alternates={{
          tr: getProductSitePath(product.slug, 'tr', '/contact', pathMode),
          en: getProductSitePath(product.slug, 'en', '/contact', pathMode),
          'x-default': getProductSitePath(product.slug, 'tr', '/contact', pathMode),
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

      <div className={`product-site-page ps-contact-page ps-contact-page--${product.slug}`}>
        <section className="ps-contact-hero">
          <div className="container ps-contact-grid">
            <div className="ps-contact-copy">
              <span className="ps-chip">{content.contact.chip[lang]}</span>
              <h1>{content.contact.title[lang]}</h1>
              <p className="ps-contact-lead">{content.contact.lead[lang]}</p>

              <div className="ps-contact-actions">
                <a className="btn-primary" href={`mailto:${COMPANY_INFO.email}`}>
                  <Mail size={18} />
                  {lang === 'tr' ? 'Mail Gönder' : 'Send Email'}
                </a>
                <a className="btn-outline" href={`tel:${COMPANY_INFO.phoneHref}`}>
                  <Phone size={18} />
                  {lang === 'tr' ? 'Telefonla Ulaşın' : 'Call the Team'}
                </a>
              </div>

              <div className="ps-contact-response">
                <strong>{lang === 'tr' ? 'Yanıt Planı' : 'Response Plan'}</strong>
                <span>{content.contact.response[lang]}</span>
              </div>

              <Link to={corporatePath} className="ps-contact-corporate">
                {lang === 'tr' ? 'FleetMole Kurumsal' : 'FleetMole Corporate'}
              </Link>
            </div>

            <div className="ps-contact-column">
              <ContactInquiryForm
                accentColor={product.theme.primary}
                defaultProduct={product.slug}
                productOptions={productOptions}
                siteScope={product.slug}
                title={lang === 'tr' ? `${product.shortName} Talep Formu` : `${product.shortName} Inquiry Form`}
                lead={
                  lang === 'tr'
                    ? 'Konu, ürün ve mesaj bağlamı net olduğunda ekip ilk dönüşte daha hazırlıklı ilerler.'
                    : 'When the topic, product, and message context are clear, the team can respond more precisely from the first touch.'
                }
                variant={product.slug === 'tracker' ? 'tracker' : 'product'}
              />

              <aside className="ps-contact-card glass-panel">
                <div className="ps-contact-brand">
                  <ProductWordmark product={product} height={36} alt="" />
                  <span>{product.category[lang]}</span>
                </div>

                <div className="ps-contact-channel">
                  <MapPin size={18} />
                  <div>
                    <strong>{lang === 'tr' ? 'Ofis' : 'Office'}</strong>
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
                    <strong>{lang === 'tr' ? 'E-Posta' : 'Email'}</strong>
                    <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="container ps-contact-detail-grid">
            <article className="ps-detail-card glass-panel">
              <span>{content.contact.reasonsTitle[lang]}</span>
              <h2>{lang === 'tr' ? 'Genelde hangi başlıklarda ilerliyoruz?' : 'Where do teams usually start?'}</h2>
              <ul>
                {content.contact.reasons.map((item) => (
                  <li key={item[lang]}>{item[lang]}</li>
                ))}
              </ul>
            </article>

            <article className="ps-detail-card glass-panel">
              <span>{content.contact.topicsTitle[lang]}</span>
              <h2>{lang === 'tr' ? 'Talep başlığını doğru yere konumlayın' : 'Frame the inquiry correctly'}</h2>
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
                <p>{product.detail[lang]}</p>
              </div>
              <div className="ps-inline-cta-actions">
                <Link to={productHomePath} className="btn-outline">
                  {lang === 'tr' ? 'Ana Sayfa' : 'Home'}
                </Link>
                {product.slug === 'tracker' ? (
                  <Link to={getProductSitePath(product.slug, lang, '/products', pathMode)} className="btn-primary">
                    {lang === 'tr' ? 'Mobilite Ürünlerini Aç' : 'Open Mobility Products'} <ArrowRight size={18} />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductSiteContact;
