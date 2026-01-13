import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Star, X, GraduationCap, Briefcase, Award, Mail, Phone } from 'lucide-react';

// Enhanced Data with details for the Modal
const teachersData = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    subject: "Mathematics",
    rating: "9.8",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=500&fit=crop",
    education: "Ph.D. in Applied Mathematics, IIT Delhi",
    experience: "12 Years",
    bio: "Dr. Ananya specializes in making complex calculus concepts intuitive. She has published multiple papers on algebraic geometry and mentors students for international math Olympiads.",
    email: "ananya.s@school.edu"
  },
  {
    id: 2,
    name: "Prof. Rohan Verma",
    subject: "Physics",
    rating: "9.6",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=500&fit=crop",
    education: "M.Sc. Physics, IISc Bangalore",
    experience: "8 Years",
    bio: "Professor Verma brings physics to life with practical demonstrations. His expertise lies in Quantum Mechanics and he runs the school's Astronomy club.",
    email: "rohan.v@school.edu"
  },
  {
    id: 3,
    name: "Ms. Priya Mehta",
    subject: "Literature",
    rating: "9.3",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=500&fit=crop",
    education: "MA English Literature, DU",
    experience: "6 Years",
    bio: "Priya is an avid reader and poet. She focuses on contemporary literature and helps students develop strong analytical and creative writing skills.",
    email: "priya.m@school.edu"
  },
  {
    id: 4,
    name: "Mr. Arjun Singh",
    subject: "Computer Science",
    rating: "9.5",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=500&fit=crop",
    education: "M.Tech Computer Science, IIIT Hyderabad",
    experience: "9 Years",
    bio: "Arjun brings industry experience to the classroom. He teaches Python, Java, and AI fundamentals, preparing students for the tech-driven future.",
    email: "arjun.s@school.edu"
  },
  {
    id: 5,
    name: "Dr. Neha Kapoor",
    subject: "Biology",
    rating: "9.4",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=500&fit=crop",
    education: "Ph.D. in Genetics, AIIMS",
    experience: "10 Years",
    bio: "Dr. Neha makes biology fascinating through microscopic labs and field trips. Her research focus involves plant genetics and sustainable ecosystems.",
    email: "neha.k@school.edu"
  },
  {
    id: 6,
    name: "Prof. Aman Gupta",
    subject: "Chemistry",
    rating: "9.2",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=500&fit=crop",
    education: "M.Sc. Chemistry, BITS Pilani",
    experience: "7 Years",
    bio: "Known for his explosive experiments (safely conducted!), Aman specializes in Organic Chemistry and helps students crack competitive entrance exams.",
    email: "aman.g@school.edu"
  },
  {
    id: 7,
    name: "Ms. Kavya Nair",
    subject: "Economics",
    rating: "9.1",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop",
    education: "MA Economics, JNU",
    experience: "5 Years",
    bio: "Kavya simplifies macroeconomics using real-world case studies. She encourages debates on global markets and fiscal policies.",
    email: "kavya.n@school.edu"
  },
  {
    id: 8,
    name: "Mr. Suresh Iyer",
    subject: "History",
    rating: "9.0",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop",
    education: "MA History, Calcutta University",
    experience: "15 Years",
    bio: "Mr. Iyer is a storyteller at heart. He connects past events to modern geopolitics, making history a favorite subject among students.",
    email: "suresh.i@school.edu"
  }
];

const OurTeachers = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  return (
    <section className="pt-30 pb-15 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Meet Our Expert Teachers
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl">
            Learn from certified educators with years of experience in international curricula
          </p>
          <div className="h-1.5 w-16 bg-blue-600 mt-6 rounded-full" />
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachersData.map((teacher) => (
            <motion.div
              key={teacher.id}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedTeacher(teacher)}
              className="group relative cursor-pointer"
            >
              {/* Blue Border on Hover */}
              <div className="absolute -inset-1.5 rounded-[1.8rem] border-[3px] border-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none" />

              <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-slate-100 transition-shadow group-hover:shadow-xl">
                {/* Teacher Poster */}
                <div className="aspect-[3/3.5] overflow-hidden bg-slate-100">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Footer Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-900 truncate">
                    {teacher.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-indigo-900 fill-indigo-900" />
                      <span className="text-sm font-bold text-indigo-900">{teacher.rating}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-indigo-900" />
                      <span className="text-sm font-medium text-indigo-900">{teacher.subject}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* -------------------- MODAL SECTION -------------------- */}
      <AnimatePresence>
        {selectedTeacher && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
              >
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedTeacher(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors backdrop-blur-sm shadow-sm"
                >
                  <X className="w-5 h-5 text-slate-800" />
                </button>

                {/* Left Side: Image */}
                <div className="w-full md:w-2/5 h-64 md:h-auto relative bg-slate-100">
                  <img 
                    src={selectedTeacher.image} 
                    alt={selectedTeacher.name}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                  <div className="absolute bottom-4 left-4 md:hidden text-white">
                     <h3 className="text-2xl font-bold">{selectedTeacher.name}</h3>
                     <p className="opacity-90">{selectedTeacher.subject}</p>
                  </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-3/5 p-8 overflow-y-auto">
                  {/* Desktop Header */}
                  <div className="hidden md:block mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold border border-indigo-100">
                        {selectedTeacher.subject} Department
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold text-slate-900">{selectedTeacher.rating} Rating</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">{selectedTeacher.name}</h3>
                  </div>

                  {/* Info Grid */}
                  <div className="space-y-6">
                    
                    {/* Bio */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">About</h4>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {selectedTeacher.bio}
                      </p>
                    </div>

                    <div className="w-full h-px bg-slate-100" />

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500 font-medium">Education</p>
                          <p className="text-slate-900 font-semibold">{selectedTeacher.education}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-slate-500 font-medium">Experience</p>
                          <p className="text-slate-900 font-semibold">{selectedTeacher.experience}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-blue-600 rounded-2xl p-6 text-white mt-4">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Connect Details
                      </h4>
                      <div className="space-y-3">
                         <div className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
                            <Mail className="w-4 h-4" />
                            <span>{selectedTeacher.email}</span>
                         </div>
                         <div className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
                            <Phone className="w-4 h-4" />
                            <span>+91 98765-XXXXX</span>
                         </div>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurTeachers;