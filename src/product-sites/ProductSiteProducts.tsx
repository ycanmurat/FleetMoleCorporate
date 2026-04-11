import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useProductSite } from './ProductSiteContext';
import {
  FALLBACK_PRODUCT_IMAGE,
  HARDWARE_PRODUCTS,
  PRODUCT_CATEGORIES,
  getLocalizedProductDescription,
  getLocalizedProductTagline,
  getProductSubcategory,
} from './productsData';
import './ProductSiteProducts.css';

const ProductSiteProducts = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitle = lang === 'tr' ? `${product.name} | Ürünler` : `${product.name} | Products`;
  const productSiteRoot = getProductSitePath(product.slug, lang);

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

  const toggleCompare = (id: string, event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    setCompareItems((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, id];
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveSubcategory('all');
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={lang === 'tr' ? 'FleetMole Tracker mobilite ürün ekosistemi' : 'FleetMole Tracker mobility product ecosystem'}
        pathname={`${productSiteRoot}/products`}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
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
                const isComparing = compareItems.includes(productItem.id);

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

                      <div className="ps-premium-card-footer">
                        <Link to={`${productSiteRoot}/products/${productItem.id}`} className="ps-premium-detail-btn">
                          {lang === 'tr' ? 'Detaya Git' : 'Open Details'} <ArrowRight size={16} />
                        </Link>

                        <button
                          className={`ps-premium-compare-btn ${isComparing ? 'active' : ''}`}
                          onClick={(event) => toggleCompare(productItem.id, event)}
                          title={lang === 'tr' ? 'Karşılaştır' : 'Compare'}
                        >
                          {isComparing ? <Check size={16} /> : <Plus size={16} />}
                          <span>{lang === 'tr' ? 'Karşılaştır' : 'Compare'}</span>
                        </button>
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

      {compareItems.length > 0 ? (
        <div className="ps-compare-bar">
          <div className="container ps-compare-inner">
            <div className="ps-compare-selected">
              <strong>
                {lang === 'tr' ? 'Karşılaştırma' : 'Compare'} ({compareItems.length}/3)
              </strong>
              {compareItems.map((id) => {
                const selected = HARDWARE_PRODUCTS.find((productItem) => productItem.id === id);

                return (
                  <div key={id} className="ps-compare-item">
                    <span>{selected?.name}</span>
                    <button type="button" className="ps-compare-item-close" onClick={() => toggleCompare(id)}>
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="ps-compare-actions">
              <button type="button" className="ps-compare-clear" onClick={() => setCompareItems([])}>
                {lang === 'tr' ? 'Temizle' : 'Clear'}
              </button>
              <button
                className="btn-primary ps-compare-open"
                disabled={compareItems.length < 2}
                onClick={() => {
                  const searchParams = new URLSearchParams();
                  searchParams.set('items', compareItems.join(','));
                  navigate(`${productSiteRoot}/products/compare?${searchParams.toString()}`);
                }}
                type="button"
              >
                {lang === 'tr' ? 'Karşılaştırmayı Aç' : 'Open Comparison'} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductSiteProducts;
