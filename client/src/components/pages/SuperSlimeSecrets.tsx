import React from 'react';
import { motion } from 'framer-motion';

const SuperSlimeSecrets: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const tips = [
    {
      title: "Storage Tips",
      content: "Keep your slime in an airtight container at room temperature. Avoid direct sunlight and extreme temperatures."
    },
    {
      title: "Activation Guide",
      content: "If your slime becomes sticky, knead in a few drops of activator solution. If it's too firm, add a tiny amount of lotion."
    },
    {
      title: "Playing Tips",
      content: "Always start with clean, dry hands. Take breaks between play sessions to maintain the slime's texture."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-16">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FF1493] to-[#FF69B4]"
          variants={itemVariants}
        >
          Slime Care Secrets
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-2xl border border-[#FF1493]/20 hover:border-[#FF1493]/40 transition-colors"
            >
              <h2 className="text-xl font-bold mb-4 text-[#FF1493]">{tip.title}</h2>
              <p className="text-gray-300">{tip.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 max-w-2xl mx-auto text-center"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#FF1493]">Need More Help?</h2>
          <p className="text-gray-300 mb-8">
            Have questions about caring for your slime? Feel free to reach out to us on Instagram or email!
          </p>
          <a 
            href="mailto:contact@tactaslime.com"
            className="inline-block px-8 py-3 bg-[#FF1493] text-white rounded-full font-bold hover:bg-[#FF1493]/90 transition-colors shadow-lg hover:shadow-[#FF1493]/20"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuperSlimeSecrets; 