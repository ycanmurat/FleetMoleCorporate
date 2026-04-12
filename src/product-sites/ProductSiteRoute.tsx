import { useParams } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import { getProductBySlug } from '../data/products';
import ProductSiteLayout from './ProductSiteLayout';
import { ProductSiteProvider } from './ProductSiteContext';
import { ProductSiteRuntimeProvider } from './ProductSiteRuntimeContext';

const ProductSiteRoute = () => {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <ProductSiteRuntimeProvider mode="embedded">
      <ProductSiteProvider productSlug={product.slug}>
        <ProductSiteLayout />
      </ProductSiteProvider>
    </ProductSiteRuntimeProvider>
  );
};

export default ProductSiteRoute;
