"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface Artist {
  originalName: string
  stageName: string
  email: string
  genre: string
  profileImage: string
  bio: string
}

interface Skills {
  livePerformance: number
  voice: number
  production: number
  writing: number
  business: number
  streetKnowledge: number
}

interface Song {
  id: string
  title: string
  genre: string
  duration: number
  artwork: string
  uploadDate: Date
  streams: { [platform: string]: number }
  uploadedPlatforms: string[]
  rating: number
  productionCost: number
  qualityMultiplier: number
}

interface SocialPlatform {
  id: string
  name: string
  followers: number
  engagement: number
  influence: number
  unlocked: boolean
  posts: SocialPost[]
}

interface SocialPost {
  id: string
  platform: string
  content: string
  type: string
  timestamp: Date
  likes: number
  shares: number
}

interface MarketplaceItem {
  id: string
  name: string
  category: "instrument" | "property" | "vehicle"
  price: number
  description: string
  image: string
  effect: string
  owned: boolean
}

interface SideHustle {
  id: string
  title: string
  description: string
  weeklyPay: { min: number; max: number }
  timeSlots: number
  energyCost: number
  skillGain?: { skill: keyof Skills; amount: number }
  unlocked: boolean
  active: boolean
}

interface TradeItem {
  id: string
  name: string
  category: "sneakers" | "gear" | "beats" | "crypto" | "vinyl" | "nft"
  currentPrice: number
  buyPrice?: number
  quantity: number
  priceHistory: number[]
  volatility: number
  owned: number
}

interface FinancialRecord {
  id: string
  week: number
  type: "income" | "expense"
  category: string
  amount: number
  description: string
  date: Date
}

interface ChatMessage {
  id: string
  type: "collaboration" | "feature" | "label_contract"
  from: string
  message: string
  offer?: {
    amount: number
    details: string
  }
  timestamp: Date
  responded: boolean
}

interface GameState {
  artist: Artist
  skills: Skills
  songs: Song[]
  socialPlatforms: SocialPlatform[]
  marketplaceItems: MarketplaceItem[]
  sideHustles: SideHustle[]
  tradeItems: TradeItem[]
  financialRecords: FinancialRecord[]
  practicePoints: number
  marketingPoints: number
  timeSlots: number
  energy: number
  earnings: number
  weeklyEarnings: number
  fans: number
  spiritualMorale: number
  week: number
  unlockedPlatforms: string[]
  expenses: {
    rent: number
    food: number
    transportation: number
  }
  recordLabel: string | null
  chatMessages: ChatMessage[]
  weeklyTaxes: number
}

interface GameContextType {
  gameState: GameState
  setGameState: (state: GameState) => void
  updateSkill: (skill: keyof Skills, amount: number) => void
  spendPracticePoints: (amount: number) => void
  spendMarketingPoints: (amount: number) => void
  spendTimeSlots: (amount: number) => void
  spendEnergy: (amount: number) => void
  addEarnings: (amount: number) => void
  addFans: (amount: number) => void
  updateMorale: (amount: number) => void
  uploadSong: (song: Omit<Song, "id" | "uploadDate" | "streams" | "uploadedPlatforms">) => void
  purchaseItem: (itemId: string) => boolean
  createSocialPost: (platformId: string, content: string, type: string) => void
  startSideHustle: (hustleId: string) => boolean
  quitSideHustle: (hustleId: string) => boolean
  buyTradeItem: (itemId: string, quantity: number) => boolean
  sellTradeItem: (itemId: string, quantity: number) => boolean
  nextWeek: () => void
  showTitheModal: boolean
  setShowTitheModal: (show: boolean) => void
  uploadSongToPlatform: (songId: string, platformId: string) => void
  addFinancialRecord: (type: "income" | "expense", category: string, amount: number, description: string) => void
  signWithLabel: (labelName: string) => void
  resetGame: () => void
  respondToMessage: (messageId: string, accept: boolean) => void
  unreadMessages: number
  getCareerStatus: () => string
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const initialSocialPlatforms: SocialPlatform[] = [
  { id: "fakebook", name: "Fakebook", followers: 0, engagement: 0, influence: 0, unlocked: true, posts: [] },
  { id: "chatit", name: "ChatIt", followers: 0, engagement: 0, influence: 0, unlocked: true, posts: [] },
  { id: "gramsta", name: "Gramsta", followers: 0, engagement: 0, influence: 0, unlocked: false, posts: [] },
  { id: "twix", name: "TwiX", followers: 0, engagement: 0, influence: 0, unlocked: false, posts: [] },
  { id: "reelify", name: "Reelify", followers: 0, engagement: 0, influence: 0, unlocked: false, posts: [] },
  { id: "streamline", name: "Streamline", followers: 0, engagement: 0, influence: 0, unlocked: false, posts: [] },
  { id: "beatbase", name: "Beatbase", followers: 0, engagement: 0, influence: 0, unlocked: false, posts: [] },
]

const initialSideHustles: SideHustle[] = [
  {
    id: "waiter",
    title: "Waiter/Waitress",
    description: "Work evening shifts at a local diner",
    weeklyPay: { min: 100, max: 200 },
    timeSlots: 2,
    energyCost: 2,
    unlocked: true,
    active: false,
  },
  {
    id: "studio-intern",
    title: "Studio Intern",
    description: "Help out at a recording studio",
    weeklyPay: { min: 150, max: 300 },
    timeSlots: 3,
    energyCost: 1,
    skillGain: { skill: "production", amount: 1 },
    unlocked: true,
    active: false,
  },
  {
    id: "freelance-designer",
    title: "Freelance Designer",
    description: "Make posters and cover art for others",
    weeklyPay: { min: 200, max: 500 },
    timeSlots: 2,
    energyCost: 1,
    unlocked: true,
    active: false,
  },
  {
    id: "delivery-rider",
    title: "Delivery Rider",
    description: "Deliver food or packages around the city",
    weeklyPay: { min: 150, max: 250 },
    timeSlots: 2,
    energyCost: 3,
    unlocked: true,
    active: false,
  },
  {
    id: "open-mic",
    title: "Open Mic Performer",
    description: "Gig in small lounges for cash",
    weeklyPay: { min: 300, max: 600 },
    timeSlots: 1,
    energyCost: 2,
    skillGain: { skill: "livePerformance", amount: 2 },
    unlocked: true,
    active: false,
  },
  {
    id: "music-teacher",
    title: "Music Teacher",
    description: "Teach local kids instruments/vocals",
    weeklyPay: { min: 200, max: 350 },
    timeSlots: 2,
    energyCost: 1,
    unlocked: true,
    active: false,
  },
]

const initialTradeItems: TradeItem[] = [
  {
    id: "jordan-retro",
    name: "Jordan Retro 4",
    category: "sneakers",
    currentPrice: 250,
    quantity: 0,
    priceHistory: [200, 220, 240, 250],
    volatility: 0.1,
    owned: 0,
  },
  {
    id: "studio-mic",
    name: "Audio-Technica AT2020",
    category: "gear",
    currentPrice: 150,
    quantity: 0,
    priceHistory: [120, 135, 145, 150],
    volatility: 0.05,
    owned: 0,
  },
  {
    id: "trap-beats",
    name: "Trap Beat Pack",
    category: "beats",
    currentPrice: 50,
    quantity: 0,
    priceHistory: [30, 40, 45, 50],
    volatility: 0.15,
    owned: 0,
  },
  {
    id: "groovecoin",
    name: "GrooveCoin",
    category: "crypto",
    currentPrice: 1.25,
    quantity: 0,
    priceHistory: [0.8, 1.0, 1.15, 1.25],
    volatility: 0.25,
    owned: 0,
  },
  {
    id: "vintage-vinyl",
    name: "Rare Jazz Vinyl",
    category: "vinyl",
    currentPrice: 300,
    quantity: 0,
    priceHistory: [250, 275, 290, 300],
    volatility: 0.08,
    owned: 0,
  },
]

const initialMarketplaceItems: MarketplaceItem[] = [
  // Instruments - Updated with new images
  {
    id: "guitar-acoustic",
    name: "Professional Acoustic Guitar",
    category: "instrument",
    price: 800,
    description: "High-quality acoustic guitar for professional recordings",
    image: "/images/guitar.avif",
    effect: "+3 Writing skill boost",
    owned: false,
  },
  {
    id: "mic-studio",
    name: "Studio Condenser Microphone",
    category: "instrument",
    price: 1500,
    description: "Professional studio microphone for crystal clear vocals",
    image: "/images/microphone2.avif",
    effect: "+4 Voice skill boost",
    owned: false,
  },
  {
    id: "mic-dynamic",
    name: "Dynamic Performance Microphone",
    category: "instrument",
    price: 900,
    description: "Durable microphone perfect for live performances",
    image: "/images/microphone3.avif",
    effect: "+3 Live Performance boost",
    owned: false,
  },
  {
    id: "drumset-pro",
    name: "Professional Drum Set",
    category: "instrument",
    price: 3500,
    description: "Complete professional drum kit for studio and live use",
    image: "/images/drumset.avif",
    effect: "+5 Production skill, +3 Live Performance",
    owned: false,
  },
  {
    id: "launchpad-midi",
    name: "MIDI Launch Pad Controller",
    category: "instrument",
    price: 600,
    description: "Compact MIDI controller for beat making and live performance",
    image: "/images/launchpad.avif",
    effect: "+3 Production skill boost",
    owned: false,
  },
  {
    id: "trumpet-brass",
    name: "Professional Trumpet",
    category: "instrument",
    price: 1200,
    description: "High-quality brass trumpet for jazz and classical music",
    image: "/images/trumpet.avif",
    effect: "+2 Voice skill, +2 Live Performance",
    owned: false,
  },

  // Properties - Updated with new images
  {
    id: "apartment-modern",
    name: "Modern Studio Apartment",
    category: "property",
    price: 75000,
    description: "Contemporary apartment with built-in recording space",
    image: "/images/house1.avif",
    effect: "+15% practice efficiency, +5% social media engagement",
    owned: false,
  },
  {
    id: "house-suburban",
    name: "Suburban Family House",
    category: "property",
    price: 180000,
    description: "Spacious family home with dedicated music room",
    image: "/images/house2.avif",
    effect: "+25% practice efficiency, +10% fan attraction",
    owned: false,
  },
  {
    id: "house-luxury",
    name: "Luxury Modern House",
    category: "property",
    price: 350000,
    description: "High-end modern house with professional studio",
    image: "/images/house3.avif",
    effect: "+40% practice efficiency, +15% streaming boost",
    owned: false,
  },
  {
    id: "mansion-estate",
    name: "Luxury Estate Mansion",
    category: "property",
    price: 800000,
    description: "Massive luxury estate with multiple studios and entertainment areas",
    image: "/images/house4.avif",
    effect: "+60% practice efficiency, +25% all bonuses",
    owned: false,
  },

  // Vehicles - Updated with new images
  {
    id: "car-sedan",
    name: "Sedan Car",
    category: "vehicle",
    price: 25000,
    description: "Reliable transportation for gigs",
    image: "/images/car2.avif",
    effect: "+5% tour earnings",
    owned: false,
  },
  {
    id: "car-luxury-sports",
    name: "Luxury Sports Car",
    category: "vehicle",
    price: 85000,
    description: "High-end sports car for style and speed",
    image: "/images/car1.avif",
    effect: "+15% fan attraction",
    owned: false,
  },
  {
    id: "car-premium-coupe",
    name: "Premium Coupe",
    category: "vehicle",
    price: 65000,
    description: "Stylish coupe perfect for city cruising",
    image: "/images/car3.avif",
    effect: "+10% social media engagement",
    owned: false,
  },
  {
    id: "car-supercar",
    name: "Supercar",
    category: "vehicle",
    price: 200000,
    description: "Ultimate luxury supercar for maximum impact",
    image: "/images/car6.avif",
    effect: "+25% fan attraction, +10% streaming boost",
    owned: false,
  },
  {
    id: "car-luxury-suv",
    name: "Luxury SUV",
    category: "vehicle",
    price: 120000,
    description: "Spacious luxury SUV for touring with crew",
    image: "/images/car7.avif",
    effect: "+20% tour earnings, +5% team efficiency",
    owned: false,
  },
  {
    id: "car-executive",
    name: "Executive Sedan",
    category: "vehicle",
    price: 95000,
    description: "Professional executive vehicle for business meetings",
    image: "/images/car8.avif",
    effect: "+15% business opportunities, +8% fan respect",
    owned: false,
  },
]

const initialGameState: GameState = {
  artist: {
    originalName: "",
    stageName: "",
    email: "",
    genre: "",
    profileImage: "/placeholder.svg?height=150&width=150",
    bio: "",
  },
  skills: {
    livePerformance: 1,
    voice: 1,
    production: 1,
    writing: 1,
    business: 1,
    streetKnowledge: 1,
  },
  songs: [],
  socialPlatforms: initialSocialPlatforms,
  marketplaceItems: initialMarketplaceItems,
  sideHustles: initialSideHustles,
  tradeItems: initialTradeItems,
  financialRecords: [],
  practicePoints: 100,
  marketingPoints: 5,
  timeSlots: 7,
  energy: 10,
  earnings: 0,
  weeklyEarnings: 0,
  fans: 0,
  spiritualMorale: 0,
  week: 1,
  unlockedPlatforms: ["SoundVibe", "Amaplay"],
  expenses: {
    rent: 600, // Reduced from 800
    food: 50,
    transportation: 100,
  },
  recordLabel: null,
  chatMessages: [],
  weeklyTaxes: 0,
}

// Random song artwork selection
const songArtworks = [
  "/images/song-artwork/concert-crowd.webp",
  "/images/song-artwork/studio-headphones.avif",
  "/images/song-artwork/mixing-console.avif",
  "/images/song-artwork/listening-music.avif",
  "/images/song-artwork/recording-studio.avif",
  "/images/song-artwork/home-studio.avif",
  "/images/song-artwork/digital-waves.webp",
  "/images/song-artwork/stage-silhouette.webp",
  "/images/song-artwork/singing-studio.avif",
  "/images/song-artwork/audio-equipment.avif",
]

// Save game state to localStorage
const saveGameState = (state: GameState) => {
  try {
    localStorage.setItem("alphaTuneGameState", JSON.stringify(state))
  } catch (error) {
    console.warn("Failed to save game state:", error)
  }
}

// Load game state from localStorage
const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem("alphaTuneGameState")
    if (saved) {
      const parsed = JSON.parse(saved)
      // Ensure dates are properly restored
      if (parsed.songs) {
        parsed.songs = parsed.songs.map((song: any) => ({
          ...song,
          uploadDate: new Date(song.uploadDate),
        }))
      }
      if (parsed.financialRecords) {
        parsed.financialRecords = parsed.financialRecords.map((record: any) => ({
          ...record,
          date: new Date(record.date),
        }))
      }
      if (parsed.socialPlatforms) {
        parsed.socialPlatforms = parsed.socialPlatforms.map((platform: any) => ({
          ...platform,
          posts: platform.posts.map((post: any) => ({
            ...post,
            timestamp: new Date(post.timestamp),
          })),
        }))
      }
      if (parsed.chatMessages) {
        parsed.chatMessages = parsed.chatMessages.map((message: any) => ({
          ...message,
          timestamp: new Date(message.timestamp),
        }))
      }
      return parsed
    }
  } catch (error) {
    console.warn("Failed to load game state:", error)
  }
  return null
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== "undefined") {
      return loadGameState() || initialGameState
    }
    return initialGameState
  })

  // Save to localStorage whenever gameState changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      saveGameState(gameState)
    }
  }, [gameState])

  const [showTitheModal, setShowTitheModal] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)

  // Check for unread messages
  useEffect(() => {
    const unread = gameState.chatMessages.filter((m) => !m.responded).length
    setUnreadMessages(unread)
  }, [gameState.chatMessages])

  // Career status calculation
  const getCareerStatus = () => {
    const totalStreams = gameState.songs.reduce((total, song) => {
      return total + Object.values(song.streams).reduce((songTotal, streams) => songTotal + streams, 0)
    }, 0)

    if (gameState.fans >= 1000000 || totalStreams >= 10000000) return "Superstar"
    if (gameState.fans >= 500000 || totalStreams >= 5000000) return "Celebrity"
    if (gameState.fans >= 100000 || totalStreams >= 1000000) return "Rising Star"
    if (gameState.fans >= 10000 || totalStreams >= 100000) return "Local Artist"
    if (gameState.fans >= 1000 || totalStreams >= 10000) return "Emerging Artist"
    return "Beginner"
  }

  const addFinancialRecord = (type: "income" | "expense", category: string, amount: number, description: string) => {
    const record: FinancialRecord = {
      id: Date.now().toString(),
      week: gameState.week,
      type,
      category,
      amount,
      description,
      date: new Date(),
    }

    setGameState((prev) => ({
      ...prev,
      financialRecords: [record, ...prev.financialRecords],
    }))
  }

  const updateSkill = (skill: keyof Skills, amount: number) => {
    setGameState((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: Math.min(prev.skills[skill] + amount, 100),
      },
    }))
  }

  const spendPracticePoints = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      practicePoints: Math.max(prev.practicePoints - amount, 0),
    }))
  }

  const spendMarketingPoints = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      marketingPoints: Math.max(prev.marketingPoints - amount, 0),
    }))
  }

  const spendTimeSlots = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      timeSlots: Math.max(prev.timeSlots - amount, 0),
    }))
  }

  const spendEnergy = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      energy: Math.max(prev.energy - amount, 0),
    }))
  }

  const addEarnings = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      earnings: prev.earnings + amount,
      weeklyEarnings: prev.weeklyEarnings + amount,
    }))

    // Add financial record
    if (amount > 0) {
      addFinancialRecord("income", "Other", amount, "Earnings added")
    } else {
      addFinancialRecord("expense", "Other", Math.abs(amount), "Expense deducted")
    }
  }

  const addFans = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      fans: prev.fans + amount,
    }))
  }

  const updateMorale = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      spiritualMorale: Math.max(0, Math.min(100, prev.spiritualMorale + amount)),
    }))
  }

  const uploadSong = (songData: Omit<Song, "id" | "uploadDate" | "streams" | "uploadedPlatforms">) => {
    // Select random artwork
    const randomArtwork = songArtworks[Math.floor(Math.random() * songArtworks.length)]

    const newSong: Song = {
      ...songData,
      id: Date.now().toString(),
      uploadDate: new Date(),
      streams: {},
      uploadedPlatforms: [],
      artwork: randomArtwork,
    }

    setGameState((prev) => ({
      ...prev,
      songs: [...prev.songs, newSong],
    }))
  }

  const purchaseItem = (itemId: string): boolean => {
    const item = gameState.marketplaceItems.find((i) => i.id === itemId)
    if (!item || item.owned || gameState.earnings < item.price) {
      return false
    }

    setGameState((prev) => ({
      ...prev,
      earnings: prev.earnings - item.price,
      marketplaceItems: prev.marketplaceItems.map((i) => (i.id === itemId ? { ...i, owned: true } : i)),
    }))

    addFinancialRecord("expense", "Marketplace", item.price, `Purchased ${item.name}`)
    return true
  }

  const createSocialPost = (platformId: string, content: string, type: string) => {
    const platform = gameState.socialPlatforms.find((p) => p.id === platformId)
    if (!platform) return

    // Calculate total streams for impact
    const totalStreams = gameState.songs.reduce((total, song) => {
      return total + Object.values(song.streams).reduce((songTotal, streams) => songTotal + streams, 0)
    }, 0)

    // Calculate total social followers
    const totalSocialFollowers = gameState.socialPlatforms.reduce((total, p) => total + p.followers, 0)

    // Calculate post engagement based on current followers
    let baseLikes, baseShares
    if (platform.followers === 0) {
      baseLikes = Math.floor(Math.random() * 5) + 1 // 1-5 likes
      baseShares = Math.floor(Math.random() * 2) + 1 // 1-2 shares
    } else if (platform.followers <= 5) {
      baseLikes = Math.floor(Math.random() * 11) + 10 // 10-20 likes
      baseShares = Math.floor(Math.random() * 3) + 2 // 2-4 shares
    } else if (platform.followers <= 50) {
      baseLikes = Math.floor(Math.random() * 21) + 20 // 20-40 likes
      baseShares = Math.floor(Math.random() * 5) + 3 // 3-7 shares
    } else if (platform.followers <= 500) {
      baseLikes = Math.floor(Math.random() * 51) + 50 // 50-100 likes
      baseShares = Math.floor(Math.random() * 10) + 5 // 5-14 shares
    } else {
      baseLikes = Math.floor(Math.random() * 101) + 100 // 100-200 likes
      baseShares = Math.floor(Math.random() * 21) + 10 // 10-30 shares
    }

    const newPost: SocialPost = {
      id: Date.now().toString(),
      platform: platformId,
      content,
      type,
      timestamp: new Date(),
      likes: baseLikes,
      shares: baseShares,
    }

    // Enhanced follower growth algorithm
    const impactFactors = {
      streams: Math.min(totalStreams / 1000, 50), // Max 50 bonus from streams
      morale: gameState.spiritualMorale / 10, // Max 10 bonus from morale
      avgSkill: Object.values(gameState.skills).reduce((sum, skill) => sum + skill, 0) / 60, // Max 10 bonus from skills
      fans: Math.min(gameState.fans / 100, 20), // Max 20 bonus from fans
      influence: platform.influence / 10, // Max 10 bonus from influence
      postQuality: type === "song_promo" ? 3 : type === "behind_scenes" ? 2 : 1,
    }

    const totalImpact = Object.values(impactFactors).reduce((sum, factor) => sum + factor, 0)

    // Base growth with impact multiplier
    let followerGrowth
    if (totalImpact < 5) {
      followerGrowth = Math.floor(Math.random() * 3) + 1 // 1-3 followers
    } else if (totalImpact < 15) {
      followerGrowth = Math.floor(Math.random() * 8) + 3 // 3-10 followers
    } else if (totalImpact < 30) {
      followerGrowth = Math.floor(Math.random() * 15) + 8 // 8-22 followers
    } else if (totalImpact < 50) {
      followerGrowth = Math.floor(Math.random() * 25) + 15 // 15-39 followers
    } else if (totalImpact < 80) {
      followerGrowth = Math.floor(Math.random() * 51) + 50 // 50-100 followers
    } else {
      followerGrowth = Math.floor(Math.random() * 201) + 100 // 100-300 followers
    }

    // Viral chance for very high impact
    if (totalImpact > 70 && Math.random() < 0.1) {
      followerGrowth *= 10 // Viral post!
      newPost.likes *= 5
      newPost.shares *= 3
    }

    const engagementIncrease = Math.random() * 0.2 // 0-0.2% increase
    const influenceIncrease = Math.floor(followerGrowth / 10) // Influence grows slower

    setGameState((prev) => ({
      ...prev,
      socialPlatforms: prev.socialPlatforms.map((p) =>
        p.id === platformId
          ? {
              ...p,
              posts: [newPost, ...p.posts.slice(0, 9)],
              followers: p.followers + followerGrowth,
              engagement: Math.min(p.engagement + engagementIncrease, 100),
              influence: p.influence + influenceIncrease,
            }
          : p,
      ),
    }))

    spendMarketingPoints(1)
  }

  const startSideHustle = (hustleId: string): boolean => {
    const hustle = gameState.sideHustles.find((h) => h.id === hustleId)
    if (!hustle || hustle.active || gameState.timeSlots < hustle.timeSlots || gameState.energy < hustle.energyCost) {
      return false
    }

    setGameState((prev) => ({
      ...prev,
      sideHustles: prev.sideHustles.map((h) => (h.id === hustleId ? { ...h, active: true } : h)),
      timeSlots: prev.timeSlots - hustle.timeSlots,
      energy: prev.energy - hustle.energyCost,
    }))

    return true
  }

  const quitSideHustle = (hustleId: string): boolean => {
    const hustle = gameState.sideHustles.find((h) => h.id === hustleId)
    if (!hustle || !hustle.active) {
      return false
    }

    setGameState((prev) => ({
      ...prev,
      sideHustles: prev.sideHustles.map((h) => (h.id === hustleId ? { ...h, active: false } : h)),
      timeSlots: prev.timeSlots + hustle.timeSlots,
    }))

    return true
  }

  const buyTradeItem = (itemId: string, quantity: number): boolean => {
    const item = gameState.tradeItems.find((i) => i.id === itemId)
    if (!item) return false

    const totalCost = item.currentPrice * quantity
    if (gameState.earnings < totalCost) return false

    setGameState((prev) => ({
      ...prev,
      earnings: prev.earnings - totalCost,
      tradeItems: prev.tradeItems.map((i) =>
        i.id === itemId
          ? {
              ...i,
              owned: i.owned + quantity,
              buyPrice: i.owned === 0 ? item.currentPrice : (i.buyPrice! * i.owned + totalCost) / (i.owned + quantity),
            }
          : i,
      ),
    }))

    addFinancialRecord("expense", "Trading", totalCost, `Bought ${quantity}x ${item.name}`)
    return true
  }

  const sellTradeItem = (itemId: string, quantity: number): boolean => {
    const item = gameState.tradeItems.find((i) => i.id === itemId)
    if (!item || item.owned < quantity) return false

    const totalEarnings = item.currentPrice * quantity

    setGameState((prev) => ({
      ...prev,
      earnings: prev.earnings + totalEarnings,
      tradeItems: prev.tradeItems.map((i) => (i.id === itemId ? { ...i, owned: i.owned - quantity } : i)),
    }))

    addFinancialRecord("income", "Trading", totalEarnings, `Sold ${quantity}x ${item.name}`)
    return true
  }

  const signWithLabel = (labelName: string) => {
    setGameState((prev) => ({
      ...prev,
      recordLabel: labelName,
    }))
  }

  const resetGame = () => {
    setGameState(initialGameState)
    setShowTitheModal(false)
  }

  const respondToMessage = (messageId: string, accept: boolean) => {
    const message = gameState.chatMessages.find((m) => m.id === messageId)
    if (!message || message.responded) return

    setGameState((prev) => ({
      ...prev,
      chatMessages: prev.chatMessages.map((m) => (m.id === messageId ? { ...m, responded: true } : m)),
    }))

    if (accept && message.offer) {
      if (message.type === "collaboration" || message.type === "feature") {
        addEarnings(message.offer.amount)
        addFinancialRecord("income", "Collaborations", message.offer.amount, `${message.type} with ${message.from}`)
      } else if (message.type === "label_contract") {
        signWithLabel(message.from)
      }
    }
  }

  const nextWeek = () => {
    // Process side hustles - only active ones continue
    const activeHustles = gameState.sideHustles.filter((h) => h.active)
    let weeklyHustleEarnings = 0

    activeHustles.forEach((hustle) => {
      const earnings = Math.floor(Math.random() * (hustle.weeklyPay.max - hustle.weeklyPay.min) + hustle.weeklyPay.min)
      weeklyHustleEarnings += earnings

      if (hustle.skillGain) {
        updateSkill(hustle.skillGain.skill, hustle.skillGain.amount)
      }
    })

    // Calculate streaming revenue based on player activity
    let streamingEarnings = 0
    const platformRates = {
      SoundVibe: 0.1,
      Amaplay: 0.02,
      TuneJam: 0.5,
      StreamTunes: 2.0,
      BeatFlow: 0.25,
      Hypefy: 3.0,
      ChartTopper: 4.0,
      CoreBeats: 5.0,
    }

    // Calculate player activity score
    const totalSocialFollowers = gameState.socialPlatforms.reduce((total, platform) => total + platform.followers, 0)
    const avgSkill = Object.values(gameState.skills).reduce((sum, skill) => sum + skill, 0) / 6
    const activityScore = Math.min(
      1 + (totalSocialFollowers / 10000) * 0.5 + (avgSkill / 100) * 0.3 + (gameState.spiritualMorale / 100) * 0.2,
      3,
    )

    let totalNewStreams = 0
    const updatedSongs = gameState.songs.map((song) => {
      const updatedSong = { ...song }
      song.uploadedPlatforms.forEach((platform) => {
        // Base streams depend on production cost and activity
        let baseStreams = 0
        if (song.productionCost > 0) {
          baseStreams = Math.floor(Math.random() * 100 * song.qualityMultiplier * activityScore)
        } else {
          // Free style songs only get streams from social media and skills
          baseStreams = Math.floor(Math.random() * 20 * activityScore)
        }

        const newStreams = Math.max(0, baseStreams + (song.streams[platform] || 0) * 0.1)
        totalNewStreams += newStreams

        const rate = platformRates[platform as keyof typeof platformRates] || 0.1
        const earnings = newStreams * rate
        streamingEarnings += earnings

        // Update song streams
        updatedSong.streams[platform] = (song.streams[platform] || 0) + newStreams
      })
      return updatedSong
    })

    // Calculate total streams for fan growth
    const totalStreams = updatedSongs.reduce((total, song) => {
      return total + Object.values(song.streams).reduce((songTotal, streams) => songTotal + streams, 0)
    }, 0)

    // Fan growth based on streams and other factors
    let fanGrowth = 0
    if (totalStreams >= 700) {
      const streamFactor = Math.min(totalStreams / 10000, 50) // Max 50 from streams
      const influenceFactor = gameState.socialPlatforms.reduce((total, p) => total + p.influence, 0) / 10 // Max varies
      const skillFactor = avgSkill / 10 // Max 10 from skills
      const followerFactor = totalSocialFollowers / 100 // Max varies
      const moraleFactor = gameState.spiritualMorale / 10 // Max 10 from morale

      fanGrowth = Math.floor(streamFactor + influenceFactor + skillFactor + followerFactor + moraleFactor)
      fanGrowth = Math.max(1, fanGrowth) // At least 1 fan if above 700 streams
    }

    // Update trade item prices
    const updatedTradeItems = gameState.tradeItems.map((item) => {
      const change = (Math.random() - 0.5) * 2 * item.volatility
      const newPrice = Math.max(1, item.currentPrice * (1 + change))
      return {
        ...item,
        currentPrice: newPrice,
        priceHistory: [...item.priceHistory.slice(-6), newPrice],
      }
    })

    // Calculate expenses
    const totalExpenses = gameState.expenses.rent + gameState.expenses.food + gameState.expenses.transportation

    // Calculate taxes
    const possessionTax =
      gameState.marketplaceItems.filter((item) => item.owned).reduce((total, item) => total + item.price, 0) * 0.09

    const earningsTax = weeklyHustleEarnings * 0.07
    const totalTaxes = possessionTax + earningsTax

    // Generate ChatIt messages based on street knowledge
    if (Math.random() < gameState.skills.streetKnowledge / 100) {
      generateChatMessage()
    }

    // Apply all updates at once
    setGameState((prev) => ({
      ...prev,
      week: prev.week + 1,
      practicePoints: 100, // Reset to 100 every week
      marketingPoints: 5, // Reset to 5 every week
      energy: 10,
      earnings: prev.earnings + weeklyHustleEarnings + streamingEarnings - totalExpenses - totalTaxes,
      weeklyEarnings: weeklyHustleEarnings + streamingEarnings,
      weeklyTaxes: totalTaxes,
      fans: prev.fans + fanGrowth,
      tradeItems: updatedTradeItems,
      songs: updatedSongs,
      timeSlots: 7 - activeHustles.reduce((total, hustle) => total + hustle.timeSlots, 0),
    }))

    // Add financial records
    if (weeklyHustleEarnings > 0) {
      addFinancialRecord("income", "Side Hustles", weeklyHustleEarnings, "Weekly side hustle earnings")
    }
    if (streamingEarnings > 0) {
      addFinancialRecord("income", "Streaming", streamingEarnings, "Weekly streaming revenue")
    }
    if (totalExpenses > 0) {
      addFinancialRecord("expense", "Living", totalExpenses, "Weekly living expenses")
    }
    if (totalTaxes > 0) {
      addFinancialRecord("expense", "Taxes", totalTaxes, "Weekly taxes (possessions + earnings)")
    }

    if (weeklyHustleEarnings + streamingEarnings > 0) {
      setShowTitheModal(true)
    }
  }

  const generateChatMessage = () => {
    const messageTypes = ["collaboration", "feature", "label_contract"]
    const type = messageTypes[Math.floor(Math.random() * messageTypes.length)]

    const collaborators = ["MC Flow", "DJ Beats", "Singer Sarah", "Producer Mike"]
    const labels = ["Wise Record", "Sound Tunes", "Vibe On"]

    let from, message, offer

    switch (type) {
      case "collaboration":
        from = collaborators[Math.floor(Math.random() * collaborators.length)]
        offer = { amount: Math.floor(Math.random() * 5000) + 1000, details: "50/50 split on new track" }
        message = `Hey! I love your music style. Want to collaborate on a new track? I can offer $${offer.amount} upfront. Let me know!`
        break
      case "feature":
        from = collaborators[Math.floor(Math.random() * collaborators.length)]
        offer = { amount: Math.floor(Math.random() * 3000) + 500, details: "Feature on upcoming single" }
        message = `Your voice would be perfect for my new single! I can pay $${offer.amount} for a feature. Interested?`
        break
      case "label_contract":
        from = labels[Math.floor(Math.random() * labels.length)]
        offer = { amount: 0, details: "Record label contract" }
        message = `We've been following your career and we're impressed! ${from} would like to offer you a record deal. Are you ready to take your career to the next level?`
        break
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: type as "collaboration" | "feature" | "label_contract",
      from,
      message,
      offer,
      timestamp: new Date(),
      responded: false,
    }

    setGameState((prev) => ({
      ...prev,
      chatMessages: [newMessage, ...prev.chatMessages.slice(0, 9)],
    }))
  }

  const uploadSongToPlatform = (songId: string, platformId: string) => {
    setGameState((prev) => ({
      ...prev,
      songs: prev.songs.map((song) =>
        song.id === songId
          ? {
              ...song,
              uploadedPlatforms: [...song.uploadedPlatforms, platformId],
              streams: { ...song.streams, [platformId]: 0 },
            }
          : song,
      ),
    }))
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        updateSkill,
        spendPracticePoints,
        spendMarketingPoints,
        spendTimeSlots,
        spendEnergy,
        addEarnings,
        addFans,
        updateMorale,
        uploadSong,
        purchaseItem,
        createSocialPost,
        startSideHustle,
        quitSideHustle,
        buyTradeItem,
        sellTradeItem,
        nextWeek,
        showTitheModal,
        setShowTitheModal,
        uploadSongToPlatform,
        addFinancialRecord,
        signWithLabel,
        resetGame,
        respondToMessage,
        unreadMessages,
        getCareerStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
