"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useGameState } from "../context/game-state-context"
import { useGame } from "../context/game-context"

const formSchema = z.object({
  originalName: z.string().min(2, {
    message: "Original Name must be at least 2 characters.",
  }),
  stageName: z.string().min(2, {
    message: "Stage Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  genre: z.string().min(1, {
    message: "Please select a genre.",
  }),
})

const ArtistCreationForm = () => {
  const router = useRouter()
  const { setGameState } = useGameState()
  const { translation, setLanguage, gameState, requestStoragePermission } = useGame()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalName: "",
      stageName: "",
      email: "",
      genre: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const storageGranted = await requestStoragePermission()
    if (!storageGranted) {
      alert("Storage permission is required to save your game progress.")
      return
    }

    setGameState({
      artist: {
        originalName: values.originalName,
        stageName: values.stageName,
        email: values.email,
        genre: values.genre,
      },
    })
    router.push("/studio")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translation.createArtist || "Create Your Artist"}</CardTitle>
        <CardDescription>Enter your artist details to start your music career.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="language">{translation.selectLanguage || "Select Language"}</Label>
              <Select value={gameState.language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormField
              control={form.control}
              name="originalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translation.originalName || "Original Name"}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your original name" {...field} />
                  </FormControl>
                  <FormDescription>This is the name you were given at birth.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translation.stageName || "Stage Name"}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your stage name" {...field} />
                  </FormControl>
                  <FormDescription>This is the name you will use on stage.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translation.email || "Email"}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription>We will use this to contact you about your music career.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translation.genre || "Genre"}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translation.selectGenre || "Select Genre"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>What type of music do you make?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{translation.createMyArtist || "Create My Artist"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ArtistCreationForm

import { Label } from "@/components/ui/label"
