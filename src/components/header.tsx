"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { useCart } from "@/lib/hooks/use-cart"

export function Header() {
  const { items } = useCart()
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
    { href: "/premium", label: "Premium" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a1a2e]/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-yellow-500 font-bold text-xl">FRANCHISE</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} active={pathname === item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <Button variant="ghost" className="text-white hover:text-yellow-400">
              <ShoppingCart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-[#0a1a2e] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-gray-300 hover:text-white transition-colors relative group ${active ? "text-white font-medium" : ""}`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-500 transition-all ${active ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  )
}
