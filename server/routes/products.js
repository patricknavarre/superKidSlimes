const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Debug middleware specific to products
router.use((req, res, next) => {
  console.log("Products Route:", req.method, req.url);
  next();
});

// Get all products
router.get("/", async (req, res) => {
  try {
    console.log("Fetching products...");

    // Set a timeout for this specific query
    const timeout = 20000; // 20 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error("Query timeout after 20 seconds")),
        timeout
      );
    });

    // Only return necessary fields to reduce data size
    const query = Product.find({ isActive: true })
      .select("name description price image category isActive _id") // Select only needed fields
      .lean() // Use lean for better performance
      .limit(100); // Limit results as a safety measure

    // Race the query against the timeout
    const products = await Promise.race([query.exec(), timeoutPromise]);

    console.log("Products found:", products.length);
    return res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);

    // Handle different types of errors
    if (error.message === "Query timeout after 20 seconds") {
      return res.status(504).json({
        message: "Query timed out. Please try again later.",
        error: error.message,
      });
    }

    if (error.name === "MongooseError" || error.name === "MongoError") {
      return res.status(500).json({
        message: "Database error occurred",
        error: error.message,
      });
    }

    return res.status(500).json({ message: error.message });
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
