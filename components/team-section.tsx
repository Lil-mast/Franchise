"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { TeamMemberModal } from "@/components/team-member-modal"
import type { TeamMember } from "@/lib/types"

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Christian Tazma",
    role: "Project Manager",
    image: "/images/christian.png",
    bio: "Christian leads our project management team with over 8 years of experience in the fashion industry. He ensures that all our collections are delivered on time and to the highest standards. His passion for sustainable fashion drives our eco-friendly initiatives.",
    skills: ["Project Management", "Fashion Design", "Team Leadership", "Strategic Planning"],
    contact: "christian@franchise.com",
  },
  {
    id: 2,
    name: "Fazaldeen Abdul",
    role: "Backend Engineer",
    image: "/images/fazaldeen.png",
    bio: "Fazaldeen is our technical genius, responsible for building and maintaining the robust systems that power our e-commerce platform. With a background in computer science and 5 years of experience in web development, he ensures our online shopping experience is seamless and secure.",
    skills: ["Node.js", "Database Design", "API Development", "System Architecture"],
    contact: "fazaldeen@franchise.com",
  },
  {
    id: 3,
    name: "Rose Gathoni",
    role: "Frontend Engineer",
    image: "/images/rose.png",
    bio: "Rose creates the beautiful and intuitive user interfaces that make shopping on our platform a seamless experience. Her eye for design and technical expertise in modern web technologies helps bring our brand vision to life online. She's passionate about accessibility and user experience.",
    skills: ["React", "UI/UX Design", "CSS/SASS", "JavaScript"],
    contact: "rose@franchise.com",
  },
  {
    id: 4,
    name: "Samira Abdullahi",
    role: "DevOps Engineer",
    image: "/images/samira.png",
    bio: "Samira ensures our platform is always available, secure, and performing at its best for our customers. With expertise in cloud infrastructure and automation, she maintains our technical operations and implements continuous improvement processes for our digital systems.",
    skills: ["Cloud Infrastructure", "CI/CD", "Security", "Performance Optimization"],
    contact: "samira@franchise.com",
  },
  {
    id: 5,
    name: "Nasra Kulow",
    role: "Head of Design",
    image: "/images/nasra.png",
    bio: "Nasra leads our design team with her innovative vision and creative direction. With a background in fashion design from Central Saint Martins, she brings a unique perspective to our collections. Her designs blend contemporary trends with timeless elements to create pieces that make a statement.",
    skills: ["Fashion Design", "Textile Knowledge", "Color Theory", "Trend Forecasting"],
    contact: "nasra@franchise.com",
  },
]

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The talented individuals behind Franchise who work tirelessly to bring our vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-4 text-center cursor-pointer"
              onClick={() => handleMemberClick(member)}
            >
              <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-lg">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-yellow-500 text-sm">{member.role}</p>
              <p className="text-gray-400 text-xs mt-2">Click for more info</p>
            </motion.div>
          ))}
        </div>
      </div>

      <TeamMemberModal member={selectedMember} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}
