import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types/cart';
import api from '../../utils/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

const Shop: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Attempting to fetch categories...');
        // Ensure correct path format
        const response = await api.get('/categories');
        const activeCategories = response.data.filter((cat: Category) => cat.isActive);
        setCategories(activeCategories);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Failed to fetch categories:', err);
        setError(`Failed to load categories: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Attempting to fetch products...');
      // Ensure correct path format
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      let errorMessage = 'Failed to load products. Please try again later.';
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = `Server error: ${err.response.status} - ${err.response.statusText || 'Not Found'}`;
        
        // If it's a 404, provide more specific guidance
        if (err.response.status === 404) {
          errorMessage = 'Products endpoint not found. Please check server configuration.';
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const confettiColors = [
    '#FF1493', // hot pink (brand color)
    '#FF00FF', // magenta
    '#00FFFF', // cyan
    '#FFC0CB', // light pink
    '#FFD700', // gold
    '#FF4500', // red-orange
    '#9370DB', // medium purple
    '#00FF7F', // spring green
    '#FFB5A7', // peachy pink
    '#FEC89A', // warm peach
    '#FFFFFF',  // white
    '#F8EDEB', // light peach
    '#FCD5CE', // soft coral
    '#FAE1DD'  // pale pink
  ];

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, newQuantity)
    }));
  };

  // Create a function to generate random confetti
  const createConfetti = useCallback((productId: string) => {
    const productElement = document.getElementById(`product-${productId}`);
    if (!productElement) return;
    
    const buttonRect = productElement.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;
    
    // Create 50 confetti particles
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      document.body.appendChild(confetti);
      
      // Random position, size, color and animation
      const size = Math.random() * 10 + 5;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const angle = Math.random() * 360;
      const spread = Math.random() * 150 + 50;
      const originX = buttonX + (Math.random() - 0.5) * 20;
      const originY = buttonY + (Math.random() - 0.5) * 20;
      const finalX = originX + spread * Math.cos(angle * Math.PI / 180);
      const finalY = originY + spread * Math.sin(angle * Math.PI / 180);
      const rotation = Math.random() * 720 - 360;
      const duration = Math.random() * 1 + 1;
      const delay = Math.random() * 0.3;
      
      // Apply styles
      confetti.style.cssText = `
        position: fixed;
        z-index: 1000;
        left: ${originX}px;
        top: ${originY}px;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        opacity: 0;
        transform: translate(-50%, -50%) rotate(0deg);
        animation: confettiAnimation ${duration}s ease-out ${delay}s forwards;
      `;
      
      // Define animation
      const keyframes = `
        @keyframes confettiAnimation {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(calc(${finalX - originX}px), calc(${finalY - originY}px)) rotate(${rotation}deg);
            opacity: 0;
          }
        }
      `;
      
      // Add keyframes to document
      const styleElement = document.createElement('style');
      styleElement.innerHTML = keyframes;
      document.head.appendChild(styleElement);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
        styleElement.remove();
      }, (duration + delay) * 1000);
    }
  }, [confettiColors]);

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product._id] || 1;
    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    };
    addToCart(cartItem);
    setRecentlyAdded(product._id);
    createConfetti(product._id);
    setTimeout(() => setRecentlyAdded(null), 1500);
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [product._id]: 1
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white py-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF1493] mx-auto"></div>
            <p className="mt-4 text-xl text-gray-300">Loading products...</p>
            <p className="mt-2 text-gray-400 max-w-md mx-auto">
              This may take a moment if the server is waking up from sleep mode.
              Please wait while we connect to the database.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white py-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#FF1493] mb-4">Connection Issue</h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">{error}</p>
            
            {error.includes('timeout') && (
              <div className="bg-[#2a2a2a] p-4 rounded-lg mb-6 max-w-lg mx-auto">
                <h3 className="font-bold text-[#FF1493] mb-2">Why am I seeing this?</h3>
                <p className="text-gray-400 mb-2">
                  Our free hosting service puts the server to sleep after inactivity. 
                  It may take 30-60 seconds to wake up when you first visit.
                </p>
                <p className="text-gray-400">
                  We're retrying your request automatically. Please be patient!
                </p>
              </div>
            )}
            
            <button
              onClick={fetchProducts}
              className="mt-4 px-6 py-3 bg-[#FF1493] text-white rounded-lg hover:bg-[#FF1493]/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#FF1493] to-[#FF69B4]"
          variants={itemVariants}
        >
          Shop Our Slimes
        </motion.h1>

        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#FF1493] text-white'
                : 'bg-[#2a2a2a] text-[#FF1493] hover:bg-[#FF1493] hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                selectedCategory === category.slug
                  ? 'bg-[#FF1493] text-white'
                  : 'bg-[#2a2a2a] text-[#FF1493] hover:bg-[#FF1493] hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              variants={itemVariants}
              className="bg-[#2a2a2a] rounded-2xl p-6 border border-[#FF1493]/20 hover:border-[#FF1493]/40 transition-all"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-[#FF1493]">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-[#1a1a1a] rounded-full">
                    <button
                      onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#FF1493] hover:bg-[#FF1493] hover:text-white rounded-l-full transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-white">
                      {quantities[product._id] || 1}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#FF1493] hover:bg-[#FF1493] hover:text-white rounded-r-full transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    id={`product-${product._id}`}
                    onClick={() => handleAddToCart(product)}
                    className={`px-6 py-2 bg-[#FF1493] text-white rounded-full font-bold hover:bg-[#FF1493]/90 transition-colors ${
                      recentlyAdded === product._id ? 'relative overflow-visible' : ''
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop; 