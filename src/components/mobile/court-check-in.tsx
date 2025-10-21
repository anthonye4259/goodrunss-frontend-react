"use client"

import { useState, useRef } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Camera, MapPin, Users, TrendingUp, Baby, Trophy, ChevronDown, ChevronUp, X, Check } from 'lucide-react'
import Image from "next/image"

export function CourtCheckIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courtName = searchParams.get("court") || "Riverside Basketball Courts"
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<"camera" | "details" | "success">("camera")
  const [photo, setPhoto] = useState<string | null>(null)
  const [traffic, setTraffic] = useState([50])
  const [shareToFeed, setShareToFeed] = useState(true)
  const [expandedSections, setExpandedSections] = useState({
    players: false,
    skill: false,
    ages: false,
    runss: false,
  })

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([])
  const [selectedSkill, setSelectedSkill] = useState<string[]>([])
  const [selectedAges, setSelectedAges] = useState<string[]>([])
  const [selectedRunss, setSelectedRunss] = useState<string[]>([])

  const playerOptions = ["Solo", "2-4 players", "5-8 players", "9+ players", "Full court game"]
  const skillOptions = ["Beginner", "Intermediate", "Advanced", "Pro", "Mixed levels"]
  const ageOptions = ["Kids (5-12)", "Teens (13-17)", "Adults (18-35)", "Adults (36-50)", "50+"]
  const runssOptions = ["Pickup game", "Practice", "Tournament", "Training session", "Just shooting around"]

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
        setStep("details")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const toggleSelection = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item))
    } else {
      setSelected([...selected, item])
    }
  }

  const handleCheckIn = () => {
    setStep("success")
    setTimeout(() => {
      router.push("/mobile/player")
    }, 2000)
  }

  const getTrafficLabel = () => {
    const value = traffic[0]
    if (value < 25) return "Empty"
    if (value < 50) return "Light"
    if (value < 75) return "Moderate"
    return "Busy"
  }

  const getTrafficColor = () => {
    const value = traffic[0]
    if (value < 25) return "text-green-500"
    if (value < 50) return "text-yellow-500"
    if (value < 75) return "text-orange-500"
    return "text-red-500"
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center p-4">
        <Card className="glass-card border-2 border-primary-foreground/30 p-8 text-center max-w-md w-full glow-primary">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-foreground/20 rounded-full">
              <Check className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-2">Checked In!</h2>
          <p className="text-primary-foreground/80 text-lg">
            You're all set at {courtName}. Have a great game!
          </p>
          <div className="mt-6">
            <Image
              src="/goodrunss-logo.png"
              alt="GoodRunss"
              width={120}
              height={40}
              className="mx-auto opacity-80"
            />
          </div>
        </Card>
      </div>
    )
  }

  if (step === "camera") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 glass-card border-b border-border/50">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-bold">Check In</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Camera View */}
        <div className="p-4 space-y-4">
          <Card className="glass-card border-primary/30 p-6">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="h-5 w-5 text-primary mt-1" />
              <div>
                <h2 className="font-bold text-lg">{courtName}</h2>
                <p className="text-sm text-muted-foreground">0.5 miles away</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Take a photo of the court to complete your check-in
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                className="hidden"
              />

              <Button
                size="lg"
                onClick={handleCameraClick}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
              >
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep("details")}
                className="w-full glass-card"
              >
                Skip Photo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 glass-card border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => setStep("camera")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold">Check-In Details</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Photo Preview */}
        {photo && (
          <Card className="glass-card border-primary/30 overflow-hidden">
            <div className="relative aspect-video">
              <Image src={photo || "/placeholder.svg"} alt="Court photo" fill className="object-cover" />
              <Button
                size="icon"
                variant="destructive"
                onClick={() => setPhoto(null)}
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Court Info */}
        <Card className="glass-card border-primary/30 p-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <h2 className="font-bold text-lg">{courtName}</h2>
              <p className="text-sm text-muted-foreground">0.5 miles away</p>
            </div>
          </div>
        </Card>

        {/* Traffic Slider */}
        <Card className="glass-card border-primary/30 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <Label className="font-semibold">Court Traffic</Label>
            </div>
            <Badge variant="outline" className={`${getTrafficColor()} border-current`}>
              {getTrafficLabel()}
            </Badge>
          </div>
          <Slider value={traffic} onValueChange={setTraffic} max={100} step={1} className="w-full" />
        </Card>

        {/* Players */}
        <Card className="glass-card border-primary/30 p-4">
          <button
            onClick={() => toggleSection("players")}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <Label className="font-semibold cursor-pointer">Who's Playing?</Label>
              {selectedPlayers.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedPlayers.length}
                </Badge>
              )}
            </div>
            {expandedSections.players ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.players && (
            <div className="mt-4 flex flex-wrap gap-2">
              {playerOptions.map((option) => (
                <Badge
                  key={option}
                  variant={selectedPlayers.includes(option) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(option, selectedPlayers, setSelectedPlayers)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          )}
        </Card>

        {/* Skill Level */}
        <Card className="glass-card border-primary/30 p-4">
          <button onClick={() => toggleSection("skill")} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <Label className="font-semibold cursor-pointer">Skill Level</Label>
              {selectedSkill.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedSkill.length}
                </Badge>
              )}
            </div>
            {expandedSections.skill ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.skill && (
            <div className="mt-4 flex flex-wrap gap-2">
              {skillOptions.map((option) => (
                <Badge
                  key={option}
                  variant={selectedSkill.includes(option) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(option, selectedSkill, setSelectedSkill)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          )}
        </Card>

        {/* Age Groups */}
        <Card className="glass-card border-primary/30 p-4">
          <button onClick={() => toggleSection("ages")} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Baby className="h-5 w-5 text-primary" />
              <Label className="font-semibold cursor-pointer">Age Groups</Label>
              {selectedAges.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedAges.length}
                </Badge>
              )}
            </div>
            {expandedSections.ages ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.ages && (
            <div className="mt-4 flex flex-wrap gap-2">
              {ageOptions.map((option) => (
                <Badge
                  key={option}
                  variant={selectedAges.includes(option) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(option, selectedAges, setSelectedAges)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          )}
        </Card>

        {/* Type of Runss */}
        <Card className="glass-card border-primary/30 p-4">
          <button onClick={() => toggleSection("runss")} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <Label className="font-semibold cursor-pointer">Type of Runss</Label>
              {selectedRunss.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedRunss.length}
                </Badge>
              )}
            </div>
            {expandedSections.runss ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {expandedSections.runss && (
            <div className="mt-4 flex flex-wrap gap-2">
              {runssOptions.map((option) => (
                <Badge
                  key={option}
                  variant={selectedRunss.includes(option) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleSelection(option, selectedRunss, setSelectedRunss)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          )}
        </Card>

        {/* Share to Feed */}
        <Card className="glass-card border-primary/30 p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="share-feed" className="font-semibold cursor-pointer">
              Share to Activity Feed
            </Label>
            <Switch id="share-feed" checked={shareToFeed} onCheckedChange={setShareToFeed} />
          </div>
        </Card>

        {/* Check In Button */}
        <Button
          size="lg"
          onClick={handleCheckIn}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
        >
          Complete Check-In
        </Button>
      </div>
    </div>
  )
}

