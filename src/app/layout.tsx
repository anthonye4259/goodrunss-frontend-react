import type { Metadata } from "next"
import { Space_Grotesk } from 'next/font/google'
import "./globals.css"
import { FloatingGIAChat } from "@/components/floating-gia-chat"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoodRunss - Where the World Plays",
  description: "Recreational sports platform connecting players, instructors, and facilities",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${spaceGrotesk.className}`}>
        {children}
        <FloatingGIAChat />
      </body>
    </html>
  )
}


