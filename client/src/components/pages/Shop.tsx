import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  // Simulated products data (replace with actual API call later)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulated API response
        const dummyProducts: Product[] = [
          {
            id: '1',
            name: 'Galaxy Glitter Slime',
            price: 12.99,
            description: 'A sparkly, stretchy slime with a cosmic twist',
            image: 'https://via.placeholder.com/300x300.png?text=Galaxy+Slime',
            category: 'glitter'
          },
          {
            id: '2',
            name: 'Butter Slime Kit',
            price: 15.99,
            description: 'Super soft and spreadable butter slime with tools',
            image: 'https://via.placeholder.com/300x300.png?text=Butter+Slime',
            category: 'butter'
          },
          {
            id: '3',
            name: 'Rainbow Cloud Slime',
            price: 13.99,
            description: 'Light and fluffy cloud slime with rainbow colors',
            image: 'https://via.placeholder.com/300x300.png?text=Cloud+Slime',
            category: 'cloud'
          },
          {
            id: '4',
            name: 'Unicorn Floam Slime',
            price: 14.99,
            description: 'Magical floam slime with unicorn colors',
            image: 'https://via.placeholder.com/300x300.png?text=Floam+Slime',
            category: 'floam'
          }
        ];

        setProducts(dummyProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['all', 'glitter', 'butter', 'cloud', 'floam'];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-display text-center mb-4"
      >
        <span className="text-teal-500">Discover</span>{' '}
        <span className="text-indigo-500">Our</span>{' '}
        <span className="text-teal-500">Magical</span>{' '}
        <span className="text-indigo-500">Slimes</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto"
      >
        Explore our collection of handcrafted slimes, each designed to spark joy and creativity
      </motion.p>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-16 space-x-4 flex-wrap gap-4"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 transform ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:shadow-md hover:text-teal-500 border border-teal-100'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl border border-teal-50"
            >
              <div className="relative pb-[100%] overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display text-gray-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-teal-500">
                    ${product.price.toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:from-teal-600 hover:to-indigo-600 transition-all duration-300"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Shop; 