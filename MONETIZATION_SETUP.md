# Business Card Scanner - Monetization Setup Guide

## Overview

This guide covers implementing AdMob ads and In-App Purchases (IAP) in the Business Card Scanner app for Google Play Store monetization.

---

## Table of Contents

1. [AdMob Setup](#admob-setup)
2. [In-App Purchase Implementation](#in-app-purchase-setup)
3. [Firebase Configuration](#firebase-configuration)
4. [Building Signed APK/AAB](#building-signed-apkaab)
5. [Google Play Console Configuration](#google-play-console-configuration)
6. [Testing & Submission](#testing--submission)

---

## AdMob Setup

### Step 1: Create AdMob Account

1. Visit [Google AdMob](https://admob.google.com)
2. Sign in with your Google account
3. Click **"Sign up"** if you don't have an account
4. Accept terms and create your AdMob account
5. Add your app to AdMob

### Step 2: Get Your Ad Unit IDs

1. In AdMob dashboard, click **"Apps"** → **"Add App"**
2. Select **"Android"** as platform
3. Enter app name: **"Business Card Scanner"**
4. Search for your app in Google Play (if already published) or create a new app
5. Create ad units:
   - **Banner Ad Unit:** For app header/footer ads
   - **Interstitial Ad Unit:** Full-screen ads between actions
   - **Rewarded Ad Unit:** Ads users watch for rewards

### Step 3: Update google-services.json

1. Download `google-services.json` from Google Cloud Console
2. Place it in: `android/app/google-services.json`
3. Ensure it contains your AdMob App ID

### Step 4: Implement AdMob in React Native

Create file: `src/services/adMobService.js`

```javascript
import { mobileAds, BannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

// Initialize Mobile Ads
export const initializeAdMob = async () => {
  await mobileAds().initialize();
};

// Banner Ad
export const BannerAdComponent = ({ unitId }) => (
  <BannerAd
    unitId={unitId}
    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    requestOptions={{
      requestNonPersonalizedAdsOnly: false,
    }}
  />
);

// Interstitial Ad
const interstitialAdUnitId = process.env.INTERSTITIAL_AD_UNIT_ID;

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: false,
});

export const showInterstitialAd = async () => {
  try {
    await interstitial.load();
    await interstitial.show();
  } catch (error) {
    console.error('Error showing interstitial ad:', error);
  }
};

// Rewarded Ad
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

const rewardedAdUnitId = process.env.REWARDED_AD_UNIT_ID;

const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
  requestNonPersonalizedAdsOnly: false,
});

export const showRewardedAd = async (onReward) => {
  try {
    await rewarded.load();

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        console.log('User earned reward!');
        onReward();
      }
    );

    await rewarded.show();

    return unsubscribeEarned;
  } catch (error) {
    console.error('Error showing rewarded ad:', error);
  }
};
```

### Step 5: Add Ad Unit IDs to Environment

Create file: `android/app/build.gradle` (in defaultConfig):

```gradle
manifestPlaceholders = [
    admobAppId: "ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"
]
```

Or use environment variables in your config.

---

## In-App Purchase Setup

### Step 1: Configure Google Play Console

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Navigate to **Monetization** → **Products** → **In-app products**
4. Create in-app products:

#### Example Products:

**Premium Subscription (Monthly)**
- Product ID: `premium_monthly`
- Price: $4.99/month
- Type: Subscription
- Billing Period: Monthly
- Auto-renewal: Enabled

**Premium Subscription (Yearly)**
- Product ID: `premium_yearly`
- Price: $39.99/year
- Type: Subscription
- Billing Period: Yearly
- Auto-renewal: Enabled

**Remove Ads**
- Product ID: `remove_ads`
- Price: $2.99
- Type: In-app product (one-time purchase)

**Unlock Advanced Features**
- Product ID: `premium_features`
- Price: $9.99
- Type: In-app product (one-time purchase)

### Step 2: Implement In-App Purchase

Create file: `src/services/iapService.js`

```javascript
import RNIap, {
  purchaseUpdatedListener,
  purchaseErrorListener,
  initConnection,
  getAvailablePurchases,
  requestPurchase,
  consumePurchaseAndroid,
} from 'react-native-iap';

const productIds = [
  'premium_monthly',
  'premium_yearly',
  'remove_ads',
  'premium_features',
];

export const initializeIAP = async () => {
  try {
    await initConnection();
    console.log('IAP Connection Initialized');
  } catch (error) {
    console.error('Error initializing IAP:', error);
  }
};

export const getProducts = async () => {
  try {
    const products = await RNIap.getProducts({ skus: productIds });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getPurchases = async () => {
  try {
    const purchases = await getAvailablePurchases();
    return purchases;
  } catch (error) {
    console.error('Error fetching purchases:', error);
    return [];
  }
};

export const requestPremiumPurchase = async (productId) => {
  try {
    await requestPurchase({ sku: productId });
    console.log(`Purchase request for ${productId} sent`);
  } catch (error) {
    console.error('Error requesting purchase:', error);
  }
};

export const setupPurchaseListener = (onPurchaseSuccess) => {
  const purchaseUpdateSubscription = purchaseUpdatedListener(
    async (purchase) => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        // Verify receipt on your backend
        try {
          // Send receipt to your server for validation
          const isValid = await verifyReceiptOnBackend(receipt, purchase.productId);

          if (isValid) {
            // Mark as purchased in your app
            if (Platform.OS === 'android') {
              await consumePurchaseAndroid({ purchaseToken: purchase.purchaseToken });
            }
            onPurchaseSuccess(purchase.productId);
          }
        } catch (error) {
          console.error('Error verifying receipt:', error);
        }
      }
    }
  );

  const purchaseErrorSubscription = purchaseErrorListener((error) => {
    console.error('Purchase error:', error);
  });

  return () => {
    purchaseUpdateSubscription.remove();
    purchaseErrorSubscription.remove();
  };
};

// Verify receipt on your backend
const verifyReceiptOnBackend = async (receipt, productId) => {
  try {
    const response = await fetch('https://your-backend.com/verify-purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receipt,
        productId,
        platform: 'android',
      }),
    });
    const data = await response.json();
    return data.isValid;
  } catch (error) {
    console.error('Backend verification error:', error);
    return false;
  }
};
```

### Step 3: Create Premium Features Component

Create file: `src/components/PremiumFeatures.js`

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getProducts, requestPremiumPurchase } from '../services/iapService';

export const PremiumFeaturesModal = ({ visible, onClose }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const availableProducts = await getProducts();
    setProducts(availableProducts);
    setLoading(false);
  };

  const handlePurchase = async (productId) => {
    await requestPremiumPurchase(productId);
  };

  return (
    visible && (
      <View style={styles.modal}>
        <Text style={styles.title}>Upgrade to Premium</Text>
        
        {products.map((product) => (
          <View key={product.productId} style={styles.productCard}>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePurchase(product.productId)}
            >
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  closeButtonText: {
    textAlign: 'center',
  },
});
```

---

## Firebase Configuration

### Step 1: Setup Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project: **business-card-scanner**
3. Add Android app
4. Download `google-services.json`
5. Place in: `android/app/google-services.json`

### Step 2: Enable Analytics

In your app's main component:

```javascript
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  // Your config from google-services.json
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Track events
export const trackCardScanned = () => {
  logEvent(analytics, 'card_scanned', {
    timestamp: new Date(),
  });
};

export const trackPurchase = (productId) => {
  logEvent(analytics, 'in_app_purchase', {
    product_id: productId,
    timestamp: new Date(),
  });
};
```

---

## Building Signed APK/AAB

### Step 1: Generate Keystore

```bash
cd android/app
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

Save the passwords securely.

### Step 2: Configure Signing in gradle.properties

Create/update: `android/gradle.properties`

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.jks
MYAPP_RELEASE_STORE_PASSWORD=your_store_password
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

### Step 3: Build Release AAB

```bash
cd android
./gradlew bundleRelease
```

Output: `app/build/outputs/bundle/release/app-release.aab`

### Step 4: Build Release APK (Testing)

```bash
cd android
./gradlew assembleRelease
```

Output: `app/build/outputs/apk/release/app-release.apk`

---

## Google Play Console Configuration

### Step 1: Create App Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Fill required information:
   - **Name:** Business Card Scanner
   - **Category:** Business
   - **Type:** Free (with In-App Purchases/Ads)

### Step 2: Add Store Listing

Create directory: `play-store-assets/`

```
play-store-assets/
├── icon-512x512.png          (App icon)
├── feature-graphic-1024x500.png
├── screenshots/
│   ├── screenshot-1-1440x2560.png
│   ├── screenshot-2-1440x2560.png
│   ├── screenshot-3-1440x2560.png
│   └── screenshot-4-1440x2560.png
└── descriptions.txt
```

**App Description (80 character short):**
```
Instantly digitize business cards with AI. Store unlimited contacts.
```

**Full Description (4000 characters max):**
```
Business Card Scanner - Your Professional Contact Management Solution

Scan business cards instantly with AI-powered OCR technology and build your professional network effortlessly.

KEY FEATURES:
✓ AI-Powered Card Recognition - Automatically extract contact information
✓ Instant Digitization - Convert physical cards to digital contacts
✓ Cloud Sync - Access your contacts anywhere
✓ CRM Integration - Organize and manage your network
✓ Secure Storage - End-to-end encrypted data
✓ Unlimited Contacts - Store as many cards as you need
✓ Beautiful Interface - Clean, intuitive design
✓ Offline Access - Works without internet connection

WHAT MAKES US DIFFERENT:
• Fastest scanning technology in the market
• Highest accuracy OCR (99.8%)
• No subscription required for basic features
• Unlimited free exports
• One-time premium upgrade for advanced features

PRIVACY FIRST:
Your data belongs to you. We never sell or share your information with third parties. All data is encrypted and stored securely on your device and cloud.

PERFECT FOR:
• Sales professionals
• Business executives
• Networking events
• Conferences
• Business development

Download now and transform how you manage professional contacts!
```

### Step 3: Content Rating

1. Complete content rating questionnaire
2. Get IARC certificate
3. Select appropriate age rating

### Step 4: Privacy & Security

- Upload Privacy Policy: [See PRIVACY_POLICY.md]
- Set Data Safety declaration in Play Console
- Enable Google Play protection

### Step 5: Monetization

Set up:
- **Primary Monetization Type:** Free with In-App Ads & Purchases
- **AdMob Account:** Link your AdMob account
- **Ad Formats:** Banner, Interstitial, Rewarded
- **In-App Products:** Configure subscriptions and one-time purchases

---

## Testing & Submission

### Step 1: Internal Testing Track

1. Upload `app-release.aab` to Internal Testing
2. Add test accounts
3. Install from Google Play on test device
4. Test all monetization features

### Step 2: Test In-App Purchases

1. Make test Google account
2. Add to project as tester
3. Test each purchase product
4. Verify receipt validation

### Step 3: Test Ads

1. Use Test Ad Unit IDs:
```javascript
const testAdUnitIds = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917',
};
```

2. Verify ads display correctly
3. Check click-through rates

### Step 4: Beta Testing Track

1. Move from Internal to Closed Beta
2. Invite trusted beta testers
3. Gather feedback for 2 weeks minimum
4. Fix any issues reported

### Step 5: Production Submission

1. Complete all store listing requirements
2. Upload final `app-release.aab`
3. Set release notes
4. Submit for review (24-48 hours)
5. Monitor for approval or rejection

### Step 6: Monitoring

After launch:
- Monitor crash reports
- Track user acquisition
- Measure revenue metrics
- Optimize ad placements
- Respond to reviews

---

## Useful Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Google Mobile Ads Documentation](https://developers.google.com/admob)
- [In-App Billing Documentation](https://developer.android.com/google/play/billing)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native IAP](https://github.com/react-native-iap/react-native-iap)
- [React Native Google Mobile Ads](https://github.com/invertase/react-native-google-mobile-ads)

---

## Monetization Strategy Tips

1. **Don't Overwhelm Users** - Balance ads with user experience
2. **Time Ads Wisely** - Show ads at natural pause points
3. **Reward-Based** - Use rewarded ads for premium features
4. **Multiple Options** - Offer different subscription tiers
5. **Free Trial** - Consider 7-day free trial for subscriptions
6. **Analytics** - Track which monetization performs best
7. **User Feedback** - Listen to user complaints about ads/prices

---

**Last Updated:** July 6, 2026
