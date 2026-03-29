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
