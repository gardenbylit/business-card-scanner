# ScanIt - Release Configuration Guide

## 📋 Quick Setup Checklist

### 1. Environment Setup
- [ ] `.env` file created ✅
- [ ] `.gitignore` configured ✅
- [ ] `android/gradle.properties` ready ✅

### 2. Generate Signing Key
```bash
bash setup-signing-key.sh
```

This will:
- Check if Java/keytool is installed
- Generate `my-release-key.jks`
- Ask for keystore password (SAVE THIS!)

### 3. Configure gradle.properties
```bash
# Edit android/gradle.properties
# Replace YOUR_KEYSTORE_PASSWORD_HERE with your password from step 2
nano android/gradle.properties
```

Example:
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.jks
MYAPP_RELEASE_STORE_PASSWORD=my_secure_password_123
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_KEY_PASSWORD=my_secure_password_123
```

### 4. Build Release AAB
```bash
bash build-release.sh
```

This will:
- Verify configuration
- Build release AAB
- Output to: `android/app/build/outputs/bundle/release/app-release.aab`

### 5. Upload to Play Store
1. Go to [Google Play Console](https://play.google.com/console)
2. Select **ScanIt** app
3. **Release** → **Production** → **Create release**
4. Upload `app-release.aab`
5. Add release notes
6. **Submit for review**

---

## 📁 File Descriptions

| File | Purpose | Sensitive? |
|------|---------|------------|
| `.env` | Environment variables | ✅ YES - Don't commit |
| `.gitignore` | Git ignore rules | ❌ NO - Safe to commit |
| `android/gradle.properties` | Gradle config & signing | ✅ YES - Don't commit |
| `setup-signing-key.sh` | Generate signing key | ❌ NO - Safe to commit |
| `build-release.sh` | Build release AAB | ❌ NO - Safe to commit |
| `RELEASE_CONFIG.md` | This file | ❌ NO - Safe to commit |

---

## 🔐 Security Important!

**NEVER commit these files:**
```
.env
android/gradle.properties
android/app/my-release-key.jks
```

✅ These are already in `.gitignore`

**BACKUP your signing key:**
```bash
# Save in a secure location
cp android/app/my-release-key.jks ~/backup/my-release-key.jks
```

**Remember your passwords:**
- Keystore password: Used for building releases
- Key password: Same as keystore password

---

## ⚙️ Firebase & AdMob Setup

### Update google-services.json
- Already in: `android/app/google-services.json`
- Contains Firebase config
- Generated from Firebase Console

### Add AdMob App ID to gradle.properties
```properties
ADMOB_APP_ID=ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy
```

### Update .env with Ad Unit IDs
```
BANNER_AD_UNIT_ID=ca-app-pub-xxxx/1111
INTERSTITIAL_AD_UNIT_ID=ca-app-pub-xxxx/2222
REWARDED_AD_UNIT_ID=ca-app-pub-xxxx/3333
```

---

## 🐛 Troubleshooting

### keytool: command not found
```bash
# Install Java JDK
# Mac:
brew install java

# Windows:
# Download from oracle.com/java/technologies/downloads/

# Linux:
sudo apt-get install default-jdk
```

### gradle: command not found
```bash
# Use gradlew (included in project)
cd android
./gradlew bundleRelease
```

### Build failed with "No such file"
```bash
# Ensure key file exists
ls -la android/app/my-release-key.jks

# If missing, run:
bash setup-signing-key.sh
```

### Wrong password error
```bash
# Verify password in android/gradle.properties matches
# the password you entered when generating the key
```

### "Gradle not found" on Windows
```bash
# Use gradlew.bat instead
cd android
gradlew.bat bundleRelease
```

---

## 📞 Support Links

- [Google Play Console](https://play.google.com/console)
- [Firebase Console](https://console.firebase.google.com)
- [AdMob Console](https://admob.google.com)
- [Android Developers](https://developer.android.com)
- [React Native Docs](https://reactnative.dev)

---

## 📚 Related Documentation

- [MONETIZATION_SETUP.md](./MONETIZATION_SETUP.md) - AdMob & IAP setup
- [PLAY_STORE_CHECKLIST.md](./PLAY_STORE_CHECKLIST.md) - Submission checklist
- [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) - Privacy policy
- [README.md](./README.md) - Project overview

---

**Last Updated:** July 6, 2026

✅ **Ready to build and submit ScanIt!**
