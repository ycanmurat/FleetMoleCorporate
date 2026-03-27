import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { type Locale } from '../config/site';
import type { ProductSlug } from '../data/products';
import { getLocaleFromPath, getLocalizedPath, switchLocalePath } from '../lib/i18n';
import { translations } from '../locales/translations';

interface AppContextType {
  isDark: boolean;
  toggleTheme: () => void;
  lang: Locale;
  toggleLang: () => void;
  localizePath: (pathname?: string) => string;
  featuredProductSlug: ProductSlug | null;
  setFeaturedProductSlug: Dispatch<SetStateAction<ProductSlug | null>>;
  t: (typeof translations)[Locale];
}

const AppContext = createContext<AppContextType | null>(null);

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const savedTheme = localStorage.getItem('fleetmole-theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [featuredProductSlug, setFeaturedProductSlug] = useState<ProductSlug | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const lang = getLocaleFromPath(location.pathname);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('fleetmole-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('data-locale', lang);
  }, [lang]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleLang = () => {
    const targetLocale: Locale = lang === 'tr' ? 'en' : 'tr';
    navigate(switchLocalePath(location.pathname, targetLocale, location.search, location.hash));
  };

  const value: AppContextType = {
    isDark,
    toggleTheme,
    lang,
    toggleLang,
    localizePath: (pathname = '/') => getLocalizedPath(lang, pathname),
    featuredProductSlug,
    setFeaturedProductSlug,
    t: translations[lang],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be inside AppProvider');
  }

  return ctx;
};
