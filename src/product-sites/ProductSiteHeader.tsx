import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import ProductRail from '../components/ProductRail/ProductRail';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import { getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { isProductAuthEnabled } from '../data/products';
import { getCorporateSitePath } from './siteConfig';
import { useProductSite } from './ProductSiteContext';
import { useProductSitePathMode } from './ProductSiteRuntimeContext';

const ProductSiteHeader = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { product, content } = useProductSite();
  const { lang, toggleLang, toggleTheme, isDark } = useApp();
  const pathMode = useProductSitePathMode();
  const showProductCatalog = product.slug === 'tracker';
  const showProductAuth = isProductAuthEnabled(product.slug);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const syncHeaderOffset = () => {
      if (!headerRef.current) {
        return;
      }

      const nextOffset = Math.ceil(headerRef.current.getBoundingClientRect().height + 12);
      document.documentElement.style.setProperty('--header-offset', `${nextOffset}px`);
    };

    syncHeaderOffset();

    const frameId = window.requestAnimationFrame(syncHeaderOffset);
    const observer = new ResizeObserver(syncHeaderOffset);

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    window.addEventListener('resize', syncHeaderOffset, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', syncHeaderOffset);
    };
  }, [lang, mobileOpen, product.slug]);

  const corporatePath = getCorporateSitePath(lang);
  const productHomePath = getProductSitePath(product.slug, lang, '/', pathMode);
  const productCatalogPath = getProductSitePath(product.slug, lang, '/products', pathMode);
  const productLoginPath = getProductSitePath(product.slug, lang, '/login', pathMode);
  const productRegisterPath = getProductSitePath(product.slug, lang, '/register', pathMode);
  const resolveHref = (href: string) =>
    href.startsWith('#')
      ? `${productHomePath}#${href.slice(1)}`
      : getProductSitePath(product.slug, lang, href, pathMode);
  const isCatalogRoute = location.pathname === productCatalogPath || location.pathname.startsWith(`${productCatalogPath}/`);
  const isLoginRoute = location.pathname === productLoginPath;
  const isRegisterRoute = location.pathname === productRegisterPath;

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return location.pathname === productHomePath && location.hash === href;
    }

    return location.pathname === getProductSitePath(product.slug, lang, href, pathMode);
  };

  return (
    <header ref={headerRef} className="ps-header">
      <div className="container">
        <div className="ps-header-shell glass-panel">
          <div className="ps-brand-stack">
            <ProductRail
              activeProductSlug={product.slug}
              className="ps-product-rail"
              homeHref={corporatePath}
              showHomeLink
            />
          </div>

          <div className="ps-header-main">
            <Link to={productHomePath} className="ps-brand">
              <ProductWordmark product={product} className="ps-brand-wordmark" alt="" />
            </Link>

            <nav className="ps-nav">
              {content.menu.map((item) =>
                item.href.startsWith('#') ? (
                  <a
                    key={item.href}
                    href={resolveHref(item.href)}
                    className={`ps-nav-link ${isActive(item.href) ? 'is-active' : ''}`}
                  >
                    {item.label[lang]}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={resolveHref(item.href)}
                    className={`ps-nav-link ${isActive(item.href) ? 'is-active' : ''}`}
                  >
                    {item.label[lang]}
                  </Link>
                ),
              )}
            </nav>

            <div className="ps-header-actions">
              {showProductAuth ? (
                <div className="ps-header-auth">
                  <Link
                    to={productLoginPath}
                    className={`ps-header-auth-link ${isLoginRoute ? 'is-active' : ''}`}
                  >
                    {lang === 'tr' ? 'Giriş' : 'Login'}
                  </Link>
                  <Link
                    to={productRegisterPath}
                    className={`ps-header-auth-cta ${isRegisterRoute ? 'is-active' : ''}`}
                  >
                    {lang === 'tr' ? 'Kayıt Ol' : 'Register'}
                  </Link>
                </div>
              ) : null}
              {showProductCatalog && !isCatalogRoute ? (
                <Link to={productCatalogPath} className="ps-header-cta">
                  {lang === 'tr' ? 'Ürünler' : 'Products'}
                </Link>
              ) : null}
              <button className="ps-header-icon" onClick={toggleLang} aria-label={lang === 'tr' ? 'Switch to English' : 'Turkceye gec'}>
                {lang === 'tr' ? 'EN' : 'TR'}
              </button>
              <button className="ps-header-icon" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button className="ps-header-menu" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {mobileOpen ? (
              <motion.div
                className="ps-mobile-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ps-mobile-links">
                  {showProductAuth ? (
                    <div className="ps-mobile-auth">
                      <Link
                        to={productLoginPath}
                        className={`ps-mobile-auth-link ${isLoginRoute ? 'is-active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {lang === 'tr' ? 'Giriş Yap' : 'Sign In'}
                      </Link>
                      <Link
                        to={productRegisterPath}
                        className={`ps-mobile-auth-link ps-mobile-auth-link--primary ${isRegisterRoute ? 'is-active' : ''}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {lang === 'tr' ? 'Kayıt Ol' : 'Register'}
                      </Link>
                    </div>
                  ) : null}
                  {content.menu.map((item) =>
                    item.href.startsWith('#') ? (
                      <a
                        key={item.href}
                        href={resolveHref(item.href)}
                        className="ps-mobile-link"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label[lang]}
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        to={resolveHref(item.href)}
                        className="ps-mobile-link"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label[lang]}
                      </Link>
                    ),
                  )}
                </div>

                <div className="ps-mobile-meta">
                  <Link to={corporatePath} className="ps-mobile-backlink">
                    {lang === 'tr' ? 'Anasayfa' : 'Homepage'}
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default ProductSiteHeader;
