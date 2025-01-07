import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Cart = () => {
  // This will be replaced with actual cart state management later
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Galaxy Glitter Slime',
      price: 12.99,
      quantity: 2,
    },
    {
      id: '2',
      name: 'Unicorn Cloud Slime',
      price: 14.99,
      quantity: 1,
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 text-center"
          variants={itemVariants}
        >
          Your Magical Cart
        </motion.h1>

        {cartItems.length > 0 ? (
          <>
            <motion.div className="space-y-4" variants={containerVariants}>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-purple-500 font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-600">Total</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                className="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="text-center py-12"
            variants={itemVariants}
          >
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some magical slimes to get started!</p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart; 