"use client"

import { SparklesCore } from "@/components/sparkles"
import { motion } from "framer-motion"
import { TeamFooter } from "@/components/team-footer"

export default function AboutPage() {
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-white mb-4 text-center">About Franchise</h1>
          <p className="text-gray-400 text-xl mb-12 text-center max-w-2xl mx-auto">
            Our story, mission, and the values that drive us forward.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2023 in Nairobi, Kenya, Franchise began as a small collective of designers with a vision to
                create clothing that empowers. What started as a passion project has grown into a movement that inspires
                young people to express themselves through fashion.
              </p>
              <p className="text-gray-300">
                Our journey has been defined by creativity, resilience, and a deep commitment to quality. Each piece in
                our collection tells a story and represents our dedication to helping you build your personal legacy.
              </p>
            </div>

            <div className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                We're on a mission to help young people express their unique identity through fashion that makes a
                statement. Every piece we create is designed to inspire confidence and help you build your personal
                legacy.
              </p>
              <p className="text-gray-300">
                We believe that clothing is more than just fabric—it's a form of self-expression, a statement of
                identity, and a tool for building confidence. Our mission is to provide you with the means to express
                yourself authentically.
              </p>
            </div>
          </div>

          <div className="bg-[#0c2340]/50 border border-white/10 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#0a1a2e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                <p className="text-gray-300">
                  We constantly push boundaries and explore new ideas to create unique designs.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#0a1a2e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Quality</h3>
                <p className="text-gray-300">
                  We're committed to excellence in every stitch, ensuring our products stand the test of time.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#0a1a2e]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Community</h3>
                <p className="text-gray-300">
                  We foster a sense of belonging and support among our customers and team members.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">Join Our Journey</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We invite you to be part of our story. Wear the dream, live your legacy, and join us as we continue to
              grow and evolve. Together, we can create a community that celebrates individuality and self-expression
              through fashion.
            </p>
          </div>
        </motion.div>
      </div>

      <TeamFooter />
    </div>
  )
}
