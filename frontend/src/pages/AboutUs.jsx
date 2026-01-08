import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  Target,
  Lightbulb,
  CheckCircle,
  Star
} from 'lucide-react';
import logo from '../assets/logo1.png';
import natashaImage from '../assets/14.png';
import sujitImage from '../assets/13.png';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-teal-50/30 py-20 mt-20 font-sans">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Academio Logo" className="h-20 object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-6">
            About <span className="text-[rgb(12,81,79)]">Us</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            At Academio, we believe every student has the potential to excel — they just need the right guidance, 
            the right learning environment, and consistent support. We work closely with learners aged 11 to 18, 
            helping them build a strong academic foundation that extends far beyond the classroom.
          </p>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <motion.div 
          {...fadeInUp}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 bg-linear-to-br from-[rgb(12,81,79)]/5 to-transparent"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our expertise lies in empowering students to succeed in the IGCSE and IB programmes. From Sciences 
                and Mathematics to Languages and Humanities, we provide comprehensive subject support for students 
                from Grade 6 to Grade 12. Our approach goes beyond rote learning — students learn to understand 
                concepts deeply, apply knowledge confidently, and think independently.
              </p>
              <p className="text-slate-600 leading-relaxed">
                While universities assess students holistically, academic performance remains the most decisive 
                factor in admissions. With increasing competition and thousands of applications each year, strong 
                grades are essential to stand out. This is where Academio makes a meaningful difference.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, label: "Academic Excellence", color: "text-blue-600" },
                { icon: Lightbulb, label: "Critical Thinking", color: "text-yellow-600" },
                { icon: Users, label: "Personalized Learning", color: "text-green-600" },
                { icon: Award, label: "Proven Results", color: "text-purple-600" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-[rgb(12,81,79)]/5 to-transparent p-6 rounded-2xl text-center"
                >
                  <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
                  <h3 className="font-semibold text-slate-700">{item.label}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Welcome Message */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <motion.div 
          {...fadeInUp}
          className="bg-linear-to-r from-[rgb(12,81,79)]/10 to-teal-100/30 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Welcome to Academio</h2>
          <p className="text-lg text-slate-700 text-center leading-relaxed max-w-4xl mx-auto">
            Welcome to Academio, a place born out of a shared passion for teaching and the belief that education 
            should be about building strong foundations. I'm Nitasha Sagar, and together with Sujit Kumar, we 
            co-founded this center with the mission to provide students with the support and guidance they need 
            to excel academically and beyond.
          </p>
        </motion.div>
      </div>

      {/* Founders Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="space-y-12"
        >
          {/* Nitasha Sagar */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-linear-to-br from-[rgb(12,81,79)] to-teal-800 p-8 md:p-12 text-white">
                <div className="mb-6">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    <img src={natashaImage} alt="Nitasha Sagar" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-center">Nitasha Sagar</h3>
                  <p className="text-teal-100 text-center">Co-Founder & Director</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-200" />
                    <span className="text-sm">Engineer from Delhi Technological Institute</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-200" />
                    <span className="text-sm">MBA from IIM-Bangalore</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-200" />
                    <span className="text-sm">Aditya Birla Scholarship recipient</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-200" />
                    <span className="text-sm">Former P&G and Accenture consultant</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <h4 className="text-2xl font-bold text-slate-800 mb-4">My Journey</h4>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    My own academic journey began as an engineer from Delhi Technological Institute, followed by an 
                    MBA from IIM-Bangalore, where I earned the prestigious Aditya Birla Scholarship. My professional 
                    career took me into the world of marketing consulting and data intelligence, working with companies 
                    like Procter & Gamble and Accenture.
                  </p>
                  <p>
                    While I enjoyed this work, it was teaching my three young children that reignited my true passion—education. 
                    I observed how often schools skim over the core fundamentals, leaving students with gaps in their understanding.
                  </p>
                  <p>
                    I felt strongly that every child deserves a solid foundation on which they can build their academic success. 
                    That's when I decided to create this tuition centre, a place where we focus on helping students truly understand 
                    the subjects they study, preparing them not just for exams but for lifelong learning.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sujit Kumar */}
          <motion.div 
            variants={fadeInUp}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="order-2 lg:order-1 p-8 md:p-12">
                <h4 className="text-2xl font-bold text-slate-800 mb-4">Teaching Excellence</h4>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Sujit Kumar, my co-founder, brings over 20 years of teaching experience to the centre. With a BTech 
                    from RGPV Bhopal and an MTech from IIT Delhi, Sujit has dedicated his life to teaching after a brief 
                    stint in the private sector.
                  </p>
                  <p>
                    His teaching experience spans across multiple curriculums, including IGCSE, IB, IIT-JEE coaching, 
                    and AP Exams. His passion for education was sparked when he realized that the satisfaction he derived 
                    from teaching far surpassed anything the corporate world could offer.
                  </p>
                  <p>
                    Sujit's expertise in preparing students for high-stakes exams has made him a highly respected teacher, 
                    and his commitment to helping each student reach their full potential aligns perfectly with the values 
                    we uphold at Academio.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 bg-linear-to-br from-teal-700 to-[rgb(12,81,79)] p-8 md:p-12 text-white">
                <div className="mb-6">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    <img src={sujitImage} alt="Sujit Kumar" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-center">Sujit Kumar</h3>
                  <p className="text-teal-100 text-center">Co-Founder & Academic Head</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">20+ Years of Teaching Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">BTech from RGPV Bhopal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">MTech from IIT Delhi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm">Expert in IGCSE, IB, IIT-JEE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Vision Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <motion.div 
          {...fadeInUp}
          className="bg-linear-to-r from-slate-100 to-teal-50 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Our Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgb(12,81,79)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[rgb(12,81,79)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Deep Understanding</h3>
              <p className="text-slate-600">
                Through personalized instruction and continuous assessment, we help students develop 
                the skills and confidence they need to succeed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgb(12,81,79)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-[rgb(12,81,79)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Critical Thinking</h3>
              <p className="text-slate-600">
                We equip students with the ability to think independently and solve problems 
                beyond rote memorization.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[rgb(12,81,79)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[rgb(12,81,79)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Lifelong Success</h3>
              <p className="text-slate-600">
                We prepare students not just for exams, but for opportunities and a future 
                they can be confident about.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto">
              Together, we have created Academio with a clear mission: to provide high-quality education that goes 
              beyond rote learning. Through a structured, scientific, and student-centric learning model, we help 
              students consistently meet — and often exceed — the grade benchmarks required for entry into top universities 
              and programmes worldwide.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto mt-4">
              At Academio, we don't just prepare students for exams. We prepare them for opportunities, 
              lifelong curiosity, and a future they can be confident about.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          {...fadeInUp}
          className="bg-linear-to-r from-[rgb(12,81,79)] to-teal-800 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
            We invite you to join us on this journey and look forward to helping your child thrive. 
            Experience the Academio difference today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/enrollment-form'}
            className="bg-white text-[rgb(12,81,79)] px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
