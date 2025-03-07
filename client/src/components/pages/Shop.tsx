import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

interface SlimeProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity?: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [products, setProducts] = useState<SlimeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4020/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4020/api/categories');
        const activeCategories = response.data.filter((cat: Category) => cat.isActive);
        setCategories(activeCategories);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
    '#FFB5A7', // peachy pink
    '#FEC89A', // warm peach
    '#F8EDEB', // light peach
    '#FCD5CE', // soft coral
    '#FAE1DD',  // pale pink
    '#FFFFFF'  // white
  ];

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 1;
      const newQty = Math.max(1, currentQty + change); // Ensure quantity doesn't go below 1
      return {
        ...prev,
        [productId]: newQty
      };
    });
  };

  const handleAddToCart = (product: SlimeProduct) => {
    const quantity = quantities[product._id] || 1;
    const cartItem: CartItem = {
      id: product._id,
      title: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    };
    addToCart(cartItem);
    setRecentlyAdded(product._id);
    setTimeout(() => setRecentlyAdded(null), 1500);
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [product._id]: 1
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] py-12 px-4 flex items-center justify-center">
        <motion.div
          className="text-white text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading magical slimes...✨
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] py-12 px-4 flex items-center justify-center">
        <div className="text-white text-xl text-center">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-white text-[#FFB5A7] font-bold py-2 px-6 rounded-xl transition-all duration-300 border-2 border-[#FFB5A7]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-[#FFB5A7] via-[#FEC89A] to-[#F8EDEB] py-12 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-4 text-white"
          variants={itemVariants}
        >
          Shop Our Slimes
        </motion.h1>
        <motion.p 
          className="text-lg text-center mb-12 text-white/90"
          variants={itemVariants}
        >
          Discover your perfect texture
        </motion.p>

        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-pink-500 text-white shadow-lg scale-105'
                : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.slug
                  ? 'bg-pink-500 text-white shadow-lg scale-105'
                  : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
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
              className="bg-white/90 rounded-2xl p-6 border-2 border-white/50 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] relative overflow-hidden"
              variants={itemVariants}
            >
              <AnimatePresence>
                {recentlyAdded === product._id && (
                  <>
                    {/* Button confetti burst */}
                    {[...Array(20)].map((_, i) => {
                      const angle = (i / 20) * 360; // Distribute particles in a circle
                      const radius = 60 + Math.random() * 40; // Random distance from center
                      const finalX = Math.cos(angle * (Math.PI / 180)) * radius;
                      const finalY = Math.sin(angle * (Math.PI / 180)) * radius;
                      
                      return (
                        <motion.div
                          key={`confetti-${i}`}
                          initial={{ 
                            opacity: 1,
                            scale: 0,
                            x: 0,
                            y: 0,
                            rotate: 0
                          }}
                          animate={{ 
                            opacity: [1, 1, 0],
                            scale: [0, 1, 1],
                            x: finalX,
                            y: finalY,
                            rotate: Math.random() * 360 * (i % 2 === 0 ? 1 : -1)
                          }}
                          transition={{ 
                            duration: 0.6,
                            ease: [0.23, 1, 0.32, 1]
                          }}
                          style={{ 
                            position: 'absolute',
                            bottom: '30px',
                            right: '40px',
                            width: i % 2 === 0 ? '10px' : '6px',
                            height: i % 2 === 0 ? '10px' : '6px',
                            backgroundColor: confettiColors[i % confettiColors.length],
                            borderRadius: i % 3 === 0 ? '50%' : '2px',
                            zIndex: 20,
                            transformOrigin: 'center'
                          }}
                        />
                      );
                    })}
                    {/* Success feedback on button */}
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-6 right-6 w-24 h-10 bg-[#FFB5A7]/10 rounded-xl z-10"
                    />
                  </>
                )}
              </AnimatePresence>

              <div className="aspect-square rounded-xl bg-[#FFB5A7]/10 mb-4" />
              <h3 className="text-xl font-bold text-[#FFB5A7] mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-[#FFB5A7]">${product.price}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white rounded-xl border-2 border-[#FFB5A7]">
                    <motion.button
                      onClick={() => handleQuantityChange(product._id, -1)}
                      className="px-3 py-1 text-[#FFB5A7] font-bold hover:bg-[#FFB5A7]/10 rounded-l-xl transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      -
                    </motion.button>
                    <span className="w-10 text-center font-bold text-[#FFB5A7]">
                      {quantities[product._id] || 1}
                    </span>
                    <motion.button
                      onClick={() => handleQuantityChange(product._id, 1)}
                      className="px-3 py-1 text-[#FFB5A7] font-bold hover:bg-[#FFB5A7]/10 rounded-r-xl transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      +
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={() => handleAddToCart(product)}
                    className="bg-white text-[#FFB5A7] font-bold py-2 px-6 rounded-xl transition-all duration-300 border-2 border-[#FFB5A7] shadow-[3px_3px_0px_0px_rgba(255,181,167,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(255,181,167,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Shop; 