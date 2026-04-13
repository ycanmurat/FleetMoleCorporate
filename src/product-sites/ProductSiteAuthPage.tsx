import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductMark from '../components/ProductMark/ProductMark';
import ProductWordmark from '../components/ProductWordmark/ProductWordmark';
import SeoHead from '../components/Seo/SeoHead';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useApp } from '../context/AppContext';
import { toAbsoluteUrl } from '../lib/i18n';
import { useProductSite } from './ProductSiteContext';
import { useProductSitePathMode } from './ProductSiteRuntimeContext';

type ProductSiteAuthMode = 'login' | 'register' | 'forgotPassword';

interface ProductSiteAuthPageProps {
  mode: ProductSiteAuthMode;
}

const ProductSiteAuthPage = ({ mode }: ProductSiteAuthPageProps) => {
  const { lang } = useApp();
  const { product } = useProductSite();
  const pathMode = useProductSitePathMode();
  const [submitted, setSubmitted] = useState(false);

  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isForgotPassword = mode === 'forgotPassword';

  const productHomePath = getProductSitePath(product.slug, lang, '/', pathMode);
  const productContactPath = getProductSitePath(product.slug, lang, '/contact', pathMode);
  const loginPath = getProductSitePath(product.slug, lang, '/login', pathMode);
  const registerPath = getProductSitePath(product.slug, lang, '/register', pathMode);
  const forgotPasswordPath = getProductSitePath(product.slug, lang, '/forgot-password', pathMode);
  const currentPath = isLogin ? loginPath : isRegister ? registerPath : forgotPasswordPath;
  const focusPoints = product.benefits[lang].slice(0, 3);

  useEffect(() => {
    setSubmitted(false);
  }, [mode, product.slug]);

  const pageTitle =
    lang === 'tr'
      ? isLogin
        ? `${product.name} | Kullanıcı Girişi`
        : isRegister
          ? `${product.name} | Kayıt Oluştur`
          : `${product.name} | Şifre Sıfırlama`
      : isLogin
        ? `${product.name} | Sign In`
        : isRegister
          ? `${product.name} | Create Account`
          : `${product.name} | Reset Password`;

  const pageDescription =
    lang === 'tr'
      ? isLogin
        ? `${product.name} çalışma alanına güvenli erişim için kullanıcı girişi ekranı.`
        : isRegister
          ? `${product.name} ekibi için ürün bazlı kullanıcı kayıt ekranı.`
          : `${product.name} kullanıcıları için şifre sıfırlama ekranı.`
      : isLogin
        ? `Product-specific sign-in screen for the ${product.name} workspace.`
        : isRegister
          ? `Product-specific registration screen for the ${product.name} team.`
          : `Password reset screen for ${product.name} users.`;

  const introTitle =
    lang === 'tr'
      ? isLogin
        ? `${product.shortName} çalışma alanınıza giriş yapın.`
        : isRegister
          ? `${product.shortName} için yeni erişim oluşturun.`
          : `${product.shortName} şifrenizi yenileyin.`
      : isLogin
        ? `Sign in to your ${product.shortName} workspace.`
        : isRegister
          ? `Create a new ${product.shortName} access.`
          : `Reset your ${product.shortName} password.`;

  const introDescription =
    lang === 'tr'
      ? isLogin
        ? `${product.summary.tr} Erişiminiz yalnızca ${product.shortName} kullanıcı alanı için geçerlidir.`
        : isRegister
          ? `${product.shortName} operasyonuna özel kullanıcı oluşturma talebinizi bu ekran üzerinden başlatın.`
          : `${product.shortName} hesabınıza bağlı e-posta adresini girin; yenileme bağlantısını paylaşalım.`
      : isLogin
        ? `${product.summary.en} Your access stays scoped to the ${product.shortName} workspace.`
        : isRegister
          ? `Start a product-specific user access request for the ${product.shortName} workspace.`
          : `Enter the email linked to your ${product.shortName} account to receive a reset link.`;

  const cardTitle =
    lang === 'tr'
      ? isLogin
        ? 'Giriş'
        : isRegister
          ? 'Kayıt'
          : 'Şifre Yenile'
      : isLogin
        ? 'Sign In'
        : isRegister
          ? 'Register'
          : 'Reset Password';

  const cardDescription =
    lang === 'tr'
      ? isLogin
        ? `${product.shortName} panelinize erişmek için kullanıcı bilgilerinizi girin.`
        : isRegister
          ? `${product.shortName} ekibiniz ve kurumunuz için yeni kullanıcı erişimi oluşturun.`
          : `${product.shortName} hesabınız için sıfırlama isteği gönderin.`
      : isLogin
        ? `Enter your credentials to access the ${product.shortName} workspace.`
        : isRegister
          ? `Create a new user access for your ${product.shortName} team and organization.`
          : `Request a reset link for your ${product.shortName} account.`;

  const submitLabel =
    lang === 'tr'
      ? isLogin
        ? 'Giriş Yap'
        : isRegister
          ? 'Erişim Oluştur'
          : 'Bağlantı Gönder'
      : isLogin
        ? 'Sign In'
        : isRegister
          ? 'Create Access'
          : 'Send Link';

  const successMessage =
    lang === 'tr'
      ? isLogin
        ? `${product.shortName} giriş arayüzü hazır. Kimlik doğrulama servisi bağlandığında bu form gerçek oturum açma akışını başlatacak.`
        : isRegister
          ? `${product.shortName} kayıt arayüzü hazır. Backend entegrasyonu tamamlandığında bu form erişim talebini işleyecek.`
          : `${product.shortName} şifre yenileme arayüzü hazır. Mail servisi bağlandığında bağlantı gönderilecek.`
      : isLogin
        ? `The ${product.shortName} sign-in UI is ready. Once the authentication service is connected, this form will start the real sign-in flow.`
        : isRegister
          ? `The ${product.shortName} registration UI is ready. Once the backend integration is connected, this form will process the access request.`
          : `The ${product.shortName} password reset UI is ready. Once the email service is connected, this form will send the reset link.`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        pathname={currentPath}
        locale={lang}
        favicon={getProductFaviconPath(product.slug)}
        robots="noindex,nofollow"
        alternates={{
          tr: getProductSitePath(product.slug, 'tr', currentPath.endsWith('/register') ? '/register' : currentPath.endsWith('/forgot-password') ? '/forgot-password' : '/login', pathMode),
          en: getProductSitePath(product.slug, 'en', currentPath.endsWith('/register') ? '/register' : currentPath.endsWith('/forgot-password') ? '/forgot-password' : '/login', pathMode),
          'x-default': getProductSitePath(product.slug, 'tr', currentPath.endsWith('/register') ? '/register' : currentPath.endsWith('/forgot-password') ? '/forgot-password' : '/login', pathMode),
        }}
        themeColor={product.theme.primary}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: pageTitle,
          description: pageDescription,
          url: toAbsoluteUrl(currentPath),
        }}
      />

      <div className="product-site-page ps-auth-page">
        <section className="ps-auth-section">
          <div className="container ps-auth-shell">
            <div className="ps-auth-intro glass-panel">
              <span className="ps-chip">
                {lang === 'tr' ? `${product.shortName} erişimi` : `${product.shortName} access`}
              </span>

              <div className="ps-auth-intro-brand">
                <span className="ps-auth-intro-mark">
                  <ProductMark product={product} size={54} />
                </span>
                <ProductWordmark product={product} height={40} alt="" className="ps-auth-intro-wordmark" />
              </div>

              <h1>{introTitle}</h1>
              <p>{introDescription}</p>

              <div className="ps-auth-focus-list">
                {focusPoints.map((item) => (
                  <span key={item} className="ps-auth-focus-item">
                    <CheckCircle2 size={15} />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              <div className="ps-auth-intro-actions">
                <Link to={productHomePath} className="btn-outline">
                  {lang === 'tr' ? 'Ürün Ana Sayfası' : 'Product Home'}
                </Link>
                <Link to={productContactPath} className="btn-primary">
                  {lang === 'tr' ? 'Ekiple Görüşün' : 'Talk to the Team'} <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="ps-auth-card glass-panel">
              <div className="ps-auth-card-head">
                <h2>{cardTitle}</h2>
                <p>{cardDescription}</p>
              </div>

              {submitted ? (
                <div className="ps-auth-status" role="status" aria-live="polite">
                  <CheckCircle2 size={18} />
                  <span>{successMessage}</span>
                </div>
              ) : null}

              <form className="ps-auth-form" onSubmit={handleSubmit}>
                {isRegister ? (
                  <>
                    <label className="ps-auth-field">
                      <span>{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}</span>
                      <input
                        type="text"
                        name="fullName"
                        autoComplete="name"
                        placeholder={lang === 'tr' ? 'Ad Soyad' : 'Full Name'}
                        required
                      />
                    </label>

                    <label className="ps-auth-field">
                      <span>{lang === 'tr' ? 'Şirket Adı' : 'Company Name'}</span>
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        placeholder={lang === 'tr' ? 'Şirket adı' : 'Company name'}
                        required
                      />
                    </label>
                  </>
                ) : null}

                <label className="ps-auth-field">
                  <span>{lang === 'tr' ? 'E-Posta' : 'Email'}</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete={isForgotPassword ? 'email' : isLogin ? 'email' : 'username'}
                    placeholder={lang === 'tr' ? 'ornek@firma.com' : 'name@company.com'}
                    required
                  />
                </label>

                {isForgotPassword ? null : (
                  <label className="ps-auth-field">
                    <span>{lang === 'tr' ? 'Şifre' : 'Password'}</span>
                    <input
                      type="password"
                      name="password"
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      placeholder={lang === 'tr' ? 'Şifreniz' : 'Your password'}
                      required
                    />
                  </label>
                )}

                {isLogin ? (
                  <div className="ps-auth-row">
                    <label className="ps-auth-check">
                      <input className="ps-auth-check-input" type="checkbox" name="remember" />
                      <span className="ps-auth-check-box" aria-hidden="true" />
                      <span className="ps-auth-check-label">{lang === 'tr' ? 'Beni hatırla' : 'Remember me'}</span>
                    </label>

                    <Link to={forgotPasswordPath} className="ps-auth-link">
                      {lang === 'tr' ? 'Şifremi Unuttum' : 'Forgot Password?'}
                    </Link>
                  </div>
                ) : null}

                {isRegister ? (
                  <label className="ps-auth-check ps-auth-check--consent">
                    <input className="ps-auth-check-input" type="checkbox" name="consent" required />
                    <span className="ps-auth-check-box" aria-hidden="true" />
                    <span className="ps-auth-check-label">
                      {lang === 'tr'
                        ? `${product.shortName} kullanım ve erişim koşullarını kabul ediyorum.`
                        : `I agree to the ${product.shortName} access and usage terms.`}
                    </span>
                  </label>
                ) : null}

                <button className="btn-primary ps-auth-submit" type="submit">
                  <span>{submitLabel}</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="ps-auth-meta">
                {isForgotPassword ? (
                  <div className="ps-auth-switch ps-auth-switch--stack">
                    <Link to={loginPath}>{lang === 'tr' ? 'Giriş ekranına dön' : 'Back to sign in'}</Link>
                    <Link to={registerPath}>{lang === 'tr' ? 'Yeni erişim oluştur' : 'Create new access'}</Link>
                  </div>
                ) : (
                  <div className="ps-auth-switch">
                    <span>
                      {lang === 'tr'
                        ? isLogin
                          ? 'Henüz erişiminiz yok mu?'
                          : 'Zaten erişiminiz var mı?'
                        : isLogin
                          ? 'Need a new access?'
                          : 'Already have access?'}
                    </span>
                    <Link to={isLogin ? registerPath : loginPath}>
                      {lang === 'tr'
                        ? isLogin
                          ? 'Kayıt ol'
                          : 'Giriş yap'
                        : isLogin
                          ? 'Register'
                          : 'Sign in'}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductSiteAuthPage;
