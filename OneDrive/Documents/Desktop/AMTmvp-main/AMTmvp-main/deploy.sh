#!/bin/bash

# Exit on error
set -e

echo "🏗️ Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "📂 The application has been built to the 'out' directory"
echo "🚀 To deploy manually, upload the contents of the 'out' directory to your web server"
echo "🔗 Remember the app is configured with basePath: '/Athlete-Management-Platform'" 