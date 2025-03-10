import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from '../../types/cart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  total: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSubmit, total }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 shadow-xl relative z-10 max-w-md mx-4 w-full border border-[#FF1493]/20"
          >
            <h2 className="text-2xl font-bold text-[#FF1493] mb-6">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded-lg border border-[#FF1493]/20 focus:border-[#FF1493] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded-lg border border-[#FF1493]/20 focus:border-[#FF1493] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-white mb-2">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded-lg border border-[#FF1493]/20 focus:border-[#FF1493] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-white mb-2">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-white rounded-lg border border-[#FF1493]/20 focus:border-[#FF1493] focus:outline-none"
                />
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-white">Total: <span className="text-[#FF1493] font-bold">${total.toFixed(2)}</span></span>
                <div className="space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 bg-[#2a2a2a] text-[#FF1493] rounded-full font-bold hover:bg-[#FF1493] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#FF1493] text-white rounded-full font-bold hover:bg-[#FF1493]/90 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal; 