import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../../data/company';
import {
  FOOTER_CORPORATE_LINKS,
  FOOTER_FEATURE_LINKS,
  FOOTER_LEGAL_LINKS,
  getContentPage,
  getContentPath,
} from '../../data/navigation';
import './Footer.css';

const Footer = () => {
  const { t, localizePath, lang, isDark } = useApp();
  const corporateLogoSrc = `${import.meta.env.BASE_URL}${isDark ? 'logo-white.png' : 'logo-black.png'}`;

  const corporateLinks = FOOTER_CORPORATE_LINKS.flatMap((entry) => {
    const page = getContentPage(entry.section, entry.slug);
    return page ? [{ ...entry, page }] : [];
  });
  const featureLinks = FOOTER_FEATURE_LINKS.flatMap((entry) => {
    const page = getContentPage(entry.section, entry.slug);
    return page ? [{ ...entry, page }] : [];
  });
  const legalLinks = FOOTER_LEGAL_LINKS.flatMap((entry) => {
    const page = getContentPage(entry.section, entry.slug);
    return page ? [{ ...entry, page }] : [];
  });

  return (
    <footer className="site-footer">
      <div className="footer-spotlight">
        <div className="container footer-spotlight-inner">
          <div className="footer-spotlight-copy">
            <span className="footer-spotlight-chip">
              <Sparkles size={14} />
              {lang === 'tr' ? 'FleetMole Ekosistemi' : 'FleetMole Ecosystem'}
            </span>
            <h3>
              {lang === 'tr'
                ? 'Ürün, hizmet ve kiralama akışlarını tek kurumsal çerçevede takip edin.'
                : 'Track products, services, and leasing flows in one enterprise framework.'}
            </h3>
            <p>{t.footer.desc}</p>
          </div>

          <div className="footer-spotlight-card">
            <strong>{lang === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}</strong>
            <p>{getCompanyAddress(lang)}</p>
            <a href={`tel:${COMPANY_INFO.phoneHref}`}>{COMPANY_INFO.phoneDisplay}</a>
            <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
            <Link to={localizePath('/contact')} className="fcta-btn">
              {t.footer.contact} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img className="footer-logo-image" src={corporateLogoSrc} alt="FleetMole Corporate" />
            </div>
            <p className="footer-desc">{t.footer.desc}</p>
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
            <h4 className="footer-heading">{t.footer.features}</h4>
            <ul className="footer-links">
              {featureLinks.map(({ section, slug, page }) => (
                <li key={slug}>
                  <Link to={localizePath(getContentPath(section, slug))}>{page.title[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--support">
            <h4 className="footer-heading">{t.footer.support}</h4>
            <div className="footer-support-card">
              <strong>{lang === 'tr' ? 'Hızlı Ulaşım' : 'Quick Access'}</strong>
              <p>
                {lang === 'tr'
                  ? 'Demo, ürün kapsamı ve iş ortaklığı görüşmeleri için ekibimizle doğrudan iletişime geçin.'
                  : 'Reach the team directly for demos, product scope discussions, and partnership conversations.'}
              </p>
              <Link to={localizePath('/contact')} className="footer-support-link">
                {t.nav.contact} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="legal-links">
            {legalLinks.map(({ section, slug, page }) => (
              <Link key={slug} to={localizePath(getContentPath(section, slug))}>
                {page.title[lang]}
              </Link>
            ))}
          </div>
          <span>© {new Date().getFullYear()} FleetMole. {t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
