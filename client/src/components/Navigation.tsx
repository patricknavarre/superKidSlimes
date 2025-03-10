import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import TactaLogo from "../assets/images/image002.png";
import TactaBadge from "../assets/images/image001.png";

const Navigation = () => {
  const { cart } = useCart();

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#FF8C94] via-[#FFB5A7] to-[#FEC89A]"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <div className="relative flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center space-x-2">
            {/* Show badge on mobile, wordmark on larger screens */}
            <img 
              src={TactaBadge}
              alt="Tacta Slime Co Badge" 
              className="h-12 w-12 md:hidden"
            />
            <img 
              src={TactaLogo}
              alt="Tacta Slime Company" 
              className="hidden md:block h-12 w-auto"
            />
          </Link>

          <nav className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/shop"
              className="px-3 md:px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-[#FF1493] font-medium hover:bg-white/95 transition-colors text-sm md:text-base"
            >
              Shop Now
            </Link>
            <Link
              to="/secrets"
              className="px-3 md:px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-[#FF1493] font-medium hover:bg-white/95 transition-colors text-sm md:text-base"
            >
              Slime Secrets
            </Link>
            <Link
              to="/cart"
              className="px-3 md:px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm text-[#FF1493] font-medium hover:bg-white/95 transition-colors relative text-sm md:text-base"
            >
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 md:h-6 md:w-6 flex items-center justify-center rounded-full bg-[#FF1493] text-white text-xs md:text-sm font-medium">
                  {cart.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation; 