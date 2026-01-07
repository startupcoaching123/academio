import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  BookOpen, 
  School, 
  ChevronDown 
} from 'lucide-react';
import logo from '../assets/logo1.png';

const EnrollmentForm = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State to handle subject selection
  const [selectedSubjects, setSelectedSubjects] = useState(['All']);
  
  const subjects = ['All', 'Mathematics', 'Chemistry', 'Physics', 'English', 'Biology', 'Economics'];

  const toggleSubject = (subject) => {
    if (subject === 'All') {
      setSelectedSubjects(['All']);
    } else {
      let newSubjects = selectedSubjects.filter(s => s !== 'All');
      if (newSubjects.includes(subject)) {
        newSubjects = newSubjects.filter(s => s !== subject);
      } else {
        newSubjects = [...newSubjects, subject];
      }
      // If nothing is selected, revert to 'All' or keep empty based on preference. 
      // Here we keep it empty to force user choice, or you can default back to All.
      if (newSubjects.length === 0) newSubjects = ['All'];
      setSelectedSubjects(newSubjects);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center py-40 mt-20 p-4 md:p-8 font-sans">
      
      {/* Main Card */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="text-center pt-10 pb-6 px-6">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="Logo" className="h-20 object-contain" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
            Register for Our <span className="text-teal-700">Comprehensive Course</span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Help us understand your child’s learning needs. Our academic advisors will connect with you shortly to build a personalized plan.
          </p>
        </div>

        {/* Form Section */}
        <form className="p-8 md:p-12 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Parent's Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Parent's Name <span className="text-red-500">*</span></label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="e.g. Rohini" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                />
              </div>
            </div>

            {/* Child's Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Child's Name <span className="text-red-500">*</span></label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="e.g. Toishaa" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                />
              </div>
            </div>

            {/* Select Board */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Select Board <span className="text-red-500">*</span></label>
              <div className="relative group">
                <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                <select className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all appearance-none text-slate-700 cursor-pointer">
                  <option value="" disabled selected>Select Board</option>
                  <option value="cbse">CBSE</option>
                  <option value="icse">ICSE</option>
                  <option value="ib">IB</option>
                  <option value="igcse">IGCSE</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Class <span className="text-red-500">*</span></label>
              <div className="relative group">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                <select className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all appearance-none text-slate-700 cursor-pointer">
                  <option value="" disabled selected>Select Class</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Subjects (Full Width) */}
            <div className="col-span-1 md:col-span-2 space-y-3">
              <label className="text-sm font-semibold text-slate-700 ml-1">Subjects (Select Multiple) <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedSubjects.includes(subject)
                        ? 'bg-teal-700 text-white border-teal-700 shadow-md shadow-teal-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-teal-500 hover:text-teal-600'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Country of Residence */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Country of Residence <span className="text-red-500">*</span></label>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                <select className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all appearance-none text-slate-700 cursor-pointer">
                  <option>India</option>
                  <option>USA</option>
                  <option>UAE</option>
                  <option>UK</option>
                  <option>Canada</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Phone number <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                <div className="w-24 relative flex-shrink-0">
                   <div className="absolute inset-y-0 left-0 flex items-center justify-center w-full pointer-events-none text-slate-500 text-sm font-medium border border-slate-200 bg-slate-50 rounded-xl">+91</div>
                </div>
                <div className="relative w-full group">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                   <input 
                    type="tel" 
                    placeholder="98765 43210" 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Email Address (Full Width) */}
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email address <span className="text-red-500">*</span></label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="rohini@gmail.com" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-100 focus:border-teal-600 outline-none transition-all placeholder:text-slate-400 text-slate-700"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-12 text-center">
            <button 
              type="submit"
              className="w-full md:w-auto px-12 py-4 bg-teal-800 hover:bg-teal-900 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:shadow-teal-900/20 transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-teal-200"
            >
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;