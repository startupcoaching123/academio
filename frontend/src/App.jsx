import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import AboutSection from './components/AboutSection';
import Questions from './components/Questions';
import Curriculum from './components/Curriculum';
import Features from './components/Features';
import Footer from './components/Footer';
import Enroll from './components/Enroll';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import ModernIGCSE from './pages/igcse/IGCSECourses';
import SubjectDetail from './components/SubjectDetail';
import EnrollmentForm from './components/EnrollmentForm';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbot';
import FeaturesSection from './components/FeatureSection';
import SingleBlogPage from './pages/Blogs/SingleBlogPage';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminPanel';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';

// Lazy load pages
const OurTeachers = React.lazy(() => import('./pages/OurTeachers/OurTeachers'));
const BlogPage = React.lazy(() => import('./pages/Blogs/Blogs'));
const Ib = React.lazy(() => import('./pages/ib/Ib'));

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
    const scrollToTop = () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true, duration: 0 });
      } else {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    // Immediate scroll
    scrollToTop();
    
    // Fallback scroll after a short delay to ensure it works
    const fallbackTimeout = setTimeout(() => {
      if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
        scrollToTop();
      }
    }, 100);

    return () => clearTimeout(fallbackTimeout);
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
                <AboutSection />
                <FeaturesSection />
                <Questions />
                <Curriculum />
                <Enroll />
              </main>
            </div>
          </MainLayout>
        } />
        <Route path="/igcse-courses" element={<MainLayout><ModernIGCSE /></MainLayout>} />
        <Route path="/blog" element={<MainLayout><React.Suspense fallback={<div>Loading...</div>}><BlogPage /></React.Suspense></MainLayout>} />
        <Route path="/ib-courses" element={<MainLayout><React.Suspense fallback={<div>Loading...</div>}><Ib /></React.Suspense></MainLayout>} />
        <Route path="/subject/:subject" element={<MainLayout><SubjectDetail /></MainLayout>} />
        <Route path="/enrollment-form" element={<MainLayout><EnrollmentForm /></MainLayout>} />
        <Route path="/contact-us" element={<MainLayout><ContactUs /></MainLayout>} />
        <Route path="/about-us" element={<MainLayout><AboutUs /></MainLayout>} />
        <Route path="/our-teachers" element={<MainLayout><React.Suspense fallback={<div>Loading...</div>}><OurTeachers /></React.Suspense></MainLayout>} />
<Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<SingleBlogPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminPanel />} />
            <Route path="blogs" element={<AdminPanel />} />
            <Route path="users" element={<AdminPanel />} />
            <Route path="settings" element={<AdminPanel />} />
          </Route>
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
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default App;
