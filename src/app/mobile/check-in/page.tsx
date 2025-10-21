import { Suspense } from "react"
import { CourtCheckIn } from "@/components/mobile/court-check-in"

function CheckInContent() {
  return <CourtCheckIn />
}

export default function CheckInPage() {
  console.log("[v0] Check-in page loading")
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-foreground">Loading check-in...</p>
      </div>
    }>
      <CheckInContent />
    </Suspense>
  )
}

