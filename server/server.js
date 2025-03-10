const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");

dotenv.config();

const app = express();

// CORS Configuration - Allow all origins during development
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Apply CORS headers directly as middleware as well (belt and suspenders approach)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
console.log("Attempting to connect to MongoDB...");
console.log("MongoDB URI defined:", !!process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/slime-shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    connectTimeoutMS: 30000, // Connection timeout
    keepAlive: true,
    keepAliveInitialDelay: 300000, // 5 minutes
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    console.log("Database:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error("MongoDB connection error details:", err.message);
    console.error("MongoDB error code:", err.code);
    console.error("MongoDB error name:", err.name);

    // Don't exit the process, let the server run even if DB connection fails
    console.log("Server will continue running without database connection.");
  });

// Test route to verify server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Fallback route for API endpoints
app.use("/api/*", (req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
    requestedUrl: req.originalUrl,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error details:", err);

  // Send detailed error in development, generic in production
  const errorResponse = {
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
    status: err.status || 500,
    path: req.path,
  };

  if (process.env.NODE_ENV !== "production") {
    errorResponse.stack = err.stack;
  }

  res.status(errorResponse.status).json(errorResponse);
});

const PORT = process.env.PORT || 4020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the server at: http://localhost:${PORT}/api/test`);
  console.log(`Categories endpoint: http://localhost:${PORT}/api/categories`);
});
