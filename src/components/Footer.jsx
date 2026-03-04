import { Link } from 'react-router-dom';
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
} from 'react-icons/io5';
import estherLogo from '../assets/esther_logo.png';
import './Footer.css';

function Footer() {
  return (
    <footer className="teg-footer">
      <div className="teg-footer-container">
        <div className="teg-footer-grid">
          <div className="teg-footer-brand">
            <Link to="/" className="teg-footer-logo">
              <img src={estherLogo} alt="TEG Women's Ministry" />
            </Link>
            <p className="teg-footer-tagline">
              The 7000 Esther Generation (TEG) Women's Ministry
            </p>
          </div>
          <div className="teg-footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About TEG</Link></li>
              <li><Link to="/prayer">Prayer Ministry</Link></li>
              <li><Link to="/welfare">Welfare & Support</Link></li>
              <li><Link to="/charity-shop">Charity Shop</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/testimonies">Testimonies</Link></li>
              <li><Link to="/get-involved">Join Prayer Ministry</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/emergency" className="footer-emergency">Emergency Help</Link></li>
            </ul>
          </div>
          <div className="teg-footer-contact">
            <h4>Contact Us</h4>
            <a href="mailto:info@tegministry.org" className="contact-item">
              <IoMailOutline /> info@tegministry.org
            </a>
            <a href="tel:+2348063530222" className="contact-item">
              <IoCallOutline /> +234 806 353 0222
            </a>
            <a href="https://wa.me/2348068876926" target="_blank" rel="noopener noreferrer" className="contact-item">
              <IoCallOutline /> WhatsApp ONLY: +234 806 887 6926
            </a>
            <div className="contact-item">
              <IoLocationOutline /> Nigeria
            </div>
            <div className="teg-footer-social">
              <a href="https://www.facebook.com/share/1DaPGBVGaZ/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"> <IoLogoFacebook /></a>
              <a href="https://www.instagram.com/teg.7000" target="_blank" rel="noopener noreferrer" aria-label="Instagram"> <IoLogoInstagram /></a>
            </div>
          </div>
        </div>
        <div className="teg-footer-bottom">
          <p>&copy; {new Date().getFullYear()} The 7000 Esther Generation (TEG) Women's Ministry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
