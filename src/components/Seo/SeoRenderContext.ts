import { createContext } from 'react';
import type { ResolvedSeoPayload } from './seoUtils';

export interface SeoRenderCollector {
  set: (payload: ResolvedSeoPayload) => void;
}

export const SeoRenderContext = createContext<SeoRenderCollector | null>(null);
