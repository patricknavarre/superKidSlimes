import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import Navigation from './components/Navigation';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 via-purple-50 to-white overflow-x-hidden">
          <Navigation />

          {/* Main Content */}
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-display text-lg text-white mb-4">About Us</h3>
                  <p className="text-white/80">
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
