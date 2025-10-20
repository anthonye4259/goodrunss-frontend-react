"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Home, MapPin, ShoppingBag, Calendar, User, Users } from 'lucide-react'

interface MobileNavProps {
  userType?: "player" | "trainer" | "both"
}

export function MobileNav({ userType = "player" }: MobileNavProps) {
  const pathname = usePathname()

  const getNavItems = () => {
    switch (userType) {
      case "player":
        return [
          { href: "/mobile/player", icon: Home, label: "Home" },
          { href: "/mobile/courts", icon: MapPin, label: "Courts" },
          { href: "/mobile/marketplace", icon: ShoppingBag, label: "Marketplace" },
          { href: "/mobile/trainers", icon: Calendar, label: "Trainers" },
          { href: "/mobile/profile", icon: User, label: "Profile" },
        ]
      case "trainer":
        return [
          { href: "/mobile/trainer", icon: Home, label: "Home" },
          { href: "/mobile/schedule", icon: Calendar, label: "Schedule" },
          { href: "/mobile/marketplace", icon: ShoppingBag, label: "Marketplace" },
          { href: "/mobile/clients", icon: Users, label: "Clients" },
          { href: "/mobile/profile", icon: User, label: "Profile" },
        ]
      case "both":
        return [
          { href: "/mobile/both", icon: Home, label: "Home" },
          { href: "/mobile/courts", icon: MapPin, label: "Courts" },
          { href: "/mobile/marketplace", icon: ShoppingBag, label: "Marketplace" },
          { href: "/mobile/schedule", icon: Calendar, label: "Schedule" },
          { href: "/mobile/profile", icon: User, label: "Profile" },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                isActive ? "text-[#00D4FF]" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

