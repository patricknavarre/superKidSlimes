require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const Product = require("./models/Product");

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
      : ["http://localhost:4000", "http://localhost:3000"], // Allow both dev server ports
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

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://pat_Admin:sV1UqqfNKfPIPdqD@superkidslimes.yf9qw.mongodb.net/?retryWrites=true&w=majority&appName=superKidSlimes",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// API Routes
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

apiRouter.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

apiRouter.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

apiRouter.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

apiRouter.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Import inventory data
const inventoryPath = path.join(__dirname, "data", "inventory.js");
const { inventory } = require(inventoryPath);

// Route to seed initial data
apiRouter.post("/seed-products", async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});

    // Insert the inventory data
    const products = await Product.insertMany(inventory);

    res.json({ message: "Database seeded!", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
