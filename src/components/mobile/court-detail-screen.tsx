"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, MapPin, Navigation, Phone, Clock, Users, Wifi, Zap, Droplets, Sun, Moon, Share2, Heart, Camera, TrendingUp } from 'lucide-react'
import { SocialShareButtons } from "../social-share-buttons"
import Image from "next/image"

export function CourtDetailScreen() {
  const router = useRouter()
  const [showShare, setShowShare] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const court = {
    id: "1",
    name: "Riverside Basketball Courts",
    sport: "Basketball",
    rating: 4.7,
    reviewCount: 89,
    location: "456 River St, Brooklyn, NY",
    distance: "0.5 miles",
    image: "/placeholder.svg?height=400&width=600",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    description: "Premium outdoor basketball courts with professional-grade surfaces. Features include LED lighting for night play, covered seating areas, and water fountains. Popular spot for pickup games and tournaments.",
    amenities: [
      { icon: Zap, label: "LED Lighting", available: true },
      { icon: Droplets, label: "Water Fountain", available: true },
      { icon: Wifi, label: "Free WiFi", available: false },
      { icon: Users, label: "Seating Area", available: true },
      { icon: Sun, label: "Covered Area", available: true },
      { icon: Moon, label: "Night Access", available: true },
    ],
    hours: {
      weekday: "6:00 AM - 10:00 PM",
      weekend: "7:00 AM - 9:00 PM",
    },
    currentTraffic: "Moderate",
    trafficLevel: 60,
    recentCheckIns: [
      {
        user: "Alex Chen",
        time: "15 min ago",
        avatar: "/placeholder.svg?height=100&width=100",
        activity: "Pickup game - 8 players",
      },
      {
        user: "Jordan Smith",
        time: "1 hour ago",
        avatar: "/placeholder.svg?height=100&width=100",
        activity: "Practice session",
      },
      {
        user: "Taylor Brown",
        time: "2 hours ago",
        avatar: "/placeholder.svg?height=100&width=100",
        activity: "Shooting drills",
      },
    ],
    reviews: [
      {
        name: "Mike Johnson",
        rating: 5,
        date: "1 week ago",
        comment: "Best outdoor courts in Brooklyn! Great surface and lighting.",
      },
      {
        name: "Sarah Lee",
        rating: 4,
        date: "2 weeks ago",
        comment: "Love this spot. Can get crowded on weekends though.",
      },
    ],
  }

  const handleCheckIn = () => {
    router.push(`/mobile/check-in?court=${encodeURIComponent(court.name)}`)
  }

  const handleGetDirections = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(court.location)}`, "_blank")
  }

  const getTrafficColor = () => {
    if (court.trafficLevel < 30) return "text-green-500"
    if (court.trafficLevel < 70) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="glass-card border-b border-border/50 p-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg">Court Details</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowShare(true)}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6 pb-24">
        <Card className="glass-card border-2 border-primary/30 overflow-hidden glow-primary">
          <div className="relative aspect-video">
            <Image src={court.image || "/placeholder.svg"} alt={court.name} fill className="object-cover" />
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent">
              {court.sport}
            </Badge>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold gradient-text mb-2">{court.name}</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold">{court.rating}</span>
                <span className="text-xs text-muted-foreground">({court.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{court.distance}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{court.location}</p>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            onClick={handleCheckIn}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
          >
            <Camera className="h-4 w-4 mr-2" />
            Check In
          </Button>
          <Button size="lg" variant="outline" onClick={handleGetDirections} className="glass-card hover:border-primary/50">
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </Button>
        </div>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Current Traffic
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Activity Level</span>
            <Badge variant="outline" className={`${getTrafficColor()} border-current`}>
              {court.currentTraffic}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                court.trafficLevel < 30
                  ? "bg-green-500"
                  : court.trafficLevel < 70
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${court.trafficLevel}%` }}
            />
          </div>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-4">About</h3>
          <p className="text-muted-foreground leading-relaxed">{court.description}</p>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-4">Amenities</h3>
          <div className="grid grid-cols-2 gap-4">
            {court.amenities.map((amenity) => (
              <div
                key={amenity.label}
                className={`flex items-center gap-2 ${amenity.available ? "" : "opacity-50"}`}
              >
                <amenity.icon className={`h-4 w-4 ${amenity.available ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm">{amenity.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Hours
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monday - Friday</span>
              <span className="font-semibold">{court.hours.weekday}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Saturday - Sunday</span>
              <span className="font-semibold">{court.hours.weekend}</span>
            </div>
          </div>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recent Check-Ins
          </h3>
          <div className="space-y-4">
            {court.recentCheckIns.map((checkIn, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={checkIn.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{checkIn.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{checkIn.user}</p>
                  <p className="text-xs text-muted-foreground">{checkIn.time}</p>
                  <p className="text-sm mt-1">{checkIn.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Reviews ({court.reviewCount})
          </h3>
          <div className="space-y-4">
            {court.reviews.map((review, index) => (
              <div key={index} className="border-b border-border/50 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setShowShare(false)} />
          <Card className="relative glass-card border-2 border-primary/30 p-6 max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">Share Court</h3>
            <SocialShareButtons
              text={`Check out ${court.name} on GoodRunss! ${court.rating}⭐ rated ${court.sport} court.`}
              size="md"
            />
            <Button variant="outline" onClick={() => setShowShare(false)} className="w-full mt-4">
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}

