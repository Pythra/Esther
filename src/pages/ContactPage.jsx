import { useState } from 'react';
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoLogoFacebook, IoLogoInstagram } from 'react-icons/io5';
import { api } from '../api';
import './PageLayout.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: '' });
    try {
      await api.contact(formData);
      setStatus({ type: 'success', message: 'Thank you for your message. We will respond as soon as possible.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="teg-page">
      <section className="teg-page-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with The 7000 Esther Generation</p>
      </section>
      <section className="teg-page-content">
        <div className="teg-content-inner">
          <div className="teg-contact-grid">
            <div className="teg-contact-info">
              <h2>Contact Information</h2>
              <a href="mailto:info@tegministry.org" className="teg-contact-item">
                <IoMailOutline /> info@tegministry.org
              </a>
              <a href="tel:+2348063530222" className="teg-contact-item">
                <IoCallOutline /> +234 806 353 0222
              </a>
              <a href="https://wa.me/2348068876926" target="_blank" rel="noopener noreferrer" className="teg-contact-item">
                <IoCallOutline /> WhatsApp ONLY: +234 806 887 6926
              </a>
              <div className="teg-contact-item">
                <IoLocationOutline /> Nigeria
              </div>
              <div className="teg-contact-social">
                <a href="https://www.facebook.com/share/1DaPGBVGaZ/" target="_blank" rel="noopener noreferrer" className="teg-contact-item" aria-label="Facebook">
                  <IoLogoFacebook /> Our Facebook page
                </a>
                <a href="https://www.instagram.com/teg.7000" target="_blank" rel="noopener noreferrer" className="teg-contact-item" aria-label="Instagram">
                  <IoLogoInstagram /> @teg.7000
                </a>
              </div>
            </div>
            <div className="teg-contact-form-block">
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit} className="teg-form">
                <div className="teg-form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="teg-form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="teg-form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} />
                </div>
                <div className="teg-form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange}></textarea>
                </div>
                {status.message && (
                  <p className={status.type === 'error' ? 'teg-form-error' : 'teg-form-success'}>{status.message}</p>
                )}
                <button type="submit" className="teg-btn teg-btn-primary" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
