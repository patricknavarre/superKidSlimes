const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Get MongoDB URI from environment variables or ask for input
const MONGODB_URI = process.env.MONGODB_URI || process.argv[2];

if (!MONGODB_URI) {
  console.error("Error: No MongoDB URI provided");
  console.error(
    'Usage: node testMongoConnection.js "mongodb+srv://username:password@cluster.mongodb.net/database"'
  );
  process.exit(1);
}

// Log first part of the URI for verification (without exposing credentials)
const sanitizedUri = MONGODB_URI.replace(
  /(mongodb(\+srv)?:\/\/)([^:]+):([^@]+)@/,
  (match, protocol, srv, username) => `${protocol}${username}:****@`
);
console.log(`Connecting to MongoDB: ${sanitizedUri}`);

// Configuration options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
};

// Attempt to connect to MongoDB
console.log("Attempting to connect to MongoDB...");

mongoose
  .connect(MONGODB_URI, options)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB!");
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);
    console.log(`Connection state: ${mongoose.connection.readyState}`);

    // List collections to verify further access
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log("\nCollections in database:");
    collections.forEach((collection) => {
      console.log(`- ${collection.name}`);
    });

    // Close the connection after success
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("\nConnection closed successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("\n❌ Failed to connect to MongoDB");
    console.error(`Error type: ${err.name}`);
    console.error(`Error message: ${err.message}`);

    if (err.name === "MongoServerSelectionError") {
      console.error("\nThis is likely due to one of these issues:");
      console.error("1. IP Address not whitelisted in MongoDB Atlas");
      console.error("2. Incorrect username or password");
      console.error("3. Cluster name is incorrect or cluster is down");
    }

    // Extract hosts info from the error if available
    if (err.reason && err.reason.servers) {
      console.error("\nServer details:");
      Object.entries(err.reason.servers).forEach(([host, info]) => {
        console.error(`Server ${host}:`);
        console.error(`  State: ${info.state}`);
        console.error(`  Type: ${info.type}`);
        if (info.error) {
          console.error(`  Error: ${info.error}`);
        }
      });
    }

    process.exit(1);
  });
