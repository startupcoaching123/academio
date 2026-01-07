import React from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen, Award, Users } from 'lucide-react';

const teachersData = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    subject: "Mathematics & Physics",
    experience: "15+ years",
    rating: 4.9,
    students: 500,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    specialties: ["IGCSE", "IB", "A-Levels"],
    description: "Expert in advanced mathematics with a passion for making complex concepts simple."
  },
  {
    id: 2,
    name: "Prof. James Chen",
    subject: "Chemistry & Biology",
    experience: "12+ years",
    rating: 4.8,
    students: 450,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    specialties: ["IGCSE", "AP", "IB"],
    description: "Dedicated to inspiring students through hands-on scientific exploration."
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    subject: "English Literature",
    experience: "10+ years",
    rating: 4.9,
    students: 380,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    specialties: ["IB English", "A-Levels", "SAT Prep"],
    description: "Bringing literature to life with engaging discussions and critical thinking."
  },
  {
    id: 4,
    name: "Mr. David Kim",
    subject: "Computer Science",
    experience: "8+ years",
    rating: 4.7,
    students: 320,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    specialties: ["Programming", "Web Dev", "Data Science"],
    description: "Preparing students for the digital future with cutting-edge tech skills."
  },
  {
    id: 5,
    name: "Dr. Maria Fernandez",
    subject: "History & Geography",
    experience: "14+ years",
    rating: 4.8,
    students: 420,
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    specialties: ["World History", "IB History", "Geography"],
    description: "Making history relevant by connecting past events to current global issues."
  },
  {
    id: 6,
    name: "Mr. Ahmed Hassan",
    subject: "Economics & Business",
    experience: "11+ years",
    rating: 4.9,
    students: 350,
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    specialties: ["IB Economics", "Business Studies", "Finance"],
    description: "Real-world business experience combined with academic excellence."
  },
  {
    id: 7,
    name: "Ms. Lisa Thompson",
    subject: "Art & Design",
    experience: "9+ years",
    rating: 4.8,
    students: 280,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    specialties: ["Visual Arts", "Design", "Portfolio Prep"],
    description: "Nurturing creativity and helping students develop their artistic voice."
  },
  {
    id: 8,
    name: "Dr. Robert Johnson",
    subject: "Psychology & Sociology",
    experience: "13+ years",
    rating: 4.7,
    students: 300,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face",
    specialties: ["IB Psychology", "Sociology", "Research Methods"],
    description: "Helping students understand human behavior and social dynamics."
  }
];

const OurTeachers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-white to-white py-10">
      {/* Background Elements matching Hero theme */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60"></div>
      
      {/* Hero Section - 40vh height */}
      

      {/* Teachers Grid Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Learn from the Best
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our certified teachers bring years of international curriculum experience and a passion for student success
            </p>
          </motion.div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teachersData.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50"
              >
                {/* Teacher Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">{teacher.rating}</span>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{teacher.name}</h3>
                  <p className="text-[rgb(12,81,79)] font-medium mb-3">{teacher.subject}</p>
                  
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{teacher.description}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{teacher.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{teacher.students}+ students</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-green-50 to-teal-50 text-[rgb(12,81,79)] text-xs font-medium rounded-full border border-teal-200"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-r from-[rgb(12,81,79)] to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students achieving academic excellence with our expert teachers
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-teal-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book a Free Trial Class
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurTeachers;