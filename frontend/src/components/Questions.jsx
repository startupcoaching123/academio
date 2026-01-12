import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const faqData = [
    {
        question: "Do You Support Both IGCSE And IB Curriculum?",
        answer: "Yes, we specialize in both curriculums. Our mentors are specifically trained to handle the unique requirements, assessment criteria, and syllabus depths of both Cambridge IGCSE and IB Diploma Programmes."
    },
    {
        question: "Which Grades And Subjects Does Academio Cover?",
        answer: "We cover Grades 6 through 12. Our subject expertise spans Mathematics (all levels), Physics, Chemistry, Biology, Economics, Business Studies, and Computer Science."
    },
    {
        question: "Are Sessions One-To-One Or Small Group Based?",
        answer: "We offer both formats. Our 1:1 sessions provide highly personalized attention, while our small group batches (max 4 students) encourage peer learning and healthy competition at a more affordable price point."
    },
    {
        question: "How Do You Help Students Improve Grades And Exam Performance?",
        answer: "We focus on conceptual clarity followed by rigorous past paper practice. We provide personalized study plans, regular mock tests, and detailed performance analytics to identify and fix weak areas."
    },
    {
        question: "Can Students Get Instant Doubt-Solving Support Outside Class Hours?",
        answer: "Absolutely. Students get access to a dedicated doubt-clearing channel where they can post questions and receive video or text solutions from mentors within a few hours."
    },
    {
        question: "Are Your Mentors Experienced With IGCSE & IB Exam Patterns?",
        answer: "Yes, all our mentors are either alumni of top universities or certified educators with 5+ years of experience teaching specifically for International Boards."
    }
];

const FAQItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 text-left flex items-start md:items-center justify-between group"
            >
                <span className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-teal-700' : 'text-slate-800 group-hover:text-teal-600'}`}>
                    {item.question}
                </span>
                <span className={`ml-6 flex-shrink-0 p-1 rounded-full border transition-all duration-300 ${isOpen ? 'bg-teal-600 border-teal-600 text-white' : 'border-gray-300 text-gray-400 group-hover:border-teal-600 group-hover:text-teal-600'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-600 leading-relaxed">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Questions = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="py-5 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    
                    {/* Left Side: Header & CTA */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-24">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-teal-600 font-bold tracking-wider text-sm uppercase mb-3 block"
                            >
                                Support
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold text-slate-900 font-display mb-6 leading-tight"
                            >
                                Frequently Asked Questions
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-500 mb-8"
                            >
                                Everything you need to know about the product and billing. Can’t find the answer you’re looking for?
                            </motion.p>
                            
                            <motion.button 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 transition-colors"
                            >
                                <MessageCircle size={20} />
                                Chat with our Team
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Side: Accordion List */}
                    <div className="lg:col-span-7">
                        <div className="bg-white">
                            {faqData.map((item, idx) => (
                                <FAQItem
                                    key={idx}
                                    item={item}
                                    isOpen={openIndex === idx}
                                    onClick={() => toggleFAQ(idx)}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Questions;