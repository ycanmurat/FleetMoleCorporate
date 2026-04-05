import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductMark from '../components/ProductMark/ProductMark';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { toAbsoluteUrl } from '../lib/i18n';
import { useProductSite } from './ProductSiteContext';

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.54, ease: 'easeOut' as const } },
};

const ProductSiteHome = () => {
  const { lang } = useApp();
  const { product, content } = useProductSite();
  const title = product.seoTitle[lang];
  const description = content.hero.lead[lang];
  const heroTitle = content.hero.title[lang];
  const productHomePath = getProductSitePath(product.slug, lang);
  const productContactPath = getProductSitePath(product.slug, lang, '/contact');

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        pathname={productHomePath}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
        alternates={{
          tr: getProductSitePath(product.slug, 'tr'),
          en: getProductSitePath(product.slug, 'en'),
          'x-default': getProductSitePath(product.slug, 'tr'),
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: product.name,
          applicationCategory: product.category[lang],
          description,
          operatingSystem: 'Web',
          url: toAbsoluteUrl(productHomePath),
        }}
        themeColor={product.theme.primary}
      />

      <div className="product-site-page">
        <section className="ps-hero">
          <div className="container ps-hero-grid">
            <motion.div className="ps-hero-copy" initial="hidden" animate="show" variants={reveal}>
              <span className="ps-chip">{content.hero.eyebrow[lang]}</span>
              <h1 className="ps-hero-title">
                {heroTitle.map((line, index) => (
                  <span key={line} className="ps-hero-title-line">
                    <span className={index === 1 ? 'ps-hero-title-accent' : undefined}>{line}</span>
                  </span>
                ))}
              </h1>
              <p className="ps-hero-lead">{content.hero.lead[lang]}</p>

              <div className="ps-hero-actions">
                <Link to={productContactPath} className="btn-primary">
                  {content.hero.primaryCta[lang]} <ArrowRight size={18} />
                </Link>
                <a href={`${productHomePath}#overview`} className="btn-outline">
                  {content.hero.secondaryCta[lang]}
                </a>
              </div>

              <div className="ps-metric-grid">
                {content.hero.snapshotItems.map((item) => (
                  <article key={item.value + item.label[lang]} className="ps-metric-card">
                    <strong>{item.value}</strong>
                    <span>{item.label[lang]}</span>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.aside
              className="ps-hero-panel glass-panel"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="ps-hero-panel-top">
                <ProductWordmark product={product} height={36} alt="" className="ps-hero-panel-wordmark" />
                <span>{content.hero.snapshotLabel[lang]}</span>
              </div>

              <div className="ps-hero-panel-main">
                <div className="ps-hero-panel-tag">
                  <ProductMark product={product} size={50} />
                  <div>
                    <strong>{product.shortName}</strong>
                    <small>{product.category[lang]}</small>
                  </div>
                </div>

                <p>{content.hero.snapshotBody[lang]}</p>

                <div className="ps-snapshot-list">
                  {product.benefits[lang].map((benefit) => (
                    <div key={benefit} className="ps-snapshot-item">
                      <CheckCircle2 size={16} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="overview" className="ps-section">
          <div className="container">
            <div className="ps-section-head">
              <span>{content.overview.eyebrow[lang]}</span>
              <h2>{content.overview.title[lang]}</h2>
              <p>{content.overview.body[lang]}</p>
            </div>

            <div className="ps-card-grid">
              {content.overview.cards.map((item, index) => (
                <motion.article
                  key={item.title[lang]}
                  className="ps-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  {item.badge ? <span className="ps-card-badge">{item.badge[lang]}</span> : null}
                  <h3>{item.title[lang]}</h3>
                  <p>{item.body[lang]}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="ps-section ps-section--soft">
          <div className="container">
            <div className="ps-section-head">
              <span>{content.modules.eyebrow[lang]}</span>
              <h2>{content.modules.title[lang]}</h2>
              <p>{content.modules.body[lang]}</p>
            </div>

            <div className="ps-module-grid">
              {product.features.map((feature, index) => (
                <motion.article
                  key={feature.title[lang]}
                  className="ps-module-card glass-panel"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span className="ps-module-index">{`0${index + 1}`}</span>
                  <h3>{feature.title[lang]}</h3>
                  <p>{feature.description[lang]}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {content.workflow && (
          <section id="workflow" className="ps-section">
            <div className="container">
              <div className="ps-section-head">
                <span>{content.workflow.eyebrow[lang]}</span>
                <h2>{content.workflow.title[lang]}</h2>
                <p>{content.workflow.body[lang]}</p>
              </div>

              <div className="ps-workflow-grid">
                {content.workflow.cards.map((item, index) => (
                  <motion.article
                    key={item.title[lang]}
                    className="ps-workflow-card"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span className="ps-workflow-index">{`0${index + 1}`}</span>
                    <h3>{item.title[lang]}</h3>
                    <p>{item.body[lang]}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {content.impact && (
          <section id="impact" className="ps-section ps-section--impact">
            <div className="container ps-impact-grid">
              <div>
                <div className="ps-section-head ps-section-head--left">
                  <span>{content.impact.eyebrow[lang]}</span>
                  <h2>{content.impact.title[lang]}</h2>
                  <p>{content.impact.body[lang]}</p>
                </div>

                <div className="ps-card-grid ps-card-grid--impact">
                  {content.impact.cards.map((item, index) => (
                    <motion.article
                      key={item.title[lang]}
                      className="ps-card"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 }}
                    >
                      {item.badge ? <span className="ps-card-badge">{item.badge[lang]}</span> : null}
                      <h3>{item.title[lang]}</h3>
                      <p>{item.body[lang]}</p>
                    </motion.article>
                  ))}
                </div>
              </div>

              <aside className="ps-impact-panel glass-panel">
                <strong>{product.name}</strong>
                <p>{product.detail[lang]}</p>
                <div className="ps-impact-benefits">
                  {product.benefits[lang].map((benefit) => (
                    <div key={benefit} className="ps-impact-benefit">
                      <CheckCircle2 size={16} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="ps-impact-actions">
                  <Link to={productContactPath} className="btn-primary">
                    {lang === 'tr' ? 'Ürün ekibiyle konuşun' : 'Talk to the product team'} <ArrowRight size={18} />
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ProductSiteHome;
