import { Link } from 'react-router-dom';
import { ArrowLeft, LifeBuoy } from 'lucide-react';
import SeoHead from '../components/Seo/SeoHead';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { useProductSite } from './ProductSiteContext';
import { useProductSitePathMode } from './ProductSiteRuntimeContext';

const ProductSiteNotFound = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const pathMode = useProductSitePathMode();
  const productHomePath = getProductSitePath(product.slug, lang, '/', pathMode);

  return (
    <>
      <SeoHead
        title={lang === 'tr' ? `Sayfa Bulunamadı | ${product.name}` : `Page Not Found | ${product.name}`}
        description={
          lang === 'tr'
            ? 'İstediğiniz ürün sayfası bulunamadı. Ürün ana sayfasına geri dönebilirsiniz.'
            : 'The requested product page could not be found. Return to the product homepage.'
        }
        pathname={getProductSitePath(product.slug, lang, '/404', pathMode)}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
        robots="noindex,nofollow"
      />

      <div className="product-site-page">
        <section className="ps-not-found">
          <div className="container">
            <div className="ps-not-found-card glass-panel">
              <span className="ps-chip">
                <LifeBuoy size={14} />
                404
              </span>
              <h1>{lang === 'tr' ? 'Aradığınız sayfa bulunamadı.' : 'The page you are looking for could not be found.'}</h1>
              <p>
                {lang === 'tr'
                  ? 'Ürün ana sayfasına dönüp akışa oradan devam edin.'
                  : 'Return to the product homepage and continue from there.'}
              </p>
              <Link to={productHomePath} className="btn-primary">
                <ArrowLeft size={18} />
                {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductSiteNotFound;
