import { useMemo, useState } from 'react';
import {
  ArrowRight,
  FileDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { toAbsoluteUrl } from '../lib/i18n';
import { useProductSite } from './ProductSiteContext';
import { useProductSitePathMode } from './ProductSiteRuntimeContext';
import {
  FALLBACK_PRODUCT_IMAGE,
  HARDWARE_PRODUCTS,
  getLocalizedDownloadLabel,
  PRODUCT_CATEGORIES,
  getLocalizedProductDescription,
  getLocalizedProductTagline,
  getProductSubcategory,
} from './productsData';
import './ProductSiteProducts.css';

const ProductSiteProducts = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const pathMode = useProductSitePathMode();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitle = lang === 'tr' ? `${product.name} | Ürünler` : `${product.name} | Products`;
  const productSiteRoot = getProductSitePath(product.slug, lang, '/', pathMode);
  const productsPath = getProductSitePath(product.slug, lang, '/products', pathMode);
  const pageDescription =
    lang === 'tr'
      ? 'FleetMole Tracker ürün kataloğunda video telematics, GPS takip cihazları, tüketici ürünleri ve aksesuarları inceleyin.'
      : 'Explore video telematics, GPS trackers, consumer devices, and accessories in the FleetMole Tracker catalog.';

  if (product.slug !== 'tracker') {
    return <Navigate to={productSiteRoot} replace />;
  }

  const catalogCopy = {
    title: lang === 'tr' ? 'Tüm Ürünler' : 'All Products',
  };

  const searchFilteredProducts = useMemo(() => {
    if (searchQuery.trim() === '') {
      return HARDWARE_PRODUCTS;
    }

    const query = searchQuery.toLowerCase();

    return HARDWARE_PRODUCTS.filter((productItem) => {
      const subcategory = getProductSubcategory(productItem.categoryId, productItem.subcategoryId);

      return (
        productItem.name.toLowerCase().includes(query) ||
        getLocalizedProductTagline(productItem, lang).toLowerCase().includes(query) ||
        getLocalizedProductDescription(productItem, lang).toLowerCase().includes(query) ||
        (subcategory?.name[lang] ?? '').toLowerCase().includes(query)
      );
    });
  }, [lang, searchQuery]);

  const filteredProducts = useMemo(() => {
    let result = searchFilteredProducts;

    if (activeCategory !== 'all') {
      result = result.filter((productItem) => productItem.categoryId === activeCategory);
    }

    if (activeSubcategory !== 'all') {
      result = result.filter((productItem) => productItem.subcategoryId === activeSubcategory);
    }

    return result;
  }, [activeCategory, activeSubcategory, searchFilteredProducts]);

  const activeCategoryObj = PRODUCT_CATEGORIES.find((category) => category.id === activeCategory);
  const activeSubcategoryObj =
    activeCategoryObj?.subcategories.find((subcategory) => subcategory.id === activeSubcategory) ?? null;
  const activeCategoryTitle = activeCategoryObj?.name[lang] ?? catalogCopy.title;
  const contextTitle = activeSubcategoryObj?.name[lang] ?? activeCategoryTitle;
  const hasFilters = searchQuery.trim() !== '' || activeCategory !== 'all' || activeSubcategory !== 'all';

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        PRODUCT_CATEGORIES.map((category) => [
          category.id,
          searchFilteredProducts.filter((productItem) => productItem.categoryId === category.id).length,
        ]),
      ) as Record<string, number>,
    [searchFilteredProducts],
  );

  const activeSubcategoryCounts = useMemo(() => {
    if (!activeCategoryObj) {
      return {};
    }

    return Object.fromEntries(
      activeCategoryObj.subcategories.map((subcategory) => [
        subcategory.id,
        searchFilteredProducts.filter(
          (productItem) =>
            productItem.categoryId === activeCategoryObj.id && productItem.subcategoryId === subcategory.id,
        ).length,
      ]),
    ) as Record<string, number>;
  }, [activeCategoryObj, searchFilteredProducts]);

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveSubcategory('all');
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        pathname={productsPath}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
        alternates={{
          tr: getProductSitePath(product.slug, 'tr', '/products', pathMode),
          en: getProductSitePath(product.slug, 'en', '/products', pathMode),
          'x-default': getProductSitePath(product.slug, 'tr', '/products', pathMode),
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: pageTitle,
          description: pageDescription,
          url: toAbsoluteUrl(productsPath),
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: HARDWARE_PRODUCTS.length,
            itemListElement: HARDWARE_PRODUCTS.map((productItem, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: toAbsoluteUrl(
                getProductSitePath(product.slug, lang, `/products/${productItem.id}`, pathMode),
              ),
              name: productItem.name,
            })),
          },
        }}
        themeColor={product.theme.primary}
      />

      <div className="ps-catalog-layout">
        <div className="container">
          <section className="ps-catalog-context" aria-label={lang === 'tr' ? 'Katalog başlığı' : 'Catalog title'}>
            <span className="ps-catalog-context-prefix">{lang === 'tr' ? 'Tracker Ürünleri' : 'Tracker Products'}</span>
            <strong>{contextTitle}</strong>
          </section>

          <section className="ps-filter-shell glass-panel">
            <div className="ps-filter-top">
              <label className="ps-filter-search">
                <Search size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={
                    lang === 'tr'
                      ? 'Cihaz, kategori veya açıklama ile arayın'
                      : 'Search by device, category, or description'
                  }
                />
              </label>

              <div className="ps-filter-meta">
                <span>{`${filteredProducts.length} ${lang === 'tr' ? 'ürün' : 'products'}`}</span>
                {hasFilters ? (
                  <button type="button" className="ps-filter-reset" onClick={resetFilters}>
                    <RotateCcw size={15} />
                    <span>{lang === 'tr' ? 'Filtreleri temizle' : 'Clear filters'}</span>
                  </button>
                ) : null}
              </div>
            </div>

            <div className="ps-filter-groups">
              <div className="ps-filter-group ps-filter-group--categories">
                <div className="ps-filter-group-head">
                  <span>
                    <SlidersHorizontal size={15} />
                    {lang === 'tr' ? 'Kategoriler' : 'Categories'}
                  </span>
                </div>

                <div className="ps-filter-pills">
                  <button
                    type="button"
                    className={`ps-filter-pill ps-filter-pill--category ${activeCategory === 'all' ? 'is-active' : ''}`}
                    onClick={() => {
                      setActiveCategory('all');
                      setActiveSubcategory('all');
                    }}
                  >
                    <span>{lang === 'tr' ? 'Tümü' : 'All'}</span>
                    <small>{searchFilteredProducts.length}</small>
                  </button>

                  {PRODUCT_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={`ps-filter-pill ps-filter-pill--category ${activeCategory === category.id ? 'is-active' : ''}`}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setActiveSubcategory('all');
                      }}
                    >
                      <span>{category.name[lang]}</span>
                      <small>{categoryCounts[category.id] ?? 0}</small>
                    </button>
                  ))}
                </div>
              </div>

              {activeCategoryObj ? (
                <div className="ps-filter-group ps-filter-group--sub">
                  <div className="ps-filter-group-head">
                    <span>{lang === 'tr' ? 'Alt kategoriler' : 'Subcategories'}</span>
                  </div>

                  <div className="ps-filter-pills ps-filter-pills--sub">
                    <button
                      type="button"
                      className={`ps-filter-pill ps-filter-pill--sub ${activeSubcategory === 'all' ? 'is-active' : ''}`}
                      onClick={() => setActiveSubcategory('all')}
                    >
                      <span>{lang === 'tr' ? 'Tümü' : 'All'}</span>
                      <small>
                        {
                          searchFilteredProducts.filter(
                            (productItem) => productItem.categoryId === activeCategoryObj.id,
                          ).length
                        }
                      </small>
                    </button>

                    {activeCategoryObj.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        type="button"
                        className={`ps-filter-pill ps-filter-pill--sub ${activeSubcategory === subcategory.id ? 'is-active' : ''}`}
                        onClick={() => setActiveSubcategory(subcategory.id)}
                      >
                        <span>{subcategory.name[lang]}</span>
                        <small>{activeSubcategoryCounts[subcategory.id] ?? 0}</small>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {filteredProducts.length ? (
            <div className="ps-premium-grid">
              {filteredProducts.map((productItem) => {
                const category = PRODUCT_CATEGORIES.find((entry) => entry.id === productItem.categoryId);
                const subcategory = getProductSubcategory(productItem.categoryId, productItem.subcategoryId);
                const downloads = productItem.downloads ?? [];
                const hasDownloads = downloads.length > 0;

                return (
                  <article key={productItem.id} className="ps-premium-card">
                    <Link to={`${productSiteRoot}/products/${productItem.id}`} className="ps-premium-card-img-area">
                      <img
                        src={productItem.thumbnail}
                        alt={productItem.name}
                        onError={(event) => {
                          event.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                        }}
                      />
                    </Link>

                    <div className="ps-premium-card-body">
                      <div className="ps-premium-card-meta">
                        <span>{category?.name[lang]}</span>
                        <span>{subcategory?.name[lang]}</span>
                      </div>

                      <Link to={`${productSiteRoot}/products/${productItem.id}`}>
                        <h3 className="ps-premium-card-title">{productItem.name}</h3>
                      </Link>
                      <p className="ps-premium-card-tagline">{getLocalizedProductTagline(productItem, lang)}</p>
                      <p className="ps-premium-card-desc">{getLocalizedProductDescription(productItem, lang)}</p>

                      <div
                        className="ps-premium-downloads"
                        aria-label={lang === 'tr' ? `${productItem.name} kılavuzları` : `${productItem.name} guides`}
                      >
                        <div className="ps-premium-downloads-head">
                          <strong>{lang === 'tr' ? 'Kılavuzlar' : 'Guides'}</strong>
                          <span>
                            {hasDownloads
                              ? `${downloads.length} ${lang === 'tr' ? 'doküman' : downloads.length === 1 ? 'document' : 'documents'}`
                              : lang === 'tr'
                                ? 'Yakında'
                                : 'Soon'}
                          </span>
                        </div>

                        {hasDownloads ? (
                          <div className="ps-premium-download-list">
                            {downloads.map((download) => (
                              <a
                                key={`${productItem.id}-${download.url}`}
                                href={download.url}
                                download
                                className="ps-premium-download-link"
                              >
                                <FileDown size={15} />
                                <span>{getLocalizedDownloadLabel(download, lang)}</span>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <p className="ps-premium-download-placeholder">
                            {lang === 'tr'
                              ? 'Bu ürünün indirme linki yakında eklenecek.'
                              : 'Download links for this product will be added soon.'}
                          </p>
                        )}
                      </div>

                      <div className="ps-premium-card-footer">
                        <Link to={`${productSiteRoot}/products/${productItem.id}`} className="ps-premium-detail-btn">
                          {lang === 'tr' ? 'Detaya Git' : 'Open Details'} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="ps-catalog-empty glass-panel">
              <strong>{lang === 'tr' ? 'Sonuç bulunamadı' : 'No products found'}</strong>
              <p>
                {lang === 'tr'
                  ? 'Arama terimini sadeleştirerek veya kategori filtresini temizleyerek tekrar deneyin.'
                  : 'Try simplifying the search term or clearing the category filters.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSiteProducts;
