import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import testimonialBg1 from '../assets/1.jpg';
import testimonialBg2 from '../assets/2.jpg';
import testimonialBg3 from '../assets/inline_image_preview.jpg';

const testimonials = [
    {
        name: "Ankita",
        board: "IB",
        quote: "Now, exams don't scare me!",
        backgroundImage: testimonialBg1,
        video: true
    },
    {
        name: "Arjun",
        board: "IGCSE",
        quote: "My grades went up thanks to Academio!",
        backgroundImage: testimonialBg2,
        video: true
    },
    {
        name: "Priya",
        board: "IB",
        quote: "Teacher support made learning easy!",
        backgroundImage: testimonialBg3,
        video: true
    }
];

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div id="our-teachers" className="py-18 bg-white relative overflow-hidden">
            {/* Background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <span className="text-teal-600 font-bold tracking-wider text-sm uppercase mb-2 block">Success Stories</span>
                    <h2 className="text-4xl font-bold text-[rgb(12,81,79)] font-display">
                        Hear From Our Top Achievers
                    </h2>
                </div>

                <div className="relative" ref={ref}>
                    <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="flex flex-col group min-w-[85vw] sm:min-w-[20rem] md:w-full flex-shrink-0 snap-center md:snap-none"
                            >
                                <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-105`}
                                    style={{
                                        backgroundImage: `url(${item.backgroundImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    {/* Overlay for better visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:bg-[rgb(12,81,79)] transition-all duration-300">
                                            <Play className="h-6 w-6 text-[rgb(12,81,79)] fill-current group-hover:text-white ml-1 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-5 left-6 text-white">
                                        <h3 className="text-2xl font-bold drop-shadow-lg">{item.name}</h3>
                                        <p className="text-sm font-semibold opacity-90 drop-shadow-md">{item.board} Topper</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="text-gray-600 text-lg font-medium leading-relaxed">"{item.quote}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-8 md:mt-12 space-x-3">
                        {[0, 1, 2].map((dot) => (
                            <div key={dot} className={`h-2 rounded-full transition-all duration-300 ${dot === 0 ? 'w-8 bg-[rgb(12,81,79)]' : 'w-2 bg-gray-300'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;