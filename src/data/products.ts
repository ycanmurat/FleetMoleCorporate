import type { Locale } from '../config/site';

type LocalizedText = Record<Locale, string>;

export interface ProductTheme {
  primary: string;
  secondary: string;
  soft: string;
  dark: string;
}

export interface ProductFeature {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProductDefinition {
  slug: string;
  name: string;
  shortName: string;
  category: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  detail: LocalizedText;
  benefits: Record<Locale, string[]>;
  features: ProductFeature[];
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  theme: ProductTheme;
}

const toRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;
  const color = Number.parseInt(value, 16);
  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const buildTheme = (primary: string, secondary: string, dark: string): ProductTheme => ({
  primary,
  secondary,
  soft: toRgba(primary, 0.14),
  dark,
});

const PRODUCT_DEFINITIONS = [
  {
    slug: 'manager',
    name: 'FleetMole Manager',
    shortName: 'Manager',
    category: {
      tr: 'Uçtan Uca Filo Yönetim Platformu',
      en: 'End-to-End Fleet Management Platform',
    },
    summary: {
      tr: 'Araç, sözleşme, bakım, maliyet ve yetkilendirme süreçlerini tek yönetim merkezinde toplar.',
      en: 'Brings vehicle, contract, maintenance, cost, and authorization workflows into one operational command center.',
    },
    description: {
      tr: 'FleetMole Manager, filo operasyonunun çekirdeğinde yer alan merkezi yönetim katmanıdır. Envanter, sözleşme, servis, bakım ve operasyon takibini tek panelde birleştirerek manuel iş yükünü azaltır ve karar alma hızını artırır.',
      en: 'FleetMole Manager is the central operating layer of the FleetMole ecosystem. It combines inventory, contracts, service, maintenance, and workflow tracking in one interface to reduce manual effort and accelerate decisions.',
    },
    detail: {
      tr: 'Rol bazlı yetkilendirme, otomatik hatırlatmalar, raporlama ve entegrasyon kabiliyeti sayesinde saha ekipleri, operasyon ekipleri ve yöneticiler aynı veri akışında çalışır.',
      en: 'With role-based permissions, automated reminders, reporting, and integration capabilities, field teams, operations teams, and decision-makers work on the same data stream.',
    },
    benefits: {
      tr: [
        'Araç ve sözleşme envanterini tek yerde yönetir',
        'Bakım, hasar ve servis akışlarını merkezi hale getirir',
        'Otomatik uyarı ve raporlarla operasyon görünürlüğü sağlar',
      ],
      en: [
        'Manages vehicle and contract inventory in one place',
        'Centralizes maintenance, damage, and service workflows',
        'Improves operational visibility with automated alerts and reports',
      ],
    },
    features: [
      {
        title: {
          tr: 'Merkezi Operasyon Paneli',
          en: 'Central Operations Hub',
        },
        description: {
          tr: 'Araç, sürücü, sözleşme ve servis kayıtlarını tek veri modelinde toplar.',
          en: 'Combines vehicles, drivers, contracts, and service records in a single operating model.',
        },
      },
      {
        title: {
          tr: 'Otomatik Takip ve Uyarılar',
          en: 'Automated Tracking and Alerts',
        },
        description: {
          tr: 'Bakım tarihleri, kilometre sınırları ve sözleşme adımlarını aksiyon bazlı hatırlatır.',
          en: 'Tracks maintenance dates, mileage thresholds, and contract milestones with action-based reminders.',
        },
      },
      {
        title: {
          tr: 'Karar Destek Raporlama',
          en: 'Decision-Support Reporting',
        },
        description: {
          tr: 'Maliyet, kullanım ve performans verilerini yönetici seviyesinde görünür hale getirir.',
          en: 'Surfaces cost, utilization, and performance data in a management-friendly reporting layer.',
        },
      },
    ],
    seoTitle: {
      tr: 'FleetMole Manager | Uçtan Uca Filo Yönetim Platformu',
      en: 'FleetMole Manager | End-to-End Fleet Management Platform',
    },
    seoDescription: {
      tr: 'FleetMole Manager ile araç, sözleşme, bakım ve operasyon süreçlerini tek panelde yönetin.',
      en: 'Manage vehicles, contracts, maintenance, and operations from one panel with FleetMole Manager.',
    },
    theme: buildTheme('#E94647', '#F16E6E', '#5E1C1C'),
  },
  {
    slug: 'rent',
    name: 'FleetMole Rent',
    shortName: 'Rent',
    category: {
      tr: 'İkame Araç, Kiralama ve İhale Platformu',
      en: 'Replacement Vehicle, Leasing, and Tender Platform',
    },
    summary: {
      tr: 'Çoklu teklif, lokasyon bazlı eşleştirme ve dijital ihale akışını tek platformda sunar.',
      en: 'Unifies multi-quote sourcing, location-based matching, and digital tender workflows in one platform.',
    },
    description: {
      tr: 'FleetMole Rent, kısa dönem kiralama, ikame araç ve ihale süreçlerini dijitalleştirir. Dağınık telefon ve teklif trafiği yerine hız, şeffaflık ve karşılaştırılabilir tedarik akışı sunar.',
      en: 'FleetMole Rent digitizes short-term rental, replacement vehicle, and bidding operations. It replaces fragmented calls and manual quote comparison with speed, transparency, and structured supplier workflows.',
    },
    detail: {
      tr: 'Tedarikçi kapasitesi, lokasyon, fiyat ve hizmet seçenekleri aynı ekranda görünür olur; böylece ekipler en uygun çözümü hızla seçebilir.',
      en: 'Supplier capacity, location, pricing, and service options become visible in a single interface so teams can select the best-fit solution quickly.',
    },
    benefits: {
      tr: [
        'Çoklu teklif ve online ihale süreçlerini hızlandırır',
        'Lokasyon ve hizmet kapasitesine göre uygun eşleşme sağlar',
        'Rezervasyon, yönlendirme ve faturalandırmayı tek akışta toplar',
      ],
      en: [
        'Speeds up multi-quote and online tender workflows',
        'Matches demand with the right supplier by location and capacity',
        'Combines reservation, dispatch, and billing in one flow',
      ],
    },
    features: [
      {
        title: {
          tr: 'Teklif ve İhale Akışı',
          en: 'Quote and Tender Flow',
        },
        description: {
          tr: '5 araç üstü taleplerde dijital şartname ve ihale akışıyla tedariki sadeleştirir.',
          en: 'Streamlines sourcing for larger vehicle requests with digital specifications and tender workflows.',
        },
      },
      {
        title: {
          tr: 'İkame Araç Yönetimi',
          en: 'Replacement Vehicle Management',
        },
        description: {
          tr: 'Arıza, bakım veya hasar durumlarında mobilite sürekliliğini kesintisiz sürdürür.',
          en: 'Protects mobility continuity during maintenance, damage, or breakdown events.',
        },
      },
      {
        title: {
          tr: 'Şeffaf Tedarikçi Görünürlüğü',
          en: 'Transparent Supplier Visibility',
        },
        description: {
          tr: 'Fiyat, lokasyon ve hizmet kapsamını karşılaştırılabilir hale getirir.',
          en: 'Makes price, location, and service scope easy to compare and act on.',
        },
      },
    ],
    seoTitle: {
      tr: 'FleetMole Rent | Kiralama ve İhale Platformu',
      en: 'FleetMole Rent | Leasing and Tender Platform',
    },
    seoDescription: {
      tr: 'FleetMole Rent ile çoklu teklif, ikame araç ve dijital ihale süreçlerini tek merkezden yönetin.',
      en: 'Run multi-quote sourcing, replacement vehicles, and digital tenders from one hub with FleetMole Rent.',
    },
    theme: buildTheme('#81BB27', '#A5D84A', '#2D4A12'),
  },
  {
    slug: 'tyre',
    name: 'FleetMole Tyre',
    shortName: 'Tyre',
    category: {
      tr: 'Lastik Yönetim Platformu',
      en: 'Tyre Management Platform',
    },
    summary: {
      tr: 'Lastik ömrü, stok, mevsimsel değişim ve saklama süreçlerini uçtan uca takip eder.',
      en: 'Tracks tyre lifecycle, stock, seasonal changes, and storage processes end to end.',
    },
    description: {
      tr: 'FleetMole Tyre, lastik tedariki ve kullanım ömrü yönetimini dijital bir operasyon akışına dönüştürür. Mevsimsel değişimler, kilometre bazlı aşınma ve saklama süreçleri tek ekrandan planlanır.',
      en: 'FleetMole Tyre turns tyre sourcing and lifecycle management into a structured digital workflow. Seasonal replacements, mileage-based wear, and storage processes are planned from one interface.',
    },
    detail: {
      tr: 'Araçtan bağımsız stok takibi sayesinde kullanılabilir lastik varlığı görünür olur ve gider optimizasyonu desteklenir.',
      en: 'Stock can be tracked independently of the vehicle, which improves asset visibility and supports cost optimization.',
    },
    benefits: {
      tr: [
        'Mevsimsel değişim ve iş emri planlamasını merkezileştirir',
        'Stok, otel ve ömür bilgisini tek yerde toplar',
        'Yakıt verimliliği ve gider optimizasyonunu destekler',
      ],
      en: [
        'Centralizes seasonal change planning and work orders',
        'Brings stock, storage, and lifecycle data together',
        'Supports fuel efficiency and cost optimization',
      ],
    },
    features: [
      {
        title: {
          tr: 'Yaşam Döngüsü Takibi',
          en: 'Lifecycle Tracking',
        },
        description: {
          tr: 'Montaj, rotasyon, aşınma ve değişim geçmişini izlenebilir kılar.',
          en: 'Tracks installation, rotation, wear, and replacement history across the fleet.',
        },
      },
      {
        title: {
          tr: 'Stok ve Depo Görünürlüğü',
          en: 'Stock and Storage Visibility',
        },
        description: {
          tr: 'Depoda bekleyen lastik varlığını araçtan bağımsız şekilde yönetir.',
          en: 'Manages stored tyre inventory independently from active vehicles.',
        },
      },
      {
        title: {
          tr: 'Maliyet ve Tasarruf Analizi',
          en: 'Cost and Savings Analysis',
        },
        description: {
          tr: 'Uygun kullanım ve yeniden değerlendirme ile gereksiz lastik maliyetini azaltır.',
          en: 'Reduces unnecessary tyre cost through lifecycle optimization and reuse visibility.',
        },
      },
    ],
    seoTitle: {
      tr: 'FleetMole Tyre | Lastik Yönetim Platformu',
      en: 'FleetMole Tyre | Tyre Management Platform',
    },
    seoDescription: {
      tr: 'FleetMole Tyre ile lastik ömrü, stok ve mevsimsel değişim operasyonlarını tek merkezden yönetin.',
      en: 'Manage tyre lifecycle, stock, and seasonal replacement operations in one place with FleetMole Tyre.',
    },
    theme: buildTheme('#0DB5C0', '#3CCDD7', '#0A4950'),
  },
  {
    slug: 'tracker',
    name: 'FleetMole Tracker',
    shortName: 'Tracker',
    category: {
      tr: 'Akıllı Araç Takip ve Veri Platformu',
      en: 'Smart Vehicle Tracking and Data Platform',
    },
    summary: {
      tr: 'Konum, sürüş skoru, sensör verisi ve arıza kodlarını gerçek zamanlı analitikle birleştirir.',
      en: 'Combines location, driving scores, sensor data, and fault codes with real-time analytics.',
    },
    description: {
      tr: 'FleetMole Tracker, araçlardan gelen konum, kullanım, sensör ve motor verilerini merkezi olarak izler. Geleneksel takip sisteminin ötesine geçerek filo yöneticilerine aksiyon aldıran mobilite görünürlüğü sunar.',
      en: 'FleetMole Tracker centralizes location, usage, sensor, and engine data from connected vehicles. It goes beyond conventional tracking by turning mobility data into actionable operating insight.',
    },
    detail: {
      tr: 'Sürücü skorlaması, geo-fence, tahmine dayalı bakım ve alarm kurguları sayesinde güvenlik, verim ve kontrol aynı ekosistemde buluşur.',
      en: 'Driver scoring, geo-fencing, predictive maintenance, and alerting workflows bring safety, efficiency, and control into the same ecosystem.',
    },
    benefits: {
      tr: [
        'Canlı konum ve sensör verisini tek merkezde toplar',
        'Riskli sürüş davranışlarını erken görünür hale getirir',
        'Tahmine dayalı bakım ve uyarı kurgularını destekler',
      ],
      en: [
        'Centralizes live location and sensor data',
        'Surfaces risky driving behavior before it escalates',
        'Supports predictive maintenance and alerting workflows',
      ],
    },
    features: [
      {
        title: {
          tr: 'Gerçek Zamanlı Mobilite',
          en: 'Real-Time Mobility',
        },
        description: {
          tr: 'Konum, sürüş tarzı ve motor sağlığı verilerini anlık olarak işler.',
          en: 'Processes location, driving style, and engine-health data in real time.',
        },
      },
      {
        title: {
          tr: 'Geo-Fence ve Alarm Motoru',
          en: 'Geo-Fence and Alert Engine',
        },
        description: {
          tr: 'Bölge, süre ve kural bazlı ihlalleri operasyon ekranına taşır.',
          en: 'Flags route, region, and rules-based violations directly in the operations console.',
        },
      },
      {
        title: {
          tr: 'Sürücü ve Risk Skorlaması',
          en: 'Driver and Risk Scoring',
        },
        description: {
          tr: 'Sürüş kalıplarını puanlayarak güvenlik ve maliyet aksiyonlarını destekler.',
          en: 'Scores driving patterns to support safety actions and cost reduction.',
        },
      },
    ],
    seoTitle: {
      tr: 'FleetMole Tracker | Akıllı Araç Takip ve Veri Platformu',
      en: 'FleetMole Tracker | Smart Vehicle Tracking and Data Platform',
    },
    seoDescription: {
      tr: 'FleetMole Tracker ile canlı konum, sürüş verisi ve mobilite akışını tek ekranda yönetin.',
      en: 'Manage live location, driving data, and mobility flows from one screen with FleetMole Tracker.',
    },
    theme: buildTheme('#20ABE3', '#54C3EF', '#0F4564'),
  },
  {
    slug: 'smart',
    name: 'FleetMole Smart',
    shortName: 'Smart',
    category: {
      tr: 'Akıllı Belge, Hasar ve Araç Tanıma Platformu',
      en: 'Intelligent Document, Damage, and Vehicle Recognition Platform',
    },
    summary: {
      tr: 'Araç tanıma, hasar tespiti, belge dijitalleştirme ve maliyet tahminini akıllı karar motoruyla hızlandırır.',
      en: 'Accelerates vehicle recognition, damage detection, document digitization, and cost estimation with an intelligent decision layer.',
    },
    description: {
      tr: 'FleetMole Smart, araç görselleri ve belgeleri üzerinde çalışan akıllı karar katmanıdır. Hasar bölgelerini algılar, belge içeriğini dijitalleştirir ve karar süreçleri için yüksek doğrulukta yorum üretir.',
      en: 'FleetMole Smart is the intelligence layer that works across vehicle imagery and operational documents. It detects damage areas, digitizes paperwork, and produces high-confidence interpretations for decision workflows.',
    },
    detail: {
      tr: 'Sigorta, filo yönetimi ve servis operasyonları için aynı veri akışını paylaşır; manuel kontrol yükünü azaltır ve süreçleri hızlandırır.',
      en: 'It connects the same data flow across insurance, fleet management, and service operations, reducing manual review time and improving processing speed.',
    },
    benefits: {
      tr: [
        'Araç tanıma ve hasar tespitini hızlandırır',
        'Belge ve kayıtları dijital akışa dönüştürür',
        'Tahmin ve raporlama kalitesini yükseltir',
      ],
      en: [
        'Accelerates vehicle recognition and damage detection',
        'Turns documents and records into digital workflows',
        'Improves estimation quality and reporting speed',
      ],
    },
    features: [
      {
        title: {
          tr: 'Görüntü Analizi',
          en: 'Vision-Based Analysis',
        },
        description: {
          tr: 'Farklı açılardan çekilen görsellerde hasar bölgelerini ve araç tipini tespit eder.',
          en: 'Identifies damage zones and vehicle types from multi-angle imagery.',
        },
      },
      {
        title: {
          tr: 'Belge Dijitalleştirme',
          en: 'Document Digitization',
        },
        description: {
          tr: 'Poliçe, eksper raporu ve servis belgelerini işlenebilir veri katmanına dönüştürür.',
          en: 'Transforms policies, assessor reports, and service documents into structured data.',
        },
      },
      {
        title: {
          tr: 'Maliyet Tahmin Motoru',
          en: 'Cost Estimation Engine',
        },
        description: {
          tr: 'Onarım ve parça değişim senaryolarını hızlıca karşılaştırılabilir hale getirir.',
          en: 'Creates comparable repair and parts-replacement estimates at operating speed.',
        },
      },
    ],
    seoTitle: {
      tr: 'FleetMole Smart | Akıllı Hasar ve Belge Analitiği',
      en: 'FleetMole Smart | Intelligent Damage and Document Analytics',
    },
    seoDescription: {
      tr: 'FleetMole Smart ile araç tanıma, hasar analizi ve belge dijitalleştirme süreçlerini hızlandırın.',
      en: 'Accelerate vehicle recognition, damage analysis, and document digitization with FleetMole Smart.',
    },
    theme: buildTheme('#753E90', '#9460B2', '#33203E'),
  },
  {
    slug: 'trader',
    name: 'FleetMole Trader',
    shortName: 'Trader',
    category: {
      tr: 'Araç Alım, Satım ve Kiralama Karar Platformu',
      en: 'Vehicle Buying, Selling, and Commercial Decision Platform',
    },
    summary: {
      tr: 'Araç alım-satım ve portföy kararlarını veriye dayalı fiyatlama ve ticari görünürlükle yönetir.',
      en: 'Manages vehicle buying, selling, and portfolio decisions with data-driven pricing and commercial visibility.',
    },
    description: {
      tr: 'FleetMole Trader, araç ticaretinin finansal ve operasyonel boyutunu tek ekrana taşır. Değerleme, amortisman, portföy önerisi ve stok planlamasını veri temelli karar motorlarıyla destekler.',
      en: 'FleetMole Trader unifies the financial and operational dimensions of vehicle commerce in one interface. It supports valuation, depreciation, portfolio strategy, and stock planning through data-driven decision models.',
    },
    detail: {
      tr: 'Gerçek zamanlı piyasa görünürlüğü ve kârlılık odaklı öneriler sayesinde alım-satım zamanlamasını daha kontrollü hale getirir.',
      en: 'Real-time market visibility and profitability-oriented recommendations help teams make more controlled buy-sell timing decisions.',
    },
    benefits: {
      tr: [
        'Araç değerleme ve amortisman görünürlüğünü güçlendirir',
        'Portföy ve stok planlamasını hızlandırır',
        'Alım-satım ve kiralama kararlarını kârlılık odaklı hale getirir',
      ],
      en: [
        'Improves vehicle valuation and depreciation visibility',
        'Accelerates portfolio and stock planning',
        'Makes buy-sell and leasing decisions more profitability-oriented',
      ],
    },
    features: [
      {
        title: {
          tr: 'Akıllı Fiyatlama',
          en: 'Intelligent Pricing',
        },
        description: {
          tr: 'Piyasa koşullarını ve araç geçmişini değerlendirerek öneri üretir.',
          en: 'Generates pricing guidance using market signals and vehicle history.',
        },
      },
      {
        title: {
          tr: 'Portföy Stratejisi',
          en: 'Portfolio Strategy',
        },
        description: {
          tr: 'Hangi araçların tutulacağı, elden çıkarılacağı veya yeniden kiralanacağına karar desteği sağlar.',
          en: 'Supports decisions on which vehicles to retain, dispose, or re-lease.',
        },
      },
      {
        title: {
          tr: 'Ticari Performans İzleme',
          en: 'Commercial Performance Tracking',
        },
        description: {
          tr: 'Gelir-gider dengesi ve stok devir hızını daha görünür hale getirir.',
          en: 'Makes margin balance and stock-turn performance easier to monitor.',
        },
      },
    ],
    seoTitle: {
      tr: 'FleetMole Trader | Araç Ticaret ve Portföy Karar Platformu',
      en: 'FleetMole Trader | Vehicle Trading and Portfolio Decision Platform',
    },
    seoDescription: {
      tr: 'FleetMole Trader ile araç değerleme, portföy planlama ve alım-satım kararlarını veriye dayalı yönetin.',
      en: 'Use FleetMole Trader for data-driven valuation, portfolio planning, and vehicle trading decisions.',
    },
    theme: buildTheme('#F39422', '#FDB45A', '#5C350A'),
  },
  {
    slug: 'partner',
    name: 'FleetMole Partner',
    shortName: 'Partner',
    category: {
      tr: 'Servis ve Tedarik Noktası Yönetim Platformu',
      en: 'Service and Supplier Network Management Platform',
    },
    summary: {
      tr: 'Servis, tedarikçi ve iş ortağı ağını kontrat, SLA ve performans bazında tek merkezden yönetir.',
      en: 'Manages service, supplier, and partner networks from one center with contracts, SLAs, and performance controls.',
    },
    description: {
      tr: 'FleetMole Partner, anlaşmalı servis ve tedarikçi yapısını merkezi hale getirir. Bölgesel fiyatlar, kontrat koşulları, onay adımları ve iş emri akışları aynı platformda tanımlanır.',
      en: 'FleetMole Partner centralizes the contracted service and supplier network. Regional pricing, contract rules, approvals, and work-order flows are managed on the same platform.',
    },
    detail: {
      tr: 'Skorlama ve denetim mekanizmaları sayesinde tedarikçi kalitesi görünür olur; yönlendirme kararları veriyle desteklenir.',
      en: 'Built-in scoring and audit mechanisms make supplier quality measurable and support routing decisions with data.',
    },
    benefits: {
      tr: [
        'Tedarikçi ve servis ağını standardize eder',
        'Onay, iş emri ve SLA yönetimini dijitalleştirir',
        'Skorlama ile hizmet kalitesini ölçülebilir hale getirir',
      ],
      en: [
        'Standardizes the supplier and service network',
        'Digitizes approvals, work orders, and SLA controls',
        'Makes service quality measurable with scoring models',
      ],
    },
    features: [
      {
        title: {
          tr: 'Kontrat ve Bölgesel Fiyat Yönetimi',
          en: 'Contract and Regional Pricing Management',
        },
        description: {
          tr: 'Marka, bölge ve hizmet tipine göre tedarik koşullarını kurumsal düzeyde yönetir.',
          en: 'Controls supplier conditions by brand, region, and service type at enterprise scale.',
        },
      },
      {
        title: {
          tr: 'İş Emri ve Onay Katmanı',
          en: 'Work Order and Approval Layer',
        },
        description: {
          tr: 'İş yönlendirme ve onay süreçlerini izlenebilir hale getirir.',
          en: 'Makes routing and approval flows auditable and easy to follow.',
        },
      },
      {
        title: {
          tr: 'Performans Skorlama',
          en: 'Performance Scoring',
        },
        description: {
          tr: 'Hizmet kalitesini puanlayarak doğru tedarikçi seçimlerini destekler.',
          en: 'Scores service quality to support better supplier allocation decisions.',
        },
      },
    ],
    seoTitle: {
      tr: 'FleetMole Partner | Servis ve Tedarikçi Ağı Yönetimi',
      en: 'FleetMole Partner | Service and Supplier Network Management',
    },
    seoDescription: {
      tr: 'FleetMole Partner ile servis ve tedarikçi ağınızı kontrat, onay ve performans düzeyinde yönetin.',
      en: 'Manage service and supplier networks with contract, approval, and performance controls in FleetMole Partner.',
    },
    theme: buildTheme('#D34190', '#E666AC', '#551C3D'),
  },
 ] as const satisfies readonly ProductDefinition[];

export type ProductData = (typeof PRODUCT_DEFINITIONS)[number];
export type ProductSlug = ProductData['slug'];

const PRODUCT_ORDER: ProductSlug[] = ['manager', 'rent', 'tracker', 'trader', 'partner', 'tyre', 'smart'];

export const PRODUCTS: readonly ProductData[] = [...PRODUCT_DEFINITIONS].sort(
  (left, right) => PRODUCT_ORDER.indexOf(left.slug) - PRODUCT_ORDER.indexOf(right.slug),
);

export const PRODUCT_MAP = Object.fromEntries(
  PRODUCTS.map((product) => [product.slug, product]),
) as Record<ProductSlug, ProductData>;

const PRODUCT_SLUG_ALIASES: Record<string, ProductSlug> = {
  ai: 'smart',
};

export const getProductBySlug = (slug?: string) => {
  if (!slug) {
    return undefined;
  }

  const normalizedSlug = (PRODUCT_SLUG_ALIASES[slug] ?? slug) as ProductSlug;
  return normalizedSlug in PRODUCT_MAP ? PRODUCT_MAP[normalizedSlug] : undefined;
};
