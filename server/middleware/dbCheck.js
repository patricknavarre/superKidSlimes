const mongoose = require("mongoose");

/**
 * Middleware to check if MongoDB is connected
 * Returns a 503 Service Unavailable if the database is not connected
 */
const checkDbConnection = (req, res, next) => {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const connectionState = mongoose.connection.readyState;

  if (connectionState !== 1) {
    console.log(
      `MongoDB not connected (state: ${connectionState}), returning error response`
    );
    return res.status(503).json({
      error: "Database connection unavailable",
      message: "The database is currently unavailable. Please try again later.",
      connectionState: connectionState,
      timestamp: new Date().toISOString(),
    });
  }

  next();
};

module.exports = checkDbConnection;
