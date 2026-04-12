import { useState } from 'react';
import {
  ArrowLeft,
  BellRing,
  CarFront,
  CheckCircle2,
  Cpu,
  FileDown,
  FileText,
  LayoutGrid,
  Layers3,
  MonitorSmartphone,
  PieChart,
  Shield,
  TableProperties,
} from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useProductSite } from './ProductSiteContext';
import {
  FALLBACK_PRODUCT_IMAGE,
  HARDWARE_PRODUCTS,
  getLocalizedDownloadLabel,
  getLocalizedProductDescription,
  getLocalizedProductSpecGroups,
  getLocalizedProductTagline,
  getLocalizedTechnicalText,
  getPresentationFeatureCards,
  getProductCategory,
  getProductSubcategory,
} from './productsData';
import './ProductSiteProductDetail.css';

const renderFeatureIcon = (iconKey: string) => {
  switch (iconKey) {
    case 'monitor':
      return <MonitorSmartphone size={28} strokeWidth={1.75} />;
    case 'car':
      return <CarFront size={28} strokeWidth={1.75} />;
    case 'bell':
      return <BellRing size={28} strokeWidth={1.75} />;
    case 'chart':
      return <PieChart size={28} strokeWidth={1.75} />;
    case 'shield':
      return <Shield size={28} strokeWidth={1.75} />;
    case 'layers':
      return <Layers3 size={28} strokeWidth={1.75} />;
    case 'cpu':
      return <Cpu size={28} strokeWidth={1.75} />;
    case 'file':
      return <FileText size={28} strokeWidth={1.75} />;
    default:
      return <CheckCircle2 size={28} strokeWidth={1.75} />;
  }
};

const ProductSiteProductDetail = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const { productId } = useParams<{ productId: string }>();
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'downloads'>('features');
  
  const productSiteRoot = getProductSitePath(product.slug, lang);

  if (product.slug !== 'tracker') {
    return <Navigate to={productSiteRoot} replace />;
  }
  
  const hwProduct = HARDWARE_PRODUCTS.find(p => p.id === productId);

  if (!hwProduct) {
    return <Navigate to={`${productSiteRoot}/products`} replace />;
  }

  const pageTitle = `${hwProduct.name} | ${product.name}`;
  const heroImage = hwProduct.heroImage ?? hwProduct.thumbnail;
  const heroImageFit = hwProduct.heroImageFit ?? 'contain';
  const localizedTagline = getLocalizedProductTagline(hwProduct, lang);
  const localizedDescription = getLocalizedProductDescription(hwProduct, lang);
  const hasGallery = Boolean(hwProduct.gallery?.length);
  const featureCards = getPresentationFeatureCards(hwProduct);
  const specGroups = getLocalizedProductSpecGroups(hwProduct, lang);
  const category = getProductCategory(hwProduct.categoryId);
  const subcategory = getProductSubcategory(hwProduct.categoryId, hwProduct.subcategoryId);
  const hasFeatureCards = Boolean(featureCards.length);
  const hasFeatures = Boolean(hwProduct.features?.length || featureCards.length);
  const hasSpecGroups = Boolean(specGroups.length);
  const hasSpecs = Boolean(specGroups.length);
  const hasDownloads = Boolean(hwProduct.downloads?.length);
  const quickFacts = [
    {
      label: lang === 'tr' ? 'Aile' : 'Family',
      value: category?.name[lang] ?? '-',
    },
    {
      label: lang === 'tr' ? 'Tür' : 'Type',
      value: subcategory?.name[lang] ?? '-',
    },
    {
      label: lang === 'tr' ? 'Teknik Satır' : 'Spec Rows',
      value: String(specGroups.reduce((total, group) => total + group.items.length, 0)),
    },
    {
      label: lang === 'tr' ? 'Doküman' : 'Docs',
      value: String(hwProduct.downloads?.length ?? 0),
    },
  ];

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={localizedDescription}
        pathname={`${productSiteRoot}/products/${hwProduct.id}`}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
      />

      <div className="product-site-page ps-product-detail-page">
        <div className="container">
          <div className="ps-product-detail-back">
            <Link to={`${productSiteRoot}/products`} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> {lang === 'tr' ? 'Ürünlere Dön' : 'Back to Products'}
            </Link>
          </div>

          <div className="ps-product-detail-hero">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`glass-panel ps-product-detail-hero-media ${heroImageFit === 'cover' ? 'is-cover' : ''}`}
            >
              <img src={heroImage} alt={hwProduct.name} onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE; }} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="ps-product-detail-hero-copy"
            >
              <span className="ps-chip">{hwProduct.name}</span>
              <h1>{localizedTagline}</h1>
              <p>{localizedDescription}</p>

              <div className="ps-product-detail-actions">
                <Link to={`${productSiteRoot}/contact`} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  {lang === 'tr' ? 'Teklif İste' : 'Request a Quote'}
                </Link>
                {hasDownloads && (
                  <a
                    href={hwProduct.downloads![0].url}
                    download
                    className="ps-product-detail-secondary-action"
                  >
                    <FileDown size={18} />
                    {getLocalizedDownloadLabel(hwProduct.downloads![0], lang)}
                  </a>
                )}
              </div>

              <div className="ps-product-detail-quickfacts">
                {quickFacts.map(item => (
                  <div key={item.label} className="ps-product-detail-quickfact">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <section className="ps-product-detail-tabs">
            <div className="ps-product-detail-tab-list" role="tablist" aria-label={lang === 'tr' ? 'Ürün detay sekmeleri' : 'Product detail tabs'}>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'features'}
                className={`ps-product-detail-tab ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                <LayoutGrid size={16} />
                {lang === 'tr' ? 'Özellikler' : 'Features'}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'specs'}
                className={`ps-product-detail-tab ${activeTab === 'specs' ? 'active' : ''}`}
                onClick={() => setActiveTab('specs')}
              >
                <TableProperties size={16} />
                {lang === 'tr' ? 'Teknik Özellikler' : 'Specifications'}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'downloads'}
                className={`ps-product-detail-tab ${activeTab === 'downloads' ? 'active' : ''}`}
                onClick={() => setActiveTab('downloads')}
              >
                <FileDown size={16} />
                {lang === 'tr' ? 'İndirilebilirler' : 'Downloads'}
              </button>
            </div>

            <div className="glass-panel ps-product-detail-tab-panel" role="tabpanel">
              {activeTab === 'features' && (
                <div className="ps-product-detail-tab-content">
                  {hasFeatureCards ? (
                    <div className="ps-product-detail-feature-grid">
                      {featureCards.map((feature, idx) => (
                        <article key={`${hwProduct.id}-feature-${idx}`} className="ps-product-detail-feature-card">
                          <div className="ps-product-detail-feature-icon">
                            {renderFeatureIcon(feature.icon)}
                          </div>
                          <h3>{getLocalizedTechnicalText(feature.title, lang)}</h3>
                          <p>{getLocalizedTechnicalText(feature.description, lang)}</p>
                        </article>
                      ))}
                    </div>
                  ) : hasFeatures ? (
                    <>
                      <div className="ps-product-detail-overview">
                        <h3>{lang === 'tr' ? 'Ürün Genel Bakış' : 'Product Overview'}</h3>
                        <p>{localizedDescription}</p>
                      </div>
                    <div className="ps-product-detail-feature-list">
                      {hwProduct.features!.map((feat, idx) => (
                        <div key={idx} className="ps-product-detail-feature-item">
                          <CheckCircle2 color="var(--primary)" size={20} />
                          <span>{getLocalizedTechnicalText(feat, lang)}</span>
                        </div>
                      ))}
                    </div>
                    </>
                  ) : (
                    <div className="ps-product-detail-empty">
                      {lang === 'tr'
                        ? 'Bu ürün için detaylı özellik maddeleri bir sonraki içerik turunda eklenecek.'
                        : 'Detailed feature bullets for this product will be added in the next content pass.'}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                hasSpecs ? (
                  <div className="ps-product-detail-specs">
                    {hasSpecGroups ? (
                      specGroups.map((group, groupIdx) => (
                        <section key={`${hwProduct.id}-group-${groupIdx}`} className="ps-product-detail-spec-group">
                          <h3>{group.title}</h3>
                          <div className="ps-product-detail-spec-group-rows">
                            {group.items.map((spec, idx) => (
                              <div key={`${hwProduct.id}-group-${groupIdx}-row-${idx}`} className="ps-product-detail-spec-row">
                                <div>{spec.label}</div>
                                <div className="ps-product-detail-spec-value">{spec.value}</div>
                              </div>
                            ))}
                          </div>
                        </section>
                      ))
                    ) : (
                      hwProduct.specs.map((spec, idx) => (
                        <div key={idx} className="ps-product-detail-spec-row">
                          <div>{getLocalizedTechnicalText(spec.label, lang)}</div>
                          <div className="ps-product-detail-spec-value">{getLocalizedTechnicalText(spec.value, lang)}</div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="ps-product-detail-empty">
                    {lang === 'tr'
                      ? 'Teknik özellik tablosu bu ürün için henüz doldurulmadı.'
                      : 'The specification table has not been filled for this product yet.'}
                  </div>
                )
              )}

              {activeTab === 'downloads' && (
                hasDownloads ? (
                  <div className="ps-product-detail-downloads">
                    {hwProduct.downloads!.map((item, idx) => (
                      <a key={idx} href={item.url} download className="ps-product-detail-download-item">
                        <FileDown size={18} />
                        <span>{getLocalizedDownloadLabel(item, lang)}</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="ps-product-detail-empty">
                    {lang === 'tr'
                      ? 'İndirilebilir dokümanlar eklendiğinde burada listelenecek.'
                      : 'Downloadable documents will be listed here once they are added.'}
                  </div>
                )
              )}
            </div>
          </section>

          {hasGallery && (
            <section className="ps-product-detail-gallery">
              <div className="ps-product-detail-section-head">
                <span className="ps-chip">{lang === 'tr' ? 'Ürün Görselleri' : 'Product Visuals'}</span>
                <h2>{lang === 'tr' ? 'Detay ekranı için seçilmiş görseller' : 'Selected visuals for the detail experience'}</h2>
              </div>
              <div className="ps-product-detail-gallery-grid">
                {hwProduct.gallery!.map((image, index) => (
                  <figure key={`${hwProduct.id}-${index}`} className="glass-panel ps-product-detail-gallery-card">
                    <img src={image.src} alt={image.alt[lang]} />
                  </figure>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSiteProductDetail;
