import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers3,
  LineChart,
  Minus,
  Plus,
  Radar,
  ShieldCheck,
} from 'lucide-react';
import ProductMark from '../components/ProductMark/ProductMark';
import ProductSiteLink from '../components/ProductSiteLink/ProductSiteLink';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { COMPANY_NAME, type Locale } from '../config/site';
import { useApp } from '../context/AppContext';
import { PRODUCTS, type ProductSlug } from '../data/products';
import { toAbsoluteUrl } from '../lib/i18n';
import './Home.css';

const containerAnim = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const PLATFORM_ICONS = [Layers3, ShieldCheck, Radar, LineChart];
const HERO_CYCLE_MS = 10000;
const HERO_DECK_OFFSETS = [-2, -1, 0, 1, 2] as const;

const HERO_UI = {
  tr: {
    tabsLabel: 'Hero ürün sekmeleri',
    autoPlay: '10 sn otomatik akış',
    paused: 'Akış duraklatıldı',
    explore: 'Ürünü İncele',
    filePrefix: 'urun-akisi',
    previous: 'Önceki ürün',
    next: 'Sonraki ürün',
    flowLabel: 'Ürün sliderı',
    activeLabel: 'Aktif ürün',
    stageLabel: 'Canlı senaryo',
    detailLabel: 'Detay katmanı',
  },
  en: {
    tabsLabel: 'Hero product tabs',
    autoPlay: '10s autoplay',
    paused: 'Flow paused',
    explore: 'Explore Product',
    filePrefix: 'product-flow',
    previous: 'Previous product',
    next: 'Next product',
    flowLabel: 'Product slider',
    activeLabel: 'Active product',
    stageLabel: 'Live scenario',
    detailLabel: 'Detail layer',
  },
} satisfies Record<
  Locale,
  {
    tabsLabel: string;
    autoPlay: string;
    paused: string;
    explore: string;
    filePrefix: string;
    previous: string;
    next: string;
    flowLabel: string;
    activeLabel: string;
    stageLabel: string;
    detailLabel: string;
  }
>;

const HERO_SLOGANS = {
  tr: {
    manager: {
      chip: 'Operasyon çekirdeği',
      title: ['Filo Operasyonunu', 'Tek Panelde', 'Yönetin'],
      subtitle:
        'Sözleşme, bakım, maliyet ve günlük operasyonları tek görünürlük katmanında toplayın.',
    },
    rent: {
      chip: 'Mobilite sürekliliği',
      title: ['İkame ve Kiralama', 'Akışını', 'Hızlandırın'],
      subtitle:
        'Teklif, yönlendirme ve tedarikçi koordinasyonunu daha hızlı ve daha şeffaf bir yapıya taşıyın.',
    },
    partner: {
      chip: 'Servis ağı kontrolü',
      title: ['Tedarikçi Ağınızı', 'Tek Standartta', 'Büyütün'],
      subtitle:
        'Servis kalitesi, SLA yönetimi ve onay akışlarını kurumsal ölçekte tek sistemde yönetin.',
    },
    tyre: {
      chip: 'Lastik yaşam döngüsü',
      title: ['Lastik Operasyonunu', 'Veriyle', 'Optimize Edin'],
      subtitle:
        'Stok, değişim, aşınma ve maliyet kararlarını daha yüksek görünürlükle yönetin.',
    },
    tracker: {
      chip: 'Canlı mobilite katmanı',
      title: ['Sahadaki Her Hareketi', 'Anlık', 'Görün'],
      subtitle:
        'Araç kullanımı, sürüş davranışı ve risk sinyallerini gerçek zamanlı olarak izleyin.',
    },
    smart: {
      chip: 'Akıllı karar motoru',
      title: ['Belge ve Hasarı', 'Smart Katmanla', 'Yorumlayın'],
      subtitle:
        'Eksper, servis ve operasyon ekiplerine hız kazandıran öngörülü karar desteği oluşturun.',
    },
    trader: {
      chip: 'Ticari görünürlük',
      title: ['Araç Ticaretini', 'Daha Akıllı', 'Yönetin'],
      subtitle:
        'Değerleme, portföy ve alım-satım zamanlamasını veri odaklı kararlarla güçlendirin.',
    },
  },
  en: {
    manager: {
      chip: 'Operational core',
      title: ['Run Fleet Operations', 'From One', 'Control Layer'],
      subtitle:
        'Bring contracts, maintenance, cost control, and daily workflows into one visible command center.',
    },
    rent: {
      chip: 'Mobility continuity',
      title: ['Accelerate Rental', 'And Replacement', 'Workflows'],
      subtitle:
        'Turn quoting, dispatch, and supplier coordination into a faster and more transparent operating flow.',
    },
    partner: {
      chip: 'Service network control',
      title: ['Scale Your Supplier', 'Network With', 'One Standard'],
      subtitle:
        'Manage service quality, SLA governance, and approval flows in one enterprise-grade system.',
    },
    tyre: {
      chip: 'Tyre lifecycle',
      title: ['Optimize Tyre', 'Operations', 'With Data'],
      subtitle:
        'Drive stock, replacement, wear, and cost decisions with stronger operational visibility.',
    },
    tracker: {
      chip: 'Live mobility layer',
      title: ['See Every Field', 'Signal In', 'Real Time'],
      subtitle:
        'Monitor vehicle usage, driver behavior, and risk signals continuously across the fleet.',
    },
    smart: {
      chip: 'Intelligent decision engine',
      title: ['Interpret Damage', 'And Documents', 'With Smart'],
      subtitle:
        'Create predictive operational support that helps experts, service teams, and managers move faster.',
    },
    trader: {
      chip: 'Commercial visibility',
      title: ['Manage Vehicle', 'Trading With', 'Sharper Decisions'],
      subtitle:
        'Strengthen valuation, portfolio strategy, and buy-sell timing with data-backed decisions.',
    },
  },
} satisfies Record<
  Locale,
  Record<
    ProductSlug,
    {
      chip: string;
      title: [string, string, string];
      subtitle: string;
    }
  >
>;

const HERO_EASE = [0.22, 1, 0.36, 1] as const;
const INTEGRATION_MEDIA = {
  primary: `${import.meta.env.BASE_URL}entegrasyon.png`,
  secondary: `${import.meta.env.BASE_URL}entegrasyon2.png`,
} as const;
const INTEGRATION_MEDIA_ALT = {
  tr: {
    primary: 'FleetMole sistem entegrasyon görünümü',
    secondary: 'FleetMole ortak veri akışı diyagramı',
  },
  en: {
    primary: 'FleetMole systems integration visual',
    secondary: 'FleetMole shared data flow diagram',
  },
} satisfies Record<Locale, { primary: string; secondary: string }>;

const HERO_COPY_STAGE_ANIM = {
  hidden: { opacity: 0.01 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.32, ease: HERO_EASE },
  },
};

const HERO_COPY_ITEM_ANIM = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.88, ease: HERO_EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.28, ease: HERO_EASE },
  },
};

const HERO_TITLE_GROUP_ANIM = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const HERO_TITLE_LINE_ANIM = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.92, ease: HERO_EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: HERO_EASE },
  },
};

const HERO_BUTTON_GROUP_ANIM = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const HERO_STAGE_SWAP_ANIM = {
  hidden: { opacity: 0, y: 24, scale: 0.992 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.94,
      ease: HERO_EASE,
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.996,
    transition: {
      duration: 0.32,
      ease: HERO_EASE,
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const HERO_STAGE_SECTION_ANIM = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: HERO_EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.24, ease: HERO_EASE },
  },
};

const HERO_STAGE_PANEL_GROUP_ANIM = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const HERO_STAGE_PANEL_ANIM = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: HERO_EASE },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.22, ease: HERO_EASE },
  },
};

const Home = () => {
  const { t, lang, localizePath, featuredProductSlug, setFeaturedProductSlug } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroAutoplayActive, setHeroAutoplayActive] = useState(true);

  const faqItems = t.faq.items;
  const heroUi = HERO_UI[lang];
  const heroProduct = PRODUCTS.find((product) => product.slug === featuredProductSlug) ?? PRODUCTS[0];
  const heroNarrative = HERO_SLOGANS[lang][heroProduct.slug];
  const heroIndex = Math.max(0, PRODUCTS.findIndex((product) => product.slug === heroProduct.slug));
  const heroOrder = String(heroIndex + 1).padStart(2, '0');
  const heroTotal = String(PRODUCTS.length).padStart(2, '0');
  const heroHighlights = heroProduct.benefits[lang].slice(0, 2);
  const heroDeckCards = HERO_DECK_OFFSETS.map((offset) => {
    const deckIndex = (heroIndex + offset + PRODUCTS.length) % PRODUCTS.length;
    const product = PRODUCTS[deckIndex];
    const deckNarrative = HERO_SLOGANS[lang][product.slug];
    const deckOrder = String(deckIndex + 1).padStart(2, '0');
    const distance = Math.abs(offset);
    const direction = Math.sign(offset);
    const deckWidth = offset === 0 ? 'clamp(17.6rem, 21.2vw, 19.4rem)' : distance === 1 ? 'clamp(14.6rem, 17vw, 16rem)' : 'clamp(13rem, 14.8vw, 14.2rem)';
    const deckHeight = offset === 0 ? 'clamp(18.4rem, 22vw, 20.6rem)' : distance === 1 ? 'clamp(15.6rem, 18.6vw, 17.1rem)' : 'clamp(14.2rem, 16.2vw, 15.2rem)';
    const deckScale = offset === 0 ? 1.14 : distance === 1 ? 0.91 : 0.77;
    const deckOpacity = offset === 0 ? 1 : distance === 1 ? 0.66 : 0.24;
    const deckRise = offset === 0 ? '-0.95rem' : distance === 1 ? '1rem' : '2.2rem';
    const deckShift = offset === 0 ? '0rem' : `${direction * (distance === 1 ? 5.25 : 9.15)}rem`;
    const deckRotate = offset === 0 ? '0deg' : `${direction * (distance === 1 ? 8 : 13)}deg`;
    const deckLabelOpacity = offset === 0 ? '1' : distance === 1 ? '0.48' : '0';
    const deckLabelShift = offset === 0 ? '0rem' : distance === 1 ? '0.34rem' : '0.72rem';
    const deckCopyOpacity = offset === 0 ? '1' : distance === 1 ? '0.48' : '0';
    const deckCopyShift = offset === 0 ? '0rem' : distance === 1 ? '0.28rem' : '0.78rem';
    const deckNoteOpacity = offset === 0 ? '1' : distance === 1 ? '0.4' : '0';
    const deckMarkScale = offset === 0 ? '1.16' : distance === 1 ? '0.88' : '0.74';
    const deckMarkOpacity = offset === 0 ? '1' : distance === 1 ? '0.76' : '0.42';
    const deckBrightness = offset === 0 ? '1.08' : distance === 1 ? '0.84' : '0.62';

    return {
      product,
      narrative: deckNarrative,
      order: deckOrder,
      offset,
      isActive: offset === 0,
      style: {
        '--tab-primary': product.theme.primary,
        '--tab-soft': product.theme.soft,
        '--deck-offset': String(offset),
        '--deck-rotate': deckRotate,
        '--deck-scale': `${deckScale}`,
        '--deck-opacity': `${deckOpacity}`,
        '--deck-rise': deckRise,
        '--deck-shift': deckShift,
        '--deck-width': deckWidth,
        '--deck-height': deckHeight,
        '--deck-z': String(40 - distance),
        '--deck-blur': `${distance === 2 ? 1.15 : distance === 1 ? 0.4 : 0}px`,
        '--deck-saturate': `${offset === 0 ? 1.04 : distance === 1 ? 0.9 : 0.76}`,
        '--deck-label-opacity': deckLabelOpacity,
        '--deck-label-shift': deckLabelShift,
        '--deck-copy-opacity': deckCopyOpacity,
        '--deck-copy-shift': deckCopyShift,
        '--deck-note-opacity': deckNoteOpacity,
        '--deck-mark-scale': deckMarkScale,
        '--deck-mark-opacity': deckMarkOpacity,
        '--deck-brightness': deckBrightness,
        '--deck-float-delay': `${(offset + 2) * 0.32}s`,
      } as CSSProperties,
    };
  });
  const heroPaused = !heroAutoplayActive;
  const heroStyle = {
    '--hero-primary': heroProduct.theme.primary,
    '--hero-secondary': heroProduct.theme.secondary,
    '--hero-soft': heroProduct.theme.soft,
    '--hero-dark': heroProduct.theme.dark,
    '--hero-cycle-duration': `${HERO_CYCLE_MS}ms`,
  } as CSSProperties;
  const seoTitle =
    lang === 'tr'
      ? 'FleetMole | Tek Ekosistemde Kurumsal Filo Yönetimi'
      : 'FleetMole | Enterprise Fleet Management in One Ecosystem';
  const seoDescription =
    lang === 'tr'
      ? 'FleetMole; kiralama, operasyon, tedarikçi ağı, lastik yönetimi, mobilite, yapay zekâ ve araç ticareti süreçlerini tek ekosistemde birleştirir.'
      : 'FleetMole brings leasing, operations, supplier networks, tyre management, mobility, Smart, and vehicle trading into one enterprise ecosystem.';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: COMPANY_NAME,
        url: toAbsoluteUrl(localizePath('/')),
      },
      {
        '@type': 'WebSite',
        name: 'FleetMole',
        url: toAbsoluteUrl(localizePath('/')),
        inLanguage: lang,
      },
      {
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  useEffect(() => {
    setFeaturedProductSlug((current) => current ?? PRODUCTS[0].slug);

    return () => {
      setFeaturedProductSlug(null);
    };
  }, [setFeaturedProductSlug]);

  useEffect(() => {
    const syncAutoplay = () => {
      setHeroAutoplayActive(window.scrollY < 16);
    };

    syncAutoplay();
    window.addEventListener('scroll', syncAutoplay, { passive: true });

    return () => {
      window.removeEventListener('scroll', syncAutoplay);
    };
  }, []);

  useEffect(() => {
    if (!heroAutoplayActive) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeaturedProductSlug((current) => {
        const currentIndex = PRODUCTS.findIndex((product) => product.slug === current);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % PRODUCTS.length;
        return PRODUCTS[nextIndex].slug;
      });
    }, HERO_CYCLE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [heroAutoplayActive, heroProduct.slug, setFeaturedProductSlug]);

  const cycleHeroProduct = (direction: 1 | -1) => {
    setFeaturedProductSlug((current) => {
      const currentIndex = PRODUCTS.findIndex((product) => product.slug === current);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex = (safeIndex + direction + PRODUCTS.length) % PRODUCTS.length;
      return PRODUCTS[nextIndex].slug;
    });
  };

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        pathname={localizePath('/')}
        locale={lang}
        alternates={{
          tr: '/tr',
          en: '/en',
          'x-default': '/tr',
        }}
        schema={schema}
        themeColor="#0F172A"
      />

      <div className="home-page">
        <div className="ambient-glow" />

        <section className="hero-section">
          <div className="container hero-grid" style={heroStyle}>
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, ease: HERO_EASE }}
            >
              <div className="hero-copy-shell">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={heroProduct.slug}
                    className="hero-copy-scene"
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={HERO_COPY_STAGE_ANIM}
                  >
                    <motion.h1 className="hero-title hero-title--dynamic" variants={HERO_TITLE_GROUP_ANIM}>
                      {heroNarrative.title.map((line, index) => (
                        <span key={line} className="hero-title-line">
                          <motion.span
                            variants={HERO_TITLE_LINE_ANIM}
                            className={index === 1 ? 'hero-title-accent' : undefined}
                          >
                            {line}
                          </motion.span>
                        </span>
                      ))}
                    </motion.h1>

                    <motion.p className="hero-sub hero-sub--dynamic" variants={HERO_COPY_ITEM_ANIM}>
                      {heroNarrative.subtitle}
                    </motion.p>

                    <motion.p className="hero-detail" variants={HERO_COPY_ITEM_ANIM}>
                      {heroProduct.detail[lang]}
                    </motion.p>

                    <motion.div className="hero-mobile-carousel" variants={HERO_COPY_ITEM_ANIM}>
                      <div className="hero-mobile-shell">
                        <div className="hero-mobile-progress" aria-hidden="true">
                          <span
                            key={heroProduct.slug}
                            className={`hero-mobile-progress-fill ${heroPaused ? 'paused' : ''}`}
                          />
                        </div>

                        <div className="hero-mobile-slider">
                          <div className="hero-mobile-stack" aria-hidden="true">
                            <span className="hero-mobile-stack-card hero-mobile-stack-card--mid" />
                            <span className="hero-mobile-stack-card hero-mobile-stack-card--rear" />
                          </div>

                          <motion.div
                            className="hero-mobile-track"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.14}
                            animate={{ x: `-${heroIndex * 100}%` }}
                            transition={{ duration: 0.86, ease: HERO_EASE }}
                            onDragEnd={(_, info) => {
                              if (info.offset.x <= -56 || info.velocity.x <= -320) {
                                cycleHeroProduct(1);
                              } else if (info.offset.x >= 56 || info.velocity.x >= 320) {
                                cycleHeroProduct(-1);
                              }
                            }}
                          >
                            {PRODUCTS.map((product, index) => {
                              const mobileNarrative = HERO_SLOGANS[lang][product.slug];
                              const mobileOrder = String(index + 1).padStart(2, '0');
                              const mobileFeatures = product.features.slice(0, 2);
                              const mobileBenefits = product.benefits[lang].slice(0, 2);

                              return (
                                <article
                                  key={product.slug}
                                  className={`hero-mobile-card ${product.slug === heroProduct.slug ? 'is-active' : ''}`}
                                  style={
                                    {
                                      '--hero-card-primary': product.theme.primary,
                                      '--hero-card-secondary': product.theme.secondary,
                                      '--hero-card-soft': product.theme.soft,
                                    } as CSSProperties
                                  }
                                >
                                  <div className="hero-mobile-card-meta">
                                    <span className="hero-mobile-chip">{mobileNarrative.chip}</span>
                                    <div className="hero-mobile-card-controls">
                                      <button
                                        type="button"
                                        className="hero-mobile-arrow hero-mobile-arrow--top"
                                        aria-label={heroUi.previous}
                                        onClick={() => cycleHeroProduct(-1)}
                                      >
                                        <ChevronLeft size={17} />
                                      </button>
                                      <div className="hero-mobile-counter">
                                        <strong>{mobileOrder}</strong>
                                        <span>{`/ ${heroTotal}`}</span>
                                      </div>
                                      <button
                                        type="button"
                                        className="hero-mobile-arrow hero-mobile-arrow--top"
                                        aria-label={heroUi.next}
                                        onClick={() => cycleHeroProduct(1)}
                                      >
                                        <ChevronRight size={17} />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="hero-mobile-card-brand">
                                    <div className="hero-mobile-brand-row">
                                      <span className="hero-mobile-brand-mark">
                                        <ProductWordmark
                                          product={product}
                                          className="hero-mobile-wordmark hero-mobile-wordmark--badge"
                                          height={48}
                                          alt=""
                                        />
                                      </span>
                                    </div>
                                    <span className="hero-mobile-category">{product.category[lang]}</span>
                                  </div>

                                  <div className="hero-mobile-top-cta">
                                    <ProductSiteLink
                                      productSlug={product.slug}
                                      className="btn-outline hero-mobile-btn hero-mobile-btn--secondary hero-mobile-btn--inline"
                                    >
                                      {heroUi.explore} <ChevronRight size={18} />
                                    </ProductSiteLink>
                                  </div>

                                  <div className="hero-mobile-title">
                                    {mobileNarrative.title.map((line, titleIndex) => (
                                      <span key={line} className="hero-mobile-title-line">
                                        <span className={titleIndex === 1 ? 'hero-mobile-title-accent' : undefined}>
                                          {line}
                                        </span>
                                      </span>
                                    ))}
                                  </div>

                                  <div className="hero-mobile-copy">
                                    <p className="hero-mobile-subtitle">{mobileNarrative.subtitle}</p>
                                    <p className="hero-mobile-detail">{product.description[lang]}</p>
                                    <p className="hero-mobile-note">{product.detail[lang]}</p>
                                  </div>

                                  <div className="hero-mobile-feature-grid">
                                    {mobileFeatures.map((feature, featureIndex) => (
                                      <article key={feature.title[lang]} className="hero-mobile-feature">
                                        <span className="hero-mobile-feature-index">{`0${featureIndex + 1}`}</span>
                                        <strong>{feature.title[lang]}</strong>
                                        <p>{feature.description[lang]}</p>
                                      </article>
                                    ))}
                                  </div>

                                  <div className="hero-mobile-benefits">
                                    {mobileBenefits.map((benefit) => (
                                      <span key={benefit} className="hero-mobile-benefit">
                                        <CheckCircle2 size={14} />
                                        <span>{benefit}</span>
                                      </span>
                                    ))}
                                  </div>

                                  <div className="hero-mobile-cta">
                                    <Link to={localizePath('/contact')} className="btn-primary hero-mobile-btn">
                                      {t.hero.cta} <ArrowRight size={18} />
                                    </Link>
                                  </div>

                                  <span className="hero-mobile-card-watermark" aria-hidden="true">
                                    {mobileOrder}
                                  </span>
                                </article>
                              );
                            })}
                          </motion.div>
                        </div>

                        <div className="hero-mobile-nav">
                          <div className="hero-mobile-nav-status" aria-live="polite">
                            <strong>{heroProduct.name}</strong>
                            <span>{heroUi.activeLabel}</span>
                          </div>
                        </div>

                        <div className="hero-mobile-dots" aria-label={heroUi.tabsLabel}>
                          {PRODUCTS.map((product) => (
                            <button
                              key={product.slug}
                              type="button"
                              className={`hero-mobile-dot ${product.slug === heroProduct.slug ? 'is-active' : ''}`}
                              aria-label={product.name}
                              aria-current={product.slug === heroProduct.slug ? 'true' : undefined}
                              onClick={() => setFeaturedProductSlug(product.slug)}
                              style={
                                {
                                  '--dot-color': product.theme.primary,
                                } as CSSProperties
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div className="hero-copy-meter" variants={HERO_COPY_ITEM_ANIM}>
                      <div className="hero-copy-counter">
                        <strong>{heroOrder}</strong>
                        <span>{`/ ${heroTotal}`}</span>
                      </div>

                      <div className="hero-copy-meter-main">
                        <span className="hero-copy-meter-label">{heroUi.flowLabel}</span>
                        <div className="hero-copy-progress" aria-hidden="true">
                          <span
                            key={heroProduct.slug}
                            className={`hero-copy-progress-fill ${heroPaused ? 'paused' : ''}`}
                          />
                        </div>
                      </div>

                      <div className="hero-copy-meter-active">
                        <span>{heroUi.activeLabel}</span>
                        <strong>{heroProduct.shortName}</strong>
                      </div>
                    </motion.div>

                    <motion.div className="hero-copy-highlights" variants={HERO_BUTTON_GROUP_ANIM}>
                      {heroHighlights.map((highlight) => (
                        <motion.div key={highlight} className="hero-copy-highlight" variants={HERO_COPY_ITEM_ANIM}>
                          <CheckCircle2 size={16} />
                          <span>{highlight}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div className="hero-btns hero-btns--stage" variants={HERO_BUTTON_GROUP_ANIM}>
                      <motion.div variants={HERO_COPY_ITEM_ANIM}>
                        <Link to={localizePath('/contact')} className="btn-primary hero-btn hero-btn--primary">
                          {t.hero.cta} <ArrowRight size={18} />
                        </Link>
                      </motion.div>
                      <motion.div variants={HERO_COPY_ITEM_ANIM}>
                        <ProductSiteLink
                          productSlug={heroProduct.slug}
                          className="btn-outline hero-btn hero-btn--secondary"
                        >
                          {heroUi.explore} <ChevronRight size={18} />
                        </ProductSiteLink>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.12, ease: HERO_EASE }}
              style={heroStyle}
            >
              <div
                className="hero-stage"
                role="tabpanel"
                id={`hero-panel-${heroProduct.slug}`}
                aria-labelledby={`hero-tab-${heroProduct.slug}`}
              >
                <div className="hero-tabs-shell">
                  <button
                    type="button"
                    className="hero-arrow hero-arrow--prev"
                    aria-label={heroUi.previous}
                    onClick={() => cycleHeroProduct(-1)}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <div className="hero-tabs" role="tablist" aria-label={heroUi.tabsLabel}>
                    <div className="hero-tabs-track">
                      {heroDeckCards.map(({ product, narrative, order, isActive, style }) => {
                        return (
                          <button
                            key={product.slug}
                            type="button"
                            role="tab"
                            className={`hero-tab ${isActive ? 'active' : ''}`}
                            aria-label={product.name}
                            aria-selected={isActive}
                            aria-controls={`hero-panel-${product.slug}`}
                            id={`hero-tab-${product.slug}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setFeaturedProductSlug(product.slug)}
                            style={style}
                          >
                            {isActive ? (
                              <motion.span
                                layoutId="hero-tab-active"
                                className="hero-tab-active-bg"
                                transition={{ duration: 0.74, ease: HERO_EASE }}
                              />
                            ) : null}
                            <span className="hero-tab-frame">
                              <span className="hero-tab-top">
                                <span className="hero-tab-mark-wrap">
                                  <ProductWordmark
                                    product={product}
                                    className="hero-tab-wordmark"
                                    height={46}
                                    alt=""
                                  />
                                </span>
                                <span className="hero-tab-order">{order}</span>
                              </span>
                              <span className="hero-tab-copy">
                                <span className="hero-tab-eyebrow">{narrative.chip}</span>
                                <span className="hero-tab-label">{product.shortName}</span>
                                <span className="hero-tab-note">{product.summary[lang]}</span>
                                <span className="hero-tab-meta">{product.category[lang]}</span>
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="hero-arrow hero-arrow--next"
                    aria-label={heroUi.next}
                    onClick={() => cycleHeroProduct(1)}
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                <div className="hero-stage-detail-shell">
                  <div className="hero-stage-head">
                    <div className="hero-stage-dots">
                      <span className="api-dot blue" />
                      <span className="api-dot teal" />
                      <span className="api-dot violet" />
                      <span className="hero-stage-file">{`fleetmole-${heroProduct.slug}.${heroUi.filePrefix}`}</span>
                    </div>
                    <div className="hero-stage-badge">
                      <span className={`hero-stage-badge-dot ${heroPaused ? 'paused' : ''}`} />
                      <span>{heroUi.detailLabel}</span>
                    </div>
                  </div>

                  <div className="hero-stage-body">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.div
                        key={heroProduct.slug}
                        className="hero-stage-content"
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={HERO_STAGE_SWAP_ANIM}
                      >
                        <motion.div className="hero-stage-intro" variants={HERO_STAGE_SECTION_ANIM}>
                          <div className="hero-stage-mark-wrap">
                            <ProductMark product={heroProduct} variant="rail" size={48} className="hero-stage-mark" />
                          </div>

                          <div className="hero-stage-copy">
                            <span className="hero-stage-label">{heroProduct.category[lang]}</span>
                            <h2>{heroProduct.name}</h2>
                            <p>{heroProduct.description[lang]}</p>
                          </div>

                          <div className="hero-stage-stat">
                            <span className="hero-stage-stat-value">{heroOrder}</span>
                            <strong>{heroProduct.shortName}</strong>
                            <small>{heroUi.activeLabel}</small>
                          </div>
                        </motion.div>

                        <motion.div className="hero-stage-panels" variants={HERO_STAGE_PANEL_GROUP_ANIM}>
                          {heroProduct.features.map((feature, index) => (
                            <motion.article
                              key={feature.title[lang]}
                              className="hero-stage-panel"
                              variants={HERO_STAGE_PANEL_ANIM}
                            >
                              <span className="hero-stage-panel-index">{`0${index + 1}`}</span>
                              <strong>{feature.title[lang]}</strong>
                              <p>{feature.description[lang]}</p>
                            </motion.article>
                          ))}
                        </motion.div>

                        <motion.div className="hero-stage-footer" variants={HERO_STAGE_SECTION_ANIM}>
                          <div className="hero-stage-benefits">
                            {heroProduct.benefits[lang].map((benefit) => (
                              <motion.div
                                key={benefit}
                                className="hero-stage-benefit"
                                variants={HERO_STAGE_PANEL_ANIM}
                              >
                                <CheckCircle2 size={16} />
                                <span>{benefit}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="proofs-section">
          <div className="container proofs-grid">
            {t.proofs.map((proof, index) => (
              <motion.div
                key={proof.label}
                className="proof-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <strong>{proof.value}</strong>
                <h3>{proof.label}</h3>
                <p>{proof.detail}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="products" className="products-section">
          <div className="container">
            <div className="section-head">
              <h2>
                {t.products.title} <span className="text-gradient">{t.products.titleGrad}</span>
              </h2>
              <p>{t.products.subtitle}</p>
            </div>

            <motion.div
              className="products-grid"
              variants={containerAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {PRODUCTS.map((product) => (
                <motion.div key={product.slug} variants={itemAnim}>
                  <ProductSiteLink
                    productSlug={product.slug}
                    className="product-card"
                    style={
                      {
                        '--product-primary': product.theme.primary,
                        '--product-secondary': product.theme.secondary,
                        '--product-soft': product.theme.soft,
                      } as CSSProperties
                    }
                  >
                    <div className="product-card-top">
                      <span className="product-category">{product.category[lang]}</span>
                    </div>
                    <h3 className="product-card-title">
                      <span className="sr-only">{product.name}</span>
                      <ProductWordmark product={product} className="product-card-wordmark" height={38} alt="" />
                    </h3>
                    <p>{product.summary[lang]}</p>
                    <ul className="product-benefit-list">
                      {product.benefits[lang].slice(0, 2).map((benefit) => (
                        <li key={benefit}>
                          <CheckCircle2 size={15} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <span className="prod-arrow">
                      {t.misc.explore} <ArrowRight size={18} />
                    </span>
                  </ProductSiteLink>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="capabilities" className="platform-section">
          <div className="container">
            <div className="section-head">
              <h2>
                {t.platform.title} <span className="text-gradient">{t.platform.titleGrad}</span>
              </h2>
              <p>{t.platform.subtitle}</p>
            </div>

            <motion.div
              className="platform-grid"
              variants={containerAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t.platform.items.map((item, index) => {
                const Icon = PLATFORM_ICONS[index];
                return (
                  <motion.article key={item.title} className="platform-card" variants={itemAnim}>
                    <div className="platform-icon">
                      <Icon size={22} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="integration" className="integration-section">
          <div className="container integration-grid">
            <motion.div
              className="int-text"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>
                {t.integration.title1} <br />
                <span className="text-gradient">{t.integration.title2}</span>
              </h2>
              <p>{t.integration.desc}</p>
              <ul className="check-list">
                <li>
                  <CheckCircle2 size={18} />
                  {t.integration.check1}
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  {t.integration.check2}
                </li>
                <li>
                  <CheckCircle2 size={18} />
                  {t.integration.check3}
                </li>
              </ul>
              <Link to={localizePath('/contact')} className="btn-outline int-btn">
                {t.integration.apiBtn} <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              className="integration-media"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="integration-media-shell">
                <figure className="integration-media-card integration-media-card--primary">
                  <img
                    src={INTEGRATION_MEDIA.primary}
                    alt={INTEGRATION_MEDIA_ALT[lang].primary}
                    loading="lazy"
                  />
                </figure>

                <figure className="integration-media-card integration-media-card--secondary">
                  <img
                    src={INTEGRATION_MEDIA.secondary}
                    alt={INTEGRATION_MEDIA_ALT[lang].secondary}
                    loading="lazy"
                  />
                </figure>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="impact" className="impact-section">
          <div className="container">
            <div className="section-head">
              <h2>
                {t.impact.title} <span className="text-gradient">{t.impact.titleGrad}</span>
              </h2>
              <p>{t.impact.subtitle}</p>
            </div>

            <motion.div
              className="impact-grid"
              variants={containerAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {t.impact.items.map((item) => (
                <motion.article key={item.title} className="impact-card" variants={itemAnim}>
                  <span className="impact-badge">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="faq" className="faq-section">
          <div className="container">
            <div className="section-head">
              <h2>
                {t.faq.title} <span className="text-gradient">{t.faq.titleGrad}</span>
              </h2>
              <p>{t.faq.subtitle}</p>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.q}
                  className={`faq-item ${openFaq === index ? 'open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <div className="faq-q">
                    <span>{item.q}</span>
                    {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="cta-section">
          <div className="container">
            <motion.div
              className="cta-banner"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="cta-bg-glow" />
              <Cpu className="cta-icon" size={24} />
              <h2>{t.cta.title}</h2>
              <p>{t.cta.subtitle}</p>
              <Link to={localizePath('/contact')} className="btn-primary cta-btn">
                {t.cta.btn} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
