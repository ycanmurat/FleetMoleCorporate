import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import ProductSiteLink from '../ProductSiteLink/ProductSiteLink';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../../data/company';
import { getLegalDocument, getLocalizedLegalValue } from '../../data/legalContent';
import {
  FOOTER_CORPORATE_LINKS,
  FOOTER_LEGAL_LINKS,
  getContentPage,
  getContentPath,
} from '../../data/navigation';
import { PRODUCTS } from '../../data/products';
import './Footer.css';

const Footer = () => {
  const { t, localizePath, lang, isDark } = useApp();
  const corporateLogoSrc = `${import.meta.env.BASE_URL}${isDark ? 'logo-white.png' : 'logo-black.png'}`;

  const corporateLinks = FOOTER_CORPORATE_LINKS.flatMap((entry) => {
    const page = getContentPage(entry.section, entry.slug);
    return page ? [{ ...entry, page }] : [];
  });
  const legalLinks = FOOTER_LEGAL_LINKS.flatMap((entry) => {
    const page = getContentPage(entry.section, entry.slug);
    const legalDocument = getLegalDocument(entry.slug);
    return page ? [{ ...entry, page, legalDocument }] : [];
  });

  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-top">
          <div className="footer-brand-block">
            <div className="footer-logo">
              <img className="footer-logo-image" src={corporateLogoSrc} alt="FleetMole Corporate" />
            </div>
            <p className="footer-desc">{t.footer.desc}</p>
          </div>

          <div className="footer-contact-block">
            <h4 className="footer-heading">{lang === 'tr' ? 'İletişim' : 'Contact'}</h4>
            <div className="footer-contact-list">
              <span className="footer-contact-item">
                <MapPin size={15} />
                <span>{getCompanyAddress(lang)}</span>
              </span>
              <a className="footer-contact-item" href={`tel:${COMPANY_INFO.phoneHref}`}>
                <Phone size={15} />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>
              <a className="footer-contact-item" href={`mailto:${COMPANY_INFO.email}`}>
                <Mail size={15} />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
            <Link to={localizePath('/contact')} className="footer-inline-cta">
              {t.footer.contact} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="footer-body">
          <div className="footer-grid">
          <div className="footer-col brand-col">
            <h4 className="footer-heading">{lang === 'tr' ? 'Kurumsal Çerçeve' : 'Enterprise Frame'}</h4>
            <p className="footer-note">
              {lang === 'tr'
                ? 'Ürün, operasyon ve kiralama akışlarını tek marka mimarisinde birleştiren kurumsal yapı.'
                : 'An enterprise layer that keeps product, operations, and leasing flows aligned under one brand system.'}
            </p>
          </div>

          <div className="footer-col footer-col--links">
            <h4 className="footer-heading">{t.footer.corporate}</h4>
            <ul className="footer-links">
              {corporateLinks.map(({ section, slug, page }) => (
                <li key={slug}>
                  <Link to={localizePath(getContentPath(section, slug))}>{page.title[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--links">
            <h4 className="footer-heading">{t.footer.solutions}</h4>
            <ul className="footer-links">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <ProductSiteLink productSlug={product.slug}>{product.name}</ProductSiteLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--links">
            <h4 className="footer-heading">{t.footer.support}</h4>
            <ul className="footer-links footer-links--support">
              <li>
                <Link to={localizePath('/contact')}>{t.nav.contact}</Link>
              </li>
              <li>
                <a href={`tel:${COMPANY_INFO.phoneHref}`}>{COMPANY_INFO.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
              </li>
            </ul>
          </div>
        </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
          <div className="legal-links">
            {legalLinks.map(({ section, slug, page, legalDocument }) => (
              <Link key={slug} to={localizePath(getContentPath(section, slug))}>
                {legalDocument?.footerLabel ? getLocalizedLegalValue(legalDocument.footerLabel, lang) : page.title[lang]}
              </Link>
            ))}
          </div>
          <span>© {new Date().getFullYear()} FleetMole. {t.footer.copyright}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
