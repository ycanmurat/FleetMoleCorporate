import { Fragment } from 'react';
import { ArrowLeft, Minus, Scale } from 'lucide-react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useProductSite } from './ProductSiteContext';
import {
  FALLBACK_PRODUCT_IMAGE,
  HARDWARE_PRODUCTS,
  getLocalizedProductDescription,
  getLocalizedProductSpecGroups,
  getLocalizedProductTagline,
} from './productsData';
import './ProductSiteCompare.css';

const ProductSiteCompare = () => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const [searchParams] = useSearchParams();

  const productSiteRoot = getProductSitePath(product.slug, lang);
  if (product.slug !== 'tracker') {
    return <Navigate to={productSiteRoot} replace />;
  }
  const itemIds = searchParams.get('items')?.split(',').filter(Boolean) || [];
  const compareProducts = itemIds.map(id => HARDWARE_PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (compareProducts.length < 2) {
    return <Navigate to={`${productSiteRoot}/products`} replace />;
  }

  const pageTitle = lang === 'tr' ? `Karşılaştırma | ${product.name}` : `Compare | ${product.name}`;
  const sectionMap = new Map<string, { title: string; rows: string[] }>();
  const valueMaps = new Map<string, Map<string, string>>();

  compareProducts.forEach(productItem => {
    const valueMap = new Map<string, string>();

    getLocalizedProductSpecGroups(productItem!, lang).forEach(group => {
      const sectionTitle = group.title;

      if (!sectionMap.has(sectionTitle)) {
        sectionMap.set(sectionTitle, { title: sectionTitle, rows: [] });
      }

      group.items.forEach(item => {
        const rowKey = `${sectionTitle}__${item.label}`;
        const section = sectionMap.get(sectionTitle)!;

        if (!section.rows.includes(rowKey)) {
          section.rows.push(rowKey);
        }

        valueMap.set(rowKey, item.value);
      });
    });

    valueMaps.set(productItem!.id, valueMap);
  });

  const compareSections = Array.from(sectionMap.values()).map(section => ({
    title: section.title,
    rows: section.rows.map(rowKey => ({
      key: rowKey,
      label: rowKey.split('__')[1] ?? rowKey,
    })),
  }));

  const hasSpecs = compareSections.length > 0;

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={lang === 'tr' ? 'Seçili ürünleri karşılaştırın.' : 'Compare selected products.'}
        pathname={`${productSiteRoot}/products/compare`}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
      />

      <div className="product-site-page ps-compare-page">
        <div className="container">
          <div className="ps-compare-header">
            <Link to={`${productSiteRoot}/products`} className="btn-primary ps-compare-back">
              <ArrowLeft size={16} /> {lang === 'tr' ? 'Ürünlere Dön' : 'Back to Products'}
            </Link>

            <div className="ps-compare-title-row">
              <div>
                <span className="ps-chip">
                  <Scale size={14} />
                  {lang === 'tr' ? 'Karşılaştırma' : 'Comparison'}
                </span>
                <h1>{lang === 'tr' ? 'Donanım Karşılaştırması' : 'Hardware Comparison'}</h1>
                <p>
                  {lang === 'tr'
                    ? `${compareProducts.length} ürünü aynı tabloda inceleyin, teknik farkları daha hızlı görün.`
                    : `Review ${compareProducts.length} products in one table and spot technical differences faster.`}
                </p>
              </div>
            </div>
          </div>

          <section className="ps-compare-product-grid">
            {compareProducts.map(productItem => (
              <article key={productItem!.id} className="glass-panel ps-compare-product-card">
                <div className="ps-compare-product-media">
                  <img
                    src={productItem!.thumbnail}
                    alt={productItem!.name}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                    }}
                  />
                </div>
                <div className="ps-compare-product-copy">
                  <span className="ps-chip">{productItem!.name}</span>
                  <h2>{getLocalizedProductTagline(productItem!, lang)}</h2>
                  <p>{getLocalizedProductDescription(productItem!, lang)}</p>
                </div>
              </article>
            ))}
          </section>

          {hasSpecs ? (
            <section className="glass-panel ps-compare-table-shell">
              <div className="ps-compare-table-wrap">
                <table className="ps-compare-table">
                  <thead>
                    <tr>
                      <th className="ps-compare-sticky-col">
                        {lang === 'tr' ? 'Özellikler' : 'Specifications'}
                      </th>
                      {compareProducts.map(productItem => (
                        <th key={productItem!.id}>{productItem!.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareSections.map(section => (
                      <Fragment key={section.title}>
                        <tr key={`${section.title}-title`} className="ps-compare-section-row">
                          <td className="ps-compare-sticky-col" colSpan={compareProducts.length + 1}>
                            {section.title}
                          </td>
                        </tr>
                        {section.rows.map(row => (
                          <tr key={row.key}>
                            <td className="ps-compare-label ps-compare-sticky-col">{row.label}</td>
                            {compareProducts.map(productItem => {
                              const value = valueMaps.get(productItem!.id)?.get(row.key);

                              return (
                                <td key={`${productItem!.id}-${row.key}`} className="ps-compare-value">
                                  {value ? (
                                    <span className="ps-compare-value-text">{value}</span>
                                  ) : (
                                    <span className="ps-compare-empty-cell">
                                      <Minus size={16} />
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <div className="glass-panel ps-compare-empty">
              {lang === 'tr'
                ? 'Bu karşılaştırma için teknik özellik verisi henüz yeterli değil. Ürün kartları hazır; teknik tablo ürün verileri genişledikçe otomatik zenginleşecek.'
                : 'Technical specification data is still limited for this comparison. Product cards are ready, and the table will become richer as product data expands.'}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSiteCompare;
