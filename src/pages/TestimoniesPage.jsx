import { useState, useEffect } from 'react';
import './PageLayout.css';
import './TestimoniesPage.css';

const TESTIMONIES = [
  {
    id: 1,
    title: 'TEG House Safe House',
    text: "My time at TEG House was truly a blessing during one of the most difficult seasons of my life. When I left my husband's house, I was emotionally overwhelmed and unsure of what the future held. TEG House didn't just provide me with shelter — it gave me safety, peace, and spiritual support. The environment was warm, prayerful, and encouraging. I was surrounded by people who showed genuine love, understanding, and godly counsel. Through the prayers, fellowship, and guidance I received, I began to heal emotionally and grow stronger in my faith. TEG House became more than a place to stay; it became a place of restoration for me. I am deeply grateful for the care, kindness, and spiritual covering I experienced there. It was a season that helped me rebuild my confidence and reconnect with God in a deeper way. I will always appreciate the impact TEG House had on my life during that period.",
  },
  // Add more testimonies here as they become available
];

function TestimoniesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (TESTIMONIES.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="teg-page">
      <section className="teg-page-hero">
        <h1>Testimonies</h1>
        <p>Stories of hope and restoration from the TEG community</p>
      </section>
      <section className="teg-page-content teg-testimonies-content">
        <div className="teg-content-inner">
          <div className="teg-testimonies-scroll">
            {TESTIMONIES.map((t, i) => (
              <div
                key={t.id}
                className={`teg-testimony-card ${i === activeIndex ? 'active' : ''}`}
                style={{ '--index': i }}
              >
                {t.title && <h3>{t.title}</h3>}
                <blockquote>{t.text}</blockquote>
              </div>
            ))}
          </div>
          {TESTIMONIES.length > 1 && (
            <div className="teg-testimonies-dots">
              {TESTIMONIES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === activeIndex ? 'active' : ''}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View testimony ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default TestimoniesPage;
