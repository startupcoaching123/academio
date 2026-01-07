import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Star } from 'lucide-react';

const teachersData = [
   {
    id: 1,
    name: "Dr. Ananya Sharma",
    subject: "Mathematics",
    rating: "9.8",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=500&fit=crop"
  },
  {
    id: 2,
    name: "Prof. Rohan Verma",
    subject: "Physics",
    rating: "9.6",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Ms. Priya Mehta",
    subject: "Literature",
    rating: "9.3",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=500&fit=crop"
  },
  {
    id: 4,
    name: "Mr. Arjun Singh",
    subject: "Computer Science",
    rating: "9.5",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=500&fit=crop"
  },
  {
    id: 5,
    name: "Dr. Neha Kapoor",
    subject: "Biology",
    rating: "9.4",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=500&fit=crop"
  },
  {
    id: 6,
    name: "Prof. Aman Gupta",
    subject: "Chemistry",
    rating: "9.2",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=500&fit=crop"
  },
  {
    id: 7,
    name: "Ms. Kavya Nair",
    subject: "Economics",
    rating: "9.1",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=500&fit=crop"
  },
  {
    id: 8,
    name: "Mr. Suresh Iyer",
    subject: "History",
    rating: "9.0",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=500&fit=crop"
  }
];

const OurTeachers = () => {
  return (
    <section className="pt-30 pb-15 bg-white">
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
              className="group relative"
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
    </section>
  );
};

export default OurTeachers;