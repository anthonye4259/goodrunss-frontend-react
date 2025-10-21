"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { X, Clock, DollarSign, CreditCard, CheckCircle, CalendarIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TrainerBookingModalProps {
  trainer: {
    id: string
    name: string
    sport: string
    hourlyRate: number
    image: string
  }
  isOpen: boolean
  onClose: () => void
}

export function TrainerBookingModal({ trainer, isOpen, onClose }: TrainerBookingModalProps) {
  const [step, setStep] = useState<"datetime" | "payment" | "success">("datetime")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [duration, setDuration] = useState<number>(1)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")

  if (!isOpen) return null

  const timeSlots = [
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]

  const durationOptions = [
    { value: 1, label: "1 hour" },
    { value: 1.5, label: "1.5 hours" },
    { value: 2, label: "2 hours" },
    { value: 3, label: "3 hours" },
  ]

  const calculateTotal = () => {
    const subtotal = trainer.hourlyRate * duration
    const serviceFee = 5
    return subtotal + serviceFee
  }

  const handleSubmit = () => {
    setStep("success")
    setTimeout(() => {
      onClose()
      setStep("datetime")
      setSelectedDate(undefined)
      setSelectedTime("")
      setDuration(1)
    }, 2000)
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
          <h2 className="text-2xl font-bold gradient-text mb-2">Session Booked!</h2>
          <p className="text-muted-foreground">
            Your training session with {trainer.name} has been confirmed. Check your email for details.
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
          <h2 className="font-bold text-lg">{step === "datetime" ? "Book Session" : "Payment"}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <Card className="glass-card border-primary/30 p-4">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={trainer.image || "/placeholder.svg"} />
                <AvatarFallback>{trainer.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold">{trainer.name}</h3>
                <Badge className="mt-1 bg-gradient-to-r from-primary to-accent text-xs">{trainer.sport}</Badge>
                <div className="flex items-center gap-1 mt-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-bold">{trainer.hourlyRate}</span>
                  <span className="text-sm text-muted-foreground">per hour</span>
                </div>
              </div>
            </div>
          </Card>

          {step === "datetime" && (
            <>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Select Date
                  </Label>
                  <Card className="glass-card border-primary/30 p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md"
                    />
                  </Card>
                </div>

                {selectedDate && (
                  <>
                    <div>
                      <Label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Select Time
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                              selectedTime === time
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border/50 hover:border-primary/50"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Session Duration</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {durationOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setDuration(option.value)}
                            className={`p-3 rounded-lg border-2 font-semibold transition-all ${
                              duration === option.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border/50 hover:border-primary/50"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Card className="glass-card border-primary/30 p-4">
                      <h3 className="font-bold mb-3">Session Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-semibold">
                            {selectedDate.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time</span>
                          <span className="font-semibold">{selectedTime || "Not selected"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration</span>
                          <span className="font-semibold">{duration} hour{duration > 1 ? "s" : ""}</span>
                        </div>
                        <div className="border-t border-border/50 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Session Cost</span>
                            <span className="font-semibold">${trainer.hourlyRate * duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Service Fee</span>
                            <span className="font-semibold">$5</span>
                          </div>
                        </div>
                        <div className="border-t border-border/50 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Total</span>
                            <div className="flex items-center gap-1 text-lg font-bold gradient-text">
                              <DollarSign className="h-5 w-5" />
                              {calculateTotal()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </>
                )}
              </div>

              <Button
                size="lg"
                onClick={() => setStep("payment")}
                disabled={!selectedDate || !selectedTime}
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
                <Button size="lg" variant="outline" onClick={() => setStep("datetime")} className="flex-1 glass-card">
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary"
                >
                  Confirm Booking
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

