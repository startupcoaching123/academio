import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import featureBg1 from '../assets/ChatGPT Image Jan 5, 2026, 03_35_05 PM.png';
import featureBg2 from '../assets/ChatGPT Image Jan 5, 2026, 03_38_36 PM.png';
import featureBg3 from '../assets/premium_vector-1744112216017-ab0da51ca7ea.png';

const featuresData = [
    {
        id: "01",
        title: "Smart Learning Assistant",
        description: "Stuck on a problem? Our 24/7 learning support breaks down complex concepts instantly.",
        gradient: "from-emerald-400 to-teal-500",
        text: "text-emerald-700",
        backgroundImage: featureBg1
    },
    {
        id: "02",
        title: "Expert Board Teachers",
        description: "Master IGCSE & IB with personalized guidance from certified international mentors.",
        gradient: "from-teal-500 to-[rgb(12,81,79)]",
        text: "text-teal-800",
        backgroundImage: featureBg2
    },
    {
        id: "03",
        title: "Proven Results",
        description: "Join a community of high-achievers hitting their target grades every semester.",
        gradient: "from-amber-400 to-orange-500",
        text: "text-amber-800",
        backgroundImage: featureBg3
    }
];

const Features = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-gray-50/50">
            {/* Background Atmosphere - Subtle blurred blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    
                    {/* Eyebrow Text */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs md:text-sm font-bold tracking-[0.2em] text-lime-600 uppercase mb-4"
                    >
                        Why Choose Academio?
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#0f393b] mb-3"
                    >
                        Smart Learning + Expert Teachers
                    </motion.h2>
                    
                    {/* Sub Headline (Italic) */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-serif italic text-slate-500"
                    >
                        The Best of Both Worlds
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {featuresData.map((feature, idx) => {
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ 
                                    y: -12,
                                    scale: 1.02,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)"
                                }}
                                className="group relative rounded-[2.5rem] p-8 md:p-10 border border-gray-100/50 shadow-xl shadow-gray-200/30 overflow-hidden bg-white/90 backdrop-blur-sm transition-all duration-500 ease-out"
                                style={{
                                    backgroundImage: `url(${feature.backgroundImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                {/* Animated Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.2] transition-all duration-700`} />
                                
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                                
                                {/* Overlay for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                                
                                {/* Additional overlay for text contrast */}
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/0 transition-all duration-500" />
                                
                                {/* Animated Border Glow */}
                                <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-[0.3] blur-sm transition-opacity duration-500`} />
                                 
                                {/* Top Border Gradient Line */}
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-out`} />

                                <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                                    {/* Content */}
                                    <h3 className="text-3xl font-bold text-white mb-4 font-display drop-shadow-lg group-hover:text-white transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    
                                    <p className="text-white/90 text-lg leading-relaxed mb-8 max-w-sm drop-shadow-md group-hover:text-white transition-colors duration-300">
                                        {feature.description}
                                    </p>

                                    {/* Enhanced Action Link */}
                                    
                                </div>

                                {/* Enhanced Decorative Elements */}
                                <div className="absolute -bottom-4 -right-4 text-9xl font-bold text-gray-200/20 group-hover:text-gray-300/30 transition-all duration-500 select-none pointer-events-none font-display">
                                    {feature.id}
                                </div>
                                
                                {/* Floating Particles */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-opacity duration-500" />
                                <div className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity duration-700" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;