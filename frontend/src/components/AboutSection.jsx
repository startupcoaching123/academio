import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Target, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import studentsImage from '../assets/Students.jpg';

const AboutSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Guidance",
      description: "Every student receives individual attention and tailored learning paths"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Deep Understanding",
      description: "Beyond rote learning to true conceptual mastery"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Academic Excellence",
      description: "Proven results in top university admissions"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Future Ready",
      description: "Preparing students for lifelong success"
    }
  ];

  return (
    <section className="py-5 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-50/30 via-transparent to-emerald-50/20 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Full Width Centered Title */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">About Us</span>
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 lg:gap-20 lg:items-center"
        >
          {/* Mobile First - Text Content */}
          <motion.div variants={itemVariants} className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div>
              <motion.h2 
                variants={itemVariants}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 lg:mb-6 leading-tight"
              >
                Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Clarity</span> Meets{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Confidence</span>
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 lg:mb-8"
              >
                At Academio, we believe every student has the potential to excel — they just need the right guidance, 
                the right learning environment, and consistent support. We work closely with learners aged 11 to 18, 
                helping them build a strong academic foundation that extends far beyond the classroom.
              </motion.p>
            </div>

            {/* Key Points - Smaller on Mobile */}
            <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-teal-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1 lg:mb-2 text-sm lg:text-base">Comprehensive Subject Support</h3>
                  <p className="text-slate-600 text-sm lg:text-base">
                    From Sciences and Mathematics to Languages and Humanities, we provide expert guidance for IGCSE and IB programmes 
                    from Grade 6 to Grade 12.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-teal-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1 lg:mb-2 text-sm lg:text-base">Beyond Rote Learning</h3>
                  <p className="text-slate-600 text-sm lg:text-base">
                    Our approach helps students understand concepts deeply, apply knowledge confidently, and think independently.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-teal-500 rounded-full mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1 lg:mb-2 text-sm lg:text-base">University Ready</h3>
                  <p className="text-slate-600 text-sm lg:text-base">
                    Through structured, scientific, and student-centric learning, we help students exceed grade benchmarks 
                    required for top universities worldwide.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="pt-2 lg:pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about-us')}
                className="group inline-flex items-center gap-2 lg:gap-3 bg-gradient-to-r from-teal-600 to-emerald-500 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Mobile First - Image Side */}
          <motion.div variants={itemVariants} className="relative order-1 lg:order-2">
            {/* Main Image Card - Smaller on Mobile */}
            <div className="relative bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-lg lg:shadow-xl">
              <div className="aspect-[4/3] lg:aspect-square bg-white rounded-xl lg:rounded-2xl shadow-inner overflow-hidden">
                <img 
                  src={studentsImage} 
                  alt="Students learning at Academio" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Feature Cards - Hidden on Small Mobile */}
            <div className="hidden sm:block absolute -top-2 lg:-top-4 -right-2 lg:-right-4 space-y-2 lg:space-y-3">
              {features.slice(0, 2).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg border border-teal-100 flex items-center gap-2 lg:gap-3 min-w-[160px] lg:min-w-[200px]"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-teal-100 rounded-lg lg:rounded-xl flex items-center justify-center text-teal-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs lg:text-sm">{feature.title}</h4>
                    <p className="text-slate-500 text-xs lg:text-sm hidden lg:block">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="hidden sm:block absolute -bottom-2 lg:-bottom-4 -left-2 lg:-left-4 space-y-2 lg:space-y-3">
              {features.slice(2).map((feature, index) => (
                <motion.div
                  key={index + 2}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-lg border border-teal-100 flex items-center gap-2 lg:gap-3 min-w-[160px] lg:min-w-[200px]"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-100 rounded-lg lg:rounded-xl flex items-center justify-center text-emerald-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs lg:text-sm">{feature.title}</h4>
                    <p className="text-slate-500 text-xs lg:text-sm hidden lg:block">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
