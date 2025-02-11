import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import CartConfetti from '../CartConfetti';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  slimeType: string;
  scent: string;
  description: string;
  weight: string;
}

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [confettiPosition, setConfettiPosition] = useState<{ x: number; y: number } | null>(null);
  const [timeUntilNextDrop, setTimeUntilNextDrop] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Initialize quantities for each product
  useEffect(() => {
    const initialQuantities = products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {} as { [key: string]: number });
    setQuantities(initialQuantities);
  }, []);

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(10, (prev[productId] || 1) + change))
    }));
  };

  // Calculate time until next Friday 7PM EST
  useEffect(() => {
    const calculateTimeUntilNextDrop = () => {
      const now = new Date();
      const nextDrop = new Date();
      nextDrop.setUTCHours(23, 0, 0, 0); // 7PM EST = 23:00 UTC
      nextDrop.setDate(nextDrop.getDate() + ((5 + 7 - nextDrop.getDay()) % 7)); // Next Friday

      if (now > nextDrop) {
        nextDrop.setDate(nextDrop.getDate() + 7);
      }

      const diff = nextDrop.getTime() - now.getTime();
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    const timer = setInterval(() => {
      setTimeUntilNextDrop(calculateTimeUntilNextDrop());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Enhanced mock products data
  const products: Product[] = [
    {
      id: "1",
      title: "Strawberry Ice Cream Slime",
      price: 14.99,
      image: "https://placehold.co/300x300/FFB6C1/FFFFFF.png?text=Strawberry+Ice+Cream",
      category: "butter",
      slimeType: "Ice Cream Slime",
      scent: "Fresh Strawberries",
      description: "A creamy, dreamy slime that looks and smells just like strawberry ice cream",
      weight: "8 oz"
    },
    {
      id: "2",
      title: "Memory Dough Butter Slime",
      price: 15.99,
      image: "https://placehold.co/300x300/B19CD9/FFFFFF.png?text=Memory+Dough",
      category: "butter",
      slimeType: "Butter Slime",
      scent: "Sweet Vanilla",
      description: "Super soft butter slime that remembers its shape like memory foam",
      weight: "8 oz"
    },
    {
      id: "3",
      title: "Fire and Ice Video Game Slime",
      price: 16.99,
      image: "https://placehold.co/300x300/FFE4B5/FFFFFF.png?text=Fire+and+Ice",
      category: "clear",
      slimeType: "Clear Slime",
      scent: "Cool Mint",
      description: "Color-changing clear slime inspired by your favorite video games",
      weight: "8 oz"
    }
  ];

  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];
  const slimeTypes = [...new Set(products.map(product => product.slimeType))];
  
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      });
    }
    // Set confetti position to the button click location
    const rect = event.currentTarget.getBoundingClientRect();
    setConfettiPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    // Reset confetti after animation
    setTimeout(() => {
      setConfettiPosition(null);
    }, 2000);
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));
  };

  return (
    <div className="w-full bg-gradient-to-b from-pink-200 via-yellow-100 to-orange-200">
      {confettiPosition && (
        <CartConfetti x={confettiPosition.x} y={confettiPosition.y} />
      )}
      
      {/* Header Section with new gradient */}
      <div className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 p-6 shadow-lg mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-display text-white mb-4 text-center font-bold drop-shadow-lg">
            Super Kid Slimes
          </h1>
          {/* Next Drop Countdown with updated styling */}
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 text-center shadow-lg border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-white drop-shadow">Next Drop: Friday 7PM EST</h2>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-pink-600">{timeUntilNextDrop.days}</div>
                <div className="text-sm text-pink-600 font-medium">Days</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-orange-600">{timeUntilNextDrop.hours}</div>
                <div className="text-sm text-orange-600 font-medium">Hours</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-yellow-600">{timeUntilNextDrop.minutes}</div>
                <div className="text-sm text-yellow-600 font-medium">Minutes</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 w-24 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-pink-600">{timeUntilNextDrop.seconds}</div>
                <div className="text-sm text-pink-600 font-medium">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-display mb-8 text-center text-pink-600 drop-shadow-lg">Shop Our Slimes</h2>
      
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Slime Types Guide */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Slime Types Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {slimeTypes.map(type => (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">{type}</h3>
                <p className="text-sm text-gray-600">
                  {type === 'Cloud Slime' && 'Light and fluffy texture'}
                  {type === 'Glitter Clear' && 'Sparkly and stretchy'}
                  {type === 'Butter' && 'Smooth and spreadable'}
                  {type === 'Foam Beads' && 'Crunchy and satisfying'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative pb-[100%] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm">
                    {product.weight}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Scent: {product.scent}</div>
                  <div className="text-sm text-gray-500">Type: {product.slimeType}</div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-pink-600">${product.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-100 rounded-full border-2 border-black">
                      <button
                        onClick={(e) => handleQuantityChange(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors duration-300 rounded-l-full border-r-2 border-black hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {quantities[product.id] || 1}
                      </span>
                      <button
                        onClick={(e) => handleQuantityChange(product.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors duration-300 rounded-r-full border-l-2 border-black hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all duration-300 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                      Add to Cart
                    </button>
                  </div>
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