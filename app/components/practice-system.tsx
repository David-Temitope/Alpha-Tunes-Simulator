"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
})

interface PracticeSystemProps {
  gameState: any
  setGameState: Function
  uploadSong: Function
}

export default function PracticeSystem({ gameState, setGameState, uploadSong }: PracticeSystemProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [songTitle, setSongTitle] = useState("")
  const [songGenre, setSongGenre] = useState("")
  const [songDuration, setSongDuration] = useState(180)
  const [productionCost, setProductionCost] = useState(500)

  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  const handleCreateSong = () => {
    if (songTitle && songGenre && gameState.earnings >= productionCost) {
      const qualityMultiplier = productionCost / 1000 // $1000 = 1x, $10000 = 10x

      uploadSong({
        title: songTitle,
        genre: songGenre,
        duration: songDuration,
        artwork: "/placeholder.svg?height=100&width=100",
        rating: Math.min(10, Math.floor(Math.random() * 5) + 3 + qualityMultiplier * 0.5),
        productionCost,
        qualityMultiplier,
      })

      // Deduct production cost
      setGameState((prev) => ({
        ...prev,
        earnings: prev.earnings - productionCost,
      }))

      setSongTitle("")
      setSongGenre("")
      setSongDuration(180)
      setProductionCost(500)
      setShowCreateDialog(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <p>Earnings: ${gameState.earnings.toLocaleString()}</p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Create Song</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new song</AlertDialogTitle>
            <AlertDialogDescription>Set the title, genre, and duration of your new song.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                value={songTitle}
                className="col-span-3"
                onChange={(e) => setSongTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Genre
              </Label>
              <Input
                id="username"
                value={songGenre}
                className="col-span-3"
                onChange={(e) => setSongGenre(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Slider
                id="duration"
                defaultValue={[180]}
                max={600}
                min={60}
                step={30}
                className="col-span-3"
                onValueChange={(value) => setSongDuration(value[0])}
              />
              <p className="col-span-4 text-xs opacity-60 mt-1">{songDuration} seconds</p>
            </div>
            <div>
              <Label htmlFor="productionCost">Production Budget</Label>
              <Select
                value={productionCost.toString()}
                onValueChange={(value) => setProductionCost(Number.parseInt(value))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">$500 - Basic Quality</SelectItem>
                  <SelectItem value="1500">$1,500 - Good Quality</SelectItem>
                  <SelectItem value="3000">$3,000 - High Quality</SelectItem>
                  <SelectItem value="5000">$5,000 - Premium Quality</SelectItem>
                  <SelectItem value="10000">$10,000 - Studio Quality</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs opacity-60 mt-1">Higher budget = better streaming performance</p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={handleCreateSong}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500"
              disabled={!songTitle || !songGenre || gameState.earnings < productionCost}
            >
              Create Song (${productionCost.toLocaleString()})
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
