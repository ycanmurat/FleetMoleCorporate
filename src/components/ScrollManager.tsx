import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const targetId = decodeURIComponent(location.hash.slice(1));
        const target = document.getElementById(targetId);

        if (target) {
          const headerOffset = Number.parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--header-offset'),
          );
          const top = window.scrollY + target.getBoundingClientRect().top - (Number.isNaN(headerOffset) ? 0 : headerOffset) - 20;

          window.scrollTo({
            top: Math.max(top, 0),
            behavior: 'smooth',
          });

          return;
        }
      }

      window.scrollTo({ top: 0, left: 0 });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [location.hash, location.pathname]);

  return null;
};

export default ScrollManager;
