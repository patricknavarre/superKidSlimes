import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface Category {
  _id?: string;
  name: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
}

const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api` : 'http://localhost:4020/api';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    name: '',
    slug: '',
    isActive: true,
    displayOrder: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load categories');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/categories/${editingId}`, newCategory);
      } else {
        await axios.post(`${API_URL}/categories`, newCategory);
      }
      fetchCategories();
      setNewCategory({
        name: '',
        slug: '',
        isActive: true,
        displayOrder: categories.length
      });
      setEditingId(null);
    } catch (err) {
      setError('Failed to save category');
    }
  };

  const handleEdit = (category: Category) => {
    setNewCategory(category);
    setEditingId(category._id || null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`${API_URL}/categories/${id}`);
        fetchCategories();
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await axios.put(`${API_URL}/categories/${id}`, { isActive: !isActive });
      fetchCategories();
    } catch (err) {
      setError('Failed to update category status');
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = categories.findIndex(cat => cat._id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === categories.length - 1)
    ) {
      return;
    }

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newCategories[currentIndex], newCategories[targetIndex]] = 
    [newCategories[targetIndex], newCategories[currentIndex]];

    try {
      await Promise.all(
        newCategories.map((cat, index) =>
          axios.put(`${API_URL}/categories/${cat._id}`, {
            ...cat,
            displayOrder: index
          })
        )
      );
      fetchCategories();
    } catch (err) {
      setError('Failed to reorder categories');
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading categories...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-100 mt-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Manage Categories ✨</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => {
                const name = e.target.value;
                setNewCategory({
                  ...newCategory,
                  name,
                  slug: name.toLowerCase().replace(/\s+/g, '-')
                });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              value={newCategory.displayOrder}
              onChange={(e) => setNewCategory({
                ...newCategory,
                displayOrder: parseInt(e.target.value)
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            {editingId ? 'Update Category' : 'Add Category'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setNewCategory({
                  name: '',
                  slug: '',
                  isActive: true,
                  displayOrder: categories.length
                });
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {categories.map((category) => (
          <motion.div
            key={category._id}
            layout
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-500">Slug: {category.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleReorder(category._id!, 'up')}
                disabled={categories.indexOf(category) === 0}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                ↑
              </button>
              <button
                onClick={() => handleReorder(category._id!, 'down')}
                disabled={categories.indexOf(category) === categories.length - 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                ↓
              </button>
              <button
                onClick={() => handleToggleActive(category._id!, category.isActive)}
                className={`px-3 py-1 rounded-full text-sm ${
                  category.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {category.isActive ? 'Active' : 'Hidden'}
              </button>
              <button
                onClick={() => handleEdit(category)}
                className="p-2 text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id!)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager; 