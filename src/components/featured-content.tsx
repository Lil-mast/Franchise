"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const featuredItems = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Explore our latest summer styles designed for comfort and style.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    link: "/products",
  },
  {
    id: 2,
    title: "Premium Membership",
    description: "Join our exclusive club and get early access to new releases.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    link: "/premium",
  },
  {
    id: 3,
    title: "Limited Edition Drops",
    description: "Don't miss our limited edition items - available while supplies last.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop",
    link: "/products",
  },
]

export function FeaturedContent() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScrolling && scrollRef.current) {
        const nextIndex = (activeIndex + 1) % featuredItems.length
        setActiveIndex(nextIndex)

        scrollRef.current.scrollTo({
          left: nextIndex * scrollRef.current.offsetWidth,
          behavior: "smooth",
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, isScrolling])

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft
      const itemWidth = scrollRef.current.offsetWidth
      const newIndex = Math.round(scrollPosition / itemWidth)

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }
  }

  const handleMouseEnter = () => setIsScrolling(true)
  const handleMouseLeave = () => setIsScrolling(false)

  return (
    <section className="relative w-full py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Collections</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover our latest collections and exclusive offers.</p>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
          onScroll={handleScroll}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {featuredItems.map((item) => (
            <div key={item.id} className="min-w-full w-full flex-shrink-0 snap-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-[#0c2340]/50 border border-white/10 rounded-lg overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-auto">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300 mb-6">{item.description}</p>
                    <Link href={item.link}>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-[#0a1a2e] font-semibold">
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? "bg-yellow-500" : "bg-gray-600"
              }`}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * scrollRef.current.offsetWidth,
                    behavior: "smooth",
                  })
                  setActiveIndex(index)
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
