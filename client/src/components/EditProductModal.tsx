import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlimeProduct, SlimeCategory } from '../data/inventory';

interface EditProductModalProps {
  product: SlimeProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: SlimeProduct) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<SlimeProduct>>(
    product || {
      id: '',
      name: '',
      price: 0,
      description: '',
      shortDescription: '',
      images: [''],
      category: 'butter' as SlimeCategory,
      tags: [],
      inStock: true,
      stockQuantity: 0,
      isActive: true,
      features: [''],
      texture: '',
      scent: '',
      size: '6 oz',
      ingredients: [''],
      careInstructions: [''],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as SlimeProduct);
    onClose();
  };

  const handleArrayInput = (
    field: keyof SlimeProduct,
    value: string,
    index: number
  ) => {
    const array = [...(formData[field] as string[])];
    array[index] = value;
    setFormData({ ...formData, [field]: array });
  };

  const addArrayItem = (field: keyof SlimeProduct) => {
    const array = [...(formData[field] as string[]), ''];
    setFormData({ ...formData, [field]: array });
  };

  const removeArrayItem = (field: keyof SlimeProduct, index: number) => {
    const array = (formData[field] as string[]).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: array });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Price</span>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    step="0.01"
                    min="0"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Category</span>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as SlimeCategory })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  >
                    <option value="butter">Butter</option>
                    <option value="cloud">Cloud</option>
                    <option value="clear">Clear</option>
                    <option value="glossy">Glossy</option>
                    <option value="crunchy">Crunchy</option>
                    <option value="foam">Foam</option>
                    <option value="jelly">Jelly</option>
                    <option value="special">Special</option>
                  </select>
                </label>
              </div>

              {/* Descriptions */}
              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700">Short Description</span>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Full Description</span>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    rows={3}
                    required
                  />
                </label>
              </div>

              {/* Arrays (Images, Features, etc.) */}
              <div className="space-y-4">
                {['images', 'features', 'ingredients', 'careInstructions'].map((field) => (
                  <div key={field} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 capitalize">{field}</span>
                      <button
                        type="button"
                        onClick={() => addArrayItem(field as keyof SlimeProduct)}
                        className="text-pink-500 text-sm"
                      >
                        + Add
                      </button>
                    </div>
                    {(formData[field as keyof SlimeProduct] as string[])?.map((value, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleArrayInput(field as keyof SlimeProduct, e.target.value, index)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem(field as keyof SlimeProduct, index)}
                          className="text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700">Texture</span>
                  <input
                    type="text"
                    value={formData.texture}
                    onChange={(e) => setFormData({ ...formData, texture: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Scent</span>
                  <input
                    type="text"
                    value={formData.scent}
                    onChange={(e) => setFormData({ ...formData, scent: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Size</span>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Stock Quantity</span>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({
                      ...formData,
                      stockQuantity: parseInt(e.target.value),
                      inStock: parseInt(e.target.value) > 0
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    min="0"
                  />
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal; 