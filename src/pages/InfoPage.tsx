import { type CSSProperties } from 'react';
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  Car,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ProductSiteLink from '../components/ProductSiteLink/ProductSiteLink';
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
import { getServicePageDetail, type ServiceDetailCard, type ServiceDetailSignal } from '../data/servicesContent';
import NotFoundPage from './NotFoundPage';
import './InfoPage.css';

interface InfoPageProps {
  section: ContentSectionId;
}

const SERVICE_SIGNAL_ICONS = [ShieldCheck, ArrowRightLeft, Car] as const;
const SERVICE_SPOTLIGHT_ICONS = [FileText, Wrench, BarChart3] as const;
const SERVICE_JOURNEY_ICONS = [FileText, CheckCircle2, Wrench, BarChart3] as const;

const InfoPage = ({ section }: InfoPageProps) => {
  const { pageSlug } = useParams();
  const { lang, localizePath } = useApp();
  const sectionData = CONTENT_SECTION_MAP[section];
  const page = getContentPage(section, pageSlug);
  const isServicePage = section === 'services';

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
  const serviceDetail = section === 'services' ? getServicePageDetail(page.slug) : undefined;
  const heroLead = serviceDetail?.heroLead?.[lang] ?? page.description[lang];
  const heroBody = serviceDetail?.heroBody?.[lang];
  const introParagraphs: string[] = serviceDetail?.intro[lang] ?? [];
  const signalSectionTitle = serviceDetail?.signalsTitle?.[lang];
  const signalSectionDescription = serviceDetail?.signalsDescription?.[lang];
  const serviceSignals: ServiceDetailSignal[] = serviceDetail?.signals ?? [];
  const spotlightTitle = serviceDetail?.spotlightTitle?.[lang];
  const spotlightDescription = serviceDetail?.spotlightDescription?.[lang];
  const spotlightCards: ServiceDetailCard[] = serviceDetail?.spotlightCards ?? [];
  const journeyTitle = serviceDetail?.journeyTitle?.[lang];
  const journeyDescription = serviceDetail?.journeyDescription?.[lang];
  const journeyCards: ServiceDetailCard[] = serviceDetail?.journey ?? [];
  const commandTitle = serviceDetail?.commandTitle?.[lang];
  const commandBody = serviceDetail?.commandBody?.[lang];
  const commandPoints: string[] = serviceDetail?.commandPoints?.[lang] ?? [];
  const commandProducts = (serviceDetail?.commandProducts ?? []).flatMap((slug) => {
    const product = getProductBySlug(slug);
    return product ? [product] : [];
  });
  const detailCards: ServiceDetailCard[] =
    serviceDetail?.cards ??
    page.highlights[lang].map((highlight: string) => ({
      title: { tr: highlight, en: highlight },
      body: {
        tr: 'Bu başlık, operasyon akışını daha izlenebilir, hızlı ve ölçülebilir hale getirecek şekilde yapılandırılır.',
        en: 'This layer is structured to make the operation more traceable, faster, and easier to measure.',
      },
    }));
  const detailSectionTitle =
    serviceDetail?.cardsTitle[lang] ?? (lang === 'tr' ? 'Hizmet Kapsamı' : 'Service Scope');
  const detailSectionDescription = serviceDetail?.cardsDescription[lang] ?? page.description[lang];
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

      <div className={`info-page ${isServicePage ? 'info-page--services' : ''}`} style={accentStyle}>
        <section className="info-hero">
          <div className="container info-hero-grid">
            <div className="info-copy glass-panel">
              <div className="info-breadcrumbs">
                <Link to={localizePath('/')}>FleetMole</Link>
                <span>/</span>
                {section === 'services' ? (
                  <Link to={localizePath('/services')}>{sectionData.label[lang]}</Link>
                ) : (
                  <span>{sectionData.label[lang]}</span>
                )}
                <span>/</span>
                <span>{page.title[lang]}</span>
              </div>

              <span className="info-chip">
                <Sparkles size={14} />
                {sectionData.eyebrow[lang]}
              </span>

              <h1>{page.title[lang]}</h1>
              <p className="info-lead">{heroLead}</p>
              {heroBody ? <p className="info-body">{heroBody}</p> : null}

              <div className="info-actions">
                <Link to={localizePath('/contact')} className="btn-primary">
                  {lang === 'tr' ? 'İletişime Geçin' : 'Talk to Us'} <ArrowRight size={18} />
                </Link>
                {relatedProducts[0] ? (
                  <ProductSiteLink productSlug={relatedProducts[0].slug} className="btn-outline">
                    {lang === 'tr' ? 'İlgili Ürünü İncele' : 'Explore Related Product'}
                  </ProductSiteLink>
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

        {serviceSignals.length ? (
          <section className="info-section info-section--signals">
            <div className="container">
              <div className="info-section-head">
                <h2>{signalSectionTitle}</h2>
                <p>{signalSectionDescription}</p>
              </div>

              <div className="info-signal-grid">
                {serviceSignals.map((signal: ServiceDetailSignal, index: number) => {
                  const Icon = SERVICE_SIGNAL_ICONS[index % SERVICE_SIGNAL_ICONS.length];

                  return (
                    <article key={signal.value[lang]} className="info-signal-card glass-panel">
                      <span className="info-signal-icon">
                        <Icon size={18} />
                      </span>
                      <strong>{signal.value[lang]}</strong>
                      <p>{signal.label[lang]}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {introParagraphs.length ? (
          <section className="info-section info-section--story">
            <div className="container">
              <div className="info-section-head">
                <h2>{lang === 'tr' ? 'Genel Çerçeve' : 'Overview'}</h2>
                <p>
                  {lang === 'tr'
                    ? 'Bu sayfadaki açıklamalar, resmi FleetMole hizmet kapsamı temel alınarak kurumsal operasyon diliyle zenginleştirildi.'
                    : 'The explanations on this page are enriched in an enterprise operations language based on the official FleetMole service scope.'}
                </p>
              </div>

              <article className="info-story-card glass-panel">
                {introParagraphs.map((paragraph: string) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            </div>
          </section>
        ) : null}

        {spotlightCards.length ? (
          <section className="info-section info-section--spotlight">
            <div className="container">
              <div className="info-section-head">
                <h2>{spotlightTitle}</h2>
                <p>{spotlightDescription}</p>
              </div>

              <div className="info-spotlight-grid">
                {spotlightCards.map((card: ServiceDetailCard, index: number) => {
                  const Icon = SERVICE_SPOTLIGHT_ICONS[index % SERVICE_SPOTLIGHT_ICONS.length];

                  return (
                    <article key={card.title[lang]} className="info-spotlight-card glass-panel">
                      <span className="info-spotlight-icon">
                        <Icon size={18} />
                      </span>
                      <h3>{card.title[lang]}</h3>
                      <p>{card.body[lang]}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {journeyCards.length ? (
          <section className="info-section info-section--journey">
            <div className="container">
              <div className="info-section-head">
                <h2>{journeyTitle}</h2>
                <p>{journeyDescription}</p>
              </div>

              <div className="info-journey-grid">
                {journeyCards.map((step: ServiceDetailCard, index: number) => {
                  const Icon = SERVICE_JOURNEY_ICONS[index % SERVICE_JOURNEY_ICONS.length];

                  return (
                    <article key={step.title[lang]} className="info-journey-step glass-panel">
                      <div className="info-journey-head">
                        <span className="info-journey-icon">
                          <Icon size={18} />
                        </span>
                        <span className="info-journey-index">{`0${index + 1}`}</span>
                      </div>
                      <h3>{step.title[lang]}</h3>
                      <p>{step.body[lang]}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        <section className="info-section info-section--details">
          <div className="container">
            <div className="info-section-head">
              <h2>{detailSectionTitle}</h2>
              <p>{detailSectionDescription}</p>
            </div>

            <div className="info-grid">
              {detailCards.map((card: ServiceDetailCard, index: number) => (
                <article key={card.title[lang]} className="info-card glass-panel">
                  <span className="info-card-index">{`0${index + 1}`}</span>
                  <h2>{card.title[lang]}</h2>
                  <p>{card.body[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {commandTitle && (commandPoints.length || commandProducts.length) ? (
          <section className="info-section info-section--command">
            <div className="container">
              <div className="info-command glass-panel">
                <div className="info-command-copy">
                  <span className="info-command-chip">{lang === 'tr' ? 'Operasyon Komuta Katmanı' : 'Operations Command Layer'}</span>
                  <h2>{commandTitle}</h2>
                  {commandBody ? <p>{commandBody}</p> : null}
                </div>

                <div className="info-command-side">
                  {commandPoints.length ? (
                    <div className="info-command-points">
                      {commandPoints.map((point) => (
                        <article key={point} className="info-command-point">
                          <CheckCircle2 size={18} />
                          <span>{point}</span>
                        </article>
                      ))}
                    </div>
                  ) : null}

                  {commandProducts.length ? (
                    <div className="info-command-products">
                      {commandProducts.map((product) => (
                        <ProductSiteLink
                          key={product.slug}
                          productSlug={product.slug}
                          className="info-command-product"
                        >
                          <ProductWordmark product={product} className="info-command-wordmark" height={30} alt="" />
                          <span>{product.category[lang]}</span>
                        </ProductSiteLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}

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
                  <ProductSiteLink key={product.slug} productSlug={product.slug} className="info-product-link glass-panel">
                    <ProductWordmark product={product} className="info-product-wordmark" height={28} alt="" />
                    <div>
                      <strong className="sr-only">{product.name}</strong>
                      <span>{product.category[lang]}</span>
                    </div>
                  </ProductSiteLink>
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
