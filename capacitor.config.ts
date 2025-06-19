import type { CapacitorConfig } from "@capacitor/core"

const config: CapacitorConfig = {
  appId: "com.alphatune.musicgame",
  appName: "Alpha Tune",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a1a2e",
      showSpinner: false,
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#1a1a2e",
    },
    Keyboard: {
      resize: "body",
    },
  },
}

export default config
