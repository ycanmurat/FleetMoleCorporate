import type { CSSProperties } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { getProductBySlug } from '../data/products';
import { useApp } from '../context/AppContext';
import NotFoundPage from './NotFoundPage';
import './ProductPage.css';

const ProductPage = () => {
  const { productSlug } = useParams();
  const { lang, localizePath } = useApp();
  const product = getProductBySlug(productSlug);

  if (!product) {
    return <NotFoundPage />;
  }

  const pathname = localizePath(`/${product.slug}`);

  return (
    <>
      <SeoHead
        title={product.seoTitle[lang]}
        description={product.seoDescription[lang]}
        pathname={pathname}
        locale={lang}
        alternates={{
          tr: `/tr/${product.slug}`,
          en: `/en/${product.slug}`,
          'x-default': `/tr/${product.slug}`,
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: product.name,
          applicationCategory: product.category[lang],
          description: product.seoDescription[lang],
          operatingSystem: 'Web',
        }}
        themeColor={product.theme.primary}
      />

      <div
        className="product-wrapper"
        style={
          {
            '--product-primary': product.theme.primary,
            '--product-secondary': product.theme.secondary,
            '--product-soft': product.theme.soft,
            '--primary': product.theme.primary,
            '--secondary': product.theme.secondary,
            '--primary-glow': product.theme.soft,
          } as CSSProperties
        }
      >
        <section className="product-hero">
          <div className="container product-hero-container">
            <motion.div
              className="product-content"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="product-brand">
                <div>
                  <span className="product-badge">{product.category[lang]}</span>
                  <h1 className="product-title product-title--logo">
                    <span className="sr-only">{product.name}</span>
                    <ProductWordmark product={product} className="product-title-wordmark" height={72} alt="" />
                  </h1>
                </div>
              </div>

              <p className="product-desc">{product.description[lang]}</p>
              <p className="product-detail">{product.detail[lang]}</p>

              <ul className="product-benefits">
                {product.benefits[lang].map((benefit) => (
                  <li key={benefit}>
                    <CheckCircle2 size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="product-actions">
                <Link className="btn-primary" to={localizePath('/contact')}>
                  {lang === 'tr' ? 'Ürün Sunumu Talep Edin' : 'Request a Product Walkthrough'} <ArrowRight size={18} />
                </Link>
                <Link className="btn-outline" to={localizePath('/')}>
                  {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Homepage'}
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="product-visual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <div className="product-visual-panel">
                <div className="product-visual-head">
                  <div className="product-visual-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <strong>{product.shortName}</strong>
                </div>
                <div className="product-visual-stack">
                  {product.features.map((feature) => (
                    <article key={feature.title[lang]} className="product-visual-card">
                      <h3>{feature.title[lang]}</h3>
                      <p>{feature.description[lang]}</p>
                    </article>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="product-details">
          <div className="container product-details-grid">
            {product.features.map((feature, index) => (
              <motion.article
                key={feature.title[lang]}
                className="product-detail-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <span className="detail-index">0{index + 1}</span>
                <h2>{feature.title[lang]}</h2>
                <p>{feature.description[lang]}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
