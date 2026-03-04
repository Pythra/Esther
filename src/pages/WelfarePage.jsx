import { useState } from 'react';
import { Link } from 'react-router-dom';
import welfareImg from '../assets/welfare.png';
import { api } from '../api';
import './PageLayout.css';

function WelfarePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    situation: '',
    address: '',
    additionalInfo: '',
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
      await api.welfare(formData);
      setStatus({ type: 'success', message: 'Thank you for your application. We will review it confidentially and reach out soon.' });
      setFormData({ name: '', email: '', phone: '', category: '', situation: '', address: '', additionalInfo: '' });
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
          <img src={welfareImg} alt="" />
          <div className="teg-page-hero-overlay"></div>
        </div>
        <div className="teg-page-hero-content">
          <h1>Welfare & Support</h1>
          <p>Confidential support for widows, single mothers, and women in need</p>
        </div>
      </section>
      <section className="teg-page-content">
        <div className="teg-content-inner">
          <div className="teg-content-block">
            <h2>Welfare Arm Overview</h2>
            <p>
              Our Welfare Arm provides support and resources for widows, single mothers, and women experiencing financial hardship. All applications are handled with strict confidentiality and dignity.
            </p>
          </div>
          <div className="teg-content-block teg-form-block">
            <h2>Application Form</h2>
            <p className="teg-form-intro">
              Please complete this form to apply for welfare support. All information is kept strictly confidential.
            </p>
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
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
              <div className="teg-form-group">
                <label htmlFor="category">Category *</label>
                <select id="category" name="category" required value={formData.category} onChange={handleChange}>
                  <option value="">Select an option</option>
                  <option value="widow">Widow</option>
                  <option value="single-mother">Single Mother</option>
                  <option value="financial-hardship">Financial Hardship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="teg-form-group">
                <label htmlFor="situation">Brief Description of Your Situation *</label>
                <textarea id="situation" name="situation" rows="4" required value={formData.situation} onChange={handleChange}></textarea>
              </div>
              <div className="teg-form-group">
                <label htmlFor="address">Location/Address</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="teg-form-group">
                <label htmlFor="additionalInfo">Additional Information (optional)</label>
                <textarea id="additionalInfo" name="additionalInfo" rows="3" value={formData.additionalInfo} onChange={handleChange}></textarea>
              </div>
              {status.message && (
                <p className={status.type === 'error' ? 'teg-form-error' : 'teg-form-success'}>{status.message}</p>
              )}
              <button type="submit" className="teg-btn teg-btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          </div>
          <div className="teg-content-block teg-alert">
            <strong>Need urgent help?</strong> If you are in immediate danger or need emergency support, please visit our{' '}
            <Link to="/emergency">Emergency Help</Link> page.
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelfarePage;
