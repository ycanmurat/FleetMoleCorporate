import type { CSSProperties } from 'react';
import { useApp } from '../../context/AppContext';
import type { ProductData, ProductSlug } from '../../data/products';
import './ProductWordmark.css';

interface ProductWordmarkProps {
  product: ProductData;
  height?: number;
  className?: string;
  alt?: string;
}

const PRODUCT_WORDMARK_MAP: Record<ProductSlug, string> = {
  manager: 'manager',
  rent: 'rent',
  tracker: 'tracker',
  trader: 'trader',
  partner: 'partner',
  tyre: 'tyre',
  smart: 'smart',
};

const ProductWordmark = ({
  product,
  height,
  className = '',
  alt,
}: ProductWordmarkProps) => {
  const { isDark } = useApp();
  const themeFolder = isDark ? 'white' : 'dark';
  const assetName = PRODUCT_WORDMARK_MAP[product.slug];
  const src = `${import.meta.env.BASE_URL}fleetmole-alturun-logolar/${themeFolder}/${assetName}.png`;
  const resolvedAlt = alt ?? product.name;
  const style =
    height === undefined
      ? undefined
      : ({
          '--product-wordmark-height': `${height}px`,
        } as CSSProperties);

  return (
    <img
      className={`product-wordmark ${className}`.trim()}
      src={src}
      alt={resolvedAlt}
      aria-hidden={resolvedAlt === '' ? true : undefined}
      style={style}
      decoding="async"
    />
  );
};

export default ProductWordmark;
