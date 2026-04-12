import type { Locale } from '../config/site';

type LocalizedValue<T> = {
  tr: T;
  en?: T;
};

export interface LegalDocumentLink {
  label: LocalizedValue<string>;
  href: string;
}

export interface LegalDocumentTable {
  columns: LocalizedValue<string[]>;
  rows: LocalizedValue<string[][]>;
}

export interface LegalDocumentSection {
  heading?: LocalizedValue<string>;
  paragraphs?: LocalizedValue<string[]>;
  bullets?: LocalizedValue<string[]>;
  table?: LegalDocumentTable;
  links?: LegalDocumentLink[];
}

export interface LegalDocument {
  slug: string;
  lead: LocalizedValue<string>;
  body?: LocalizedValue<string>;
  summary: LocalizedValue<string[]>;
  updatedAt?: LocalizedValue<string>;
  footerLabel?: LocalizedValue<string>;
  sections: LegalDocumentSection[];
}

const UPDATED_AT = {
  tr: '10.11.2025',
  en: '10 Nov 2025',
} as const;

const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    slug: 'kullanim-sartlari',
    lead: {
      tr: 'www.fleetmole.com adresi üzerinden ulaşılan web sitesinin kullanımı aşağıdaki şartlara tabidir.',
      en: 'Use of the website available at www.fleetmole.com is subject to the terms below.',
    },
    body: {
      tr: 'Siteyi ziyaret eden kullanıcılar, bu kullanım şartlarını okumuş ve kabul etmiş sayılır.',
      en: 'The official wording currently published for this page is provided below in Turkish.',
    },
    summary: {
      tr: [
        'Web sitesi kullanım koşulları',
        'Fikri ve sınaî mülkiyet hakları',
        'Sorumluluk sınırları ve değişiklik hakkı',
        'Türk hukuku ve İstanbul Anadolu yetkisi',
      ],
      en: [
        'Website usage conditions',
        'Intellectual property rights',
        'Liability limits and update rights',
        'Turkish law and Istanbul Anatolian jurisdiction',
      ],
    },
    footerLabel: {
      tr: 'Kullanım Şartları',
      en: 'Terms of Use',
    },
    sections: [
      {
        paragraphs: {
          tr: [
            'Bu Kullanım Şartları, www.fleetmole.com adresi üzerinden ulaşılan web sitesinin internet kullanıcıları tarafından ziyaret edilmesine ilişkin kullanım koşullarını içermektedir. Bu siteyi ziyaret eden kullanıcılar (“Kullanıcılar”), aşağıdaki Kullanım Şartları’nı okumuş ve kabul etmiş sayılırlar.',
          ],
        },
      },
      {
        heading: {
          tr: 'Fikri ve Sınaî Mülkiyet Hakları',
          en: 'Intellectual Property Rights',
        },
        paragraphs: {
          tr: [
            'Yukarıda belirtilen web sitesi ve bu web sitesinde yer alan ticari marka, logo, bilgi, resim ve görüntü başta olmak üzere her türlü içerik üzerindeki tüm hak ve menfaatler (fikri ve sınaî mülkiyet hakları dâhil olmak üzere) Fleetmole Bilişim Kiralama Danışmanlık Tic. Ltd. Şti.’ne (“Şirket”) ve/veya hak ve menfaatleri saklı üçüncü şahıslara aittir.',
            'Söz konusu içerikler, Şirket’in önceden alınan yazılı izni olmadan doğrudan veya dolaylı olarak kopyalanamaz, çoğaltılamaz, dağıtılamaz, yayınlanamaz, değiştirilemez, aynen veya değiştirilerek ya da ticari bir amaçla kaynak gösterilmek suretiyle kullanılamaz, hiçbir format altında bilgisayar sistemlerine aktarılamaz ve bunlar üzerinde herhangi bir şekilde tasarrufta bulunulamaz.',
          ],
        },
      },
      {
        heading: {
          tr: 'Garanti ve Sorumluluk Reddi',
          en: 'Warranty and Liability Disclaimer',
        },
        paragraphs: {
          tr: [
            'Şirket, web sitesi ve içeriklerin doğruluğu ve güncelliği açısından herhangi bir garanti vermemektedir. Web sitesinde ve içeriğinde bulunan hiçbir unsur, Şirket’in Kullanıcılar’a ya da üçüncü kişilere herhangi bir taahhütte bulunduğu şeklinde yorumlanamaz.',
            'İçeriklere ulaşılmasında yaşanan gecikme veya kesintiler bakımından Şirket’in hiçbir sorumluluğu bulunmamaktadır. Şirket, içerikleri ve işbu Şartlar dâhil olmak üzere tüm unsurları dilediği zaman, önceden haber vermek zorunluluğu bulunmaksızın tek taraflı olarak değiştirme ve güncelleme hakkına sahiptir.',
            'Kullanıcıların web sitesini ziyaret etmelerinden veya içeriklere dayanarak gerçekleştirdikleri herhangi bir işlemden kaynaklanabilecek zarar ve ziyan sebebiyle Şirket’in hiçbir sorumluluğu bulunmamaktadır.',
          ],
        },
      },
      {
        heading: {
          tr: 'Uygulanacak Hukuk ve Yetki',
          en: 'Applicable Law and Jurisdiction',
        },
        paragraphs: {
          tr: [
            'İşbu Kullanım Şartları ve/veya web sitesine ilişkin olarak söz konusu olabilecek her türlü uyuşmazlıkta Türk Kanunları uygulanacaktır. İşbu Şartların ve Şirket’e ait kayıtların (bilgisayar kayıtları dâhil olmak üzere), Hukuk Muhakemeleri Kanunu’nun 193. maddesine uygun olarak tek ve gerçek münhasır delil olarak kabul edileceği, İstanbul Anadolu Adliyesi Mahkemeleri ile İcra ve İflas Müdürlükleri’nin tek yetkili olacağı Şirket tarafından beyan ve Kullanıcılar tarafından kabul ve taahhüt edilmektedir.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kullanıcı Sorumluluğu',
          en: 'User Responsibility',
        },
        paragraphs: {
          tr: [
            'Kullanıcılar, işbu Şartları okumamış veya okumuş olup da işbu Şartlara ya da yürürlükte bulunan ilgili yasa veya düzenlemelere uygun davranmamış olmalarından kaynaklanabilecek her türlü zarar ve ziyandan sorumlu olacaktır.',
          ],
        },
      },
    ],
  },
  {
    slug: 'cerez-politikasi',
    lead: {
      tr: 'Fleetmole Bilişim Kiralama Danışmanlık Ticaret Limited Şirketi web sitesi ve belirli çevrimiçi hizmetlerde çerezler kullanılabilir.',
      en: 'FleetMole uses cookies across its website and certain online services.',
    },
    body: {
      tr: 'Çerezler; web sitesi kullanımını anlamak, tercihleri hatırlamak ve performansı değerlendirmek amacıyla kullanılmaktadır.',
      en: 'The official wording currently published for this page is provided below in Turkish.',
    },
    summary: {
      tr: [
        'Gerekli, performans, işlevsellik ve hedefleme çerezleri',
        'Çerez saklama süreleri ve alan bilgileri',
        'Google Analytics kullanımı',
        'Çerez onayının geri alınması',
      ],
      en: [
        'Necessary, performance, functionality, and targeting cookies',
        'Storage durations and domain details',
        'Google Analytics usage',
        'How to revoke cookie consent',
      ],
    },
    updatedAt: UPDATED_AT,
    footerLabel: {
      tr: 'Çerez Politikası',
      en: 'Cookie Policy',
    },
    sections: [
      {
        heading: {
          tr: 'Web Sitesi Çerez Politikası',
          en: 'Website Cookie Policy',
        },
        paragraphs: {
          tr: [
            'Fleetmole Bilişim Kiralama Danışmanlık Ticaret Limited Şirketi web sitesi ve belirli çevrimiçi hizmetlerde, veri toplamayı etkinleştirmek için cihazınıza yerleştirilen dosyalar olan çerezler kullanılabilir.',
            'Çerezleri kullanmamıza izin verirseniz; web sitemizde nasıl gezindiğinizi daha iyi anlayabilmek ve katılımınızı değerlendirebilmek, dil seçiminiz gibi özelleştirilmiş ayarları ve tercihleri hatırlamak amacıyla çerezler tarafından toplanan bilgileri kullanacağız.',
            'Çerezleri kullanmamıza izin verdikten sonra, tarayıcınızdaki ayarları değiştirerek çerezleri devre dışı bırakabilirsiniz. Bunu yapmayı seçerseniz çerezlere bağımlı olan bazı işlevler düzgün çalışmayabilir.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kategori 1 – Gerekli çerezler',
          en: 'Category 1 – Necessary cookies',
        },
        paragraphs: {
          tr: [
            'Bu çerezler, web sitesinin düzgün çalışması için kesinlikle gereklidir. Bu çerezler, web sitesinin temel işlevlerini ve güvenlik özelliklerini anonim olarak sağlar.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kategori 2 – Performans çerezleri',
          en: 'Category 2 – Performance cookies',
        },
        paragraphs: {
          tr: [
            'Performans çerezleri, ziyaretçiler için daha iyi bir kullanıcı deneyimi sunmaya yardımcı olan web sitesinin temel performans indekslerini anlamak ve analiz etmek için kullanılır.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kategori 3 – İşlevsellik çerezleri',
          en: 'Category 3 – Functionality cookies',
        },
        paragraphs: {
          tr: [
            'Bu çerezler, web sitesinin yaptığınız seçimleri (kullanıcı adınız, diliniz veya bulunduğunuz bölge gibi) hatırlamasına ve gelişmiş, daha kişisel özellikler sağlamasına olanak tanır.',
            'Bu çerezler, kişiselleştirebileceğiniz web sayfalarının bölümlerinde yaptığınız değişiklikleri hatırlamak için de kullanılabilir. Ayrıca tekrar etmekten kaçınmak için halihazırda görüntülediğiniz bildirimleri takip etmek amacıyla da kullanılabilirler.',
            'Bu çerezlerin topladığı bilgiler sizi kişisel olarak tanımlamaz ve diğer web sitelerinde göz atma etkinliğinizi izleyemez.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kategori 4 – Hedefleme veya reklam çerezleri',
          en: 'Category 4 – Targeting or advertising cookies',
        },
        paragraphs: {
          tr: [
            'Analitik çerezler, ziyaretçilerin web sitesiyle nasıl etkileşime girdiğini anlamak için kullanılır. Bu çerezler, ziyaretçi sayısı, hemen çıkma oranı, trafik kaynağı ve benzeri ölçümler hakkında bilgi sağlamaya yardımcı olur.',
          ],
        },
      },
      {
        heading: {
          tr: 'www.fleetmole.com üzerinde kullanılan çerezler',
          en: 'Cookies used on www.fleetmole.com',
        },
        paragraphs: {
          tr: [
            'Şirketimize ait www.fleetmole.com web sitemizde kullanılan çerezler ile ilgili detaylı bilgilendirme ve çerezlerin saklama sürelerine ilişkin tablo aşağıdadır.',
          ],
        },
        table: {
          columns: {
            tr: ['Cookie', 'Domain', 'Tür', 'Süre / Gün'],
            en: ['Cookie', 'Domain', 'Type', 'Duration / Days'],
          },
          rows: {
            tr: [
              ['NET_OturumKimliği', 'www.fleetmole.com', 'Oturum', 'Oturum'],
              ['_gcl_au', 'www.fleetmole.com', 'Kaydedilmiş Çerez', '89'],
              ['_fbp', 'www.fleetmole.com', 'Kaydedilmiş Çerez', '89'],
              ['_gid', 'www.fleetmole.com', 'Kaydedilmiş Çerez', '0'],
              ['_gat_gtag_UA_165277444_1', 'www.fleetmole.com', 'Kaydedilmiş Çerez', '0'],
              ['_ga_BRNXJLQS0K', 'www.fleetmole.com', 'Kaydedilmiş Çerez', '399'],
              ['_ga', 'www.fleetmole.com', 'Kaydedilmiş Çerez', '399'],
            ],
          },
        },
      },
      {
        heading: {
          tr: 'Google Analytics Kullanımı',
          en: 'Use of Google Analytics',
        },
        paragraphs: {
          tr: [
            'Web sitemizde, Google Inc. (“Google”) tarafından sağlanan bir web analiz hizmeti olan Google Analytics kullanılır. Google Analytics, web sitesinin kullanıcıların siteyi nasıl kullandığını analiz etmesine ve hizmetlerimizin kullanımını izleyip analiz etmesine yardımcı olması için yukarıda açıklandığı şekilde performans çerezleri olan çerezler kullanır.',
            'Web sitesinin kullanımıyla ilgili olarak çerez tarafından üretilen bilgiler Google’a iletilir ve Google tarafından depolanır. Bu web sitesinde IP anonimleştirme etkindir.',
            'Google bu bilgileri, web sitesini kullanımınızı değerlendirmek, web sitesi aktivitesiyle ilgili raporlar derlemek, web sitesi aktivitesi ve internet kullanımıyla ilgili başka hizmetler sağlamak amacıyla bizim adımıza kullanır. Web tarayıcınızın Google Analytics kapsamında ilettiği IP adresi, Google tarafından korunan diğer verilerle ilişkilendirilmez.',
            'Web tarayıcınızdaki ilgili ayarları seçerek çerez kullanımını reddedebilirsiniz; ancak bunu yaptığınızda web sitemizin işlevlerini bütünüyle kullanamayabileceğinizi lütfen unutmayın. Ayrıca, aşağıdaki aracı indirip yükleyerek gelecekte geçerli olmak üzere Google Analytics tarafından izlenmeyi reddedebilirsiniz.',
          ],
        },
        links: [
          {
            label: {
              tr: 'Google Analytics devre dışı bırakma eklentisi',
              en: 'Google Analytics opt-out add-on',
            },
            href: 'https://tools.google.com/dlpage/gaoptout',
          },
          {
            label: {
              tr: 'Google Analytics hakkında daha fazla bilgi',
              en: 'More information about Google Analytics',
            },
            href: 'https://support.google.com/analytics/answer/6004245',
          },
        ],
      },
      {
        heading: {
          tr: 'Çerez kullanımına dair onayımı nasıl iptal ederim?',
          en: 'How can I withdraw my consent for cookie usage?',
        },
        paragraphs: {
          tr: [
            'Çerezlerin cihazınızda saklanmasını istemiyorsanız tarayıcınızın ayarını, tüm veya bazı çerezleri reddetmek ve yeni bir çerez eklendiğinde sizi uyarmak için düzenleyebilirsiniz. Bunun nasıl yapılacağı hakkında daha fazla bilgi için lütfen tarayıcı yardım belgelerinize bakın.',
            'Tüm çerezleri (kesinlikle gerekli çerezler dâhil) engellemek için tarayıcı ayarlarınızı kullanırsanız sitemizin tüm bölümlerine veya işlevlerine erişemeyebileceğinizi ya da bunları kullanamayabileceğinizi lütfen unutmayın.',
            'Önceden depolanmış çerezleri kaldırmak isterseniz çerezleri istediğiniz zaman manuel olarak silebilirsiniz. Ancak bu işlem, tarayıcı ayarlarınızı yukarıda açıklandığı şekilde yapmadıkça sitelerin cihazınıza başka çerezler yerleştirmesini engellemez.',
            'Kullanıcı profillerinin geliştirilmesi ve hedefleme / reklam çerezlerinin kullanımı hakkında daha fazla bilgi için aşağıdaki kaynaklara başvurabilirsiniz.',
          ],
        },
        links: [
          {
            label: {
              tr: 'Avrupa için Your Online Choices',
              en: 'Your Online Choices for Europe',
            },
            href: 'https://www.youronlinechoices.eu',
          },
          {
            label: {
              tr: 'ABD için About Ads Choices',
              en: 'About Ads Choices for the United States',
            },
            href: 'https://www.aboutads.info/choices',
          },
        ],
      },
    ],
  },
  {
    slug: 'gizlilik-politikasi',
    lead: {
      tr: 'Fleetmole Bilişim Kiralama Danışmanlık Ticaret Limited Şirketi olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu çerçevesinde kişisel verilerinizin güvenliğine azami özen gösteriyoruz.',
      en: 'FleetMole processes personal data within the framework of Turkish data protection law.',
    },
    body: {
      tr: 'Bu metin; veri sorumlusu bilgilerini, işlenen veri kategorilerini, işleme amaçlarını, veri sahiplerinin haklarını ve başvuru yöntemlerini açıklar.',
      en: 'The official wording currently published for this page is provided below in Turkish.',
    },
    summary: {
      tr: [
        'Veri sorumlusu kimliği ve iletişim bilgileri',
        'İşlenen veri kategorileri ve amaçlar',
        'KVKK kapsamındaki veri sahibi hakları',
        'Başvuru usulleri ve cevap süresi',
      ],
      en: [
        'Controller identity and contact details',
        'Processed data categories and purposes',
        'Rights under Turkish data protection law',
        'Application methods and response period',
      ],
    },
    updatedAt: UPDATED_AT,
    footerLabel: {
      tr: 'KVKK ve Gizlilik',
      en: 'Privacy Notice',
    },
    sections: [
      {
        heading: {
          tr: 'Veri Sorumlusu Aydınlatma Metni',
          en: 'Controller Notice',
        },
        paragraphs: {
          tr: [
            'Fleetmole Bilişim Kiralama Danışmanlık Ticaret Limited Şirketi olarak, hizmetlerimizin sizlere sunulması amacıyla 6698 sayılı Kişisel Verilerin Korunması Kanunu sınırları ve kuralları içerisinde ilgili taraflarımızın verilerine sahip olmaktayız.',
            'Özellikle kişisel verilerinizin güvenliğini göz önünde bulundurarak, özel hayatın gizliliği ile temel hak ve özgürlüklerin korunması amacıyla sizleri aydınlatmak istiyoruz.',
            'Mevzuat gereği veri sorumlusu sıfatıyla, iş ilişkimiz kapsamında edinilen her türlü kişisel veri, Kişisel Verilerin Korunması Kanunu’na uygun olarak aşağıda detayları belirtilen şekilde ve mevzuat tarafından emredilen sınırlar çerçevesinde işlenecektir.',
          ],
        },
      },
      {
        heading: {
          tr: 'Veri Sorumlusunun Kimliği',
          en: 'Identity of the Controller',
        },
        bullets: {
          tr: [
            'Ünvan: Fleetmole Bilişim Kiralama Danışmanlık Ticaret Limited Şirketi',
            'Adres: Kozyatağı Mah. Bayar Cad. No:97 Ofis No:21 Kat:10 34742 Kadıköy / İstanbul',
            'Telefon: 0(216) 606 99 99',
            'E-posta: info@fleetmole.com',
          ],
        },
      },
      {
        heading: {
          tr: 'Kişisel verileri işlemeye ilişkin ilkelerimiz',
          en: 'Our processing principles',
        },
        bullets: {
          tr: [
            'Hukuka ve dürüstlük kurallarına uygun işlemeyi',
            'Doğru ve güncelliği sağlama gayretinde olmayı',
            'Belirli, açık ve meşru amaçlar için işlenmeyi',
            'İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olmayı',
            'İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilmeyi',
          ],
        },
      },
      {
        heading: {
          tr: 'Hangi verilerinizi topluyoruz?',
          en: 'Which data do we collect?',
        },
        bullets: {
          tr: [
            'Kimlik Verileri: Adınız, soyadınız, T.C. kimlik numaranız, ehliyet bilgileriniz ve doğum tarihi bilgileriniz.',
            'İletişim Verileri: Adresiniz, posta adresiniz, telefon numaranız, faks numaranız ve sizi tanımlayıcı iş iletişim bilgileriniz.',
            'Müşteri İşlem Verileri: Çağrı merkezi kayıtları, randevu ve teklif bilgileri, sipariş bilgileri ile talep ve şikâyet verileri.',
            'Finansal Veriler: Banka hesap numaraları, ödeme yöntemleri ve ilgili diğer faturalama bilgileri.',
            'Fiziksel Mekân Güvenliği Verileri: Lokasyonumuza giriş çıkış kayıt bilgileri ve kamera kayıtları.',
            'İşlem Güvenliği Verileri: FleetMole ağına bağlanmanız halinde IP adresi bilgileri ve internet sitesi giriş çıkış bilgileri.',
            'Pazarlama Verileri: İşlem geçmişi bilgileri, anket sonuçları, kampanya çalışmalarıyla elde edilen veriler.',
            'Görsel ve İşitsel Veriler: Kamera kayıtları ve müşteri hizmetleri görüşmelerine ilişkin ses kayıtları.',
            'Sosyal Medya Verileri: FleetMole sosyal medya hesaplarıyla etkileşim kurulması halinde oluşan veriler.',
            'Yasal Süreçler ve Hukuki İşlem Verileri: Taraflar arasında doğan hukuki işlemlere ilişkin veriler.',
          ],
        },
      },
      {
        heading: {
          tr: 'Verileri toplama amacımız nedir?',
          en: 'Why do we collect this data?',
        },
        bullets: {
          tr: [
            'Hizmet Sunumu ve Operasyon Yönetimi: Yazılım faaliyetleri kapsamında ürün ve hizmetlerin sunulması, destek ve geliştirme faaliyetlerinin sürdürülmesi.',
            'Yasal ve Hukuki Süreçlerin Yürütülmesi: Mevzuattan kaynaklanan yükümlülüklerin ifası ve yetkili kurumlara karşı hukuki yükümlülüklerin yerine getirilmesi.',
            'Finans ve Muhasebe Süreçleri: Faturalama, tahsilat, ödeme süreçleri ve yasal mali kayıtların tutulması.',
            'Müşteri Desteği ve Memnuniyeti: Kapsamlı müşteri desteği sağlanması, müşteri deneyiminin iyileştirilmesi ve ürün/hizmet kalitesinin artırılması.',
            'İletişim ve İdari Amaçlar: Soruların veya taleplerin yanıtlanması, ürün ve hizmetlerle ilgili bilgilendirme yapılması ve kanunen gerekli bildirimlerin iletilmesi.',
            'İşlem Desteği: Ürün veya hizmet alımlarının tamamlanması, ödemelerin işlenmesi, teslimatların düzenlenmesi ve iade süreçlerinin kolaylaştırılması.',
            'Güvenlik: Web siteleri ile ürün ve hizmetlerin bütünlüğünün ve güvenliğinin sağlanması, güvenlik tehditleri ile kötü amaçlı faaliyetlerin önlenmesi.',
            'İş Faaliyetleri: Sözleşmenin ifası, araştırma ve analitik faaliyetler, kurumsal raporlama, kalite güvence uygulamaları ve olağan iş faaliyetlerinin yürütülmesi.',
            'Araştırma ve Yenilik: Yeni ürün ve hizmetlerin geliştirilmesi ve mevcut hizmetlerin iyileştirilmesi.',
            'Kurumsal İletişim ve Pazarlama: Araştırma ve geliştirme çalışmaları ile ürün ve hizmetlerin sizlere ulaştırılması.',
            'Yasalara Uygunluk: Geçerli yasalara, yönetmeliklere, mahkeme kararlarına ve resmi taleplere uyum sağlanması.',
            'Ek Amaçlar: Mal ve hizmet üretim / operasyon süreçleri, bilgi güvenliği süreçleri, faaliyetlerin mevzuata uygun yürütülmesi ve veri sorumlusu operasyonlarının güvenliği.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kişisel veri toplamanın yöntemi ve hukuki sebebi',
          en: 'Collection method and legal basis',
        },
        paragraphs: {
          tr: [
            'Kişisel verileriniz; yukarıda belirtilen amaçlara ve Kanun’da öngörülen temel ilkelere uygun olarak otomatik veya otomatik olmayan yollarla şirketimize ait hizmet noktalarından, doğrudan etkileşimlerden, bize ulaştığınız iletişim kanallarından (telefon, mail, faks, sosyal medya, çağrı merkezi, web sitesi, anketler), otomatik teknolojilerden, sigorta şirketlerinden, halka açık kaynaklardan, resmi kurumlardan, uygulamalarımızdan, destek hizmeti alınan iş ortaklarından ve kapalı devre kayıt sistemlerinden toplanmaktadır.',
            'Ticari faaliyetlerin yürütülmesi kapsamında; 6102 sayılı Türk Ticaret Kanunu, 6098 sayılı Türk Borçlar Kanunu, 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun, Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik ile iş sağlığı, güvenliği ve vergi mevzuatından doğan yükümlülüklerimiz gereğince verileriniz işlenmektedir.',
            'Bize sunmuş olduğunuz veriler; sözleşme kapsamındaki hizmetlerin kaliteli ve doğru olarak sunulması, hizmet kalitesinin ölçülmesi ve artırılması, hizmetler hakkında bilgi verilmesi, duyuru ve uyarıların iletilmesi, müşteri memnuniyeti çalışmaları, hukuki yükümlülüklerin yerine getirilmesi, sözleşmenin kurulması ve ifası, hakkın tesisi, kullanılması ve korunması amaçlarıyla işlenebilecektir.',
          ],
        },
      },
      {
        heading: {
          tr: 'İşlenen kişisel verilerin kimlere hangi amaçlarla aktarılabileceği',
          en: 'Transfers of personal data',
        },
        paragraphs: {
          tr: [
            'Kişisel verilerinizi gizli tutarız; kişisel verilerinizi başkalarına satmayız, kiralamayız veya takas etmeyiz. İzniniz olmadığı sürece, veri sunduğunuz noktalarda tanımladığımız veya hâkim bir sözleşmede açıklanan şahıslar ile ilgisi olmayan şekillerde kişisel verilerinizi kullanmayız ya da paylaşmayız.',
            'Toplanan kişisel verileriniz; bu aydınlatma metninde belirtilen amaçlarla sınırlı ve ölçülü olmak kaydıyla, Kanun ve ilgili mevzuat kapsamında aktarılmasını gerektiren sebeplere bağlı olarak hizmet sağlayıcılara, iş ortaklarına ve diğer yetkili alıcılara aktarılabilir.',
            'Hizmet sağlayıcılarımız ve iş ortaklarımız; FleetMole operasyonel süreçleri, yönetim hizmetleri, müşteri desteği, ürün teslimatı, pazarlama faaliyetleri, güvenlik, lojistik, avukatlık, BT hizmetleri, e-posta hizmetleri, veri barındırma, canlı yardım, borç tahsilatı ve web sitelerinin yönetimi veya desteklenmesi gibi faaliyetleri bizim adımıza yerine getirebilir.',
            'Hizmet sağlayıcılarımız ile iş ortaklarımızın, sözleşmeye bağlı olarak bizden aldıkları kişisel verileri korumaları gerekir ve bu verileri FleetMole tarafından belirtilenin dışında herhangi bir amaçla kullanmaları yasaktır.',
            'Kişisel verilerinizi ayrıca; emniyet teşkilatı, düzenleyiciler, mahkemeler ve diğer resmi mercilerden gelen yetkili taleplere yanıt vermek, yasal yükümlülüklere uymak, güvenlik tehditlerini ve sahtecilik faaliyetlerini soruşturmak, FleetMole’un hak ve mülkiyetini korumak veya çalışanların ve üçüncü tarafların güvenliğini sağlamak amacıyla da paylaşabiliriz.',
            'Kişisel verilerinizin, bu aydınlatma belgesinde belirtilen amaçlar dışında işlenmeyeceğini temin ederiz.',
          ],
        },
      },
      {
        heading: {
          tr: 'Açık rızanız olmaksızın işleyebileceğimiz durumlar',
          en: 'Cases where explicit consent is not required',
        },
        bullets: {
          tr: [
            'Kanunlarda açıkça öngörülmesi',
            'Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu olması',
            'Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması',
            'Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması',
            'İlgili kişinin kendisi tarafından alenileştirilmiş olması',
            'Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması',
            'İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması',
          ],
        },
      },
      {
        heading: {
          tr: 'Nasıl koruyoruz?',
          en: 'How do we protect your data?',
        },
        paragraphs: {
          tr: [
            'FleetMole tarafından toplanan tüm kişisel verilerin güvenliği için gerekli teknik ve idari bütün tedbirler alınmaktadır. Bu çerçevede, Kişisel Veri Güvenliği Rehberi gerekliliklerine ve ISO/IEC 27001 Bilgi Güvenliği ile ISO/IEC 27701 Gizlilik Bilgileri Yönetimi standartlarına uyumlu şekilde yetkisiz erişime, kötüye kullanıma, ifşaya veya değiştirilmesine karşı fiziksel, teknik, örgütsel ve yönetimsel önlemler alınmaktadır.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kişisel verilere ilişkin haklarınız nelerdir?',
          en: 'What rights do you have?',
        },
        bullets: {
          tr: [
            'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
            'Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme',
            'Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme',
            'Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme',
            'Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme',
            'KVK mevzuatında öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme',
            'Eksik veya yanlış verilerin düzeltilmesi ile silme / yok etme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme',
            'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkması durumunda buna itiraz etme',
            'Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme',
          ],
        },
      },
      {
        heading: {
          tr: 'Haklarınızı nasıl kullanabilirsiniz?',
          en: 'How can you exercise your rights?',
        },
        paragraphs: {
          tr: [
            'Kişisel Verilerin Korunması Kanunu’nun 13. maddesi ve “Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ” uyarınca taleplerinizi aşağıdaki yöntemlerle iletebilirsiniz.',
            'Başvuru içeriğinde şu bilgilerin yer alması gerekir: başvuru sahibinin adı ve soyadı; Türkiye Cumhuriyeti vatandaşı ise T.C. kimlik numarası, değil ise uyruğu ile birlikte pasaport veya kimlik numarası; tebligata esas yerleşim yeri veya iş yeri adresi; bildirime esas elektronik posta adresi, telefon veya faks numarası; talep konusu ve talebe ilişkin bilgi ve belgeler.',
          ],
        },
      },
      {
        heading: {
          tr: 'Başvuru yöntemleri',
          en: 'Application methods',
        },
        bullets: {
          tr: [
            'Şahsen başvuru: Başvuru formu doldurularak, kapalı zarf üzerine “Kişisel Verilerin Korunması Kanunu Gereği Bilgi Talebi” notu eklenip merkez lokasyonumuza elden, tutanak karşılığında teslim edilebilir.',
            'Noter aracılığıyla başvuru: FleetMole adresine gönderilecek noter tebligatında zarf üzerine “Kişisel Verilerin Korunması Kanunu Gereği Bilgi Talebi” notu eklenmelidir.',
            'Elektronik başvuru: info@fleetmole.com adresine konu kısmında “Kişisel Verilerin Korunması Kanunu Gereği Bilgi Talebi” ibaresiyle başvuru yapılabilir.',
            'Veri sahibi başvuru formuna ilişkin taleplerinizi yukarıdaki iletişim kanalları üzerinden iletebilirsiniz.',
          ],
        },
      },
      {
        heading: {
          tr: 'Gizlilik bildirimimizde değişiklikler',
          en: 'Changes to this notice',
        },
        paragraphs: {
          tr: [
            'Gizlilik Bildirimimizi değiştirmemiz durumunda revize edilen bildirimi, güncellenmiş revizyon tarihiyle birlikte burada yayınlarız. Gizlilik uygulamalarımızı önemli ölçüde değiştirecek kritik değişiklikler yapmamız halinde, değişiklikler yürürlüğe girmeden önce sizi e-posta veya kurumsal web sitemizde ya da sosyal medya hesaplarımızda yayınlanacak bir bildirim yoluyla bilgilendirebiliriz.',
          ],
        },
      },
      {
        heading: {
          tr: 'Talepleriniz ne kadar sürede cevaplanır?',
          en: 'How long does it take to respond?',
        },
        paragraphs: {
          tr: [
            'Kişisel verilerinize ilişkin hak talepleriniz değerlendirilerek, bize ulaştığı tarihten itibaren en geç 30 (otuz) gün içerisinde cevaplanır. Başvurunuzun olumsuz değerlendirilmesi halinde gerekçeli ret sebepleri, başvuruda belirttiğiniz adrese elektronik posta veya posta yoluyla gönderilir.',
          ],
        },
      },
    ],
  },
  {
    slug: 'dis-saglayici-gizlilik-politikasi',
    lead: {
      tr: 'Dış sağlayıcılarla yürütülen iş ilişkileri kapsamında işlenen kişisel veriler, 6698 sayılı Kanun çerçevesinde korunmakta ve yalnızca belirtilen amaçlarla kullanılmaktadır.',
      en: 'FleetMole also publishes a privacy notice for external providers and suppliers.',
    },
    body: {
      tr: 'Bu metin; dış sağlayıcı ilişkilerinde veri sorumlusu bilgilerini, işlenen veri kategorilerini, aktarım çerçevesini ve veri sahibi haklarını açıklar.',
      en: 'The official wording currently published for this page is provided below in Turkish.',
    },
    summary: {
      tr: [
        'Dış sağlayıcı ve iş ortakları için aydınlatma',
        'İşlenen veri türleri ve amaçları',
        'Aktarım çerçevesi ve hukuki sebep',
        'KVKK kapsamındaki haklar ve başvuru yolları',
      ],
      en: [
        'Notice for vendors and external providers',
        'Processed data types and purposes',
        'Transfer framework and legal basis',
        'Rights and application channels',
      ],
    },
    updatedAt: UPDATED_AT,
    footerLabel: {
      tr: 'Dış Sağlayıcı Metni',
      en: 'Vendor Notice',
    },
    sections: [
      {
        heading: {
          tr: 'Veri Sorumlusu ve Temsilcisi',
          en: 'Controller and Representative',
        },
        paragraphs: {
          tr: [
            '6698 sayılı Kişisel Verilerin Korunması Kanunu (“6698 Sayılı Kanun”) uyarınca veri sorumlusu, Fleetmole Bilişim Kiralama Danışmanlık Ticaret Limited Şirketi’dir.',
          ],
        },
        bullets: {
          tr: [
            'Ünvan: Fleetmole Bilişim Kiralama Danışmanlık Ticaret Limited Şirketi',
            'Adres: Kozyatağı Mah. Bayar Cad. No:97 Ofis No:21 Kat:10 34742 Kadıköy / İstanbul',
            'Telefon: 0(216) 606 99 99',
            'E-posta: info@fleetmole.com',
          ],
        },
      },
      {
        heading: {
          tr: 'Kişisel Verileri İşlemeye İlişkin İlkelerimiz',
          en: 'Our processing principles',
        },
        bullets: {
          tr: [
            'Hukuka ve dürüstlük kurallarına uygun işlemeyi',
            'Doğru ve güncelliği sağlama gayretinde olmayı',
            'Belirli, açık ve meşru amaçlar için işlenmeyi',
            'İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olmayı',
            'Mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilmeyi',
          ],
        },
      },
      {
        heading: {
          tr: 'Aydınlatma ve Kapsam',
          en: 'Scope of the notice',
        },
        paragraphs: {
          tr: [
            'Veri sorumlusu sıfatı ile FleetMole olarak, iş ilişkilerimiz kapsamında edinilen her türlü özel ve genel nitelikli kişisel veri; 6698 sayılı Kanun’un 5. ve 6. maddelerinde belirtilen veri işleme şartları ile ölçülü ve sınırlı olmak şartıyla, iş faaliyetlerinin yerine getirilmesi, veri sorumlusu olarak hukuki sorumluluğumuzun yerine getirilmesi ve aramızdaki sözleşmenin ifası gibi sebeplerle işlenebilmektedir.',
            'Bu bilinçle edindiğimiz özel ve genel nitelikli kişisel verilerin; Kanun’a, ikincil düzenlemelere ve Kişisel Verileri Koruma Kurulu kararlarına uygun olarak işlenmesine, saklanmasına, silinmesine, imha edilmesine ve yedeklenmesine büyük önem göstermekteyiz.',
          ],
        },
      },
      {
        heading: {
          tr: 'İşlenen Kişisel Veriler',
          en: 'Processed personal data',
        },
        bullets: {
          tr: [
            'Kimlik Bilgisi: Kimlik üzerindeki bilgiler, medeni durum, doğum yeri ve tarihi, cinsiyet ve imza bilgisi niteliğindeki veriler',
            'İletişim Bilgisi: Telefon numarası, adres bilgisi ve e-posta adresi niteliğindeki veriler',
            'Finansal Bilgi: Finansal bilgiler, icra takip ve borç bilgileri ile banka bilgileri',
            'Çalışma Verisi: Pozisyon adı, departmanı, birimi, unvanı, görevlendirme belgeleri, işe başlama tarihi, imza sirküleri, çalıştığı projeler ile internet ve şirket içi erişim logları',
            'İşlenen veriler yukarıda belirtilenlerden biri ya da birkaçı olabilir; bununla birlikte özel nitelikli kişisel veriler açık rıza alınmaksızın işlenmemektedir.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kişisel Verilerin İşlenme Amacı',
          en: 'Purposes of processing',
        },
        paragraphs: {
          tr: [
            'İş ilişkisi kapsamında edinilen kişisel veriler; iş ilişkisinin yürütülmesi ve devamlılığı, acil durum yönetimi süreçleri, bilgi güvenliği süreçleri, denetim ve etik faaliyetler, eğitim faaliyetleri, erişim yetkilerinin yürütülmesi, mevzuata uygunluk, finans ve muhasebe işlerinin yürütülmesi, fiziksel mekân güvenliği, görevlendirme süreçleri, hukuk işlerinin takibi, iletişim faaliyetleri, iş sağlığı ve güvenliği, lojistik faaliyetleri, mal ve hizmet satın alım süreçleri, sözleşme süreçleri, talep ve şikâyetlerin takibi, taşınır mal ve kaynak güvenliği, tedarik zinciri yönetimi, veri sorumlusu operasyonlarının güvenliği, yetkili kişi / kurum / kuruluşlara bilgi verilmesi, yönetim faaliyetleri ile ziyaretçi kayıtlarının oluşturulması ve takibi gibi amaçlarla işlenebilir.',
          ],
        },
      },
      {
        heading: {
          tr: 'İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği',
          en: 'Transfers of processed data',
        },
        paragraphs: {
          tr: [
            'İş ilişkisi kapsamında edinilen kişisel veriler; faaliyetin gerektirdiği ölçüde ilgili kamu kurumları, diğer yasal taraflar, hizmet alınan mesleki denetim firmaları ve danışmanlar, bankalar ve sigorta şirketleri ile ticari, idari veya sözleşmesel ilişki içinde bulunulan kurumlar, iş ortakları ve bağlı ofisler gibi üçüncü kişilerle paylaşılabilir.',
            'Bu paylaşımlar, 6698 sayılı Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları ile sınırlı olmak kaydıyla ve veri güvenliği kuralları gözetilerek yapılmaktadır.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi',
          en: 'Collection method and legal basis',
        },
        paragraphs: {
          tr: [
            'Kurum olarak hukuki yükümlülüklerimizi yerine getirmek, şirketinizle ve/veya sizinle aramızdaki sözleşmenin ifası, hakkın tesisi ve korunması, kanunlarda öngörülen nedenler ve Şirket’in meşru menfaati gereği veriler elde edilir.',
            'Bu çerçevede 6102 sayılı Türk Ticaret Kanunu, 6098 sayılı Türk Borçlar Kanunu, 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun, Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik ve sair mevzuat hükümlerinde belirlenen hizmetlerin yasal çerçevede verilebilmesi ile Şirket’in akdi ve kanuni yükümlülüklerini tam ve gereği gibi ifa edebilmesi amaçlanır.',
            'Kişisel veriler; sizin tarafınızdan ve/veya şirketinizi temsilen hareket eden temsilci veya çalışanlar tarafından sözlü, fiziksel veya elektronik ortamda iletilmesi yoluyla ve şirket binalarına yerleştirilen kameralar aracılığıyla toplanabilir.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kişisel Veri Sahibinin 6698 sayılı Kanun’un 11. maddesinde sayılan hakları',
          en: 'Rights under Article 11 of the Law',
        },
        bullets: {
          tr: [
            'Kişisel veri işlenip işlenmediğini öğrenme',
            'Kişisel verileri işlenmişse buna ilişkin bilgi talep etme',
            'Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme',
            'Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme',
            'Kişisel verilerin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin üçüncü kişilere bildirilmesini isteme',
            'İşlenmesini gerektiren sebepler ortadan kalkmışsa kişisel verilerin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin üçüncü kişilere bildirilmesini isteme',
            'İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi nedeniyle aleyhe sonuca itiraz etme',
            'Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın giderilmesini talep etme',
          ],
        },
      },
      {
        heading: {
          tr: 'Nasıl Koruyoruz?',
          en: 'How do we protect your data?',
        },
        paragraphs: {
          tr: [
            'Kurumumuz tarafından toplanan tüm kişisel verilerin güvenliği için gerekli teknik ve idari bütün tedbirler alınmaktadır. Bu kapsamda Kişisel Veri Güvenliği Rehberi gerekliliklerine ve ISO/IEC 27001 ile ISO/IEC 27701 standartlarına uyumlu şekilde yetkisiz erişime, kötüye kullanıma, ifşaya veya değiştirilmesine karşı fiziksel, teknik, örgütsel ve yönetimsel önlemler alınmaktadır.',
          ],
        },
      },
      {
        heading: {
          tr: 'Başvuru Yöntemleri',
          en: 'Application methods',
        },
        bullets: {
          tr: [
            'Şahsen başvuru: Başvuru formu doldurularak kapalı zarf üzerine “Kişisel Verilerin Korunması Kanunu Gereği Bilgi Talebi” notu eklenip merkez lokasyonumuza elden teslim yapılabilir.',
            'Noter aracılığıyla başvuru: FleetMole adresine gönderilecek noter tebligatında aynı ibare yer almalıdır.',
            'Elektronik başvuru: info@fleetmole.com adresine konu kısmında “Kişisel Verilerin Korunması Kanunu Gereği Bilgi Talebi” ibaresi kullanılarak başvuru yapılabilir.',
            'Veri sahibi başvuru formuna ilişkin taleplerinizi yukarıdaki kanallar üzerinden iletebilirsiniz.',
          ],
        },
      },
      {
        heading: {
          tr: 'Gizlilik Bildirimimizde Değişiklikler',
          en: 'Changes to this notice',
        },
        paragraphs: {
          tr: [
            'Gizlilik Bildirimimizi değiştirmemiz durumunda revize edilen bildirimi, güncellenmiş revizyon tarihiyle birlikte burada yayınlarız. Gizlilik uygulamalarımızı önemli ölçüde değiştirecek değişiklikler yapmamız halinde, değişiklikler yürürlüğe girmeden önce sizi e-posta veya kurumsal web sitemizde ve/veya sosyal medya hesaplarımızda yayınlanacak bildirimlerle bilgilendirebiliriz.',
          ],
        },
      },
    ],
  },
];

export const getLocalizedLegalValue = <T>(value: LocalizedValue<T>, locale: Locale): T => value[locale] ?? value.tr;

export const getLegalDocument = (slug?: string) => LEGAL_DOCUMENTS.find((document) => document.slug === slug);
