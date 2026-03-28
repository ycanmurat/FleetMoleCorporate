import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  House,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CommonTopBanner from '../CommonTopBanner/CommonTopBanner';
import ProductMark from '../ProductMark/ProductMark';
import ProductRail from '../ProductRail/ProductRail';
import ProductSiteLink from '../ProductSiteLink/ProductSiteLink';
import ProductWordmark from '../ProductWordmark/ProductWordmark';
import { useApp } from '../../context/AppContext';
import { COMPANY_INFO, getCompanyAddress } from '../../data/company';
import {
  CONTENT_SECTION_MAP,
  PRODUCT_MENU_META,
  TOP_NAV_ORDER,
  getContentPath,
  type ContentSectionId,
} from '../../data/navigation';
import { PRODUCTS } from '../../data/products';
import './Header.css';

const HEADER_EASE = [0.22, 1, 0.36, 1] as const;

type DesktopDropdownId = (typeof TOP_NAV_ORDER)[number];

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);
  const desktopCloseTimerRef = useRef<number | null>(null);
  const restingHeaderOffsetRef = useRef<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DesktopDropdownId | null>(null);
  const [mobileSection, setMobileSection] = useState<DesktopDropdownId | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme, lang, toggleLang, t, localizePath } = useApp();
  const location = useLocation();

  const currentProduct =
    PRODUCTS.find((product) => location.pathname === localizePath(`/${product.slug}`)) ?? null;
  const isHomePage = location.pathname === localizePath('/');
  const activeProductSlug = currentProduct?.slug ?? null;
  const showPrimaryCluster = Boolean(currentProduct);
  const corporateLogoSrc = `${import.meta.env.BASE_URL}${isDark ? 'logo-white.png' : 'logo-black.png'}`;

  const brandStyle = currentProduct
    ? ({
        '--brand-primary': currentProduct.theme.primary,
        '--brand-secondary': currentProduct.theme.secondary,
        '--brand-soft': currentProduct.theme.soft,
      } as CSSProperties)
    : undefined;
  const homeControlStyle = {
    '--home-accent': isHomePage ? '#203A74' : currentProduct?.theme.primary ?? '#203A74',
    '--home-soft': isHomePage
      ? 'rgba(32, 58, 116, 0.16)'
      : currentProduct?.theme.soft ?? 'rgba(32, 58, 116, 0.14)',
  } as CSSProperties;
  const shellStyle = currentProduct
    ? ({
        '--header-accent': currentProduct.theme.primary,
        '--header-soft': currentProduct.theme.soft,
      } as CSSProperties)
    : undefined;
  const currentLangFlag = lang === 'tr' ? '🇹🇷' : '🇬🇧';

  const clearDesktopCloseTimer = () => {
    if (desktopCloseTimerRef.current === null) {
      return;
    }

    window.clearTimeout(desktopCloseTimerRef.current);
    desktopCloseTimerRef.current = null;
  };

  const scheduleDesktopClose = () => {
    clearDesktopCloseTimer();

    desktopCloseTimerRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
      desktopCloseTimerRef.current = null;
    }, 180);
  };

  const openDesktopDropdown = (id: DesktopDropdownId) => {
    clearDesktopCloseTimer();
    setActiveDropdown(id);
  };

  const closeAll = () => {
    clearDesktopCloseTimer();
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => () => clearDesktopCloseTimer(), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const syncHeaderOffset = () => {
      if (!headerRef.current) {
        return;
      }

      const nextOffset = Math.ceil(headerRef.current.getBoundingClientRect().height + 12);
      const lockedOffset = restingHeaderOffsetRef.current ?? nextOffset;

      if (!isScrolled && !mobileOpen) {
        restingHeaderOffsetRef.current = nextOffset;
        document.documentElement.style.setProperty('--header-offset', `${nextOffset}px`);
        return;
      }

      if (mobileOpen) {
        document.documentElement.style.setProperty('--header-offset', `${Math.max(nextOffset, lockedOffset)}px`);
        return;
      }

      document.documentElement.style.setProperty('--header-offset', `${lockedOffset}px`);
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
  }, [currentProduct?.slug, isHomePage, isScrolled, mobileOpen, lang]);

  useEffect(() => {
    if (!mobileOpen) {
      setMobileSection(null);
    }
  }, [mobileOpen]);

  const isSectionCurrent = (section: ContentSectionId) =>
    location.pathname === localizePath(`/${section}`) ||
    location.pathname.startsWith(localizePath(`/${section}/`));

  const desktopGroups = TOP_NAV_ORDER.map((id) => {
    if (id === 'products') {
      return {
        id,
        label: t.nav.products,
        eyebrow: PRODUCT_MENU_META.eyebrow[lang],
        title: PRODUCT_MENU_META.title[lang],
        description: PRODUCT_MENU_META.description[lang],
        accent: currentProduct?.theme.primary ?? PRODUCT_MENU_META.accent,
        isCurrent: Boolean(currentProduct),
      };
    }

    const section = CONTENT_SECTION_MAP[id];
    return {
      id,
      label:
        id === 'services'
          ? t.nav.services
          : id === 'leasing'
            ? t.nav.rental
            : t.nav.news,
      eyebrow: section.eyebrow[lang],
      title: section.title[lang],
      description: section.description[lang],
      accent: section.accent,
      isCurrent: isSectionCurrent(id),
    };
  });
  const desktopNavGroups = isHomePage ? desktopGroups.filter((group) => group.id !== 'products') : desktopGroups;
  const activeDesktopGroup =
    activeDropdown !== null ? desktopNavGroups.find((group) => group.id === activeDropdown) ?? null : null;

  return (
    <header ref={headerRef} className="site-header">
      <div className="container header-stack">
        <motion.div
          className={`header-shell ${isScrolled ? 'is-scrolled' : ''} ${isHomePage && !isScrolled ? 'is-hero-overlap' : ''} ${isHomePage ? 'is-home-layout' : ''}`}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.54, ease: HEADER_EASE }}
          style={shellStyle}
          onMouseEnter={clearDesktopCloseTimer}
          onMouseLeave={scheduleDesktopClose}
          onFocusCapture={clearDesktopCloseTimer}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget;

            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
              scheduleDesktopClose();
            }
          }}
        >
          <div className="header-brand-stack">
            <CommonTopBanner to={localizePath('/')} className="header-common-banner" />

            <ProductRail
              activeProductSlug={activeProductSlug}
              className={`header-product-rail ${isScrolled ? 'is-scrolled' : ''}`}
            />
          </div>

          <div className={`header-main-row ${showPrimaryCluster ? '' : 'is-compact'}`.trim()}>
            {showPrimaryCluster ? (
              <div className="header-primary-cluster">
                <Link
                  to={localizePath('/')}
                  className={`brand-logo ${currentProduct ? 'is-product' : 'is-home'}`}
                  onClick={closeAll}
                  style={brandStyle}
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={currentProduct?.slug ?? 'corporate'}
                      className="brand-lockup"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.42, ease: HEADER_EASE }}
                    >
                      {currentProduct ? (
                        <ProductWordmark product={currentProduct} className="brand-product-wordmark" />
                      ) : (
                        <span className="brand-copy brand-copy--home">
                          <img
                            className="brand-wordmark brand-wordmark--home"
                            src={corporateLogoSrc}
                            alt="FleetMole Corporate"
                          />
                        </span>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </Link>
              </div>
            ) : null}

            <nav className={`desktop-nav ${showPrimaryCluster ? '' : 'is-compact'}`.trim()}>
              {isHomePage ? (
                <Link
                  to={localizePath('/')}
                  className="nav-link plain nav-link--home"
                  aria-label={lang === 'tr' ? 'Ana Sayfa' : 'Home'}
                  onClick={closeAll}
                  style={{ '--nav-accent': '#203A74' } as CSSProperties}
                >
                  <House size={16} />
                  <span>{lang === 'tr' ? 'Ana Sayfa' : 'Home'}</span>
                </Link>
              ) : null}

              {desktopNavGroups.map((group) => {
                const navAccent =
                  group.id === 'products' ? currentProduct?.theme.primary ?? group.accent : group.accent;

                return (
                  <div
                    key={group.id}
                    className="nav-item-wrap"
                    onMouseEnter={() => openDesktopDropdown(group.id)}
                    onFocusCapture={() => openDesktopDropdown(group.id)}
                  >
                    <button
                      type="button"
                      className={`nav-link nav-trigger ${activeDropdown === group.id || group.isCurrent ? 'is-active' : ''}`}
                      aria-expanded={activeDropdown === group.id}
                      aria-controls={`nav-dropdown-${group.id}`}
                      style={{ '--nav-accent': navAccent } as CSSProperties}
                      onClick={() => {
                        clearDesktopCloseTimer();
                        setActiveDropdown((current) => (current === group.id ? null : group.id));
                      }}
                    >
                      <span>{group.label}</span>
                      <ChevronDown size={13} />
                    </button>
                  </div>
                );
              })}

              <Link
                to={localizePath('/contact')}
                className={`nav-link plain ${location.pathname === localizePath('/contact') ? 'is-active' : ''}`}
                onClick={closeAll}
              >
                {t.nav.contact}
              </Link>
            </nav>

            <div className="header-actions">
              {!isHomePage ? (
                <Link
                  to={localizePath('/')}
                  className={`top-ctrl top-ctrl--home ${isHomePage ? 'is-active-home' : ''}`}
                  aria-label={lang === 'tr' ? 'Ana Sayfa' : 'Home'}
                  onClick={closeAll}
                  style={homeControlStyle}
                >
                  <House size={17} />
                </Link>
              ) : null}
              <button
                className="top-ctrl top-ctrl--lang"
                onClick={toggleLang}
                aria-label={lang === 'tr' ? 'Switch to English' : 'Turkceye gec'}
              >
                <span className="lang-flag" aria-hidden="true">
                  {currentLangFlag}
                </span>
              </button>
              <button
                className="top-ctrl top-ctrl--icon"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label={t.misc.menu}>
                <Menu size={19} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {activeDesktopGroup ? (
              <motion.div
                id={`nav-dropdown-${activeDesktopGroup.id}`}
                className={`dropdown dropdown--${activeDesktopGroup.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: HEADER_EASE }}
                style={{ '--dropdown-accent': activeDesktopGroup.accent } as CSSProperties}
                onMouseEnter={clearDesktopCloseTimer}
                onMouseLeave={scheduleDesktopClose}
              >
                <div className="dropdown-shell">
                  <div className="dropdown-lead">
                    <span className="dropdown-eyebrow">{activeDesktopGroup.eyebrow}</span>
                    <strong>{activeDesktopGroup.title}</strong>
                    <p>{activeDesktopGroup.description}</p>
                  </div>

                  {activeDesktopGroup.id === 'products' ? (
                    <div className="dropdown-grid dropdown-grid--products">
                      {PRODUCTS.map((product) => (
                        <ProductSiteLink
                          key={product.slug}
                          productSlug={product.slug}
                          className={`dd-product ${activeProductSlug === product.slug ? 'is-current' : ''}`}
                          style={{ '--dd-accent': product.theme.primary } as CSSProperties}
                          onClick={closeAll}
                        >
                          <ProductMark product={product} />
                          <div>
                            <strong>{product.name}</strong>
                            <span>{product.summary[lang]}</span>
                          </div>
                        </ProductSiteLink>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`dropdown-grid dropdown-grid--list dropdown-grid--${activeDesktopGroup.id}`}
                    >
                      {activeDesktopGroup.id === 'services' ? (
                        <Link
                          to={localizePath('/services')}
                          className="dd-item dd-item--overview"
                          onClick={closeAll}
                        >
                          <span className="dd-icon">
                            <Briefcase size={16} />
                          </span>
                          <span className="dd-copy">
                            <strong>{lang === 'tr' ? 'Tüm Hizmetler' : 'All Services'}</strong>
                            <span>
                              {lang === 'tr'
                                ? 'Servis portfoyunu tek landing sayfasinda inceleyin.'
                                : 'Review the full service portfolio on one landing page.'}
                            </span>
                          </span>
                          <ArrowUpRight size={16} className="dd-arrow" />
                        </Link>
                      ) : null}
                      {CONTENT_SECTION_MAP[activeDesktopGroup.id].items.map((item) => (
                        <Link
                          key={item.slug}
                          to={localizePath(getContentPath(activeDesktopGroup.id, item.slug))}
                          className="dd-item"
                          onClick={closeAll}
                        >
                          <span className="dd-icon">
                            <item.icon size={16} />
                          </span>
                          <span className="dd-copy">
                            <strong>{item.title[lang]}</strong>
                            <span>{item.description[lang]}</span>
                          </span>
                          <ArrowUpRight size={16} className="dd-arrow" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              className="mob-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
            />
            <motion.div
              className="mob-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 210 }}
            >
              <div className="mob-header">
                <div className="mob-brand" style={brandStyle}>
                  {currentProduct ? (
                    <ProductWordmark
                      product={currentProduct}
                      className="mob-brand-wordmark mob-brand-wordmark--product"
                      height={34}
                    />
                  ) : (
                    <img className="mob-brand-logo" src={corporateLogoSrc} alt="FleetMole Corporate" />
                  )}
                </div>
                <button className="mob-close" onClick={closeAll} aria-label={t.misc.menu}>
                  <X size={22} />
                </button>
              </div>

              <div className="mob-body">
                <div className="mob-actions">
                  <Link
                    to={localizePath('/')}
                    className={`mob-chip mob-chip--home top-ctrl--home ${isHomePage ? 'is-active-home' : ''}`}
                    onClick={closeAll}
                    style={homeControlStyle}
                  >
                    <House size={17} />
                    <span>{lang === 'tr' ? 'Ana Sayfa' : 'Home'}</span>
                  </Link>
                  <div className="mob-action-icons">
                    <button
                      className="mob-chip mob-chip--lang"
                      onClick={toggleLang}
                      aria-label={lang === 'tr' ? 'Switch to English' : 'Turkceye gec'}
                    >
                      <span className="lang-flag" aria-hidden="true">
                        {currentLangFlag}
                      </span>
                    </button>
                    <button className="mob-chip mob-chip--icon" onClick={toggleTheme} aria-label="Toggle Theme">
                      {isDark ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                  </div>
                </div>

                <div className="mob-sections">
                  {desktopGroups.map((group) => (
                    <section
                      key={group.id}
                      className={`mob-section ${mobileSection === group.id ? 'is-open' : ''}`}
                    >
                      <button
                        type="button"
                        className="mob-section-trigger"
                        aria-expanded={mobileSection === group.id}
                        aria-controls={`mob-section-${group.id}`}
                        onClick={() => setMobileSection((current) => (current === group.id ? null : group.id))}
                      >
                        <span>{group.label}</span>
                        <ChevronDown size={18} />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileSection === group.id ? (
                          <motion.div
                            id={`mob-section-${group.id}`}
                            className="mob-section-panel"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.26, ease: HEADER_EASE }}
                          >
                            {group.id === 'products'
                              ? PRODUCTS.map((product) => (
                                  <ProductSiteLink
                                    key={product.slug}
                                    productSlug={product.slug}
                                    className={`mob-link ${activeProductSlug === product.slug ? 'active' : ''}`}
                                    onClick={closeAll}
                                    style={
                                      {
                                        '--link-primary': product.theme.primary,
                                        '--link-soft': product.theme.soft,
                                      } as CSSProperties
                                    }
                                  >
                                    <ProductMark product={product} variant="topbar" />
                                    <div>
                                      <strong>{product.name}</strong>
                                      <span>{product.category[lang]}</span>
                                    </div>
                                  </ProductSiteLink>
                                ))
                              : (
                                  <>
                                    {group.id === 'services' ? (
                                      <Link
                                        to={localizePath('/services')}
                                        className="mob-link mob-link--nav"
                                        onClick={closeAll}
                                      >
                                        <span className="mob-link-icon">
                                          <Briefcase size={17} />
                                        </span>
                                        <div>
                                          <strong>{lang === 'tr' ? 'Tüm Hizmetler' : 'All Services'}</strong>
                                          <span>
                                            {lang === 'tr'
                                              ? 'Servis portfoyunun tamamina tek sayfadan ulasin.'
                                              : 'Reach the complete service portfolio from one page.'}
                                          </span>
                                        </div>
                                      </Link>
                                    ) : null}
                                    {CONTENT_SECTION_MAP[group.id].items.map((item) => (
                                      <Link
                                        key={item.slug}
                                        to={localizePath(getContentPath(group.id, item.slug))}
                                        className="mob-link mob-link--nav"
                                        onClick={closeAll}
                                      >
                                        <span className="mob-link-icon">
                                          <item.icon size={17} />
                                        </span>
                                        <div>
                                          <strong>{item.title[lang]}</strong>
                                          <span>{item.description[lang]}</span>
                                        </div>
                                      </Link>
                                    ))}
                                  </>
                                )}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </section>
                  ))}
                </div>

                <Link to={localizePath('/contact')} className="mob-contact-card" onClick={closeAll}>
                  <div className="mob-contact-top">
                    <strong>{t.nav.contact}</strong>
                    <ArrowUpRight size={16} />
                  </div>
                  <div className="mob-contact-list">
                    <span>
                      <MapPin size={15} />
                      {getCompanyAddress(lang)}
                    </span>
                    <span>
                      <Phone size={15} />
                      {COMPANY_INFO.phoneDisplay}
                    </span>
                    <span>
                      <Mail size={15} />
                      {COMPANY_INFO.email}
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;
