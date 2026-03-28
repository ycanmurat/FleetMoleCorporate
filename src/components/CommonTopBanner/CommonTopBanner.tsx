import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './CommonTopBanner.css';

interface CommonTopBannerProps {
  to?: string;
  href?: string;
  external?: boolean;
  className?: string;
}

const CommonTopBanner = ({
  to = '/',
  href,
  external = false,
  className = '',
}: CommonTopBannerProps) => {
  const { isDark } = useApp();
  const logoSrc = `${import.meta.env.BASE_URL}${isDark ? 'logo-white.png' : 'logo-black.png'}`;

  return (
    <div className={`common-top-banner ${className}`.trim()}>
      {external ? (
        <a className="common-top-banner-link" href={href ?? to} aria-label="FleetMole">
          <img src={logoSrc} alt="FleetMole" />
        </a>
      ) : (
        <Link className="common-top-banner-link" to={to} aria-label="FleetMole">
          <img src={logoSrc} alt="FleetMole" />
        </Link>
      )}
    </div>
  );
};

export default CommonTopBanner;
