import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also try to scroll any scrollable containers
    const scrollableElements = document.querySelectorAll('[data-lenis-start]');
    scrollableElements.forEach(element => {
      element.scrollTop = 0;
    });
    
    // Force a second scroll after a small delay to ensure it works
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  return null;
};

export default ScrollToTopOnRouteChange;
