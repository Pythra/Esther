import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './pages/AboutPage';
import PrayerPage from './pages/PrayerPage';
import WelfarePage from './pages/WelfarePage';
import CharityShopPage from './pages/CharityShopPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import ContactPage from './pages/ContactPage';
import EmergencyPage from './pages/EmergencyPage';
import TestimoniesPage from './pages/TestimoniesPage';
import AdminPage from './pages/AdminPage';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="teg-app">
      {!isAdmin && <Navbar />}
      <main className="teg-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/prayer" element={<PrayerPage />} />
          <Route path="/welfare" element={<WelfarePage />} />
          <Route path="/charity-shop" element={<CharityShopPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/testimonies" element={<TestimoniesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
