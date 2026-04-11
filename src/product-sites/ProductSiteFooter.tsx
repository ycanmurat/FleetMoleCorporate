import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import { getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../data/company';
import { getProductSiteLegalPages } from './legalContent';
import { getCorporateSitePath } from './siteConfig';
import { useProductSite } from './ProductSiteContext';

const ProductSiteFooter = () => {
  const { lang } = useApp();
  const { product, content } = useProductSite();
  const legalPages = getProductSiteLegalPages(product);
  const productHomePath = getProductSitePath(product.slug, lang);
  const corporatePath = getCorporateSitePath(lang);

  const resolveMenuHref = (href: string) =>
    href.startsWith('#')
      ? `${productHomePath}#${href.slice(1)}`
      : getProductSitePath(product.slug, lang, href);

  return (
    <footer className="product-site-footer">
      <div className="container product-site-footer-grid">
        <section className="product-site-footer-panel product-site-footer-panel--brand">
          <ProductWordmark
            product={product}
            className="product-site-footer-wordmark"
            height={32}
            alt={product.name}
          />
          <p>{product.summary[lang]}</p>
          <div className="product-site-footer-actions">
            <Link to={getProductSitePath(product.slug, lang, '/contact')} className="btn-primary">
              {lang === 'tr' ? 'Ürün Ekibiyle Görüşün' : 'Talk to the Product Team'}
            </Link>
            <Link to={corporatePath} className="btn-outline">
              {lang === 'tr' ? 'Kurumsal Site' : 'Corporate Site'}
            </Link>
          </div>
        </section>

        <section className="product-site-footer-panel">
          <h2>{lang === 'tr' ? 'Site Haritası' : 'Site Map'}</h2>
          <ul className="product-site-footer-links">
            <li>
              <Link to={productHomePath}>{lang === 'tr' ? 'Ana Sayfa' : 'Home'}</Link>
            </li>
            {content.menu.map((item) => (
              <li key={item.href}>
                {item.href.startsWith('#') ? (
                  <a href={resolveMenuHref(item.href)}>{item.label[lang]}</a>
                ) : (
                  <Link to={resolveMenuHref(item.href)}>{item.label[lang]}</Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="product-site-footer-panel">
          <h2>{lang === 'tr' ? 'Yasal Sayfalar' : 'Legal Pages'}</h2>
          <ul className="product-site-footer-links">
            {legalPages.map((page) => (
              <li key={page.slug}>
                <Link to={getProductSitePath(product.slug, lang, `/legal/${page.slug}`)}>{page.title[lang]}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="product-site-footer-panel">
          <h2>{lang === 'tr' ? 'İletişim' : 'Contact'}</h2>
          <div className="product-site-footer-contact">
            <span>
              <MapPin size={15} />
              {getCompanyAddress(lang)}
            </span>
            <a href={`tel:${COMPANY_INFO.phoneHref}`}>
              <Phone size={15} />
              {COMPANY_INFO.phoneDisplay}
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`}>
              <Mail size={15} />
              {COMPANY_INFO.email}
            </a>
          </div>
          <Link to={corporatePath} className="product-site-footer-backlink">
            {lang === 'tr' ? 'FleetMole kurumsal sayfasına dön' : 'Back to FleetMole corporate'}
            <ArrowUpRight size={14} />
          </Link>
        </section>
      </div>

      <div className="product-site-footer-bottom">
        <div className="container product-site-footer-bottom-inner">
          <span>© {new Date().getFullYear()} FleetMole</span>
          <span>{lang === 'tr' ? `${product.name} ürün sitesi` : `${product.name} product site`}</span>
        </div>
      </div>
    </footer>
  );
};

export default ProductSiteFooter;
