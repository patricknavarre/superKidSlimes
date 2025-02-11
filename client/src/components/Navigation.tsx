import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navigation = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const wiggleAnimation = {
    animate: {
      rotate: [0, 2, 0, -2, 0],
      scale: [1, 1.02, 1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <nav className="bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl font-display"
                whileHover={{ scale: 1.05 }}
                animate={wiggleAnimation.animate}
              >
                <span className="text-white drop-shadow-lg">Super Kid Slimes</span>
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-pink-200 focus:outline-none border-2 border-black rounded-lg p-1"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/shop" 
                className="bg-white text-pink-500 font-bold py-2 px-6 rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                Shop Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/about" className="text-white hover:text-pink-200 font-medium transition-colors duration-300">
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/contact" className="text-white hover:text-pink-200 font-medium transition-colors duration-300">
                Contact
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/cart" className="text-white hover:text-pink-200 font-medium flex items-center transition-colors duration-300">
                <span className="mr-2">Cart</span>
                {cartCount > 0 && (
                  <div className="w-6 h-6 rounded-full bg-white text-pink-500 flex items-center justify-center text-sm font-bold border-2 border-black">
                    {cartCount}
                  </div>
                )}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            <div className="flex flex-col space-y-4 pb-4">
              <Link 
                to="/shop" 
                className="bg-white text-pink-500 font-bold py-2 px-6 rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] text-center"
              >
                Shop Now
              </Link>
              <Link to="/about" className="text-white hover:text-pink-200 font-medium transition-colors duration-300 text-center">
                About
              </Link>
              <Link to="/contact" className="text-white hover:text-pink-200 font-medium transition-colors duration-300 text-center">
                Contact
              </Link>
              <Link to="/cart" className="text-white hover:text-pink-200 font-medium flex items-center justify-center transition-colors duration-300">
                <span className="mr-2">Cart</span>
                {cartCount > 0 && (
                  <div className="w-6 h-6 rounded-full bg-white text-pink-500 flex items-center justify-center text-sm font-bold border-2 border-black">
                    {cartCount}
                  </div>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 