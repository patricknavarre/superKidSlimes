require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");
const { restResources } = require("@shopify/shopify-api/rest/admin/2023-10");
const { shopifyApp } = require("@shopify/shopify-app-express");

const app = express();

// Middleware
app.use(cors()); // Allow all origins for development
app.use(bodyParser.json());
app.use(express.json());

// Initialize Shopify
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: ["read_products"],
  hostName: process.env.SHOPIFY_SHOP_NAME,
  apiVersion: "2023-10", // Using a specific version instead of LATEST_API_VERSION
  isEmbeddedApp: false,
  restResources,
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/superKidSlimes"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Basic routes
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

// Products route - using mock data for now, will integrate with Shopify later
app.get("/api/products", async (req, res) => {
  try {
    // For now, return mock data
    const products = [
      {
        id: "1",
        title: "Sparkle Cloud Slime",
        price: 12.99,
        image:
          "https://via.placeholder.com/300x300/FFB6C1/FFFFFF?text=Sparkle+Cloud",
        category: "cloud",
      },
      {
        id: "2",
        title: "Glitter Galaxy Slime",
        price: 14.99,
        image:
          "https://via.placeholder.com/300x300/B19CD9/FFFFFF?text=Glitter+Galaxy",
        category: "glitter",
      },
      {
        id: "3",
        title: "Butter Slime",
        price: 11.99,
        image:
          "https://via.placeholder.com/300x300/FFE4B5/FFFFFF?text=Butter+Slime",
        category: "butter",
      },
      {
        id: "4",
        title: "Foam Beads Slime",
        price: 13.99,
        image:
          "https://via.placeholder.com/300x300/98FB98/FFFFFF?text=Foam+Beads",
        category: "foam",
      },
    ];
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
