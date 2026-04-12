import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProductSitePath } from '../config/productSites';
import { useProductSite } from './ProductSiteContext';
import { useProductSitePathMode } from './ProductSiteRuntimeContext';

const ProductSiteCompare = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const pathMode = useProductSitePathMode();
  const productSiteRoot = getProductSitePath(product.slug, lang, '/', pathMode);

  return <Navigate to={product.slug === 'tracker' ? `${productSiteRoot}/products` : productSiteRoot} replace />;
};

export default ProductSiteCompare;
