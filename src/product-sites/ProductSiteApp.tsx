import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE, isLocale } from '../config/site';
import ProductSiteContact from './ProductSiteContact';
import ProductSiteHome from './ProductSiteHome';
import ProductSiteLayout from './ProductSiteLayout';
import ProductSiteNotFound from './ProductSiteNotFound';

const LocalizedSiteLayout = () => {
  const { locale } = useParams();

  if (!isLocale(locale)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  }

  return <ProductSiteLayout />;
};

const ProductSiteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />

      <Route path=":locale" element={<LocalizedSiteLayout />}>
        <Route index element={<ProductSiteHome />} />
        <Route path="contact" element={<ProductSiteContact />} />
        <Route path="*" element={<ProductSiteNotFound />} />
      </Route>

      <Route path="*" element={<ProductSiteNotFound />} />
    </Routes>
  );
};

export default ProductSiteApp;
