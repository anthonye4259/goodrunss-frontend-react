"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, MapPin, DollarSign, Calendar, Package, Shield, TrendingUp, Share2, Heart, MessageCircle, ShoppingCart } from 'lucide-react'
import { MarketplaceCheckoutModal } from "./marketplace-checkout-modal"
import { SocialShareButtons } from "../social-share-buttons"
import Image from "next/image"

export function MarketplaceItemDetailScreen() {
  const router = useRouter()
  const [showCheckout, setShowCheckout] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const item = {
    id: "1",
    title: "Nike Air Jordan 1 Retro High",
    price: 180,
    condition: "Like New",
    category: "Shoes",
    size: "US 10.5",
    brand: "Nike",
    listingType: "sale" as const,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    description: "Authentic Nike Air Jordan 1 Retro High in excellent condition. Worn only a few times, no major scuffs or damage. Comes with original box and extra laces. Perfect for collectors or players looking for premium basketball shoes.",
    specifications: [
      { label: "Brand", value: "Nike" },
      { label: "Model", value: "Air Jordan 1 Retro High" },
      { label: "Size", value: "US 10.5" },
      { label: "Condition", value: "Like New" },
      { label: "Color", value: "Black/Red" },
      { label: "Year", value: "2023" },
    ],
    seller: {
      name: "Mike Chen",
      rating: 4.8,
      reviewCount: 45,
      avatar: "/placeholder.svg?height=100&width=100",
      verified: true,
      memberSince: "2022",
      responseTime: "Within 1 hour",
    },
    location: "Brooklyn, NY",
    distance: "3.2 miles",
    views: 234,
    favorites: 18,
    postedDate: "3 days ago",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="glass-card border-b border-border/50 p-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg">Item Details</h1>
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
          <div className="relative aspect-square">
            <Image
              src={item.images[selectedImage] || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent">
              {item.condition}
            </Badge>
          </div>
          <div className="flex gap-2 p-4 overflow-x-auto">
            {item.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-border/50"
                }`}
              >
                <Image src={img || "/placeholder.svg"} alt={`View ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold gradient-text mb-2">{item.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
                <span>•</span>
                <span>{item.distance}</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <div className="flex items-center text-3xl font-bold gradient-text">
              <DollarSign className="h-6 w-6" />
              {item.price}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>{item.views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{item.favorites} favorites</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{item.postedDate}</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button
            size="lg"
            onClick={() => setShowCheckout(true)}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
          <Button size="lg" variant="outline" className="glass-card hover:border-primary/50">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Description
          </h3>
          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-4">Specifications</h3>
          <div className="space-y-3">
            {item.specifications.map((spec) => (
              <div key={spec.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{spec.label}</span>
                <span className="font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-card border-primary/30 p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Seller Information
          </h3>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={item.seller.avatar || "/placeholder.svg"} />
              <AvatarFallback>{item.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold">{item.seller.name}</h4>
                {item.seller.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold text-sm">{item.seller.rating}</span>
                <span className="text-xs text-muted-foreground">({item.seller.reviewCount} reviews)</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Member since {item.seller.memberSince}</p>
                <p>Responds {item.seller.responseTime}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {showCheckout && (
        <MarketplaceCheckoutModal
          item={{
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.images[0],
            listingType: item.listingType,
            seller: item.seller.name,
          }}
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setShowShare(false)} />
          <Card className="relative glass-card border-2 border-primary/30 p-6 max-w-md w-full">
            <h3 className="font-bold text-lg mb-4">Share Item</h3>
            <SocialShareButtons text={`Check out ${item.title} on GoodRunss! Only $${item.price}`} size="md" />
            <Button variant="outline" onClick={() => setShowShare(false)} className="w-full mt-4">
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}

