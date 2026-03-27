import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import {
  BarChart3,
  CarFront,
  Cpu,
  MapPinned,
  MonitorSmartphone,
  RefreshCcw,
  Users,
} from 'lucide-react';
import type { ProductSlug } from '../data/products';

const PRODUCT_ICON_MAP = {
  manager: BarChart3,
  partner: Users,
  rent: CarFront,
  tyre: RefreshCcw,
  tracker: MapPinned,
  ai: Cpu,
  trader: MonitorSmartphone,
} satisfies Record<ProductSlug, ComponentType<LucideProps>>;

interface ProductIconProps extends LucideProps {
  slug: ProductSlug;
}

export const ProductIcon = ({ slug, ...props }: ProductIconProps) => {
  const Icon = PRODUCT_ICON_MAP[slug];
  return <Icon {...props} />;
};
