import { useEffect, type CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { getProductSiteUrl } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { getProductBySlug } from '../data/products';
import NotFoundPage from './NotFoundPage';
import './ProductPage.css';

const ProductPage = () => {
  const { productSlug } = useParams();
  const { lang } = useApp();
  const product = getProductBySlug(productSlug);

  if (!product) {
    return <NotFoundPage />;
  }

  const targetUrl = getProductSiteUrl(product.slug, lang);

  useEffect(() => {
    window.location.replace(targetUrl);
  }, [targetUrl]);

  return (
    <>
      <SeoHead
        title={product.seoTitle[lang]}
        description={product.seoDescription[lang]}
        pathname={`/${lang}/${product.slug}`}
        locale={lang}
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
            <div className="product-content">
              <div className="product-brand">
                <div>
                  <span className="product-badge">{product.category[lang]}</span>
                  <h1 className="product-title product-title--logo">
                    <span className="sr-only">{product.name}</span>
                    <ProductWordmark product={product} className="product-title-wordmark" height={72} alt="" />
                  </h1>
                </div>
              </div>

              <p className="product-desc">
                {lang === 'tr'
                  ? 'Bu ürün artık kendi ayrı websitesine yönleniyor.'
                  : 'This product now redirects to its dedicated website.'}
              </p>
              <p className="product-detail">
                {lang === 'tr'
                  ? 'Tarayıcınız otomatik olarak yeni siteye geçmezse aşağıdaki bağlantıyı kullanın.'
                  : 'If your browser does not continue automatically, use the link below.'}
              </p>

              <div className="product-actions">
                <a className="btn-primary" href={targetUrl}>
                  {lang === 'tr' ? 'Ürün Sitesine Git' : 'Open Product Site'} <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
