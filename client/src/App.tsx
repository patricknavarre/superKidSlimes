import React from 'react';
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
  
  const wiggleAnimation = {
    animate: {
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                className="text-3xl font-display"
                whileHover={{ scale: 1.05 }}
                animate={wiggleAnimation.animate}
              >
                <span className="text-teal-500">Super</span>{' '}
                <span className="text-indigo-500">Kid</span>{' '}
                <span className="text-teal-500">Slimes</span>
              </motion.div>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/shop" 
                className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold py-2 px-6 rounded-full hover:from-teal-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
              >
                Shop Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/about" className="text-gray-600 hover:text-teal-500 font-medium transition-colors duration-300">
                About
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/contact" className="text-gray-600 hover:text-teal-500 font-medium transition-colors duration-300">
                Contact
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/cart" className="text-gray-600 hover:text-teal-500 font-medium flex items-center transition-colors duration-300">
                <span className="mr-2">Cart</span>
                {cartCount > 0 && (
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold">
                    {cartCount}
                  </div>
                )}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-teal-50 via-indigo-50 to-white">
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
          <footer className="bg-white mt-12 border-t border-teal-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-display text-lg text-teal-500 mb-4">About Us</h3>
                  <p className="text-gray-600">
                    Creating fun and safe slimes for kids to enjoy and explore their creativity.
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
