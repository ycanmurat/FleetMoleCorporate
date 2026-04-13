export interface LocalizedText {
  tr: string;
  en: string;
}

export interface ProductCategory {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  subcategories: { id: string; name: LocalizedText }[];
}

export interface Spec {
  label: LocalizedText;
  value: LocalizedText;
}

export interface ProductFeatureCard {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProductSpecGroup {
  title: LocalizedText;
  items: Spec[];
}

export interface ProductDownload {
  label: LocalizedText;
  url: string;
}

export interface ProductGalleryImage {
  src: string;
  alt: LocalizedText;
}

export interface FlattenedProductSpec {
  group: LocalizedText;
  label: LocalizedText;
  value: LocalizedText;
}

export const FALLBACK_PRODUCT_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f8fafc"/%3E%3Cpath d="M160 140l20-20 80 80M200 120a30 30 0 1 0 0-60 30 30 0 0 0 0 60z" stroke="%23e2e8f0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/%3E%3C/svg%3E';

export interface HardwareProduct {
  id: string;
  categoryId: string;
  subcategoryId: string;
  name: string;
  thumbnail: string;
  heroImage?: string;
  heroImageFit?: 'contain' | 'cover';
  tagline: LocalizedText;
  description: LocalizedText;
  specs: Spec[];
  features?: LocalizedText[];
  featureCards?: ProductFeatureCard[];
  specGroups?: ProductSpecGroup[];
  downloads?: ProductDownload[];
  gallery?: ProductGalleryImage[];
}

const t = (tr: string, en: string): LocalizedText => ({ tr, en });
const same = (text: string): LocalizedText => ({ tr: text, en: text });
const featureCard = (
  icon: string,
  trTitle: string,
  enTitle: string,
  trDescription: string,
  enDescription: string,
): ProductFeatureCard => ({
  icon,
  title: t(trTitle, enTitle),
  description: t(trDescription, enDescription),
});
const spec = (trLabel: string, enLabel: string, trValue: string, enValue = trValue): Spec => ({
  label: t(trLabel, enLabel),
  value: t(trValue, enValue),
});
const specGroup = (trTitle: string, enTitle: string, items: Spec[]): ProductSpecGroup => ({
  title: t(trTitle, enTitle),
  items,
});
const downloadItem = (trLabel: string, enLabel: string, url: string): ProductDownload => ({
  label: t(trLabel, enLabel),
  url,
});
const leafletDownload = (url: string) => downloadItem('Broşür', 'Leaflet', url);
const manualDownload = (url: string) => downloadItem('Kullanım Kılavuzu', 'User Manual', url);
const quickStartDownload = (url: string) => downloadItem('Hızlı Başlangıç Kılavuzu', 'Quick Start Guide', url);
const productImage = (pathname: string) => `/product-images/${pathname}`;
const galleryImage = (pathname: string, trAlt: string, enAlt = trAlt): ProductGalleryImage => ({
  src: productImage(pathname),
  alt: t(trAlt, enAlt),
});

const trimText = (text: string, max = 150) => {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max).trimEnd()}...`;
};

const firstSentence = (text: string) => {
  const match = text.replace(/\s+/g, ' ').trim().match(/^.*?[.!?](?:\s|$)/);
  return trimText(match?.[0]?.trim() || text);
};

const normalizeLocaleValue = (value: string) => value.replace(/\s+/g, ' ').trim().toLowerCase();

const TECHNICAL_TR_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Front Camera \(Main\)/gi, 'Ön Kamera (Ana)'],
  [/Sub Camera/gi, 'Alt Kamera'],
  [/Video Format/gi, 'Video Formatı'],
  [/Memory Support/gi, 'Bellek Desteği'],
  [/SIM Card Type/gi, 'SIM Kart Tipi'],
  [/LED Indication/gi, 'LED Göstergesi'],
  [/Power Supply/gi, 'Güç Beslemesi'],
  [/Operating Voltage/gi, 'Çalışma Voltajı'],
  [/Operating Temperature/gi, 'Çalışma Sıcaklığı'],
  [/Storage Temperature/gi, 'Depolama Sıcaklığı'],
  [/Device Weight/gi, 'Cihaz Ağırlığı'],
  [/Device Dimension/gi, 'Cihaz Boyutları'],
  [/Certifications/gi, 'Sertifikalar'],
  [/CameraBox/gi, 'Kamera Kutusu'],
  [/Vehicle Tracker/gi, 'Araç Takip'],
  [/Personal Tracker/gi, 'Kişisel Takip'],
  [/Asset Tracker/gi, 'Varlık Takibi'],
  [/CAN & OBD Product/gi, 'CAN ve OBD Ürünü'],
  [/Consumer Product/gi, 'Tüketici Ürünü'],
  [/Smart Wearables/gi, 'Akıllı Giyilebilir'],
  [/IPC Camera/gi, 'IPC Kamera'],
  [/Network/gi, 'Ağ'],
  [/Technology/gi, 'Teknoloji'],
  [/Frequency/gi, 'Frekans'],
  [/Camera/gi, 'Kamera'],
  [/Configuration/gi, 'Yapılandırma'],
  [/Others/gi, 'Diğer'],
  [/Standard/gi, 'Standart'],
  [/Band/gi, 'Bant'],
  [/Positioning system/gi, 'Konumlandırma sistemi'],
  [/Sensor/gi, 'Sensör'],
  [/Microphone/gi, 'Mikrofon'],
  [/Speaker/gi, 'Hoparlör'],
  [/Interface/gi, 'Arayüz'],
  [/Feature/gi, 'Özellik'],
  [/Algorithm/gi, 'Algoritma'],
  [/System/gi, 'Sistem'],
  [/Module/gi, 'Modül'],
  [/Connectivity/gi, 'Bağlantı'],
  [/Full color in daytime & monochrome in dim light/gi, 'Gündüz tam renkli, düşük ışıkta monokrom'],
  [/Full color/gi, 'Tam renkli'],
  [/Eurasian Version/gi, 'Avrasya Versiyonu'],
  [/American Version/gi, 'Amerika Versiyonu'],
  [/Power cable/gi, 'Güç kablosu'],
  [/Support/gi, 'Desteklenir'],
  [/Input voltage/gi, 'Giriş voltajı'],
  [/Dimensions/gi, 'Boyutlar'],
  [/Weight/gi, 'Ağırlık'],
  [/External memory/gi, 'Harici bellek'],
  [/Digital I\/Os/gi, 'Dijital G/Ç'],
  [/Analog I\/Os/gi, 'Analog G/Ç'],
  [/Serial ports/gi, 'Seri portlar'],
  [/Configuration support/gi, 'Yapılandırma desteği'],
  [/Firmware update/gi, 'Ürün yazılımı güncelleme'],
  [/Certification/gi, 'Sertifikalar'],
  [/Red \(Power\)/gi, 'Kırmızı (Güç)'],
  [/Blue \(Cellular\)/gi, 'Mavi (Hücresel)'],
  [/Green \(GNSS\)/gi, 'Yeşil (GNSS)'],
  [/Visual AI/gi, 'Görsel yapay zeka'],
  [/Fatigue Detection/gi, 'Yorgunluk algılama'],
  [/Leaflet/gi, 'Broşür'],
  [/Datasheet/gi, 'Teknik Doküman'],
  [/Manual/gi, 'Kullanım Kılavuzu'],
  [/Display Unit/gi, 'Görüntü Birimi'],
  [/Remote Control/gi, 'Uzaktan Kumanda'],
  [/DC-DC Converter/gi, 'DC-DC Dönüştürücü'],
  [/Cabin-View/gi, 'Kabin Görüşlü'],
  [/Driver-facing/gi, 'Sürücüye Dönük'],
  [/Road-facing/gi, 'Yola Dönük'],
  [/Rear-view/gi, 'Arka Görüş'],
  [/Side-view/gi, 'Yan Görüş'],
  [/waterproof/gi, 'su geçirmez'],
  [/Phone use/gi, 'Telefon kullanımı'],
  [/Smoking/gi, 'Sigara içme'],
  [/Distraction/gi, 'Dikkat dağınıklığı'],
  [/Yawning/gi, 'Esneme'],
  [/Eyes closed/gi, 'Gözler kapalı'],
  [/No face detected/gi, 'Yüz algılanmadı'],
];

const translateTechnicalTextToTr = (input: string) => {
  let output = input;

  TECHNICAL_TR_REPLACEMENTS.forEach(([pattern, replacement]) => {
    output = output.replace(pattern, replacement);
  });

  return output
    .replace(/\s+,/g, ',')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'video-telematics',
    name: { tr: 'Video Mobilite', en: 'Video Mobility' },
    description: { tr: 'Her yolculukta görünürlük ve kanıt akışı.', en: 'Visibility and proof flow on every journey.' },
    subcategories: [
      { id: 'dashcam', name: { tr: 'Araç İçi Kamera', en: 'Dashcam' } },
      { id: 'ai-camera', name: { tr: 'Yapay Zeka Kamera', en: 'AI Camera' } },
      { id: 'camerabox', name: { tr: 'Kamera Kutusu', en: 'CameraBox' } }
    ]
  },
  {
    id: 'gps-trackers',
    name: { tr: 'GPS Takip Cihazları', en: 'GPS Trackers' },
    description: { tr: 'Tam operasyonel görünürlüğe doğru ilk adımınız.', en: 'Your first step toward total operational visibility.' },
    subcategories: [
      { id: 'vehicle-tracker', name: { tr: 'Araç Takip', en: 'Vehicle Tracker' } },
      { id: 'personal-tracker', name: { tr: 'Kişisel Takip', en: 'Personal Tracker' } },
      { id: 'asset-tracker', name: { tr: 'Varlık Takibi', en: 'Asset Tracker' } },
      { id: 'can-obd', name: { tr: 'CAN & OBD', en: 'CAN & OBD Product' } }
    ]
  },
  {
    id: 'consumer-product',
    name: { tr: 'Tüketici Ürünleri', en: 'Consumer Product' },
    description: { tr: 'Hayat sizi nereye götürürse götürsün günlük koruma.', en: 'Everyday protection, wherever life takes you.' },
    subcategories: [
      { id: 'smart-wearables', name: { tr: 'Akıllı Giyilebilir', en: 'Smart Wearables' } },
      { id: 'ipc-camera', name: { tr: 'IPC Kamera', en: 'IPC Camera' } }
    ]
  },
  {
    id: 'accessories',
    name: { tr: 'Aksesuarlar', en: 'Accessories' },
    description: { tr: 'Performansı ve güvenliği artıran eklentiler.', en: 'Add-ons that amplify performance, security and reliability.' },
    subcategories: [
      { id: 'sensors', name: { tr: 'Sensörler', en: 'Sensors' } },
      { id: 'peripherals', name: { tr: 'Çevre Birimleri', en: 'Peripherals' } },
      { id: 'cable', name: { tr: 'Kablo', en: 'Cable' } },
      { id: 'external-camera', name: { tr: 'Harici Kamera', en: 'External Camera' } }
    ]
  }
];

export const getProductCategory = (categoryId: string) =>
  PRODUCT_CATEGORIES.find(category => category.id === categoryId);

export const getProductSubcategory = (categoryId: string, subcategoryId: string) =>
  getProductCategory(categoryId)?.subcategories.find(subcategory => subcategory.id === subcategoryId);

export const hasDedicatedLocaleText = (text: LocalizedText, lang: 'tr' | 'en') => {
  if (lang === 'en') return true;
  return normalizeLocaleValue(text.tr) !== normalizeLocaleValue(text.en);
};

export const getLocalizedTechnicalText = (text: LocalizedText, lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return text.en;
  }

  return hasDedicatedLocaleText(text, lang) ? text.tr : translateTechnicalTextToTr(text.en);
};

export const getProductSpecGroups = (product: HardwareProduct): ProductSpecGroup[] => {
  if (product.specGroups?.length) {
    return product.specGroups;
  }

  if (product.specs.length) {
    return [specGroup('Genel', 'General', product.specs)];
  }

  return [];
};

export const flattenProductSpecs = (product: HardwareProduct): FlattenedProductSpec[] =>
  getProductSpecGroups(product).flatMap(group =>
    group.items.map(item => ({
      group: group.title,
      label: item.label,
      value: item.value,
    })),
  );

export const getLocalizedProductSpecGroups = (product: HardwareProduct, lang: 'tr' | 'en') =>
  getProductSpecGroups(product).map(group => ({
    title: getLocalizedTechnicalText(group.title, lang),
    items: group.items.map(item => ({
      label: getLocalizedTechnicalText(item.label, lang),
      value: getLocalizedTechnicalText(item.value, lang),
    })),
  }));

const getGeneratedProductTaglineTr = (product: HardwareProduct) => {
  switch (product.categoryId) {
    case 'video-telematics':
      return `${product.name} ile bağlantılı görüntü ve mobilite kontrolü tek noktada.`;
    case 'gps-trackers':
      return `${product.name} ile takip, görünürlük ve kontrol bir arada.`;
    case 'consumer-product':
      return `${product.name} ile günlük yaşam için akıllı koruma.`;
    case 'accessories':
      return `${product.name} ile sisteminizi tamamlayan güvenilir destek.`;
    default:
      return `${product.name} ile daha temiz görünürlük ve daha güçlü kontrol.`;
  }
};

export const getLocalizedProductTagline = (product: HardwareProduct, lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return product.tagline.en;
  }

  if (hasDedicatedLocaleText(product.tagline, 'tr')) {
    return product.tagline.tr;
  }

  const translated = translateTechnicalTextToTr(product.tagline.en);
  return normalizeLocaleValue(translated) === normalizeLocaleValue(product.tagline.en)
    ? getGeneratedProductTaglineTr(product)
    : translated;
};

export const getLocalizedProductDescription = (product: HardwareProduct, lang: 'tr' | 'en') => {
  if (lang === 'en') {
    return product.description.en;
  }

  if (hasDedicatedLocaleText(product.description, 'tr')) {
    return product.description.tr;
  }

  const category = getProductCategory(product.categoryId);
  const subcategory = getProductSubcategory(product.categoryId, product.subcategoryId);
  const keySpecs = flattenProductSpecs(product)
    .slice(0, 2)
    .map(item => `${getLocalizedTechnicalText(item.label, 'tr')}: ${getLocalizedTechnicalText(item.value, 'tr')}`);

  const specSentence = keySpecs.length ? `Öne çıkan teknik bilgiler: ${keySpecs.join(' • ')}.` : '';
  const docsSentence = product.downloads?.length
    ? 'Ürün dokümanlarına bu sayfadan doğrudan erişilebilir.'
    : 'Detay içerik yapısı sunum akışına uygun şekilde hazırlanmıştır.';

  return `${product.name}, ${category?.name.tr ?? 'ürün'} ailesinde ${subcategory?.name.tr.toLowerCase() ?? 'ürün'} sınıfında konumlanan bir çözümdür. ${specSentence} ${docsSentence}`.replace(/\s{2,}/g, ' ').trim();
};

export const getLocalizedDownloadLabel = (download: ProductDownload, lang: 'tr' | 'en') =>
  getLocalizedTechnicalText(download.label, lang);

export const getPresentationFeatureCards = (product: HardwareProduct): ProductFeatureCard[] => {
  if (product.featureCards?.length) {
    return product.featureCards;
  }

  if (product.features?.length) {
    return product.features.slice(0, 4).map((feature, index) => ({
      icon: ['monitor', 'layers', 'cpu', 'shield'][index % 4],
      title: t(`Öne Çıkan ${index + 1}`, `Highlight ${index + 1}`),
      description: feature,
    }));
  }

  const category = getProductCategory(product.categoryId);
  const subcategory = getProductSubcategory(product.categoryId, product.subcategoryId);
  const flatSpecs = flattenProductSpecs(product);
  const keySpecs = flatSpecs.slice(0, 3);

  const specSummaryTr = keySpecs.length
    ? keySpecs.map(item => `${getLocalizedTechnicalText(item.label, 'tr')}: ${getLocalizedTechnicalText(item.value, 'tr')}`).join(' • ')
    : `${product.name} için teknik veri alanı yeni içerik turunda daha da genişletilecektir.`;
  const specSummaryEn = keySpecs.length
    ? keySpecs.map(item => `${item.label.en}: ${item.value.en}`).join(' • ')
    : `Technical data for ${product.name} will be expanded further in the next content pass.`;

  return [
    featureCard(
      'layers',
      'Ürün Konumu',
      'Product Positioning',
      `${product.name}, ${category?.name.tr ?? 'ürün'} ekosisteminde ${subcategory?.name.tr.toLowerCase() ?? 'çözüm'} sınıfında konumlanır.`,
      `${product.name} is positioned in the ${subcategory?.name.en ?? 'solution'} segment of the ${category?.name.en ?? 'product'} ecosystem.`,
    ),
    featureCard(
      'monitor',
      'Temel Değer',
      'Core Value',
      `${getLocalizedProductTagline(product, 'tr')} ${firstSentence(getLocalizedProductDescription(product, 'tr'))}`,
      `${product.tagline.en} ${firstSentence(product.description.en)}`,
    ),
    featureCard(
      'cpu',
      'Teknik Bakış',
      'Technical Snapshot',
      specSummaryTr,
      specSummaryEn,
    ),
    featureCard(
      product.downloads?.length ? 'file' : 'shield',
      product.downloads?.length ? 'Dokümantasyon Hazır' : 'Sunuma Hazır',
      product.downloads?.length ? 'Documentation Ready' : 'Presentation Ready',
      product.downloads?.length
        ? `${product.downloads.length} adet doküman bu ürün detayında doğrudan erişilebilir durumda.`
        : `${product.name} detay ekranı teklif, karşılaştırma ve görsel anlatım akışına entegre edilmiştir.`,
      product.downloads?.length
        ? `${product.downloads.length} document(s) are available directly from this product detail page.`
        : `${product.name} is already integrated into the quote, comparison, and visual storytelling flow.`,
    ),
  ];
};

const IMG: Record<string, string> = {
  // Video Telematics
  jc400p: productImage('video-telematics/JC_400_P_6070646f8b.png'),
  jc400: productImage('video-telematics/JC_400_7d57863d1a.png'),
  jc261p: productImage('video-telematics/JC_261_P_376f5e0d1a.png'),
  jc261: productImage('video-telematics/JC_261_cb1096f12b.png'),
  jc182: productImage('video-telematics/JC_182_9c149c25d6.png'),
  jc181: productImage('video-telematics/JC_181_f6ea840024.png'),
  jc171: productImage('video-telematics/jc171_b4aee1f14a.png'),
  jc170: productImage('video-telematics/jc170_22e22f9980.png'),
  jc371: productImage('video-telematics/JC_371_92cd95a20e.png'),
  jc450: productImage('video-telematics/JC_450_5d7856b8bb.png'),
  jc451: productImage('video-telematics/JC_451_e24b9acc2c_b9b3fcd4dd.png'),
  // GPS Trackers
  vl113: productImage('gps-trackers/VL_113_a89f00e010.png'),
  vl863: productImage('gps-trackers/VL_863_301a813012.png'),
  vl505: productImage('gps-trackers/VL_505_bd3f0c63d5.png'),
  'gt06n-4g': productImage('gps-trackers/GT_06_N4_G_a520eac864.png'),
  'jm-vl02': productImage('gps-trackers/VL_02_15366eaebd.png'),
  vl101g: productImage('gps-trackers/VL_101_G_5898e5bc6a.png'),
  pl601: productImage('gps-trackers/PL_601_7a408fb910.png'),
  'qbit-m': productImage('gps-trackers/Qbit_M_8863990e37.png'),
  pl200: productImage('gps-trackers/PL_200_af513c5ede.png'),
  ll303pro: productImage('gps-trackers/LL_303_PRO_439823c200.png'),
  ll704: productImage('gps-trackers/LL_704_Product_a900999868.png'),
  ll708: productImage('gps-trackers/LL_708_deaeef5b59.png'),
  ll705: productImage('gps-trackers/LL_705_d9a997b680.png'),
  ll702: productImage('gps-trackers/LL_702_d208fecdae.png'),
  ll309: productImage('gps-trackers/LL_309_749e050622.png'),
  ll302: productImage('gps-trackers/LL_302_bf9e8e3d08.png'),
  ll301: productImage('gps-trackers/LL_301_63640aa13f.png'),
  lg300: productImage('gps-trackers/LG_300_ccfbdee47e.png'),
  kd032: productImage('gps-trackers/KD_032_ca43793c8b.png'),
  ll02: productImage('gps-trackers/LL_02_ad37708c52.png'),
  ll01: productImage('gps-trackers/LL_01_65315790f7.png'),
  bl10: productImage('gps-trackers/BL_10_597313f90d.png'),
  at4: productImage('gps-trackers/AT_4_d03c4585f6.png'),
  at1: productImage('gps-trackers/AT_1_32a240899b.png'),
  eg02: productImage('gps-trackers/EG_02_c901a998d7.png'),
  gt06s: productImage('gps-trackers/GT_06_S_d8cbcaf968.png'),
  kl100: productImage('gps-trackers/KL_100_a4f7be0a7d.png'),
  vg03: productImage('gps-trackers/VG_03_df79b89dd6.png'),
  vl103d: productImage('gps-trackers/VL_103_D_292deacf49.png'),
  vl103m: productImage('gps-trackers/VL_103_M_3548323629.png'),
  vl106: productImage('gps-trackers/VL_106_4813d2d70f.png'),
  vl110c: productImage('gps-trackers/VL_110_C_d63d9ae427.png'),
  vl111: productImage('gps-trackers/VL_111_c94ff7ea05.png'),
  vl501: productImage('gps-trackers/VL_501_63312cd09c.png'),
  vl802: productImage('gps-trackers/VL_802_d78629c07b.png'),
  vl808: productImage('gps-trackers/VL_808_c2404c503b.png'),
  wetrack2: productImage('gps-trackers/We_Track_2_befd9559fe.png'),
  wetrack140: productImage('gps-trackers/We_Track_140_9b91ecb744.png'),
  x3: productImage('gps-trackers/X3_edad7a0ff3.png'),
  gt06n: productImage('gps-trackers/GT_06_N_58ee030aec.png'),
  bl11: productImage('gps-trackers/bl11_a284b9cbee.png'),
  'wetrack-lite': productImage('gps-trackers/Wetrack_Lite_4bce22edf5.png'),
  vl512: productImage('gps-trackers/VL_512_2ac252d100.png'),
  kd031: productImage('gps-trackers/KD_301_186ecc4759.png'),
  vl502: productImage('gps-trackers/VL_502_00798bf4fa.png'),
  'vl502-a': productImage('gps-trackers/VL_502_A_401e66d3f4.png'),
  // Consumer Products
  r001: productImage('consumer-products/R001_48957d52e7.png'),
  r002: productImage('consumer-products/R002_f3b73333f2.png'),
  hl365s: productImage('consumer-products/HL_365_S_570c252544.png'),
  // Accessories
  kf043u: productImage('accessories/KF_043_U_ce778faedf.png'),
  kj806: productImage('accessories/KJ_806_3330577036.png'),
  kz081v: productImage('accessories/KZ_081_V_2ecc32671e.png'),
  ci03: productImage('accessories/CI_03_e76d1c1cd6.png'),
  ci04: productImage('accessories/CI_04_bff66a1c6f.png'),
  cd02: productImage('accessories/CD_02_7c6711a235.png'),
  ci05f: productImage('accessories/CI_05_F_2d0e8dae7e.png'),
  ci06f: productImage('accessories/CI_05_F_84f7f3b111.png'),
  cf02f: productImage('accessories/CF_02_F_1376500e96.png'),
  ce01: productImage('accessories/CE_01_f46062dd38.png'),
  ce02: productImage('accessories/CE_02_7020192853.png'),
  ce04: productImage('accessories/CE_04_ea9a413e2a.png'),
  cf01f: productImage('accessories/CF_01_F_a0279765e9.png'),
  ci01: productImage('accessories/CI_01_bb5b0b973e.png'),
  ci02: productImage('accessories/CI_02_dcc69293ba.png'),
  kf041s: productImage('accessories/KF_041_S_69c7b522d2.png'),
  k7800p: productImage('accessories/K7800p_258b696983.png'),
  kc208s: productImage('accessories/KC_208_S_f3975d561e.png'),
  kf201s: productImage('accessories/KF_201_S_2d6e065fe0.png'),
  kf281s: productImage('accessories/202_A7347_044b3f0102.jpeg'),
  jcm0700: productImage('accessories/JCM_0700_b435abe120.png'),
};
const getImg = (model: string) => IMG[model.toLowerCase()] || FALLBACK_PRODUCT_IMAGE;

const GALLERY: Record<string, ProductGalleryImage[]> = {
  jc400p: [
    galleryImage('Two_Views_One_Safer_Drive_JC_400_P_a61acab6e7.png', 'JC400P ürün görseli', 'JC400P product visual'),
    galleryImage('Moments_that_Matter_Delivered_JC_400_P_1ee54becd7.png', 'JC400P ürün görseli', 'JC400P product visual'),
    galleryImage('Intelligence_Extended_JC_400_P_2e8a5e614c.png', 'JC400P ürün görseli', 'JC400P product visual'),
    galleryImage('Works_With_Your_System_Instantly_JC_400_P_2a7f3429b0.png', 'JC400P ürün görseli', 'JC400P product visual'),
    galleryImage('Empower_Smarter_Safer_Fleet_with_Jimi_Io_T_JC_400_P_5a36f7c67e.png', 'JC400P ürün görseli', 'JC400P product visual'),
    galleryImage('Your_Fleet_Our_Promise_ca81a6bc0a.png', 'Fleet görseli', 'Fleet visual'),
  ],
  jc400: [
    galleryImage('Manage_Smarter_Safer_Fleets_Start_Now_JC_400_87dd2709.png', 'JC400 ürün görseli', 'JC400 product visual'),
  ],
  jc261p: [
    galleryImage('Advanced_Driver_Assistance_System_ADAS_4d3b803a23.png', 'JC261P ürün görseli', 'JC261P product visual'),
  ],
  jc261: [
    galleryImage('Critical_Moments_Not_Missed_JC_261_bd784edc52.png', 'JC261 ürün görseli', 'JC261 product visual'),
    galleryImage('Face_Recognition_System_optional_JC_261_219bd30cd0.png', 'JC261 ürün görseli', 'JC261 product visual'),
    galleryImage('Seatbelt_Detection_optional_JC_261_ba0dc1c687.png', 'JC261 ürün görseli', 'JC261 product visual'),
    galleryImage('Advanced_Driver_Assistance_System_ADAS_e30841b71a.png', 'JC261 ürün görseli', 'JC261 product visual'),
  ],
};

const PRODUCT_DOWNLOADS: Record<string, ProductDownload[]> = {
  jc400p: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638601/JC_400_P_Leaflet_3954847710.pdf'),
  ],
  jc400: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638487/JC_400_Leaflet_3469283bb6.pdf'),
  ],
  jc261p: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638372/JC_261_P_Leaflet_ce1cd84cca.pdf'),
  ],
  jc261: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638349/JC_261_Leaflet_67ea4e39b5.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638429/JC_261_User_manual_3062e33e93.pdf'),
  ],
  jc182: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638292/JC_182_Leaflet_4279162567.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638323/JC_182_User_manual_a3695bc485.pdf'),
  ],
  jc181: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638124/JC_181_Leaflet_43d930285a.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638264/JC_181_User_Manual_8b25bf06ac.pdf'),
  ],
  jc171: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638103/JC_171_Leaflet_cbaa9149dc.pdf'),
  ],
  jc170: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638033/JC_170_Leaflet_54c17fb6a5.pdf'),
  ],
  jc450: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771985488/JC_450_Leaflet_d1743f2ac6.pdf'),
  ],
  jc451: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638667/JC_451_Leaflet_3b780b4ce9.pdf'),
  ],
  jc371: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638459/JC_371_Leaflet_f539df8b9b.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771635967/JC_371_User_manual_735420f492.pdf'),
  ],
  vl113: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640193/VL_113_Leaflet_5262d1770f.pdf'),
  ],
  vl863: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640507/VL_863_Leaflet_1302da0255.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771636655/VL_863_User_Manual_39e076d800.pdf'),
  ],
  pl601: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639879/PL_601_Leaflet_b4225ab68e.pdf'),
  ],
  ll303pro: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639271/LL_303_PRO_Leaflet_53da152b2b.pdf'),
  ],
  vl505: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640304/VL_505_Leaflet_e06b7a2b13.pdf'),
  ],
  vl512: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640432/VL_512_Leaflet_7ff4c994b7.pdf'),
  ],
  pl200: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639855/PL_200_Leaflet_19e0e35fb1.pdf'),
  ],
  ll704: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1772548856/LL_704_Leaflet_d9df5da364.pdf'),
  ],
  ll708: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639465/LL_708_Leaflet_f2d71e7659.pdf'),
  ],
  ll705: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639432/LL_705_Leaflet_6859db9840.pdf'),
  ],
  ll702: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639333/LL_702_Leaflet_e15af6fc9a.pdf'),
  ],
  ll309: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639295/LL_309_Leaflet_fee3897f03.pdf'),
  ],
  ll302: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639242/LL_302_Leaflet_d1f41c4d09.pdf'),
  ],
  ll301: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639220/LL_301_Leaflet_9ef8565685.pdf'),
  ],
  lg300: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639146/LG_300_Leaflet_7335ea5719.pdf'),
  ],
  'gt06n-4g': [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637821/GT_06_N_4_G_Leaflet_725e66ca6c.pdf'),
  ],
  kd031: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638806/KD_031_Leaflet_81db77e127.pdf'),
  ],
  kd032: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638837/KD_032_Leaflet_d15dbcb637.pdf'),
  ],
  ll02: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639199/LL_02_Leaflet_5a060d7d04.pdf'),
  ],
  ll01: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639165/LL_01_Leaflet_d855a6400b.pdf'),
  ],
  bl10: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637613/BL_10_Leaflet_c11fa182f0.pdf'),
  ],
  at4: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637583/AT_4_Leaflet_c2e3317fed.pdf'),
  ],
  at1: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637007/AT_1_Leaflet_2f45ffcf16.pdf'),
  ],
  eg02: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637793/EG_02_Leaflet_306f6028df.pdf'),
  ],
  gt06s: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637884/GT_06_S_Leaflet_5f83f6d5c4.pdf'),
  ],
  'jm-vl02': [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638696/JMVL_02_Leaflet_6df76b66fe.pdf'),
  ],
  kl100: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639056/KL_100_Leaflet_5396bfa1d1.pdf'),
  ],
  vg03: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640041/VG_03_Leaflet_0fbd4a6100.pdf'),
  ],
  vl103m: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640100/VL_103_M_Leaflet_477a42e1fc.pdf'),
  ],
  vl106: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640119/VL_106_Leaflet_1354a29679.pdf'),
  ],
  vl110c: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640145/VL_110_C_Leaflet_d8d96feccc.pdf'),
  ],
  vl111: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640166/VL_111_Leaflet_060a88a701.pdf'),
  ],
  vl501: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640221/VL_501_Leaflet_60a9639eb5.pdf'),
  ],
  vl802: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640456/VL_802_Leaflet_ea5f3e501d.pdf'),
  ],
  vl808: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640483/VL_808_Leaflet_2125b2200e.pdf'),
  ],
  wetrack2: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640570/Wetrack2_Leaflet_7d1ee49c12.pdf'),
  ],
  wetrack140: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640547/Wetrack140_Leaflet_96d83796c8.pdf'),
  ],
  x3: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640643/X3_Leaflet_35a20a2974.pdf'),
  ],
  gt06n: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637846/GT_06_N_Leaflet_e9e8870c7a.pdf'),
  ],
  bl11: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637637/BL_11_Leaflet_76ece26235.pdf'),
  ],
  'wetrack-lite': [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640621/Wetrack_Lite_Leaflet_0d54f4b7c2.pdf'),
  ],
  vl502: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640269/VL_502_Leaflet_6e84fa2189.pdf'),
  ],
  'vl502-a': [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640244/VL_502_A_Leaflet_f6a046a545.pdf'),
  ],
  r001: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639915/R001_Leaflet_de190cdf3d.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771636553/R001_User_Manual_a8fedf41a6.pdf'),
  ],
  r002: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771640004/R002_Leaflet_32485561c2.pdf'),
  ],
  hl365s: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771637908/HL_365_Leaflet_9775f716a9.pdf'),
    quickStartDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1772463280/HL_365_S_4_G_Smart_Camera_Quick_Start_Guide_V1_1_20260128_HL_365_S_User_Manual_d60f28cc0e_ce5a1f475a.pdf'),
  ],
  kf043u: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638883/KF_043_U_Leaflet_01cb47206f.pdf'),
  ],
  kj806: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638971/KJ_806_Leaflet_95265251f1.pdf'),
  ],
  kz081v: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771639102/KZ_081_V_en_20251126_1da8f0d80e.pdf'),
  ],
  kf041s: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638859/KF_041_S_Leaflet_ce6f0401dc.pdf'),
  ],
  k7800p: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638734/K7800_P_Leaflet_bbc852f456.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771635899/K7800_P_User_Manual_f8b4ef7730.pdf'),
  ],
  kc208s: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638764/KC_208_S_Leaflet_1bd712e8c8.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771636636/KC_208_S_User_Manual_8ff049bfd7.pdf'),
  ],
  kf201s: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638912/KF_201_S_en_0c0ce032c2.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771636622/KF_Series_BLE_Fuel_Sensor_User_Manual_ae5a032370.pdf'),
  ],
  kf281s: [
    leafletDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771638944/KF_281_S_b13fa59f69.pdf'),
    manualDownload('/api/download?url=https://assets.jimiiot.app/image/upload/v1771636582/KF_Series_BLE_Fuel_Sensor_User_Manual_db425df930.pdf'),
  ],
};

const HARDWARE_PRODUCTS_BASE: HardwareProduct[] = [
  // Video Telematics -> Dashcam
  {
    id: 'jc400p',
    categoryId: 'video-telematics',
    subcategoryId: 'dashcam',
    name: 'JC400P',
    thumbnail: getImg('jc400p'),
    heroImage: productImage('video-telematics/JC_400_P.png'),
    heroImageFit: 'cover',
    tagline: { tr: 'Çift Netlik, Kusursuz Güvenlik.', en: 'Double Clarity, Seamless Safety.' },
    description: {
      tr: 'İki lens, tek kompakt gövde. Filonuzu bağlantılı, korumalı ve güven içinde tutmak için tasarlanmış, ek parçaya ihtiyaç duymayan sade bir araç içi kameradır.',
      en: 'Two lenses built in, one compact body. A dashcam designed to keep your fleet connected, covered, and confident. No extras needed. No distractions. Just seamless coverage from the inside out.',
    },
    specs: [],
    featureCards: [
      featureCard(
        'monitor',
        'Video Gözetimi',
        'Video Surveillance',
        'Güçlü LTE bağlantısı, aracın içini ve dışını çevrim içi platform üzerinden canlı izlemeyi sağlar. Cihaz üzerindeki kritik video klipler ise istenildiğinde her yerden yeniden oynatılabilir.',
        "Powerful LTE connectivity enables the live monitoring of the vehicle's interior and exterior via an online platform; while the critical video clips in the device allows for on-demand playback after the fact from anywhere, at any time.",
      ),
      featureCard(
        'car',
        'Çift Kanallı Kayıt',
        'Dual-Channel Recording',
        'İki dahili lens sayesinde ön yol ve kabinde olanlar aynı anda gerçek zamanlı izlenir; harici kameraya ihtiyaç bırakmaz.',
        'Simultaneously monitor the road ahead and what happens in the cab in real-time through the two on-device lenses, with no peripheral camera needed.',
      ),
      featureCard(
        'bell',
        'Birden Fazla Uyarı',
        'Multiple Alerts',
        'Hız aşımı ve SOS düğmesi aktivasyonu gibi özelleştirilebilir olaylarda video klipleri veya durağan görüntüleri kaydedip yükler.',
        'Record and upload video clips or still images of customizable events such as speeding and SOS button activation.',
      ),
      featureCard(
        'chart',
        'Kompakt Boyut',
        'Compact Size',
        'Küçük form faktörü, sürücünün görüşünü kapatmadan dikiz aynasının arkasına gizli kurulum yapılmasına olanak tanır.',
        "The small form factor allows discreet installation behind the rearview mirror without blocking the driver's view.",
      ),
      featureCard(
        'shield',
        'Araç İmmobilizasyonu',
        'Vehicle Immobilization',
        'Tracksolid Pro ile 20 km/s altındaki araçlarda yakıtı veya gücü kesmenizi sağlar. Araç çalındığında kritik bir güvenlik katmanı sunar.',
        'Enable you to cut off the fuel/power to the vehicle moving under 20km/h using Tracksolid Pro, which is useful if your fleet vehicle has been stolen.',
      ),
    ],
    specGroups: [
      specGroup('Network', 'Network', [
        spec('Standard', 'Standard', '4G LTE Cat.4'),
        spec('WiFi', 'WiFi', '2.4GHz, Support AP Mode/STA Mode/WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec('Band', 'Band', `Eurasian Version
LTE-FDD: B1/B3/B5/B7/B8/B19/B20
LTE-TDD: B38/B39/B40/B41 (100M)
WCDMA: B1/B2/B5/B8
GSM: B2/B3/B5/B8`),
        spec('American Version', 'American Version', `LTE-FDD: B2/B3/B4/B5/B7/B12/B17
LTE-TDD: B38/B41 (100M)
WCDMA: B2/B4/B5
GSM: B2/B5/B8`)
      ]),
      specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1920×1080/25FPS/F2.2/Full color/118° (HFoV)'),
        spec('Sub Camera', 'Sub Camera', '1280×720/15FPS/F2.5/Full color in daytime & monochrome in dim light/90° (HFoV)'),
        spec('Video Format', 'Video Format', '.mp4')
      ]),
      specGroup('Configuration', 'Configuration', [
        spec('GNSS', 'GNSS', 'GPS/BDS'),
        spec('Sensor', 'Sensor', '6-axis'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Interface', 'Interface', 'Micro USB*1, SOS*1, RS232*1, Relay*1'),
        spec('Memory Support', 'Memory Support', 'TF card (Up to 256GB)'),
        spec('SIM Card Type', 'SIM Card Type', 'Nano'),
        spec('LED Indication', 'LED Indication', 'Red (Power), Blue (Cellular), Green (GNSS)')
      ]),
      specGroup('Others', 'Others', [
        spec('Power Supply', 'Power Supply', 'Power cable: B+/ACC/GND'),
        spec('Operating Voltage', 'Operating Voltage', 'DC 9–30V'),
        spec('Operating Temperature', 'Operating Temperature', '–20°C to +65°C'),
        spec('Storage Temperature', 'Storage Temperature', '–30°C to +85°C'),
        spec('Device Weight', 'Device Weight', '233g'),
        spec('Device Dimension', 'Device Dimension', '109*69*52mm'),
        spec('Certifications', 'Certifications', 'CE/FCC/RoHS')
      ])
    ],
    downloads: [
      {
        label: t('JC400P Broşürü (PDF)', 'JC400P Leaflet (PDF)'),
        url: 'https://assets.jimiiot.app/image/upload/v1771638601/JC_400_P_Leaflet_3954847710.pdf',
      },
    ],
    gallery: GALLERY.jc400p,
  },
  {
    id: 'jc400',
    categoryId: 'video-telematics',
    subcategoryId: 'dashcam',
    name: 'JC400',
    thumbnail: getImg('jc400'),
    tagline: { tr: 'Tasarımı basit, doğası gereği güçlü.', en: 'Simple by design. Powerful by nature.' },
    description: {
      tr: 'JC400 4G araç içi kamerası, yol görünürlüğünü ve operasyon güvenliğini aynı yapıda güçlendirir. Cihaz üzerindeki kamera yolu izlerken opsiyonel harici kamera kabini veya arka alanı takip eder; 4G bağlantı sayesinde canlı video, sesli uyarı, rota oynatma ve geçmiş kayıt erişimi de sunar.',
      en: 'JC400 4G dashcam can significantly increase the safety efficiency and sustainability of operations that power the fleet. It allows you to add an inward-facing, or backup camera as needed. The on-device camera can monitor the road ahead, while the peripheral camera can monitor the cabin, or the rear.',
    },
    specs: [],
    featureCards: [
      featureCard(
        'car',
        'Çift Kanallı Kayıt',
        'Dual-Channel Recording',
        'Entegre lens ön yolu izlerken, opsiyonel çevre kamera kabini, arka alanı, yan tarafı veya sürücüyü iş ihtiyacınıza göre gözlemleyebilir.',
        'Monitor the road ahead through the integrated lens and what is happening in the cab, in the rear, to the side, or to the driver through a peripheral camera to meet your specific business needs.',
      ),
      featureCard(
        'monitor',
        'Video Gözetimi',
        'Video Surveillance',
        'Güçlü LTE bağlantısı, aracın içi ve dışının çevrim içi platformdan canlı izlenmesini; cihazdaki kritik kliplerin ise her yerden talep üzerine oynatılmasını sağlar.',
        "Powerful LTE connectivity enables the live monitoring of the vehicle's interior and exterior via an online platform; while the critical video clips in the device allows for on-demand playback after the fact from anywhere, at any time.",
      ),
      featureCard(
        'bell',
        'Birden Fazla Uyarı',
        'Multiple Alerts',
        'Hız aşımı ve SOS düğmesi aktivasyonu gibi özelleştirilebilir olaylarda video klipleri veya durağan görüntüleri kaydedip yükler.',
        'Record and upload video clips or still images of customizable events such as speeding and SOS button activation.',
      ),
      featureCard(
        'chart',
        'Kompakt Boyut',
        'Compact Size',
        'Küçük form faktörü, sürücünün görüş alanını kapatmadan dikiz aynasının arkasına gizli kurulum yapılmasına imkan tanır.',
        "The small form factor allows discreet installation behind the rearview mirror without blocking the driver's view.",
      ),
      featureCard(
        'shield',
        'Araç İmmobilizasyonu',
        'Vehicle Immobilization',
        'Tracksolid Pro üzerinden 20 km/s altındaki araçlarda yakıtı veya gücü keserek çalıntı araç senaryolarında kritik bir müdahale katmanı sağlar.',
        'Enable you to cut off the fuel/power to the vehicle moving under 20km/h using Tracksolid Pro, which is useful if your fleet vehicle has been stolen.',
      ),
    ],
    specGroups: [
      specGroup('Network', 'Network', [
        spec('Standard', 'Standard', '4G LTE Cat.4'),
        spec('WiFi', 'WiFi', '2.4GHz, Support AP Mode/STA Mode/WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec('Band', 'Band', `Eurasian Version
LTE-FDD: B1/B3/B5/B7/B8/B19/B20
LTE-TDD: B38/B39/B40/B41 (100M)
WCDMA: B1/B2/B5/B8
GSM: B2/B3/B5/B8`),
        spec('American Version', 'American Version', `LTE-FDD: B2/B3/B4/B5/B7/B12/B17
LTE-TDD: B38/B41 (100M)
WCDMA: B2/B4/B5
GSM: B2/B5/B8`)
      ]),
      specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1920×1080/25FPS/F2.2/Full color/118° (HFoV)'),
        spec('Peripheral Camera (Optional)', 'Peripheral Camera (Optional)', `CI01: 1280×720/15FPS/F2.0/Full color in daytime & monochrome in dim light/100° (HFoV)
CI03: 1280×720/15FPS/F2.4/Full color in daytime & monochrome in dim light/119° (HFoV)
CE01: 1280×720/15FPS/F2.0/Full color/IP67/125° (HFoV)`),
        spec('Video Format', 'Video Format', '.mp4')
      ]),
      specGroup('Configuration', 'Configuration', [
        spec('GNSS', 'GNSS', 'GPS/BDS'),
        spec('Sensor', 'Sensor', '6-axis'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Interface', 'Interface', 'Micro USB*1, SOS*1, RS232*1, Relay*1'),
        spec('Memory Support', 'Memory Support', 'TF card (Up to 256GB)'),
        spec('SIM Card Type', 'SIM Card Type', 'Nano'),
        spec('LED Indication', 'LED Indication', 'Red (Power), Blue (Cellular), Green (GNSS)')
      ]),
      specGroup('Others', 'Others', [
        spec('Power Supply', 'Power Supply', 'Power cable: B+/ACC/GND'),
        spec('Operating Voltage', 'Operating Voltage', 'DC 9–30V'),
        spec('Operating Temperature', 'Operating Temperature', '–20°C to +65°C'),
        spec('Storage Temperature', 'Storage Temperature', '–30°C to +85°C'),
        spec('Device Weight', 'Device Weight', '233g'),
        spec('Device Dimension', 'Device Dimension', '109*69*52mm'),
        spec('Certifications', 'Certifications', 'CE/FCC/RoHS')
      ])
    ],
    gallery: GALLERY.jc400,
  },
  {
    id: 'jc261p',
    categoryId: 'video-telematics',
    subcategoryId: 'dashcam',
    name: 'JC261P',
    thumbnail: getImg('jc261p'),
    tagline: { tr: 'İki Görünüm. Daha Akıllı Kararlar. Güvenlik, Yeniden Tanımlandı.', en: 'Two Views. Smarter Decisions. Safety, Redefined.' },
    description: {
      tr: 'JC400P\'nin yapay zeka ile güçlendirilmiş versiyonu olan JC261P, ön yolu ve kabini aynı anda izleyen entegre çift lensli bir araç içi kameradır. Kızılötesi gece görüşü, ADAS, istisna uyarıları ve 4G bağlantılı canlı video akışı ile sürücü koçluğu ve operasyon iyileştirmesi için daha güçlü bir veri katmanı sunar.',
      en: 'An upgrade of JC400P, the JC261P integrated dual-lens dash camera allows you to simultaneously monitor the road ahead and the cabin. A number of safety features are included in the system, including infrared night vision (inward-facing lens), ADAS, exception alerts, and more.',
    },
    specs: [],
    featureCards: [
      featureCard(
        'monitor',
        'Video Gözetimi',
        'Video Surveillance',
        'Güçlü LTE bağlantısı, aracın içini ve dışını çevrim içi platform üzerinden canlı izlemeyi sağlar. Cihaz üzerindeki kritik klipler ise istenildiğinde her yerden yeniden oynatılabilir.',
        "Powerful LTE connectivity enables the live monitoring of the vehicle's interior and exterior via an online platform; while the critical video clips in the device allows for on-demand playback after the fact from anywhere, at any time.",
      ),
      featureCard(
        'car',
        'Çift Kanallı Kayıt',
        'Dual-Channel Recording',
        'Harici kamera gerektirmeden ön yolu ve kabin içini gerçek zamanlı olarak aynı anda izler. Kompakt yapı kurulum süresini kısaltır ve daha az yer kaplar.',
        'Simultaneously monitor the road ahead and what happens in the cab in real-time, with no peripheral camera needed. The compact design makes it easy to install and the installation takes less space as well.',
      ),
      featureCard(
        'bell',
        'Sürücü Destek Sistemi (ADAS)',
        'Driver Assistance (ADAS)',
        'ADAS algoritması takip mesafesi, yakın çarpışma ve şerit ihlali gibi olayları izleyip sürücüyü gerçek zamanlı olarak uyarır.',
        'The ADAS algorithm enables the device to monitor incidents related to following distance, near collisions, lane keeping, etc., and warn the driver in real time.',
      ),
      featureCard(
        'chart',
        'Yüksek Entegrasyonlu Tasarım',
        'Highly-Integrated Design',
        'Yüksek çözünürlüklü yola bakan ana kamera ile içe dönük alt kamera tek gövdede bir arada bulunur. Bu yapı yer tasarrufu sağlar ve montajı kolaylaştırır.',
        'The high-definition road-facing camera (main) and the inward-facing camera (sub) are housed in one unit. This saves space and makes it easier to install.',
      ),
      featureCard(
        'layers',
        'Hızlı Entegrasyon',
        'Fast Integration',
        'Kendi platformunuz ya da ITS yapınız için hızlı entegrasyon gerektiğinde IoT Hub ile uyumlu bir bağlantı katmanı sunar.',
        'We can provide an IoT Hub to facilitate fast and seamless integration to any third-party platform or the intelligent transport system (ITS).',
      ),
    ],
    specGroups: [
      specGroup('Network', 'Network', [
        spec('Standard', 'Standard', '4G LTE Cat.4'),
        spec('WiFi', 'WiFi', '2.4GHz, Support AP Mode/STA Mode/WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec('Band', 'Band', `Eurasian Version
LTE-FDD: B1/B3/B5/B7/B8/B19/B20
LTE-TDD: B38/B39/B40/B41 (100M)
WCDMA: B1/B2/B5/B8
GSM: B2/B3/B5/B8`),
        spec('American Version', 'American Version', `LTE-FDD: B2/B3/B4/B5/B7/B12/B17
LTE-TDD: B38/B41 (100M)
WCDMA: B2/B4/B5
GSM: B2/B5/B8`)
      ]),
      specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1920×1080/25FPS/F2.2/Full color/85° (HFoV)'),
        spec('Sub Camera', 'Sub Camera', '1280×720/15FPS/F2.5/Full color in daytime & monochrome in dim light/90° (HFoV)'),
        spec('Video Format', 'Video Format', '.ts')
      ]),
      specGroup('Configuration', 'Configuration', [
        spec('GNSS', 'GNSS', 'GPS/BDS'),
        spec('Sensor', 'Sensor', '6-Axis accelerometer'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Interface', 'Interface', 'Micro USB*1, SOS*1, TTL*1, Relay*1'),
        spec('Memory Support', 'Memory Support', 'TF card (Up to 256GB)'),
        spec('SIM Card Type', 'SIM Card Type', 'Nano'),
        spec('LED Indication', 'LED Indication', 'Red (Power), Blue (Cellular), Green (GNSS)')
      ]),
      specGroup('Others', 'Others', [
        spec('Power Supply', 'Power Supply', 'Power cable: B+/ACC/GND'),
        spec('Operating Voltage', 'Operating Voltage', 'DC 9–30V'),
        spec('Operating Temperature', 'Operating Temperature', '–20°C to +65°C'),
        spec('Storage Temperature', 'Storage Temperature', '–30°C to +85°C'),
        spec('Device Weight', 'Device Weight', '233g'),
        spec('Device Dimension', 'Device Dimension', '109*69*52mm'),
        spec('Certifications', 'Certifications', 'CE/FCC/RoHS')
      ])
    ],
    gallery: GALLERY.jc261p,
  },
  {
    id: 'jc261',
    categoryId: 'video-telematics',
    subcategoryId: 'dashcam',
    name: 'JC261',
    thumbnail: getImg('jc261'),
    tagline: { tr: 'Yolu Hissedin. Sürücülerinizi Anlayın. Önde Kalın.', en: 'Sense the Road. Understand Your Drivers. Stay Ahead.' },
    description: {
      tr: 'JC261, JC400\'ün gelişmiş bir versiyonu olarak sürücüye dönük, kabin içi veya geri görüş kamerası eklemenize imkan tanır. Entegre kamera ön yolu izlerken opsiyonel çevre kamera sürücüyü, kabini veya arka alanı takip eder; DMS, ADAS ve 4G video akışı ile filo ekiplerine daha güçlü görünürlük sunar.',
      en: 'The JC261 4G dash camera allows you to add a driver-facing, inward-facing, or backup camera as needed. The on-device camera can monitor the road ahead, while the peripheral camera can monitor the driver, the cabin, or the rear. A number of safety features are included in the system, including DMS, ADAS, exception alerts and more.',
    },
    specs: [],
    featureCards: [
      featureCard(
        'monitor',
        'Video Gözetimi',
        'Video Surveillance',
        'Güçlü LTE bağlantısı, aracın içini ve dışını çevrim içi platform üzerinden canlı izlemeyi sağlar. Cihaz üzerindeki kritik klipler ise istenildiğinde her yerden yeniden oynatılabilir.',
        "Powerful LTE connectivity enables the live monitoring of the vehicle's interior and exterior via an online platform; while the critical video clips in the device allows for on-demand playback after the fact from anywhere, at any time.",
      ),
      featureCard(
        'car',
        'Çift Kanallı Kayıt',
        'Dual-Channel Recording',
        'Entegre lens ön yolu izlerken opsiyonel çevre kamera kabin içi, arka alan, yan taraf veya sürücü davranışını ihtiyaca göre takip eder.',
        'Monitor the road ahead through the integrated lens and what is happening in the cab, in the rear, to the side, or to the driver through a peripheral camera to meet your specific business needs.',
      ),
      featureCard(
        'bell',
        'Sürücü Destek Sistemi (ADAS)',
        'Driver Assistance (ADAS)',
        'ADAS algoritması takip mesafesi, yakın çarpışma ve şerit ihlali gibi olayları izleyip sürücüyü gerçek zamanlı olarak uyarır.',
        'The ADAS algorithm enables the device to monitor incidents related to following distance, near collisions, lane keeping, etc., and warn the driver in real time.',
      ),
      featureCard(
        'cpu',
        'Sürücü İzleme (DMS) (Opsiyonel)',
        'Driver Monitoring (DMS) (Optional)',
        'Opsiyonel DMS kamera telefon kullanımı, sigara içme, dikkat dağınıklığı, esneme, gözlerin kapanması veya sürücünün pozisyonda olmaması gibi durumları algılayabilir.',
        'The DMS camera is able to detect fatigue and distracted driving, such as texting while driving, yawning, smoking, or fiddling with the stereo, as well as the exception of the driver not being in position.',
      ),
      featureCard(
        'layers',
        'Hızlı Entegrasyon',
        'Fast Integration',
        'Üçüncü taraf platformlar veya ITS yapıları için IoT Hub ile hızlı ve kesintisiz entegrasyon kurgusu sunabilir.',
        'We can provide an IoT Hub to facilitate fast and seamless integration to any third-party platform or the intelligent transport system (ITS).',
      ),
    ],
    specGroups: [
      specGroup('Network', 'Network', [
        spec('Standard', 'Standard', '4G LTE Cat.4'),
        spec('WiFi', 'WiFi', '2.4GHz, Support AP Mode/STA Mode/WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec('Band', 'Band', `Eurasian Version
LTE-FDD: B1/B3/B5/B7/B8/B19/B20
LTE-TDD: B38/B39/B40/B41 (100M)
WCDMA: B1/B2/B5/B8
GSM: B2/B3/B5/B8`),
        spec('American Version', 'American Version', `LTE-FDD: B2/B3/B4/B5/B7/B12/B17
LTE-TDD: B38/B41 (100M)
WCDMA: B2/B4/B5
GSM: B2/B5/B8`)
      ]),
      specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1920×1080/25FPS/F2.2/Full color/85° (HFoV)'),
        spec('Peripheral Camera (Optional)', 'Peripheral Camera (Optional)', `CI01: 1280×720/15FPS/F2.0/Full color in daytime & monochrome in dim light/100° (HFoV)
CI03: 1280×720/15FPS/F2.4/Full color in daytime & monochrome in dim light/119° (HFoV)
CE01: 1280×720/15FPS/F2.0/Full color/IP67/125° (HFoV)
JC170: 1280×720/15FPS/F2.4/Monochrome/56° (HFoV)`),
        spec('Video Format', 'Video Format', '.ts')
      ]),
      specGroup('Configuration', 'Configuration', [
        spec('GNSS', 'GNSS', 'GPS/BDS'),
        spec('Sensor', 'Sensor', '3-axis'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Interface', 'Interface', 'Micro USB*1, SOS*1, TTL*1, Relay*1'),
        spec('Memory Support', 'Memory Support', 'TF card (Up to 256GB)'),
        spec('SIM Card Type', 'SIM Card Type', 'Nano'),
        spec('LED Indication', 'LED Indication', 'Red (Power), Blue (Cellular), Green (GNSS)')
      ]),
      specGroup('Others', 'Others', [
        spec('Power Supply', 'Power Supply', 'Power cable: B+/ACC/GND'),
        spec('Operating Voltage', 'Operating Voltage', 'DC 9–30V'),
        spec('Operating Temperature', 'Operating Temperature', '–20°C to +65°C'),
        spec('Storage Temperature', 'Storage Temperature', '–30°C to +85°C'),
        spec('Device Weight', 'Device Weight', '233g'),
        spec('Device Dimension', 'Device Dimension', '109*69*52mm'),
        spec('Certifications', 'Certifications', 'CE/FCC/RoHS')
      ])
    ],
    gallery: GALLERY.jc261,
  },
  {
    id: 'jc182',
    categoryId: 'video-telematics',
    subcategoryId: 'dashcam',
    name: 'JC182',
    thumbnail: getImg('jc182'),
    tagline: { tr: 'Küçük ama Güçlü. Her Yolculuk İçin Üretildi.', en: 'Tiny but Mighty. Made for Every Journey.' },
    description: {
      tr: 'Özel araçlar için tasarlanan JC182, konumlandırma ve video işlevlerini tek gövdede birleştirir. Dahili 4G ve GNSS modülleri ile gerçek zamanlı konum paylaşımı ve kesintisiz sürüş kaydı sağlar.',
      en: 'The JC182, designed for private cars, is a road-facing camera that integrates positioning and video functions. Its internal 4G and GNSS modules enable real-time location reporting and continuous recording of your drives.',
    },
    specs: [],
    specGroups: [
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G LTE Cat 1'),
        spec('Frequency', 'Frequency', `JC182-LA:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28`)
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Red (Power), Blue (Cellular), Green (GNSS)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('External memory', 'External memory', 'TF card (up to 512GB)'),
        spec('USB', 'USB', 'Type-C'),
        spec('WiFi', 'WiFi', '2.4GHz, Support WiFi Direct'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Sensor', 'Sensor', '6-Axis accelerometer')
      ]),
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS, BDS, AGPS')
      ]),
      specGroup('Camera', 'Camera', [
        spec('Front camera (main)', 'Front camera (main)', '2560×1440 / 25FPS / F2.4 / Full color / 110° (HFoV)'),
        spec('Video format', 'Video format', '.ts')
      ]),
      specGroup('Power', 'Power', [
        spec('Input voltage', 'Input voltage', 'DC 9–30V')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to +65°C'),
        spec('Storage temperature', 'Storage temperature', '–30°C to +85°C')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '70.0 x 60.0 x 34.0mm'),
        spec('Weight', 'Weight', '110g')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Configuration support', 'Configuration support', 'APP, Memory card'),
        spec('Firmware update', 'Firmware update', 'USB Cable, Memory card, OTA'),
        spec('Certification', 'Certification', 'CE, FCC')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('JC182 unit', 'JC182 unit', '1'),
        spec('Screws', 'Screws', '2'),
        spec('Screwdriver', 'Screwdriver', '1')
      ])
    ],
  },
  {
    id: 'jc181',
    categoryId: 'video-telematics',
    subcategoryId: 'dashcam',
    name: 'JC181',
    thumbnail: getImg('jc181'),
    tagline: { tr: 'Formu Mütevazı, Kanıtı Güçlü.', en: 'Modest in Form, Mighty in Proof.' },
    description: {
      tr: 'JC181, hareket halindeki filoları uzaktan yönetmeyi kolaylaştıran kompakt bir video mobilite cihazıdır. LTE ve GNSS desteğiyle canlı görüntü, geçmiş kayıt ve kritik kanıt erişimini her an mümkün kılar.',
      en: 'The JC181 is a compact video telematics device that makes it easy to remotely manage your en-route fleets. It adds visibility to your fleet, along with powerful LTE connectivity and GNSS capability, and can record and store video footage and images on the device.',
    },
    specs: [],
    specGroups: [
      specGroup('Network', 'Network', [
        spec('Standard', 'Standard', '4G LTE Cat.1'),
        spec('WiFi', 'WiFi', '2.4GHz, Support WiFi Direct'),
        spec('Brand', 'Brand', `Latin American Version
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28
GSM: B2/B3/B5/B8`),
        spec('Eurasian Version', 'Eurasian Version', `LTE-FDD: B1/B3/B5/B7/B8/B20/B28
LTE-TDD: B38/B40/B41
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1920×1080/30FPS/F2.2/Full color/110° (HFoV)'),
        spec('Sub Camera', 'Sub Camera', '640×360/10FPS/F2.8/Full color in daytime & monochrome in dim light/100° (HFoV)'),
        spec('Video Format', 'Video Format', '.mp4')
      ]),
      specGroup('Configuration', 'Configuration', [
        spec('GNSS', 'GNSS', 'GPS/BDS/AGPS'),
        spec('Sensor', 'Sensor', '3-axis'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Interface', 'Interface', 'Type-C USB*1, Relay*1'),
        spec('Memory Support', 'Memory Support', 'TF Card (Up to 128GB)'),
        spec('SIM Card Type', 'SIM Card Type', 'Nano'),
        spec('LED Indication', 'LED Indication', 'Red (Power), Green (GNSS), Blue (Cellular)')
      ]),
      specGroup('Others', 'Others', [
        spec('Power Supply', 'Power Supply', 'Power cable: B+/ACC/GND'),
        spec('Operating Voltage', 'Operating Voltage', 'DC 9–30V'),
        spec('Operating Temperature', 'Operating Temperature', '–20°C to +70°C'),
        spec('Storage Temperature', 'Storage Temperature', '–30°C to +85°C'),
        spec('Device Weight', 'Device Weight', '143g'),
        spec('Device Dimension', 'Device Dimension', '118*46.5*43.5mm')
      ])
    ],
  },
  // Video Telematics -> AI Camera
  {
    id: 'jc171',
    categoryId: 'video-telematics',
    subcategoryId: 'ai-camera',
    name: 'JC171',
    thumbnail: getImg('jc171'),
    tagline: { tr: 'Daha Keskin Görüş. Daha Akıllı Güvenlik.', en: 'Sharper Vision. Smarter Safety.' },
    description: {
      tr: 'Sürücü güvenliğini artırmak için tasarlanan kompakt yapay zeka kamerası; yorgunluk, dikkat dağınıklığı, emniyet kemeri takibi ve yüz tanıma gibi gelişmiş senaryoları destekler.',
      en: 'The JC171 AI camera is a compact device designed to enhance driver safety. Using advanced algorithms, it detects fatigue and distraction and then issues audible alerts to remind and encourage safer driving.',
    },
    specs: [],
    specGroups: [
      specGroup('Camera', 'Camera', [
        spec('Front camera (main)', 'Front camera (main)', '1920×1080/25FPS/F2.4/Monochrome/110° (HFoV)'),
        spec('Video format', 'Video format', '.ts')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Red (Power), Green (Monitoring), Blue (Align)'),
        spec('External memory', 'External memory', 'TF card (up to 128GB)'),
        spec('USB', 'USB', 'Type-C'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Serial ports', 'Serial ports', '1*TTL')
      ]),
      specGroup('Feature', 'Feature', [
        spec('AI', 'AI', 'Facial recognition, Driver change notification, Seatbelt use detection, Phone use, Smoking, Distraction, Yawning, Eyes closed, No face detected'),
        spec('Configuration support', 'Configuration support', 'Memory card, USB cable'),
        spec('Firmware update', 'Firmware update', 'USB cable'),
        spec('Certification', 'Certification', 'CE, FCC')
      ]),
      specGroup('Power', 'Power', [
        spec('Input voltage', 'Input voltage', 'DC 9–30V')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to +70°C'),
        spec('Storage temperature', 'Storage temperature', '–30°C to +85°C')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '68.0 x 55.0 x 33.0mm'),
        spec('Weight', 'Weight', '216g')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('JC171 unit', 'JC171 unit', '1'),
        spec('Screws', 'Screws', '2'),
        spec('Hex screwdriver', 'Hex screwdriver', '1')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('Power cable', 'Power cable', 'Required when working with GT06N or VL802'),
        spec('Compatibility', 'Compatibility', 'JC261 Dual-channel AI dashCam, GT06N Vehicle GNSS tracker, VL802 LTE vehicle terminal'),
        spec('GPS antenna', 'GPS antenna', 'Required when GNSS function is a must, and the unit is used on its own')
      ])
    ],
  },
  {
    id: 'jc170',
    categoryId: 'video-telematics',
    subcategoryId: 'ai-camera',
    name: 'JC170',
    thumbnail: getImg('jc170'),
    tagline: { tr: 'Sürücü Farkındalığı. Artırılmış Güvenlik.', en: 'Driver-Aware. Safety Elevated.' },
    description: {
      tr: 'Birden fazla görsel yapay zeka algoritmasını kullanan kompakt DMS kamerası; dikkat, yorgunluk ve sürücü davranışlarını izleyerek sesli uyarılar üretir.',
      en: 'The JC170 is a compact DMS camera that utilizes multiple visual AI algorithms. It can monitor driver attentiveness, warn the driver with audible alerts if signs of fatigue or distraction are detected, and output alert information.',
    },
    specs: [],
    specGroups: [
      specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1280×720/15FPS/F2.4/Monochrome/56° (HFoV)'),
        spec('Video Format', 'Video Format', '.mp4')
      ]),
      specGroup('Configuration', 'Configuration', [
        spec('Speaker', 'Speaker', 'Support'),
        spec('Interface', 'Interface', 'Mirco USB*1, TTL*1'),
        spec('Memory Support', 'Memory Support', 'TF Card (Up to 128GB)'),
        spec('LED Indication', 'LED Indication', 'Red (Power), Green (Monitoring), Blue (Align)')
      ]),
      specGroup('Others', 'Others', [
        spec('Power Supply', 'Power Supply', 'Power cable: B+/ACC/GND'),
        spec('Operating Voltage', 'Operating Voltage', 'DC 9–30V'),
        spec('Operating Temperature', 'Operating Temperature', '–20°C to +70°C'),
        spec('Storage Temperature', 'Storage Temperature', '–30°C to +85°C'),
        spec('Device Weight', 'Device Weight', '216g'),
        spec('Device Dimension', 'Device Dimension', '68*55*33mm'),
        spec('Certifications', 'Certifications', 'CE/FCC/RoHS')
      ])
    ],
  },
  {
    id: 'jc371',
    categoryId: 'video-telematics',
    subcategoryId: 'ai-camera',
    name: 'JC371',
    thumbnail: getImg('jc371'),
    tagline: { tr: 'Güvenlik İçin Yeni Nesil Yapay Zeka.', en: 'Next-Gen AI for Safety. Reimagined.' },
    description: {
      tr: 'Ticari araçlar için özel olarak tasarlanan JC371, 3 kameraya kadar destek veren güçlü bir uzaktan video izleme terminalidir. ADAS, DMS ve acil durum uyarılarıyla güvenlik ve operasyon görünürlüğünü bir araya getirir.',
      en: 'The JC371, designed specifically for commercial vehicles, is a powerful remote video monitoring terminal that supports up to 3 cameras and incorporates advanced visual AI algorithms like ADAS and DMS.',
    },
    specs: [],
    specGroups: [
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G LTE Cat 4, 3G (WCDMA)，2G（GSM）'),
        spec('Frequency', 'Frequency', `JC371-EU:
FDD-LTE: B1/B3/B5/B7/B8/B20/B28A
TDD-LTE: B38/B40/B41
WCDMA: B1/B5/B8
GSM: B3/B8`),
        spec('JC371-NA:', 'JC371-NA:', `FDD-LTE: B2/B4/B5/B12/B13/B14/B66/B71
WCDMA: B2/B4/B5`),
        spec('JC371-LA:', 'JC371-LA:', `FDD-LTE: B1/B2/B3/B4/B5/B7/B8/B28/B66
TDD-LTE: B40
WCDMA: B1/B2/B4/B5/B8
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS, BDS, AGPS')
      ]),
      specGroup('Camera', 'Camera', [
        spec('Camera support', 'Camera support', '1080P x 3'),
        spec('Video format', 'Video format', '.ts')
      ]),
      specGroup('Power', 'Power', [
        spec('Input voltage', 'Input voltage', 'DC 9–30V')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to +70°C'),
        spec('Storage temperature', 'Storage temperature', '–30°C to +85°C')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '118.0 x 77.0 x 31.0mm'),
        spec('Weight', 'Weight', '283g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Red (Power), Blue (Cellular), Green (GNSS), White (AI)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Internal memory', 'Internal memory', 'EMMC 128GB'),
        spec('External memory', 'External memory', 'TF card (up to 512GB)'),
        spec('USB', 'USB', 'Type-C'),
        spec('WiFi', 'WiFi', '2.4GHz, Support AP Mode/STA Mode/WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Digital I/Os', 'Digital I/Os', '2*SOS, 2*Relay, 2*Reserved inputs'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Serial ports', 'Serial ports', '2*TTL'),
        spec('Sensor', 'Sensor', '6-Axis accelerometer')
      ]),
      specGroup('Feature', 'Feature', [
        spec('ADAS', 'ADAS', 'FCW, HMW, LDW, PCW'),
        spec('DMS (Optional)', 'DMS (Optional)', 'Phone use, Smoking, Distraction, Yawning, Eyes closed, No face detected'),
        spec('Configuration support', 'Configuration support', 'GPRS, SMS, Memory card, APP'),
        spec('Firmware update', 'Firmware update', 'USB Cable, Memory card, OTA'),
        spec('Certification', 'Certification', 'FCC，PTCRB，CE')
      ])
    ],
  },
  // Video Telematics -> CameraBox
  {
    id: 'jc450',
    categoryId: 'video-telematics',
    subcategoryId: 'camerabox',
    name: 'JC450',
    thumbnail: getImg('jc450'),
    tagline: { tr: 'Her Şeyi Gör. İleriye Bak.', en: 'View All. Think Ahead.' },
    description: { tr: 'JC450, tam kapsamlı ve yapay zeka destekli video izleme ile güvenliği artırır.', en: 'From capture to sense to safeguard, JC450 enhances safety with full coverage and AI.' },
    specs: [],
    specGroups: [
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G LTE Cat 4, 3G (WCDMA), 2G (GSM)'),
        spec('Frequency', 'Frequency', `JC450-LA:
FDD-LTE: B1/B2/B3/B4/B5/B7/B8/B28/B66
TDD-LTE: B40
WCDMA: B1/B2/B4/B5/B8
GSM: B2/B3/B5/B8`),
        spec('JC450-NA:', 'JC450-NA:', `FDD-LTE: B2/B4/B5/B12/B13/B14/B66
WCDMA: B2/B4/B5`),
        spec('JC450-EU:', 'JC450-EU:', `FDD-LTE: B1/B3/B5/B7/B8/B20/B28
TDD-LTE: B38/B40/B41
WCDMA: B1/B5/B8
GSM: B3/B8`)
      ]),
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS, BDS, AGPS')
      ]),
      specGroup('Camera', 'Camera', [
        spec('Front camera (main)', 'Front camera (main)', '1920x1080/25FPS/F2.0/Full color/80° (HFoV)'),
        spec('Video format', 'Video format', '.ts/.mp4')
      ]),
      specGroup('Power', 'Power', [
        spec('Input voltage', 'Input voltage', 'DC 9–30V')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20℃ to +70℃'),
        spec('Storage temperature', 'Storage temperature', '-30℃ to +85℃')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Red (Power), Blue (Cellular), Green (GNSS)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('External memory', 'External memory', 'TF card (up to 256GB*2)'),
        spec('USB', 'USB', 'Type-C'),
        spec('WiFi', 'WiFi', '2.4GHz, Support AP Mode/STA Mode/WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Digital I/Os', 'Digital I/Os', '2*SOS; 1*Relay; 2*Reserved inputs'),
        spec('Analog I/Os', 'Analog I/Os', '1*CVBS-OUT'),
        spec('Serial ports', 'Serial ports', '1*RS232, 1*TTL'),
        spec('Sensor', 'Sensor', '3-Axis accelerometer')
      ]),
      specGroup('Feature', 'Feature', [
        spec('ADAS', 'ADAS', 'FCW, HMW, LDW'),
        spec('DMS (Optional)', 'DMS (Optional)', 'Phone use, Smoking, Distraction, Yawning, Eyes closed, No face detected'),
        spec('Facial Recognition System', 'Facial Recognition System', 'Required with JC171'),
        spec('Seatbelt Detection', 'Seatbelt Detection', 'Required with JC171'),
        spec('Configuration support', 'Configuration support', 'GPRS, SMS, Memory card, APP'),
        spec('Firmware update', 'Firmware update', 'USB cable, Memory card, OTA'),
        spec('Certification', 'Certification', 'CE, FCC, PTCRB, RoHS, AT&T')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '114.0 x 113.0 x 33.0mm'),
        spec('Weight', 'Weight', '374g')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('JC450 unit', 'JC450 unit', '1'),
        spec('Power cable', 'Power cable', '1'),
        spec('SOS button', 'SOS button', '1'),
        spec('Mount base', 'Mount base', '1'),
        spec('Double-sided adhesive', 'Double-sided adhesive', '1'),
        spec('Screws', 'Screws', '1'),
        spec('Screwdriver', 'Screwdriver', '1')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('Peripheral camera', 'Peripheral camera', `JC171: AI Camera (driver monitoring system/facial recognition system/seatbelt detection)
CI02: 1280x720/15FPS/F2.5/Color in daytime & mono in dim light/135° (HFoV)
CI01: 1280x720/15FPS/F2.0/Color in daytime & mono in dim light/100° (HFoV)
CI03: 1280x720/15FPS/F2.4/Color in daytime & mono in dim light/119° (HFoV)
CI04: 1280x720/15FPS/F2.4/Color in daytime & mono in dim light/119° (HFoV)
CD02: 1280x720/15FPS/F2.0/Monochrome/56° (HFoV)
CE01: 1280x720/15FPS/F2.0/Full color/IP67/125° (HFoV)
CE02: 1280x720/15FPS/F2.0/Full color/IP67/111° (HFoV)`),
        spec('Relay', 'Relay', '12V or 24V')
      ])
    ],
  },
  {
    id: 'jc451',
    categoryId: 'video-telematics',
    subcategoryId: 'camerabox',
    name: 'JC451',
    thumbnail: getImg('jc451'),
    tagline: { tr: 'Gizli Zeka. Görünür Güvenlik.', en: 'Hidden Intelligence. Visible Safety.' },
    description: { tr: 'Uyum sağlar; sessiz hassasiyet ve güçlü yapay zeka analizleriyle filonuzu korur.', en: 'It blends in, yet its AI sees what others miss, protecting your fleet with silent precision.' },
    specs: [],
    specGroups: [
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G LTE Cat 4, 3G (WCDMA), 2G (GSM)'),
        spec('Frequency', 'Frequency', `JC451-EU
FDD-LTE: B1/B3/B7/B8/B20/B28A`)
      ]),
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS, BDS')
      ]),
      specGroup('Camera', 'Camera', [
        spec('Camera support', 'Camera support', 'Max. 5 (1*1080P + 4*720P), refer to Optional Configuration*'),
        spec('Video format', 'Video format', '.ts')
      ]),
      specGroup('Power', 'Power', [
        spec('Input voltage', 'Input voltage', 'DC 9–30V')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to +70°C'),
        spec('Storage temperature', 'Storage temperature', '–30°C to +85°C')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '118.0 x 97.0 x 32.0mm'),
        spec('Weight', 'Weight', '350g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Red (Power), Blue (Cellular), Green (GNSS)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('External memory', 'External memory', 'TF card (up to 256GB*2)'),
        spec('USB', 'USB', 'Type-C'),
        spec('WiFi', 'WiFi', '2.4GHz, Support AP Mode/STA Mode/WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('Speaker', 'Speaker', 'Support'),
        spec('Digital I/Os', 'Digital I/Os', '2: SOS*2, 1* Relay, 2*Reserved inputs'),
        spec('Analog I/Os', 'Analog I/Os', '1*CVBS-OUT'),
        spec('Serial ports', 'Serial ports', '1*RS232, 1*TTL'),
        spec('Sensor', 'Sensor', '3-Axis accelerometer')
      ]),
      specGroup('Feature', 'Feature', [
        spec('ADAS', 'ADAS', 'FCW, HMW, LDW'),
        spec('DMS (Optional)', 'DMS (Optional)', 'Phone use, Smoking, Distraction, Yawning, Eyes closed, No face detected'),
        spec('Configuration support', 'Configuration support', 'GPRS, SMS, Memory card, APP'),
        spec('Firmware update', 'Firmware update', 'USB Cable, Memory card, OTA'),
        spec('Certification (planning)', 'Certification (planning)', 'CE')
      ])
    ],
  },
  // GPS Trackers -> Vehicle Tracker
  {
    id: 'vl113',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL113',
    thumbnail: getImg('vl113'),
    tagline: { tr: 'Filonuzdaki Gizli Gözler.', en: 'Hidden Eyes on Your Fleet.' },
    description: { tr: 'Gizlilik ve detaylı izleme bir arada.', en: 'Hidden Eyes on Your Fleet.' },
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, GLONASS, WIFI, LBS, AGPS'),
        spec('Accuracy', 'Accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', 'Avg. hot start ≤ 1sec; Avg. cold start ≤ 32sec')
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1'),
        spec('Frequency', 'Frequency', `VL113_EU:
LTE-FDD: B1/B3/B7/B8/B20/B28;
LTE-TDD: B34/B38/B39/B40/B41`),
        spec('VL113_JP:', 'VL113_JP:', `LTE-FDD: B1/B3/B5/B8/B18/B19/B26/B28
LTE-TDD: B41`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', 'N/A'),
        spec('Input voltage', 'Input voltage', 'DC 9–90V'),
        spec('Power consumption', 'Power consumption', `Standby: < 5mA
Working: < 60mA`)
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green)'),
        spec('SIM', 'SIM', 'E-SIM'),
        spec('Digital I/Os', 'Digital I/Os', 'N/A'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', '0–90V'),
        spec('Memory capacity', 'Memory capacity', '3000 GPS data entries'),
        spec('USB', 'USB', 'N/A'),
        spec('No. of onboard relays', 'No. of onboard relays', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vibrating alert, Speed alert, Geo-fence entry/exit alert, Power disconnection alert, Low internal battery alert'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Configuration support', 'Configuration support', 'SMS, TrackSolid Pro'),
        spec('Certification', 'Certification', 'CE')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP44')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '49.0 x 20.0 x 9.2mm'),
        spec('Weight', 'Weight', '24g')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('Battery', 'Battery', '1000mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('SIM IC', 'SIM IC', '5 x 6mm onboard')
      ])
    ],
  },
  {
    id: 'vl863',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL863',
    thumbnail: getImg('vl863'),
    tagline: { tr: 'LTE Araç GNSS Terminali', en: 'LTE Vehicle GNSS Terminal' },
    description: { tr: 'Yolcu araçları ve kamyonlar için yönetilebilir konumlandırma.', en: 'Versatile GPS tracker designed to efficiently manage fleets of passenger vehicles and trucks.' },
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, GLONASS'),
        spec('Accuracy', 'Accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', 'Avg. hot start ≤ 1sec; Avg. cold start ≤ 38sec')
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1, 2G (GSM)'),
        spec('Frequency', 'Frequency', `VL863P_LA:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28
GSM: B2/B3/B5/B8`),
        spec('VL863P_EM:', 'VL863P_EM:', `LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '1000mAh'),
        spec('Input voltage', 'Input voltage', '9–36VDC'),
        spec('Power consumption', 'Power consumption', '< 16mA')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '4 (with 2 configurable): ACC detection, panic button, relay, and door detection'),
        spec('Analog I/Os', 'Analog I/Os', 'ADC_1: 0–5V; ADC_2: 0–36V'),
        spec('Memory capacity', 'Memory capacity', '3000 GPS data entries'),
        spec('USB', 'USB', 'Type-C (for configuration)'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', `3*TTL (TTL3 can be replaced by CAN);
1*RS485;
1*1-Wire
1*RS232 (which can multiplex with TTL2)`),
        spec('CAN', 'CAN', '1')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vibrating alert, Speed alert, SOS alert, Tamper alert, Geo-fence entry/exit alert, Remote immobilization, Power disconnection alert, Low internal battery alert, Door status detection, Audible alert (via onboard buzzer)'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Configuration support', 'Configuration support', 'PC Tools, SMS, Tracksolid Pro, Bluetooth'),
        spec('Certification (planning)', 'Certification (planning)', 'CE, FCC')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'N/A')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '115.0 x 69.0 x 28.0mm'),
        spec('Weight', 'Weight', '172g')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('2000mAh Battery', '2000mAh Battery', 'Instead of 1000mAh internal battery'),
        spec('External GNSS antenna', 'External GNSS antenna', 'Instead of internal antenna'),
        spec('External Bluetooth antenna', 'External Bluetooth antenna', 'Instead of internal antenna'),
        spec('Accessories', 'Accessories', 'K7800 environmental sensor, RFID reader, Temperature sensor, Fuel level sensor, MIC/SPK')
      ])
    ],
  },
  {
    id: 'vl505',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL505',
    thumbnail: getImg('vl505'),
    tagline: { tr: 'Daha Akıllı Takip Edin.', en: 'Track Smarter, Not Harder.' },
    description: { tr: 'Araç durumlarını tak ve çalıştır kolaylığıyla anında izleyin.', en: 'VL505 makes fleet monitoring effortless. Plug it in, relax, and get real-time insights.' },
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, AGPS, LBS'),
        spec('Accuracy', 'Accuracy', '<2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–163dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–158dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤28sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1'),
        spec('Frequency', 'Frequency', `VL505-NA
LTE-FDD: B2/B4/B5/B7/B12/B14/B17/B25/B26/B66
LTE-TDD: B41VL505-EU
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '50mAh/3.7V'),
        spec('Input voltage', 'Input voltage', '9–36VDC'),
        spec('Power consumption', 'Power consumption', `Standby: 2mA
Working: 35mA (one update per 10s)`)
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to 70°C'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'N/A')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '45.0 x 30.0 x 22.5mm'),
        spec('Weight', 'Weight', '26g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Power (Red), GNSS (Blue), Cellular (Green)'),
        spec('SIM', 'SIM', 'eSIM'),
        spec('Digital I/Os', 'Digital I/Os', 'N/A'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', 'N/A'),
        spec('Memory capacity', 'Memory capacity', '400 GPS data entries'),
        spec('USB', 'USB', 'N/A'),
        spec('Microphone', 'Microphone', 'Onboard'),
        spec('No. of relays', 'No. of relays', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤5 meters'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Configuration support', 'Configuration support', 'SMS, Tracksolid Pro'),
        spec('Certification', 'Certification', 'FCC, CE')
      ])
    ],
  },
  {
    id: 'gt06n-4g',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'GT06N 4G',
    thumbnail: getImg('gt06n-4g'),
    tagline: { tr: 'Klasik, 4G ile Yeniden.', en: 'Classic, Reimagined in 4G.' },
    description: { tr: 'Güvenilir tasarım, daha yüksek hız ve kontrol ile filolar için.', en: 'A trusted design, now with faster speed, sharper clarity, and greater control.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS, GLONASS'),
        spec('Accuracy', 'Accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤2s
Avg. cold start ≤38s`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1'),
        spec('Frequency', 'Frequency', `LTE-FDD: B1/B3/B5/B8
LTE-TDD: B34/B38/B39/B40/B41`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '450mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90VDC'),
        spec('Power consumption', 'Power consumption', 'Standby: < 5mA')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IPX4')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '105.8 × 54.5 × 16.4mm'),
        spec('Weight', 'Weight', '87.6g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '1*ACC, 1*SOS, 1*Relay'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', 'N/A'),
        spec('Data storage', 'Data storage', '3000+ data entries'),
        spec('USB', 'USB', 'N/A'),
        spec('Microphone', 'Microphone', 'Support'),
        spec('No. of relays', 'No. of relays', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A'),
        spec('Serial ports', 'Serial ports', '1*TTL')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Speeding alert, Geo-fence entry/exit, Vehicle battery detection, Vibrating alert'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Configuration support', 'Configuration support', 'SMS, PC Tools, TrackSolid Pro'),
        spec('Certification', 'Certification', 'CE')
      ])
    ],
  },
  {
    id: 'jm-vl02',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'JM-VL02',
    thumbnail: getImg('jm-vl02'),
    tagline: { tr: 'Kontrol İçin Tasarlandı.', en: 'Built to Connect. Designed to Control.' },
    description: { tr: 'Filonuzun güvendiği operasyonel asistan.', en: 'Your fleet\'s trusted partner on every trip, delivering safety and connection.' },
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS, GLONASS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1s
Avg. cold start ≤32s`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat M1 & NB2, GSM'),
        spec('Frequency', 'Frequency', `JM-VL02A:
LTE: B1/B2/B3/B4/B5/B12/B13/B28/B66
GSM: 850/900/1800/1900 MHz
JM-VL02E:
LTE: B1/B3/B5/B8/B18/B19/B20/B26
GSM: 850/900/1800/1900 MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '300mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-36VDC'),
        spec('Power consumption', 'Power consumption', `Standby: 5mA
Working: 58mA`)
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '105 x 57.0 x 22mm'),
        spec('Weight', 'Weight', '103g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Standard-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '1*ACC, 1*SOS, 1*Relay, 1*Reserved output, 1*Reserved input'),
        spec('Analog I/Os', 'Analog I/Os', '1: 0–30VDC (±0.3V)'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('USB', 'USB', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A'),
        spec('Serial ports', 'Serial ports', 'TTL')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Over-speed alert, Geo-fence, Vehicle battery detection, Power supply disconnection'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Configuration support', 'Configuration support', 'PC Tools, SMS, GPRS'),
        spec('Certification', 'Certification', 'CE, FCC, PTCRB, AT&T, T-Mobile, Verizon, TELEC')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('RS232 sensor', 'RS232 sensor', 'Capacitive fuel level sensor, Ultrasonic fuel level sensor, Temperature sensor')
      ])
    ]
  },
  {
    id: 'vl101g',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL101G',
    thumbnail: getImg('vl101g'),
    tagline: { tr: 'Bağlantılı. Kontrollü. Kendinden Emin.', en: 'Connected. Controlled. Confident.' },
    description: { tr: 'Çift frekans GNSS ile 4G araç takibi, zor koşullarda konum hassasiyeti.', en: 'A 4G vehicle tracker with GNSS positioning and dual-frequency GPS.' },
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS/BDS/GLONASS/Galileo + INS (inertial navigation system)'),
        spec('Frequency', 'Frequency', 'L1+L5'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜1m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤24sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE Cat 1/GSM'),
        spec('Frequency', 'Frequency', 'LTE-FDD: B1/B3/B7/B8/B20/B28')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '450mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-30VDC'),
        spec('Power consumption', 'Power consumption', 'Standby:5mAh/Working: 50mAh')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Digital l/Os', 'Digital l/Os', '1*ACC ,1*Relay'),
        spec('Analog l/Os', 'Analog l/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', '0-30V (+0.3V)'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('USB', 'USB', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', '1*TTL')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '70.0 x 80.0 x 25.0mm'),
        spec('Weight', 'Weight', '115.5g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP66')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer and gyroscope'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Speeding alert, Geo-fence entry/exit, Vehicle battery detection'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Sudden lane change'),
        spec('Configuration support', 'Configuration support', 'SMS, Tracksolld Pro, PC Tools'),
        spec('Cerlification', 'Cerlification', 'CE, FCC ,ROHS')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('2-Pin connector', '2-Pin connector', 'Buzzer')
      ])
    ],
  },
  {
    id: 'gt06n',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'GT06N',
    thumbnail: getImg('gt06n'),
    tagline: same('The Classic, Trusted by Fleets Worldwide.'),
    description: same('From every trip to every alert, GT06N keeps your fleet visible, safe, and in control.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '450mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-36VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Standard-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb'),
        spec('Digital inputs', 'Digital inputs', 'ACC, SOS, input'),
        spec('Digital outputs', 'Digital outputs', 'Relay, output')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '105.8 x 54.5 x 16.4mm'),
        spec('Weight', 'Weight', '96g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤5 meters'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Over-speed alert, Geo-fence, Voice monitoring, Power supply disconnection')
      ])
    ],
  },
  {
    id: 'gt06s',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'GT06S',
    thumbnail: getImg('gt06s'),
    tagline: same('Invisible. In Control.'),
    description: same('Your fleet moves fast. GT06S makes sure nothing slips through the cracks, delivering smooth, secure, and effortless management mile after mile.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS'),
        spec('Accuracy', 'Accuracy', '<2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-162 dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148 dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤2sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'GSM'),
        spec('Frequency', 'Frequency', `GT06S_GO01:
Quad-band: 850/900/1800/1900MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '60mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90V DC'),
        spec('Power consumption', 'Power consumption', 'Standby: <5mA')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20°C to 70° C'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IPX4')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '38.0 x 79.0 x 5.1mm'),
        spec('Weight', 'Weight', '29g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '1*ACC, 1*Relay'),
        spec('Analog I/Os', 'Analog I/Os', '2*IO for Microphone'),
        spec('Memory capacity', 'Memory capacity', '3000+ data entries'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Speeding, Geo-fence entry/exit, Vehicle battery protection'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Specialties', 'Specialties', 'Microphone'),
        spec('Configuration support', 'Configuration support', 'SMS, TrackSolid Pro'),
        spec('Certification', 'Certification', 'CE')
      ])
    ],
  },
  {
    id: 'kl100',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'KL100',
    thumbnail: getImg('kl100'),
    tagline: same('All-in-one tracking, from fuel to fleet.'),
    description: same('The KL100 is a GPS fuel sensor specifically designed for fleet management scenarios, featuring global 4G LTE connectivity, a built-in Bluetooth module for local configuration, and integrating real-time positioning, precise fuel level monitoring, and advanced anti-theft alarm functions.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS,BDS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', 'Avg. hot start ≤2s; Avg. cold start ≤38s')
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1/GSM'),
        spec('Frequency', 'Frequency', `KL100_S_LA01
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28;
GSM: B2/B3/B5/B8
KL100_S_EM01
LTE-FDD: B1/B3/B7/B8/B20/B28/
LTE-TDD:B34/B38/B39/B40/B41;
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh Li-Po with NTC'),
        spec('Input voltage', 'Input voltage', '9V to 30VDC'),
        spec('Power consumption', 'Power consumption', `Active < 40 mA
Standby < 4 mA`)
      ]),
      specGroup('Interface', 'Interface', [
        spec('SIM', 'SIM', 'Nano SIM'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', '1*TTL')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Flange size', 'Flange size', 'Outer diameter 82mm, Inner diameter 20mm'),
        spec('Weight', 'Weight', '749g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Discharge temperature range', 'Discharge temperature range', '–20℃ to +85℃'),
        spec('Charging temperature range', 'Charging temperature range', '0℃ to +45℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP67')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Light sensor,Accelerometer,Fuel level sensor'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'Bluetooth BLE 5.0'),
        spec('Configuration support', 'Configuration support', 'TrackSolid Pro & SMS'),
        spec('Certification', 'Certification', 'CE/FCC')
      ]),
      specGroup('Sensor', 'Sensor', [
        spec('Operating principle', 'Operating principle', 'Capacitive'),
        spec('Probe length', 'Probe length', '1000mm'),
        spec('Max probe cutting', 'Max probe cutting', '750mm'),
        spec('Measurement inaccuracy', 'Measurement inaccuracy', '<1% FS')
      ])
    ],
  },
  {
    id: 'vg03',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VG03',
    thumbnail: getImg('vg03'),
    tagline: same('Discreet Tracking. Solid Performance.'),
    description: same('Supporting a 9-90V voltage range, the JM-VG03 GPS tracker series work suitably with a wide range of vehicles. Thanks to its inbuilt large antenna and compact size, it delivers faster and more accurate positions and can be hidden-installed. In addition to its general features, alerts of power supply disconnection and tamper are pluses for anti-theft.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-162dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤35sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '60mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GPS (Blue), GSM (Green)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb'),
        spec('Interface', 'Interface', '4 pin (V+, V-, ACC, Relay)')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '79.0 x 38.0 x 14mm'),
        spec('Weight', 'Weight', '29g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20°C to 70°C'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Ignition detection', 'Ignition detection', 'ACC Detection'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Over-speed alert, Geo-fence, Vehicle battery detection, Power supply disconnection'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision')
      ])
    ],
  },
  {
    id: 'vl103d',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL103D',
    thumbnail: getImg('vl103d'),
    tagline: same('Tiny Device. Expanded Control.'),
    description: same('Compact size with great power, the VL103D is a discreetly-installed, fully-featured vehicle tracker with LTE, GNSS, RS485 interface and the IP66 waterproof rating. LTE communication with GSM (2G) fallback ensures a solid connection in almost all cases, and the wide 9-90V input voltage range is compatible with virtually any vehicle.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE Cat 1/GSM'),
        spec('Frequency', 'Frequency', `VL103D (L)
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Digital inputs', 'Digital inputs', 'ACC'),
        spec('Digital outputs', 'Digital outputs', 'Relay'),
        spec('Configurable I/O', 'Configurable I/O', 'SOS (configurable as an extra digital output)'),
        spec('ADC', 'ADC', '0-5V ADC detection')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '92.0 x 40.0 x 20.0mm'),
        spec('Weight', 'Weight', '55g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('IP rating', 'IP rating', 'IP66')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Speeding alert, Geo-fence entry/exit, Vehicle battery detection'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision')
      ])
    ],
  },
  {
    id: 'vl103m',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL103M',
    thumbnail: getImg('vl103m'),
    tagline: same('Minimal Form. Complete Control.'),
    description: same('Compact yet powerful, the VL103M is an IP66 rating anti-theft GPS tracker designed for demanding industrial and commercial use. Ideal for GPS fleet tracking and management, it supports diverse operations across rental fleets, urban transit, and logistics.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE Cat 1/GSM'),
        spec('Frequency', 'Frequency', `VL103M (L)
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28
GSM: B2/B3/B5/B8VL103M (E)
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Yellow), Power (Red)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Data storage', 'Data storage', '16+16Mb'),
        spec('Digital inputs', 'Digital inputs', 'ACC, SOS'),
        spec('Digital outputs', 'Digital outputs', 'Relay, IO for buzzer/horn output')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '92.0 x 40.0 x 20.0mm'),
        spec('Weight', 'Weight', '55g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('IP rating', 'IP rating', 'IP66')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vibrating alert, Speeding alert, SOS call, Tamper alert, Geo-fence entry/exit alert, Vehicle battery detection')
      ])
    ],
  },
  {
    id: 'vl106',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL106',
    thumbnail: getImg('vl106'),
    tagline: same('Safety That Doesn\'t Lose Its Track'),
    description: same('Built with an inertial navigation system, the VL106 is an advanced vehicle tracker capable of providing strong signal acquisition and accurate positioning even when the vehicle is in a tunnel, underground parking lot, or other locations without satellite signals.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS/BDS/GLONASS/Galileo + INS (inertial navigation system)'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.0m CEP'),
        spec('INS accuracy', 'INS accuracy', '＜2%'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤25sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE/GSM'),
        spec('Frequency', 'Frequency', `VL106-E:
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: 850/900/1800/1900 MHz
VL106-L:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28
GSM: 850/900/1800/1900 MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '100mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-36VDC'),
        spec('Power Consumption', 'Power Consumption', 'Standby: < 5mA')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '1*ACC, 1*Relay, 1*SOS'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', '9-36V (+0.1V)'),
        spec('Memory capacity', 'Memory capacity', '3000 GPS data entries'),
        spec('USB', 'USB', 'Onboard'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '94.3 x 50.4 x 15.0mm'),
        spec('Weight', 'Weight', '69.0g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer and gyroscope'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Speeding alert, Geo-fence entry/exit, SOS call, Power supply disconnection, Vehicle battery detection'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Sudden lane change, Collision, Skidding, Rollover, Roll & pitch'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0 (configuration only)'),
        spec('Configuration support', 'Configuration support', 'SMS, Bluetooth (app), TrackSolid Pro'),
        spec('Certification', 'Certification', 'CE')
      ])
    ],
  },
  {
    id: 'vl110c',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL110C',
    thumbnail: getImg('vl110c'),
    tagline: same('One tracker. Any Vehicle. Total safety.'),
    description: same('VL110C is a compact GPS tracker with 4G LTE and 2G fallback, built for managing motorcycles, cars, and light commercial vehicles. With support for a 9-90V wide voltage range, it works seamlessly across scooters, sedans, and trucks.'),
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, GLONASS, LBS'),
        spec('Accuracy', 'Accuracy', '<2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤ 2sec
Avg. cold start ≤ 38sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1 & GSM'),
        spec('Frequency', 'Frequency', `VL110C_EM:
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: B2/B3/B5/B8
VL110C_LA:
LTE-FDD:：B1/B2/B3/B4/B5/B7/B8/B28
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9–90VDC'),
        spec('Power consumption', 'Power consumption', 'Standby: <5mA')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to +70°C'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '94(L)*34(W)*15(H)mm'),
        spec('Weight', 'Weight', '44g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '1*ACC, 1*Relay'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', '0-90V (±0.3V)'),
        spec('Data storage', 'Data storage', '3000+ GNSS data entries'),
        spec('USB', 'USB', 'Type-C (for firmware upgrade)'),
        spec('Microphone', 'Microphone', 'N/A'),
        spec('No. of relays', 'No. of relays', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Speeding alert, Geo-fence entry/exit, Vehicle battery detection, LTE jamming detection, GPS jamming detection'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Configuration support', 'Configuration support', 'SMS, PC Tools, Tracksolid Pro, Type-C'),
        spec('Certification', 'Certification', 'CE/FCC/RoHS')
      ])
    ],
  },
  {
    id: 'vl111',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL111',
    thumbnail: getImg('vl111'),
    tagline: same('Built to Protect. Ready against Theft.'),
    description: same('Track every vehicle in real time, act instantly when needed, and keep your fleet safe. With a built-in relay, VL111 puts safety and control at your fingertips.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS/BDS/GLONASS/AGPS/LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤ 2sec
Avg. cold start ≤ 38sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat.1/2G GSM'),
        spec('Frequency', 'Frequency', `VL111P_LA:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28
GSM: B2/B3/B5/B8VL111P_EM:
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', 'DC 9-90V'),
        spec('Standby current', 'Standby current', `Standby: < 5mA
Working: < 50mA`)
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '92 x 28 x 14mm'),
        spec('Weight', 'Weight', '42.9g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP66')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', 'ACC; Buzzer (optional)'),
        spec('Analog l/Os', 'Analog l/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', '0-90V'),
        spec('Memory capacity', 'Memory capacity', '3000 GPS data entries'),
        spec('USB', 'USB', 'Type-C'),
        spec('No. of relays', 'No. of relays', '1'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Built-in relay current', 'Built-in relay current', 'Max2A'),
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vibrating alert, Speed alert, Tamper alert, Geo-fence entry/exit alert, Vehicle battery protection, Remote immobilization, Power disconnection alert, Low internal battery alert'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', '5.0 (configuration only)'),
        spec('Configuration support', 'Configuration support', 'PC Tools'),
        spec('Certification', 'Certification', 'CE, FCC')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('SM connector', 'SM connector', 'Buzzer'),
        spec('Onboard', 'Onboard', '5.0×6.0mm onboard')
      ])
    ],
  },
  {
    id: 'vl501',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL501',
    thumbnail: getImg('vl501'),
    tagline: same('Tracks Like a Pro. Charges Like a Charm.'),
    description: same('The VL501 is a plug-and-play tracker with GNSS, LTE, and Bluetooth connectivity. With a cigar lighter power connector, it is easy to install on virtually any vehicle.'),
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, GLONASS, BDS, AGPS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP (open sky)'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165 dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148 dBm (cold) / –157 dBm (hot)'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Power (Red); SOS (Blue)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', 'N/A'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('USB', 'USB', `1*USB-A (for quick charge)
1*Type-C (for quick charge, upgrade, and debugging)`),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G Cat 1, LTE M1 & NB2'),
        spec('Frequency', 'Frequency', `VL501-N:
LTE-FDD (Cat 1): B2/B4/B5/B12/B13
VL501-J:
LTE-FDD (Cat M1 & NB2): B1/B3/B8/B18/B19/B26`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '50 mAh/3.7V'),
        spec('Input voltage', 'Input voltage', '9-36VDC'),
        spec('Power consumption', 'Power consumption', `Sleep: typ. ≤12V/15mA
GPS and cell enabled: typ. ≤12V/120mA`)
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤5 meters'),
        spec('Sensors', 'Sensors', 'Accelerometer and gyroscope'),
        spec('Microphone', 'Microphone', 'Internal'),
        spec('Firmware update', 'Firmware update', 'OTA'),
        spec('Scenarios', 'Scenarios', 'Collision alert, Low external power alert, Vibrating alert, Unplug alert, Installation alert, Speeding alert, Fatigue driving alert, Geo-fence entry/exit alert'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec('Configuration support', 'Configuration support', 'SMS, Tracksolid Pro, PC Tools'),
        spec('Certification', 'Certification', 'CE, FCC, PTCRB, TELEC, JATE')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'N/A')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '70.0 x 52.0 x 82.5 mm'),
        spec('Weight', 'Weight', '60g')
      ])
    ],
  },
  {
    id: 'vl802',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL802',
    thumbnail: getImg('vl802'),
    tagline: same('More Visibility. More Control. All in One.'),
    description: same('Smarter fleets start here. VL802 is the quiet force behind every smooth delivery, safe return, and smart decision. Always connected. Always in control. Always one step ahead.'),
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS, GLONASS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤2s
Avg. cold start ≤38s`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1, 2G (GSM)'),
        spec('Frequency', 'Frequency', `VL802_S_EM:
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: 850/900/1800/1900MHzVL802-S-LA:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28
GSM: 850/900/1800/1900MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '1,000mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9–36VDC'),
        spec('Power consumption', 'Power consumption', `Standby: 5mA
Working: 33mA`)
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '5 (with 2 configurable): ACC, SOS, Relay'),
        spec('Analog I/Os', 'Analog I/Os', 'ADC_1: 0–30V (±0.1V)'),
        spec('Voltage detection', 'Voltage detection', '0–30V (±0.3V)'),
        spec('Memory capacity', 'Memory capacity', '3000 GPS data entries'),
        spec('USB', 'USB', 'Type-C (for firmware upgrade)'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', 'RS485')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '105.0 x 57.0 x 22.0mm'),
        spec('Weight', 'Weight', '117.6g')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'SOS alert, Speeding alert, Abnormal vibration alert, Fatigue driving alert'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('GPS Jammer detection', 'GPS Jammer detection', 'support'),
        spec('Cellular Jammer detection', 'Cellular Jammer detection', 'support'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Configuration support', 'Configuration support', 'PC Tools, SMS, TSP, JIMI IoT-Lab'),
        spec('Certification', 'Certification', 'CE, FCC')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('Bluetooth sensor', 'Bluetooth sensor', 'K7800P environmental sensor/ KC208 Remote Control / KF 2XX fuel level sensor series'),
        spec('DMS camera', 'DMS camera', 'JC170 DMS AI camera'),
        spec('RS485 sensor**', 'RS485 sensor**', 'Capacitive fuel level sensor, Ultrasonic fuel level sensor, Temperature sensor, Radio Frequency Identification(RFID)')
      ])
    ],
  },
  {
    id: 'vl808',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL808',
    thumbnail: getImg('vl808'),
    tagline: same('Intelligent Tracking Meets Expanded Fleet Control'),
    description: same('The VL808 is a versatile hardwired tracker with comprehensive tracking capabilities. It features 4G LTE connectivity for fast data transfer and multi-GNSS positioning for precise location tracking, along with multiple interfaces for broader feature expansion.'),
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, GLONASS'),
        spec('Accuracy', 'Accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤ 2sec
Avg. cold start ≤ 38sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1, 2G (GSM)'),
        spec('Frequency', 'Frequency', `VL808S_EM01
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh//3.7V industrial-grade LiPo battery'),
        spec('Input voltage', 'Input voltage', '9–90VDC'),
        spec('Power consumption', 'Power consumption', 'Standby: < 10mA')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +85℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP67')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '109.8 × 43.5 × 24.0mm'),
        spec('Weight', 'Weight', '76g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '3*Outputs, 4*Inputs (one multiplexes with TTL-RX)'),
        spec('Analog I/Os', 'Analog I/Os', `2 (AIN1/AIN2: 0-36V)
(0-5V: ±0.1V; 5-36V: ±0.2V)
(multiplex with digital I/Os)`),
        spec('Voltage detection', 'Voltage detection', '0-90V (±0.3V）'),
        spec('Memory capacity', 'Memory capacity', '3000+ data entries'),
        spec('USB', 'USB', 'Type-C'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', '1*TTL')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, SOS alert, Overspeed alert, Geofence entry/exit alerts, Vehicle battery detection, Door status detection'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Configuration support', 'Configuration support', 'PC Tools, SMS, Tracksolid Pro, Jimi IoT Lab'),
        spec('Certification', 'Certification', 'CE,E-mark')
      ])
    ],
  },
  {
    id: 'wetrack2',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'WeTrack 2',
    thumbnail: getImg('wetrack2'),
    tagline: same('Lightweight Security, Tailored for Two-Wheelers.'),
    description: same('The WeTrack2 is a vehicle tracker manufactured to meet the needs of e-scooter and motorcycle tracking. Providing functions such as remote fuel cut-off, geo-fence function, and over-speed warning, it gives crucial visibility into vehicle status and driver behavior.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤2sec
Avg. cold start ≤38sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Standard-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '78.0 x 41.0 x 13.0mm'),
        spec('Weight', 'Weight', '41g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20°C to 70°C'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Ignition detection', 'Ignition detection', 'ACC detection'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Over-speed alert, Geo-fence, Vehicle battery detection, Power supply disconnection')
      ])
    ],
  },
  {
    id: 'wetrack140',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'WeTrack 140',
    thumbnail: getImg('wetrack140'),
    tagline: same('Certified. Compliant. Ready for the Indian road.'),
    description: same('The AIS140-approved WeTrack140 GPS tracker, designed for the Indian market, allows you to stay in control and track your fleet in real time.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS + IRNSS + GLONASS'),
        spec('Frequency', 'Frequency', `L1,1575.42MHz C/A code
L5,1176.45MHz C/A code`),
        spec('Positioning accuracy', 'Positioning accuracy', '<2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-163dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-147dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤2sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', '850/900/1800/1900 MHz'),
        spec('GPRS', 'GPRS', 'Class 12, TCP/IP'),
        spec('Phase error', 'Phase error', 'RMSPE<5, PPE<20'),
        spec('Max output', 'Max output', `GSM850/GSM900: 33±3dBm
GSM1800/GSM1900: 30±3dBm`),
        spec('Max frequency error', 'Max frequency error', '±0.1ppm'),
        spec('Receiving sensitivity', 'Receiving sensitivity', 'Class IIRBER2% (-106dBm)')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '450mAh/3.7V Industrial lithium polymer battery'),
        spec('Input voltage', 'Input voltage', '9-36VDC'),
        spec('Standby current', 'Standby current', '≤5mA (by battery)'),
        spec('Standby time', 'Standby time', '60 hours'),
        spec('Working time', 'Working time', '4 hours')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('Data storage', 'Data storage', '32+64MB'),
        spec('Antenna', 'Antenna', 'Built-in GPS ceramic antenna, GSM quad-band antenna')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '98.5 x 52.0 x 15.0mm'),
        spec('Weight', 'Weight', '80g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('IP rating', 'IP rating', 'IP66')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤5 meters'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision')
      ])
    ],
  },
  {
    id: 'x3',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'X3',
    thumbnail: getImg('x3'),
    tagline: same('Talks and Connects. Guards What Matters.'),
    description: same('X3 doesn\'t just track your vehicles, it transforms every journey into insight that drives smarter fleet management.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤35sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '450mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-36VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Standard-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb'),
        spec('Digital inputs', 'Digital inputs', 'ACC, input, SOS'),
        spec('Digital outputs', 'Digital outputs', 'Relay, output1, output2')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '80.9 x 55.8 x 23.4mm'),
        spec('Weight', 'Weight', '95g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤5 meters'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Over-speed alert, Geo-fence, Voice Monitoring, Vehicle battery detection, Power supply disconnection'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision')
      ])
    ],
  },
  {
    id: 'bl10',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'BL10',
    thumbnail: getImg('bl10'),
    tagline: same('Engineered for Reliable Shared Mobility'),
    description: same('The BL10 shared bike lock focuses on solving core challenges in shared mobility. From anti-drift positioning to solar-powered endurance, every design is tailored to fix high-frequency issues like signal loss, frequent recharging, and difficult unlocking.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '10,000mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Solar power', 'Solar power', '6V/5W (Under solar illumination)'),
        spec('Working modes', 'Working modes', 'Regular-upload mode'),
        spec('Standby time', 'Standby time', 'Up to 40 days in locked state (without solar energy)')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', '1 status indicator (Blue)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Data storage', 'Data storage', '64Mb')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '148.0 x 211.0 x 51.0 mm'),
        spec('Weight', 'Weight', '1117g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +60℃'),
        spec('Operating humidity', 'Operating humidity', '5%-95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IPX5')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Bluetooth', 'Bluetooth', 'Bluetooth 4.0'),
        spec('iBeacon positioning accuracy', 'iBeacon positioning accuracy', '1-10meters'),
        spec('Sensors', 'Sensors', '3-axis Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Audible recovery, Vibrating Alert, Low battery alert')
      ])
    ],
  },
  {
    id: 'eg02',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'EG02',
    thumbnail: getImg('eg02'),
    tagline: same('Tiny. Smart. Locks and Tracks Your E-scooter.'),
    description: same('Say goodbye to traditional electric scooter keys and meet the effective anti-theft EG02. As small as a cigarette lighter, the EG02 GPS tracker comes with a plug and play design and supports GPS and LBS real-time tracking.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS + LBS'),
        spec('No. of GPS channels', 'No. of GPS channels', '66'),
        spec('Positioning accuracy', 'Positioning accuracy', '<2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤2sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', '850/900/1800/1900 MHz'),
        spec('GPRS', 'GPRS', 'Class 12, TCP/IP'),
        spec('Phase error', 'Phase error', 'RMSPE<5, PPE<20'),
        spec('Max output', 'Max output', `GSM850/GSM900: 33±2dBm
GSM1800/GSM1900: 30±3dBm`),
        spec('Max frequency error', 'Max frequency error', '±0.1ppm'),
        spec('Receive sensitivity', 'Receive sensitivity', '±Class II RBER2% (-102dBm)')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '270mAh/3.7V Lithium-polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90VDC/8mA (36VDC)'),
        spec('Standby current', 'Standby current', '≤5mA (by battery)')
      ]),
      specGroup('Interface', 'Interface', [
        spec('Data storage', 'Data storage', '64Mb'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Antenna', 'Antenna', 'Bullit-in GPS antenna, GSM quad-band antenna')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '77.0 x 29.0 x 13.0mm'),
        spec('Weight', 'Weight', '43g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('IP rating', 'IP rating', 'IPX5')
      ])
    ],
  },
  {
    id: 'bl11',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'BL11',
    thumbnail: getImg('bl11'),
    tagline: same('Engineered for the Demands of Shared Freedom'),
    description: same('The JM-BL11 GPS bike sharing lock is optimized for bike sharing solutions with Cat M1/NB2 low power consumption technology, reinforced structure, and enhanced data security protection.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+AGPS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤40sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE Cat M1 & NB2'),
        spec('Frequency', 'Frequency', 'Cat M1:B1/B2/B3/B4/B5/B8/B12/B13/B18/B19/B20/B25/B26/B27/B28/B66/B85')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '12,000mAh/3.6V'),
        spec('Solar power', 'Solar power', '6V/5W (Under solar illumination)'),
        spec('Working modes', 'Working modes', 'Tracking mode; Transport mode'),
        spec('Standby time', 'Standby time', 'Up to 40 days in locked state (without solar energy)')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', '2 x Status indicators (Green/Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '142.5 x 223.7 x 38.0 mm'),
        spec('Weight', 'Weight', '1180g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +60℃'),
        spec('Operating humidity', 'Operating humidity', '5%-95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP66')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Bluetooth', 'Bluetooth', 'Bluetooth 4.2'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Audible recovery, Low battery alert, Vibrating Alert, Geo-fence'),
        spec('NFC', 'NFC', 'RFID 13.56Mhz')
      ])
    ],
  },
  {
    id: 'wetrack-lite',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'Wetrack Lite',
    thumbnail: getImg('wetrack-lite'),
    tagline: same('So Light, It Vanishes. So Smart, It Protects.'),
    description: same('Wetrack Lite is a feather-light, multi-function tracker. Featuring improved accuracy, it is designed specifically to make locating and routing vehicles as simple as possible.'),
    specs: [],
    specGroups: [
      specGroup('GNSS', 'GNSS', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '100mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-90VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GPS (Blue), GSM (Green)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '73.8 × 25.9 × 12.2mm'),
        spec('Weight', 'Weight', '26.6g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20°C to 70°C'),
        spec('IP rating', 'IP rating', 'IPX5')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Ignition detection', 'Ignition detection', 'ACC Detection'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Over-speed alert, Geo-fence, Vehicle battery detection, Power supply disconnection')
      ])
    ],
  },
  // GPS Trackers -> Personal Tracker
  {
    id: 'pl601',
    categoryId: 'gps-trackers',
    subcategoryId: 'personal-tracker',
    name: 'PL601',
    thumbnail: getImg('pl601'),
    tagline: { tr: 'LTE Taşınabilir GNSS Takip Cihazı', en: 'LTE Portable GNSS Tracker' },
    description: { tr: 'Çocuklar ve yaşlılar için üretilmiş, mobil konumlandırma.', en: 'Compact, portable personal tracker designed to safeguard children and the elderly.' },
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS'),
        spec('Accuracy', 'Accuracy', '< 2m CEP50'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-159dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', 'Avg. hot start ≤ 1sec; Avg. cold start ≤ 26sec')
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1'),
        spec('Frequency', 'Frequency', `PL601_LA:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28/B66
GSM: 850/900/1800/1900`),
        spec('PL601_NA:', 'PL601_NA:', `LTE-FDD: B2/B4/B5/B7/B12/B14/B17/B25/B26/B66
LTE-TDD: B41`),
        spec('PL601_EA:', 'PL601_EA:', `LTE-FDD: B1/B3/B5/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
GSM: 900/1800`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '650mAh/3.8V industrial-grade Li-Polymer battery ( Rechargeable)'),
        spec('Working modes', 'Working modes', 'Intelligent mode, Timing mode'),
        spec('Battery life', 'Battery life', 'Up to 4 days in intelligent mode, 2 hours moving per day (update every 60s)')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Tri-color LED for power, cellular, and GNSS'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Button', 'Button', '1 button for SOS, power on/off, and more'),
        spec('USB', 'USB', 'Type-C (for charging)'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '3m'),
        spec('Sensors', 'Sensors', 'Accelerometer, Barometer (optional)'),
        spec('Scenarios', 'Scenarios', 'SOS alert, Geo-fence entry/exit alert, Abnormal noise alert, Low battery alert, Power on/off alert'),
        spec('Mount method', 'Mount method', 'Lanyard, back clip'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('RFID', 'RFID', 'N/A'),
        spec('Configuration support', 'Configuration support', 'Bluetooth'),
        spec('Certification', 'Certification', 'CE, FCC')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '45.0 x 45.0 x 17.0mm'),
        spec('Weight', 'Weight', '33g')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('USB cable', 'USB cable', '1'),
        spec('Lanyard', 'Lanyard', '1')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('Charger', 'Charger', '5V/1A')
      ]),
      specGroup('Back clip', 'Back clip', [
        spec('Barometer', 'Barometer', 'To measure altitude'),
        spec('SIM', 'SIM', 'eSIM')
      ])
    ],
  },
  {
    id: 'qbit-m',
    categoryId: 'gps-trackers',
    subcategoryId: 'personal-tracker',
    name: 'Qbit M',
    thumbnail: getImg('qbit-m'),
    tagline: { tr: 'Küçük Boyut, Büyük Performans.', en: 'Byte-sized, big on performance.' },
    description: { tr: 'Yaşlılar ve çocuklar için gelişmiş taşınabilir takip cihazı.', en: 'Advanced portable tracker designed to handle the personal security of the elderly and children.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS+QZSS (nRF*)'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-155dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-147dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤36sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE-M Cat M1 & Cat NB'),
        spec('Frequency', 'Frequency', `Cat-M1: B1, B2, B3, B4, B5, B8, B12, B13, B14, B18, B19, B20, B25, B26, B28, B66
Cat-NB1/NB2: B1, B2, B3, B4, B5, B8, B12, B13, B17, B19, B20, B25, B26, B28, B66`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '650mAh/3.8V industrial-grade Li-Polymer battery'),
        spec('Working modes', 'Working modes', 'Intelligent mode; Regular GPS mode'),
        spec('Standby time', 'Standby time', 'Up to 7 days in Intelligent mode, 2 hours moving per day (180s locate interval in movement)')
      ]),
      specGroup('Interface', 'Interface', [
        spec('SIM', 'SIM', 'Nano-SIM (or soft SIM)'),
        spec('Button', 'Button', '1 functional button, 1 panic button')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '40.0 x 45.0 x 15.0mm'),
        spec('Weight', 'Weight', '30.5g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +75℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Safety fence exit alert, Buzzer alert, Low battery alert')
      ])
    ],
  },
  {
    id: 'pl200',
    categoryId: 'gps-trackers',
    subcategoryId: 'personal-tracker',
    name: 'PL200',
    thumbnail: getImg('pl200'),
    tagline: { tr: 'Artık Sessiz Değil, Her Zaman Odakta', en: 'Silent no more, always in focus' },
    description: { tr: 'Mobil saha iş gücünün güvenliği için IP65 dereceli ve sesli takip çözümü.', en: 'Small and light 4G tracker with IP65 enclosure and two-way voice for lone workers.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS, BLE, WiFi'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G Cat 1, GSM'),
        spec('Frequency', 'Frequency', `PL200(L):
FDD: B1/B2/B3/B4/B5/B7/B28`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '2,000mAh/3.7V industrial-grade Li-Polymer battery (rechargeable)'),
        spec('Working modes', 'Working modes', `Mode 0: Step-count-based mode
Mode 1: Timing mode`),
        spec('Battery life', 'Battery life', 'Up to 5 days')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Power (Red), Notice (Green)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Button', 'Button', '2*functional buttons; 1*panic button'),
        spec('USB', 'USB', 'Magnetic'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Power-on alert, Shutdown alert, Low battery alert, SOS alert, SIM card change alert, Geo-fence entry & exit alert'),
        spec('Specialties', 'Specialties', 'Speaker, Microphone'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('RFID', 'RFID', 'N/A'),
        spec('Mount method', 'Mount method', 'Lanyard'),
        spec('Configuration support', 'Configuration support', 'SMS, Online command'),
        spec('Certification', 'Certification', 'FCC、CE')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +60℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '105.0 x 62.0 x 13.0mm'),
        spec('Weight', 'Weight', '81g')
      ])
    ],
  },
  // GPS Trackers -> Asset Tracker
  {
    id: 'll303pro',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL303PRO',
    thumbnail: getImg('ll303pro'),
    tagline: { tr: 'Akıllı Varlık Koruyucusu.', en: 'Smart Asset Guardian: Relax. It\'s Tracking Itself.' },
    description: { tr: 'Kendi kendine yeten, uzun ömürlü akıllı varlık takibi.', en: 'Designed for smart, self-sustaining asset tracking that keeps your operations running smoothly.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1s
Avg. cold start ≤32s`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1, GSM'),
        spec('Frequency', 'Frequency', `LTE-FDD: B1/B3//B7/B8/B20/B28LTE-TDD: B38/B40
GSM:`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '10,000mAh/3.7V industrial-grade Li-Polymer battery (rechargeable)'),
        spec('Solar power', 'Solar power', `5V/400mA (Standard Operating Voltage/Current @STC)
STC: Direct illumination with 38,000lux halogen lamp`),
        spec('Magnetic charger', 'Magnetic charger', '5V/2A'),
        spec('Working modes', 'Working modes', `Mode 1: Timing mode
Mode 2: Intelligent mode
Mode 3: Power-saving mode`),
        spec('Battery life', 'Battery life', '10 days to 1 year')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Tamper proof', 'Tamper proof', 'Hall effect sensor'),
        spec('USB', 'USB', '4-Pin magnetic wire'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP67')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '200.0 x 115.0 x 25.0mm (mount base excluded)'),
        spec('Weight', 'Weight', '423g')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer, Buzzer, Hall effect sensor, NTC'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Vibrating alert, SIM card change alert, Temperature & humidity exception alerts (optional)'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('RFID', 'RFID', '2.4GHz'),
        spec('Configuration support', 'Configuration support', 'APP, TrackSolid Pro, PC Tools, SMS'),
        spec('Certification', 'Certification', 'CE, FCC, PTCRB')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('LL303PRO unit', 'LL303PRO unit', '1'),
        spec('Charging cable', 'Charging cable', '1'),
        spec('Mount base', 'Mount base', '1'),
        spec('Screwdriver', 'Screwdriver', '1'),
        spec('Ejector pin', 'Ejector pin', '1'),
        spec('Self-tapping screw', 'Self-tapping screw', '4'),
        spec('Flat head screw', 'Flat head screw', '4'),
        spec('Anti-theft screw', 'Anti-theft screw', '4')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('Bluetooth sensor', 'Bluetooth sensor', 'K7800 environmental sensor')
      ])
    ],
  },
  {
    id: 'll704',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL704',
    thumbnail: getImg('ll704'),
    tagline: { tr: 'Sonsuz Güç ile Geleceği Kucakla', en: 'Embrace the future with endless power' },
    description: { tr: '3 yılı aşkın bekleme süresine sahip 4G varlık takip cihazı.', en: '4G asset tracking terminal designed for extended use, boasting over 3 years operational lifespan.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BeiDou, WiFi, LBS'),
        spec('Accuracy', 'Accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start < 1sec;
Avg. cold start < 32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G Cat 1'),
        spec('Frequency', 'Frequency', `FDD-LTE: B1/B3/B7/B8/B20
TDD-LTE:B34/B38/B39/B40/B41`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '3200mAh/3.0V Li-Po battery (disposable)'),
        spec('Working modes', 'Working modes', `Mode 1: Tracking mode
Mode 2: Timing mode
Mode 3: Week-based mode
Mode 4: Alarm-based mode
Mode 5: Phase-based mode`),
        spec('Battery life', 'Battery life', '30 days to 3 years')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', 'N/A'),
        spec('Tamper proof', 'Tamper proof', 'N/A'),
        spec('USB', 'USB', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Light sensor'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Geo-fence entry & exit alert'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('RFID', 'RFID', 'N/A')
      ])
    ],
  },
  {
    id: 'll702',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL702',
    thumbnail: getImg('ll702'),
    tagline: { tr: 'Varlıklarınızı Kusursuzca Korur.', en: 'Guarding your assets with unparalleled grace.' },
    description: { tr: 'Kolay montaj, 4200mAh batarya ve gizlenebilir boyut ile güçlü izleme.', en: 'Wireless GPS tracker with 4,200mAh battery for over 3 years of operation in default mode.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS'),
        spec('Accuracy', 'Accuracy', '<2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat 1, GSM'),
        spec('Frequency', 'Frequency', `LL702-E:
LTE-FDD: B1/B3/B5/B7/B8/B20/B28
LTE-TDD: B38/B40/B41
GSM: B2/B3/B5/B8
LL702-L:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B20/B28
LTE-TDD: B40
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '4,200mAh/3.0V industrial-grade Li-MnO2 battery (disposable)'),
        spec('Working modes', 'Working modes', `Mode 1: Tracking mode
Mode 2: Timing mode
Mode 3: Week-based mode
Mode 4: Alarm-based mode`),
        spec('Battery life', 'Battery life', '2 days to 3 years')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Power (Green)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', '400 GPS data entries'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor'),
        spec('USB', 'USB', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Light sensor'),
        spec('Scenarios', 'Scenarios', 'Tamper alert, Geo-fence entry & exit alert'),
        spec('Specialties', 'Specialties', 'Additional fixes (generated in cellular blind spots) upload upon cellular reconnection'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('RFID', 'RFID', 'N/A'),
        spec('Mount method', 'Mount method', 'Magnet'),
        spec('Configuration support', 'Configuration support', 'Online command, SMS'),
        spec('Certification', 'Certification', 'CE, FCC')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +60℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP54')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '80.0 x 45.0 x 31.4mm'),
        spec('Weight', 'Weight', '145g')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('LL702 unit', 'LL702 unit', '1')
      ])
    ],
  },
  {
    id: 'll309',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL309',
    thumbnail: getImg('ll309'),
    tagline: { tr: 'Varlık Korumasında Yeni Bir Çağa Hoş Geldiniz', en: 'Welcome to a New Era of Asset Protection' },
    description: { tr: 'Bozulabilir ürünler için sıcaklık ve nem sensörlü 4G varlık takip cihazı.', en: '4G asset tracker with precise location and built-in temperature/humidity sensors.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS'),
        spec('Accuracy', 'Accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–148 dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–168 dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', 'Avg. hot start ≤1s; Avg. cold start ≤32s')
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat. 1'),
        spec('Frequency', 'Frequency', `LL309
LTE-FDD: B2/B4/B5/B7/B12/B14/B17/B25/B26/B66
LTE-TDD: B41`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '2500mAh Li-Po battery (rechargeable)'),
        spec('Working modes', 'Working modes', `Mode 1: Timing Mode
Mode 2: Intelligent Mode
Mode 3: Power-saving Mode`),
        spec('Battery life', 'Battery life', '30 days (one update per hour)')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Battery (White), Cellular (Green)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', '20,000 data entries (for export); 5000 GPS data entries (buffer)'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor'),
        spec('USB', 'USB', 'Type-C'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Light sensor, Temperature and humidity sensor'),
        spec('Scenarios', 'Scenarios', 'Tamper alert, Temperature & humidity exception alerts, Vibrating alert, Low battery alert'),
        spec('Mount method', 'Mount method', 'Wall hooks'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.1'),
        spec('RFID', 'RFID', 'N/A'),
        spec('Configuration support', 'Configuration support', 'SMS, Tracksolid Pro, PC Tools, Jimi IoT Lab'),
        spec('Certification', 'Certification', 'FCC')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '0% to 100%'),
        spec('IP rating', 'IP rating', 'IP67')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '100 × 60 × 15mm'),
        spec('Weight', 'Weight', '108g')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('LL309 unit', 'LL309 unit', '1'),
        spec('Type-C cable', 'Type-C cable', '1'),
        spec('Adhesive wall hooks', 'Adhesive wall hooks', `2
-`)
      ])
    ],
  },
  {
    id: 'll01',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL01',
    thumbnail: getImg('ll01'),
    tagline: { tr: 'Sınırların Ötesinde Sessiz Koruma.', en: 'Guarding Beyond Boundaries, Quietly and Endlessly.' },
    description: { tr: 'Güçlü manyetik montajlı, ultra uzun batarya süresine sahip Cat M1/NB-IoT cihaz.', en: 'Cat M1/NB-IoT asset tracker with ultra-long standby time and strong magnetic mount.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤40sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat M1 & NB2, GSM'),
        spec('Frequency', 'Frequency', `LTE Cat M1 & NB2: B1/B2/B3/B4/B5/B8/B12/B13/B18/B19/B20/B26/B28/B66
GSM: 850/900/1800/1900 MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '10,000mAh/3.7V industrial-grade Li-Polymer battery (rechargeable)'),
        spec('Working modes', 'Working modes', `Mode 0: Standby mode
Mode 1: Intelligent mode
Mode 2: Power-saving mode`),
        spec('Battery life', 'Battery life', '6 days to 3 years')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Cellular (Red), Battery (Blue)'),
        spec('SIM', 'SIM', 'Standard-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor'),
        spec('USB', 'USB', 'USB：Micro USB/USB Type-C'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', '3-Axis accelerometer, Light sensor'),
        spec('Scenarios', 'Scenarios', `Low battery alert, Tamper alert, Vibrating alert,
Over-speed alert, Cover removal alert,
Installation alert, Geo-fence entry & exit alert`),
        spec('Mount method', 'Mount method', 'Magnet or straps'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.2'),
        spec('RFID', 'RFID', 'N/A'),
        spec('Configuration support', 'Configuration support', 'APP, Tracksolid Pro, PC Tools, SMS'),
        spec('Certification', 'Certification', 'CE, FCC, PTCRB, RoHS, AT&T, TELEC, Orange, WEEE')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '109.0 x 61.0 x 30.5mm'),
        spec('Weight', 'Weight', '297g')
      ])
    ],
  },
  {
    id: 'll708',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL708',
    thumbnail: getImg('ll708'),
    tagline: same('Mini in Size, Huge in Impact'),
    description: same('LL708 is a 4G CAT.1 wireless ultra-long-standby positioning terminal that supports GPS, LBS, and BDS multiple positioning. The product is compact in size and widely used in business scenarios such as car rental, financial credit, mortgage loans, and used cars.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS/BDS/LBS'),
        spec('Accuracy', 'Accuracy', '< 2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤ 1sec;
Avg. cold start ≤ 32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G Cat.1'),
        spec('Frequency', 'Frequency', `LL708_EU
LTE-FDD: B1/B3/B7/B8/B20/B28
LTE-TDD: B34/B38/B39/B40/B41
LL708_LA
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28/B66`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '550 mah'),
        spec('Input voltage', 'Input voltage', 'N/A'),
        spec('Power consumption', 'Power consumption', '6 months (Positioning once a day)')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Power (Red)'),
        spec('SIM', 'SIM', 'nano'),
        spec('Digital I/Os', 'Digital I/Os', 'N/A'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', 'N/A'),
        spec('USB', 'USB', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Ceramic antenna'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20℃-60℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'N/A')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '48*38*14mm')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('*Optional Configuration required to be customized or purchased separately.', '*Optional Configuration required to be customized or purchased separately.', '-')
      ])
    ],
  },
  {
    id: 'll705',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL705',
    thumbnail: getImg('ll705'),
    tagline: same('4G Wireless Asset Tracker'),
    description: same('The LL705 is a 4G wireless GPS tracker, engineered specifically for monitoring high-value assets such as construction and mining equipment.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat.1, GSM'),
        spec('Frequency', 'Frequency', `LL705(E):
LTE-FDD: B1/B3/B5/B7/B8/B20/B28
LTE-TDD: B38/B40/B41
GSM: B2/B3/B5/B8`),
        spec('LL705(GL):', 'LL705(GL):', `LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B12/B17/B18/B19/B20/B25/B26/B28/B66
LTE-TDD: B38/B40/B41
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '18,000mAh Li-soCl2 battery string (disposable)'),
        spec('Working modes', 'Working modes', `Mode 1: Tiracking mode
Mode 2: Timing mode
Mode 3: Alarm-based mode
Mode 4: Time period mode`),
        spec('Standby time', 'Standby time', '8 days to 10 years')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Power (GREEN)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor'),
        spec('USB', 'USB', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP67')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '120.0 x 68.0 x 43.5mm'),
        spec('Weight', 'Weight', '289.0g')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Light sensor, Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Vibrating alert, Geo-fence entry & exit alert'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'N/A'),
        spec('GPS Jammer detection', 'GPS Jammer detection', 'N/A'),
        spec('Cellular Jammer detection', 'Cellular Jammer detection', 'N/A'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.2'),
        spec('Configuration support', 'Configuration support', 'SMS, Online command, App'),
        spec('Certification', 'Certification', 'CE')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('LL705 unit', 'LL705 unit', '1'),
        spec('Screwdriver', 'Screwdriver', '1')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('Bluetooth sensor', 'Bluetooth sensor', 'K7800 environmental sensor')
      ])
    ],
  },
  {
    id: 'll302',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL302',
    thumbnail: getImg('ll302'),
    tagline: same('Simple in Look, Mighty in Protection'),
    description: same('Designed for vehicle and asset tracking, LL302 is a 4G wireless asset GNSS tracker that supports GPS, BDS, LBS positioning, a light sensor, and multiple alerts for abnormal vibration, low battery, and more.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE Cat 1/GSM'),
        spec('Frequency', 'Frequency', `LL302-EU:
LTE-FDD: B1/B3/B5/B7/B8/B20/B28
LTE-TDD: B38/B40/B41
GSM: B2/B3/B5/B8
LL302-LA:
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B20/B28
LTE-TDD: B40
GSM: B2/B3/B5/B8`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '6,000mAh/3.7V industrial-grade Li-Polymer battery (rechargeable)'),
        spec('Working modes', 'Working modes', `Mode 1: Timing mode
Mode 2: Intelligent mode
Mode 3: Power-saving mode`),
        spec('Battery life', 'Battery life', '10 days to 300 days')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (White)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor'),
        spec('USB', 'USB', 'Micro USB'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '95.0 x 59.0 x 29.2mm (with magnet)'),
        spec('Weight', 'Weight', '233g (with magnet)')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IPX5')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Temperature detection', 'Temperature detection', '–20℃ to +70℃ (±0.2℃)'),
        spec('Humidity detection', 'Humidity detection', '5%～95% (±1％RH)'),
        spec('Voice monitoring range', 'Voice monitoring range', '≤ 5m'),
        spec('Sensors', 'Sensors', 'Accelerometer, Light sensor'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Vibrating alert, Voice-triggered alert, Temperature & humidity exception alert (optional), Door open & close alert (optional)'),
        spec('Mount method', 'Mount method', 'Magnet'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Configuration support', 'Configuration support', 'APP, Tracksolid Pro, PC tools, SMS'),
        spec('Certification', 'Certification', 'CE, FCC')
      ])
    ],
  },
  {
    id: 'll301',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL301',
    thumbnail: getImg('ll301'),
    tagline: same('Stilled Watcher, Silent Protector'),
    description: same('The LL301 is a 4G Cat 1 asset GPS tracker that allows for ultra-long standby time via a 10,000mAh large-capacity battery and durable housing. It supports instant alerts of atypical events like device removal and vibration.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE/GSM'),
        spec('Frequency', 'Frequency', `LL301-E
LTE-FDD: B1/B3/B7/B8/B20/B28
GSM: 900/1800MHz
LL301-L
LTE-FDD: B1/B2/B3/B4/B5/B7/B8/B28/B66
GSM: 850/900/1800/1900MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '10,000mAh/3.7V industrial-grade Li-Polymer battery (rechargeable)'),
        spec('Working modes', 'Working modes', `Mode 1: Timing positioning mode
Mode 2: Intelligent positioning mode
Mode 3: Battery saving mode`),
        spec('Battery life', 'Battery life', '7 days to 2 years')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Status (Red), Battery (Blue)'),
        spec('SIM', 'SIM', 'Micro-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Tamper proof', 'Tamper proof', 'Pressure-sensitive button'),
        spec('USB', 'USB', 'Micro USB'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '108.5 x 61.1 x 30.0mm'),
        spec('Weight', 'Weight', '260g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IPX5')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤ 5m'),
        spec('Sensors', 'Sensors', '3-Axis accelerometer'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Vibrating Alert, Cover removal alert, Power off alert, Geo-fence entry & exit alert, temperature & humidity exception alert (optional)'),
        spec('Mount method', 'Mount method', 'Magnet or straps'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Configuration support', 'Configuration support', 'Bluetooth, Tracksolid Pro, PC tools, SMS'),
        spec('Certification', 'Certification', 'CE, FCC')
      ])
    ],
  },
  {
    id: 'lg300',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LG300',
    thumbnail: getImg('lg300'),
    tagline: same('Sometimes, 2G says more than 4G'),
    description: same('The LG300 is a 2G wireless tracker designed to handle industrial and commercial applications ranging from rental agencies and fleet management to freight transportation and more.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS+BDS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'B2/B3/B5/B8')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '10,000mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Working modes', 'Working modes', `Mode 1: Timing mode
Mode 2: Intelligent mode`)
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (White)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '86.0 x 63.0 x 31.5mm'),
        spec('Weight', 'Weight', '245g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', '3-axis Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Sound-triggered alert')
      ])
    ],
  },
  {
    id: 'll02',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL02',
    thumbnail: getImg('ll02'),
    tagline: same('Keep assets visible. For ages.'),
    description: same('The JM-LL02 is a 4G asset GPS tracker device designed for rugged applications. Featuring a large 6,000 mAh battery and a strong magnetic mount, this device is perfect for deployments where long standby time and simple installation are key.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤40sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat M1 & NB2, GSM'),
        spec('Frequency', 'Frequency', `LTE Cat M1 & NB2: B2/B4/B5/B12/B13/B66
GSM: 850/900/1800/1900 MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '6,000mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Working modes', 'Working modes', `Mode 0: Standby mode
Mode 1: Tracking mode
Mode 2: Power-saving mode`),
        spec('Battery life', 'Battery life', '4.5 days to 1.5 years')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor'),
        spec('USB', 'USB', '4-Pin magnetic wire (for charging and debugging)'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '85.0 x 58.0 x 29.0mm'),
        spec('Weight', 'Weight', '158g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP67')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer, Light sensor'),
        spec('Bluetooth', 'Bluetooth', 'Support Bluetooth 5.0'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Vibrating alert, Over-speed alert, Geo-fence entry/exit'),
        spec('Mount method', 'Mount method', 'Magnet or straps'),
        spec('Configuration support', 'Configuration support', 'APP Tracksolid Pro, PC tools, SMS'),
        spec('Certification', 'Certification', 'FCC')
      ])
    ],
  },
  {
    id: 'at4',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'AT4',
    thumbnail: getImg('at4'),
    tagline: same('Unyielding Tracking, Unmatched Security'),
    description: same('The advanced features, rugged construction, and industry-leading battery life make the AT4 the new state of the art in asset GPS tracking. Using GPS and LBS positioning, the magnet-mounted AT4 gives detailed reports telling you exactly where a vehicle has been, where it\'s headed, and how fast it\'s traveling.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '10,000mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Working modes', 'Working modes', `Mode 1: Tracking mode
Mode 2: Power-saving mode`),
        spec('Standby time', 'Standby time', 'Up to 2.5 years in power-saving mode')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', '1 status indicator (Red), 4 battery indicator (Blue)'),
        spec('SIM', 'SIM', 'Standard-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb'),
        spec('Tamper proof', 'Tamper proof', 'Pressure-sensitive button')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '108.0 x 61.0 x 30.0mm'),
        spec('Weight', 'Weight', '285g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IPX5')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤3 meters'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', `Low battery alert, Tamper alert, Vibrating Alert, Over-speed alert, Cover removal alert, Power off alert, Geo-fence
-`)
      ])
    ],
  },
  {
    id: 'at1',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'AT1',
    thumbnail: getImg('at1'),
    tagline: same('Strength in Tracking, Security in Every Moment'),
    description: same('The AT1 is a simple but functional GPS tracker designed for a variety of uses including fleet services, freight operations, high-value asset tracking, and special-needs individuals. A rechargeable 6000mAh internal battery allows for around 25 days of operation.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS+LBS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'GSM'),
        spec('Frequency', 'Frequency', 'Quad-band 850/900/1800/1900 MHz')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '6,000mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Working modes', 'Working modes', `Mode 1: Regular GPS mode
Mode 2: Tracking mode
Mode 3: Power-saving mode`),
        spec('Standby time', 'Standby time', 'Up to 1.5 years in power-saving mode')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Data storage', 'Data storage', '32+32Mb'),
        spec('Tamper proof', 'Tamper proof', 'Light sensor')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '85.0 × 58.0 ×29.0mm'),
        spec('Weight', 'Weight', '161g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP67')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤3 meters'),
        spec('Sensors', 'Sensors', 'Accelerometer, Light sensor'),
        spec('Scenarios', 'Scenarios', 'Low battery alert, Tamper alert, Vibrating Alert, Over-speed alert, Geo-fence'),
        spec('Specialties', 'Specialties', 'On/off button disabling, Voice recording, Over-decibel notification')
      ])
    ],
  },
  // GPS Trackers -> CAN & OBD Product
  {
    id: 'vl512',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'VL512',
    thumbnail: getImg('vl512'),
    tagline: { tr: 'Çift Ağ Destekli Güç.', en: 'Accelerate Fearlessly Powered by Dual Networks' },
    description: { tr: 'Araçlar için özel olarak tasarlanmış kompakt 4G OBDII terminal.', en: 'A 4G OBDII tracker designed specifically for use in vehicles. Compact and easy to install.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Positioning system', 'Positioning system', 'GPS/BDS'),
        spec('Positioning accuracy', 'Positioning accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-162 dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148 dBm (cold) /-156 dBm (hot)'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1sec
Avg. cold start ≤32sec`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Communication network', 'Communication network', 'LTE Cat 1 + GSM'),
        spec('Frequency', 'Frequency', `LTE FDD: B1/B3/B7/B8/B20/B28
LTE TDD: B34/B38/B39/B40/B41
GSM: 850/900//1800/1900MHz`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '50mAh industrial-grade LiCo battery'),
        spec('Input voltage', 'Input voltage', '9-36VDC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green)'),
        spec('Connector', 'Connector', 'OBDII port'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('USB', 'USB', '1 x USB Type-C for configuration'),
        spec('Data storage', 'Data storage', '16+16MB')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '51.0 x 50.0 x 22.0mm'),
        spec('Weight', 'Weight', '42g')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20°C to 70°C'),
        spec('Operating humidity', 'Operating humidity', '5%～95%, non-condensing')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', '≤5 meters'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Ignition detection', 'Ignition detection', 'External Power Voltage'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Speeding alert, Geo-fence, Voice-monitoring, Vehicle battery detection, Power supply disconnection'),
        spec('Driving behavior analysis', 'Driving behavior analysis', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision')
      ])
    ],
  },
  {
    id: 'kd031',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'KD031',
    thumbnail: getImg('kd031'),
    tagline: { tr: 'Filonuzun Veri Kalbi', en: 'The Heartbeats of Your Fleets Data' },
    description: { tr: 'SAE J1939 CAN veri okuma destekli, çevre birimleri için güç sağlayan kompakt cihaz.', en: 'Supports CAN data reading with SAE J1939 protocol and provides B+, GND, ACC for peripherals.' },
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Input voltage', 'Input voltage', '9-33VDC'),
        spec('Working modes', 'Working modes', 'Working Mode (Ignition On), Sleep Mode (Ignition Off)')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensor', 'Sensor', 'Accelerometer'),
        spec('Mount method', 'Mount method', 'Plug-and-Play'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.1 (Optional)'),
        spec('RFID', 'RFID', 'Can be externally connected through the reserved serial port'),
        spec('Certification', 'Certification', 'FCC, CE'),
        spec('GNSS', 'GNSS', 'GPS,BDS'),
        spec('Mount method', 'Mount method', 'Plug-and-Play'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.1'),
        spec('Memory capacity', 'Memory capacity', '16MB Nor Flash'),
        spec('Certification (pending)', 'Certification (pending)', 'FCC')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Blue (Status)'),
        spec('Connection', 'Connection', 'OBDII or J1939 9-pin port to 8-pin connector (PH3.0, 2*4-Pin)'),
        spec('Output port', 'Output port', '10-Pin (PH3.0, 2*5-Pin)'),
        spec('LED indication', 'LED indication', 'Blue (Bluetooth), Green (GNSS),Orange (OBD)'),
        spec('Connection', 'Connection', 'OBDII and J1939 9P to 10P MoIex-3.0 connector'),
        spec('Output port', 'Output port', '10-Pin (PH3.0, 2*5-Pin)'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'PCB onboard antenna'),
        spec('GNSS antenna', 'GNSS antenna', 'ceramic antenna (25*25*4mm)')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95% (Non-condensing)'),
        spec('Operating temperature', 'Operating temperature', '-20℃ ~ +85℃'),
        spec('Operating humidity', 'Operating humidity', '5%~95% (Non-condensing)')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions (LxWxH)', 'Dimensions (LxWxH)', '100x29x19mm'),
        spec('Weight', 'Weight', '40g'),
        spec('Dimensions (LxWxH)', 'Dimensions (LxWxH)', '70x50x20mm'),
        spec('Weight', 'Weight', '60g')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('KD031 unit', 'KD031 unit', '1'),
        spec('OBDII cable', 'OBDII cable', '1'),
        spec('KD032 unit', 'KD032 unit', '1'),
        spec('Main cable', 'Main cable', '1')
      ]),
      specGroup('J1939 9-pin to OBDII cable', 'J1939 9-pin to OBDII cable', [
        spec('Adapter cable', 'Adapter cable', '-Power'),
        spec('Input voltage', 'Input voltage', '9-33VDC'),
        spec('Output voltage1', 'Output voltage1', '9-33VDC, 3A'),
        spec('Output voltage2', 'Output voltage2', '5VDC, 0.3A'),
        spec('Working modes', 'Working modes', `Working Mode (Ignition On)
Sleep Mode (Ignition Off）`)
      ]),
      specGroup('3D/6D sensor', '3D/6D sensor', [
        spec('Adapter Cable', 'Adapter Cable', '-')
      ])
    ],
  },
  {
    id: 'kd032',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'KD032',
    thumbnail: getImg('kd032'),
    tagline: same('Remarkably Compact, Exceptionally Durable'),
    description: same('The KD032 features a compact design and is plug-and-play. It supports CAN data reading for SAE J1939, J1587, and EOBD protocols, and supports Bluetooth connectivity for transmitting ELD device data.'),
    specs: [],
    specGroups: [
      specGroup('General', 'General', [
        spec('Input voltage', 'Input voltage', '9-33VDC'),
        spec('Output voltage1', 'Output voltage1', '9-33VDC, 3A'),
        spec('Output voltage2', 'Output voltage2', '5VDC, 0.3A'),
        spec('Working modes', 'Working modes', `Working Mode (Ignition On)
Sleep Mode (Ignition Off）`)
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Blue (Bluetooth), Green (GNSS),Orange (OBD)'),
        spec('Connection', 'Connection', 'OBDII and J1939 9P to 10P MoIex-3.0 connector'),
        spec('Output port', 'Output port', '10-Pin (PH3.0, 2*5-Pin)'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'PCB onboard antenna'),
        spec('GNSS antenna', 'GNSS antenna', 'ceramic antenna (25*25*4mm)')
      ]),
      specGroup('Feature', 'Feature', [
        spec('GNSS', 'GNSS', 'GPS,BDS'),
        spec('Mount method', 'Mount method', 'Plug-and-Play'),
        spec('Bluetooth', 'Bluetooth', 'BLE 5.1'),
        spec('Memory capacity', 'Memory capacity', '16MB Nor Flash'),
        spec('Certification (pending)', 'Certification (pending)', 'FCC')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-20℃ ~ +85℃'),
        spec('Operating humidity', 'Operating humidity', '5%~95% (Non-condensing)')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions (LxWxH)', 'Dimensions (LxWxH)', '70x50x20mm'),
        spec('Weight', 'Weight', '60g')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('KD032 unit', 'KD032 unit', '1'),
        spec('Main cable', 'Main cable', '1')
      ]),
      specGroup('3D/6D sensor', '3D/6D sensor', [
        spec('Adapter Cable', 'Adapter Cable', '-')
      ])
    ],
  },
  {
    id: 'vl502',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'VL502',
    thumbnail: getImg('vl502'),
    tagline: { tr: 'Sürüşte Yeni Bir Boyut.', en: 'A New Dimension of Drive.' },
    description: { tr: 'Motor devri, hata kodları ve UBI analizleri için Cat 1 OBDII araç takipçisi.', en: 'New generation of 4G Cat 1 OBDII vehicle tracker that obtains VIN, engine speed, water temp, etc.' },
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, GLONASS, BDS, GALILEO, AGPS, LBS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165 dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148 dBm (cold); –156 dBm (hot)'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤2s
Avg. cold start ≤38s`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', '4G Cat 1, 2G (GSM)'),
        spec('Frequency', 'Frequency', `VL502 (L):
LTE-FDD: B2/B3/B4/B5/B7/B8/B28/B66
GSM: B2/B3/B5/B8
VL502 (E):
LTE-FDD: B1/B3/B5/B7/B8/B20/B28
GSM: B2/B3/B5/B8`),
        spec('VL502 (A):', 'VL502 (A):', `Cat M1: B2/B4/B5/B12/B13
Cat NB2: B2/B4/B5/B12/B13`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '50mAh/3.7V'),
        spec('Input voltage', 'Input voltage', '9-33VDC'),
        spec('Power consumption', 'Power consumption', 'Standby: ≤ 5mA')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to 70°C'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'N/A')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '61.0 x 52.0 x 26.0mm'),
        spec('Weight', 'Weight', '55g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Status (Blue)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', 'N/A'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', '0–33V (±0.3V)'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('USB', 'USB', 'Micro USB'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('OBD Port', 'OBD Port', [
        spec('Connection', 'Connection', 'OBDII port'),
        spec('Data', 'Data', 'K-Line, CAN Bus'),
        spec('OBD protocols', 'OBD protocols', `ISO 9141-2 (5 baud init, 10.4 kbaud)
ISO 14230-4 KWP (5 baud init, 10.4 kbaud)
ISO 14230-4 KWP (fast init, 10.4 kbaud)
ISO 15765-4 CAN (11 bit ID, 250 kbaud)
ISO 15765-4 CAN (11 bit ID, 500 kbaud)
ISO 15765-4 CAN (29 bit ID, 250 kbaud)
ISO 15765-4 CAN (29 bit ID, 500 kbaud)
SAE J1939 CAN(29 bit ID, 250 kbaud)
SAE J1939 CAN(29 bit ID, 500 kbaud)`)
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Car Fault, Over-Speed, Ignition detection, Collision, Geo-fence entry/exit, Power on, Device pull-out, Engine idling'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.2'),
        spec('Configuration support', 'Configuration support', 'SMS, Tracksolid Pro, PC Tools'),
        spec('Certification', 'Certification', 'CE, FCC, RoHS')
      ])
    ],
  },
  {
    id: 'vl502-a',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'VL502 (A)',
    thumbnail: getImg('vl502-a'),
    tagline: same('A New Dimension of Drive.'),
    description: same('The VL502 is a new generation of 4G Cat 1 OBDII vehicle tracker for corporate cars, usage-based insurance, fleet management, and individual cars, which can obtain vehicle data such as VIN code, engine speed, water temperature, and accumulated mileage.'),
    specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, GLONASS, BDS, GALILEO, AGPS, LBS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '-162dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '-148dBm (cold); -156dBm (hot)'),
        spec('TTFF (open sky)', 'TTFF (open sky)', `Avg. hot start ≤1s
Avg. cold start ≤32s`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat M1 & NB2'),
        spec('Frequency', 'Frequency', 'Cat M1: B2/B4/B5/B12/B13')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '180mAh/3.7V'),
        spec('Input voltage', 'Input voltage', '9–36VDC'),
        spec('Power consumption', 'Power consumption', 'Standby: ≤ 5mA')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20°C to 70°C'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'N/A')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '65.0 x 50.0 x 25.0mm'),
        spec('Weight', 'Weight', '65g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'Status (Blue)'),
        spec('SIM', 'SIM', 'Nano-SIM'),
        spec('Digital I/Os', 'Digital I/Os', 'N/A'),
        spec('Analog I/Os', 'Analog I/Os', 'N/A'),
        spec('Voltage detection', 'Voltage detection', '0–36V (±0.3V)'),
        spec('Memory capacity', 'Memory capacity', '3000 GPS data entries'),
        spec('USB', 'USB', 'Micro USB'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'Internal'),
        spec('Serial ports', 'Serial ports', 'N/A')
      ]),
      specGroup('OBD Port', 'OBD Port', [
        spec('Connection', 'Connection', 'OBDII port'),
        spec('Data', 'Data', 'K-Line, CAN Bus'),
        spec('OBD protocols', 'OBD protocols', `ISO 9141-2 (5 baud init, 10.4 kbaud)
ISO 14230-4 KWP (5 baud init, 10.4 kbaud)
ISO 14230-4 KWP (fast init, 10.4 kbaud)
ISO 15765-4 CAN (11 bit ID, 250 kbaud)
ISO 15765-4 CAN (11 bit ID, 500 kbaud)
ISO 15765-4 CAN (29 bit ID, 250 kbaud)
ISO 15765-4 CAN (29 bit ID, 500 kbaud)
SAE J1939 CAN(29 bit ID, 250 kbaud)
SAE J1939 CAN(29 bit ID, 500 kbaud)`)
      ]),
      specGroup('Feature', 'Feature', [
        spec('Voice monitoring range', 'Voice monitoring range', 'N/A'),
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Ignition detection, Speeding, Collision, Geo-fence entry/exit, Vehicle battery detection, Power supply disconnection'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.2'),
        spec('Configuration support', 'Configuration support', 'SMS, TrackSolid Pro, PC Tools'),
        spec('Certification', 'Certification', 'FCC')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('OBDII sensor', 'OBDII sensor', '.')
      ])
    ],
  },
  // Consumer Product -> Smart Wearables
  {
    id: 'r001',
    categoryId: 'consumer-product',
    subcategoryId: 'smart-wearables',
    name: 'R001',
    thumbnail: getImg('r001'),
    tagline: { tr: 'Akıllı Sağlık Yüzüğü', en: 'Smart Health Ring' },
    description: { tr: 'Gelişmiş sağlık izleme için ince profilli, kalp basıncı ve uyku analizi yapabilen yüzük.', en: 'Smart rings designed for advanced health monitoring, tracking heart rate, blood oxygen, sleep.' },
    specs: [],
    specGroups: [
      specGroup('Material', 'Material', [
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Battery', 'Battery', '16mAh LiPo battery'),
        spec('Charging', 'Charging', 'Magnetic charging cable'),
        spec('IP rating', 'IP rating', 'IP68'),
        spec('Material', 'Material', 'Stainless steel'),
        spec('Color', 'Color', 'Black, or rose gold with silver'),
        spec('Inner diameter', 'Inner diameter', '#6, #7, #8, #9, #10, #11, #12, #13'),
        spec('Dimensions', 'Dimensions', '8.5 × 2.4mm'),
        spec('Weight', 'Weight', 'Approx. 4.5g (depending inner diameter size)')
      ]),
      specGroup('Standard Packing', 'Standard Packing', [
        spec('Smart ring', 'Smart ring', '1'),
        spec('Charging cable', 'Charging cable', '1')
      ])
    ],
  },
  {
    id: 'r002',
    categoryId: 'consumer-product',
    subcategoryId: 'smart-wearables',
    name: 'R002',
    thumbnail: getImg('r002'),
    tagline: { tr: 'Tüm Gün Akıllı Yüzük', en: 'Smart Ring' },
    description: { tr: 'Nabız, stres ve aktivite takibi sunan bütünsel sağlıklı yaşam yüzüğü.', en: 'Designed for holistic wellness, offering features for activity tracking and health management.' },
    specs: [],
    specGroups: [
      specGroup('Standard Configuration', 'Standard Configuration', [
        spec('Bluetooth', 'Bluetooth', 'BLE 5.3'),
        spec('Battery', 'Battery', '18mAh LiPo battery'),
        spec('Charging', 'Charging', 'Magnetic charging cable'),
        spec('IP rating', 'IP rating', 'IP68'),
        spec('Material', 'Material', 'Ceramics + Resin'),
        spec('Color', 'Color', 'Black, White'),
        spec('Inner diameter', 'Inner diameter', '#7,#8,#9,#10, #11, #12,#13'),
        spec('Thickness', 'Thickness', '2.7mm'),
        spec('Weight', 'Weight', 'Approx. 4.2g (depending inner diameter size)'),
        spec('Operating temperature', 'Operating temperature', '–20℃ to +45℃'),
        spec('Operating humidity', 'Operating humidity', '10% to 90%, non-condensing')
      ])
    ],
  },
  // Consumer Product -> IPC Camera
  {
    id: 'hl365s',
    categoryId: 'consumer-product',
    subcategoryId: 'ipc-camera',
    name: 'HL365S',
    thumbnail: getImg('hl365s'),
    tagline: { tr: '4G Akıllı Kamera', en: '4G Smart Camera' },
    description: { tr: 'Dahili batarya ve geniş açı ile sürekli, kesintisiz 4G destekli ev/park izleme.', en: 'A versatile and reliable security solution, offering clear surveillance via its 130° wide-angle lens.' },
    specs: [],
    specGroups: [
      specGroup('Standard Configuration', 'Standard Configuration', [
        spec('Communication Standard', 'Communication Standard', '4G Cat.1'),
        spec('Frequency', 'Frequency', `HL365_CN:
FDD-LTE:B1/B3/B5/B8
TDD-LTEE:B34/B38/B39/B40/B41`),
        spec('HL365S_EU', 'HL365S_EU', `FDD-LTE:B1/B3/B5/B8/B20/B28
TDD-LTE:B38/B40/B41`),
        spec('Overall Dimensions', 'Overall Dimensions', '58.8 × 81.4 × 45.3 mm'),
        spec('Camera Unit Dimensions', 'Camera Unit Dimensions', '42 × 42 × 59 mm'),
        spec('Bracket Dimensions', 'Bracket Dimensions', '45.3× 43× 47 mm'),
        spec('Housing Material', 'Housing Material', 'ABS+PC'),
        spec('Weight', 'Weight', '110g'),
        spec('LED Indication', 'LED Indication', 'Cellular (Blue), Status (Green), Power (Red)'),
        spec('Video Resolution', 'Video Resolution', '1920×1080 HD'),
        spec('Wide-Angle Lens', 'Wide-Angle Lens', '130°'),
        spec('Night Vision Distance', 'Night Vision Distance', '6m'),
        spec('Audio Pickup Range', 'Audio Pickup Range', '6m'),
        spec('PIR Detection', 'PIR Detection', 'Detection range up to 6 m, 100° detection angle'),
        spec('AI Algorithm', 'AI Algorithm', 'Supports human-figure detection and motion detection'),
        spec('Smart Alerts', 'Smart Alerts', 'Push notifications and zone-based alerts'),
        spec('Cloud Service', 'Cloud Service', 'Supports cloud storage'),
        spec('SD Card Slot', 'SD Card Slot', 'MicroSD (TF) card, up to 128GB (optional)'),
        spec('Battery Capacity', 'Battery Capacity', '2400mAh'),
        spec('Power Port', 'Power Port', 'Type-C'),
        spec('Operating Temperature', 'Operating Temperature', '=A57'),
        spec('Operating Humidity', 'Operating Humidity', '5%–95% RH (non-condensing)')
      ])
    ],
  },
  // Accessories -> Sensors
  {
    id: 'kf043u',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'KF043U',
    thumbnail: getImg('kf043u'),
    tagline: { tr: 'Daha Akıllı Yakıt Yönetimi.', en: 'Fuel Smarter. Fleet Safer.' },
    description: { tr: 'Çeşitli araç tipleri için delmeden monte edilebilen ultrasonik kablosuz BLE sıvı sensörü.', en: 'A wireless BLE ultrasonic fuel level sensor that provides precise and non-contact fuel measurement.' },
    specs: [],
    specGroups: [
      specGroup('Measurement', 'Measurement', [
        spec('Product Type', 'Product Type', 'Wireless BLE type'),
        spec('Measuring Medium', 'Measuring Medium', 'Gasoline, Diesel, Lubricating oil, Coolant'),
        spec('Measurement Range', 'Measurement Range', '30mm – 1000mm'),
        spec('Measurement Accuracy', 'Measurement Accuracy', '99.5% (tested with 0# diesel at 25°C)'),
        spec('Response Time', 'Response Time', '1 second'),
        spec('Resolution', 'Resolution', '0.1 mm')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Output Interface', 'Output Interface', '-')
      ])
    ],
  },
  // Accessories -> Peripherals
  {
    id: 'kj806',
    categoryId: 'accessories',
    subcategoryId: 'peripherals',
    name: 'KJ806',
    thumbnail: getImg('kj806'),
    tagline: { tr: 'Genişletilmiş Kontrol Kutusu', en: 'Extended Control Box' },
    description: { tr: 'Araç güç kontrolü, kilit yönetimi ve AC fonksiyonlarını uzaktan yönetmeye yarayan arayüz.', en: 'Multi-functional Bluetooth-based expansion tool designed for vehicle intelligence scenarios.' },
    specs: [],
    specGroups: [
      specGroup('Basic Specifications', 'Basic Specifications', [
        spec('Dimensions', 'Dimensions', 'Dimensions'),
        spec('Weight', 'Weight', '37.5g'),
        spec('IP rating', 'IP rating', 'N/A'),
        spec('Sensor(s)', 'Sensor(s)', 'G-sensor (motion sensor)'),
        spec('LED', 'LED', '1* Blue'),
        spec('OTA', 'OTA', 'Supported'),
        spec('Operating Temperature', 'Operating Temperature', '-20℃ to 70℃'),
        spec('Operating Humidity', 'Operating Humidity', '0–95%, non-condensing')
      ]),
      specGroup('Electrical Specifications', 'Electrical Specifications', [
        spec('Operating Voltage', 'Operating Voltage', 'DC 9–30V'),
        spec('Standby Current', 'Standby Current', '3mA @ 12V DC / 4mA @ 24V DC'),
        spec('Triggered Current', 'Triggered Current', '37mA @ 12V DC / 21mA @ 24V DC'),
        spec('Maximum Load Current', 'Maximum Load Current', '5A @ 30V'),
        spec('Max Switch Voltage', 'Max Switch Voltage', '30V DC'),
        spec('Max Switch Current', 'Max Switch Current', 'NO @ 5A / NC @ 5A'),
        spec('Max Switch Power', 'Max Switch Power', 'NO @ 150W / NC @ 150W')
      ]),
      specGroup('Bluetooth Specifications', 'Bluetooth Specifications', [
        spec('Bluetooth Version', 'Bluetooth Version', 'BLE 5.0'),
        spec('Broadcast Power', 'Broadcast Power', '-8dBm to 7dBm (0dBm by default)'),
        spec('Effective Range', 'Effective Range', '50m')
      ]),
      specGroup('Interface', 'Interface', [
        spec('Digital I/O(s)', 'Digital I/O(s)', '2* Output, 1* Input'),
        spec('Voltage Detection', 'Voltage Detection', '0–30V'),
        spec('Serial Port(s)', 'Serial Port(s)', '1* TTL')
      ])
    ],
  },
  // Accessories -> External Camera
  {
    id: 'ci03',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CI03',
    thumbnail: getImg('ci03'),
    tagline: { tr: 'Kabin İçi Kızılötesi Kamera', en: 'Cabin-View Infrared Camera' },
    description: { tr: 'Ayarlanabilir izleme açısıyla kompakt iç mekan izleme asistanı.', en: 'Small factor infrared camera with adjustable angle of view, suitable for diverse flexible vehicle setups.' },
    specs: [{ label: { tr: 'Görüş', en: 'Vision' }, value: { tr: 'Kızılötesi', en: 'Infrared' } }]
  },
  {
    id: 'kf041s',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'KF041S',
    thumbnail: getImg('kf041s'),
    tagline: same('Precision Fuel Monitoring. Total Control.'),
    description: same('This series of fuel level sensors is designed for precise measurement and monitoring of liquids such as gasoline, diesel, lubricating oil, and coolant. Leveraging wireless Bluetooth or wired output technologies, these sensors support a wide range of applications from vehicles to industrial tanks.'),
    specs: [],
    specGroups: [
      specGroup('Measurement', 'Measurement', [
        spec('Product type', 'Product type', 'Wired cut-off'),
        spec('Measuring medium', 'Measuring medium', 'Gasoline/diesel/lubricating oil/coolant'),
        spec('Probe length', 'Probe length', '1000mm'),
        spec('Measurement range', 'Measurement range', '0–1000mm'),
        spec('Measurement accuracy', 'Measurement accuracy', '≤0.5% FS'),
        spec('Response time', 'Response time', '1 second'),
        spec('Resolution', 'Resolution', '0.1mm')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Output interface', 'Output interface', 'RS485'),
        spec('Transmission distance', 'Transmission distance', '95cm (power cable) + 200cm (extension cable)')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-40℃ to 75℃'),
        spec('Storage temperature', 'Storage temperature', '-40℃ to 75℃'),
        spec('Humidity', 'Humidity', '5% to 95% (non-condensing)')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Overall structure', 'Overall structure', 'Column type'),
        spec('Body material', 'Body material', 'Aluminum alloy'),
        spec('Weight', 'Weight', '761g (extension cable included)'),
        spec('Installation method', 'Installation method', 'Five-hole flange, top-mounted'),
        spec('Flange size', 'Flange size', 'Outer diameter 70mm, Inner diameter 20mm')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', 'N/A'),
        spec('Input Voltage', 'Input Voltage', '5–36V')
      ])
    ],
  },
  {
    id: 'k7800p',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'K7800P',
    thumbnail: getImg('k7800p'),
    tagline: same('Sense the Environment. Protect What Matters.'),
    description: same('The K7800P is a versatile sensor that uses Bluetooth communication technology to seamlessly interact with a paired mobile device or tracking unit.'),
    specs: [],
    specGroups: [
      specGroup('Standard Configuration', 'Standard Configuration', [
        spec('Bluetooth', 'Bluetooth', 'BLE 4.2, 2.4GHz'),
        spec('Transmission distance (open area)', 'Transmission distance (open area)', '50m'),
        spec('Battery', 'Battery', '1000mAh Li-MnO2 battery'),
        spec('Service life', 'Service life', '> 3 years'),
        spec('Temperature range', 'Temperature range', '-20℃ to +70℃'),
        spec('Temperature error', 'Temperature error', '±0.5℃ (10℃ to 50℃); ±2℃ (≤10℃ or ≥50℃)'),
        spec('Humidity range', 'Humidity range', '0% RH to 100% RH'),
        spec('Humidity error', 'Humidity error', '±2.5% RH (0% RH to 90% RH); ±3.5%RH (>90% RH)'),
        spec('Operating temperature', 'Operating temperature', '-20℃ to +70℃'),
        spec('Storage temperature', 'Storage temperature', '-40℃ to +60℃'),
        spec('IP rating', 'IP rating', 'IP65'),
        spec('LED indication', 'LED indication', 'Red (working status)'),
        spec('Side button', 'Side button', 'To change working mode'),
        spec('Sensors', 'Sensors', 'Light sensor, Hall effect door sensor, Environmental sensor'),
        spec('Compatibility', 'Compatibility', 'VL103 series, VL802 series, and LL303'),
        spec('Device dimensions', 'Device dimensions', '40 × 40 × 15mm (BLE sensor); 65 × 32 × 25mm (door sensor)')
      ])
    ],
  },
  {
    id: 'kf201s',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'KF201S',
    thumbnail: getImg('kf201s'),
    tagline: same('Fuel Smarter. Manage Easier.'),
    description: same('This series of fuel level sensors is designed for precise measurement and monitoring of liquids such as gasoline, diesel, lubricating oil, and coolant. It provides a comprehensive solution with high precision, reliability, and durability.'),
    specs: [],
    specGroups: [
      specGroup('Measurement', 'Measurement', [
        spec('Product type', 'Product type', 'Bluetooth cut-off'),
        spec('Measuring medium', 'Measuring medium', 'Gasoline/diesel/lubricating oil/coolant'),
        spec('Probe length', 'Probe length', '1000mm'),
        spec('Measurement range', 'Measurement range', '0–1000mm'),
        spec('Measurement accuracy', 'Measurement accuracy', '≤ 1% FS'),
        spec('Response time', 'Response time', '1 second'),
        spec('Resolution', 'Resolution', '0.5mm')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Output interface', 'Output interface', 'N/A'),
        spec('Transmission distance', 'Transmission distance', '50m (unobstructed)')
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-40℃ to 75℃'),
        spec('Storage temperature', 'Storage temperature', '-40℃ to 75℃'),
        spec('Humidity', 'Humidity', '5% to 95% (non-condensing)')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Overall structure', 'Overall structure', 'Column type'),
        spec('Body material', 'Body material', 'Aluminum alloy'),
        spec('Weight', 'Weight', '719g'),
        spec('Installation method', 'Installation method', 'Five-hole flange, top-mounted'),
        spec('Flange size', 'Flange size', 'Outer diameter 70mm, Inner diameter 20mm')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '4000mAh'),
        spec('Input Voltage', 'Input Voltage', 'N/A')
      ])
    ],
  },
  {
    id: 'kf281s',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'KF281S',
    thumbnail: getImg('kf281s'),
    tagline: same('Know Your Fuel. Own Your Fleet.'),
    description: same('This series of fuel level sensors is designed for precise measurement and monitoring of liquids such as gasoline, diesel, lubricating oil, and coolant. Whether for vehicle fuel consumption management or industrial tank monitoring, it offers reliable and durable fuel intelligence.'),
    specs: [],
    specGroups: [
      specGroup('Measurement', 'Measurement', [
        spec('Product type', 'Product type', 'Bluetooth cut-off'),
        spec('Measuring medium', 'Measuring medium', 'Gasoline/diesel/lubricating oil/coolant'),
        spec('Probe length', 'Probe length', '1000mm'),
        spec('Measurement range', 'Measurement range', '0–1000mm'),
        spec('Measurement accuracy', 'Measurement accuracy', '≤ 1% FS'),
        spec('Response time', 'Response time', '1 second'),
        spec('Resolution', 'Resolution', '0.5mm')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0'),
        spec('Output interface', 'Output interface', 'N/A'),
        spec('Transmission distance', 'Transmission distance', `50m (unobstructed Bluetooth)
95cm (power cable) + 200cm (extension cable)`)
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '-40℃ to 75℃'),
        spec('Storage temperature', 'Storage temperature', '-40℃ to 75℃'),
        spec('Humidity', 'Humidity', '5% to 95% (non-condensing)')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Overall structure', 'Overall structure', 'Column type'),
        spec('Body material', 'Body material', 'Aluminum alloy'),
        spec('Weight', 'Weight', '579g (extension cable included)'),
        spec('Installation method', 'Installation method', 'Five-hole flange, top-mounted'),
        spec('Flange size', 'Flange size', 'Outer diameter 70mm, Inner diameter 20mm')
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', 'N/A'),
        spec('Input Voltage', 'Input Voltage', '5–36V')
      ])
    ],
  },
  {
    id: 'kc208s',
    categoryId: 'accessories',
    subcategoryId: 'peripherals',
    name: 'KC208S',
    thumbnail: getImg('kc208s'),
    tagline: same('Remote Control'),
    description: same('The KC208S remote control integrates seamlessly with the tracker to manage vehicle operations. Customizable button functions across eight events enhance features such as immobilization, audible vehicle finding, and remote locking.'),
    specs: [],
    specGroups: [
      specGroup('Standard Configuration', 'Standard Configuration', [
        spec('Bluetooth', 'Bluetooth', 'BLE 5.0, 2.4GHz'),
        spec('Transmission distance (open area)', 'Transmission distance (open area)', '30m'),
        spec('Battery', 'Battery', '225mAh CR2032'),
        spec('Service life', 'Service life', '3 years (under normal ambient conditions, 10 presses per day)'),
        spec('Operating temperature', 'Operating temperature', '-20℃ to +60℃'),
        spec('Storage temperature', 'Storage temperature', '-20℃ to +60℃'),
        spec('IP rating', 'IP rating', 'IP65'),
        spec('LED indication', 'LED indication', 'Red (working status)'),
        spec('Button number', 'Button number', '4 buttons'),
        spec('Button mode', 'Button mode', 'Long press/Short press'),
        spec('Button command', 'Button command', '8 events'),
        spec('Compatibility', 'Compatibility', 'VL103 series / VL802 series'),
        spec('Device dimensions', 'Device dimensions', '60mm x 37.5mm x 11.5mm'),
        spec('Device weight', 'Device weight', '12g'),
        spec('Certification', 'Certification', 'CE, FCC')
      ])
    ],
  },
  {
    id: 'jcm0700',
    categoryId: 'accessories',
    subcategoryId: 'peripherals',
    name: 'JCM0700',
    thumbnail: getImg('jcm0700'),
    tagline: same('Display Unit'),
    description: same('The JCM0700 is a display unit designed to work with the JC450 Pro or JC451. It shows real-time footage from connected cameras and can also display time, device status, driving data, and other vehicle information.'),
    specs: [],
    specGroups: [
      specGroup('Standard Configuration', 'Standard Configuration', [
        spec('Screen Size', 'Screen Size', '7 inch'),
        spec('Backlight', 'Backlight', 'LED'),
        spec('Backlight Brightness', 'Backlight Brightness', '500 cd/cm²'),
        spec('Video System', 'Video System', 'PSL format'),
        spec('Video signal', 'Video signal', 'CVBS(JC450Pro、JC451)/AHD'),
        spec('Video Input', 'Video Input', '2 channels'),
        spec('Input', 'Input', '4-PIN aviation Plug / RCA socket'),
        spec('Power Input', 'Power Input', '9–30V'),
        spec('IP Rating', 'IP Rating', 'IPX4'),
        spec('Operating Temperature', 'Operating Temperature', '-20℃ to 60℃'),
        spec('Storage Temperature', 'Storage Temperature', '-30℃ to 70℃'),
        spec('Dimensions', 'Dimensions', '181 × 121 × 52 mm'),
        spec('Material', 'Material', 'PC + ABS'),
        spec('Standard Accessories', 'Standard Accessories', 'Power cable, mounting bracket, screws, aviation-to-AV adapter cable'),
        spec('Compatibility', 'Compatibility', 'JC450Pro, JC451 (requires optional I/O expansion cable)')
      ])
    ],
  },
  {
    id: 'kz081v',
    categoryId: 'accessories',
    subcategoryId: 'cable',
    name: 'KZ081V',
    thumbnail: getImg('kz081v'),
    tagline: same('DC-DC Converter'),
    description: same('KZ081V is a high-efficiency DC-DC converter designed to convert the vehicle\'s 9-33V power input into a stable 5.4V output, ensuring continuous and reliable 24/7 power for connected devices.'),
    specs: [],
    specGroups: [
      specGroup('Standard Configuration', 'Standard Configuration', [
        spec('Input voltage', 'Input voltage', '9V to 33V DC'),
        spec('Output voltage', 'Output voltage', '5.4V DC'),
        spec('Max output current', 'Max output current', '3A'),
        spec('Operating temperature', 'Operating temperature', '-20℃ to 70℃'),
        spec('Operating humidity', 'Operating humidity', '0–95%, non-condensing'),
        spec('Dimensions', 'Dimensions', '97*29*19mm'),
        spec('Weight', 'Weight', '80g')
      ])
    ],
  },
  {
    id: 'ci04',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CI04',
    thumbnail: getImg('ci04'),
    tagline: same('Cabin-View Infrared Camera with IR-cut'),
    description: same('Cabin-view infrared camera with IR-cut support for flexible in-vehicle monitoring scenarios.'),
    specs: []
  },
  {
    id: 'cd02',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CD02',
    thumbnail: getImg('cd02'),
    tagline: same('Driver-facing Infrared Camera'),
    description: same('Driver-facing infrared camera built for reliable in-cabin visibility and monitoring.'),
    specs: []
  },
  {
    id: 'ci05f',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CI05F',
    thumbnail: getImg('ci05f'),
    tagline: same('Cabin-View Full AHD Camera'),
    description: same('Full AHD cabin-view camera designed for sharper in-vehicle visual monitoring.'),
    specs: []
  },
  {
    id: 'ci06f',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CI06F',
    thumbnail: getImg('ci06f'),
    tagline: same('Cabin-View Full AHD Camera'),
    description: same('Full AHD cabin-view camera for flexible monitoring scenarios where a compact interior view is needed.'),
    specs: []
  },
  {
    id: 'cf02f',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CF02F',
    thumbnail: getImg('cf02f'),
    tagline: same('Road-facing Full AHD Camera'),
    description: same('Road-facing full AHD camera designed to capture a sharper forward view.'),
    specs: []
  },
  {
    id: 'ce01',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CE01',
    thumbnail: getImg('ce01'),
    tagline: same('Rear-view waterproof camera'),
    description: same('Rear-view waterproof camera for dependable outdoor vehicle coverage.'),
    specs: []
  },
  {
    id: 'ce02',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CE02',
    thumbnail: getImg('ce02'),
    tagline: same('Side-view waterproof camera'),
    description: same('Side-view waterproof camera for broader visual coverage around the vehicle body.'),
    specs: []
  },
  {
    id: 'ce04',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CE04',
    thumbnail: getImg('ce04'),
    tagline: same('Rear-view waterproof camera with Fill light'),
    description: same('Rear-view waterproof camera with fill light support for clearer low-light rear monitoring.'),
    specs: []
  },
  {
    id: 'cf01f',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CF01F',
    thumbnail: getImg('cf01f'),
    tagline: same('Road-facing Full AHD Camera'),
    description: same('Road-facing full AHD camera for crisp forward vehicle coverage.'),
    specs: []
  },
  {
    id: 'ci01',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CI01',
    thumbnail: getImg('ci01'),
    tagline: same('Cabin-View Infrared Camera'),
    description: same('Cabin-view infrared camera designed for flexible in-vehicle placement.'),
    specs: []
  },
  {
    id: 'ci02',
    categoryId: 'accessories',
    subcategoryId: 'external-camera',
    name: 'CI02',
    thumbnail: getImg('ci02'),
    tagline: same('Cabin-View USB Camera'),
    description: same('USB cabin-view camera for flexible and compact in-cabin monitoring.'),
    specs: []
  }
];

export const HARDWARE_PRODUCTS: HardwareProduct[] = HARDWARE_PRODUCTS_BASE.map((product) => {
  const downloads = PRODUCT_DOWNLOADS[product.id] ?? product.downloads;

  return downloads ? { ...product, downloads } : product;
});
