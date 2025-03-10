import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { FormData } from '../../types/cart';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import SuccessModal from '../modals/SuccessModal';
import CheckoutModal from '../modals/CheckoutModal';

const Cart: React.FC = () => {
  const { cart, cartCount, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For debugging success modal
  useEffect(() => {
    console.log("Success modal state changed:", isSuccessModalOpen);
  }, [isSuccessModalOpen]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleCheckoutSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const contactEmail = process.env.REACT_APP_CONTACT_EMAIL || 'TactaSlime@gmail.com';
      
      const templateParams = {
        to_email: contactEmail,
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        address: formData.address,
        order_details: cart.map(item => 
          `${item.name} (Quantity: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n'),
        total_amount: `$${total.toFixed(2)}`,
      };

      console.log('Sending email to:', contactEmail);
      console.log('Using template:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ORDER || 'template_1y7hvfk');
      
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_r7jexv9',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ORDER || 'template_1y7hvfk',
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'FsKNSDRtYP7OliZQs'
      );

      // SIMPLIFIED CHECKOUT FLOW:
      // 1. Close checkout modal
      setIsCheckoutModalOpen(false);
      
      // 2. Clear the cart
      clearCart();
      
      // 3. Show success modal immediately (no delay or reset)
      setIsSuccessModalOpen(true);
      
      // 4. Backup approach - force show modal with direct DOM manipulation
      setTimeout(() => {
        try {
          // Create and inject modal directly if React state approach fails
          const modalContainer = document.createElement('div');
          modalContainer.id = 'backup-modal';
          modalContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
          `;
          
          modalContainer.innerHTML = `
            <div style="
              background: white;
              padding: 30px;
              border-radius: 15px;
              text-align: center;
              max-width: 500px;
              border: 8px solid #FF1493;
              box-shadow: 0 0 30px #FF1493;
            ">
              <h2 style="font-size: 24px; color: #FF1493; margin-bottom: 20px;">Order Placed Successfully!</h2>
              <p style="margin-bottom: 20px;">Thank you! Your slimes will be hand-delivered with extra smiles! ✨</p>
              <div style="background: #FFE6F3; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3 style="color: #FF1493; margin-bottom: 10px;">Payment Due on Delivery:</h3>
                <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 10px;">
                  <span style="background: #FF1493; color: white; padding: 8px 16px; border-radius: 20px;">Venmo</span>
                  <span style="background: black; color: white; padding: 8px 16px; border-radius: 20px;">Cash</span>
                </div>
                <p>We accept cash and Venmo for all orders!</p>
              </div>
              <button id="close-backup-modal" style="
                background: #FF1493;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 20px;
                font-weight: bold;
                width: 100%;
                cursor: pointer;
              ">Continue Shopping</button>
            </div>
          `;
          
          document.body.appendChild(modalContainer);
          
          document.getElementById('close-backup-modal')?.addEventListener('click', () => {
            document.body.removeChild(modalContainer);
            window.location.href = '/shop';
          });
        } catch (e) {
          console.error("Backup modal failed:", e);
          // Last resort
          alert("Your order has been placed! We accept Venmo and cash upon delivery.");
          window.location.href = '/shop';
        }
      }, 1000); // Longer delay for backup approach
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // Navigate to shop page after closing the success modal
    window.location.href = '/shop';
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF1493] to-[#FF69B4]">
            Your Cart
          </h1>
          <div className="text-center">
            <p className="text-gray-400 mb-8">Your cart is empty</p>
            <a 
              href="/shop" 
              className="inline-block px-8 py-3 bg-[#FF1493] text-white rounded-full font-bold hover:bg-[#FF1493]/90 transition-colors shadow-lg hover:shadow-[#FF1493]/20"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF1493] to-[#FF69B4]">
          Your Cart
        </h1>
        
        <div className="space-y-6">
          {cart.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between p-6 bg-[#2a2a2a] rounded-2xl border border-[#FF1493]/20"
            >
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{item.name}</h3>
                  <p className="text-[#FF1493] font-medium">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] text-[#FF1493] rounded-full hover:bg-[#FF1493] hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] text-[#FF1493] rounded-full hover:bg-[#FF1493] hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-[#FF1493] hover:text-[#FF1493]/80 transition-colors"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-[#2a2a2a] rounded-2xl border border-[#FF1493]/20">
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-semibold text-white">Total:</span>
            <span className="text-3xl font-bold text-[#FF1493]">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => clearCart()}
              className="px-8 py-3 bg-[#1a1a1a] text-[#FF1493] rounded-full font-bold hover:bg-[#FF1493] hover:text-white transition-colors"
            >
              Clear Cart
            </button>
            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#FF1493] text-white rounded-full font-bold hover:bg-[#FF1493]/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>

        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          onSubmit={handleCheckoutSubmit}
          total={total}
        />

        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={handleCloseSuccessModal}
        />
      </div>
    </div>
  );
};

export default Cart; 