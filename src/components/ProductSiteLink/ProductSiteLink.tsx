import { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getProductSitePath } from '../../config/productSites';
import type { ProductSlug } from '../../data/products';

interface ProductSiteLinkProps extends Omit<LinkProps, 'to'> {
  productSlug: ProductSlug;
  pathname?: string;
}

const ProductSiteLink = forwardRef<HTMLAnchorElement, ProductSiteLinkProps>(
  ({ productSlug, pathname = '/', ...props }, ref) => {
    const { lang } = useApp();

    return <Link ref={ref} to={getProductSitePath(productSlug, lang, pathname)} {...props} />;
  },
);

ProductSiteLink.displayName = 'ProductSiteLink';

export default ProductSiteLink;
