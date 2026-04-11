import type { Locale } from '../config/site';
import type { ProductData } from '../data/products';

type LocalizedText = Record<Locale, string>;

interface ProductSiteLegalSection {
  body: LocalizedText[];
  bullets?: Record<Locale, string[]>;
  title: LocalizedText;
}

export interface ProductSiteLegalPage {
  description: LocalizedText;
  intro: LocalizedText;
  sections: ProductSiteLegalSection[];
  slug: string;
  title: LocalizedText;
}

const t = (tr: string, en: string): LocalizedText => ({ tr, en });

const productSummaryLine = (product: ProductData, locale: Locale) =>
  locale === 'tr' ? product.summary.tr : product.summary.en;

export const getProductSiteLegalPages = (product: ProductData): ProductSiteLegalPage[] => [
  {
    slug: 'kullanim-sartlari',
    title: t('Kullanım Şartları', 'Terms of Use'),
    description: t(
      `${product.name} web sitesi, demo talebi ve iletişim akışına ilişkin kullanım esasları.`,
      `Usage terms for the ${product.name} website, demo request flow, and contact journeys.`,
    ),
    intro: t(
      `${product.name}; ${product.category.tr.toLowerCase()} kapsamını anlatan içerikler, iletişim formları ve ürün bilgilendirme alanları sunar. Bu sayfa, ziyaretçilerin bu alanları hangi çerçevede kullanacağını açıklar.`,
      `${product.name} presents content, contact forms, and product information around its ${product.category.en.toLowerCase()} scope. This page explains the framework under which visitors may use those areas.`,
    ),
    sections: [
      {
        title: t('Hizmet Kapsamı', 'Service Scope'),
        body: [
          t(
            `${product.name} üzerindeki tüm içerikler bilgilendirme, tanıtım ve talep toplama amacıyla yayınlanır.`,
            `All content on ${product.name} is published for information, product presentation, and lead-collection purposes.`,
          ),
          t(
            `Ziyaretçiler platformu kullanırken yanlış yönlendirici, zararlı veya üçüncü kişi haklarını ihlal eden içerik paylaşmamalıdır.`,
            `Visitors must not share misleading, harmful, or rights-infringing content while using the platform.`,
          ),
        ],
        bullets: {
          tr: [
            productSummaryLine(product, 'tr'),
            'İletişim ve demo formları yalnızca iş amaçlı talepler için kullanılmalıdır.',
            'İçerikler önceden bildirim yapılmadan güncellenebilir.',
          ],
          en: [
            productSummaryLine(product, 'en'),
            'Contact and demo forms should only be used for business-related requests.',
            'Content may be updated without prior notice.',
          ],
        },
      },
      {
        title: t('Kullanıcı Sorumluluğu', 'User Responsibility'),
        body: [
          t(
            'Ziyaretçi; paylaştığı iletişim bilgisinin doğru, güncel ve kendisine ait olduğunu beyan eder.',
            'The visitor confirms that the contact data shared is accurate, current, and belongs to them.',
          ),
          t(
            'Hukuka aykırı kullanım, spam, otomasyon suistimali veya güvenliği zedeleyen hareketler erişimin sonlandırılmasına neden olabilir.',
            'Unlawful usage, spam, abusive automation, or security-disrupting behavior may lead to restricted access.',
          ),
        ],
      },
      {
        title: t('Fikri Haklar', 'Intellectual Property'),
        body: [
          t(
            `${product.name} üzerindeki metin, görsel, marka, ikon ve arayüz öğeleri FleetMole veya ilgili hak sahiplerine aittir.`,
            `Texts, visuals, marks, icons, and interface elements on ${product.name} belong to FleetMole or the relevant rights holders.`,
          ),
          t(
            'Bu içerikler izinsiz olarak kopyalanamaz, çoğaltılamaz veya yanıltıcı biçimde yeniden kullanılamaz.',
            'These materials may not be copied, reproduced, or repurposed in a misleading manner without permission.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'cerez-politikasi',
    title: t('Çerez Politikası', 'Cookie Policy'),
    description: t(
      `${product.name} deneyiminde kullanılan çerez ve benzeri teknolojilerin kullanım yaklaşımı.`,
      `The approach to cookies and similar technologies used in the ${product.name} experience.`,
    ),
    intro: t(
      `${product.name} sayfalarında gezinme sürekliliği, tercihlerin korunması ve temel performans gözlemi için çerezlerden yararlanılabilir.`,
      `${product.name} may rely on cookies to preserve session continuity, retain preferences, and observe baseline performance.`,
    ),
    sections: [
      {
        title: t('Hangi Amaçlarla Kullanılır?', 'Why Cookies Are Used'),
        body: [
          t(
            'Çerezler, dil tercihi, tema ayarı ve sayfa deneyimini bozmadan ilerlemek için gerekli teknik bilgileri korumaya yardımcı olur.',
            'Cookies help retain technical preferences such as language choice, theme mode, and session continuity.',
          ),
          t(
            'Ayrıca belirli içeriklerin hangi sıklıkta görüntülendiğini anlamak ve kullanıcı deneyimini sadeleştirmek için ölçüm verisi üretilebilir.',
            'They may also produce aggregate usage measurements to understand content frequency and simplify the user experience.',
          ),
        ],
        bullets: {
          tr: ['Dil ve tema tercihi', 'Oturum sürekliliği', 'Temel performans ve deneyim ölçümü'],
          en: ['Language and theme preference', 'Session continuity', 'Baseline performance and experience measurement'],
        },
      },
      {
        title: t('Tercih Yönetimi', 'Preference Management'),
        body: [
          t(
            'Tarayıcı ayarları üzerinden çerezleri sınırlayabilir veya silebilirsiniz; ancak bu durumda bazı deneyim katmanları beklenen şekilde çalışmayabilir.',
            'You may limit or delete cookies through browser settings, though some experience layers may then behave differently.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'gizlilik-politikasi',
    title: t(
      'Kişisel Verilerin Korunmasına Yönelik Aydınlatma ve Gizlilik Politikası',
      'Privacy Notice and Personal Data Protection Policy',
    ),
    description: t(
      `${product.name} kapsamında paylaşılan kişisel verilerin hangi amaçlarla işlendiği ve korunduğu.`,
      `How personal data submitted through ${product.name} is processed and protected.`,
    ),
    intro: t(
      `${product.name} üzerinde paylaşılan kişisel veriler; iletişim talebinin değerlendirilmesi, ürün kapsamının netleştirilmesi ve uygun ekip tarafından geri dönüş sağlanması amacıyla işlenir.`,
      `Personal data submitted through ${product.name} is processed to evaluate the inquiry, clarify product scope, and enable follow-up by the appropriate team.`,
    ),
    sections: [
      {
        title: t('İşlenen Veri Kategorileri', 'Processed Data Categories'),
        body: [
          t(
            'Ad, soyad, e-posta adresi, konu bilgisi, ürün tercihi ve serbest mesaj alanına girilen içerikler bu kapsama dahildir.',
            'This scope includes first name, last name, email address, topic details, selected product, and the free-text message content.',
          ),
        ],
        bullets: {
          tr: ['Kimlik ve iletişim bilgileri', 'Talep kapsamı ve içerik bilgisi', 'Ürün ve ihtiyaç bağlamı'],
          en: ['Identity and contact data', 'Inquiry scope and content', 'Product and requirement context'],
        },
      },
      {
        title: t('İşleme Amaçları', 'Processing Purposes'),
        body: [
          t(
            `${product.name} için gelen başvurular; satış, demo planlama, entegrasyon değerlendirmesi ve operasyonel ihtiyaç analizi amacıyla kullanılabilir.`,
            `Inquiries submitted for ${product.name} may be used for sales follow-up, demo planning, integration assessment, and operational needs analysis.`,
          ),
          t(
            'Veriler yalnızca iş ilişkisini kurmak, yürütmek veya uygun ekibe yönlendirmek için gerekli ölçüde değerlendirilir.',
            'Data is only reviewed to the extent necessary to initiate, operate, or route the business conversation to the right team.',
          ),
        ],
      },
      {
        title: t('Haklar ve Koruma', 'Rights and Protection'),
        body: [
          t(
            'İlgili kişiler; erişim, düzeltme, silme ve başvuru süreçlerine ilişkin taleplerini FleetMole iletişim kanalları üzerinden iletebilir.',
            'Relevant individuals may submit access, correction, deletion, or related requests through FleetMole contact channels.',
          ),
          t(
            'Makûl idari ve teknik önlemlerle verinin gizliliği, bütünlüğü ve erişilebilirliği korunmaya çalışılır.',
            'Reasonable administrative and technical measures are applied to preserve confidentiality, integrity, and availability.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'dis-saglayici-gizlilik-politikasi',
    title: t(
      'Dış Sağlayıcı Aydınlatma Metni ve Gizlilik Politikası',
      'Third-Party Provider Notice and Privacy Policy',
    ),
    description: t(
      `${product.name} kapsamında kullanılan dış servisler ve paylaşım sınırları hakkında bilgilendirme.`,
      `Notice about external services and sharing boundaries used within ${product.name}.`,
    ),
    intro: t(
      `${product.name} deneyiminde barındırma, analiz, iletişim veya entegrasyon süreçleri için dış sağlayıcı hizmetlerinden yararlanılabilir.`,
      `The ${product.name} experience may rely on third-party providers for hosting, analytics, communication, or integration workflows.`,
    ),
    sections: [
      {
        title: t('Dış Sağlayıcı Rolleri', 'Third-Party Provider Roles'),
        body: [
          t(
            'Bu sağlayıcılar yalnızca teknik altyapı, bildirim iletimi, performans gözlemi veya kurumsal operasyon akışı için gerekli olduğu ölçüde devreye alınır.',
            'Such providers are engaged only as needed for infrastructure, notifications, performance observation, or operational workflow support.',
          ),
        ],
        bullets: {
          tr: ['Barındırma ve altyapı hizmetleri', 'İletişim ve bildirim araçları', 'Entegrasyon ve gözlem katmanları'],
          en: ['Hosting and infrastructure services', 'Communication and notification tooling', 'Integration and observation layers'],
        },
      },
      {
        title: t('Paylaşım Sınırları', 'Sharing Boundaries'),
        body: [
          t(
            'Paylaşılan veriler, sağlanan hizmet için gerekli olan asgari içerikle sınırlanır ve sözleşmesel güvenlik çerçevesi gözetilir.',
            'Shared data is limited to the minimum necessary for the service provided, under an appropriate contractual security framework.',
          ),
          t(
            'Zorunlu hukuki yükümlülükler dışında, veri erişimi iş amacı ve görev kapsamı ile sınırlandırılır.',
            'Except where legally required, data access is constrained by business purpose and role scope.',
          ),
        ],
      },
    ],
  },
];

export const getProductSiteLegalPage = (product: ProductData, pageSlug?: string) =>
  getProductSiteLegalPages(product).find((page) => page.slug === pageSlug);
