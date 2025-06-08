"use client"

import { useCart } from "@/lib/hooks/use-cart"
import { SparklesCore } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils/format-currency"
import { TeamFooter } from "@/components/team-footer"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a1a2e] antialiased bg-grid-white/[0.02] relative">
        {/* Ambient background with moving particles */}
        <div className="h-full w-full absolute inset-0 z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <ShoppingBag className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
            <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-[#0a1a2e] font-semibold">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>

        <TeamFooter />
      </div>
    )
  }

  // Calculate tax and shipping
  const tax = total * 0.16 // 16% VAT in Kenya
  const grandTotal = total + tax

  return (
    <div className="min-h-screen bg-[#0a1a2e] antialiased bg-grid-white/[0.02] relative">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white mb-8">Your Shopping Cart</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-4 flex items-center"
                >
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="ml-4 flex-grow">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    {item.size && <p className="text-gray-400 text-sm">Size: {item.size}</p>}
                    <p className="text-yellow-400">{formatCurrency(item.price)}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/10 text-white h-8 w-8"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-white w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-white/10 text-white h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="ml-4 text-right">
                    <p className="text-white font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-400 p-0 h-auto mt-1"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  className="border-white/10 text-white"
                  onClick={() => router.push("/products")}
                >
                  Continue Shopping
                </Button>
                <Button variant="ghost" className="text-red-500 hover:text-red-400" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>

            <div className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>VAT (16%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-[#0c2340]/70 border-white/10 text-white"
                  />
                  <Button variant="outline" className="border-white/10 text-white">
                    Apply
                  </Button>
                </div>

                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#0a1a2e] font-semibold"
                  onClick={handleCheckout}
                >
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <TeamFooter />
    </div>
  )
}
