import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Facebook, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
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
        // Handle newsletter signup logic here
        setEmail('');
    };

    return (
        <footer className="bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 text-gray-900 pt-20 pb-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    {/* Logo and Description */}
                    <div className="col-span-1">
                        <div className="flex items-center mb-6">
                            <img src={logo1} alt="Academio Logo" className="h-15 w-auto mr-3" />
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed pr-4">
                            Empowering students globally through personalised learning powered by expert educators and smart technology—shaping education for future.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-gray-900">Platform</h4>
                        <ul className="space-y-4 text-gray-600 text-base font-medium">
                            <li 
                                onClick={() => handleNavigation('/')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                Home
                            </li>
                            <li 
                                onClick={() => handleNavigation('/#features')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                Features
                            </li>
                            <li 
                                onClick={() => handleNavigation('/ib-courses')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                IB
                            </li>
                            <li 
                                onClick={() => handleNavigation('/igcse-courses')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                IGCSE
                            </li>
                            <li 
                                onClick={() => handleNavigation('/our-teachers')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                Teachers
                            </li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-gray-900">Resources</h4>
                        <ul className="space-y-4 text-gray-600 text-base font-medium">
                            <li 
                                onClick={() => handleNavigation('/blogs')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                Blog
                            </li>
                            <li 
                                onClick={() => handleNavigation('/contact-us')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                Community
                            </li>
                            <li 
                                onClick={() => handleNavigation('/contact-us')}
                                className="hover:text-teal-600 cursor-pointer transition-colors"
                            >
                                Terms of Service
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-gray-900">CONTACT US</h4>
                        <div className="space-y-3 text-gray-600 text-base font-medium">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                <span>+91 9971270088</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                <span>contact@academio.co.in</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                                <span>C5 Asola Homes, Asola Farms, New Delhi 110074</span>
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="mt-6">
                            <h5 className="font-semibold text-base mb-3 text-gray-900">Sign up for the newsletter</h5>
                            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-teal-500 text-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-10 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center gap-4 mt-6">
                            <span className="text-gray-600 text-sm">To get in touch with us, call</span>
                            <div className="flex gap-3">
                                <a 
                                    href="https://www.facebook.com/people/Academio/61566163673930/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <Facebook className="w-4 h-4 text-gray-600" />
                                </a>
                                <a 
                                    href="https://www.instagram.com/academioindia/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <Instagram className="w-4 h-4 text-gray-600" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-base">
                    <p>© {new Date().getFullYear()} Academio. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span 
                            onClick={() => handleNavigation('/contact-us')}
                            className="cursor-pointer hover:text-gray-900"
                        >
                            Privacy Policy
                        </span>
                        <span 
                            onClick={() => handleNavigation('/contact-us')}
                            className="cursor-pointer hover:text-gray-900"
                        >
                            Cookie Policy
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
