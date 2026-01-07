import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, Timer, ChevronRight, Star } from 'lucide-react';

const CATEGORIES = ["All", "Web Development", "Data Science", "UI/UX Design", "Career"];

const LESSONS = [
  {
    id: 1,
    title: "Understanding React Portals and Beyond",
    difficulty: "Advanced",
    category: "Web Development",
    duration: "12 min read",
    author: "Sarah Drasner",
    points: 150,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800"
  },
  {
    id: 2,
    title: "Typography Rules for Modern Dashboards",
    difficulty: "Beginner",
    category: "UI/UX Design",
    duration: "8 min read",
    author: "Gary Simon",
    points: 80,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=800"
  },
  {
    id: 3,
    title: "Python for Data Visualization: Matplotlib",
    difficulty: "Intermediate",
    category: "Data Science",
    duration: "20 min read",
    author: "Dr. Angela Yu",
    points: 200,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800"
  }
];

const BlogPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pt-20 pb-8">
      
      {/* --- Hero Section --- */}
      <header className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">
            Master your craft through <span className="text-[rgb(12,81,79)]">structured</span> reading.
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Deep dives into technical concepts, design systems, and career growth—written by industry experts.
          </p>
          
          {/* Category Chips */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === cat 
                  ? 'bg-[rgb(12,81,79)] text-white shadow-lg shadow-[rgb(12,81,79)]/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </header>

      {/* --- Main Feed --- */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Loop through Articles */}
          <AnimatePresence mode='popLayout'>
            {LESSONS
              .filter(post => activeTab === "All" || post.category === activeTab)
              .map((post, idx) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-shadow group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm 
                        ${post.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' : 
                          post.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 
                          'bg-rose-100 text-rose-700'}`}>
                        {post.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-slate-500 text-xs mb-3">
                      <span className="flex items-center gap-1"><Timer size={14}/> {post.duration}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[rgb(12,81,79)] font-bold"><Star size={14} fill="currentColor"/> +{post.points} XP</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[rgb(12,81,79)] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200" />
                        <span className="text-sm font-medium text-slate-700">{post.author}</span>
                      </div>
                      <button className="p-2 rounded-full bg-slate-50 group-hover:bg-[rgb(12,81,79)] group-hover:text-white transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;