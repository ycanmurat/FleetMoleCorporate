import { useParams } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import { getProductBySlug } from '../data/products';
import ProductSiteLayout from './ProductSiteLayout';
import { ProductSiteProvider } from './ProductSiteContext';

const ProductSiteRoute = () => {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <ProductSiteProvider productSlug={product.slug}>
      <ProductSiteLayout />
    </ProductSiteProvider>
  );
};

export default ProductSiteRoute;
