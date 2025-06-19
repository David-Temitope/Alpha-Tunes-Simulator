import { Preferences } from "@capacitor/preferences"

export interface GameSaveData {
  artist: any
  skills: any
  songs: any[]
  socialPlatforms: any[]
  marketplaceItems: any[]
  sideHustles: any[]
  tradeItems: any[]
  financialRecords: any[]
  practicePoints: number
  marketingPoints: number
  timeSlots: number
  energy: number
  earnings: number
  weeklyEarnings: number
  fans: number
  spiritualMorale: number
  week: number
  expenses: any
  recordLabel: string | null
  chatMessages: any[]
  weeklyTaxes: number
  achievements: string[]
  lastSaved: string
}

const SAVE_KEY = "alpha_tune_save_data"

export const saveGameData = async (gameData: GameSaveData): Promise<void> => {
  try {
    const saveData = {
      ...gameData,
      lastSaved: new Date().toISOString(),
    }

    await Preferences.set({
      key: SAVE_KEY,
      value: JSON.stringify(saveData),
    })

    console.log("Game saved successfully")
  } catch (error) {
    console.error("Failed to save game:", error)
  }
}

export const loadGameData = async (): Promise<GameSaveData | null> => {
  try {
    const { value } = await Preferences.get({ key: SAVE_KEY })

    if (value) {
      const saveData = JSON.parse(value)
      console.log("Game loaded successfully")
      return saveData
    }

    return null
  } catch (error) {
    console.error("Failed to load game:", error)
    return null
  }
}

export const clearGameData = async (): Promise<void> => {
  try {
    await Preferences.remove({ key: SAVE_KEY })
    console.log("Game data cleared")
  } catch (error) {
    console.error("Failed to clear game data:", error)
  }
}

export const hasGameSave = async (): Promise<boolean> => {
  try {
    const { value } = await Preferences.get({ key: SAVE_KEY })
    return value !== null
  } catch (error) {
    return false
  }
}
