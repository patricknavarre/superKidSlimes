import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [timeUntilNextDrop, setTimeUntilNextDrop] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);

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
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE5D9]">
      <div className="relative w-full bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] p-6 shadow-lg overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] opacity-50"
          animate={{
            x: ["0%", "-100%"],
            transition: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#F8EDEB] via-[#FEC89A] to-[#FFB5A7] opacity-50"
          animate={{
            x: ["100%", "0%"],
            transition: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tacta Slime
          </motion.h1>
          <motion.p 
            className="text-2xl text-white mb-4 drop-shadow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the Art of Texture
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-[#FFB5A7] mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#FF8C94] mb-6 text-center">Next Collection Drop</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-4 border border-[#FFB5A7] shadow-sm">
                <span className="block text-4xl font-bold text-[#FF8C94] mb-1">{timeUntilNextDrop.days}</span>
                <span className="text-gray-500 text-sm">Days</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FEC89A] via-[#F8EDEB] to-[#FFB5A7] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-4 border border-[#FEC89A] shadow-sm">
                <span className="block text-4xl font-bold text-[#FEC89A] mb-1">{timeUntilNextDrop.hours}</span>
                <span className="text-gray-500 text-sm">Hours</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F8EDEB] via-[#FFB5A7] to-[#FEC89A] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-4 border border-[#F8EDEB] shadow-sm">
                <span className="block text-4xl font-bold text-[#FFB5A7] mb-1">{timeUntilNextDrop.minutes}</span>
                <span className="text-gray-500 text-sm">Minutes</span>
              </div>
            </motion.div>
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-4 border border-[#FFB5A7] shadow-sm">
                <span className="block text-4xl font-bold text-[#FF8C94] mb-1">{timeUntilNextDrop.seconds}</span>
                <span className="text-gray-500 text-sm">Seconds</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] text-white font-bold rounded-xl transition-all duration-300 border border-[#FFB5A7] shadow-sm hover:shadow-md hover:scale-[1.02]"
          >
            Explore Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 