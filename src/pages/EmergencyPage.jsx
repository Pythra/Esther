import { useState } from 'react';
import safehouseImg from '../assets/safehouse.jpg';
import { api } from '../api';
import './PageLayout.css';

function EmergencyPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    situation: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: '' });
    try {
      await api.emergency(formData);
      setStatus({ type: 'success', message: 'Your information has been received. A team member will reach out as soon as possible. You are not alone.' });
      setFormData({ name: '', phone: '', situation: '', location: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="teg-page teg-emergency-page">
      <section className="teg-page-hero teg-page-hero--with-bg">
        <div className="teg-page-hero-bg">
          <img src={safehouseImg} alt="" />
          <div className="teg-page-hero-overlay"></div>
        </div>
        <div className="teg-page-hero-content">
          <h1>Emergency Help</h1>
          <p>You are not alone. We are here for you.</p>
        </div>
      </section>
      <section className="teg-page-content">
        <div className="teg-content-inner">
           
          <div className="teg-content-block teg-form-block teg-emergency-form">
            <h2>Emergency Form</h2>
            <form onSubmit={handleSubmit} className="teg-form">
              <div className="teg-form-group">
                <label htmlFor="name">Name (or alias) *</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="You may use an alias for safety" />
              </div>
              <div className="teg-form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="A number where we can safely reach you" />
              </div> 
              <div className="teg-form-group">
                <label htmlFor="situation">Describe of your situation *</label>
                <textarea id="situation" name="situation" rows="4" required value={formData.situation} onChange={handleChange}></textarea>
              </div>
              <div className="teg-form-group">
                <label htmlFor="location">General location (city/area)</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
              </div>
               
              {status.message && (
                <p className={status.type === 'error' ? 'teg-form-error' : 'teg-form-success'}>{status.message}</p>
              )}
              <button type="submit" className="teg-btn teg-btn-primary teg-btn-wide" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmergencyPage;
