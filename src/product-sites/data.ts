import type { Locale } from '../config/site';
import type { ProductSlug } from '../data/products';

type LocalizedText = Record<Locale, string>;
type LocalizedTitle = Record<Locale, [string, string, string]>;

export interface ProductSiteMetric {
  value: string;
  label: LocalizedText;
}

export interface ProductSiteMenuItem {
  label: LocalizedText;
  href: string;
}

export interface ProductSiteCard {
  title: LocalizedText;
  body: LocalizedText;
  badge?: LocalizedText;
}

export interface ProductSiteSection {
  eyebrow: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  cards: ProductSiteCard[];
}

export interface ProductSiteContactContent {
  chip: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  response: LocalizedText;
  reasonsTitle: LocalizedText;
  reasons: LocalizedText[];
  topicsTitle: LocalizedText;
  topics: ProductSiteCard[];
}

export interface ProductSiteContent {
  menu: ProductSiteMenuItem[];
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedTitle;
    lead: LocalizedText;
    primaryCta: LocalizedText;
    secondaryCta: LocalizedText;
    snapshotLabel: LocalizedText;
    snapshotBody: LocalizedText;
    snapshotItems: ProductSiteMetric[];
  };
  modules: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    body: LocalizedText;
  };
  overview: ProductSiteSection;
  workflow?: ProductSiteSection;
  impact?: ProductSiteSection;
  contact: ProductSiteContactContent;
}

const t = (tr: string, en: string): LocalizedText => ({ tr, en });

const lines = (
  tr: [string, string, string],
  en: [string, string, string],
): LocalizedTitle => ({ tr, en });

const metric = (value: string, tr: string, en: string): ProductSiteMetric => ({
  value,
  label: t(tr, en),
});

const menu = (tr: string, en: string, href: string): ProductSiteMenuItem => ({
  label: t(tr, en),
  href,
});

const card = (
  trTitle: string,
  enTitle: string,
  trBody: string,
  enBody: string,
  badge?: LocalizedText,
): ProductSiteCard => ({
  title: t(trTitle, enTitle),
  body: t(trBody, enBody),
  ...(badge ? { badge } : {}),
});

export const PRODUCT_SITE_CONTENT: Record<ProductSlug, ProductSiteContent> = {
  manager: {
    menu: [
      menu('Operasyon Merkezi', 'Control Layer', '#overview'),
      menu('Modüller', 'Modules', '#modules'),
      menu('İş Akışı', 'Workflow', '#workflow'),
      menu('Yönetim Etkisi', 'Management Impact', '#impact'),
      menu('İletişim', 'Contact', '/contact'),
    ],
    hero: {
      eyebrow: t('Merkezi filo işletim sistemi', 'Central fleet operating system'),
      title: lines(
        ['Filo Operasyonunu', 'Tek Komuta', 'Katmanında Toplayın'],
        ['Bring Fleet Operations', 'Into One', 'Command Layer'],
      ),
      lead: t(
        'FleetMole Manager; araç, sürücü, sözleşme, bakım ve maliyet akışlarını tek panelde birleştirerek operasyon ekiplerine görünürlük ve hız kazandırır.',
        'FleetMole Manager unifies vehicles, drivers, contracts, maintenance, and cost workflows in one interface to give operations teams visibility and speed.',
      ),
      primaryCta: t('Ürün Sunumu Planla', 'Plan a Product Walkthrough'),
      secondaryCta: t('Operasyon Yapısını Gör', 'See the Operating Structure'),
      snapshotLabel: t('Operasyon snapshot', 'Operational snapshot'),
      snapshotBody: t(
        'Rol bazlı yetki, otomatik tetikleyiciler ve yönetim seviyesi raporlama aynı veri omurgasında çalışır.',
        'Role-based permissions, automated triggers, and management reporting run on the same operating backbone.',
      ),
      snapshotItems: [
        metric('360°', 'Araç ve sözleşme görünürlüğü', 'Vehicle and contract visibility'),
        metric('SLA', 'Bakım ve servis disiplinleri', 'Maintenance and service disciplines'),
        metric('API', 'Kurumsal sistem entegrasyonu', 'Enterprise system integrations'),
      ],
    },
    modules: {
      eyebrow: t('Operasyon modülleri', 'Operational modules'),
      title: t('Günlük filo yönetimini taşıyan ana katmanlar.', 'The core layers that carry day-to-day fleet management.'),
      body: t(
        'Manager ana ekranı; operasyon masasından yönetim raporlamasına kadar aynı veri modelini kullanan modüllerle ilerler.',
        'The Manager workspace moves from operations desk to executive reporting through modules that share one data model.',
      ),
    },
    overview: {
      eyebrow: t('Ne çözüyor?', 'What it solves'),
      title: t('Dağınık operasyonu tek ritimde yönetecek bir merkez oluşturur.', 'Creates a center that runs fragmented operations in one rhythm.'),
      body: t(
        'Saha ve merkez ekipleri farklı ekranlar yerine ortak durum bilgisinde çalışır; bu da bekleme, tekrar ve iletişim maliyetini düşürür.',
        'Field and headquarters teams work on shared state instead of fragmented screens, reducing waiting time, repetition, and communication overhead.',
      ),
      cards: [
        card(
          'Araç ve sözleşme kontrolü',
          'Vehicle and contract control',
          'Envanter, sözleşme tarihi, kilometre ve sorumluluk bilgileri tek operasyon görünümünde birleşir.',
          'Inventory, contract milestones, mileage, and ownership data come together in one operational view.',
          t('Kontrol', 'Control'),
        ),
        card(
          'Bakım ve servis koordinasyonu',
          'Maintenance and service coordination',
          'Periyodik bakım, arıza ve hasar senaryoları aynı planlama mantığıyla ilerler.',
          'Scheduled maintenance, breakdowns, and damage scenarios progress through one planning logic.',
          t('Akış', 'Flow'),
        ),
        card(
          'Yönetim seviyesi raporlama',
          'Executive-grade reporting',
          'Maliyet, kullanım ve tedarikçi performansı karar aldıran bir çerçevede görünür olur.',
          'Cost, utilization, and supplier performance become visible through a decision-ready reporting frame.',
          t('Rapor', 'Reporting'),
        ),
      ],
    },
    workflow: {
      eyebrow: t('Nasıl çalışır?', 'How it works'),
      title: t('Operasyon masasından karar katmanına üç net adım.', 'Three clear steps from operations desk to decision layer.'),
      body: t(
        'Manager, günlük operasyon görevlerini yalnızca kayıt altına almaz; bunları takip, onay ve sonuç görünürlüğü ile birleştirir.',
        'Manager does more than log day-to-day tasks; it ties them to follow-up, approvals, and outcome visibility.',
      ),
      cards: [
        card(
          '1. Hareketi yakala',
          '1. Capture the movement',
          'Araç, bakım, sözleşme ve görev bilgileri tek giriş disipliniyle toplanır.',
          'Vehicle, maintenance, contract, and task information is collected through one intake discipline.',
        ),
        card(
          '2. Kural ve sorumluluk ata',
          '2. Apply rules and ownership',
          'Hatırlatmalar, yetkiler ve SLA mantıkları ekipler arası geçişi kontrol altına alır.',
          'Reminders, permissions, and SLA logic keep cross-team handoffs under control.',
        ),
        card(
          '3. Sonucu görünür kıl',
          '3. Surface the outcome',
          'Operasyon ve yönetim ekipleri aynı gerçekle çalışır; karar süresi kısalır.',
          'Operations and leadership work from the same truth, reducing decision latency.',
        ),
      ],
    },
    impact: {
      eyebrow: t('Kimler için?', 'Who it helps'),
      title: t('Filo organizasyonunun farklı katmanlarını aynı omurgada hizalar.', 'Aligns different layers of the fleet organization on one backbone.'),
      body: t(
        'Manager yalnızca operasyon ekibinin değil; satın alma, finans ve yönetim ekiplerinin de karar çevrimini hızlandırır.',
        'Manager accelerates the decision cycle not only for operations, but also for procurement, finance, and leadership teams.',
      ),
      cards: [
        card(
          'Operasyon masası',
          'Operations desk',
          'Açık işlerin, bakım planlarının ve hareketli araçların aynı pencerede takibini kolaylaştırır.',
          'Makes it easier to track open tasks, maintenance plans, and moving vehicles in the same window.',
          t('Günlük operasyon', 'Daily operations'),
        ),
        card(
          'Finans ve kontrol',
          'Finance and control',
          'Maliyet dağılımını ve sözleşme disiplinini daha öngörülebilir hale getirir.',
          'Makes cost distribution and contract discipline more predictable.',
          t('Bütçe', 'Budget'),
        ),
        card(
          'Yönetim ekipleri',
          'Leadership teams',
          'Kapsam, gecikme ve performans konularında daha hızlı karar alınmasını sağlar.',
          'Enables faster decisions on scope, delays, and performance.',
          t('Yönetim görünürlüğü', 'Executive visibility'),
        ),
      ],
    },
    contact: {
      chip: t('Manager ekibi ile görüşün', 'Talk to the Manager team'),
      title: t('Operasyon yapınızı FleetMole Manager üzerinde nasıl kurgulayacağınızı birlikte netleştirelim.', 'Let’s clarify how your operating model should be structured on FleetMole Manager.'),
      lead: t(
        'Demo, kapsam çalışması, entegrasyon planı ve ekip bazlı rol tasarımı için doğrudan ürün ekibiyle görüşebilirsiniz.',
        'Speak directly with the product team for demos, scope planning, integration design, and role-based operating models.',
      ),
      response: t('İlk dönüş: operasyon ve entegrasyon kapsamına göre aynı gün içinde.', 'First response: the same day depending on operations and integration scope.'),
      reasonsTitle: t('Genelde hangi başlıklarda ilerliyoruz?', 'What do teams usually ask for?'),
      reasons: [
        t('Merkezi operasyon paneli kurgusu', 'Central operations panel design'),
        t('Bakım, hasar ve servis akışı uyarlamaları', 'Maintenance, damage, and service flow adaptations'),
        t('ERP, finans ve kullanıcı yetki entegrasyonları', 'ERP, finance, and permission integrations'),
      ],
      topicsTitle: t('Hızlı yönlendirme', 'Quick routing'),
      topics: [
        card(
          'Demo akışı',
          'Demo flow',
          'Operasyon masasını ve yönetim raporlarını birlikte görmek isteyen ekipler için.',
          'For teams that want to review the operations desk and executive reporting together.',
        ),
        card(
          'Entegrasyon kurgusu',
          'Integration design',
          'ERP, finans veya servis sistemlerinden veri alacak yapılar için.',
          'For setups that will ingest data from ERP, finance, or service systems.',
        ),
        card(
          'Yetki ve süreç tasarımı',
          'Permissions and process design',
          'Farklı ekiplerin aynı platformda nasıl çalışacağını netleştirmek isteyen kurumlar için.',
          'For organizations that need to clarify how different teams will operate in the same platform.',
        ),
      ],
    },
  },
  rent: {
    menu: [
      menu('Tedarik Akışı', 'Sourcing Flow', '#overview'),
      menu('Modüller', 'Modules', '#modules'),
      menu('İhale Süreci', 'Tender Flow', '#workflow'),
      menu('Ticari Etki', 'Commercial Impact', '#impact'),
      menu('İletişim', 'Contact', '/contact'),
    ],
    hero: {
      eyebrow: t('Dijital kiralama ve ikame akışı', 'Digital rental and replacement flow'),
      title: lines(
        ['İkame, Kiralama ve', 'Dijital Tedarik', 'Tek Akışta Yönetin'],
        ['Run Replacement, Rental,', 'and Digital Sourcing', 'In One Flow'],
      ),
      lead: t(
        'FleetMole Rent; talep, teklif, yönlendirme ve teslimat sürecini sadeleştirerek kiralama ekiplerinin tedarik hızını artırır.',
        'FleetMole Rent simplifies request, quotation, dispatch, and delivery so mobility teams can source faster.',
      ),
      primaryCta: t('Tedarik Akışını İncele', 'Explore the Sourcing Flow'),
      secondaryCta: t('E-İhale Yapısını Gör', 'See the E-Tender Structure'),
      snapshotLabel: t('Tedarik snapshot', 'Sourcing snapshot'),
      snapshotBody: t(
        'Lokasyon, hizmet tipi ve kapasite bilgisi aynı pencerede karşılaştırılabilir hale gelir.',
        'Location, service type, and capacity become comparable in the same workspace.',
      ),
      snapshotItems: [
        metric('5+', 'Araç üstü ihale senaryosu', 'Vehicle demand for tender'),
        metric('Multi', 'Çoklu teklif görünürlüğü', 'Multi-quote visibility'),
        metric('SLA', 'Teslim ve yönlendirme disiplini', 'Dispatch and delivery discipline'),
      ],
    },
    modules: {
      eyebrow: t('Tedarik modülleri', 'Sourcing modules'),
      title: t('Talep açılışından teslim yönetimine kadar tek düzen.', 'One operating pattern from request intake to delivery control.'),
      body: t(
        'Rent, kiralama ve ikame operasyonlarını telefon ve e-posta trafiğinden çıkarıp ölçülebilir bir akışa dönüştürür.',
        'Rent moves rental and replacement operations out of phone and email traffic into a measurable flow.',
      ),
    },
    overview: {
      eyebrow: t('Ne çözüyor?', 'What it solves'),
      title: t('Tedarik kararlarını hızlandırır, şeffaflaştırır ve izlenebilir hale getirir.', 'Speeds up sourcing decisions, adds transparency, and makes them traceable.'),
      body: t(
        'Farklı tedarikçilerden gelen tekliflerin karşılaştırılması, onay süreci ve teslim koordinasyonu tek ekranda birleşir.',
        'Quote comparison across suppliers, approval flow, and delivery coordination come together on one screen.',
      ),
      cards: [
        card(
          'Çoklu teklif toplama',
          'Multi-quote sourcing',
          'Talep açıldığı anda uygun tedarikçilerden standart yapıda teklif toplanır.',
          'Once a request is opened, structured quotes are collected from the right suppliers.',
          t('Teklif', 'Quotes'),
        ),
        card(
          'İkame araç eşleştirme',
          'Replacement matching',
          'Hasar veya bakım anında mobilite ihtiyacı kapasite ve lokasyona göre eşlenir.',
          'Mobility demand during damage or maintenance is matched by capacity and location.',
          t('Mobilite', 'Mobility'),
        ),
        card(
          'Teslim ve faturalama görünürlüğü',
          'Delivery and billing visibility',
          'Rezervasyon, teslim ve fatura adımları aynı operasyon çizgisine bağlanır.',
          'Reservation, delivery, and billing are tied into the same operating line.',
          t('Teslim', 'Delivery'),
        ),
      ],
    },
    workflow: {
      eyebrow: t('Nasıl çalışır?', 'How it works'),
      title: t('Talep, karşılaştırma ve yönlendirme akışı net bir kurguyla ilerler.', 'Request, comparison, and dispatch progress through a clear sourcing model.'),
      body: t(
        'Ekipler hangi talebin kimde olduğunu, hangi teklifin uygun olduğunu ve teslimin ne zaman gerçekleşeceğini aynı yerde görür.',
        'Teams see who owns the request, which quote is the right fit, and when delivery will happen from the same place.',
      ),
      cards: [
        card(
          '1. Talebi aç',
          '1. Open the request',
          'Araç tipi, süre, lokasyon ve hizmet kapsamı tek veri setiyle tanımlanır.',
          'Vehicle type, duration, location, and service scope are defined in one request dataset.',
        ),
        card(
          '2. Teklif ve ihale çalıştır',
          '2. Run quote and tender logic',
          'Uygun tedarikçiler devreye alınır, teklifler standartlaştırılır ve karşılaştırılır.',
          'Eligible suppliers are invited, quotes are standardized, and options become comparable.',
        ),
        card(
          '3. Teslimi yönet',
          '3. Manage fulfillment',
          'Onay, teslim ve devam eden operasyon adımları kesintisiz görünür kalır.',
          'Approval, fulfillment, and live operating steps remain visible without handoff gaps.',
        ),
      ],
    },
    impact: {
      eyebrow: t('Kimler için?', 'Who it helps'),
      title: t('Satın alma ve mobilite ekiplerine daha hızlı karar hattı kurar.', 'Builds a faster decision line for procurement and mobility teams.'),
      body: t(
        'Rent; teklif toplama, tedarikçi kıyaslama ve teslim yönetimi yapan ekipler için operasyonel sürtünmeyi azaltır.',
        'Rent reduces operational friction for teams that source, compare suppliers, and manage delivery.',
      ),
      cards: [
        card(
          'Satın alma',
          'Procurement',
          'Teklifleri kıyaslama ve ticari kapsamı netleştirme süresini kısaltır.',
          'Shortens the time needed to compare quotes and clarify commercial scope.',
          t('Karşılaştırma', 'Comparison'),
        ),
        card(
          'Mobilite masası',
          'Mobility desk',
          'İkame ve kısa dönem taleplerin gecikmeden karşılanmasına destek verir.',
          'Helps replacement and short-term requests get fulfilled without delay.',
          t('Süreklilik', 'Continuity'),
        ),
        card(
          'Tedarikçi yönetimi',
          'Supplier management',
          'Fiyat, kapasite ve hizmet performansını daha izlenebilir hale getirir.',
          'Makes price, capacity, and service performance easier to monitor.',
          t('Şeffaflık', 'Transparency'),
        ),
      ],
    },
    contact: {
      chip: t('Rent ekibi ile konuşun', 'Talk to the Rent team'),
      title: t('Kiralama ve ikame akışınız için doğru tedarik kurgusunu birlikte çıkaralım.', 'Let’s define the right sourcing model for your rental and replacement operations.'),
      lead: t(
        'Teklif yapısı, e-ihale senaryosu, tedarikçi kapsaması ve operasyon tasarımı için doğrudan ürün ekibiyle ilerleyebilirsiniz.',
        'Work directly with the product team on quote structure, e-tender scenarios, supplier coverage, and operating design.',
      ),
      response: t('İlk dönüş: talep kapsamına göre aynı gün içinde.', 'First response: the same day depending on scope.'),
      reasonsTitle: t('Sık gelen başlıklar', 'Common request themes'),
      reasons: [
        t('E-ihale ve teklif akışı kurgusu', 'E-tender and quotation flow design'),
        t('İkame araç operasyon yapısı', 'Replacement vehicle operating model'),
        t('Tedarikçi ağının bölgesel kurgusu', 'Regional supplier network design'),
      ],
      topicsTitle: t('Hızlı yönlendirme', 'Quick routing'),
      topics: [
        card(
          'Büyük hacimli talep',
          'Larger vehicle demand',
          '5 araç ve üzeri talep senaryolarında ihale ve karşılaştırma yapısını planlamak için.',
          'For planning tender and comparison logic in scenarios with 5 or more vehicles.',
        ),
        card(
          'İkame operasyonu',
          'Replacement operations',
          'Hasar veya bakım anında kesintisiz mobilite isteyen ekipler için.',
          'For teams that need uninterrupted mobility during maintenance or damage events.',
        ),
        card(
          'Tedarikçi genişletme',
          'Supplier expansion',
          'Yeni bölgelere veya yeni hizmet tiplerine açılacak organizasyonlar için.',
          'For organizations expanding to new regions or new service categories.',
        ),
      ],
    },
  },
  tracker: {
    menu: [
      menu('Mobilite', 'Mobility', '#overview'),
      menu('Modüller', 'Modules', '#modules'),
      menu('Ürünler', 'Products', '/products'),
      menu('Demo', 'Demo', '/demo'),
      menu('İletişim', 'Contact', '/contact'),
    ],
    hero: {
      eyebrow: t('Canlı araç verisi', 'Live vehicle data'),
      title: lines(
        ['Sahadaki Her Aracı', 'Canlı Mobiliteyle', 'Görünür Hale Getirin'],
        ['Make Every Field', 'Vehicle Visible', 'Through Live Mobility'],
      ),
      lead: t(
        'FleetMole Tracker; konum, sürüş davranışı, sensör ve motor verilerini aynı akışta birleştirerek erken aksiyon alınmasını sağlar.',
        'FleetMole Tracker combines location, driving behavior, sensor, and engine data in one stream so teams can act earlier.',
      ),
      primaryCta: t('Canlı Akışı Gör', 'See the Live Feed'),
      secondaryCta: t('Alarm Kurgusunu İncele', 'Review the Alert Design'),
      snapshotLabel: t('Mobilite görünümü', 'Mobility view'),
      snapshotBody: t(
        'Canlı veri yalnızca harita görünümü değil; risk, uyumluluk ve bakım kararları için de bir erken uyarı katmanıdır.',
        'Live data is not just a map layer; it is an early warning layer for risk, compliance, and maintenance decisions.',
      ),
      snapshotItems: [
        metric('Live', 'Anlık konum ve hareket', 'Real-time location and movement'),
        metric('Geo', 'Kural bazlı bölge ihlali', 'Rules-based geofence alerts'),
        metric('Score', 'Sürücü ve risk puanlaması', 'Driver and risk scoring'),
      ],
    },
    modules: {
      eyebrow: t('Mobilite modülleri', 'Mobility modules'),
      title: t('Harita, alarm ve sürüş verisini tek katmanda toplar.', 'Combines map, alerts, and driving signals in one layer.'),
      body: t(
        'Tracker yalnızca araçların nerede olduğunu göstermez; ekiplerin ne yapması gerektiğini de görünür kılar.',
        'Tracker does more than show where vehicles are; it also makes the next action visible.',
      ),
    },
    overview: {
      eyebrow: t('Ne çözüyor?', 'What it solves'),
      title: t('Mobilite verisini operasyon ekipleri için aksiyona dönüştürür.', 'Turns mobility data into action for operating teams.'),
      body: t(
        'Konum, sürüş alışkanlığı ve sensör sinyalleri aynı akışta yorumlanabildiğinde güvenlik ve verim kararları hızlanır.',
        'When location, driving patterns, and sensor signals can be interpreted together, safety and efficiency decisions move faster.',
      ),
      cards: [
        card(
          'Canlı durum görünürlüğü',
          'Live operational visibility',
          'Araçların nerede olduğu, nasıl kullanıldığı ve hangi risk sinyallerini ürettiği aynı panelde görünür olur.',
          'Where vehicles are, how they are being used, and what risk signals they are producing become visible in one panel.',
          t('Canlı', 'Live'),
        ),
        card(
          'Alarm ve kural motoru',
          'Alert and rules engine',
          'Bölge ihlali, uygunsuz kullanım ve özel senaryolar otomatik alarm mantığıyla izlenir.',
          'Zone breaches, misuse, and exception scenarios are tracked through automated alert logic.',
          t('Alarm', 'Alerts'),
        ),
        card(
          'Tahmine dayalı bakım sinyali',
          'Predictive maintenance signal',
          'Motor ve kullanım verisi bakım ihtiyacını daha erken görünür kılar.',
          'Engine and usage data surface maintenance needs earlier.',
          t('Bakım', 'Maintenance'),
        ),
      ],
    },
    contact: {
      chip: t('Tracker ekibi ile konuşun', 'Talk to the Tracker team'),
      title: t('Mobilite mimarinizi ve canlı alarm yapınızı birlikte netleştirelim.', 'Let’s define your mobility architecture and live alert strategy together.'),
      lead: t(
        'Cihaz entegrasyonu, alarm senaryoları, sürücü skorlama ve bakım sinyalleri için ürün ekibiyle doğrudan ilerleyebilirsiniz.',
        'Work directly with the product team on device integration, alert scenarios, driver scoring, and maintenance signals.',
      ),
      response: t('İlk dönüş: veri kaynağı ve entegrasyon kapsamına göre aynı gün içinde.', 'First response: the same day depending on data source and integration scope.'),
      reasonsTitle: t('Sık gelen başlıklar', 'Common request themes'),
      reasons: [
        t('Canlı mobilite görünürlüğü', 'Live mobility visibility'),
        t('Geo-fence ve alarm senaryoları', 'Geofence and alert scenarios'),
        t('Sürücü puanlama ve risk raporları', 'Driver scoring and risk reporting'),
      ],
      topicsTitle: t('Hızlı yönlendirme', 'Quick routing'),
      topics: [
        card(
          'Cihaz ve veri kaynağı',
          'Device and data source',
          'Mevcut mobilite cihazlarını veya yeni veri kaynaklarını sisteme bağlamak isteyen ekipler için.',
          'For teams that want to connect existing mobility devices or new data sources.',
        ),
        card(
          'Alarm tasarımı',
          'Alert design',
          'Operasyon masasına hangi sinyallerin düşeceğini netleştirmek isteyen kurumlar için.',
          'For organizations defining which signals should reach the operations desk.',
        ),
        card(
          'Risk raporlama',
          'Risk reporting',
          'Sürücü davranışı ve ihlal verisini yönetim seviyesinde görmek isteyen yapılar için.',
          'For groups that want driver behavior and violation data at management level.',
        ),
      ],
    },
  },
  trader: {
    menu: [
      menu('Portföy', 'Portfolio', '#overview'),
      menu('Modüller', 'Modules', '#modules'),
      menu('Karar Akışı', 'Decision Flow', '#workflow'),
      menu('Ticari Etki', 'Commercial Impact', '#impact'),
      menu('İletişim', 'Contact', '/contact'),
    ],
    hero: {
      eyebrow: t('Veriye dayalı ticari karar katmanı', 'Data-driven commercial decision layer'),
      title: lines(
        ['Araç Portföyünü', 'Daha Akıllı', 'Ticari Kararlarla Yönetin'],
        ['Run Vehicle Portfolios', 'With Smarter', 'Commercial Decisions'],
      ),
      lead: t(
        'FleetMole Trader; değerleme, stok planı ve alım-satım zamanlamasını veri odaklı bir karar hattında toplar.',
        'FleetMole Trader brings valuation, stock planning, and buy-sell timing into one data-driven decision line.',
      ),
      primaryCta: t('Ticari Yapıyı Gör', 'See the Commercial Model'),
      secondaryCta: t('Karar Akışını İncele', 'Review the Decision Flow'),
      snapshotLabel: t('Portföy snapshot', 'Portfolio snapshot'),
      snapshotBody: t(
        'Piyasa görünürlüğü, araç geçmişi ve kârlılık hedefleri aynı çerçevede okunabilir hale gelir.',
        'Market visibility, vehicle history, and profitability goals become readable in the same frame.',
      ),
      snapshotItems: [
        metric('Live', 'Piyasa ve stok görünürlüğü', 'Market and stock visibility'),
        metric('Margin', 'Kârlılık odağı', 'Profitability focus'),
        metric('Timing', 'Doğru alım-satım penceresi', 'Right buy-sell timing'),
      ],
    },
    modules: {
      eyebrow: t('Ticari modüller', 'Commercial modules'),
      title: t('Değerleme, portföy ve fiyatlama aynı ticari dile bağlanır.', 'Valuation, portfolio, and pricing align around one commercial language.'),
      body: t(
        'Trader; finansal görünürlük ile operasyon gerçeklerini aynı karar katmanında buluşturur.',
        'Trader brings financial visibility and operational reality into the same decision layer.',
      ),
    },
    overview: {
      eyebrow: t('Ne çözüyor?', 'What it solves'),
      title: t('Araç ticaretinde daha hızlı ve savunulabilir kararlar üretir.', 'Creates faster and more defensible decisions in vehicle trading.'),
      body: t(
        'Araç geçmişi, piyasa fiyatı ve portföy ihtiyacı birlikte okunduğunda hangi aracın ne zaman elden çıkarılacağı daha net hale gelir.',
        'When vehicle history, market pricing, and portfolio need are read together, disposal timing becomes much clearer.',
      ),
      cards: [
        card(
          'Akıllı değerleme',
          'Smart valuation',
          'Araç geçmişi ve pazar sinyalleri birlikte işlenerek daha tutarlı fiyatlama önerileri üretilir.',
          'Vehicle history and market signals are processed together to generate more consistent pricing guidance.',
          t('Fiyat', 'Pricing'),
        ),
        card(
          'Portföy karar desteği',
          'Portfolio decision support',
          'Hangi araçların tutulacağı, yenileneceği veya satılacağı daha görünür hale gelir.',
          'Which vehicles should be retained, renewed, or sold becomes easier to see.',
          t('Portföy', 'Portfolio'),
        ),
        card(
          'Kârlılık takibi',
          'Profitability tracking',
          'Alım-satım ve yeniden kiralama kararları finansal hedeflerle hizalanır.',
          'Buy-sell and re-leasing decisions align with financial goals.',
          t('Kârlılık', 'Profitability'),
        ),
      ],
    },
    workflow: {
      eyebrow: t('Nasıl çalışır?', 'How it works'),
      title: t('Portföy okuma, fiyatlama ve karar akışı birlikte ilerler.', 'Portfolio reading, pricing, and decision flow move together.'),
      body: t(
        'Trader, veriyi yalnızca raporlamaz; alım-satım takvimini ve önerilen aksiyonu da netleştirir.',
        'Trader does not just report data; it clarifies timing and the recommended commercial action.',
      ),
      cards: [
        card(
          '1. Portföyü konsolide et',
          '1. Consolidate the portfolio',
          'Stok, kilometre, kullanım ve geçmiş verisi ortak değerlendirme katmanına alınır.',
          'Stock, mileage, usage, and history data are pulled into one evaluation layer.',
        ),
        card(
          '2. Değerleme yap',
          '2. Evaluate the asset',
          'Piyasa görünürlüğü ve araç durumu birlikte yorumlanarak değer önerisi oluşturulur.',
          'Market visibility and asset condition are interpreted together to produce valuation guidance.',
        ),
        card(
          '3. Kararı çalıştır',
          '3. Execute the decision',
          'Satış, elde tutma veya yeniden kiralama seçenekleri ticari önceliklerle eşlenir.',
          'Sale, hold, or re-lease options are aligned with commercial priorities.',
        ),
      ],
    },
    impact: {
      eyebrow: t('Kimler için?', 'Who it helps'),
      title: t('Ticari, finansal ve portföy ekiplerini aynı karar hattında toplar.', 'Brings commercial, finance, and portfolio teams into one decision line.'),
      body: t(
        'Trader; remarketing, satın alma ve finans ekipleri için ortak bir ticari dil oluşturur.',
        'Trader creates a shared commercial language for remarketing, procurement, and finance teams.',
      ),
      cards: [
        card(
          'Remarketing ekipleri',
          'Remarketing teams',
          'Araçların ne zaman ve hangi fiyat disiplininde çıkacağı daha net görünür.',
          'Timing and price discipline for each disposal decision become clearer.',
          t('Çıkış planı', 'Exit plan'),
        ),
        card(
          'Finans ekipleri',
          'Finance teams',
          'Amortisman ve kârlılık konularında daha savunulabilir bir görünürlük sağlar.',
          'Provides more defensible visibility into depreciation and profitability.',
          t('Finansal görünürlük', 'Financial visibility'),
        ),
        card(
          'Portföy yöneticileri',
          'Portfolio managers',
          'Talep, stok ve portföy dengesini daha kontrollü yönetmelerine yardımcı olur.',
          'Helps them manage the balance between demand, stock, and portfolio with more control.',
          t('Portföy dengesi', 'Portfolio balance'),
        ),
      ],
    },
    contact: {
      chip: t('Trader ekibi ile konuşun', 'Talk to the Trader team'),
      title: t('Araç ticaret ve portföy yapınız için doğru karar katmanını birlikte kuralım.', 'Let’s build the right decision layer for your vehicle trading and portfolio model together.'),
      lead: t(
        'Değerleme yaklaşımı, remarketing akışı, portföy planlama ve ticari raporlama için ürün ekibiyle doğrudan ilerleyebilirsiniz.',
        'Work directly with the product team on valuation logic, remarketing flow, portfolio planning, and commercial reporting.',
      ),
      response: t('İlk dönüş: ticari kapsam ve veri setine göre aynı gün içinde.', 'First response: the same day depending on data and commercial scope.'),
      reasonsTitle: t('Sık gelen başlıklar', 'Common request themes'),
      reasons: [
        t('Değerleme ve fiyatlama modeli', 'Valuation and pricing model'),
        t('Remarketing ve portföy yönetimi', 'Remarketing and portfolio management'),
        t('Finansal performans görünürlüğü', 'Financial performance visibility'),
      ],
      topicsTitle: t('Hızlı yönlendirme', 'Quick routing'),
      topics: [
        card(
          'Değerleme kurgusu',
          'Valuation model',
          'Piyasa verisini ve araç geçmişini birlikte yorumlamak isteyen ekipler için.',
          'For teams that want to interpret market data and vehicle history together.',
        ),
        card(
          'Portföy planı',
          'Portfolio planning',
          'Hangi araçların tutulacağı veya elden çıkarılacağı konusunda netlik arayan yapılar için.',
          'For organizations seeking clarity on which vehicles to retain or dispose.',
        ),
        card(
          'Ticari raporlama',
          'Commercial reporting',
          'Remarketing ve kârlılık tarafını yönetim seviyesinde görünür kılmak isteyen ekipler için.',
          'For teams that want management-level visibility into remarketing and profitability.',
        ),
      ],
    },
  },
  partner: {
    menu: [
      menu('Ağ Yapısı', 'Network Model', '#overview'),
      menu('Modüller', 'Modules', '#modules'),
      menu('SLA Akışı', 'SLA Flow', '#workflow'),
      menu('Hizmet Etkisi', 'Service Impact', '#impact'),
      menu('İletişim', 'Contact', '/contact'),
    ],
    hero: {
      eyebrow: t('Servis ve tedarikçi standardı', 'Service and supplier standardization'),
      title: lines(
        ['Servis ve Tedarikçi', 'Ağınızı Tek', 'Kurumsal Standartta Yönetin'],
        ['Run Your Service', 'and Supplier Network', 'On One Enterprise Standard'],
      ),
      lead: t(
        'FleetMole Partner; kontrat, SLA, iş emri ve performans yönetimini aynı servis ağı kurgusunda birleştirir.',
        'FleetMole Partner combines contracts, SLAs, work orders, and performance management in one service network model.',
      ),
      primaryCta: t('Ağ Yapısını Gör', 'See the Network Model'),
      secondaryCta: t('SLA Akışını İncele', 'Review the SLA Flow'),
      snapshotLabel: t('Ağ snapshot', 'Network snapshot'),
      snapshotBody: t(
        'Bölgesel hizmet kapsamı, fiyat mantığı ve kalite standardı aynı kontrol katmanında tutulur.',
        'Regional service coverage, pricing logic, and quality standards are held in the same control layer.',
      ),
      snapshotItems: [
        metric('SLA', 'Servis disiplinleri', 'Service disciplines'),
        metric('Audit', 'Kalite ve denetim izi', 'Quality and audit trail'),
        metric('Score', 'Performans puanlaması', 'Performance scoring'),
      ],
    },
    modules: {
      eyebrow: t('Ağ modülleri', 'Network modules'),
      title: t('Tedarikçi ağı için kontrat, görev ve kalite katmanları.', 'Contract, task, and quality layers for the supplier network.'),
      body: t(
        'Partner; saha servislerinin dağınık çalışmasını azaltıp aynı kurumsal standarda bağlar.',
        'Partner reduces fragmentation across field suppliers and aligns them to a shared enterprise standard.',
      ),
    },
    overview: {
      eyebrow: t('Ne çözüyor?', 'What it solves'),
      title: t('Servis ağını büyütürken kalite ve kontrolü korur.', 'Preserves quality and control while the network scales.'),
      body: t(
        'Partner, tedarikçi ağında yalnızca hangi firmayla çalışıldığını değil; hangi kural ve performans eşiğiyle çalışıldığını da netleştirir.',
        'Partner defines not only who is in the supplier network, but also which rules and performance thresholds govern the relationship.',
      ),
      cards: [
        card(
          'Kontrat ve bölgesel koşullar',
          'Contracts and regional conditions',
          'Hizmet kapsamı, fiyat yapısı ve tedarik şartları kurumsal seviyede tanımlanır.',
          'Service scope, pricing structure, and supplier terms are defined at enterprise level.',
          t('Kontrat', 'Contracts'),
        ),
        card(
          'İş emri ve yönlendirme',
          'Work order and routing',
          'İşlerin doğru servis noktasına yönlendirilmesi kontrollü hale gelir.',
          'Routing work to the right service point becomes far more controlled.',
          t('Yönlendirme', 'Routing'),
        ),
        card(
          'Skorlama ve denetim',
          'Scoring and audit',
          'Kalite, hız ve geri bildirim üzerinden daha ölçülebilir bir tedarikçi ağı oluşur.',
          'Quality, speed, and feedback build a more measurable supplier network.',
          t('Kalite', 'Quality'),
        ),
      ],
    },
    workflow: {
      eyebrow: t('Nasıl çalışır?', 'How it works'),
      title: t('Tanımla, yönlendir, ölç; servis ağı bu üç çizgide ilerler.', 'Define, route, measure; the service network runs on these three lines.'),
      body: t(
        'Partner, servis ağının hem ticari şartlarını hem operasyonel davranışını aynı kurguda yönetir.',
        'Partner manages both commercial rules and operational behavior of the network in one model.',
      ),
      cards: [
        card(
          '1. Ağı tanımla',
          '1. Define the network',
          'Bölge, marka, hizmet tipi ve kontrat kuralları kurumsal olarak belirlenir.',
          'Region, brand, service type, and contract rules are defined centrally.',
        ),
        card(
          '2. İşi yönlendir',
          '2. Route the work',
          'İş emri ve onay mantıklarıyla görevler uygun servis noktasına akar.',
          'Work order and approval logic route tasks to the right service point.',
        ),
        card(
          '3. Performansı ölç',
          '3. Measure performance',
          'SLA, hız ve kalite verileriyle ağ performansı sürekli görünür tutulur.',
          'SLA, speed, and quality data keep network performance visible at all times.',
        ),
      ],
    },
    impact: {
      eyebrow: t('Kimler için?', 'Who it helps'),
      title: t('Tedarikçi, servis ve denetim ekiplerine ortak standart sağlar.', 'Provides a shared standard for supplier, service, and audit teams.'),
      body: t(
        'Partner; ağ büyüklüğü arttığında kontrolü kaybetmeden kaliteyi sürdürmek isteyen kurumlar için tasarlandı.',
        'Partner is built for organizations that want to maintain quality and control as the network grows.',
      ),
      cards: [
        card(
          'Tedarik yönetimi',
          'Supplier management',
          'Kontrat ve bölgesel şartların daha kontrollü yürütülmesini sağlar.',
          'Enables stronger control over contracts and regional operating terms.',
          t('Ağ', 'Network'),
        ),
        card(
          'Servis operasyonu',
          'Service operations',
          'İş emri ve onay akışını gecikmesiz ve izlenebilir hale getirir.',
          'Makes work orders and approvals traceable without slowing the operation.',
          t('Operasyon', 'Operations'),
        ),
        card(
          'Kalite ve denetim',
          'Quality and audit',
          'Skorlama ve geri bildirim sayesinde kalite standardını korumayı kolaylaştırır.',
          'Scoring and feedback make it easier to maintain the quality standard.',
          t('Denetim', 'Audit'),
        ),
      ],
    },
    contact: {
      chip: t('Partner ekibi ile konuşun', 'Talk to the Partner team'),
      title: t('Servis ve tedarikçi ağınızı kurumsal standarda taşımak için doğru yapıyı birlikte kuralım.', 'Let’s build the right structure to move your service and supplier network onto an enterprise standard.'),
      lead: t(
        'Kontrat kurgusu, SLA çerçevesi, servis yönlendirme ve kalite skorlama başlıklarında ürün ekibiyle doğrudan ilerleyebilirsiniz.',
        'Work directly with the product team on contract design, SLA framework, service routing, and quality scoring.',
      ),
      response: t('İlk dönüş: ağ kapsamı ve hizmet tipine göre aynı gün içinde.', 'First response: the same day depending on network scope and service type.'),
      reasonsTitle: t('Sık gelen başlıklar', 'Common request themes'),
      reasons: [
        t('Servis ağı standardizasyonu', 'Service network standardization'),
        t('İş emri ve onay akışı', 'Work order and approval flows'),
        t('Skorlama ve kalite görünürlüğü', 'Scoring and quality visibility'),
      ],
      topicsTitle: t('Hızlı yönlendirme', 'Quick routing'),
      topics: [
        card(
          'Ağ tasarımı',
          'Network design',
          'Yeni bölgeler veya yeni hizmet tipleri için tedarik ağı kurgulamak isteyen kurumlar için.',
          'For organizations defining supplier coverage for new regions or service types.',
        ),
        card(
          'SLA yönetimi',
          'SLA management',
          'Servis hızını ve onay disiplinini standartlaştırmak isteyen ekipler için.',
          'For teams standardizing service speed and approval discipline.',
        ),
        card(
          'Performans denetimi',
          'Performance audit',
          'Tedarikçi kalitesini ölçülebilir hale getirmek isteyen yapılar için.',
          'For organizations that want supplier quality to become measurable.',
        ),
      ],
    },
  },
  tyre: {
    menu: [
      menu('Yaşam Döngüsü', 'Lifecycle', '#overview'),
      menu('Modüller', 'Modules', '#modules'),
      menu('Değişim Akışı', 'Change Flow', '#workflow'),
      menu('Maliyet Etkisi', 'Cost Impact', '#impact'),
      menu('İletişim', 'Contact', '/contact'),
    ],
    hero: {
      eyebrow: t('Lastik yaşam döngüsü görünürlüğü', 'Tyre lifecycle visibility'),
      title: lines(
        ['Lastik Yaşam', 'Döngüsünü Veriyle', 'Kontrol Altına Alın'],
        ['Bring Tyre Lifecycle', 'Under Control', 'With Data'],
      ),
      lead: t(
        'FleetMole Tyre; stok, otel, mevsimsel değişim ve aşınma kararlarını tek operasyon planında birleştirir.',
        'FleetMole Tyre unifies stock, storage, seasonal changes, and wear decisions in one operating plan.',
      ),
      primaryCta: t('Yaşam Döngüsünü Gör', 'See the Lifecycle'),
      secondaryCta: t('Değişim Akışını İncele', 'Review the Change Flow'),
      snapshotLabel: t('Lastik snapshot', 'Tyre snapshot'),
      snapshotBody: t(
        'Kullanım ömrü, saklama ve stok görünürlüğü aynı sistemde toplandığında maliyet kontrolü güçlenir.',
        'When lifecycle, storage, and stock visibility come together, cost control becomes stronger.',
      ),
      snapshotItems: [
        metric('Stock', 'Stok ve depo görünürlüğü', 'Stock and storage visibility'),
        metric('Season', 'Mevsimsel değişim planı', 'Seasonal change planning'),
        metric('Wear', 'Aşınma ve ömür takibi', 'Wear and lifecycle tracking'),
      ],
    },
    modules: {
      eyebrow: t('Lastik modülleri', 'Tyre modules'),
      title: t('Depodan araca kadar lastik operasyonunun bütününü yönetir.', 'Manages the full tyre operation from storage to active vehicle.'),
      body: t(
        'Tyre; yalnızca değişim gününü değil, varlığın nasıl saklandığını ve ne kadar verimli kullanıldığını da görünür kılar.',
        'Tyre covers more than change day; it also makes storage discipline and utilization efficiency visible.',
      ),
    },
    overview: {
      eyebrow: t('Ne çözüyor?', 'What it solves'),
      title: t('Lastik operasyonunu parçalı işlerden sürekli görünürlüğe taşır.', 'Moves tyre operations from fragmented tasks to continuous visibility.'),
      body: t(
        'Stok, otel, araç üzeri kullanım ve değişim planı aynı veri çizgisine bağlandığında kayıp ve tekrar azalır.',
        'When stock, storage, on-vehicle usage, and change planning are tied into one data line, loss and repetition fall.',
      ),
      cards: [
        card(
          'Mevsimsel değişim planı',
          'Seasonal replacement planning',
          'Hangi araçta ne zaman değişim yapılacağı merkezi takvimde yönetilir.',
          'Which vehicle changes when is managed through a central schedule.',
          t('Plan', 'Planning'),
        ),
        card(
          'Depo ve otel görünürlüğü',
          'Storage and hotel visibility',
          'Araçtan bağımsız varlık takibiyle lastik stoğu daha net yönetilir.',
          'Asset tracking independent from vehicles creates clearer stock visibility.',
          t('Stok', 'Stock'),
        ),
        card(
          'Aşınma ve maliyet takibi',
          'Wear and cost tracking',
          'Ömür, rotasyon ve yeniden kullanım kararları daha bilinçli hale gelir.',
          'Lifecycle, rotation, and reuse decisions become better informed.',
          t('Tasarruf', 'Savings'),
        ),
      ],
    },
    workflow: {
      eyebrow: t('Nasıl çalışır?', 'How it works'),
      title: t('İhtiyacı tespit eder, stoğu bağlar, yaşam döngüsünü kaydeder.', 'Identifies the need, allocates stock, and records the lifecycle.'),
      body: t(
        'Tyre, günlük operasyonu yalnızca servis değişimi olarak değil; planlama ve maliyet disiplini olarak ele alır.',
        'Tyre treats the operation not just as service replacement, but as planning and cost discipline.',
      ),
      cards: [
        card(
          '1. İhtiyacı algıla',
          '1. Detect the need',
          'Mevsim, kilometre ve aşınma verisiyle değişim gereksinimi netleşir.',
          'Season, mileage, and wear data clarify when a change is needed.',
        ),
        card(
          '2. Stoğu bağla',
          '2. Allocate the stock',
          'Uygun lastik varlığı depo veya otel görünürlüğüyle eşlenir.',
          'Suitable inventory is matched using storage and hotel visibility.',
        ),
        card(
          '3. Ömrü kaydet',
          '3. Record the lifecycle',
          'Montaj, rotasyon ve kullanım geçmişi ilerideki kararları besler.',
          'Installation, rotation, and usage history feed the next decisions.',
        ),
      ],
    },
    impact: {
      eyebrow: t('Kimler için?', 'Who it helps'),
      title: t('Operasyon, maliyet ve sürdürülebilirlik hedeflerini aynı çizgide buluşturur.', 'Brings operations, cost, and sustainability goals onto one line.'),
      body: t(
        'Tyre; servis planı yapan, depo yöneten ve gider kontrolü isteyen ekipler için aynı veri zeminini oluşturur.',
        'Tyre creates the same data foundation for teams that plan service, manage storage, and control spend.',
      ),
      cards: [
        card(
          'Operasyon ekipleri',
          'Operations teams',
          'Değişim ve araç planlamasını daha az sürtünmeyle yönetmelerine yardım eder.',
          'Helps them manage change schedules and vehicle planning with less friction.',
          t('Planlama', 'Planning'),
        ),
        card(
          'Maliyet kontrolü',
          'Cost control',
          'Aşınma, stok ve yeniden kullanım bilgisini aynı karar çerçevesinde toplar.',
          'Combines wear, inventory, and reuse visibility in one decision frame.',
          t('Maliyet', 'Cost'),
        ),
        card(
          'Sürdürülebilirlik',
          'Sustainability',
          'Varlığın ömrünü uzatacak ve gereksiz tüketimi azaltacak kararları destekler.',
          'Supports decisions that extend asset life and reduce unnecessary consumption.',
          t('Ömür', 'Lifecycle'),
        ),
      ],
    },
    contact: {
      chip: t('Tyre ekibi ile konuşun', 'Talk to the Tyre team'),
      title: t('Lastik operasyonunuzu daha görünür ve daha planlı hale getirecek yapıyı birlikte kuralım.', 'Let’s build the structure that will make your tyre operation more visible and more planned.'),
      lead: t(
        'Stok yapısı, otel görünürlüğü, değişim planı ve maliyet kontrolü başlıklarında ürün ekibiyle doğrudan ilerleyebilirsiniz.',
        'Work directly with the product team on stock structure, storage visibility, change planning, and cost control.',
      ),
      response: t('İlk dönüş: operasyon hacmine göre aynı gün içinde.', 'First response: the same day depending on operational scale.'),
      reasonsTitle: t('Sık gelen başlıklar', 'Common request themes'),
      reasons: [
        t('Mevsimsel değişim planı', 'Seasonal change planning'),
        t('Stok ve otel görünürlüğü', 'Stock and storage visibility'),
        t('Maliyet ve ömür takibi', 'Cost and lifecycle tracking'),
      ],
      topicsTitle: t('Hızlı yönlendirme', 'Quick routing'),
      topics: [
        card(
          'Stok kurgusu',
          'Stock structure',
          'Depo ve saklama tarafını merkezi görmek isteyen ekipler için.',
          'For teams that want a centralized view of stock and storage operations.',
        ),
        card(
          'Servis akışı',
          'Service flow',
          'Mevsimsel değişim ve montaj planını daha disiplinli yönetmek isteyen kurumlar için.',
          'For organizations that want stronger discipline around seasonal changes and fitting plans.',
        ),
        card(
          'Maliyet görünürlüğü',
          'Cost visibility',
          'Aşınma ve yeniden kullanım etkisini raporlamak isteyen yapılar için.',
          'For organizations that want to report wear and reuse impact more clearly.',
        ),
      ],
    },
  },
  smart: {
    menu: [
      menu('Smart Engine', 'Smart Engine', '#overview'),
      menu('Modüller', 'Modules', '#modules'),
      menu('Karar Akışı', 'Decision Flow', '#workflow'),
      menu('İş Etkisi', 'Business Impact', '#impact'),
      menu('İletişim', 'Contact', '/contact'),
    ],
    hero: {
      eyebrow: t('Akıllı belge ve hasar analitiği', 'Intelligent document and damage analytics'),
      title: lines(
        ['Belge, Hasar ve', 'Araç Görsellerini', 'Akıllı Karara Dönüştürün'],
        ['Turn Documents, Damage,', 'and Vehicle Imagery', 'Into Smart Decisions'],
      ),
      lead: t(
        'FleetMole Smart; araç görüntüleri ve operasyon belgeleri üzerinde çalışan akıllı karar katmanıyla analiz, yorum ve tahmin sürecini hızlandırır.',
        'FleetMole Smart accelerates interpretation, analysis, and estimation through an intelligent layer operating on vehicle imagery and operating documents.',
      ),
      primaryCta: t('Smart Katmanı Gör', 'See the Smart Layer'),
      secondaryCta: t('Karar Akışını İncele', 'Review the Decision Flow'),
      snapshotLabel: t('Smart snapshot', 'Smart snapshot'),
      snapshotBody: t(
        'OCR, görüntü analizi ve maliyet tahmini aynı karar hattında birleştiğinde manuel inceleme süresi düşer.',
        'When OCR, vision analysis, and estimation run in one decision line, manual review time drops sharply.',
      ),
      snapshotItems: [
        metric('OCR', 'Belge dijitalleştirme', 'Document digitization'),
        metric('Vision', 'Hasar ve araç tanıma', 'Damage and vehicle recognition'),
        metric('Estimate', 'Maliyet tahmin akışı', 'Cost estimation workflow'),
      ],
    },
    modules: {
      eyebrow: t('Smart modülleri', 'Smart modules'),
      title: t('Görüntü, belge ve karar önerisini tek akıllı katmanda toplar.', 'Combines imagery, documents, and recommendation logic in one intelligent layer.'),
      body: t(
        'Smart; servis, eksper, sigorta ve operasyon ekiplerinin aynı veri üzerinde daha hızlı karar vermesini sağlar.',
        'Smart helps service, assessor, insurance, and operations teams make faster decisions on the same data.',
      ),
    },
    overview: {
      eyebrow: t('Ne çözüyor?', 'What it solves'),
      title: t('Manuel inceleme yükünü azaltır ve karar hızını artırır.', 'Reduces manual review load and accelerates decision speed.'),
      body: t(
        'Araç fotoğrafları, servis evrakı ve operasyon belgeleri aynı akıllı işleme hattına girdiğinde daha tutarlı sonuç üretmek kolaylaşır.',
        'When vehicle photos, service paperwork, and operating documents enter the same intelligent pipeline, it becomes easier to produce more consistent outcomes.',
      ),
      cards: [
        card(
          'Görüntü tabanlı hasar analizi',
          'Vision-based damage analysis',
          'Farklı açılardan gelen görseller üzerinde hasar bölgeleri ve araç tipi daha hızlı yorumlanır.',
          'Damage areas and vehicle type are interpreted faster across multi-angle imagery.',
          t('Vision', 'Vision'),
        ),
        card(
          'Belge dijitalleştirme',
          'Document digitization',
          'Poliçe, ekspertiz ve servis belgeleri işlenebilir veri katmanına dönüşür.',
          'Policies, assessor records, and service documents are converted into structured data.',
          t('OCR', 'OCR'),
        ),
        card(
          'Tahmin ve karar desteği',
          'Estimation and decision support',
          'Onarım ve parça senaryoları karşılaştırılabilir bir öneri setine dönüşür.',
          'Repair and parts scenarios become a comparable recommendation set.',
          t('Decision', 'Decision'),
        ),
      ],
    },
    workflow: {
      eyebrow: t('Nasıl çalışır?', 'How it works'),
      title: t('Al, yorumla, öner; Smart akışı bu üç aşamada ilerler.', 'Ingest, interpret, recommend; the Smart flow moves through three stages.'),
      body: t(
        'Belge ve görüntü verisi akıllı modeller tarafından işlenerek operasyon ekipleri için karar destek katmanına dönüşür.',
        'Document and image data are processed by intelligent models and turned into a decision layer for operating teams.',
      ),
      cards: [
        card(
          '1. Girdiyi al',
          '1. Ingest the input',
          'Fotoğraf, belge ve dosya verisi aynı standartla sisteme alınır.',
          'Photos, documents, and file data are captured through one standard.',
        ),
        card(
          '2. İçeriği yorumla',
          '2. Interpret the content',
          'OCR, araç tanıma ve hasar tespiti aynı işleme hattında ilerler.',
          'OCR, vehicle recognition, and damage detection run in the same processing line.',
        ),
        card(
          '3. Kararı besle',
          '3. Feed the decision',
          'Tahmin ve öneri çıktıları ekiplerin daha hızlı aksiyon almasını sağlar.',
          'Estimation and recommendation outputs help teams take action faster.',
        ),
      ],
    },
    impact: {
      eyebrow: t('Kimler için?', 'Who it helps'),
      title: t('Eksper, servis ve operasyon ekiplerine ortak akıllı zemin sunar.', 'Provides a shared intelligent foundation for assessors, service teams, and operations.'),
      body: t(
        'Smart; manuel belge incelemesi ve görüntü yorumlama yükünü azaltmak isteyen kurumlar için tasarlandı.',
        'Smart is built for organizations that want to reduce manual document review and image interpretation effort.',
      ),
      cards: [
        card(
          'Eksper ve hasar ekipleri',
          'Claims and assessor teams',
          'Hasar tespiti ve evrak okumasını daha hızlı ve tutarlı hale getirir.',
          'Makes damage detection and document reading faster and more consistent.',
          t('Hasar', 'Claims'),
        ),
        card(
          'Servis operasyonları',
          'Service operations',
          'Gelen belgeler ve görseller üzerinden daha net yönlendirme yapılmasını sağlar.',
          'Enables clearer routing decisions based on incoming documents and imagery.',
          t('Servis', 'Service'),
        ),
        card(
          'Yönetim ve analitik',
          'Management and analytics',
          'Veri kalitesini ve tahmin görünürlüğünü artırarak raporlamayı güçlendirir.',
          'Strengthens reporting by improving data quality and estimation visibility.',
          t('Analitik', 'Analytics'),
        ),
      ],
    },
    contact: {
      chip: t('Smart ekibi ile konuşun', 'Talk to the Smart team'),
      title: t('Belge ve görüntü akışınızı akıllı karar katmanına taşımak için doğru yapıyı birlikte kuralım.', 'Let’s build the right structure to move your document and image workflows onto an intelligent decision layer.'),
      lead: t(
        'OCR, hasar analizi, araç tanıma ve tahmin kurguları için ürün ekibiyle doğrudan ilerleyebilirsiniz.',
        'Work directly with the product team on OCR, damage analysis, vehicle recognition, and estimation design.',
      ),
      response: t('İlk dönüş: veri türü ve akış kapsamına göre aynı gün içinde.', 'First response: the same day depending on data type and process scope.'),
      reasonsTitle: t('Sık gelen başlıklar', 'Common request themes'),
      reasons: [
        t('Belge OCR ve veri çıkarımı', 'Document OCR and data extraction'),
        t('Hasar analizi ve araç tanıma', 'Damage analysis and vehicle recognition'),
        t('Tahmin ve karar destek kurgusu', 'Estimation and decision-support design'),
      ],
      topicsTitle: t('Hızlı yönlendirme', 'Quick routing'),
      topics: [
        card(
          'Belge akışı',
          'Document workflow',
          'Operasyon belgelerini yapılandırılmış veri katmanına taşımak isteyen ekipler için.',
          'For teams moving operational documents into structured data workflows.',
        ),
        card(
          'Görüntü analizi',
          'Vision analysis',
          'Araç görselleri üzerinden hasar veya tip tespiti yapmak isteyen kurumlar için.',
          'For organizations that want to detect damage or vehicle type from imagery.',
        ),
        card(
          'Tahmin motoru',
          'Estimation engine',
          'Onarım ve maliyet kararlarını daha hızlı almak isteyen yapılar için.',
          'For teams that want faster repair and cost decisions.',
        ),
      ],
    },
  },
};
