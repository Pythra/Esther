import { useState } from 'react';
import charityImg from '../assets/charity.jpg';
import { api } from '../api';
import './PageLayout.css';

function CharityShopPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    items: '',
    pickupLocation: '',
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
      await api.charity(formData);
      setStatus({ type: 'success', message: 'Thank you for your donation! We will contact you to arrange pickup.' });
      setFormData({ name: '', email: '', phone: '', items: '', pickupLocation: '', message: '' });
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
          <img src={charityImg} alt="" />
          <div className="teg-page-hero-overlay"></div>
        </div>
        <div className="teg-page-hero-content">
          <h1>Charity Shop</h1>
          <p>The 7000 Charity Shop (Nigeria)</p>
        </div>
      </section>
      <section className="teg-page-content">
        <div className="teg-content-inner">
          <div className="teg-content-block">
            <h2>About The 7000 Charity Shop</h2>
            <p>
              We buy and sell neat clothes and other items. Items collected will be sold to raise funds to aid our widows in need.
            </p>
          </div>
          <div className="teg-content-block">
            <h2>What We Accept</h2>
            <ul>
              <li>Gently used clothing (women & children)</li>
              <li>Household items (pots, pans, utensils)</li>
              <li>Baby items (clothes, diapers, formula)</li>
              <li>Non-perishable food items</li>
              <li>Personal care products</li>
            </ul>
          </div>
          <div className="teg-content-block teg-form-block">
            <h2>Donation Form</h2>
            <p className="teg-form-intro">
              Have items to donate? Fill out the form below and we will coordinate pickup or drop-off with you.
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
                <label htmlFor="items">Items You Wish to Donate *</label>
                <textarea id="items" name="items" rows="4" required placeholder="e.g., 5 women's dresses, 3 children's outfits, 2 pots..." value={formData.items} onChange={handleChange}></textarea>
              </div>
              <div className="teg-form-group">
                <label htmlFor="pickupLocation">Pickup Location / City</label>
                <input type="text" id="pickupLocation" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} />
              </div>
              <div className="teg-form-group">
                <label htmlFor="message">Additional Notes</label>
                <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleChange}></textarea>
              </div>
              {status.message && (
                <p className={status.type === 'error' ? 'teg-form-error' : 'teg-form-success'}>{status.message}</p>
              )}
              <button type="submit" className="teg-btn teg-btn-primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Donation'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CharityShopPage;
