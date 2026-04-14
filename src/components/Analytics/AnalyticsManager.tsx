import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GOOGLE_ANALYTICS_ID, HOTJAR_SITE_ID, HOTJAR_VERSION } from '../../config/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    hj?: ((...args: unknown[]) => void) & { q?: unknown[][] };
    _hjSettings?: {
      hjid: number;
      hjsv: number;
    };
  }
}

const GOOGLE_TAG_SCRIPT_ID = 'fleetmole-google-tag';
const HOTJAR_SCRIPT_ID = 'fleetmole-hotjar';
let googleAnalyticsInitialized = false;
let hotjarInitialized = false;

const appendScript = ({
  id,
  src,
}: {
  id: string;
  src: string;
}) => {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const initializeGoogleAnalytics = () => {
  if (googleAnalyticsInitialized) {
    return;
  }

  appendScript({
    id: GOOGLE_TAG_SCRIPT_ID,
    src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`,
  });

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    send_page_view: false,
  });

  googleAnalyticsInitialized = true;
};

const initializeHotjar = () => {
  if (hotjarInitialized) {
    return;
  }

  if (!window.hj) {
    window.hj = function hotjar(...args: unknown[]) {
      const queue = window.hj?.q || [];
      queue.push(args);
      if (window.hj) {
        window.hj.q = queue;
      }
    };
  }

  window._hjSettings = {
    hjid: HOTJAR_SITE_ID,
    hjsv: HOTJAR_VERSION,
  };

  appendScript({
    id: HOTJAR_SCRIPT_ID,
    src: `https://static.hotjar.com/c/hotjar-${HOTJAR_SITE_ID}.js?sv=${HOTJAR_VERSION}`,
  });

  hotjarInitialized = true;
};

const AnalyticsManager = () => {
  const location = useLocation();

  useEffect(() => {
    initializeGoogleAnalytics();
    initializeHotjar();
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const pagePath = `${location.pathname}${location.search}${location.hash}`;

      window.gtag?.('config', GOOGLE_ANALYTICS_ID, {
        page_title: document.title,
        page_path: pagePath,
        page_location: window.location.href,
      });

      window.hj?.('stateChange', pagePath);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.hash, location.pathname, location.search]);

  return null;
};

export default AnalyticsManager;
