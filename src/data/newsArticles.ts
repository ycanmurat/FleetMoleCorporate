import type { Locale } from '../config/site';
import type { ProductSlug } from './products';

type LocalizedText = Record<Locale, string>;

type NewsSection = {
  heading?: LocalizedText;
  paragraphs?: Record<Locale, string[]>;
  bullets?: Record<Locale, string[]>;
  link?: {
    label: LocalizedText;
    href: string;
  };
};

export interface NewsArticle {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  publishedAt: LocalizedText;
  publishedAtIso: string;
  heroImage: string;
  tag: LocalizedText;
  highlights: Record<Locale, string[]>;
  relatedProducts?: ProductSlug[];
  sections: NewsSection[];
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: '2026-yili-trafik-para-cezalari-rehberi',
    title: {
      tr: '2026 yılı trafik para cezaları rehberi',
      en: '2026 traffic fines guide',
    },
    description: {
      tr: '2026 yılı trafik para cezalarındaki temel artışları ve sürücüler için kritik uyarıları özetleyen güncel rehber.',
      en: 'A current guide that summarizes the main increases in 2026 traffic fines and the critical warnings for drivers.',
    },
    publishedAt: {
      tr: '24 Mart 2026',
      en: 'March 24, 2026',
    },
    publishedAtIso: '2026-03-24',
    heroImage: '/news/2026-yili-trafik-para-cezalari-rehberi.png',
    tag: {
      tr: 'Mevzuat',
      en: 'Regulation',
    },
    highlights: {
      tr: [
        'Hız sınırı ihlallerinde ceza tutarları kademeli olarak artırıldı',
        'Kırmızı ışık ve telefon kullanımında yaptırımlar yükseldi',
        'Sürücülerin güncel rehberi takip etmesi kritik hale geldi',
      ],
      en: [
        'Fines for speeding violations were increased progressively',
        'Penalties for red-light and phone-use violations were raised',
        'Following the current guide became more critical for drivers',
      ],
    },
    relatedProducts: ['manager', 'tracker'],
    sections: [
      {
        heading: {
          tr: 'Öne Çıkan Değişiklikler',
          en: 'Key changes',
        },
        bullets: {
          tr: [
            'Hız sınırı ihlallerinde ceza tutarları kademeli olarak artırıldı.',
            'Kırmızı ışık ihlallerine uygulanan cezalar yükseltildi.',
            'Alkollü araç kullanımında hem para cezası hem de idari yaptırımlar ağırlaştırıldı.',
            'Emniyet kemeri ve telefon kullanımı gibi ihlallerde denetimler sıklaştırıldı.',
          ],
          en: [
            'Penalty amounts for speeding violations were increased in stages.',
            'Fines applied to red-light violations were raised.',
            'Both monetary and administrative sanctions for drunk driving were tightened.',
            'Enforcement for seat-belt and phone-use violations was strengthened.',
          ],
        },
      },
      {
        heading: {
          tr: 'Sürücüler İçin Önemli Uyarı',
          en: 'Important note for drivers',
        },
        paragraphs: {
          tr: [
            'Uzmanlar, artan ceza tutarları nedeniyle sürücülerin trafik kurallarına daha fazla özen göstermesi gerektiğini vurguluyor.',
            'Bu düzenlemeler yalnızca cezai yaptırımı değil, can ve mal güvenliğini korumayı da hedefliyor.',
          ],
          en: [
            'Experts underline that drivers need to pay closer attention to traffic rules due to the increased fine amounts.',
            'These changes aim not only to increase penalties, but also to protect life and property on the road.',
          ],
        },
      },
      {
        heading: {
          tr: 'Değerlendirme',
          en: 'Assessment',
        },
        paragraphs: {
          tr: [
            '2026 yılı trafik cezaları, caydırıcılığı artırmayı hedefleyen daha sert bir yapı sunuyor.',
            'Yeni sistemle birlikte ihlallerin azaltılması ve daha güvenli bir trafik ortamı oluşturulması bekleniyor.',
            'Sürücülerin güncel ceza tutarlarını takip etmesi ve kurallara uygun hareket etmesi büyük önem taşıyor.',
          ],
          en: [
            'The 2026 traffic fine structure is designed to improve deterrence.',
            'With the updated framework, authorities expect both fewer violations and a safer traffic environment.',
            'It is increasingly important for drivers to track the current amounts and comply with the rules.',
          ],
        },
        link: {
          label: {
            tr: 'Resmi rehbere ulaşın',
            en: 'Open the official guide',
          },
          href: 'https://www.trafik.gov.tr/kurumlar/trafik.gov.tr/trafik-para-cezasi/2026/2026-YILI-TRAFIK-IDARI-PARA-CEZA-REHBERI.pdf',
        },
      },
    ],
  },
  {
    slug: 'bmw-i3-2026--yeni-nesil-bavyerali',
    title: {
      tr: 'BMW i3 (2026): Yeni nesil Bavyeralı!',
      en: 'BMW i3 (2026): the new Bavarian generation',
    },
    description: {
      tr: 'Neue Klasse mimarisiyle gelen yeni BMW i3 Sedan’ın tasarım, menzil ve lansman detaylarını özetleyen ilk bakış.',
      en: 'A first look at the new BMW i3 Sedan, covering Neue Klasse design cues, range expectations, and launch details.',
    },
    publishedAt: {
      tr: '24 Mart 2026',
      en: 'March 24, 2026',
    },
    publishedAtIso: '2026-03-24',
    heroImage: '/news/bmw-i3-2026-yeni-nesil-bavyerali.png',
    tag: {
      tr: 'Elektrikli Araç',
      en: 'Electric Vehicle',
    },
    highlights: {
      tr: [
        'Neue Klasse tasarım dili ilk kez net biçimde görülüyor',
        'İlk versiyon için 900 km seviyesinde menzil beklentisi paylaşıldı',
        '800V mimari ile 10 dakikada 400 km şarj vurgulanıyor',
      ],
      en: [
        'The Neue Klasse design language is now clearly visible',
        'An expected range near 900 km was shared for the first version',
        'The 800V architecture highlights 400 km of charge in 10 minutes',
      ],
    },
    relatedProducts: ['trader'],
    sections: [
      {
        heading: {
          tr: 'Tanıtım',
          en: 'Overview',
        },
        paragraphs: {
          tr: [
            'BMW son yıllarda ürün tarafında daha cesur bir çizgi izliyor ve Neue Klasse bu dönüşümün ana taşıyıcısı olarak öne çıkıyor.',
            'Yeni i3 Sedan, markanın elektrikli sedan tarafında nasıl bir yön izleyeceğini daha net gösteren modellerden biri olarak öne çıkıyor.',
          ],
          en: [
            'BMW has taken bolder product steps in recent years, and Neue Klasse stands out as the backbone of this transition.',
            'The new i3 Sedan is one of the clearest signals yet of how the brand will shape its electric sedan strategy.',
          ],
        },
      },
      {
        heading: {
          tr: 'Ölçüler ve Tasarım',
          en: 'Dimensions and design',
        },
        paragraphs: {
          tr: [
            'Model yaklaşık 4.76 metre uzunluk, 1.86 metre genişlik ve 1.48 metre yükseklik ölçülerine sahip. Mevcut 3 Serisi Sedan’dan yaklaşık 5 santimetre daha büyük bir gövde sunuyor.',
            '2.9 metrelik aks mesafesi, daha geniş bir iç hacim hedeflendiğini gösteriyor. Ön bölümde yatay ve geniş yorumlanan böbrek ızgara çizgisi tasarımın merkezinde yer alıyor.',
            'Iconic Glow imzası, gövde üzerinde sunulan renk seçenekleri ve hemzemin kapı kolları da modelin modern yüzünü güçlendiriyor.',
          ],
          en: [
            'The model measures roughly 4.76 meters in length, 1.86 meters in width, and 1.48 meters in height, making it around 5 centimeters larger than the current 3 Series Sedan.',
            'Its 2.9-meter wheelbase points to a roomier cabin, while the wide horizontal interpretation of BMW’s kidney grille dominates the front design.',
            'The Iconic Glow signature, the broader color palette, and flush door handles reinforce the modern character of the car.',
          ],
        },
      },
      {
        heading: {
          tr: 'Kabin ve Deneyim',
          en: 'Cabin and experience',
        },
        paragraphs: {
          tr: [
            'İç mekânda iX3 tarafında gördüğümüz dijital yerleşim anlayışı korunuyor. Büyük ekran yapısı, sade yüzeyler ve M spor koltuk gibi opsiyonlarla daha teknolojik bir sürüş deneyimi hedefleniyor.',
          ],
          en: [
            'Inside, BMW keeps the digital layout philosophy seen in the iX3. The large display area, simpler surfaces, and options such as M Sport seats aim to deliver a more technology-driven experience.',
          ],
        },
      },
      {
        heading: {
          tr: 'Güç, menzil ve şarj',
          en: 'Power, range, and charging',
        },
        bullets: {
          tr: [
            'İlk etapta 50 xDrive versiyonu çift motorlu yapıyla sunulacak.',
            'Sistemde yaklaşık 470 bg / 345 kW güç ve 645 Nm tork bekleniyor.',
            'İlk menzil hedefi yaklaşık 900 km seviyesinde paylaşılıyor.',
            '800V hızlı şarj altyapısı ile 10 dakikada 400 km menzil eklenmesi hedefleniyor.',
          ],
          en: [
            'The initial launch is expected to start with the dual-motor 50 xDrive version.',
            'Output is expected around 470 hp / 345 kW with 645 Nm of torque.',
            'The first range target is positioned near 900 km.',
            'The 800V fast-charging system is aimed at adding around 400 km of range in 10 minutes.',
          ],
        },
      },
      {
        heading: {
          tr: 'Lansman takvimi',
          en: 'Launch timing',
        },
        paragraphs: {
          tr: [
            'Üretimin Ağustos 2026 itibarıyla Münih’te başlaması, teslimatların ise sonbahar döneminde açılması bekleniyor.',
            'Almanya başlangıç fiyatı için ilk beklenti yaklaşık 65 bin Euro seviyesinde şekilleniyor.',
          ],
          en: [
            'Production is expected to begin in Munich in August 2026, with customer deliveries opening in the fall season.',
            'The early expectation for the starting price in Germany is around 65,000 Euros.',
          ],
        },
        link: {
          label: {
            tr: 'Kaynak haberi inceleyin',
            en: 'Review the source article',
          },
          href: 'https://tr.motor1.com/news/790364/bmw-i3-resmi-tanitim/',
        },
      },
    ],
  },
  {
    slug: 'araclarda-kamera-ve-takip-sistemi-zorunlu-hale-geldi-35u48-483v0',
    title: {
      tr: 'Araçlarda kamera ve takip sistemi zorunlu hale geldi',
      en: 'Camera and tracking systems became mandatory in vehicles',
    },
    description: {
      tr: 'Karayolları Trafik Yönetmeliği değişikliğiyle araç takip sistemi, iç-dış kamera, kayıt cihazı ve acil durum butonu için yeni uyumluluk takvimi başladı.',
      en: 'The updated highway traffic regulation introduced a new compliance calendar for tracking systems, interior-exterior cameras, recording devices, and emergency buttons.',
    },
    publishedAt: {
      tr: '18 Mart 2026',
      en: 'March 18, 2026',
    },
    publishedAtIso: '2026-03-18',
    heroImage: '/news/araclarda-kamera-ve-takip-sistemi-zorunlu-hale-geldi.jpg',
    tag: {
      tr: 'Uyumluluk',
      en: 'Compliance',
    },
    highlights: {
      tr: [
        'Araç takip sistemi ile iç ve dış kamera zorunlu hale geldi',
        'Görüntü kayıt cihazı ve acil durum butonu da kapsama alındı',
        'Geçiş takvimi model yılına göre kademeli uygulanacak',
      ],
      en: [
        'Vehicle tracking plus interior and exterior cameras became mandatory',
        'Recording devices and emergency buttons are now part of the scope',
        'The transition schedule will be applied gradually by model year',
      ],
    },
    relatedProducts: ['tracker', 'manager'],
    sections: [
      {
        paragraphs: {
          tr: [
            'Karayolları Trafik Yönetmeliği’nde yapılan değişiklikle, yönetmelik kapsamında yer alan araçlarda araç takip sistemi, iç ve dış kamera, görüntü kayıt cihazı ve acil durum butonu bulundurulması zorunlu hale geldi.',
            'Düzenleme Resmi Gazete’de yayımlandı ve saha operasyonlarında uyumluluk planlamasını doğrudan etkileyen yeni bir yükümlülük seti oluşturdu.',
          ],
          en: [
            'With the amendment to the highway traffic regulation, vehicles within scope are now required to carry a tracking system, interior and exterior cameras, a recording unit, and an emergency button.',
            'The change was published in the Official Gazette and creates a new set of obligations that directly impacts field compliance planning.',
          ],
        },
      },
      {
        heading: {
          tr: 'Uygulama takvimi',
          en: 'Implementation schedule',
        },
        bullets: {
          tr: [
            '2025-2023 model araçlar için yükümlülük, 1 Ocak 2026’dan sonraki ilk muayenede başlayacak.',
            '2022-2018 model araçlar için uygulama, 1 Ocak 2027’den sonraki ilk muayenede devreye girecek.',
            '2017 ve daha eski model araçlar için şart, 1 Ocak 2028’den sonraki ilk muayenede aranacak.',
          ],
          en: [
            'For 2025-2023 model vehicles, the requirement starts at the first inspection after January 1, 2026.',
            'For 2022-2018 model vehicles, the rule takes effect at the first inspection after January 1, 2027.',
            'For 2017 and older vehicles, the requirement will be checked at the first inspection after January 1, 2028.',
          ],
        },
      },
      {
        heading: {
          tr: 'Geçiş süreci',
          en: 'Transition period',
        },
        paragraphs: {
          tr: [
            '18 Şubat 2025 ile 1 Ekim 2025 tarihleri arasında okul servisi olarak tescil edilen ve eski yönetmeliğe uygun kamera kayıt cihazı bulunan araçlar için ayrı bir geçiş süreci tanındı.',
            'Bu araçlarda yeni şartlar, 31 Aralık 2027’den sonraki ilk muayeneye kadar aranmayacak.',
          ],
          en: [
            'A separate transition window was also defined for vehicles registered as school service vehicles between February 18, 2025 and October 1, 2025 that already have a recording unit compliant with the previous regulation.',
            'For these vehicles, the new conditions will not be required until the first inspection after December 31, 2027.',
          ],
        },
        link: {
          label: {
            tr: 'Kaynak haberi inceleyin',
            en: 'Review the source article',
          },
          href: 'https://www.trthaber.com/',
        },
      },
    ],
  },
  {
    slug: 'tokkder-2025-4ceyrek-kiralama-sektor-raporu-yayimlandi-84x82-75f16',
    title: {
      tr: 'TOKKDER 2025 4. çeyrek kiralama sektör raporu yayımlandı',
      en: 'TOKKDER 2025 Q4 leasing sector report is now available',
    },
    description: {
      tr: 'Kiralama sektörünün son çeyrek görünümünü değerlendirmek isteyen ekipler için TOKKDER raporuna doğrudan erişim sağlayan kısa içerik.',
      en: 'A short update that gives teams direct access to the TOKKDER report for the latest quarterly leasing sector outlook.',
    },
    publishedAt: {
      tr: '18 Mart 2026',
      en: 'March 18, 2026',
    },
    publishedAtIso: '2026-03-18',
    heroImage: '/news/tokkder-2025-4ceyrek-kiralama-sektor-raporu-yayimlandi.png',
    tag: {
      tr: 'Sektör Raporu',
      en: 'Sector Report',
    },
    highlights: {
      tr: [
        'Kiralama pazarının güncel görünümüne tek dokümanda ulaşılabiliyor',
        'Araç parkı, müşteri kırılımları ve finansal göstergeler birlikte okunabiliyor',
        'Planlama ekipleri için referans niteliğinde bir sektör seti sunuluyor',
      ],
      en: [
        'The current leasing market outlook is available in one document',
        'Fleet size, customer mix, and financial indicators can be reviewed together',
        'It offers a reference sector set for planning teams',
      ],
    },
    relatedProducts: ['rent', 'trader'],
    sections: [
      {
        heading: {
          tr: 'Rapor yayında',
          en: 'Report is live',
        },
        paragraphs: {
          tr: [
            'TOKKDER’in 2025 yılı 4. çeyrek kiralama sektör raporu yayımlandı. Raporda pazarın ölçeği, araç parkı görünümü ve dönemsel değişimlerin genel resmi yer alıyor.',
          ],
          en: [
            'TOKKDER has published its leasing sector report for the fourth quarter of 2025. The report brings together the market scale, fleet outlook, and the general picture of the latest period changes.',
          ],
        },
      },
      {
        heading: {
          tr: 'Neden önemli?',
          en: 'Why it matters',
        },
        paragraphs: {
          tr: [
            'Kiralama tarafında fiyatlama, araç parkı planlaması ve talep öngörüsü yapan ekipler için bu rapor önemli bir referans çerçevesi sunuyor.',
            'Özellikle büyüme, segment dağılımı ve sektör genelindeki hareketliliği kıyaslamak isteyen ekipler için düzenli takip edilmesi gereken kaynaklardan biri olarak öne çıkıyor.',
          ],
          en: [
            'For teams working on leasing pricing, fleet planning, and demand forecasting, the report provides a useful reference framework.',
            'It stands out as one of the recurring resources for teams that want to benchmark growth, segment distribution, and general market movement across the sector.',
          ],
        },
        link: {
          label: {
            tr: 'TOKKDER raporunu açın',
            en: 'Open the TOKKDER report',
          },
          href: 'https://tokkder.org/wp-content/uploads/2024/10/TOKKDER-Kiralama-Sektor-Raporu-Sunumu_2025-4.Ceyrek_v1.0.pdf',
        },
      },
    ],
  },
];
