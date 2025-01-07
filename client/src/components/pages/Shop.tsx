import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4020/api/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['all', 'cloud', 'glitter', 'butter', 'foam'];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slime"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-display text-red-500">{error}</h3>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-display text-slime text-center mb-8">
        Shop Our Slimes
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-bold transition-colors ${
              selectedCategory === category
                ? 'bg-slime text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter(
            (product) =>
              selectedCategory === 'all' || product.category === selectedCategory
          )
          .map((product) => (
            <div key={product.id} className="card group transform hover:scale-105 transition-transform duration-200">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-display text-xl text-gray-800 group-hover:text-slime transition-colors">
                {product.title}
              </h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              <button className="mt-4 w-full btn-primary">
                Add to Cart
              </button>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {products.filter(
        (product) =>
          selectedCategory === 'all' || product.category === selectedCategory
      ).length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-display text-gray-400">
            No products found in this category
          </h3>
        </div>
      )}
    </div>
  );
};

export default Shop; 