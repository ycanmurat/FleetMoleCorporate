import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import './AuthPage.css';

type AuthMode = 'login' | 'register' | 'forgotPassword';

interface AuthPageProps {
  mode: AuthMode;
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const { lang, localizePath } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isForgotPassword = mode === 'forgotPassword';
  const pathname = localizePath(
    isLogin ? '/login' : isRegister ? '/register' : '/forgot-password',
  );
  const loginPath = localizePath('/login');
  const registerPath = localizePath('/register');
  const forgotPasswordPath = localizePath('/forgot-password');

  useEffect(() => {
    setSubmitted(false);
  }, [mode]);

  const title =
    lang === 'tr'
      ? isLogin
        ? 'Kullanıcı Girişi | FleetMole'
        : isRegister
          ? 'Kullanıcı Kaydı | FleetMole'
          : 'Şifre Sıfırlama | FleetMole'
      : isLogin
        ? 'User Login | FleetMole'
        : isRegister
          ? 'Create Account | FleetMole'
          : 'Reset Password | FleetMole';

  const description =
    lang === 'tr'
      ? isLogin
        ? 'FleetMole kurumsal paneli için sade kullanıcı giriş ekranı.'
        : isRegister
          ? 'FleetMole kurumsal paneli için sade kullanıcı kayıt ekranı.'
          : 'FleetMole kullanıcıları için şifre sıfırlama ekranı.'
      : isLogin
        ? 'Minimal user login screen for the FleetMole corporate panel.'
        : isRegister
          ? 'Minimal user registration screen for the FleetMole corporate panel.'
          : 'Password reset screen for FleetMole users.';

  const heroTitle =
    lang === 'tr'
      ? isLogin
        ? 'Kurumsal hesabınıza giriş yapın.'
        : isRegister
          ? 'Yeni kurumsal hesabınızı oluşturun.'
          : 'Şifrenizi sıfırlayın.'
      : isLogin
        ? 'Sign in to your corporate account.'
        : isRegister
          ? 'Create your new enterprise account.'
          : 'Reset your password.';

  const heroDescription =
    lang === 'tr'
      ? isLogin
        ? 'E-posta adresiniz ve şifrenizle devam edin.'
        : isRegister
          ? 'Kısa kayıt formu ile ilk kullanıcı erişiminizi oluşturun.'
          : 'Hesabınıza bağlı e-posta adresini girin; sıfırlama bağlantısını gönderelim.'
      : isLogin
        ? 'Continue with your email and password.'
        : isRegister
          ? 'Start with a short registration form.'
          : 'Enter the email address linked to your account to receive a reset link.';

  const cardTitle =
    lang === 'tr'
      ? isLogin
        ? 'Giriş'
        : isRegister
          ? 'Kayıt Ol'
          : 'Şifre Yenile'
      : isLogin
        ? 'Sign In'
        : isRegister
          ? 'Register'
          : 'Reset Password';

  const cardDescription =
    lang === 'tr'
      ? isLogin
        ? 'Hesabınıza erişmek için bilgilerinizi girin.'
        : isRegister
          ? 'Temel kullanıcı ve şirket bilgileriyle devam edin.'
          : 'Şifre sıfırlama talebi için e-posta adresinizi girin.'
      : isLogin
        ? 'Enter your credentials to access your account.'
        : isRegister
          ? 'Continue with your user and company details.'
          : 'Enter your email address to request a password reset.';

  const submitLabel =
    lang === 'tr'
      ? isLogin
        ? 'Giriş Yap'
        : isRegister
          ? 'Kayıt Oluştur'
          : 'Sıfırlama Linki Gönder'
      : isLogin
        ? 'Sign In'
        : isRegister
          ? 'Create Account'
          : 'Send Reset Link';

  const successMessage =
    lang === 'tr'
      ? isLogin
        ? 'Giriş akışı arayüz olarak hazır. Kimlik doğrulama servisi bağlandığında bu form gerçek oturum açma işlemini başlatacak.'
        : isRegister
          ? 'Kayıt akışı arayüz olarak hazır. Backend entegrasyonu eklendiğinde bu form hesap oluşturma sürecini başlatacak.'
          : 'Şifre sıfırlama akışı arayüz olarak hazır. Mail servisi bağlandığında bu form sıfırlama bağlantısını gönderecek.'
      : isLogin
        ? 'The sign-in flow is ready at the UI level. Once the authentication service is connected, this form will start the real sign-in process.'
        : isRegister
          ? 'The registration flow is ready at the UI level. Once backend integration is added, this form will start the account creation process.'
          : 'The password reset flow is ready at the UI level. Once the email service is connected, this form will send the reset link.';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        pathname={pathname}
        locale={lang}
        robots="noindex,nofollow"
        alternates={{
          tr: isLogin ? '/tr/login' : isRegister ? '/tr/register' : '/tr/forgot-password',
          en: isLogin ? '/en/login' : isRegister ? '/en/register' : '/en/forgot-password',
          'x-default': isLogin ? '/tr/login' : isRegister ? '/tr/register' : '/tr/forgot-password',
        }}
      />

      <div className="auth-page">
        <section className="auth-section">
          <div className="container auth-container">
            <div className="auth-shell">
              <div className="auth-intro">
                <span className="auth-kicker">{lang === 'tr' ? 'FleetMole Erişim' : 'FleetMole Access'}</span>
                <h1>{heroTitle}</h1>
                <p>{heroDescription}</p>
              </div>

              <div className="auth-card">
                <div className="auth-card-head">
                  <h2>{cardTitle}</h2>
                  <p>{cardDescription}</p>
                </div>

                {submitted ? (
                  <div className="auth-status" role="status" aria-live="polite">
                    <CheckCircle2 size={18} />
                    <span>{successMessage}</span>
                  </div>
                ) : null}

                <form className="auth-form" onSubmit={handleSubmit}>
                  {isRegister ? (
                    <>
                      <label className="auth-field">
                        <span>{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}</span>
                        <input
                          type="text"
                          name="fullName"
                          autoComplete="name"
                          placeholder={lang === 'tr' ? 'Ad Soyad' : 'Full Name'}
                          required
                        />
                      </label>

                      <label className="auth-field">
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

                  <label className="auth-field">
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
                    <label className="auth-field">
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
                    <div className="auth-row">
                      <label className="auth-check">
                        <input className="auth-check-input" type="checkbox" name="remember" />
                        <span className="auth-check-box" aria-hidden="true" />
                        <span className="auth-check-label">{lang === 'tr' ? 'Beni hatırla' : 'Remember me'}</span>
                      </label>

                      <Link to={forgotPasswordPath} className="auth-forgot">
                        {lang === 'tr' ? 'Şifremi Unuttum' : 'Forgot Password?'}
                      </Link>
                    </div>
                  ) : null}

                  {isRegister ? (
                    <label className="auth-check auth-check--consent">
                      <input className="auth-check-input" type="checkbox" name="consent" required />
                      <span className="auth-check-box" aria-hidden="true" />
                      <span className="auth-check-label">
                        {lang === 'tr'
                          ? 'Gizlilik ve kullanım koşullarını kabul ediyorum.'
                          : 'I agree to the privacy policy and usage terms.'}
                      </span>
                    </label>
                  ) : null}

                  <button className="btn-primary auth-submit" type="submit">
                    <span>{submitLabel}</span>
                    <ArrowRight size={18} />
                  </button>
                </form>

                <div className="auth-meta">
                  {isRegister ? (
                    <p className="auth-legal-note">
                      {lang === 'tr' ? 'Devam ederek ' : 'By continuing you accept the '}
                      <Link to={localizePath('/legal/gizlilik-politikasi')}>
                        {lang === 'tr' ? 'gizlilik politikasını' : 'privacy policy'}
                      </Link>
                      {lang === 'tr' ? ' ve ' : ' and '}
                      <Link to={localizePath('/legal/kullanim-sartlari')}>
                        {lang === 'tr' ? 'kullanım şartlarını' : 'usage terms'}
                      </Link>
                      .
                    </p>
                  ) : null}

                  {isForgotPassword ? (
                    <div className="auth-switch auth-switch--stack">
                      <Link to={loginPath}>{lang === 'tr' ? 'Giriş ekranına dön' : 'Back to sign in'}</Link>
                      <Link to={registerPath}>{lang === 'tr' ? 'Yeni hesap oluştur' : 'Create a new account'}</Link>
                    </div>
                  ) : (
                    <div className="auth-switch">
                      <span>
                        {lang === 'tr'
                          ? isLogin
                            ? 'Hesabınız yok mu?'
                            : 'Zaten hesabınız var mı?'
                          : isLogin
                            ? 'Do not have an account?'
                            : 'Already have an account?'}
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
          </div>
        </section>
      </div>
    </>
  );
};

export default AuthPage;
