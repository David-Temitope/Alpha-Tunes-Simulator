export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: (gameState: any) => boolean
  reward?: {
    type: "money" | "fans" | "skill" | "item"
    amount: number
    skill?: string
  }
}

export const achievements: Achievement[] = [
  {
    id: "first_song",
    title: "First Track",
    description: "Create your first song",
    icon: "🎵",
    condition: (gameState) => gameState.songs.length >= 1,
    reward: { type: "money", amount: 500 },
  },
  {
    id: "first_upload",
    title: "Going Live",
    description: "Upload your first song to a platform",
    icon: "📤",
    condition: (gameState) => gameState.songs.some((song: any) => song.uploadedPlatforms.length > 0),
    reward: { type: "fans", amount: 100 },
  },
  {
    id: "social_butterfly",
    title: "Social Butterfly",
    description: "Make your first social media post",
    icon: "📱",
    condition: (gameState) => gameState.socialPlatforms.some((platform: any) => platform.posts.length > 0),
    reward: { type: "money", amount: 200 },
  },
  {
    id: "first_thousand",
    title: "First Grand",
    description: "Earn your first $1,000",
    icon: "💰",
    condition: (gameState) => gameState.earnings >= 1000,
    reward: { type: "skill", amount: 5, skill: "business" },
  },
  {
    id: "fan_base",
    title: "Growing Fanbase",
    description: "Reach 1,000 fans",
    icon: "👥",
    condition: (gameState) => gameState.fans >= 1000,
    reward: { type: "money", amount: 1000 },
  },
  {
    id: "prolific_artist",
    title: "Prolific Artist",
    description: "Create 10 songs",
    icon: "🎼",
    condition: (gameState) => gameState.songs.length >= 10,
    reward: { type: "skill", amount: 10, skill: "writing" },
  },
  {
    id: "record_deal",
    title: "Signed Artist",
    description: "Sign with a record label",
    icon: "📝",
    condition: (gameState) => gameState.recordLabel !== null,
    reward: { type: "money", amount: 5000 },
  },
  {
    id: "high_roller",
    title: "High Roller",
    description: "Earn $50,000 total",
    icon: "💎",
    condition: (gameState) => gameState.earnings >= 50000,
    reward: { type: "fans", amount: 5000 },
  },
  {
    id: "social_influencer",
    title: "Social Influencer",
    description: "Reach 10,000 followers on any platform",
    icon: "⭐",
    condition: (gameState) => gameState.socialPlatforms.some((platform: any) => platform.followers >= 10000),
    reward: { type: "skill", amount: 15, skill: "business" },
  },
  {
    id: "veteran_artist",
    title: "Veteran Artist",
    description: "Survive 52 weeks in the industry",
    icon: "🏆",
    condition: (gameState) => gameState.week >= 52,
    reward: { type: "money", amount: 10000 },
  },
]

export const checkAchievements = (gameState: any, unlockedAchievements: string[]): Achievement[] => {
  return achievements.filter(
    (achievement) => !unlockedAchievements.includes(achievement.id) && achievement.condition(gameState),
  )
}
