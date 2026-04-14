import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AnalyticsManager from '../components/Analytics/AnalyticsManager';
import { AppProvider } from '../context/AppContext';
import { type ProductSlug } from '../data/products';
import '../index.css';
import './productSite.css';
import ProductSiteApp from './ProductSiteApp';
import { ProductSiteProvider } from './ProductSiteContext';
import { ProductSiteRuntimeProvider } from './ProductSiteRuntimeContext';

export const mountProductSite = (productSlug: ProductSlug) => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Missing root element for product site');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AnalyticsManager />
        <AppProvider>
          <ProductSiteRuntimeProvider mode="standalone">
            <ProductSiteProvider productSlug={productSlug}>
              <ProductSiteApp />
            </ProductSiteProvider>
          </ProductSiteRuntimeProvider>
        </AppProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
};
