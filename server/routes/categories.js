const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const mongoose = require("mongoose");

// Debug middleware specific to categories
router.use((req, res, next) => {
  console.log("Categories Route:", req.method, req.url);
  next();
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    console.log("Fetching categories...");

    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      console.log(
        "MongoDB not connected, readyState:",
        mongoose.connection.readyState
      );
      return res.status(500).json({
        message: "Database connection not ready",
        readyState: mongoose.connection.readyState,
      });
    }

    // Try a simple find operation first
    console.log("Attempting to access categories collection...");

    // Set a timeout for this specific query
    const timeout = 15000; // 15 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error("Query timeout after 15 seconds")),
        timeout
      );
    });

    // Optimize the query
    const query = Category.find()
      .select("name slug isActive displayOrder _id") // Select only needed fields
      .sort("displayOrder")
      .lean(); // Use lean for better performance

    // Race the query against the timeout
    const categories = await Promise.race([query.exec(), timeoutPromise]);

    console.log("Categories found:", categories.length);
    return res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Handle different types of errors
    if (error.message === "Query timeout after 15 seconds") {
      return res.status(504).json({
        message: "Query timed out. Please try again later.",
        error: error.message,
      });
    }

    if (error.name === "MongooseError" || error.name === "MongoError") {
      return res.status(500).json({
        message: "Database error occurred",
        error: error.message,
        name: error.name,
      });
    }

    return res.status(500).json({
      message: error.message,
      name: error.name,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  console.log("Creating category with data:", req.body);
  try {
    const category = new Category({
      name: req.body.name,
      slug: req.body.slug || req.body.name.toLowerCase().replace(/\s+/g, "-"),
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      displayOrder: req.body.displayOrder || 0,
    });

    console.log("Category instance created:", category);
    const newCategory = await category.save();
    console.log("Category saved successfully:", newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(400).json({
      message: error.message,
      details: error.errors
        ? Object.keys(error.errors).map((key) => ({
            field: key,
            message: error.errors[key].message,
          }))
        : undefined,
    });
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  console.log("Updating category:", req.params.id, "with data:", req.body);
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      console.log("Category not found:", req.params.id);
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.body.name != null) {
      category.name = req.body.name;
    }
    if (req.body.slug != null) {
      category.slug = req.body.slug;
    }
    if (req.body.isActive != null) {
      category.isActive = req.body.isActive;
    }
    if (req.body.displayOrder != null) {
      category.displayOrder = req.body.displayOrder;
    }

    console.log("Saving updated category:", category);
    const updatedCategory = await category.save();
    console.log("Category updated successfully:", updatedCategory);
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  console.log("Deleting category:", req.params.id);
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      console.log("Category not found for deletion:", req.params.id);
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    console.log("Category deleted successfully:", req.params.id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
