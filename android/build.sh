#!/usr/bin/env bash
# Builds the MemoChat APK with the official Android SDK tools (aapt2, d8, zipalign, apksigner).
# Runs on GitHub Actions (.github/workflows/apk.yml), where the SDK is preinstalled.
#
#   ANDROID_HOME          Android SDK (set on GitHub's Ubuntu runners)
#   MC_KEYSTORE           base64 of the release keystore (GitHub secret MEMOCHAT_KEYSTORE)
#   MC_KEYSTORE_PASSWORD  its password (GitHub secret MEMOCHAT_KEYSTORE_PASSWORD)
# Without the keystore a throw-away key is used: good for checking the build, never published.
#
# Output in android/build/: memochat.apk, version.json, release=yes|no
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
A="$ROOT/android"
OUT="$A/build"
rm -rf "$OUT"; mkdir -p "$OUT"

SDK="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
[ -d "$SDK" ] || { echo "Android SDK not found"; exit 1; }
BT="$SDK/build-tools/$(ls "$SDK/build-tools" | sort -V | tail -1)"
PLATFORM="$(ls "$SDK/platforms" | grep -E '^android-[0-9]+$' | sort -t- -k2 -n | tail -1)"
JAR="$SDK/platforms/$PLATFORM/android.jar"
echo "build-tools: $BT"; echo "platform: $PLATFORM"

# version from the web app (single source of truth): 1.3.0 → versionCode 10300
VERSION="$(grep -oP "const APP_VERSION = '\K[0-9]+\.[0-9]+\.[0-9]+" "$ROOT/js/app.js")"
IFS=. read -r MA MI PA <<< "$VERSION"
CODE=$((MA * 10000 + MI * 100 + PA))
echo "version: $VERSION ($CODE)"

# 1) the web app goes into assets/www
mkdir -p "$OUT/assets/www"
cp -r "$ROOT/index.html" "$ROOT/manifest.webmanifest" "$ROOT/css" "$ROOT/js" "$ROOT/fonts" "$ROOT/icons" "$OUT/assets/www/"

# 2) resources + manifest
"$BT/aapt2" compile --dir "$A/res" -o "$OUT/res.zip"
"$BT/aapt2" link -o "$OUT/base.apk" -I "$JAR" --manifest "$A/AndroidManifest.xml" -A "$OUT/assets" "$OUT/res.zip" \
  --java "$OUT/gen" --min-sdk-version 26 --target-sdk-version 34 --version-code "$CODE" --version-name "$VERSION"

# 3) Java → dex
mkdir -p "$OUT/classes" "$OUT/dex"
javac -source 8 -target 8 -bootclasspath "$JAR" -encoding UTF-8 -Xlint:-options -Xlint:deprecation \
  -d "$OUT/classes" $(find "$A/src" "$OUT/gen" -name '*.java')
"$BT/d8" --release --min-api 26 --lib "$JAR" --output "$OUT/dex" $(find "$OUT/classes" -name '*.class')

# 4) assemble, align, sign
cp "$OUT/base.apk" "$OUT/unaligned.apk"
(cd "$OUT/dex" && zip -q -j "$OUT/unaligned.apk" classes.dex)
"$BT/zipalign" -f -p 4 "$OUT/unaligned.apk" "$OUT/aligned.apk"

if [ -n "${MC_KEYSTORE:-}" ] && [ -n "${MC_KEYSTORE_PASSWORD:-}" ]; then
  printf '%s' "$MC_KEYSTORE" | base64 -d > "$OUT/release.jks"
  KS="$OUT/release.jks"; export KSPASS="$MC_KEYSTORE_PASSWORD"; RELEASE=yes
else
  echo "No release keystore: signing with a throw-away key (this build will not be published)."
  export KSPASS="throwaway-$RANDOM$RANDOM"
  keytool -genkeypair -keystore "$OUT/throwaway.jks" -storetype PKCS12 -alias memochat -keyalg RSA -keysize 2048 \
    -validity 2 -storepass "$KSPASS" -keypass "$KSPASS" -dname "CN=MemoChat test" >/dev/null 2>&1
  KS="$OUT/throwaway.jks"; RELEASE=no
fi
"$BT/apksigner" sign --ks "$KS" --ks-key-alias memochat --ks-pass env:KSPASS --key-pass env:KSPASS \
  --out "$OUT/memochat.apk" "$OUT/aligned.apk"
"$BT/apksigner" verify --print-certs "$OUT/memochat.apk"
rm -f "$OUT/release.jks" "$OUT/throwaway.jks"

# 5) sanity checks on the finished APK (fail the build if something essential is missing)
"$BT/aapt2" dump badging "$OUT/memochat.apk" | grep -E "^(package|sdkVersion|targetSdkVersion|uses-permission|application-label|launchable-activity):"
for f in AndroidManifest.xml classes.dex resources.arsc assets/www/index.html assets/www/js/qr.js assets/www/js/app.js assets/www/css/app.css assets/www/fonts/fonts.css; do
  unzip -l "$OUT/memochat.apk" | grep -q " $f\$" || { echo "MISSING in APK: $f"; exit 1; }
done
echo "assets/www files: $(unzip -l "$OUT/memochat.apk" | grep -c ' assets/www/')"

cat > "$OUT/version.json" <<EOF
{"versionCode":$CODE,"versionName":"$VERSION","apk":"https://github.com/tvspk/memochat/releases/download/v$VERSION/memochat.apk"}
EOF
echo "$RELEASE" > "$OUT/release"
echo "$VERSION" > "$OUT/version"
ls -la "$OUT/memochat.apk"
