export type Product = {
  id: string
  name: string
  description: string
  price: number // Price in KES
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  featured?: boolean
  new?: boolean
  bestSeller?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Legacy Hoodie",
    description:
      "Our signature hoodie designed for comfort and style. Made from premium cotton blend with a soft inner lining.",
    price: 9599, // ~80 USD to KES
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop",
    ],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Purple"],
    featured: true,
    bestSeller: true,
  },
  {
    id: "2",
    name: "Dream T-Shirt",
    description: "Lightweight and breathable t-shirt with our iconic 'Dream' design on the front.",
    price: 4199, // ~35 USD to KES
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    ],
    category: "t-shirts",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Blue"],
    new: true,
  },
  {
    id: "3",
    name: "Franchise Cap",
    description: "Adjustable cap with embroidered Franchise logo. Perfect for any casual outfit.",
    price: 3599, // ~30 USD to KES
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1908&auto=format&fit=crop",
    ],
    category: "accessories",
    sizes: ["One Size"],
    colors: ["Black", "White", "Purple"],
    bestSeller: true,
  },
  {
    id: "4",
    name: "Legacy Joggers",
    description:
      "Comfortable joggers with tapered fit and elastic waistband. Features side pockets and embroidered logo.",
    price: 7199, // ~60 USD to KES
    images: [
      "https://images.unsplash.com/photo-1580906853203-f13ea2c87028?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1936&auto=format&fit=crop",
    ],
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    featured: true,
  },
  {
    id: "5",
    name: "Dream Bomber Jacket",
    description: "Premium bomber jacket with quilted lining and Franchise emblem on the back.",
    price: 15599, // ~130 USD to KES
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy"],
    new: true,
    featured: true,
  },
  {
    id: "6",
    name: "Legacy Backpack",
    description: "Durable backpack with multiple compartments and laptop sleeve. Water-resistant material.",
    price: 10799, // ~90 USD to KES
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "accessories",
    sizes: ["One Size"],
    colors: ["Black", "Gray"],
    bestSeller: true,
  },
  {
    id: "7",
    name: "Urban Denim Jacket",
    description: "Classic denim jacket with a modern twist. Features distressed details and custom embroidery.",
    price: 11999, // ~100 USD to KES
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black", "Light Wash"],
    new: true,
  },
  {
    id: "8",
    name: "Streetwear Cargo Pants",
    description: "Functional cargo pants with multiple pockets. Perfect for an urban streetwear look.",
    price: 8399, // ~70 USD to KES
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=1974&auto=format&fit=crop",
    ],
    category: "bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Khaki", "Black", "Olive"],
    bestSeller: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.new)
}

export function getBestSellers(): Product[] {
  return products.filter((product) => product.bestSeller)
}
