import type { Locale } from '../config/site';

export const COMPANY_INFO = {
  name: 'FleetMole',
  legalName: 'FleetMole Group',
  email: 'info@fleetmole.com',
  phoneDisplay: '0(216) 606 99 99',
  phoneHref: '+902166069999',
  address: {
    tr: 'Kozyatağı Mah. Bayar Cad. No:97 Ofis No:21 Kat:10 34742 Kadıköy / İstanbul',
    en: 'Kozyatagi Mah. Bayar Cad. No:97 Office No:21 Floor:10 34742 Kadikoy / Istanbul',
  } satisfies Record<Locale, string>,
  mapsQuery:
    'Kozyatağı Mah. Bayar Cad. No:97 Ofis No:21 Kat:10 34742 Kadıköy İstanbul',
  youtubeUrl: 'https://www.fleetmole.com/iletisim',
} as const;

export const getCompanyAddress = (lang: Locale) => COMPANY_INFO.address[lang];
