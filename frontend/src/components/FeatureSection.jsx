import React from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  // Animation variants for the cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const FeatureCard = ({ title, img, className, index }) => (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl shadow-md group cursor-pointer ${className}`}
    >
      <img 
        src={img} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* The Blueish/Dark Overlay from your image */}
      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <p className="text-white font-bold text-lg leading-tight drop-shadow-lg">
          {title}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl font-black text-center mb-10 text-gray-800 tracking-tight"
      >
        What sets us apart
      </motion.h2>

      {/* Grid Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[650px]">
        
        {/* Left Column: 2 Small Top, 1 Big Bottom */}
        <div className="md:col-span-1 grid grid-cols-2 md:grid-cols-1 grid-rows-2 gap-4">
            <div className="grid grid-cols-2 gap-4 col-span-2 row-span-1">
                <FeatureCard 
                    index={1}
                    title="Tutor-led sessions."
                    img="https://images.unsplash.com/photo-1577891729319-f20387b37060?w=400&q=80"
                    className="h-40 md:h-full"
                />
                <FeatureCard 
                    index={2}
                    title="Flexible options."
                    img="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80"
                    className="h-40 md:h-full"
                />
            </div>
            <FeatureCard 
                index={3}
                title="Online portal access for materials."
                img="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80"
                className="col-span-2 row-span-1"
            />
        </div>

        {/* Center Column: Tall Card */}
        <div className="md:col-span-1">
            <FeatureCard 
                index={4}
                title="Practice assignments after sessions."
                img="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80"
                className="h-[400px] md:h-full"
            />
        </div>

        {/* Right Column: Split into Graded Feedback and Parent Updates */}
        <div className="md:col-span-2 grid grid-rows-2 gap-4">
            <FeatureCard 
                index={5}
                title="Practice assignments"
                img="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                className="row-span-1"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 row-span-1">
                <FeatureCard 
                    index={6}
                    title="Graded feedback."
                    img="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80"
                    className="h-40 md:h-full"
                />
                <FeatureCard 
                    index={7}
                    title="Regular updates for parents."
                    img="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80"
                    className="h-40 md:h-full"
                />
            </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;