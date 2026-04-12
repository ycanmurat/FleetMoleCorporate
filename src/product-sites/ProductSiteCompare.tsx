import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getProductSitePath } from '../config/productSites';
import { useProductSite } from './ProductSiteContext';

const ProductSiteCompare = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const productSiteRoot = getProductSitePath(product.slug, lang);

  return <Navigate to={product.slug === 'tracker' ? `${productSiteRoot}/products` : productSiteRoot} replace />;
};

export default ProductSiteCompare;
