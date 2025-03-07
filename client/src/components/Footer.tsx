import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-orange-50/90 via-rose-50/80 to-white/70 backdrop-blur-sm border-t border-orange-100/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <motion.h3 
              className="text-xl font-bold text-orange-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              About Us
            </motion.h3>
            <motion.p 
              className="text-gray-500 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Creating unique sensory experiences through artisanal slime design.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/about" 
                className="text-orange-300 hover:text-orange-400 transition-colors duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Contact Section */}
          <div>
            <motion.h3 
              className="text-xl font-bold text-orange-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Contact Us
            </motion.h3>
            <motion.p 
              className="text-gray-500 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Questions? We'd love to hear from you! Send us a message.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/contact" 
                className="text-orange-300 hover:text-orange-400 transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>

          {/* Follow Section */}
          <div>
            <motion.h3 
              className="text-xl font-bold text-orange-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Follow Us
            </motion.h3>
            <motion.p 
              className="text-gray-500 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Stay updated with our latest collections and special offers!
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-300 hover:text-orange-400 transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-300 hover:text-orange-400 transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="text-center mt-12 pt-8 border-t border-orange-100/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tacta Slime. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 