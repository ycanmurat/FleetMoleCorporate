# FleetMole Corporate Monorepo

Bu repo artik 1 corporate site + 7 urun sitesi iceren bir workspace yapisidir.

## Projeler

- `corporate` -> `http://localhost:5173`
- `manager` -> `http://localhost:4101`
- `rent` -> `http://localhost:4102`
- `tracker` -> `http://localhost:4103`
- `trader` -> `http://localhost:4104`
- `partner` -> `http://localhost:4105`
- `tyre` -> `http://localhost:4106`
- `smart` -> `http://localhost:4107`

Corporate site uzerindeki urun linkleri bu ayri sitelere cikar.

## Kurulum

```bash
npm install
```

## Gelistirme

Tek site:

```bash
npm run dev
```

Tum siteler:

```bash
npm run dev:all
```

Tek tek urun siteleri:

```bash
npm run dev:manager
npm run dev:rent
npm run dev:tracker
npm run dev:trader
npm run dev:partner
npm run dev:tyre
npm run dev:smart
```

## Build

Sadece corporate:

```bash
npm run build
```

Tum uygulamalar:

```bash
npm run build:all
```

## Onerilen Test Akisi

En dogru akıs su:

1. Ilk terminalde tum siteleri kaldir:

```bash
npm run dev:all
```

2. Ikinci terminalde otomatik smoke check calistir:

```bash
npm run smoke:local
```

Bu komut su route'lari kontrol eder:

- corporate: `/tr`, `/en/contact`
- tum urun siteleri: `/tr`, `/en/contact`

3. Smoke temiz gectikten sonra tek tek manuel inceleme yap:

- `corporate` ana sayfa -> urun kartlari dogru siteye cikiyor mu
- her urun sitesi ana sayfa -> hero, renk, menu, footer
- her urun sitesi contact sayfasi -> TR/EN gecisi, iletisim aksiyonlari
- mobile responsive kontrol
- corporate -> urun linkleri dogrudan ayri siteye gidiyor mu

## Manuel Inceleme Sirasi

Pratik sira:

1. `corporate`
2. `manager`
3. `rent`
4. `tracker`
5. `trader`
6. `partner`
7. `tyre`
8. `smart`

## Dizinler

- `src/` -> corporate uygulama
- `src/product-sites/` -> ortak urun-site app katmani
- `sites/*` -> her urun icin ayri Vite workspace
- `scripts/dev-all.mjs` -> tum siteleri ayni anda kaldirir
- `scripts/smoke-check.mjs` -> local route smoke testi

## Notlar

- Urun site URL'leri env ile override edilebilir.
- `smart` urunu onceki `ai` slug'inin yerine normalize edilmistir.
- Workspace yapisi npm workspaces ile calisir.
