#!/bin/bash

# ScanIt Setup Script - Generates signing key for Android release builds
# Usage: bash setup-signing-key.sh

echo "=================================================="
echo "ScanIt - Android Signing Key Generator"
echo "=================================================="
echo ""

# Check if keytool is available
if ! command -v keytool &> /dev/null; then
    echo "❌ ERROR: keytool not found!"
    echo "Please install Java Development Kit (JDK) first."
    echo ""
    echo "On Mac: brew install java"
    echo "On Windows: Download Java JDK from oracle.com"
    echo "On Linux: sudo apt-get install default-jdk"
    exit 1
fi

echo "✅ keytool found!"
echo ""

# Navigate to android/app directory
cd "$(dirname "$0")/android/app" || exit 1

echo "📍 Current directory: $(pwd)"
echo ""

# Check if key already exists
if [ -f "my-release-key.jks" ]; then
    echo "⚠️  WARNING: my-release-key.jks already exists!"
    read -p "Do you want to regenerate it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cancelled."
        exit 1
    fi
fi

echo "🔐 Generating Android signing key..."
echo ""
echo "You will be asked to enter a password for the keystore."
echo "IMPORTANT: Remember this password! You'll need it to build releases."
echo ""

# Generate the keystore
keytool -genkey -v \
    -keystore my-release-key.jks \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -alias my-key-alias

echo ""
echo "=================================================="

if [ -f "my-release-key.jks" ]; then
    echo "✅ SUCCESS! Signing key generated!"
    echo ""
    echo "📁 File location: $(pwd)/my-release-key.jks"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update android/gradle.properties with your keystore password"
    echo "2. Run: cd android && ./gradlew bundleRelease"
    echo "3. Upload app-release.aab to Play Store"
    echo ""
    echo "⚠️  IMPORTANT:"
    echo "- NEVER commit my-release-key.jks to GitHub"
    echo "- NEVER commit android/gradle.properties to GitHub"
    echo "- BACKUP my-release-key.jks somewhere safe"
    echo "- Remember your keystore password!"
else
    echo "❌ FAILED! Key generation failed."
    exit 1
fi

echo "=================================================="
