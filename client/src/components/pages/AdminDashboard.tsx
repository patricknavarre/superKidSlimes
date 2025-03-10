import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SlimeProduct, SlimeCategory } from '../../data/inventory';
import EditProductModal from '../EditProductModal';
import { useAuth } from '../../context/AuthContext';
import CategoryManager from '../CategoryManager';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api` : 'http://localhost:4020/api';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<SlimeProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SlimeProduct | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (id: string | undefined) => {
    if (!id) return;
    try {
      const product = products.find(p => p._id === id);
      if (!product) return;

      const response = await axios.put(`${API_URL}/products/${id}`, {
        ...product,
        isActive: !product.isActive
      });

      setProducts(products.map(p => 
        p._id === id ? response.data : p
      ));
    } catch (err) {
      setError('Failed to update product status');
    }
  };

  const handleUpdateStock = async (id: string | undefined, quantity: number) => {
    if (!id) return;
    try {
      const product = products.find(p => p._id === id);
      if (!product) return;

      const response = await axios.put(`${API_URL}/products/${id}`, {
        ...product,
        stockQuantity: quantity,
        inStock: quantity > 0
      });

      setProducts(products.map(p => 
        p._id === id ? response.data : p
      ));
    } catch (err) {
      setError('Failed to update stock');
    }
  };

  const handleUpdatePrice = async (id: string | undefined, price: number) => {
    if (!id) return;
    try {
      const product = products.find(p => p._id === id);
      if (!product) return;

      const response = await axios.put(`${API_URL}/products/${id}`, {
        ...product,
        price
      });

      setProducts(products.map(p => 
        p._id === id ? response.data : p
      ));
    } catch (err) {
      setError('Failed to update price');
    }
  };

  const handleSaveProduct = async (updatedProduct: SlimeProduct) => {
    try {
      if (selectedProduct?._id) {
        // Update existing product
        const response = await axios.put(
          `${API_URL}/products/${selectedProduct._id}`,
          updatedProduct
        );
        setProducts(products.map(p => 
          p._id === selectedProduct._id ? response.data : p
        ));
      } else {
        // Add new product
        const response = await axios.post(`${API_URL}/products`, updatedProduct);
        setProducts([...products, response.data]);
      }
      setIsEditing(false);
      setSelectedProduct(null);
    } catch (err) {
      setError('Failed to save product');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-pink-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="text-2xl text-red-600">{error}</div>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600">Inventory Management ✨</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-100">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Products</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-2 text-left">Product</th>
                <th className="py-2 text-center">Price</th>
                <th className="py-2 text-center">Stock</th>
                <th className="py-2 text-center">Status</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span>$</span>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleUpdatePrice(product._id, parseFloat(e.target.value))}
                        className="w-20 text-center border rounded py-1"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      value={product.stockQuantity}
                      onChange={(e) => handleUpdateStock(product._id, parseInt(e.target.value))}
                      className="w-20 text-center border rounded py-1"
                      min="0"
                    />
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleToggleActive(product._id)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        product.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsEditing(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsEditing(true);
            }}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Add New Product
          </button>
        </div>

        <CategoryManager />
      </motion.div>

      <EditProductModal
        product={selectedProduct}
        isOpen={isEditing}
        onClose={() => {
          setIsEditing(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default AdminDashboard; 