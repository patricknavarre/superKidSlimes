import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleSendEmail = async () => {
    try {
      setIsSending(true);
      setError(null);

      const emailContent = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: 'New Contact Form Message',
        reply_to: formData.email
      };

      await emailjs.send(
        'service_wg2vx5s',
        'template_ty7hvfk',
        emailContent
      );

      setIsSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }, 2000);
    } catch (err) {
      setError('Failed to send email. Please try again.');
      console.error('Error sending email:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-pink-200 via-yellow-100 to-orange-200">
      {/* Header Section with gradient */}
      <div className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 p-6 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-display text-white mb-4 font-bold drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-2xl text-white/90 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We'd Love to Hear From You! ✨
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-50"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-xl font-display text-pink-600 mb-4 font-bold">
              Visit Our Store ✨
            </h2>
            <p className="text-gray-600">
              123 Slime Street<br />
              Fun City, FC 12345<br />
              United States
            </p>
          </motion.div>
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-black"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-xl font-display text-purple-600 mb-4 font-bold">
              Get in Touch ✨
            </h2>
            <p className="text-gray-600">
              Email: hello@superkidslimes.com<br />
              Phone: (555) 123-4567<br />
              Hours: Mon-Fri, 9am-5pm EST
            </p>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => !isSending && setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-xl bg-white p-6 shadow-xl border-2 border-black">
            <Dialog.Title className="text-xl font-display font-bold mb-4 text-pink-600">
              {isSuccess ? '✨ Message Sent!' : 'Confirm Your Message'}
            </Dialog.Title>

            {!isSuccess && (
              <div className="space-y-4">
                <div className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200">
                  <h3 className="font-medium text-pink-600 mb-1">From:</h3>
                  <p>{formData.name} ({formData.email})</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                  <h3 className="font-medium text-purple-600 mb-1">Message:</h3>
                  <p className="whitespace-pre-wrap">{formData.message}</p>
                </div>

                {error && (
                  <div className="text-red-500 text-sm mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
                    {error}
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSendEmail}
                    disabled={isSending}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-50"
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSending}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-full transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-50"
                  >
                    Edit Message
                  </button>
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full flex items-center justify-center mb-4 border-2 border-black shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">Thank you for your message! ✨<br />We'll get back to you soon.</p>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Contact; 