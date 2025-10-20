"use client"

import { useState } from "react"
import { Search, MapPin, Filter, DollarSign, Package, Clock } from 'lucide-react'

const listings = [
  {
    id: 1,
    title: "Wilson Basketball - Like New",
    price: 25,
    type: "sell",
    condition: "Like New",
    distance: "0.5 miles",
    seller: "Mike Johnson",
    image: "/basketball-action.png",
    zipCode: "10001",
  },
  {
    id: 2,
    title: "Tennis Racket - Wilson Pro Staff",
    price: 15,
    type: "rent",
    condition: "Good",
    distance: "1.2 miles",
    seller: "Sarah Chen",
    image: "/tennis-racket.png",
    zipCode: "10001",
    rentalPeriod: "per day",
  },
  {
    id: 3,
    title: "Pickleball Paddle Set",
    price: 40,
    type: "sell",
    condition: "Excellent",
    distance: "2.1 miles",
    seller: "David Lee",
    image: "/pickleball-paddle.jpg",
    zipCode: "10002",
  },
  {
    id: 4,
    title: "Golf Club Set - Callaway",
    price: 50,
    type: "rent",
    condition: "Good",
    distance: "3.5 miles",
    seller: "Emma Wilson",
    image: "/assorted-golf-clubs.png",
    zipCode: "10003",
    rentalPeriod: "per week",
  },
  {
    id: 5,
    title: "Basketball Shoes - Nike Size 10",
    price: 60,
    type: "sell",
    condition: "Like New",
    distance: "1.8 miles",
    seller: "James Brown",
    image: "/athletic-basketball-shoes.png",
    zipCode: "10001",
  },
  {
    id: 6,
    title: "Volleyball Net & Ball",
    price: 20,
    type: "rent",
    condition: "Good",
    distance: "2.5 miles",
    seller: "Lisa Martinez",
    image: "/volleyball-net.jpg",
    zipCode: "10002",
    rentalPeriod: "per day",
  },
]

export function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "sell" | "rent">("all")
  const [zipCode, setZipCode] = useState("10001")

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || listing.type === filterType
    const matchesZip = listing.zipCode.startsWith(zipCode.slice(0, 3))
    return matchesSearch && matchesType && matchesZip
  })

  return (
    <div className="min-h-screen bg-[#0A0118]">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4 sticky top-0 z-40">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-transparent bg-clip-text">
                Marketplace
              </h1>
              <p className="text-sm text-gray-400">Buy, sell, or rent gear locally</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
              }}
            >
              List Item
            </button>
          </div>

          {/* Search & Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for gear..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4FF]/50"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zip code"
                  className="w-full pl-10 pr-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4FF]/50"
                  maxLength={5}
                />
              </div>
              <button className="p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-[#00D4FF]/50 transition-colors">
                <Filter className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filterType === "all"
                    ? "bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType("sell")}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filterType === "sell"
                    ? "bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <DollarSign className="h-3 w-3" />
                Buy
              </button>
              <button
                onClick={() => setFilterType("rent")}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filterType === "rent"
                    ? "bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Clock className="h-3 w-3" />
                Rent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="p-4 max-w-md mx-auto">
        <div className="space-y-4">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00D4FF]/50 transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                  {listing.image && (
                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 right-2">
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        listing.type === "sell"
                          ? "bg-[#00D4FF]/90 text-white"
                          : "bg-[#7B2FFF]/90 text-white"
                      }`}
                    >
                      {listing.type === "sell" ? "SELL" : "RENT"}
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 truncate text-white">{listing.title}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Package className="h-3 w-3" />
                      <span>{listing.condition}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span>{listing.distance} away</span>
                    </div>
                    <p className="text-xs text-gray-400">by {listing.seller}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-transparent bg-clip-text">
                        ${listing.price}
                      </p>
                      {listing.rentalPeriod && <p className="text-xs text-gray-400">{listing.rentalPeriod}</p>}
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                      style={{
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                      }}
                    >
                      {listing.type === "sell" ? "Buy" : "Rent"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No items found in your area</p>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or zip code</p>
          </div>
        )}
      </div>
    </div>
  )
}

