import { Outlet } from 'react-router-dom';
import type { CSSProperties } from 'react';
import Footer from '../components/Footer/Footer';
import ScrollManager from '../components/ScrollManager';
import ProductSiteHeader from './ProductSiteHeader';
import { useProductSite } from './ProductSiteContext';

const ProductSiteLayout = () => {
  const { product } = useProductSite();

  return (
    <div
      className="product-site-shell"
      style={
        {
          '--site-primary': product.theme.primary,
          '--site-secondary': product.theme.secondary,
          '--site-soft': product.theme.soft,
          '--site-dark': product.theme.dark,
          '--primary': product.theme.primary,
          '--secondary': product.theme.secondary,
          '--primary-glow': product.theme.soft,
        } as CSSProperties
      }
    >
      <ScrollManager />
      <ProductSiteHeader />
      <main className="product-site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProductSiteLayout;
