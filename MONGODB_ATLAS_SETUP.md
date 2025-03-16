# MongoDB Atlas Setup for Production

## Connection Troubleshooting

If you're experiencing connection issues with MongoDB Atlas in production, please verify the following settings:

### 1. IP Whitelist Configuration

MongoDB Atlas requires whitelisting IP addresses that are allowed to connect to your database:

1. Log in to your MongoDB Atlas account
2. Select your project/cluster
3. Go to "Network Access" under the Security section
4. Check if there are IP addresses configured
5. For Render.com or other cloud hosting services, you may need to:
   - Add the IP address of your Render.com instance
   - Or allow access from anywhere temporarily using `0.0.0.0/0` (not recommended for long-term use)

### 2. MongoDB Connection String

The correct MongoDB connection string format is:
```
mongodb+srv://<username>:<password>@<cluster-address>/<database-name>?retryWrites=true&w=majority
```

Make sure your MONGODB_URI environment variable in Render.com matches this format.

### 3. Database User Authentication

1. Ensure you've created a database user in MongoDB Atlas
2. Verify the username and password in your connection string
3. Check that the user has appropriate permissions for the database

### 4. Testing the Connection from Production

To test the connection from your production environment, you can:

1. Go to your Render.com dashboard
2. Open the Shell for your web service
3. Run a connection test:
   ```
   curl https://your-app-url.onrender.com/api/db-status
   ```

### 5. Checking Render Environment Variables

1. Go to your Render.com dashboard
2. Select your web service
3. Go to the "Environment" tab
4. Verify that `MONGODB_URI` is correctly set
5. Make sure there are no extra spaces or quotes in the value

If issues persist, check the logs in your Render.com dashboard for more specific error messages. 