import { Link } from 'react-router-dom';
import { ArrowLeft, LifeBuoy } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductSiteNotFound = () => {
  const { lang, localizePath } = useApp();

  return (
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
            <Link to={localizePath('/')} className="btn-primary">
              <ArrowLeft size={18} />
              {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSiteNotFound;
