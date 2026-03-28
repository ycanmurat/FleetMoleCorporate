import type { CSSProperties } from 'react';
import type { ProductData, ProductSlug } from '../../data/products';
import './ProductMark.css';

interface ProductMarkProps {
  product: ProductData;
  size?: number;
  variant?: 'default' | 'topbar' | 'hero' | 'rail';
  className?: string;
}

const PRODUCT_MARK_MAP: Record<ProductSlug, string> = {
  manager: 'manager',
  rent: 'rent',
  tracker: 'tracker',
  trader: 'trader',
  partner: 'partner',
  tyre: 'tyre',
  smart: 'smart',
};

const ProductMark = ({
  product,
  size,
  variant = 'default',
  className = '',
}: ProductMarkProps) => {
  const src = `${import.meta.env.BASE_URL}fleetmole-ikonlar/${PRODUCT_MARK_MAP[product.slug]}.png`;
  const style = {
    '--mark-primary': product.theme.primary,
    '--mark-secondary': product.theme.secondary,
    '--mark-soft': product.theme.soft,
  } as CSSProperties & Record<string, string>;

  if (size !== undefined) {
    style['--mark-size'] = `${size}px`;
  }

  return (
    <span
      className={`product-mark product-mark--${variant} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      <img src={src} alt="" decoding="async" />
    </span>
  );
};

export default ProductMark;
