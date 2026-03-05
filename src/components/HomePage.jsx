import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoHeartOutline, IoHandLeftOutline, IoPeopleOutline, IoCalendarOutline } from 'react-icons/io5';
import { api } from '../api';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import image6 from '../assets/image6.jpeg';
import image7 from '../assets/image7.jpeg';
import prayImg from '../assets/pray.jpg';
import charityImg from '../assets/charity.jpg';
import safehouseImg from '../assets/safehouse.jpg';
import welfareImg from '../assets/welfare.png';
import './HomePage.css';
import logobg from '../assets/logobg.png';
import landscapeHero from '../assets/landscape-hero.png';
const CAROUSEL_IMAGES = [image1, image2, image3, image4, image5, image6, image7];

const SERVICES = [
  {
    icon: IoHeartOutline,
    title: 'Organized Prayer Sessions',
    description: 'To organize prayer, worship and Bible study meetings.',
    path: '/prayer',
    cta: 'Join a Prayer Watch',
  },
  {
    icon: IoHandLeftOutline,
    title: 'Supporting Women',
    description: 'To organize outreaches aimed at providing financial and emotional support for women and children, especially widows and single moms.',
    path: '/welfare',
    cta: 'Request Help',
  },
  {
    icon: IoPeopleOutline,
    title: 'Evangelism',
    description: 'To organize discipleship trainings for women on motherhood, mental health, emotional intelligence, spiritual growth and personal development.',
    path: '/get-involved',
    cta: 'Get Involved',
  },
];

const LEADERSHIP = [
  { name: 'Eze Chinenye', role: 'Chairman, Board of Trustees' },
  { name: 'Vincent Okafor', role: 'Trustee' },
  { name: 'Evelyn Ebahi', role: 'Secretary & Administrator' },
  { name: 'Nwanne Adaugo Linda', role: 'Welfare Coordinator' },
  { name: 'Ebere Rose', role: 'Welfare Coordinator' },
];

const TESTIMONIES = [
  {
    text: "My time at TEG House was truly a blessing during one of the most difficult seasons of my life. When I left my husband's house, I was emotionally overwhelmed and unsure of what the future held. TEG House didn't just provide me with shelter — it gave me safety, peace, and spiritual support. The environment was warm, prayerful, and encouraging. I was surrounded by people who showed genuine love, understanding, and godly counsel. Through the prayers, fellowship, and guidance I received, I began to heal emotionally and grow stronger in my faith. TEG House became more than a place to stay; it became a place of restoration for me. I am deeply grateful for the care, kindness, and spiritual covering I experienced there. It was a season that helped me rebuild my confidence and reconnect with God in a deeper way. I will always appreciate the impact TEG House had on my life during that period.",
  },
];

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [testimonyIndex, setTestimonyIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (TESTIMONIES.length <= 1) return;
    const interval = setInterval(() => {
      setTestimonyIndex((prev) => (prev + 1) % TESTIMONIES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    api.events()
      .then((res) => setEvents(res.data || []))
      .catch((err) => setEventsError(err.message))
      .finally(() => setEventsLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('teg-animate-visible');
            entry.target.querySelectorAll('.teg-animate-el').forEach((child) => {
              child.classList.add('teg-animate-visible');
            });
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="teg-hero">
        <div className="teg-hero-bg">
          <img src={logobg} alt="" className="teg-hero-bg-img teg-hero-bg-mobile" />
          <img src={landscapeHero} alt="" className="teg-hero-bg-img teg-hero-bg-desktop" />
          <div className="teg-hero-overlay"></div>
        </div>
        <div className="teg-hero-content">
          <h1 className="teg-hero-title">The 7000 Esther Generation</h1>
          <p className="teg-hero-subtitle">(TEG) Women's Ministry</p>
          <p className="teg-hero-verse">&ldquo;Strength and honour are her clothing; and she shall rejoice in time to come.&rdquo;</p>
          <p className="teg-hero-verse-ref">— Proverbs 31:25 (KJV)</p>
          <div className="teg-hero-ctas">
            <Link to="/get-involved" className="teg-btn teg-btn-primary">Join Us</Link>
            <Link to="/emergency" className="teg-btn teg-btn-secondary">Get Help</Link>
          </div>
        </div>
      </section>

      <section className="teg-about-carousel-section teg-scroll-animate" data-animate>
        <div className="teg-section-inner">
          <h2 className="teg-section-title teg-about-carousel-title">About Us</h2>
          <p className="teg-about-intro teg-about-carousel-intro">
            TEG is a registered non-profit, non-political organisation in Lagos, Nigeria. We run outreaches, prayer and Bible study, and discipleship trainings—providing financial and emotional support for widows, single mothers, and women in need.
          </p>
          <div className="teg-carousel">
            <div className="teg-carousel-track" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
              {CAROUSEL_IMAGES.map((img, i) => (
                <div key={i} className="teg-carousel-slide">
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="teg-services-section teg-scroll-animate" data-animate>
        <div className="teg-section-inner">
          <h2 className="teg-section-title" style={{ marginTop: 0, marginBottom: '1.5rem' }}>Our Mission</h2>
          
          <div className="teg-services-grid">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="teg-service-card teg-animate-el" data-delay={i}>
                  <div className="teg-service-icon">
                    <Icon />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to={service.path} className="teg-card-link">{service.cta}</Link>
                </div>
              );
            })}
          </div>
          <Link to="/about" className="teg-btn teg-btn-primary teg-about-cta">Learn more</Link>
        </div>
      </section>

      <section className="teg-about-preview teg-scroll-animate" data-animate>
        <div className="teg-section-inner teg-preview-split">
          <h2 className="teg-preview-title teg-animate-el">Prayer Ministry</h2>
          <div className="teg-about-image teg-animate-el" data-delay="0">
            <img src={prayImg} alt="Prayer gathering" />
          </div>
          <div className="teg-about-text teg-animate-el" data-delay="1">
            <p>
              We organize prayer watches, night prayers, and prayer stretches for women globally.
              Join us to grow in faith and intercession.
            </p>
            <Link to="/prayer" className="teg-btn teg-btn-primary">Join a Prayer Watch</Link>
          </div>
        </div>
      </section>

      <section className="teg-welfare-preview teg-scroll-animate" data-animate>
        <div className="teg-section-inner teg-preview-split teg-preview-split--reverse">
          <h2 className="teg-preview-title teg-animate-el">Welfare & Support</h2>
          <div className="teg-about-image teg-animate-el" data-delay="0">
            <img src={welfareImg} alt="Community support" />
          </div>
          <div className="teg-about-text teg-animate-el" data-delay="1">
            <p>
              We provide support and resources for widows, single mothers, and women in need.
              Apply for assistance through our confidential application process.
            </p>
            <Link to="/welfare" className="teg-btn teg-btn-secondary">Request Help</Link>
          </div>
        </div>
      </section>

      <section className="teg-charity-section teg-scroll-animate" data-animate>
        <div className="teg-section-inner teg-preview-split">
          <h2 className="teg-preview-title teg-animate-el">Charity Shop</h2>
          <div className="teg-about-image teg-animate-el" data-delay="0">
            <img src={charityImg} alt="Charity shop donations" />
          </div>
          <div className="teg-about-text teg-animate-el" data-delay="1">
            <p>
              We buy and sell neat clothes and other items. Items collected are sold to raise funds to aid our widows in need.
            </p>
            <Link to="/charity-shop" className="teg-btn teg-btn-primary">Donate Items</Link>
          </div>
        </div>
      </section>

      <section className="teg-safehouse-section teg-scroll-animate" data-animate>
        <div className="teg-safehouse-bg">
          <img src={safehouseImg} alt="" />
          <div className="teg-safehouse-overlay"></div>
        </div>
        <div className="teg-section-inner teg-safehouse-content">
          <h2 className="teg-section-title">Safehouse / Emergency Help</h2>
          <p>If you are escaping abuse or in crisis, we are here for you. All information is kept strictly confidential.</p>
          <div className="teg-safehouse-donation">
            <h3>Support our Safe Houses</h3>
            <p>Please send your donations and contributions to:</p>
            <p><strong>The 7000 Esther Generation (TEG) Women's Ministry</strong></p>
            <p>8068876926</p>
            <p>Moniepoint MFB</p>
          </div>
          <Link to="/emergency" className="teg-btn teg-btn-secondary">Get Emergency Help</Link>
        </div>
      </section>

      <section className="teg-testimonies-section teg-scroll-animate" data-animate>
        <div className="teg-section-inner">
          <h2 className="teg-section-title teg-testimonies-title">Testimonies</h2>
          <div className="teg-testimonies-slider">
            {TESTIMONIES.map((t, i) => (
              <div
                key={i}
                className={'teg-testimony-slide' + (i === testimonyIndex ? ' active' : '')}
                aria-hidden={i !== testimonyIndex}
              >
                <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
              </div>
            ))}
          </div>
          {TESTIMONIES.length > 0 && (
            <div className="teg-testimonies-dots">
              {TESTIMONIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === testimonyIndex ? 'active' : ''}
                  onClick={() => setTestimonyIndex(i)}
                  aria-label={'View testimony ' + (i + 1)}
                />
              ))}
            </div>
          )}
          <Link to="/testimonies" className="teg-btn teg-btn-outline teg-testimonies-cta">More Testimonies</Link>
        </div>
      </section>

      <section className="teg-events-section teg-scroll-animate" data-animate>
        <div className="teg-section-inner">
          <h2 className="teg-section-title">Current Events</h2>
          {eventsLoading && (
            <div className="teg-events-placeholder">
              <p>Loading events…</p>
            </div>
          )}
          {!eventsLoading && eventsError && (
            <div className="teg-events-placeholder">
              <p>{eventsError}</p>
              <Link to="/events" className="teg-btn teg-btn-outline">View Events</Link>
            </div>
          )}
          {!eventsLoading && !eventsError && events.length > 0 && (
            <div className="teg-events-schedule">
              <ul className="teg-events-schedule-list">
                {events.map((ev) => (
                  <li key={ev._id} className="teg-events-schedule-item">
                    <span className="teg-events-schedule-month">{ev.month}</span>
                    <span className="teg-events-schedule-line" />
                    <span className="teg-events-schedule-title">{ev.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!eventsLoading && !eventsError && events.length === 0 && (
            <div className="teg-events-placeholder">
              <IoCalendarOutline className="teg-events-icon" />
              <p>Upcoming events will be shown here. Check back soon for prayer watches, programs, and special events.</p>
              <Link to="/events" className="teg-btn teg-btn-outline">View Events</Link>
            </div>
          )}
        </div>
      </section>

      <section className="teg-leadership-section teg-scroll-animate" data-animate>
        <div className="teg-section-inner">
          <h2 className="teg-section-title">Our Leadership</h2>
          <div className="teg-leadership-grid">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="teg-leader-card">
                <div className="teg-leader-avatar">
                  <span>{leader.name.charAt(0)}</span>
                </div>
                <h4>{leader.name}</h4>
                <p>{leader.role}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="teg-btn teg-btn-outline teg-leadership-cta">Learn More About TEG</Link>
        </div>
      </section>

      <section className="teg-cta-section teg-scroll-animate" data-animate>
        <div className="teg-cta-bg">
          <img src={charityImg} alt="" />
          <div className="teg-cta-overlay"></div>
        </div>
        <div className="teg-section-inner teg-cta-inner">
          <h2>Ready to Get Involved?</h2>
          <p>Join our Prayer Ministry, or partner with us through donations.</p>
          <div className="teg-hero-ctas">
            <Link to="/get-involved" className="teg-btn teg-btn-primary">Join our Prayer Ministry</Link>
            <Link to="/contact" className="teg-btn teg-btn-primary">Donate</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
