import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  const glowAnimation = {
    scale: [1, 1.02],
    boxShadow: [
      "0 0 0 rgba(0, 255, 170, 0.4)",
      "0 0 20px rgba(0, 255, 170, 0.6)",
      "0 0 0 rgba(0, 255, 170, 0.4)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6"
            variants={itemVariants}
          >
            Welcome to Super Kid Slimes!
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Discover the most amazing handmade slimes for endless fun and creativity!
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link 
              to="/shop"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full hover:from-emerald-500 hover:to-cyan-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </Link>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-20"
          animate={floatAnimation}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-20"
          animate={floatAnimation}
        />
      </div>

      {/* Features Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            variants={itemVariants}
            whileHover={glowAnimation}
          >
            <div className="h-12 w-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl mb-6" />
            <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
            <p className="text-gray-600">Handcrafted with love using the finest ingredients for the perfect texture.</p>
          </motion.div>

          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
            variants={itemVariants}
            whileHover={glowAnimation}
          >
            <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl mb-6" />
            <h3 className="text-xl font-semibold mb-4">Kid-Approved</h3>
            <p className="text-gray-600">Tested and loved by kids, guaranteed to provide hours of entertainment.</p>
          </motion.div>

          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl md:col-span-2 lg:col-span-1"
            variants={itemVariants}
            whileHover={glowAnimation}
          >
            <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl mb-6" />
            <h3 className="text-xl font-semibold mb-4">Safe & Non-Toxic</h3>
            <p className="text-gray-600">Made with safe, non-toxic ingredients that parents can trust.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Founder Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
          <motion.div className="grid md:grid-cols-2 gap-12 items-center" variants={itemVariants}>
            <div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                Meet Our Founder
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Super Kid Slimes was founded by a 9-year-old entrepreneur with a passion for creating the perfect slime. 
                What started as a fun hobby turned into an amazing business that brings joy to kids everywhere!
              </p>
              <div className="flex gap-4">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-600">
                  ✨ Young Entrepreneur
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-600">
                  ✌️ Kid-Approved
                </span>
              </div>
            </div>
            <motion.div 
              className="relative"
              animate={floatAnimation}
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
                <motion.div 
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                    transition: {
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home; 