import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ChevronDown, ChevronUp, Atom, FlaskConical, Calculator, 
  Dna, Monitor, TrendingUp, BookOpen, CheckCircle2, Info
} from 'lucide-react';

// Subject data with topics and subtopics
const SUBJECT_DATA = {
  physics: {
    name: "Physics",
    icon: <Atom className="w-8 h-8" />,
    color: "bg-blue-50 text-blue-600",
    description: "Master the fundamental principles of Physics through our comprehensive IGCSE curriculum. Explore mechanics, electricity, waves, and modern physics with expert guidance.",
    topics: [
      {
        title: "Mechanics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Kinematics and motion",
          "Forces and dynamics",
          "Work, energy and power",
          "Momentum and collisions"
        ]
      },
      {
        title: "Electricity and Magnetism",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Electric circuits",
          "Electrical quantities",
          "Magnetic fields",
          "Electromagnetic induction"
        ]
      },
      {
        title: "Waves and Optics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Properties of waves",
          "Light and reflection",
          "Refraction and lenses",
          "Sound waves"
        ]
      },
      {
        title: "Thermal Physics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Temperature and heat",
          "Thermal properties",
          "Gas laws",
          "Heat transfer"
        ]
      }
    ]
  },
  chemistry: {
    name: "Chemistry",
    icon: <FlaskConical className="w-8 h-8" />,
    color: "bg-purple-50 text-purple-600",
    description: "Explore the fascinating world of Chemistry through our IGCSE program. Study atomic structure, chemical reactions, organic chemistry, and practical laboratory techniques.",
    topics: [
      {
        title: "States of Matter",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Solids, liquids, and gases",
          "Kinetic particle theory",
          "Diffusion and Brownian motion",
          "Changes of state"
        ]
      },
      {
        title: "Atomic Structure",
        icon: <Atom className="w-5 h-5" />,
        subtopics: [
          "Atomic models",
          "Subatomic particles",
          "Electronic configuration",
          "Isotopes and relative atomic mass"
        ]
      },
      {
        title: "Chemical Bonding",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Ionic bonding",
          "Covalent bonding",
          "Metallic bonding",
          "Intermolecular forces"
        ]
      },
      {
        title: "Chemical Reactions",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Reaction types",
          "Balancing equations",
          "Rates of reaction",
          "Energy changes"
        ]
      }
    ]
  },
  mathematics: {
    name: "Mathematics",
    icon: <Calculator className="w-8 h-8" />,
    color: "bg-orange-50 text-orange-600",
    description: "Develop strong mathematical foundations with our IGCSE Mathematics curriculum. Cover algebra, geometry, trigonometry, and statistics with problem-solving approaches.",
    topics: [
      {
        title: "Algebra",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Linear equations",
          "Quadratic equations",
          "Inequalities",
          "Polynomials"
        ]
      },
      {
        title: "Geometry",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Angles and lines",
          "Triangles and polygons",
          "Circles",
          "Transformations"
        ]
      },
      {
        title: "Trigonometry",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Trigonometric ratios",
          "Sine and cosine rules",
          "Area calculations",
          "3D trigonometry"
        ]
      },
      {
        title: "Statistics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Data collection",
          "Averages and measures",
          "Probability",
          "Statistical diagrams"
        ]
      }
    ]
  },
  biology: {
    name: "Biology",
    icon: <Dna className="w-8 h-8" />,
    color: "bg-green-50 text-green-600",
    description: "Discover the living world through our IGCSE Biology curriculum. Study cells, genetics, ecology, and human biology with hands-on learning experiences.",
    topics: [
      {
        title: "Cell Biology",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Cell structure",
          "Cell processes",
          "Microscopy",
          "Specialized cells"
        ]
      },
      {
        title: "Genetics",
        icon: <Dna className="w-5 h-5" />,
        subtopics: [
          "DNA and RNA",
          "Mendelian genetics",
          "Inheritance patterns",
          "Variation and selection"
        ]
      },
      {
        title: "Ecology",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Ecosystems",
          "Food chains and webs",
          "Nutrient cycles",
          "Human impact"
        ]
      },
      {
        title: "Human Biology",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Circulatory system",
          "Respiratory system",
          "Digestive system",
          "Nervous system"
        ]
      }
    ]
  },
  "computer-science": {
    name: "Computer Science",
    icon: <Monitor className="w-8 h-8" />,
    color: "bg-indigo-50 text-indigo-600",
    description: "Master computational thinking and programming with our IGCSE Computer Science curriculum. Learn algorithms, data structures, and software development.",
    topics: [
      {
        title: "Programming Fundamentals",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Variables and data types",
          "Control structures",
          "Functions and procedures",
          "Arrays and lists"
        ]
      },
      {
        title: "Algorithms",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Algorithm design",
          "Sorting and searching",
          "Problem-solving strategies",
          "Efficiency analysis"
        ]
      },
      {
        title: "Data Representation",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Binary systems",
          "Data storage",
          "Image and sound representation",
          "Compression techniques"
        ]
      },
      {
        title: "Computer Systems",
        icon: <Monitor className="w-5 h-5" />,
        subtopics: [
          "Hardware components",
          "Operating systems",
          "Networks and internet",
          "Security and ethics"
        ]
      }
    ]
  },
  economics: {
    name: "Economics",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "bg-amber-50 text-amber-600",
    description: "Understand economic principles and their real-world applications through our IGCSE Economics curriculum. Explore microeconomics, macroeconomics, and global trade.",
    topics: [
      {
        title: "Microeconomics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Supply and demand",
          "Market equilibrium",
          "Elasticity",
          "Market structures"
        ]
      },
      {
        title: "Macroeconomics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "GDP and economic growth",
          "Inflation and unemployment",
          "Fiscal policy",
          "Monetary policy"
        ]
      },
      {
        title: "International Economics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Trade and specialization",
          "Exchange rates",
          "Balance of payments",
          "Economic development"
        ]
      },
      {
        title: "Development Economics",
        icon: <Info className="w-5 h-5" />,
        subtopics: [
          "Living standards",
          "Poverty and inequality",
          "Sustainable development",
          "Foreign aid"
        ]
      }
    ]
  }
};

const SubjectDetail = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const subjectData = SUBJECT_DATA[subject];
  
  if (!subjectData) {
    return (
      <div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Subject not found</h1>
          <button 
            onClick={() => navigate('/igcse-courses')}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const toggleTopic = (topicIndex) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicIndex)) {
      newExpanded.delete(topicIndex);
    } else {
      newExpanded.add(topicIndex);
    }
    setExpandedTopics(newExpanded);
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] font-sans selection:bg-teal-200 overflow-x-hidden relative">
      
      {/* Decorative Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-12">
        
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-slate-600 mb-8"
        >
          <Link to="/igcse-courses" className="hover:text-teal-600 transition-colors">
            IGCSE
          </Link>
          <span className="text-slate-400">/</span>
          <span className="hover:text-teal-600 transition-colors cursor-pointer">CLASS 9th</span>
          <span className="text-slate-400">/</span>
          <span className="hover:text-teal-600 transition-colors cursor-pointer">Cambridge International AS & A Level</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">{subjectData.name}</span>
        </motion.div>

        {/* Subject Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate('/igcse-courses')}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Subjects
          </button>
          
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-2xl ${subjectData.color} flex items-center justify-center shrink-0`}>
              {subjectData.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                {subjectData.name}
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                {subjectData.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* What You Will Learn Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-white/60 p-8 md:p-12 shadow-sm"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
            What You Will Learn in {subjectData.name}
          </h2>
          
          <div className="space-y-4">
            {subjectData.topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleTopic(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                      {topic.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-slate-800">{topic.title}</h3>
                      <p className="text-sm text-slate-500">{topic.subtopics.length} Topics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedTopics.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {expandedTopics.has(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 pt-2 border-t border-slate-100">
                        <div className="space-y-3">
                          {topic.subtopics.map((subtopic, subIndex) => (
                            <div key={subIndex} className="flex items-center gap-3 py-2">
                              <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                              <span className="text-slate-700">{subtopic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-linear-to-r from-teal-600 to-emerald-500 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Master {subjectData.name}?
          </h2>
          <p className="text-teal-50 mb-8 max-w-2xl mx-auto">
            Join our comprehensive IGCSE {subjectData.name} program and excel in your exams with expert guidance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/enrollment-form')}
            className="bg-white text-teal-700 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Enroll Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectDetail;
