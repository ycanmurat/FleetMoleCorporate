import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useApp } from '../../context/AppContext';
import { getProductSiteUrl } from '../../config/productSites';
import type { ProductSlug } from '../../data/products';

interface ProductSiteLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  productSlug: ProductSlug;
  pathname?: string;
}

const ProductSiteLink = forwardRef<HTMLAnchorElement, ProductSiteLinkProps>(
  ({ productSlug, pathname = '/', ...props }, ref) => {
    const { lang } = useApp();

    return <a ref={ref} href={getProductSiteUrl(productSlug, lang, pathname)} {...props} />;
  },
);

ProductSiteLink.displayName = 'ProductSiteLink';

export default ProductSiteLink;
