import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/hooks/use-cart"
import { Chatbot } from "@/components/chatbot"
import { Toaster } from "sonner"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Franchise - Wear the Dream, Live your Legacy",
  description: "Premium clothing and accessories for those who dare to dream and live their legacy.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a1a2e]`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CartProvider>
            <Header />
            {children}
            <Chatbot />
            <Toaster position="top-center" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
