// Android-specific functionality for device storage and permissions
export class AndroidPermissions {
  static async requestStoragePermission(): Promise<boolean> {
    try {
      // Check if we're running in a WebView (Android app)
      if (typeof (window as any).Android !== "undefined") {
        // Call native Android method to request storage permission
        return await (window as any).Android.requestStoragePermission()
      }

      // For web version, use localStorage
      if (typeof Storage !== "undefined") {
        try {
          localStorage.setItem("test", "test")
          localStorage.removeItem("test")
          return true
        } catch (e) {
          return false
        }
      }

      return false
    } catch (error) {
      console.error("Storage permission request failed:", error)
      return false
    }
  }

  static async saveGameData(data: string): Promise<boolean> {
    try {
      if (typeof (window as any).Android !== "undefined") {
        // Save to Android internal storage
        return await (window as any).Android.saveGameData(data)
      }

      // Fallback to localStorage for web
      localStorage.setItem("alphaTuneGameState", data)
      return true
    } catch (error) {
      console.error("Failed to save game data:", error)
      return false
    }
  }

  static async loadGameData(): Promise<string | null> {
    try {
      if (typeof (window as any).Android !== "undefined") {
        // Load from Android internal storage
        return await (window as any).Android.loadGameData()
      }

      // Fallback to localStorage for web
      return localStorage.getItem("alphaTuneGameState")
    } catch (error) {
      console.error("Failed to load game data:", error)
      return null
    }
  }

  static isAndroidApp(): boolean {
    return typeof (window as any).Android !== "undefined"
  }
}
