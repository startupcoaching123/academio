import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-[#1a1a1a] border border-white/5 shadow-2xl">
        
        {/* Background Gradient/Glow Effect */}
        {/* This div creates the green blurry mesh in the center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-emerald-900/40 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 py-16 md:px-16 md:py-20 gap-8">
          
          {/* Text Section */}
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Ready to Academio?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl font-light">
              Make your learning journey truly personalized
            </p>
          </div>

          {/* Button Section */}
          <div>
            <button onClick={() => navigate('/enrollment-form')} className="group flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
              Register Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CtaSection;