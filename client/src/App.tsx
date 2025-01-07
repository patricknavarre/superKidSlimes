import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import { CartProvider, useCart } from './context/CartContext';
import { motion } from 'framer-motion';

// Separate component for navigation to use cart context
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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl font-display"
                whileHover={{ scale: 1.05 }}
                animate={wiggleAnimation.animate}
              >
                <span className="text-pink-400">Super</span>{' '}
                <span className="text-purple-400">Kid</span>{' '}
                <span className="text-pink-400">Slimes</span>
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-pink-400 focus:outline-none"
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
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-2 px-6 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/about" className="text-gray-600 hover:text-pink-400 font-medium transition-colors duration-300">
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/contact" className="text-gray-600 hover:text-pink-400 font-medium transition-colors duration-300">
                Contact
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/cart" className="text-gray-600 hover:text-pink-400 font-medium flex items-center transition-colors duration-300">
                <span className="mr-2">Cart</span>
                {cartCount > 0 && (
                  <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-sm font-bold">
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
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-2 px-6 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-md text-center"
              >
                Shop Now
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-pink-400 font-medium transition-colors duration-300 text-center">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-pink-400 font-medium transition-colors duration-300 text-center">
                Contact
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-pink-400 font-medium flex items-center justify-center transition-colors duration-300">
                <span className="mr-2">Cart</span>
                {cartCount > 0 && (
                  <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-sm font-bold">
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

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
          <Navigation />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white mt-12 border-t border-pink-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-display text-lg text-pink-400 mb-4">About Us</h3>
                  <p className="text-gray-600">
                    Creating magical and safe slimes for kids to enjoy and spark their imagination.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
