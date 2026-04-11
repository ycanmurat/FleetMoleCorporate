import { ArrowRight, CalendarCheck2, Eye, Layers, MonitorSmartphone, Play, Radar, Route, ShieldCheck, Zap } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useProductSite } from './ProductSiteContext';

const transition = { duration: 0.5, ease: 'easeOut' as const };

const ProductSiteDemo = () => {
  const { lang } = useApp();
  const { product } = useProductSite();

  const productSiteRoot = getProductSitePath(product.slug, lang);
  const pageTitle = lang === 'tr' ? `${product.name} | Demo` : `${product.name} | Demo`;
  const contactPath = `${productSiteRoot}/contact`;

  if (product.slug !== 'tracker') {
    return <Navigate to={productSiteRoot} replace />;
  }

  const demoFeatures = [
    {
      icon: <Radar size={22} />,
      title: { tr: 'Canl\u0131 Harita G\u00f6r\u00fcn\u00fcm\u00fc', en: 'Live Map View' },
      body: {
        tr: 'Filonuzdaki ara\u00e7lar\u0131n anl\u0131k konumlar\u0131n\u0131, h\u0131z ve durum bilgileriyle ger\u00e7ek zamanl\u0131 harita \u00fczerinde izleyin.',
        en: 'Track the real-time position, speed, and status of every vehicle in your fleet on a live coordinated map.',
      },
    },
    {
      icon: <Route size={22} />,
      title: { tr: 'Rota & Ge\u00e7mi\u015f Tekrar\u0131', en: 'Trip History Replay' },
      body: {
        tr: 'Herhangi bir arac\u0131n belirli bir g\u00fcnk\u00fc rotas\u0131n\u0131 s\u00fcr\u00fc\u015f olaylar\u0131 ve duraklamalar\u0131yla birlikte geri oynat\u0131n.',
        en: "Replay any vehicle's route for any given day, complete with driving events and stop timestamps.",
      },
    },
    {
      icon: <ShieldCheck size={22} />,
      title: { tr: 'Alarm & Kural Motoru', en: 'Alert & Rules Engine' },
      body: {
        tr: 'Geo-fence ihlali, h\u0131z a\u015f\u0131m\u0131 ve uygunsuz kullan\u0131m senaryolar\u0131n\u0131 canl\u0131 olarak tetikleti\u0307p g\u00f6zlemleyin.',
        en: 'Trigger live geofence violations, speeding alerts, and misuse scenarios right in the demo environment.',
      },
    },
    {
      icon: <Layers size={22} />,
      title: { tr: 'S\u00fcr\u00fcc\u00fc Skorlama Paneli', en: 'Driver Scoring Dashboard' },
      body: {
        tr: 'An\u0131 fren, sert d\u00f6n\u00fc\u015f ve r\u00f6lanti gibi metrikleri birle\u015ftiren s\u00fcr\u00fcc\u00fc risk puanlar\u0131n\u0131 inceleyin.',
        en: 'Explore individual driver risk scores built from harsh braking, sharp cornering, and idle metrics.',
      },
    },
    {
      icon: <MonitorSmartphone size={22} />,
      title: { tr: '\u00c7apraz Platform Deneyimi', en: 'Cross-Platform Experience' },
      body: {
        tr: 'FleetMole Tracker\u0027\u0131n masa\u00fcst\u00fc ve mobil g\u00f6r\u00fcn\u00fcmlerini ayn\u0131 demo ortam\u0131nda ke\u015ffedin.',
        en: 'Explore FleetMole Tracker across desktop and mobile in the same demo environment.',
      },
    },
    {
      icon: <Zap size={22} />,
      title: { tr: 'Anl\u0131k Bak\u0131m Sinyalleri', en: 'Real-Time Maintenance Signals' },
      body: {
        tr: 'Motor ve kullan\u0131m verisi bak\u0131m ihtiyac\u0131n\u0131 \u00f6nceden tahmin eden sinyal yap\u0131s\u0131n\u0131 canl\u0131 ortamda g\u00f6r\u00fcn.',
        en: 'See the predictive signal structure that surfaces maintenance needs before failures occur.',
      },
    },
  ];

  const steps = [
    {
      num: '01',
      title: { tr: 'Demo Randevusu', en: 'Book a Session' },
      body: {
        tr: '\u0130leti\u015fim formu \u00fczerinden uygun bir 30 dakikal\u0131k slot se\u00e7in. Demo ekibimiz size \u00f6zel bir ortam haz\u0131rlar.',
        en: 'Pick a 30-minute slot via the contact form. Our demo team prepares a personalised environment for you.',
      },
    },
    {
      num: '02',
      title: { tr: 'Canl\u0131 Tur', en: 'Guided Live Tour' },
      body: {
        tr: '\u00dcr\u00fcn uzman\u0131m\u0131z, operasyon s\u00fcre\u00e7lerinize en yak\u0131n senaryolardan ba\u015flayarak sistemi birlikte gezer.',
        en: 'A product specialist walks you through scenarios closest to your real operations from the very first screen.',
      },
    },
    {
      num: '03',
      title: { tr: 'Soru & Senaryo', en: 'Scenario Q&A' },
      body: {
        tr: 'Kendi filozofu ve alarm yap\u0131s\u0131na dair spesifik sorular\u0131 do\u011frudan demo ortam\u0131nda test edin.',
        en: 'Test your specific fleet and alert questions directly against live data in the demo sandbox.',
      },
    },
    {
      num: '04',
      title: { tr: 'Sonraki Ad\u0131m', en: 'Next Step' },
      body: {
        tr: 'Demo sonras\u0131 entegrasyon kapsam\u0131, cihaz se\u00e7imi veya pilot proje i\u00e7in a\u00e7\u0131k bir aksiyon plan\u0131yla ayr\u0131l\u0131n.',
        en: 'Leave with a clear action plan for integration scope, hardware selection, or your pilot project.',
      },
    },
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={
          lang === 'tr'
            ? 'FleetMole Tracker\u0027\u0131 canl\u0131 demo ortam\u0131nda ke\u015ffedin.'
            : 'Explore FleetMole Tracker in a live demo environment.'
        }
        pathname={`${productSiteRoot}/demo`}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
      />

      <div className="product-site-page">

        {/* ── SECTION 1: Hero ── */}
        <section style={{ paddingTop: '140px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: `radial-gradient(ellipse at center, ${product.theme.primary}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0 }}
            >
              <span className="ps-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Play size={14} fill="currentColor" />
                {lang === 'tr' ? 'Canl\u0131 Demo' : 'Live Demo'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.1 }}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.5rem', marginBottom: '2rem' }}
            >
              {lang === 'tr' ? (
                <>Sisteme bakmadan karar vermek<br /><span style={{ color: 'var(--primary)' }}>gerekmez.</span></>
              ) : (
                <>You don&apos;t have to decide<br /><span style={{ color: 'var(--primary)' }}>without seeing it first.</span></>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.2 }}
              style={{ maxWidth: '640px', margin: '0 auto 3rem', fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6 }}
            >
              {lang === 'tr'
                ? 'FleetMole Tracker\u0027\u0131 kendi filo verilerinize yak\u0131n bir ortamda, \u00fcr\u00fcn uzman\u0131 e\u015fli\u011finde 30 dakikada ke\u015ffedin. Kurulum yok, taahh\u00fct yok.'
                : 'Explore FleetMole Tracker in an environment close to your own fleet data, guided by a product specialist in 30 minutes. No setup. No commitment.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link to={contactPath} className="btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                {lang === 'tr' ? 'Demo Planla' : 'Schedule Demo'} <CalendarCheck2 size={18} />
              </Link>
              <Link to={`${productSiteRoot}/products`} className="btn-outline" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
                {lang === 'tr' ? 'Mobilite Ürünlerini Gör' : 'Browse Mobility Products'}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── SECTION 2: What You'll See ── */}
        <section className="ps-section" style={{ background: 'var(--surface-sunken)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="ps-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={14} />
                {lang === 'tr' ? 'Demo Kapsam\u0131' : "What You'll See"}
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '1rem', letterSpacing: '-0.02em' }}>
                {lang === 'tr' ? 'Demoda neler g\u00f6r\u00fcrs\u00fcn\u00fcz?' : "What's in the demo?"}
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '1rem auto 0', lineHeight: 1.6 }}>
                {lang === 'tr'
                  ? 'Ger\u00e7ek operasyon senaryolar\u0131na dayanan mod\u00fcler bir demo turu. \u0130htiyac\u0131n\u0131za g\u00f6re odak noktas\u0131 se\u00e7ilebilir.'
                  : 'A modular demo tour built around real operational scenarios. Focus areas can be tailored to your priorities.'}
              </p>
            </div>

            <div className="ps-card-grid">
              {demoFeatures.map((feat, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ ...transition, delay: idx * 0.07 }}
                  style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${product.theme.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                    {feat.icon}
                  </div>
                  <h3 style={{ fontSize: '1.125rem', margin: 0 }}>{feat.title[lang]}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{feat.body[lang]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: How it Works ── */}
        <section className="ps-section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="ps-chip">{lang === 'tr' ? 'S\u00fcre\u00e7' : 'How it works'}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '1rem', letterSpacing: '-0.02em' }}>
                {lang === 'tr' ? 'Ba\u015flamak i\u00e7in sadece 4 ad\u0131m' : 'Just 4 steps to get started'}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {steps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  className="glass-panel"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ ...transition, delay: idx * 0.1 }}
                  style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <span style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: `${product.theme.primary}40`, letterSpacing: '-0.04em' }}>{step.num}</span>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{step.title[lang]}</h3>
                  <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{step.body[lang]}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: CTA ── */}
        <section className="ps-section ps-section--soft">
          <div className="container">
            <motion.div
              className="glass-panel"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={transition}
              style={{
                padding: 'clamp(3rem, 6vw, 5rem)',
                textAlign: 'center',
                background: `linear-gradient(135deg, ${product.theme.primary}12, transparent)`,
                borderColor: `${product.theme.primary}30`,
              }}
            >
              <span className="ps-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <CalendarCheck2 size={14} />
                {lang === 'tr' ? '30 dakika \u00b7 \u00dccretsiz \u00b7 Online' : '30 minutes \u00b7 Free \u00b7 Online'}
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginTop: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {lang === 'tr' ? (
                  <>Filo verilerinizi sisteme yans\u0131t\u0131n.<br />Sonras\u0131na birlikte karar verin.</>
                ) : (
                  <>See your fleet data reflected in the system.<br />Then decide together on next steps.</>
                )}
              </h2>
              <p style={{ maxWidth: '560px', margin: '0 auto 3rem', color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>
                {lang === 'tr'
                  ? 'Ara\u00e7 say\u0131s\u0131, ba\u011flant\u0131 altyap\u0131s\u0131 veya alarm senaryolar\u0131ndan ba\u011f\u0131ms\u0131z olarak demo s\u00fcrecini sizin operasyon ger\u00e7eklerinize g\u00f6re kurgular\u0131z.'
                  : "Regardless of fleet size, connectivity infrastructure, or alert complexity \u2014 we structure the demo around your real operational context."}
              </p>
              <Link to={contactPath} className="btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                {lang === 'tr' ? 'Hemen Randevu Al' : 'Book Your Demo'} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default ProductSiteDemo;
