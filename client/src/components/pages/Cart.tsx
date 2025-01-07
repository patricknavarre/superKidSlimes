import React from 'react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-display text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some slime to get started!</p>
        <motion.a
          href="/shop"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:from-teal-600 hover:to-indigo-600 transition-all duration-300"
        >
          Shop Now
        </motion.a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-display text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center py-6 border-b border-gray-200 last:border-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1 ml-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-teal-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:from-teal-600 hover:to-indigo-600 transition-all duration-300"
            onClick={() => {
              // Handle checkout logic here
              console.log('Proceeding to checkout...');
            }}
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 