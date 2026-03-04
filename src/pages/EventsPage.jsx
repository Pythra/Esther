import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import estherLogo from '../assets/esther_logo.png';
import './EventsPage.css';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .events()
      .then((res) => setEvents(res.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const year = events.length > 0 && events[0].year ? events[0].year : new Date().getFullYear();

  return (
    <div className="teg-page teg-events-page">
      <section className="teg-events-hero">
        <img src={estherLogo} alt="TEG" className="teg-events-logo" />
        <h1>EVENTS SCHEDULE</h1>
        <p className="teg-events-year">{year}</p>
      </section>

      <section className="teg-events-pinned">
        <div className="teg-events-pin" aria-hidden />
        <div className="teg-events-card">
          {loading && <p className="teg-events-loading">Loading schedule…</p>}
          {error && <p className="teg-events-error">{error}</p>}
          {!loading && !error && events.length === 0 && (
            <p className="teg-events-empty">No events scheduled yet. Check back soon.</p>
          )}
          {!loading && !error && events.length > 0 && (
            <ul className="teg-events-list">
              {events.map((ev) => (
                <li key={ev._id} className="teg-events-item">
                  <span className="teg-events-month">{ev.month}</span>
                  <span className="teg-events-line" />
                  <span className="teg-events-title">{ev.title}</span>
                </li>
              ))}
            </ul>
          )}
          {!loading && events.length > 0 && (
            <p className="teg-events-note">
              These are tentative dates for our programs; they may change as the Holy Spirit leads us.
            </p>
          )}
        </div>
        <p className="teg-events-footer">
          The <strong>start dates for these events</strong> will be announced each month.
        </p>
      </section>

      <section className="teg-events-cta">
        <Link to="/prayer" className="teg-btn teg-btn-primary">Join Prayer Ministry</Link>
      </section>
    </div>
  );
}

export default EventsPage;
