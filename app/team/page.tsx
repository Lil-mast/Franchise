"use client"

import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import Image from "next/image"
import { TeamFooter } from "@/components/team-footer"

const teamMembers = [
  {
    id: 1,
    name: "Christian Tazma",
    role: "Project Manager",
    image: "/images/christian.png",
    bio: "Christian leads our project management team, ensuring that all our collections are delivered on time and to the highest standards.",
  },
  {
    id: 2,
    name: "Fazaldeen Abdul",
    role: "Backend Engineer",
    image: "/images/fazaldeen.png",
    bio: "Fazaldeen is responsible for building and maintaining the robust systems that power our e-commerce platform.",
  },
  {
    id: 3,
    name: "Rose Gathoni",
    role: "Frontend Engineer",
    image: "/images/rose.png",
    bio: "Rose creates the beautiful and intuitive user interfaces that make shopping on our platform a seamless experience.",
  },
  {
    id: 4,
    name: "Samira Abdullahi",
    role: "DevOps Engineer",
    image: "/images/samira.png",
    bio: "Samira ensures our platform is always available, secure, and performing at its best for our customers.",
  },
  {
    id: 5,
    name: "Nasra Kulow",
    role: "Head of Design",
    image: "/images/nasra.png",
    bio: "Nasra leads our design team, creating the stunning visuals and brand identity that defines Franchise.",
  },
]

export default function TeamPage() {
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
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Our Team</h1>
          <p className="text-gray-400 text-xl mb-12 text-center max-w-2xl mx-auto">
            Meet the talented individuals behind Franchise who work tirelessly to bring our vision to life.
          </p>

          <div className="grid gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center bg-black/40 border border-white/10 rounded-lg p-6`}
              >
                <div className="relative w-64 h-64 overflow-hidden rounded-lg">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{member.name}</h2>
                  <p className="text-purple-400 mb-4">{member.role}</p>
                  <p className="text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <TeamFooter />
    </div>
  )
}
