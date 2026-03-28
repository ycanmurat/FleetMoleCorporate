import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../data/company';
import '../components/Footer/Footer.css';
import { getCorporateSiteUrl } from './siteConfig';
import { useProductSite } from './ProductSiteContext';

const ProductSiteFooter = () => {
  const { product, content } = useProductSite();
  const { lang, localizePath } = useApp();
  const corporateUrl = getCorporateSiteUrl(lang);
  const sectionLinks = content.menu.filter((item) => item.href.startsWith('#')).slice(0, 4);

  return (
    <footer className="site-footer product-site-footer">
      <div className="footer-spotlight">
        <div className="container footer-spotlight-inner">
          <div className="footer-spotlight-copy">
            <span className="footer-spotlight-chip">
              <Sparkles size={14} />
              {product.name}
            </span>
            <h3>{content.impact.title[lang]}</h3>
            <p>{content.hero.lead[lang]}</p>
          </div>

          <div className="footer-spotlight-card">
            <strong>{lang === 'tr' ? 'Doğrudan Erişim' : 'Direct Access'}</strong>
            <p>{content.contact.lead[lang]}</p>
            <a href={`tel:${COMPANY_INFO.phoneHref}`}>{COMPANY_INFO.phoneDisplay}</a>
            <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
            <Link to={localizePath('/contact')} className="fcta-btn">
              {lang === 'tr' ? 'İletişime Geçin' : 'Get in Touch'} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <ProductWordmark product={product} className="footer-logo-image product-site-footer-wordmark" height={26} alt="" />
            </div>
            <p className="footer-desc">{product.summary[lang]}</p>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} />
                <span>{getCompanyAddress(lang)}</span>
              </li>
              <li>
                <Phone size={16} />
                <a href={`tel:${COMPANY_INFO.phoneHref}`}>{COMPANY_INFO.phoneDisplay}</a>
              </li>
              <li>
                <Mail size={16} />
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col--links">
            <h4 className="footer-heading">{lang === 'tr' ? 'Ürün Akışı' : 'Product Flow'}</h4>
            <ul className="footer-links">
              {sectionLinks.map((item) => (
                <li key={item.href}>
                  <a href={`${localizePath('/')}#${item.href.slice(1)}`}>{item.label[lang]}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--links">
            <h4 className="footer-heading">{lang === 'tr' ? 'Hızlı Geçiş' : 'Quick Links'}</h4>
            <ul className="footer-links">
              <li>
                <Link to={localizePath('/')}>{lang === 'tr' ? 'Ana Sayfa' : 'Home'}</Link>
              </li>
              <li>
                <Link to={localizePath('/contact')}>{lang === 'tr' ? 'İletişim' : 'Contact'}</Link>
              </li>
              <li>
                <a href={corporateUrl}>{lang === 'tr' ? 'Corporate Site' : 'Corporate Site'}</a>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col--support">
            <h4 className="footer-heading">{lang === 'tr' ? 'Ürün Notu' : 'Product Note'}</h4>
            <div className="footer-support-card">
              <strong>{content.contact.reasonsTitle[lang]}</strong>
              <p>{content.contact.response[lang]}</p>
              <Link to={localizePath('/contact')} className="footer-support-link">
                {lang === 'tr' ? 'Ürün ekibiyle konuşun' : 'Talk to the product team'} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="legal-links">
            <a href={corporateUrl}>{lang === 'tr' ? 'FleetMole Corporate' : 'FleetMole Corporate'}</a>
            <Link to={localizePath('/contact')}>{lang === 'tr' ? 'İletişim' : 'Contact'}</Link>
          </div>
          <span>© {new Date().getFullYear()} FleetMole. {lang === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}</span>
        </div>
      </div>
    </footer>
  );
};

export default ProductSiteFooter;
