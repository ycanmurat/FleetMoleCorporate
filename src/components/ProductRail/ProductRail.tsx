import { useEffect, useRef, type CSSProperties } from 'react';
import { PRODUCTS, type ProductSlug } from '../../data/products';
import { useApp } from '../../context/AppContext';
import ProductMark from '../ProductMark/ProductMark';
import ProductSiteLink from '../ProductSiteLink/ProductSiteLink';
import './ProductRail.css';

interface ProductRailProps {
  activeProductSlug?: ProductSlug | null;
  className?: string;
}

const ProductRail = ({ activeProductSlug = null, className = '' }: ProductRailProps) => {
  const { t } = useApp();
  const productLinkRefs = useRef<Partial<Record<ProductSlug, HTMLAnchorElement | null>>>({});

  useEffect(() => {
    if (!activeProductSlug) {
      return;
    }

    const activeLink = productLinkRefs.current[activeProductSlug];
    if (!activeLink) {
      return;
    }

    activeLink.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [activeProductSlug]);

  return (
    <div className={`product-rail ${className}`.trim()}>
      <div className="product-rail-track" aria-label={t.misc.allProducts}>
        {PRODUCTS.map((product) => (
          <ProductSiteLink
            key={product.slug}
            productSlug={product.slug}
            ref={(node) => {
              productLinkRefs.current[product.slug] = node;
            }}
            className="product-rail-link"
            aria-label={product.name}
            aria-current={activeProductSlug === product.slug ? 'page' : undefined}
            title={product.name}
            style={
              {
                '--product-rail-link-primary': product.theme.primary,
                '--product-rail-link-soft': product.theme.soft,
              } as CSSProperties
            }
          >
            <ProductMark product={product} variant="rail" />
            <span className="product-rail-name">{product.shortName}</span>
          </ProductSiteLink>
        ))}
      </div>
    </div>
  );
};

export default ProductRail;
