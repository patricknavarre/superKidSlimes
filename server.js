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
console.log("About to connect to MongoDB...");
console.log("MongoDB URI environment variable defined:", !!process.env.MONGODB_URI);
// Safely log part of the connection string without exposing credentials
if (process.env.MONGODB_URI) {
  const sanitizedUri = process.env.MONGODB_URI.replace(
    /(mongodb(\+srv)?:\/\/)([^:]+):([^@]+)@/,
    (match, protocol, srv, username) => `${protocol}${username}:****@`
  );
  console.log(`Using connection string: ${sanitizedUri}`);
}

// Function to handle MongoDB connection
const connectWithRetry = () => {
  console.log("Attempting to connect to MongoDB...");
  
  mongoose
    .connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/slime-shop",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(`Database name: ${mongoose.connection.db.databaseName}`);
    })
    .catch((err) => {
      console.error("Could not connect to MongoDB:", err);
      console.error("MongoDB error details:", {
        name: err.name,
        code: err.code,
        message: err.message
      });
      // Additional diagnostics for common MongoDB connection issues
      if (err.message && err.message.includes("ENOTFOUND")) {
        console.error("Host not found. Check if the MongoDB hostname is correct.");
      } else if (err.message && err.message.includes("ETIMEDOUT")) {
        console.error("Connection timed out. This may be due to network issues or IP restrictions.");
      } else if (err.message && err.message.includes("Authentication failed")) {
        console.error("Authentication failed. Check username and password.");
      } else if (err.message && err.message.includes("connection string does not match URI spec")) {
        console.error("Connection string format is invalid. Check the URI structure.");
      }
      
      // Retry connection after delay
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    });
};

// Set up mongoose connection event handlers
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Attempting to reconnect...");
  setTimeout(connectWithRetry, 5000);
});

// Initial connection attempt
connectWithRetry();

// API Routes
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

// Add a diagnostic endpoint for MongoDB connection status
apiRouter.get("/db-status", async (req, res) => {
  try {
    // Check MongoDB connection state
    const connectionState = mongoose.connection.readyState;
    const connectionStates = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting"
    };
    
    const status = {
      state: connectionStates[connectionState] || "unknown",
      connected: connectionState === 1,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      mongodb_uri_defined: !!process.env.MONGODB_URI
    };
    
    // If connected, get some basic database info
    if (connectionState === 1) {
      try {
        // Get database name
        status.databaseName = mongoose.connection.db.databaseName;
        
        // Get collection names
        const collections = await mongoose.connection.db.listCollections().toArray();
        status.collections = collections.map(c => c.name);
      } catch (err) {
        status.error = err.message;
      }
    }
    
    res.json(status);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get database status",
      message: error.message
    });
  }
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
