import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import estherLogo from '../assets/esther_logo.png';
import './AdminPage.css';

const ADMIN_KEY_STORAGE = 'teg_admin_key';

const MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const TABS = [
  { id: 'contacts', label: 'Contact messages', fetch: (k) => api.admin.contacts(k) },
  { id: 'prayer', label: 'Prayer signups', fetch: (k) => api.admin.prayer(k) },
  { id: 'charity', label: 'Charity donations', fetch: (k) => api.admin.charity(k) },
  { id: 'welfare', label: 'Welfare applications', fetch: (k) => api.admin.welfare(k) },
  { id: 'emergency', label: 'Emergency requests', fetch: (k) => api.admin.emergency(k) },
  { id: 'events', label: 'Events schedule', fetch: (k) => api.admin.events(k) },
];

function formatDate(s) {
  if (!s) return '—';
  const d = new Date(s);
  try {
    return d.toLocaleDateString(undefined, { dateStyle: 'short' }) + ' ' + d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  } catch {
    return d.toLocaleString();
  }
}

function AdminPage() {
  const [adminKey, setAdminKeyState] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORAGE) || '');
  const [keyInput, setKeyInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState('');
  const [eventForm, setEventForm] = useState({ month: '', title: '', year: new Date().getFullYear() });
  const [eventSaving, setEventSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ month: '', title: '' });

  const setAdminKey = (key) => {
    if (key) sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
    else sessionStorage.removeItem(ADMIN_KEY_STORAGE);
    setAdminKeyState(key);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const key = keyInput.trim();
    if (!key) return;
    setLoginError('');
    setLoading(true);
    try {
      const res = await api.admin.summary(key);
      if (res.success) {
        setAdminKey(key);
        setSummary(res.data);
      }
    } catch (err) {
      setLoginError(err.message || 'Invalid key');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminKey('');
    setKeyInput('');
    setSummary(null);
    setList([]);
  };

  const loadEvents = () => {
    if (!adminKey || activeTab !== 'events') return;
    setListLoading(true);
    setListError('');
    api.admin
      .events(adminKey)
      .then((res) => setList(res.data || []))
      .catch((err) => setListError(err.message))
      .finally(() => setListLoading(false));
  };

  useEffect(() => {
    if (!adminKey) return;
    if (activeTab === 'events') {
      loadEvents();
      return;
    }
    setListLoading(true);
    setListError('');
    const tab = TABS.find((t) => t.id === activeTab);
    tab
      .fetch(adminKey)
      .then((res) => setList(res.data || []))
      .catch((err) => setListError(err.message))
      .finally(() => setListLoading(false));
  }, [adminKey, activeTab]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!eventForm.month || !eventForm.title.trim()) {
      setListError('Please select a month and enter an event title.');
      return;
    }
    setEventSaving(true);
    setListError('');
    try {
      await api.admin.eventsCreate(adminKey, { month: eventForm.month, title: eventForm.title.trim(), year: eventForm.year });
      setEventForm({ month: '', title: '', year: new Date().getFullYear() });
      const res = await api.admin.events(adminKey);
      setList(res.data || []);
    } catch (err) {
      setListError(err.message || 'Failed to add event');
    } finally {
      setEventSaving(false);
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editingId || !editForm.month || !editForm.title.trim()) return;
    setEventSaving(true);
    try {
      await api.admin.eventsUpdate(adminKey, editingId, { month: editForm.month, title: editForm.title.trim() });
      setEditingId(null);
      loadEvents();
    } catch (err) {
      setListError(err.message);
    } finally {
      setEventSaving(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      await api.admin.eventsDelete(adminKey, id);
      loadEvents();
    } catch (err) {
      setListError(err.message);
    }
  };

  const handleMoveEvent = async (index, direction) => {
    const newList = [...list];
    const swap = direction === 'up' ? index - 1 : index + 1;
    if (swap < 0 || swap >= newList.length) return;
    [newList[index], newList[swap]] = [newList[swap], newList[index]];
    const ids = newList.map((e) => e._id);
    try {
      await api.admin.eventsReorder(adminKey, ids);
      setList(newList);
    } catch (err) {
      setListError(err.message);
    }
  };

  useEffect(() => {
    if (!adminKey) return;
    api.admin
      .summary(adminKey)
      .then((res) => res.success && setSummary(res.data))
      .catch(() => {});
  }, [adminKey]);

  if (!adminKey) {
    return (
      <div className="teg-admin">
        <div className="teg-admin-login">
          <div className="teg-admin-login-card">
            <img src={estherLogo} alt="TEG" className="teg-admin-logo" />
            <h1>TEG Admin</h1>
            <p>Enter your admin key to continue.</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Admin key"
                autoFocus
                autoComplete="off"
              />
              {loginError && <p className="teg-admin-error">{loginError}</p>}
              <button type="submit" className="teg-btn teg-btn-primary" disabled={loading}>
                {loading ? 'Checking…' : 'Sign in'}
              </button>
            </form>
            <Link to="/" className="teg-admin-back">Back to site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teg-admin">
      <header className="teg-admin-header">
        <div className="teg-admin-header-inner">
          <img src={estherLogo} alt="TEG" className="teg-admin-header-logo" />
          <h1>TEG Admin</h1>
          <div className="teg-admin-header-actions">
            <Link to="/" className="teg-admin-link">Site</Link>
            <button type="button" onClick={handleLogout} className="teg-admin-logout">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="teg-admin-body">
        <section className="teg-admin-summary">
          {summary && (
            <div className="teg-admin-cards">
              <div className="teg-admin-card">
                <span className="teg-admin-card-value">{summary.contacts ?? 0}</span>
                <span className="teg-admin-card-label">Contacts</span>
              </div>
              <div className="teg-admin-card">
                <span className="teg-admin-card-value">{summary.prayer ?? 0}</span>
                <span className="teg-admin-card-label">Prayer</span>
              </div>
              <div className="teg-admin-card">
                <span className="teg-admin-card-value">{summary.charity ?? 0}</span>
                <span className="teg-admin-card-label">Charity</span>
              </div>
              <div className="teg-admin-card">
                <span className="teg-admin-card-value">{summary.welfare ?? 0}</span>
                <span className="teg-admin-card-label">Welfare</span>
              </div>
              <div className="teg-admin-card">
                <span className="teg-admin-card-value">{summary.emergency ?? 0}</span>
                <span className="teg-admin-card-label">Emergency</span>
              </div>
            </div>
          )}
        </section>

        <section className="teg-admin-content">
          <div className="teg-admin-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={'teg-admin-tab' + (activeTab === tab.id ? ' active' : '')}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="teg-admin-list-wrap">
            {listError && <p className="teg-admin-error">{listError}</p>}
            {activeTab === 'events' && (
              <div className="teg-admin-events-actions">
                <form onSubmit={handleAddEvent} className="teg-admin-event-form">
                  <select
                    value={eventForm.month}
                    onChange={(e) => setEventForm({ ...eventForm, month: e.target.value })}
                    required
                    aria-label="Month"
                  >
                    <option value="">Select month</option>
                    {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <input type="text" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} placeholder="Event title" required />
                  <input type="number" value={eventForm.year} onChange={(e) => setEventForm({ ...eventForm, year: Number(e.target.value) || new Date().getFullYear() })} min="2020" max="2030" aria-label="Year" />
                  <button type="submit" className="teg-btn teg-btn-primary" disabled={eventSaving}>
                    {eventSaving ? 'Adding…' : 'Add'}
                  </button>
                </form>
                <p className="teg-admin-events-hint">Reorder with arrows. Events appear on the public Events page in this order.</p>
              </div>
            )}
            {activeTab !== 'events' && listLoading && <p className="teg-admin-loading">Loading…</p>}
            {activeTab === 'events' && listLoading && <p className="teg-admin-loading">Loading…</p>}
            {!listLoading && !listError && list.length === 0 && activeTab !== 'events' && (
              <p className="teg-admin-empty">No entries yet.</p>
            )}
            {activeTab === 'events' && !listLoading && !listError && list.length === 0 && (
              <p className="teg-admin-empty">No events yet. Add one above.</p>
            )}
            {!listLoading && !listError && list.length > 0 && activeTab !== 'events' && (
              <div className="teg-admin-list">
                {activeTab === 'contacts' && list.map((row) => (
                  <div key={row._id} className="teg-admin-item">
                    <div className="teg-admin-item-row">
                      <strong>{row.name}</strong>
                      <span>{formatDate(row.createdAt)}</span>
                    </div>
                    <div className="teg-admin-item-row"><em>{row.subject}</em></div>
                    <div className="teg-admin-item-meta">{row.email}</div>
                    <p className="teg-admin-item-message">{row.message}</p>
                  </div>
                ))}
                {activeTab === 'prayer' && list.map((row) => (
                  <div key={row._id} className="teg-admin-item">
                    <div className="teg-admin-item-row">
                      <strong>{row.name}</strong>
                      <span>{formatDate(row.createdAt)}</span>
                    </div>
                    <div className="teg-admin-item-meta">{row.email} {row.phone ? ` · ${row.phone}` : ''}</div>
                    <p className="teg-admin-item-badge">{row.preferredMinistry}</p>
                  </div>
                ))}
                {activeTab === 'charity' && list.map((row) => (
                  <div key={row._id} className="teg-admin-item">
                    <div className="teg-admin-item-row">
                      <strong>{row.name}</strong>
                      <span>{formatDate(row.createdAt)}</span>
                    </div>
                    <div className="teg-admin-item-meta">{row.email} · {row.phone}</div>
                    {row.pickupLocation && <p className="teg-admin-item-meta">Location: {row.pickupLocation}</p>}
                    <p className="teg-admin-item-message">{row.items}</p>
                    {row.message && <p className="teg-admin-item-note">{row.message}</p>}
                  </div>
                ))}
                {activeTab === 'welfare' && list.map((row) => (
                  <div key={row._id} className="teg-admin-item">
                    <div className="teg-admin-item-row">
                      <strong>{row.name}</strong>
                      <span>{formatDate(row.createdAt)}</span>
                    </div>
                    <div className="teg-admin-item-meta">{row.email} · {row.phone}</div>
                    <p className="teg-admin-item-badge">{row.category}</p>
                    <p className="teg-admin-item-message">{row.situation}</p>
                    {row.address && <p className="teg-admin-item-meta">Address: {row.address}</p>}
                    {row.additionalInfo && <p className="teg-admin-item-note">{row.additionalInfo}</p>}
                  </div>
                ))}
                {activeTab === 'emergency' && list.map((row) => (
                  <div key={row._id} className="teg-admin-item teg-admin-item--emergency">
                    <div className="teg-admin-item-row">
                      <strong>{row.name}</strong>
                      <span>{formatDate(row.createdAt)}</span>
                    </div>
                    <div className="teg-admin-item-meta">{row.phone}</div>
                    {row.location && <p className="teg-admin-item-meta">Location: {row.location}</p>}
                    <p className="teg-admin-item-message">{row.situation}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'events' && !listLoading && !listError && list.length > 0 && (
              <div className="teg-admin-events-list">
                {list.map((ev, index) => (
                  <div key={ev._id} className="teg-admin-event-row">
                    <div className="teg-admin-event-move">
                      <button type="button" onClick={() => handleMoveEvent(index, 'up')} disabled={index === 0} aria-label="Move up">↑</button>
                      <button type="button" onClick={() => handleMoveEvent(index, 'down')} disabled={index === list.length - 1} aria-label="Move down">↓</button>
                    </div>
                    {editingId === ev._id ? (
                      <form onSubmit={handleUpdateEvent} className="teg-admin-event-form teg-admin-event-form--inline">
                        <select value={editForm.month} onChange={(e) => setEditForm({ ...editForm, month: e.target.value })} required>
                          {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required />
                        <button type="submit" className="teg-btn teg-btn-primary" disabled={eventSaving}>Save</button>
                        <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                      </form>
                    ) : (
                      <>
                        <span className="teg-admin-event-month">{ev.month}</span>
                        <span className="teg-admin-event-title">{ev.title}</span>
                        <div className="teg-admin-event-actions">
                          <button type="button" onClick={() => { setEditingId(ev._id); setEditForm({ month: ev.month, title: ev.title }); }}>Edit</button>
                          <button type="button" onClick={() => handleDeleteEvent(ev._id)} className="teg-admin-event-delete">Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;
