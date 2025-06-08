"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TeamFooter() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success(`Thank you for subscribing with ${email}!`)
      setEmail("")
    } else {
      toast.error("Please enter a valid email address")
    }
  }

  return (
    <footer className="bg-[#071525] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-500">FRANCHISE</h3>
            <p className="text-gray-400 mb-4">
              Wear the Dream, Live your Legacy. Premium clothing designed to inspire the next generation.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com" target="_blank" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </Link>
              <Link href="https://www.github.com" target="_blank" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/premium" className="text-gray-400 hover:text-white">
                  Premium
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">0725466528</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                <a href="mailto:info@franchise.com" className="text-gray-400 hover:text-white">
                  info@franchise.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new releases and special offers.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0c2340] text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
              />
              <Button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-[#0a1a2e] px-4 py-2 rounded-r-md font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-6 text-center">Our Team</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Team members will be rendered here */}
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Franchise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
