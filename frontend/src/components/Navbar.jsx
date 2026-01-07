import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import { useSmoothScroll } from '../App';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { scroll } = useSmoothScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!scroll) return;

        const onScroll = (e) => {
            setIsScrolled(e.scroll > 50);
        };

        scroll.on('scroll', onScroll);

        return () => {
            scroll.off('scroll', onScroll);
        }
    }, [scroll]);

    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element && scroll) {
            scroll.scrollTo(element);
        } else if (element) {
            // Fallback if scroll not ready or on native?
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
        setIsDropdownOpen(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
        setIsDropdownOpen(false);
        window.scrollTo(0, 0);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'top-1.5' : 'top-3'}`}>
            <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg shadow-teal-900/5 rounded-full mx-4 lg:mx-auto mt-2 border border-white/50' : 'bg-transparent'}`}>
                <div className="flex items-center justify-between h-17">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNavigation('/')}>
                        <img src={logo} alt="Academio Logo" className="h-15 w-auto group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <Link
                                to="/"
                                className="relative text-slate-600 hover:text-[rgb(12,81,79)] px-4 py-2 text-base font-semibold transition-all duration-300 group"
                            >
                                <span className="relative z-10">Home</span>
                                <span className="absolute inset-0 bg-[rgb(12,81,79)]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[rgb(12,81,79)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                            </Link>
                            
                            <button
                                onClick={() => handleNavigation('/igcse-courses')}
                                className="relative text-slate-600 hover:text-[rgb(12,81,79)] px-4 py-2 text-base font-semibold transition-all duration-300 group bg-transparent border-none cursor-pointer"
                            >
                                <span className="relative z-10">Cambridge</span>
                                <span className="absolute inset-0 bg-[rgb(12,81,79)]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[rgb(12,81,79)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                            </button>

                            {[
                                { name: 'IB', path: '/ib-courses' },
                                { name: 'Our Teachers', path: '/our-teachers' }
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item.path)}
                                    className="relative text-slate-600 hover:text-[rgb(12,81,79)] px-4 py-2 text-base font-semibold transition-all duration-300 group bg-transparent border-none cursor-pointer"
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    <span className="absolute inset-0 bg-[rgb(12,81,79)]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[rgb(12,81,79)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                                </button>
                            ))}

                            {/* Resources Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="relative text-slate-600 hover:text-[rgb(12,81,79)] px-4 py-2 text-base font-semibold transition-all duration-300 group flex items-center gap-1"
                                >
                                    <span className="relative z-10">Resources</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    <span className="absolute inset-0 bg-[rgb(12,81,79)]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[rgb(12,81,79)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                                </button>

                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-full shadow-xl border border-[rgb(12,81,79)]/10 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => handleNavigation('/blog')}
                                            className="block px-4 py-3 text-slate-600 hover:text-[rgb(12,81,79)] hover:bg-[rgb(12,81,79)]/5 text-base font-semibold transition-all duration-300"
                                        >
                                            Blog
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleNavigation('/enrollment-form')}
                            className="bg-[rgb(12,81,79)] hover:bg-[rgb(10,65,63)] text-white px-8 py-3 rounded-full text-base font-bold shadow-lg shadow-[rgb(12,81,79)]/25 transition-all duration-300 ring-4 ring-transparent hover:ring-[rgb(12,81,79)]/10 border border-[rgb(12,81,79)]/20"
                        >
                            Get Free Session
                        </motion.button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-3 rounded-xl text-slate-400 hover:text-[rgb(12,81,79)] hover:bg-[rgb(12,81,79)]/5 focus:outline-none transition-all duration-300"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-white mx-4 mt-2 rounded-2xl shadow-xl overflow-hidden border border-[rgb(12,81,79)]/10"
                >
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link
                            to="/"
                            className="text-slate-600 hover:text-[rgb(12,81,79)] block px-4 py-3 rounded-full hover:bg-[rgb(12,81,79)]/5 text-base font-bold transition-all duration-300 border border-transparent hover:border-[rgb(12,81,79)]/10"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        
                        <button
                            onClick={() => handleNavigation('/igcse-courses')}
                            className="text-slate-600 hover:text-[rgb(12,81,79)] block px-4 py-3 rounded-full hover:bg-[rgb(12,81,79)]/5 text-base font-bold transition-all duration-300 border border-transparent hover:border-[rgb(12,81,79)]/10 w-full text-left bg-transparent border-none cursor-pointer"
                        >
                            Cambridge
                        </button>

                        {[
                            { name: 'IB', path: '/ib-courses' },
                            { name: 'Our Teachers', path: '/our-teachers' }
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => handleNavigation(item.path)}
                                className="text-slate-600 hover:text-[rgb(12,81,79)] block px-4 py-3 rounded-full hover:bg-[rgb(12,81,79)]/5 text-base font-bold transition-all duration-300 border border-transparent hover:border-[rgb(12,81,79)]/10 w-full text-left bg-transparent border-none cursor-pointer"
                            >
                                {item.name}
                            </button>
                        ))}

                        {/* Mobile Resources Section */}
                        <div className="border-t border-slate-200 pt-3 mt-3">
                            <div className="text-slate-500 text-sm font-semibold py-2">Resources</div>
                            <button
                                onClick={() => handleNavigation('/blog')}
                                className="text-slate-600 hover:text-[rgb(12,81,79)] block px-4 py-3 rounded-full hover:bg-[rgb(12,81,79)]/5 text-base font-bold transition-all duration-300 border border-transparent hover:border-[rgb(12,81,79)]/10 w-full text-left bg-transparent border-none cursor-pointer"
                            >
                                Blog
                            </button>
                        </div>

                        <button 
                            onClick={() => handleNavigation('/enrollment-form')}
                            className="w-full text-center mt-4 bg-[rgb(12,81,79)] hover:bg-[rgb(10,65,63)] text-white px-3 py-4 rounded-full text-base font-bold shadow-lg border border-[rgb(12,81,79)]/20 transition-colors duration-300"
                        >
                            Get Free Session
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
