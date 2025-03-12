#!/bin/bash
set -e

echo "Building client for deployment..."
cd client

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the client
echo "Building client..."
npm run build

echo "Build completed successfully!"
echo "You can now deploy the build/ directory to Vercel." 