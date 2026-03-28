import { createContext, useContext, type ReactNode } from 'react';
import { getProductBySlug, type ProductData, type ProductSlug } from '../data/products';
import { PRODUCT_SITE_CONTENT, type ProductSiteContent } from './data';

interface ProductSiteContextValue {
  product: ProductData;
  content: ProductSiteContent;
}

const ProductSiteContext = createContext<ProductSiteContextValue | null>(null);

export const ProductSiteProvider = ({
  productSlug,
  children,
}: {
  productSlug: ProductSlug;
  children: ReactNode;
}) => {
  const product = getProductBySlug(productSlug);

  if (!product) {
    throw new Error(`Unknown product site slug: ${productSlug}`);
  }

  const content = PRODUCT_SITE_CONTENT[product.slug];

  return <ProductSiteContext.Provider value={{ product, content }}>{children}</ProductSiteContext.Provider>;
};

export const useProductSite = () => {
  const ctx = useContext(ProductSiteContext);

  if (!ctx) {
    throw new Error('useProductSite must be used inside ProductSiteProvider');
  }

  return ctx;
};
