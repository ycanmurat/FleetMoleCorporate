import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { DEFAULT_LOCALE, isLocale } from './config/site';
import ContactPage from './pages/ContactPage';
import Home from './pages/Home';
import InfoPage from './pages/InfoPage';
import NotFoundPage from './pages/NotFoundPage';
import ServicesLandingPage from './pages/ServicesLandingPage';
import ProductSiteContact from './product-sites/ProductSiteContact';
import ProductSiteHome from './product-sites/ProductSiteHome';
import ProductSiteNotFound from './product-sites/ProductSiteNotFound';
import ProductSiteRoute from './product-sites/ProductSiteRoute';
import ProductSiteProducts from './product-sites/ProductSiteProducts';
import ProductSiteProductDetail from './product-sites/ProductSiteProductDetail';
import ProductSiteCompare from './product-sites/ProductSiteCompare';
import ProductSiteDemo from './product-sites/ProductSiteDemo';
import ProductSiteContactsAdmin from './product-sites/ProductSiteContactsAdmin';

const LocalizedOutlet = () => {
  const { locale } = useParams();

  if (!isLocale(locale)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />

      <Route path=":locale" element={<LocalizedOutlet />}>
        <Route path=":productSlug" element={<ProductSiteRoute />}>
          <Route index element={<ProductSiteHome />} />
          <Route path="contact" element={<ProductSiteContact />} />
          <Route path="products" element={<ProductSiteProducts />} />
          <Route path="products/compare" element={<ProductSiteCompare />} />
          <Route path="products/:productId" element={<ProductSiteProductDetail />} />
          <Route path="demo" element={<ProductSiteDemo />} />
          <Route path="admin/contacts" element={<ProductSiteContactsAdmin />} />
          <Route path="*" element={<ProductSiteNotFound />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="services" element={<ServicesLandingPage />} />
          <Route path="services/:pageSlug" element={<InfoPage section="services" />} />
          <Route path="leasing/:pageSlug" element={<InfoPage section="leasing" />} />
          <Route path="resources/:pageSlug" element={<InfoPage section="resources" />} />
          <Route path="corporate/:pageSlug" element={<InfoPage section="corporate" />} />
          <Route path="legal/:pageSlug" element={<InfoPage section="legal" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
