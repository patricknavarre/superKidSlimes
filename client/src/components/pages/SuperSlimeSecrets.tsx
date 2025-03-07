import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SuperSlimeSecrets = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-4 text-[#FF8C94]"
          variants={itemVariants}
        >
          Slime Secrets ✨
        </motion.h1>
        <motion.p 
          className="text-lg text-center mb-12 text-[#FF8C94]/80"
          variants={itemVariants}
        >
          Your Magical Guide to All Things Slime!
        </motion.p>

        {/* Welcome Section */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 border-2 border-[#FFB5A7] shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)]"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-[#FF8C94] mb-4">Welcome to the Magical World of Slime! ✨</h2>
          <p className="text-[#FF8C94]/80 leading-relaxed">
            Whether you're a first-time slimer or buying for someone special, you've come to the right place! 
            Let's dive into everything you need to know about our magical slimes.
          </p>
        </motion.div>

        {/* Perfect First Slimes */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 border-2 border-[#FFB5A7] shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)]"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-[#FF8C94] mb-6">Perfect First Slimes ✨</h2>
          <div className="grid gap-6">
            <div className="bg-gradient-to-r from-[#FFB5A7]/10 via-[#FEC89A]/10 to-[#F8EDEB]/10 rounded-xl p-6 border border-[#FFB5A7]/20">
              <h3 className="text-xl font-bold text-[#FF8C94] mb-2">Cloud Dream Slime</h3>
              <p className="text-[#FF8C94]/80">
                Super soft and fluffy! Perfect for beginners with its easy-to-handle texture and long-lasting formula.
              </p>
            </div>
            <div className="bg-gradient-to-r from-[#FFB5A7]/10 via-[#FEC89A]/10 to-[#F8EDEB]/10 rounded-xl p-6 border border-[#FFB5A7]/20">
              <h3 className="text-xl font-bold text-[#FF8C94] mb-2">Butter Blast</h3>
              <p className="text-[#FF8C94]/80">
                Smooth and spreadable with amazing stretch. A classic choice that's always satisfying to play with.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Slime Care Guide */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-12 border-2 border-[#FFB5A7] shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)]"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-[#FF8C94] mb-6">Slime Care Guide 🌟</h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FFB5A7] to-[#FEC89A] rounded-full flex items-center justify-center flex-shrink-0 border border-white/50">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#FF8C94] mb-1">Storage</h3>
                <p className="text-[#FF8C94]/80">Keep your slime in an airtight container at room temperature, away from direct sunlight.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FFB5A7] to-[#FEC89A] rounded-full flex items-center justify-center flex-shrink-0 border border-white/50">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#FF8C94] mb-1">Playing</h3>
                <p className="text-[#FF8C94]/80">Always start with clean, dry hands. Take breaks if the slime becomes too sticky.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FFB5A7] to-[#FEC89A] rounded-full flex items-center justify-center flex-shrink-0 border border-white/50">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#FF8C94] mb-1">Maintenance</h3>
                <p className="text-[#FF8C94]/80">If your slime becomes sticky, knead in a tiny amount of activator. If it's too firm, add a drop of lotion.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ready to Shop */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-[#FFB5A7] shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)]"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-[#FF8C94] mb-4">Ready to Start Your Slime Adventure? 🎉</h2>
          <p className="text-[#FF8C94]/80 mb-6">
            Browse our collection and find your perfect match!
          </p>
          <Link 
            to="/shop"
            className="inline-block bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 border-2 border-white/50 shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,181,167,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuperSlimeSecrets; 