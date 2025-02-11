import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-pink-200 via-yellow-100 to-orange-200 min-h-screen">
      {/* Header Section with gradient */}
      <div className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 p-6 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-display text-white mb-4 font-bold drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Super Kid Slimes ✨
          </motion.h1>
          <motion.p 
            className="text-2xl text-white/90 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Where Magic Meets Squish!
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Story Section */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-display text-pink-600 mb-6 font-bold">Our Story 🌟</h2>
          <p className="text-gray-700 text-lg mb-6">
            Welcome to Super Kid Slimes! We're passionate about creating the most amazing,
            safe, and fun slimes for kids of all ages. Our journey began with a simple dream:
            to bring joy and creativity to children through the magical world of slime!
          </p>
          <p className="text-gray-700 text-lg">
            Every slime we make is handcrafted with love and care, using only the highest quality
            ingredients that are safe for children. We believe that play should be both fun AND safe,
            which is why we thoroughly test each batch to ensure it provides the perfect
            balance of stretch, squish, and satisfaction.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-display text-purple-600 mb-4 font-bold">
              Our Mission ✨
            </h2>
            <p className="text-gray-600">
              To create the most amazing, safe, and fun slimes that inspire creativity
              and bring joy to kids everywhere. We believe in making every squish count!
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-2xl font-display text-pink-600 mb-4 font-bold">
              Quality Promise ✨
            </h2>
            <p className="text-gray-600">
              We use only the highest quality ingredients and thoroughly test each
              batch for safety and fun factor. Your satisfaction and safety are our
              top priorities!
            </p>
          </motion.div>
        </div>

        {/* Process Section */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <h2 className="text-3xl font-display text-purple-600 mb-6 font-bold">Our Process 🔮</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl border-2 border-black shadow-lg">
                1
              </div>
              <h3 className="text-xl font-display text-gray-800 mb-2">Create</h3>
              <p className="text-gray-600">
                We carefully mix our special ingredients to create the perfect slime texture
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl border-2 border-black shadow-lg">
                2
              </div>
              <h3 className="text-xl font-display text-gray-800 mb-2">Test</h3>
              <p className="text-gray-600">
                Each batch is thoroughly tested for stretchiness, squishiness, and safety
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl border-2 border-black shadow-lg">
                3
              </div>
              <h3 className="text-xl font-display text-gray-800 mb-2">Package</h3>
              <p className="text-gray-600">
                We package each slime with care and add a sprinkle of magic ✨
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 