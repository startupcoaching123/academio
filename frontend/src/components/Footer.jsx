import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import logo1 from '../assets/logo1.png';

const Footer = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    return (
        <footer className="bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 text-gray-900 pt-10 pb-6 md:pt-16 md:pb-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                
                {/* GRID LAYOUT:
                    - Mobile: 2 Columns (col-span-2 used for full width items).
                    - Desktop: 4 Columns.
                    - "text-left" is enforced everywhere to avoid centering.
                */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 mb-10">
                    
                    {/* 1. TOP SECTION: Logo (Left) + Socials (Right) on Mobile */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col items-start justify-start">
                        <div className="flex flex-row justify-between items-center w-full lg:w-auto mb-4">
                            {/* Logo */}
                            <img src={logo1} alt="Academio Logo" className="h-10 md:h-12 w-auto" />
                            
                            {/* Social Icons (Visible next to logo on Mobile, Hidden on Desktop) */}
                            <div className="flex gap-3 lg:hidden">
                                <a href="https://www.facebook.com/people/Academio/61566163673930/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-teal-700">
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a href="https://www.instagram.com/academioindia/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-teal-700">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed pr-2">
                            Empowering students globally through personalised learning powered by expert educators.
                        </p>
                        
                        {/* Social Icons (Desktop Only - appeared below text) */}
                        <div className="hidden lg:flex gap-3 mt-6">
                            <a href="https://www.facebook.com/people/Academio/61566163673930/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:bg-teal-50 transition-colors">
                                <Facebook className="w-5 h-5 text-teal-700" />
                            </a>
                            <a href="https://www.instagram.com/academioindia/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:bg-teal-50 transition-colors">
                                <Instagram className="w-5 h-5 text-teal-700" />
                            </a>
                        </div>
                    </div>

                    {/* 2. Platform Links (Left Column) */}
                    <div className="col-span-1 pt-2">
                        <h4 className="font-bold text-sm md:text-lg mb-4 text-gray-900 uppercase tracking-wide">Platform</h4>
                        <ul className="space-y-2.5 text-gray-600 text-sm font-medium">
                            {['Home', 'Features', 'IB', 'IGCSE', 'Teachers'].map((item, idx) => {
                                const paths = ['/', '/#features', '/ib-courses', '/igcse-courses', '/our-teachers'];
                                return (
                                    <li key={idx} onClick={() => handleNavigation(paths[idx])} className="hover:text-teal-600 cursor-pointer transition-colors">
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* 3. Resources Links (Right Column) */}
                    <div className="col-span-1 pt-2">
                        <h4 className="font-bold text-sm md:text-lg mb-4 text-gray-900 uppercase tracking-wide">Resources</h4>
                        <ul className="space-y-2.5 text-gray-600 text-sm font-medium">
                            <li onClick={() => handleNavigation('/blogs')} className="hover:text-teal-600 cursor-pointer transition-colors">Blog</li>
                            <li onClick={() => handleNavigation('/contact-us')} className="hover:text-teal-600 cursor-pointer transition-colors">Community</li>
                            <li onClick={() => handleNavigation('/contact-us')} className="hover:text-teal-600 cursor-pointer transition-colors">Terms</li>
                            <li onClick={() => handleNavigation('/contact-us')} className="hover:text-teal-600 cursor-pointer transition-colors">Privacy</li>
                        </ul>
                    </div>

                    {/* 4. Contact & Newsletter (Full Width on Mobile, Left Aligned) */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
                        <h4 className="font-bold text-sm md:text-lg mb-4 text-gray-900 uppercase tracking-wide">Get in Touch</h4>
                        
                        <div className="space-y-3 text-gray-600 text-sm font-medium w-full mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                    <Phone className="w-4 h-4 text-teal-600" />
                                </div>
                                <span>+91 9971270088</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                    <Mail className="w-4 h-4 text-teal-600" />
                                </div>
                                <span>contact@academio.co.in</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 mt-0.5">
                                    <MapPin className="w-4 h-4 text-teal-600" />
                                </div>
                                <span className="leading-snug">C5 Asola Homes, New Delhi</span>
                            </div>
                        </div>

                        {/* Newsletter - Compact */}
                        <form onSubmit={handleNewsletterSubmit} className="relative w-full max-w-sm">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 shadow-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-1.5 top-1.5 w-9 h-9 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar - Simple Left Align */}
                <div className="border-t border-gray-200/60 pt-6">
                    <p className="text-gray-500 text-xs md:text-sm text-left">
                        © {new Date().getFullYear()} Academio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;