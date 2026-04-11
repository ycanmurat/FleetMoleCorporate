import { CheckCircle2, LoaderCircle, SendHorizonal } from 'lucide-react';
import { useMemo, useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react';
import { useApp } from '../../context/AppContext';
import './ContactInquiryForm.css';

export interface ContactFormOption {
  label: string;
  value: string;
}

export interface ContactFormSubmission {
  id: string;
  siteScope: string;
  productSlug: string;
  productLabel: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export const CONTACT_SUBMISSIONS_STORAGE_KEY = 'fleetmole_contacts';

export const readContactFormSubmissions = (): ContactFormSubmission[] => {
  try {
    const raw = localStorage.getItem(CONTACT_SUBMISSIONS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ContactFormSubmission[]) : [];
  } catch {
    return [];
  }
};

interface ContactInquiryFormProps {
  accentColor: string;
  className?: string;
  defaultProduct: string;
  lead?: string;
  productOptions: ContactFormOption[];
  siteScope: string;
  title?: string;
  variant?: 'corporate' | 'product' | 'tracker';
}

const ContactInquiryForm = ({
  accentColor,
  className = '',
  defaultProduct,
  lead,
  productOptions,
  siteScope,
  title,
  variant = 'corporate',
}: ContactInquiryFormProps) => {
  const { lang } = useApp();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    subject: '',
    productSlug: defaultProduct,
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const labels = useMemo(
    () => ({
      title: title ?? (lang === 'tr' ? 'İletişim Formu' : 'Contact Form'),
      lead:
        lead ??
        (lang === 'tr'
          ? 'Talebinizi ürün ve konu başlığıyla birlikte paylaşın; ekip doğru kapsamla geri dönüş yapsın.'
          : 'Share your request with product and topic context so the team can respond with the right scope.'),
      subject: lang === 'tr' ? 'Konu' : 'Subject',
      product: lang === 'tr' ? 'Ürün' : 'Product',
      firstName: lang === 'tr' ? 'Ad' : 'First Name',
      lastName: lang === 'tr' ? 'Soyad' : 'Last Name',
      email: lang === 'tr' ? 'Mail' : 'Email',
      message: lang === 'tr' ? 'Mesaj' : 'Message',
      submit: lang === 'tr' ? 'Formu Gönder' : 'Send Inquiry',
      success:
        lang === 'tr'
          ? 'Talebiniz kaydedildi. İlgili ekip en kısa sürede sizinle iletişime geçecek.'
          : 'Your inquiry has been recorded. The relevant team will contact you shortly.',
      note:
        lang === 'tr'
          ? 'Form kayıtları bu yerel ortamda saklanır. Canlı entegrasyon eklendiğinde aynı alan yapısı korunabilir.'
          : 'Submissions are stored locally in this environment. The same field structure can be kept when a live integration is added.',
    }),
    [lang, lead, title],
  );

  const handleFieldChange =
    (field: keyof typeof formData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    const selectedProduct =
      productOptions.find((option) => option.value === formData.productSlug) ?? productOptions[0];

    const submission: ContactFormSubmission = {
      id: crypto.randomUUID(),
      siteScope,
      productSlug: formData.productSlug,
      productLabel: selectedProduct?.label ?? formData.productSlug,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      date: new Date().toISOString(),
    };

    window.setTimeout(() => {
      const current = readContactFormSubmissions();
      localStorage.setItem(CONTACT_SUBMISSIONS_STORAGE_KEY, JSON.stringify([submission, ...current]));

      setFormData({
        subject: '',
        productSlug: defaultProduct,
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
      setStatus('success');
    }, 240);
  };

  return (
    <section
      className={`inquiry-form inquiry-form--${variant} ${className}`.trim()}
      style={{ '--inquiry-accent': accentColor } as CSSProperties}
    >
      <div className="inquiry-form__intro">
        <span className="inquiry-form__eyebrow">{labels.title}</span>
        <h2>{labels.title}</h2>
        <p>{labels.lead}</p>
      </div>

      {status === 'success' ? (
        <div className="inquiry-form__status" role="status">
          <CheckCircle2 size={18} />
          <span>{labels.success}</span>
        </div>
      ) : null}

      <form className="inquiry-form__body" onSubmit={handleSubmit}>
        <label className="inquiry-form__field inquiry-form__field--full">
          <span>{labels.subject}</span>
          <input
            required
            type="text"
            value={formData.subject}
            onChange={handleFieldChange('subject')}
            placeholder={lang === 'tr' ? 'Talebin konusunu kısa yazın' : 'Summarize the topic briefly'}
          />
        </label>

        <label className="inquiry-form__field inquiry-form__field--full">
          <span>{labels.product}</span>
          <select required value={formData.productSlug} onChange={handleFieldChange('productSlug')}>
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="inquiry-form__field">
          <span>{labels.firstName}</span>
          <input
            required
            type="text"
            value={formData.firstName}
            onChange={handleFieldChange('firstName')}
            placeholder={lang === 'tr' ? 'Adınız' : 'Your first name'}
          />
        </label>

        <label className="inquiry-form__field">
          <span>{labels.lastName}</span>
          <input
            required
            type="text"
            value={formData.lastName}
            onChange={handleFieldChange('lastName')}
            placeholder={lang === 'tr' ? 'Soyadınız' : 'Your last name'}
          />
        </label>

        <label className="inquiry-form__field inquiry-form__field--full">
          <span>{labels.email}</span>
          <input
            required
            type="email"
            value={formData.email}
            onChange={handleFieldChange('email')}
            placeholder={lang === 'tr' ? 'ornek@kurum.com' : 'name@company.com'}
          />
        </label>

        <label className="inquiry-form__field inquiry-form__field--full">
          <span>{labels.message}</span>
          <textarea
            required
            rows={6}
            value={formData.message}
            onChange={handleFieldChange('message')}
            placeholder={
              lang === 'tr'
                ? 'Kapsam, beklenti, demo ihtiyacı veya entegrasyon detayını paylaşın.'
                : 'Share scope, expectations, demo needs, or integration details.'
            }
          />
        </label>

        <div className="inquiry-form__footer">
          <p>{labels.note}</p>
          <button className="btn-primary inquiry-form__submit" disabled={status === 'submitting'} type="submit">
            {status === 'submitting' ? <LoaderCircle size={18} className="inquiry-form__spinner" /> : <SendHorizonal size={18} />}
            <span>{labels.submit}</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactInquiryForm;
