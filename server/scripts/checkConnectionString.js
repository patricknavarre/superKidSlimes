const dotenv = require("dotenv");
dotenv.config();

// Get MongoDB URI from environment variables or command line
const uri = process.env.MONGODB_URI || process.argv[2];

if (!uri) {
  console.error("Error: No MongoDB URI provided");
  console.error(
    'Usage: node checkConnectionString.js "mongodb+srv://username:password@cluster.mongodb.net/database"'
  );
  process.exit(1);
}

// Function to sanitize sensitive information
function sanitizeUri(uri) {
  return uri.replace(
    /(mongodb(\+srv)?:\/\/)([^:]+):([^@]+)@/,
    (match, protocol, srv, username) => `${protocol}${username}:****@`
  );
}

console.log("Checking MongoDB connection string format...");
console.log(`Sanitized URI: ${sanitizeUri(uri)}`);

// Check if it starts with the correct protocol
if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
  console.error("❌ ERROR: URI must start with mongodb:// or mongodb+srv://");
  process.exit(1);
}

// Parse the URI to validate its parts
try {
  // Extract the main components
  const withoutProtocol = uri.replace(/^mongodb(\+srv)?:\/\//, "");
  const parts = withoutProtocol.split("@");

  if (parts.length !== 2) {
    console.error(
      "❌ ERROR: Invalid URI format. Cannot find credentials and host separation (@)"
    );
    process.exit(1);
  }

  const [credentials, hostPart] = parts;

  // Check credentials
  if (!credentials.includes(":")) {
    console.error(
      "❌ ERROR: Invalid credentials format. Missing username:password separator (:)"
    );
    process.exit(1);
  }

  const [username, password] = credentials.split(":");

  if (!username || !password) {
    console.error("❌ ERROR: Missing username or password");
    process.exit(1);
  }

  // Special characters check in password
  const specialChars = ["@", "/", "?", "#", "%"];
  const hasUnescapedSpecial = specialChars.some((char) =>
    password.includes(char)
  );

  if (hasUnescapedSpecial) {
    console.warn(
      "⚠️ WARNING: Password contains special characters that may need to be URL-encoded"
    );
  }

  // Parse host part
  const [host, ...queryParts] = hostPart.split("?");

  if (!host.includes(".")) {
    console.error("❌ ERROR: Invalid hostname format");
    process.exit(1);
  }

  // Check database name
  const dbNameMatch = host.match(/\/([^\/\?]+)$/);
  if (!dbNameMatch) {
    console.warn(
      "⚠️ WARNING: No database name specified in the connection string"
    );
  } else {
    console.log(`✅ Database name: ${dbNameMatch[1]}`);
  }

  // Check for connection options
  const queryString = queryParts.join("?");
  if (queryString) {
    console.log("✅ Connection options present");

    // Parse and validate query parameters
    const params = new URLSearchParams(queryString);

    // Common parameters to check
    if (params.has("retryWrites")) {
      console.log(`✅ retryWrites: ${params.get("retryWrites")}`);
    }

    if (params.has("w")) {
      console.log(`✅ Write concern (w): ${params.get("w")}`);
    }

    if (params.has("authSource")) {
      console.log(`✅ Auth source: ${params.get("authSource")}`);
    }
  } else {
    console.warn("⚠️ WARNING: No connection options specified");
  }

  console.log("\n✅ Connection string format is valid");
} catch (err) {
  console.error("❌ ERROR: Failed to parse connection string");
  console.error(err.message);
  process.exit(1);
}

console.log("\nSuggested fixes if you're having connection issues:");
console.log("1. Ensure all special characters in the password are URL-encoded");
console.log("2. Confirm your Atlas cluster name is correct");
console.log("3. Make sure the database name is included in the URI");
console.log('4. Try adding "?retryWrites=true&w=majority" if not present');
