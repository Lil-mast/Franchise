"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useCart } from "@/lib/hooks/use-cart"
import { SparklesCore } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { formatCurrency } from "@/lib/utils/format-currency"
import { TeamFooter } from "@/components/team-footer"

// Grouped countries by continent
const countries = {
  Africa: [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cameroon",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Ivory Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ],
  Asia: [
    "Afghanistan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palestine",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Turkey",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
  ],
  Europe: [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Kosovo",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "Netherlands",
    "North Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
    "United Kingdom",
    "Vatican City",
  ],
  "North America": [
    "Antigua and Barbuda",
    "Bahamas",
    "Barbados",
    "Belize",
    "Canada",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "Grenada",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Trinidad and Tobago",
    "United States",
  ],
  "South America": [
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ],
  Oceania: [
    "Australia",
    "Fiji",
    "Kiribati",
    "Marshall Islands",
    "Micronesia",
    "Nauru",
    "New Zealand",
    "Palau",
    "Papua New Guinea",
    "Samoa",
    "Solomon Islands",
    "Tonga",
    "Tuvalu",
    "Vanuatu",
  ],
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [selectedCountry, setSelectedCountry] = useState("Kenya")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process the payment
    toast.success("Order placed successfully!")
    clearCart()
    router.push("/checkout/success")
  }

  // Calculate tax and total in KES
  const tax = total * 0.16 // 16% VAT in Kenya
  const grandTotal = total + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a1a2e] antialiased bg-grid-white/[0.02] relative">
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
            <p className="text-gray-400 mb-8">You need to add items to your cart before checkout.</p>
            <Link href="/products">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-[#0a1a2e] font-semibold">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1a2e] antialiased bg-grid-white/[0.02] relative">
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
        <Button variant="ghost" className="text-white mb-6" onClick={() => router.push("/cart")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Shipping Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <Input id="firstName" required className="bg-[#0c2340]/70 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-white">
                        Last Name
                      </Label>
                      <Input id="lastName" required className="bg-[#0c2340]/70 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input id="email" type="email" required className="bg-[#0c2340]/70 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address" className="text-white">
                        Address
                      </Label>
                      <Input id="address" required className="bg-[#0c2340]/70 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">
                        City
                      </Label>
                      <Input id="city" required className="bg-[#0c2340]/70 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-white">
                        Postal Code
                      </Label>
                      <Input id="postalCode" required className="bg-[#0c2340]/70 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country" className="text-white">
                        Country
                      </Label>
                      <Select defaultValue="Kenya" onValueChange={setSelectedCountry}>
                        <SelectTrigger className="bg-[#0c2340]/70 border-white/10 text-white">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0c2340]/90 border-white/10 text-white max-h-[300px]">
                          {Object.entries(countries).map(([continent, countryList]) => (
                            <SelectGroup key={continent}>
                              <SelectLabel>{continent}</SelectLabel>
                              {countryList.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone
                      </Label>
                      <Input id="phone" required className="bg-[#0c2340]/70 border-white/10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Payment Method</h2>

                  <Tabs defaultValue="card" onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid grid-cols-3 bg-[#0c2340]/70">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="mpesa">M-PESA</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-white">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required={paymentMethod === "card"}
                          className="bg-[#0c2340]/70 border-white/10 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry" className="text-white">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            required={paymentMethod === "card"}
                            className="bg-[#0c2340]/70 border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc" className="text-white">
                            CVC
                          </Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            required={paymentMethod === "card"}
                            className="bg-[#0c2340]/70 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="mpesa" className="mt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="mpesaNumber" className="text-white">
                            M-PESA Phone Number
                          </Label>
                          <Input
                            id="mpesaNumber"
                            placeholder="07XX XXX XXX"
                            required={paymentMethod === "mpesa"}
                            className="bg-[#0c2340]/70 border-white/10 text-white"
                          />
                        </div>
                        <p className="text-gray-300">You will receive an STK push to complete your payment securely.</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="mt-4">
                      <p className="text-gray-300">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>

                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#0a1a2e] font-semibold">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Place Order - {formatCurrency(grandTotal)}
                </Button>
              </form>
            </div>

            <div className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-gray-300">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-4">
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

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <TeamFooter />
    </div>
  )
}
