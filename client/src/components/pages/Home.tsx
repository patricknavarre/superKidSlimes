import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactConfetti from 'react-confetti';

const Home = () => {
  const [timeUntilNextDrop, setTimeUntilNextDrop] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [confettiActive, setConfettiActive] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update window dimensions when resizing
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stop initial confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Calculate time until next Friday 7PM EST
  useEffect(() => {
    const calculateTimeUntilNextDrop = () => {
      const now = new Date();
      const nextDrop = new Date();
      nextDrop.setUTCHours(23, 0, 0, 0); // 7PM EST = 23:00 UTC
      nextDrop.setDate(nextDrop.getDate() + ((5 + 7 - nextDrop.getDay()) % 7)); // Next Friday

      if (now > nextDrop) {
        nextDrop.setDate(nextDrop.getDate() + 7);
      }

      const diff = nextDrop.getTime() - now.getTime();
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      setTimeUntilNextDrop(calculateTimeUntilNextDrop());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      className="w-full bg-gradient-to-b from-pink-200 via-yellow-100 to-orange-200"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {confettiActive && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={['#ec4899', '#f59e0b', '#f472b6', '#fcd34d']}
        />
      )}

      {/* Hero Section with Countdown */}
      <div className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-5xl font-display text-white mb-8 text-center font-bold drop-shadow-lg"
            variants={itemVariants}
            onHoverStart={() => setConfettiActive(true)}
          >
            Super Kid Slimes
          </motion.h1>
          <motion.p 
            className="text-2xl text-white/90 text-center mb-8"
            variants={itemVariants}
          >
            Discover the Most Amazing Handmade Slimes!
          </motion.p>
          
          {/* Next Drop Countdown */}
          <motion.div 
            className="bg-white/30 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-white/20 mb-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-white drop-shadow">Next Drop: Friday 7PM EST</h2>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-pink-600">{timeUntilNextDrop.days}</div>
                <div className="text-sm text-pink-600 font-medium">Days</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-orange-600">{timeUntilNextDrop.hours}</div>
                <div className="text-sm text-orange-600 font-medium">Hours</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-yellow-600">{timeUntilNextDrop.minutes}</div>
                <div className="text-sm text-yellow-600 font-medium">Minutes</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-pink-600">{timeUntilNextDrop.seconds}</div>
                <div className="text-sm text-pink-600 font-medium">Seconds</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <Link 
              to="/shop"
              className="inline-block px-8 py-4 bg-white text-pink-500 font-bold rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              onMouseEnter={() => setConfettiActive(true)}
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          className="text-4xl font-display mb-12 text-center text-pink-600 drop-shadow-lg"
          variants={itemVariants}
        >
          Why Choose Super Kid Slimes?
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            variants={itemVariants}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl mb-6 border-2 border-black" />
            <h3 className="text-xl font-semibold mb-4 text-pink-600">Premium Quality</h3>
            <p className="text-gray-600">Handcrafted with love using the finest ingredients for the perfect texture.</p>
          </motion.div>

          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            variants={itemVariants}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl mb-6 border-2 border-black" />
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Kid-Approved</h3>
            <p className="text-gray-600">Tested and loved by kids, guaranteed to provide hours of entertainment.</p>
          </motion.div>

          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            variants={itemVariants}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-xl mb-6 border-2 border-black" />
            <h3 className="text-xl font-semibold mb-4 text-yellow-600">Safe & Non-Toxic</h3>
            <p className="text-gray-600">Made with safe, non-toxic ingredients that parents can trust.</p>
          </motion.div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
          variants={itemVariants}
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-pink-600 mb-6">
              Meet Our Founder
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Super Kid Slimes was founded by a young entrepreneur with a passion for creating the perfect slime. 
              What started as a fun hobby turned into an amazing business that brings joy to kids everywhere!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white border-2 border-black">
                ✨ Young Entrepreneur
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white border-2 border-black">
                ✌️ Kid-Approved
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home; 