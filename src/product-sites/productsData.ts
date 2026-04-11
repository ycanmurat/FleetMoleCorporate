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
  [/Camera/gi, 'Kamera'],
  [/Configuration/gi, 'Yapılandırma'],
  [/Others/gi, 'Diğer'],
  [/Standard/gi, 'Standart'],
  [/Band/gi, 'Bant'],
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

export const HARDWARE_PRODUCTS: HardwareProduct[] = [
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
    specs: [
      spec('Standart', 'Standard', '4G LTE Cat.4'),
      spec('WiFi', 'WiFi', '2.4GHz, AP Mode / STA Mode / WiFi Direct desteği', '2.4GHz, Support AP Mode / STA Mode / WiFi Direct'),
      spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
      spec(
        'Bant',
        'Band',
        'Avrasya Versiyonu\nLTE-FDD: B1/B3/B5/B7/B8/B19/B20\nLTE-TDD: B38/B39/B40/B41 (100M)\nWCDMA: B1/B2/B5/B8\nGSM: B2/B3/B5/B8\n\nAmerika Versiyonu\nLTE-FDD: B2/B3/B4/B5/B7/B12/B17\nLTE-TDD: B38/B41 (100M)\nWCDMA: B2/B4/B5\nGSM: B2/B5/B8',
        'Eurasian Version\nLTE-FDD: B1/B3/B5/B7/B8/B19/B20\nLTE-TDD: B38/B39/B40/B41 (100M)\nWCDMA: B1/B2/B5/B8\nGSM: B2/B3/B5/B8\n\nAmerican Version\nLTE-FDD: B2/B3/B4/B5/B7/B12/B17\nLTE-TDD: B38/B41 (100M)\nWCDMA: B2/B4/B5\nGSM: B2/B5/B8',
      ),
      spec('Ön Kamera (Ana)', 'Front Camera (Main)', '1920×1080 / 25FPS / F2.2 / Tam renkli / 118° (HFoV)', '1920×1080 / 25FPS / F2.2 / Full color / 118° (HFoV)'),
      spec(
        'Alt Kamera',
        'Sub Camera',
        '1280×720 / 15FPS / F2.5 / Gündüz tam renkli, düşük ışıkta monokrom / 90° (HFoV)',
        '1280×720 / 15FPS / F2.5 / Full color in daytime & monochrome in dim light / 90° (HFoV)',
      ),
      spec('Video Formatı', 'Video Format', '.mp4'),
      spec('GNSS', 'GNSS', 'GPS / BDS'),
      spec('Sensör', 'Sensor', '6 eksen', '6-axis'),
      spec('Mikrofon', 'Microphone', 'Desteklenir', 'Support'),
      spec('Hoparlör', 'Speaker', 'Desteklenir', 'Support'),
      spec('Arayüz', 'Interface', 'Micro USB*1, SOS*1, RS232*1, Röle*1', 'Micro USB*1, SOS*1, RS232*1, Relay*1'),
      spec('Bellek Desteği', 'Memory Support', 'TF kart (256GB\'a kadar)', 'TF card (Up to 256GB)'),
      spec('SIM Kart Tipi', 'SIM Card Type', 'Nano'),
      spec('LED Göstergesi', 'LED Indication', 'Kırmızı (Güç), Mavi (Hücresel), Yeşil (GNSS)', 'Red (Power), Blue (Cellular), Green (GNSS)'),
      spec('Güç Beslemesi', 'Power Supply', 'Güç kablosu: B+ / ACC / GND', 'Power cable: B+ / ACC / GND'),
      spec('Çalışma Voltajı', 'Operating Voltage', 'DC 9-30V', 'DC 9-30V'),
      spec('Çalışma Sıcaklığı', 'Operating Temperature', '-20°C ile +65°C', '-20°C to +65°C'),
      spec('Depolama Sıcaklığı', 'Storage Temperature', '-30°C ile +85°C', '-30°C to +85°C'),
      spec('Cihaz Ağırlığı', 'Device Weight', '233g'),
      spec('Cihaz Boyutları', 'Device Dimension', '109×69×52mm', '109×69×52mm'),
      spec('Sertifikalar', 'Certifications', 'CE / FCC / RoHS', 'CE / FCC / RoHS'),
    ],
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
      specGroup('Ağ', 'Network', [
        spec('Standart', 'Standard', '4G LTE Cat.4'),
        spec('WiFi', 'WiFi', '2.4GHz, AP Mode / STA Mode / WiFi Direct desteği', '2.4GHz, Support AP Mode / STA Mode / WiFi Direct'),
        spec('Bluetooth', 'Bluetooth', 'BLE 4.0'),
        spec(
          'Bant',
          'Band',
          'Avrasya Versiyonu\nLTE-FDD: B1/B3/B5/B7/B8/B19/B20\nLTE-TDD: B38/B39/B40/B41 (100M)\nWCDMA: B1/B2/B5/B8\nGSM: B2/B3/B5/B8\n\nAmerika Versiyonu\nLTE-FDD: B2/B3/B4/B5/B7/B12/B17\nLTE-TDD: B38/B41 (100M)\nWCDMA: B2/B4/B5\nGSM: B2/B5/B8',
          'Eurasian Version\nLTE-FDD: B1/B3/B5/B7/B8/B19/B20\nLTE-TDD: B38/B39/B40/B41 (100M)\nWCDMA: B1/B2/B5/B8\nGSM: B2/B3/B5/B8\n\nAmerican Version\nLTE-FDD: B2/B3/B4/B5/B7/B12/B17\nLTE-TDD: B38/B41 (100M)\nWCDMA: B2/B4/B5\nGSM: B2/B5/B8',
        ),
      ]),
      specGroup('Kamera', 'Camera', [
        spec('Ön Kamera (Ana)', 'Front Camera (Main)', '1920×1080 / 25FPS / F2.2 / Tam renkli / 118° (HFoV)', '1920×1080 / 25FPS / F2.2 / Full color / 118° (HFoV)'),
        spec(
          'Alt Kamera',
          'Sub Camera',
          '1280×720 / 15FPS / F2.5 / Gündüz tam renkli, düşük ışıkta monokrom / 90° (HFoV)',
          '1280×720 / 15FPS / F2.5 / Full color in daytime & monochrome in dim light / 90° (HFoV)',
        ),
        spec('Video Formatı', 'Video Format', '.mp4'),
      ]),
      specGroup('Yapılandırma', 'Configuration', [
        spec('GNSS', 'GNSS', 'GPS / BDS'),
        spec('Sensör', 'Sensor', '6 eksen', '6-axis'),
        spec('Mikrofon', 'Microphone', 'Desteklenir', 'Support'),
        spec('Hoparlör', 'Speaker', 'Desteklenir', 'Support'),
        spec('Arayüz', 'Interface', 'Micro USB*1, SOS*1, RS232*1, Röle*1', 'Micro USB*1, SOS*1, RS232*1, Relay*1'),
        spec('Bellek Desteği', 'Memory Support', 'TF kart (256GB\'a kadar)', 'TF card (Up to 256GB)'),
        spec('SIM Kart Tipi', 'SIM Card Type', 'Nano'),
        spec('LED Göstergesi', 'LED Indication', 'Kırmızı (Güç), Mavi (Hücresel), Yeşil (GNSS)', 'Red (Power), Blue (Cellular), Green (GNSS)'),
      ]),
      specGroup('Diğer', 'Others', [
        spec('Güç Beslemesi', 'Power Supply', 'Güç kablosu: B+ / ACC / GND', 'Power cable: B+ / ACC / GND'),
        spec('Çalışma Voltajı', 'Operating Voltage', 'DC 9-30V', 'DC 9-30V'),
        spec('Çalışma Sıcaklığı', 'Operating Temperature', '-20°C ile +65°C', '-20°C to +65°C'),
        spec('Depolama Sıcaklığı', 'Storage Temperature', '-30°C ile +85°C', '-30°C to +85°C'),
        spec('Cihaz Ağırlığı', 'Device Weight', '233g'),
        spec('Cihaz Boyutları', 'Device Dimension', '109×69×52mm', '109×69×52mm'),
        spec('Sertifikalar', 'Certifications', 'CE / FCC / RoHS', 'CE / FCC / RoHS'),
      ]),
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
      tr: 'Hem yolu hem de kabin içini aynı yolculukta görünür kılmak üzere tasarlandı. JC400, filonuzun her rotasını daha net izlemenizi ve daha hızlı aksiyon almanızı sağlar.',
      en: 'Crafted to capture both what\'s ahead and what\'s happening within, JC400 gives your fleet a fuller view of every journey, so you can drive smarter, manage better, and respond faster.',
    },
    specs: [{ label: { tr: 'Ağ', en: 'Network' }, value: { tr: '4G LTE', en: '4G LTE' } }],
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
      tr: 'JC261P entegre çift lensli araç içi kamerası, ön yolu ve kabini aynı anda izlemenizi sağlar. Kızılötesi gece görüşü, ADAS, istisna uyarıları ve 4G destekli canlı yayın ile filo ekiplerine koçluk ve operasyon iyileştirmesi için daha güçlü bir veri katmanı sunar.',
      en: 'JC261P integrated dual-lens dash camera allows you to simultaneously monitor the road ahead and the cabin. A number of safety features are included in the system, including infrared night vision, ADAS, exception alerts, and more. Furthermore, the 4G capability of the device enables seamless video streaming, live audio alerts, route replay, and video history playback.',
    },
    specs: [{ label: { tr: 'Ağ', en: 'Network' }, value: { tr: '4G/LTE', en: '4G/LTE' } }],
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
      tr: 'JC400\'ün gelişmiş versiyonu olan JC261, ihtiyaca göre sürücüye dönük, içe dönük ya da geri görüş kamerası eklemenize izin verir. DMS, ADAS, istisna uyarıları ve 4G üzerinden video akışı sayesinde filo yöneticileri sürücü davranışlarını veriyle iyileştirebilir.',
      en: 'An upgrade of JC400, the JC261 4G dash camera allows you to add a driver-facing, inward-facing, or backup camera as needed. The on-device camera can monitor the road ahead, while the peripheral camera can monitor the driver, the cabin, or the rear. A number of safety features are included in the system, including DMS, ADAS, exception alerts, and more.',
    },
    specs: [{ label: { tr: 'Video', en: 'Video' }, value: { tr: '1080P', en: '1080P' } }],
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
    specs: [{ label: { tr: 'Modül', en: 'Module' }, value: { tr: '4G & GNSS', en: '4G & GNSS' } }]
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
    specs: [{ label: { tr: 'Bağlantı', en: 'Connectivity' }, value: { tr: 'LTE & GNSS', en: 'LTE & GNSS' } }]
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
    specs: [{ label: { tr: 'Özellik', en: 'Feature' }, value: { tr: 'Yorgunluk Algılama', en: 'Fatigue Detection' } }]
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
    specs: [{ label: { tr: 'Algoritma', en: 'Algorithm' }, value: { tr: 'Visual AI', en: 'Visual AI' } }]
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
    specs: [{ label: { tr: 'Özellik', en: 'Feature' }, value: { tr: 'ADAS & DMS', en: 'ADAS & DMS' } }]
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
    specs: [{ label: { tr: 'Sistem', en: 'System' }, value: { tr: 'Android Tabanlı', en: 'Android OS' } }]
  },
  {
    id: 'jc451',
    categoryId: 'video-telematics',
    subcategoryId: 'camerabox',
    name: 'JC451',
    thumbnail: getImg('jc451'),
    tagline: { tr: 'Gizli Zeka. Görünür Güvenlik.', en: 'Hidden Intelligence. Visible Safety.' },
    description: { tr: 'Uyum sağlar; sessiz hassasiyet ve güçlü yapay zeka analizleriyle filonuzu korur.', en: 'It blends in, yet its AI sees what others miss, protecting your fleet with silent precision.' },
    specs: [{ label: { tr: 'Sistem', en: 'System' }, value: { tr: 'Android Tabanlı', en: 'Android OS' } }]
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
    specs: [{ label: { tr: 'Bağlantı', en: 'Connectivity' }, value: { tr: '4G LTE', en: '4G LTE' } }]
  },
  {
    id: 'vl863',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL863',
    thumbnail: getImg('vl863'),
    tagline: { tr: 'LTE Araç GNSS Terminali', en: 'LTE Vehicle GNSS Terminal' },
    description: { tr: 'Yolcu araçları ve kamyonlar için yönetilebilir konumlandırma.', en: 'Versatile GPS tracker designed to efficiently manage fleets of passenger vehicles and trucks.' },
    specs: [{ label: { tr: 'Modül', en: 'Module' }, value: { tr: 'GNSS', en: 'GNSS' } }]
  },
  {
    id: 'vl505',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL505',
    thumbnail: getImg('vl505'),
    tagline: { tr: 'Daha Akıllı Takip Edin.', en: 'Track Smarter, Not Harder.' },
    description: { tr: 'Araç durumlarını tak ve çalıştır kolaylığıyla anında izleyin.', en: 'VL505 makes fleet monitoring effortless. Plug it in, relax, and get real-time insights.' },
    specs: [{ label: { tr: 'Tasarım', en: 'Design' }, value: { tr: 'Tak & Çalıştır', en: 'Plug & Play' } }]
  },
  {
    id: 'gt06n-4g',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'GT06N 4G',
    thumbnail: getImg('gt06n-4g'),
    tagline: { tr: 'Klasik, 4G ile Yeniden.', en: 'Classic, Reimagined in 4G.' },
    description: { tr: 'Güvenilir tasarım, daha yüksek hız ve kontrol ile filolar için.', en: 'A trusted design, now with faster speed, sharper clarity, and greater control.' },
    specs: [{ label: { tr: 'Ağ', en: 'Network' }, value: { tr: '4G', en: '4G' } }]
  },
  {
    id: 'jm-vl02',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'JM-VL02',
    thumbnail: getImg('jm-vl02'),
    tagline: { tr: 'Kontrol İçin Tasarlandı.', en: 'Built to Connect. Designed to Control.' },
    description: { tr: 'Filonuzun güvendiği operasyonel asistan.', en: 'Your fleet\'s trusted partner on every trip, delivering safety and connection.' },
    specs: [{ label: { tr: 'Frekans', en: 'Frequency' }, value: { tr: 'Çoklu Bant', en: 'Multi-band' } }]
  },
  {
    id: 'vl101g',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL101G',
    thumbnail: getImg('vl101g'),
    tagline: { tr: 'Bağlantılı. Kontrollü. Kendinden Emin.', en: 'Connected. Controlled. Confident.' },
    description: { tr: 'Çift frekans GNSS ile 4G araç takibi, zor koşullarda konum hassasiyeti.', en: 'A 4G vehicle tracker with GNSS positioning and dual-frequency GPS.' },
    specs: [{ label: { tr: 'Navigasyon', en: 'Navigation' }, value: { tr: 'INS Destekli', en: 'INS Enhanced' } }]
  },
  {
    id: 'gt06n',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'GT06N',
    thumbnail: getImg('gt06n'),
    tagline: same('The Classic, Trusted by Fleets Worldwide.'),
    description: same('From every trip to every alert, GT06N keeps your fleet visible, safe, and in control.'),
    specs: []
  },
  {
    id: 'gt06s',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'GT06S',
    thumbnail: getImg('gt06s'),
    tagline: same('Invisible. In Control.'),
    description: same('Your fleet moves fast. GT06S makes sure nothing slips through the cracks, delivering smooth, secure, and effortless management mile after mile.'),
    specs: []
  },
  {
    id: 'kl100',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'KL100',
    thumbnail: getImg('kl100'),
    tagline: same('All-in-one tracking, from fuel to fleet.'),
    description: same('The KL100 is a GPS fuel sensor specifically designed for fleet management scenarios, featuring global 4G LTE connectivity, a built-in Bluetooth module for local configuration, and integrating real-time positioning, precise fuel level monitoring, and advanced anti-theft alarm functions.'),
    specs: []
  },
  {
    id: 'vg03',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VG03',
    thumbnail: getImg('vg03'),
    tagline: same('Discreet Tracking. Solid Performance.'),
    description: same('Supporting a 9-90V voltage range, the JM-VG03 GPS tracker series work suitably with a wide range of vehicles. Thanks to its inbuilt large antenna and compact size, it delivers faster and more accurate positions and can be hidden-installed. In addition to its general features, alerts of power supply disconnection and tamper are pluses for anti-theft.'),
    specs: []
  },
  {
    id: 'vl103d',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL103D',
    thumbnail: getImg('vl103d'),
    tagline: same('Tiny Device. Expanded Control.'),
    description: same('Compact size with great power, the VL103D is a discreetly-installed, fully-featured vehicle tracker with LTE, GNSS, RS485 interface and the IP66 waterproof rating. LTE communication with GSM (2G) fallback ensures a solid connection in almost all cases, and the wide 9-90V input voltage range is compatible with virtually any vehicle.'),
    specs: []
  },
  {
    id: 'vl103m',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL103M',
    thumbnail: getImg('vl103m'),
    tagline: same('Minimal Form. Complete Control.'),
    description: same('Compact yet powerful, the VL103M is an IP66 rating anti-theft GPS tracker designed for demanding industrial and commercial use. Ideal for GPS fleet tracking and management, it supports diverse operations across rental fleets, urban transit, and logistics.'),
    specs: []
  },
  {
    id: 'vl106',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL106',
    thumbnail: getImg('vl106'),
    tagline: same('Safety That Doesn\'t Lose Its Track'),
    description: same('Built with an inertial navigation system, the VL106 is an advanced vehicle tracker capable of providing strong signal acquisition and accurate positioning even when the vehicle is in a tunnel, underground parking lot, or other locations without satellite signals.'),
    specs: []
  },
  {
    id: 'vl110c',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL110C',
    thumbnail: getImg('vl110c'),
    tagline: same('One tracker. Any Vehicle. Total safety.'),
    description: same('VL110C is a compact GPS tracker with 4G LTE and 2G fallback, built for managing motorcycles, cars, and light commercial vehicles. With support for a 9-90V wide voltage range, it works seamlessly across scooters, sedans, and trucks.'),
    specs: []
  },
  {
    id: 'vl111',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL111',
    thumbnail: getImg('vl111'),
    tagline: same('Built to Protect. Ready against Theft.'),
    description: same('Track every vehicle in real time, act instantly when needed, and keep your fleet safe. With a built-in relay, VL111 puts safety and control at your fingertips.'),
    specs: []
  },
  {
    id: 'vl501',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL501',
    thumbnail: getImg('vl501'),
    tagline: same('Tracks Like a Pro. Charges Like a Charm.'),
    description: same('The VL501 is a plug-and-play tracker with GNSS, LTE, and Bluetooth connectivity. With a cigar lighter power connector, it is easy to install on virtually any vehicle.'),
    specs: []
  },
  {
    id: 'vl802',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL802',
    thumbnail: getImg('vl802'),
    tagline: same('More Visibility. More Control. All in One.'),
    description: same('Smarter fleets start here. VL802 is the quiet force behind every smooth delivery, safe return, and smart decision. Always connected. Always in control. Always one step ahead.'),
    specs: []
  },
  {
    id: 'vl808',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'VL808',
    thumbnail: getImg('vl808'),
    tagline: same('Intelligent Tracking Meets Expanded Fleet Control'),
    description: same('The VL808 is a versatile hardwired tracker with comprehensive tracking capabilities. It features 4G LTE connectivity for fast data transfer and multi-GNSS positioning for precise location tracking, along with multiple interfaces for broader feature expansion.'),
    specs: []
  },
  {
    id: 'wetrack2',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'WeTrack 2',
    thumbnail: getImg('wetrack2'),
    tagline: same('Lightweight Security, Tailored for Two-Wheelers.'),
    description: same('The WeTrack2 is a vehicle tracker manufactured to meet the needs of e-scooter and motorcycle tracking. Providing functions such as remote fuel cut-off, geo-fence function, and over-speed warning, it gives crucial visibility into vehicle status and driver behavior.'),
    specs: []
  },
  {
    id: 'wetrack140',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'WeTrack 140',
    thumbnail: getImg('wetrack140'),
    tagline: same('Certified. Compliant. Ready for the Indian road.'),
    description: same('The AIS140-approved WeTrack140 GPS tracker, designed for the Indian market, allows you to stay in control and track your fleet in real time.'),
    specs: []
  },
  {
    id: 'x3',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'X3',
    thumbnail: getImg('x3'),
    tagline: same('Talks and Connects. Guards What Matters.'),
    description: same('X3 doesn\'t just track your vehicles, it transforms every journey into insight that drives smarter fleet management.'),
    specs: []
  },
  {
    id: 'bl10',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'BL10',
    thumbnail: getImg('bl10'),
    tagline: same('Engineered for Reliable Shared Mobility'),
    description: same('The BL10 shared bike lock focuses on solving core challenges in shared mobility. From anti-drift positioning to solar-powered endurance, every design is tailored to fix high-frequency issues like signal loss, frequent recharging, and difficult unlocking.'),
    specs: []
  },
  {
    id: 'eg02',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'EG02',
    thumbnail: getImg('eg02'),
    tagline: same('Tiny. Smart. Locks and Tracks Your E-scooter.'),
    description: same('Say goodbye to traditional electric scooter keys and meet the effective anti-theft EG02. As small as a cigarette lighter, the EG02 GPS tracker comes with a plug and play design and supports GPS and LBS real-time tracking.'),
    specs: []
  },
  {
    id: 'bl11',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'BL11',
    thumbnail: getImg('bl11'),
    tagline: same('Engineered for the Demands of Shared Freedom'),
    description: same('The JM-BL11 GPS bike sharing lock is optimized for bike sharing solutions with Cat M1/NB2 low power consumption technology, reinforced structure, and enhanced data security protection.'),
    specs: []
  },
  {
    id: 'wetrack-lite',
    categoryId: 'gps-trackers',
    subcategoryId: 'vehicle-tracker',
    name: 'Wetrack Lite',
    thumbnail: getImg('wetrack-lite'),
    tagline: same('So Light, It Vanishes. So Smart, It Protects.'),
    description: same('Wetrack Lite is a feather-light, multi-function tracker. Featuring improved accuracy, it is designed specifically to make locating and routing vehicles as simple as possible.'),
    specs: []
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
    specs: [{ label: { tr: 'Boyut', en: 'Size' }, value: { tr: 'Kompakt', en: 'Compact' } }]
  },
  {
    id: 'qbit-m',
    categoryId: 'gps-trackers',
    subcategoryId: 'personal-tracker',
    name: 'Qbit M',
    thumbnail: getImg('qbit-m'),
    tagline: { tr: 'Küçük Boyut, Büyük Performans.', en: 'Byte-sized, big on performance.' },
    description: { tr: 'Yaşlılar ve çocuklar için gelişmiş taşınabilir takip cihazı.', en: 'Advanced portable tracker designed to handle the personal security of the elderly and children.' },
    specs: [{ label: { tr: 'Modül', en: 'Module' }, value: { tr: 'LTE-M & GNSS', en: 'LTE-M & GNSS' } }]
  },
  {
    id: 'pl200',
    categoryId: 'gps-trackers',
    subcategoryId: 'personal-tracker',
    name: 'PL200',
    thumbnail: getImg('pl200'),
    tagline: { tr: 'Artık Sessiz Değil, Her Zaman Odakta', en: 'Silent no more, always in focus' },
    description: { tr: 'Mobil saha iş gücünün güvenliği için IP65 dereceli ve sesli takip çözümü.', en: 'Small and light 4G tracker with IP65 enclosure and two-way voice for lone workers.' },
    specs: [{ label: { tr: 'IP Sınıfı', en: 'IP Rating' }, value: { tr: 'IP65', en: 'IP65' } }]
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
    specs: [{ label: { tr: 'Kullanım', en: 'Usage' }, value: { tr: 'Varlık Takibi', en: 'Asset Tracking' } }]
  },
  {
    id: 'll704',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL704',
    thumbnail: getImg('ll704'),
    tagline: { tr: 'Sonsuz Güç ile Geleceği Kucakla', en: 'Embrace the future with endless power' },
    description: { tr: '3 yılı aşkın bekleme süresine sahip 4G varlık takip cihazı.', en: '4G asset tracking terminal designed for extended use, boasting over 3 years operational lifespan.' },
    specs: [{ label: { tr: 'Pil Ömrü', en: 'Battery Life' }, value: { tr: '3+ Yıl', en: '3+ Years' } }]
  },
  {
    id: 'll702',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL702',
    thumbnail: getImg('ll702'),
    tagline: { tr: 'Varlıklarınızı Kusursuzca Korur.', en: 'Guarding your assets with unparalleled grace.' },
    description: { tr: 'Kolay montaj, 4200mAh batarya ve gizlenebilir boyut ile güçlü izleme.', en: 'Wireless GPS tracker with 4,200mAh battery for over 3 years of operation in default mode.' },
    specs: [{ label: { tr: 'Pil', en: 'Battery' }, value: { tr: '4200mAh', en: '4200mAh' } }]
  },
  {
    id: 'll309',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL309',
    thumbnail: getImg('ll309'),
    tagline: { tr: 'Varlık Korumasında Yeni Bir Çağa Hoş Geldiniz', en: 'Welcome to a New Era of Asset Protection' },
    description: { tr: 'Bozulabilir ürünler için sıcaklık ve nem sensörlü 4G varlık takip cihazı.', en: '4G asset tracker with precise location and built-in temperature/humidity sensors.' },
    specs: [{ label: { tr: 'Bağlantı', en: 'Connectivity' }, value: { tr: '4G & BDS/GPS', en: '4G & BDS/GPS' } }]
  },
  {
    id: 'll01',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL01',
    thumbnail: getImg('ll01'),
    tagline: { tr: 'Sınırların Ötesinde Sessiz Koruma.', en: 'Guarding Beyond Boundaries, Quietly and Endlessly.' },
    description: { tr: 'Güçlü manyetik montajlı, ultra uzun batarya süresine sahip Cat M1/NB-IoT cihaz.', en: 'Cat M1/NB-IoT asset tracker with ultra-long standby time and strong magnetic mount.' },
    specs: [{ label: { tr: 'Ağ', en: 'Network' }, value: { tr: 'Cat M1', en: 'Cat M1' } }]
  },
  {
    id: 'll708',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL708',
    thumbnail: getImg('ll708'),
    tagline: same('Mini in Size, Huge in Impact'),
    description: same('LL708 is a 4G CAT.1 wireless ultra-long-standby positioning terminal that supports GPS, LBS, and BDS multiple positioning. The product is compact in size and widely used in business scenarios such as car rental, financial credit, mortgage loans, and used cars.'),
    specs: []
  },
  {
    id: 'll705',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL705',
    thumbnail: getImg('ll705'),
    tagline: same('4G Wireless Asset Tracker'),
    description: same('The LL705 is a 4G wireless GPS tracker, engineered specifically for monitoring high-value assets such as construction and mining equipment.'),
    specs: []
  },
  {
    id: 'll302',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL302',
    thumbnail: getImg('ll302'),
    tagline: same('Simple in Look, Mighty in Protection'),
    description: same('Designed for vehicle and asset tracking, LL302 is a 4G wireless asset GNSS tracker that supports GPS, BDS, LBS positioning, a light sensor, and multiple alerts for abnormal vibration, low battery, and more.'),
    specs: []
  },
  {
    id: 'll301',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL301',
    thumbnail: getImg('ll301'),
    tagline: same('Stilled Watcher, Silent Protector'),
    description: same('The LL301 is a 4G Cat 1 asset GPS tracker that allows for ultra-long standby time via a 10,000mAh large-capacity battery and durable housing. It supports instant alerts of atypical events like device removal and vibration.'),
    specs: []
  },
  {
    id: 'lg300',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LG300',
    thumbnail: getImg('lg300'),
    tagline: same('Sometimes, 2G says more than 4G'),
    description: same('The LG300 is a 2G wireless tracker designed to handle industrial and commercial applications ranging from rental agencies and fleet management to freight transportation and more.'),
    specs: []
  },
  {
    id: 'll02',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'LL02',
    thumbnail: getImg('ll02'),
    tagline: same('Keep assets visible. For ages.'),
    description: same('The JM-LL02 is a 4G asset GPS tracker device designed for rugged applications. Featuring a large 6,000 mAh battery and a strong magnetic mount, this device is perfect for deployments where long standby time and simple installation are key.'),
    specs: []
  },
  {
    id: 'at4',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'AT4',
    thumbnail: getImg('at4'),
    tagline: same('Unyielding Tracking, Unmatched Security'),
    description: same('The advanced features, rugged construction, and industry-leading battery life make the AT4 the new state of the art in asset GPS tracking. Using GPS and LBS positioning, the magnet-mounted AT4 gives detailed reports telling you exactly where a vehicle has been, where it\'s headed, and how fast it\'s traveling.'),
    specs: []
  },
  {
    id: 'at1',
    categoryId: 'gps-trackers',
    subcategoryId: 'asset-tracker',
    name: 'AT1',
    thumbnail: getImg('at1'),
    tagline: same('Strength in Tracking, Security in Every Moment'),
    description: same('The AT1 is a simple but functional GPS tracker designed for a variety of uses including fleet services, freight operations, high-value asset tracking, and special-needs individuals. A rechargeable 6000mAh internal battery allows for around 25 days of operation.'),
    specs: []
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
    specs: [{ label: { tr: 'Bağlantı Türü', en: 'Port Type' }, value: { tr: 'OBDII', en: 'OBDII' } }]
  },
  {
    id: 'kd031',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'KD031',
    thumbnail: getImg('kd031'),
    tagline: { tr: 'Filonuzun Veri Kalbi', en: 'The Heartbeats of Your Fleets Data' },
    description: { tr: 'SAE J1939 CAN veri okuma destekli, çevre birimleri için güç sağlayan kompakt cihaz.', en: 'Supports CAN data reading with SAE J1939 protocol and provides B+, GND, ACC for peripherals.' },
    specs: [{ label: { tr: 'Protokol', en: 'Protocol' }, value: { tr: 'SAE J1939', en: 'SAE J1939' } }]
  },
  {
    id: 'kd032',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'KD032',
    thumbnail: getImg('kd032'),
    tagline: same('Remarkably Compact, Exceptionally Durable'),
    description: same('The KD032 features a compact design and is plug-and-play. It supports CAN data reading for SAE J1939, J1587, and EOBD protocols, and supports Bluetooth connectivity for transmitting ELD device data.'),
    specs: []
  },
  {
    id: 'vl502',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'VL502',
    thumbnail: getImg('vl502'),
    tagline: { tr: 'Sürüşte Yeni Bir Boyut.', en: 'A New Dimension of Drive.' },
    description: { tr: 'Motor devri, hata kodları ve UBI analizleri için Cat 1 OBDII araç takipçisi.', en: 'New generation of 4G Cat 1 OBDII vehicle tracker that obtains VIN, engine speed, water temp, etc.' },
    specs: [{ label: { tr: 'Ağ', en: 'Network' }, value: { tr: '4G Cat 1', en: '4G Cat 1' } }]
  },
  {
    id: 'vl502-a',
    categoryId: 'gps-trackers',
    subcategoryId: 'can-obd',
    name: 'VL502 (A)',
    thumbnail: getImg('vl502-a'),
    tagline: same('A New Dimension of Drive.'),
    description: same('The VL502 is a new generation of 4G Cat 1 OBDII vehicle tracker for corporate cars, usage-based insurance, fleet management, and individual cars, which can obtain vehicle data such as VIN code, engine speed, water temperature, and accumulated mileage.'),
    specs: []
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
    specs: [{ label: { tr: 'Sensör', en: 'Sensor' }, value: { tr: 'Bio-metrik', en: 'Bio-metric' } }]
  },
  {
    id: 'r002',
    categoryId: 'consumer-product',
    subcategoryId: 'smart-wearables',
    name: 'R002',
    thumbnail: getImg('r002'),
    tagline: { tr: 'Tüm Gün Akıllı Yüzük', en: 'Smart Ring' },
    description: { tr: 'Nabız, stres ve aktivite takibi sunan bütünsel sağlıklı yaşam yüzüğü.', en: 'Designed for holistic wellness, offering features for activity tracking and health management.' },
    specs: [{ label: { tr: 'Sensör', en: 'Sensor' }, value: { tr: 'Stres & Nabız', en: 'Stress & Heart Rate' } }]
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
    specs: [{ label: { tr: 'Görüş', en: 'Field of View' }, value: { tr: '130° Geniş Açı', en: '130° Wide Angle' } }]
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
    specs: [{ label: { tr: 'Hassasiyet', en: 'Accuracy' }, value: { tr: '99.5%', en: '99.5%' } }]
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
    specs: [{ label: { tr: 'Bağlantı', en: 'Connection' }, value: { tr: 'BLE 5.0', en: 'BLE 5.0' } }]
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
    specs: []
  },
  {
    id: 'k7800p',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'K7800P',
    thumbnail: getImg('k7800p'),
    tagline: same('Sense the Environment. Protect What Matters.'),
    description: same('The K7800P is a versatile sensor that uses Bluetooth communication technology to seamlessly interact with a paired mobile device or tracking unit.'),
    specs: []
  },
  {
    id: 'kf201s',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'KF201S',
    thumbnail: getImg('kf201s'),
    tagline: same('Fuel Smarter. Manage Easier.'),
    description: same('This series of fuel level sensors is designed for precise measurement and monitoring of liquids such as gasoline, diesel, lubricating oil, and coolant. It provides a comprehensive solution with high precision, reliability, and durability.'),
    specs: []
  },
  {
    id: 'kf281s',
    categoryId: 'accessories',
    subcategoryId: 'sensors',
    name: 'KF281S',
    thumbnail: getImg('kf281s'),
    tagline: same('Know Your Fuel. Own Your Fleet.'),
    description: same('This series of fuel level sensors is designed for precise measurement and monitoring of liquids such as gasoline, diesel, lubricating oil, and coolant. Whether for vehicle fuel consumption management or industrial tank monitoring, it offers reliable and durable fuel intelligence.'),
    specs: []
  },
  {
    id: 'kc208s',
    categoryId: 'accessories',
    subcategoryId: 'peripherals',
    name: 'KC208S',
    thumbnail: getImg('kc208s'),
    tagline: same('Remote Control'),
    description: same('The KC208S remote control integrates seamlessly with the tracker to manage vehicle operations. Customizable button functions across eight events enhance features such as immobilization, audible vehicle finding, and remote locking.'),
    specs: []
  },
  {
    id: 'jcm0700',
    categoryId: 'accessories',
    subcategoryId: 'peripherals',
    name: 'JCM0700',
    thumbnail: getImg('jcm0700'),
    tagline: same('Display Unit'),
    description: same('The JCM0700 is a display unit designed to work with the JC450 Pro or JC451. It shows real-time footage from connected cameras and can also display time, device status, driving data, and other vehicle information.'),
    specs: []
  },
  {
    id: 'kz081v',
    categoryId: 'accessories',
    subcategoryId: 'cable',
    name: 'KZ081V',
    thumbnail: getImg('kz081v'),
    tagline: same('DC-DC Converter'),
    description: same('KZ081V is a high-efficiency DC-DC converter designed to convert the vehicle\'s 9-33V power input into a stable 5.4V output, ensuring continuous and reliable 24/7 power for connected devices.'),
    specs: []
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
