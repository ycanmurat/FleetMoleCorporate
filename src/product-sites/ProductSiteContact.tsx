import { ArrowRight, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../data/company';
import { toAbsoluteUrl } from '../lib/i18n';
import { getCorporateSitePath } from './siteConfig';
import { useProductSite } from './ProductSiteContext';

export interface ContactFormSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  productSlug: string;
  date: string;
}

const ProductSiteContact = () => {
  const { lang } = useApp();
  const { product, content } = useProductSite();
  const corporatePath = getCorporateSitePath(lang);
  const productHomePath = getProductSitePath(product.slug, lang);
  const productContactPath = getProductSitePath(product.slug, lang, '/contact');
  const title = lang === 'tr' ? `${product.name} | İletişim` : `${product.name} | Contact`;
  const description = content.contact.lead[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    setTimeout(() => {
      const submission: ContactFormSubmission = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        productSlug: product.slug,
        date: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('fleetmole_contacts') || '[]');
      localStorage.setItem('fleetmole_contacts', JSON.stringify([submission, ...existing]));
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

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

              {status === 'success' ? (
                <div className="ps-contact-success glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem', borderRadius: 'var(--radius-lg)' }}>
                  <CheckCircle2 color="var(--success)" size={32} />
                  <h3>{lang === 'tr' ? 'Mesajınız Gönderildi' : 'Message Sent'}</h3>
                  <p>{lang === 'tr' ? 'En kısa sürede tarafınıza dönüş yapılacaktır.' : 'We will get back to you as soon as possible.'}</p>
                  <button className="btn-outline" onClick={() => setStatus('idle')} style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                    {lang === 'tr' ? 'Yeni Mesaj' : 'Send Another'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="ps-contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'tr' ? 'Adınız Soyadınız' : 'Full Name'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', background: 'var(--surface)', color: 'var(--text-base)' }}
                    />
                    <input
                      type="email"
                      required
                      placeholder={lang === 'tr' ? 'E-posta Adresiniz' : 'Email Address'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', background: 'var(--surface)', color: 'var(--text-base)' }}
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'tr' ? 'Konu' : 'Subject'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', background: 'var(--surface)', color: 'var(--text-base)' }}
                  />
                  <textarea
                    required
                    placeholder={lang === 'tr' ? 'Mesajınız...' : 'Your message...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', background: 'var(--surface)', color: 'var(--text-base)', minHeight: '120px', resize: 'vertical' }}
                  />
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={status === 'submitting'}
                    style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {status === 'submitting' 
                      ? (lang === 'tr' ? 'Gönderiliyor...' : 'Sending...') 
                      : (lang === 'tr' ? 'Mesajı Gönder' : 'Send Message')
                    }
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

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
