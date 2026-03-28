/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MANAGER_SITE_URL?: string;
  readonly VITE_RENT_SITE_URL?: string;
  readonly VITE_TRACKER_SITE_URL?: string;
  readonly VITE_TRADER_SITE_URL?: string;
  readonly VITE_PARTNER_SITE_URL?: string;
  readonly VITE_TYRE_SITE_URL?: string;
  readonly VITE_SMART_SITE_URL?: string;
  readonly VITE_CORPORATE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
