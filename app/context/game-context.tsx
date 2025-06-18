"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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

interface GameState {
  artist: Artist
  skills: Skills
  songs: Song[]
  socialPlatforms: SocialPlatform[]
  marketplaceItems: MarketplaceItem[]
  sideHustles: SideHustle[]
  tradeItems: TradeItem[]
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
  buyTradeItem: (itemId: string, quantity: number) => boolean
  sellTradeItem: (itemId: string, quantity: number) => boolean
  nextWeek: () => void
  showTitheModal: boolean
  setShowTitheModal: (show: boolean) => void
  uploadSongToPlatform: (songId: string, platformId: string) => void
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
  // Instruments
  {
    id: "guitar-basic",
    name: "Acoustic Guitar",
    category: "instrument",
    price: 500,
    description: "Basic acoustic guitar for songwriting",
    image: "/placeholder.svg?height=100&width=100",
    effect: "+2 Writing skill boost",
    owned: false,
  },
  {
    id: "mic-pro",
    name: "Professional Microphone",
    category: "instrument",
    price: 1200,
    description: "High-quality studio microphone",
    image: "/placeholder.svg?height=100&width=100",
    effect: "+3 Voice skill boost",
    owned: false,
  },
  {
    id: "keyboard-midi",
    name: "MIDI Keyboard",
    category: "instrument",
    price: 800,
    description: "Professional MIDI controller",
    image: "/placeholder.svg?height=100&width=100",
    effect: "+2 Production skill boost",
    owned: false,
  },

  // Properties
  {
    id: "apartment-studio",
    name: "Studio Apartment",
    category: "property",
    price: 50000,
    description: "Small apartment with basic studio setup",
    image: "/placeholder.svg?height=100&width=100",
    effect: "+10% practice efficiency",
    owned: false,
  },
  {
    id: "house-suburban",
    name: "Suburban House",
    category: "property",
    price: 150000,
    description: "Spacious house with dedicated music room",
    image: "/placeholder.svg?height=100&width=100",
    effect: "+20% practice efficiency",
    owned: false,
  },

  // Vehicles
  {
    id: "car-sedan",
    name: "Sedan Car",
    category: "vehicle",
    price: 25000,
    description: "Reliable transportation for gigs",
    image: "/placeholder.svg?height=100&width=100",
    effect: "+5% tour earnings",
    owned: false,
  },
  {
    id: "car-luxury",
    name: "Luxury Sports Car",
    category: "vehicle",
    price: 100000,
    description: "High-end sports car for style",
    image: "/placeholder.svg?height=100&width=100",
    effect: "+15% fan attraction",
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
  practicePoints: 100,
  marketingPoints: 5,
  timeSlots: 7,
  energy: 10,
  earnings: 0, // Starting money for demo
  weeklyEarnings: 0,
  fans: 0,
  spiritualMorale: 0,
  week: 1,
  unlockedPlatforms: ["SoundVibe", "Amaplay"],
  expenses: {
    rent: 800,
    food: 50,
    transportation: 100,
  },
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [showTitheModal, setShowTitheModal] = useState(false)

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
    const newSong: Song = {
      ...songData,
      id: Date.now().toString(),
      uploadDate: new Date(),
      streams: {},
      uploadedPlatforms: [],
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

    return true
  }

  const createSocialPost = (platformId: string, content: string, type: string) => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      platform: platformId,
      content,
      type,
      timestamp: new Date(),
      likes: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 20),
    }

    setGameState((prev) => ({
      ...prev,
      socialPlatforms: prev.socialPlatforms.map((platform) =>
        platform.id === platformId ? { ...platform, posts: [newPost, ...platform.posts.slice(0, 9)] } : platform,
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

    return true
  }

  const nextWeek = () => {
    // Process side hustles
    const activeHustles = gameState.sideHustles.filter((h) => h.active)
    let weeklyHustleEarnings = 0

    activeHustles.forEach((hustle) => {
      const earnings = Math.floor(Math.random() * (hustle.weeklyPay.max - hustle.weeklyPay.min) + hustle.weeklyPay.min)
      weeklyHustleEarnings += earnings

      if (hustle.skillGain) {
        updateSkill(hustle.skillGain.skill, hustle.skillGain.amount)
      }
    })

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

    setGameState((prev) => ({
      ...prev,
      week: prev.week + 1,
      practicePoints: 100,
      marketingPoints: 5,
      timeSlots: 7,
      energy: 10,
      earnings: prev.earnings + weeklyHustleEarnings - totalExpenses,
      weeklyEarnings: weeklyHustleEarnings,
      sideHustles: prev.sideHustles.map((h) => ({ ...h, active: false })),
      tradeItems: updatedTradeItems,
    }))

    if (gameState.weeklyEarnings > 0) {
      setShowTitheModal(true)
    }
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
        buyTradeItem,
        sellTradeItem,
        nextWeek,
        showTitheModal,
        setShowTitheModal,
        uploadSongToPlatform,
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
