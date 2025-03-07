import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navigation = () => {
  const { cartCount } = useCart();

  return (
    <div className="relative w-full bg-gradient-to-r from-[#FF8C94] via-[#FFB5A7] to-[#FEC89A] shadow-lg overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#FF8C94] via-[#FFB5A7] to-[#FEC89A] opacity-50"
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
        className="absolute inset-0 bg-gradient-to-r from-[#FEC89A] via-[#FFB5A7] to-[#FF8C94] opacity-50"
        animate={{
          x: ["100%", "0%"],
          transition: {
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      <nav className="relative max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white drop-shadow">
          Tacta Slime
        </Link>
        
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/shop"
              className="px-6 py-2 bg-white/90 text-[#FF8C94] font-bold rounded-full border border-[#FFB5A7] shadow-sm transition-all duration-300 hover:bg-white"
            >
              Shop Now
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/secrets"
              className="px-6 py-2 bg-white/90 text-[#FF8C94] font-bold rounded-full border border-[#FFB5A7] shadow-sm transition-all duration-300 hover:bg-white"
            >
              Slime Secrets
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/cart"
              className="relative px-6 py-2 bg-white/90 text-[#FF8C94] font-bold rounded-full border border-[#FFB5A7] shadow-sm transition-all duration-300 hover:bg-white"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gradient-to-r from-[#FF8C94] to-[#FFB5A7] text-white text-sm font-bold rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </motion.div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation; 