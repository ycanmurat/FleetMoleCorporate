import { createContext, useContext, type ReactNode } from 'react';
import type { ProductSitePathMode } from '../config/productSites';

const ProductSiteRuntimeContext = createContext<ProductSitePathMode>('embedded');

export const ProductSiteRuntimeProvider = ({
  children,
  mode,
}: {
  children: ReactNode;
  mode: ProductSitePathMode;
}) => <ProductSiteRuntimeContext.Provider value={mode}>{children}</ProductSiteRuntimeContext.Provider>;

export const useProductSitePathMode = () => useContext(ProductSiteRuntimeContext);
