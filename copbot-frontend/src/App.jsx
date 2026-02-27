import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import LoginPage from './pages/LoginPage';
import Layout from './components/layout/Layout';
import HomeDashboard from './pages/HomeDashboard';
import ChatAssistant from './pages/ChatAssistant';
import EmergencyPage from './pages/EmergencyPage';
import FIRGuide from './pages/FIRGuide';
import LegalPage from './pages/LegalPage';
import PoliceLocator from './pages/PoliceLocator';
import Complaint from './pages/Complaint';
import About from './pages/About';
import ChatWindow from './components/chat-ui/ChatWindow';

/* ═══════ AUTHENTICATED SHELL ═══════ */
function AppShell({ onLogout }) {
  const location = useLocation();

  return (
    <Layout onLogout={onLogout}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 15, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.99 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col h-full"
        >
          <Routes location={location}>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/chat" element={<ChatAssistant />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/fir" element={<FIRGuide />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/locator" element={<PoliceLocator />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

/* ═══════ ROOT ROUTER ═══════ */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat-ui" element={<ChatWindow />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/app" replace /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/app/*"
          element={isAuthenticated ? <AppShell onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/app" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
