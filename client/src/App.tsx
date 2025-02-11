import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import Navigation from './components/Navigation';
import { CartProvider } from './context/CartContext';
import emailjs from '@emailjs/browser';

const App = () => {
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('FsKNSDRtYP7OliZQs');
  }, []);

  return (
    <CartProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 via-purple-50 to-white overflow-x-hidden flex flex-col">
          <Navigation />

          {/* Main Content */}
          <main className="w-full flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          {/* Enhanced Footer */}
          <footer className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl text-white mb-4 font-bold drop-shadow-lg">About Us ✨</h3>
                  <p className="text-white/90 mb-6">
                    Creating magical and safe slimes for kids to enjoy and spark their imagination.
                  </p>
                  <Link 
                    to="/about" 
                    className="inline-block bg-white text-pink-500 font-bold py-2 px-6 rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    Learn More
                  </Link>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl text-white mb-4 font-bold drop-shadow-lg">Contact Us ✨</h3>
                  <p className="text-white/90 mb-6">
                    Have questions? We'd love to hear from you! Send us a message and we'll respond as soon as possible.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-block bg-white text-pink-500 font-bold py-2 px-6 rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    Get in Touch
                  </Link>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="font-display text-xl text-white mb-4 font-bold drop-shadow-lg">Follow Us ✨</h3>
                  <p className="text-white/90 mb-6">
                    Stay updated with our latest slimes and special offers!
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    <a 
                      href="#" 
                      className="bg-white text-pink-500 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      <span className="text-2xl">✨</span>
                    </a>
                    <a 
                      href="#" 
                      className="bg-white text-pink-500 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      <span className="text-2xl">🌟</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20 text-center">
                <p className="text-white/90 font-medium">
                  © {new Date().getFullYear()} Super Kid Slimes. All rights reserved. ✨
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
