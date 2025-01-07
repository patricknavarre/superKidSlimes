import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center relative overflow-hidden py-16">
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fun-purple opacity-20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fun-blue opacity-20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fun-pink opacity-20 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-display text-slime mb-8 animate-bounce-slow">
            Welcome to Super Kid Slimes!
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the most amazing handmade slimes for endless fun and creativity!
          </p>
          <Link to="/shop" className="btn-primary text-lg px-8 py-3 text-xl">
            Start Shopping
          </Link>
        </motion.div>
      </section>

      {/* Founder Story Section */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-display text-fun-purple mb-4">
                Meet Our Founder
              </h2>
              <p className="text-xl text-gray-600">
                Super Kid Slimes was founded by a 9-year-old entrepreneur with a passion for creating the perfect slime. 
                What started as a fun hobby turned into an amazing business that brings joy to kids everywhere!
              </p>
              <div className="flex gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-fun-purple bg-opacity-10 text-fun-purple font-bold">
                  🌟 Young Entrepreneur
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-fun-pink bg-opacity-10 text-fun-pink font-bold">
                  ✨ Kid-Approved
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-fun-purple/20 to-fun-pink/20 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-fun-blue/20 to-slime/20 rounded-2xl transform -rotate-3"></div>
              <div className="relative bg-gray-100 rounded-2xl h-full min-h-[300px] flex items-center justify-center">
                <span className="text-6xl">🧪</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        <motion.div 
          className="card text-center transform hover:scale-105 transition-transform duration-200 overflow-hidden group"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fun-purple/5 to-fun-pink/5 transform group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative">
            <div className="text-fun-purple text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-200">✨</div>
            <h2 className="text-3xl font-display text-fun-purple mb-4">
              Sparkle Magic
            </h2>
            <p className="text-gray-600 text-lg">
              Watch your slime shimmer and shine with our special sparkle formula! Each slime has its own unique glitter pattern!
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="card text-center transform hover:scale-105 transition-transform duration-200 overflow-hidden group"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fun-blue/5 to-slime/5 transform group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative">
            <div className="text-fun-blue text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-200">🌟</div>
            <h2 className="text-3xl font-display text-fun-blue mb-4">
              Magical Textures
            </h2>
            <p className="text-gray-600 text-lg">
              From fluffy to crunchy, experience different sensations! Each slime is a new adventure!
            </p>
          </div>
        </motion.div>
      </section>

      {/* Latest Products Preview */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-5xl font-display text-slime text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Latest Creations
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div 
                key={index} 
                className="card group transform hover:scale-105 transition-all duration-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-fun-purple/10 to-fun-pink/10 flex items-center justify-center text-4xl">
                    🎨
                  </div>
                </div>
                <h3 className="font-display text-xl text-gray-800 group-hover:text-slime transition-colors">
                  Coming Soon!
                </h3>
                <p className="text-gray-500">$9.99</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 