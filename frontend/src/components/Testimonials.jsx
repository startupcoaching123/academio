import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, X } from 'lucide-react';
import testimonialBg1 from '../assets/1.jpg';
import testimonialBg2 from '../assets/2.jpg';
import testimonialBg3 from '../assets/inline_image_preview.jpg';

const testimonials = [
    {
        name: "Ankita",
        board: "IB",
        quote: "Now, exams don't scare me!",
        backgroundImage: testimonialBg1,
        videoSrc: "https://www.pexels.com/download/video/7560793/",
        video: true
    },
    {
        name: "Arjun",
        board: "IGCSE",
        quote: "My grades went up thanks to Academio!",
        backgroundImage: testimonialBg2,
        videoSrc: "https://www.pexels.com/download/video/6914404/",
        video: true
    },
    {
        name: "Priya",
        board: "IB",
        quote: "Teacher support made learning easy!",
        backgroundImage: testimonialBg3,
        videoSrc: "https://www.pexels.com/download/video/7560804/",
        video: true
    }
];

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [selectedVideo, setSelectedVideo] = useState(null);

    const VideoCard = ({ item, index }) => {
        const [isHovered, setIsHovered] = useState(false);
        const videoRef = useRef(null);

        const handleMouseEnter = () => {
            setIsHovered(true);
            if (videoRef.current) {
                videoRef.current.play();
            }
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };

        const handleClick = () => {
            if (item.video) {
                setSelectedVideo(item);
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col group min-w-[85vw] sm:min-w-[20rem] md:w-full flex-shrink-0 snap-center md:snap-none"
            >
                <div 
                    className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:scale-105 cursor-pointer`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    {/* Image Background - shown when not hovering */}
                    <div 
                        className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                        style={{
                            backgroundImage: `url(${item.backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    
                    {/* Video - shown when hovering */}
                    {item.video && (
                        <video
                            ref={videoRef}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            src={item.videoSrc}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    )}

                    {/* Overlay for better visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                    {/* Play Button - hidden when video is playing */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
                        <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:bg-[rgb(12,81,79)] transition-all duration-300">
                            <Play className="h-6 w-6 text-[rgb(12,81,79)] fill-current group-hover:text-white ml-1 transition-colors" />
                        </div>
                    </div>

                    <div className="absolute bottom-5 left-6 text-white pointer-events-none">
                        <h3 className="text-2xl font-bold drop-shadow-lg">{item.name}</h3>
                        <p className="text-sm font-semibold opacity-90 drop-shadow-md">{item.board} Topper</p>
                    </div>
                </div>
                <div className="mt-6">
                    <p className="text-gray-600 text-lg font-medium leading-relaxed">"{item.quote}"</p>
                </div>
            </motion.div>
        );
    };

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
                            <VideoCard key={index} item={item} index={index} />
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

            {/* Video Modal */}
            {selectedVideo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-4xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                        >
                            <X className="h-8 w-8" />
                        </button>

                        {/* Video Player */}
                        <video
                            className="w-full h-full rounded-lg shadow-2xl"
                            src={selectedVideo.videoSrc}
                            controls
                            autoPlay
                            playsInline
                        />

                        {/* Video Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                            <h3 className="text-2xl font-bold text-white mb-1">{selectedVideo.name}</h3>
                            <p className="text-white/90 font-medium">{selectedVideo.board} Topper</p>
                            <p className="text-white/80 mt-2">"{selectedVideo.quote}"</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Testimonials;