/**
 * Setup test data for MongoDB
 *
 * This script will create test data for categories and products
 * if they don't exist. Run this script with:
 *
 * node scripts/setupTestData.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

// Schemas
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "https://via.placeholder.com/300" },
  category: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

// Models
const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

// Test data
const categories = [
  {
    name: "Fluffy Slime",
    slug: "fluffy-slime",
    isActive: true,
    displayOrder: 1,
  },
  {
    name: "Glossy Slime",
    slug: "glossy-slime",
    isActive: true,
    displayOrder: 2,
  },
  {
    name: "Crunchy Slime",
    slug: "crunchy-slime",
    isActive: true,
    displayOrder: 3,
  },
];

const products = [
  {
    name: "Blue Fluffy Cloud",
    description: "A light and fluffy blue slime that feels like a cloud",
    price: 9.99,
    image: "https://via.placeholder.com/300",
    category: "fluffy-slime",
    isActive: true,
  },
  {
    name: "Pink Glossy Dream",
    description: "Super glossy and stretchy pink slime",
    price: 8.99,
    image: "https://via.placeholder.com/300",
    category: "glossy-slime",
    isActive: true,
  },
  {
    name: "Rainbow Crunch",
    description: "Crunchy slime with rainbow foam beads",
    price: 10.99,
    image: "https://via.placeholder.com/300",
    category: "crunchy-slime",
    isActive: true,
  },
];

// Connect to MongoDB
console.log("Connecting to MongoDB...");
console.log("MongoDB URI defined:", !!process.env.MONGODB_URI);
console.log(
  "MongoDB URI first 15 chars:",
  process.env.MONGODB_URI
    ? process.env.MONGODB_URI.substring(0, 15) + "..."
    : "undefined"
);

// Use the MongoDB connection string from the environment or default to localhost
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/slime-shop";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(async () => {
    console.log("Connected to MongoDB!");
    console.log("Database:", mongoose.connection.db.databaseName);

    // Create categories if they don't exist
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      console.log("No categories found, creating test categories...");
      try {
        await Category.insertMany(categories);
        console.log("Test categories created successfully!");
      } catch (error) {
        console.error("Error creating test categories:", error);
      }
    } else {
      console.log(`Found ${categoryCount} existing categories`);
    }

    // Create products if they don't exist
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log("No products found, creating test products...");
      try {
        await Product.insertMany(products);
        console.log("Test products created successfully!");
      } catch (error) {
        console.error("Error creating test products:", error);
      }
    } else {
      console.log(`Found ${productCount} existing products`);
    }

    console.log("Setup complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
