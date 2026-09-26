import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContactBar } from './components/FloatingContactBar';
import { BookingModal } from './components/BookingModal';
import { PageTransition } from './components/PageTransition';

import { Home } from './pages/Home';
import { Fleet } from './pages/Fleet';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';

// Admin CRM Imports
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminProtectedRoute } from './admin/AdminProtectedRoute';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminVehicles } from './admin/pages/AdminVehicles';
import { AdminServices } from './admin/pages/AdminServices';
import { AdminTours } from './admin/pages/AdminTours';
import { AdminInquiries } from './admin/pages/AdminInquiries';
import { AdminContent } from './admin/pages/AdminContent';
import { AdminSettings } from './admin/pages/AdminSettings';
import { useAuth } from './hooks/useAuth';

function AdminRootRedirect() {
  const { authed, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF5E6]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#583714]" />
      </div>
    );
  }

  return <Navigate to={authed ? '/admin/dashboard' : '/admin/login'} replace />;
}

function PublicAppLayout({ onOpenBookingModal }: { onOpenBookingModal: (vehicleName?: string) => void }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#FAF5E6] text-[#3A230B] font-sans selection:bg-[#FFE897] selection:text-[#583714] flex flex-col justify-between">
      <Navbar onOpenBookingModal={onOpenBookingModal} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home onOpenBookingModal={onOpenBookingModal} /></PageTransition>} />
            <Route path="/fleet" element={<PageTransition><Fleet onOpenBookingModal={onOpenBookingModal} /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><GalleryPage onOpenBookingModal={onOpenBookingModal} /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/booking" element={<PageTransition><BookingPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingContactBar onOpenBookingModal={() => onOpenBookingModal()} />
    </div>
  );
}

export function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalVehicleName, setModalVehicleName] = useState<string | undefined>(undefined);

  const handleOpenBookingModal = (vehicleName?: string) => {
    setModalVehicleName(vehicleName);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setModalVehicleName(undefined);
  };

  return (
    <Router>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Root Redirect */}
        <Route path="/admin" element={<AdminRootRedirect />} />

        {/* Protected Admin CRM Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="vehicles" element={<AdminVehicles />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="tours" element={<AdminTours />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Public Website Routes */}
        <Route
          path="*"
          element={<PublicAppLayout onOpenBookingModal={handleOpenBookingModal} />}
        />
      </Routes>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        initialVehicleName={modalVehicleName}
      />
    </Router>
  );
}

export default App;
