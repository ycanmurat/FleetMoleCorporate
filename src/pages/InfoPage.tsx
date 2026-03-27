import { type CSSProperties } from 'react';
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SeoHead from '../components/Seo/SeoHead';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import { COMPANY_NAME, SITE_URL } from '../config/site';
import { useApp } from '../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../data/company';
import {
  CONTENT_SECTION_MAP,
  getContentPage,
  getContentPath,
  type ContentSectionId,
} from '../data/navigation';
import { getProductBySlug } from '../data/products';
import NotFoundPage from './NotFoundPage';
import './InfoPage.css';

interface InfoPageProps {
  section: ContentSectionId;
}

const InfoPage = ({ section }: InfoPageProps) => {
  const { pageSlug } = useParams();
  const { lang, localizePath } = useApp();
  const sectionData = CONTENT_SECTION_MAP[section];
  const page = getContentPage(section, pageSlug);

  if (!page) {
    return <NotFoundPage />;
  }

  const accentStyle = {
    '--page-accent': sectionData.accent,
  } as CSSProperties;
  const relatedProducts = (page.relatedProducts ?? []).flatMap((slug) => {
    const product = getProductBySlug(slug);
    return product ? [product] : [];
  });
  const siblingLinks = sectionData.items.filter((item) => item.slug !== page.slug).slice(0, 4);
  const pageTitle = `${page.title[lang]} | ${COMPANY_NAME}`;
  const pageDescription = page.description[lang];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        pathname={localizePath(getContentPath(section, page.slug))}
        locale={lang}
        alternates={{
          tr: getContentPath(section, page.slug),
          en: getContentPath(section, page.slug),
          'x-default': getContentPath(section, page.slug),
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          url: `${SITE_URL}${localizePath(getContentPath(section, page.slug))}`,
          publisher: {
            '@type': 'Organization',
            name: COMPANY_NAME,
          },
        }}
      />

      <div className="info-page" style={accentStyle}>
        <section className="info-hero">
          <div className="container info-hero-grid">
            <div className="info-copy glass-panel">
              <div className="info-breadcrumbs">
                <Link to={localizePath('/')}>FleetMole</Link>
                <span>/</span>
                <span>{sectionData.label[lang]}</span>
              </div>

              <span className="info-chip">
                <Sparkles size={14} />
                {sectionData.eyebrow[lang]}
              </span>

              <h1>{page.title[lang]}</h1>
              <p className="info-lead">{page.description[lang]}</p>

              <div className="info-actions">
                <Link to={localizePath('/contact')} className="btn-primary">
                  {lang === 'tr' ? 'İletişime Geçin' : 'Talk to Us'} <ArrowRight size={18} />
                </Link>
                {relatedProducts[0] ? (
                  <Link to={localizePath(`/${relatedProducts[0].slug}`)} className="btn-outline">
                    {lang === 'tr' ? 'İlgili Ürünü İncele' : 'Explore Related Product'}
                  </Link>
                ) : null}
              </div>
            </div>

            <aside className="info-side glass-panel">
              <div className="info-side-block">
                <strong>{lang === 'tr' ? 'İletişim' : 'Contact'}</strong>
                <ul className="info-contact-list">
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

              <div className="info-side-block">
                <strong>{lang === 'tr' ? 'Bu sayfada' : 'On this page'}</strong>
                <div className="info-pill-list">
                  {page.highlights[lang].map((highlight) => (
                    <span key={highlight} className="info-pill">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="info-section">
          <div className="container info-grid">
            {page.highlights[lang].map((highlight, index) => (
              <article key={highlight} className="info-card glass-panel">
                <span className="info-card-index">{`0${index + 1}`}</span>
                <h2>{highlight}</h2>
                <p>
                  {lang === 'tr'
                    ? 'Bu başlık, operasyon akışının daha izlenebilir, daha hızlı ve daha ölçülebilir hale gelmesi için tasarlandı.'
                    : 'This area is designed to make the operating flow more traceable, faster, and easier to measure.'}
                </p>
              </article>
            ))}
          </div>
        </section>

        {relatedProducts.length ? (
          <section className="info-section info-section--related">
            <div className="container">
              <div className="info-section-head">
                <h2>{lang === 'tr' ? 'İlgili Ürünler' : 'Related Products'}</h2>
                <p>
                  {lang === 'tr'
                    ? 'Bu başlık, FleetMole ürün ekosistemindeki ilgili katmanlarla birlikte çalışacak şekilde kurgulanır.'
                    : 'This topic is designed to work together with the relevant layers in the FleetMole product ecosystem.'}
                </p>
              </div>

              <div className="info-related-products">
                {relatedProducts.map((product) => (
                  <Link key={product.slug} to={localizePath(`/${product.slug}`)} className="info-product-link glass-panel">
                    <ProductWordmark product={product} className="info-product-wordmark" height={28} alt="" />
                    <div>
                      <strong className="sr-only">{product.name}</strong>
                      <span>{product.category[lang]}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {siblingLinks.length ? (
          <section className="info-section info-section--siblings">
            <div className="container">
              <div className="info-section-head">
                <h2>{lang === 'tr' ? 'Diğer Başlıklar' : 'Other Topics'}</h2>
                <p>{sectionData.title[lang]}</p>
              </div>

              <div className="info-sibling-links">
                {siblingLinks.map((item) => (
                  <Link
                    key={item.slug}
                    to={localizePath(getContentPath(section, item.slug))}
                    className="info-sibling-link glass-panel"
                  >
                    <item.icon size={18} />
                    <div>
                      <strong>{item.title[lang]}</strong>
                      <span>{item.description[lang]}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default InfoPage;
