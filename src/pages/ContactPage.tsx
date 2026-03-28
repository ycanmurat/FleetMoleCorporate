import type { CSSProperties } from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductSiteLink from '../components/ProductSiteLink/ProductSiteLink';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { COMPANY_NAME, SITE_URL } from '../config/site';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../data/company';
import { CONTENT_SECTION_MAP, getContentPath } from '../data/navigation';
import { PRODUCTS } from '../data/products';
import './ContactPage.css';

const ContactPage = () => {
  const { lang, localizePath } = useApp();

  const title = lang === 'tr' ? 'İletişim | FleetMole' : 'Contact | FleetMole';
  const description =
    lang === 'tr'
      ? 'FleetMole ekibi ile satış, demo, entegrasyon ve iş ortaklığı konularında doğrudan iletişime geçin.'
      : 'Contact the FleetMole team directly for sales, demos, integrations, and partnerships.';

  const quickLinks = [
    ...CONTENT_SECTION_MAP.services.items.slice(0, 3).map((item) => ({
      title: item.title[lang],
      description: item.description[lang],
      href: localizePath(getContentPath('services', item.slug)),
    })),
    ...CONTENT_SECTION_MAP.leasing.items.slice(0, 2).map((item) => ({
      title: item.title[lang],
      description: item.description[lang],
      href: localizePath(getContentPath('leasing', item.slug)),
    })),
  ];

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        pathname={localizePath('/contact')}
        locale={lang}
        alternates={{
          tr: '/tr/contact',
          en: '/en/contact',
          'x-default': '/tr/contact',
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: title,
          description,
          url: `${SITE_URL}${localizePath('/contact')}`,
          publisher: {
            '@type': 'Organization',
            name: COMPANY_NAME,
          },
        }}
      />

      <div className="contact-page">
        <section className="contact-hero">
          <div className="container contact-hero-grid">
            <div className="contact-copy">
              <span className="contact-chip">{lang === 'tr' ? 'Bize Ulaşın' : 'Reach Us'}</span>
              <h1>
                {lang === 'tr'
                  ? 'Demo, teklif, entegrasyon ve iş ortaklığı için ekibimizle doğrudan görüşün.'
                  : 'Talk directly with our team about demos, proposals, integrations, and partnerships.'}
              </h1>
              <p>{description}</p>

              <div className="contact-action-shell">
                <div className="contact-actions">
                  <a className="btn-primary contact-btn contact-btn--primary" href={`mailto:${COMPANY_INFO.email}`}>
                    {lang === 'tr' ? 'E-posta Gönder' : 'Send Email'} <ArrowRight size={18} />
                  </a>
                  <a className="btn-outline contact-btn contact-btn--secondary" href={`tel:${COMPANY_INFO.phoneHref}`}>
                    {lang === 'tr' ? 'Telefonla Ulaşın' : 'Call Us'}
                  </a>
                </div>

                <div className="contact-action-meta">
                  <span>{lang === 'tr' ? 'Doğrudan ekip erişimi' : 'Direct team access'}</span>
                  <strong>
                    {lang === 'tr'
                      ? 'Satış, demo, entegrasyon ve iş ortaklığı görüşmeleri'
                      : 'Sales, demos, integrations, and partnership conversations'}
                  </strong>
                </div>
              </div>

              <div className="contact-product-group">
                <div className="contact-product-head">
                  <div>
                    <span>{lang === 'tr' ? 'İlgili Ürün Akışı' : 'Relevant Product Stream'}</span>
                    <strong>
                      {lang === 'tr'
                        ? 'Görüşmeyi doğru kapsamla başlatın'
                        : 'Start the conversation with the right scope'}
                    </strong>
                  </div>
                  <small>{lang === 'tr' ? 'Ürün seçimi' : 'Product selection'}</small>
                </div>

                <div className="contact-product-grid">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <ProductSiteLink
                      key={product.slug}
                      productSlug={product.slug}
                      className="contact-product-card"
                      style={
                        {
                          '--product-accent': product.theme.primary,
                          '--product-soft': product.theme.soft,
                        } as CSSProperties
                      }
                    >
                      <div className="contact-product-top">
                        <ProductWordmark product={product} className="contact-product-wordmark" height={28} alt="" />
                        <span className="contact-product-arrow">
                          <ArrowRight size={15} />
                        </span>
                      </div>
                      <strong className="sr-only">{product.name}</strong>
                      <span>{product.category[lang]}</span>
                    </ProductSiteLink>
                  ))}
                </div>
              </div>
            </div>

            <aside className="contact-card">
              <div className="contact-card-head">
                <span className="contact-card-kicker">{lang === 'tr' ? 'Doğrudan Erişim' : 'Direct Access'}</span>
                <strong>{lang === 'tr' ? 'İletişim Kanalları' : 'Contact Channels'}</strong>
                <p>
                  {lang === 'tr'
                    ? 'Talebinizi doğru ekip ve doğru kapsamla eşleştirmek için tüm temas noktaları burada.'
                    : 'All contact points are here so we can route your request to the right team and scope.'}
                </p>
              </div>

              <div className="contact-card-row">
                <span className="contact-card-icon">
                  <MapPin size={18} />
                </span>
                <div className="contact-card-copy">
                  <strong>{lang === 'tr' ? 'Adresimiz' : 'Our Address'}</strong>
                  <span>{getCompanyAddress(lang)}</span>
                </div>
              </div>
              <div className="contact-card-row">
                <span className="contact-card-icon">
                  <Phone size={18} />
                </span>
                <div className="contact-card-copy">
                  <strong>{lang === 'tr' ? 'Telefon' : 'Phone'}</strong>
                  <a href={`tel:${COMPANY_INFO.phoneHref}`}>{COMPANY_INFO.phoneDisplay}</a>
                </div>
              </div>
              <div className="contact-card-row">
                <span className="contact-card-icon">
                  <Mail size={18} />
                </span>
                <div className="contact-card-copy">
                  <strong>E-posta</strong>
                  <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-section">
          <div className="container contact-section-grid">
            <div className="contact-detail">
              <h2>{lang === 'tr' ? 'Hangi başlıklarda destek veriyoruz?' : 'What can we help with?'}</h2>
              <ul>
                <li>{lang === 'tr' ? 'Kurumsal demo ve ürün sunumları' : 'Enterprise demos and product walkthroughs'}</li>
                <li>{lang === 'tr' ? 'Tekliflendirme ve kapsam toplantıları' : 'Quoting and discovery sessions'}</li>
                <li>{lang === 'tr' ? 'API, entegrasyon ve teknik değerlendirme' : 'API, integration, and technical assessments'}</li>
                <li>{lang === 'tr' ? 'İş ortaklığı ve tedarikçi ağı görüşmeleri' : 'Partnership and supplier network discussions'}</li>
              </ul>
            </div>

            <div className="contact-detail">
              <h2>{lang === 'tr' ? 'Hızlı yönlendirme' : 'Quick Routing'}</h2>
              <p>
                {lang === 'tr'
                  ? 'İlgili çözüm başlığını önceden incelemek, görüşmeyi daha doğru kapsamla başlatmamızı sağlar.'
                  : 'Reviewing the relevant solution topic first helps us start the conversation with the right scope.'}
              </p>
              <div className="contact-links">
                {quickLinks.map((link) => (
                  <Link key={link.href} to={link.href}>
                    <div>
                      <strong>{link.title}</strong>
                      <span>{link.description}</span>
                    </div>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
