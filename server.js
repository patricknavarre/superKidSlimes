require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { shopifyApi } = require("@shopify/shopify-api");
const { restResources } = require("@shopify/shopify-api/rest/admin/2023-10");

const app = express();

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://super-kid-slimes.vercel.app",
          "https://superkidslimes.vercel.app",
          /\.vercel\.app$/,
        ]
      : "http://localhost:4000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Initialize Shopify (if needed)
if (process.env.SHOPIFY_API_KEY) {
  const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: ["read_products"],
    hostName: process.env.SHOPIFY_SHOP_NAME,
    apiVersion: "2023-10",
    isEmbeddedApp: false,
    restResources,
  });
}

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
}

// API Routes
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

apiRouter.get("/products", async (req, res) => {
  try {
    // Mock data for now
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

// Mount API routes
app.use("/api", apiRouter);

// Serve React app for all other routes in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Handle Vercel serverless environment
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4020;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
