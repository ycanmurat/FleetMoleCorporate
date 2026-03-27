import type { Locale } from '../config/site';

interface LabelItem {
  value: string;
  label: string;
}

interface ContentItem {
  title: string;
  body: string;
}

interface NewsItem {
  tag: string;
  title: string;
  body: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface HomeContent {
  hero: {
    eyebrow: string;
    title: [string, string, string];
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    proof: LabelItem[];
    consoleTitle: string;
    consoleBody: string;
    consoleStats: LabelItem[];
  };
  story: {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    rails: ContentItem[];
  };
  products: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ContentItem[];
  };
  rental: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    items: ContentItem[];
    note: string;
  };
  brands: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: string[];
    asideTitle: string;
    asideBody: string;
  };
  news: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: NewsItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
}

export const HOME_CONTENT: Record<Locale, HomeContent> = {
  tr: {
    hero: {
      eyebrow: 'Filo kiralamanın en pratik yolu',
      title: ['Veriyle Güçlenen', 'Yeni Nesil Filo', 've Mobilite Ekosistemi'],
      lead:
        'FleetMole; teklif, ihale, operasyon, telematik, lastik, tedarikçi ve yapay zekâ katmanlarını tek bir dijital mimaride birleştirerek kurumsal filoları tek komuta merkezinden yönetilebilir hale getirir.',
      primaryCta: 'Demo İsteyin',
      secondaryCta: 'Ekosistemi İnceleyin',
      proof: [
        { value: '24-47 Ay', label: 'Uzun dönem kiralama aralıkları' },
        { value: '50.000 Km', label: 'Yıllık teklif üst limiti' },
        { value: '5+ Araç', label: 'Online şartname ve ihale akışı' },
        { value: '7 Modül', label: 'Tek ekosisteme bağlı ürünler' },
      ],
      consoleTitle: 'Operasyon komuta merkezi',
      consoleBody:
        'Araç, sözleşme, bakım, teklif ve telematik akışları aynı panelde buluşur; karar destek katmanı gerçek zamanlı görünürlük üretir.',
      consoleStats: [
        { value: 'Tek panel', label: 'Araç, sürücü ve sözleşme görünürlüğü' },
        { value: 'Canlı', label: 'Konum, skor, alarm ve bakım sinyalleri' },
        { value: 'Bulut', label: 'Esnek entegrasyon ve erişim katmanı' },
      ],
    },
    story: {
      eyebrow: 'Merkezi görünürlük',
      title: 'FleetMole, tekliften operasyona uzanan tüm hareketi tek veri akışında toplar.',
      subtitle:
        'Resmi sitedeki ürün ve çözüm anlatılarından türetilen bu kurguda amaç; ekosistemin bir “tek panel” mantığıyla nasıl çalıştığını ilk bakışta göstermek.',
      paragraphs: [
        'FleetMole ana anlatısında; araç, sürücü, sözleşme, bakım ve kilometre takibinin tek platformda izlendiği, yapay zekâ destekli analizlerle optimizasyon önerileri üretildiği vurgulanıyor.',
        'Aynı yapı, teklif toplama, online ihale, tedarikçi performansı, telematik verisi ve lastik yaşam döngüsü gibi operasyonları da tek merkezde birleştirerek dağınık iş akışlarını sadeleştiriyor.',
      ],
      rails: [
        {
          title: 'Çoklu teklif ve ihale',
          body: 'FleetMole, tedarikçi tekliflerini tek akışta toplar; şartname, karşılaştırma ve ihale adımlarını hızlandırır.',
        },
        {
          title: 'Operasyon ve bakım hattı',
          body: 'Hasar, bakım, onarım, ikame araç, lastik ve değer kaybı süreçleri merkezi görünürlük altında ilerler.',
        },
        {
          title: 'Telematik ve yapay zekâ',
          body: 'Konum, sürüş skoru, belge OCR, hasar tespiti ve öngörüsel içgörüler yönetime anlık veri sağlar.',
        },
      ],
    },
    products: {
      eyebrow: 'Ürün ekosistemi',
      title: 'Her modül ayrı bir iş akışını sahiplenir, birlikte tek bir filo işletim sistemi oluşturur.',
      subtitle:
        'FleetMole ürünleri; kiralama, partner yönetimi, lastik, telematik, yapay zekâ ve ticaret süreçlerini ayrı landing deneyimlerine taşıyacak şekilde tasarlandı.',
    },
    services: {
      eyebrow: 'Hizmet katmanları',
      title: 'Operasyon sadece yazılım değil; sahadaki süreçlerin tamamı için düzenli bir servis ağı.',
      subtitle:
        'Ana sitede listelenen hizmet başlıkları, landing deneyiminde karar vericinin ihtiyaç haritası olarak yeniden düzenlendi.',
      items: [
        { title: 'Hasar Yönetimi', body: 'Hasar kaydı, belge akışı ve onarım kararlarını tek operasyon hattında yönetin.' },
        { title: 'Mekanik / Bakım Yönetimi', body: 'Periyodik bakım, arıza, servis planı ve maliyet görünürlüğünü standartlaştırın.' },
        { title: 'Lastik Yönetimi', body: 'Mevsimsel değişim, stok, otel hizmeti ve aşınma takibini tek çizgide izleyin.' },
        { title: 'Tedarikçi Lojistik Yönetimi', body: 'Servis ve tedarik noktalarını bölgesel kural ve SLA setleriyle yönetin.' },
        { title: 'İkame Araç Yönetimi', body: 'Arıza ya da hasar anında en uygun ikame aracı hızlıca eşleştirin.' },
        { title: 'Değer Kaybı Yönetimi', body: 'Araç değer kaybı süreçlerini rapor ve finans akışıyla birlikte takip edin.' },
        { title: 'Rücu Yönetimi', body: 'Talep, tahsilat ve süreç takibini şeffaflaştıran dijital iş akışları kurun.' },
        { title: 'Asistans Hizmetleri', body: 'Saha ihtiyaçlarını tek çağrı yerine izlenebilir servis hareketlerine dönüştürün.' },
        { title: 'Güvenli Sürüş Eğitimi', body: 'Sürüş davranışı ve risk skorları ile eğitim ihtiyaçlarını ilişkilendirin.' },
        { title: 'Araç Takip ve Raporlama', body: 'Konum, sürüş skoru, uyarılar ve raporları yönetim seviyesinde görünür kılın.' },
      ],
    },
    rental: {
      eyebrow: 'Kiralama çözümleri',
      title: 'Teklif alma, şartname oluşturma ve tedarikçi karşılaştırma akışını sadeleştirin.',
      subtitle:
        'Resmi sitedeki kiralama anlatısı; çoklu teklif, online ihale, lokasyon bazlı eşleşme ve uzun dönem avantajları etrafında şekilleniyor.',
      body:
        'FleetMole; kurumsal müşteriler ile kiralama tedarikçilerini bir araya getirerek hem operasyonel gecikmeyi azaltıyor hem de fiyat/şart karşılaştırmasını dijital hale getiriyor.',
      items: [
        { title: 'E-İhale ve Teklif', body: '5 araç üzeri taleplerde şartname hazırlayıp açık eksiltme veya kapalı zarf ihalesi kurgulayın.' },
        { title: 'Uzun Dönem Araç Kiralama', body: '24, 36 ve 47 ay gibi standart periyotlarda bütçe ve hizmet dengesini optimize edin.' },
        { title: 'Kısa Dönem Araç Kiralama', body: 'İkame ihtiyaçlarında lokasyona en yakın çözümü hızla eşleştirin.' },
        { title: 'Bireysel Araç Kiralama', body: 'Kısa ve orta vadeli kullanım senaryoları için dijital teklif ve karşılaştırma akışı kurun.' },
        { title: 'Kurumsal Araç Kiralama', body: 'Vergi, bakım, sigorta ve ikinci el riskini kiralama modeline devredin.' },
      ],
      note:
        'FleetMole ana sitesindeki FAQ bölümünde; yıllık 50.000 km’ye kadar teklif alınabildiği ve bazı filolarda ek km opsiyonları bulunduğu belirtiliyor.',
    },
    brands: {
      eyebrow: 'Marka ekosistemi',
      title: 'Araç markaları ve tedarik kanalları aynı dijital sahnede buluşuyor.',
      subtitle:
        'Ana sitede listelenen marka ağı, landing sayfada güven ve kapsam sinyali veren hareketli bir referans bandına dönüştürüldü.',
      items: [
        'Alfa Romeo',
        'Audi',
        'BMW',
        'Citroen',
        'Dacia',
        'Honda',
        'Hyundai',
        'Fiat',
        'Ford',
        'Jeep',
        'Kia',
        'Land Rover',
        'Nissan',
        'Mercedes-Benz',
        'Peugeot',
        'Renault',
        'Opel',
        'Seat',
        'Skoda',
        'Toyota',
        'Volkswagen',
      ],
      asideTitle: 'Ayrıcalık katmanı',
      asideBody:
        'FleetMole ana sayfasında, üyelere özel kısa dönem indirimleri ve ek avantajlar vurgulanıyor. Bu bölüm o içeriği daha premium bir satış sinyaline dönüştürüyor.',
    },
    news: {
      eyebrow: 'Kampanya ve duyurular',
      title: 'Sektörel gündem, mevzuat değişiklikleri ve kiralama pazarından öne çıkan başlıklar.',
      subtitle:
        'İçerik kartları, resmi sitedeki haber akışından alınan başlıkların landing formatına uyarlanmış özetleridir.',
      items: [
        {
          tag: 'Mevzuat',
          title: 'Araçlarda kamera ve takip sistemi zorunluluğu',
          body: 'Yönetmelik değişikliğiyle birlikte belirli araçlarda takip sistemi, iç-dış kamera ve acil durum altyapısı zorunlu hale geliyor.',
        },
        {
          tag: 'Pazar raporu',
          title: 'TOKKDER 2025 dördüncü çeyrek sektör raporu',
          body: 'Kiralama pazarının talep, araç parkı ve tedarik tarafındaki hareketini izlemek için öne çıkan resmi raporlardan biri.',
        },
        {
          tag: 'Mobilite',
          title: 'Elektrikli ve hibrit araçlar filoda yeni dengeyi kuruyor',
          body: 'Ana sitedeki içerik akışı, dizel sonrası dönemde elektrikli ve hibrit tercihlerin hızla arttığını işaret ediyor.',
        },
      ],
    },
    faq: {
      eyebrow: 'Sıkça sorulanlar',
      title: 'Kiralama modeli, operasyon yükü ve ürün entegrasyonuna dair temel sorular.',
      subtitle:
        'FAQ kartları doğrudan FleetMole ana sitesindeki soru başlıkları ve cevapların kısaltılmış, okunabilir versiyonlarıdır.',
      items: [
        {
          q: 'Hafif ticari araç kiralayabilir miyim?',
          a: '3,5 ton altındaki hafif ticari araçlar için kiralama yapılabiliyor; ana sitede K2 yetki belgesi açısından öz mal şartının kalktığı özellikle belirtiliyor.',
        },
        {
          q: 'Satın alma ile kiralama arasındaki temel fark nedir?',
          a: 'Kiralama modelinde vergi, bakım, hasar, lastik ve ikinci el riski kiralama şirketi tarafında kalırken işletme tarafında öngörülebilir bir gider yapısı oluşur.',
        },
        {
          q: 'Ne kadar süre ve kilometre için kiralama yapılabilir?',
          a: 'Resmi sitede 24, 36 ve 47 aylık kiralama örnekleri ile yıllık 50.000 km’ye kadar teklif alınabildiği belirtiliyor.',
        },
        {
          q: 'FleetMole Manager diğer modüllerle nasıl çalışır?',
          a: 'Ana site anlatısına göre Manager; Smart, Tracker ve Partner modüllerinden gelen verileri tek ekranda birleştirerek çekirdek yönetim katmanını oluşturur.',
        },
      ],
    },
    cta: {
      title: 'FleetMole ekosistemini ürün bazında ayrıştırılmış landing akışlarıyla büyütün.',
      body:
        'Ana landing sayfası grup anlatısını güçlendirirken, alt sayfalar her ürünün kendi rengine, logosuna ve operasyon vaadine geçiş yapan mini-site deneyimi sunar.',
      primary: 'Bizimle İletişime Geçin',
      secondary: 'Ürünleri Keşfedin',
    },
  },
  en: {
    hero: {
      eyebrow: 'The most practical way to manage fleet leasing',
      title: ['Data-Powered', 'Next-Gen Fleet', 'and Mobility Ecosystem'],
      lead:
        'FleetMole connects quote collection, auctions, operations, telemetry, tyre workflows, supplier management, and Smart into one digital operating layer for enterprise fleets.',
      primaryCta: 'Request a Demo',
      secondaryCta: 'Explore the Ecosystem',
      proof: [
        { value: '24-47 Months', label: 'Typical long-term leasing ranges' },
        { value: '50,000 Km', label: 'Annual quotation threshold' },
        { value: '5+ Vehicles', label: 'Online specification and auction flow' },
        { value: '7 Modules', label: 'Connected products in one ecosystem' },
      ],
      consoleTitle: 'Operations command center',
      consoleBody:
        'Vehicle, contract, maintenance, quote, and telemetry flows converge in one interface while the decision-support layer turns activity into clear operational signals.',
      consoleStats: [
        { value: 'One panel', label: 'Vehicle, driver, and contract visibility' },
        { value: 'Live', label: 'Location, score, alert, and maintenance signals' },
        { value: 'Cloud', label: 'Flexible integration and access layer' },
      ],
    },
    story: {
      eyebrow: 'Central visibility',
      title: 'FleetMole turns leasing, supplier, and operational activity into one coordinated data flow.',
      subtitle:
        'This structure is adapted from the official FleetMole product and solutions pages, reworked into a richer landing experience that explains how the ecosystem behaves as one operating system.',
      paragraphs: [
        'The official site positions FleetMole as a unified layer for vehicles, drivers, contracts, maintenance planning, mileage tracking, and Smart-assisted optimization.',
        'That same backbone extends into quote collection, online auctions, supplier performance, telemetry data, and tyre lifecycle management so fragmented workflows can be coordinated from one place.',
      ],
      rails: [
        {
          title: 'Multi-quote and auction flow',
          body: 'FleetMole gathers supplier offers in one stream and accelerates specification, comparison, and tender execution.',
        },
        {
          title: 'Operational service lane',
          body: 'Damage, maintenance, replacement vehicles, tyre, and depreciation processes move under the same visibility model.',
        },
        {
          title: 'Telemetry and Smart',
          body: 'Location, driving scores, OCR, damage detection, and predictive insights feed a decision-ready operational layer.',
        },
      ],
    },
    products: {
      eyebrow: 'Product ecosystem',
      title: 'Every module owns a different workflow, but together they behave like a unified fleet operating system.',
      subtitle:
        'Each landing page now acts like a focused sub-site with its own tone, palette, and visual signature while remaining connected to the FleetMole group narrative.',
    },
    services: {
      eyebrow: 'Service layers',
      title: 'The operation is not only software; it also needs a coordinated service network around it.',
      subtitle:
        'The service headings listed on the official site are restructured here as a decision map for corporate fleet managers.',
      items: [
        { title: 'Damage Management', body: 'Track damage records, document flow, and repair decisions in a single operational lane.' },
        { title: 'Mechanical / Maintenance Management', body: 'Standardize periodic maintenance, breakdown, service planning, and cost visibility.' },
        { title: 'Tyre Management', body: 'Monitor seasonal changes, inventory, hotel services, and wear history from one system.' },
        { title: 'Supplier Logistics Management', body: 'Coordinate service and supplier points through regional rules and SLA definitions.' },
        { title: 'Replacement Vehicle Management', body: 'Match the right replacement vehicle quickly whenever a breakdown or damage event occurs.' },
        { title: 'Depreciation Management', body: 'Keep vehicle depreciation processes visible together with financial and reporting flows.' },
        { title: 'Recovery Management', body: 'Build traceable demand, collection, and escalation workflows instead of manual follow-up.' },
        { title: 'Assistance Services', body: 'Turn field needs into trackable service movements rather than disconnected support calls.' },
        { title: 'Safe Driving Training', body: 'Link driving behavior and risk signals to practical coaching and training needs.' },
        { title: 'Vehicle Tracking and Reporting', body: 'Expose location, driving scores, alerts, and reporting to management-level decision makers.' },
      ],
    },
    rental: {
      eyebrow: 'Leasing solutions',
      title: 'Simplify quote intake, specification building, and supplier comparison.',
      subtitle:
        'The official FleetMole leasing story revolves around multi-quote collection, online tenders, location-based matching, and the financial logic of long-term leasing.',
      body:
        'FleetMole brings corporate demand and leasing suppliers into one marketplace-style structure so both speed and commercial transparency improve.',
      items: [
        { title: 'E-Auction and Quotations', body: 'Build tender documents and run open or sealed-bid workflows for fleets above five vehicles.' },
        { title: 'Long-Term Leasing', body: 'Balance budget and service quality across standard periods such as 24, 36, and 47 months.' },
        { title: 'Short-Term Leasing', body: 'Resolve urgent replacement needs by matching the closest and fastest available solution.' },
        { title: 'Individual Leasing', body: 'Create a digital quote and comparison flow for short and mid-term usage scenarios.' },
        { title: 'Corporate Leasing', body: 'Move tax, maintenance, insurance, and residual-value risk into the leasing model.' },
      ],
      note:
        'The FAQ on the official site notes that quotations can reach 50,000 km annually and that some suppliers may allow additional mileage flexibility.',
    },
    brands: {
      eyebrow: 'Brand ecosystem',
      title: 'Vehicle brands and supply channels meet on the same digital stage.',
      subtitle:
        'The brand list on the official website becomes a moving trust layer here, reinforcing coverage and procurement breadth.',
      items: [
        'Alfa Romeo',
        'Audi',
        'BMW',
        'Citroen',
        'Dacia',
        'Honda',
        'Hyundai',
        'Fiat',
        'Ford',
        'Jeep',
        'Kia',
        'Land Rover',
        'Nissan',
        'Mercedes-Benz',
        'Peugeot',
        'Renault',
        'Opel',
        'Seat',
        'Skoda',
        'Toyota',
        'Volkswagen',
      ],
      asideTitle: 'Perks layer',
      asideBody:
        'The official home page highlights member-specific short-term discounts and future benefits. Here, that message is reframed as a more premium conversion cue.',
    },
    news: {
      eyebrow: 'Campaigns and announcements',
      title: 'Policy changes, market signals, and mobility news translated into a landing-style content layer.',
      subtitle:
        'These cards are adapted from article and announcement titles visible on the official FleetMole home page.',
      items: [
        {
          tag: 'Policy',
          title: 'Camera and tracking systems become mandatory in certain vehicles',
          body: 'A regulation change highlights new requirements for tracking systems, interior-exterior cameras, and emergency hardware in specific categories.',
        },
        {
          tag: 'Market report',
          title: 'TOKKDER 2025 Q4 sector report',
          body: 'One of the official reporting references used to understand supply, demand, and fleet-market movement across the leasing landscape.',
        },
        {
          tag: 'Mobility',
          title: 'Electric and hybrid fleets are reshaping the market balance',
          body: 'The official content flow points to a strong transition away from diesel toward hybrid and electric alternatives.',
        },
      ],
    },
    faq: {
      eyebrow: 'Frequently asked',
      title: 'Core questions around leasing models, operational load, and product integration.',
      subtitle:
        'These FAQ cards are condensed versions of the questions and answers published on the official FleetMole website.',
      items: [
        {
          q: 'Can I lease light commercial vehicles?',
          a: 'Yes. The official FAQ states that leasing is possible for light commercial vehicles below 3.5 tons and also explains the updated permit logic around K2 authorization.',
        },
        {
          q: 'What is the main difference between purchasing and leasing?',
          a: 'In the leasing model, tax, maintenance, damage handling, tyre operations, and residual-value risk move to the supplier side while the customer gains a more predictable operating-cost structure.',
        },
        {
          q: 'What rental durations and mileage levels are typical?',
          a: 'The official site references examples such as 24, 36, and 47 months, with quotations reaching up to 50,000 km annually.',
        },
        {
          q: 'How does FleetMole Manager work with the other modules?',
          a: 'According to the ecosystem explanation on the official site, Manager acts as the core layer by combining Smart, Tracker, and Partner signals in one control surface.',
        },
      ],
    },
    cta: {
      title: 'Grow the FleetMole ecosystem with product-specific landing flows.',
      body:
        'The main landing page now strengthens the group narrative while each product page shifts into its own palette, wordmark, and operational promise like a focused sub-site.',
      primary: 'Contact the Team',
      secondary: 'Browse Products',
    },
  },
};
