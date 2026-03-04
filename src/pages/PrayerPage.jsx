import { useState } from 'react';
import { Link } from 'react-router-dom';
import prayImg from '../assets/pray.jpg';
import { api } from '../api';
import './PageLayout.css';

const PRAYER_OPTIONS = [
  { value: 'prayer-watches', label: 'Prayer Watches' },
  { value: 'night-prayers', label: 'Night Prayers' },
  { value: 'prayer-stretches', label: 'Prayer Stretches' },
];

function PrayerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredMinistry: '',
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
      await api.prayer(formData);
      setStatus({ type: 'success', message: 'Thank you for joining our Prayer Ministry! We will be in touch soon.' });
      setFormData({ name: '', email: '', phone: '', preferredMinistry: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="teg-page">
      <section className="teg-page-hero teg-page-hero--with-bg">
        <div className="teg-page-hero-bg">
          <img src={prayImg} alt="" />
          <div className="teg-page-hero-overlay"></div>
        </div>
        <div className="teg-page-hero-content">
          <h1>Prayer Ministry</h1>
          <p>Join prayer watches, night prayers, and prayer stretches for women globally</p>
        </div>
      </section>
      <section className="teg-page-content">
        <div className="teg-content-inner">
          <div className="teg-content-block">
            <h2>About Our Prayer Ministry</h2>
            <p>
              We organize prayer watches, night prayers, and prayer stretches for women globally. Join us to grow in faith and intercession.
            </p>
          </div>
          <div className="teg-content-block">
            <h2>Prayer Watches</h2>
            <p><strong>Day watches:</strong> 6 am, 9 am, 12 pm, and 3 pm</p>
            <p><strong>Night watches:</strong> 6 pm, 9 pm, 12 am, and 3 am</p>
          </div>
          <div className="teg-content-block">
            <h2>Night Prayers</h2>
            <p>11 pm to 1 am (Mondays, Wednesdays and Fridays)</p>
          </div>
          <div className="teg-content-block">
            <h2>Prayer Stretches</h2>
            <ul>
              <li><strong>Monthly Fast:</strong> Every first 3 days of the month — we meet every night during the 3-day fast.</li>
              <li><strong>The Bride Fast:</strong> 25 days. Held 2 or 3 times yearly.</li>
              <li><strong>Hannah Cell:</strong> 40 to 70 days of daily prayer for our children.</li>
              <li><strong>Returning to Our First Love:</strong> 10 days prayer stretch on intimacy with God.</li>
              <li><strong>40 Days of Priesthood:</strong> 40 days of spiritual warfare prayers to address delays, witchcraft, spiritual attacks, patterns in families and individuals, etc.</li>
            </ul>
          </div>
          <div className="teg-content-block teg-form-block">
            <h2>Join the Prayer Ministry</h2>
            <form onSubmit={handleSubmit} className="teg-form">
              <div className="teg-form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="teg-form-group">
                <label htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="teg-form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="teg-form-group">
                <label htmlFor="preferredMinistry">Preferred Prayer Ministry *</label>
                <select id="preferredMinistry" name="preferredMinistry" required value={formData.preferredMinistry} onChange={handleChange}>
                  <option value="">Select an option</option>
                  {PRAYER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {status.message && (
                <p className={status.type === 'error' ? 'teg-form-error' : 'teg-form-success'}>{status.message}</p>
              )}
              <button type="submit" className="teg-btn teg-btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PrayerPage;
