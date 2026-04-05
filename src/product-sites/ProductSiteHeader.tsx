import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import CommonTopBanner from '../components/CommonTopBanner/CommonTopBanner';
import ProductRail from '../components/ProductRail/ProductRail';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import { getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { getCorporateSitePath } from './siteConfig';
import { useProductSite } from './ProductSiteContext';

const ProductSiteHeader = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { product, content } = useProductSite();
  const { lang, toggleLang, toggleTheme, isDark } = useApp();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  }, [isScrolled, lang, mobileOpen, product.slug]);

  const corporatePath = getCorporateSitePath(lang);
  const productHomePath = getProductSitePath(product.slug, lang);
  const productContactPath = getProductSitePath(product.slug, lang, '/contact');
  const resolveHref = (href: string) =>
    href.startsWith('#')
      ? `${productHomePath}#${href.slice(1)}`
      : getProductSitePath(product.slug, lang, href);

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return location.pathname === productHomePath && location.hash === href;
    }

    return location.pathname === getProductSitePath(product.slug, lang, href);
  };

  return (
    <header ref={headerRef} className={`ps-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <div className="ps-header-shell glass-panel">
          <div className="ps-brand-stack">
            <CommonTopBanner to={corporatePath} className="ps-common-banner" />

            <ProductRail activeProductSlug={product.slug} className="ps-product-rail" />
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
              <Link to={getProductSitePath(product.slug, lang, '/products')} className="ps-header-cta">
                {lang === 'tr' ? 'Ürünler' : 'Products'}
              </Link>
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
                  <span>{product.name}</span>
                  <Link to={corporatePath} className="ps-mobile-backlink">
                    {lang === 'tr' ? 'Corporate siteye don' : 'Back to corporate'}
                    <ArrowUpRight size={14} />
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
