import React, { useState, useRef } from 'react';
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

    // Create the email content
    const orderDetails = items.map(item => 
      `${item.title} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}`
    ).join('\\n');

    const emailContent = {
      to_email: 'househeadpat@gmail.com',
      from_name: checkoutForm.name,
      customer_email: checkoutForm.email,
      customer_phone: checkoutForm.phone,
      customer_address: checkoutForm.address,
      order_details: orderDetails,
      total_amount: `$${total.toFixed(2)}`,
    };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your Email.js service ID
        'YOUR_TEMPLATE_ID', // Replace with your Email.js template ID
        emailContent,
        'YOUR_PUBLIC_KEY' // Replace with your Email.js public key
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
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any slimes to your cart yet!</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Thank you for your order! We'll be in touch soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          There was an error processing your order. Please try again.
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between py-4 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>

          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={checkoutForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={checkoutForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={checkoutForm.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <textarea
                  name="address"
                  value={checkoutForm.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 