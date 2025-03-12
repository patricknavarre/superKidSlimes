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

// Test route to verify server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Simple test endpoint that doesn't use MongoDB
app.get("/api/test-no-db", (req, res) => {
  console.log("Test endpoint called - no DB connection required");
  res.json({
    message: "Server is working without database!",
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
      mongoDbDefined: !!process.env.MONGODB_URI,
      mongoDbFirstChars: process.env.MONGODB_URI
        ? `${process.env.MONGODB_URI.substring(0, 15)}...`
        : "undefined",
    },
  });
});

// Add a diagnostic endpoint to check MongoDB connection
app.get("/api/db-status", async (req, res) => {
  console.log("Database status check requested");

  try {
    // Check if MongoDB is connected
    const connectionState = mongoose.connection.readyState;
    const connectionStates = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    const status = {
      connected: connectionState === 1,
      state: connectionStates[connectionState] || "unknown",
      timestamp: new Date().toISOString(),
    };

    // If connected, try to fetch collection info
    if (connectionState === 1) {
      try {
        const collections = await mongoose.connection.db
          .listCollections()
          .toArray();
        status.collections = collections.map((c) => c.name);

        // Check if products collection exists
        if (collections.some((c) => c.name === "products")) {
          const count = await mongoose.connection.db
            .collection("products")
            .countDocuments();
          status.productCount = count;

          if (count > 0) {
            const sample = await mongoose.connection.db
              .collection("products")
              .findOne({});
            status.sampleProduct = {
              id: sample._id,
              name: sample.name || "unknown",
              hasImage: !!sample.images,
            };
          }
        }

        // Add database name info
        status.databaseName = mongoose.connection.db.databaseName;
      } catch (err) {
        status.collectionError = err.message;
      }
    }

    // If not connected, try to get connection URI info
    else {
      // Get connection URI without exposing credentials
      let connUri = process.env.MONGODB_URI || "not set";
      if (connUri !== "not set") {
        try {
          // Extract parts without exposing sensitive info
          const withoutProtocol = connUri.replace(/^mongodb(\+srv)?:\/\//, "");
          const atParts = withoutProtocol.split("@");

          if (atParts.length === 2) {
            const hostPart = atParts[1];
            status.hostInfo = hostPart.split("/")[0]; // Just the host part

            // Check if database name is in the URI
            const dbParts = hostPart.split("/");
            if (dbParts.length > 1 && dbParts[1]) {
              status.databaseInUri = dbParts[1].split("?")[0] || "empty";
            } else {
              status.databaseInUri = "not specified";
            }
          }
        } catch (e) {
          status.uriParseError = e.message;
        }
      } else {
        status.uriInfo = "No connection URI set in environment";
      }
    }

    res.json(status);
  } catch (err) {
    res.status(500).json({
      error: "Failed to check database status",
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Create a function to ensure the connection URI has a database name
function ensureDatabaseInUri(uri) {
  if (!uri) return uri;

  // Check if URI already has a database specified after the host
  const withoutProtocol = uri.replace(/^mongodb(\+srv)?:\/\//, "");
  const atParts = withoutProtocol.split("@");

  if (atParts.length !== 2) {
    console.log("Connection string format doesn't match expected pattern");
    return uri; // Not a standard connection string
  }

  const hostPart = atParts[1];

  // See if there's a slash after the host (indicating a database name)
  const hasDbName =
    hostPart.includes("/") &&
    hostPart.split("/")[1] &&
    hostPart.split("/")[1].length > 0;

  if (hasDbName) {
    console.log(
      `Database name already specified in connection string: ${
        hostPart.split("/")[1].split("?")[0]
      }`
    );
    return uri; // Already has a database name
  }

  console.log(
    "No database name found in connection string, adding 'test' database"
  );

  // Add the 'test' database name
  const hasParams = uri.includes("?");
  if (hasParams) {
    // Insert 'test' before the parameters
    return uri.replace("?", "/test?");
  } else {
    // Append '/test' to the end
    return `${uri}/test`;
  }
}

// Create a function to handle MongoDB connection
const connectToMongoDB = async () => {
  try {
    // Log if MONGODB_URI environment variable is set
    console.log(
      "MongoDB URI environment variable:",
      process.env.MONGODB_URI ? "defined" : "undefined"
    );

    // Get the URI with 'test' database explicitly specified
    const connectionUri = ensureDatabaseInUri(
      process.env.MONGODB_URI || "mongodb://localhost:27017/slime-shop"
    );

    // Log sanitized connection string (without credentials)
    const sanitizedUri = connectionUri.replace(
      /(mongodb(\+srv)?:\/\/)([^:]+):([^@]+)@/,
      (match, protocol, srv, username) => `${protocol}${username}:****@`
    );
    console.log(`Connecting to MongoDB with: ${sanitizedUri}`);

    await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
      connectTimeoutMS: 30000, // Connection timeout
    });

    console.log("Connected to MongoDB successfully!");
    console.log("Database:", mongoose.connection.db.databaseName);
    console.log("MongoDB connection state:", mongoose.connection.readyState);

    // List collections to verify connection is working correctly
    console.log("Listing collections...");
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`Found ${collections.length} collections:`);
    collections.forEach((collection) => {
      console.log(` - ${collection.name}`);
    });

    // Add a connection event listener to detect disconnects
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected. Attempting to reconnect...");
      setTimeout(connectToMongoDB, 5000); // Try to reconnect after 5 seconds
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  } catch (err) {
    console.error("MongoDB connection error details:", err.message);
    console.error("MongoDB error code:", err.code);
    console.error("MongoDB error name:", err.name);

    // Additional diagnostics
    if (err.message.includes("ENOTFOUND")) {
      console.error(
        "Could not resolve the hostname in the MongoDB URI. Check if the hostname is correct."
      );
    } else if (err.message.includes("ETIMEDOUT")) {
      console.error(
        "Connection timed out. Check if there are IP restrictions or firewall issues."
      );
    } else if (err.message.includes("Authentication failed")) {
      console.error("Authentication failed. Check your username and password.");
    }

    // Don't exit the process, let the server run even if DB connection fails
    console.log("Server will continue running without database connection.");
    console.log("Will attempt to reconnect in 10 seconds...");

    // Try to reconnect after 10 seconds
    setTimeout(connectToMongoDB, 10000);
  }
};

// Initial connection attempt
connectToMongoDB();

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
  // Log error details for debugging
  console.error("Server error:", err.message);
  console.error("Error stack:", err.stack);

  if (err.name === "MongoError" || err.name === "MongoServerError") {
    console.error("MongoDB Error Code:", err.code);
    console.error("MongoDB Error Message:", err.errmsg || err.message);
  }

  // Send detailed error in development, generic in production
  const isDevelopment = process.env.NODE_ENV !== "production";

  const errorResponse = {
    message: isDevelopment ? err.message : "Something went wrong!",
    status: err.status || 500,
    path: req.path,
    timestamp: new Date().toISOString(),
  };

  if (isDevelopment) {
    errorResponse.stack = err.stack;

    if (err.name === "MongoError" || err.name === "MongoServerError") {
      errorResponse.mongoErrorCode = err.code;
      errorResponse.mongoErrorDetails = err.errmsg || err.message;
    }
  }

  res.status(errorResponse.status).json(errorResponse);
});

const PORT = process.env.PORT || 4020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the server at: http://localhost:${PORT}/api/test`);
  console.log(`Test without DB: http://localhost:${PORT}/api/test-no-db`);
  console.log(`Categories endpoint: http://localhost:${PORT}/api/categories`);
});
