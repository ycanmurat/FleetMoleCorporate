import type { LucideIcon } from 'lucide-react';
import {
  BadgePercent,
  BookOpenText,
  Briefcase,
  Building2,
  CalendarClock,
  CalendarRange,
  CarFront,
  Cookie,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Handshake,
  Layers3,
  LifeBuoy,
  Lock,
  Megaphone,
  Newspaper,
  Radar,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Truck,
  UserRound,
  Wrench,
} from 'lucide-react';
import type { Locale } from '../config/site';
import { NEWS_ARTICLES, type NewsArticle } from './newsArticles';
import type { ProductSlug } from './products';

type LocalizedText = Record<Locale, string>;

export type ContentSectionId = 'services' | 'leasing' | 'resources' | 'corporate' | 'legal';

export interface ContentPageItem {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  highlights: Record<Locale, string[]>;
  icon: LucideIcon;
  relatedProducts?: ProductSlug[];
  navHidden?: boolean;
  newsArticle?: NewsArticle;
}

export interface ContentSection {
  id: ContentSectionId;
  label: LocalizedText;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  accent: string;
  icon: LucideIcon;
  items: ContentPageItem[];
}

const services: ContentSection = {
  id: 'services',
  label: {
    tr: 'Hizmetlerimiz',
    en: 'Services',
  },
  eyebrow: {
    tr: 'Operasyon Servisleri',
    en: 'Operational Services',
  },
  title: {
    tr: 'Sahadaki her iş akışını daha kontrollü hale getiren servis katmanları.',
    en: 'Service layers that make every field workflow more controlled.',
  },
  description: {
    tr: 'FleetMole servis başlıkları; bakım, hasar, ikame, eğitim ve tedarik zinciri süreçlerini tek operasyon omurgasına bağlamak için kurgulandı.',
    en: 'FleetMole service lines are designed to connect maintenance, damage, replacement, training, and supplier workflows to one operating backbone.',
  },
  accent: '#20ABE3',
  icon: Briefcase,
  items: [
    {
      slug: 'hasar-yonetimi',
      title: { tr: 'Hasar Yönetimi', en: 'Damage Management' },
      description: {
        tr: 'Hasar bildiriminden onarım kararına kadar tüm süreci görünür, hızlı ve raporlanabilir bir düzene taşır.',
        en: 'Turns the full damage process, from first notice to repair decision, into a visible and reportable flow.',
      },
      highlights: {
        tr: [
          'Dosya, fotoğraf ve ekspertiz akışını tek yerde toplar',
          'Onarım, değer kaybı ve rücu aşamalarını aynı senaryoda izler',
          'Maliyet ve servis performansını yönetim seviyesinde görünür kılar',
        ],
        en: [
          'Brings files, photos, and inspection records into one stream',
          'Tracks repair, depreciation, and recovery steps in one scenario',
          'Makes cost and service performance visible at management level',
        ],
      },
      icon: ShieldAlert,
      relatedProducts: ['smart', 'manager'],
    },
    {
      slug: 'mekanik-bakim-yonetimi',
      title: { tr: 'Mekanik / Bakım Yönetimi', en: 'Mechanical / Maintenance Management' },
      description: {
        tr: 'Periyodik bakım, arıza ve iş emri planlarını merkezi kurallar altında düzenler.',
        en: 'Organizes scheduled maintenance, breakdowns, and work-order plans under central rules.',
      },
      highlights: {
        tr: [
          'Bakım takvimi ve kilometre tetiklerini otomatik yönetir',
          'Servis yönlendirmelerini SLA ve onay kurallarıyla standardize eder',
          'Bakım maliyetlerini araç ve tedarikçi bazında izler',
        ],
        en: [
          'Automates service intervals and mileage-based triggers',
          'Standardizes workshop routing through SLA and approval rules',
          'Tracks maintenance costs by vehicle and supplier',
        ],
      },
      icon: Wrench,
      relatedProducts: ['manager', 'partner'],
    },
    {
      slug: 'lastik-yonetimi',
      title: { tr: 'Lastik Yönetimi', en: 'Tyre Management' },
      description: {
        tr: 'Lastik yaşam döngüsünü montaj, rotasyon, stok ve otel süreçleriyle birlikte yönetir.',
        en: 'Manages the tyre lifecycle together with fitting, rotation, stock, and storage workflows.',
      },
      highlights: {
        tr: [
          'Mevsimsel değişim ve otel planını araç bazında izler',
          'Aşınma, ömür ve stok görünürlüğünü tek veri akışında toplar',
          'Tedarik ve saha operasyonu arasındaki koordinasyonu sadeleştirir',
        ],
        en: [
          'Tracks seasonal changes and storage plans per vehicle',
          'Combines wear, lifecycle, and stock visibility in one flow',
          'Simplifies coordination between supply and field operations',
        ],
      },
      icon: Radar,
      relatedProducts: ['tyre'],
    },
    {
      slug: 'tedarikci-lojistik-yonetimi',
      title: { tr: 'Tedarikçi Lojistik Yönetimi', en: 'Supplier Logistics Management' },
      description: {
        tr: 'Servis ve tedarik ağının kapasite, bölge, kontrat ve kalite standardını yönetilebilir kılar.',
        en: 'Makes supplier and service capacity, regional coverage, contracts, and quality standards manageable.',
      },
      highlights: {
        tr: [
          'Bölgesel fiyat ve hizmet kapsamını karşılaştırılabilir hale getirir',
          'İş emri ve yönlendirme kararlarını veriyle destekler',
          'Tedarikçi performansını puanlayarak kaliteyi görünür kılar',
        ],
        en: [
          'Makes regional pricing and service scope comparable',
          'Supports routing and work-order decisions with data',
          'Measures supplier quality through scoring and control',
        ],
      },
      icon: Truck,
      relatedProducts: ['partner'],
    },
    {
      slug: 'ikame-arac-yonetimi',
      title: { tr: 'İkame Araç Yönetimi', en: 'Replacement Vehicle Management' },
      description: {
        tr: 'Hasar, bakım veya arıza anında mobilite sürekliliğini kesintisiz sürdürmek için hızlı eşleştirme sunar.',
        en: 'Provides fast matching to preserve mobility continuity during damage, maintenance, or breakdown events.',
      },
      highlights: {
        tr: [
          'Talep, yönlendirme ve teslim sürecini tek akışta izler',
          'Lokasyon ve tedarikçi kapasitesine göre en uygun aracı eşler',
          'Operasyon ekiplerinin telefon ve e-posta trafiğini azaltır',
        ],
        en: [
          'Tracks request, dispatch, and delivery in one flow',
          'Matches the best-fit vehicle by location and supplier capacity',
          'Reduces manual phone and email traffic for operations teams',
        ],
      },
      icon: CarFront,
      relatedProducts: ['rent', 'manager'],
    },
    {
      slug: 'deger-kaybi-yonetimi',
      title: { tr: 'Değer Kaybı Yönetimi', en: 'Depreciation Loss Management' },
      description: {
        tr: 'Kaza sonrası değer kaybı dosyalarını finansal görünürlükle birlikte yapılandırır.',
        en: 'Structures post-accident depreciation cases together with financial visibility.',
      },
      highlights: {
        tr: [
          'Dosya, belge ve ekspertiz akışlarını standartlaştırır',
          'Tahsilat ve karşılık sürecini yönetim raporlarına bağlar',
          'Hasar süreçlerini ticari karar katmanıyla ilişkilendirir',
        ],
        en: [
          'Standardizes case, document, and inspection workflows',
          'Connects collection and reserve handling to reporting',
          'Links damage events with commercial decision layers',
        ],
      },
      icon: BadgePercent,
      relatedProducts: ['trader', 'smart'],
    },
    {
      slug: 'rucu-yonetimi',
      title: { tr: 'Rücu Yönetimi', en: 'Recovery Management' },
      description: {
        tr: 'Sorumluluk, tahsilat ve dosya takip süreçlerini tek bir kontrol çizgisine alır.',
        en: 'Brings responsibility, collection, and case tracking into one controlled line.',
      },
      highlights: {
        tr: [
          'Rücu dosyalarını tarih, statü ve aksiyon bazında izler',
          'Belge ve iletişim akışını merkezi görünürlükte toplar',
          'Tahsilat performansını operasyon ve finans ekipleri için görünür kılar',
        ],
        en: [
          'Tracks recovery files by date, status, and action',
          'Centralizes documents and communication history',
          'Makes collection performance visible for operations and finance',
        ],
      },
      icon: Scale,
      relatedProducts: ['manager', 'smart'],
    },
    {
      slug: 'asistans-hizmetleri',
      title: { tr: 'Asistans Hizmetleri', en: 'Assistance Services' },
      description: {
        tr: 'Yol yardımı ve acil destek süreçlerini daha kontrollü ve izlenebilir bir servis planına dönüştürür.',
        en: 'Turns roadside assistance and urgent support into a more controlled and traceable service plan.',
      },
      highlights: {
        tr: [
          'Çağrı, yönlendirme ve çözüm sürecini tek kayıt altında toplar',
          'Operasyon ve tedarikçi ekipleri arasında net görev akışı kurar',
          'Müşteri deneyimini hız ve şeffaflık üzerinden iyileştirir',
        ],
        en: [
          'Combines call, dispatch, and resolution into one record',
          'Creates a clear task flow between operations and suppliers',
          'Improves customer experience through speed and transparency',
        ],
      },
      icon: LifeBuoy,
      relatedProducts: ['partner', 'tracker'],
    },
    {
      slug: 'guvenli-surus-egitimi',
      title: { tr: 'Güvenli Sürüş Eğitimi', en: 'Safe Driving Training' },
      description: {
        tr: 'Sürüş davranışını eğitim ihtiyaçlarıyla eşleştirerek risk azaltıcı aksiyon planları oluşturur.',
        en: 'Matches driving behavior with training needs to build risk-reduction action plans.',
      },
      highlights: {
        tr: [
          'Riskli sürüş alışkanlıklarını skor ve olay bazında görünür kılar',
          'Saha ekipleri için ölçülebilir eğitim planları üretir',
          'Kazaları ve operasyon dışı maliyetleri azaltmaya yardımcı olur',
        ],
        en: [
          'Makes risky driving habits visible through scores and incidents',
          'Builds measurable training plans for field teams',
          'Helps reduce accidents and off-plan operating costs',
        ],
      },
      icon: GraduationCap,
      relatedProducts: ['tracker'],
    },
    {
      slug: 'arac-takip-ve-raporlama',
      title: { tr: 'Araç Takip ve Raporlama', en: 'Vehicle Tracking and Reporting' },
      description: {
        tr: 'Canlı konum, uyarı, kullanım ve sürüş verilerini karar destek raporlarına bağlar.',
        en: 'Connects live location, alerts, usage, and driving data to decision-support reporting.',
      },
      highlights: {
        tr: [
          'Araç hareketlerini ve saha aktivitesini gerçek zamanlı izler',
          'Alarm ve olay yönetimini raporlanabilir hale getirir',
          'Veriyi sadece izlemek yerine operasyon kararına dönüştürür',
        ],
        en: [
          'Tracks vehicle movement and field activity in real time',
          'Makes alarms and incidents reportable and actionable',
          'Turns live telemetry into operational decisions rather than passive monitoring',
        ],
      },
      icon: Radar,
      relatedProducts: ['tracker'],
    },
  ],
};

const leasing: ContentSection = {
  id: 'leasing',
  label: {
    tr: 'Kiralama Çözümleri',
    en: 'Leasing Solutions',
  },
  eyebrow: {
    tr: 'Kiralama Akışı',
    en: 'Leasing Flow',
  },
  title: {
    tr: 'Teklif, ihale ve kiralama operasyonlarını daha şeffaf bir yapıya taşıyın.',
    en: 'Move quoting, tendering, and leasing operations into a more transparent structure.',
  },
  description: {
    tr: 'FleetMole kiralama katmanı; uzun dönem, kısa dönem ve kurumsal kiralama senaryolarını aynı dijital omurga üzerinde karşılaştırılabilir hale getirir.',
    en: 'The FleetMole leasing layer makes long-term, short-term, and corporate rental scenarios comparable on the same digital backbone.',
  },
  accent: '#203A74',
  icon: CarFront,
  items: [
    {
      slug: 'avantajlar',
      title: { tr: 'Avantajlar', en: 'Advantages' },
      description: {
        tr: 'Kiralama modelinin vergi, bakım, risk ve nakit akışı yönünden kurumsal faydasını görünür kılar.',
        en: 'Makes the tax, maintenance, risk, and cash-flow advantages of leasing easier to evaluate.',
      },
      highlights: {
        tr: [
          'Toplam sahip olma maliyeti yerine operasyonel esnekliğe odaklanır',
          'İkinci el ve bakım riskini tedarikçiye devretmeye yardımcı olur',
          'Bütçe planlamasını sabit, öngörülebilir gider yapısına taşır',
        ],
        en: [
          'Shifts the focus from ownership to operational flexibility',
          'Helps move maintenance and resale risk to the supplier side',
          'Supports budgeting through predictable periodic cost structures',
        ],
      },
      icon: Sparkles,
      relatedProducts: ['rent', 'trader'],
    },
    {
      slug: 'e-ihale-teklif',
      title: { tr: 'E-İhale&Teklif', en: 'E-Tender & Quotes' },
      description: {
        tr: 'Çoklu teklif toplama ve online ihale akışını dijitalleştirerek satın alma hızını artırır.',
        en: 'Digitizes multi-quote collection and online tender flows to speed up sourcing.',
      },
      highlights: {
        tr: [
          'Şartname, teklif ve karşılaştırma adımlarını tek ekranda toplar',
          'Tedarikçileri fiyat, hizmet ve lokasyon bazında karşılaştırır',
          'Manuel takip yerine izlenebilir ve denetlenebilir ihale kurgusu kurar',
        ],
        en: [
          'Brings specification, quote, and comparison steps into one screen',
          'Compares suppliers by price, service, and location',
          'Replaces manual follow-up with a trackable and auditable tender model',
        ],
      },
      icon: FileSpreadsheet,
      relatedProducts: ['rent'],
    },
    {
      slug: 'uzun-donem-arac-kiralama',
      title: { tr: 'Uzun Dönem Araç Kiralama', en: 'Long-Term Vehicle Leasing' },
      description: {
        tr: '24 ila 47 ay arası senaryolar için hizmet kapsamı, kilometre ve maliyet dengesini planlar.',
        en: 'Plans service scope, mileage, and cost balance for 24 to 47 month scenarios.',
      },
      highlights: {
        tr: [
          'Araç seçimi ile sözleşme yapısını aynı değerlendirme katmanında buluşturur',
          'Yıllık kilometre ve kullanım modeline göre daha doğru kapsam üretir',
          'Kurumsal filolar için ölçeklenebilir tedarik yapısı kurar',
        ],
        en: [
          'Evaluates vehicle choice and contract setup in the same layer',
          'Improves scope definition based on annual mileage and usage patterns',
          'Builds a scalable supplier structure for enterprise fleets',
        ],
      },
      icon: CalendarRange,
      relatedProducts: ['rent', 'manager'],
    },
    {
      slug: 'kisa-donem-arac-kiralama',
      title: { tr: 'Kısa Dönem Araç Kiralama', en: 'Short-Term Vehicle Leasing' },
      description: {
        tr: 'Anlık ihtiyaçlarda hızlı tedariği ve operasyon sürekliliğini destekleyen çevik bir kiralama akışı sunar.',
        en: 'Offers an agile rental flow that supports rapid sourcing and operational continuity for immediate needs.',
      },
      highlights: {
        tr: [
          'Lokasyon bazlı erişilebilir tedarikçileri hızla öne çıkarır',
          'Teslim, iade ve rezervasyon akışını sadeleştirir',
          'Pik dönemlerde filo yükünü esnek şekilde yönetmeye yardımcı olur',
        ],
        en: [
          'Surfaces accessible suppliers quickly based on location',
          'Simplifies reservation, delivery, and return processes',
          'Helps manage fleet load flexibly during peak periods',
        ],
      },
      icon: CalendarClock,
      relatedProducts: ['rent'],
    },
    {
      slug: 'bireysel-arac-kiralama',
      title: { tr: 'Bireysel Araç Kiralama', en: 'Individual Vehicle Leasing' },
      description: {
        tr: 'Kısa ve orta vadeli bireysel ihtiyaçları karşılaştırmalı teklif mantığıyla daha şeffaf hale getirir.',
        en: 'Makes short and medium-term individual rental needs more transparent through comparative quotes.',
      },
      highlights: {
        tr: [
          'Kullanım süresine göre en uygun kiralama modelini öne çıkarır',
          'Fiyat ve hizmet kapsamını karşılaştırılabilir hale getirir',
          'Dijital başvuru ve hızlı yönlendirme akışı sunar',
        ],
        en: [
          'Highlights the best-fit model by rental duration',
          'Makes price and service scope easier to compare',
          'Provides a digital application and rapid routing flow',
        ],
      },
      icon: UserRound,
      relatedProducts: ['rent'],
    },
    {
      slug: 'kurumsal-arac-kiralama',
      title: { tr: 'Kurumsal Araç Kiralama', en: 'Corporate Vehicle Leasing' },
      description: {
        tr: 'Kurumsal filo taleplerini ölçek, hizmet standardı ve ticari verimlilik açısından yapılandırır.',
        en: 'Structures enterprise fleet requests around scale, service standards, and commercial efficiency.',
      },
      highlights: {
        tr: [
          'Kurumsal satın alma ekipleri için denetlenebilir teklif süreci oluşturur',
          'Sözleşme ve hizmet koşullarını şeffaf karşılaştırma zemini sunar',
          'Tek araçtan yüzlerce araca kadar aynı dijital akışta çalışır',
        ],
        en: [
          'Creates an auditable sourcing flow for procurement teams',
          'Offers a clear comparison layer for contract and service terms',
          'Supports the same digital flow from small requests to large fleets',
        ],
      },
      icon: Building2,
      relatedProducts: ['rent', 'trader'],
    },
  ],
};

const resources: ContentSection = {
  id: 'resources',
  label: {
    tr: 'Haberler',
    en: 'Resources',
  },
  eyebrow: {
    tr: 'İçerik Akışı',
    en: 'Content Flow',
  },
  title: {
    tr: 'Sektör gündemini, kampanyaları ve karar verdiren başlıkları takip edin.',
    en: 'Follow sector updates, campaigns, and the topics that shape decisions.',
  },
  description: {
    tr: 'FleetMole içerik alanı; filo yönetimi, kiralama ve mobilite kararlarını besleyen haber ve kampanya katmanını taşır.',
    en: 'The FleetMole content layer carries news and campaigns that support fleet, leasing, and mobility decisions.',
  },
  accent: '#20ABE3',
  icon: Newspaper,
  items: [
    {
      slug: 'otomobil-haberleri',
      title: { tr: 'Otomobil Haberleri', en: 'Automotive News' },
      description: {
        tr: 'Mevzuat, araç pazarı ve filo yönetimini etkileyen sektörel gelişmeleri özetler.',
        en: 'Summarizes the sector developments that affect regulation, the vehicle market, and fleet operations.',
      },
      highlights: {
        tr: [
          'Karar vericiler için haberleri iş etkisiyle birlikte okur',
          'Kiralama, maliyet ve uyumluluk başlıklarını öne çıkarır',
          'Pazar değişimlerini operasyon bakışıyla yorumlar',
        ],
        en: [
          'Frames news through its business impact for decision-makers',
          'Highlights leasing, cost, and compliance angles',
          'Interprets market shifts from an operational perspective',
        ],
      },
      icon: Newspaper,
      relatedProducts: ['trader'],
    },
    {
      slug: 'kampanyalar',
      title: { tr: 'Kampanyalar', en: 'Campaigns' },
      description: {
        tr: 'Kiralama ve ek hizmet tarafındaki fırsatları görünür kılan güncel teklif alanıdır.',
        en: 'A current offer area that makes leasing and service-side opportunities visible.',
      },
      highlights: {
        tr: [
          'Dönemsel fiyat ve hizmet avantajlarını tek yerde toplar',
          'Kampanya dilini kurumsal ihtiyaçla birlikte konumlandırır',
          'Satış ekibiyle görüşmeden önce ön değerlendirme zemini sunar',
        ],
        en: [
          'Brings seasonal pricing and service opportunities into one place',
          'Frames campaign messaging around enterprise needs',
          'Creates a clear first-look layer before speaking with sales',
        ],
      },
      icon: Megaphone,
      relatedProducts: ['rent'],
    },
    ...NEWS_ARTICLES.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      highlights: article.highlights,
      icon: Newspaper,
      relatedProducts: article.relatedProducts,
      navHidden: true,
      newsArticle: article,
    })),
  ],
};

const corporate: ContentSection = {
  id: 'corporate',
  label: {
    tr: 'Kurumsal',
    en: 'Corporate',
  },
  eyebrow: {
    tr: 'Kurumsal İçerik',
    en: 'Corporate Content',
  },
  title: {
    tr: 'Kurumsal yaklaşımı, kalite politikalarını ve iş ortaklığı modelini tek yerde toplayın.',
    en: 'Gather the corporate approach, policy documents, and partner model in one place.',
  },
  description: {
    tr: 'Kurumsal sayfalar; markanın yaklaşımını, standartlarını ve iş birliği modelini netleştiren temel başlıkları içerir.',
    en: 'Corporate pages contain the core subjects that clarify the brand approach, standards, and collaboration model.',
  },
  accent: '#0F172A',
  icon: Building2,
  items: [
    {
      slug: 'avantajlar',
      title: { tr: 'Avantajlar', en: 'Advantages' },
      description: {
        tr: 'FleetMole yaklaşımının operasyonel görünürlük, hız ve karar desteği açısından sağladığı temel faydaları özetler.',
        en: 'Summarizes the main benefits of the FleetMole approach in visibility, speed, and decision support.',
      },
      highlights: {
        tr: [
          'Aynı veriyle çalışan ekipler arasında sürtünmeyi azaltır',
          'Operasyonun kritik anlarında daha hızlı aksiyon alınmasını sağlar',
          'Kurumsal ölçekte izlenebilir ve raporlanabilir süreç yapısı kurar',
        ],
        en: [
          'Reduces friction between teams working on the same data',
          'Enables faster action during critical operational moments',
          'Creates traceable and reportable processes at enterprise scale',
        ],
      },
      icon: Sparkles,
      relatedProducts: ['manager', 'rent'],
    },
    {
      slug: 'hakkimizda',
      title: { tr: 'Hakkımızda', en: 'About Us' },
      description: {
        tr: 'FleetMole’un filo, kiralama ve operasyon süreçlerini tek bir dijital omurgada birleştirme yaklaşımını anlatır.',
        en: 'Explains FleetMole’s approach to bringing fleet, leasing, and operations into one digital backbone.',
      },
      highlights: {
        tr: [
          'Karmaşık iş akışlarını sadeleştiren ürün yaklaşımını açıklar',
          'Kurumsal ekipler ile tedarik ağını aynı platform mantığında buluşturur',
          'Veri odaklı karar kültürünü operasyonun merkezine taşır',
        ],
        en: [
          'Explains the product mindset that simplifies complex workflows',
          'Brings enterprise teams and supplier networks into one operating model',
          'Places data-driven decision making at the center of operations',
        ],
      },
      icon: BookOpenText,
      relatedProducts: ['manager'],
    },
    {
      slug: 'eys-politikamiz',
      title: { tr: 'EYS Politikamız', en: 'IMS Policy' },
      description: {
        tr: 'Entegre yönetim yaklaşımını, kalite ve sürdürülebilirlik odağını kurumsal bir çerçevede sunar.',
        en: 'Presents the integrated management approach and the quality and sustainability focus in a corporate framework.',
      },
      highlights: {
        tr: [
          'Süreç standardizasyonu ve sürekli iyileştirme kültürünü destekler',
          'Uyumluluk, kalite ve hizmet seviyesini aynı yönetişim çizgisinde toplar',
          'Kurumsal iş ortaklıkları için güven veren bir çerçeve oluşturur',
        ],
        en: [
          'Supports process standardization and continuous improvement',
          'Aligns compliance, quality, and service levels on one governance line',
          'Creates a confidence-building framework for enterprise partnerships',
        ],
      },
      icon: ShieldCheck,
      relatedProducts: ['partner'],
    },
    {
      slug: 'tedarikci-ol',
      title: { tr: 'Tedarikçi Ol', en: 'Become a Supplier' },
      description: {
        tr: 'FleetMole ekosistemine katılmak isteyen servis ve tedarikçiler için iş birliği çerçevesini tanımlar.',
        en: 'Defines the collaboration framework for service and supplier organizations that want to join the FleetMole ecosystem.',
      },
      highlights: {
        tr: [
          'Başvuru, değerlendirme ve entegrasyon sürecini netleştirir',
          'Hizmet standardı, kapasite ve performans beklentilerini açıklar',
          'Kurumsal taleplere erişim için ölçeklenebilir bir iş ortaklığı modeli sunar',
        ],
        en: [
          'Clarifies the application, evaluation, and onboarding flow',
          'Explains service, capacity, and performance expectations',
          'Provides a scalable partner model for enterprise demand access',
        ],
      },
      icon: Handshake,
      relatedProducts: ['partner', 'rent'],
    },
  ],
};

const legal: ContentSection = {
  id: 'legal',
  label: {
    tr: 'Yasal',
    en: 'Legal',
  },
  eyebrow: {
    tr: 'Yasal İçerik',
    en: 'Legal Content',
  },
  title: {
    tr: 'Kullanım, gizlilik ve veri işleme çerçevesi.',
    en: 'Usage, privacy, and data processing framework.',
  },
  description: {
    tr: 'Yasal içerikler; kullanıcı haklarını, veri işleme yaklaşımını ve dış sağlayıcı kapsamını daha açık hale getirmek için hazırlanmıştır.',
    en: 'Legal content is prepared to clarify user rights, data handling, and third-party provider scope.',
  },
  accent: '#334155',
  icon: FileText,
  items: [
    {
      slug: 'kullanim-sartlari',
      title: { tr: 'Kullanım Şartları', en: 'Terms of Use' },
      description: {
        tr: 'Platform kullanım çerçevesini, temel sorumlulukları ve hizmet kapsamını özetler.',
        en: 'Summarizes the platform usage framework, core responsibilities, and service scope.',
      },
      highlights: {
        tr: [
          'Kullanıcı ve platform ilişkisini temel kurallarla tanımlar',
          'Hizmet kapsamı ve sınırlarını sade bir dille çerçeveler',
          'Kurumsal kullanımda beklentileri şeffaflaştırır',
        ],
        en: [
          'Defines the user-platform relationship through core rules',
          'Frames service scope and limits in a clear way',
          'Clarifies expectations for enterprise usage',
        ],
      },
      icon: FileText,
    },
    {
      slug: 'cerez-politikasi',
      title: { tr: 'Çerez Politikası', en: 'Cookie Policy' },
      description: {
        tr: 'Site deneyimini geliştirmek için kullanılan çerez mantığını ve tercih yaklaşımını açıklar.',
        en: 'Explains the cookie logic and preference approach used to improve the site experience.',
      },
      highlights: {
        tr: [
          'Çerezlerin hangi amaçlarla kullanıldığını özetler',
          'Ziyaretçi tercihleri ve deneyim yönetimi yaklaşımını açıklar',
          'Gizlilik ve şeffaflık beklentisini destekler',
        ],
        en: [
          'Summarizes the purposes for which cookies are used',
          'Explains the preference and experience management approach',
          'Supports privacy and transparency expectations',
        ],
      },
      icon: Cookie,
    },
    {
      slug: 'gizlilik-politikasi',
      title: {
        tr: 'Kişisel Verilerin Korunmasına Yönelik Aydınlatma ve Gizlilik Politikası',
        en: 'Privacy Notice and Personal Data Protection Policy',
      },
      description: {
        tr: 'Kişisel veri işleme yaklaşımını, saklama mantığını ve kullanıcı haklarını açıklar.',
        en: 'Explains the personal data processing approach, storage logic, and user rights.',
      },
      highlights: {
        tr: [
          'Veri işleme kapsamını ve kullanım amaçlarını netleştirir',
          'Saklama, erişim ve hak kullanımı başlıklarını görünür kılar',
          'Kurumsal güven için şeffaf bir aydınlatma zemini sunar',
        ],
        en: [
          'Clarifies processing scope and usage purposes',
          'Makes storage, access, and rights-related topics visible',
          'Creates a transparent basis for enterprise trust',
        ],
      },
      icon: Lock,
    },
    {
      slug: 'dis-saglayici-gizlilik-politikasi',
      title: {
        tr: 'Dış Sağlayıcı Aydınlatma Metni ve Gizlilik Politikası',
        en: 'Third-Party Provider Notice and Privacy Policy',
      },
      description: {
        tr: 'Harici servis sağlayıcılarla olan veri işleme ve paylaşım sınırlarını tanımlar.',
        en: 'Defines the limits of data processing and sharing with external providers.',
      },
      highlights: {
        tr: [
          'Dış sağlayıcı kullanımında sorumluluk sınırlarını açıklar',
          'Veri paylaşımı ve güvenlik çerçevesini görünür kılar',
          'Uyumluluk gereksinimleri için net bir referans oluşturur',
        ],
        en: [
          'Explains responsibility boundaries in external provider use',
          'Makes data sharing and security framing visible',
          'Creates a clear reference point for compliance requirements',
        ],
      },
      icon: FileText,
    },
  ],
};

export const CONTENT_SECTIONS = [services, leasing, resources, corporate, legal] as const;

export const CONTENT_SECTION_MAP = Object.fromEntries(
  CONTENT_SECTIONS.map((section) => [section.id, section]),
) as Record<ContentSectionId, ContentSection>;

export const PRODUCT_MENU_META = {
  label: {
    tr: 'Ürünler',
    en: 'Products',
  },
  eyebrow: {
    tr: 'Ürün Ekosistemi',
    en: 'Product Ecosystem',
  },
  title: {
    tr: 'Yedi uzman ürün, tek operasyon omurgası.',
    en: 'Seven specialized products, one operating backbone.',
  },
  description: {
    tr: 'FleetMole ürünleri; filo yönetimi, kiralama, tedarikçi ağı, telematik, Smart karar katmanı ve ticari karar süreçlerini birbirine bağlar.',
    en: 'FleetMole products connect fleet management, leasing, supplier networks, telematics, Smart, and commercial decision workflows.',
  },
  accent: '#203A74',
  icon: Layers3,
} as const;

export const TOP_NAV_ORDER = [
  'products',
  'services',
  'leasing',
  'resources',
] as const;

export const FOOTER_CORPORATE_LINKS = [
  { section: 'corporate', slug: 'avantajlar' },
  { section: 'corporate', slug: 'hakkimizda' },
  { section: 'corporate', slug: 'eys-politikamiz' },
] as const satisfies readonly { section: ContentSectionId; slug: string }[];

export const FOOTER_FEATURE_LINKS = [
  { section: 'corporate', slug: 'tedarikci-ol' },
  { section: 'leasing', slug: 'e-ihale-teklif' },
  { section: 'leasing', slug: 'uzun-donem-arac-kiralama' },
  { section: 'leasing', slug: 'kisa-donem-arac-kiralama' },
  { section: 'leasing', slug: 'bireysel-arac-kiralama' },
  { section: 'leasing', slug: 'kurumsal-arac-kiralama' },
] as const satisfies readonly { section: ContentSectionId; slug: string }[];

export const FOOTER_LEGAL_LINKS = [
  { section: 'legal', slug: 'kullanim-sartlari' },
  { section: 'legal', slug: 'cerez-politikasi' },
  { section: 'legal', slug: 'gizlilik-politikasi' },
  { section: 'legal', slug: 'dis-saglayici-gizlilik-politikasi' },
] as const satisfies readonly { section: ContentSectionId; slug: string }[];

export const getContentPath = (section: ContentSectionId, slug: string) => {
  switch (section) {
    case 'services':
      return `/services/${slug}`;
    case 'leasing':
      return `/leasing/${slug}`;
    case 'resources':
      return `/resources/${slug}`;
    case 'corporate':
      return `/corporate/${slug}`;
    case 'legal':
      return `/legal/${slug}`;
  }
};

export const getContentPage = (section: ContentSectionId, slug?: string) =>
  slug ? CONTENT_SECTION_MAP[section].items.find((item) => item.slug === slug) : undefined;

export const getVisibleContentItems = (section: ContentSectionId) =>
  CONTENT_SECTION_MAP[section].items.filter((item) => !item.navHidden);
