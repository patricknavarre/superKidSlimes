const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("dns");
const { promisify } = require("util");

// Load environment variables
dotenv.config();

// Get connection string from environment
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/slime-shop";

console.log("=".repeat(80));
console.log("MONGODB CONNECTION DIAGNOSTIC TOOL");
console.log("=".repeat(80));

// Print connection details (safely)
console.log("\nCONNECTION DETAILS:");
if (!uri) {
  console.error("ERROR: MONGODB_URI is not defined in environment");
  process.exit(1);
}

// Extract relevant parts without exposing password
const maskPassword = (uri) => {
  try {
    const parts = new URL(uri);
    // Check if there's a username and password
    if (parts.username) {
      return `${parts.protocol}//${parts.username}:****@${parts.host}${parts.pathname}${parts.search}`;
    }
    return uri;
  } catch (e) {
    return "Invalid URI format";
  }
};

console.log(`URI Format: ${maskPassword(uri)}`);

// Check if proper protocol is used
if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
  console.error("ERROR: URI does not start with mongodb:// or mongodb+srv://");
  process.exit(1);
}

// For SRV records, check DNS resolution
const resolveSrv = async (uri) => {
  if (uri.startsWith("mongodb+srv://")) {
    try {
      // Extract hostname from URI
      const url = new URL(uri);
      const hostname = url.hostname;

      console.log(`\nDNS SRV RESOLUTION TEST:`);
      console.log(`Hostname: ${hostname}`);

      // Try to resolve SRV records
      const resolveSrv = promisify(dns.resolveSrv);
      const records = await resolveSrv(`_mongodb._tcp.${hostname}`);

      console.log("SRV Records found:");
      records.forEach((record) => {
        console.log(
          `- ${record.name}:${record.port} (priority: ${record.priority}, weight: ${record.weight})`
        );
      });

      // Try to resolve the IP addresses
      console.log("\nIP RESOLUTION TEST:");
      for (const record of records) {
        const resolve4 = promisify(dns.resolve4);
        try {
          const ips = await resolve4(record.name);
          console.log(`- ${record.name} resolves to: ${ips.join(", ")}`);
        } catch (err) {
          console.error(`- ERROR resolving ${record.name}: ${err.message}`);
        }
      }

      return true;
    } catch (err) {
      console.error(`\nDNS RESOLUTION ERROR: ${err.message}`);
      return false;
    }
  }
  return true; // Not an SRV URI, so no DNS check needed
};

// Test MongoDB connection
const testConnection = async () => {
  console.log("\nCONNECTION TEST:");

  // First check DNS for SRV records if applicable
  const dnsOk = await resolveSrv(uri);
  if (!dnsOk) {
    console.log("DNS resolution failed - this may prevent MongoDB connection");
  }

  console.log("Attempting connection to MongoDB...");

  try {
    // Connect with detailed diagnostics
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Shorter timeout for diagnostic purposes
      connectTimeoutMS: 5000,
    });

    console.log("SUCCESS: Connected to MongoDB!");
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);

    // Check if we can run a basic command
    console.log("\nVERIFYING DATABASE ACCESS:");
    try {
      const adminDb = mongoose.connection.db.admin();
      const result = await adminDb.ping();
      console.log(`Ping result: ${JSON.stringify(result)}`);

      // List collections
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      console.log(`\nCollections in database (${collections.length} found):`);
      collections.forEach((coll) => {
        console.log(`- ${coll.name}`);
      });
    } catch (cmdErr) {
      console.error(`ERROR executing database command: ${cmdErr.message}`);
    }
  } catch (err) {
    console.error("CONNECTION ERROR:");
    console.error(`- Message: ${err.message}`);
    console.error(`- Code: ${err.code || "N/A"}`);
    console.error(`- Name: ${err.name || "N/A"}`);

    if (err.message.includes("authentication failed")) {
      console.error("\nAUTHENTICATION PROBLEM:");
      console.error("- Check your username and password");
      console.error("- Verify the authentication database (authSource)");
      console.error("- Ensure the user has proper permissions");
    }

    if (err.message.includes("getaddrinfo")) {
      console.error("\nHOSTNAME RESOLUTION PROBLEM:");
      console.error("- Check if the hostname is correct");
      console.error("- Verify your network connection");
      console.error("- Check if MongoDB Atlas IP whitelist includes your IP");
    }

    if (err.message.includes("timed out")) {
      console.error("\nTIMEOUT PROBLEM:");
      console.error("- Network issues may be causing slow connections");
      console.error("- Firewall might be blocking the connection");
      console.error("- MongoDB Atlas IP whitelist might not include your IP");
    }
  } finally {
    // Always close the connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("\nConnection closed.");
    }
  }
};

// Run the test
testConnection()
  .then(() => {
    console.log("\nDiagnostic completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("\nUnexpected error during diagnostics:", err);
    process.exit(1);
  });
