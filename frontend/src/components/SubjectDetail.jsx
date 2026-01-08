import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ChevronDown, ChevronUp, Atom, FlaskConical, Calculator,
  Dna, Monitor, TrendingUp, BookOpen, CheckCircle2, Info, Type, Cpu, Globe2, Leaf, BriefcaseBusiness
} from 'lucide-react';
import { PiSquareDuotone } from 'react-icons/pi';

export const SUBJECT_DATA = {
  grade6: {
    english: {
      name: "English",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Build strong reading, writing, speaking and listening skills aligned with Cambridge Lower Secondary English.",
      topics: [
        {
          title: "Reading",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Understanding main ideas and details in texts",
            "Identifying themes, characters and settings",
            "Recognising fact, opinion and bias",
            "Reading fiction, non-fiction and poetry"
          ]
        },
        {
          title: "Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Writing stories, descriptions and recounts",
            "Organising ideas into paragraphs",
            "Using appropriate vocabulary and tone",
            "Editing for spelling, grammar and punctuation"
          ]
        },
        {
          title: "Grammar and Vocabulary",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Parts of speech and sentence types",
            "Tenses and subject–verb agreement",
            "Prefixes, suffixes and word families",
            "Punctuation for clarity and effect"
          ]
        },
        {
          title: "Speaking and Listening",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Participating in discussions",
            "Giving short presentations",
            "Listening for key points",
            "Responding to questions and feedback"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Develop core mathematical understanding in number, algebra, geometry, measure and data to prepare for IGCSE Maths.",
      topics: [
        {
          title: "Number",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Whole numbers, fractions and decimals",
            "Percentages and ratios",
            "Negative numbers and number lines",
            "Estimation and mental calculation"
          ]
        },
        {
          title: "Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Using symbols and simple expressions",
            "Evaluating expressions and formulas",
            "Simple equations and inequalities",
            "Number patterns and sequences"
          ]
        },
        {
          title: "Geometry and Measure",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Properties of 2D shapes and angles",
            "Perimeter and area of rectangles and triangles",
            "Introduction to 3D shapes and volume",
            "Units of length, mass and time"
          ]
        },
        {
          title: "Data Handling",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Collecting and organising data",
            "Bar charts, pictograms and line graphs",
            "Reading and interpreting tables",
            "Simple probability ideas"
          ]
        }
      ]
    },

    science: {
      name: "Science",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Explore key ideas in Biology, Chemistry and Physics through enquiry-based learning.",
      topics: [
        {
          title: "Scientific Enquiry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Asking scientific questions",
            "Planning simple investigations",
            "Recording observations and measurements",
            "Drawing conclusions from evidence"
          ]
        },
        {
          title: "Biology Foundations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Living and non-living things",
            "Plants and their parts",
            "Human body systems basics",
            "Habitats and simple food chains"
          ]
        },
        {
          title: "Chemistry Foundations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "States of matter: solids, liquids, gases",
            "Simple mixtures and solutions",
            "Reversible and irreversible changes",
            "Everyday materials and properties"
          ]
        },
        {
          title: "Physics Foundations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Forces and motion basics",
            "Types of energy and simple transfers",
            "Light sources and shadows",
            "Sounds and vibration"
          ]
        }
      ]
    },

    computing: {
      name: "Computing",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-sky-50 text-sky-600",
      description: "Gain essential digital literacy and introductory programming skills using the Cambridge Computing framework.",
      topics: [
        {
          title: "Digital Literacy",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Using operating systems and file management",
            "Word processing and presentations",
            "Safe and responsible internet use",
            "Online communication and etiquette"
          ]
        },
        {
          title: "Data and Information",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Collecting and storing data",
            "Using simple databases and spreadsheets",
            "Sorting and filtering information",
            "Charts to present data"
          ]
        },
        {
          title: "Introduction to Programming",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Sequencing instructions",
            "Simple selection (if statements)",
            "Loops and repetition",
            "Debugging basic programs"
          ]
        },
        {
          title: "Computers and Networks",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Parts of a computer system",
            "Input and output devices",
            "What networks and the internet are",
            "Data security basics"
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
      description: "Extend reading and writing skills with more complex texts, preparing for higher secondary English.",
      topics: [
        {
          title: "Reading for Inference",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Identifying implicit meaning",
            "Analysing character and setting",
            "Understanding writer’s viewpoint",
            "Comparing different texts"
          ]
        },
        {
          title: "Creative and Discursive Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Writing narratives and descriptions",
            "Writing arguments and discussions",
            "Structuring introductions and conclusions",
            "Using figurative language effectively"
          ]
        },
        {
          title: "Language and Style",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Varying sentence structures",
            "Developing precise vocabulary",
            "Formal and informal register",
            "Punctuation for effect"
          ]
        },
        {
          title: "Speaking and Presenting",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Preparing short speeches",
            "Using visual aids",
            "Listening and giving feedback",
            "Role play and performance"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Deepen understanding of number, algebra and geometry to build a strong base for IGCSE Mathematics.",
      topics: [
        {
          title: "Number and Proportion",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Operations with fractions and decimals",
            "Ratios and rates",
            "Percentage change and profit/loss",
            "Powers and roots introduction"
          ]
        },
        {
          title: "Algebraic Techniques",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Simplifying algebraic expressions",
            "Solving linear equations in one variable",
            "Formulas and substitution",
            "Simple linear sequences"
          ]
        },
        {
          title: "Geometry and Transformations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Angles in triangles and quadrilaterals",
            "Properties of parallel lines",
            "Reflections, rotations and translations",
            "Area of parallelograms and triangles"
          ]
        },
        {
          title: "Statistics and Probability",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Collecting and representing data",
            "Mean, median and mode",
            "Interpreting bar and line graphs",
            "Basic probability of events"
          ]
        }
      ]
    },

    science: {
      name: "Science",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Study more detailed Biology, Chemistry and Physics topics through experiments and enquiry.",
      topics: [
        {
          title: "Biology: Organisms and Environment",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cells as basic units of life",
            "Body systems and health",
            "Food chains, webs and ecosystems",
            "Adaptations and variation"
          ]
        },
        {
          title: "Chemistry: Materials and Changes",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Elements, compounds and mixtures",
            "Solutions and solubility",
            "Physical and chemical changes",
            "Simple separation techniques"
          ]
        },
        {
          title: "Physics: Forces and Energy",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Types of forces and their effects",
            "Speed, distance and time",
            "Energy forms and transfers",
            "Simple machines and efficiency"
          ]
        },
        {
          title: "Scientific Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Making predictions and hypotheses",
            "Planning fair tests",
            "Recording data in tables and graphs",
            "Evaluating methods and results"
          ]
        }
      ]
    },

    globalPerspectives: {
      name: "Global Perspectives",
      icon: <Globe2 className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
      description: "Develop research, collaboration and critical thinking skills by exploring global topics.",
      topics: [
        {
          title: "Research Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Formulating enquiry questions",
            "Finding information from different sources",
            "Checking reliability of sources",
            "Recording and organising research"
          ]
        },
        {
          title: "Perspectives and Issues",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Understanding local, national and global views",
            "Identifying different stakeholder perspectives",
            "Exploring social and environmental issues",
            "Respecting cultural diversity"
          ]
        },
        {
          title: "Collaboration",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Planning group tasks",
            "Sharing roles and responsibilities",
            "Communicating within a team",
            "Reflecting on group work"
          ]
        },
        {
          title: "Presentation",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structuring a clear presentation",
            "Using visuals and data",
            "Explaining conclusions",
            "Responding to audience questions"
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
      description: "Consolidate advanced reading and writing skills to transition smoothly into IGCSE English courses.",
      topics: [
        {
          title: "Analysing Texts",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Analysing language and structure",
            "Exploring themes and messages",
            "Comparing how writers present ideas",
            "Commenting on style and tone"
          ]
        },
        {
          title: "Extended Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Planning and drafting longer pieces",
            "Argumentative and persuasive writing",
            "Narrative and descriptive techniques",
            "Editing for accuracy and coherence"
          ]
        },
        {
          title: "Literary Study",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Studying short stories and poems",
            "Exploring character and plot development",
            "Recognising literary devices",
            "Responding to literature critically"
          ]
        },
        {
          title: "Spoken Communication",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Formal and informal discussions",
            "Delivering prepared talks",
            "Using evidence to support ideas",
            "Listening and building on others’ points"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Prepare directly for IGCSE Mathematics by mastering core algebra, geometry and statistics.",
      topics: [
        {
          title: "Number and Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Integers, fractions and percentages fluency",
            "Powers, roots and standard form",
            "Solving multi-step linear equations",
            "Intro to simultaneous equations and inequalities"
          ]
        },
        {
          title: "Functions and Graphs",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Plotting coordinates and straight-line graphs",
            "Gradient and intercept concepts",
            "Tables of values",
            "Interpreting real-life graphs"
          ]
        },
        {
          title: "Geometry and Mensuration",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Angle rules and constructions",
            "Properties of polygons and circles",
            "Area and circumference of circles",
            "Surface area and volume of prisms"
          ]
        },
        {
          title: "Statistics and Probability",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data collection methods",
            "Bar, line and pie charts",
            "Mean, median, mode and range",
            "Simple theoretical probability"
          ]
        }
      ]
    },

    science: {
      name: "Science",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-teal-50 text-teal-600",
      description: "Complete Lower Secondary Science with more abstract Biology, Chemistry and Physics topics.",
      topics: [
        {
          title: "Biology: Cells and Systems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cell structure and function",
            "Specialised cells and tissues",
            "Human body systems overview",
            "Reproduction and growth"
          ]
        },
        {
          title: "Chemistry: Particles and Reactions",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Particle model of matter",
            "Elements, compounds and symbols",
            "Simple chemical reactions and equations",
            "Acids, bases and indicators"
          ]
        },
        {
          title: "Physics: Motion and Energy",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Speed, distance–time graphs",
            "Balanced and unbalanced forces",
            "Energy conservation and transfers",
            "Basics of electricity and circuits"
          ]
        },
        {
          title: "Earth and Space",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structure of the Earth",
            "Rock cycle and resources",
            "Solar system basics",
            "Day, night and seasons"
          ]
        }
      ]
    },

    computing: {
      name: "Computing",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-sky-50 text-sky-600",
      description: "Advance computing and programming knowledge to bridge into IGCSE Computer Science or ICT.",
      topics: [
        {
          title: "Data Representation",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Binary numbers basics",
            "Simple text and image representation",
            "File types and sizes",
            "Data storage concepts"
          ]
        },
        {
          title: "Programming Concepts",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Variables and data types",
            "Selection and iteration patterns",
            "Procedures / functions introduction",
            "Testing and debugging programs"
          ]
        },
        {
          title: "Systems and Networks",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Hardware and software roles",
            "Operating systems overview",
            "Network types and topologies",
            "Basic cybersecurity concepts"
          ]
        },
        {
          title: "Digital Products",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Planning a digital project",
            "User interface design basics",
            "Using online tools collaboratively",
            "Evaluating digital solutions"
          ]
        }
      ]
    }
  },

  grade9: {
    englishFirstLanguage: {
      name: "English First Language",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Begin the two-year IGCSE English First Language course focusing on reading comprehension and accurate, effective writing.",
      topics: [
        {
          title: "Reading and Response",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Identifying explicit and implicit information",
            "Summarising and synthesising ideas",
            "Commenting on language and structure",
            "Comparing texts with different purposes"
          ]
        },
        {
          title: "Directed Writing",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Writing letters, articles and reports",
            "Transforming information from sources",
            "Adapting tone and register",
            "Organising ideas logically"
          ]
        },
        {
          title: "Composition",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Descriptive compositions",
            "Narrative compositions",
            "Using imagery and detail",
            "Maintaining coherence and viewpoint"
          ]
        },
        {
          title: "Accuracy and Style",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Grammar and sentence control",
            "Punctuation for clarity",
            "Spelling conventions",
            "Developing a confident written voice"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Start the IGCSE Mathematics course covering number, algebra, geometry, trigonometry and statistics.",
      topics: [
        {
          title: "Number and Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Powers, standard form and bounds",
            "Ratio, rate and proportion",
            "Algebraic manipulation and factorisation",
            "Linear and quadratic expressions"
          ]
        },
        {
          title: "Equations and Inequalities",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Linear equations and simultaneous equations",
            "Quadratic equations introduction",
            "Inequalities on number lines",
            "Using formulae in context"
          ]
        },
        {
          title: "Geometry and Trigonometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Angles, similarity and congruence",
            "Circle properties basics",
            "Pythagoras’ theorem",
            "Right-angled trigonometry (sin, cos, tan)"
          ]
        },
        {
          title: "Statistics and Probability",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data collection and sampling",
            "Histograms, cumulative frequency and box plots",
            "Mean, median, mode and quartiles",
            "Tree diagrams and combined events"
          ]
        }
      ]
    },

    physics: {
      name: "Physics (Cambridge IGCSE Physics (0625))",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "Build a strong understanding of the laws that govern the physical world through our structured IGCSE Physics programme. At Academio, students learn Physics with clarity—connecting theory to real-world applications while developing strong problem-solving and exam skills.",
      topics: [
        {
          title: "General Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Physical quantities and units",
            "Measurement techniques and accuracy",
            "Scalars and vectors"
          ]
        },
        {
          title: "Kinematics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Speed, velocity, and acceleration",
            "Distance–time and velocity–time graphs",
            "Equations of motion"
          ]
        },
        {
          title: "Dynamics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Forces and their effects",
            "Newton's Laws of Motion",
            "Momentum and impulse"
          ]
        },
        {
          title: "Mass, Weight & Density",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Difference between mass and weight",
            "Calculating density",
            "Floating and sinking concepts"
          ]
        },
        {
          title: "Work, Energy & Power",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Work done and energy transfer",
            "Kinetic and potential energy",
            "Conservation of energy",
            "Power calculations"
          ]
        },
        {
          title: "Deformation of Solids",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Stretching and compression",
            "Hooke's Law",
            "Elastic behaviour"
          ]
        },
        {
          title: "Thermal Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Temperature and heat",
            "Thermal expansion",
            "Heat transfer: conduction, convection, radiation",
            "States of matter and kinetic theory"
          ]
        },
        {
          title: "Waves",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Wave properties: wavelength, frequency, amplitude",
            "Wave speed calculations",
            "Reflection, refraction, and diffraction",
            "Sound and light waves",
            "Electromagnetic spectrum"
          ]
        },
        {
          title: "Electricity",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electric charge and current",
            "Voltage, resistance, and Ohm's Law",
            "Series and parallel circuits",
            "Electrical power and energy"
          ]
        },
        {
          title: "Magnetism & Electromagnetism",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Magnetic fields and properties",
            "Electromagnets",
            "Electromagnetic induction",
            "Applications of electromagnetism"
          ]
        },
        {
          title: "Atomic Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structure of the atom",
            "Isotopes",
            "Radioactivity and decay",
            "Nuclear energy and safety"
          ]
        },
        {
          title: "Practical & Exam Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Understanding experimental methods",
            "Data handling and graph interpretation",
            "Applying formulas accurately",
            "Answering structured and extended exam questions",
            "Core & Extended syllabus support"
          ]
        }
      ]
    },

    chemistry: {
      name: "Chemistry (Cambridge IGCSE Chemistry (0620))",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-rose-50 text-rose-600",
      description: "IGCSE Chemistry (Cambridge 0620) provides students with a strong understanding of the chemical principles that explain how substances behave and interact. The course develops essential scientific knowledge, practical laboratory skills, and problem-solving abilities, preparing students for further study at A Level, IB, or equivalent pathways.",
      topics: [
        {
          title: "States of Matter",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Solids, liquids, gases",
            "Kinetic particle theory",
            "Changes of state and diffusion"
          ]
        },
        {
          title: "Atomic Structure",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atoms, elements, and compounds",
            "Protons, neutrons, and electrons",
            "Isotopes and electronic configuration"
          ]
        },
        {
          title: "Chemical Bonding",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Ionic, covalent, and metallic bonding",
            "Properties of substances related to bonding"
          ]
        },
        {
          title: "Stoichiometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Chemical formulae and equations",
            "Relative atomic and molecular mass",
            "Moles, reacting masses, and gas volumes"
          ]
        },
        {
          title: "Electrochemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electrolysis and its applications",
            "Chemical Energetics",
            "Exothermic and endothermic reactions",
            "Energy level diagrams"
          ]
        },
        {
          title: "Rates of Reaction",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Factors affecting reaction rate",
            "Collision theory"
          ]
        },
        {
          title: "Reversible Reactions and Equilibrium",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Dynamic equilibrium",
            "Effect of conditions on equilibrium"
          ]
        },
        {
          title: "Acids, Bases, and Salts",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Properties and reactions",
            "pH scale and indicators",
            "Preparation of salts"
          ]
        },
        {
          title: "Periodic Table",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Periodic trends",
            "Group I (alkali metals)",
            "Group VII (halogens)",
            "Noble gases",
            "Transition elements"
          ]
        },
        {
          title: "Metals",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Properties of metals",
            "Reactivity series",
            "Extraction of metals",
            "Corrosion and prevention"
          ]
        },
        {
          title: "Chemistry of the Environment",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Air and water",
            "Pollution and environmental issues"
          ]
        },
        {
          title: "Organic Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Alkanes and alkenes",
            "Alcohols",
            "Carboxylic acids",
            "Polymers"
          ]
        },
        {
          title: "Chemical Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Tests for ions and gases",
            "Flame tests",
            "Chromatography"
          ]
        },
        {
          title: "Experimental Techniques and Practical Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Laboratory apparatus and methods",
            "Safety and accuracy",
            "Data collection and analysis"
          ]
        }
      ]
    },

    biology: {
      name: "Biology",
      icon: <Leaf className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      description: "Start IGCSE Biology with cell biology, organisation and basic physiology topics.",
      topics: [
        {
          title: "Characteristics and Classification",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Characteristics of living organisms",
            "Classification into kingdoms",
            "Species and binomial naming",
            "Vertebrate and invertebrate groups"
          ]
        },
        {
          title: "Cells and Organisation",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Cell structure and function",
            "Plant vs animal cells",
            "Tissues, organs and systems",
            "Diffusion and osmosis basics"
          ]
        },
        {
          title: "Nutrition and Transport",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Balanced diet and nutrients",
            "Human digestive system",
            "Plant nutrition and photosynthesis intro",
            "Transport in plants and humans overview"
          ]
        },
        {
          title: "Human Health Basics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Pathogens and disease",
            "Body defences introduction",
            "Effects of smoking and poor diet",
            "Personal and community health"
          ]
        }
      ]
    }
  },

  grade10: {
    englishFirstLanguage: {
      name: "English First Language",
      icon: <Type className="w-8 h-8" />,
      color: "bg-indigo-50 text-indigo-600",
      description: "Complete IGCSE English First Language with exam-focused reading and writing practice.",
      topics: [
        {
          title: "Exam Reading Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Intensive reading for Paper 1 texts",
            "Selecting and synthesising evidence",
            "Analysis of writer’s effects",
            "Comparative responses"
          ]
        },
        {
          title: "Directed Writing Tasks",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Responding precisely to task prompts",
            "Adapting style for audience and purpose",
            "Using evidence from passages",
            "Checking structure and cohesion"
          ]
        },
        {
          title: "Composition Development",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Planning under timed conditions",
            "Managing narrative viewpoints",
            "Building description and atmosphere",
            "Editing in exam time"
          ]
        },
        {
          title: "Exam Technique",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Mark scheme awareness",
            "Time management strategies",
            "Common errors to avoid",
            "Self-assessment using past papers"
          ]
        }
      ]
    },

    mathematics: {
      name: "Mathematics",
      icon: <PiSquareDuotone className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
      description: "Finish IGCSE Maths content and focus on exam-style questions across all strands.",
      topics: [
        {
          title: "Advanced Algebra",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Quadratic equations and graphs",
            "Simultaneous equations (linear/quadratic)",
            "Algebraic fractions",
            "Inequalities in one and two variables"
          ]
        },
        {
          title: "Further Geometry and Trigonometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Circle theorems",
            "Similar shapes and scale factors",
            "Sine and cosine rules",
            "Area of triangles using trigonometry"
          ]
        },
        {
          title: "Mensuration and Vectors",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Surface area and volume of spheres and cones",
            "Compound shapes and units conversion",
            "Vectors in 2D and notation",
            "Vector addition and scalar multiples"
          ]
        },
        {
          title: "Statistics and Probability Problems",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Interpreting complex graphs and diagrams",
            "Probability distributions introduction",
            "Combined probability problems",
            "Using statistics in real contexts"
          ]
        }
      ]
    },

    physics: {
      name: "Physics",
      icon: <Atom className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
      description: "Complete IGCSE Physics with waves, electromagnetism and modern physics plus exam practice.",
      topics: [
        {
          title: "Waves and Optics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Wave properties: wavelength, frequency, speed",
            "Reflection and refraction",
            "Lenses and image formation",
            "Sound and ultrasound basics"
          ]
        },
        {
          title: "Electricity and Magnetism",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Current, voltage and resistance in depth",
            "Series and parallel circuits analysis",
            "Magnetic fields and electromagnets",
            "Electromagnetic induction basics"
          ]
        },
        {
          title: "Atomic and Nuclear Physics",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Structure of the atom and isotopes",
            "Radioactive decay and half-life",
            "Uses and dangers of radioactivity",
            "Nuclear energy introduction"
          ]
        },
        {
          title: "Exam Skills and Practicals",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Data analysis and graph skills",
            "Error and uncertainty basics",
            "Practical-based questions",
            "Solving multi-step exam problems"
          ]
        }
      ]
    },

    chemistry: {
      name: "Chemistry (Cambridge IGCSE Chemistry (0620))",
      icon: <FlaskConical className="w-8 h-8" />,
      color: "bg-rose-50 text-rose-600",
      description: "Students learn to apply chemical concepts to unfamiliar situations, analyse data, carry out calculations, and understand the role of chemistry in everyday life and industry. The syllabus combines theoretical understanding with practical investigation, ensuring students are confident both in exams and in experimental work.",
      topics: [
        {
          title: "States of Matter",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Solids, liquids, gases",
            "Kinetic particle theory",
            "Changes of state and diffusion"
          ]
        },
        {
          title: "Atomic Structure",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Atoms, elements, and compounds",
            "Protons, neutrons, and electrons",
            "Isotopes and electronic configuration"
          ]
        },
        {
          title: "Chemical Bonding",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Ionic, covalent, and metallic bonding",
            "Properties of substances related to bonding"
          ]
        },
        {
          title: "Stoichiometry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Chemical formulae and equations",
            "Relative atomic and molecular mass",
            "Moles, reacting masses, and gas volumes"
          ]
        },
        {
          title: "Electrochemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Electrolysis and its applications",
            "Chemical Energetics",
            "Exothermic and endothermic reactions",
            "Energy level diagrams"
          ]
        },
        {
          title: "Rates of Reaction",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Factors affecting reaction rate",
            "Collision theory"
          ]
        },
        {
          title: "Reversible Reactions and Equilibrium",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Dynamic equilibrium",
            "Effect of conditions on equilibrium"
          ]
        },
        {
          title: "Acids, Bases, and Salts",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Properties and reactions",
            "pH scale and indicators",
            "Preparation of salts"
          ]
        },
        {
          title: "Periodic Table",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Periodic trends",
            "Group I (alkali metals)",
            "Group VII (halogens)",
            "Noble gases",
            "Transition elements"
          ]
        },
        {
          title: "Metals",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Properties of metals",
            "Reactivity series",
            "Extraction of metals",
            "Corrosion and prevention"
          ]
        },
        {
          title: "Chemistry of the Environment",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Air and water",
            "Pollution and environmental issues"
          ]
        },
        {
          title: "Organic Chemistry",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Alkanes and alkenes",
            "Alcohols",
            "Carboxylic acids",
            "Polymers"
          ]
        },
        {
          title: "Chemical Analysis",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Tests for ions and gases",
            "Flame tests",
            "Chromatography"
          ]
        },
        {
          title: "Experimental Techniques and Practical Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Laboratory apparatus and methods",
            "Safety and accuracy",
            "Data collection and analysis"
          ]
        }
      ]
    },

    biology: {
      name: "Biology",
      icon: <Leaf className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
      description: "Complete IGCSE Biology with genetics, ecology, human physiology and exam-focused preparation.",
      topics: [
        {
          title: "Human Physiology",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Respiration and gas exchange",
            "Circulatory system and blood",
            "Homeostasis and temperature control",
            "Coordination and response (nerves and hormones)"
          ]
        },
        {
          title: "Reproduction and Inheritance",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Asexual and sexual reproduction",
            "Plant and human reproductive systems",
            "Genes, chromosomes and DNA basics",
            "Monohybrid inheritance and variation"
          ]
        },
        {
          title: "Ecology and Environment",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Ecosystems and energy flow",
            "Food chains, webs and pyramids",
            "Human influence on the environment",
            "Conservation and biodiversity"
          ]
        },
        {
          title: "Biotechnology and Exam Skills",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Selective breeding and genetic engineering overview",
            "Microorganisms in food and industry",
            "Interpreting experimental data",
            "Answering structured and extended questions"
          ]
        }
      ]
    }
  },

  grade11_12_electives: {
    businessStudies: {
      name: "Business Studies",
      icon: <BriefcaseBusiness className="w-8 h-8" />,
      color: "bg-amber-50 text-amber-600",
      description: "Understand how businesses are set up, financed and managed in different environments.",
      topics: [
        {
          title: "Business Activity and Objectives",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Purpose and types of business activity",
            "Enterprise and entrepreneurship",
            "Objectives of businesses",
            "Stakeholders and their interests"
          ]
        },
        {
          title: "Marketing and Operations",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Market research and segmentation",
            "Marketing mix: product, price, place, promotion",
            "Production methods and productivity",
            "Quality and inventory management"
          ]
        },
        {
          title: "People in Business",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Recruitment and selection",
            "Training and motivation",
            "Organisation structures",
            "Communication in business"
          ]
        },
        {
          title: "Finance and External Environment",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Sources of business finance",
            "Cash-flow and profit concepts",
            "Government and economic influences",
            "Ethical and environmental considerations"
          ]
        }
      ]
    },

    computerScience: {
      name: "Computer Science",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-sky-50 text-sky-600",
      description: "Study principles of computer systems, data, networking and algorithmic problem solving.",
      topics: [
        {
          title: "Computer Systems Fundamentals",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Hardware components and functions",
            "System software and operating systems",
            "Input, output and storage devices",
            "Data security and integrity"
          ]
        },
        {
          title: "Data Representation and Databases",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Binary, hexadecimal and text representation",
            "Images and sound representation basics",
            "Database concepts and simple queries",
            "Validation and verification"
          ]
        },
        {
          title: "Networking and the Internet",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Types of networks and topologies",
            "Protocols and data transmission",
            "Internet services and the web",
            "Cybersecurity threats and protection"
          ]
        },
        {
          title: "Algorithms and Programming",
          icon: <Info className="w-5 h-5" />,
          subtopics: [
            "Algorithm design and pseudocode",
            "Selection, iteration and arrays",
            "Modular programming with procedures",
            "Testing and debugging strategies"
          ]
        }
      ]
    }
  }
}


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
    if (g >= 11) return 'grade11_12_electives';
    return `grade${g}`;
  };

  // Helper to map URL slug to data keys based on grade
  const getSubjectData = (slug, g) => {
    // 1. Determine Grade Key
    // If no grade provided, try to find the subject in any grade (fallback behavior)
    // For now, we'll default to looking in grade 9 or 6 if not specified, or just return null logic

    let targetGradeKey = getGradeKey(g);

    // If we have a valid grade key, try to find the subject there
    if (targetGradeKey && SUBJECT_DATA[targetGradeKey]) {
      const gradeData = SUBJECT_DATA[targetGradeKey];

      // Normalize slug
      const s = slug.toLowerCase();

      // MAPPINGS

      // Mathematics
      if (s.includes('mathematics') || s === 'math') {
        return gradeData.mathematics;
      }

      // Science (Grades 6-8)
      if (g < 9 && ['physics', 'chemistry', 'biology', 'science'].includes(s)) {
        return gradeData.science;
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

      // Direct key match (camelCase mapping attempt)
      // e.g. "business-studies" -> "businessStudies"
      const camelCase = s.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      if (gradeData[camelCase]) return gradeData[camelCase];
      if (gradeData[s]) return gradeData[s];
    }

    // FALLBACK: If no grade or subject not found in specific grade
    // Try to find a match in ANY grade (prioritizing 9/10 for standard subjects)
    // This handles direct link access /subject/physics without state
    if (!targetGradeKey) {
      // Search order: grade10, grade9, grade8, grade7, grade6
      const priorityGrades = ['grade10', 'grade9', 'grade8', 'grade7', 'grade6', 'grade11_12_electives'];

      for (const key of priorityGrades) {
        const data = SUBJECT_DATA[key];
        if (!data) continue;

        const s = slug.toLowerCase();
        // Quick checks for common subjects
        if ((s.includes('math') && data.mathematics) ||
          (s === 'english' && (data.english || data.englishFirstLanguage)) ||
          (['physics', 'chemistry', 'biology'].includes(s) && (data[s] || data.science))
        ) {
          // Return the specific match
          if (s.includes('math')) return data.mathematics;
          if (s === 'english') return data.english || data.englishFirstLanguage;
          if (['physics', 'chemistry', 'biology'].includes(s)) return data[s] || data.science;
        }

        const camelCase = s.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        if (data[camelCase]) return data[camelCase];
      }
    }

    return null;
  };

  const subjectData = getSubjectData(subject, grade);

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
