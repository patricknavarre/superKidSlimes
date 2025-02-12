import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-300 flex justify-between items-center"
      >
        <span className="font-bold text-gray-800">{question}</span>
        <span className="text-pink-500 text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-pink-50 rounded-b-xl border-x-2 border-b-2 border-black mt-[-2px]">
              {typeof answer === 'string' ? (
                <p className="text-gray-700">{answer}</p>
              ) : (
                answer
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SuperSlimeSecrets = () => {
  const [openFAQs, setOpenFAQs] = useState<{ [key: string]: boolean }>({});

  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-pink-200 via-yellow-100 to-orange-200 min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 p-6 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-display text-white mb-4 font-bold drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Super Slime Secrets ✨
          </motion.h1>
          <motion.p 
            className="text-2xl text-white/90 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your Magical Guide to All Things Slime!
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Introduction Section */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-display text-pink-600 mb-6 font-bold"
            variants={itemVariants}
          >
            Welcome to the Magical World of Slime! 🌟
          </motion.h2>
          <motion.p 
            className="text-gray-700 text-lg mb-6"
            variants={itemVariants}
          >
            Whether you're a first-time slimer or buying for someone special, you've come to the right place! 
            Let's dive into everything you need to know about our magical slimes.
          </motion.p>
        </motion.div>

        {/* Best Slimes for Beginners */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-display text-purple-600 mb-4 font-bold">
              Perfect First Slimes ✨
            </h2>
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                <h3 className="font-bold text-purple-600 mb-2">Cloud Dream Slime</h3>
                <p className="text-gray-600">
                  Super soft and fluffy! Perfect for beginners with its easy-to-handle texture and long-lasting formula.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200">
                <h3 className="font-bold text-pink-600 mb-2">Butter Bliss Slime</h3>
                <p className="text-gray-600">
                  Smooth and creamy texture that's easy to play with. Great for stress relief!
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-display text-pink-600 mb-4 font-bold">
              When to Buy? 🎁
            </h2>
            <p className="text-gray-600 mb-4">
              For the best slime experience, we recommend:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">✨</span>
                Best to play with within 2-3 weeks of purchase
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">✨</span>
                Store in a cool, dry place
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">✨</span>
                Keep container sealed when not in use
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Slime Care Tips */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-display text-pink-600 mb-6 font-bold"
            variants={itemVariants}
          >
            Magical Slime Care Tips 🪄
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-pink-600 mb-3">Before Playing</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✨ Wash hands thoroughly</li>
                <li>✨ Avoid hand lotions</li>
                <li>✨ Clean play surface</li>
              </ul>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-orange-600 mb-3">During Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✨ Keep away from carpet</li>
                <li>✨ Use quick, fun movements</li>
                <li>✨ Don't mix different slimes</li>
              </ul>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-purple-600 mb-3">Storage</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✨ Always seal container</li>
                <li>✨ Store at room temperature</li>
                <li>✨ Keep away from direct sun</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Add new FAQ Section before the "Ready to Shop" section */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-display text-pink-600 mb-6 font-bold"
            variants={itemVariants}
          >
            Frequently Asked Questions ✨
          </motion.h2>

          <div className="space-y-4">
            <FAQItem
              question="Who can enjoy playing with slime?"
              answer="Everyone! Slime is a wonderful sensory toy that brings joy to both children and adults. It's perfect for stress relief, sensory play, and creative expression. The satisfying texture and playful nature make it a fantastic activity for all ages!"
              isOpen={openFAQs['age']}
              onToggle={() => toggleFAQ('age')}
            />

            <FAQItem
              question="Is slime safe to eat?"
              answer={
                <div className="space-y-2">
                  <p className="font-bold text-red-600">No! Slime is strictly for external play only.</p>
                  <p>While our slimes may look and smell delicious, they are NOT edible and should never be consumed. Always supervise young children during play.</p>
                </div>
              }
              isOpen={openFAQs['edible']}
              onToggle={() => toggleFAQ('edible')}
            />

            <FAQItem
              question="Help! My slime is too sticky!"
              answer={
                <div className="space-y-2">
                  <p>Don't worry! Sticky slime is easily fixable. Here's what you can do:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Make a simple activator solution at home by mixing 1 cup of warm water with 1 tablespoon of borax</li>
                    <li>Add a few drops of the solution and knead thoroughly</li>
                    <li>Repeat if needed until desired texture is achieved</li>
                    <li>Remember: less is more! Add small amounts at a time</li>
                  </ul>
                </div>
              }
              isOpen={openFAQs['sticky']}
              onToggle={() => toggleFAQ('sticky')}
            />

            <FAQItem
              question="My slime isn't stretchy anymore!"
              answer={
                <div className="space-y-2">
                  <p>This is common and easy to fix! Slime can become less stretchy due to temperature or time. Try these solutions:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Warm it up by playing with it in your hands</li>
                    <li>Add a tiny bit of lotion or hand sanitizer</li>
                    <li>Store in a warm, dry place until it softens</li>
                    <li>Note: For clear slimes, avoid lotion as it may cause cloudiness</li>
                  </ul>
                </div>
              }
              isOpen={openFAQs['stretchy']}
              onToggle={() => toggleFAQ('stretchy')}
            />

            <FAQItem
              question="Help! My slime is too stiff!"
              answer="No worries! If your slime becomes too firm after adding activator solution, simply seal it in its container and let it rest in a warm, dry place. The texture will naturally soften over time, usually taking anywhere from a few days to a few weeks depending on how much activator was used. Patience is key!"
              isOpen={openFAQs['stiff']}
              onToggle={() => toggleFAQ('stiff')}
            />
          </div>
        </motion.div>

        {/* Ready to Shop Section */}
        <motion.div 
          className="text-center py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl font-display text-pink-600 mb-6 font-bold"
            variants={itemVariants}
          >
            Ready to Start Your Slime Adventure? ✨
          </motion.h2>
          <motion.div variants={itemVariants}>
            <Link 
              to="/shop"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              Shop Magical Slimes
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperSlimeSecrets; 