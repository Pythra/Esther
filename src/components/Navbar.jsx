import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import estherLogo from '../assets/esther_logo.png';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsTransparent(false);
      return;
    }
    const checkScroll = () => {
      const heroHeight = window.innerHeight * 0.95;
      setIsTransparent(window.scrollY < heroHeight);
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About TEG' },
    { path: '/prayer', label: 'Prayer Ministry' },
    { path: '/welfare', label: 'Welfare & Support' },
    { path: '/charity-shop', label: 'Charity Shop' },
    { path: '/events', label: 'Events' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/testimonies', label: 'Testimonies' },
    { path: '/get-involved', label: 'Join Prayer Ministry' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`teg-navbar ${isTransparent ? 'teg-navbar--transparent' : ''}`}>
      <div className="teg-navbar-container">
        <Link to="/" className="teg-navbar-logo" onClick={() => setIsMenuOpen(false)}>
          <img src={estherLogo} alt="The 7000 Esther Generation" className="teg-logo-img" />
          <span className="teg-logo-text">TEG</span>
        </Link>
        <ul className={`teg-navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="teg-navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
