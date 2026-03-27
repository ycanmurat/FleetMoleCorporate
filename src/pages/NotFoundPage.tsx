import { Link } from 'react-router-dom';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { lang, localizePath } = useApp();

  return (
    <>
      <SeoHead
        title={lang === 'tr' ? 'Sayfa Bulunamadı | FleetMole' : 'Page Not Found | FleetMole'}
        description={
          lang === 'tr'
            ? 'İstediğiniz sayfa bulunamadı. FleetMole ana sayfasına geri dönebilirsiniz.'
            : 'The page you requested could not be found. Return to the FleetMole homepage.'
        }
        pathname={localizePath('/404')}
        locale={lang}
        robots="noindex,nofollow"
      />

      <section className="not-found-page">
        <div className="container not-found-card">
          <span>404</span>
          <h1>{lang === 'tr' ? 'Aradığınız sayfa burada değil.' : 'The page you are looking for is not here.'}</h1>
          <p>
            {lang === 'tr'
              ? 'URL yapısı değişmiş olabilir ya da ilgili içerik henüz yayında olmayabilir.'
              : 'The URL structure may have changed, or the requested content may not be published yet.'}
          </p>
          <Link className="btn-primary" to={localizePath('/')}>
            {lang === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
