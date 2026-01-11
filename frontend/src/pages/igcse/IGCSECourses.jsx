import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Atom, FlaskConical, Calculator,
  Dna, Monitor, TrendingUp, BookOpen, CheckCircle2,
  Users, Laptop, FileCheck, BarChart3, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: SUBJECTS ---
import { SUBJECT_DATA } from '../../components/SubjectDetail';

// --- DATA: FEATURES ---
const FEATURES_DATA = [
  {
    title: "Focused Tutor-Led Sessions",
    desc: "Experience high-impact learning with our subject matter experts. Interactive deep dives designed to tackle complex concepts.",
    img: "https://cdn-icons-png.flaticon.com/512/3426/3426653.png"
  },
  {
    title: "Hybrid Learning Flexibility",
    desc: "Choose the environment that suits your lifestyle. Seamless transition between our modern physical centers and live virtual classrooms.",
    img: "https://cdn-icons-png.flaticon.com/512/1651/1651639.png"
  },
  {
    title: "24/7 Digital Portal Access",
    desc: "Get 24/7 access to a powerful digital portal featuring session recordings, curated resources, and supplementary materials.",
    img: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
  },
  {
    title: "Tailored Practice Assignments",
    desc: "Growth happens outside the classroom. Receive custom curated assignments designed to reinforce your specific weak areas.",
    img: "https://cdn-icons-png.flaticon.com/512/2464/2464132.png"
  },
  {
    title: "Expert Graded Feedback",
    desc: "Our tutors provide in-depth, personalized feedback on graded work, helping you understand each correction.",
    img: "https://cdn-icons-png.flaticon.com/512/3206/3206037.png"
  },
  {
    title: "Regular Parental Updates",
    desc: "Parents receive consistent progress reports and performance insights, ensuring everyone is aligned on the student's journey.",
    img: "https://cdn-icons-png.flaticon.com/512/2855/2855734.png"
  },
];

const ModernIGCSE = () => {
  const [selectedClass, setSelectedClass] = useState(6);
  const navigate = useNavigate();
  const classes = [6, 7, 8, 9, 10, 11, 12];

  // --- Animation Variants ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] font-sans selection:bg-teal-200 overflow-x-hidden relative">

      {/* Decorative Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px]" />
      </div>

      {/* --- HERO & CLASS SELECTION --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-38 pb-12">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1.5 px-4 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase mb-6"
          >
            IGCSE Curriculum
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            IGCSE Board Courses by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Academio</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            At Academio, we focus on building strong academic foundations while developing the skills, confidence, and exam readiness students need to excel in the IGCSE curriculum.
          </p>
        </div>

        {/* Class Buttons (Always Visible) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
          {classes.map((cls, idx) => {
            const isSelected = selectedClass === cls;
            const isInactive = selectedClass !== null && !isSelected;

            return (
              <motion.button
                key={cls}
                onClick={() => setSelectedClass(isSelected ? null : cls)} // Toggle
                animate={{
                  scale: isSelected ? 1.1 : (isInactive ? 0.9 : 1),
                  opacity: isInactive ? 0.6 : 1
                }}
                whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-lg border transition-all duration-300 cursor-pointer
                    ${isSelected
                    ? 'bg-teal-600 border-teal-600 text-white shadow-teal-500/30'
                    : 'bg-white border-white text-slate-800 hover:border-teal-200'
                  }
                `}
              >
                <span className={`text-sm font-medium mb-1 z-10 transition-colors ${isSelected ? 'text-teal-100' : 'text-slate-400 group-hover:text-teal-600'}`}>Class</span>
                <span className={`text-3xl md:text-4xl font-bold z-10 transition-colors ${isSelected ? 'text-white' : 'text-slate-800 group-hover:text-teal-700'}`}>{cls}</span>
              </motion.button>
            );
          })}
        </div>

        {/* --- DYNAMIC SUBJECTS SECTION (Expands Below) --- */}
        <AnimatePresence mode="wait">
          {selectedClass !== null && (
            <motion.div
              key={selectedClass}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-white/60 p-8 md:p-12 mb-12 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      Subjects for Class {selectedClass}
                      <span className="text-sm font-normal text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                        {selectedClass >= 11 ? (selectedClass >= 12 ? 'A Level Syllabus' : 'AS Level Syllabus') : 'IGCSE Syllabus'}
                      </span>
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedClass(null)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <motion.div
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {(() => {
                    const gradeKey = selectedClass >= 12 ? 'grade12' : selectedClass >= 11 ? 'grade11' : `grade${selectedClass}`;
                    const subjects = SUBJECT_DATA[gradeKey];

                    if (!subjects) {
                      return (
                        <div className="col-span-full py-12 text-center text-slate-500 bg-white/50 rounded-2xl">
                          <p>No specific subject data available for Class {selectedClass} yet.</p>
                        </div>
                      );
                    }

                    return Object.entries(subjects).map(([key, subject], index) => {
                      const subjectSlug = key.replace(/([A-Z])/g, "-$1").toLowerCase(); // e.g. englishFirstLanguage -> english-first-language

                      return (
                        <motion.div
                          key={key}
                          variants={cardVariants}
                          whileHover={{ y: -5 }}
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/subject/${subjectSlug}`, {
                              state: {
                                grade: selectedClass,
                                board: 'IGCSE'
                              }
                            });
                          }}
                          className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 border border-slate-100 transition-all duration-300 group cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center`}>
                              {subject.icon}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight className="w-4 h-4 text-slate-600" />
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-slate-800">{subject.name}</h4>
                          <p className="text-sm text-slate-400 mt-1">View Syllabus details</p>
                        </motion.div>
                      );
                    });
                  })()}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="bg-white relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">What's Included</h2>
            <div className="h-1.5 w-24 bg-teal-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES_DATA.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="border-2 border-slate-100 rounded-3xl p-8 hover:border-teal-400/50 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300 bg-white flex flex-col h-full"
              >
                <div className="flex flex-col items-center mb-6">
                  <img src={feature.img} alt={feature.title} className="h-32 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="bg-linear-to-r from-teal-600 to-emerald-500 py-24 px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-sm">
            Unlock Your Child's Potential Today
          </h2>
          <p className="text-teal-50 text-lg md:text-xl mb-10 font-medium max-w-2xl mx-auto">
            Sign up for a free consultation or trial class and give your child the academic advantage they deserve.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/enrollment-form')}
            className="bg-white text-teal-800 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Book Free Consultation
          </motion.button>
        </motion.div>
      </div>

    </div>
  );
};

export default ModernIGCSE;