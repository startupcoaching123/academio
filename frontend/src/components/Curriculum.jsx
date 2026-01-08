import { motion } from 'framer-motion';
import { BookOpen, Globe, Library, ArrowRight, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Curriculum = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-10 bg-slate-50 overflow-hidden relative selection:bg-teal-100 selection:text-teal-900">
            {/* Background Decor - Mesh Gradient */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/40 via-sky-100/40 to-rose-100/40 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/40 to-teal-50/40 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">

                    {/* LEFT COLUMN: Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-16 lg:mb-0 relative z-10"
                    >
                        <motion.div variants={itemVariants}>
                            <span className="px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold tracking-wide uppercase inline-block mb-4">
                                World-Class Learning for Global Curricula
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-display mb-6 leading-tight">
                                Confidently <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-sky-600">
                                    Navigating the IGCSE & IB Journey
                                </span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                                We simplify the complexity of international boards through personalised learning pathways that help students excel in Cambridge and IB programmes.
                            </p>
                        </motion.div>

                        {/* Interactive List */}
                        <div className="space-y-5">
                            <CardItem
                                onClick={() => navigate('/igcse-courses')}
                                icon={BookOpen}
                                color="rose"
                                title="IGCSE / CIE Board"
                                desc="Expert support for Cambridge & International Secondary Education."
                            />
                            <CardItem
                                icon={Globe}
                                color="sky"
                                title="IB Board (PYP, MYP, DP)"
                                desc="Holistic guidance for the International Baccalaureate framework."
                            />
                            <CardItem
                                icon={Library}
                                color="teal"
                                title="Comprehensive Subjects"
                                desc="Math, Sciences, Humanities & Languages covered by experts."
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Visual Composition */}
                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        <CompositionVisual />
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sub-component for the list items to keep code clean
const CardItem = ({ icon: Icon, color, title, desc }) => {
    const colorStyles = {
        rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100 group-hover:scale-110",
        sky: "bg-sky-50 text-sky-600 group-hover:bg-sky-100 group-hover:scale-110",
        teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-100 group-hover:scale-110",
    };

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            className="group flex p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm hover:border-slate-200 transition-all cursor-pointer relative overflow-hidden"
        >
            <div className={`p-4 rounded-xl mr-5 transition-transform duration-300 ${colorStyles[color]}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    {title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-slate-400" />
                </h3>
                <p className="text-slate-500 text-sm mt-1 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
};

// Sub-component for the Right Side Illustration
const CompositionVisual = () => {
    return (
        <div className="relative w-full max-w-[500px] aspect-square">
            {/* Main Dashboard Card (Back Layer) */}
            <motion.div
                initial={{ rotate: -6, opacity: 0, y: 50 }}
                whileInView={{ rotate: -3, opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden opacity-90 scale-95 origin-bottom-right"
            />

            {/* Main Interface Card (Front Layer) */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute inset-0 bg-white rounded-[32px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col"
            >
                {/* Header Mockup */}
                <div className="h-16 border-b border-slate-100 flex items-center px-6 justify-between bg-slate-50/50">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="h-2 w-20 bg-slate-200 rounded-full" />
                </div>

                {/* Body Mockup */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-2 w-12 bg-teal-100 rounded-full mb-2" />
                            <div className="h-6 w-32 bg-slate-800 rounded-lg" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                            <span className="font-bold text-slate-900">A+</span>
                        </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>Mathematics (HL)</span>
                                <span>92%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '92%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-teal-500 rounded-full"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-slate-500">
                                <span>Physics</span>
                                <span>88%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '88%' }}
                                    transition={{ duration: 1.5, delay: 0.7 }}
                                    className="h-full bg-sky-500 rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-rose-50 p-4 rounded-xl">
                            <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mb-3">
                                <BookOpen className="w-4 h-4 text-rose-500" />
                            </div>
                            <div className="h-2 w-16 bg-rose-200 rounded-full" />
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-xl">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                                <Globe className="w-4 h-4 text-indigo-500" />
                            </div>
                            <div className="h-2 w-16 bg-indigo-200 rounded-full" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Element 1: Success Badge */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-20 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-20"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Status</p>
                        <p className="text-sm font-bold text-slate-800">Exam Ready</p>
                    </div>
                </div>
            </motion.div>

            {/* Floating Element 2: Stats */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                className="absolute -left-6 bottom-32 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-20"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                        <Star className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Top Rated</p>
                        <p className="text-sm font-bold text-slate-800">IB Expert</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Curriculum;