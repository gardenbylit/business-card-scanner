# Android Deployment Guide - Google Play Store

## Prerequisites

- Android Studio installed
- Java Development Kit (JDK) 11+
- Android NDK
- Google Play Developer Account ($25 registration fee)

## Step 1: Generate Signed APK/AAB

```bash
cd android
./gradlew bundleRelease
```

This generates: `android/app/build/outputs/bundle/release/app-release.aab`

## Step 2: Create App Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in required fields:
   - App name: "Business Card Scanner"
   - App category: "Business"
   - Select "Free" for initial release

## Step 3: Add App Content

1. Go to "Content rating"
2. Complete questionnaire
3. Get content rating certificate

## Step 4: Add Store Listing

1. Add app icon (512x512 px)
2. Add screenshots (minimum 2)
3. Add app description
4. Add 80 character short description
5. Add contact email

## Step 5: Review and Release

1. Upload AAB to Internal Testing track first
2. Test with beta testers
3. Move to Production
4. Submit for review (24-48 hours)

## Step 6: Monetization Setup

### Option 1: AdMob Ads
- Create AdMob account
- Add ad network to app
- Configure ad placements

### Option 2: In-App Purchases
- Create in-app purchase products in Play Console
- Implement billing library
- Add to app

## Checklist

- [ ] App icon ready (512x512 px)
- [ ] Screenshots ready (minimum 2)
- [ ] Privacy policy URL
- [ ] Contact email
- [ ] App description written
- [ ] Permissions justified
- [ ] No ads on app opening
- [ ] APK/AAB built and tested
- [ ] Content rating complete
