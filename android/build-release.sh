#!/bin/bash

# Build script for Alpha Tune Android App

echo "Building Alpha Tune Android App..."

# Clean previous builds
./gradlew clean

# Build release AAB
./gradlew bundleRelease

# Build release APK (optional)
./gradlew assembleRelease

echo "Build complete!"
echo "AAB file: app/build/outputs/bundle/release/app-release.aab"
echo "APK file: app/build/outputs/apk/release/app-release.apk"

# Sign the APK if keystore exists
if [ -f "app/keystore/release.keystore" ]; then
    echo "Signing APK..."
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore app/keystore/release.keystore app/build/outputs/apk/release/app-release-unsigned.apk your_key_alias
    zipalign -v 4 app/build/outputs/apk/release/app-release-unsigned.apk app/build/outputs/apk/release/app-release-signed.apk
    echo "Signed APK: app/build/outputs/apk/release/app-release-signed.apk"
fi
