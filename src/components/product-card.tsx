"use client"

import type { Product } from "@/lib/data/products"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils/format-currency"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/products/${product.id}`}>
        <Card className="overflow-hidden bg-[#0c2340]/50 border-white/10 hover:border-yellow-500/50 transition-all">
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 left-2 flex gap-2">
              {product.new && (
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-[#0a1a2e] font-semibold">New</Badge>
              )}
              {product.bestSeller && (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-[#0a1a2e] font-semibold">Best Seller</Badge>
              )}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mt-1">{product.description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="text-white font-bold">{formatCurrency(product.price)}</span>
            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
              View Details
            </Badge>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
