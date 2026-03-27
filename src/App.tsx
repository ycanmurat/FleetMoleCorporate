import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { DEFAULT_LOCALE, isLocale } from './config/site';
import ContactPage from './pages/ContactPage';
import Home from './pages/Home';
import InfoPage from './pages/InfoPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';

const LocalizedLayout = () => {
  const { locale } = useParams();

  if (!isLocale(locale)) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  }

  return <MainLayout />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />

      <Route path=":locale" element={<LocalizedLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="services/:pageSlug" element={<InfoPage section="services" />} />
        <Route path="leasing/:pageSlug" element={<InfoPage section="leasing" />} />
        <Route path="resources/:pageSlug" element={<InfoPage section="resources" />} />
        <Route path="corporate/:pageSlug" element={<InfoPage section="corporate" />} />
        <Route path="legal/:pageSlug" element={<InfoPage section="legal" />} />
        <Route path=":productSlug" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
