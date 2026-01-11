import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, HelpCircle, Globe2, Calculator, Quote, Mic, ArrowRight, Users, TrendingUp, Award } from 'lucide-react';

const questions = [
    {
        icon: <HelpCircle className="h-8 w-8 text-blue-500" />,
        title: "Do You Support Both",
        highlight: "IGCSE And IB Curricula?",
        bg: "bg-blue-50"
    },
    {
        icon: <Globe2 className="h-8 w-8 text-red-400" />,
        title: "Which Grades And Subjects",
        highlight: "Does Academio Cover?",
        bg: "bg-red-50"
    },
    {
        icon: <Users className="h-8 w-8 text-indigo-500" />,
        title: "Are Sessions",
        highlight: "One-To-One Or Small Group Based?",
        bg: "bg-indigo-50"
    },
    {
        icon: <TrendingUp className="h-8 w-8 text-teal-500" />,
        title: "How Do You Help Students Improve",
        highlight: "Grades And Exam Performance?",
        bg: "bg-teal-50"
    },
    {
        icon: <Mic className="h-8 w-8 text-cyan-500" />,
        title: "Can Students Get Instant",
        highlight: "Doubt-Solving Support Outside Class Hours?",
        bg: "bg-cyan-50"
    },
    {
        icon: <Award className="h-8 w-8 text-orange-400" />,
        title: "Are Your Mentors Experienced With",
        highlight: "IGCSE & IB Exam Patterns?",
        bg: "bg-orange-50"
    }
];

const Questions = () => {
    return (
        <div className="py-24 bg-teal-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-teal-600 font-bold tracking-wider text-sm uppercase mb-2 block">Common Queries</span>
                    <h2 className="text-3xl font-bold text-[rgb(12,81,79)] sm:text-4xl font-display">
                        Questions You Can Ask Us Anytime
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {questions.map((q, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(12,81,79,0.08)] hover:border-teal-100 transition-all cursor-pointer flex items-start space-x-4 group"
                        >
                            <div className="bg-gray-50 group-hover:bg-teal-50 p-3 rounded-xl transition-colors">
                                {q.icon}
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">{q.title}</p>
                                <p className="text-[rgb(12,81,79)] font-bold text-lg leading-tight">{q.highlight}</p>
                            </div>
                            {/* Tiny arrow for detail */}
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="h-5 w-5 text-teal-400" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 font-semibold hover:border-teal-500 hover:text-teal-700 transition-all shadow-sm">
                        View All Question Examples
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;
