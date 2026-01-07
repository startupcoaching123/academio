import React, { createContext, useEffect, useState, useContext } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScrollContext = createContext(null);

export const useSmoothScroll = () => {
    return useContext(SmoothScrollContext);
};

// Keeping the file name compatible but changing export
const LocomotiveScrollWrapper = ({ children, header }) => {
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: true, // Lenis supports touch scrolling naturally
        });

        setLenis(lenisInstance);

        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={{ scroll: lenis }}>
            {header}
            {children}
        </SmoothScrollContext.Provider>
    );
};

// Aliasing for compatibility if needed, but we will update imports.
export default LocomotiveScrollWrapper;
