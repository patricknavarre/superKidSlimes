const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
const checkDbConnection = require("../middleware/dbCheck");

// Fallback mock data for when the database is not connected
const mockProducts = [
  {
    _id: "mock1",
    name: "Blue Fluffy Cloud",
    description: "A light and fluffy blue slime that feels like a cloud",
    price: 9.99,
    image: "https://via.placeholder.com/300",
    category: "fluffy-slime",
    isActive: true,
  },
  {
    _id: "mock2",
    name: "Pink Glossy Dream",
    description: "Super glossy and stretchy pink slime",
    price: 8.99,
    image: "https://via.placeholder.com/300",
    category: "glossy-slime",
    isActive: true,
  },
  {
    _id: "mock3",
    name: "Rainbow Crunch",
    description: "Crunchy slime with rainbow foam beads",
    price: 10.99,
    image: "https://via.placeholder.com/300",
    category: "crunchy-slime",
    isActive: true,
  },
];

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`Products API: ${req.method} ${req.url}`);
  next();
});

// Apply database connection check middleware to all routes
router.use(checkDbConnection);

// Get all products
router.get("/", async (req, res) => {
  console.log("Fetching all products...");

  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      error: "Failed to fetch products",
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
      category: req.body.category,
      stockQuantity: req.body.stockQuantity,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        product[key] = updates[key];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
