# Google Play Store Submission Checklist

## Pre-Submission (1-2 weeks before)

### App Development
- [x] All features complete and tested
- [x] App crashes fixed (Firebase Crashlytics clean)
- [x] Performance optimized (load time < 2s)
- [x] Monetization implemented
- [x] Analytics integrated
- [ ] Final code review completed
- [ ] All third-party libraries updated

### Testing
- [ ] Device testing on Android 9, 11, 13, 15
- [ ] Tablet testing (different aspect ratios)
- [ ] Network testing (WiFi, 4G, LTE, 3G)
- [ ] Low memory device testing
- [ ] Permission handling tested
- [ ] Crash reporting verified
- [ ] Analytics events tracked

### Security & Privacy
- [ ] Privacy policy written (see PRIVACY_POLICY.md)
- [ ] Data handling review completed
- [ ] Permissions justified
- [ ] SSL/TLS implemented for API calls
- [ ] User data encryption enabled
- [ ] No hardcoded credentials in code
- [ ] Third-party SDKs reviewed
- [ ] GDPR/CCPA compliance verified

---

## Assets Preparation (2 weeks before)

### App Icon
- [ ] 512x512 px PNG
- [ ] No rounded corners (Play Store applies)
- [ ] Safe zone respected (48 dp from edges)
- [ ] Colors tested on white & dark backgrounds
- [ ] File size optimized (< 1MB)
- **Location:** `play-store-assets/icon.png`

### Feature Graphic
- [ ] 1024x500 px PNG/JPG
- [ ] Aspect ratio 1024:500 exactly
- [ ] App name/branding visible
- [ ] Text readable at small sizes
- [ ] High resolution quality
- **Location:** `play-store-assets/feature-graphic.png`

### Screenshots (Minimum 2, Maximum 8)
#### Portrait Screenshots (9:16 aspect ratio)
- [ ] Screenshot 1: Scan interface - 1440x2560 px
- [ ] Screenshot 2: Contact list - 1440x2560 px
- [ ] Screenshot 3: Contact details - 1440x2560 px
- [ ] Screenshot 4: Premium features - 1440x2560 px

**Requirements per screenshot:**
- [ ] Text size readable (minimum 24 pt)
- [ ] No blurry images
- [ ] Relevant app UI visible
- [ ] Brand elements present
- [ ] Quality optimized

**Location:** `play-store-assets/screenshots/`

### Video Trailer (Optional but Recommended)
- [ ] 30 seconds max
- [ ] Shows key features
- [ ] Good audio quality
- [ ] No external watermarks
- [ ] 16:9 aspect ratio
- **Location:** `play-store-assets/trailer.mp4`

---

## Content Preparation

### App Title
- [x] **"Business Card Scanner"** (50 char max)
- [x] Includes key benefit
- [x] Not misleading

### Short Description (80 characters)
- [x] "Instantly digitize business cards with AI. Store unlimited contacts."
- [x] Concise and compelling
- [x] Includes primary feature
- [x] No special characters

### Full Description (4000 characters max)
- [ ] Written and approved
- [ ] Includes:
  - [ ] Feature list
  - [ ] What makes it unique
  - [ ] Who should use it
  - [ ] Links to privacy policy
  - [ ] Support contact info
- [ ] Spell-checked
- [ ] No email/phone directly (use website contact form)

### Privacy Policy
- [ ] Complete (see PRIVACY_POLICY.md)
- [ ] Hosted on public URL
- [ ] Mentions all data collection
- [ ] Explains third-party services
- [ ] Includes data deletion instructions
- **URL:** https://your-domain.com/privacy-policy

### Support Email
- [ ] Professional email set up
- [ ] Example: `support@businesscardscanner.app`
- [ ] Monitor inbox regularly
- [ ] Response plan in place

---

## Technical Preparation

### APK/AAB Setup
- [ ] Signed APK/AAB generated
- [ ] Keystore backed up securely
- [ ] gradle.properties configured
- [ ] Version code incremented
- [ ] Version name set (e.g., 1.0.0)
- [ ] Min SDK: API 24 (Android 7.0)
- [ ] Target SDK: API 34 (Android 15)

### google-services.json
- [ ] Downloaded from Firebase Console
- [ ] Placed in `android/app/`
- [ ] Firebase project configured
- [ ] Analytics enabled
- [ ] Crashlytics enabled

### Content Rating Questionnaire
- [ ] App category selected: "Business"
- [ ] Rating questionnaire completed:
  - [ ] Violence
  - [ ] Sexual content
  - [ ] Profanity
  - [ ] Substance abuse
  - [ ] Other content restrictions
- [ ] IARC rating certificate obtained

### Data Safety

Complete in Play Console:
- [ ] **Data collection:** Mark what data app collects
  - [ ] Personal info (names, emails, phone)
  - [ ] Photos/images (business card images)
  - [ ] Files (document storage)
  - [ ] Payment info (for IAP)
  - [ ] Other personal data
  - [ ] Location
  - [ ] Contacts
  - [ ] Calendar

- [ ] **Data sharing:** Mark with whom data is shared
  - [ ] Firebase
  - [ ] Google Analytics
  - [ ] AdMob

- [ ] **Data security:**
  - [ ] Data encrypted in transit
  - [ ] Data encrypted at rest
  - [ ] Data deletion available
  - [ ] Security practices documented

### Monetization Settings

#### AdMob Configuration
- [ ] AdMob account linked
- [ ] Ad unit IDs configured:
  - [ ] Banner ad unit ID
  - [ ] Interstitial ad unit ID
  - [ ] Rewarded ad unit ID
- [ ] Ad formats selected
- [ ] Ad network optimization enabled

#### In-App Purchase Setup
- [ ] Products created in Play Console:
  - [ ] premium_monthly
  - [ ] premium_yearly
  - [ ] remove_ads
  - [ ] premium_features
- [ ] Prices set appropriately
- [ ] Product descriptions added
- [ ] Billing library implemented
- [ ] IAP testing completed

---

## Play Console Configuration

### App Store Listing

#### General Information
- [ ] App name: "Business Card Scanner"
- [ ] Short description: 80 char summary
- [ ] Full description: Compelling copy
- [ ] Category: Business
- [ ] Content rating: Completed
- [ ] Contact email: support@businesscardscanner.app
- [ ] Website: your-website.com
- [ ] Privacy policy URL: https://your-domain.com/privacy-policy

#### Graphics & Images
- [ ] App icon uploaded (512x512)
- [ ] Feature image uploaded (1024x500)
- [ ] Screenshots uploaded (min 2)
- [ ] Video trailer uploaded (optional)

#### Release Notes
- [ ] Version 1.0.0 notes written:
  - [ ] Key features listed
  - [ ] Bug fixes mentioned
  - [ ] Performance improvements noted

### Pricing & Distribution

#### Pricing
- [ ] Price set: Free
- [ ] In-app products configured with prices
- [ ] Countries distribution selected (all recommended)

#### Release Management
- [ ] Internal testing track created
- [ ] Beta testing track created (optional)
- [ ] Production track ready
- [ ] Staged rollout plan (e.g., 10% → 50% → 100%)

---

## Testing & QA

### Pre-Release Testing

#### Functional Testing
- [ ] App launches without crash
- [ ] All screens load properly
- [ ] Camera permission works
- [ ] Card scanning works
- [ ] OCR accuracy verified
- [ ] Contact save/load works
- [ ] Cloud sync functional
- [ ] All buttons/navigation work

#### Monetization Testing
- [ ] AdMob test ads display
- [ ] Interstitial ads show correctly
- [ ] Rewarded ads functional
- [ ] IAP test purchase works
- [ ] IAP receipt verification works
- [ ] Subscription renewal works

#### Device Testing (Minimum)
- [ ] Android 9 (API 28)
- [ ] Android 11 (API 30)
- [ ] Android 13 (API 33)
- [ ] Android 15 (API 35)
- [ ] Tablet (10-inch)
- [ ] Phone with notch
- [ ] Phone without notch

#### Permission Testing
- [ ] Camera permission request
- [ ] Storage permission request
- [ ] Contact permission request
- [ ] Behavior when permissions denied
- [ ] Permission revocation handling

#### Edge Cases
- [ ] Low battery mode
- [ ] Low network connection
- [ ] Network switch (WiFi to mobile)
- [ ] App backgrounding/foregrounding
- [ ] Device sleep/wake
- [ ] Low memory conditions

### Beta Testing Track
- [ ] Beta testers recruited (min 20)
- [ ] Beta period: 2 weeks minimum
- [ ] Feedback collection system
- [ ] Bug fixes addressed
- [ ] Performance issues resolved
- [ ] User experience improved

---

## Final Checklist (24 hours before submission)

### Code Quality
- [ ] ESLint passes with no errors
- [ ] No console.error() statements in production
- [ ] No hardcoded sensitive data
- [ ] Proper error handling throughout
- [ ] Memory leaks checked

### Build Quality
- [ ] Release build successful
- [ ] APK/AAB file size reasonable (< 100MB)
- [ ] Version number incremented
- [ ] Min/target SDK verified
- [ ] Signing certificate valid

### Store Listing Quality
- [ ] All required fields filled
- [ ] Screenshots professional and clear
- [ ] Description error-free
- [ ] Contact email monitored
- [ ] Privacy policy accessible

### Legal & Compliance
- [ ] Terms of Service prepared (if needed)
- [ ] Privacy Policy complete
- [ ] GDPR/CCPA compliant
- [ ] Third-party licenses documented
- [ ] Copyright notices included
- [ ] License file in repo

### Documentation
- [ ] README.md comprehensive
- [ ] DEPLOYMENT_ANDROID.md complete
- [ ] MONETIZATION_SETUP.md complete
- [ ] PRIVACY_POLICY.md published
- [ ] PLAY_STORE_CHECKLIST.md reviewed

---

## Submission

### Upload to Play Console
- [ ] Log in to [Google Play Console](https://play.google.com/console)
- [ ] Navigate to your app
- [ ] Go to **Release** → **Production**
- [ ] Click **Create release**
- [ ] Upload `app-release.aab` file
- [ ] Add release notes
- [ ] Review all information
- [ ] **Submit for review**

### Wait for Review
- Typical review time: 24-48 hours
- Check email for approval/rejection
- Have support team ready for issues

### Post-Submission Actions
- [ ] Monitor app reviews daily
- [ ] Respond to user feedback
- [ ] Fix reported bugs quickly
- [ ] Track download/revenue metrics
- [ ] Optimize based on analytics

---

## Post-Launch

### Monitoring
- [ ] Daily crash report review
- [ ] Weekly user feedback review
- [ ] Monthly revenue analytics
- [ ] Feature usage analytics
- [ ] User retention metrics

### Optimization
- [ ] A/B test ad placements
- [ ] Optimize IAP pricing
- [ ] Improve low-rated reviews
- [ ] Fix critical bugs immediately
- [ ] Plan next version features

### Updates (Quarterly)
- [ ] Feature improvements
- [ ] Performance optimization
- [ ] Security patches
- [ ] New monetization options
- [ ] Enhanced analytics

---

## Important Reminders

⚠️ **Google Play Policy Violations to Avoid:**
- ❌ No ads on app open/close
- ❌ No deceptive permissions
- ❌ No malware/spyware
- ❌ No sexual/explicit content
- ❌ No hate speech
- ❌ No misleading descriptions
- ❌ No unrealistic claims
- ❌ No payment obfuscation

✅ **Best Practices:**
- Clear and honest descriptions
- Responsive to user feedback
- Regular updates and improvements
- Transparent monetization
- Strong privacy practices
- Excellent customer support

---

**Last Updated:** July 6, 2026

**Submit your app with confidence! 🚀**