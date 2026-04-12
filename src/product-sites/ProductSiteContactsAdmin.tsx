import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Mail, MessageSquare, Tag, Trash2, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ContactFormSubmission } from '../components/ContactInquiryForm/ContactInquiryForm';
import SeoHead from '../components/Seo/SeoHead';
import { useApp } from '../context/AppContext';
import { getProductFaviconPath, getProductSitePath } from '../config/productSites';
import { useProductSitePathMode } from './ProductSiteRuntimeContext';

const ProductSiteContactsAdmin = () => {
  const { lang } = useApp();
  const pathMode = useProductSitePathMode();
  const homePath = getProductSitePath('tracker', lang, '/', pathMode);
  const [contacts, setContacts] = useState<ContactFormSubmission[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('fleetmole_contacts');
    if (data) {
      try {
        setContacts(JSON.parse(data));
      } catch (err) {
        console.error('Failed to parse contacts', err);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm(lang === 'tr' ? 'Bu kaydı silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this record?')) {
      const updated = contacts.filter((c) => c.id !== id);
      setContacts(updated);
      localStorage.setItem('fleetmole_contacts', JSON.stringify(updated));
    }
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }).format(d);
  };

  return (
    <>
      <SeoHead
        title="Admin | Form Kayıtları"
        description="İletişim formu kayıtları"
        pathname={getProductSitePath('tracker', lang, '/admin/contacts', pathMode)}
        locale={lang}
        favicon={getProductFaviconPath('tracker')}
        robots="noindex,nofollow"
      />
      <div className="product-site-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-default)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem' }}>{lang === 'tr' ? 'İletişim Formu Kayıtları' : 'Contact Form Submissions'}</h1>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>{lang === 'tr' ? 'Tüm sitelerden gelen kayıtlar' : 'Submissions from all sites'}</p>
            </div>
            <Link to={homePath} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={16} /> {lang === 'tr' ? 'Siteye Dön' : 'Back to Site'}
            </Link>
          </div>

          {contacts.length === 0 ? (
            <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <MessageSquare size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h3>{lang === 'tr' ? 'Henüz form gönderilmemiş' : 'No form submissions yet'}</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem' }}>
              {contacts.map((contact) => (
                <div key={contact.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                  <button 
                    onClick={() => handleDelete(contact.id)}
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title={lang === 'tr' ? 'Sil' : 'Delete'}
                  >
                    <Trash2 size={20} />
                  </button>
                  
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', paddingBottom: '1rem', borderBottom: '1px solid var(--border-soft)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={16} color="var(--primary)" />
                      <strong>{contact.name || `${contact.firstName} ${contact.lastName}`.trim()}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={16} color="var(--primary)" />
                      <a href={`mailto:${contact.email}`} style={{ color: 'var(--text-base)' }}>{contact.email}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <Clock size={16} />
                      <small>{formatDate(contact.date)}</small>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <Tag size={16} />
                      <span className="ps-chip" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>{contact.productLabel || contact.productSlug}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{contact.subject}</h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSiteContactsAdmin;
