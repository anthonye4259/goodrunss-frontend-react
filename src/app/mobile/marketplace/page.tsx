import { MobileNav } from "@/components/mobile/mobile-nav"
import { MarketplaceScreen } from "@/components/mobile/marketplace-screen"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#0A0118] pb-20">
      <MarketplaceScreen />
      <MobileNav />
    </div>
  )
}


