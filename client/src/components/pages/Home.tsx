import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import tactalogo from '../../assets/images/image001.png';

const Home: React.FC = () => {
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
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1493] via-[#FF69B4] to-[#FFB6C1]"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.img
              src={tactalogo}
              alt="Tacta Slime Co."
              className="w-64 h-64 mx-auto mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h1 
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF1493] to-[#FF69B4]"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to Tacta Slime Co.
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover our magical world of handcrafted slimes
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link 
                to="/shop" 
                className="px-8 py-3 bg-[#FF1493] text-white rounded-full font-bold hover:bg-[#FF1493]/90 transition-colors shadow-lg hover:shadow-[#FF1493]/20"
              >
                Shop Now
              </Link>
              <Link 
                to="/secrets" 
                className="px-8 py-3 bg-transparent border-2 border-[#FF1493] text-[#FF1493] rounded-full font-bold hover:bg-[#FF1493]/10 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FF1493] rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                transform: `scale(${Math.random() * 2 + 0.5})`,
              }}
            />
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#1a1a1a]/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Handcrafted",
                description: "Each slime is carefully made with love and attention to detail"
              },
              {
                title: "Premium Quality",
                description: "Using only the finest ingredients for the perfect texture"
              },
              {
                title: "Unique Designs",
                description: "Creative and innovative slime experiences"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-[#FF1493]/20"
              >
                <h3 className="text-xl font-bold mb-4 text-[#FF1493]">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 