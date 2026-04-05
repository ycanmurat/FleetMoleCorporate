import { useState, useMemo } from 'react';
import { ArrowRight, ChevronRight, Search, Plus, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  const catalogCopy = {
    title: lang === 'tr' ? 'Ürün Ekosistemimiz' : 'Our Product Ecosystem',
    body:
      lang === 'tr'
        ? 'Kapsamlı IoT çözüm ve ürün portföyümüzü keşfedin.'
        : 'Explore our comprehensive range of IoT solutions and products.',
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setActiveSubcategory('all'); // reset subcategory
  };

  const filteredProducts = useMemo(() => {
    let result = HARDWARE_PRODUCTS;
    
    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        getLocalizedProductTagline(p, lang).toLowerCase().includes(q) ||
        getLocalizedProductDescription(p, lang).toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categoryId === activeCategory);
    }

    // Subcategory filter
    if (activeSubcategory !== 'all') {
      result = result.filter(p => p.subcategoryId === activeSubcategory);
    }

    return result;
  }, [activeCategory, activeSubcategory, searchQuery, lang]);

  const activeCategoryObj = PRODUCT_CATEGORIES.find(c => c.id === activeCategory);
  const activeCategoryTitle = activeCategoryObj?.name[lang] ?? catalogCopy.title;
  const activeCategoryBody = activeCategoryObj?.description?.[lang] ?? catalogCopy.body;

  const toggleCompare = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCompareItems(prev => {
      if (prev.includes(id)) return prev.filter(c => c !== id);
      if (prev.length >= 3) return prev; // Limit to 3 items
      return [...prev, id];
    });
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description="Premium Donanım Ekosistemi"
        pathname={`${productSiteRoot}/products`}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
      />

      <div className="ps-catalog-layout">
        <div className="container">
          <section className="ps-catalog-intro">
            <span className="ps-chip">{catalogCopy.title}</span>
            <h1>{activeCategoryTitle}</h1>
            <p>{activeCategoryBody}</p>
          </section>
          
          {/* Top Horizontal Filter Area */}
          <div className="ps-premium-toolbar">
            
            {/* Spotlight Search */}
            <div className="ps-premium-search-box">
              <Search className="ps-premium-search-icon" size={20} />
              <input 
                type="text" 
                className="ps-premium-search-input"
                placeholder={lang === 'tr' ? 'FleetMole Ekosisteminde Ara...' : 'Search FleetMole Ecosystem...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Main Categories (Apple Style) */}
            <div className="ps-premium-categories">
              <button 
                className={`ps-premium-category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                <span>{lang === 'tr' ? 'Tümü' : 'All'}</span>
              </button>
              {PRODUCT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`ps-premium-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.name[lang]}</span>
                </button>
              ))}
            </div>

            {activeCategoryObj && activeCategoryObj.subcategories.length > 0 && (
              <div className="ps-premium-subcategories">
                <button 
                  className={`ps-premium-subcategory-btn ${activeSubcategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveSubcategory('all')}
                >
                  {lang === 'tr' ? 'Tümü' : 'All'}
                </button>
                {activeCategoryObj.subcategories.map(sub => (
                  <button
                    key={sub.id}
                    className={`ps-premium-subcategory-btn ${activeSubcategory === sub.id ? 'active' : ''}`}
                    onClick={() => setActiveSubcategory(sub.id)}
                  >
                    {sub.name[lang]}
                  </button>
                ))}
              </div>
            )}
            
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {filteredProducts.length} {lang === 'tr' ? 'ürün bulundu' : 'products found'}
          </div>

          {/* Premium Card Grid */}
          <div className="ps-premium-grid">
            {filteredProducts.map(p => {
              const category = PRODUCT_CATEGORIES.find(c => c.id === p.categoryId);
              const isComparing = compareItems.includes(p.id);
              
              return (
                <article key={p.id} className="ps-premium-card">
                  <Link to={`${productSiteRoot}/products/${p.id}`} className="ps-premium-card-img-area">
                    <span className="ps-premium-badge">{category?.name[lang]}</span>
                    <img 
                      src={p.thumbnail} 
                      alt={p.name} 
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE; }} 
                    />
                  </Link>
                  
                  <div className="ps-premium-card-body">
                    <Link to={`${productSiteRoot}/products/${p.id}`}>
                      <h3 className="ps-premium-card-title">{p.name}</h3>
                    </Link>
                    <p className="ps-premium-card-tagline">{getLocalizedProductTagline(p, lang)}</p>
                    <p className="ps-premium-card-desc">{getLocalizedProductDescription(p, lang)}</p>
                    
                    <div className="ps-premium-card-footer">
                      <Link to={`${productSiteRoot}/products/${p.id}`} className="ps-premium-detail-btn">
                        {lang === 'tr' ? 'İncele' : 'Details'} <ArrowRight size={16} style={{ marginLeft: 6 }} />
                      </Link>
                      
                      <button 
                        className={`ps-premium-compare-btn ${isComparing ? 'active' : ''}`}
                        onClick={(e) => toggleCompare(p.id, e)}
                        title={lang === 'tr' ? 'Karşılaştır' : 'Compare'}
                      >
                        {isComparing ? <Check size={16} /> : <Plus size={16} />}
                        {lang === 'tr' ? 'Karşılaştır' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          
          {filteredProducts.length === 0 && (
            <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>{lang === 'tr' ? 'Sonuç bulunamadı. Lütfen başka bir arama yapın.' : 'No results found. Please try another search.'}</p>
            </div>
          )}

        </div>
      </div>

      {/* Compare Bar */}
      {compareItems.length > 0 && (
        <div className="ps-compare-bar">
          <div className="container ps-compare-inner">
            <div className="ps-compare-selected">
              <strong style={{ whiteSpace: 'nowrap', marginRight: '1rem', color: 'var(--text-main)' }}>
                {lang === 'tr' ? 'Karşılaştır' : 'Compare'} ({compareItems.length}/3)
              </strong>
              {compareItems.map(id => {
                const prod = HARDWARE_PRODUCTS.find(p => p.id === id);
                return (
                  <div key={id} className="ps-compare-item">
                    {prod?.name}
                    <button className="ps-compare-item-close" onClick={() => toggleCompare(id)}>✕</button>
                  </div>
                )
              })}
            </div>
            
            <div className="ps-compare-actions">
              <button className="ps-compare-clear" onClick={() => setCompareItems([])}>
                {lang === 'tr' ? 'Temizle' : 'Clear all'}
              </button>
              <button 
                className="btn-primary" 
                disabled={compareItems.length < 2}
                style={{ opacity: compareItems.length < 2 ? 0.5 : 1, borderRadius: '999px', padding: '0.75rem 1.5rem' }}
                onClick={() => {
                  const searchParams = new URLSearchParams();
                  searchParams.set('items', compareItems.join(','));
                  navigate(`${productSiteRoot}/products/compare?${searchParams.toString()}`);
                }}
              >
                {lang === 'tr' ? 'Karşılaştırmayı Aç' : 'View Comparison'} <ChevronRight size={16} style={{ marginLeft: 6 }}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSiteProducts;
