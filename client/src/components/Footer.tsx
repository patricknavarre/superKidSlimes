import React from 'react';
import { Link } from 'react-router-dom';
import TactaBadge from "../assets/images/image001.png";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src={TactaBadge} 
              alt="Tacta Slime Co Badge"
              className="h-24 w-24 mb-4" 
            />
            <p className="text-gray-600 text-center md:text-left">
              Creating magical slime experiences for kids of all ages.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#FF1493] font-bold mb-4 text-center md:text-left">Quick Links</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-[#FF1493]">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/slime-secrets" className="text-gray-600 hover:text-[#FF1493]">
                  Slime Secrets
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-[#FF1493]">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#FF1493] font-bold mb-4 text-center md:text-left">Contact</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li className="text-gray-600">Email: info@tactaslime.co</li>
              <li className="text-gray-600">Follow us on Instagram</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#FF1493] font-bold mb-4 text-center md:text-left">Stay Updated</h3>
            <p className="text-gray-600 mb-4 text-center md:text-left">
              Subscribe to get special offers and slime tips!
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF1493]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF1493] text-white rounded-lg hover:bg-[#FF1493]/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Tacta Slime Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 