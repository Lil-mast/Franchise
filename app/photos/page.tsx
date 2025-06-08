"use client"

import { SparklesCore } from "@/components/sparkles"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const photos = [
  {
    id: "1",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Fashion photoshoot with models wearing Franchise clothing",
    category: "fashion",
  },
  {
    id: "2",
    src: "/placeholder.svg?height=800&width=600",
    alt: "Behind the scenes at Franchise design studio",
    category: "behind-the-scenes",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Franchise clothing on display at fashion show",
    category: "events",
  },
  {
    id: "4",
    src: "/placeholder.svg?height=800&width=600",
    alt: "Close-up of Franchise hoodie details",
    category: "products",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Franchise team working on new designs",
    category: "behind-the-scenes",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=800&width=600",
    alt: "Models showcasing Franchise summer collection",
    category: "fashion",
  },
  {
    id: "7",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Franchise pop-up store opening night",
    category: "events",
  },
  {
    id: "8",
    src: "/placeholder.svg?height=800&width=600",
    alt: "Detail shot of Franchise t-shirt print",
    category: "products",
  },
  {
    id: "9",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Franchise clothing being worn in urban setting",
    category: "fashion",
  },
]

const categories = [
  { id: "all", name: "All Photos" },
  { id: "fashion", name: "Fashion" },
  { id: "behind-the-scenes", name: "Behind the Scenes" },
  { id: "events", name: "Events" },
  { id: "products", name: "Products" },
]

export default function PhotosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const filteredPhotos =
    selectedCategory === "all" ? photos : photos.filter((photo) => photo.category === selectedCategory)

  const selectedPhotoData = selectedPhoto ? photos.find((photo) => photo.id === selectedPhoto) : null

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">
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
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Photo Gallery</h1>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-white/10 text-white hover:bg-purple-500/20"
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center px-4">{photo.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && selectedPhotoData && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              className="absolute top-2 right-2 text-white z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </Button>
            <div className="relative h-[80vh] w-full">
              <Image
                src={selectedPhotoData.src || "/placeholder.svg"}
                alt={selectedPhotoData.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white text-center mt-4">{selectedPhotoData.alt}</p>
          </div>
        </div>
      )}
    </div>
  )
}
