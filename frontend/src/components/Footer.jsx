import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';
import logo1 from '../assets/logo1.png';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-teal-50 via-emerald-50 to-amber-50 text-gray-900 pt-20 pb-10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6">
                            <img src={logo1} alt="Academio Logo" className="h-15 w-auto mr-3" />
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed pr-4">
                            Empowering students worldwide with personalized AI + Expert learning solutions. Redefining education for the future.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-gray-900">Platform</h4>
                        <ul className="space-y-4 text-gray-600 text-base font-medium">
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Home</li>
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Features</li>
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Pricing</li>
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Teachers</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-gray-900">Resources</h4>
                        <ul className="space-y-4 text-gray-600 text-base font-medium">
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Blog</li>
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Community</li>
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Help Center</li>
                            <li className="hover:text-teal-600 cursor-pointer transition-colors">Terms of Service</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 text-gray-900">Contact</h4>
                        <ul className="space-y-4 text-gray-600 text-base font-medium">
                            <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>support@academio.com</li>
                            <li className="flex items-center"><span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>+1 (555) 123-4567</li>
                        </ul>
                        <div className="flex space-x-4 mt-8">
                            <div className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer transition-colors">
                                <Twitter className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                            </div>
                            <div className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer transition-colors">
                                <Instagram className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                            </div>
                            <div className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer transition-colors">
                                <Linkedin className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-base">
                    <p>© {new Date().getFullYear()} Academio. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-gray-900">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-gray-900">Cookie Policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
