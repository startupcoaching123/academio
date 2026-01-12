import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronDown, ChevronUp, Atom, FlaskConical, Calculator,
  Dna, Monitor, TrendingUp, BookOpen, CheckCircle2, Info, Type, Cpu, Globe2, Leaf, BriefcaseBusiness
} from 'lucide-react';
import { PiSquareDuotone } from 'react-icons/pi';

// IB MYP Subject Data
export const IB_SUBJECT_DATA = {
  grade6: {
    english: {
      name: "IB MYP English Language & Literature – Class 6",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "IB MYP English Language & Literature – Class 6 develops communication and critical thinking through fiction and non-fiction texts.",
      topics: [
        {
          title: "Reading and Understanding",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Reading and understanding fiction and non-fiction texts",
            "Vocabulary development and language usage",
            "Critical reading and thinking",
            "Language confidence"
          ]
        },
        {
          title: "Writing Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structured writing (paragraphs, short essays, creative writing)",
            "Grammar, sentence structure, and clarity",
            "Communication and expression"
          ]
        },
        {
          title: "Speaking and Listening",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Speaking and listening through discussions and presentations",
            "Oral communication skills",
            "Active listening and response"
          ]
        }
      ]
    },

    mathematics: {
      name: "IB MYP Mathematics – Class 6",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "IB MYP Mathematics – Class 6 develops logical reasoning and mathematical communication through real-world applications.",
      topics: [
        {
          title: "Number Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Number systems and operations",
            "Fractions, decimals, and percentages",
            "Logical reasoning"
          ]
        },
        {
          title: "Algebraic Thinking",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Patterns and basic algebraic thinking",
            "Mathematical communication",
            "Application of concepts"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Geometry: shapes, angles, and measurements",
            "Spatial reasoning"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data handling and simple statistics",
            "Problem-solving using real-life situations"
          ]
        }
      ]
    },

    science: {
      name: "IB MYP Sciences – Class 6 (Integrated Biology, Chemistry & Physics)",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "IB MYP Sciences – Class 6 provides integrated science education through inquiry-based learning and investigation.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Characteristics of living organisms",
            "Human body basics and health",
            "Scientific inquiry and investigation"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Matter and its properties",
            "Observation and experimentation",
            "Connecting science to everyday life"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Energy, forces, light, and sound",
            "Scientific investigation"
          ]
        },
        {
          title: "Environmental Science",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Earth, environment, and sustainability",
            "Real-world scientific applications"
          ]
        }
      ]
    }
  },

  grade7: {
    english: {
      name: "IB MYP English Language & Literature – Class 7",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "IB MYP English Language & Literature – Class 7 deepens conceptual understanding and critical thinking through analysis of diverse texts.",
      topics: [
        {
          title: "Text Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Analysis of fiction and non-fiction texts",
            "Vocabulary expansion and language accuracy",
            "Critical reading and interpretation"
          ]
        },
        {
          title: "Writing Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structured and extended writing (narrative, descriptive, informative)",
            "Grammar refinement and sentence variety",
            "Effective written communication"
          ]
        },
        {
          title: "Oral Communication",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Oral communication through presentations and discussions",
            "Confident expression and articulation",
            "Active listening and response"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Critical reading and interpretation",
            "Effective written and spoken communication",
            "Independent thinking"
          ]
        }
      ]
    },

    mathematics: {
      name: "IB MYP Mathematics – Class 7",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "IB MYP Mathematics – Class 7 strengthens logical reasoning and mathematical communication through advanced concepts.",
      topics: [
        {
          title: "Number Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Number systems and rational numbers",
            "Fractions, decimals, percentages, and ratios",
            "Logical reasoning with numbers"
          ]
        },
        {
          title: "Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Introduction to algebraic expressions and equations",
            "Mathematical communication",
            "Problem-solving with algebra"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Geometry: angles, polygons, perimeter, and area",
            "Spatial reasoning and visualization",
            "Geometric problem solving"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data handling, averages, and basic probability",
            "Real-life problem-solving",
            "Data interpretation and analysis"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Logical reasoning",
            "Mathematical communication",
            "Concept application"
          ]
        }
      ]
    },

    science: {
      name: "IB MYP Sciences – Class 7 (Integrated Biology, Chemistry & Physics)",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "IB MYP Sciences – Class 7 provides integrated science education with emphasis on scientific inquiry and experimentation.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cells and tissues",
            "Nutrition and digestion",
            "Plant systems and reproduction",
            "Scientific inquiry in biology"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Particle theory of matter",
            "Physical and chemical changes",
            "Acids, bases, and simple reactions",
            "Experimental chemistry"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Forces and motion",
            "Energy forms and transfers",
            "Light and sound",
            "Physics investigations"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Scientific inquiry and experimentation",
            "Data analysis and observation",
            "Understanding scientific concepts in real-world contexts"
          ]
        }
      ]
    }
  },

  grade8: {
    english: {
      name: "IB MYP English Language & Literature – Class 8",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "IB MYP English Language & Literature – Class 8 strengthens analytical thinking and independent learning through complex text analysis.",
      topics: [
        {
          title: "Advanced Text Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Study and analysis of complex fiction and non-fiction texts",
            "Development of critical reading and interpretation skills",
            "Literary analysis techniques"
          ]
        },
        {
          title: "Extended Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Extended writing: essays, reports, and creative responses",
            "Refinement of grammar, vocabulary, and writing style",
            "Academic writing skills"
          ]
        },
        {
          title: "Oral Communication",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Oral communication through structured discussions and presentations",
            "Advanced articulation skills",
            "Critical discourse and debate"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Analytical and critical thinking",
            "Clear and effective communication",
            "Independent expression"
          ]
        }
      ]
    },

    mathematics: {
      name: "IB MYP Mathematics – Class 8",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "IB MYP Mathematics – Class 8 builds strong conceptual foundations through advanced mathematical concepts and applications.",
      topics: [
        {
          title: "Advanced Number Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Rational numbers and real-number concepts",
            "Advanced fractions, percentages, and ratios",
            "Mathematical reasoning and proof"
          ]
        },
        {
          title: "Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algebra: linear equations and expressions",
            "Mathematical modelling",
            "Advanced problem solving"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Geometry: polygons, angles, circles, and mensuration",
            "Advanced spatial reasoning",
            "Geometric proofs and constructions"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data handling, statistics, and probability (introductory)",
            "Application-based problem solving",
            "Statistical analysis and interpretation"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Logical reasoning and accuracy",
            "Mathematical modelling",
            "Conceptual understanding"
          ]
        }
      ]
    },

    science: {
      name: "IB MYP Sciences – Class 8 (Integrated Biology, Chemistry & Physics)",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "IB MYP Sciences – Class 8 prepares students for higher MYP years through advanced scientific concepts and investigations.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cell structure and functions",
            "Human body systems",
            "Microorganisms and health",
            "Advanced biological investigations"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atomic structure (introductory)",
            "Chemical reactions and equations",
            "Acids, bases, and salts",
            "Quantitative chemistry basics"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Motion and forces",
            "Energy and heat",
            "Electricity and magnetism (foundations)",
            "Advanced physics investigations"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Scientific inquiry and investigation",
            "Experimental and analytical skills",
            "Real-world application of scientific concepts"
          ]
        }
      ]
    }
  },

  grade9: {
    english: {
      name: "IB MYP English Language & Literature – Class 9",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "IB MYP English Language & Literature – Class 9 builds conceptual depth through critical analysis and academic writing.",
      topics: [
        {
          title: "Text Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Critical analysis of literary and non-literary texts",
            "Comparative reading and interpretation",
            "Literary analysis techniques"
          ]
        },
        {
          title: "Writing Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structured academic and analytical writing",
            "Creative and reflective writing",
            "Advanced grammar and vocabulary"
          ]
        },
        {
          title: "Oral Communication",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Oral presentations and discussions",
            "Confident communication skills",
            "Critical discourse and debate"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Critical thinking",
            "Academic writing",
            "Confident communication"
          ]
        }
      ]
    },

    mathematics: {
      name: "IB MYP Mathematics – Class 9",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "IB MYP Mathematics – Class 9 develops advanced mathematical reasoning and problem-solving skills.",
      topics: [
        {
          title: "Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algebraic expressions, equations, and functions",
            "Mathematical modelling and applications",
            "Advanced problem solving"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Geometry and trigonometry foundations",
            "Spatial reasoning and proofs",
            "Geometric applications"
          ]
        },
        {
          title: "Statistics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Statistics and probability",
            "Data analysis and interpretation",
            "Statistical reasoning"
          ]
        },
        {
          title: "Number Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Number systems and proportional reasoning",
            "Mathematical communication",
            "Logical reasoning"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Logical reasoning",
            "Problem-solving skills",
            "Mathematical communication"
          ]
        }
      ]
    },

    science: {
      name: "IB MYP Sciences – Class 9 (Integrated Biology, Chemistry & Physics)",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "IB MYP Sciences – Class 9 provides advanced integrated science education with emphasis on scientific inquiry.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cell biology and genetics (introductory)",
            "Human body systems",
            "Advanced biological investigations"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atomic structure and bonding",
            "Chemical reactions and energy changes",
            "Quantitative chemistry"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Motion, forces, and energy",
            "Electricity and magnetism (introductory)",
            "Advanced physics investigations"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Scientific inquiry",
            "Data analysis",
            "Real-world application of science"
          ]
        }
      ]
    }
  },

  grade10: {
    english: {
      name: "IB MYP English Language & Literature – Class 10",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "IB MYP English Language & Literature – Class 10 completes MYP with advanced analytical and communication skills.",
      topics: [
        {
          title: "Advanced Text Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "In-depth analysis of complex texts",
            "Evaluation and interpretation of themes and ideas",
            "Advanced literary criticism"
          ]
        },
        {
          title: "Advanced Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced academic and essay writing",
            "Reflective and personal responses",
            "Professional writing skills"
          ]
        },
        {
          title: "Oral Communication",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Oral presentations and discussions",
            "Advanced articulation and debate",
            "Professional communication"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Analytical and evaluative thinking",
            "Advanced writing skills",
            "Effective communication"
          ]
        }
      ]
    },

    mathematics: {
      name: "IB MYP Mathematics – Class 10",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "IB MYP Mathematics – Class 10 prepares students for IB DP with advanced mathematical concepts.",
      topics: [
        {
          title: "Advanced Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced algebra and functions",
            "Mathematical reasoning and modelling",
            "Complex problem solving"
          ]
        },
        {
          title: "Advanced Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Geometry and trigonometry applications",
            "Advanced geometric proofs",
            "Mathematical visualization"
          ]
        },
        {
          title: "Statistics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Statistics and probability",
            "Advanced data analysis",
            "Statistical modelling"
          ]
        },
        {
          title: "Mathematical Applications",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Problem-solving in real-world contexts",
            "Mathematical research skills",
            "Independent mathematical inquiry"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Logical and abstract thinking",
            "Mathematical precision",
            "Independent problem-solving"
          ]
        }
      ]
    },

    science: {
      name: "IB MYP Sciences – Class 10 (Integrated Biology, Chemistry & Physics)",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "IB MYP Sciences – Class 10 completes MYP science education, preparing students for IB DP sciences.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Genetics and inheritance",
            "Ecology and environmental systems",
            "Advanced biological research"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Chemical reactions and equations",
            "Acids, bases, and energy transformations",
            "Advanced chemical analysis"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Forces and motion",
            "Electricity, magnetism, and waves",
            "Advanced physics investigations"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Experimental and investigative skills",
            "Scientific evaluation",
            "Application of scientific concepts"
          ]
        }
      ]
    }
  },

  grade11: {
    mathematics: {
      name: "IB DP Mathematics: Analysis & Approaches – Class 11",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "IB DP Mathematics: Analysis & Approaches – Class 11 builds strong foundations for mathematical analysis and reasoning.",
      topics: [
        {
          title: "Algebra and Functions",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algebra and functions",
            "Mathematical reasoning",
            "Function analysis"
          ]
        },
        {
          title: "Trigonometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Trigonometry",
            "Trigonometric functions and identities",
            "Applications of trigonometry"
          ]
        },
        {
          title: "Calculus Introduction",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Introduction to calculus",
            "Limits and derivatives",
            "Basic integration"
          ]
        },
        {
          title: "Statistics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Probability and statistics",
            "Statistical analysis",
            "Data interpretation"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Mathematical reasoning",
            "Analytical thinking",
            "Problem-solving skills"
          ]
        }
      ]
    },

    physics: {
      name: "IB DP Physics – Class 11",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "IB DP Physics – Class 11 introduces fundamental physics concepts with emphasis on experimental skills.",
      topics: [
        {
          title: "Measurements",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Measurements and uncertainties",
            "Experimental techniques",
            "Data analysis"
          ]
        },
        {
          title: "Mechanics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Mechanics and thermal physics",
            "Forces and motion",
            "Energy and momentum"
          ]
        },
        {
          title: "Waves and Electricity",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Waves and electricity",
            "Wave phenomena",
            "Electric circuits"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Experimental and practical skills",
            "Scientific reasoning",
            "Problem-solving in physics"
          ]
        }
      ]
    },

    chemistry: {
      name: "IB DP Chemistry – Class 11",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
      description: "IB DP Chemistry – Class 11 builds foundational understanding of chemical principles and experimental techniques.",
      topics: [
        {
          title: "Atomic Structure",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atomic structure and bonding",
            "Periodic trends",
            "Chemical bonding"
          ]
        },
        {
          title: "Quantitative Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Stoichiometry",
            "Mole concept",
            "Chemical calculations"
          ]
        },
        {
          title: "Physical Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Energetics and kinetics",
            "Chemical equilibrium",
            "Reaction rates"
          ]
        },
        {
          title: "Organic Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Introduction to organic chemistry",
            "Hydrocarbons",
            "Basic organic reactions"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Experimental skills",
            "Chemical analysis",
            "Scientific reasoning"
          ]
        }
      ]
    },

    biology: {
      name: "IB DP Biology – Class 11",
      icon: <Dna className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      description: "IB DP Biology – Class 11 introduces molecular biology and genetics with emphasis on practical investigations.",
      topics: [
        {
          title: "Cell Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cell biology",
            "Cell structure and function",
            "Cellular processes"
          ]
        },
        {
          title: "Molecular Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Molecular biology",
            "DNA and RNA",
            "Protein synthesis"
          ]
        },
        {
          title: "Genetics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Introduction to genetics",
            "Heredity and variation",
            "Genetic engineering"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Practical investigations",
            "Biological analysis",
            "Scientific methodology"
          ]
        }
      ]
    },

    economics: {
      name: "IB DP Economics – Class 11",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-orange-50 text-orange-600",
      description: "IB DP Economics – Class 11 introduces microeconomic principles and economic analysis skills.",
      topics: [
        {
          title: "Microeconomics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Introduction to microeconomics",
            "Demand, supply, and elasticity",
            "Market structures"
          ]
        },
        {
          title: "Economic Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Economic analysis skills",
            "Market equilibrium",
            "Government intervention"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Economic reasoning",
            "Analytical skills",
            "Critical thinking"
          ]
        }
      ]
    },

    computerScience: {
      name: "IB DP Computer Science – Class 11",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-violet-50 text-violet-600",
      description: "IB DP Computer Science – Class 11 introduces computational thinking and programming fundamentals.",
      topics: [
        {
          title: "Computational Thinking",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Computational thinking",
            "Algorithmic problem solving",
            "Logical reasoning"
          ]
        },
        {
          title: "Programming",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Programming fundamentals",
            "Data structures",
            "Algorithm implementation"
          ]
        },
        {
          title: "Computer Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Computer systems",
            "Hardware and software",
            "Network fundamentals"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Programming skills",
            "Problem-solving",
            "System design"
          ]
        }
      ]
    }
  },

  grade12: {
    mathematics: {
      name: "IB DP Mathematics: Analysis & Approaches – Class 12",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "IB DP Mathematics: Analysis & Approaches – Class 12 completes the DP with advanced calculus, mathematical proof, and exam preparation.",
      topics: [
        {
          title: "Advanced Calculus",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced calculus",
            "Trigonometric applications",
            "Mathematical proof and reasoning"
          ]
        },
        {
          title: "Probability and Statistics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Probability distributions",
            "Statistical inference",
            "Advanced data analysis"
          ]
        },
        {
          title: "Mathematical Applications",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Mathematical modelling",
            "Problem-solving techniques",
            "Exam preparation strategies"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced mathematical reasoning",
            "Analytical thinking",
            "Problem-solving expertise"
          ]
        }
      ]
    },

    mathematicsAI: {
      name: "IB DP Mathematics: Applications & Interpretation – Class 12",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "IB DP Mathematics: Applications & Interpretation – Class 12 focuses on real-world applications and data-driven problem solving.",
      topics: [
        {
          title: "Advanced Modelling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced modelling techniques",
            "Statistical inference",
            "Financial and real-world mathematics"
          ]
        },
        {
          title: "Data Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data-driven problem solving",
            "Statistical applications",
            "Mathematical technology"
          ]
        },
        {
          title: "Applied Mathematics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Real-world applications",
            "Mathematical investigation",
            "Project work"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Applied mathematical thinking",
            "Data analysis skills",
            "Problem-solving in context"
          ]
        }
      ]
    },

    physics: {
      name: "IB DP Physics – Class 12",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "IB DP Physics – Class 12 completes DP Physics with advanced topics and experimental analysis.",
      topics: [
        {
          title: "Advanced Mechanics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Circular motion and gravitation",
            "Advanced mechanics applications",
            "Energy and momentum"
          ]
        },
        {
          title: "Fields and Electromagnetism",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electric and magnetic fields",
            "Electromagnetic induction",
            "Field applications"
          ]
        },
        {
          title: "Modern Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Nuclear and quantum physics",
            "Atomic structure",
            "Particle physics"
          ]
        },
        {
          title: "Experimental Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced experimental analysis",
            "Data processing",
            "Uncertainty analysis"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced problem-solving",
            "Experimental expertise",
            "Scientific reasoning"
          ]
        }
      ]
    },

    chemistry: {
      name: "IB DP Chemistry – Class 12",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
      description: "IB DP Chemistry – Class 12 completes DP Chemistry with advanced topics and analytical techniques.",
      topics: [
        {
          title: "Physical Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Chemical equilibrium",
            "Electrochemistry",
            "Advanced thermodynamics"
          ]
        },
        {
          title: "Organic Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced organic chemistry",
            "Reaction mechanisms",
            "Synthesis pathways"
          ]
        },
        {
          title: "Analytical Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Analytical techniques",
            "Spectroscopy",
            "Chromatography"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced laboratory skills",
            "Chemical analysis",
            "Scientific investigation"
          ]
        }
      ]
    },

    biology: {
      name: "IB DP Biology – Class 12",
      icon: <Dna className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      description: "IB DP Biology – Class 12 completes DP Biology with advanced topics and data-based evaluation.",
      topics: [
        {
          title: "Advanced Genetics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Genetics and evolution",
            "Population genetics",
            "Evolutionary mechanisms"
          ]
        },
        {
          title: "Human Physiology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Human physiology",
            "Advanced body systems",
            "Homeostasis"
          ]
        },
        {
          title: "Ecology and Environment",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Ecology and sustainability",
            "Conservation biology",
            "Environmental impact"
          ]
        },
        {
          title: "Data-Based Evaluation",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data-based scientific evaluation",
            "Statistical analysis in biology",
            "Research methodology"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced biological analysis",
            "Research skills",
            "Scientific communication"
          ]
        }
      ]
    },

    economics: {
      name: "IB DP Economics – Class 12",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-orange-50 text-orange-600",
      description: "IB DP Economics – Class 12 completes DP Economics with macroeconomic theory and policy evaluation.",
      topics: [
        {
          title: "Macroeconomic Theory",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Macroeconomic theory",
            "Economic models",
            "Policy analysis"
          ]
        },
        {
          title: "International Economics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "International trade",
            "Exchange rates",
            "Balance of payments"
          ]
        },
        {
          title: "Development Economics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Development economics",
            "Growth strategies",
            "Economic development indicators"
          ]
        },
        {
          title: "Policy Evaluation",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Policy evaluation and case studies",
            "Economic policy analysis",
            "Real-world applications"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Economic analysis",
            "Policy evaluation",
            "Critical thinking"
          ]
        }
      ]
    },

    computerScience: {
      name: "IB DP Computer Science – Class 12",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-violet-50 text-violet-600",
      description: "IB DP Computer Science – Class 12 completes DP Computer Science with advanced programming and system design.",
      topics: [
        {
          title: "Advanced Programming",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data structures and algorithms",
            "Advanced programming concepts",
            "Software development"
          ]
        },
        {
          title: "System Design",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Databases and system design",
            "Network systems",
            "Computational problem solving"
          ]
        },
        {
          title: "Computational Thinking",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced computational thinking",
            "Algorithm optimization",
            "System analysis"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced programming skills",
            "System design expertise",
            "Computational problem-solving"
          ]
        }
      ]
    },

    ibCore: {
      name: "IB DP Core – Class 12 Completion",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-amber-50 text-amber-600",
      description: "IB DP Core – Class 12 completes the core requirements with essay submission and assessment refinement.",
      topics: [
        {
          title: "Theory of Knowledge (TOK)",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Essay and exhibition completion",
            "Knowledge questions exploration",
            "Critical reflection on knowledge"
          ]
        },
        {
          title: "Extended Essay (EE)",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Research writing and final submission",
            "Academic research skills",
            "Independent investigation"
          ]
        },
        {
          title: "Internal Assessments (IA)",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Completion and refinement",
            "Subject-specific investigations",
            "Assessment criteria mastery"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Academic research skills",
            "Critical thinking",
            "Independent learning"
          ]
        }
      ]
    }
  }
};

// Cambridge IGCSE Subject Data
export const CAMBRIDGE_SUBJECT_DATA = {
  grade6: {
    english: {
      name: "English",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Cambridge Lower Secondary English develops strong reading, writing, speaking and listening skills through concept-based learning and interactive discussions.",
      topics: [
        {
          title: "Reading",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Fiction and non-fiction texts",
            "Comprehension and interpretation",
            "Vocabulary development"
          ]
        },
        {
          title: "Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Paragraph writing",
            "Story writing",
            "Descriptive and factual writing",
            "Grammar and sentence structure"
          ]
        },
        {
          title: "Speaking & Listening",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Presentations",
            "Group discussions",
            "Expressing ideas confidently"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Communication skills",
            "Creative thinking",
            "Language accuracy & fluency"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Cambridge Lower Secondary Mathematics builds numerical fluency and logical thinking through real-life applications and problem-solving.",
      topics: [
        {
          title: "Number Operations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Number operations (integers, fractions, decimals, percentages)",
            "Ratios and basic proportions"
          ]
        },
        {
          title: "Introduction to Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Introduction to algebra (expressions, simple equations)"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Geometry (angles, triangles, quadrilaterals, symmetry)"
          ]
        },
        {
          title: "Measurement",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Measurement (perimeter, area, volume)"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data handling (tables, bar graphs, pie charts)"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Numerical fluency",
            "Logical thinking",
            "Real-life application of maths"
          ]
        }
      ]
    },

    science: {
      name: "Science",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Cambridge Lower Secondary Science develops scientific inquiry and observation skills through Biology, Chemistry, and Physics exploration.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Living organisms and life processes",
            "Cells and basic human body systems",
            "Plants and animals",
            "Environment and ecosystems"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "States of matter",
            "Changes (physical & chemical)",
            "Simple properties of materials",
            "Introduction to elements and compounds"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Forces and motion",
            "Light and sound",
            "Energy and electricity (basic concepts)",
            "Earth and space"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Scientific inquiry",
            "Observation & experimentation",
            "Understanding science in daily life"
          ]
        }
      ]
    }
  },

  grade7: {
    english: {
      name: "English",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Cambridge Lower Secondary English develops analytical reading, structured writing, and confident communication through diverse texts and interactive learning.",
      topics: [
        {
          title: "Reading",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Diverse fiction and non-fiction texts",
            "Analytical reading and inference",
            "Vocabulary enrichment"
          ]
        },
        {
          title: "Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structured paragraphs and essays",
            "Narrative and descriptive writing",
            "Informative and persuasive writing",
            "Grammar, punctuation, and sentence variety"
          ]
        },
        {
          title: "Speaking & Listening",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Group discussions and debates",
            "Oral presentations",
            "Active listening and response skills"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Clear communication",
            "Creative and critical thinking",
            "Language confidence"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Cambridge Lower Secondary Mathematics builds logical reasoning and application-based thinking through real-life problem-solving scenarios.",
      topics: [
        {
          title: "Number Operations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Integers, fractions, decimals, and percentages",
            "Ratio, proportion, and basic financial maths"
          ]
        },
        {
          title: "Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algebraic expressions and simple equations"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Angles, polygons, circles, symmetry"
          ]
        },
        {
          title: "Measurement",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Area, volume, and units"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Averages, graphs, and interpretation"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Logical reasoning",
            "Mathematical accuracy",
            "Application-based thinking"
          ]
        }
      ]
    },

    science: {
      name: "Science",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Cambridge Lower Secondary Science develops scientific investigation and critical observation through Biology, Chemistry, and Physics exploration.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cells, tissues, and organ systems",
            "Reproduction in plants and animals",
            "Nutrition and digestion",
            "Ecosystems and environmental balance"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Particle model of matter",
            "Elements, compounds, and mixtures",
            "Acids, bases, and simple reactions",
            "Separation techniques"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Forces, motion, and pressure",
            "Energy forms and transfers",
            "Light, reflection, and refraction",
            "Sound and wave properties"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Scientific investigation",
            "Critical observation",
            "Understanding cause and effect"
          ]
        }
      ]
    }
  },

  grade8: {
    english: {
      name: "English",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Cambridge Lower Secondary English develops fluent communication, critical expression, and academic writing readiness through complex texts and structured learning.",
      topics: [
        {
          title: "Reading",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Complex fiction and non-fiction texts",
            "Critical reading and inference",
            "Vocabulary expansion and contextual understanding"
          ]
        },
        {
          title: "Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structured essays and extended writing",
            "Narrative, descriptive, and argumentative writing",
            "Formal letters and reports",
            "Grammar accuracy and style improvement"
          ]
        },
        {
          title: "Speaking & Listening",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structured discussions and debates",
            "Presentations and public speaking",
            "Listening for detail and interpretation"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Fluent communication",
            "Critical and creative expression",
            "Academic writing readiness"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Cambridge Lower Secondary Mathematics develops algebraic thinking and analytical skills through real-world applications and multi-step problem-solving.",
      topics: [
        {
          title: "Number Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Rational and irrational numbers",
            "Advanced fractions, decimals, percentages"
          ]
        },
        {
          title: "Ratio and Financial Mathematics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Ratio, proportion, and financial mathematics"
          ]
        },
        {
          title: "Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Expressions, equations, linear graphs"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Triangles, quadrilaterals, circles"
          ]
        },
        {
          title: "Mensuration",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Surface area and volume"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Statistics, probability basics"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algebraic thinking",
            "Logical and analytical skills",
            "Real-world application of mathematics"
          ]
        }
      ]
    },

    science: {
      name: "Science",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Cambridge Lower Secondary Science develops experimental and investigative skills through Biology, Chemistry, and Physics exploration with real-world applications.",
      topics: [
        {
          title: "Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cell structure and functions",
            "Photosynthesis and respiration",
            "Human body systems",
            "Microorganisms and health"
          ]
        },
        {
          title: "Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atomic structure and periodic trends (introductory)",
            "Chemical reactions and equations",
            "Acids, bases, and salts",
            "Metals and non-metals",
            "Separation techniques"
          ]
        },
        {
          title: "Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Motion and forces",
            "Pressure in liquids and gases",
            "Heat and temperature",
            "Light and optics",
            "Electricity and magnetism (foundations)"
          ]
        },
        {
          title: "Skills Developed",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Experimental and investigative skills",
            "Scientific reasoning",
            "Application of concepts to real life"
          ]
        }
      ]
    }
  },

  grade9: {
    mathematics: {
      name: "Cambridge IGCSE Mathematics – 0580",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Cambridge IGCSE Mathematics – 0580 develops numerical fluency, algebraic thinking, and problem-solving skills through concept-based learning.",
      topics: [
        {
          title: "Number Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Number systems and calculations"
          ]
        },
        {
          title: "Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algebraic expressions and equations"
          ]
        },
        {
          title: "Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Geometry and mensuration"
          ]
        },
        {
          title: "Trigonometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Trigonometry (foundations)"
          ]
        },
        {
          title: "Statistics & Probability",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Statistics and probability"
          ]
        },
        {
          title: "Problem Solving",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Problem-solving and logical reasoning"
          ]
        }
      ]
    },

    physics: {
      name: "Cambridge IGCSE Physics – 0625",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "Cambridge IGCSE Physics – 0625 explores the fundamental laws governing the physical world through theoretical study and practical experimentation.",
      topics: [
        {
          title: "Motion, Forces & Energy",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Motion, forces, and energy"
          ]
        },
        {
          title: "Thermal Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Thermal physics"
          ]
        },
        {
          title: "Waves",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Waves (light and sound)"
          ]
        },
        {
          title: "Electricity & Magnetism",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electricity and magnetism"
          ]
        },
        {
          title: "Atomic Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atomic physics"
          ]
        },
        {
          title: "Practical Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Experimental and practical skills"
          ]
        }
      ]
    },

    chemistry: {
      name: "Cambridge IGCSE Chemistry – 0620",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-rose-50 text-rose-600",
      description: "Cambridge IGCSE Chemistry – 0620 investigates the composition, behavior and properties of matter through theoretical concepts and practical experiments.",
      topics: [
        {
          title: "States of Matter",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "States of matter"
          ]
        },
        {
          title: "Atomic Structure",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atomic structure and bonding"
          ]
        },
        {
          title: "Chemical Reactions",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Chemical reactions and equations"
          ]
        },
        {
          title: "Acids, Bases & Salts",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Acids, bases, and salts"
          ]
        },
        {
          title: "Metals",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Metals and extraction"
          ]
        },
        {
          title: "Organic Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Organic chemistry (introductory)"
          ]
        }
      ]
    },

    biology: {
      name: "Cambridge IGCSE Biology – 0610",
      icon: <Dna className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      description: "Cambridge IGCSE Biology – 0610 explores living organisms, life processes and the natural world through scientific investigation.",
      topics: [
        {
          title: "Cell Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cell biology"
          ]
        },
        {
          title: "Physiology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Plant and animal physiology"
          ]
        },
        {
          title: "Human Biology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Human body systems"
          ]
        },
        {
          title: "Genetics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Genetics and variation"
          ]
        },
        {
          title: "Ecology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Ecology and environment"
          ]
        }
      ]
    },

    englishFirstLanguage: {
      name: "Cambridge IGCSE English First Language – 0500",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Cambridge IGCSE English First Language – 0500 develops advanced reading, writing and communication skills for academic and professional success.",
      topics: [
        {
          title: "Reading Comprehension",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Reading comprehension"
          ]
        },
        {
          title: "Writing Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Summary and directed writing",
            "Narrative and descriptive writing"
          ]
        },
        {
          title: "Language Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Language analysis and accuracy"
          ]
        }
      ]
    },

    hindiSecondLanguage: {
      name: "Cambridge IGCSE Hindi as a Second Language – 0549",
      icon: <Type className="w-8 h-8" />,
      color: "bg-orange-50 text-orange-600",
      description: "Cambridge IGCSE Hindi as a Second Language – 0549 develops proficiency in Hindi through comprehensive language skills development.",
      topics: [
        {
          title: "Comprehension",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Reading and listening comprehension"
          ]
        },
        {
          title: "Writing & Grammar",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Writing and grammar"
          ]
        },
        {
          title: "Communication",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Everyday communication skills"
          ]
        }
      ]
    },

    economics: {
      name: "Cambridge IGCSE Economics – 0455",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-cyan-50 text-cyan-600",
      description: "Cambridge IGCSE Economics – 0455 introduces fundamental economic concepts and their application to real-world scenarios.",
      topics: [
        {
          title: "Basic Economics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Basic economic concepts"
          ]
        },
        {
          title: "Microeconomics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Demand and supply",
            "Market structures"
          ]
        },
        {
          title: "Macroeconomics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "National and international economics"
          ]
        }
      ]
    },

    businessStudies: {
      name: "Cambridge IGCSE Business Studies – 0450",
      icon: <BriefcaseBusiness className="w-8 h-8" />,
      color: "bg-slate-50 text-slate-600",
      description: "Cambridge IGCSE Business Studies – 0450 examines business activity, organization and decision-making in the modern economy.",
      topics: [
        {
          title: "Business Activity",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Business activity and organisation"
          ]
        },
        {
          title: "Business Functions",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Marketing, finance, and operations"
          ]
        },
        {
          title: "People in Business",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Human resources"
          ]
        },
        {
          title: "Decision Making",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Business decision-making"
          ]
        }
      ]
    },

    history: {
      name: "Cambridge IGCSE History – 0470",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-brown-50 text-brown-600",
      description: "Cambridge IGCSE History – 0470 explores significant historical events and developments through source analysis and critical evaluation.",
      topics: [
        {
          title: "International Relations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "International relations"
          ]
        },
        {
          title: "World History",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "World history themes"
          ]
        },
        {
          title: "Source Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Source-based analysis"
          ]
        }
      ]
    },

    computerScience: {
      name: "Cambridge IGCSE Computer Science – 0478",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-violet-50 text-violet-600",
      description: "Cambridge IGCSE Computer Science – 0478 introduces computational thinking, programming and problem-solving in the digital age.",
      topics: [
        {
          title: "Data Representation",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data representation"
          ]
        },
        {
          title: "Hardware & Software",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Hardware and software"
          ]
        },
        {
          title: "Programming",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Programming concepts"
          ]
        },
        {
          title: "Algorithms",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algorithms and problem-solving"
          ]
        }
      ]
    },

    ict: {
      name: "Cambridge IGCSE ICT – 0417",
      icon: <Monitor className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Cambridge IGCSE ICT – 0417 develops practical digital skills for communication, data handling and web authoring.",
      topics: [
        {
          title: "Digital Communication",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Digital communication"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data handling"
          ]
        },
        {
          title: "Web Authoring",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Web authoring"
          ]
        },
        {
          title: "Practical Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Practical ICT skills"
          ]
        }
      ]
    }
  },

  grade10: {
    mathematics: {
      name: "Cambridge IGCSE Mathematics – 0580",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Cambridge IGCSE Mathematics – 0580 completes the two-year IGCSE Mathematics course with exam-focused preparation.",
      topics: []
    },

    additionalMathematics: {
      name: "Cambridge IGCSE Additional Mathematics – 0606",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
      description: "Cambridge IGCSE Additional Mathematics – 0606 provides advanced mathematical challenges for high-achieving students.",
      topics: []
    },

    internationalMathematics: {
      name: "Cambridge IGCSE International Mathematics – 0607",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Cambridge IGCSE International Mathematics – 0607 emphasizes mathematical modelling and technology integration.",
      topics: []
    },

    physics: {
      name: "Cambridge IGCSE Physics – 0625",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "Cambridge IGCSE Physics – 0625 completes the study of physical laws with practical experimentation and exam preparation.",
      topics: []
    },

    chemistry: {
      name: "Cambridge IGCSE Chemistry – 0620",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-rose-50 text-rose-600",
      description: "Cambridge IGCSE Chemistry – 0620 completes the study of matter, reactions, and chemical principles with practical investigation.",
      topics: []
    },

    biology: {
      name: "Cambridge IGCSE Biology – 0610",
      icon: <Dna className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      description: "Cambridge IGCSE Biology – 0610 completes the study of living organisms and life processes with exam-focused preparation.",
      topics: []
    },

    englishFirstLanguage: {
      name: "Cambridge IGCSE English First Language – 0500",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Cambridge IGCSE English First Language – 0500 completes the two-year course with advanced reading and writing skills.",
      topics: []
    },

    englishLiterature: {
      name: "Cambridge IGCSE English Literature – 0475",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-amber-50 text-amber-600",
      description: "Cambridge IGCSE English Literature – 0475 explores literary works through critical analysis and creative response.",
      topics: []
    },

    hindiSecondLanguage: {
      name: "Cambridge IGCSE Hindi as a Second Language – 0549",
      icon: <Type className="w-8 h-8" />,
      color: "bg-orange-50 text-orange-600",
      description: "Cambridge IGCSE Hindi as a Second Language – 0549 develops proficiency in Hindi through comprehensive language skills.",
      topics: []
    },

    economics: {
      name: "Cambridge IGCSE Economics – 0455",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-cyan-50 text-cyan-600",
      description: "Cambridge IGCSE Economics – 0455 completes the study of economic concepts and their real-world applications.",
      topics: []
    },

    businessStudies: {
      name: "Cambridge IGCSE Business Studies – 0450",
      icon: <BriefcaseBusiness className="w-8 h-8" />,
      color: "bg-slate-50 text-slate-600",
      description: "Cambridge IGCSE Business Studies – 0450 completes the examination of business activity and decision-making.",
      topics: []
    },

    history: {
      name: "Cambridge IGCSE History – 0470",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-brown-50 text-brown-600",
      description: "Cambridge IGCSE History – 0470 completes the study of significant historical events through source analysis.",
      topics: []
    },

    computerScience: {
      name: "Cambridge IGCSE Computer Science – 0478",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-violet-50 text-violet-600",
      description: "Cambridge IGCSE Computer Science – 0478 completes computational thinking and programming studies.",
      topics: []
    },

    ict: {
      name: "Cambridge IGCSE ICT – 0417",
      icon: <Monitor className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Cambridge IGCSE ICT – 0417 completes practical digital skills for communication and data handling.",
      topics: []
    }
  },

  grade11: {
    mathematics: {
      name: "Cambridge AS Level Mathematics – 9709",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Cambridge AS Level Mathematics – 9709 builds advanced mathematical knowledge and analytical skills for university pathways.",
      topics: [
        {
          title: "Algebra and Functions",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algebra and functions"
          ]
        },
        {
          title: "Coordinate Geometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Coordinate geometry"
          ]
        },
        {
          title: "Trigonometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Trigonometry"
          ]
        },
        {
          title: "Exponentials and Logarithms",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Exponentials and logarithms"
          ]
        },
        {
          title: "Probability and Statistics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Probability and statistics"
          ]
        },
        {
          title: "Mechanics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Mechanics (introductory)"
          ]
        }
      ]
    },

    physics: {
      name: "Cambridge AS Level Physics – 9702",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "Cambridge AS Level Physics – 9702 provides advanced understanding of physical principles and experimental skills.",
      topics: [
        {
          title: "Physical Quantities",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Physical quantities and units"
          ]
        },
        {
          title: "Kinematics and Dynamics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Kinematics and dynamics"
          ]
        },
        {
          title: "Forces and Energy",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Forces, work, energy, and power"
          ]
        },
        {
          title: "Waves",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Waves and superposition"
          ]
        },
        {
          title: "Electricity",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electricity and basic circuits"
          ]
        }
      ]
    },

    chemistry: {
      name: "Cambridge AS Level Chemistry – 9701",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-rose-50 text-rose-600",
      description: "Cambridge AS Level Chemistry – 9701 develops advanced chemical knowledge and practical laboratory skills.",
      topics: [
        {
          title: "Atomic Structure",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atomic structure and bonding"
          ]
        },
        {
          title: "Stoichiometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Stoichiometry"
          ]
        },
        {
          title: "States of Matter",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "States of matter"
          ]
        },
        {
          title: "Energetics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Energetics"
          ]
        },
        {
          title: "Organic Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Introduction to organic chemistry"
          ]
        },
        {
          title: "Practical Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Practical and experimental skills"
          ]
        }
      ]
    },

    economics: {
      name: "Cambridge AS Level Economics – 9708",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-cyan-50 text-cyan-600",
      description: "Cambridge AS Level Economics – 9708 provides advanced economic analysis and understanding of market mechanisms.",
      topics: [
        {
          title: "Basic Economic Concepts",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Basic economic concepts"
          ]
        },
        {
          title: "Supply and Demand",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Demand and supply analysis"
          ]
        },
        {
          title: "Elasticity",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Elasticity"
          ]
        },
        {
          title: "Market Structures",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Market structures"
          ]
        },
        {
          title: "Government Intervention",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Government intervention"
          ]
        }
      ]
    },

    computerScience: {
      name: "Cambridge AS Level Computer Science – 9618",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-violet-50 text-violet-600",
      description: "Cambridge AS Level Computer Science – 9618 develops advanced computational thinking and programming expertise.",
      topics: [
        {
          title: "Data Representation",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data representation"
          ]
        },
        {
          title: "Hardware and Software",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Computer hardware and software"
          ]
        },
        {
          title: "Programming Concepts",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Programming concepts"
          ]
        },
        {
          title: "Algorithms",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algorithms and problem-solving"
          ]
        }
      ]
    }
  },

  grade12: {
    mathematics: {
      name: "Cambridge A Level Mathematics – 9709",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Cambridge A Level Mathematics – 9709 builds on AS Level knowledge with depth, evaluation, and advanced application for top global universities.",
      topics: [
        {
          title: "Advanced Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced algebra and functions"
          ]
        },
        {
          title: "Trigonometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Trigonometric identities and equations"
          ]
        },
        {
          title: "Calculus",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Calculus: differentiation and integration"
          ]
        },
        {
          title: "Advanced Statistics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced probability and statistics"
          ]
        },
        {
          title: "Mechanics Applications",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Mechanics applications"
          ]
        }
      ]
    },

    furtherMathematics: {
      name: "Cambridge A Level Further Mathematics – 9231 (Optional)",
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
      description: "Cambridge A Level Further Mathematics – 9231 provides advanced mathematical challenges for students seeking specialised degree programmes.",
      topics: [
        {
          title: "Complex Numbers",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Complex numbers"
          ]
        },
        {
          title: "Matrices and Vectors",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Matrices and vectors"
          ]
        },
        {
          title: "Advanced Calculus",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced calculus"
          ]
        },
        {
          title: "Differential Equations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Differential equations"
          ]
        }
      ]
    },

    physics: {
      name: "Cambridge A Level Physics – 9702",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "Cambridge A Level Physics – 9702 builds on AS Level with advanced physical principles and experimental techniques.",
      topics: [
        {
          title: "Circular Motion",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Circular motion and gravitation"
          ]
        },
        {
          title: "Oscillations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Oscillations"
          ]
        },
        {
          title: "Fields",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electric and magnetic fields"
          ]
        },
        {
          title: "Quantum Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Quantum physics"
          ]
        },
        {
          title: "Nuclear Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Nuclear physics"
          ]
        }
      ]
    },

    chemistry: {
      name: "Cambridge A Level Chemistry – 9701",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-rose-50 text-rose-600",
      description: "Cambridge A Level Chemistry – 9701 builds on AS Level with advanced chemical concepts and analytical techniques.",
      topics: [
        {
          title: "Reaction Kinetics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Reaction kinetics"
          ]
        },
        {
          title: "Chemical Equilibria",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Chemical equilibria"
          ]
        },
        {
          title: "Electrochemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electrochemistry"
          ]
        },
        {
          title: "Advanced Organic Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced organic chemistry"
          ]
        },
        {
          title: "Analytical Techniques",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Analytical techniques"
          ]
        }
      ]
    },

    economics: {
      name: "Cambridge A Level Economics – 9708",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-cyan-50 text-cyan-600",
      description: "Cambridge A Level Economics – 9708 builds on AS Level with advanced economic theory and policy analysis.",
      topics: [
        {
          title: "Microeconomic Theory",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Microeconomic theory"
          ]
        },
        {
          title: "Macroeconomic Policy",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Macroeconomic policy"
          ]
        },
        {
          title: "International Trade",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "International trade"
          ]
        },
        {
          title: "Economic Development",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Economic growth and development"
          ]
        }
      ]
    },

    computerScience: {
      name: "Cambridge A Level Computer Science – 9618",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-violet-50 text-violet-600",
      description: "Cambridge A Level Computer Science – 9618 builds on AS Level with advanced programming and system design concepts.",
      topics: [
        {
          title: "Data Structures",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data structures"
          ]
        },
        {
          title: "Algorithms and Complexity",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algorithms and complexity"
          ]
        },
        {
          title: "Software Development",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Software development"
          ]
        },
        {
          title: "Database Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Database systems"
          ]
        },
        {
          title: "Advanced Programming",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Advanced programming"
          ]
        }
      ]
    }
  }
};

// Combined Subject Data (for backward compatibility)
export const SUBJECT_DATA = {
  ...IB_SUBJECT_DATA,
  ...CAMBRIDGE_SUBJECT_DATA
};


const SubjectDetail = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedTopics, setExpandedTopics] = useState(new Set());

  // Extract grade from location state or default to null
  const grade = location.state?.grade;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper to get the correct grade key from SUBJECT_DATA
  const getGradeKey = (g) => {
    if (!g) return null;
    if (g >= 12) return 'grade12';
    if (g >= 11) return 'grade11';
    return `grade${g}`;
  };

  // Helper to map URL slug to data keys based on grade
  const getSubjectData = (slug, g) => {
    // 1. Determine Grade Key
    let targetGradeKey = getGradeKey(g);

    // If we have a valid grade key, try to find the subject there
    if (targetGradeKey && SUBJECT_DATA[targetGradeKey]) {
      const gradeData = SUBJECT_DATA[targetGradeKey];

      // Normalize slug
      const s = slug.toLowerCase();

      // MAPPINGS

      // Mathematics
      if (s.includes('mathematics') || s === 'math') {
        // For Class 12, check if it's Applications & Interpretation
        if (g === 12 && (s.includes('applications') || s.includes('interpretation') || s.includes('ai'))) {
          return gradeData.mathematicsAI;
        }
        return gradeData.mathematics;
      }

      // Science (Grades 6-8)
      if (g < 9 && ['physics', 'chemistry', 'biology', 'science'].includes(s)) {
        return gradeData.science;
      }

      // Physics, Chemistry, Biology (Grades 9-12)
      if (g >= 9 && ['physics', 'chemistry', 'biology'].includes(s)) {
        return gradeData[s];
      }

      // English
      if (s === 'english') {
        if (gradeData.english) return gradeData.english;
        if (gradeData.englishFirstLanguage) return gradeData.englishFirstLanguage;
      }

      // Computer Science / Computing
      if (['computer-science', 'computing'].includes(s)) {
        if (gradeData.computing) return gradeData.computing;
        if (gradeData.computerScience) return gradeData.computerScience;
      }

      // Economics
      if (s.includes('economics')) {
        return gradeData.economics;
      }

      // Further Mathematics
      if (s.includes('further') && s.includes('math')) {
        return gradeData.furtherMathematics;
      }

      // IB Core
      if (s.includes('core') || s.includes('tok') || s.includes('ee') || s.includes('ia')) {
        return gradeData.ibCore;
      }

      // Direct key match (camelCase mapping attempt)
      // e.g. "business-studies" -> "businessStudies"
      const camelCase = s.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      if (gradeData[camelCase]) return gradeData[camelCase];
      if (gradeData[s]) return gradeData[s];
    }

    // FALLBACK: If no grade or subject not found in specific grade
    // Try to find a match in ANY grade (prioritizing 11/12/10/9 for standard subjects)
    // This handles direct link access /subject/physics without state
    if (!targetGradeKey || !SUBJECT_DATA[targetGradeKey]) {
      // Search order: grade12, grade11, grade10, grade9, grade8, grade7, grade6
      const priorityGrades = ['grade12', 'grade11', 'grade10', 'grade9', 'grade8', 'grade7', 'grade6'];

      for (const key of priorityGrades) {
        const data = SUBJECT_DATA[key];
        if (!data) continue;

        const s = slug.toLowerCase();
        // Quick checks for common subjects
        if ((s.includes('math') && (data.mathematics || data.mathematicsAI)) ||
          (s === 'english' && (data.english || data.englishFirstLanguage)) ||
          (['physics', 'chemistry', 'biology'].includes(s) && (data[s] || data.science)) ||
          (s.includes('economics') && data.economics) ||
          (s.includes('further') && s.includes('math') && data.furtherMathematics) ||
          ((s.includes('core') || s.includes('tok') || s.includes('ee') || s.includes('ia')) && data.ibCore)
        ) {
          // Return specific match
          if (s.includes('math')) {
            // For Class 12, check if it's Applications & Interpretation
            if (key === 'grade12' && (s.includes('applications') || s.includes('interpretation') || s.includes('ai'))) {
              return data.mathematicsAI;
            }
            return data.mathematics;
          }
          if (s === 'english') return data.english || data.englishFirstLanguage;
          if (['physics', 'chemistry', 'biology'].includes(s)) return data[s] || data.science;
          if (s.includes('economics')) return data.economics;
          if (s.includes('further') && s.includes('math')) return data.furtherMathematics;
          if (s.includes('core') || s.includes('tok') || s.includes('ee') || s.includes('ia')) return data.ibCore;
        }

        const camelCase = s.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        if (data[camelCase]) return data[camelCase];
      }
    }

    return null;
  };

  const subjectData = getSubjectData(subject, grade);

  const board = location.state?.board || 'IGCSE';
  const boardRoute = board === 'IB' ? '/ib-courses' : '/igcse-courses';

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-[#F3F6F8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Subject not found</h1>
          <button
            onClick={() => navigate(boardRoute)}
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
          <Link 
            to={boardRoute} 
            className="hover:text-teal-600 transition-colors"
          >
            {board}
          </Link>
          <span className="text-slate-400">/</span>
          <span className="hover:text-teal-600 transition-colors cursor-pointer">
            CLASS {grade ? `${grade}th` : '9th'}
          </span>
          <span className="text-slate-400">/</span>
          <span className="hover:text-teal-600 transition-colors cursor-pointer">
            {board === 'IB' 
              ? (grade >= 11 ? 'IB Diploma Programme' : 'IB Middle Years Programme')
              : (grade >= 11 ? (grade >= 12 ? 'Cambridge International A Level' : 'Cambridge International AS Level') : 'Cambridge IGCSE')
            }
          </span>
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
            onClick={() => navigate(boardRoute)}
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

        {/* Learning Approach Section - Only for Cambridge Class 6, 7 & 8 */}
        {(grade === 6 || grade === 7 || grade === 8) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-white/60 p-8 md:p-12 shadow-sm mt-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
              Learning Approach
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Our Teaching Method</h3>
                <ul className="space-y-3">
                  {grade === 6 ? (
                    <>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Concept-based learning (not rote)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Interactive and discussion-driven classes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Regular assessments and feedback</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Focus on clarity, confidence & curiosity</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Strong preparation for Cambridge IGCSE pathway</span>
                      </li>
                    </>
                  ) : grade === 7 ? (
                    <>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Concept-based and inquiry-driven teaching</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Interactive live classes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Regular assessments and progress tracking</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Individual feedback and academic support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Focus on confidence and independent learning</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Concept-driven teaching methodology</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Interactive classes with real-world examples</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Regular assessments and topic-wise evaluations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Personalised feedback and academic guidance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">Focus on IGCSE readiness</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="bg-linear-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">For Parents</h3>
                <p className="text-slate-600 leading-relaxed">
                  {grade === 6
                    ? "Cambridge Class 6 at Academio builds strong foundations in Maths, Science, and English, helping students develop critical thinking, confidence, and readiness for future international curricula."
                    : grade === 7
                      ? "Cambridge Class 7 at Academio strengthens core concepts in Maths, Science, and English, helping students think independently and prepare confidently for future IGCSE learning."
                      : "Cambridge Class 8 at Academio builds strong academic depth in Maths, Science, and English, ensuring students are fully prepared for transition to Cambridge IGCSE."
                  }
                </p>
              </div>
            </div>
          </motion.div>
        )}

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
