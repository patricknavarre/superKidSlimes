// Script to check and fix database name issues
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI || process.argv[2];

if (!uri) {
  console.error("Error: No MongoDB URI provided");
  console.error(
    'Usage: node fixDbName.js "mongodb+srv://username:password@cluster.mongodb.net/database"'
  );
  process.exit(1);
}

// Function to extract parts of the connection string
function parseMongoUri(uri) {
  try {
    // Parse protocol
    const hasProtocol =
      uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://");
    if (!hasProtocol) {
      return { valid: false, error: "Invalid protocol" };
    }

    // Extract host and database
    const afterProtocol = uri.replace(/^mongodb(\+srv)?:\/\//, "");
    const parts = afterProtocol.split("@");

    if (parts.length !== 2) {
      return { valid: false, error: "Cannot parse credentials and host" };
    }

    const [credentials, hostAndDbPart] = parts;

    // Extract database name from the host part
    const hostParts = hostAndDbPart.split("/");

    const host = hostParts[0];
    const dbAndParams = hostParts.length > 1 ? hostParts[1] : "";
    const dbName = dbAndParams.split("?")[0];

    const hasDbName = dbName && dbName.length > 0;

    return {
      valid: true,
      protocol: uri.startsWith("mongodb+srv://") ? "mongodb+srv" : "mongodb",
      credentials,
      host,
      dbName: hasDbName ? dbName : null,
      hasDbName,
    };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

// Function to inject or replace database name in URI
function fixDatabaseName(uri, newDbName) {
  const parsed = parseMongoUri(uri);

  if (!parsed.valid) {
    console.error(`Cannot fix URI: ${parsed.error}`);
    return uri;
  }

  const protocol = `${parsed.protocol}://`;
  const credentials = parsed.credentials ? `${parsed.credentials}@` : "";
  const host = parsed.host;

  // Extract query parameters if any
  let queryParams = "";
  if (parsed.hasDbName) {
    const parts = uri.split("/");
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes("?")) {
      queryParams = "?" + lastPart.split("?")[1];
    }
  } else {
    // Check if there are query parameters after the host
    const hostParts = uri.split("?");
    if (hostParts.length > 1) {
      queryParams = "?" + hostParts[1];
    }
  }

  // Build the new URI with the fixed database name
  const newUri = `${protocol}${credentials}${host}/${newDbName}${queryParams}`;

  return newUri;
}

// Analyze current URI
const parsedUri = parseMongoUri(uri);
console.log("Current connection string analysis:");
console.log("-----------------------------------");

if (!parsedUri.valid) {
  console.error(`Invalid connection string: ${parsedUri.error}`);
  process.exit(1);
}

console.log(`Protocol: ${parsedUri.protocol}`);
console.log(`Host: ${parsedUri.host}`);
console.log(
  `Database: ${parsedUri.hasDbName ? parsedUri.dbName : "Not specified"}`
);

// Test URIs with different database names
const testUris = [
  { name: "test", uri: fixDatabaseName(uri, "test") },
  { name: "admin", uri: fixDatabaseName(uri, "admin") },
];

console.log("\nTesting connection with different database names...");

async function testConnection(name, testUri) {
  let client;
  try {
    client = await mongoose.connect(testUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log(`\n✅ Successfully connected to "${name}" database!`);
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);

    // List collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`Found ${collections.length} collections:`);
    collections.forEach((coll) => {
      console.log(` - ${coll.name}`);
    });

    // Try to find a document in the products collection
    if (collections.some((c) => c.name === "products")) {
      try {
        const doc = await mongoose.connection.db
          .collection("products")
          .findOne({});
        if (doc) {
          console.log("\nFound a sample document in products collection:");
          console.log(JSON.stringify(doc, null, 2).substring(0, 500) + "...");
        } else {
          console.log("\nNo documents found in products collection.");
        }
      } catch (err) {
        console.error(`Error querying products collection: ${err.message}`);
      }
    }

    return { success: true, dbName: name };
  } catch (err) {
    console.log(`\n❌ Failed to connect to "${name}" database: ${err.message}`);
    return { success: false, dbName: name, error: err.message };
  } finally {
    if (client) {
      await mongoose.disconnect();
    }
  }
}

async function runTests() {
  let successfulDb = null;

  for (const test of testUris) {
    const result = await testConnection(test.name, test.uri);
    if (result.success) {
      successfulDb = result.dbName;
      break; // Stop after first success
    }
  }

  if (successfulDb) {
    console.log("\n==============================================");
    console.log(`✅ SUCCESS: Connected to database "${successfulDb}"`);
    console.log("==============================================");
    console.log("\nUpdate your MongoDB URI to use this database name:");
    console.log(fixDatabaseName(uri, successfulDb));
  } else {
    console.log("\n==============================================");
    console.log("❌ FAILED: Could not connect to any database");
    console.log("==============================================");
    console.log("\nTry these troubleshooting steps:");
    console.log("1. Check IP whitelisting in MongoDB Atlas");
    console.log("2. Verify username and password");
    console.log("3. Check network connectivity");
  }
}

runTests().catch(console.error);
