const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || 'Request failed');
  return data;
}

function adminRequest(path, adminKey) {
  return request(path, {
    headers: { 'x-admin-key': adminKey },
  });
}

export const api = {
  contact: (body) => request('/api/contact', { method: 'POST', body: JSON.stringify(body) }),
  prayer: (body) => request('/api/prayer', { method: 'POST', body: JSON.stringify(body) }),
  charity: (body) => request('/api/charity', { method: 'POST', body: JSON.stringify(body) }),
  welfare: (body) => request('/api/welfare', { method: 'POST', body: JSON.stringify(body) }),
  emergency: (body) => request('/api/emergency', { method: 'POST', body: JSON.stringify(body) }),
  admin: {
    summary: (key) => adminRequest('/api/admin/summary', key),
    contacts: (key) => adminRequest('/api/admin/contacts', key),
    prayer: (key) => adminRequest('/api/admin/prayer', key),
    charity: (key) => adminRequest('/api/admin/charity', key),
    welfare: (key) => adminRequest('/api/admin/welfare', key),
    emergency: (key) => adminRequest('/api/admin/emergency', key),
    events: (key) => adminRequest('/api/admin/events', key),
    eventsCreate: (key, body) => request('/api/admin/events', { method: 'POST', body: JSON.stringify(body), headers: { 'x-admin-key': key } }),
    eventsUpdate: (key, id, body) => request(`/api/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'x-admin-key': key } }),
    eventsDelete: (key, id) => request(`/api/admin/events/${id}`, { method: 'DELETE', headers: { 'x-admin-key': key } }),
    eventsReorder: (key, ids) => request('/api/admin/events/reorder', { method: 'PUT', body: JSON.stringify({ ids }), headers: { 'x-admin-key': key } }),
  },
  events: () => request('/api/events'),
};
