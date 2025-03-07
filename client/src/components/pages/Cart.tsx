import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Dialog } from '@headlessui/react';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  total: number;
  clearCart: () => void;
  setShowSuccessModal: (show: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel>
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#FFB5A7] max-w-sm w-full relative overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] opacity-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                />

                <motion.div 
                  className="space-y-4 text-center relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-700 font-medium">
                    Your magical slimes will be hand-delivered with extra sparkles! ✨
                  </p>

                  <div className="bg-gradient-to-br from-[#FFB5A7]/10 via-[#FEC89A]/10 to-[#F8EDEB]/10 rounded-xl p-4 border-2 border-[#FFB5A7] shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)]">
                    <h3 className="font-bold text-[#FFB5A7] mb-2">Payment Due on Delivery</h3>
                    <p className="text-gray-600">We accept:</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <span className="px-4 py-2 bg-gradient-to-r from-[#FFB5A7] to-[#FEC89A] text-white rounded-full font-bold border-2 border-white/50">
                        Venmo
                      </span>
                      <span className="px-4 py-2 bg-gradient-to-r from-[#FEC89A] to-[#F8EDEB] text-[#FFB5A7] rounded-full font-bold border-2 border-[#FFB5A7]">
                        Cash
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={onClose}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] text-white font-bold rounded-xl transition-all duration-300 border-2 border-white/50 shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,181,167,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Got it! 🌟
                  </motion.button>
                </motion.div>
              </motion.div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, total, clearCart, setShowSuccessModal }) => {
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Format order details
    const orderDetails = cartItems.map(item => 
      `• ${item.title}\n  - Quantity: ${item.quantity}\n  - Price per item: $${item.price.toFixed(2)}\n  - Subtotal: $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n\n');

    const formattedMessage = `
Customer Information:
-------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Shipping Address: ${formData.address}

Order Details:
-------------------
${orderDetails}

Total Order Amount: $${total.toFixed(2)}
    `;

    const emailContent = {
      to_name: "Tacta Slime",
      from_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_address: formData.address,
      message: formattedMessage,
      order_details: orderDetails,
      total_amount: `$${total.toFixed(2)}`,
      reply_to: formData.email
    };

    try {
      await emailjs.send(
        'service_wg2vx5s',
        'template_rgiuw7b',
        emailContent,
        'FsKNSDRtYP7OliZQs'
      );
      
      // Clear the cart first
      clearCart();
      // Close the checkout modal
      onClose();
      // Add a small delay before showing success modal to ensure smooth transition
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 300);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel>
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#FFB5A7] max-w-md w-full relative overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB5A7]/5 via-[#FEC89A]/5 to-[#F8EDEB]/5" />
                
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  <h2 className="text-2xl font-bold text-[#FFB5A7] mb-6">Checkout</h2>
                  
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border-2 border-[#FFB5A7]/20 focus:border-[#FFB5A7] focus:outline-none"
                      placeholder="Your name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border-2 border-[#FFB5A7]/20 focus:border-[#FFB5A7] focus:outline-none"
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-xl border-2 border-[#FFB5A7]/20 focus:border-[#FFB5A7] focus:outline-none"
                      placeholder="Your phone number"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 rounded-xl border-2 border-[#FFB5A7]/20 focus:border-[#FFB5A7] focus:outline-none"
                      placeholder="Your shipping address"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] text-white font-bold rounded-xl transition-all duration-300 border-2 border-white/50 shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,181,167,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Place Order'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </Dialog.Panel>
      </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Add console log to debug modal state
  useEffect(() => {
    console.log('Success modal state:', showSuccessModal);
  }, [showSuccessModal]);

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      const itemToUpdate = items.find(item => item.id === id);
      if (itemToUpdate) {
        const updatedQuantity = Math.max(1, newQuantity);
        console.log('Updating quantity:', { id, oldQuantity: itemToUpdate.quantity, newQuantity: updatedQuantity });
        updateQuantity(id, updatedQuantity);
      }
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  // Always render the SuccessModal outside the conditional render
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB]">
      {/* Always render the SuccessModal first */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false);
          // Optional: Navigate to shop after closing success modal
          // window.location.href = '/shop';
        }} 
      />
      
      {cartCount === 0 && !showSuccessModal ? (
        <>
          <div className="w-full bg-white/80 backdrop-blur-sm p-6 shadow-lg mb-8 border-b-2 border-[#FFB5A7]/20">
            <motion.h1 
              className="text-4xl font-bold text-[#FFB5A7] text-center"
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
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-[#FFB5A7]/20">
              <h2 className="text-2xl font-bold mb-4 text-[#FFB5A7]">Your cart is empty!</h2>
              <p className="text-gray-600 mb-8">Time to add some magical slimes to your collection! ✨</p>
              <Link
                to="/shop"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] text-white font-bold rounded-xl transition-all duration-300 border-2 border-white/50 shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,181,167,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                Start Shopping
              </Link>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <CheckoutModal 
            isOpen={showCheckoutModal}
            onClose={() => setShowCheckoutModal(false)}
            cartItems={items}
            total={total}
            clearCart={clearCart}
            setShowSuccessModal={setShowSuccessModal}
          />

          {/* Header */}
          <div className="w-full bg-white/80 backdrop-blur-sm p-6 shadow-lg mb-8 border-b-2 border-[#FFB5A7]/20">
            <motion.h1 
              className="text-4xl font-bold text-[#FFB5A7] text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Magical Cart ✨
            </motion.h1>
          </div>

          {/* Cart Items */}
          <div className="max-w-4xl mx-auto px-4 py-8">
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-[#FFB5A7]/20 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between py-4 border-b-2 border-[#FFB5A7]/10 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FFB5A7]/20 via-[#FEC89A]/20 to-[#F8EDEB]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                          src={item.image || 'https://via.placeholder.com/100'}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg border-2 border-[#FFB5A7]/20"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#FFB5A7]">{item.title}</h3>
                        <p className="text-[#FFB5A7]">${item.price.toFixed(2)}</p>
                      </div>
              </div>
              <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                  <button
                          onClick={() => {
                            const currentQuantity = item.quantity || 1;
                            handleQuantityChange(item.id, currentQuantity - 1);
                          }}
                          className="w-8 h-8 rounded-full bg-[#FFB5A7]/10 text-[#FFB5A7] hover:bg-[#FFB5A7]/20 flex items-center justify-center"
                          disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                        <span className="w-8 text-center text-[#FFB5A7] font-medium">{item.quantity || 1}</span>
                  <button
                          onClick={() => {
                            const currentQuantity = item.quantity || 1;
                            handleQuantityChange(item.id, currentQuantity + 1);
                          }}
                          className="w-8 h-8 rounded-full bg-[#FFB5A7]/10 text-[#FFB5A7] hover:bg-[#FFB5A7]/20 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[#FFB5A7] hover:text-[#FEC89A]"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
              {/* Total and Checkout */}
              <div className="bg-gradient-to-r from-[#FFB5A7]/10 via-[#FEC89A]/10 to-[#F8EDEB]/10 p-6 border-t-2 border-[#FFB5A7]/20">
          <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-[#FFB5A7]">Total:</span>
                  <span className="text-2xl font-bold text-[#FFB5A7]">${total.toFixed(2)}</span>
          </div>
                <div className="flex justify-end space-x-4">
                  <motion.button
                    onClick={() => clearCart()}
                    className="px-6 py-3 bg-white text-[#FFB5A7] font-bold rounded-xl border-2 border-[#FFB5A7] hover:bg-[#FFB5A7]/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear Cart
                  </motion.button>
          <motion.button
                    onClick={() => setShowCheckoutModal(true)}
                    className="px-8 py-3 bg-gradient-to-r from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] text-white font-bold rounded-xl transition-all duration-300 border-2 border-white/50 shadow-[4px_4px_0px_0px_rgba(255,181,167,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(255,181,167,0.2)] hover:translate-x-[2px] hover:translate-y-[2px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
                    Checkout
          </motion.button>
        </div>
      </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 