import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE, isLocale } from '../config/site';
import ProductSiteContact from './ProductSiteContact';
import ProductSiteHome from './ProductSiteHome';
import ProductSiteLayout from './ProductSiteLayout';
import ProductSiteNotFound from './ProductSiteNotFound';
import ProductSiteProducts from './ProductSiteProducts';
import ProductSiteProductDetail from './ProductSiteProductDetail';
import ProductSiteCompare from './ProductSiteCompare';
import ProductSiteContactsAdmin from './ProductSiteContactsAdmin';
import ProductSiteDemo from './ProductSiteDemo';
import ProductSiteAuthPage from './ProductSiteAuthPage';
import ProductSiteLegalPage from './ProductSiteLegalPage';

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
        <Route path="login" element={<ProductSiteAuthPage mode="login" />} />
        <Route path="register" element={<ProductSiteAuthPage mode="register" />} />
        <Route path="forgot-password" element={<ProductSiteAuthPage mode="forgotPassword" />} />
        <Route path="contact" element={<ProductSiteContact />} />
        <Route path="products" element={<ProductSiteProducts />} />
        <Route path="products/compare" element={<ProductSiteCompare />} />
        <Route path="products/:productId" element={<ProductSiteProductDetail />} />
        <Route path="demo" element={<ProductSiteDemo />} />
        <Route path="legal/:pageSlug" element={<ProductSiteLegalPage />} />
        <Route path="admin/contacts" element={<ProductSiteContactsAdmin />} />
        <Route path="*" element={<ProductSiteNotFound />} />
      </Route>

      <Route path="*" element={<ProductSiteNotFound />} />
    </Routes>
  );
};

export default ProductSiteApp;
