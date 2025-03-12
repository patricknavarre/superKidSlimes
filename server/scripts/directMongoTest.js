// A simpler test using the MongoDB native driver directly
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Get MongoDB URI from environment variables or command line
const uri = process.env.MONGODB_URI || process.argv[2];

if (!uri) {
  console.error("Error: No MongoDB URI provided");
  console.error(
    'Usage: node directMongoTest.js "mongodb+srv://username:password@cluster.mongodb.net/database"'
  );
  process.exit(1);
}

// Setup MongoDB client with minimal options
const client = new MongoClient(uri, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 60000,
});

async function run() {
  try {
    console.log("Connecting to MongoDB using native driver...");
    await client.connect();

    console.log("Connected successfully!");

    // Get database name from connection string or default to 'test'
    const dbName = uri.split("/").pop().split("?")[0] || "test";
    const db = client.db(dbName);

    console.log(`Using database: ${dbName}`);

    // List collections
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections:`);
    collections.forEach((coll) => {
      console.log(` - ${coll.name}`);
    });

    // Try a simple query on the first collection if any exist
    if (collections.length > 0) {
      const firstCollection = collections[0].name;
      console.log(`\nTesting query on collection: ${firstCollection}`);

      const count = await db.collection(firstCollection).countDocuments();
      console.log(`Collection has ${count} documents`);

      if (count > 0) {
        const sample = await db.collection(firstCollection).findOne();
        console.log("Sample document:");
        console.log(JSON.stringify(sample, null, 2));
      }
    }

    console.log("\nTest completed successfully!");
  } catch (err) {
    console.error("\nError connecting to MongoDB:");
    console.error(`Error type: ${err.name}`);
    console.error(`Error message: ${err.message}`);

    if (err.name === "MongoServerSelectionError") {
      console.error("\nPossible causes:");
      console.error("1. Network connectivity issues");
      console.error("2. IP address not whitelisted");
      console.error("3. Authentication failure (username/password)");

      // Check if the error contains topology details
      if (err.topology) {
        console.error("\nServer information:");
        console.error(`Description: ${err.topology.description?.type}`);
        console.error(`State: ${err.topology.s?.state}`);
      }
    }

    process.exit(1);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
