import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactInquiryForm from '../components/ContactInquiryForm/ContactInquiryForm';
import ProductSiteLink from '../components/ProductSiteLink/ProductSiteLink';
import SeoHead from '../components/Seo/SeoHead';
import { SITE_URL } from '../config/site';
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

  const productOptions = [
    {
      label: lang === 'tr' ? 'Kurumsal Genel' : 'Corporate General',
      value: 'corporate',
    },
    ...PRODUCTS.map((product) => ({
      label: product.name,
      value: product.slug,
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
        }}
      />

      <div className="contact-page">
        <section className="contact-hero">
          <div className="container contact-hero-grid">
            <div className="contact-copy">
              <span className="contact-chip">{lang === 'tr' ? 'Kurumsal İletişim' : 'Corporate Contact'}</span>
              <h1>{lang === 'tr' ? 'Doğru ekibe, doğru kapsamla bağlanın.' : 'Reach the right team with the right scope.'}</h1>
              <p>
                {lang === 'tr'
                  ? 'Satış, demo planlama, entegrasyon, tedarikçi ağı veya kurumsal iş birlikleri için talebinizi konu ve ürün bağlamıyla iletin. Ekibimiz dönüşü hızlandıracak şekilde talepleri ilgili masa ile eşleştirir.'
                  : 'Share your request with the relevant product and topic context for sales, demos, integrations, supplier network discussions, or enterprise partnerships. The team routes each inquiry to the right desk.'}
              </p>

              <div className="contact-action-shell">
                <div className="contact-actions">
                  <a className="btn-primary contact-btn contact-btn--primary" href={`mailto:${COMPANY_INFO.email}`}>
                    <Mail size={18} />
                    {lang === 'tr' ? 'Mail Gönder' : 'Send Email'}
                  </a>
                  <a className="btn-outline contact-btn contact-btn--secondary" href={`tel:${COMPANY_INFO.phoneHref}`}>
                    <Phone size={18} />
                    {lang === 'tr' ? 'Hemen Ara' : 'Call Now'}
                  </a>
                </div>

                <div className="contact-action-meta">
                  <span>{lang === 'tr' ? 'Merkezi İletişim' : 'Central Contact'}</span>
                  <strong>{lang === 'tr' ? 'Tüm talepler tek operasyon akışında toplanır.' : 'All inquiries are collected in one operational stream.'}</strong>
                </div>
              </div>

              <div className="contact-channel-list">
                <div className="contact-channel-card">
                  <MapPin size={18} />
                  <div>
                    <strong>{lang === 'tr' ? 'Ofis' : 'Office'}</strong>
                    <span>{getCompanyAddress(lang)}</span>
                  </div>
                </div>
                <div className="contact-channel-card">
                  <Phone size={18} />
                  <div>
                    <strong>{lang === 'tr' ? 'Telefon' : 'Phone'}</strong>
                    <a href={`tel:${COMPANY_INFO.phoneHref}`}>{COMPANY_INFO.phoneDisplay}</a>
                  </div>
                </div>
                <div className="contact-channel-card">
                  <Mail size={18} />
                  <div>
                    <strong>{lang === 'tr' ? 'E-Posta' : 'Email'}</strong>
                    <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <ContactInquiryForm
              accentColor="#203A74"
              defaultProduct="corporate"
              productOptions={productOptions}
              siteScope="corporate"
              title={lang === 'tr' ? 'Talep Formu' : 'Inquiry Form'}
              lead={
                lang === 'tr'
                  ? 'Konu ve ürün seçimiyle başlayan talepler doğru ekipte daha hızlı açılır.'
                  : 'Requests that start with a topic and product selection are routed to the right team faster.'
              }
              variant="corporate"
            />
          </div>
        </section>

        <section className="contact-section">
          <div className="container contact-section-grid">
            <article className="contact-detail">
              <span className="contact-detail-kicker">{lang === 'tr' ? 'Hızlı Yönlendirme' : 'Quick Routing'}</span>
              <h2>{lang === 'tr' ? 'Görüşme öncesi doğru akışı seçin.' : 'Pick the right stream before the meeting.'}</h2>
              <p>
                {lang === 'tr'
                  ? 'Ön inceleme yapmak, ilk görüşmenin kapsamını daraltır ve süreci daha verimli başlatır.'
                  : 'A quick review helps narrow the first conversation and starts the process more efficiently.'}
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
            </article>

            <article className="contact-detail">
              <span className="contact-detail-kicker">{lang === 'tr' ? 'Ürün Kısayolları' : 'Product Shortcuts'}</span>
              <h2>{lang === 'tr' ? 'Doğrudan ürün ekiplerine geçin.' : 'Jump straight to product teams.'}</h2>
              <p>
                {lang === 'tr'
                  ? 'Belirli bir ürün başlığı zaten netse doğrudan ilgili ürün sitesine geçip detaylı sayfaları inceleyebilirsiniz.'
                  : 'If the product scope is already clear, you can go directly to the relevant product site and review its detailed pages.'}
              </p>
              <div className="contact-product-links">
                {PRODUCTS.map((product) => (
                  <ProductSiteLink key={product.slug} productSlug={product.slug} className="contact-product-link">
                    <strong>{product.shortName}</strong>
                    <span>{product.summary[lang]}</span>
                  </ProductSiteLink>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
