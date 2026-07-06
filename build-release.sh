#!/bin/bash

# ScanIt Build Script - Builds release AAB for Play Store
# Usage: bash build-release.sh

echo "=================================================="
echo "ScanIt - Release Build Script"
echo "=================================================="
echo ""

# Check if gradle.properties is configured
if ! grep -q "MYAPP_RELEASE_STORE_PASSWORD" android/gradle.properties 2>/dev/null; then
    echo "❌ ERROR: android/gradle.properties not configured!"
    echo ""
    echo "Please run these steps first:"
    echo "1. Run: bash setup-signing-key.sh"
    echo "2. Edit: android/gradle.properties"
    echo "3. Add your keystore password"
    exit 1
fi

# Check if keystore file exists
if [ ! -f "android/app/my-release-key.jks" ]; then
    echo "❌ ERROR: my-release-key.jks not found!"
    echo ""
    echo "Please run: bash setup-signing-key.sh"
    exit 1
fi

echo "✅ Configuration verified!"
echo ""

# Navigate to android directory
cd android || exit 1

echo "📦 Building release AAB..."
echo ""

# Build the release bundle
./gradlew bundleRelease

BUILD_STATUS=$?

if [ $BUILD_STATUS -eq 0 ]; then
    echo ""
    echo "=================================================="
    echo "✅ BUILD SUCCESSFUL!"
    echo "=================================================="
    echo ""
    echo "📁 Output location:"
    echo "   app/build/outputs/bundle/release/app-release.aab"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to Google Play Console"
    echo "2. Upload app-release.aab"
    echo "3. Complete store listing"
    echo "4. Submit for review"
    echo ""
    echo "⏱️  Review time: typically 24-48 hours"
    echo ""
else
    echo ""
    echo "=================================================="
    echo "❌ BUILD FAILED!"
    echo "=================================================="
    echo ""
    echo "Troubleshooting:"
    echo "1. Check gradle.properties is configured correctly"
    echo "2. Verify keystore password is correct"
    echo "3. Run: ./gradlew clean"
    echo "4. Run: ./gradlew bundleRelease"
    exit 1
fi
