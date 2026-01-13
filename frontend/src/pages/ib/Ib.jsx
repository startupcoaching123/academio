import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Atom, FlaskConical, Calculator,
  Dna, Monitor, TrendingUp, BookOpen, CheckCircle2,
  Users, Laptop, FileCheck, BarChart3, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: SUBJECTS ---
import { IB_SUBJECT_DATA } from '../../components/SubjectDetail';

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
    img: "https://cdn-icons-png.flaticon.com/512/1205/1205526.png"
  },
  {
    title: "Regular Parental Updates",
    desc: "Parents receive consistent progress reports and performance insights, ensuring everyone is aligned on the student's journey.",
    img: "https://cdn-icons-png.flaticon.com/512/1589/1589608.png"
  },
];

const Ib = () => {
  const [selectedClass, setSelectedClass] = useState(9);
  const navigate = useNavigate();
  const classes = [6, 7, 8, 9, 10, 11, 12]; // IB MYP (6-10) and IB DP (11-12)

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
            IB Curriculum
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            IB Board Courses by <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Academio</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            IB Class 6-8 follows the IB Middle Years Programme (MYP) and focuses on concept-based, inquiry-driven learning. Classes 9-10 continue with advanced MYP preparation, while Classes 11-12 follow the IB Diploma Programme (DP) with subject specialization and university preparation. The curriculum helps students develop critical thinking, communication skills, and real-world understanding, laying a strong foundation for higher education.
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
                onClick={() => setSelectedClass(cls)} // Select only
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
             {/* Container Background */}
             <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/60 p-4 md:p-8 mb-12 shadow-sm relative z-10">
               
               {/* Header */}
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4 border-b border-slate-100 pb-4 md:pb-6">
                 <div>
                   <h3 className="text-xl md:text-2xl font-bold text-slate-800 flex flex-wrap items-center gap-2 md:gap-3">
                     Class {selectedClass} Syllabus
                     <span className="text-[10px] md:text-xs font-bold tracking-wide uppercase text-teal-700 bg-teal-50/80 px-2 md:px-3 py-1 rounded-lg border border-teal-100/50">
                       {selectedClass >= 11 
                         ? (selectedClass >= 12 ? 'A Level' : 'AS Level') 
                         : 'IGCSE'}
                     </span>
                   </h3>
                 </div>
                 <button
                   onClick={() => setSelectedClass(null)}
                   className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 text-xs md:text-sm font-medium transition-all duration-200"
                 >
                   <span className="inline">Close</span>
                   <X className="w-3 h-3 md:w-4 md:h-4" />
                 </button>
               </div>
       
               {/* Subjects Grid - CHANGED to grid-cols-2 for mobile */}
               <motion.div
                 variants={{
                   hidden: { opacity: 0 },
                   visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                 }}
                 initial="hidden"
                 animate="visible"
                 className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5"
               >
                 {(() => {
                   const gradeKey = selectedClass >= 12 ? 'grade12' : selectedClass >= 11 ? 'grade11' : `grade${selectedClass}`;
                   const subjects = IB_SUBJECT_DATA[gradeKey];
       
                   if (!subjects) {
                     return (
                       <div className="col-span-full py-12 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl text-sm">
                         Data updating...
                       </div>
                     );
                   }
       
                   return Object.entries(subjects).map(([key, subject]) => {
                     const subjectSlug = key.replace(/([A-Z])/g, "-$1").toLowerCase();
       
                     return (
                       <motion.div
                         key={key}
                         variants={{
                           hidden: { opacity: 0, y: 10 },
                           visible: { opacity: 1, y: 0 }
                         }}
                         whileHover={{ y: -4 }}
                         onClick={() => {
                           window.scrollTo(0, 0);
                           navigate(`/subject/${subjectSlug}`, {
                             state: { grade: selectedClass, board: 'IGCSE' }
                           });
                         }}
                         className="group relative bg-white rounded-xl md:rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-teal-900/5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
                       >
                         
                         {/* BACKGROUND ICON (Decorative) - Scaled down for mobile */}
                         <div className={`absolute -right-3 -bottom-3 opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-500 transform rotate-12 group-hover:rotate-0 group-hover:scale-110 pointer-events-none grayscale group-hover:grayscale-0 ${subject.color.split(' ')[1]}`}>
                           {React.cloneElement(subject.icon, { className: "w-20 h-20 md:w-32 md:h-32" })}
                         </div>
       
                         {/* Card Content */}
                         <div className="p-4 md:p-5 flex flex-col h-full relative z-10">
                           
                           {/* Top Row: Icon */}
                           <div className="flex justify-between items-start mb-3 md:mb-4">
                             <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${subject.color} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300`}>
                               {React.cloneElement(subject.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                             </div>
                             
                             {/* Hover Pill - Hidden on mobile, visible on desktop hover */}
                             <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                               VIEW
                             </div>
                           </div>
       
                           {/* Subject Name - Font size adjusted for mobile columns */}
                           <div className="mb-3 md:mb-4 flex-grow">
                             <h4 className="text-sm md:text-lg font-bold text-slate-800 leading-snug group-hover:text-teal-700 transition-colors line-clamp-3 md:line-clamp-none">
                               {subject.name}
                             </h4>
                           </div>
       
                           {/* Footer Button */}
                           <div className="mt-auto pt-3 md:pt-4 border-t border-slate-50 flex items-center text-slate-400 group-hover:text-teal-600 transition-colors text-[10px] md:text-sm font-medium gap-1.5 md:gap-2">
                             <span>View Details</span>
                             <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform" />
                           </div>
                         </div>
                         
                       </motion.div>
                     );
                   });
                 })()}
               </motion.div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>

        {/* --- ENROLLMENT CTA SECTION --- */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-500 rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Start Your Learning Journey
            </h2>
            <p className="text-teal-50 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students achieving academic excellence with our expert-led IB programs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/enrollment-form')}
              className="bg-white text-teal-700 px-8 py-3 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all border-2 border-white/20"
            >
              Enroll Now
            </motion.button>
          </motion.div>
        </div>

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
            Start Learning Today
          </h2>
          <p className="text-teal-50 text-lg md:text-xl mb-10 font-medium max-w-2xl mx-auto">
            Join our expert-led programs and begin your educational journey with confidence.
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

export default Ib;