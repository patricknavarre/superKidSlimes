const mongoose = require("mongoose");
const Product = require("../models/Product");

const initialProducts = [
  {
    name: "Cloud Dream Slime",
    description:
      "A fluffy, cloud-like texture that's super stretchy and satisfying to play with!",
    price: 12.99,
    images: ["https://example.com/cloud-slime.jpg"], // You'll need to update with real image URLs
    category: "cloud",
    stockQuantity: 50,
    isActive: true,
  },
  {
    name: "Butter Blast",
    description:
      "Smooth as butter with a satisfying stretch and glossy finish.",
    price: 11.99,
    images: ["https://example.com/butter-slime.jpg"], // You'll need to update with real image URLs
    category: "butter",
    stockQuantity: 45,
    isActive: true,
  },
  {
    name: "Crystal Clear",
    description: "Crystal clear slime that's perfect for mixing with add-ins!",
    price: 10.99,
    images: ["https://example.com/clear-slime.jpg"], // You'll need to update with real image URLs
    category: "clear",
    stockQuantity: 40,
    isActive: true,
  },
];

async function createProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/slime-shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Create new products
    const products = await Product.create(initialProducts);
    console.log("Created products:", products);

    mongoose.connection.close();
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createProducts();
