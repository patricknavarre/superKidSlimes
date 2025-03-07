import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Cart from './components/pages/Cart';
import SuperSlimeSecrets from './components/pages/SuperSlimeSecrets';
import Navigation from './components/Navigation';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import emailjs from '@emailjs/browser';
import AdminDashboard from './components/pages/AdminDashboard';
import Login from './components/pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

const App = () => {
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('FsKNSDRtYP7OliZQs');
  }, []);

  return (
    <AuthProvider>
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
                <Route path="/secrets" element={<SuperSlimeSecrets />} />
                <Route path="/admin/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
