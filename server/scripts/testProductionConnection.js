/**
 * This script tests a MongoDB connection using the provided URI
 * It's useful for verifying that your production connection string works
 * 
 * Usage:
 * node testProductionConnection.js "mongodb+srv://username:password@cluster.mongodb.net/database"
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Get MongoDB URI from command line argument or environment variable
const uri = process.argv[2] || process.env.MONGODB_URI;

if (!uri) {
  console.error('Error: No MongoDB URI provided');
  console.error('Usage: node testProductionConnection.js "mongodb+srv://username:password@cluster.mongodb.net/database"');
  console.error('Alternative: Set MONGODB_URI environment variable');
  process.exit(1);
}

// Log sanitized URI (hide password)
const sanitizedUri = uri.replace(
  /(mongodb(\+srv)?:\/\/)([^:]+):([^@]+)@/,
  (match, protocol, srv, username) => `${protocol}${username}:****@`
);
console.log(`Testing connection to: ${sanitizedUri}`);

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000
};

// Test connection
console.log('Attempting to connect...');
mongoose.connect(uri, options)
  .then(async () => {
    console.log('\n✅ Successfully connected to MongoDB!');
    
    // Print connection details
    console.log(`Database name: ${mongoose.connection.db.databaseName}`);
    console.log(`Connection state: ${mongoose.connection.readyState}`);
    
    // List collections
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log(`\nFound ${collections.length} collections:`);
      collections.forEach(c => console.log(` - ${c.name}`));
      
      // If collections exist, try to fetch one document from each
      if (collections.length > 0) {
        console.log('\nSample documents:');
        for (const coll of collections) {
          try {
            const doc = await mongoose.connection.db.collection(coll.name).findOne({});
            if (doc) {
              console.log(`\n${coll.name}:`);
              console.log(JSON.stringify(doc, null, 2).substring(0, 300) + (JSON.stringify(doc).length > 300 ? '...' : ''));
            } else {
              console.log(`\n${coll.name}: No documents found`);
            }
          } catch (err) {
            console.log(`\n${coll.name}: Error fetching document - ${err.message}`);
          }
        }
      }
    } catch (err) {
      console.error(`Error listing collections: ${err.message}`);
    }
    
    // Close connection
    await mongoose.connection.close();
    console.log('\nConnection closed successfully.');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ Failed to connect to MongoDB');
    console.error(`Error type: ${err.name}`);
    console.error(`Error message: ${err.message}`);
    
    // Provide more specific guidance based on error
    if (err.name === 'MongoServerSelectionError') {
      console.error('\nThis is likely due to one of these issues:');
      console.error('1. IP Address not whitelisted in MongoDB Atlas');
      console.error('2. Incorrect username or password');
      console.error('3. Cluster name is incorrect or cluster is down');
    } else if (err.name === 'MongoParseError') {
      console.error('\nInvalid connection string format. Check your URI syntax.');
    }
    
    process.exit(1);
  }); 