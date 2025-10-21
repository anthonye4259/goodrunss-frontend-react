"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { X, CreditCard, CalendarIcon, DollarSign, Gavel, Package, CheckCircle } from 'lucide-react'
import Image from "next/image"

interface MarketplaceCheckoutModalProps {
  item: {
    id: string
    title: string
    price: number
    image: string
    listingType: "sale" | "rental" | "auction"
    seller: string
  }
  isOpen: boolean
  onClose: () => void
}

export function MarketplaceCheckoutModal({ item, isOpen, onClose }: MarketplaceCheckoutModalProps) {
  const [step, setStep] = useState<"details" | "payment" | "success">("details")
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [bidAmount, setBidAmount] = useState(item.price + 50)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")

  if (!isOpen) return null

  const handleSubmit = () => {
    setStep("success")
    setTimeout(() => {
      onClose()
      setStep("details")
    }, 2000)
  }

  const calculateTotal = () => {
    if (item.listingType === "rental") {
      return item.price * selectedDates.length
    }
    if (item.listingType === "auction") {
      return bidAmount
    }
    return item.price
  }

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
        <Card className="relative glass-card border-2 border-primary/30 p-8 max-w-md w-full text-center glow-primary">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/20 rounded-full">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2">
            {item.listingType === "rental" ? "Booking Confirmed!" : item.listingType === "auction" ? "Bid Placed!" : "Purchase Complete!"}
          </h2>
          <p className="text-muted-foreground">
            {item.listingType === "rental"
              ? "Your rental has been confirmed. Check your email for details."
              : item.listingType === "auction"
                ? "You're now the highest bidder! We'll notify you if you're outbid."
                : "Your order has been placed. The seller will contact you soon."}
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={onClose} />
      <Card className="relative glass-card border-2 border-primary/30 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl">
        <div className="sticky top-0 glass-card border-b border-border/50 p-4 flex items-center justify-between z-10">
          <h2 className="font-bold text-lg">
            {step === "details"
              ? item.listingType === "rental"
                ? "Select Dates"
                : item.listingType === "auction"
                  ? "Place Bid"
                  : "Checkout"
              : "Payment"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <Card className="glass-card border-primary/30 p-4">
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">Sold by {item.seller}</p>
                <div className="flex items-center gap-1 mt-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-bold text-lg">{item.price}</span>
                  {item.listingType === "rental" && <span className="text-sm text-muted-foreground">per day</span>}
                </div>
              </div>
            </div>
          </Card>

          {step === "details" && (
            <>
              {item.listingType === "rental" && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Select Rental Dates</Label>
                    <Card className="glass-card border-primary/30 p-4">
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => setSelectedDates(dates || [])}
                        disabled={(date) => date < new Date()}
                        className="rounded-md"
                      />
                    </Card>
                  </div>

                  {selectedDates.length > 0 && (
                    <Card className="glass-card border-primary/30 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Selected Dates</span>
                        <Badge variant="secondary">{selectedDates.length} days</Badge>
                      </div>
                      <div className="space-y-1">
                        {selectedDates.slice(0, 3).map((date, index) => (
                          <p key={index} className="text-sm">
                            {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </p>
                        ))}
                        {selectedDates.length > 3 && (
                          <p className="text-sm text-muted-foreground">+{selectedDates.length - 3} more days</p>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {item.listingType === "auction" && (
                <div className="space-y-4">
                  <Card className="glass-card border-primary/30 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Gavel className="h-5 w-5 text-primary" />
                      <h3 className="font-bold">Current Bid</h3>
                    </div>
                    <div className="flex items-center gap-1 text-2xl font-bold gradient-text mb-4">
                      <DollarSign className="h-6 w-6" />
                      {item.price}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bid-amount" className="text-sm font-semibold">
                        Your Bid (minimum ${item.price + 50})
                      </Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="bid-amount"
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(Number(e.target.value))}
                          min={item.price + 50}
                          className="pl-10 glass-card border-border/50"
                        />
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-card border-primary/30 p-4 bg-primary/5">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Your bid is binding. If you win, you'll be required to complete the purchase.
                    </p>
                  </Card>
                </div>
              )}

              {item.listingType === "sale" && (
                <Card className="glass-card border-primary/30 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">Order Summary</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Item Price</span>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-semibold">$5</span>
                    </div>
                    <div className="border-t border-border/50 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-lg gradient-text">${item.price + 5}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              <Button
                size="lg"
                onClick={() => setStep("payment")}
                disabled={item.listingType === "rental" && selectedDates.length === 0}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
              >
                Continue to Payment
              </Button>
            </>
          )}

          {step === "payment" && (
            <>
              <Card className="glass-card border-primary/30 p-4">
                <h3 className="font-bold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Credit / Debit Card</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "paypal"
                        ? "border-primary bg-primary/10"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="font-semibold">PayPal</span>
                    </div>
                  </button>
                </div>
              </Card>

              {paymentMethod === "card" && (
                <Card className="glass-card border-primary/30 p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number" className="text-sm font-semibold">
                      Card Number
                    </Label>
                    <Input
                      id="card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="glass-card border-border/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-sm font-semibold">
                        Expiry Date
                      </Label>
                      <Input id="expiry" type="text" placeholder="MM/YY" className="glass-card border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm font-semibold">
                        CVV
                      </Label>
                      <Input id="cvv" type="text" placeholder="123" className="glass-card border-border/50" />
                    </div>
                  </div>
                </Card>
              )}

              <Card className="glass-card border-primary/30 p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total Amount</span>
                  <div className="flex items-center gap-1 text-2xl font-bold gradient-text">
                    <DollarSign className="h-6 w-6" />
                    {calculateTotal()}
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button size="lg" variant="outline" onClick={() => setStep("details")} className="flex-1 glass-card">
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
                >
                  {item.listingType === "auction" ? "Place Bid" : "Complete Purchase"}
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

