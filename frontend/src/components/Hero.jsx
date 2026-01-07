import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, CheckCircle2, ArrowRight, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import heroRobot from '../assets/hero.jpg';

const Hero = () => {
    const navigate = useNavigate();

    const handleQuestionClick = (question) => {
        navigate('/chatbot', { state: { initialQuestion: question } });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        if (query) {
            navigate('/chatbot', { state: { initialQuestion: query } });
        }
    }
    return (
        <div id="home" className="relative pt-30 pb-5 lg:pt-30 lg:pb-15 overflow-hidden bg-gradient-to-r from-green-50 via-white to-white">
            {/* --- Background Elements (Softened to match image style) --- */}
            {/* Subtle Grid - lowered opacity for cleaner look */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60"></div>

            {/* Soft Teal/Cyan Gradients instead of Purple */}
            <div className="absolute top-0 right-0 -z-10 translate-x-1/4 -translate-y-1/4 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_70%)] blur-[100px]" />
            <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,transparent_70%)] blur-[100px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    {/* --- Left Content --- */}
                    <div className="lg:col-span-6 text-left z-10">


                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-6 leading-[1.1]"
                        >
                            Get Instant, Personalized <br />
                            <span className="text-[#BADA55] border-b-4 border-[#BADA55]">Homework Help</span>
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed"
                        >
                            Ask Any Question on IGCSE & IB Subjects. Get Accurate Answers from AI Tutors & Expert Teachers 24/7!
                        </motion.p>

                        {/* Search Bar - Styled like the reference image (Capsule shape) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="relative max-w-xl group"
                        >
                            {/* Glow effect behind search */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(12,81,79)]/20 to-teal-200 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                            {/* Main Input Container */}
                            <form onSubmit={handleSearch} className="relative bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-200/50 p-1.5 pl-5 flex items-center h-[56px] group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                                <input
                                    type="text"
                                    name="search"
                                    className="block w-full border-0 p-0 placeholder:text-slate-400 focus:ring-0 text-base bg-transparent font-medium truncate"
                                    placeholder="Ask your question..."
                                />
                                <button type="submit" className="flex items-center gap-2 bg-[rgb(12,81,79)] hover:bg-[rgb(10,65,63)] text-white px-6 h-[42px] rounded-full font-semibold transition-all duration-300 shadow-md shadow-[rgb(12,81,79)]/25 transform hover:scale-[1.02] active:scale-[0.98]">
                                    <Search className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>

                        {/* Example Questions - Styled as capsules below search */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 lg:flex-wrap lg:gap-3 flex gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-x-visible scrollbar-hide"
                        >
                            {[
                                'Explain Photosynthesis',
                                'Math tips for exams',
                                'How to solve quadratic.',
                                'Concepts of Molarity',
                                'Write a TOK essay..'
                            ].map((question, i) => (
                                <div key={i} onClick={() => handleQuestionClick(question)} className="px-4 py-2.5 bg-white rounded-full border border-slate-100 shadow-sm text-sm font-medium text-slate-600 hover:border-[rgb(12,81,79)]/20 hover:text-[rgb(12,81,79)] cursor-pointer transition-colors whitespace-nowrap flex-shrink-0">
                                    {question}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* --- Right Content (Image & Floating Cards) --- */}
                    <div className="mt-16 lg:mt-0 lg:col-span-6 relative z-0">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Main Image Container */}
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-slate-200/50 bg-slate-50">
                                <img
                                    src={heroRobot}
                                    alt="AI Robot Tutor"
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                {/* Soft gradient overlay at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                            </div>

                            {/* Floating Card 1: Accuracy */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute top-12 -left-8 hidden md:flex items-center gap-4 bg-white/95 backdrop-blur-md p-4 pr-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 z-20"
                            >
                                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Success Rate</p>
                                    <p className="text-xl font-bold text-slate-900">99.8%</p>
                                </div>
                            </motion.div>

                            {/* Floating Card 2: Students */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 7, delay: 1, ease: "easeInOut" }}
                                className="absolute -bottom-8 -right-4 hidden md:block bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60 z-20"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                U{i}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">10k+ Active</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-teal-500 w-[85%] h-full rounded-full"></div>
                                </div>
                            </motion.div>

                            {/* Decorative Background Blobs */}
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-100/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-100/50 rounded-full blur-3xl opacity-60"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;