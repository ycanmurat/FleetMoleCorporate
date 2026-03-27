import type { CSSProperties, ReactElement } from 'react';
import type { ProductData, ProductSlug } from '../../data/products';
import './ProductMark.css';

interface ProductMarkProps {
  product: ProductData;
  size?: number;
  variant?: 'default' | 'topbar' | 'hero' | 'rail';
  className?: string;
}

const glyphs = {
  manager: (
    <>
      <rect x="8" y="10" width="16" height="16" rx="4" fill="var(--mark-primary)" />
      <rect x="28" y="10" width="28" height="10" rx="5" fill="var(--mark-secondary)" opacity="0.85" />
      <rect x="8" y="30" width="22" height="22" rx="6" fill="var(--mark-secondary)" opacity="0.18" stroke="var(--mark-secondary)" strokeWidth="3" />
      <rect x="34" y="26" width="22" height="26" rx="6" fill="none" stroke="var(--mark-primary)" strokeWidth="4" />
    </>
  ),
  rent: (
    <>
      <path d="M16 46C28 26 36 18 48 14" fill="none" stroke="var(--mark-primary)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="18" cy="46" r="6" fill="var(--mark-primary)" />
      <path d="M40 16h10c4 0 6 2 6 6v20c0 4-2 6-6 6H34c-4 0-6-2-6-6V28" fill="none" stroke="var(--mark-secondary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 28l8-8" fill="none" stroke="var(--mark-primary)" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  partner: (
    <>
      <circle cx="18" cy="18" r="8" fill="var(--mark-primary)" />
      <circle cx="46" cy="18" r="8" fill="var(--mark-secondary)" />
      <circle cx="32" cy="44" r="9" fill="none" stroke="var(--mark-primary)" strokeWidth="5" />
      <path d="M24 22l5 9M40 22l-5 9" fill="none" stroke="var(--mark-secondary)" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 44h16" fill="none" stroke="var(--mark-secondary)" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  tyre: (
    <>
      <circle cx="32" cy="32" r="20" fill="none" stroke="var(--mark-primary)" strokeWidth="6" />
      <circle cx="32" cy="32" r="8" fill="none" stroke="var(--mark-secondary)" strokeWidth="5" />
      <path d="M32 12v12M32 40v12M12 32h12M40 32h12M19 19l8 8M37 37l8 8M45 19l-8 8M27 37l-8 8" fill="none" stroke="var(--mark-secondary)" strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  tracker: (
    <>
      <path d="M32 52s14-11 14-23c0-7.7-6.3-14-14-14s-14 6.3-14 14c0 12 14 23 14 23z" fill="none" stroke="var(--mark-primary)" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="32" cy="29" r="6" fill="var(--mark-secondary)" />
      <path d="M10 16c6-6 14-9 22-9M54 16c-6-6-14-9-22-9" fill="none" stroke="var(--mark-secondary)" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
    </>
  ),
  ai: (
    <>
      <circle cx="20" cy="18" r="5.5" fill="var(--mark-primary)" />
      <circle cx="44" cy="18" r="5.5" fill="var(--mark-primary)" />
      <circle cx="18" cy="44" r="5.5" fill="var(--mark-secondary)" />
      <circle cx="44" cy="44" r="5.5" fill="var(--mark-secondary)" />
      <circle cx="32" cy="31" r="7" fill="none" stroke="var(--mark-primary)" strokeWidth="4" />
      <path d="M24 20l4 6M40 20l-4 6M22 40l4-4M42 40l-4-4M26 31h12" fill="none" stroke="var(--mark-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  trader: (
    <>
      <path d="M12 44h40" fill="none" stroke="var(--mark-secondary)" strokeWidth="4" strokeLinecap="round" />
      <rect x="16" y="26" width="8" height="18" rx="4" fill="var(--mark-primary)" />
      <rect x="28" y="18" width="8" height="26" rx="4" fill="var(--mark-secondary)" />
      <rect x="40" y="12" width="8" height="32" rx="4" fill="var(--mark-primary)" opacity="0.95" />
      <path d="M18 18c4-4 8-6 12-6s8 2 14 8" fill="none" stroke="var(--mark-primary)" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
} satisfies Record<ProductSlug, ReactElement>;

const ProductMark = ({
  product,
  size,
  variant = 'default',
  className = '',
}: ProductMarkProps) => {
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
      <svg viewBox="0 0 64 64" fill="none">
        {glyphs[product.slug]}
      </svg>
    </span>
  );
};

export default ProductMark;
