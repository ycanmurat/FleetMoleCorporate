import type { Locale } from '../config/site';
import type { ProductSlug } from './products';

type LocalizedText = Record<Locale, string>;

export interface ServiceLandingMetric {
  value: LocalizedText;
  label: LocalizedText;
}

export interface ServiceLandingStep {
  title: LocalizedText;
  body: LocalizedText;
}

export interface ServiceLandingIntegration {
  product: ProductSlug;
  title: LocalizedText;
  body: LocalizedText;
}

export interface ServiceDetailCard {
  title: LocalizedText;
  body: LocalizedText;
}

export interface ServiceDetailSignal {
  value: LocalizedText;
  label: LocalizedText;
}

export interface ServicePageDetail {
  heroLead?: LocalizedText;
  heroBody?: LocalizedText;
  intro: Record<Locale, string[]>;
  signalsTitle?: LocalizedText;
  signalsDescription?: LocalizedText;
  signals?: ServiceDetailSignal[];
  spotlightTitle?: LocalizedText;
  spotlightDescription?: LocalizedText;
  spotlightCards?: ServiceDetailCard[];
  journeyTitle?: LocalizedText;
  journeyDescription?: LocalizedText;
  journey?: ServiceDetailCard[];
  commandTitle?: LocalizedText;
  commandBody?: LocalizedText;
  commandPoints?: Record<Locale, string[]>;
  commandProducts?: ProductSlug[];
  cardsTitle: LocalizedText;
  cardsDescription: LocalizedText;
  cards: ServiceDetailCard[];
}

export const SERVICES_LANDING_CONTENT = {
  heroEyebrow: {
    tr: 'Kurumsal Servis Katmanı',
    en: 'Enterprise Service Layer',
  },
  heroTitle: {
    tr: 'Hasardan bakıma, asistanstan saha raporlamasına kadar tüm hizmet akışlarını tek operasyon çizgisinde yönetin.',
    en: 'Manage every service flow, from claims and maintenance to assistance and field reporting, on one operational line.',
  },
  heroLead: {
    tr: 'FleetMole Hizmetlerimiz alanı; resmi sitedeki servis kapsamını dijital operasyon bakışıyla yeniden kurgular. Amaç yalnızca talep toplamak değil, kurumların sahadaki servis kararlarını daha hızlı, daha görünür ve daha ölçülebilir hale getirmektir.',
    en: 'The FleetMole Services area reframes the official service scope through a digital operations lens. The goal is not only to collect demand, but to make service decisions faster, more visible, and easier to measure.',
  },
  heroBody: {
    tr: 'Bakım, hasar, lastik, ikame, tedarikçi, güvenli sürüş ve telematik odaklı servisler; Manager, Partner, Rent, Tracker, Tyre, Trader ve AI ürünleriyle bağlantılı çalışacak şekilde tasarlanır.',
    en: 'Maintenance, damage, tyre, replacement, supplier, safe-driving, and telematics services are designed to work in connection with Manager, Partner, Rent, Tracker, Tyre, Trader, and AI.',
  },
  primaryCta: {
    tr: 'Servis Kapsamını İnceleyin',
    en: 'Explore Service Scope',
  },
  secondaryCta: {
    tr: 'Ekiple Görüşün',
    en: 'Talk to the Team',
  },
  metrics: [
    {
      value: { tr: '10 Servis', en: '10 Services' },
      label: {
        tr: 'Resmi Hizmetlerimiz alanındaki operasyon başlıkları',
        en: 'Operational service lines listed under the official Services section',
      },
    },
    {
      value: { tr: '24/7', en: '24/7' },
      label: {
        tr: 'Asistans, saha yönlendirme ve olay yönetimi yaklaşımı',
        en: 'Assistance, field dispatch, and incident response approach',
      },
    },
    {
      value: { tr: 'Tek Akış', en: 'One Flow' },
      label: {
        tr: 'Talep, onay, tedarikçi ve raporlama katmanını birleştiren yapı',
        en: 'A structure that unifies request, approval, supplier, and reporting layers',
      },
    },
    {
      value: { tr: 'Çift Dilli', en: 'Bilingual' },
      label: {
        tr: 'Türkçe ve İngilizce kullanılabilir kurumsal landing kurgusu',
        en: 'Enterprise landing architecture available in Turkish and English',
      },
    },
  ] satisfies ServiceLandingMetric[],
  processTitle: {
    tr: 'Servis operasyonu nasıl akıyor?',
    en: 'How does the service operation flow?',
  },
  processDescription: {
    tr: 'FleetMole servis yaklaşımı, olay oluştuğu andan rapora kadar tek tek kopuk görevler değil; veriyle bağlanan bir operasyon zinciri olarak ele alınır.',
    en: 'The FleetMole service approach treats the workflow from the moment an event occurs to the final report as one connected operational chain, not a set of disconnected tasks.',
  },
  process: [
    {
      title: {
        tr: '1. Talep ve olay yakalama',
        en: '1. Request and event capture',
      },
      body: {
        tr: 'Kaza, arıza, bakım ihtiyacı, lastik değişimi veya yol yardım talebi dijital kayıt altına alınır; sürücü, operasyon ve tedarikçi aynı başlangıç verisiyle çalışır.',
        en: 'Accidents, breakdowns, maintenance needs, tyre changes, and roadside requests are captured digitally so drivers, operations, and suppliers work from the same starting dataset.',
      },
    },
    {
      title: {
        tr: '2. Akıllı yönlendirme ve koordinasyon',
        en: '2. Smart routing and coordination',
      },
      body: {
        tr: 'SLA, konum, kapasite, araç segmenti ve servis standardı gibi kriterlere göre en doğru servis noktası veya tedarikçi eşleştirilir.',
        en: 'The best-fit workshop or supplier is matched through criteria such as SLA, location, capacity, vehicle segment, and service standard.',
      },
    },
    {
      title: {
        tr: '3. Onay, teslimat ve raporlama',
        en: '3. Approval, delivery, and reporting',
      },
      body: {
        tr: 'Onarım, teslim, iade, tazminat ve geri kazanım adımları izlenebilir hale gelir; maliyet, hız ve kalite performansı raporlanır.',
        en: 'Repair, delivery, return, compensation, and recovery steps become traceable, while cost, speed, and quality performance are reported consistently.',
      },
    },
  ] satisfies ServiceLandingStep[],
  integrationTitle: {
    tr: 'Servisleri ürün ekosistemiyle birlikte çalışacak şekilde kurgulayın.',
    en: 'Design services to operate together with the product ecosystem.',
  },
  integrationDescription: {
    tr: 'Resmi sitedeki hizmetler, FleetMole ürünleriyle birlikte okunduğunda daha net değer üretir. Aşağıdaki entegrasyon katmanları servis süreçlerini veri, onay ve karar desteğiyle güçlendirir.',
    en: 'The services published on the official site become more valuable when read together with FleetMole products. The integration layers below strengthen service execution with data, approvals, and decision support.',
  },
  integrations: [
    {
      product: 'manager',
      title: {
        tr: 'Merkezi operasyon yönetimi',
        en: 'Central operations management',
      },
      body: {
        tr: 'Hasar, bakım, onay ve dosya süreçlerini tek yönetim panelinde toplayarak ekipler arasında görünürlük sağlar.',
        en: 'Brings claims, maintenance, approvals, and case handling into one management panel, improving team visibility.',
      },
    },
    {
      product: 'partner',
      title: {
        tr: 'Tedarikçi ve servis ağı kontrolü',
        en: 'Supplier and service-network control',
      },
      body: {
        tr: 'Tedarikçi sözleşmelerini, kapasiteyi, kalite standardını ve saha performansını denetlenebilir hale getirir.',
        en: 'Makes supplier contracts, capacity, service standards, and field performance measurable and auditable.',
      },
    },
    {
      product: 'tracker',
      title: {
        tr: 'Saha verisi ve anlık tetikleme',
        en: 'Field data and real-time triggers',
      },
      body: {
        tr: 'Telemetri, arıza kodu, sürüş skoru ve lokasyon verisi ile bakım, güvenlik ve raporlama süreçlerini proaktif hale getirir.',
        en: 'Uses telemetry, fault codes, driver scores, and location data to make maintenance, safety, and reporting more proactive.',
      },
    },
    {
      product: 'rent',
      title: {
        tr: 'İkame ve mobilite sürekliliği',
        en: 'Replacement and mobility continuity',
      },
      body: {
        tr: 'Servis, hasar veya operasyon yoğunluğu oluştuğunda ikame araç ve kısa dönem ihtiyaçları aynı akışta yönetir.',
        en: 'Handles replacement vehicles and short-term mobility needs in the same flow whenever service, damage, or demand peaks occur.',
      },
    },
    {
      product: 'smart',
      title: {
        tr: 'Hasar ve değer kaybında akıllı analiz',
        en: 'Smart analysis for claims and depreciation',
      },
      body: {
        tr: 'Dosya, belge ve hasar verisini yorumlayarak değer kaybı, önceliklendirme ve karar hızını artırır.',
        en: 'Interprets case, document, and damage data to improve depreciation handling, prioritization, and decision speed.',
      },
    },
  ] satisfies ServiceLandingIntegration[],
  ctaTitle: {
    tr: 'Servis yapınızı FleetMole operasyon omurgasına göre yeniden tasarlayın.',
    en: 'Rebuild your service structure around the FleetMole operations backbone.',
  },
  ctaBody: {
    tr: 'Hasar, bakım, ikame, lojistik ve saha desteği süreçlerini ayrı ayrı yönetmek yerine; tek ekran, tek karar çizgisi ve tek raporlama standardı üzerinde kurgulayın.',
    en: 'Instead of managing claims, maintenance, replacement, logistics, and field support as isolated functions, build them on one screen, one decision line, and one reporting standard.',
  },
} as const;

export const SERVICE_PAGE_DETAILS = {
  'hasar-yonetimi': {
    heroLead: {
      tr: 'Hasar operasyonunu ilk ihbardan ekspertiz, onarım, sigorta ve ikame araç koordinasyonuna kadar tek dijital akışta yönetin.',
      en: 'Manage the full claim operation, from first notice to inspection, repair, insurance coordination, and replacement mobility, in one digital flow.',
    },
    heroBody: {
      tr: 'FleetMole, araç kazalarını yalnızca onarım işi olarak değil; hız, maliyet, sürücü deneyimi ve yenileme kararlarını etkileyen kurumsal bir operasyon konusu olarak ele alır.',
      en: 'FleetMole treats vehicle accidents not as isolated repair tasks, but as enterprise operations that affect speed, cost, driver experience, and renewal decisions.',
    },
    intro: {
      tr: [
        'Araç kazaları kurumlar için yalnızca servis ihtiyacı doğurmaz; operasyon temposunu düşüren, maliyetleri artıran ve müşteri memnuniyetini riske atan çok katmanlı bir sürece dönüşür. Hasarın yanlış analiz edilmesi, onarım tarafındaki gecikmeler veya sigorta akışındaki kopukluklar kısa sürede görünür verimsizlik yaratır.',
        'FleetMole, kaza anından itibaren tüm süreci uçtan uca koordine eder. Hasar ihbarı, ekspertiz, onarım takibi, sigorta yazışmaları ve onay akışları aynı merkezi platform üzerinden yürütülür; böylece tüm paydaşlar eşzamanlı veriyle çalışır ve manuel takip yükü ortadan kalkar.',
        'Sürücünün sürece sürekli müdahil olmasına gerek kalmadan tüm adımlar sistematik biçimde ilerler. FleetMole Manager ile portföy genelindeki hasarlar tek merkezden izlenir; FleetMole Partner ve Rent ile de ikame mobilite aynı senaryoya bağlanarak operasyonel süreklilik korunur.',
      ],
      en: [
        'For enterprise fleets, accidents are not just repair events. They create multi-layered operational and financial pressure that can quickly increase cost, delay recovery, and damage customer experience when the process is not managed precisely.',
        'FleetMole coordinates the journey end to end from the moment an incident is reported. First notice, inspection, repair follow-up, insurer correspondence, and approval steps are managed on the same central platform so every stakeholder works on synchronized, traceable data.',
        'The workflow progresses systematically without forcing the driver to manage the case manually. With FleetMole Manager, all claims are tracked from one control layer, while FleetMole Partner and Rent help connect replacement mobility to the same operating scenario.',
      ],
    },
    signalsTitle: {
      tr: 'Hasar döneminde kontrolü kaybetmeyin',
      en: 'Stay in control during every claim period',
    },
    signalsDescription: {
      tr: 'Sayfa yapısı, hasar sürecinin en kritik üç yönetim sonucunu net ve karar verdiren şekilde öne çıkarır.',
      en: 'The page architecture highlights the three operational outcomes that matter most when managing claims at scale.',
    },
    signals: [
      {
        value: {
          tr: 'Tek Akış',
          en: 'One Flow',
        },
        label: {
          tr: 'Hasar ihbarı, ekspertiz, onarım ve sigorta yazışmaları aynı kayıt altında birleşir.',
          en: 'First notice, inspection, repair, and insurer correspondence are unified in the same record.',
        },
      },
      {
        value: {
          tr: 'Dijital Onay',
          en: 'Digital Approval',
        },
        label: {
          tr: 'Operasyon, servis, sigorta ve yönetim ekipleri aynı karar çizgisinde eşzamanlı ilerler.',
          en: 'Operations, workshops, insurers, and management teams move on the same approval line.',
        },
      },
      {
        value: {
          tr: 'Mobilite Hazır',
          en: 'Mobility Ready',
        },
        label: {
          tr: 'İkame araç koordinasyonu hasar akışına bağlanarak kesinti süresi ve manuel temas azalır.',
          en: 'Replacement mobility is tied into the claim workflow to reduce downtime and manual coordination.',
        },
      },
    ],
    spotlightTitle: {
      tr: 'Hasar sürecini manuel takibin dışına taşıyın',
      en: 'Move claims beyond manual follow-up',
    },
    spotlightDescription: {
      tr: 'Bu katmanlar, hasar yönetimini sadece dosya kapatan bir yapı olmaktan çıkarıp karar destekleyen bir operasyon modeline dönüştürür.',
      en: 'These layers turn claims from a simple case-closing workflow into an operational model that actively supports enterprise decisions.',
    },
    spotlightCards: [
      {
        title: {
          tr: 'Hatalı ve geciken dosyaları azaltın',
          en: 'Reduce delayed and error-prone cases',
        },
        body: {
          tr: 'Eksik evrak, bekleyen aksiyon ve kapatılmamış onay adımları aynı ekranda görünür olduğu için dosyalar karanlıkta kalmaz.',
          en: 'Missing paperwork, pending actions, and incomplete approvals remain visible on the same screen so cases do not disappear into operational blind spots.',
        },
      },
      {
        title: {
          tr: 'Onarım ve sigorta çizgisini hizalayın',
          en: 'Align repair and insurance execution',
        },
        body: {
          tr: 'Servis, ekspertiz ve sigorta tarafı ayrı ayrı e-posta zincirleriyle değil; ortak bir süreç omurgasıyla çalışır.',
          en: 'Workshops, inspectors, and insurers operate through one shared process backbone instead of fragmented email threads.',
        },
      },
      {
        title: {
          tr: 'Portföy riskini rapora dönüştürün',
          en: 'Turn portfolio risk into reporting insight',
        },
        body: {
          tr: 'Hasar frekansı, maliyet paterni ve servis performansı düzenli raporlandığında yenileme döneminde daha güçlü pazarlık zemini oluşur.',
          en: 'When claim frequency, cost patterns, and workshop performance are reported consistently, renewal negotiations become materially stronger.',
        },
      },
    ],
    journeyTitle: {
      tr: 'Kaza anından kapanış raporuna kadar tek çizgi',
      en: 'One line from first notice to closure reporting',
    },
    journeyDescription: {
      tr: 'Hasar yönetimi, birbirinden kopuk görevler yerine ardışık ama görünür bir teslim zinciri olarak yapılandırılır.',
      en: 'The claim workflow is designed not as a set of disconnected tasks, but as a visible chain of operational handoffs.',
    },
    journey: [
      {
        title: {
          tr: 'İhbar ve ilk kayıt',
          en: 'First notice and intake',
        },
        body: {
          tr: 'Kaza bilgisi, fotoğraf ve ilk dosya verileri dijital olarak açılır; süreç aynı andan itibaren izlenebilir hale gelir.',
          en: 'Incident details, photos, and first case data are captured digitally so the process becomes traceable from the first moment.',
        },
      },
      {
        title: {
          tr: 'Ekspertiz ve belge doğrulama',
          en: 'Inspection and documentation validation',
        },
        body: {
          tr: 'Ekspertiz notları, evrak seti ve karar öncesi kontroller tek kayıt içinde tamamlanır; eksikler anında görünür olur.',
          en: 'Inspection notes, documentation, and pre-decision checks are completed inside one record where gaps remain immediately visible.',
        },
      },
      {
        title: {
          tr: 'Onarım, sigorta ve yönlendirme',
          en: 'Repair, insurer, and routing coordination',
        },
        body: {
          tr: 'Onarım kararı, servis yönlendirmesi ve sigorta yazışmaları ortak bir onay akışıyla ilerleyerek zaman kaybını düşürür.',
          en: 'Repair decisions, workshop routing, and insurer coordination advance through a shared approval flow that reduces delay.',
        },
      },
      {
        title: {
          tr: 'Kapanış, rapor ve yenileme içgörüsü',
          en: 'Closure, reporting, and renewal insight',
        },
        body: {
          tr: 'Dosya tamamlandığında maliyet, süre, servis kalitesi ve geri kazanım etkisi raporlanarak gelecek poliçe kararları beslenir.',
          en: 'Once the case is closed, cost, speed, workshop quality, and recovery impact are reported to support future policy decisions.',
        },
      },
    ],
    commandTitle: {
      tr: 'Sürücüyü yormadan, hasar akışını merkezden yönetin',
      en: 'Run the claim flow centrally without burdening the driver',
    },
    commandBody: {
      tr: 'FleetMole’un dijital hasar yönetimi yaklaşımı; operasyonel verimlilik, maliyet kontrolü ve müşteri memnuniyetini aynı yönetim katmanında bir araya getirir. Böylece olay çözülse bile veri kaybolmaz; her dosya sonraki kararların kalitesini artıran bir içgörüye dönüşür.',
      en: 'FleetMole’s digital claims approach brings operational efficiency, cost control, and customer satisfaction into the same management layer. Even after the incident is resolved, the data remains usable and becomes insight for better future decisions.',
    },
    commandPoints: {
      tr: [
        'Sürücünün sürece müdahalesini minimuma indirirken operasyon görünürlüğünü artırır.',
        'FleetMole Manager ile hasar yoğunluğu, maliyet paternleri ve servis performansı portföy seviyesinde raporlanır.',
        'FleetMole Partner ve Rent altyapısı sayesinde hasar döneminde ikame mobilite aynı senaryoda korunur.',
      ],
      en: [
        'Reduces the need for driver-side intervention while increasing operational visibility for the business.',
        'FleetMole Manager turns claim density, cost patterns, and workshop performance into portfolio-level reporting.',
        'FleetMole Partner and Rent help preserve replacement mobility within the same operating scenario during damage periods.',
      ],
    },
    commandProducts: ['manager', 'partner', 'rent', 'smart'],
    cardsTitle: {
      tr: 'Hasar akışını profesyonelleştiren operasyon katmanları',
      en: 'Operational layers that professionalize the claim flow',
    },
    cardsDescription: {
      tr: 'Bu bölüm, hasar yönetimini daha hızlı, daha denetlenebilir ve daha raporlanabilir hale getiren ana yapı taşlarını özetler.',
      en: 'This section summarizes the operating blocks that make claim management faster, more controllable, and more reportable.',
    },
    cards: [
      {
        title: {
          tr: 'İhbar, ekspertiz ve belge yönetimi',
          en: 'First notice, inspection, and documentation control',
        },
        body: {
          tr: 'Kaza ihbarı, fotoğraflar, ekspertiz notları ve sigorta evrakı aynı dosyada toplandığı için eksik belge veya bekleyen adım gecikmeye dönüşmeden fark edilir.',
          en: 'Claim intake, photos, inspection notes, and insurer documents stay in the same case so missing paperwork and pending steps are identified before they create delay.',
        },
      },
      {
        title: {
          tr: 'Onarım, sigorta ve onay orkestrasyonu',
          en: 'Repair, insurer, and approval orchestration',
        },
        body: {
          tr: 'Servis yönlendirmesi, onarım kararı, tedarikçi koordinasyonu ve sigorta yazışmaları tek dijital karar çizgisi üzerinde ilerler.',
          en: 'Workshop routing, repair decisions, supplier coordination, and insurer communication move on one digital decision line.',
        },
      },
      {
        title: {
          tr: 'Raporlama, risk ve yenileme içgörüsü',
          en: 'Reporting, risk, and renewal insight',
        },
        body: {
          tr: 'Tekil dosya takibinin ötesine geçilerek hasar yoğunluğu, maliyet paternleri ve yenileme dönemine etki eden eğilimler ölçülebilir hale gelir.',
          en: 'The workflow moves beyond one-off case handling so claim density, cost patterns, and renewal-relevant trends become measurable across the fleet.',
        },
      },
    ],
  },
  'mekanik-bakim-yonetimi': {
    intro: {
      tr: [
        'FleetMole’un resmi bakım tanımı, periyodik bakım ile arıza yönetimini tek takvim üzerinde birleştirir. Özellikle bakım bilgisi kurum içinde dağınık kaldığında servis planlaması ciddi zaman ve maliyet kaybı yaratır.',
        'Manager ile Tracker birlikte çalıştığında kilometre, zaman ve telemetri temelli tetikler otomatik hale gelir; böylece geciken bakım, plansız arıza ve yüksek onarım faturaları proaktif biçimde azaltılır.',
      ],
      en: [
        'The official FleetMole maintenance definition combines scheduled service and breakdown handling on a single calendar. When maintenance knowledge remains fragmented across the business, planning quickly turns into a major time and cost burden.',
        'When Manager works together with Tracker, mileage, time, and telemetry-based triggers become automatic, helping reduce overdue service, unplanned failures, and expensive repairs before they escalate.',
      ],
    },
    cardsTitle: {
      tr: 'Bakım yönetimini ölçülebilir hale getiren bileşenler',
      en: 'The components that make maintenance measurable',
    },
    cardsDescription: {
      tr: 'Bu katmanlar resmi sitede anlatılan periyodik bakım ve erken uyarı yaklaşımını kurumsal operasyon diline çevirir.',
      en: 'These layers translate the official scheduled-maintenance and early-warning approach into an enterprise operating model.',
    },
    cards: [
      {
        title: {
          tr: 'Periyot ve kilometre tetikleri',
          en: 'Interval and mileage triggers',
        },
        body: {
          tr: 'Her araç için marka, model ve kullanım yoğunluğuna göre servis periyotları tanımlanır; bakım bildirimi manuel takibe ihtiyaç duymadan oluşur.',
          en: 'Service intervals are defined for each vehicle by make, model, and usage intensity so maintenance notifications can be created without manual tracking.',
        },
      },
      {
        title: {
          tr: 'Arıza öngörüsü ve erken uyarı',
          en: 'Failure prediction and early warning',
        },
        body: {
          tr: 'Telemetri, sensör verisi ve arıza kodları yorumlanarak ekiplerin sorun oluşmadan müdahale etmesine imkân tanınır.',
          en: 'Telemetry, sensor data, and fault codes are interpreted so teams can intervene before issues become service-disrupting failures.',
        },
      },
      {
        title: {
          tr: 'Servis performansı ve maliyet görünürlüğü',
          en: 'Workshop performance and cost visibility',
        },
        body: {
          tr: 'Bakım talepleri, onay süreleri, servis kalitesi ve tamamlanma performansı aynı panelde izlenerek tedarikçi kalitesi karşılaştırılabilir hale gelir.',
          en: 'Maintenance requests, approval times, workshop quality, and completion performance are monitored on one panel so supplier quality becomes comparable.',
        },
      },
    ],
  },
  'lastik-yonetimi': {
    intro: {
      tr: [
        'Resmi hizmet içeriği lastik yönetimini güvenlik, mevsimsellik ve maliyet disiplininin birleştiği kritik bir operasyon alanı olarak tanımlar. Özellikle kilometreye bağlı aşınma ve mevsimsel geçişler doğru planlanmadığında hem yasal hem operasyonel risk oluşur.',
        'FleetMole Tyre yaklaşımı, değişim planı, randevu, saklama, diş derinliği ve yeniden kullanım potansiyelini aynı akışta yöneterek lastiği araçtan bağımsız izlenebilir bir varlığa dönüştürür.',
      ],
      en: [
        'The official service content positions tyre management as a critical operational domain where safety, seasonality, and cost discipline meet. When wear patterns and seasonal transitions are not planned correctly, both legal and operational risks increase.',
        'The FleetMole Tyre approach manages change planning, appointments, storage, tread depth, and reuse potential in the same flow, turning tyres into traceable assets independent of the vehicle itself.',
      ],
    },
    cardsTitle: {
      tr: 'Lastik operasyonunun kurumsal kontrol noktaları',
      en: 'Enterprise control points for tyre operations',
    },
    cardsDescription: {
      tr: 'Bu servis, resmi sitede anlatılan değişim ve saklama süreçlerini daha karar verdiren bir işletim modeline taşır.',
      en: 'This service turns the official tyre-change and storage scope into a more decision-ready operating model.',
    },
    cards: [
      {
        title: {
          tr: 'Mevsimsel planlama ve randevu',
          en: 'Seasonal planning and appointments',
        },
        body: {
          tr: 'Mevsim geçişleri, lokasyon, araç uygunluğu ve kullanım yoğunluğu birlikte değerlendirilerek değişim takvimi otomatik planlanır.',
          en: 'Seasonal changes, location, vehicle availability, and usage intensity are evaluated together so the change calendar can be planned automatically.',
        },
      },
      {
        title: {
          tr: 'Ömür, stok ve saklama görünürlüğü',
          en: 'Lifecycle, stock, and storage visibility',
        },
        body: {
          tr: 'Diş derinliği, rot balans, otel süreci ve depodaki kullanılabilir lastik stoğu merkezi biçimde görünür olur.',
          en: 'Tread depth, balancing, storage workflow, and reusable tyre stock all become centrally visible and easier to manage.',
        },
      },
      {
        title: {
          tr: 'Tasarruf ve yeniden kullanım yönetimi',
          en: 'Savings and reuse management',
        },
        body: {
          tr: 'Sözleşmesi sona eren veya satılan araçlardan kalan lastikler raporlanarak yeniden değerlendirme fırsatları oluşturulur.',
          en: 'Tyres remaining after a contract ends or a vehicle is sold are reported clearly so reuse opportunities can be identified and acted on.',
        },
      },
    ],
  },
  'tedarikci-lojistik-yonetimi': {
    intro: {
      tr: [
        'FleetMole’un resmi hizmet metni, tedarikçi yönetimini yalnızca sözleşme veya fiyat karşılaştırması değil; kalite, teslim hızı ve saha koordinasyonunun birlikte ölçüldüğü bir ağ disiplini olarak tanımlar.',
        'Partner platformu üzerinden yapılan bu yapılandırma, servis noktası seçimi, parça tedariği, bölgesel kapsama ve lojistik performansını aynı çatı altında değerlendirerek daha güçlü müzakere avantajı üretir.',
      ],
      en: [
        'The official FleetMole service narrative frames supplier management not just as contract or price comparison, but as a network discipline where quality, delivery speed, and field coordination are measured together.',
        'Built on top of the Partner platform, this structure evaluates workshop choice, parts supply, regional coverage, and logistics performance under the same roof to create stronger negotiation leverage.',
      ],
    },
    cardsTitle: {
      tr: 'Tedarikçi ağını daha denetlenebilir kılan alanlar',
      en: 'The layers that make the supplier network more controllable',
    },
    cardsDescription: {
      tr: 'Resmi sitede öne çıkan kalite, sözleşme ve lojistik odakları, kurumsal karar akışına uygun alt başlıklara çevrildi.',
      en: 'The quality, contract, and logistics themes highlighted on the official site are translated into an enterprise decision model.',
    },
    cards: [
      {
        title: {
          tr: 'Sözleşme ve hizmet standardı',
          en: 'Contracts and service standards',
        },
        body: {
          tr: 'Tedarikçilerle yapılan anlaşmalar, kapsam, SLA ve kalite beklentileri açısından aynı referans setinde yönetilir.',
          en: 'Supplier agreements are managed through a shared reference model for scope, SLA, and quality expectations.',
        },
      },
      {
        title: {
          tr: 'Bölgesel kapsama ve yönlendirme',
          en: 'Regional coverage and routing',
        },
        body: {
          tr: 'Arıza veya bakım ihtiyacında sistem en uygun servis noktasını kapasite ve lokasyon verisine göre seçerek zaman kaybını azaltır.',
          en: 'During maintenance or failure events, the system selects the best-fit service point using capacity and location data to reduce time loss.',
        },
      },
      {
        title: {
          tr: 'Performans puanlama ve iyileştirme',
          en: 'Performance scoring and improvement',
        },
        body: {
          tr: 'Teslim süresi, maliyet, kalite ve işlem başarısı düzenli ölçülerek tedarikçi bazında geliştirme alanları görünür hale gelir.',
          en: 'Lead time, cost, quality, and execution success are measured continuously so supplier-specific improvement areas become visible.',
        },
      },
    ],
  },
  'ikame-arac-yonetimi': {
    intro: {
      tr: [
        'Resmi site içeriği ikame araç hizmetini, araç servise girdiği anda mobiliteyi kesintisiz sürdürmeye odaklı bir çözüm olarak konumlandırır. Özellikle sahada aktif ekiplerde araçsız kalma süresi operasyonel verimliliği doğrudan düşürür.',
        'FleetMole Rent ile ikame talebi otomatik oluşturulur; araç havuzu, segment uygunluğu ve tedarikçi kapasitesi birlikte değerlendirilerek teslim ve iade adımları dijital kayıt altına alınır.',
      ],
      en: [
        'The official site positions replacement-vehicle management as a service focused on maintaining mobility the moment a vehicle enters service. For field teams in particular, downtime immediately affects productivity.',
        'With FleetMole Rent, replacement requests are created automatically while fleet pool availability, segment fit, and supplier capacity are evaluated together so delivery and return steps remain fully traceable.',
      ],
    },
    cardsTitle: {
      tr: 'Kesintisiz mobilite için kritik adımlar',
      en: 'Critical layers for uninterrupted mobility',
    },
    cardsDescription: {
      tr: 'İkame süreci yalnızca araç bulmak değil; talep, yönlendirme, teslim ve görünürlük akışını aynı operasyon standardında tutmaktır.',
      en: 'Replacement management is not only about finding a vehicle. It is about keeping request, routing, delivery, and visibility under the same operating standard.',
    },
    cards: [
      {
        title: {
          tr: 'Otomatik ikame talebi',
          en: 'Automatic replacement requests',
        },
        body: {
          tr: 'Araç servise alındığı anda ikame ihtiyacı dijital olarak doğar ve operasyon ekibi manuel takip yükü olmadan süreci başlatır.',
          en: 'The moment a vehicle is taken into service, the replacement need is generated digitally so operations can launch the flow without manual coordination overhead.',
        },
      },
      {
        title: {
          tr: 'Segment ve lokasyon eşleştirmesi',
          en: 'Segment and location matching',
        },
        body: {
          tr: 'Kurum politikaları, sürücü ihtiyacı ve tedarikçi kapasitesi bir araya getirilerek en uygun araç yönlendirilir.',
          en: 'Company policies, driver needs, and supplier capacity are brought together so the most suitable replacement vehicle can be assigned.',
        },
      },
      {
        title: {
          tr: 'Teslim, iade ve rapor görünürlüğü',
          en: 'Delivery, return, and reporting visibility',
        },
        body: {
          tr: 'Araç teslim alma, iade ve kullanım süresi tek akışta izlendiği için geçici mobilite kayıpları ve maliyet sapmaları daha kolay yönetilir.',
          en: 'Because delivery, return, and usage duration are tracked in one flow, temporary mobility losses and cost deviations become much easier to control.',
        },
      },
    ],
  },
  'deger-kaybi-yonetimi': {
    intro: {
      tr: [
        'Resmi hizmet içeriği, kaza sonrası oluşan değer kaybını gözden kaçan fakat finansal etkisi yüksek bir konu olarak ele alır. Araç onarılsa bile ikinci el rayiç değerinde yaşanan düşüş, doğrudan varlık değerini etkiler.',
        'FleetMole AI ile bu süreç yalnızca hesaplama değil; belge üretimi, doğrulama, tazmin hazırlığı ve filo politikalarını besleyen içgörü katmanıyla birlikte ele alınır.',
      ],
      en: [
        'The official service content treats post-accident depreciation as a frequently overlooked issue with a meaningful financial impact. Even after repair, the drop in market value directly affects asset worth.',
        'With FleetMole AI, the process is handled not only as a calculation problem, but together with document generation, validation, compensation readiness, and insight for future fleet policy.',
      ],
    },
    cardsTitle: {
      tr: 'Değer kaybı dosyasını güçlendiren aşamalar',
      en: 'The layers that strengthen depreciation cases',
    },
    cardsDescription: {
      tr: 'Resmi sitedeki AI destekli yaklaşım, kurumsal tahsilat ve varlık değeri bakışına göre genişletildi.',
      en: 'The AI-supported approach described on the official site is extended here around enterprise recovery and asset-value protection.',
    },
    cards: [
      {
        title: {
          tr: 'AI destekli değerleme',
          en: 'AI-supported valuation',
        },
        body: {
          tr: 'Araç yaşı, kilometresi, hasar boyutu ve pazar verisi birleştirilerek standart ve savunulabilir değer kaybı tahmini oluşturulur.',
          en: 'Vehicle age, mileage, damage scope, and market data are combined to produce a consistent and defensible depreciation estimate.',
        },
      },
      {
        title: {
          tr: 'Belge ve tazminat hazırlığı',
          en: 'Documentation and compensation readiness',
        },
        body: {
          tr: 'Uzman doğrulamasıyla hazırlanan raporlar sigorta veya karşı tarafa gönderime uygun hale getirilir; süreç yasal süreler içinde takip edilir.',
          en: 'Reports validated by specialists are prepared for insurer or counterparty submission, while deadlines are tracked in line with the legal window.',
        },
      },
      {
        title: {
          tr: 'Portföy içgörüsü ve politika iyileştirme',
          en: 'Portfolio insight and policy improvement',
        },
        body: {
          tr: 'Hangi araç grubunun ne sıklıkta değer kaybı oluşturduğu analiz edilerek satın alma, kullanım ve yenileme politikaları veriyle beslenir.',
          en: 'By analyzing which vehicle groups generate depreciation most often, procurement, usage, and renewal policies can be refined with evidence.',
        },
      },
    ],
  },
  'rucu-yonetimi': {
    intro: {
      tr: [
        'FleetMole’un resmi rücu hizmeti, kusurlu tarafın bulunduğu kazalarda kurumların geri kazanım hakkını standartlaştırılmış bir süreçle korumaya odaklanır. Rücu ihmal edildiğinde, alınabilecek tazminatların önemli bir kısmı masada kalır.',
        'Bu nedenle hasar verisi, kusur oranı, belge seti ve hukuki ilerleme aynı dijital çizgide takip edilir; yalnızca dosya açmak değil, geri kazanım performansını ölçmek hedeflenir.',
      ],
      en: [
        'The official FleetMole recovery service focuses on protecting enterprise reimbursement rights in cases where the counterparty is at fault through a standardized process.',
        'For that reason, claim data, fault ratio, supporting documents, and legal progress are tracked on the same digital line. The goal is not only to open cases, but to measure overall recovery performance.',
      ],
    },
    cardsTitle: {
      tr: 'Rücu sürecinin kontrol altında kalmasını sağlayan alanlar',
      en: 'The layers that keep recovery under control',
    },
    cardsDescription: {
      tr: 'Kurumsal ekipler için önemli olan hız, şeffaflık ve finansal entegrasyon başlıkları ayrılaştırıldı.',
      en: 'The most relevant enterprise concerns, speed, transparency, and financial integration, are separated into clear operating layers.',
    },
    cards: [
      {
        title: {
          tr: 'Kusur ve uygun dosya seçimi',
          en: 'Fault assessment and case qualification',
        },
        body: {
          tr: 'Hasar bilgisi ve ekspertiz verisi üzerinden rücuya uygun dosyalar ayrıştırılır; süreç gereksiz takip yükü oluşturmadan önceliklendirilir.',
          en: 'Claim and inspection data help qualify the cases that are suitable for recovery, allowing teams to prioritize without creating unnecessary follow-up overhead.',
        },
      },
      {
        title: {
          tr: 'Başvuru, belge ve hukuki izleme',
          en: 'Submission, documentation, and legal follow-up',
        },
        body: {
          tr: 'Gerekli belgeler, başvuru adımları ve ilerleme kayıtları sistematik biçimde yönetilerek tüm paydaşlara görünürlük sağlanır.',
          en: 'Required documents, filing steps, and progress records are managed systematically so every stakeholder retains visibility over the case.',
        },
      },
      {
        title: {
          tr: 'Geri kazanım ve finans entegrasyonu',
          en: 'Recovery and financial integration',
        },
        body: {
          tr: 'Tahsil edilen tutarlar mali raporlamaya bağlanır; böylece rücu yalnızca hukuki başarı değil, ölçülebilir finansal katkı haline gelir.',
          en: 'Recovered amounts are connected to financial reporting so recovery is measured not only as a legal success, but as a clear financial contribution.',
        },
      },
    ],
  },
  'asistans-hizmetleri': {
    intro: {
      tr: [
        'Resmi FleetMole metni asistans hizmetini, sürücünün yolda kaldığı an ile operasyon merkezinin çözüm üretme hızı arasındaki kritik katman olarak tanımlar. Bu alan yalnızca acil müdahale değil, aynı zamanda sürücü deneyimi ve operasyon devamlılığı meselesidir.',
        'FleetMole Assist yaklaşımı; çağrı, lokasyon bazlı yönlendirme, çekici, vale ve süreç raporlamasını tek bir hizmet standardında birleştirir. Böylece olay çözülse bile veri kaybolmaz, kalite performansı izlenebilir kalır.',
      ],
      en: [
        'The official FleetMole narrative defines assistance services as the critical layer between a driver being stranded and the operations center delivering a response quickly. This is not only an emergency issue, but also a driver-experience and continuity issue.',
        'The FleetMole Assist approach combines calls, location-based dispatching, towing, valet support, and service reporting under one standard so the event does not disappear once it is resolved.',
      ],
    },
    cardsTitle: {
      tr: '7/24 asistans yönetiminin temel bileşenleri',
      en: 'Core components of 24/7 assistance management',
    },
    cardsDescription: {
      tr: 'Operasyon merkezinin hız kazanması ve sürücünün daha güvenli deneyim yaşaması için gereken ana katmanlar bunlardır.',
      en: 'These are the operating layers that help the control center move faster while giving drivers a safer and more predictable experience.',
    },
    cards: [
      {
        title: {
          tr: 'Çağrı ve vaka yönetimi',
          en: 'Call and case management',
        },
        body: {
          tr: 'Sürücünün destek talebi tek dosyada toplanır; olay tipi, lokasyon ve çözüm adımları aynı kayıt üzerinden izlenir.',
          en: 'Driver support requests are captured in a single case so incident type, location, and resolution steps can be followed from one record.',
        },
      },
      {
        title: {
          tr: 'Lokasyon bazlı saha yönlendirmesi',
          en: 'Location-based field dispatch',
        },
        body: {
          tr: 'En yakın yardım ekibi, çekici veya vale hizmeti kapasite ve erişim verisine göre devreye alınarak bekleme süresi azaltılır.',
          en: 'The closest towing, roadside, or valet resource is dispatched using capacity and access data, helping reduce wait time significantly.',
        },
      },
      {
        title: {
          tr: 'Hizmet kalitesi ve sürekli iyileştirme',
          en: 'Service quality and continuous improvement',
        },
        body: {
          tr: 'Tüm asistans işlemleri kayıt altına alındığı için çözüm süresi, tedarikçi kalitesi ve memnuniyet göstergeleri düzenli ölçülebilir.',
          en: 'Because all assistance actions are recorded, resolution time, supplier quality, and satisfaction indicators can be measured on a recurring basis.',
        },
      },
    ],
  },
  'guvenli-surus-egitimi': {
    intro: {
      tr: [
        'Resmi güvenli sürüş sayfası, sürdürülebilir filo operasyonlarının temelini sürücü davranışında görür ve Demir Bükey Akademi iş ortaklığını öne çıkarır. Ana mesaj nettir: kazaların önemli bir bölümü insan kaynaklıdır ve eğitim doğrudan TCO, güvenlik ve marka itibarı üzerinde etki yaratır.',
        'Bu nedenle güvenli sürüş eğitimi yalnızca teorik bir gelişim başlığı değildir. Kaza frekansını düşüren, sigorta maliyetini etkileyen ve riskli sürüş alışkanlıklarını kalıcı olarak azaltan operasyonel bir yatırım olarak ele alınmalıdır.',
      ],
      en: [
        'The official safe-driving page presents driver behavior as the foundation of sustainable fleet operations and highlights the partnership with Demir Bukey Academy. The message is clear: a large share of fleet accidents is human-driven, and training directly influences TCO, safety, and brand reputation.',
        'For that reason, safe-driving education should not be treated as a soft training topic. It should be handled as an operational investment that reduces accident frequency, affects insurance cost, and permanently lowers risky driving habits.',
      ],
    },
    cardsTitle: {
      tr: 'Eğitim programını operasyonel faydaya çeviren başlıklar',
      en: 'The layers that turn training into operational value',
    },
    cardsDescription: {
      tr: 'Resmi sitede anlatılan kritik riskler ve akademi iş ortaklığı, kurumsal uygulanabilirlik açısından yeniden yapılandırıldı.',
      en: 'The critical risks and academy partnership described on the official site are reframed here around enterprise applicability.',
    },
    cards: [
      {
        title: {
          tr: 'Risk bazlı eğitim planı',
          en: 'Risk-based training planning',
        },
        body: {
          tr: 'Kaza geçmişi, sürüş skoru ve saha profili birlikte değerlendirilerek hangi sürücü grubunun hangi modüle ihtiyaç duyduğu netleştirilir.',
          en: 'Accident history, driver score, and field profile are evaluated together so the right training modules can be assigned to the right driver groups.',
        },
      },
      {
        title: {
          tr: 'Teorik ve uygulamalı program',
          en: 'Theoretical and practical program design',
        },
        body: {
          tr: 'Sınıf içi anlatım ile saha uygulaması birleştirilerek yalnızca farkındalık değil davranış dönüşümü hedeflenir.',
          en: 'Classroom training and field practice are combined to drive not just awareness, but actual behavioral change.',
        },
      },
      {
        title: {
          tr: 'TCO ve güvenlik etkisi',
          en: 'TCO and safety impact',
        },
        body: {
          tr: 'Kaza frekansı, sigorta maliyeti, iş gücü kaybı ve itibar riski gibi başlıklar eğitim sonrası daha görünür ve ölçülebilir hale gelir.',
          en: 'Accident frequency, insurance cost, workforce loss, and reputation risk become easier to monitor and improve after the training program is applied.',
        },
      },
    ],
  },
  'arac-takip-ve-raporlama': {
    intro: {
      tr: [
        'Resmi Hizmetlerimiz alanı araç takip ve raporlamayı anlık görünürlük sağlayan bir operasyon servisi olarak konumlandırır. FleetMole Tracker ürün sayfası ise bu yaklaşımı telemetri, sürüş skoru, geo-fence ve tahmine dayalı bakım modülleriyle detaylandırır.',
        'Bu servis, lokasyon bilgisi toplamanın ötesinde; araç kullanımını karar destek raporlarına dönüştürmek, riskli sürüşü erken görmek ve saha verisini bakım ya da operasyon aksiyonuna çevirmek için tasarlanır.',
      ],
      en: [
        'The official Services section positions vehicle tracking and reporting as an operational service that creates real-time visibility. The FleetMole Tracker product page expands that model with telemetry, driver scoring, geo-fence, and predictive maintenance modules.',
        'This service goes beyond simply collecting location data. It is designed to convert usage patterns into decision-support reports, detect risky behavior early, and turn field data into maintenance or operational action.',
      ],
    },
    cardsTitle: {
      tr: 'Araç takip servisinin karar verdiren katmanları',
      en: 'Decision-driving layers of the tracking service',
    },
    cardsDescription: {
      tr: 'Resmi içerikteki anlık izleme yaklaşımı, kurumsal raporlama ve risk yönetimi diline göre zenginleştirildi.',
      en: 'The real-time monitoring model from the official content is expanded here through an enterprise reporting and risk-management lens.',
    },
    cards: [
      {
        title: {
          tr: 'Canlı telemetri ve saha görünürlüğü',
          en: 'Live telemetry and field visibility',
        },
        body: {
          tr: 'Araç konumu, kullanım şekli, sensör verileri ve motor sağlığı göstergeleri tek ekranda izlenerek saha aktivitesi anlık görünür olur.',
          en: 'Vehicle location, usage pattern, sensor data, and engine-health indicators are monitored on one screen so field activity stays visible in real time.',
        },
      },
      {
        title: {
          tr: 'Uyarı, geo-fence ve sürücü davranışı',
          en: 'Alerts, geo-fence, and driver behavior',
        },
        body: {
          tr: 'Coğrafi sınır ihlalleri, riskli sürüş davranışları ve kritik olaylar kurala bağlı uyarılarla operasyon ekibine taşınır.',
          en: 'Geofence violations, risky driving patterns, and critical events are surfaced to operations through rule-based alerts.',
        },
      },
      {
        title: {
          tr: 'Raporlama ve bakım tetikleme',
          en: 'Reporting and maintenance triggering',
        },
        body: {
          tr: 'Toplanan veri grafiksel raporlara dönüştürülür; önleyici ve tahmine dayalı bakım kararları aynı servis katmanı içinde beslenir.',
          en: 'The collected data is transformed into graphical reporting so preventive and predictive maintenance decisions can be fed by the same service layer.',
        },
      },
    ],
  },
} as const satisfies Record<string, ServicePageDetail>;

export type ServicePageSlug = keyof typeof SERVICE_PAGE_DETAILS;

export const getServicePageDetail = (slug?: string): ServicePageDetail | undefined =>
  slug && slug in SERVICE_PAGE_DETAILS ? SERVICE_PAGE_DETAILS[slug as ServicePageSlug] : undefined;
