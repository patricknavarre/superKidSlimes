import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  phone: string;
}

const Cart = () => {
  const { items, removeFromCart, updateQuantity, cartCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const total = items.reduce((sum: number, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const orderDetails = items.map(item => 
      `• ${item.title}\n  - Quantity: ${item.quantity}\n  - Price per item: $${item.price.toFixed(2)}\n  - Subtotal: $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n\n');

    const formattedMessage = `
Customer Information:
-------------------
Name: ${checkoutForm.name}
Email: ${checkoutForm.email}
Phone: ${checkoutForm.phone}
Shipping Address: ${checkoutForm.address}

Order Details:
-------------------
${orderDetails}

Total Order Amount: $${total.toFixed(2)}
    `;

    const emailContent = {
      to_name: "Super Kid Slimes",
      from_name: checkoutForm.name,
      customer_email: checkoutForm.email,
      customer_phone: checkoutForm.phone,
      customer_address: checkoutForm.address,
      message: formattedMessage,
      order_details: orderDetails,
      total_amount: `$${total.toFixed(2)}`,
      reply_to: checkoutForm.email
    };

    try {
      await emailjs.send(
        'service_wg2vx5s',
        'template_rgiuw7b',
        emailContent
      );
      setSubmitStatus('success');
      clearCart();
      setShowForm(false);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartCount === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-pink-200 via-yellow-100 to-orange-200">
        <div className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 p-6 shadow-lg mb-8">
          <motion.h1 
            className="text-4xl font-display text-white text-center font-bold drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Cart ✨
          </motion.h1>
        </div>
        <motion.div 
          className="max-w-2xl mx-auto px-4 py-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black">
            <h2 className="text-2xl font-display font-bold mb-4 text-pink-600">Your cart is empty!</h2>
            <p className="text-gray-600 mb-8">Time to add some magical slimes to your collection! ✨</p>
            <Link
              to="/shop"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              Start Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-200 via-yellow-100 to-orange-200">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 p-6 shadow-lg mb-8">
        <motion.h1 
          className="text-4xl font-display text-white text-center font-bold drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Magical Cart ✨
        </motion.h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {submitStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-6 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur-sm text-green-700 rounded-xl border-2 border-green-500 shadow-lg text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center border-2 border-green-600">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Thank you for your order! ✨</h3>
            <p>We'll be in touch soon with your magical slimes!</p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-xl border-2 border-red-500"
          >
            <p className="text-center">Oops! There was an error processing your order. Please try again.</p>
          </motion.div>
        )}

        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-black overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between py-4 border-b-2 border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-black shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                    <p className="text-pink-600 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 rounded-full border-2 border-black">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors duration-300 rounded-l-full border-r-2 border-black hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors duration-300 rounded-r-full border-l-2 border-black hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 text-red-500 hover:text-red-600 font-medium rounded-full hover:bg-red-50 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-100/50 to-purple-100/50 p-6 border-t-2 border-black">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                ${total.toFixed(2)}
              </span>
            </div>

            {!showForm ? (
              <motion.button 
                onClick={() => setShowForm(true)}
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout ✨
              </motion.button>
            ) : (
              <motion.form 
                onSubmit={handleCheckout} 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={checkoutForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={checkoutForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={checkoutForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Shipping Address</label>
                  <textarea
                    name="address"
                    value={checkoutForm.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Order ✨'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart; 