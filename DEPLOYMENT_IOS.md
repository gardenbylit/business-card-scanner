# iOS Deployment Guide - Apple App Store

## Prerequisites

- Mac with Xcode installed
- Apple Developer Account ($99/year)
- Xcode Command Line Tools

## Step 1: Create App ID

1. Go to [Apple Developer](https://developer.apple.com)
2. Navigate to "Certificates, IDs & Profiles"
3. Create new App ID:
   - Bundle ID: com.gardenbylit.businesscardscanner
   - Select "App Services"
   - Enable required capabilities

## Step 2: Generate Signing Certificate

1. Create Certificate Signing Request (CSR)
2. Upload to Apple Developer
3. Download certificate
4. Add to Keychain

## Step 3: Create Provisioning Profile

1. Create new provisioning profile
2. Select App ID
3. Select certificate
4. Select devices
5. Download and install

## Step 4: Update Xcode Project

1. Open `ios/BusinessCardScanner.xcodeproj`
2. Select project
3. Update signing team
4. Update Bundle Identifier
5. Update provisioning profile

## Step 5: Build for Release

```bash
cd ios
xcodebuild archive -scheme BusinessCardScanner -archivePath ~/Desktop/BusinessCardScanner.xcarchive
```

## Step 6: Create App Store Connect Listing

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click "My Apps"
3. Create new app:
   - Name: "Business Card Scanner"
   - Platform: iOS
   - Bundle ID: com.gardenbylit.businesscardscanner
   - SKU: businesscardscanner001

## Step 7: Add Metadata

### App Information
- Subtitle
- Category (Business)
- Content rating
- Privacy policy URL

### Pricing and Availability
- Select free or paid
- Select territories

### Screenshots & Preview
- Add screenshots (5.5" and 6.5")
- Add app preview
- Write description
- Add keywords (5-30 characters each)

## Step 8: Submit for Review

1. Upload build via Xcode
2. Fill in export information
3. Complete app review details
4. Submit for review
5. Wait for approval (24-48 hours)

## Monetization Options

### Ad Networks
- Google AdMob
- Facebook Audience Network

### In-App Purchases
- Consumables: Credits, Scans
- Non-Consumables: Pro version
- Subscriptions: Premium features

## Troubleshooting

- **Code signing issues**: Verify certificate in Keychain
- **Provisioning profile**: Ensure all devices registered
- **Build errors**: Clean build folder (Cmd+Shift+K)
