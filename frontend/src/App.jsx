import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Questions from './components/Questions';
import Curriculum from './components/Curriculum';
import Features from './components/Features';
import Footer from './components/Footer';
import Enroll from './components/Enroll';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import ModernIGCSE from './components/IGCSECourses';
import SubjectDetail from './components/SubjectDetail';
import EnrollmentForm from './components/EnrollmentForm';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import FeaturesSection from './components/FeatureSection';
import OurTeachers from './pages/OurTeachers/OurTeachers';

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => {
  return React.useContext(SmoothScrollContext);
};

const GlobalScrollProvider = ({ children }) => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
    });

    setLenis(lenisInstance);
    // Make lenis available globally for scroll-to-top functionality
    window.lenis = lenisInstance;

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scroll: lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <ScrollToTop />
    <WhatsAppButton />
  </>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <GlobalScrollProvider>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <div className="min-h-screen bg-linear-to-br from-indigo-50/50 via-white to-teal-50/50">
              <main>
                <Hero />
                <Features />
                <Testimonials />
                <FeaturesSection />
                <Questions />
                <Curriculum />
                <Enroll />
              </main>
            </div>
          </MainLayout>
        } />
        <Route path="/igcse-courses" element={<MainLayout><ModernIGCSE /></MainLayout>} />
        <Route path="/subject/:subject" element={<MainLayout><SubjectDetail /></MainLayout>} />
        <Route path="/enrollment-form" element={<MainLayout><EnrollmentForm /></MainLayout>} />
        <Route path="/our-teachers" element={<MainLayout><OurTeachers /></MainLayout>} />

        {/* Chatbot Route - With Navbar, No Footer */}
        <Route path="/chatbot" element={
          <GlobalScrollProvider>
            <Navbar />
            <Chatbot />
          </GlobalScrollProvider>
        } />
      </Routes>
    </GlobalScrollProvider>
  );
}

export default App;
